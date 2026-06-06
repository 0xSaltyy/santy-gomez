import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AmbientBackdrop } from "@/components/ambient-backdrop";
import { BackToTopButton } from "@/components/back-to-top-button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { defaultDescription, personJsonLd, siteName, siteUrl, websiteJsonLd } from "@/lib/seo";

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const accentFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Santy Gomez | Nicolas Santiago Gomez Zambrano",
    template: `%s | ${siteName}`
  },
  description: defaultDescription,
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    title: "Santy Gomez | Nicolas Santiago Gomez Zambrano",
    description: defaultDescription,
    url: siteUrl,
    siteName,
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary",
    title: "Santy Gomez | Nicolas Santiago Gomez Zambrano",
    description: defaultDescription
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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} ${accentFont.variable}`}>
      <body className="min-h-screen antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
        <AmbientBackdrop />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <BackToTopButton />
      </body>
    </html>
  );
}
