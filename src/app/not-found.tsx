import type { Metadata } from "next";
import { NotFoundCard } from "@/components/not-found-card";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Page Not Found",
  description: "The requested Santy Gomez website page could not be found.",
  path: "/404"
});

export default function NotFound() {
  return <NotFoundCard />;
}
