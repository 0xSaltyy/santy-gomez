import type { Metadata } from "next";
import { NotFoundCard } from "@/components/not-found-card";

export const metadata: Metadata = {
  title: "Page Not Found"
};

export default function NotFound() {
  return <NotFoundCard />;
}
