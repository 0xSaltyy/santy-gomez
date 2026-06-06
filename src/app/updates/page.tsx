import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { UpdateTimeline } from "@/components/update-timeline";
import { getPublishedUpdates } from "@/lib/updates";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: "Updates",
  description: "Formal updates from Santy Gomez about projects, academic progress, research interests, articles, music, school work, and personal milestones.",
  path: "/updates"
});

export default async function UpdatesPage() {
  const updates = await getPublishedUpdates();

  return (
    <section className="soft-band bg-paper/70 py-20">
      <div className="container-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Updates</p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-tight text-ink sm:text-6xl">Academic and Project Updates</h1>
          <p className="body-copy mt-6">Formal updates on projects, academic progress, articles, research interests, school work, music, and significant milestones.</p>
        </Reveal>

        {updates.length ? (
          <Reveal delay={0.08} className="mt-10">
            <UpdateTimeline updates={updates} />
          </Reveal>
        ) : (
          <div className="editorial-card mt-10 p-8 text-ink/65">Formal updates will appear here as they are published.</div>
        )}
      </div>
    </section>
  );
}
