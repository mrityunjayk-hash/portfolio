"use client";

import { useEffect } from "react";

/**
 * Replays the hero's CSS entrance (letters, lines, fades) when the visitor
 * returns to it. The animations are reset only after the hero has fully left
 * the viewport, so normal scrolling within the hero never restarts them.
 */
export function HeroReplay({ targetId }: { targetId: string }) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const exit = new IntersectionObserver(([e]) => !e.isIntersecting && !el.classList.contains("hero-reset") && el.classList.add("hero-reset"), { threshold: 0 });
    const enter = new IntersectionObserver(([e]) => e.isIntersecting && el.classList.contains("hero-reset") && el.classList.remove("hero-reset"), { threshold: 0.35 });
    exit.observe(el);
    enter.observe(el);
    return () => {
      exit.disconnect();
      enter.disconnect();
    };
  }, [targetId]);

  return null;
}
