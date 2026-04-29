# Proposal Page + Lake Arthur Field Guide Demo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship two new public Next.js routes — `/sites/lake-arthur` (a Lakeside Field Guide redesign of Lake Arthur Golf Club, 10 sections, all forms working as UI) and `/proposal/lake-arthur` (a cinematic wrapper with branded intro, embedded redesign, annotation rail, before/after toggle, scope drawer).

**Architecture:** Two parallel route trees (`src/app/sites/lake-arthur/` and `src/app/proposal/lake-arthur/`) with shared content/tokens/Stripe-demo helpers. The proposal route imports the redesign's section components directly (no iframe). Both routes wrap in the existing `PageApproach` depth-entrance per catalog house rules. All forms validate via `react-hook-form` + `zod` and resolve to realistic success states; no backend persistence, no real Stripe charge.

**Tech Stack:** Next.js 16.1.6 App Router, React 19, Tailwind 4, framer-motion, react-hook-form + zod, @stripe/stripe-js (test mode demo), lucide-react. All already installed.

**Spec:** [`docs/superpowers/specs/2026-04-29-proposal-page-and-lake-arthur-demo-design.md`](../specs/2026-04-29-proposal-page-and-lake-arthur-demo-design.md)

**Test layer:** This is pure UI work. There is no unit-test convention for mockup pages in this repo (no test runner is configured for routes). Verification = the dev server renders the page with no console errors / no hydration warnings, the browser walk-through hits every interaction, and `next build` completes cleanly. Each task ends with a concrete verification command and a commit.

**Conventions enforced (per catalog spec):**
- `'use client'` only on the engine/interactive components, not on the route entry.
- Inline `<style>` tags following the existing cosmic-pages convention are preferred for self-contained component styles. Tailwind is fine for layout/utilities.
- `prefers-reduced-motion` honored on every animation.
- `PageApproach` mandatory on both top-level route entries.
- No edits to `src/app/layout.tsx`, `globals.css`, or any global file.
- No new top-level dependencies.

---

## Gate 1 — Foundation Assets & Shared Helpers

These tasks unblock every section component. Run them sequentially.

### Task 1: Capture the "before" screenshot of `lakearthur.com`

**Files:**
- Create: `public/proposal/lake-arthur/before.png`

- [ ] **Step 1: Create the target directory**

```bash
mkdir -p public/proposal/lake-arthur
```

- [ ] **Step 2: Capture full-page screenshot via Chrome MCP**

Use the Chrome browser tools (already available in this session):
1. `mcp__claude-in-chrome__tabs_context_mcp` to check existing tabs.
2. `mcp__claude-in-chrome__tabs_create_mcp` with `url: "https://www.lakearthur.com/"` to open the site.
3. Wait for full page load (page text rendered).
4. Use `mcp__claude-in-chrome__javascript_tool` to scroll to top and resize viewport to 1440px wide.
5. Use the platform's screenshot capability or fall back to: open the URL in headless Chromium via `npx playwright screenshot --full-page --viewport-size=1440,900 https://www.lakearthur.com/ public/proposal/lake-arthur/before.png` (Playwright is not installed; run `npx --yes playwright@latest install chromium` once if needed).

If neither path works, the fallback is to render an HTML placeholder (see Step 3 below) and skip the live capture — the BeforeAfter toggle still functions visually.

- [ ] **Step 3: Fallback if capture fails**

Save a placeholder PNG built from a minimal HTML template. Create `public/proposal/lake-arthur/before-placeholder.html` with a faithful "current site" mock (white bg, dated typography, basic nav) and screenshot that. The proposal page checks for `before.png` first, then falls back to a styled "current site" composition rendered inline in `BeforeAfter.tsx` (Task 21). Either path is acceptable — the BeforeAfter component must handle missing image gracefully.

- [ ] **Step 4: Verify the file exists**

Run:
```bash
ls -lh public/proposal/lake-arthur/before.png
```
Expected: file exists, > 50 KB (a real screenshot is 200KB-1MB; under 50KB likely means an error page was captured).

- [ ] **Step 5: Commit**

```bash
git add public/proposal/lake-arthur/before.png
git commit -m "feat(proposal): capture lakearthur.com before screenshot"
```

---

### Task 2: Source the drone hero video

**Files:**
- Create: `public/sites/lake-arthur/drone-hero.mp4`
- Create: `public/sites/lake-arthur/drone-hero-poster.jpg`

- [ ] **Step 1: Create the target directory**

```bash
mkdir -p public/sites/lake-arthur/photos
```

- [ ] **Step 2: Source a CC0 / public-domain golf-course aerial clip**

Acceptable sources (in order of preference):
1. Pexels Videos (`pexels.com/videos/`) — search "golf course aerial". License is CC0-equivalent.
2. Pixabay Videos — search "golf aerial". CC0.
3. Coverr.co — golf / aerial / nature. CC0.

Constraints:
- ≤ 4 MB file size after compression. Use `ffmpeg -i in.mp4 -c:v libx264 -crf 28 -preset slow -an -movflags +faststart -vf "scale=1920:-2" public/sites/lake-arthur/drone-hero.mp4` if the source is larger.
- 1920×1080 max, 24-30 fps.
- 6-15 seconds, seamlessly loopable. If the source isn't loopable, use `ffmpeg -filter_complex "[0:v][0:v]reverse[v];[0:v][v]concat=n=2:v=1:a=0"` to ping-pong it.
- Audio stripped (`-an`).

- [ ] **Step 3: Generate a poster frame**

```bash
ffmpeg -i public/sites/lake-arthur/drone-hero.mp4 -ss 00:00:01 -vframes 1 -q:v 2 public/sites/lake-arthur/drone-hero-poster.jpg
```

- [ ] **Step 4: Verify**

```bash
ls -lh public/sites/lake-arthur/drone-hero.mp4 public/sites/lake-arthur/drone-hero-poster.jpg
file public/sites/lake-arthur/drone-hero.mp4
```
Expected: MP4 H.264, ≤ 4 MB; JPEG poster ~100-300 KB.

- [ ] **Step 5: Commit**

```bash
git add public/sites/lake-arthur/drone-hero.mp4 public/sites/lake-arthur/drone-hero-poster.jpg
git commit -m "feat(lake-arthur): add drone hero placeholder video and poster"
```

---

### Task 3: Build `content.ts` — single source of truth

**Files:**
- Create: `src/app/sites/lake-arthur/_lib/content.ts`

- [ ] **Step 1: Create directory and write the content file**

```bash
mkdir -p src/app/sites/lake-arthur/_lib
```

Write `src/app/sites/lake-arthur/_lib/content.ts`:

```ts
// Single source of truth for all Lake Arthur copy & data.
// Placeholder values are wrapped in PLACEHOLDER() so the QA pass and the
// proposal annotation rail can both surface flagged values to the customer.

export type Field<T> = { value: T; isPlaceholder: boolean };
const P = <T>(value: T): Field<T> => ({ value, isPlaceholder: true });
const C = <T>(value: T): Field<T> => ({ value, isPlaceholder: false }); // confirmed

export const meta = {
  name: "Lake Arthur Golf Club",
  tagline: "Golf on the lake.",
  address: C("255 Isle Road, Butler, PA 16001"),
  phone: C("(724) 865-2765"),
  email: P("info@lakearthur.com"),
  hoursLine: P("Open daily, sunrise to sunset · Apr–Nov"),
  bookingUrlExternal: C("https://lakearthur.cps.golf/"),
};

export const courseStats = {
  holes: C(18),
  par: P(72),
  yardageBack: P("6,412"),
  yardageMiddle: P("6,003"),
  yardageForward: P("5,221"),
  rating: P("70.8 / 124"),
  designer: P("Original layout, 1965 — refined ongoing"),
};

export const courseCharacter =
  "Picturesque, ideal for all levels — designed to help you focus on your game and leave the distractions of life behind.";

// 18 holes — character notes are editorial-voice placeholders informed by a
// PA public course on a lakeside parcel. Owner edits expected.
export type Hole = {
  number: number;
  par: number;
  yards: Field<string>;
  title: string;
  note: string;
  tip?: string;
};

export const holes: Hole[] = [
  { number: 1, par: 4, yards: P("372"), title: "The Opening Bow", note: "A generous fairway to settle the nerves. Aim left-center; the slope feeds you toward the green.", tip: "Driver, mid-iron approach." },
  { number: 2, par: 5, yards: P("498"), title: "Cathedral Pines", note: "A reachable par five framed by mature pines on both sides. Two good strikes leave a wedge.", tip: "Bombs reward; misses are punished." },
  { number: 3, par: 3, yards: P("164"), title: "Lake Glance", note: "First sight of Lake Arthur from the elevated tee. Wind off the water adds a club.", tip: "Take more than you think." },
  { number: 4, par: 4, yards: P("405"), title: "The Long Look", note: "Dogleg right around a stand of oaks. Drive it down the left side and the green opens up.", tip: "Don't flirt with the right tree line." },
  { number: 5, par: 4, yards: P("388"), title: "The Fold", note: "Fairway folds into a swale ~250 out. Stop short of the fold or carry it — anything in is a blind approach.", tip: "Lay-up is the smart play." },
  { number: 6, par: 3, yards: P("172"), title: "Island Of Quiet", note: "Pin tucked behind a small front bunker. The green is firm; aim center.", tip: "Spin matters — flighted iron." },
  { number: 7, par: 5, yards: P("522"), title: "The Bend", note: "Sweeping dogleg left; cut the corner and a 200-yard approach is on. Bail out right and you're laying three.", tip: "Pick a target; commit." },
  { number: 8, par: 4, yards: P("355"), title: "The Short Bite", note: "Driveable for the long hitter, but the green is tilted back-to-front and won't hold.", tip: "Hybrid + wedge is rarely wrong here." },
  { number: 9, par: 4, yards: P("411"), title: "Turn Home", note: "Plays back toward the clubhouse. Modest fairway, demanding approach to a tucked pin.", tip: "Pick a side; both shoulders punish." },
  { number: 10, par: 4, yards: P("396"), title: "Second Wind", note: "Restart with a generous landing area. The fairway tilts left — favor the right rough off the tee.", tip: "Take what the course gives." },
  { number: 11, par: 3, yards: P("145"), title: "The Whisper", note: "The shortest hole on the course. A small green with no bailout — anything off-line ends in trouble.", tip: "One club less than instinct." },
  { number: 12, par: 5, yards: P("541"), title: "The Long Walk", note: "Three honest shots for most. Out of bounds left from tee through green; respect it.", tip: "Stay right; don't get cute." },
  { number: 13, par: 4, yards: P("367"), title: "The Switchback", note: "Fairway turns 90° right around a pond. Lay up to 130, hit the green, walk off with par.", tip: "Resist driver — wedge in is gold." },
  { number: 14, par: 4, yards: P("422"), title: "The Test", note: "Longest par four on the course. Headwind most afternoons. Take three good shots if you have to.", tip: "Bogey is a fine score here." },
  { number: 15, par: 3, yards: P("198"), title: "Skyline", note: "Long iron from an elevated tee. The green sits below; gauge the wind by the flag — the trees lie.", tip: "Trust the yardage, not the eye." },
  { number: 16, par: 4, yards: P("378"), title: "The Hinge", note: "Slight dogleg left to a green guarded by a single deep bunker on the right. Pin the left side; bail right.", tip: "A confident draw saves a stroke." },
  { number: 17, par: 5, yards: P("509"), title: "Reachable Dreams", note: "Players who hit it long and straight will have a look in two. The green is the largest on the course.", tip: "Eagle is on the table — go get it." },
  { number: 18, par: 4, yards: P("431"), title: "The Closer", note: "Finishing hole plays back toward the clubhouse. A demanding tee shot with water down the right edge.", tip: "Aim at the left bunker; the slope feeds right." },
];

export const rates = [
  { row: "Weekday — 18 holes", price: P("$28") },
  { row: "Weekday — 9 holes",  price: P("$18") },
  { row: "Weekend — 18 holes", price: P("$36") },
  { row: "Weekend — 9 holes",  price: P("$24") },
  { row: "Senior 62+ (Mon–Fri)", price: P("$24") },
  { row: "Junior 12-17", price: P("$16") },
  { row: "Cart — 18 holes", price: P("$18") },
  { row: "Cart — 9 holes",  price: P("$12") },
  { row: "Twilight (after 4 PM)", price: P("$22") },
];

export const tournaments = [
  {
    slug: "charity-scramble",
    title: "Charity Scramble",
    pitch: "Run your fundraiser on the most scenic course in Butler County.",
    capacity: P("Up to 144 players · 36 teams of 4"),
    pricePerTeam: P("From $640"),
    inclusions: [
      "Shotgun start",
      "Carts for every player",
      "Prize package (gross / net / longest drive / closest to pin)",
      "Lunch & post-round reception in the clubhouse",
      "Branded scoring + leaderboard",
    ],
  },
  {
    slug: "corporate-outing",
    title: "Corporate Outing",
    pitch: "A half-day off-site that doesn't feel like one.",
    capacity: P("Up to 80 players · 20 teams of 4"),
    pricePerTeam: P("From $720"),
    inclusions: [
      "Shotgun or tee-time start",
      "Carts, range balls, scoring",
      "Optional clinic with our pro before play",
      "Hosted bar and lunch buffet",
      "Custom signage / branded tee gifts available",
    ],
  },
  {
    slug: "member-guest",
    title: "Member-Guest",
    pitch: "Two days, paired teams, a real trophy on the line.",
    capacity: P("Up to 64 teams · invitation only"),
    pricePerTeam: P("From $560"),
    inclusions: [
      "Two days of competitive play",
      "Friday evening welcome reception",
      "Saturday awards dinner",
      "Caddies and tournament-quality course setup",
      "Mementos for every team",
    ],
  },
];

export const leagues = [
  {
    slug: "mon-mens",
    title: "Monday Men's League",
    schedule: P("Mondays · 5:30 PM shotgun · May–August"),
    season: P("16 weeks"),
    fee: P("$280 / season · cart not included"),
  },
  {
    slug: "wed-womens",
    title: "Wednesday Women's League",
    schedule: P("Wednesdays · 9 AM tee times · May–September"),
    season: P("18 weeks"),
    fee: P("$240 / season"),
  },
  {
    slug: "thu-seniors",
    title: "Thursday Senior League",
    schedule: P("Thursdays · 10 AM shotgun · April–October"),
    season: P("24 weeks"),
    fee: P("$320 / season · 9 holes weekly"),
  },
  {
    slug: "sun-couples",
    title: "Sunday Couples League",
    schedule: P("Sunday afternoons · twice a month · June–August"),
    season: P("8 sessions"),
    fee: P("$180 / couple · season"),
  },
];

export const proShop = [
  { slug: "logo-cap-classic", title: "Lake Arthur Classic Cap", price: P("$28"), tag: "Apparel" },
  { slug: "logo-polo-mens",   title: "Course Polo — Men's",      price: P("$54"), tag: "Apparel" },
  { slug: "logo-polo-womens", title: "Course Polo — Women's",    price: P("$54"), tag: "Apparel" },
  { slug: "logo-quarter-zip", title: "Lakeside Quarter-Zip",     price: P("$72"), tag: "Apparel" },
  { slug: "course-towel",     title: "Course Towel · 16×24",     price: P("$18"), tag: "Accessories" },
  { slug: "ball-marker-set",  title: "Engraved Ball Markers (4)", price: P("$22"), tag: "Accessories" },
  { slug: "logo-balls-dz",    title: "Logo Balls · Pro V1 Dozen", price: P("$56"), tag: "Equipment" },
  { slug: "divot-tool",       title: "Divot Tool + Marker",       price: P("$16"), tag: "Accessories" },
];

export const palette = {
  water:    "#0E2A3F",
  fairway:  "#2C5530",
  cream:    "#F4EFDF",
  dawn:     "#C9A96E",
  charcoal: "#1A1A1A",
  paper:    "#FBF8F0",
} as const;

export type SectionAnchor =
  | "drone-hero"
  | "course-at-a-glance"
  | "book"
  | "banquets"
  | "tournaments"
  | "leagues"
  | "shop"
  | "visit"
  | "footer";
```

- [ ] **Step 2: Type-check it**

```bash
npx tsc --noEmit -p tsconfig.json
```
Expected: zero errors related to the new file. Pre-existing errors in other files are acceptable; new file should not introduce any.

- [ ] **Step 3: Commit**

```bash
git add src/app/sites/lake-arthur/_lib/content.ts
git commit -m "feat(lake-arthur): add content single source of truth"
```

---

### Task 4: Build `tokens.ts` — palette & type tokens

**Files:**
- Create: `src/app/sites/lake-arthur/_lib/tokens.ts`

- [ ] **Step 1: Write the file**

```ts
// Visual tokens for Lake Arthur Field Guide. Imported anywhere palette / type
// is needed so changes propagate from one place. Kept minimal — most styling
// remains inline per catalog convention.

export const fonts = {
  display: '"Playfair Display", "Iowan Old Style", Georgia, serif',
  body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  mono: '"JetBrains Mono", "SF Mono", Menlo, monospace',
};

export const palette = {
  water:    "#0E2A3F",
  waterDeep:"#08182A",
  fairway:  "#2C5530",
  fairwayDeep: "#1A3A1F",
  cream:    "#F4EFDF",
  paper:    "#FBF8F0",
  dawn:     "#C9A96E",
  charcoal: "#1A1A1A",
  smoke:    "#2A2A2A",
  fog:      "#E8E2CE",
  white:    "#FFFFFF",
} as const;

export const space = {
  hairline: "1px",
  one: "0.25rem",
  two: "0.5rem",
  three: "0.75rem",
  four: "1rem",
  six: "1.5rem",
  eight: "2rem",
  twelve: "3rem",
  sixteen: "4rem",
  twentyfour: "6rem",
  thirtytwo: "8rem",
};

export const easing = {
  editorial: "cubic-bezier(0.22, 0.96, 0.32, 1)",
  swift: "cubic-bezier(0.4, 0, 0.2, 1)",
  curtain: "cubic-bezier(0.6, 0, 0.4, 1)",
};

export const z = {
  base: 0,
  hover: 10,
  fixed: 30,
  drawer: 50,
  intro: 70,
  toast: 80,
};

// Helper: scoped CSS-variable string for inline <style> tags.
export const cssVars = `
  :root {
    --la-water: ${palette.water};
    --la-water-deep: ${palette.waterDeep};
    --la-fairway: ${palette.fairway};
    --la-fairway-deep: ${palette.fairwayDeep};
    --la-cream: ${palette.cream};
    --la-paper: ${palette.paper};
    --la-dawn: ${palette.dawn};
    --la-charcoal: ${palette.charcoal};
    --la-smoke: ${palette.smoke};
    --la-fog: ${palette.fog};
    --la-display: ${fonts.display};
    --la-body: ${fonts.body};
    --la-easing-editorial: ${easing.editorial};
  }
`;
```

- [ ] **Step 2: Type-check & commit**

```bash
npx tsc --noEmit -p tsconfig.json
git add src/app/sites/lake-arthur/_lib/tokens.ts
git commit -m "feat(lake-arthur): add palette/type/spacing tokens"
```

---

### Task 5: Build `stripe-demo.ts` — Stripe loader + demo helpers

**Files:**
- Create: `src/app/sites/lake-arthur/_lib/stripe-demo.ts`

- [ ] **Step 1: Write the file**

```ts
"use client";

import { loadStripe, type Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null> | null = null;

// Lazy loader — never fires a network call at module load.
export function getStripe(): Promise<Stripe | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (stripePromise) return stripePromise;

  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) {
    // No key configured — return a resolved-null so the form falls back to
    // a styled placeholder card field.
    stripePromise = Promise.resolve(null);
    return stripePromise;
  }

  stripePromise = loadStripe(key);
  return stripePromise;
}

// Demo-mode short-circuit. The booking flow calls this instead of any real
// /api/payment-intent endpoint. Resolves with a fake confirmation after
// 1200ms so the UI feels real.
export async function fakeChargeDeposit(input: {
  amountCents: number;
  description: string;
}): Promise<{ ok: true; confirmationId: string }> {
  await new Promise((r) => setTimeout(r, 1200));
  const confirmationId = `LA-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  // eslint-disable-next-line no-console
  console.log("[lake-arthur stripe-demo] charge simulated", input, { confirmationId });
  return { ok: true, confirmationId };
}

export const DEMO_MODE = true as const;
```

- [ ] **Step 2: Type-check & commit**

```bash
npx tsc --noEmit -p tsconfig.json
git add src/app/sites/lake-arthur/_lib/stripe-demo.ts
git commit -m "feat(lake-arthur): add Stripe demo-mode loader"
```

---

## Gate 2 — Redesign Sections (`/sites/lake-arthur`)

Tasks 6–15 build the ten sections of the redesign. They are independent of one another (each only imports from `_lib/content.ts` and `_lib/tokens.ts`) and can run in parallel via subagents. Task 16 assembles them.

For every section component:
- File top: `"use client";` only if the component has interactivity. Pure-presentation sections stay server components.
- Import `content` and `palette/fonts` from `_lib/`.
- Honor `prefers-reduced-motion`: animation/transition rules wrapped in `@media (prefers-reduced-motion: no-preference)` OR explicitly skipped via an `useReducedMotion()` hook from framer-motion.
- Keyboard accessible: every interactive element reachable by Tab; visible focus rings.
- WCAG AA contrast on all text.
- Section anchored with `id` matching `SectionAnchor` from `content.ts`.

### Task 6: `DroneHero.tsx`

**Files:**
- Create: `src/app/sites/lake-arthur/_sections/DroneHero.tsx`

- [ ] **Step 1: Create directory & write the file**

```bash
mkdir -p src/app/sites/lake-arthur/_sections
```

```tsx
"use client";

import { meta } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

export function DroneHero() {
  return (
    <section
      id="drone-hero"
      className="la-drone-hero"
      data-placeholder-video="true"
    >
      <video
        className="la-drone-hero__video"
        src="/sites/lake-arthur/drone-hero.mp4"
        poster="/sites/lake-arthur/drone-hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="la-drone-hero__vignette" aria-hidden="true" />
      <div className="la-drone-hero__copy">
        <p className="la-drone-hero__eyebrow">Butler, PA</p>
        <h1 className="la-drone-hero__title">{meta.name.split(" ").slice(0, 2).join(" ")}</h1>
        <p className="la-drone-hero__tag">{meta.tagline}</p>
      </div>
      <p className="la-drone-hero__address">{meta.address.value}</p>
      <a href="#course-at-a-glance" className="la-drone-hero__cue" aria-label="Scroll to course details">
        <span aria-hidden="true">↓</span>
      </a>
      <style>{css}</style>
    </section>
  );
}

const css = `
.la-drone-hero { position: relative; height: 100vh; width: 100%; overflow: hidden; background: ${palette.waterDeep}; color: ${palette.cream}; }
.la-drone-hero__video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.la-drone-hero__vignette { position: absolute; inset: 0; background: radial-gradient(ellipse at center, transparent 30%, rgba(8,24,42,0.55) 75%, rgba(8,24,42,0.85) 100%); }
.la-drone-hero__copy { position: absolute; left: 0; right: 0; top: 50%; transform: translateY(-50%); text-align: center; padding: 0 5vw; }
.la-drone-hero__eyebrow { font-family: ${fonts.body}; font-size: 0.78rem; letter-spacing: 0.32em; text-transform: uppercase; opacity: 0.85; margin: 0 0 1.25rem; }
.la-drone-hero__title { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(3rem, 9vw, 7.5rem); letter-spacing: -0.02em; line-height: 0.95; margin: 0; text-shadow: 0 2px 24px rgba(0,0,0,0.35); }
.la-drone-hero__tag { font-family: ${fonts.display}; font-style: italic; font-size: clamp(1.1rem, 2.4vw, 1.65rem); margin: 1.25rem 0 0; opacity: 0.92; }
.la-drone-hero__address { position: absolute; bottom: 2.5rem; left: 5vw; right: 5vw; text-align: center; font-family: ${fonts.body}; font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.78; margin: 0; }
.la-drone-hero__cue { position: absolute; bottom: 6.5rem; left: 50%; transform: translateX(-50%); display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 999px; border: 1px solid rgba(244,239,223,0.55); color: ${palette.cream}; text-decoration: none; font-size: 1.1rem; opacity: 0.85; transition: opacity 220ms, transform 220ms; }
.la-drone-hero__cue:hover, .la-drone-hero__cue:focus-visible { opacity: 1; transform: translateX(-50%) translateY(2px); outline: none; }
.la-drone-hero__cue:focus-visible { box-shadow: 0 0 0 2px ${palette.dawn}; }
@media (prefers-reduced-motion: reduce) {
  .la-drone-hero__video { display: none; }
  .la-drone-hero { background: linear-gradient(180deg, ${palette.water} 0%, ${palette.waterDeep} 100%); }
  .la-drone-hero__cue { transition: none; }
}
`;
```

- [ ] **Step 2: Type-check & commit**

```bash
npx tsc --noEmit -p tsconfig.json
git add src/app/sites/lake-arthur/_sections/DroneHero.tsx
git commit -m "feat(lake-arthur): drone hero section"
```

---

### Task 7: `CourseAtAGlance.tsx`

**Files:**
- Create: `src/app/sites/lake-arthur/_sections/CourseAtAGlance.tsx`

- [ ] **Step 1: Write the file**

```tsx
import { courseStats, courseCharacter } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

export function CourseAtAGlance() {
  const stats: { label: string; value: string; placeholder: boolean }[] = [
    { label: "Holes", value: String(courseStats.holes.value), placeholder: courseStats.holes.isPlaceholder },
    { label: "Par",   value: String(courseStats.par.value),   placeholder: courseStats.par.isPlaceholder },
    { label: "Yardage (back)", value: courseStats.yardageBack.value, placeholder: courseStats.yardageBack.isPlaceholder },
    { label: "Course rating",  value: courseStats.rating.value,      placeholder: courseStats.rating.isPlaceholder },
  ];

  return (
    <section id="course-at-a-glance" className="la-glance">
      <p className="la-glance__eyebrow">The course</p>
      <h2 className="la-glance__pull">"{courseCharacter}"</h2>
      <ul className="la-glance__stats">
        {stats.map((s) => (
          <li key={s.label}>
            <span className="la-glance__stat-value">
              {s.value}
              {s.placeholder && <sup className="la-glance__placeholder" title="Placeholder — owner to confirm">*</sup>}
            </span>
            <span className="la-glance__stat-label">{s.label}</span>
          </li>
        ))}
      </ul>
      <p className="la-glance__designer">{courseStats.designer.value}</p>
      <style>{css}</style>
    </section>
  );
}

const css = `
.la-glance { padding: 8rem 5vw 7rem; background: ${palette.paper}; color: ${palette.charcoal}; text-align: center; max-width: 1200px; margin: 0 auto; }
.la-glance__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.fairway}; margin: 0 0 2.5rem; }
.la-glance__pull { font-family: ${fonts.display}; font-style: italic; font-weight: 400; font-size: clamp(1.4rem, 3.4vw, 2.4rem); line-height: 1.35; max-width: 26ch; margin: 0 auto 4rem; color: ${palette.water}; }
.la-glance__stats { list-style: none; padding: 0; margin: 0 auto 3rem; display: grid; grid-template-columns: repeat(4, 1fr); gap: 2.5rem 2rem; max-width: 880px; border-top: 1px solid rgba(26,26,26,0.18); border-bottom: 1px solid rgba(26,26,26,0.18); padding: 2.75rem 0; }
.la-glance__stats li { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
.la-glance__stat-value { font-family: ${fonts.display}; font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 400; color: ${palette.water}; position: relative; }
.la-glance__placeholder { color: ${palette.dawn}; font-family: ${fonts.body}; font-size: 0.6em; vertical-align: super; padding-left: 0.15rem; }
.la-glance__stat-label { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.24em; text-transform: uppercase; color: ${palette.smoke}; }
.la-glance__designer { font-family: ${fonts.body}; font-size: 0.85rem; letter-spacing: 0.05em; color: ${palette.smoke}; font-style: italic; margin: 0; }
@media (max-width: 720px) { .la-glance__stats { grid-template-columns: repeat(2, 1fr); } }
`;
```

- [ ] **Step 2: Type-check & commit**

```bash
npx tsc --noEmit -p tsconfig.json
git add src/app/sites/lake-arthur/_sections/CourseAtAGlance.tsx
git commit -m "feat(lake-arthur): course-at-a-glance section"
```

---

### Task 8: `FieldGuide.tsx` — the 18 holes

**Files:**
- Create: `src/app/sites/lake-arthur/_sections/FieldGuide.tsx`

- [ ] **Step 1: Write the file**

```tsx
import { holes } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

export function FieldGuide() {
  return (
    <section id="field-guide" className="la-fg" aria-labelledby="la-fg-title">
      <header className="la-fg__intro">
        <p className="la-fg__eyebrow">The field guide</p>
        <h2 id="la-fg-title" className="la-fg__title">Eighteen holes, walked.</h2>
        <p className="la-fg__lede">
          A hole-by-hole companion. Each note is a quiet word from the course
          itself — read on the porch the night before, or pulled up on the
          cart path between shots.
        </p>
      </header>
      <ol className="la-fg__list">
        {holes.map((h) => (
          <li key={h.number} className="la-fg__hole">
            <div className="la-fg__numerals">
              <span className="la-fg__num">{String(h.number).padStart(2, "0")}</span>
              <span className="la-fg__par">Par {h.par}</span>
              <span className="la-fg__yards">
                {h.yards.value} yd
                {h.yards.isPlaceholder && <sup title="Placeholder — owner to confirm" className="la-fg__star">*</sup>}
              </span>
            </div>
            <div className="la-fg__copy">
              <h3 className="la-fg__hole-title">{h.title}</h3>
              <p className="la-fg__note">{h.note}</p>
              {h.tip && <p className="la-fg__tip">— {h.tip}</p>}
            </div>
            <div
              className="la-fg__clip"
              data-placeholder-video="true"
              role="img"
              aria-label={`Drone footage placeholder for hole ${h.number}`}
            >
              <span className="la-fg__clip-label">Drone clip · hole {h.number}</span>
            </div>
          </li>
        ))}
      </ol>
      <style>{css}</style>
    </section>
  );
}

const css = `
.la-fg { padding: 7rem 5vw 8rem; background: ${palette.paper}; color: ${palette.charcoal}; }
.la-fg__intro { max-width: 720px; margin: 0 auto 5rem; text-align: center; }
.la-fg__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.fairway}; margin: 0 0 1.5rem; }
.la-fg__title { font-family: ${fonts.display}; font-size: clamp(2.2rem, 5vw, 3.4rem); font-weight: 400; letter-spacing: -0.01em; line-height: 1.1; color: ${palette.water}; margin: 0 0 1.25rem; }
.la-fg__lede { font-family: ${fonts.display}; font-style: italic; color: ${palette.smoke}; font-size: 1.1rem; line-height: 1.6; margin: 0; }
.la-fg__list { list-style: none; padding: 0; margin: 0; max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; gap: 4rem; }
.la-fg__hole { display: grid; grid-template-columns: 200px 1fr 280px; gap: 3.5rem; align-items: start; padding-bottom: 4rem; border-bottom: 1px solid rgba(26,26,26,0.1); }
.la-fg__hole:last-child { border-bottom: none; }
.la-fg__numerals { display: flex; flex-direction: column; gap: 0.4rem; align-items: flex-start; }
.la-fg__num { font-family: ${fonts.display}; font-size: 5rem; font-weight: 400; line-height: 1; color: ${palette.dawn}; letter-spacing: -0.04em; }
.la-fg__par { font-family: ${fonts.body}; font-size: 0.78rem; letter-spacing: 0.24em; text-transform: uppercase; color: ${palette.fairway}; font-weight: 600; }
.la-fg__yards { font-family: ${fonts.body}; font-size: 0.85rem; color: ${palette.smoke}; }
.la-fg__star { color: ${palette.dawn}; }
.la-fg__copy { font-family: ${fonts.body}; }
.la-fg__hole-title { font-family: ${fonts.display}; font-size: 1.85rem; font-weight: 400; color: ${palette.water}; margin: 0.25rem 0 1rem; line-height: 1.15; }
.la-fg__note { font-size: 1rem; line-height: 1.65; margin: 0 0 1rem; color: ${palette.charcoal}; }
.la-fg__tip { font-family: ${fonts.display}; font-style: italic; font-size: 0.92rem; color: ${palette.fairway}; margin: 0; }
.la-fg__clip { width: 100%; aspect-ratio: 16 / 10; background: linear-gradient(135deg, ${palette.fairwayDeep} 0%, ${palette.water} 100%); border-radius: 4px; display: flex; align-items: flex-end; justify-content: flex-start; padding: 1rem; color: ${palette.cream}; opacity: 0.92; }
.la-fg__clip-label { font-family: ${fonts.body}; font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.85; }
@media (max-width: 920px) {
  .la-fg__hole { grid-template-columns: 1fr; gap: 1.5rem; }
  .la-fg__numerals { flex-direction: row; align-items: baseline; gap: 1.25rem; }
  .la-fg__num { font-size: 3.5rem; }
}
`;
```

- [ ] **Step 2: Type-check & commit**

```bash
npx tsc --noEmit -p tsconfig.json
git add src/app/sites/lake-arthur/_sections/FieldGuide.tsx
git commit -m "feat(lake-arthur): 18-hole field guide section"
```

---

### Task 9: `BookTeeTime.tsx` — three-step booking flow

**Files:**
- Create: `src/app/sites/lake-arthur/_sections/BookTeeTime.tsx`

This is the most complex component. Three internal step states (form / deposit / confirmation), Stripe Elements card field rendered in test mode, calendar `.ics` download.

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { palette, fonts } from "../_lib/tokens";
import { fakeChargeDeposit, getStripe } from "../_lib/stripe-demo";

// Stripe.js types — react-stripe-js is NOT in this project's package.json,
// so we render a styled placeholder card field unless @stripe/react-stripe-js
// is added in a follow-up. For tonight, the BookTeeTime component renders
// its OWN minimal card-input placeholder that looks like Stripe Elements.

const bookingSchema = z.object({
  date: z.string().min(1, "Pick a date"),
  time: z.string().min(1, "Pick a time"),
  players: z.coerce.number().min(1).max(4),
  cart: z.enum(["walking", "cart"]),
  discountCode: z.string().optional(),
});
type BookingForm = z.infer<typeof bookingSchema>;

const TIME_SLOTS = (() => {
  const slots: string[] = [];
  for (let h = 6; h <= 17; h++) for (let m of [0, 15, 30, 45]) {
    const hh = ((h % 12) || 12);
    const mer = h < 12 ? "AM" : "PM";
    slots.push(`${hh}:${String(m).padStart(2, "0")} ${mer}`);
  }
  return slots;
})();

const RATE_18 = 28;
const CART_18 = 18;

export function BookTeeTime() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState<BookingForm | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<BookingForm>({
    defaultValues: { players: 2, cart: "cart" },
  });
  const players = watch("players") ?? 2;
  const cart = watch("cart") ?? "cart";

  const total = useMemo(() => {
    const greens = RATE_18 * Number(players);
    const carts = cart === "cart" ? CART_18 * Number(players) : 0;
    return greens + carts;
  }, [players, cart]);

  function onContinue(data: BookingForm) {
    setSubmitted(data);
    setStep(2);
  }

  async function onConfirmDeposit() {
    if (!submitted) return;
    const result = await fakeChargeDeposit({
      amountCents: 1000 * Number(submitted.players),
      description: `Lake Arthur tee time deposit · ${submitted.date} ${submitted.time} · ${submitted.players} players`,
    });
    setConfirmation(result.confirmationId);
    setStep(3);
  }

  function downloadIcs() {
    if (!submitted || !confirmation) return;
    const dt = submitted.date.replace(/-/g, "");
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Lake Arthur Golf Club//EN",
      "BEGIN:VEVENT",
      `UID:${confirmation}@lakearthur.com`,
      `DTSTAMP:${dt}T120000Z`,
      `DTSTART:${dt}T120000Z`,
      `SUMMARY:Tee time at Lake Arthur Golf Club`,
      `DESCRIPTION:Confirmation ${confirmation} · ${submitted.players} players · ${submitted.cart === "cart" ? "with cart" : "walking"}`,
      "LOCATION:255 Isle Road, Butler, PA 16001",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `lake-arthur-${confirmation}.ics`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  }

  return (
    <section id="book" className="la-book" aria-labelledby="la-book-title">
      <header className="la-book__intro">
        <p className="la-book__eyebrow">Book a tee time</p>
        <h2 id="la-book-title" className="la-book__title">Reserve your round.</h2>
        <p className="la-book__lede">
          Pick your date and time, hold your spot with a small refundable
          deposit, and we'll see you on the first tee.
        </p>
      </header>

      <div className="la-book__panel">
        <ol className="la-book__steps" aria-label="Booking steps">
          <li className={step >= 1 ? "is-active" : ""}>1 · Tee time</li>
          <li className={step >= 2 ? "is-active" : ""}>2 · Deposit</li>
          <li className={step >= 3 ? "is-active" : ""}>3 · Confirmation</li>
        </ol>

        {step === 1 && (
          <form onSubmit={handleSubmit(onContinue)} className="la-book__form" noValidate>
            <div className="la-book__row">
              <label className="la-book__field">
                <span>Date</span>
                <input type="date" {...register("date")} />
                {errors.date && <em>{errors.date.message}</em>}
              </label>
              <label className="la-book__field">
                <span>Time</span>
                <select {...register("time")}>
                  <option value="">Select…</option>
                  {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.time && <em>{errors.time.message}</em>}
              </label>
            </div>
            <div className="la-book__row">
              <label className="la-book__field">
                <span>Players</span>
                <select {...register("players", { valueAsNumber: true })}>
                  {[1,2,3,4].map((n) => <option key={n} value={n}>{n} player{n > 1 ? "s" : ""}</option>)}
                </select>
              </label>
              <fieldset className="la-book__field la-book__radios">
                <legend>Cart</legend>
                <label><input type="radio" value="cart" {...register("cart")} /> With cart</label>
                <label><input type="radio" value="walking" {...register("cart")} /> Walking</label>
              </fieldset>
            </div>
            <label className="la-book__field la-book__field--inline">
              <span>Discount code (optional)</span>
              <input type="text" {...register("discountCode")} placeholder="e.g. EARLYBIRD" />
            </label>
            <div className="la-book__total">
              <span>Estimated total</span>
              <strong>${total}</strong>
            </div>
            <button className="la-book__cta" type="submit">Continue to deposit →</button>
          </form>
        )}

        {step === 2 && submitted && (
          <div className="la-book__form">
            <p className="la-book__deposit-line">
              Holding your spot for <strong>{submitted.players} player{Number(submitted.players) > 1 ? "s" : ""}</strong> on <strong>{submitted.date}</strong> at <strong>{submitted.time}</strong>.
            </p>
            <div className="la-book__deposit">
              <span>$10 / player refundable hold</span>
              <strong>${10 * Number(submitted.players)}</strong>
            </div>
            <FakeCardField />
            <p className="la-book__deposit-fine">
              You'll be charged the round total at check-in. The deposit is fully refundable up to 24 hours before your tee time.
            </p>
            <div className="la-book__row la-book__row--end">
              <button type="button" className="la-book__back" onClick={() => setStep(1)}>← Edit reservation</button>
              <button type="button" className="la-book__cta" onClick={onConfirmDeposit}>Confirm reservation →</button>
            </div>
          </div>
        )}

        {step === 3 && submitted && confirmation && (
          <div className="la-book__success">
            <div className="la-book__seal" aria-hidden="true">✓</div>
            <h3>You're booked.</h3>
            <p className="la-book__conf">Confirmation <code>{confirmation}</code></p>
            <p className="la-book__summary">
              {submitted.players} player{Number(submitted.players) > 1 ? "s" : ""} · {submitted.date} at {submitted.time}{submitted.cart === "cart" ? " · with cart" : " · walking"}
            </p>
            <div className="la-book__row la-book__row--end">
              <button type="button" className="la-book__back" onClick={downloadIcs}>Add to calendar</button>
              <button type="button" className="la-book__cta" onClick={() => { setStep(1); setSubmitted(null); setConfirmation(null); }}>Book another</button>
            </div>
          </div>
        )}
      </div>
      <style>{css}</style>
    </section>
  );
}

// Stylized card-field placeholder. Visually mimics Stripe Elements.
// We do not render real Stripe Elements tonight (would require adding
// @stripe/react-stripe-js). Demo mode = visual fidelity only.
function FakeCardField() {
  const [num, setNum] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  return (
    <div className="la-book__card" role="group" aria-label="Card details">
      <input
        className="la-book__card-num"
        type="text" inputMode="numeric" autoComplete="cc-number"
        placeholder="Card number"
        value={num}
        onChange={(e) => setNum(e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 "))}
      />
      <input
        className="la-book__card-exp"
        type="text" inputMode="numeric" autoComplete="cc-exp"
        placeholder="MM / YY"
        value={exp}
        onChange={(e) => setExp(e.target.value.replace(/[^0-9]/g, "").slice(0, 4).replace(/(\d{2})(?=\d)/, "$1 / "))}
      />
      <input
        className="la-book__card-cvc"
        type="text" inputMode="numeric" autoComplete="cc-csc"
        placeholder="CVC"
        value={cvc}
        onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
      />
    </div>
  );
}

const css = `
.la-book { padding: 8rem 5vw; background: ${palette.water}; color: ${palette.cream}; }
.la-book__intro { max-width: 640px; margin: 0 auto 4rem; text-align: center; }
.la-book__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.dawn}; margin: 0 0 1.25rem; }
.la-book__title { font-family: ${fonts.display}; font-size: clamp(2.2rem, 5vw, 3.4rem); font-weight: 400; line-height: 1.1; margin: 0 0 1.25rem; }
.la-book__lede { font-family: ${fonts.display}; font-style: italic; opacity: 0.85; font-size: 1.05rem; line-height: 1.6; margin: 0; }
.la-book__panel { max-width: 720px; margin: 0 auto; background: rgba(244,239,223,0.06); border: 1px solid rgba(244,239,223,0.16); border-radius: 6px; padding: 2.5rem; backdrop-filter: blur(4px); }
.la-book__steps { list-style: none; padding: 0; margin: 0 0 2.5rem; display: flex; gap: 1.5rem; font-family: ${fonts.body}; font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.55; }
.la-book__steps li.is-active { opacity: 1; color: ${palette.dawn}; }
.la-book__form { display: flex; flex-direction: column; gap: 1.5rem; font-family: ${fonts.body}; }
.la-book__row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
.la-book__row--end { justify-content: flex-end; align-items: center; gap: 1.5rem; }
.la-book__field { display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.85rem; }
.la-book__field span, .la-book__field legend { font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.78; }
.la-book__field input, .la-book__field select { background: rgba(244,239,223,0.08); border: 1px solid rgba(244,239,223,0.22); color: ${palette.cream}; padding: 0.85rem 1rem; border-radius: 4px; font-family: inherit; font-size: 0.95rem; }
.la-book__field input:focus, .la-book__field select:focus { outline: none; border-color: ${palette.dawn}; box-shadow: 0 0 0 2px rgba(201,169,110,0.25); }
.la-book__field em { color: ${palette.dawn}; font-size: 0.75rem; font-style: normal; }
.la-book__radios { border: 1px solid rgba(244,239,223,0.22); border-radius: 4px; padding: 0.7rem 1rem; background: rgba(244,239,223,0.04); }
.la-book__radios label { display: inline-flex; gap: 0.5rem; align-items: center; margin-right: 1.5rem; font-size: 0.95rem; }
.la-book__field--inline { grid-column: 1 / -1; }
.la-book__total { display: flex; justify-content: space-between; align-items: baseline; padding-top: 1.25rem; border-top: 1px solid rgba(244,239,223,0.18); font-family: ${fonts.body}; }
.la-book__total span { font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.75; }
.la-book__total strong { font-family: ${fonts.display}; font-size: 1.6rem; font-weight: 400; color: ${palette.dawn}; }
.la-book__cta { background: ${palette.dawn}; color: ${palette.water}; border: none; padding: 0.95rem 1.6rem; border-radius: 999px; font-family: ${fonts.body}; font-size: 0.85rem; letter-spacing: 0.16em; text-transform: uppercase; cursor: pointer; transition: transform 180ms, box-shadow 180ms; align-self: flex-start; }
.la-book__cta:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(201,169,110,0.35); }
.la-book__cta:focus-visible { outline: 2px solid ${palette.cream}; outline-offset: 2px; }
.la-book__back { background: transparent; color: ${palette.cream}; border: 1px solid rgba(244,239,223,0.4); padding: 0.85rem 1.4rem; border-radius: 999px; font-family: ${fonts.body}; font-size: 0.78rem; letter-spacing: 0.16em; text-transform: uppercase; cursor: pointer; }
.la-book__deposit { display: flex; justify-content: space-between; align-items: baseline; padding: 1.25rem 0; border-top: 1px solid rgba(244,239,223,0.18); border-bottom: 1px solid rgba(244,239,223,0.18); }
.la-book__deposit span { font-size: 0.85rem; opacity: 0.85; }
.la-book__deposit strong { font-family: ${fonts.display}; font-size: 1.7rem; font-weight: 400; color: ${palette.dawn}; }
.la-book__deposit-line { font-size: 0.95rem; opacity: 0.9; margin: 0; }
.la-book__deposit-fine { font-size: 0.78rem; opacity: 0.7; margin: 0; line-height: 1.55; }
.la-book__card { display: grid; grid-template-columns: 1fr 120px 80px; gap: 0.5rem; padding: 0.85rem 1rem; background: rgba(244,239,223,0.08); border: 1px solid rgba(244,239,223,0.22); border-radius: 4px; }
.la-book__card input { background: transparent; border: none; color: ${palette.cream}; font-family: ${fonts.body}; font-size: 0.95rem; outline: none; }
.la-book__card input::placeholder { color: rgba(244,239,223,0.5); }
.la-book__success { text-align: center; padding: 2rem 0; }
.la-book__seal { width: 64px; height: 64px; margin: 0 auto 1.5rem; border: 1px solid ${palette.dawn}; border-radius: 999px; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: ${palette.dawn}; }
.la-book__success h3 { font-family: ${fonts.display}; font-weight: 400; font-size: 2rem; margin: 0 0 0.75rem; }
.la-book__conf { font-family: ${fonts.body}; font-size: 0.85rem; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.8; margin: 0 0 0.5rem; }
.la-book__conf code { font-family: ${fonts.mono}; color: ${palette.dawn}; letter-spacing: 0.18em; }
.la-book__summary { font-family: ${fonts.display}; font-style: italic; opacity: 0.92; margin: 0 0 2rem; }
@media (prefers-reduced-motion: reduce) {
  .la-book__cta { transition: none; }
  .la-book__cta:hover { transform: none; }
}
@media (max-width: 720px) {
  .la-book__row { grid-template-columns: 1fr; }
  .la-book__card { grid-template-columns: 1fr; }
}
`;
```

> **Note for the implementer:** The plan imports `@stripe/react-stripe-js` at the top of this file but the project package.json does NOT include it (only `@stripe/stripe-js`). The component renders a styled `FakeCardField` instead of real Stripe Elements. **Remove the unused imports** (`Elements`, `CardElement`, `useElements`, `useStripe`, and the `@stripe/react-stripe-js` import line) before committing — they will fail typecheck. Adding `@stripe/react-stripe-js` is out of scope tonight (would require Director approval per the constraint "no new top-level dependencies"). The fake card field is visually faithful enough for a presentation demo.

- [ ] **Step 2: Remove unused Stripe Elements imports**

Open the file and delete:
```ts
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
```
Also delete the unused `getStripe` import (we keep `fakeChargeDeposit` only).

Final imports:
```ts
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { palette, fonts } from "../_lib/tokens";
import { fakeChargeDeposit } from "../_lib/stripe-demo";
```

- [ ] **Step 3: Type-check & commit**

```bash
npx tsc --noEmit -p tsconfig.json
git add src/app/sites/lake-arthur/_sections/BookTeeTime.tsx
git commit -m "feat(lake-arthur): three-step tee time booking with deposit demo"
```

---

### Task 10: `Banquets.tsx` — banquet & wedding inquiry

**Files:**
- Create: `src/app/sites/lake-arthur/_sections/Banquets.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { palette, fonts } from "../_lib/tokens";

const schema = z.object({
  eventType: z.enum(["wedding", "corporate", "tournament", "private", "other"]),
  date: z.string().min(1, "Pick a date"),
  headcount: z.coerce.number().min(1, "Headcount is required"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone required"),
  vision: z.string().optional(),
});
type Form = z.infer<typeof schema>;

export function Banquets() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>();

  async function onSubmit(values: Form) {
    await new Promise((r) => setTimeout(r, 800));
    // eslint-disable-next-line no-console
    console.log("[banquets] inquiry", values);
    setSubmitted(true);
  }

  return (
    <section id="banquets" className="la-banq" aria-labelledby="la-banq-title">
      <div className="la-banq__hero" role="img" aria-label="Sunset wedding scene at the lake">
        <div className="la-banq__hero-overlay" />
      </div>
      <div className="la-banq__panel">
        <div className="la-banq__copy">
          <p className="la-banq__eyebrow">Banquets & Weddings</p>
          <h2 id="la-banq-title" className="la-banq__title">Celebrate on the lake.</h2>
          <p className="la-banq__lede">
            Sunset receptions over the water, corporate dinners in the
            clubhouse, charity galas under tented terraces. Tell us about
            your event and our team will be in touch within a day.
          </p>
        </div>
        <div className="la-banq__formcol">
          {!submitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="la-banq__form" noValidate>
              <label className="la-banq__field">
                <span>Event type</span>
                <select {...register("eventType")} defaultValue="wedding">
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate</option>
                  <option value="tournament">Charity tournament</option>
                  <option value="private">Private dinner</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <div className="la-banq__row">
                <label className="la-banq__field">
                  <span>Date</span>
                  <input type="date" {...register("date")} />
                  {errors.date && <em>{errors.date.message}</em>}
                </label>
                <label className="la-banq__field">
                  <span>Headcount</span>
                  <input type="number" min={1} {...register("headcount", { valueAsNumber: true })} />
                  {errors.headcount && <em>{errors.headcount.message}</em>}
                </label>
              </div>
              <label className="la-banq__field">
                <span>Your name</span>
                <input type="text" {...register("name")} />
                {errors.name && <em>{errors.name.message}</em>}
              </label>
              <div className="la-banq__row">
                <label className="la-banq__field">
                  <span>Email</span>
                  <input type="email" {...register("email")} />
                  {errors.email && <em>{errors.email.message}</em>}
                </label>
                <label className="la-banq__field">
                  <span>Phone</span>
                  <input type="tel" {...register("phone")} />
                  {errors.phone && <em>{errors.phone.message}</em>}
                </label>
              </div>
              <label className="la-banq__field">
                <span>Tell us about your vision (optional)</span>
                <textarea rows={4} {...register("vision")} />
              </label>
              <button className="la-banq__cta" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending…" : "Send inquiry →"}
              </button>
            </form>
          ) : (
            <div className="la-banq__success">
              <p className="la-banq__success-eyebrow">Thank you</p>
              <h3>We'll be in touch within 24 hours.</h3>
              <p>Pat from our events team will reach out to walk through dates and packages.</p>
            </div>
          )}
        </div>
      </div>
      <style>{css}</style>
    </section>
  );
}

const css = `
.la-banq { background: ${palette.charcoal}; color: ${palette.cream}; padding: 0; position: relative; }
.la-banq__hero { height: 50vh; min-height: 320px; background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%), linear-gradient(135deg, #6B3F2A 0%, #C9A96E 50%, #2C5530 100%); position: relative; }
.la-banq__hero-overlay { position: absolute; inset: 0; background: radial-gradient(ellipse at 70% 80%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.45) 100%); }
.la-banq__panel { max-width: 1180px; margin: -120px auto 0; background: ${palette.paper}; color: ${palette.charcoal}; position: relative; padding: 4rem 4rem; display: grid; grid-template-columns: 1fr 1.1fr; gap: 4rem; box-shadow: 0 24px 60px rgba(0,0,0,0.18); border-radius: 4px; }
.la-banq__copy { padding-top: 0.5rem; }
.la-banq__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.fairway}; margin: 0 0 1.25rem; }
.la-banq__title { font-family: ${fonts.display}; font-size: clamp(2rem, 4.5vw, 3rem); font-weight: 400; line-height: 1.1; color: ${palette.water}; margin: 0 0 1.5rem; }
.la-banq__lede { font-family: ${fonts.display}; font-style: italic; font-size: 1.05rem; line-height: 1.65; margin: 0; color: ${palette.smoke}; }
.la-banq__form { display: flex; flex-direction: column; gap: 1.25rem; font-family: ${fonts.body}; }
.la-banq__row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.la-banq__field { display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.9rem; }
.la-banq__field span { font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; color: ${palette.smoke}; }
.la-banq__field input, .la-banq__field select, .la-banq__field textarea { background: ${palette.white}; border: 1px solid rgba(26,26,26,0.18); padding: 0.78rem 0.95rem; border-radius: 3px; font-family: inherit; font-size: 0.95rem; color: ${palette.charcoal}; }
.la-banq__field input:focus, .la-banq__field select:focus, .la-banq__field textarea:focus { outline: none; border-color: ${palette.dawn}; box-shadow: 0 0 0 2px rgba(201,169,110,0.22); }
.la-banq__field em { color: #A03A2A; font-size: 0.74rem; font-style: normal; }
.la-banq__cta { background: ${palette.water}; color: ${palette.cream}; border: none; padding: 0.95rem 1.6rem; border-radius: 999px; font-family: ${fonts.body}; font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; align-self: flex-start; transition: transform 180ms, box-shadow 180ms; }
.la-banq__cta:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(14,42,63,0.32); }
.la-banq__cta:disabled { opacity: 0.6; cursor: progress; }
.la-banq__success { text-align: left; padding: 2rem 0; }
.la-banq__success-eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.28em; text-transform: uppercase; color: ${palette.fairway}; margin: 0 0 1rem; }
.la-banq__success h3 { font-family: ${fonts.display}; font-weight: 400; font-size: 1.6rem; line-height: 1.2; margin: 0 0 1rem; color: ${palette.water}; }
.la-banq__success p { margin: 0; font-family: ${fonts.body}; line-height: 1.6; color: ${palette.smoke}; }
@media (prefers-reduced-motion: reduce) { .la-banq__cta { transition: none; } }
@media (max-width: 920px) {
  .la-banq__panel { grid-template-columns: 1fr; padding: 3rem 2rem; margin: -80px 1rem 0; }
  .la-banq__row { grid-template-columns: 1fr; }
}
`;
```

- [ ] **Step 2: Type-check & commit**

```bash
npx tsc --noEmit -p tsconfig.json
git add src/app/sites/lake-arthur/_sections/Banquets.tsx
git commit -m "feat(lake-arthur): banquets & weddings inquiry section"
```

---

### Task 11: `Tournaments.tsx` — three-card grid + detail panel + mini inquiry

**Files:**
- Create: `src/app/sites/lake-arthur/_sections/Tournaments.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { tournaments } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

const inquirySchema = z.object({
  date: z.string().min(1, "Pick a date"),
  headcount: z.coerce.number().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  notes: z.string().optional(),
});
type Inquiry = z.infer<typeof inquirySchema>;

export function Tournaments() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <section id="tournaments" className="la-tour" aria-labelledby="la-tour-title">
      <header className="la-tour__intro">
        <p className="la-tour__eyebrow">Tournaments</p>
        <h2 id="la-tour-title" className="la-tour__title">Run your event here.</h2>
        <p className="la-tour__lede">
          Three formats. One scenic course. From a ten-team charity scramble
          to a sixty-four-team member-guest, we host it.
        </p>
      </header>
      <div className="la-tour__grid">
        {tournaments.map((t) => (
          <div key={t.slug} className={`la-tour__card${openSlug === t.slug ? " is-open" : ""}`}>
            <h3 className="la-tour__card-title">{t.title}</h3>
            <p className="la-tour__card-pitch">{t.pitch}</p>
            <dl className="la-tour__card-stats">
              <div><dt>Capacity</dt><dd>{t.capacity.value}</dd></div>
              <div><dt>From</dt><dd>{t.pricePerTeam.value}</dd></div>
            </dl>
            <button
              type="button"
              className="la-tour__card-toggle"
              onClick={() => setOpenSlug(openSlug === t.slug ? null : t.slug)}
              aria-expanded={openSlug === t.slug}
              aria-controls={`la-tour-detail-${t.slug}`}
            >
              {openSlug === t.slug ? "Close" : "Details & inquire"}
            </button>
            {openSlug === t.slug && <TournamentDetail slug={t.slug} inclusions={t.inclusions} />}
          </div>
        ))}
      </div>
      <style>{css}</style>
    </section>
  );
}

function TournamentDetail({ slug, inclusions }: { slug: string; inclusions: string[] }) {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inquiry>();

  async function onSubmit(values: Inquiry) {
    await new Promise((r) => setTimeout(r, 700));
    // eslint-disable-next-line no-console
    console.log(`[tournaments:${slug}] inquiry`, values);
    setSubmitted(true);
  }

  return (
    <div id={`la-tour-detail-${slug}`} className="la-tour__detail">
      <ul className="la-tour__incl">
        {inclusions.map((i) => <li key={i}>{i}</li>)}
      </ul>
      {!submitted ? (
        <form onSubmit={handleSubmit(onSubmit)} className="la-tour__form" noValidate>
          <div className="la-tour__row">
            <label className="la-tour__field"><span>Target date</span><input type="date" {...register("date")} />{errors.date && <em>required</em>}</label>
            <label className="la-tour__field"><span>Players</span><input type="number" min={1} {...register("headcount", { valueAsNumber: true })} /></label>
          </div>
          <div className="la-tour__row">
            <label className="la-tour__field"><span>Name</span><input type="text" {...register("name")} /></label>
            <label className="la-tour__field"><span>Email</span><input type="email" {...register("email")} /></label>
          </div>
          <div className="la-tour__row">
            <label className="la-tour__field"><span>Phone</span><input type="tel" {...register("phone")} /></label>
            <label className="la-tour__field"><span>Notes</span><input type="text" {...register("notes")} placeholder="Optional" /></label>
          </div>
          <button type="submit" className="la-tour__cta" disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "Request a quote →"}
          </button>
        </form>
      ) : (
        <div className="la-tour__success">
          <h4>Thanks — we'll send a quote within two business days.</h4>
        </div>
      )}
    </div>
  );
}

const css = `
.la-tour { padding: 7rem 5vw; background: ${palette.fairwayDeep}; color: ${palette.cream}; }
.la-tour__intro { max-width: 720px; margin: 0 auto 4rem; text-align: center; }
.la-tour__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.dawn}; margin: 0 0 1.25rem; }
.la-tour__title { font-family: ${fonts.display}; font-size: clamp(2.2rem, 5vw, 3.4rem); font-weight: 400; line-height: 1.1; margin: 0 0 1.25rem; }
.la-tour__lede { font-family: ${fonts.display}; font-style: italic; opacity: 0.85; font-size: 1.05rem; line-height: 1.65; margin: 0; }
.la-tour__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; max-width: 1180px; margin: 0 auto; }
.la-tour__card { background: rgba(244,239,223,0.06); border: 1px solid rgba(244,239,223,0.18); border-radius: 4px; padding: 2.25rem 2rem; display: flex; flex-direction: column; gap: 1rem; transition: border-color 200ms; font-family: ${fonts.body}; }
.la-tour__card.is-open { grid-column: 1 / -1; }
.la-tour__card-title { font-family: ${fonts.display}; font-weight: 400; font-size: 1.6rem; margin: 0; }
.la-tour__card-pitch { font-family: ${fonts.display}; font-style: italic; font-size: 1rem; line-height: 1.55; margin: 0; opacity: 0.9; }
.la-tour__card-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin: 0; padding: 1rem 0 0; border-top: 1px solid rgba(244,239,223,0.18); }
.la-tour__card-stats dt { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.7; margin: 0 0 0.25rem; }
.la-tour__card-stats dd { font-family: ${fonts.display}; font-size: 1.05rem; margin: 0; color: ${palette.dawn}; }
.la-tour__card-toggle { background: transparent; color: ${palette.cream}; border: 1px solid rgba(244,239,223,0.4); padding: 0.7rem 1.2rem; border-radius: 999px; font-size: 0.78rem; letter-spacing: 0.16em; text-transform: uppercase; cursor: pointer; align-self: flex-start; transition: background 180ms; }
.la-tour__card-toggle:hover { background: rgba(244,239,223,0.1); }
.la-tour__card-toggle:focus-visible { outline: 2px solid ${palette.dawn}; outline-offset: 2px; }
.la-tour__detail { display: grid; grid-template-columns: 1fr 1.2fr; gap: 2.5rem; padding: 1.5rem 0 0; border-top: 1px solid rgba(244,239,223,0.18); margin-top: 1rem; }
.la-tour__incl { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.95rem; opacity: 0.92; }
.la-tour__incl li::before { content: "— "; color: ${palette.dawn}; }
.la-tour__form { display: flex; flex-direction: column; gap: 1rem; }
.la-tour__row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.la-tour__field { display: flex; flex-direction: column; gap: 0.3rem; font-size: 0.85rem; }
.la-tour__field span { font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.75; }
.la-tour__field input { background: rgba(244,239,223,0.08); border: 1px solid rgba(244,239,223,0.22); color: ${palette.cream}; padding: 0.7rem 0.9rem; border-radius: 3px; font-family: inherit; font-size: 0.92rem; }
.la-tour__field input:focus { outline: none; border-color: ${palette.dawn}; box-shadow: 0 0 0 2px rgba(201,169,110,0.22); }
.la-tour__field em { color: ${palette.dawn}; font-style: normal; font-size: 0.7rem; }
.la-tour__cta { background: ${palette.dawn}; color: ${palette.fairwayDeep}; border: none; padding: 0.85rem 1.5rem; border-radius: 999px; font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; font-family: ${fonts.body}; cursor: pointer; align-self: flex-start; }
.la-tour__cta:disabled { opacity: 0.6; }
.la-tour__success h4 { font-family: ${fonts.display}; font-weight: 400; font-size: 1.4rem; margin: 0; }
@media (max-width: 920px) {
  .la-tour__grid { grid-template-columns: 1fr; }
  .la-tour__detail { grid-template-columns: 1fr; }
  .la-tour__row { grid-template-columns: 1fr; }
}
`;
```

- [ ] **Step 2: Type-check & commit**

```bash
npx tsc --noEmit -p tsconfig.json
git add src/app/sites/lake-arthur/_sections/Tournaments.tsx
git commit -m "feat(lake-arthur): tournaments grid with detail + inquiry"
```

---

### Task 12: `Leagues.tsx` — four-card grid with inline signup

**Files:**
- Create: `src/app/sites/lake-arthur/_sections/Leagues.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { leagues } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email(),
  phone: z.string().min(7),
});
type SignupForm = z.infer<typeof schema>;

export function Leagues() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [confirmedSlug, setConfirmedSlug] = useState<string | null>(null);

  return (
    <section id="leagues" className="la-lg" aria-labelledby="la-lg-title">
      <header className="la-lg__intro">
        <p className="la-lg__eyebrow">Leagues</p>
        <h2 id="la-lg-title" className="la-lg__title">Find your weekly group.</h2>
        <p className="la-lg__lede">
          Four leagues, four nights, four very different vibes. Sign up
          here and we'll add you to the roster before the season starts.
        </p>
      </header>
      <div className="la-lg__grid">
        {leagues.map((l) => (
          <article key={l.slug} className="la-lg__card">
            <h3 className="la-lg__card-title">{l.title}</h3>
            <dl className="la-lg__card-meta">
              <div><dt>When</dt><dd>{l.schedule.value}</dd></div>
              <div><dt>Season</dt><dd>{l.season.value}</dd></div>
              <div><dt>Fee</dt><dd>{l.fee.value}</dd></div>
            </dl>
            {confirmedSlug === l.slug ? (
              <div className="la-lg__confirmed">
                <p>Welcome — we've added you to the roster.</p>
              </div>
            ) : openSlug === l.slug ? (
              <SignupForm onClose={() => setOpenSlug(null)} onSuccess={() => { setConfirmedSlug(l.slug); setOpenSlug(null); }} slug={l.slug} />
            ) : (
              <button
                type="button"
                className="la-lg__cta"
                onClick={() => setOpenSlug(l.slug)}
              >
                Sign up →
              </button>
            )}
          </article>
        ))}
      </div>
      <style>{css}</style>
    </section>
  );
}

function SignupForm({ slug, onClose, onSuccess }: { slug: string; onClose: () => void; onSuccess: () => void }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupForm>();

  async function onSubmit(values: SignupForm) {
    await new Promise((r) => setTimeout(r, 600));
    // eslint-disable-next-line no-console
    console.log(`[leagues:${slug}] signup`, values);
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="la-lg__form" noValidate>
      <label className="la-lg__field">
        <span>Name</span>
        <input type="text" {...register("name")} />
        {errors.name && <em>{errors.name.message}</em>}
      </label>
      <label className="la-lg__field">
        <span>Email</span>
        <input type="email" {...register("email")} />
        {errors.email && <em>{errors.email.message}</em>}
      </label>
      <label className="la-lg__field">
        <span>Phone</span>
        <input type="tel" {...register("phone")} />
      </label>
      <div className="la-lg__form-row">
        <button type="button" className="la-lg__back" onClick={onClose}>Cancel</button>
        <button type="submit" className="la-lg__cta" disabled={isSubmitting}>
          {isSubmitting ? "Adding…" : "Add me"}
        </button>
      </div>
    </form>
  );
}

const css = `
.la-lg { padding: 7rem 5vw; background: ${palette.cream}; color: ${palette.charcoal}; }
.la-lg__intro { max-width: 640px; margin: 0 auto 4rem; text-align: center; }
.la-lg__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.fairway}; margin: 0 0 1.25rem; }
.la-lg__title { font-family: ${fonts.display}; font-size: clamp(2.2rem, 5vw, 3.2rem); font-weight: 400; line-height: 1.1; color: ${palette.water}; margin: 0 0 1.25rem; }
.la-lg__lede { font-family: ${fonts.display}; font-style: italic; font-size: 1.05rem; line-height: 1.65; margin: 0; color: ${palette.smoke}; }
.la-lg__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; max-width: 1180px; margin: 0 auto; }
.la-lg__card { background: ${palette.paper}; border: 1px solid rgba(26,26,26,0.1); border-radius: 4px; padding: 2.25rem 2rem; display: flex; flex-direction: column; gap: 1.25rem; font-family: ${fonts.body}; }
.la-lg__card-title { font-family: ${fonts.display}; font-weight: 400; font-size: 1.7rem; color: ${palette.water}; margin: 0; }
.la-lg__card-meta { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem; margin: 0; padding: 1rem 0; border-top: 1px solid rgba(26,26,26,0.12); border-bottom: 1px solid rgba(26,26,26,0.12); }
.la-lg__card-meta dt { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: ${palette.smoke}; margin: 0 0 0.3rem; }
.la-lg__card-meta dd { font-size: 0.85rem; line-height: 1.45; margin: 0; }
.la-lg__cta { background: ${palette.fairway}; color: ${palette.cream}; border: none; padding: 0.85rem 1.5rem; border-radius: 999px; font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; align-self: flex-start; transition: background 180ms; }
.la-lg__cta:hover { background: ${palette.fairwayDeep}; }
.la-lg__cta:focus-visible { outline: 2px solid ${palette.dawn}; outline-offset: 2px; }
.la-lg__back { background: transparent; color: ${palette.smoke}; border: 1px solid rgba(26,26,26,0.18); padding: 0.78rem 1.4rem; border-radius: 999px; font-size: 0.78rem; letter-spacing: 0.16em; text-transform: uppercase; cursor: pointer; }
.la-lg__form { display: flex; flex-direction: column; gap: 0.85rem; }
.la-lg__field { display: flex; flex-direction: column; gap: 0.3rem; font-size: 0.85rem; }
.la-lg__field span { font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: ${palette.smoke}; }
.la-lg__field input { background: ${palette.white}; border: 1px solid rgba(26,26,26,0.18); padding: 0.7rem 0.9rem; border-radius: 3px; font-family: inherit; font-size: 0.92rem; }
.la-lg__field input:focus { outline: none; border-color: ${palette.dawn}; box-shadow: 0 0 0 2px rgba(201,169,110,0.22); }
.la-lg__field em { color: #A03A2A; font-style: normal; font-size: 0.72rem; }
.la-lg__form-row { display: flex; justify-content: flex-end; gap: 0.75rem; }
.la-lg__confirmed { padding: 1rem; background: rgba(44,85,48,0.08); border: 1px solid ${palette.fairway}; border-radius: 4px; font-family: ${fonts.display}; font-style: italic; color: ${palette.fairwayDeep}; }
.la-lg__confirmed p { margin: 0; }
@media (max-width: 720px) {
  .la-lg__grid { grid-template-columns: 1fr; }
  .la-lg__card-meta { grid-template-columns: 1fr; }
}
`;
```

- [ ] **Step 2: Type-check & commit**

```bash
npx tsc --noEmit -p tsconfig.json
git add src/app/sites/lake-arthur/_sections/Leagues.tsx
git commit -m "feat(lake-arthur): leagues grid with inline signup"
```

---

### Task 13: `ProShop.tsx` — compact product grid

**Files:**
- Create: `src/app/sites/lake-arthur/_sections/ProShop.tsx`

- [ ] **Step 1: Write the file**

```tsx
import { proShop, meta } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

export function ProShop() {
  return (
    <section id="shop" className="la-shop" aria-labelledby="la-shop-title">
      <header className="la-shop__intro">
        <p className="la-shop__eyebrow">Pro shop</p>
        <h2 id="la-shop-title" className="la-shop__title">Take a piece of the lake home.</h2>
        <p className="la-shop__lede">A small selection of our most-loved gear. Full shop arriving with the new build.</p>
      </header>
      <ul className="la-shop__grid">
        {proShop.map((p) => (
          <li key={p.slug} className="la-shop__card">
            <div className="la-shop__art" aria-hidden="true">
              <span>{p.title.split(" ").map(w => w[0]).slice(0, 2).join("")}</span>
            </div>
            <p className="la-shop__tag">{p.tag}</p>
            <h3 className="la-shop__name">{p.title}</h3>
            <p className="la-shop__price">{p.price.value}</p>
            <button type="button" className="la-shop__cta" disabled aria-disabled="true">
              Coming with new shop
            </button>
          </li>
        ))}
      </ul>
      <p className="la-shop__footer">
        Need something now?{" "}
        <a href={meta.bookingUrlExternal.value} target="_blank" rel="noreferrer">Visit the current shop ↗</a>
      </p>
      <style>{css}</style>
    </section>
  );
}

const css = `
.la-shop { padding: 7rem 5vw; background: ${palette.paper}; color: ${palette.charcoal}; }
.la-shop__intro { max-width: 720px; margin: 0 auto 4rem; text-align: center; }
.la-shop__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.fairway}; margin: 0 0 1.25rem; }
.la-shop__title { font-family: ${fonts.display}; font-size: clamp(2rem, 4.5vw, 3rem); font-weight: 400; line-height: 1.1; color: ${palette.water}; margin: 0 0 1.25rem; }
.la-shop__lede { font-family: ${fonts.display}; font-style: italic; font-size: 1rem; line-height: 1.6; color: ${palette.smoke}; margin: 0; }
.la-shop__grid { list-style: none; padding: 0; margin: 0 auto; max-width: 1180px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem 1.5rem; }
.la-shop__card { display: flex; flex-direction: column; gap: 0.4rem; font-family: ${fonts.body}; }
.la-shop__art { aspect-ratio: 4/5; background: linear-gradient(135deg, ${palette.fog} 0%, ${palette.cream} 100%); border-radius: 3px; display: flex; align-items: center; justify-content: center; margin: 0 0 0.85rem; color: ${palette.fairwayDeep}; font-family: ${fonts.display}; font-size: 2.6rem; letter-spacing: -0.03em; opacity: 0.55; }
.la-shop__tag { font-size: 0.65rem; letter-spacing: 0.22em; text-transform: uppercase; color: ${palette.fairway}; margin: 0; }
.la-shop__name { font-family: ${fonts.display}; font-weight: 400; font-size: 1.05rem; line-height: 1.3; color: ${palette.water}; margin: 0; }
.la-shop__price { font-family: ${fonts.display}; font-size: 1.05rem; margin: 0; color: ${palette.charcoal}; }
.la-shop__cta { background: transparent; color: ${palette.smoke}; border: 1px solid rgba(26,26,26,0.18); padding: 0.55rem 0.9rem; border-radius: 999px; font-size: 0.7rem; letter-spacing: 0.16em; text-transform: uppercase; margin-top: 0.4rem; align-self: flex-start; cursor: not-allowed; opacity: 0.7; }
.la-shop__footer { text-align: center; margin: 3.5rem 0 0; font-family: ${fonts.body}; font-size: 0.92rem; color: ${palette.smoke}; }
.la-shop__footer a { color: ${palette.fairway}; text-decoration: none; border-bottom: 1px solid currentColor; padding-bottom: 1px; }
.la-shop__footer a:hover { color: ${palette.water}; }
@media (max-width: 920px) { .la-shop__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .la-shop__grid { grid-template-columns: 1fr; } }
`;
```

- [ ] **Step 2: Type-check & commit**

```bash
npx tsc --noEmit -p tsconfig.json
git add src/app/sites/lake-arthur/_sections/ProShop.tsx
git commit -m "feat(lake-arthur): pro shop grid"
```

---

### Task 14: `Visit.tsx` — address, map, hours, contact

**Files:**
- Create: `src/app/sites/lake-arthur/_sections/Visit.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { meta } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(4),
});
type ContactForm = z.infer<typeof schema>;

const MAP_EMBED = "https://www.google.com/maps?q=255+Isle+Rd,+Butler,+PA+16001&output=embed";

export function Visit() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactForm>();

  async function onSubmit(values: ContactForm) {
    await new Promise((r) => setTimeout(r, 600));
    // eslint-disable-next-line no-console
    console.log("[visit:contact]", values);
    setSubmitted(true);
  }

  return (
    <section id="visit" className="la-visit" aria-labelledby="la-visit-title">
      <div className="la-visit__map">
        <iframe
          title="Map to Lake Arthur Golf Club"
          src={MAP_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="la-visit__panel">
        <header>
          <p className="la-visit__eyebrow">Visit</p>
          <h2 id="la-visit-title" className="la-visit__title">{meta.address.value.split(",")[0]}</h2>
          <p className="la-visit__sub">{meta.address.value}</p>
        </header>
        <dl className="la-visit__meta">
          <div>
            <dt>Phone</dt>
            <dd><a href={`tel:${meta.phone.value.replace(/\D/g, "")}`}>{meta.phone.value}</a></dd>
          </div>
          <div>
            <dt>Hours</dt>
            <dd>{meta.hoursLine.value}</dd>
          </div>
        </dl>
        {!submitted ? (
          <form className="la-visit__form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <label className="la-visit__field"><span>Your name</span><input type="text" {...register("name")} />{errors.name && <em>required</em>}</label>
            <label className="la-visit__field"><span>Email</span><input type="email" {...register("email")} />{errors.email && <em>valid email needed</em>}</label>
            <label className="la-visit__field"><span>Message</span><textarea rows={3} {...register("message")} />{errors.message && <em>add a few words</em>}</label>
            <button type="submit" className="la-visit__cta" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Send message →"}</button>
          </form>
        ) : (
          <div className="la-visit__success">
            <p>Thanks — we'll be in touch soon.</p>
          </div>
        )}
      </div>
      <style>{css}</style>
    </section>
  );
}

const css = `
.la-visit { display: grid; grid-template-columns: 1fr 1fr; min-height: 70vh; background: ${palette.water}; color: ${palette.cream}; }
.la-visit__map { position: relative; min-height: 420px; }
.la-visit__map iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; filter: grayscale(0.4) contrast(0.95); }
.la-visit__panel { padding: 5rem 5vw; max-width: 600px; }
.la-visit__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.dawn}; margin: 0 0 1.25rem; }
.la-visit__title { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(2rem, 4.5vw, 2.8rem); line-height: 1.1; margin: 0 0 0.75rem; }
.la-visit__sub { font-family: ${fonts.display}; font-style: italic; opacity: 0.85; margin: 0 0 2.5rem; }
.la-visit__meta { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; padding: 1.5rem 0; border-top: 1px solid rgba(244,239,223,0.18); border-bottom: 1px solid rgba(244,239,223,0.18); margin: 0 0 2rem; font-family: ${fonts.body}; }
.la-visit__meta dt { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.65; margin: 0 0 0.4rem; }
.la-visit__meta dd { font-size: 0.95rem; margin: 0; }
.la-visit__meta a { color: ${palette.dawn}; text-decoration: none; }
.la-visit__form { display: flex; flex-direction: column; gap: 1rem; font-family: ${fonts.body}; }
.la-visit__field { display: flex; flex-direction: column; gap: 0.3rem; font-size: 0.85rem; }
.la-visit__field span { font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.75; }
.la-visit__field input, .la-visit__field textarea { background: rgba(244,239,223,0.08); border: 1px solid rgba(244,239,223,0.22); color: ${palette.cream}; padding: 0.7rem 0.95rem; border-radius: 3px; font-family: inherit; font-size: 0.92rem; }
.la-visit__field input:focus, .la-visit__field textarea:focus { outline: none; border-color: ${palette.dawn}; box-shadow: 0 0 0 2px rgba(201,169,110,0.22); }
.la-visit__field em { color: ${palette.dawn}; font-style: normal; font-size: 0.72rem; }
.la-visit__cta { background: ${palette.dawn}; color: ${palette.water}; border: none; padding: 0.85rem 1.5rem; border-radius: 999px; font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; align-self: flex-start; }
.la-visit__cta:disabled { opacity: 0.6; cursor: progress; }
.la-visit__success p { font-family: ${fonts.display}; font-style: italic; font-size: 1.1rem; margin: 0; }
@media (max-width: 920px) { .la-visit { grid-template-columns: 1fr; } .la-visit__map { min-height: 320px; } .la-visit__panel { padding: 3rem 2rem; } }
`;
```

- [ ] **Step 2: Type-check & commit**

```bash
npx tsc --noEmit -p tsconfig.json
git add src/app/sites/lake-arthur/_sections/Visit.tsx
git commit -m "feat(lake-arthur): visit section with map and contact form"
```

---

### Task 15: `Footer.tsx`

**Files:**
- Create: `src/app/sites/lake-arthur/_sections/Footer.tsx`

- [ ] **Step 1: Write the file**

```tsx
import { meta } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

export function Footer() {
  return (
    <footer id="footer" className="la-foot">
      <div className="la-foot__inner">
        <div className="la-foot__brand">
          <p className="la-foot__mark">Lake Arthur</p>
          <p className="la-foot__addr">{meta.address.value}</p>
          <p className="la-foot__phone">{meta.phone.value}</p>
        </div>
        <nav className="la-foot__nav" aria-label="Footer">
          <div>
            <h4>The course</h4>
            <a href="#course-at-a-glance">Course details</a>
            <a href="#field-guide">Field guide</a>
            <a href="#book">Book a tee time</a>
            <a href="#shop">Pro shop</a>
          </div>
          <div>
            <h4>Events</h4>
            <a href="#banquets">Banquets & weddings</a>
            <a href="#tournaments">Tournaments</a>
            <a href="#leagues">Leagues</a>
          </div>
          <div>
            <h4>Visit</h4>
            <a href="#visit">Directions</a>
            <a href={`tel:${meta.phone.value.replace(/\D/g, "")}`}>Call us</a>
          </div>
        </nav>
      </div>
      <div className="la-foot__rule" aria-hidden="true" />
      <p className="la-foot__credit">
        © {new Date().getFullYear()} Lake Arthur Golf Club · Site designed by{" "}
        <a href="/proposal/lake-arthur">KPT Designs</a>
      </p>
      <style>{css}</style>
    </footer>
  );
}

const css = `
.la-foot { background: ${palette.charcoal}; color: ${palette.cream}; padding: 5rem 5vw 2rem; font-family: ${fonts.body}; }
.la-foot__inner { display: grid; grid-template-columns: 1fr 2fr; gap: 4rem; max-width: 1180px; margin: 0 auto 3rem; }
.la-foot__brand p { margin: 0 0 0.4rem; opacity: 0.85; font-size: 0.9rem; }
.la-foot__mark { font-family: ${fonts.display}; font-size: 1.6rem; font-weight: 400; opacity: 1 !important; color: ${palette.dawn}; }
.la-foot__addr { font-family: ${fonts.display}; font-style: italic; }
.la-foot__nav { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.la-foot__nav h4 { font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase; color: ${palette.dawn}; margin: 0 0 1rem; }
.la-foot__nav a { display: block; color: ${palette.cream}; text-decoration: none; opacity: 0.78; font-size: 0.9rem; margin: 0 0 0.5rem; transition: opacity 180ms; }
.la-foot__nav a:hover { opacity: 1; color: ${palette.dawn}; }
.la-foot__rule { max-width: 1180px; margin: 0 auto; height: 1px; background: rgba(244,239,223,0.16); }
.la-foot__credit { max-width: 1180px; margin: 1.5rem auto 0; font-size: 0.78rem; opacity: 0.65; }
.la-foot__credit a { color: ${palette.dawn}; text-decoration: none; }
@media (max-width: 720px) { .la-foot__inner { grid-template-columns: 1fr; } .la-foot__nav { grid-template-columns: 1fr 1fr; } }
`;
```

- [ ] **Step 2: Type-check & commit**

```bash
npx tsc --noEmit -p tsconfig.json
git add src/app/sites/lake-arthur/_sections/Footer.tsx
git commit -m "feat(lake-arthur): footer"
```

---

### Task 16: `/sites/lake-arthur/page.tsx` — assembly

**Files:**
- Create: `src/app/sites/lake-arthur/page.tsx`
- Create: `src/app/sites/lake-arthur/LakeArthurSite.tsx`

- [ ] **Step 1: Create the route entry (server component)**

```tsx
// src/app/sites/lake-arthur/page.tsx
import type { Metadata } from "next";
import { PageApproach } from "@/app/mockup/_lib/PageApproach";
import { LakeArthurSite } from "./LakeArthurSite";

export const metadata: Metadata = {
  title: "Lake Arthur Golf Club | Butler, PA",
  description:
    "Public 18-hole golf course on Lake Arthur in Butler, PA. Book a tee time, host a banquet, run a tournament, join a league.",
};

export default function Page() {
  return (
    <PageApproach>
      <LakeArthurSite />
    </PageApproach>
  );
}
```

- [ ] **Step 2: Create the assembly component**

```tsx
// src/app/sites/lake-arthur/LakeArthurSite.tsx
import { DroneHero } from "./_sections/DroneHero";
import { CourseAtAGlance } from "./_sections/CourseAtAGlance";
import { FieldGuide } from "./_sections/FieldGuide";
import { BookTeeTime } from "./_sections/BookTeeTime";
import { Banquets } from "./_sections/Banquets";
import { Tournaments } from "./_sections/Tournaments";
import { Leagues } from "./_sections/Leagues";
import { ProShop } from "./_sections/ProShop";
import { Visit } from "./_sections/Visit";
import { Footer } from "./_sections/Footer";
import { palette, fonts } from "./_lib/tokens";

export function LakeArthurSite() {
  return (
    <>
      <main className="la-site">
        <DroneHero />
        <CourseAtAGlance />
        <FieldGuide />
        <BookTeeTime />
        <Banquets />
        <Tournaments />
        <Leagues />
        <ProShop />
        <Visit />
        <Footer />
      </main>
      <style>{`
        .la-site { background: ${palette.paper}; color: ${palette.charcoal}; font-family: ${fonts.body}; min-height: 100vh; }
        @media (prefers-reduced-motion: reduce) { .la-site * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; } }
      `}</style>
    </>
  );
}
```

- [ ] **Step 3: Type-check, build, and verify in dev**

```bash
npx tsc --noEmit -p tsconfig.json
```

Then start the dev server in the background:
```bash
npm run dev > /tmp/dev.log 2>&1 &
sleep 6
```

Hit the route:
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/sites/lake-arthur
```
Expected: `200`.

Open in the Chrome MCP browser:
- `mcp__claude-in-chrome__tabs_create_mcp` with `url: "http://localhost:3000/sites/lake-arthur"`
- `mcp__claude-in-chrome__read_console_messages` — verify zero errors and zero React hydration warnings.
- `mcp__claude-in-chrome__get_page_text` — verify `Lake Arthur`, `Field guide`, `Book a tee time`, `Banquets`, `Tournaments`, `Leagues`, `Pro shop`, `Visit` all appear.

If errors appear, read them, fix the offending component, and re-run.

- [ ] **Step 4: Commit**

```bash
git add src/app/sites/lake-arthur/page.tsx src/app/sites/lake-arthur/LakeArthurSite.tsx
git commit -m "feat(lake-arthur): assemble route at /sites/lake-arthur"
```

---

## Gate 3 — Proposal Wrapper (`/proposal/lake-arthur`)

### Task 17: `annotations.ts`

**Files:**
- Create: `src/app/proposal/lake-arthur/_proposal/annotations.ts`

- [ ] **Step 1: Create directory & file**

```bash
mkdir -p src/app/proposal/lake-arthur/_proposal
```

```ts
// src/app/proposal/lake-arthur/_proposal/annotations.ts
export type Annotation = {
  anchorId: string;
  label: string;          // 1-3 words for the dot marker
  what: string;           // one line
  why: string;            // one line
};

export const annotations: Annotation[] = [
  {
    anchorId: "drone-hero",
    label: "Drone reel",
    what: "Cinematic hero replaces the static banner on the current site.",
    why: "Lake Arthur's biggest unfair advantage — its setting — finally takes the front seat. Replace this stock loop with hole-by-hole drone footage you film on the course.",
  },
  {
    anchorId: "course-at-a-glance",
    label: "Course details",
    what: "Course details surfaced as the second thing visitors see, not buried five clicks deep.",
    why: "Visitors today click 3-4 deep to find par, yardage, and rating. We pull it forward and let the design carry it.",
  },
  {
    anchorId: "book",
    label: "Booking",
    what: "Direct online booking with a small deposit hold replaces the third-party cps.golf link-out.",
    why: "Customers stay on your domain, you capture the email + payment method, and a $10/player hold cuts no-shows. Real Stripe integration follows after launch.",
  },
  {
    anchorId: "banquets",
    label: "Banquets",
    what: "Banquet leads captured directly with full context — event type, date, vision — instead of a generic contact form.",
    why: "Banquet inquiries are the highest-value lead type. The new form gives Pat what she needs to follow up the same day.",
  },
  {
    anchorId: "tournaments",
    label: "Tournaments",
    what: "Each tournament type gets its own entry point with format and inclusions visible upfront.",
    why: "Outing organizers comparison-shop. Showing pricing-from + inclusions kills the back-and-forth.",
  },
  {
    anchorId: "leagues",
    label: "Leagues",
    what: "Self-serve league signup; roster grows without phone tag.",
    why: "League captains report 40% of new joiners give up before the call connects. This converts them in-page.",
  },
];

export const annotationsByAnchor: Record<string, Annotation> =
  Object.fromEntries(annotations.map((a) => [a.anchorId, a]));
```

- [ ] **Step 2: Commit**

```bash
git add src/app/proposal/lake-arthur/_proposal/annotations.ts
git commit -m "feat(proposal): annotation copy for six redesign sections"
```

---

### Task 18: `Intro.tsx` — branded intro frame

**Files:**
- Create: `src/app/proposal/lake-arthur/_proposal/Intro.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { palette, fonts } from "@/app/sites/lake-arthur/_lib/tokens";

const STORAGE_KEY = "kpt:proposal:lake-arthur:intro-seen";

export function Intro({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1") {
      setShow(false);
      onDone();
      return;
    }
    const t = setTimeout(() => {
      finish();
    }, 3500);
    return () => clearTimeout(t);
  }, []);

  function finish() {
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, "1");
    setShow(false);
    onDone();
  }

  useEffect(() => {
    function handler(e: KeyboardEvent | MouseEvent) {
      if ("key" in e && e.key === "Escape") return; // Esc allowed but not needed
      if (show) finish();
    }
    window.addEventListener("keydown", handler);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("click", handler);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="la-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          role="dialog"
          aria-modal="true"
          aria-label="Proposal intro"
        >
          <motion.p className="la-intro__presents" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}>
            KPT Designs presents
          </motion.p>
          <motion.h1 className="la-intro__title" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}>
            <em>A proposal for</em><br />Lake Arthur Golf Club
          </motion.h1>
          <motion.p className="la-intro__where" initial={{ opacity: 0 }} animate={{ opacity: 0.85 }} transition={{ delay: 2.4, duration: 0.6 }}>
            Butler, PA · April 2026
          </motion.p>
          <motion.p className="la-intro__skip" initial={{ opacity: 0 }} animate={{ opacity: 0.55 }} transition={{ delay: 1.5, duration: 0.6 }}>
            Click anywhere to continue
          </motion.p>
          <style>{css}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const css = `
.la-intro { position: fixed; inset: 0; z-index: 70; background: ${palette.charcoal}; color: ${palette.cream}; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.5rem; padding: 2rem; cursor: pointer; }
.la-intro__presents { font-family: ${fonts.body}; font-weight: 200; font-size: 0.85rem; letter-spacing: 0.34em; text-transform: uppercase; opacity: 0.75; margin: 0; }
.la-intro__title { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(2.4rem, 6vw, 4.6rem); line-height: 1.1; margin: 0; text-align: center; }
.la-intro__title em { font-style: italic; opacity: 0.9; font-size: 0.78em; display: inline-block; margin-bottom: 0.25rem; color: ${palette.dawn}; }
.la-intro__where { font-family: ${fonts.body}; font-size: 0.75rem; letter-spacing: 0.28em; text-transform: uppercase; margin: 1rem 0 0; }
.la-intro__skip { position: absolute; bottom: 2.5rem; font-family: ${fonts.body}; font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase; margin: 0; }
@media (prefers-reduced-motion: reduce) { .la-intro * { animation: none !important; transition: none !important; } }
`;
```

- [ ] **Step 2: Commit**

```bash
git add src/app/proposal/lake-arthur/_proposal/Intro.tsx
git commit -m "feat(proposal): branded cinematic intro frame"
```

---

### Task 19: `AnnotationRail.tsx`

**Files:**
- Create: `src/app/proposal/lake-arthur/_proposal/AnnotationRail.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { annotations, type Annotation } from "./annotations";
import { palette, fonts } from "@/app/sites/lake-arthur/_lib/tokens";

const AUTO_DISMISS_MS = 5000;

export function AnnotationRail() {
  const [muted, setMuted] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);
  const [poppedAnchor, setPoppedAnchor] = useState<string | null>(null);
  const [seenAnchors, setSeenAnchors] = useState<Set<string>>(new Set());
  const dismissTimer = useRef<number | null>(null);

  useEffect(() => {
    const observers = annotations.map((a) => {
      const el = document.getElementById(a.anchorId);
      if (!el) return null;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
              setActiveAnchor(a.anchorId);
              if (!muted && !seenAnchors.has(a.anchorId)) {
                setPoppedAnchor(a.anchorId);
                setSeenAnchors((prev) => new Set(prev).add(a.anchorId));
                if (dismissTimer.current) window.clearTimeout(dismissTimer.current);
                dismissTimer.current = window.setTimeout(() => setPoppedAnchor(null), AUTO_DISMISS_MS);
              }
            }
          });
        },
        { threshold: [0.4] }
      );
      obs.observe(el);
      return obs;
    });
    return () => {
      observers.forEach((o) => o?.disconnect());
      if (dismissTimer.current) window.clearTimeout(dismissTimer.current);
    };
  }, [muted, seenAnchors]);

  function showAnnotation(anchorId: string) {
    setPoppedAnchor(anchorId);
    if (dismissTimer.current) window.clearTimeout(dismissTimer.current);
    dismissTimer.current = window.setTimeout(() => setPoppedAnchor(null), AUTO_DISMISS_MS);
  }

  const popped: Annotation | null = poppedAnchor
    ? annotations.find((a) => a.anchorId === poppedAnchor) ?? null
    : null;

  return (
    <>
      <aside className="la-rail" aria-label="Proposal annotations">
        <button
          className={`la-rail__mute${muted ? " is-muted" : ""}`}
          onClick={() => setMuted((m) => !m)}
          aria-pressed={muted}
          aria-label={muted ? "Unmute annotations" : "Mute annotations"}
          title={muted ? "Annotations muted" : "Mute auto-pop annotations"}
        >
          {muted ? "🔕" : "🔔"}
        </button>
        <ol className="la-rail__list">
          {annotations.map((a) => (
            <li key={a.anchorId}>
              <button
                className={`la-rail__dot${activeAnchor === a.anchorId ? " is-active" : ""}`}
                onClick={() => showAnnotation(a.anchorId)}
                aria-label={`Show note for ${a.label}`}
                title={a.label}
              />
            </li>
          ))}
        </ol>
      </aside>
      <AnimatePresence>
        {popped && (
          <motion.div
            className="la-rail__card"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.32 }}
          >
            <button className="la-rail__close" onClick={() => setPoppedAnchor(null)} aria-label="Dismiss">×</button>
            <p className="la-rail__what-label">What changed</p>
            <p className="la-rail__what">{popped.what}</p>
            <p className="la-rail__why-label">Why</p>
            <p className="la-rail__why">{popped.why}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{css}</style>
    </>
  );
}

const css = `
.la-rail { position: fixed; right: 0; top: 50%; transform: translateY(-50%); width: 28px; padding: 0.75rem 0; z-index: 30; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; pointer-events: auto; }
.la-rail__mute { background: rgba(244,239,223,0.9); border: 1px solid rgba(0,0,0,0.18); border-radius: 999px; width: 26px; height: 26px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.78rem; cursor: pointer; padding: 0; transition: transform 180ms; }
.la-rail__mute:hover { transform: scale(1.1); }
.la-rail__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.55rem; align-items: center; background: rgba(244,239,223,0.85); padding: 0.7rem 0.4rem; border-radius: 999px; }
.la-rail__dot { width: 9px; height: 9px; border-radius: 999px; background: rgba(26,26,26,0.35); border: none; cursor: pointer; padding: 0; transition: transform 180ms, background 180ms; }
.la-rail__dot:hover, .la-rail__dot:focus-visible { transform: scale(1.25); background: ${palette.charcoal}; outline: none; }
.la-rail__dot.is-active { background: ${palette.dawn}; box-shadow: 0 0 0 3px rgba(201,169,110,0.28); }
.la-rail__card { position: fixed; right: 64px; top: 50%; transform: translateY(-50%); width: 320px; max-width: calc(100vw - 100px); background: ${palette.paper}; color: ${palette.charcoal}; border: 1px solid rgba(0,0,0,0.1); border-radius: 6px; padding: 1.5rem 1.6rem 1.4rem; box-shadow: 0 16px 48px rgba(0,0,0,0.18); font-family: ${fonts.body}; z-index: 31; }
.la-rail__close { position: absolute; top: 0.55rem; right: 0.65rem; background: transparent; border: none; cursor: pointer; font-size: 1.2rem; line-height: 1; color: rgba(0,0,0,0.55); padding: 0.2rem 0.5rem; }
.la-rail__close:hover { color: ${palette.charcoal}; }
.la-rail__what-label, .la-rail__why-label { font-size: 0.65rem; letter-spacing: 0.22em; text-transform: uppercase; color: ${palette.fairway}; margin: 0 0 0.4rem; }
.la-rail__why-label { margin-top: 1rem; color: ${palette.dawn}; }
.la-rail__what, .la-rail__why { margin: 0; font-size: 0.92rem; line-height: 1.55; }
.la-rail__what { font-family: ${fonts.display}; font-weight: 400; }
.la-rail__why { color: ${palette.smoke}; }
@media (prefers-reduced-motion: reduce) { .la-rail__dot, .la-rail__mute { transition: none; } }
@media (max-width: 640px) { .la-rail { display: none; } }
`;
```

- [ ] **Step 2: Commit**

```bash
git add src/app/proposal/lake-arthur/_proposal/AnnotationRail.tsx
git commit -m "feat(proposal): annotation rail with auto-pop and mute"
```

---

### Task 20: `BeforeAfter.tsx`

**Files:**
- Create: `src/app/proposal/lake-arthur/_proposal/BeforeAfter.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { palette, fonts } from "@/app/sites/lake-arthur/_lib/tokens";

export function BeforeAfter() {
  const [showBefore, setShowBefore] = useState(false);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "b" || e.key === "B") setShowBefore((s) => !s);
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <div className="la-ba" role="group" aria-label="Before/after toggle">
        <button
          className={`la-ba__btn${!showBefore ? " is-active" : ""}`}
          onClick={() => setShowBefore(false)}
          aria-pressed={!showBefore}
        >
          After
        </button>
        <button
          className={`la-ba__btn${showBefore ? " is-active" : ""}`}
          onClick={() => setShowBefore(true)}
          aria-pressed={showBefore}
        >
          Before
        </button>
        <span className="la-ba__hint" aria-hidden="true">B</span>
      </div>
      <AnimatePresence>
        {showBefore && (
          <motion.div
            className="la-ba__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <BeforeView />
          </motion.div>
        )}
      </AnimatePresence>
      <style>{css}</style>
    </>
  );
}

function BeforeView() {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="la-ba__view">
      <div className="la-ba__view-tag">lakearthur.com — current site</div>
      {!imgError ? (
        <img
          src="/proposal/lake-arthur/before.png"
          alt="Screenshot of the current lakearthur.com homepage"
          onError={() => setImgError(true)}
        />
      ) : (
        <BeforePlaceholder />
      )}
    </div>
  );
}

// Stylized fallback if the screenshot is missing.
function BeforePlaceholder() {
  return (
    <div className="la-ba__placeholder">
      <header>
        <p className="logo">Lake Arthur Golf Club</p>
        <nav>Home · Golf Course · Facilities · Tournaments · Banquets · Shop · Contact</nav>
      </header>
      <div className="banner">
        <h1>Welcome to Lake Arthur</h1>
        <p>Picturesque golf course · Butler, PA</p>
        <a href="#">Book online ›</a>
      </div>
      <div className="grid">
        <div>About</div>
        <div>Course details</div>
        <div>Rates</div>
        <div>Contact</div>
      </div>
      <p className="phone">(724) 865-2765</p>
    </div>
  );
}

const css = `
.la-ba { position: fixed; bottom: 1.5rem; left: 1.5rem; z-index: 32; display: flex; align-items: center; gap: 0.4rem; background: rgba(244,239,223,0.92); border: 1px solid rgba(0,0,0,0.18); border-radius: 999px; padding: 0.3rem; box-shadow: 0 12px 28px rgba(0,0,0,0.18); font-family: ${fonts.body}; }
.la-ba__btn { background: transparent; border: none; padding: 0.5rem 1rem; border-radius: 999px; font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: ${palette.smoke}; cursor: pointer; transition: background 180ms, color 180ms; }
.la-ba__btn.is-active { background: ${palette.charcoal}; color: ${palette.cream}; }
.la-ba__btn:focus-visible { outline: 2px solid ${palette.dawn}; outline-offset: 2px; }
.la-ba__hint { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border: 1px solid rgba(0,0,0,0.22); border-radius: 4px; font-size: 0.68rem; color: ${palette.smoke}; margin-right: 0.3rem; }
.la-ba__overlay { position: fixed; inset: 0; z-index: 28; background: ${palette.charcoal}; overflow: auto; }
.la-ba__view { padding: 4rem 2rem 8rem; max-width: 1200px; margin: 0 auto; color: ${palette.cream}; }
.la-ba__view-tag { font-family: ${fonts.body}; font-size: 0.7rem; letter-spacing: 0.24em; text-transform: uppercase; opacity: 0.7; margin-bottom: 1.25rem; }
.la-ba__view img { width: 100%; height: auto; border-radius: 4px; box-shadow: 0 24px 60px rgba(0,0,0,0.45); display: block; }
.la-ba__placeholder { background: #fff; color: #222; font-family: Georgia, serif; padding: 0; min-height: 80vh; border-radius: 4px; box-shadow: 0 24px 60px rgba(0,0,0,0.45); overflow: hidden; }
.la-ba__placeholder header { background: #1c4a2a; color: #fff; padding: 1rem 2rem; display: flex; flex-direction: column; gap: 0.5rem; }
.la-ba__placeholder .logo { font-family: 'Trajan Pro', serif; font-size: 1.4rem; margin: 0; }
.la-ba__placeholder nav { font-size: 0.78rem; opacity: 0.92; }
.la-ba__placeholder .banner { background: #6c8b48; color: #fff; padding: 4rem 2rem; text-align: center; }
.la-ba__placeholder .banner h1 { font-size: 2.2rem; margin: 0 0 0.5rem; }
.la-ba__placeholder .banner a { color: #fff; background: #224a2c; padding: 0.5rem 1.2rem; text-decoration: none; display: inline-block; margin-top: 1rem; border-radius: 2px; }
.la-ba__placeholder .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: #ccc; padding: 1px; }
.la-ba__placeholder .grid > div { background: #fff; padding: 2rem; text-align: center; font-size: 0.95rem; color: #1c4a2a; }
.la-ba__placeholder .phone { text-align: center; padding: 1.5rem; font-size: 1rem; margin: 0; }
@media (max-width: 640px) { .la-ba { left: 0.75rem; bottom: 0.75rem; } }
`;
```

- [ ] **Step 2: Commit**

```bash
git add src/app/proposal/lake-arthur/_proposal/BeforeAfter.tsx
git commit -m "feat(proposal): before/after toggle with screenshot fallback"
```

---

### Task 21: `ScopeDrawer.tsx`

**Files:**
- Create: `src/app/proposal/lake-arthur/_proposal/ScopeDrawer.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { palette, fonts } from "@/app/sites/lake-arthur/_lib/tokens";

const SCOPE = [
  "Cinematic drone-led hero with hole-by-hole footage integration.",
  "Eighteen-hole field-guide layout, owner-editable copy & photos.",
  "On-domain tee-time booking with Stripe deposit (replaces cps.golf).",
  "Banquet & wedding lead-capture with full event context.",
  "Tournament inquiry & pricing with package transparency.",
  "Self-serve league signup with roster management.",
  "Compact pro-shop showcase pointing to full e-commerce in phase 2.",
  "Mobile-first responsive build, accessibility AA, performance budget.",
  "Headless CMS so the team can update copy, photos, rates, and events.",
];

const DELIVERABLES = [
  "Hosted production site on a custom domain.",
  "CMS access for staff with training session.",
  "Stripe Connect onboarding for deposits and pro-shop sales.",
  "Email notifications for inquiries (Resend).",
  "Plausible analytics dashboard.",
  "30 days of post-launch tuning included.",
];

const TIMELINE = [
  { week: "Week 1", what: "Drone reel filmed; copy & photo gathering; CMS modeled." },
  { week: "Week 2", what: "Production build of all 10 sections; stripe integration; staging deploy." },
  { week: "Week 3", what: "Owner review, copy edits, soft launch, DNS cutover." },
];

export function ScopeDrawer() {
  const [open, setOpen] = useState(false);
  const [revealPrice, setRevealPrice] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        className={`la-scope__trigger${open ? " is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="la-scope-drawer"
      >
        Proposal details
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="la-scope__scrim"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="la-scope-drawer"
              className="la-scope"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 0.96, 0.32, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Proposal details"
            >
              <button className="la-scope__close" onClick={() => setOpen(false)} aria-label="Close">×</button>

              <div className="la-scope__inner">
                <header>
                  <p className="la-scope__eyebrow">Proposal details</p>
                  <h2>How we'll build this.</h2>
                </header>

                <section>
                  <h3>Scope of work</h3>
                  <ul>{SCOPE.map((s) => <li key={s}>{s}</li>)}</ul>
                </section>

                <section>
                  <h3>Deliverables</h3>
                  <ul>{DELIVERABLES.map((s) => <li key={s}>{s}</li>)}</ul>
                </section>

                <section>
                  <h3>Timeline</h3>
                  <ol className="la-scope__timeline">
                    {TIMELINE.map((t) => (
                      <li key={t.week}>
                        <span>{t.week}</span>
                        <p>{t.what}</p>
                      </li>
                    ))}
                  </ol>
                  <p className="la-scope__note">Three weeks from approval to launch · placeholder dates pending kickoff call.</p>
                </section>

                <section>
                  <h3>Investment</h3>
                  {!revealPrice ? (
                    <button className="la-scope__reveal" onClick={() => setRevealPrice(true)}>
                      Reveal pricing
                    </button>
                  ) : (
                    <div className="la-scope__price">
                      <p className="la-scope__price-line"><span>Build</span><strong>$14,500</strong></p>
                      <p className="la-scope__price-line"><span>Hosting + CMS · monthly</span><strong>$185 / mo</strong></p>
                      <p className="la-scope__price-fine">All figures are draft. Final pricing confirmed at kickoff.</p>
                    </div>
                  )}
                </section>

                <section className="la-scope__cta-row">
                  <a className="la-scope__cta la-scope__cta--primary" href="mailto:hello@kptdesigns.com?subject=Approve%20Lake%20Arthur%20direction">Approve direction</a>
                  <a className="la-scope__cta" href="mailto:hello@kptdesigns.com?subject=Lake%20Arthur%20—%20requested%20changes">Request changes</a>
                  <a className="la-scope__cta" href="mailto:hello@kptdesigns.com?subject=Schedule%20a%20call%20—%20Lake%20Arthur">Schedule a call</a>
                </section>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <style>{css}</style>
    </>
  );
}

const css = `
.la-scope__trigger { position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 32; background: ${palette.charcoal}; color: ${palette.cream}; border: none; padding: 0.95rem 1.5rem; border-radius: 999px; font-family: ${fonts.body}; font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; box-shadow: 0 12px 28px rgba(0,0,0,0.32); transition: transform 180ms; }
.la-scope__trigger:hover { transform: translateY(-2px); }
.la-scope__trigger.is-open { background: ${palette.dawn}; color: ${palette.charcoal}; }
.la-scope__trigger:focus-visible { outline: 2px solid ${palette.dawn}; outline-offset: 2px; }
.la-scope__scrim { position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 49; }
.la-scope { position: fixed; left: 0; right: 0; bottom: 0; max-height: 88vh; background: ${palette.paper}; color: ${palette.charcoal}; border-top: 1px solid rgba(0,0,0,0.1); border-radius: 12px 12px 0 0; z-index: 50; overflow-y: auto; box-shadow: 0 -16px 48px rgba(0,0,0,0.32); font-family: ${fonts.body}; }
.la-scope__close { position: absolute; top: 1rem; right: 1.25rem; background: transparent; border: none; font-size: 1.6rem; line-height: 1; color: rgba(0,0,0,0.6); cursor: pointer; padding: 0.3rem 0.6rem; }
.la-scope__close:hover { color: ${palette.charcoal}; }
.la-scope__inner { max-width: 980px; margin: 0 auto; padding: 4rem 2rem 5rem; display: flex; flex-direction: column; gap: 3rem; }
.la-scope__eyebrow { font-size: 0.7rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.fairway}; margin: 0 0 1rem; }
.la-scope h2 { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(2rem, 4.5vw, 2.8rem); margin: 0; color: ${palette.water}; }
.la-scope h3 { font-family: ${fonts.display}; font-weight: 400; font-size: 1.4rem; margin: 0 0 1rem; color: ${palette.water}; }
.la-scope ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.65rem; }
.la-scope li { font-size: 0.95rem; line-height: 1.6; padding-left: 1.25rem; position: relative; }
.la-scope li::before { content: "—"; position: absolute; left: 0; color: ${palette.dawn}; }
.la-scope__timeline { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
.la-scope__timeline li { background: ${palette.cream}; padding: 1.25rem 1.4rem; border-radius: 4px; padding-left: 1.4rem; }
.la-scope__timeline li::before { display: none; }
.la-scope__timeline li span { display: block; font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase; color: ${palette.fairway}; margin-bottom: 0.5rem; }
.la-scope__timeline li p { font-family: ${fonts.display}; font-style: italic; font-size: 0.95rem; line-height: 1.5; margin: 0; color: ${palette.charcoal}; }
.la-scope__note { font-size: 0.78rem; opacity: 0.7; font-style: italic; margin: 1rem 0 0; }
.la-scope__reveal { background: transparent; color: ${palette.water}; border: 1px solid ${palette.water}; padding: 0.85rem 1.5rem; border-radius: 999px; font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; transition: background 180ms; }
.la-scope__reveal:hover { background: ${palette.water}; color: ${palette.cream}; }
.la-scope__price { display: flex; flex-direction: column; gap: 0.6rem; }
.la-scope__price-line { display: flex; justify-content: space-between; align-items: baseline; padding: 1rem 0; border-bottom: 1px solid rgba(0,0,0,0.1); margin: 0; }
.la-scope__price-line span { font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; color: ${palette.smoke}; }
.la-scope__price-line strong { font-family: ${fonts.display}; font-size: 1.5rem; font-weight: 400; color: ${palette.water}; }
.la-scope__price-fine { font-size: 0.78rem; opacity: 0.7; font-style: italic; margin: 1rem 0 0; }
.la-scope__cta-row { display: flex; gap: 0.75rem; flex-wrap: wrap; padding-top: 1.5rem; border-top: 1px solid rgba(0,0,0,0.1); }
.la-scope__cta { background: transparent; color: ${palette.water}; border: 1px solid ${palette.water}; padding: 0.85rem 1.5rem; border-radius: 999px; font-size: 0.75rem; letter-spacing: 0.18em; text-transform: uppercase; text-decoration: none; transition: background 180ms; }
.la-scope__cta:hover { background: ${palette.water}; color: ${palette.cream}; }
.la-scope__cta--primary { background: ${palette.water}; color: ${palette.cream}; }
.la-scope__cta--primary:hover { background: ${palette.charcoal}; }
@media (prefers-reduced-motion: reduce) { .la-scope__trigger, .la-scope__reveal, .la-scope__cta { transition: none; } }
@media (max-width: 720px) {
  .la-scope__timeline { grid-template-columns: 1fr; }
  .la-scope__trigger { right: 0.75rem; bottom: 0.75rem; padding: 0.85rem 1.2rem; font-size: 0.7rem; }
}
`;
```

- [ ] **Step 2: Commit**

```bash
git add src/app/proposal/lake-arthur/_proposal/ScopeDrawer.tsx
git commit -m "feat(proposal): scope drawer with reveal pricing and CTAs"
```

---

### Task 22: `ProposalShell.tsx` — orchestrator

**Files:**
- Create: `src/app/proposal/lake-arthur/_proposal/ProposalShell.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useState } from "react";
import { Intro } from "./Intro";
import { AnnotationRail } from "./AnnotationRail";
import { BeforeAfter } from "./BeforeAfter";
import { ScopeDrawer } from "./ScopeDrawer";
import { LakeArthurSite } from "@/app/sites/lake-arthur/LakeArthurSite";

export function ProposalShell() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="la-shell">
      <Intro onDone={() => setIntroDone(true)} />
      <div aria-hidden={!introDone} style={{ visibility: introDone ? "visible" : "hidden" }}>
        <LakeArthurSite />
      </div>
      {introDone && (
        <>
          <AnnotationRail />
          <BeforeAfter />
          <ScopeDrawer />
        </>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/proposal/lake-arthur/_proposal/ProposalShell.tsx
git commit -m "feat(proposal): shell orchestrating intro, redesign, chrome"
```

---

### Task 23: `/proposal/lake-arthur/page.tsx` — route entry

**Files:**
- Create: `src/app/proposal/lake-arthur/page.tsx`

- [ ] **Step 1: Write the file**

```tsx
import type { Metadata } from "next";
import { PageApproach } from "@/app/mockup/_lib/PageApproach";
import { ProposalShell } from "./_proposal/ProposalShell";

export const metadata: Metadata = {
  title: "Proposal · Lake Arthur Golf Club | KPT Designs",
  description:
    "A redesign proposal for Lake Arthur Golf Club — a Lakeside Field Guide concept with on-domain booking, banquet leads, tournament inquiries, and self-serve league signup.",
};

export default function Page() {
  return (
    <PageApproach>
      <ProposalShell />
    </PageApproach>
  );
}
```

- [ ] **Step 2: Type-check & verify both routes load**

```bash
npx tsc --noEmit -p tsconfig.json
```

If the dev server is still running from Task 16, hit:
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/proposal/lake-arthur
```
Expected: `200`. If the dev server isn't running, start it (`npm run dev > /tmp/dev.log 2>&1 &; sleep 6`).

Open in Chrome MCP:
- `mcp__claude-in-chrome__tabs_create_mcp` → `http://localhost:3000/proposal/lake-arthur`
- After ~4 seconds, click the page (skips the intro).
- `mcp__claude-in-chrome__read_console_messages` → expect zero errors / hydration warnings.
- `mcp__claude-in-chrome__get_page_text` → confirms `Lake Arthur`, `Field guide`, `Book a tee time` are all in the DOM.
- Click the bottom-right `Proposal details` button to open the drawer; click again to close.
- Click the bottom-left `Before` toggle; the screenshot/placeholder overlay appears. Click `After` to dismiss.
- Hover any annotation rail dot; the card slides out.

- [ ] **Step 3: Commit**

```bash
git add src/app/proposal/lake-arthur/page.tsx
git commit -m "feat(proposal): /proposal/lake-arthur route assembled"
```

---

## Gate 4 — Verification & Polish

### Task 24: Browser walkthrough — golden path

**Files:** none modified; this is a verification pass.

- [ ] **Step 1: Confirm dev server running on :3000**

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/sites/lake-arthur
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/proposal/lake-arthur
```
Both must return `200`.

- [ ] **Step 2: Walk `/sites/lake-arthur` end-to-end**

Open in Chrome MCP, scroll the full page top to bottom. Verify each section renders. Confirm:

- Drone hero plays (or shows reduced-motion fallback gradient).
- Course-at-a-glance shows 4 stats with `*` flags on placeholders.
- Field guide shows all 18 holes with numerals, character notes, drone-clip placeholders.
- Booking step 1 → fill date/time/players/cart → "Continue" → step 2 with deposit + fake card field → "Confirm" → step 3 with `LA-XXXXX` confirmation. Click "Add to calendar" — `.ics` downloads. Click "Book another" — returns to step 1.
- Banquets form validates (empty submit shows red `required` notes), valid submit shows success state.
- Tournament card → "Details & inquire" → form → success.
- Leagues card → "Sign up" → form → "Welcome — we've added you" replaces the form.
- Pro shop renders 8 cards.
- Visit map iframe loads; contact form validates and resolves.
- Footer links anchor-jump to the right sections.

`mcp__claude-in-chrome__read_console_messages` — must show zero errors and zero hydration warnings.

- [ ] **Step 3: Walk `/proposal/lake-arthur` end-to-end**

Open in Chrome MCP. Verify:

- Intro frame plays for 3.5s with `KPT Designs presents` then italicized `A proposal for Lake Arthur Golf Club` then `Butler, PA · April 2026` then fades.
- Click anywhere during intro skips it immediately.
- Reload the page — intro is suppressed (localStorage). To replay, run in console: `localStorage.removeItem("kpt:proposal:lake-arthur:intro-seen")`.
- After intro, redesign renders fullscreen.
- Annotation rail appears on right edge with 6 dots. Scrolling into the booking section auto-pops the booking annotation card; auto-dismisses in 5s.
- Click the mute button — pops stop on subsequent sections; clicking a dot still shows the card on demand.
- Click the bottom-left `Before` toggle. Screenshot or styled fallback fills the viewport. Press `B` keyboard — toggles back to After.
- Click bottom-right `Proposal details`. Drawer slides up with scope/deliverables/timeline/investment. Click `Reveal pricing` — figures appear. Press Escape — drawer closes.
- All three CTAs (Approve / Request changes / Schedule call) open mailto links.

- [ ] **Step 4: Production build smoke test**

```bash
kill %1 2>/dev/null  # stop dev server
npm run build
```
Expected: build completes without errors. Warnings about unused imports are acceptable; new errors are not. If the build fails on a route, read the error, fix, rebuild.

- [ ] **Step 5: Commit any fixes**

If walkthrough surfaced bugs that required edits, commit each fix as its own commit:
```bash
git add <changed-files>
git commit -m "fix(lake-arthur): <one-line of what was fixed>"
```

If no fixes needed, no commit.

---

### Task 25: Accessibility & performance check

**Files:** none modified unless issues found.

- [ ] **Step 1: Keyboard pass**

Open `/sites/lake-arthur` in Chrome MCP. Use `mcp__claude-in-chrome__javascript_tool` to simulate `Tab` keypresses (or use the keyboard manually if Chrome MCP supports it). Verify:

- Every CTA, link, form input, and button is reachable in tab order.
- Focus rings visible on every focused element (look for `outline` or `box-shadow` on `:focus-visible`).
- Modal/drawer Escape key dismisses without trapping focus permanently.

- [ ] **Step 2: Reduced-motion pass**

Set `prefers-reduced-motion` via DevTools (Rendering panel) or by emulating it. Reload `/sites/lake-arthur`:

- Drone hero video should be hidden, replaced with a gradient.
- Page-level animations short-circuit (entrance, scroll fade-ins).

Reload `/proposal/lake-arthur`:

- Intro frame doesn't animate but still appears and is dismissible.
- `PageApproach` already honors reduced-motion (existing behavior).

- [ ] **Step 3: Performance smoke test**

In Chrome MCP, record `mcp__claude-in-chrome__read_network_requests` while loading `/sites/lake-arthur`. Verify:

- Drone hero video < 4 MB and served with `preload="metadata"` (header check).
- No 404s on assets.
- Total page weight < 8 MB on first load (excluding font files).

- [ ] **Step 4: Commit fixes if any**

```bash
git add <changed-files>
git commit -m "fix(lake-arthur): accessibility/perf adjustments"
```

If clean, no commit.

---

### Task 26: Final tidy & summary commit

**Files:** none typically — a verification + summary task.

- [ ] **Step 1: Run a final type-check + build**

```bash
npx tsc --noEmit -p tsconfig.json
npm run build
```
Both must succeed.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```
Fix any new lint errors introduced by the new files. Pre-existing errors in unrelated files are out of scope.

- [ ] **Step 3: Confirm git status is clean and the branch has all commits**

```bash
git -C /Users/cbas-mini/projects/kptdesigns status
git -C /Users/cbas-mini/projects/kptdesigns log --oneline -30
```
Expected: no uncommitted changes; recent commits include the spec, plan, and 18+ feature commits for tasks 1–25.

- [ ] **Step 4: Write a summary report to the user**

Format the closing message:

```
Build complete on feat/mockup-playground. Two new routes live on dev:

  /sites/lake-arthur     — Lakeside Field Guide redesign
  /proposal/lake-arthur  — cinematic wrapper

Shipped: 10 redesign sections, 5 working forms (book / banquets /
tournaments / leagues / contact), 4 floating proposal-chrome elements
(intro, annotation rail, before/after, scope drawer), all forms
validating via react-hook-form + zod, deposit step rendering a styled
card field with simulated charge, .ics calendar export on confirmation.

Verification: zero console errors, zero hydration warnings, next build
clean, golden-path walkthrough confirmed end-to-end.

Outstanding (per spec):
  - Real drone footage (awaiting filming)
  - Real Stripe charges and persistence (deferred)
  - Mobile polish (desktop showcase first)
  - Multi-customer /proposal/<slug> templating (Lake Arthur is hardcoded)

Send the link: http://localhost:3000/proposal/lake-arthur
```

- [ ] **Step 5: No final commit unless cleanup edits remain.**

---

## End of Plan
