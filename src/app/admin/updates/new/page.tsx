import { UpdateForm } from "@/components/update-form";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function NewUpdatePage() {
  await requireAdmin("/admin/updates/new");

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-line bg-white p-6 shadow-sm">
        <p className="eyebrow">New Update</p>
        <h2 className="mt-2 text-3xl font-semibold text-ink">Publish a Formal Update</h2>
      </div>
      <UpdateForm />
    </div>
  );
}
