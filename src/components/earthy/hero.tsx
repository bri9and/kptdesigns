import { BtnPrimary, BtnSecondary } from "@/components/earthy/button";

const DEFAULTS = {
  tagline:
    "Boutique websites for businesses that care about details. Hand-built, hosted with care, owned by you. From $500.",
  primaryCtaLabel: "See what we build",
  primaryCtaHref: "/#features",
  secondaryCtaLabel: "Start your project",
  secondaryCtaHref: "/start",
} as const;

export type EarthyHeroProps = {
  tagline?: string;
  /** @deprecated retained so Puck-saved props don't break; the search bar
   *  was removed per direction. Safe to leave undefined. */
  searchPlaceholder?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export function EarthyHero(props: EarthyHeroProps = {}) {
  const tagline = props.tagline ?? DEFAULTS.tagline;
  const primaryCtaLabel = props.primaryCtaLabel ?? DEFAULTS.primaryCtaLabel;
  const primaryCtaHref = props.primaryCtaHref ?? DEFAULTS.primaryCtaHref;
  const secondaryCtaLabel = props.secondaryCtaLabel ?? DEFAULTS.secondaryCtaLabel;
  const secondaryCtaHref = props.secondaryCtaHref ?? DEFAULTS.secondaryCtaHref;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-canvas to-brand-surface pt-40 pb-30 text-center">
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
            className="inline-block font-[family-name:var(--brand-display-font)] text-[clamp(5rem,12vw,9rem)] font-bold leading-none tracking-[-4px] text-brand-primary"
            style={{
              animation:
                "earthyLetterPop 0.6s var(--earthy-ease-bounce) 0.1s both",
            }}
          >
            K
          </span>
          <span
            className="inline-block font-[family-name:var(--brand-display-font)] text-[clamp(5rem,12vw,9rem)] font-bold leading-none tracking-[-4px] text-brand-accent-1"
            style={{
              animation:
                "earthyLetterPop 0.6s var(--earthy-ease-bounce) 0.25s both",
            }}
          >
            P
          </span>
          <span
            className="inline-block font-[family-name:var(--brand-display-font)] text-[clamp(5rem,12vw,9rem)] font-bold leading-none tracking-[-4px] text-brand-accent-2"
            style={{
              animation:
                "earthyLetterPop 0.6s var(--earthy-ease-bounce) 0.4s both",
            }}
          >
            T
          </span>
        </div>
        <p
          className="-mt-1 mb-5 font-[family-name:var(--brand-display-font)] text-[clamp(1rem,2.4vw,1.5rem)] font-semibold uppercase text-brand-accent-3"
          style={{
            letterSpacing: "0.42em",
            textIndent: "0.42em",
            animation: "earthyFadeUp 0.8s var(--earthy-ease) 0.6s both",
          }}
        >
          Designs
        </p>
        <p
          className="mx-auto mb-10 max-w-[640px] font-[family-name:var(--brand-body-font)] text-[clamp(1.15rem,2.4vw,1.45rem)] leading-[1.55] text-brand-text-strong"
          style={{
            animation: "earthyFadeUp 0.8s var(--earthy-ease) 0.6s both",
          }}
        >
          {tagline}
        </p>

        <div
          className="mt-10 mb-12 flex justify-center gap-2.5"
          style={{
            animation: "earthyFadeUp 0.8s var(--earthy-ease) 1s both",
          }}
        >
          <span
            className="h-3 w-3 rounded-full bg-brand-primary"
            style={{ animation: "earthyBounce 1.4s ease-in-out 0s infinite" }}
          />
          <span
            className="h-3 w-3 rounded-full bg-brand-accent-1"
            style={{
              animation: "earthyBounce 1.4s ease-in-out 0.15s infinite",
            }}
          />
          <span
            className="h-3 w-3 rounded-full bg-brand-accent-2"
            style={{
              animation: "earthyBounce 1.4s ease-in-out 0.3s infinite",
            }}
          />
          <span
            className="h-3 w-3 rounded-full bg-brand-accent-3"
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
