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
  /** When set, the right column shows this image instead of the procedural visual.
   *  Used for AI-generated customer previews where we have real photos. */
  imageSrc?: string;
  imageAlt?: string;
  /** Fallback visual props (used when imageSrc is empty — KPT marketing). */
  visualUrl?: string;
  visual?: ReactNode;
  reverse?: boolean;
};

export function ShowcaseRow({
  label,
  title,
  body,
  cta,
  imageSrc,
  imageAlt,
  visualUrl,
  visual,
  reverse,
}: ShowcaseRowProps) {
  const Btn = cta.variant === "secondary" ? BtnSecondary : BtnPrimary;
  return (
    <div className="grid grid-cols-1 items-center gap-20 md:grid-cols-2">
      <div className={cn(reverse && "md:order-2")}>
        <SectionLabel className="mb-4">{label}</SectionLabel>
        <h2 className="mb-5 font-[family-name:var(--brand-display-font)] text-[clamp(1.6rem,3vw,2.25rem)] font-bold text-brand-ink">
          {title}
        </h2>
        <p className="mb-7 font-[family-name:var(--brand-body-font)] text-[1.05rem] leading-relaxed text-brand-text">
          {body}
        </p>
        <Btn href={cta.href}>{cta.label}</Btn>
      </div>
      <div className={cn(reverse && "md:order-1")}>
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={imageAlt ?? ""}
            className="aspect-[4/3] w-full rounded-2xl border border-brand-divider object-cover shadow-[var(--brand-shadow-lg)]"
          />
        ) : visual ? (
          <BrowserFrame url={visualUrl ?? ""}>{visual}</BrowserFrame>
        ) : null}
      </div>
    </div>
  );
}

const BAR_HEIGHTS = [65, 85, 50, 95, 72, 58];
const BAR_COLORS = [
  "bg-brand-primary",
  "bg-brand-accent-1",
  "bg-brand-accent-2",
  "bg-brand-accent-3",
  "bg-brand-primary",
  "bg-brand-accent-1",
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
            "conic-gradient(var(--brand-primary) 0deg 120deg, var(--brand-accent-1) 120deg 210deg, var(--brand-accent-2) 210deg 280deg, var(--brand-accent-3) 280deg 360deg)",
          animation: "earthySpinIn 1.5s var(--earthy-ease) both",
        }}
      />
      <div className="absolute inset-10 rounded-full bg-brand-surface" />
      <div className="absolute inset-0 z-10 flex items-center justify-center font-[family-name:var(--brand-display-font)] text-3xl font-bold text-brand-ink">
        {centerText}
      </div>
    </div>
  );
}
