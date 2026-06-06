import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/articles";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article"
    };
  }

  return {
    title: article.title,
    description: article.preview
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="soft-band bg-paper/70 py-20">
      <div className="container-shell max-w-3xl">
        <p className="eyebrow">{article.category}</p>
        <h1 className="mt-4 font-display text-5xl font-bold leading-tight text-ink sm:text-6xl">{article.title}</h1>
        <p className="mt-5 font-display text-sm font-bold uppercase tracking-[0.16em] text-ink/50">{formatDate(article.date)} · Santy Gomez</p>
        {article.image_url ? <img src={article.image_url} alt="" className="mt-10 aspect-[16/9] w-full rounded-lg border border-white/70 object-cover shadow-glow" /> : null}
        <div className="mt-10 border-t border-line pt-10">
          <div className="whitespace-pre-wrap font-body text-lg leading-9 text-ink/80">{article.content}</div>
        </div>
        <section className="glass-panel mt-12 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">Author</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-ink">Santy Gomez</h2>
          <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-ink/45">Nicolas Santiago Gomez Zambrano</p>
          <p className="mt-4 text-sm leading-7 text-ink/70">
            Santy Gomez is a student, writer, and emerging scholar interested in science, law, politics, music, and culture. His articles reflect personal research, academic interests, and developing analysis.
          </p>
        </section>
        {article.sources ? (
          <section className="mt-12 border-t border-line pt-8">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-forest">Sources and Citations</h2>
            <div className="mt-4 whitespace-pre-wrap text-sm leading-7 text-ink/70">{article.sources}</div>
          </section>
        ) : null}
      </div>
    </article>
  );
}
