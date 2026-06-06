import { notFound } from "next/navigation";
import { UpdateForm } from "@/components/update-form";
import { requireAdmin } from "@/lib/auth";
import { getUpdateById } from "@/lib/updates";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditUpdatePage({ params }: PageProps) {
  const { id } = await params;
  const { supabase } = await requireAdmin(`/admin/updates/${id}/edit`);
  const update = await getUpdateById(id, supabase);

  if (!update) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-line bg-white p-6 shadow-sm">
        <p className="eyebrow">Edit Update</p>
        <h2 className="mt-2 text-3xl font-semibold text-ink">{update.title}</h2>
      </div>
      <UpdateForm update={update} />
    </div>
  );
}
