"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/lib/database.types";
import { formatDate } from "@/lib/format";
import { smoothEase } from "@/lib/motion";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <motion.article
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-lg border border-white/70 bg-white/75 p-6 shadow-soft backdrop-blur-xl"
      initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-80px", amount: 0.18 }}
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ duration: 0.5, ease: smoothEase }}
    >
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-forest via-cyan to-lavender transition duration-500 group-hover:scale-x-100" />
      <div className="absolute -right-16 -top-16 h-32 w-48 rotate-12 rounded-lg bg-cyan/15 blur-2xl transition duration-500 group-hover:bg-lavender/20" />
      <div>
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink/55">
          <span className="text-forest">{article.category}</span>
          <span>{formatDate(article.date)}</span>
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-ink">{article.title}</h2>
        <p className="mt-4 text-base leading-7 text-ink/70">{article.preview}</p>
      </div>
      <Link href={`/articles/${article.slug}`} className="animated-link mt-7 text-sm">
        Read More
        <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </motion.article>
  );
}
