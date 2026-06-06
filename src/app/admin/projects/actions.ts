"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { PublicationStatus } from "@/lib/database.types";
import { requireAdmin } from "@/lib/auth";
import { createUniqueProjectSlug } from "@/lib/slug";

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

function resolveStatus(formData: FormData): PublicationStatus {
  const intent = formData.get("intent");

  if (intent === "publish") {
    return "published";
  }

  if (intent === "draft") {
    return "draft";
  }

  return formData.get("publicationStatus") === "published" ? "published" : "draft";
}

export async function saveProjectAction(formData: FormData) {
  const id = optionalText(formData, "id");
  const { supabase } = await requireAdmin(id ? `/admin/projects/${id}/edit` : "/admin/projects/new");
  const title = requiredText(formData, "title");
  const slug = await createUniqueProjectSlug(supabase, title, id ?? undefined);
  let imageUrl = optionalText(formData, "existingImageUrl");
  const image = formData.get("image");

  if (image instanceof File && image.size > 0) {
    if (!image.type.startsWith("image/")) {
      throw new Error("Only image uploads are allowed.");
    }

    if (image.size > MAX_IMAGE_SIZE) {
      throw new Error("Project images must be 5 MB or smaller.");
    }

    const extension = image.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const imagePath = `projects/${new Date().getFullYear()}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from("content-images").upload(imagePath, image, {
      cacheControl: "3600",
      upsert: false
    });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage.from("content-images").getPublicUrl(imagePath);
    imageUrl = data.publicUrl;
  }

  const payload = {
    title,
    slug,
    category: requiredText(formData, "category"),
    date: requiredText(formData, "date"),
    description: requiredText(formData, "description"),
    project_status: requiredText(formData, "projectStatus"),
    link_url: optionalText(formData, "linkUrl"),
    image_url: imageUrl,
    publication_status: resolveStatus(formData)
  };

  const result = id ? await supabase.from("projects").update(payload).eq("id", id) : await supabase.from("projects").insert(payload);

  if (result.error) {
    throw new Error(result.error.message);
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");

  redirect("/admin/projects");
}

export async function deleteProjectAction(formData: FormData) {
  const id = requiredText(formData, "id");
  const { supabase } = await requireAdmin("/admin/projects");
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/projects");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");

  redirect("/admin/projects");
}
