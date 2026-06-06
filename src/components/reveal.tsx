"use client";

import { motion } from "framer-motion";
import { smoothEase } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  scale?: boolean;
};

export function Reveal({ children, className, delay = 0, scale = false }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, scale: scale ? 0.96 : 1, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-80px", amount: 0.18 }}
      transition={{ duration: 0.68, delay, ease: smoothEase }}
    >
      {children}
    </motion.div>
  );
}
