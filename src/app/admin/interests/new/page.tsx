import { InterestForm } from "@/components/interest-form";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function NewInterestPage() {
  await requireAdmin("/admin/interests/new");

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-line bg-white p-6 shadow-sm">
        <p className="eyebrow">New Interest</p>
        <h2 className="mt-2 text-3xl font-semibold text-ink">Add an Academic Interest</h2>
      </div>
      <InterestForm />
    </div>
  );
}
