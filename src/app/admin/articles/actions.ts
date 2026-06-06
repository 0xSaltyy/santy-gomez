"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ArticleStatus } from "@/lib/database.types";
import { requireAdmin } from "@/lib/auth";
import { createUniqueSlug } from "@/lib/slug";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

function requiredText(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${key} is required.`);
  }

  return value.trim();
}

function optionalText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function resolveStatus(formData: FormData): ArticleStatus {
  const intent = formData.get("intent");

  if (intent === "publish") {
    return "published";
  }

  if (intent === "draft") {
    return "draft";
  }

  return formData.get("status") === "published" ? "published" : "draft";
}

export async function saveArticleAction(formData: FormData) {
  const id = optionalText(formData, "id");
  const { supabase } = await requireAdmin(id ? `/admin/articles/${id}/edit` : "/admin/articles/new");

  const title = requiredText(formData, "title");
  const category = requiredText(formData, "category");
  const date = requiredText(formData, "date");
  const preview = requiredText(formData, "preview");
  const abstract = optionalText(formData, "abstract");
  const keywords = optionalText(formData, "keywords");
  const authorNote = optionalText(formData, "author_note");
  const content = optionalText(formData, "content") ?? optionalText(formData, "body");

  if (!content) {
    throw new Error("Article body is required.");
  }
  const sources = optionalText(formData, "sources");
  const status = resolveStatus(formData);
  const slug = await createUniqueSlug(supabase, title, id ?? undefined);

  let imageUrl = optionalText(formData, "existingImageUrl");
  const image = formData.get("image");

  if (image instanceof File && image.size > 0) {
    if (!image.type.startsWith("image/")) {
      throw new Error("Only image uploads are allowed.");
    }

    if (image.size > MAX_IMAGE_SIZE) {
      throw new Error("Article images must be 5 MB or smaller.");
    }

    const extension = image.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const imagePath = `${new Date().getFullYear()}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from("article-images").upload(imagePath, image, {
      cacheControl: "3600",
      upsert: false
    });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage.from("article-images").getPublicUrl(imagePath);
    imageUrl = data.publicUrl;
  }

  const payload = {
    title,
    slug,
    category,
    date,
    preview,
    abstract,
    keywords,
    author_note: authorNote,
    content,
    sources,
    image_url: imageUrl,
    status
  };

  const result = id ? await supabase.from("articles").update(payload).eq("id", id) : await supabase.from("articles").insert(payload);

  if (result.error) {
    throw new Error(result.error.message);
  }

  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath("/admin");

  redirect("/admin");
}

export async function deleteArticleAction(formData: FormData) {
  const id = requiredText(formData, "id");
  const { supabase } = await requireAdmin("/admin");
  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath("/admin");

  redirect("/admin");
}
