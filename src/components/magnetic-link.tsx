"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";

type MagneticLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function MagneticLink({ href, children, className = "" }: MagneticLinkProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.12);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.97 }}
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}
