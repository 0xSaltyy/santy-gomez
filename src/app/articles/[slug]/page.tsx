import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleReveal, ArticleTools, KeywordPills, ReadingProgressBar } from "@/components/article-motion";
import { MarkdownRenderer } from "@/components/markdown-renderer";
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

  const keywords = article.keywords
    ? article.keywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean)
    : [];

  return (
    <article className="article-print-root soft-band bg-paper/70 py-20">
      <ReadingProgressBar />
      <div className="container-shell max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_220px] lg:items-start">
          <div className="max-w-4xl">
            <ArticleReveal>
              <p className="eyebrow">{article.category}</p>
              <h1 className="mt-4 font-display text-5xl font-bold leading-tight text-ink sm:text-6xl">{article.title}</h1>
              <p className="mt-5 font-display text-sm font-bold uppercase tracking-[0.16em] text-ink/50">{formatDate(article.date)} · Santy Gomez</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-ink/40">Nicolas Santiago Gomez Zambrano</p>
              {article.author_note ? <p className="mt-4 max-w-2xl border-l-2 border-cyan/60 pl-4 text-sm italic leading-7 text-ink/65">{article.author_note}</p> : null}
            </ArticleReveal>

            {keywords.length ? <KeywordPills keywords={keywords} /> : null}

            {article.abstract ? (
              <ArticleReveal delay={0.08}>
                <section className="mt-9 rounded-lg border border-white/75 bg-gradient-to-br from-white/90 via-cyan/10 to-lavender/20 p-6 shadow-glow backdrop-blur-xl">
                  <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-forest">Abstract</p>
                  <p className="mt-4 text-base leading-8 text-ink/75">{article.abstract}</p>
                </section>
              </ArticleReveal>
            ) : null}

            {article.image_url ? (
              <ArticleReveal>
                <img src={article.image_url} alt="" className="mt-10 aspect-[16/9] w-full rounded-lg border border-white/70 object-cover shadow-glow" />
              </ArticleReveal>
            ) : null}

            <ArticleReveal>
              <div className="mt-10 rounded-lg border border-white/70 bg-white/65 px-5 py-8 shadow-soft backdrop-blur-xl sm:px-8 lg:px-10">
                <MarkdownRenderer content={article.content} />
              </div>
            </ArticleReveal>

            <ArticleReveal>
              <section className="glass-panel mt-12 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">Author</p>
                <h2 className="mt-3 font-display text-2xl font-bold text-ink">Santy Gomez</h2>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-ink/45">Nicolas Santiago Gomez Zambrano</p>
                <p className="mt-4 text-sm leading-7 text-ink/70">
                  Santy Gomez is a student, writer, and emerging scholar interested in science, law, politics, music, and culture. His articles reflect personal research, academic interests, and developing analysis.
                </p>
              </section>
            </ArticleReveal>

            {article.sources ? (
              <ArticleReveal>
                <section className="references-section mt-12 rounded-lg border border-line bg-white/70 p-6 shadow-soft">
                  <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-forest">References</h2>
                  <MarkdownRenderer content={article.sources} className="mt-4 text-sm" />
                </section>
              </ArticleReveal>
            ) : null}
          </div>

          <ArticleTools />
        </div>
      </div>
    </article>
  );
}
