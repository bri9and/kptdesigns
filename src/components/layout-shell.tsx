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

  if (isSitePage || isAuthPage || isDashboard || isNeo) {
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
