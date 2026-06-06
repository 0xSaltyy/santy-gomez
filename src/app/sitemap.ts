import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/articles";
import { getPublishedProjects } from "@/lib/projects";
import { getPublishedUpdates } from "@/lib/updates";
import { absoluteUrl } from "@/lib/seo";

function latestDate(dates: Array<string | null | undefined>, fallback: Date) {
  const timestamps = dates.map((date) => (date ? new Date(date).getTime() : 0)).filter(Boolean);
  return timestamps.length ? new Date(Math.max(...timestamps)) : fallback;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, projects, updates] = await Promise.all([getPublishedArticles(), getPublishedProjects(), getPublishedUpdates()]);
  const now = new Date();
  const latestArticleDate = latestDate(articles.map((article) => article.updated_at || article.date), now);
  const latestProjectDate = latestDate(projects.map((project) => project.updated_at || project.date), now);
  const latestUpdateDate = latestDate(updates.map((update) => update.updated_at || update.date), now);

  const staticRoutes: MetadataRoute.Sitemap = [
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

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(`/articles/${article.slug}`),
    lastModified: article.updated_at ? new Date(article.updated_at) : new Date(article.date),
    changeFrequency: "monthly",
    priority: 0.8
  }));

  return [...staticRoutes, ...articleRoutes];
}
