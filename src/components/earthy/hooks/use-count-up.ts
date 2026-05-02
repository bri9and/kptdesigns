"use client";

import { useEffect, useRef } from "react";

export function useCountUp(
  target: number,
  opts: { suffix?: string; duration?: number } = {}
) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const { suffix = "", duration = 1600 } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isDecimal = target % 1 !== 0;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          obs.unobserve(entry.target);
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            el.textContent = isDecimal
              ? current.toFixed(2) + suffix
              : Math.floor(current) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
            else
              el.textContent =
                (isDecimal ? target.toFixed(2) : target) + suffix;
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, suffix, duration]);

  return ref;
}
