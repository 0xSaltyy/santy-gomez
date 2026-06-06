"use client";

import { motion } from "framer-motion";
import type { AcademicInterest } from "@/lib/database.types";
import { smoothEase } from "@/lib/motion";

export function InterestGrid({ interests }: { interests: AcademicInterest[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {interests.map((interest, index) => (
        <motion.article
          key={interest.id}
          className="group relative overflow-hidden rounded-lg border border-white/70 bg-white/70 p-5 shadow-soft backdrop-blur-xl"
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, margin: "-80px", amount: 0.2 }}
          whileHover={{ y: -6, scale: 1.012 }}
          transition={{ duration: 0.48, delay: index * 0.035, ease: smoothEase }}
        >
          <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-blush via-butter to-cyan transition duration-500 group-hover:scale-x-100" />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{String(interest.display_order).padStart(2, "0")}</p>
          <h3 className="mt-4 font-display text-xl font-bold text-ink">{interest.title}</h3>
          <p className="mt-3 text-sm leading-7 text-ink/70">{interest.description}</p>
        </motion.article>
      ))}
    </div>
  );
}
