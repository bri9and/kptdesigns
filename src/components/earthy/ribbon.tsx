import Link from "next/link";
import {
  BarChart3,
  Cloud,
  Globe2,
  RefreshCcw,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type RibbonColor = "orange" | "blue" | "amber" | "sage";

export type RibbonItem = {
  href: string;
  label: string;
  color: RibbonColor;
  Icon: LucideIcon;
};

const DEFAULT_ITEMS: RibbonItem[] = [
  { href: "/#features", label: "Site Rebuild", color: "orange", Icon: RefreshCcw },
  { href: "/pricing", label: "Hosting", color: "blue", Icon: Cloud },
  { href: "/pricing", label: "Domains", color: "amber", Icon: Globe2 },
  { href: "/#showcase", label: "From Scratch", color: "sage", Icon: Sparkles },
  { href: "/#stats", label: "Analytics", color: "orange", Icon: BarChart3 },
  { href: "/contact", label: "Mobile-First", color: "blue", Icon: Smartphone },
];

const COLOR_BG: Record<RibbonColor, string> = {
  orange: "bg-earthy-orange",
  blue: "bg-earthy-blue",
  amber: "bg-earthy-amber",
  sage: "bg-earthy-sage",
};

export type EarthyRibbonProps = {
  items?: RibbonItem[];
};

export function EarthyRibbon({ items = DEFAULT_ITEMS }: EarthyRibbonProps = {}) {
  return (
    <section className="border-y border-earthy-stone-200 bg-earthy-cream py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-12">
          {items.map((item) => (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              className="group flex flex-col items-center gap-2.5 transition-transform duration-200 ease-[var(--earthy-ease)] hover:-translate-y-1"
            >
              <div
                className={cn(
                  "flex h-[52px] w-[52px] items-center justify-center rounded-full text-white shadow-[var(--earthy-shadow-sm)]",
                  COLOR_BG[item.color]
                )}
              >
                <item.Icon size={22} strokeWidth={2} />
              </div>
              <span className="font-[family-name:var(--font-earthy-display)] text-xs font-medium tracking-wide text-earthy-stone-600">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
