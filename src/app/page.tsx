import { RefreshCcw, Sparkles, Globe2, Code2, ShieldCheck, FileText } from "lucide-react";

import { RevealRoot, Reveal } from "@/components/earthy/reveal";
import { SectionLabel } from "@/components/earthy/section-label";
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

const FEATURES: FeatureCardProps[] = [
  {
    Icon: RefreshCcw,
    color: "orange",
    title: "Site Rebuild",
    body: "Got a tired site you can't update? We scrape it, study it, and rebuild it modern — same content, ten times faster.",
    cta: { href: "/contact", label: "Rebuild my site" },
  },
  {
    Icon: Sparkles,
    color: "blue",
    title: "From Scratch",
    body: "No site yet? Send us your docs, photos, even your Facebook page. We turn it into a clean, fast, custom-coded site.",
    cta: { href: "/contact", label: "Start fresh" },
  },
  {
    Icon: Globe2,
    color: "amber",
    title: "Domains Included",
    body: "Don't have a domain? We register one for you. Already own one? We'll point it. Want to leave later? Take it with you.",
    cta: { href: "/pricing", label: "See domain pricing" },
  },
  {
    Icon: Code2,
    color: "sage",
    title: "You Own The Code",
    body: "Custom-coded — no Wix, no Squarespace lock-in. Host with us, or take the repo and host anywhere. Your call, always.",
    cta: { href: "/pricing", label: "How hosting works" },
  },
  {
    Icon: ShieldCheck,
    color: "orange",
    title: "Built To Convert",
    body: "Fast loads, clear calls-to-action, mobile-first. Every page designed around the one thing that matters: getting customers.",
    cta: { href: "/#showcase", label: "See examples" },
  },
  {
    Icon: FileText,
    color: "blue",
    title: "Edit It Yourself",
    body: "After launch, edit text, swap photos, and rearrange sections from your dashboard. No code, no waiting on us.",
    cta: { href: "/contact", label: "Tour the editor" },
  },
];

const INDUSTRY_LOGOS = [
  "Plumbing",
  "Electrical",
  "Roofing",
  "Real Estate",
  "Law Firms",
  "Restaurants",
  "Landscaping",
  "Pest Control",
  "Hospitality",
  "Auto Detail",
  "Counseling",
  "Pickleball",
  "Golf",
];

const STATS = [
  { target: 35, suffix: "+", label: "Sites shipped" },
  { target: 500, suffix: "+", label: "Starting price (USD)" },
  { target: 99.9, suffix: "%", label: "Hosting uptime" },
  { target: 14, suffix: "d", label: "Avg. turnaround" },
];

export default function Home() {
  return (
    <>
      <RevealRoot />

      <EarthyHero />

      <EarthyRibbon />

      <section id="features" className="bg-earthy-sand py-25">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal className="mx-auto mb-16 max-w-[640px] text-center">
            <SectionLabel>What we build</SectionLabel>
            <h2 className="font-[family-name:var(--font-earthy-display)] text-[clamp(1.8rem,3.5vw,2.75rem)] font-bold leading-tight tracking-[-0.5px] text-earthy-ink">
              Modern websites for businesses that don&apos;t have one yet — or wish theirs was better
            </h2>
            <p className="mt-4 text-[1.1rem] leading-relaxed text-earthy-stone-600">
              From a one-page menu for a restaurant to a multi-page site with online booking — we start at $500 and price up from there based on what you need.
            </p>
          </Reveal>
          <FeatureGrid features={FEATURES} />
        </div>
      </section>

      <section id="showcase" className="bg-earthy-cream py-25">
        <div className="mx-auto max-w-[1200px] space-y-25 px-6">
          <Reveal>
            <ShowcaseRow
              label="Site Rebuild"
              title="We take your old site and rebuild it better"
              body="Send us your URL — even if it's a Wix, GoDaddy, or 'my nephew built it in 2014' situation. Our process scrapes the real content, studies what's worth keeping, and ships a modern, fast version you actually own. Same business, dramatically better website."
              cta={{ href: "/contact", label: "Send us your URL" }}
              visualUrl="kptdesigns.com/rebuild"
              visual={<BarChartVisual />}
            />
          </Reveal>
          <Reveal>
            <ShowcaseRow
              reverse
              label="Build From Scratch"
              title="Got no site? We can work from anything"
              body="Documents, PDFs, photos from your phone, the menu printed on your wall, your Facebook page, a hand-drawn sketch on a napkin — we'll take whatever you have, fill in the rest with a quick conversation, and turn it into a clean, fast website."
              cta={{ href: "/contact", label: "Start with what you have", variant: "secondary" }}
              visualUrl="kptdesigns.com/intake"
              visual={<CircleRingVisual centerText="KPT" />}
            />
          </Reveal>
        </div>
      </section>

      <StatsSection
        label="By the numbers"
        title="Small businesses, big results"
        stats={STATS}
      />

      <LogoCloud
        label="Industries we serve"
        title="Built for the businesses our neighbors run"
        body="Plumbers, electricians, lawyers, dentists, golf courses, landscapers, restaurants, real estate offices — we've shipped sites for all of them."
        logos={INDUSTRY_LOGOS}
      />

      <QuoteCard
        quote="We had a site from 2011 that nobody was using. KPT scraped it, asked us five smart questions, and two weeks later we had a site that actually books appointments. The orange logo is the only thing they didn't change."
        author="Tony C."
        meta="Cirigliano Plumbing"
        initials="TC"
      />

      <CtaSection
        label="Get started"
        title="Tell us about your business"
        body="Five-minute conversation. We'll quote you in a day, ship in two weeks, and you'll own every line."
        primary={{ href: "/contact", label: "Start your project" }}
        secondary={{ href: "/pricing", label: "See pricing" }}
      />
    </>
  );
}
