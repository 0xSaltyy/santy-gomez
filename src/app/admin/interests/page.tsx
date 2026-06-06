import Link from "next/link";
import { Edit3, FilePlus2, Trash2 } from "lucide-react";
import { deleteInterestAction } from "@/app/admin/interests/actions";
import { requireAdmin } from "@/lib/auth";
import { getAdminInterests } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminInterestsPage() {
  const { supabase } = await requireAdmin("/admin/interests");
  const interests = await getAdminInterests(supabase);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-md border border-line bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">Academic Interests</p>
          <h2 className="mt-2 text-3xl font-semibold text-ink">Manage Interests</h2>
        </div>
        <Link href="/admin/interests/new" className="button-primary">
          <FilePlus2 className="h-4 w-4" aria-hidden="true" />
          New Interest
        </Link>
      </div>

      <div className="overflow-hidden rounded-md border border-line bg-white shadow-sm">
        {interests.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-line text-left">
              <thead className="bg-paper">
                <tr className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/55">
                  <th className="px-5 py-4">Interest</th>
                  <th className="px-5 py-4">Order</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {interests.map((interest) => (
                  <tr key={interest.id} className="align-top">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-ink">{interest.title}</p>
                      <p className="mt-1 max-w-xl text-sm leading-6 text-ink/60">{interest.description}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-ink/70">{interest.display_order}</td>
                    <td className="px-5 py-4">
                      <span className="status-pill">{interest.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/interests/${interest.id}/edit`} className="button-secondary px-3" aria-label={`Edit ${interest.title}`}>
                          <Edit3 className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <form action={deleteInterestAction}>
                          <input type="hidden" name="id" value={interest.id} />
                          <button type="submit" className="button-secondary px-3 text-wine hover:border-wine/35 hover:text-wine" aria-label={`Delete ${interest.title}`}>
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
          <div className="p-8 text-ink/65">No interests yet.</div>
        )}
      </div>
    </div>
  );
}
