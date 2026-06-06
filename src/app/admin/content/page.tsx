import { ProfileForm } from "@/components/profile-form";
import { requireAdmin } from "@/lib/auth";
import { getSiteProfile } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const { supabase } = await requireAdmin("/admin/content");
  const profile = await getSiteProfile(supabase);

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-line bg-white p-6 shadow-sm">
        <p className="eyebrow">About & Goals</p>
        <h2 className="mt-2 text-3xl font-semibold text-ink">Manage Core Profile Content</h2>
        <p className="mt-3 text-sm leading-6 text-ink/60">These sections appear on the Home and About pages.</p>
      </div>
      <ProfileForm profile={profile} />
    </div>
  );
}
