import type { ReactNode } from "react";
import { BtnPrimary, BtnSecondary } from "@/components/earthy/button";
import { BrowserFrame } from "@/components/earthy/browser-frame";
import { SectionLabel } from "@/components/earthy/section-label";
import { cn } from "@/lib/utils";

type ShowcaseCta = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

export type ShowcaseRowProps = {
  label: string;
  title: string;
  body: string;
  cta: ShowcaseCta;
  visualUrl: string;
  visual: ReactNode;
  reverse?: boolean;
};

export function ShowcaseRow({
  label,
  title,
  body,
  cta,
  visualUrl,
  visual,
  reverse,
}: ShowcaseRowProps) {
  const Btn = cta.variant === "secondary" ? BtnSecondary : BtnPrimary;
  return (
    <div className="grid grid-cols-1 items-center gap-20 md:grid-cols-2">
      <div className={cn(reverse && "md:order-2")}>
        <SectionLabel className="mb-4">{label}</SectionLabel>
        <h2 className="mb-5 font-[family-name:var(--font-earthy-display)] text-[clamp(1.6rem,3vw,2.25rem)] font-bold text-earthy-ink">
          {title}
        </h2>
        <p className="mb-7 font-[family-name:var(--font-earthy-body)] text-[1.05rem] leading-relaxed text-earthy-stone-600">
          {body}
        </p>
        <Btn href={cta.href}>{cta.label}</Btn>
      </div>
      <div className={cn(reverse && "md:order-1")}>
        <BrowserFrame url={visualUrl}>{visual}</BrowserFrame>
      </div>
    </div>
  );
}

const BAR_HEIGHTS = [65, 85, 50, 95, 72, 58];
const BAR_COLORS = [
  "bg-earthy-orange",
  "bg-earthy-blue",
  "bg-earthy-amber",
  "bg-earthy-sage",
  "bg-earthy-orange",
  "bg-earthy-blue",
];

export function BarChartVisual() {
  return (
    <div className="flex h-40 items-end gap-3.5">
      {BAR_HEIGHTS.map((height, i) => (
        <div
          key={i}
          className={cn(
            "w-9 origin-bottom rounded-t-md",
            BAR_COLORS[i]
          )}
          style={{
            height: `${height}%`,
            animation: `earthyGrowBar 1.2s var(--earthy-ease) ${i * 0.1 + 0.1}s both`,
          }}
        />
      ))}
    </div>
  );
}

export function CircleRingVisual({ centerText }: { centerText: string }) {
  return (
    <div className="relative h-[200px] w-[200px]">
      <div
        className="h-[200px] w-[200px] rounded-full"
        style={{
          background:
            "conic-gradient(var(--color-earthy-orange) 0deg 120deg, var(--color-earthy-blue) 120deg 210deg, var(--color-earthy-amber) 210deg 280deg, var(--color-earthy-sage) 280deg 360deg)",
          animation: "earthySpinIn 1.5s var(--earthy-ease) both",
        }}
      />
      <div className="absolute inset-10 rounded-full bg-earthy-sand" />
      <div className="absolute inset-0 z-10 flex items-center justify-center font-[family-name:var(--font-earthy-display)] text-3xl font-bold text-earthy-ink">
        {centerText}
      </div>
    </div>
  );
}
