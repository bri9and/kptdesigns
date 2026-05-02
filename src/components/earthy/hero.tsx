"use client";

import { Search } from "lucide-react";
import { BtnPrimary, BtnSecondary } from "@/components/earthy/button";
import { useTypingCycle } from "@/components/earthy/hooks/use-typing-cycle";

const SUGGESTIONS = [
  "Modernize my dental practice site",
  "Redesign my outdated bakery website",
  "Move my Wix site to something I own",
  "Add online booking to my barber shop",
  "Build a landing page for my law firm",
  "Rebuild my Facebook-only business as a real site",
];

const DEFAULTS = {
  tagline:
    "Boutique websites for businesses that care about details. Hand-built, hosted with care, owned by you. From $500.",
  searchPlaceholder: "Search for anything...",
  primaryCtaLabel: "See what we build",
  primaryCtaHref: "/#features",
  secondaryCtaLabel: "Start your project",
  secondaryCtaHref: "/start",
} as const;

export type EarthyHeroProps = {
  tagline?: string;
  searchPlaceholder?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export function EarthyHero(props: EarthyHeroProps = {}) {
  const tagline = props.tagline ?? DEFAULTS.tagline;
  const searchPlaceholder = props.searchPlaceholder ?? DEFAULTS.searchPlaceholder;
  const primaryCtaLabel = props.primaryCtaLabel ?? DEFAULTS.primaryCtaLabel;
  const primaryCtaHref = props.primaryCtaHref ?? DEFAULTS.primaryCtaHref;
  const secondaryCtaLabel = props.secondaryCtaLabel ?? DEFAULTS.secondaryCtaLabel;
  const secondaryCtaHref = props.secondaryCtaHref ?? DEFAULTS.secondaryCtaHref;

  const inputRef = useTypingCycle(SUGGESTIONS);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-earthy-cream to-earthy-sand pt-40 pb-30 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{
          top: "-200px",
          width: "800px",
          height: "800px",
          background:
            "radial-gradient(circle, rgba(197,103,56,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-7 inline-flex items-baseline gap-1">
          <span
            className="inline-block font-[family-name:var(--font-earthy-display)] text-[clamp(5rem,12vw,9rem)] font-bold leading-none tracking-[-4px] text-earthy-orange"
            style={{
              animation:
                "earthyLetterPop 0.6s var(--earthy-ease-bounce) 0.1s both",
            }}
          >
            K
          </span>
          <span
            className="inline-block font-[family-name:var(--font-earthy-display)] text-[clamp(5rem,12vw,9rem)] font-bold leading-none tracking-[-4px] text-earthy-blue"
            style={{
              animation:
                "earthyLetterPop 0.6s var(--earthy-ease-bounce) 0.25s both",
            }}
          >
            P
          </span>
          <span
            className="inline-block font-[family-name:var(--font-earthy-display)] text-[clamp(5rem,12vw,9rem)] font-bold leading-none tracking-[-4px] text-earthy-amber"
            style={{
              animation:
                "earthyLetterPop 0.6s var(--earthy-ease-bounce) 0.4s both",
            }}
          >
            T
          </span>
        </div>
        <p
          className="-mt-1 mb-5 font-[family-name:var(--font-earthy-display)] text-[clamp(1rem,2.4vw,1.5rem)] font-semibold uppercase text-earthy-sage"
          style={{
            letterSpacing: "0.42em",
            textIndent: "0.42em",
            animation: "earthyFadeUp 0.8s var(--earthy-ease) 0.6s both",
          }}
        >
          Designs
        </p>
        <p
          className="mx-auto mb-10 max-w-[640px] font-[family-name:var(--font-earthy-body)] text-[clamp(1.15rem,2.4vw,1.45rem)] leading-[1.55] text-earthy-stone-700"
          style={{
            animation: "earthyFadeUp 0.8s var(--earthy-ease) 0.6s both",
          }}
        >
          {tagline}
        </p>

        <form
          action="/start"
          method="get"
          className="mx-auto mb-12 max-w-[580px]"
          style={{
            animation: "earthyFadeUp 0.8s var(--earthy-ease) 0.8s both",
          }}
        >
          <div className="flex items-center rounded-full border border-earthy-stone-300 bg-earthy-cream py-1.5 pr-2 pl-6 shadow-[var(--earthy-shadow-sm)] transition-all duration-300 hover:border-transparent hover:shadow-[var(--earthy-shadow-md)] focus-within:border-transparent focus-within:shadow-[var(--earthy-shadow-md)]">
            <Search className="mr-3.5 h-5 w-5 flex-shrink-0 text-earthy-stone-500" />
            <input
              ref={inputRef}
              name="url"
              type="text"
              placeholder={searchPlaceholder}
              className="flex-1 border-none bg-transparent py-2.5 font-[family-name:var(--font-earthy-body)] text-base text-earthy-ink outline-none placeholder:text-earthy-stone-600"
            />
            <button
              type="submit"
              className="flex-shrink-0 cursor-pointer rounded-full border-none bg-earthy-orange px-6 py-2.5 font-[family-name:var(--font-earthy-display)] text-sm font-medium text-earthy-cream transition-all duration-200 hover:bg-earthy-orange-dark hover:shadow-[0_2px_8px_rgba(197,103,56,0.35)]"
            >
              Get Started
            </button>
          </div>
        </form>

        <div
          className="mb-12 flex justify-center gap-2.5"
          style={{
            animation: "earthyFadeUp 0.8s var(--earthy-ease) 1s both",
          }}
        >
          <span
            className="h-3 w-3 rounded-full bg-earthy-orange"
            style={{ animation: "earthyBounce 1.4s ease-in-out 0s infinite" }}
          />
          <span
            className="h-3 w-3 rounded-full bg-earthy-blue"
            style={{
              animation: "earthyBounce 1.4s ease-in-out 0.15s infinite",
            }}
          />
          <span
            className="h-3 w-3 rounded-full bg-earthy-amber"
            style={{
              animation: "earthyBounce 1.4s ease-in-out 0.3s infinite",
            }}
          />
          <span
            className="h-3 w-3 rounded-full bg-earthy-sage"
            style={{
              animation: "earthyBounce 1.4s ease-in-out 0.45s infinite",
            }}
          />
        </div>

        <div
          className="flex flex-wrap justify-center gap-3.5"
          style={{
            animation: "earthyFadeUp 0.8s var(--earthy-ease) 1.1s both",
          }}
        >
          <BtnPrimary href={primaryCtaHref}>{primaryCtaLabel}</BtnPrimary>
          <BtnSecondary href={secondaryCtaHref}>{secondaryCtaLabel}</BtnSecondary>
        </div>
      </div>
    </section>
  );
}
