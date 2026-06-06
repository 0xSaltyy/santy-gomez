import type { SupabaseClient } from "@supabase/supabase-js";
import type { Article, Database } from "@/lib/database.types";
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
