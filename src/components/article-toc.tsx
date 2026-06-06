"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ListTree } from "lucide-react";
import type { MarkdownHeading } from "@/lib/markdown";
import { smoothEase } from "@/lib/motion";

export function ArticleTableOfContents({ headings }: { headings: MarkdownHeading[] }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  if (!headings.length) {
    return null;
  }

  function handleClick(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    setOpen(false);
  }

  const list = (
    <ol className="mt-4 space-y-2">
      {headings.map((heading, index) => (
        <motion.li
          key={heading.id}
          initial={reduceMotion ? false : { opacity: 0, x: -8 }}
          animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.28, delay: index * 0.025, ease: smoothEase }}
        >
          <button
            type="button"
            onClick={() => handleClick(heading.id)}
            className={`group w-full rounded-md px-3 py-2 text-left text-sm leading-5 text-ink/65 transition hover:bg-white/75 hover:text-forest ${heading.level === 3 ? "pl-6 text-xs" : "font-display font-bold"}`}
          >
            <span className="bg-gradient-to-r from-forest to-cyan bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-all group-hover:bg-[length:100%_1px]">{heading.text}</span>
          </button>
        </motion.li>
      ))}
    </ol>
  );

  return (
    <section className="print:hidden">
      <div className="rounded-lg border border-white/70 bg-white/70 p-4 shadow-soft backdrop-blur-2xl lg:hidden">
        <button type="button" onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between gap-3 text-left">
          <span className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.14em] text-forest">
            <ListTree className="h-4 w-4" aria-hidden="true" />
            In this article
          </span>
          <ChevronDown className={`h-4 w-4 text-ink/45 transition ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
        {open ? list : null}
      </div>

      <motion.aside
        className="hidden rounded-lg border border-white/70 bg-white/70 p-4 shadow-soft backdrop-blur-2xl lg:block"
        initial={reduceMotion ? false : { opacity: 0, y: 14, filter: "blur(8px)" }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: smoothEase }}
      >
        <div className="flex items-center gap-2">
          <ListTree className="h-4 w-4 text-forest" aria-hidden="true" />
          <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-forest">In this article</p>
        </div>
        {list}
      </motion.aside>
    </section>
  );
}
