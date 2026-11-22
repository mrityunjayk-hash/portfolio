"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Toggles `.is-visible` on every [data-reveal] element so its entrance plays
 * each time it comes into view, in either scroll direction.
 *
 * Hysteresis prevents flicker: the class is added once the element is
 * meaningfully on screen, and removed only after it has left the viewport
 * entirely — so the reset is never seen and nothing restarts while visible.
 * Elements are only hidden once the `js` class is present (see globals.css),
 * so the page is fully readable without JavaScript.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const enter = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting && !e.target.classList.contains("is-visible")) e.target.classList.add("is-visible");
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const exit = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (!e.isIntersecting && e.target.classList.contains("is-visible")) e.target.classList.remove("is-visible");
      },
      { threshold: 0 },
    );

    els.forEach((el) => {
      enter.observe(el);
      exit.observe(el);
    });

    return () => {
      enter.disconnect();
      exit.disconnect();
    };
  }, [pathname]);

  return null;
}
