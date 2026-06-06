"use client";

import { motion } from "framer-motion";

export function AmbientBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -right-20 top-20 h-44 w-96 rotate-12 rounded-lg bg-cyan/20 blur-2xl"
        animate={{ x: [0, -26, 0], y: [0, 18, 0], rotate: [12, 9, 12] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[-7rem] top-[38rem] h-36 w-[28rem] -rotate-6 rounded-lg bg-lavender/20 blur-2xl"
        animate={{ x: [0, 30, 0], y: [0, -16, 0], rotate: [-6, -2, -6] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 left-1/2 h-28 w-[34rem] -translate-x-1/2 rotate-3 rounded-lg bg-blush/15 blur-2xl"
        animate={{ x: ["-50%", "-48%", "-50%"], y: [0, -18, 0], rotate: [3, 5, 3] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
