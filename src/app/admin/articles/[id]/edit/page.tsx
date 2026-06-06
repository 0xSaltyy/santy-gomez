import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/article-form";
import { requireAdmin } from "@/lib/auth";
import { getArticleById } from "@/lib/articles";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditArticlePage({ params }: PageProps) {
  const { id } = await params;
  const { supabase } = await requireAdmin(`/admin/articles/${id}/edit`);
  const article = await getArticleById(id, supabase);

  if (!article) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-line bg-white p-6 shadow-sm">
        <p className="eyebrow">Edit Article</p>
        <h2 className="mt-2 text-3xl font-semibold text-ink">{article.title}</h2>
      </div>
      <ArticleForm article={article} />
    </div>
  );
}
