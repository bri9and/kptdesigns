"use client";

import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function LenisProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // The v5-tunnel mockup runs its own scroll-bound R3F camera and sticky
  // section fades. Lenis's smooth-scroll wrapper changes body overflow on
  // mount which races with sticky positioning and causes a blank first paint.
  // Render bare on this route and let the engine talk to scroll directly.
  // The v2-cosmos mockup uses the same snap-to-station engine pattern and
  // hijacks wheel/touch input directly — Lenis would fight it.
  // Desert Coyote (sites + proposal) opts out — owner prefers native scroll.
  if (
    pathname?.startsWith("/mockup/v5-tunnel") ||
    pathname?.startsWith("/mockup/v2-cosmos") ||
    pathname?.startsWith("/sites/desert-coyote-landscape") ||
    pathname?.startsWith("/proposal/desert-coyote-landscape") ||
    pathname?.startsWith("/sites/lake-arthur") ||
    pathname?.startsWith("/proposal/lake-arthur")
  ) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
