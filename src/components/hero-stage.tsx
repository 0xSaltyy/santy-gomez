"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { MagneticLink } from "@/components/magnetic-link";
import { smoothEase } from "@/lib/motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.12
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease: smoothEase }
  }
};

export function HeroStage() {
  return (
    <section className="relative min-h-[82vh] overflow-hidden bg-ink text-white">
      <img
        src="/santy-academic-hero.png"
        alt=""
        className="absolute inset-0 h-full w-full scale-[1.01] object-cover object-center blur-[0.5px]"
        decoding="async"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,24,25,0.88),rgba(23,24,25,0.62)_44%,rgba(23,24,25,0.16))]" />
      <div className="absolute inset-0 bg-cyan/10 mix-blend-soft-light" />
      <motion.div
        className="absolute right-[8%] top-28 hidden h-28 w-72 rounded-lg border border-white/20 bg-white/10 backdrop-blur-xl lg:block"
        animate={{ y: [0, 18, 0], rotate: [2, -1, 2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-[18%] hidden h-20 w-64 rounded-lg border border-cyan/30 bg-cyan/10 backdrop-blur-xl md:block"
        animate={{ y: [0, -14, 0], rotate: [-3, 1, -3] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container-shell relative z-10 flex min-h-[82vh] items-end pb-14 pt-32">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.35 }} className="max-w-4xl">
          <motion.p variants={item} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-display text-xs font-bold uppercase tracking-[0.2em] text-white/75 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-butter" aria-hidden="true" />
            Modern archive and essays
          </motion.p>
          <motion.h1 variants={item} className="mt-6 font-display text-6xl font-bold leading-none text-white sm:text-7xl lg:text-8xl">
            Santy <span className="accent-word block text-cyan sm:inline">Gomez</span>
          </motion.h1>
          <motion.p variants={item} className="mt-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-white/60 sm:tracking-[0.22em]">
            Nicolas Santiago Gomez Zambrano
          </motion.p>
          <motion.p variants={item} className="mt-7 max-w-[21rem] text-base leading-8 text-white/80 sm:max-w-2xl sm:text-xl">
            A stylish academic portfolio and personal publication for essays, projects, research interests, music, public policy, and carefully developing ideas.
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <MagneticLink href="/articles" className="button-primary bg-white text-ink hover:bg-white">
              Read Articles
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </MagneticLink>
            <MagneticLink href="/about" className="button-secondary border-white/30 bg-white/15 text-white hover:bg-white hover:text-ink">
              About Santy
            </MagneticLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
