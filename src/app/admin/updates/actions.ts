"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { PublicationStatus } from "@/lib/database.types";
import { requireAdmin } from "@/lib/auth";
import { createUniqueUpdateSlug } from "@/lib/slug";

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

  return formData.get("status") === "published" ? "published" : "draft";
}

export async function saveUpdateAction(formData: FormData) {
  const id = optionalText(formData, "id");
  const { supabase } = await requireAdmin(id ? `/admin/updates/${id}/edit` : "/admin/updates/new");
  const title = requiredText(formData, "title");
  const slug = await createUniqueUpdateSlug(supabase, title, id ?? undefined);

  const payload = {
    title,
    slug,
    category: requiredText(formData, "category"),
    date: requiredText(formData, "date"),
    summary: requiredText(formData, "summary"),
    content: requiredText(formData, "content"),
    status: resolveStatus(formData)
  };

  const result = id ? await supabase.from("updates").update(payload).eq("id", id) : await supabase.from("updates").insert(payload);

  if (result.error) {
    throw new Error(result.error.message);
  }

  revalidatePath("/");
  revalidatePath("/updates");
  revalidatePath("/admin");
  revalidatePath("/admin/updates");

  redirect("/admin/updates");
}

export async function deleteUpdateAction(formData: FormData) {
  const id = requiredText(formData, "id");
  const { supabase } = await requireAdmin("/admin/updates");
  const { error } = await supabase.from("updates").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/updates");
  revalidatePath("/admin");
  revalidatePath("/admin/updates");

  redirect("/admin/updates");
}
