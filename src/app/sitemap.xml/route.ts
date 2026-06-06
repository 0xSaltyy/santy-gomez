import { getPublishedArticles } from "@/lib/articles";
import { getPublishedProjects } from "@/lib/projects";
import { getPublishedUpdates } from "@/lib/updates";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function validDate(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function latestDate(dates: Array<string | null | undefined>, fallback: Date) {
  const timestamps = dates
    .map((date) => validDate(date)?.getTime() ?? 0)
    .filter((timestamp) => timestamp > 0);

  return timestamps.length ? new Date(Math.max(...timestamps)) : fallback;
}

function renderSitemap(entries: SitemapEntry[]) {
  const urls = entries
    .map(
      (entry) => `<url>
  <loc>${escapeXml(entry.url)}</loc>
  <lastmod>${entry.lastModified.toISOString()}</lastmod>
  <changefreq>${entry.changeFrequency}</changefreq>
  <priority>${entry.priority}</priority>
</url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export async function GET() {
  const [articles, projects, updates] = await Promise.all([getPublishedArticles(), getPublishedProjects(), getPublishedUpdates()]);
  const now = new Date();
  const latestArticleDate = latestDate(articles.map((article) => article.updated_at || article.date), now);
  const latestProjectDate = latestDate(projects.map((project) => project.updated_at || project.date), now);
  const latestUpdateDate = latestDate(updates.map((update) => update.updated_at || update.date), now);

  const staticRoutes: SitemapEntry[] = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/articles"), lastModified: latestArticleDate, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/projects"), lastModified: latestProjectDate, changeFrequency: "weekly", priority: 0.75 },
    { url: absoluteUrl("/updates"), lastModified: latestUpdateDate, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/disclaimer"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/editorial-policy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/privacy-policy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 }
  ];

  const articleRoutes: SitemapEntry[] = articles.map((article) => ({
    url: absoluteUrl(`/articles/${article.slug}`),
    lastModified: validDate(article.updated_at) ?? validDate(article.date) ?? now,
    changeFrequency: "monthly",
    priority: 0.8
  }));

  return new Response(renderSitemap([...staticRoutes, ...articleRoutes]), {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate"
    }
  });
}
