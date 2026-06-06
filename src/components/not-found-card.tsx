"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen, BriefcaseBusiness, Home, Sparkles } from "lucide-react";
import { MagneticLink } from "@/components/magnetic-link";
import { smoothEase } from "@/lib/motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.64, ease: smoothEase }
  }
};

export function NotFoundCard() {
  const reduceMotion = useReducedMotion();
  const motionProps = reduceMotion ? {} : { variants: container, initial: "hidden", animate: "show" };

  return (
    <section className="soft-band bg-paper/70 py-20">
      <div className="container-shell flex min-h-[68vh] items-center justify-center">
        <motion.div {...motionProps} className="relative w-full max-w-3xl rounded-lg border border-white/70 bg-white/70 p-8 text-center shadow-glow backdrop-blur-2xl sm:p-12">
          <motion.div
            className="absolute -right-8 -top-8 hidden h-28 w-48 rotate-6 rounded-lg border border-cyan/25 bg-cyan/15 blur-xl sm:block"
            animate={reduceMotion ? undefined : { y: [0, 10, 0], rotate: [4, -2, 4] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute -bottom-7 left-8 hidden h-20 w-44 -rotate-3 rounded-lg border border-lavender/30 bg-lavender/20 blur-xl sm:block"
            animate={reduceMotion ? undefined : { y: [0, -8, 0], rotate: [-3, 2, -3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <motion.div variants={reduceMotion ? undefined : item} className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-lg border border-cyan/30 bg-white/80 text-forest shadow-soft">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </motion.div>
          <motion.p variants={reduceMotion ? undefined : item} className="mt-6 font-display text-xs font-bold uppercase tracking-[0.2em] text-forest">
            404 · Santy Gomez
          </motion.p>
          <motion.h1 variants={reduceMotion ? undefined : item} className="mt-4 font-display text-5xl font-bold leading-tight text-ink sm:text-6xl">
            Seems like you got lost.
          </motion.h1>
          <motion.p variants={reduceMotion ? undefined : item} className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink/70">
            The page you’re looking for doesn’t exist, moved, or was never published.
          </motion.p>
          <motion.div variants={reduceMotion ? undefined : item} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MagneticLink href="/" className="button-primary">
              <Home className="h-4 w-4" aria-hidden="true" />
              Back Home
            </MagneticLink>
            <MagneticLink href="/articles" className="button-secondary">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              View Articles
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </MagneticLink>
            <MagneticLink href="/projects" className="button-secondary">
              <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
              View Projects
            </MagneticLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
