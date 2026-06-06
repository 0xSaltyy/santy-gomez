import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Landmark, Microscope, PenLine } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { HeroStage } from "@/components/hero-stage";
import { InterestGrid } from "@/components/interest-grid";
import { Reveal } from "@/components/reveal";
import { getPublishedArticles } from "@/lib/articles";
import { getPublishedInterests, getSiteProfile } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Santy Gomez | Nicolas Santiago Gomez Zambrano",
  description: "The formal personal website of Santy Gomez, Nicolas Santiago Gomez Zambrano, featuring articles, academic interests, projects, and public reflections.",
  path: "/"
});

export default async function HomePage() {
  const [articles, profile, interests] = await Promise.all([getPublishedArticles(), getSiteProfile(), getPublishedInterests()]);
  const recentArticles = articles.slice(0, 3);

  return (
    <>
      <HeroStage />

      <section className="soft-band bg-paper/70 py-20">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <Reveal>
              <p className="eyebrow">Purpose</p>
              <h2 className="section-title mt-3">A disciplined place for public <span className="accent-word text-wine">thinking.</span></h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="body-copy">
                This site gathers essays, short reflections, and project notes in one permanent home. The tone is intentionally measured: clear writing, careful argument, and a focus on subjects that reward sustained attention.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="editorial-card p-5 hover:-translate-y-1 hover:shadow-glow">
                  <BookOpen className="h-5 w-5 text-forest" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-semibold text-ink">Articles</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/65">Published writing across science, law, politics, music, culture, and related projects.</p>
                </div>
                <div className="editorial-card p-5 hover:-translate-y-1 hover:shadow-glow">
                  <PenLine className="h-5 w-5 text-wine" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-semibold text-ink">Reflections</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/65">A formal record of developing ideas, questions, and work in progress.</p>
                </div>
                <div className="editorial-card p-5 hover:-translate-y-1 hover:shadow-glow">
                  <Microscope className="h-5 w-5 text-forest" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-semibold text-ink">Research Interests</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/65">Molecular biology, neuroscience, public health, disease research, and environmental science.</p>
                </div>
                <div className="editorial-card p-5 hover:-translate-y-1 hover:shadow-glow">
                  <Landmark className="h-5 w-5 text-wine" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-semibold text-ink">Public Institutions</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/65">Law, politics, policy, civic life, and the ways public decisions shape scientific progress.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white/60 py-20">
        <div className="container-shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Academic Interests</p>
            <h2 className="section-title mt-3">Serious areas of study, styled with personality.</h2>
            <p className="body-copy mt-5">{profile.interests_intro}</p>
          </Reveal>
          <Reveal delay={0.08} className="mt-8">
            {interests.length ? <InterestGrid interests={interests} /> : <div className="rounded-md border border-line bg-paper p-8 text-ink/65">Academic interests will appear here as they are published.</div>}
          </Reveal>
        </div>
      </section>

      <section className="soft-band bg-paper/70 py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <Reveal>
            <p className="eyebrow">Future Goals</p>
            <h2 className="section-title mt-3">A developing academic direction with range.</h2>
          </Reveal>
          <Reveal delay={0.08} scale>
            <div className="glass-panel p-7">
              <GraduationCap className="h-6 w-6 text-forest" aria-hidden="true" />
              <p className="mt-5 text-lg leading-9 text-ink/75">{profile.future_goals}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white/65 py-20">
        <div className="container-shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Latest</p>
              <h2 className="section-title mt-3">Recent Articles</h2>
            </div>
            <Link href="/articles" className="button-secondary">
              View all
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {recentArticles.length ? (
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {recentArticles.map((article, index) => (
                <Reveal key={article.id} delay={index * 0.05}>
                  <ArticleCard article={article} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-md border border-line bg-paper p-8 text-ink/65">The article archive is being prepared.</div>
          )}
        </div>
      </section>
    </>
  );
}
