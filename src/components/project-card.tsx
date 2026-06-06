"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/database.types";
import { formatDate } from "@/lib/format";
import { smoothEase } from "@/lib/motion";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-white/70 bg-white/75 shadow-soft backdrop-blur-xl"
      initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-80px", amount: 0.18 }}
      whileHover={{ y: -8, rotate: -0.25 }}
      transition={{ duration: 0.5, ease: smoothEase }}
    >
      <div className="absolute inset-0 rounded-lg opacity-0 transition duration-500 group-hover:opacity-100" style={{ background: "linear-gradient(135deg, rgba(157,223,236,0.24), transparent 30%, rgba(201,184,255,0.22))" }} />
      {project.image_url ? <img src={project.image_url} alt="" className="aspect-[16/9] w-full object-cover" /> : null}
      <div className="relative flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink/50">
          <span className="text-forest">{project.category}</span>
          <span>{formatDate(project.date)}</span>
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-ink">{project.title}</h2>
        <p className="mt-4 flex-1 text-base leading-7 text-ink/70">{project.description}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <span className="status-pill">{project.project_status}</span>
          {project.link_url ? (
            <Link href={project.link_url} target="_blank" rel="noreferrer" className="animated-link text-sm">
              View
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
