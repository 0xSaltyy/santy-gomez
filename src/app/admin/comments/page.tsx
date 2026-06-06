import Link from "next/link";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { deleteCommentAction, updateCommentStatusAction } from "@/app/admin/comments/actions";
import { requireAdmin } from "@/lib/auth";
import { getAdminArticleComments } from "@/lib/articles";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminCommentsPage() {
  const { supabase } = await requireAdmin("/admin/comments");
  const comments = await getAdminArticleComments(supabase);

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-line bg-white p-6 shadow-sm">
        <p className="eyebrow">Comments</p>
        <h2 className="mt-2 text-3xl font-semibold text-ink">Public Comment Management</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/60">Comments publish automatically. Use this page to hide, unhide, or delete comments that are spam, abusive, or unrelated.</p>
      </div>

      <div className="overflow-hidden rounded-md border border-line bg-white shadow-sm">
        {comments.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-line text-left">
              <thead className="bg-paper">
                <tr className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/55">
                  <th className="px-5 py-4">Comment</th>
                  <th className="px-5 py-4">Article</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {comments.map((comment) => (
                  <tr key={comment.id} className="align-top">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-ink">{comment.display_name}</p>
                      <p className="mt-2 max-w-xl whitespace-pre-wrap text-sm leading-6 text-ink/65">{comment.content}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-ink/70">
                      {comment.articles ? (
                        <Link href={`/articles/${comment.articles.slug}`} className="animated-link">
                          {comment.articles.title}
                        </Link>
                      ) : (
                        "Deleted article"
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className="status-pill">{comment.status}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-ink/70">{formatDate(comment.created_at)}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <form action={updateCommentStatusAction}>
                          <input type="hidden" name="id" value={comment.id} />
                          <input type="hidden" name="status" value={comment.status === "visible" ? "hidden" : "visible"} />
                          <button type="submit" className="button-secondary px-3" aria-label={comment.status === "visible" ? "Hide comment" : "Unhide comment"}>
                            {comment.status === "visible" ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                          </button>
                        </form>
                        <form action={deleteCommentAction}>
                          <input type="hidden" name="id" value={comment.id} />
                          <button type="submit" className="button-secondary px-3 text-wine hover:border-wine/35 hover:text-wine" aria-label="Delete comment">
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
          <div className="p-8 text-ink/65">No comments yet.</div>
        )}
      </div>
    </div>
  );
}
