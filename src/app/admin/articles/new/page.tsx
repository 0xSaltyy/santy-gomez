import { ArticleForm } from "@/components/article-form";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function NewArticlePage() {
  await requireAdmin("/admin/articles/new");

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-line bg-white p-6 shadow-sm">
        <p className="eyebrow">New Article</p>
        <h2 className="mt-2 text-3xl font-semibold text-ink">Write and Publish</h2>
      </div>
      <ArticleForm />
    </div>
  );
}
