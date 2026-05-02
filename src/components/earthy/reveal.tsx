"use client";

import { useScrollReveal } from "./hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

export function RevealRoot() {
  useScrollReveal();
  return null;
}

export function Reveal({
  children,
  stagger,
  className,
}: {
  children: React.ReactNode;
  stagger?: 1 | 2 | 3 | 4;
  className?: string;
}) {
  const staggerCls = stagger ? `earthy-reveal-stagger-${stagger}` : "";
  return (
    <div className={cn("earthy-reveal", staggerCls, className)}>{children}</div>
  );
}
