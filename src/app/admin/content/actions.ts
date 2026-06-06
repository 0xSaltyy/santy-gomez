"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";

function requiredText(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${key} is required.`);
  }

  return value.trim();
}

export async function saveProfileAction(formData: FormData) {
  const { supabase } = await requireAdmin("/admin/content");
  const { error } = await supabase.from("site_profile").upsert(
    {
      id: "main",
      about_intro: requiredText(formData, "aboutIntro"),
      about_body: requiredText(formData, "aboutBody"),
      interests_intro: requiredText(formData, "interestsIntro"),
      future_goals: requiredText(formData, "futureGoals")
    },
    {
      onConflict: "id"
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/content");

  redirect("/admin/content");
}
