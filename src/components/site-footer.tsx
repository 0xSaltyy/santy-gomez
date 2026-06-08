import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/60 bg-white/70 backdrop-blur-2xl">
      <div className="container-shell grid gap-6 py-8 text-sm text-ink/60 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="font-display font-bold text-ink/70">© 2026 Santy Gomez. All rights reserved.</p>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-ink/45">Nicolas Santiago Gomez Zambrano</p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-3">
          <Link href="/articles" className="animated-link text-sm text-ink/60 hover:text-forest">
            Articles
          </Link>
          <Link href="/updates" className="animated-link text-sm text-ink/60 hover:text-forest">
            Updates
          </Link>
          <Link href="/projects" className="animated-link text-sm text-ink/60 hover:text-forest">
            Projects
          </Link>
          <Link href="/contact" className="animated-link text-sm text-ink/60 hover:text-forest">
            Contact
          </Link>
          <Link href="/disclaimer" className="animated-link text-sm text-ink/60 hover:text-forest">
            Disclaimer
          </Link>
          <Link href="/editorial-policy" className="animated-link text-sm text-ink/60 hover:text-forest">
            Editorial Policy
          </Link>
          <Link href="/privacy-policy" className="animated-link text-sm text-ink/60 hover:text-forest">
            Privacy Policy
          </Link>
          <Link href="/site-map" className="animated-link text-sm text-ink/60 hover:text-forest">
            Site Map
          </Link>
          <Link href="/login" className="animated-link text-sm text-ink/60 hover:text-forest">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
