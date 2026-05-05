/**
 * Pipeline taxonomy — phases, stages, status, and the findings shape
 * that agents accumulate.
 *
 * The intake pipeline runs in three phases:
 *
 *   1. DISCOVERY  — many agents in parallel scrape, extract, and
 *                   collect signals from the customer's existing
 *                   presence. ~5min wall-clock.
 *   2. SYNTHESIS  — fewer agents in sequence assemble a normalized
 *                   brand profile and site plan from raw findings.
 *                   ~3min.
 *   3. BUILDING   — the page composers (one per page in parallel)
 *                   produce the new site as a Puck tree, themed to
 *                   the customer's brand. ~12min.
 *
 * Each agent owns a single `stage`. Stage status: pending → running →
 * done OR failed. Errors don't kill the pipeline — they degrade
 * gracefully so a partial output is always shippable.
 */
import type { Data as PuckData } from "@measured/puck";

export type StageId =
  // discovery
  | "crawl"
  | "logo"
  | "assets"
  | "palette"
  | "voice"
  | "stack"
  | "social"
  | "domain"
  | "google"
  // synthesis
  | "brand-profile"
  | "site-plan"
  | "content-normalize"
  | "asset-curate"
  // building (current path: free-form HTML generation)
  | "freeform"
  // building (legacy templated Puck path — components retained but not registered)
  | "theme"
  | "compose"
  | "critic"
  | "bind";

export type Phase = "discovery" | "synthesis" | "building" | "ready" | "failed";

export type StageState = "pending" | "running" | "done" | "skipped" | "failed";

export type StageStatus = {
  state: StageState;
  startedAt?: string;
  finishedAt?: string;
  error?: string;
  /** Human-readable progress note shown in the UI: "Crawling page 4 of 12…" */
  note?: string;
};

export type StageMap = Partial<Record<StageId, StageStatus>>;

/* ------------------------------------------------------------------ */
/* Findings — every agent writes its own slice                        */
/* ------------------------------------------------------------------ */

export type CrawledPage = {
  url: string;
  title?: string;
  description?: string;
  html: string;            // cleaned visible-text + heading + link extract
  textSummary: string;     // condensed, ~2KB per page max
  headings: string[];
  links: { href: string; text: string }[];
  images: string[];
  screenshotKey?: string;  // Linode storage key when available
};

export type BrandPalette = {
  primary: string;            // most-used brand color (CTA / accent)
  primaryStrong?: string;
  primarySoft?: string;
  ink: string;                // primary text color
  canvas: string;             // primary surface
  surface?: string;
  accent1?: string;
  accent2?: string;
  accent3?: string;
};

export type BrandFonts = {
  display: string;            // primary heading font (web-safe family stack)
  body: string;               // body font
  mono?: string;
  /** True when our extraction inferred fonts from the source rather than
   *  reading them directly. We then map to a Google Fonts substitute. */
  inferred?: boolean;
};

export type VoiceProfile = {
  tone: "formal" | "casual" | "warm" | "technical" | "playful" | "rugged";
  formality: 1 | 2 | 3 | 4 | 5;
  voiceSample?: string;       // ~140-char excerpt from source that nails the voice
  notes?: string;             // freeform: regional quirks, slogans, taboos
};

export type BrandProfile = {
  businessName: string;
  oneLiner: string;           // who they are in one sentence
  industry?: string;
  serviceArea?: string;       // "South Hills, Pittsburgh"
  palette: BrandPalette;
  fonts: BrandFonts;
  voice: VoiceProfile;
  logoKey?: string;           // Linode storage key for the customer logo
};

export type Findings = {
  /* discovery */
  pages?: CrawledPage[];
  logoUrl?: string;
  logoKey?: string;
  assetKeys?: string[];        // all collected images, by Linode key
  detectedPalette?: BrandPalette;
  detectedFonts?: BrandFonts;
  detectedVoice?: VoiceProfile;
  techStack?: { framework?: string; cms?: string; host?: string };
  socials?: { facebook?: string; instagram?: string; google?: string; yelp?: string; linkedin?: string };
  domainAge?: { registrar?: string; createdAt?: string };

  /** Structured business data from the Google Places API — only populated
   *  when the no-URL admin flow provides a businessName + serviceArea. */
  googlePlace?: {
    placeId: string;
    name: string;
    formattedAddress?: string;
    phone?: string;
    website?: string;
    hours?: string[];
    rating?: number;
    userRatingCount?: number;
    photoKeys?: string[];
    editorialSummary?: string;
    primaryType?: string;
  };

  /** Linode keys for files an admin uploaded directly via /api/admin/uploads. */
  uploadedAssetKeys?: string[];

  /* synthesis */
  brandProfile?: BrandProfile;
  sitePlan?: {
    pages: { slug: string; title: string; sections: string[] }[];
  };
  curatedAssets?: { key: string; role: "hero" | "gallery" | "logo" | "secondary" }[];

  /* building */
  themeCss?: string;           // CSS-variable block to inject as <style> on the site
  puckData?: PuckData;         // legacy templated path — kept for any future block-based editor flow
  generatedHtml?: string;      // freeform building path: full bespoke HTML for the preview body
  generatedSummary?: string;   // one-paragraph "what was built" summary
  criticNotes?: string[];
};
