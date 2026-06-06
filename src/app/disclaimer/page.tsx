import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Disclaimer"
};

export default function DisclaimerPage() {
  return (
    <section className="soft-band bg-paper/70 py-20">
      <div className="container-shell max-w-3xl">
        <Reveal>
          <p className="eyebrow">Legal</p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-tight text-ink sm:text-6xl">Disclaimer</h1>
          <div className="glass-panel mt-8 p-7">
            <p className="body-copy">
              The articles published on this website reflect the personal research, opinions, and academic interests of Santy Gomez. They are written for educational and informational purposes only. Nothing on this website should be taken as professional legal, medical, financial, or psychological advice.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
