import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { InterestGrid } from "@/components/interest-grid";
import { Reveal } from "@/components/reveal";
import { getPublishedInterests, getSiteProfile } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Santy Gomez",
  description: "Learn about Santy Gomez, formally Nicolas Santiago Gomez Zambrano, his academic interests, future goals, writing, and emerging scholarly direction.",
  path: "/about"
});

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const [profile, interests] = await Promise.all([getSiteProfile(), getPublishedInterests()]);

  return (
    <>
      <section className="soft-band bg-paper/70 py-20">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <p className="eyebrow">About</p>
            <h1 className="mt-3 font-display text-5xl font-bold leading-tight text-ink sm:text-6xl">Santy Gomez</h1>
            <p className="mt-4 font-display text-sm font-bold uppercase tracking-[0.18em] text-ink/50">Nicolas Santiago Gomez Zambrano</p>
          </Reveal>
          <Reveal delay={0.08} className="space-y-6">
            <p className="body-copy">{profile.about_intro}</p>
            <p className="body-copy">{profile.about_body}</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {["Science", "Law", "Politics", "Music", "Culture", "Writing"].map((item) => (
                <div key={item} className="editorial-card px-4 py-5 text-center font-display text-sm font-bold uppercase tracking-[0.14em] text-ink/65 hover:-translate-y-1 hover:shadow-glow">
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white/60 py-20">
        <div className="container-shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Academic Interests</p>
            <h2 className="section-title mt-3">Areas of intellectual focus.</h2>
            <p className="body-copy mt-5">{profile.interests_intro}</p>
          </Reveal>
          <Reveal delay={0.08} className="mt-8">
            {interests.length ? <InterestGrid interests={interests} /> : <div className="editorial-card p-8 text-ink/65">Academic interests will appear here as they are published.</div>}
          </Reveal>
        </div>
      </section>

      <section className="soft-band bg-paper/70 py-20">
        <div className="container-shell max-w-4xl">
          <Reveal className="glass-panel p-7" scale>
            <GraduationCap className="h-6 w-6 text-forest" aria-hidden="true" />
            <p className="eyebrow mt-6">Future Goals</p>
            <h2 className="section-title mt-3">Academic direction and long-term purpose.</h2>
            <p className="mt-5 text-lg leading-9 text-ink/75">{profile.future_goals}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
