/**
 * Puck schema for the earthy block library.
 *
 * Every section component the AI is allowed to compose into a
 * generated site lives here. This file is the single source of
 * truth for:
 *   1. What the AI can produce (the JSON tree shape)
 *   2. What the editor can drop in
 *   3. What the renderer knows how to draw
 *
 * Adding a new block:
 *   - Build the underlying React component under src/components/earthy/
 *   - Register it here under `components.<BlockName>` with its fields,
 *     defaultProps, and a render function that maps Puck props → component props
 *   - It becomes available to the AI prompt automatically (see
 *     src/lib/ai/site-generator.ts)
 */
import type { Config } from "@measured/puck";

import {
  RefreshCcw,
  Sparkles,
  Globe2,
  Code2,
  ShieldCheck,
  FileText,
  Search,
  Cloud,
  LayoutGrid,
  BarChart3,
  Smartphone,
  Heart,
  Users,
  Hammer,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { EarthyHero } from "@/components/earthy/hero";
import { EarthyRibbon } from "@/components/earthy/ribbon";
import { FeatureGrid } from "@/components/earthy/feature-grid";
import type { FeatureCardProps } from "@/components/earthy/feature-card";
import {
  ShowcaseRow,
  BarChartVisual,
  CircleRingVisual,
} from "@/components/earthy/showcase-row";
import { StatsSection } from "@/components/earthy/stats-section";
import { LogoCloud } from "@/components/earthy/logo-cloud";
import { QuoteCard } from "@/components/earthy/quote-card";
import { CtaSection } from "@/components/earthy/cta-section";
import { SectionLabel } from "@/components/earthy/section-label";
import { Reveal, RevealRoot } from "@/components/earthy/reveal";

/* ------------------------------------------------------------------ */
/* Icon registry — Puck fields are JSON, so we accept icon NAMES and  */
/* resolve to LucideIcon components at render time.                   */
/* ------------------------------------------------------------------ */

export const ICON_REGISTRY = {
  RefreshCcw,
  Sparkles,
  Globe2,
  Code2,
  ShieldCheck,
  FileText,
  Search,
  Cloud,
  LayoutGrid,
  BarChart3,
  Smartphone,
  Heart,
  Users,
  Hammer,
  Mail,
  Phone,
  MapPin,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICON_REGISTRY;
export const ICON_NAMES = Object.keys(ICON_REGISTRY) as IconName[];

const resolveIcon = (name: string): LucideIcon =>
  (ICON_REGISTRY as Record<string, LucideIcon>)[name] ?? Sparkles;

const COLOR_OPTIONS = [
  { label: "Orange", value: "orange" },
  { label: "Blue", value: "blue" },
  { label: "Amber", value: "amber" },
  { label: "Sage", value: "sage" },
] as const;

/* ------------------------------------------------------------------ */
/* Block prop shapes (also used by the AI generator schema)           */
/* ------------------------------------------------------------------ */

export type HeroBlockProps = {
  tagline: string;
  searchPlaceholder: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

export type RibbonItemProps = {
  label: string;
  href: string;
  color: "orange" | "blue" | "amber" | "sage";
  icon: string;
};

export type FeaturesBlockProps = {
  label: string;
  title: string;
  body: string;
  features: Array<{
    icon: string;
    color: "orange" | "blue" | "amber" | "sage";
    title: string;
    body: string;
    ctaLabel?: string;
    ctaHref?: string;
  }>;
};

export type ShowcaseBlockProps = {
  label: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  ctaVariant: "primary" | "secondary";
  visualUrl: string;
  visualKind: "barChart" | "circleRing";
  visualCenterText?: string;
  reverse?: boolean;
};

export type StatsBlockProps = {
  label: string;
  title: string;
  stats: Array<{ target: number; suffix?: string; label: string }>;
};

export type LogoCloudBlockProps = {
  label: string;
  title: string;
  body: string;
  logos: string[];
};

export type QuoteBlockProps = {
  quote: string;
  author: string;
  meta: string;
  initials: string;
};

export type CtaBlockProps = {
  label: string;
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

/* ------------------------------------------------------------------ */
/* Puck config                                                         */
/* ------------------------------------------------------------------ */

export const earthyConfig: Config = {
  components: {
    Hero: {
      label: "Hero",
      fields: {
        tagline: { type: "textarea" },
        searchPlaceholder: { type: "text" },
        primaryCtaLabel: { type: "text" },
        primaryCtaHref: { type: "text" },
        secondaryCtaLabel: { type: "text" },
        secondaryCtaHref: { type: "text" },
      },
      defaultProps: {
        tagline:
          "Boutique websites for businesses that care about details. Built by hand, hosted with care, owned by you.",
        searchPlaceholder: "What do you want to build?",
        primaryCtaLabel: "See what we build",
        primaryCtaHref: "/#features",
        secondaryCtaLabel: "Start your project",
        secondaryCtaHref: "/start",
      },
      render: (props) => <EarthyHero {...(props as unknown as HeroBlockProps)} />,
    },

    Ribbon: {
      label: "Product ribbon",
      fields: {
        items: {
          type: "array",
          arrayFields: {
            label: { type: "text" },
            href: { type: "text" },
            color: { type: "select", options: COLOR_OPTIONS as unknown as { label: string; value: string }[] },
            icon: { type: "select", options: ICON_NAMES.map((n) => ({ label: n, value: n })) },
          },
        },
      },
      defaultProps: {
        items: [
          { label: "Site Rebuild", href: "/#features", color: "orange", icon: "RefreshCcw" },
          { label: "Hosting", href: "/pricing", color: "blue", icon: "Cloud" },
          { label: "Domains", href: "/pricing", color: "amber", icon: "Globe2" },
          { label: "From Scratch", href: "/#showcase", color: "sage", icon: "Sparkles" },
          { label: "Mobile-First", href: "/contact", color: "blue", icon: "Smartphone" },
        ],
      },
      render: ({ items }) => (
        <EarthyRibbon
          items={(items as RibbonItemProps[]).map((it) => ({
            ...it,
            Icon: resolveIcon(it.icon),
          }))}
        />
      ),
    },

    Features: {
      label: "Features grid",
      fields: {
        label: { type: "text" },
        title: { type: "textarea" },
        body: { type: "textarea" },
        features: {
          type: "array",
          arrayFields: {
            icon: { type: "select", options: ICON_NAMES.map((n) => ({ label: n, value: n })) },
            color: { type: "select", options: COLOR_OPTIONS as unknown as { label: string; value: string }[] },
            title: { type: "text" },
            body: { type: "textarea" },
            ctaLabel: { type: "text" },
            ctaHref: { type: "text" },
          },
        },
      },
      defaultProps: {
        label: "What we build",
        title: "Considered websites for considered businesses",
        body: "From a one-page menu to a full e-commerce build, every site is hand-crafted around how you actually serve your customers.",
        features: [],
      },
      render: ({ label, title, body, features }) => {
        const items = features as FeaturesBlockProps["features"];
        const resolved: FeatureCardProps[] = items.map((f) => ({
          Icon: resolveIcon(f.icon),
          color: f.color,
          title: f.title,
          body: f.body,
          cta:
            f.ctaLabel && f.ctaHref
              ? { label: f.ctaLabel, href: f.ctaHref }
              : undefined,
        }));
        return (
          <section className="bg-brand-surface py-25" id="features">
            <div className="mx-auto max-w-[1200px] px-6">
              <Reveal className="mx-auto mb-16 max-w-[640px] text-center">
                <SectionLabel>{label as string}</SectionLabel>
                <h2 className="font-[family-name:var(--brand-serif-font)] text-[clamp(1.8rem,3.5vw,2.75rem)] font-normal leading-tight tracking-[-0.5px] text-brand-ink">
                  {title as string}
                </h2>
                <p className="mt-4 text-[1.1rem] leading-relaxed text-brand-text">
                  {body as string}
                </p>
              </Reveal>
              <FeatureGrid features={resolved} />
            </div>
          </section>
        );
      },
    },

    Showcase: {
      label: "Showcase row",
      fields: {
        label: { type: "text" },
        title: { type: "textarea" },
        body: { type: "textarea" },
        ctaLabel: { type: "text" },
        ctaHref: { type: "text" },
        ctaVariant: {
          type: "select",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
          ],
        },
        visualUrl: { type: "text" },
        visualKind: {
          type: "select",
          options: [
            { label: "Bar chart", value: "barChart" },
            { label: "Circle ring", value: "circleRing" },
          ],
        },
        visualCenterText: { type: "text" },
        reverse: { type: "radio", options: [
          { label: "Left", value: false as unknown as string },
          { label: "Right", value: true as unknown as string },
        ] },
      },
      defaultProps: {
        label: "Site Rebuild",
        title: "We take your old site and rebuild it better",
        body: "Send us your URL — we scrape the real content, study what's worth keeping, and ship a modern, fast version you actually own.",
        ctaLabel: "Send us your URL",
        ctaHref: "/start",
        ctaVariant: "primary",
        visualUrl: "kptdesigns.com/rebuild",
        visualKind: "barChart",
        visualCenterText: "KPT",
        reverse: false,
      },
      render: (props) => {
        const p = props as unknown as ShowcaseBlockProps;
        const visual =
          p.visualKind === "circleRing" ? (
            <CircleRingVisual centerText={p.visualCenterText ?? "KPT"} />
          ) : (
            <BarChartVisual />
          );
        return (
          <section className="bg-brand-canvas py-20">
            <div className="mx-auto max-w-[1200px] px-6">
              <Reveal>
                <ShowcaseRow
                  label={p.label}
                  title={p.title}
                  body={p.body}
                  cta={{
                    label: p.ctaLabel,
                    href: p.ctaHref,
                    variant: p.ctaVariant,
                  }}
                  visualUrl={p.visualUrl}
                  visual={visual}
                  reverse={p.reverse}
                />
              </Reveal>
            </div>
          </section>
        );
      },
    },

    Stats: {
      label: "Stats band",
      fields: {
        label: { type: "text" },
        title: { type: "text" },
        stats: {
          type: "array",
          arrayFields: {
            target: { type: "number" },
            suffix: { type: "text" },
            label: { type: "text" },
          },
        },
      },
      defaultProps: {
        label: "By the numbers",
        title: "Trusted at every scale",
        stats: [
          { target: 35, suffix: "+", label: "Sites shipped" },
          { target: 500, suffix: "+", label: "Starting price" },
          { target: 99.9, suffix: "%", label: "Uptime" },
          { target: 14, suffix: "d", label: "Turnaround" },
        ],
      },
      render: (props) => <StatsSection {...(props as unknown as StatsBlockProps)} />,
    },

    LogoCloud: {
      label: "Logo cloud",
      fields: {
        label: { type: "text" },
        title: { type: "text" },
        body: { type: "textarea" },
        logos: { type: "array", arrayFields: { value: { type: "text" } } },
      },
      defaultProps: {
        label: "Industries we serve",
        title: "Built for the work you do",
        body: "Every industry has its own rhythm. We tune the site to yours.",
        logos: [{ value: "Plumbing" }, { value: "Electrical" }, { value: "Real Estate" }],
      },
      render: ({ label, title, body, logos }) => (
        <LogoCloud
          label={label as string}
          title={title as string}
          body={body as string}
          logos={(logos as Array<{ value: string }>).map((l) => l.value)}
        />
      ),
    },

    Quote: {
      label: "Testimonial",
      fields: {
        quote: { type: "textarea" },
        author: { type: "text" },
        meta: { type: "text" },
        initials: { type: "text" },
      },
      defaultProps: {
        quote: "They listened. That alone was worth it.",
        author: "—",
        meta: "—",
        initials: "—",
      },
      render: (props) => <QuoteCard {...(props as unknown as QuoteBlockProps)} />,
    },

    Cta: {
      label: "Final call-to-action",
      fields: {
        label: { type: "text" },
        title: { type: "text" },
        body: { type: "textarea" },
        primaryLabel: { type: "text" },
        primaryHref: { type: "text" },
        secondaryLabel: { type: "text" },
        secondaryHref: { type: "text" },
      },
      defaultProps: {
        label: "Get started",
        title: "Ready when you are",
        body: "Five-minute conversation. We'll quote you in a day, ship in two weeks, and you'll own every line.",
        primaryLabel: "Start your project",
        primaryHref: "/start",
        secondaryLabel: "See pricing",
        secondaryHref: "/pricing",
      },
      render: (props) => {
        const p = props as unknown as CtaBlockProps;
        return (
          <CtaSection
            label={p.label}
            title={p.title}
            body={p.body}
            primary={{ label: p.primaryLabel, href: p.primaryHref }}
            secondary={
              p.secondaryLabel && p.secondaryHref
                ? { label: p.secondaryLabel, href: p.secondaryHref }
                : undefined
            }
          />
        );
      },
    },
  },
  root: {
    render: ({ children }: { children?: React.ReactNode }) => (
      <>
        <RevealRoot />
        {children}
      </>
    ),
  },
};

/**
 * Block schema documentation that gets injected into the AI prompt.
 * Keep this in sync with the components above. The AI uses this to
 * know what blocks exist and what props to fill in.
 */
export const BLOCK_SCHEMA_FOR_AI = `Available blocks (compose any sequence; usually 5–8 blocks per page):

1. Hero — top of page, has a headline + tagline + search + CTAs.
   Props: { tagline (string, the one-line value prop, ~120 chars max),
           searchPlaceholder (string, ~50 chars),
           primaryCtaLabel, primaryCtaHref, secondaryCtaLabel, secondaryCtaHref }

2. Ribbon — horizontal row of 5–6 colored icon tiles for navigating to key services.
   Props: { items: [{ label, href, color: orange|blue|amber|sage, icon: <icon name> }] }

3. Features — grid of 3 or 6 cards explaining what the business offers.
   Props: { label, title, body,
            features: [{ icon, color: orange|blue|amber|sage, title, body,
                         ctaLabel?, ctaHref? }] }

4. Showcase — alternating image+text row demonstrating a specific service or capability.
   Props: { label, title, body, ctaLabel, ctaHref, ctaVariant: primary|secondary,
            visualUrl (faux URL shown in browser-frame chrome),
            visualKind: barChart|circleRing,
            visualCenterText? (used when visualKind=circleRing, 3-4 chars),
            reverse? (boolean — true puts visual on the right) }

5. Stats — dark stats band with 4 large gradient numbers.
   Props: { label, title, stats: [{ target (number), suffix?, label }] }

6. LogoCloud — grid of partner/industry tiles.
   Props: { label, title, body, logos: [{ value: <string> }] }

7. Quote — testimonial card with quote + author + meta + initials.
   Props: { quote, author, meta, initials (2-3 chars) }

8. Cta — final call-to-action with primary + optional secondary button.
   Props: { label, title, body, primaryLabel, primaryHref, secondaryLabel?, secondaryHref? }

Available icon names: ${ICON_NAMES.join(", ")}.

Color values are restricted to: orange, blue, amber, sage. Distribute them so adjacent
items don't share a color.`;
