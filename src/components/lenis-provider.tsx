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
  if (pathname?.startsWith("/mockup/v5-tunnel")) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
