"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { ArrowLeft, Copy, Printer } from "lucide-react";
import { smoothEase } from "@/lib/motion";

type ArticleRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function ArticleReveal({ children, className = "", delay = 0 }: ArticleRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-90px", amount: 0.18 }}
      transition={{ duration: 0.62, delay, ease: smoothEase }}
    >
      {children}
    </motion.div>
  );
}

export function ReadingProgressBar() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (reduceMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1 bg-transparent print:hidden">
      <motion.div className="h-full origin-left bg-gradient-to-r from-forest via-cyan to-lavender" style={{ scaleX: scrollYProgress }} />
    </div>
  );
}

export function KeywordPills({ keywords }: { keywords: string[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mt-8 flex flex-wrap gap-2">
      {keywords.map((keyword, index) => (
        <motion.span
          key={keyword}
          className="rounded-full border border-cyan/35 bg-white/75 px-3 py-1 font-display text-xs font-bold text-forest shadow-sm backdrop-blur-xl"
          initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.96 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.38, delay: index * 0.045, ease: smoothEase }}
        >
          {keyword}
        </motion.span>
      ))}
    </div>
  );
}

export function ArticleTools() {
  async function copyArticleLink() {
    await navigator.clipboard?.writeText(window.location.href);
  }

  return (
    <div className="print:hidden">
      <div className="flex flex-wrap gap-2 rounded-lg border border-white/70 bg-white/70 p-3 shadow-soft backdrop-blur-2xl lg:w-52 lg:flex-col">
        <motion.button
          type="button"
          className="button-secondary min-h-10 px-3 py-2 text-xs"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.print()}
        >
          <Printer className="h-4 w-4" aria-hidden="true" />
          Print / PDF
        </motion.button>
        <motion.button type="button" className="button-secondary min-h-10 px-3 py-2 text-xs" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={copyArticleLink}>
          <Copy className="h-4 w-4" aria-hidden="true" />
          Copy Link
        </motion.button>
        <motion.div whileHover={{ x: -2 }} whileTap={{ scale: 0.98 }}>
          <Link href="/articles" className="button-secondary min-h-10 w-full px-3 py-2 text-xs">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
