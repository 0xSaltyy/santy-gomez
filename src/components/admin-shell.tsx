import Link from "next/link";
import { BriefcaseBusiness, CalendarDays, FilePlus2, Gauge, GraduationCap, ListChecks, MessageSquare, Newspaper } from "lucide-react";
import { LogoutButton } from "@/components/logout-button";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: Gauge },
  { href: "/admin/articles/new", label: "New Article", icon: FilePlus2 },
  { href: "/admin/updates", label: "Updates", icon: CalendarDays },
  { href: "/admin/projects", label: "Projects", icon: BriefcaseBusiness },
  { href: "/admin/comments", label: "Comments", icon: MessageSquare },
  { href: "/admin/content", label: "About & Goals", icon: GraduationCap },
  { href: "/admin/interests", label: "Interests", icon: ListChecks },
  { href: "/articles", label: "Public Articles", icon: Newspaper }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="border-t border-line bg-paper">
      <div className="container-shell grid gap-8 py-10 lg:grid-cols-[250px_1fr]">
        <aside className="h-fit rounded-md border border-line bg-white p-4 shadow-sm">
          <div className="px-2 pb-4">
            <p className="eyebrow">Admin</p>
            <h1 className="mt-2 text-2xl font-semibold text-ink">Content Studio</h1>
          </div>
          <nav className="space-y-2" aria-label="Admin navigation">
            {adminLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-semibold text-ink/70 transition hover:bg-paper hover:text-forest">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-5 border-t border-line pt-4">
            <LogoutButton />
          </div>
        </aside>
        <div>{children}</div>
      </div>
    </section>
  );
}
