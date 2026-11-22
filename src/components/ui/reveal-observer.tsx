"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds `.is-visible` to every [data-reveal] element as it scrolls into view.
 * Elements are only hidden once the `js` class is present (see globals.css),
 * so the page is fully readable without JavaScript.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const pending = new Set(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));
    if (!("IntersectionObserver" in window)) {
      pending.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const reveal = (el: Element) => {
      el.classList.add("is-visible");
      io.unobserve(el);
      pending.delete(el as HTMLElement);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting || e.boundingClientRect.bottom < 0) reveal(e.target);
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    pending.forEach((el) => io.observe(el));

    // Backstop: a fast fling can carry an element from below the viewport to
    // above it between two frames without the observer ever seeing it, so
    // reveal anything that has already been scrolled past.
    let raf = 0;
    const onScroll = () => {
      if (raf || !pending.size) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        pending.forEach((el) => {
          if (el.getBoundingClientRect().bottom < 0) reveal(el);
        });
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
