import type { AcademicInterest, Database, SiteProfile } from "@/lib/database.types";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";

type Client = SupabaseClient<Database>;

export const defaultProfile: SiteProfile = {
  id: "main",
  about_intro: "Santy Gomez, formally Nicolas Santiago Gomez Zambrano, is a serious student, writer, and emerging scholar interested in science, law, politics, music, and culture.",
  about_body:
    "His work is shaped by disciplined reading, careful observation, and a commitment to explaining complex ideas with clarity. This website serves as a formal archive for articles, academic updates, projects, and developing areas of study.",
  interests_intro: "Santy is especially interested in fields that connect scientific discovery with human well-being, public institutions, and cultural understanding.",
  future_goals:
    "Santy hopes to study molecular biology, contribute to disease research, and explore questions related to Alzheimer’s disease and neurological health. He is also interested in understanding how science, law, and public policy shape medical progress and public life.",
  created_at: "",
  updated_at: ""
};

export const defaultInterests: AcademicInterest[] = [
  {
    id: "molecular-biology",
    title: "Molecular Biology",
    description: "The molecular systems that shape life, health, disease, and future biomedical research.",
    display_order: 10,
    status: "published",
    created_at: "",
    updated_at: ""
  },
  {
    id: "neuroscience",
    title: "Neuroscience",
    description: "The brain, cognition, behavior, and the biological foundations of neurological conditions.",
    display_order: 20,
    status: "published",
    created_at: "",
    updated_at: ""
  },
  {
    id: "disease-research",
    title: "Disease Research",
    description: "How diseases emerge, progress, and can be studied through rigorous scientific methods.",
    display_order: 30,
    status: "published",
    created_at: "",
    updated_at: ""
  },
  {
    id: "public-health",
    title: "Public Health",
    description: "Prevention, health systems, equity, and the policies that influence community well-being.",
    display_order: 40,
    status: "published",
    created_at: "",
    updated_at: ""
  },
  {
    id: "law-and-policy",
    title: "Law and Public Policy",
    description: "How legal institutions, regulation, and policy decisions affect science, medicine, and civic life.",
    display_order: 50,
    status: "published",
    created_at: "",
    updated_at: ""
  },
  {
    id: "politics",
    title: "Politics and Civic Life",
    description: "Political systems, public argument, leadership, and the responsibilities of citizenship.",
    display_order: 60,
    status: "published",
    created_at: "",
    updated_at: ""
  },
  {
    id: "environmental-science",
    title: "Environmental Science",
    description: "Ecological systems, climate, sustainability, and the relationship between people and the environment.",
    display_order: 70,
    status: "published",
    created_at: "",
    updated_at: ""
  },
  {
    id: "writing",
    title: "Writing",
    description: "Essays, reflections, research notes, and formal communication across fields.",
    display_order: 80,
    status: "published",
    created_at: "",
    updated_at: ""
  },
  {
    id: "music",
    title: "Music",
    description: "Music as a serious cultural form connected to creativity, interpretation, and discipline.",
    display_order: 90,
    status: "published",
    created_at: "",
    updated_at: ""
  }
];

async function getClient(existingClient?: Client) {
  if (existingClient) {
    return existingClient;
  }

  if (!hasSupabaseConfig()) {
    return null;
  }

  return createSupabaseServerClient();
}

export async function getSiteProfile(existingClient?: Client): Promise<SiteProfile> {
  const supabase = await getClient(existingClient);

  if (!supabase) {
    return defaultProfile;
  }

  const { data, error } = await supabase.from("site_profile").select("*").eq("id", "main").maybeSingle();

  if (error || !data) {
    if (error) {
      console.error(error.message);
    }

    return defaultProfile;
  }

  return data;
}

export async function getPublishedInterests(existingClient?: Client): Promise<AcademicInterest[]> {
  const supabase = await getClient(existingClient);

  if (!supabase) {
    return defaultInterests;
  }

  const { data, error } = await supabase.from("academic_interests").select("*").eq("status", "published").order("display_order", { ascending: true });

  if (error) {
    console.error(error.message);
    return defaultInterests;
  }

  return data ?? [];
}

export async function getAdminInterests(existingClient?: Client): Promise<AcademicInterest[]> {
  const supabase = await getClient(existingClient);

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.from("academic_interests").select("*").order("display_order", { ascending: true });

  if (error) {
    console.error(error.message);
    return [];
  }

  return data ?? [];
}

export async function getInterestById(id: string, existingClient?: Client): Promise<AcademicInterest | null> {
  const supabase = await getClient(existingClient);

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.from("academic_interests").select("*").eq("id", id).maybeSingle();

  if (error) {
    console.error(error.message);
    return null;
  }

  return data;
}
