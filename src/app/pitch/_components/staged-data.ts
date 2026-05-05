// Staged "AI generation" data for the pitch tool. Everything here is
// pre-baked and selected deterministically from a hash of the business name
// so the same input always yields the same outputs — consistency reads as
// magic when the rep narrates over it. No real generation happens tonight.

// ---------- deterministic pseudo-random ----------

// djb2-ish hash. Stable across runs, no crypto.
function hashString(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function pickByName<T>(name: string, options: readonly T[], salt = ""): T {
  if (options.length === 0) throw new Error("pickByName: empty options");
  const idx = hashString(name + "::" + salt) % options.length;
  return options[idx];
}

// pickN returns N distinct items keyed off the name. If asked for more than
// the pool can supply we'll wrap.
export function pickNByName<T>(name: string, options: readonly T[], n: number, salt = ""): T[] {
  if (options.length === 0) return [];
  const out: T[] = [];
  let cursor = hashString(name + "::" + salt);
  const used = new Set<number>();
  for (let i = 0; i < n; i++) {
    let attempts = 0;
    let idx = Math.abs(cursor) % options.length;
    while (used.has(idx) && attempts < options.length) {
      cursor = (cursor * 1103515245 + 12345) | 0;
      idx = Math.abs(cursor) % options.length;
      attempts++;
    }
    used.add(idx);
    out.push(options[idx]);
    cursor = (cursor * 1103515245 + 12345) | 0;
  }
  return out;
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function cleanUrl(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

// Try to infer a business name from a URL: "lakearthurgolfclub.com" → "Lakearthurgolfclub".
// Crude but believable for an internal tool.
export function inferNameFromUrl(url: string): string {
  const cleaned = cleanUrl(url);
  if (!cleaned) return "";
  const host = cleaned.split("/")[0];
  const stem = host.replace(/\.(com|net|org|io|co|us|biz|info)$/i, "");
  if (!stem) return "";
  return stem.charAt(0).toUpperCase() + stem.slice(1);
}

// ---------- palettes ----------

export type Palette = { name: string; swatches: string[] };

export const PALETTES: readonly Palette[] = [
  { name: "Field & Fairway",   swatches: ["#1A3A1F", "#2C5530", "#C9A96E", "#F4EFDF", "#1A1A1A"] },
  { name: "Lake Mist",         swatches: ["#08182A", "#0E2A3F", "#5C8FA8", "#E8E2CE", "#FBF8F0"] },
  { name: "Rust & Linen",      swatches: ["#3A1A0F", "#8C3A1F", "#D9A07A", "#F2E8D5", "#1F1A14"] },
  { name: "Quarry",            swatches: ["#1F2024", "#3A3F46", "#7A8088", "#C8C0AE", "#EDE8DC"] },
  { name: "Greenhouse",        swatches: ["#16221A", "#2E4A35", "#88A26F", "#E5DCC2", "#F8F2E5"] },
  { name: "Paper Sky",         swatches: ["#2A3548", "#5A7090", "#A8B8C8", "#E0DDD0", "#FAF6EC"] },
  { name: "Workshop",          swatches: ["#0F0F12", "#2A2A2E", "#A8693A", "#E5C68F", "#F0E8D5"] },
  { name: "Atelier",           swatches: ["#1F1A1F", "#4A3F44", "#9A7878", "#D8C8B8", "#F5EFE2"] },
  { name: "Tundra",            swatches: ["#0A1820", "#1F3540", "#5C8AA0", "#D0DCDC", "#F2EEE0"] },
  { name: "Saffron Dusk",      swatches: ["#1A1218", "#3D2A22", "#C9824A", "#EDD9B0", "#F8F1DD"] },
];

// ---------- typeface pairs ----------

export type TypefacePair = { display: string; body: string; vibe: string };

export const TYPEFACE_PAIRS: readonly TypefacePair[] = [
  { display: "Playfair Display", body: "Inter",            vibe: "editorial · grounded" },
  { display: "Cormorant Garamond", body: "Söhne",          vibe: "literary · modern" },
  { display: "Tiempos Headline", body: "Inter",            vibe: "newsroom · clean" },
  { display: "GT Sectra",       body: "GT America",        vibe: "swiss · refined" },
  { display: "Domaine Display", body: "Söhne",             vibe: "luxury · austere" },
  { display: "Canela",          body: "Suisse Int'l",      vibe: "warm · contemporary" },
  { display: "Reckless",        body: "ABC Diatype",       vibe: "futurist · sharp" },
  { display: "Recoleta",        body: "Inter",             vibe: "rounded · friendly" },
];

// ---------- voice tags ----------

export const VOICE_TAGS: readonly string[] = [
  "warm", "confident", "rooted", "precise", "honest",
  "spacious", "patient", "exacting", "humane", "unhurried",
  "candid", "considered",
];

// ---------- concept directions ----------

export type ConceptDirection = {
  title: string;
  teaser: string;
  inspiration: string; // a real catalog slug to lend authenticity
  gradient: [string, string];
};

export const CONCEPT_DIRECTIONS: readonly ConceptDirection[] = [
  {
    title: "Editorial Field Guide",
    teaser: "Long-form, photo-led, with a sense of place. Reads like a magazine you'd keep on the counter.",
    inspiration: "v3-editorial",
    gradient: ["#1A3A1F", "#C9A96E"],
  },
  {
    title: "Cinematic Drone Reel",
    teaser: "Hero opens on aerial footage, then settles into a quiet scroll. Big, atmospheric, hard to scroll past.",
    inspiration: "v5-tunnel",
    gradient: ["#08182A", "#5C8FA8"],
  },
  {
    title: "Tactile Material Study",
    teaser: "Paper, grain, and texture as the visual language. Feels handmade — like a portfolio you've held.",
    inspiration: "v10-atelier",
    gradient: ["#3A1A0F", "#D9A07A"],
  },
  {
    title: "Recursive Strata",
    teaser: "Layered scroll-driven sections that reveal depth without losing the thread. Built for storytelling.",
    inspiration: "v7-recursive",
    gradient: ["#1F2024", "#A8693A"],
  },
  {
    title: "Trader Tarp",
    teaser: "Practical, utilitarian, no-BS. The site equivalent of a clean shop and a fair handshake.",
    inspiration: "v50-trader-tarp",
    gradient: ["#0F0F12", "#88A26F"],
  },
  {
    title: "Atlas Broadsheet",
    teaser: "Newspaper-grade typography meets local detail. Every section is a column you want to read.",
    inspiration: "v15-atlas",
    gradient: ["#1F1A1F", "#9A7878"],
  },
];

// ---------- industries → architecture ----------

export type Industry =
  | "Golf"
  | "Landscaping"
  | "Trades / Service"
  | "Hospitality"
  | "Professional services"
  | "Retail / E-com"
  | "Other";

export const INDUSTRIES: readonly Industry[] = [
  "Golf",
  "Landscaping",
  "Trades / Service",
  "Hospitality",
  "Professional services",
  "Retail / E-com",
  "Other",
];

export const ARCHITECTURE_SECTIONS: Record<Industry, string[]> = {
  "Golf": [
    "Hero · cinematic drone reel",
    "Tee-time booking with deposit",
    "Hole-by-hole field guide",
    "Banquets & weddings lead capture",
    "Tournament inquiry & packages",
    "Self-serve league signup",
    "Pro-shop showcase",
    "Visit · directions, hours, course rules",
    "About · history, staff, course story",
  ],
  "Hospitality": [
    "Hero · property atmosphere reel",
    "Rooms & suites detail",
    "Dining & bar program",
    "Events & private dining",
    "Booking integration",
    "Local guide · what's nearby",
    "Gallery · seasonal photography",
    "Visit · directions, hours, contact",
    "About · property story",
  ],
  "Landscaping": [
    "Hero · seasonal portfolio reel",
    "Service guide · maintenance, design, install",
    "Project gallery · before / after",
    "Free-estimate request",
    "Materials · stone, mulch, plant lists",
    "Process · consult to install",
    "Service area map",
    "About · crew, equipment, story",
    "Trailer · job-site portal (phase 2)",
  ],
  "Trades / Service": [
    "Hero · service area & promise",
    "Services · what we do, in plain English",
    "Project gallery",
    "Request-a-quote with photo upload",
    "Areas served map",
    "Reviews & testimonials",
    "About · licensing, insurance, story",
    "Visit · contact, hours, dispatch",
  ],
  "Professional services": [
    "Hero · positioning statement",
    "Services & engagements",
    "Case studies",
    "Team · bios & credentials",
    "Insights · articles & whitepapers",
    "Contact · consultation request",
    "About · firm story & approach",
    "Resources · client portal entry",
  ],
  "Retail / E-com": [
    "Hero · seasonal lookbook",
    "Shop · product catalog",
    "Collections & curation",
    "Lookbook · editorial photography",
    "Cart & checkout · Stripe",
    "Account · orders, wishlist",
    "Story · brand, makers, sourcing",
    "Visit · store hours & directions",
    "Journal · new arrivals, drops",
  ],
  "Other": [
    "Hero · positioning",
    "What we do · plain language",
    "Gallery / portfolio",
    "Request-a-quote / contact",
    "About · story & team",
    "Reviews & testimonials",
    "Areas served / locations",
    "FAQ",
  ],
};

// ---------- pricing matrix ----------

export type Pricing = { build: number; hosting: number; agent: number };

export const PRICING_MATRIX: Record<Industry, Pricing> = {
  "Golf":                    { build: 14500, hosting: 185, agent: 395 },
  "Hospitality":             { build: 14500, hosting: 185, agent: 395 },
  "Landscaping":             { build:  9800, hosting: 135, agent: 295 },
  "Trades / Service":        { build:  9800, hosting: 135, agent: 295 },
  "Professional services":   { build: 11500, hosting: 145, agent: 345 },
  "Retail / E-com":          { build: 18000, hosting: 215, agent: 445 },
  "Other":                   { build: 12500, hosting: 155, agent: 345 },
};

// ---------- tagline templates ----------

const TAGLINE_TEMPLATES: readonly ((biz: string, industry: Industry) => string)[] = [
  (biz, ind) => `A ${adjFor(ind)} ${nounFor(ind)} for the people who actually use it.`,
  (biz) => `${biz}, but the way it should feel online.`,
  (biz, ind) => `Built like ${biz} runs — ${adjFor(ind)}, unhurried, exact.`,
  (biz, ind) => `The quiet ${nounFor(ind)} site you'll actually be proud of.`,
  (biz) => `${biz}: a site that moves at the speed of the work.`,
];

function adjFor(industry: Industry): string {
  switch (industry) {
    case "Golf":                  return "considered";
    case "Hospitality":           return "warm";
    case "Landscaping":           return "rooted";
    case "Trades / Service":      return "honest";
    case "Professional services": return "exacting";
    case "Retail / E-com":        return "tactile";
    default:                      return "grounded";
  }
}

function nounFor(industry: Industry): string {
  switch (industry) {
    case "Golf":                  return "club";
    case "Hospitality":           return "house";
    case "Landscaping":           return "studio";
    case "Trades / Service":      return "shop";
    case "Professional services": return "firm";
    case "Retail / E-com":        return "store";
    default:                      return "business";
  }
}

export function taglineFor(name: string, industry: Industry): string {
  const tpl = pickByName(name, TAGLINE_TEMPLATES, "tagline");
  return tpl(name, industry);
}

// ---------- scope summary ----------

export function scopeSummaryFor(name: string, industry: Industry): string[] {
  const lines = ARCHITECTURE_SECTIONS[industry];
  // pick three highlights, deterministically
  const picks = pickNByName(name, lines, 3, "scope-summary");
  return picks.map((l) => l.replace(/^[^·]+·\s*/, "")); // strip the "Section · " prefix
}

// ---------- location guesses ----------

const LOCATION_GUESSES: readonly string[] = [
  "Butler, PA",
  "Beaver Falls, PA",
  "Greensburg, PA",
  "Erie, PA",
  "Wheeling, WV",
  "Youngstown, OH",
  "Morgantown, WV",
  "State College, PA",
  "Cranberry Twp, PA",
  "New Castle, PA",
];

export function locationGuess(name: string): string {
  return pickByName(name, LOCATION_GUESSES, "location");
}

// ---------- site age guess ----------

const SITE_AGE_GUESSES: readonly string[] = [
  "current site ~ 2014",
  "current site ~ 2017",
  "current site ~ 2011",
  "current site ~ 2019",
  "current site ~ 2009",
  "current site ~ 2016",
];

export function siteAgeGuess(name: string): string {
  return pickByName(name, SITE_AGE_GUESSES, "siteage");
}
