import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/project-form";
import { requireAdmin } from "@/lib/auth";
import { getProjectById } from "@/lib/projects";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  const { supabase } = await requireAdmin(`/admin/projects/${id}/edit`);
  const project = await getProjectById(id, supabase);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-line bg-white p-6 shadow-sm">
        <p className="eyebrow">Edit Project</p>
        <h2 className="mt-2 text-3xl font-semibold text-ink">{project.title}</h2>
      </div>
      <ProjectForm project={project} />
    </div>
  );
}
