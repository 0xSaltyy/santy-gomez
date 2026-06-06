import type { Database, UpdateEntry } from "@/lib/database.types";
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

export async function getPublishedUpdates(existingClient?: Client): Promise<UpdateEntry[]> {
  const supabase = await getClient(existingClient);

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.from("updates").select("*").eq("status", "published").order("date", { ascending: false });

  if (error) {
    console.error(error.message);
    return [];
  }

  return data ?? [];
}

export async function getAdminUpdates(existingClient?: Client): Promise<UpdateEntry[]> {
  const supabase = await getClient(existingClient);

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.from("updates").select("*").order("updated_at", { ascending: false });

  if (error) {
    console.error(error.message);
    return [];
  }

  return data ?? [];
}

export async function getUpdateById(id: string, existingClient?: Client): Promise<UpdateEntry | null> {
  const supabase = await getClient(existingClient);

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.from("updates").select("*").eq("id", id).maybeSingle();

  if (error) {
    console.error(error.message);
    return null;
  }

  return data;
}
