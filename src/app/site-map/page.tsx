import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { getPublishedArticles } from "@/lib/articles";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: "Site Map",
  description: "A public HTML site map for the Santy Gomez website, with links to main pages and published articles.",
  path: "/site-map"
});

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Santy Gomez" },
  { href: "/articles", label: "Articles" },
  { href: "/projects", label: "Projects" },
  { href: "/updates", label: "Updates" },
  { href: "/contact", label: "Contact" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/editorial-policy", label: "Editorial Policy" },
  { href: "/privacy-policy", label: "Privacy Policy" }
];

export default async function SiteMapPage() {
  const articles = await getPublishedArticles();

  return (
    <section className="soft-band bg-paper/70 py-20">
      <div className="container-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Site Map</p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-tight text-ink sm:text-6xl">Public Pages</h1>
          <p className="body-copy mt-6">A simple crawlable directory of public pages and published articles on the Santy Gomez website.</p>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <section className="editorial-card p-6">
              <h2 className="font-display text-2xl font-bold text-ink">Main Pages</h2>
              <ul className="mt-5 space-y-3">
                {mainLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="animated-link font-display text-sm font-bold text-ink/65 hover:text-forest">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal delay={0.08}>
            <section className="editorial-card p-6">
              <h2 className="font-display text-2xl font-bold text-ink">Published Articles</h2>
              {articles.length ? (
                <ul className="mt-5 space-y-3">
                  {articles.map((article) => (
                    <li key={article.id}>
                      <Link href={`/articles/${article.slug}`} className="animated-link font-display text-sm font-bold text-ink/65 hover:text-forest">
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 text-sm leading-7 text-ink/60">Published article links will appear here when articles are available.</p>
              )}
            </section>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
