import type { Database, Project } from "@/lib/database.types";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";

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

export async function getPublishedProjects(existingClient?: Client): Promise<Project[]> {
  const supabase = await getClient(existingClient);

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.from("projects").select("*").eq("publication_status", "published").order("date", { ascending: false });

  if (error) {
    console.error(error.message);
    return [];
  }

  return data ?? [];
}

export async function getAdminProjects(existingClient?: Client): Promise<Project[]> {
  const supabase = await getClient(existingClient);

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.from("projects").select("*").order("updated_at", { ascending: false });

  if (error) {
    console.error(error.message);
    return [];
  }

  return data ?? [];
}

export async function getProjectById(id: string, existingClient?: Client): Promise<Project | null> {
  const supabase = await getClient(existingClient);

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();

  if (error) {
    console.error(error.message);
    return null;
  }

  return data;
}
