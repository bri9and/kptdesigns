import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type FeatureCardColor = "orange" | "blue" | "amber" | "sage";

export type FeatureCardProps = {
  Icon: LucideIcon;
  color: FeatureCardColor;
  title: string;
  body: string;
  cta?: { href: string; label: string };
};

const ACCENT_BG: Record<FeatureCardColor, string> = {
  orange: "bg-earthy-orange",
  blue: "bg-earthy-blue",
  amber: "bg-earthy-amber",
  sage: "bg-earthy-sage",
};

const ICON_TILE_BG: Record<FeatureCardColor, string> = {
  orange: "bg-earthy-orange-light",
  blue: "bg-earthy-blue-light",
  amber: "bg-earthy-amber-light",
  sage: "bg-earthy-sage-light",
};

const ICON_COLOR_CLASS: Record<FeatureCardColor, string> = {
  orange: "text-earthy-orange",
  blue: "text-earthy-blue",
  // Amber on light-amber bg uses #9A6B0F for contrast
  amber: "",
  sage: "text-earthy-sage",
};

export function FeatureCard({
  Icon,
  color,
  title,
  body,
  cta,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-earthy-stone-200 bg-earthy-cream p-9",
        "transition-all duration-[350ms] ease-[var(--earthy-ease)]",
        "hover:-translate-y-1 hover:border-transparent hover:shadow-[var(--earthy-shadow-hover)]"
      )}
    >
      <span
        className={cn(
          "absolute top-0 left-0 right-0 h-1 origin-left scale-x-0 transition-transform duration-[350ms] ease-[var(--earthy-ease)] group-hover:scale-x-100",
          ACCENT_BG[color]
        )}
      />
      <div
        className={cn(
          "mb-5 flex h-12 w-12 items-center justify-center rounded-lg",
          ICON_TILE_BG[color],
          ICON_COLOR_CLASS[color]
        )}
        style={color === "amber" ? { color: "#9A6B0F" } : undefined}
      >
        <Icon size={24} strokeWidth={2} />
      </div>
      <h3 className="mb-2.5 font-[family-name:var(--font-earthy-display)] text-[1.35rem] font-semibold text-earthy-ink">
        {title}
      </h3>
      <p className="font-[family-name:var(--font-earthy-body)] text-[0.95rem] leading-[1.65] text-earthy-stone-600">
        {body}
      </p>
      {cta && (
        <Link
          href={cta.href}
          className="mt-[18px] inline-block font-[family-name:var(--font-earthy-display)] text-[13px] font-medium text-earthy-orange transition-colors duration-200 hover:text-earthy-orange-dark"
        >
          {cta.label} →
        </Link>
      )}
    </div>
  );
}
