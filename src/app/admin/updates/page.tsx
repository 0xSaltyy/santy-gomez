import Link from "next/link";
import { Edit3, FilePlus2, Trash2 } from "lucide-react";
import { deleteUpdateAction } from "@/app/admin/updates/actions";
import { requireAdmin } from "@/lib/auth";
import { formatDate } from "@/lib/format";
import { getAdminUpdates } from "@/lib/updates";

export const dynamic = "force-dynamic";

export default async function AdminUpdatesPage() {
  const { supabase } = await requireAdmin("/admin/updates");
  const updates = await getAdminUpdates(supabase);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-md border border-line bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">Updates</p>
          <h2 className="mt-2 text-3xl font-semibold text-ink">Manage Formal Updates</h2>
        </div>
        <Link href="/admin/updates/new" className="button-primary">
          <FilePlus2 className="h-4 w-4" aria-hidden="true" />
          New Update
        </Link>
      </div>

      <div className="overflow-hidden rounded-md border border-line bg-white shadow-sm">
        {updates.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-line text-left">
              <thead className="bg-paper">
                <tr className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/55">
                  <th className="px-5 py-4">Title</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {updates.map((update) => (
                  <tr key={update.id} className="align-top">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-ink">{update.title}</p>
                      <p className="mt-1 max-w-xl text-sm leading-6 text-ink/60">{update.summary}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-ink/70">{update.category}</td>
                    <td className="px-5 py-4 text-sm text-ink/70">{formatDate(update.date)}</td>
                    <td className="px-5 py-4">
                      <span className="status-pill">{update.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/updates/${update.id}/edit`} className="button-secondary px-3" aria-label={`Edit ${update.title}`}>
                          <Edit3 className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <form action={deleteUpdateAction}>
                          <input type="hidden" name="id" value={update.id} />
                          <button type="submit" className="button-secondary px-3 text-wine hover:border-wine/35 hover:text-wine" aria-label={`Delete ${update.title}`}>
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
          <div className="p-8 text-ink/65">No updates yet.</div>
        )}
      </div>
    </div>
  );
}
