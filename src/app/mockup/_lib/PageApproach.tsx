"use client";

import { useEffect, useState, type ReactNode } from "react";

// Page entrance — the page enters from depth (translateZ −1400, scaled down,
// blurred), accelerates toward the viewer, overshoots at ~82%, then settles
// into final view. Once the entrance is complete, all containing-block-
// creating styles (transform, filter, will-change) are dropped so the
// position:fixed HUDs and scroll-bound visuals inside each engine anchor to
// the viewport rather than to this wrapper.
export function PageApproach({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1250);
    return () => clearTimeout(t);
  }, []);
  return (
    <>
      <style>{css}</style>
      <div className={`page-approach${done ? " page-approach-done" : ""}`}>
        {children}
      </div>
    </>
  );
}

const css = `
  .page-approach {
    transform-origin: 50% 0%;
    animation: page-approach-in 1150ms cubic-bezier(0.22, 0.96, 0.32, 1) 1 normal;
    will-change: transform, opacity, filter;
  }
  .page-approach-done {
    animation: none;
    will-change: auto;
  }
  @keyframes page-approach-in {
    0% {
      opacity: 0;
      transform: perspective(1400px) translateZ(-1400px) scale(0.62);
      filter: blur(10px);
    }
    55% {
      opacity: 0.9;
      filter: blur(2.5px);
    }
    82% {
      opacity: 1;
      transform: perspective(1400px) translateZ(80px) scale(1.02);
      filter: blur(0);
    }
    100% {
      opacity: 1;
      transform: perspective(1400px) translateZ(0) scale(1);
      filter: blur(0);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .page-approach { animation: none; will-change: auto; }
  }
`;
