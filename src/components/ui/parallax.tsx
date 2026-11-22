"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Moves its children as the element scrolls through (and out of) the
 * viewport. `distance` is the total vertical travel in px (negative moves up);
 * `fade` and `scaleTo` add an exit fade / scale. Disabled for reduced motion.
 */
export function Parallax({
  children,
  distance = -60,
  className,
  fade = false,
  scaleTo = 1,
}: {
  children: React.ReactNode;
  distance?: number;
  className?: string;
  fade?: boolean;
  scaleTo?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, scaleTo]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { y, opacity: fade ? opacity : 1, scale: scaleTo === 1 ? 1 : scale }}
    >
      {children}
    </motion.div>
  );
}
