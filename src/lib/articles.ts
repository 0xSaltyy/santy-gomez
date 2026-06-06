import type { SupabaseClient } from "@supabase/supabase-js";
import type { AdminArticleComment, Article, ArticleComment, Database } from "@/lib/database.types";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Client = SupabaseClient<Database>;

async function getClient(existingClient?: Client) {
  if (existingClient) {
    return existingClient;
  }

  if (!hasSupabaseConfig()) {
    return null;
  }

  return createSupabaseServerClient();
}

export async function getPublishedArticles(existingClient?: Client): Promise<Article[]> {
  const supabase = await getClient(existingClient);

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.from("articles").select("*").eq("status", "published").order("date", { ascending: false });

  if (error) {
    console.error(error.message);
    return [];
  }

  return data ?? [];
}

export async function getAdminArticles(existingClient?: Client): Promise<Article[]> {
  const supabase = await getClient(existingClient);

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.from("articles").select("*").order("updated_at", { ascending: false });

  if (error) {
    console.error(error.message);
    return [];
  }

  return data ?? [];
}

export async function getArticleBySlug(slug: string, existingClient?: Client): Promise<Article | null> {
  const supabase = await getClient(existingClient);

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.from("articles").select("*").eq("slug", slug).eq("status", "published").maybeSingle();

  if (error) {
    console.error(error.message);
    return null;
  }

  return data;
}

export async function getArticleLikeCount(articleId: string, existingClient?: Client): Promise<number> {
  const supabase = await getClient(existingClient);

  if (!supabase) {
    return 0;
  }

  const { count, error } = await supabase.from("article_likes").select("id", { count: "exact", head: true }).eq("article_id", articleId);

  if (error) {
    console.error(error.message);
    return 0;
  }

  return count ?? 0;
}

export async function getVisibleArticleComments(articleId: string, existingClient?: Client): Promise<ArticleComment[]> {
  const supabase = await getClient(existingClient);

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.from("article_comments").select("*").eq("article_id", articleId).eq("status", "visible").order("created_at", { ascending: true });

  if (error) {
    console.error(error.message);
    return [];
  }

  return data ?? [];
}

export async function getAdminArticleComments(existingClient?: Client): Promise<AdminArticleComment[]> {
  const supabase = await getClient(existingClient);

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("article_comments")
    .select("*, articles(title, slug)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error.message);
    return [];
  }

  return (data ?? []) as AdminArticleComment[];
}

export async function getArticleById(id: string, existingClient?: Client): Promise<Article | null> {
  const supabase = await getClient(existingClient);

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.from("articles").select("*").eq("id", id).maybeSingle();

  if (error) {
    console.error(error.message);
    return null;
  }

  return data;
}
