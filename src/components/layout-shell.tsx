"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { PageTransition } from "@/components/page-transition";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSitePage = pathname.startsWith("/sites/");
  const isAuthPage = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
  const isDashboard = pathname.startsWith("/dashboard");
  const isNeo = pathname.startsWith("/neo");
  const isLandman = pathname.startsWith("/landman");
  // v5-tunnel mockup runs its own fixed canvas + HUD chrome — render bare so the
  // global header doesn't compete with the in-tunnel navigation.
  const isTunnelMockup = pathname.startsWith("/mockup/v5-tunnel");
  // v2-cosmos mockup uses the same snap-to-station engine pattern with its own
  // fixed backdrop + HUD chrome — opt out of the global header for the same reason.
  const isCosmosMockup = pathname.startsWith("/mockup/v2-cosmos");
  // touchdesign is a 100vh canvas (operator network) with its own toolbar.
  const isTouchDesign = pathname.startsWith("/projects/touchdesign");

  if (isSitePage || isAuthPage || isDashboard || isNeo || isLandman || isTunnelMockup || isCosmosMockup || isTouchDesign) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
