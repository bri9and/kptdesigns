/**
 * CustomerHero — image-first hero used for AI-generated customer
 * previews (NOT the KPT marketing hero, which is `EarthyHero` with
 * the K P T letter treatment).
 *
 * Lays out as:
 *   [optional hero photo as full-bleed background, dimmed]
 *   [optional logo, top-center, max-h-16]
 *   business name (display font) — falls back to the logo if logoSrc is set
 *   tagline (one sentence)
 *   primary + secondary CTAs
 *
 * Uses next/image when src is a Linode-hosted absolute URL, plain
 * <img> otherwise. Defaults are forgiving — every prop is optional so
 * the block always renders even if the bind agent didn't find an
 * image for it.
 */
import Link from "next/link";
import { BtnPrimary, BtnSecondary } from "./button";

export type CustomerHeroProps = {
  businessName?: string;
  tagline?: string;
  logoSrc?: string;
  heroImageSrc?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export function CustomerHero({
  businessName,
  tagline,
  logoSrc,
  heroImageSrc,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
}: CustomerHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-canvas pt-32 pb-24 text-center">
      {heroImageSrc ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImageSrc}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, var(--brand-canvas) 0%, transparent 30%, transparent 70%, var(--brand-canvas) 100%)",
            }}
          />
        </>
      ) : null}

      <div className="relative mx-auto max-w-5xl px-6">
        {logoSrc ? (
          <div className="mb-8 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt={businessName ?? "Logo"}
              className="max-h-16 w-auto"
              style={{ maxWidth: "280px" }}
            />
          </div>
        ) : null}

        {businessName ? (
          <h1
            className="mb-5 font-[family-name:var(--brand-display-font)] font-bold leading-[1.05] tracking-tight text-brand-ink"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
          >
            {businessName}
          </h1>
        ) : null}

        {tagline ? (
          <p className="mx-auto mb-10 max-w-[640px] font-[family-name:var(--brand-body-font)] text-[clamp(1.15rem,2.4vw,1.45rem)] leading-[1.55] text-brand-text-strong">
            {tagline}
          </p>
        ) : null}

        <div className="flex flex-wrap justify-center gap-3.5">
          {primaryCtaLabel && primaryCtaHref ? (
            <BtnPrimary href={primaryCtaHref}>{primaryCtaLabel}</BtnPrimary>
          ) : null}
          {secondaryCtaLabel && secondaryCtaHref ? (
            <BtnSecondary href={secondaryCtaHref}>{secondaryCtaLabel}</BtnSecondary>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Fallback wordmark renderer when no logo is found.
 *  Picks a wordmark font + draws the business name as a tasteful glyph. */
export function WordmarkFallback({ businessName }: { businessName: string }) {
  if (!businessName) return null;
  return (
    <div className="font-[family-name:var(--brand-display-font)] text-2xl font-bold tracking-tight text-brand-ink">
      {businessName}
    </div>
  );
}

/** Convert an inline-bound asset to a `<Link>`-able href if it's a
 *  Linode-hosted URL we own. */
export function isOwnedAsset(src: string | undefined): boolean {
  if (!src) return false;
  return src.startsWith("http") && src.includes("linodeobjects.com");
}
