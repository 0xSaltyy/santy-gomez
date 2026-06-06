import type { Metadata } from "next";

export const siteUrl = "https://www.santygomez.xyz";
export const siteName = "Santy Gomez";
export const formalName = "Nicolas Santiago Gomez Zambrano";

export const defaultDescription =
  "Santy Gomez, formally Nicolas Santiago Gomez Zambrano, is a student, writer, and emerging scholar publishing articles, projects, and academic reflections across science, law, politics, music, and culture.";

type SeoMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  tags?: string[];
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function createPageMetadata({ title, description, path = "/", type = "website", publishedTime, authors, tags }: SeoMetadataOptions): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url,
      siteName,
      type,
      publishedTime,
      authors,
      tags,
      locale: "en_US"
    },
    twitter: {
      card: "summary",
      title: `${title} | ${siteName}`,
      description
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true
      }
    }
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteName,
    alternateName: formalName,
    url: siteUrl,
    description: defaultDescription,
    knowsAbout: [
      "Molecular biology",
      "Neuroscience",
      "Disease research",
      "Public health",
      "Law",
      "Politics",
      "Environmental science",
      "Writing",
      "Music",
      "Culture"
    ]
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    alternateName: formalName,
    url: siteUrl,
    author: {
      "@type": "Person",
      name: siteName,
      alternateName: formalName
    },
    description: defaultDescription
  };
}
