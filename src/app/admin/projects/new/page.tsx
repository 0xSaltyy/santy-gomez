import { ProjectForm } from "@/components/project-form";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  await requireAdmin("/admin/projects/new");

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-line bg-white p-6 shadow-sm">
        <p className="eyebrow">New Project</p>
        <h2 className="mt-2 text-3xl font-semibold text-ink">Create a Project Entry</h2>
      </div>
      <ProjectForm />
    </div>
  );
}
