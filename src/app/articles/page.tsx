import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { Reveal } from "@/components/reveal";
import { getPublishedArticles } from "@/lib/articles";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: "Articles",
  description: "Published essays and academic-style reflections by Santy Gomez on science, law, politics, culture, music, and public life.",
  path: "/articles"
});

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();

  return (
    <section className="soft-band bg-paper/70 py-20">
      <div className="container-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Articles</p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-tight text-ink sm:text-6xl">Published Writing</h1>
          <p className="body-copy mt-6">Essays and reflections by Santy Gomez, organized as a clean public archive.</p>
        </Reveal>

        {articles.length ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <Reveal key={article.id} delay={index * 0.04}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="editorial-card mt-10 p-8 text-ink/65">No articles have been published yet.</div>
        )}
      </div>
    </section>
  );
}
