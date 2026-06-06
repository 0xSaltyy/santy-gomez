"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BriefcaseBusiness, CalendarDays, LockKeyhole, Mail, Newspaper, UserRound } from "lucide-react";
import { smoothEase } from "@/lib/motion";

const navItems = [
  { href: "/about", label: "About", icon: UserRound },
  { href: "/articles", label: "Articles", icon: Newspaper },
  { href: "/updates", label: "Updates", icon: CalendarDays },
  { href: "/projects", label: "Projects", icon: BriefcaseBusiness },
  { href: "/contact", label: "Contact", icon: Mail },
  { href: "/login", label: "Admin", icon: LockKeyhole }
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <motion.header
      className="sticky top-0 z-40 border-b border-white/55 bg-paper/75 backdrop-blur-2xl"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: smoothEase }}
    >
      <div className="container-shell flex min-h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3">
          <motion.span
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink/10 bg-white/80 font-display text-sm font-bold text-forest shadow-sm backdrop-blur-xl transition group-hover:border-cyan/70"
            whileHover={{ rotate: -4, scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            SG
          </motion.span>
          <span className="hidden font-display text-sm font-bold uppercase tracking-[0.18em] text-ink sm:inline">Santy Gomez</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative inline-flex min-h-10 items-center justify-center gap-2 overflow-hidden rounded-lg px-3 font-display text-sm font-bold text-ink/65 transition hover:bg-white/75 hover:text-forest focus:outline-none focus:ring-2 focus:ring-cyan/30"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="hidden md:inline">{item.label}</span>
                {active ? (
                  <motion.span layoutId="nav-pill" className="absolute inset-x-2 bottom-1 h-0.5 rounded-full bg-gradient-to-r from-forest via-cyan to-lavender" />
                ) : (
                  <span className="absolute inset-x-2 bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-forest via-cyan to-lavender transition group-hover:scale-x-100" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}
