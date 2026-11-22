"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * True while an element is "on stage", for animations that should replay on
 * every visit. Uses hysteresis so nothing flickers at the viewport edge:
 * it turns on once the element is meaningfully visible (`enterMargin`), and
 * only turns off once the element has left the viewport entirely — so the
 * reset always happens off-screen, in either scroll direction.
 *
 * `onChange` fires on every transition, for components that keep their own
 * per-visit state.
 */
export function useReplayInView(
  ref: RefObject<Element | null>,
  { enterMargin = "0px 0px -15% 0px", onChange }: { enterMargin?: string; onChange?: (active: boolean) => void } = {},
) {
  const [active, setActive] = useState(false);
  const activeRef = useRef(false);
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = (next: boolean) => {
      if (activeRef.current === next) return;
      activeRef.current = next;
      setActive(next);
      onChangeRef.current?.(next);
    };
    const enter = new IntersectionObserver(([e]) => e.isIntersecting && set(true), {
      rootMargin: enterMargin,
      threshold: 0.05,
    });
    const exit = new IntersectionObserver(([e]) => !e.isIntersecting && set(false), { threshold: 0 });
    enter.observe(el);
    exit.observe(el);
    return () => {
      enter.disconnect();
      exit.disconnect();
    };
  }, [ref, enterMargin]);

  return active;
}
