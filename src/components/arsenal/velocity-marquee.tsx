"use client";

import { useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

/**
 * A slow horizontal marquee that drifts on its own and speeds up (and changes
 * direction) with the visitor's scroll. Pauses on hover; static for reduced motion.
 */
export function VelocityMarquee({ children, baseSpeed = 28 }: { children: React.ReactNode; baseSpeed?: number }) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const x = useMotionValue(0);
  const direction = useRef(-1);

  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 });
  const boost = useTransform(velocity, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });

  useAnimationFrame((_, delta) => {
    if (reduce || paused || !trackRef.current) return;
    const half = trackRef.current.scrollWidth / 2;
    if (!half) return;
    const b = boost.get();
    if (b < -0.05) direction.current = 1;
    else if (b > 0.05) direction.current = -1;
    const speed = baseSpeed * (1 + Math.abs(b));
    let next = x.get() + direction.current * speed * (delta / 1000);
    if (next <= -half) next += half;
    if (next > 0) next -= half;
    x.set(next);
  });

  return (
    <div onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <motion.div ref={trackRef} className="flex w-max" style={{ x }}>
        {children}
        {children}
      </motion.div>
    </div>
  );
}
