import Link from "next/link";
import { BookOpen, BriefcaseBusiness, CalendarDays, Edit3, FilePlus2, GraduationCap, ListChecks, Trash2 } from "lucide-react";
import { deleteArticleAction } from "@/app/admin/articles/actions";
import { requireAdmin } from "@/lib/auth";
import { getAdminArticles } from "@/lib/articles";
import { getAdminInterests } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { getAdminProjects } from "@/lib/projects";
import { getAdminUpdates } from "@/lib/updates";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const { supabase } = await requireAdmin("/admin");
  const [articles, updates, projects, interests] = await Promise.all([getAdminArticles(supabase), getAdminUpdates(supabase), getAdminProjects(supabase), getAdminInterests(supabase)]);

  const dashboardCards = [
    { label: "Articles", count: articles.length, href: "/admin/articles/new", icon: BookOpen },
    { label: "Updates", count: updates.length, href: "/admin/updates", icon: CalendarDays },
    { label: "Projects", count: projects.length, href: "/admin/projects", icon: BriefcaseBusiness },
    { label: "Interests", count: interests.length, href: "/admin/interests", icon: ListChecks },
    { label: "About & Goals", count: 1, href: "/admin/content", icon: GraduationCap }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-md border border-line bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h2 className="mt-2 text-3xl font-semibold text-ink">Content Management</h2>
        </div>
        <Link href="/admin/articles/new" className="button-primary">
          <FilePlus2 className="h-4 w-4" aria-hidden="true" />
          New Article
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.label} href={card.href} className="rounded-md border border-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-forest/35 hover:shadow-soft">
              <Icon className="h-5 w-5 text-forest" aria-hidden="true" />
              <p className="mt-4 text-3xl font-semibold text-ink">{card.count}</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-ink/50">{card.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 rounded-md border border-line bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">Articles</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">Published and Draft Articles</h2>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-line bg-white shadow-sm">
        {articles.length ? (
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
                {articles.map((article) => (
                  <tr key={article.id} className="align-top">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-ink">{article.title}</p>
                      <p className="mt-1 max-w-xl text-sm leading-6 text-ink/60">{article.preview}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-ink/70">{article.category}</td>
                    <td className="px-5 py-4 text-sm text-ink/70">{formatDate(article.date)}</td>
                    <td className="px-5 py-4">
                      <span className="status-pill">{article.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/articles/${article.id}/edit`} className="button-secondary px-3" aria-label={`Edit ${article.title}`}>
                          <Edit3 className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <form action={deleteArticleAction}>
                          <input type="hidden" name="id" value={article.id} />
                          <button type="submit" className="button-secondary px-3 text-wine hover:border-wine/35 hover:text-wine" aria-label={`Delete ${article.title}`}>
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
          <div className="p-8 text-ink/65">No articles yet. Create the first article to begin the archive.</div>
        )}
      </div>
    </div>
  );
}
