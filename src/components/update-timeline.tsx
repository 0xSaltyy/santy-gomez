"use client";

import { motion } from "framer-motion";
import type { UpdateEntry } from "@/lib/database.types";
import { formatDate } from "@/lib/format";
import { smoothEase } from "@/lib/motion";

export function UpdateTimeline({ updates }: { updates: UpdateEntry[] }) {
  return (
    <div className="space-y-5">
      {updates.map((update, index) => (
        <motion.article
          key={update.id}
          className="grid gap-4 rounded-lg border border-white/70 bg-white/75 p-6 shadow-soft backdrop-blur-xl md:grid-cols-[170px_1fr]"
          initial={{ opacity: 0, x: -18, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: false, margin: "-80px", amount: 0.2 }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.5, delay: index * 0.04, ease: smoothEase }}
        >
          <div>
            <p className="text-sm font-semibold text-forest">{formatDate(update.date)}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">{update.category}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold leading-tight text-ink">{update.title}</h2>
            <p className="mt-3 text-base leading-7 text-ink/70">{update.summary}</p>
            <div className="mt-4 whitespace-pre-wrap border-l-2 border-forest/20 pl-4 text-sm leading-7 text-ink/60">{update.content}</div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
