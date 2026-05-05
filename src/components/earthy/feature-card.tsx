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
  /** Optional thumbnail (Linode-hosted customer photo). When set, replaces the icon tile. */
  imageSrc?: string;
};

const ACCENT_BG: Record<FeatureCardColor, string> = {
  orange: "bg-brand-primary",
  blue: "bg-brand-accent-1",
  amber: "bg-brand-accent-2",
  sage: "bg-brand-accent-3",
};

const ICON_TILE_BG: Record<FeatureCardColor, string> = {
  orange: "bg-brand-primary-soft",
  blue: "bg-brand-accent-1-soft",
  amber: "bg-brand-accent-2-soft",
  sage: "bg-brand-accent-3-soft",
};

const ICON_COLOR_CLASS: Record<FeatureCardColor, string> = {
  orange: "text-brand-primary",
  blue: "text-brand-accent-1",
  // Amber on light-amber bg uses #9A6B0F for contrast
  amber: "",
  sage: "text-brand-accent-3",
};

export function FeatureCard({
  Icon,
  color,
  title,
  body,
  cta,
  imageSrc,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-brand-divider bg-brand-canvas p-9",
        "transition-all duration-[350ms] ease-[var(--earthy-ease)]",
        "hover:-translate-y-1 hover:border-transparent hover:shadow-[var(--brand-shadow-hover)]"
      )}
    >
      <span
        className={cn(
          "absolute top-0 left-0 right-0 h-1 origin-left scale-x-0 transition-transform duration-[350ms] ease-[var(--earthy-ease)] group-hover:scale-x-100",
          ACCENT_BG[color]
        )}
      />
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt=""
          aria-hidden
          className="mb-5 h-32 w-full rounded-lg object-cover"
        />
      ) : (
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
      )}
      <h3 className="mb-2.5 font-[family-name:var(--brand-display-font)] text-[1.35rem] font-semibold text-brand-ink">
        {title}
      </h3>
      <p className="font-[family-name:var(--brand-body-font)] text-[0.95rem] leading-[1.65] text-brand-text">
        {body}
      </p>
      {cta && (
        <Link
          href={cta.href}
          className="mt-[18px] inline-block font-[family-name:var(--brand-display-font)] text-[13px] font-medium text-brand-primary transition-colors duration-200 hover:text-brand-primary-strong"
        >
          {cta.label} →
        </Link>
      )}
    </div>
  );
}
