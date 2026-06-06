"use server";

import { revalidatePath } from "next/cache";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const MIN_COMMENT_LENGTH = 12;
const MAX_COMMENT_LENGTH = 1200;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 60;

function cleanPlainText(value: FormDataEntryValue | null, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function cleanVisitorId(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 120);
}

export async function likeArticleAction(formData: FormData) {
  if (!hasSupabaseConfig()) {
    return { ok: false, message: "Likes are not configured yet." };
  }

  const articleId = cleanPlainText(formData.get("articleId"), 80);
  const slug = cleanPlainText(formData.get("slug"), 160);
  const visitorId = cleanVisitorId(formData.get("visitorId"));

  if (!articleId || visitorId.length < 16) {
    return { ok: false, message: "Unable to save this like." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("article_likes").upsert(
    {
      article_id: articleId,
      visitor_id: visitorId
    },
    {
      onConflict: "article_id,visitor_id",
      ignoreDuplicates: true
    }
  );

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath("/articles");
  if (slug) {
    revalidatePath(`/articles/${slug}`);
  }

  return { ok: true, message: "Thank you for reading." };
}

export async function addArticleCommentAction(formData: FormData) {
  if (!hasSupabaseConfig()) {
    return { ok: false, message: "Comments are not configured yet." };
  }

  const honeypot = cleanPlainText(formData.get("website"), 120);
  if (honeypot) {
    return { ok: false, message: "Comment rejected." };
  }

  const articleId = cleanPlainText(formData.get("articleId"), 80);
  const slug = cleanPlainText(formData.get("slug"), 160);
  const visitorId = cleanVisitorId(formData.get("visitorId")) || null;
  const displayName = cleanPlainText(formData.get("displayName"), MAX_NAME_LENGTH);
  const content = cleanPlainText(formData.get("content"), MAX_COMMENT_LENGTH);

  if (!articleId) {
    return { ok: false, message: "Missing article." };
  }

  if (displayName.length < MIN_NAME_LENGTH) {
    return { ok: false, message: "Please enter a display name." };
  }

  if (content.length < MIN_COMMENT_LENGTH) {
    return { ok: false, message: "Please write a slightly longer comment." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("article_comments").insert({
    article_id: articleId,
    display_name: displayName,
    content,
    visitor_id: visitorId,
    status: "visible"
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  if (slug) {
    revalidatePath(`/articles/${slug}`);
  }

  return { ok: true, message: "Comment published." };
}
