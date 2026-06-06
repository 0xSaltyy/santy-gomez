import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact"
};

const links = [
  { label: "Email", href: "mailto:nicolas.gomez@example.com" },
  { label: "LinkedIn", href: "#" },
  { label: "Projects", href: "#" }
];

export default function ContactPage() {
  return (
    <section className="soft-band bg-paper/70 py-20">
      <div className="container-shell max-w-4xl">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-tight text-ink sm:text-6xl">Contact and Links</h1>
          <p className="body-copy mt-6">Professional contact information, public profiles, and selected project links for Santy Gomez.</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 grid gap-4 sm:grid-cols-3">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="group editorial-card p-6 hover:-translate-y-1 hover:shadow-glow">
              <div className="flex items-center justify-between">
                <Mail className="h-5 w-5 text-forest" aria-hidden="true" />
                <ArrowUpRight className="h-4 w-4 text-ink/35 transition group-hover:text-forest" aria-hidden="true" />
              </div>
              <h2 className="mt-6 font-display text-lg font-bold text-ink">{link.label}</h2>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
