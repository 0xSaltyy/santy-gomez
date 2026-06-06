import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Editorial Policy",
  description: "Editorial policy for Santy Gomez articles, including authorship, research notes, cited sources, analysis, and future updates.",
  path: "/editorial-policy"
});

export default function EditorialPolicyPage() {
  return (
    <section className="soft-band bg-paper/70 py-20">
      <div className="container-shell max-w-3xl">
        <Reveal>
          <p className="eyebrow">Editorial Standards</p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-tight text-ink sm:text-6xl">Editorial Policy</h1>
          <div className="glass-panel mt-8 space-y-6 p-7">
            <p className="body-copy">
              Articles on this website are written, edited, and published by Santy Gomez. They may include personal analysis, academic reflection, research notes, cited sources, and observations connected to his areas of study.
            </p>
            <p className="body-copy">
              Articles may be revised or updated over time as new information becomes available, as Santy continues his research, or as a piece is refined for clarity and accuracy. When appropriate, sources and citations may be listed at the bottom of an article.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
