"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Shifts its children vertically as the element scrolls through the viewport.
 * `distance` is the total travel in px (negative moves up). Disabled for
 * reduced-motion users.
 */
export function Parallax({
  children,
  distance = -60,
  className,
  fade = false,
}: {
  children: React.ReactNode;
  distance?: number;
  className?: string;
  fade?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y, opacity: fade ? opacity : 1 }}>
      {children}
    </motion.div>
  );
}
