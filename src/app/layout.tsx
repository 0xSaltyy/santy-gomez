import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AmbientBackdrop } from "@/components/ambient-backdrop";
import { BackToTopButton } from "@/components/back-to-top-button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

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
  title: {
    default: "Santy Gomez",
    template: "%s | Santy Gomez"
  },
  description: "A formal archive of articles, reflections, and projects by Santy Gomez."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} ${accentFont.variable}`}>
      <body className="min-h-screen antialiased">
        <AmbientBackdrop />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <BackToTopButton />
      </body>
    </html>
  );
}
