import { notFound } from "next/navigation";
import { InterestForm } from "@/components/interest-form";
import { requireAdmin } from "@/lib/auth";
import { getInterestById } from "@/lib/content";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditInterestPage({ params }: PageProps) {
  const { id } = await params;
  const { supabase } = await requireAdmin(`/admin/interests/${id}/edit`);
  const interest = await getInterestById(id, supabase);

  if (!interest) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-line bg-white p-6 shadow-sm">
        <p className="eyebrow">Edit Interest</p>
        <h2 className="mt-2 text-3xl font-semibold text-ink">{interest.title}</h2>
      </div>
      <InterestForm interest={interest} />
    </div>
  );
}
