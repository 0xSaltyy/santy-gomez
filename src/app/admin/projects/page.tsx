import Link from "next/link";
import { Edit3, FilePlus2, Trash2 } from "lucide-react";
import { deleteProjectAction } from "@/app/admin/projects/actions";
import { requireAdmin } from "@/lib/auth";
import { formatDate } from "@/lib/format";
import { getAdminProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const { supabase } = await requireAdmin("/admin/projects");
  const projects = await getAdminProjects(supabase);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-md border border-line bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">Projects</p>
          <h2 className="mt-2 text-3xl font-semibold text-ink">Manage Projects</h2>
        </div>
        <Link href="/admin/projects/new" className="button-primary">
          <FilePlus2 className="h-4 w-4" aria-hidden="true" />
          New Project
        </Link>
      </div>

      <div className="overflow-hidden rounded-md border border-line bg-white shadow-sm">
        {projects.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-line text-left">
              <thead className="bg-paper">
                <tr className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/55">
                  <th className="px-5 py-4">Project</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Project Status</th>
                  <th className="px-5 py-4">Publication</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {projects.map((project) => (
                  <tr key={project.id} className="align-top">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-ink">{project.title}</p>
                      <p className="mt-1 max-w-xl text-sm leading-6 text-ink/60">{project.description}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-ink/70">{project.category}</td>
                    <td className="px-5 py-4 text-sm text-ink/70">{formatDate(project.date)}</td>
                    <td className="px-5 py-4">
                      <span className="status-pill">{project.project_status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="status-pill">{project.publication_status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/projects/${project.id}/edit`} className="button-secondary px-3" aria-label={`Edit ${project.title}`}>
                          <Edit3 className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <form action={deleteProjectAction}>
                          <input type="hidden" name="id" value={project.id} />
                          <button type="submit" className="button-secondary px-3 text-wine hover:border-wine/35 hover:text-wine" aria-label={`Delete ${project.title}`}>
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-ink/65">No projects yet.</div>
        )}
      </div>
    </div>
  );
}
