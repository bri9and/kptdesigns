"use client";

interface LogoProps {
  variant?: "full" | "mark" | "icon";
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { kpt: "text-lg", sub: "text-[9px]", gap: "gap-0", subTracking: "tracking-[0.18em]" },
  md: { kpt: "text-2xl", sub: "text-[11px]", gap: "gap-0.5", subTracking: "tracking-[0.18em]" },
  lg: { kpt: "text-4xl", sub: "text-sm", gap: "gap-1", subTracking: "tracking-[0.2em]" },
};

const KPT_COLORS = {
  k: "var(--terracotta, #C56738)",
  p: "var(--fern, #7BA15A)",
  t: "var(--cornflower, #5B8FB9)",
};

export function Logo({ variant = "full", className, size = "md" }: LogoProps) {
  const s = sizes[size];

  if (variant === "icon") {
    return (
      <span
        className={`inline-flex items-center justify-center font-bold ${s.kpt} leading-none select-none ${className ?? ""}`}
        style={{ color: KPT_COLORS.k }}
        aria-label="KPT Designs"
      >
        K
      </span>
    );
  }

  return (
    <span
      className={`inline-flex flex-col ${s.gap} select-none ${className ?? ""}`}
      aria-label="KPT Designs"
    >
      <span className={`font-bold ${s.kpt} leading-none flex items-baseline`}>
        <span style={{ color: KPT_COLORS.k }}>K</span>
        <span style={{ color: KPT_COLORS.p }}>P</span>
        <span style={{ color: KPT_COLORS.t }}>T</span>
      </span>
      {variant === "full" && (
        <span className={`font-medium text-foreground/55 ${s.sub} ${s.subTracking} uppercase leading-none mt-0.5`}>
          Designs
        </span>
      )}
    </span>
  );
}

export function LogoIcon({ className }: { className?: string }) {
  return <Logo variant="icon" size="md" className={className} />;
}
