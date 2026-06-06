"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { CommentStatus } from "@/lib/database.types";
import { requireAdmin } from "@/lib/auth";

function requiredText(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${key} is required.`);
  }

  return value.trim();
}

export async function updateCommentStatusAction(formData: FormData) {
  const id = requiredText(formData, "id");
  const status = requiredText(formData, "status") as CommentStatus;

  if (status !== "visible" && status !== "hidden") {
    throw new Error("Invalid comment status.");
  }

  const { supabase } = await requireAdmin("/admin/comments");
  const { error } = await supabase.from("article_comments").update({ status }).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/comments");
  revalidatePath("/articles");
  redirect("/admin/comments");
}

export async function deleteCommentAction(formData: FormData) {
  const id = requiredText(formData, "id");
  const { supabase } = await requireAdmin("/admin/comments");
  const { error } = await supabase.from("article_comments").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/comments");
  revalidatePath("/articles");
  redirect("/admin/comments");
}
