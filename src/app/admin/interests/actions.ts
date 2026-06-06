"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { PublicationStatus } from "@/lib/database.types";
import { requireAdmin } from "@/lib/auth";

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

export async function saveInterestAction(formData: FormData) {
  const id = optionalText(formData, "id");
  const { supabase } = await requireAdmin(id ? `/admin/interests/${id}/edit` : "/admin/interests/new");
  const displayOrder = Number(requiredText(formData, "displayOrder"));

  if (!Number.isFinite(displayOrder)) {
    throw new Error("Display order must be a number.");
  }

  const payload = {
    title: requiredText(formData, "title"),
    description: requiredText(formData, "description"),
    display_order: displayOrder,
    status: resolveStatus(formData)
  };

  const result = id ? await supabase.from("academic_interests").update(payload).eq("id", id) : await supabase.from("academic_interests").insert(payload);

  if (result.error) {
    throw new Error(result.error.message);
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/interests");

  redirect("/admin/interests");
}

export async function deleteInterestAction(formData: FormData) {
  const id = requiredText(formData, "id");
  const { supabase } = await requireAdmin("/admin/interests");
  const { error } = await supabase.from("academic_interests").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/interests");

  redirect("/admin/interests");
}
