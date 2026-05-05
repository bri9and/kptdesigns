# QA Checklist — V5 through V20 Mockup Directions

**Project:** KPT Designs  
**Scope:** 16 new mockup directions (V5–V20)  
**Reviewer:** ___________________________  
**Date reviewed:** ___________________________  
**Dev server:** `http://localhost:3000` (run `npm run dev` from project root)

---

## Section 1 — Per-Design Routing & Compilation

For each design: verify the route returns HTTP 200, the page renders without console errors, and all expected section files are present.

### Scroll-IN Designs (engine + 4 checkpoints/planes/levels)

---

#### V5 — Tunnel

| Item | Value |
|------|-------|
| Route | `/mockup/v5-tunnel` |
| Engine file | `v5-tunnel/_engine/TunnelEngine.tsx` |
| Sections | `HeroCheckpoint`, `ServicesCheckpoint`, `PortfolioCheckpoint`, `FinaleCheckpoint` |
| Renderer | R3F Canvas + ScrollControls (Three.js) |

**Smoke tests:**
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/mockup/v5-tunnel
# Expected: 200

# In browser DevTools console — must be zero errors after full scroll:
# Check for: "R3F:", "drei:", "ScrollControls" — no red errors
```

**Common compile errors to watch for:**
- `Cannot find module '@react-three/fiber'` — R3F not resolved; verify `three`, `@react-three/fiber`, `@react-three/drei` are in `package.json`
- `useThree called outside Canvas` — a section file uses a Three.js hook outside the R3F Canvas boundary
- `<Html>` from drei used inside a section but `drei` import is missing
- `ScrollControls` requires the Canvas to have a fixed/absolute height — check `style={{ height: '100vh' }}`
- TypeScript: `Property 'position' does not exist on type 'MeshProps'` — missing `@types/three`

---

#### V6 — Strata

| Item | Value |
|------|-------|
| Route | `/mockup/v6-strata` |
| Engine file | `v6-strata/_engine/StrataEngine.tsx` |
| Sections | `HeroPlane`, `ServicesPlane`, `PortfolioPlane`, `FinalePlane` |
| Renderer | Pure CSS Z-translation + opacity (no R3F) |

**Smoke tests:**
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/mockup/v6-strata
# Expected: 200
```

**Common compile errors to watch for:**
- Accidental import of `@react-three/fiber` — brief spec says pure CSS; flag if present
- `perspective` not set on wrapper — planes will not show depth without a CSS `perspective` parent
- `will-change: transform` missing on animated planes — causes janky Z-transitions
- `useScroll` hook used without a compatible scroll container context

---

#### V7 — Recursive Zoom

| Item | Value |
|------|-------|
| Route | `/mockup/v7-recursive` |
| Engine file | `v7-recursive/_engine/RecursiveEngine.tsx` |
| Sections | `HeroLevel`, `ServicesLevel`, `PortfolioLevel`, `FinaleLevel` |
| Renderer | CSS scale + translate bound to scroll progress |

**Smoke tests:**
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/mockup/v7-recursive
# Expected: 200
```

**Common compile errors to watch for:**
- `scale(0)` at initial paint causing invisible content — confirm initial scale is `0.001` not `0`
- `will-change: transform, opacity` must be on each level wrapper or GPU compositing breaks
- TypeScript: scroll progress typed as `number | undefined` without a null guard
- `backface-visibility: hidden` missing on rotated elements (causes Chrome flicker at extreme scales)

---

### Standard 6-Section Designs (Hero / Philosophy / Stack / Process / Portfolio / CTA)

For all designs below the expected section set is:

`Hero[X]` · `Philosophy[X]` · `Stack[X]` · `Process[X]` · `Portfolio[X]` · `Cta[X]`

where `[X]` is the design suffix (e.g., `Codex`, `Ticker`, etc.)

---

#### V8 — Codex

| Item | Value |
|------|-------|
| Route | `/mockup/v8-codex` |
| Section files | `HeroCodex`, `PhilosophyCodex`, `StackCodex`, `ProcessCodex`, `PortfolioCodex`, `CtaCodex` |
| Special fonts | UnifrakturCook or Goudy Bookletter 1911 (via `next/font/google`), Crimson Pro / EB Garamond |

**Smoke tests:**
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/mockup/v8-codex
```

**Common compile errors to watch for:**
- `UnifrakturCook` may not be available on Google Fonts — verify fallback to `Goudy_Bookletter_1911` is configured
- Drop-cap CSS (`::first-letter`) conflicts with React hydration if content is dynamic — use static strings
- `@apply` Tailwind utilities inside `::first-letter` pseudo-element may not compile

---

#### V9 — Ticker

| Item | Value |
|------|-------|
| Route | `/mockup/v9-ticker` |
| Section files | `HeroTicker`, `PhilosophyTicker`, `StackTicker`, `ProcessTicker`, `PortfolioTicker`, `CtaTicker` |
| Special fonts | IBM Plex Mono only (via `next/font/google`) |

**Smoke tests:**
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/mockup/v9-ticker
```

**Common compile errors to watch for:**
- Infinite `setInterval` tickers not cleaned up in `useEffect` return — causes memory leaks and console warnings
- `Math.random()` called during SSR causes hydration mismatch — wrap in `useEffect` or `suppressHydrationWarning`
- CSS `@keyframes` for number-flip animations must be in a `<style>` tag or global CSS, not inline

---

#### V10 — Atelier

| Item | Value |
|------|-------|
| Route | `/mockup/v10-atelier` |
| Section files | `HeroAtelier`, `PhilosophyAtelier`, `StackAtelier`, `ProcessAtelier`, `PortfolioAtelier`, `CtaAtelier` |
| Special fonts | Playfair Display (Saol sub), Inter all-caps |

**Smoke tests:**
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/mockup/v10-atelier
```

**Common compile errors to watch for:**
- `Playfair_Display` must be imported with `{ subsets: ['latin'], weight: ['100','400','700'] }` — thin weight often missed
- Asymmetric grid using CSS Grid `grid-template-areas` may cause TS errors if used in Tailwind arbitrary values without escaping

---

#### V11 — Architectural

| Item | Value |
|------|-------|
| Route | `/mockup/v11-architectural` |
| Section files | `HeroArchitectural`, `PhilosophyArchitectural`, `StackArchitectural`, `ProcessArchitectural`, `PortfolioArchitectural`, `CtaArchitectural` |
| Special fonts | Roboto Mono, Roboto (via `next/font/google`) |

**Smoke tests:**
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/mockup/v11-architectural
```

**Common compile errors to watch for:**
- SVG `<line>` draw-on animations using `stroke-dashoffset` — must set `stroke-dasharray` equal to path length first; dynamic length requires a `useRef` + `getTotalLength()` call after mount
- `stroke-dasharray` in Tailwind requires arbitrary value syntax: `[stroke-dasharray:300]` or inline style

---

#### V12 — Specimen

| Item | Value |
|------|-------|
| Route | `/mockup/v12-specimen` |
| Section files | `HeroSpecimen`, `PhilosophySpecimen`, `StackSpecimen`, `ProcessSpecimen`, `PortfolioSpecimen`, `CtaSpecimen` |
| Special fonts | Fraunces (variable, opsz axis), JetBrains Mono |

**Smoke tests:**
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/mockup/v12-specimen
```

**Common compile errors to watch for:**
- Fraunces variable font requires `axes: ['opsz', 'wght', 'SOFT', 'WONK']` in `next/font/google` config — missing axes silently falls back to default
- Extremely large text (720px) triggers layout overflow at mobile widths — must have `overflow-x: hidden` on wrapper
- Portfolio images used as "type specimens" — confirm `<Image>` is used, not `<img>`, for Next.js optimization

---

#### V13 — Conversation

| Item | Value |
|------|-------|
| Route | `/mockup/v13-conversation` |
| Section files | `HeroConversation`, `PhilosophyConversation`, `StackConversation`, `ProcessConversation`, `PortfolioConversation`, `CtaConversation` |
| Special fonts | Inter only |

**Smoke tests:**
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/mockup/v13-conversation
```

**Common compile errors to watch for:**
- Chat "typing indicator" using `@keyframes bounce` — three-dot animation — check that all three dots have staggered `animation-delay`
- `useEffect` for message reveal must depend on intersection observer — missing cleanup causes stale observers
- `aria-live="polite"` region required on chat output area — absence is a compile-time lint warning if ESLint jsx-a11y is active

---

#### V14 — Cassette

| Item | Value |
|------|-------|
| Route | `/mockup/v14-cassette` |
| Section files | `HeroCassette`, `PhilosophyCassette`, `StackCassette`, `ProcessCassette`, `PortfolioCassette`, `CtaCassette` |
| Special fonts | Inter condensed, VT323 or Press Start 2P, Caveat |

**Smoke tests:**
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/mockup/v14-cassette
```

**Common compile errors to watch for:**
- CSS `conic-gradient` for VU meter arcs is not supported in all Next.js PostCSS configs — verify no autoprefixer strip
- Tape spool rotation (`@keyframes spin`) with `transform-origin: center` — must be set on the spool SVG element, not its parent
- `Caveat` font (cursive) may render differently across OSes — test on Windows and macOS

---

#### V15 — Atlas

| Item | Value |
|------|-------|
| Route | `/mockup/v15-atlas` |
| Section files | `HeroAtlas`, `PhilosophyAtlas`, `StackAtlas`, `ProcessAtlas`, `PortfolioAtlas`, `CtaAtlas` |
| Special fonts | EB Garamond (Caslon sub), JetBrains Mono |

**Smoke tests:**
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/mockup/v15-atlas
```

**Common compile errors to watch for:**
- Map pin drop animation using CSS `@keyframes` with `bounce` easing — `cubic-bezier` bounce must be manually specified; CSS `ease` does not produce true bounce
- SVG contour lines drawn via `stroke-dashoffset` scroll animation — same `getTotalLength()` requirement as V11
- Portfolio pins positioned with absolute CSS percentages — confirm values don't overflow the map container at narrow widths

---

#### V16 — Broadsheet

| Item | Value |
|------|-------|
| Route | `/mockup/v16-broadsheet` |
| Section files | `HeroBroadsheet`, `PhilosophyBroadsheet`, `StackBroadsheet`, `ProcessBroadsheet`, `PortfolioBroadsheet`, `CtaBroadsheet` |
| Special fonts | Old Standard TT, Source Serif 4, Bodoni Moda, IBM Plex Mono |

**Smoke tests:**
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/mockup/v16-broadsheet
```

**Common compile errors to watch for:**
- Four fonts loaded in one file — each `next/font/google` call is a separate import; bundling all four as named exports in one file is valid but must be done correctly (no default export collision)
- CSS multi-column layout (`column-count`, `column-gap`) — text orphaning in narrow viewports; test at 768px
- `Bodoni_Moda` requires `display: 'swap'` explicitly; omitting it causes FOIT in production

---

#### V17 — Nostromo

| Item | Value |
|------|-------|
| Route | `/mockup/v17-nostromo` |
| Section files | `HeroNostromo`, `PhilosophyNostromo`, `StackNostromo`, `ProcessNostromo`, `PortfolioNostromo`, `CtaNostromo` |
| Special fonts | VT323 or OCR-A (via `next/font/google` — OCR-A not on Google Fonts; use VT323) |

**Smoke tests:**
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/mockup/v17-nostromo
```

**Common compile errors to watch for:**
- CRT scanline overlay using CSS `repeating-linear-gradient` — must be a `pointer-events: none` pseudo-element, not a real DOM node that blocks clicks
- Blinking indicator lights using `@keyframes` with `steps(1)` — confirm step count is correct (2 steps for on/off)
- `OCR-A` is not on Google Fonts — implementation must use `VT323` or a self-hosted font; flag if `OCR_A` appears in font imports

---

#### V18 — Receipt

| Item | Value |
|------|-------|
| Route | `/mockup/v18-receipt` |
| Section files | `HeroReceipt`, `PhilosophyReceipt`, `StackReceipt`, `ProcessReceipt`, `PortfolioReceipt`, `CtaReceipt` |
| Special fonts | Anonymous Pro or VT323 (via `next/font/google`) |

**Smoke tests:**
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/mockup/v18-receipt
```

**Common compile errors to watch for:**
- "Print-out" reveal using `clip-path: inset(0 0 100% 0)` animated to `inset(0 0 0% 0)` — must trigger on scroll-into-view (IntersectionObserver); confirm `threshold: 0.1` is set
- Receipt strip `max-width` (e.g. 420px) — confirm it is centered with `mx-auto` and doesn't break layout
- Jitter animation using `@keyframes` with `translate` — confirm `will-change: transform` is applied

---

#### V19 — Risograph

| Item | Value |
|------|-------|
| Route | `/mockup/v19-risograph` |
| Section files | `HeroRisograph`, `PhilosophyRisograph`, `StackRisograph` (if present), `ProcessRisograph`, `PortfolioRisograph`, `CtaRisograph` |
| Special fonts | Anybody (Google Fonts, GT Cinetype sub), Stardos Stencil |
| Note | `StackRisograph.tsx` was absent in last file scan — verify it lands or is intentionally omitted |

**Smoke tests:**
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/mockup/v19-risograph
```

**Common compile errors to watch for:**
- `mix-blend-mode: multiply` on riso color layers — parent element must NOT have `isolation: isolate` set inadvertently by Tailwind's `ring` utilities
- Misregistration flicker using CSS `filter: hue-rotate()` on hover — confirm `transition` duration is set (should be ~80ms for flicker feel)
- Halftone SVG pattern — if inlined as `<svg>` background, must escape angle brackets for JSX or use `dangerouslySetInnerHTML`; prefer CSS `background-image: url("data:image/svg+xml,...")`

---

#### V20 — Operator Manual

| Item | Value |
|------|-------|
| Route | `/mockup/v20-operator` |
| Section files | V20 currently has only `page.tsx` — all 6 sections (`HeroOperator`, etc.) still need to land |
| Special fonts | IBM Plex Mono, IBM Plex Serif, IBM Plex Sans |

**Smoke tests:**
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/mockup/v20-operator
```

**Common compile errors to watch for:**
- Three IBM Plex variants in one page — each is a separate `next/font/google` import; `IBM_Plex_Mono`, `IBM_Plex_Serif`, `IBM_Plex_Sans` are distinct package identifiers
- Numbered section headers using CSS `counter()` — Tailwind purges unused custom properties; define counters in `globals.css` or use explicit numbers
- Dense copy with inline `<code>` blocks — confirm backtick content is not passed as JSX children without escaping curly braces

---

## Section 2 — Brand Consistency Checks (Cross-Cutting)

Run these checks across all 16 designs after section files land.

### 2.1 Four-in-One Stack Mention in Hero

Every hero section must reference all four pillars: **registrar**, **host**, **designer**, **builder** (and optionally KPT Agents / AI phone agents). The exact words may vary by design voice, but all four services must be present.

| Design | Hero references all 4 pillars? | "KPT Agents" or AI agents mentioned? | Pass/Fail |
|--------|-------------------------------|--------------------------------------|-----------|
| V5 Tunnel — `HeroCheckpoint` | | | |
| V6 Strata — `HeroPlane` | | | |
| V7 Recursive — `HeroLevel` | | | |
| V8 Codex — `HeroCodex` | | | |
| V9 Ticker — `HeroTicker` | | | |
| V10 Atelier — `HeroAtelier` | | | |
| V11 Architectural — `HeroArchitectural` | | | |
| V12 Specimen — `HeroSpecimen` | | | |
| V13 Conversation — `HeroConversation` | | | |
| V14 Cassette — `HeroCassette` | | | |
| V15 Atlas — `HeroAtlas` | | | |
| V16 Broadsheet — `HeroBroadsheet` | | | |
| V17 Nostromo — `HeroNostromo` | | | |
| V18 Receipt — `HeroReceipt` | | | |
| V19 Risograph — `HeroRisograph` | | | |
| V20 Operator — `HeroOperator` | | | |

---

### 2.2 CTA Link Targets

Search every section file for `href` values on primary and secondary CTAs.

**Command:**
```bash
grep -r 'href=' src/app/mockup/v{5..20}* --include="*.tsx" | grep -v 'node_modules'
```

**Rules:**
- Primary CTA `href` must be `/start` (not `/get-started`, not `#`, not `/contact`)
- Secondary CTA `href` must be `/pricing` (not `/services`, not `/about`)
- No external URLs on CTA buttons

| Design | Primary CTA → `/start`? | Secondary CTA → `/pricing`? | Pass/Fail |
|--------|------------------------|------------------------------|-----------|
| V5 | | | |
| V6 | | | |
| V7 | | | |
| V8 | | | |
| V9 | | | |
| V10 | | | |
| V11 | | | |
| V12 | | | |
| V13 | | | |
| V14 | | | |
| V15 | | | |
| V16 | | | |
| V17 | | | |
| V18 | | | |
| V19 | | | |
| V20 | | | |

---

### 2.3 Portfolio Data Source

Every portfolio section must import from `@/lib/portfolio` and display only the **first 6 entries** (indices 0–5).

**Expected first 6 entries:**
1. Pittsburgh North Golf Club
2. Cirigliano Plumbing
3. Nicholas Electric Co.
4. Zeke & Son Roofing
5. Patriot Pest Control
6. Grand View Golf Club

**Verification command:**
```bash
grep -r 'from.*lib/portfolio\|from.*@/lib/portfolio' src/app/mockup/v{5..20}* --include="*.tsx"
# Should return a match for every Portfolio[X].tsx file
```

**Check: slice(0, 6) or equivalent limit:**
```bash
grep -r 'slice\|\.filter\|\.map.*portfolio' src/app/mockup/v{5..20}* --include="*.tsx" | grep -i portfolio
```

| Design | Imports `@/lib/portfolio`? | Shows exactly first 6? | Pass/Fail |
|--------|--------------------------|------------------------|-----------|
| V5 PortfolioCheckpoint | | | |
| V6 PortfolioPlane | | | |
| V7 PortfolioLevel | | | |
| V8 PortfolioCodex | | | |
| V9 PortfolioTicker | | | |
| V10 PortfolioAtelier | | | |
| V11 PortfolioArchitectural | | | |
| V12 PortfolioSpecimen | | | |
| V13 PortfolioConversation | | | |
| V14 PortfolioCassette | | | |
| V15 PortfolioAtlas | | | |
| V16 PortfolioBroadsheet | | | |
| V17 PortfolioNostromo | | | |
| V18 PortfolioReceipt | | | |
| V19 PortfolioRisograph | | | |
| V20 PortfolioOperator | | | |

---

### 2.4 Lining Figures for Numbers and Dates

All years, statistics, and numeric data must use OpenType lining figures. In CSS this means `font-variant-numeric: lining-nums tabular-nums` on any element containing numbers.

**Check:**
```bash
grep -r 'lining-nums\|font-variant-numeric\|font-feature-settings.*lnum' src/app/mockup/v{5..20}* --include="*.tsx"
```

If no results: the design relies on the font's default figure style. Acceptable only for fonts that default to lining figures (IBM Plex families, Inter, Roboto). Flag designs using oldstyle-default fonts (Fraunces, EB Garamond, Crimson Pro, Playfair Display) that do NOT explicitly set lining figures.

**Designs requiring explicit lining-figure CSS (oldstyle-default fonts):**
- V8 Codex (Crimson Pro / EB Garamond)
- V10 Atelier (Playfair Display)
- V12 Specimen (Fraunces)
- V15 Atlas (EB Garamond)
- V16 Broadsheet (Source Serif 4, Bodoni Moda)
- V20 Operator (IBM Plex Serif — defaults to lining, but verify)

---

### 2.5 "KPT" Wordmark in Every Hero

The string "KPT" (or "KPT Designs") must appear in every hero section, either as text or as a rendered logo component.

**Check:**
```bash
grep -r 'KPT' src/app/mockup/v{5..20}*/  --include="*.tsx" | grep -i hero
```

| Design | "KPT" present in hero? | Pass/Fail |
|--------|----------------------|-----------|
| V5–V20 (fill per row) | | |

---

### 2.6 "Est. 2004" in Every CTA Section

The founding-year marker "Est. 2004" must appear in every design's CTA section (or the Finale equivalent in scroll-IN designs).

**Check:**
```bash
grep -r 'Est\. 2004\|est\..*2004\|since 2004\|Est 2004' src/app/mockup/v{5..20}* --include="*.tsx" -i
```

| Design | "Est. 2004" present in CTA/Finale? | Pass/Fail |
|--------|-----------------------------------|-----------|
| V5 FinaleCheckpoint | | |
| V6 FinalePlane | | |
| V7 FinaleLevel | | |
| V8 CtaCodex | | |
| V9 CtaTicker | | |
| V10 CtaAtelier | | |
| V11 CtaArchitectural | | |
| V12 CtaSpecimen | | |
| V13 CtaConversation | | |
| V14 CtaCassette | | |
| V15 CtaAtlas | | |
| V16 CtaBroadsheet | | |
| V17 CtaNostromo | | |
| V18 CtaReceipt | | |
| V19 CtaRisograph | | |
| V20 CtaOperator | | |

---

## Section 3 — Accessibility Audit Checklist

### 3.1 Color Contrast Targets by Design

WCAG AA requires 4.5:1 for normal text, 3:1 for large text (18px+ bold or 24px+ regular). AAA is 7:1. Use browser DevTools → Accessibility panel or [https://webaim.org/resources/contrastchecker/](https://webaim.org/resources/contrastchecker/).

| Design | Text / BG combination | Minimum target | Verify pass? |
|--------|----------------------|----------------|--------------|
| V5 Tunnel | `#E8F1FF` on `#000812` | AA (4.5:1) | |
| V5 Tunnel | `#00E5FF` cyan on `#000812` | AA large text only (3:1) — flag for body copy | |
| V6 Strata | `#F4F1EB` paper on `#0B0B0F` | AA | |
| V6 Strata | `#7B8E6F` sage on `#0B0B0F` | **RISK** — sage on dark may fail AA; verify | |
| V7 Recursive | `#0A0A0A` ink on `#FCFCFA` | AA | |
| V7 Recursive | `#9A9A9A` cool grey on `#FCFCFA` | **RISK** — grey on near-white likely fails AA; use only for decorative text | |
| V8 Codex | `#1B1410` ink on `#F2E8D5` vellum | AA | |
| V8 Codex | `#C72A1F` vermillion on `#F2E8D5` | Verify — deep red on warm cream may pass at large sizes only | |
| V9 Ticker | `#00FF41` phosphor on `#000` | AA large text; **RISK** at 12–14px body — must verify | |
| V9 Ticker | `#FFA500` amber on `#000` | AA | |
| V10 Atelier | `#1A1612` ink on `#F8F2EA` cream | AA | |
| V10 Atelier | `#C9A861` gold on `#F8F2EA` | **RISK** — gold on cream likely fails; use gold only for decorative lines | |
| V11 Architectural | `#E8EAEC` white on `#0E1E2E` | AA | |
| V11 Architectural | `#3D8DBF` dim cyan on `#0E1E2E` | Verify at body text sizes | |
| V12 Specimen | `#0A0A0A` ink on `#FAFAFA` | AA | |
| V12 Specimen | `#7A2D26` malted red on `#FAFAFA` | Verify — dark red on white typically passes | |
| V13 Conversation | `#1A1A2E` agent surface text | Verify text color on agent bubble background | |
| V13 Conversation | `#6B4EE6` purple on `#FAFAFA` | Verify — medium purple on white may fail AA at small sizes | |
| V14 Cassette | `#F5EBD0` ivory on `#3D2817` walnut | AA | |
| V14 Cassette | `#FF2D2D` LED red on `#3D2817` | Verify — red on dark brown may pass large only | |
| V15 Atlas | `#1A1A1A` on `#F4EFE3` | AA | |
| V15 Atlas | `#A0432A` rust on `#F4EFE3` | Verify | |
| V16 Broadsheet | `#1A1A1A` ink on `#F5F0E1` newsprint | AA | |
| V16 Broadsheet | `#A4262C` red on `#F5F0E1` | Verify at body sizes | |
| V17 Nostromo | `#FFB000` amber on `#0A0A0F` | AA | |
| V17 Nostromo | `#D4C9A8` panel beige on `#0A0A0F` | AA | |
| V18 Receipt | `#1A1A1A` ink on `#FBFBFB` | AA | |
| V18 Receipt | `#B53D3D` faded red on `#FBFBFB` | **RISK** — faded red on near-white likely fails AA; use for decoration only | |
| V19 Risograph | `#FF48B0` pink on `#F5F0E1` newsprint | **RISK** — fluorescent pink on cream likely fails AA | |
| V19 Risograph | `#00B7A8` teal on `#F5F0E1` | **RISK** — verify; medium teal may fail at small sizes | |
| V19 Risograph | `#FFE100` yellow on `#F5F0E1` | **FAIL** — yellow on cream will not pass any WCAG level; decorative only | |
| V20 Operator | `#1A1A1A` on `#F4EFE0` | AA | |
| V20 Operator | `#1D5CB6` IBM blue on `#F4EFE0` | Verify — medium blue on cream; may pass AA large text only | |

---

### 3.2 Focus Indicators

Every interactive element (links, buttons, form inputs) must have a visible `:focus-visible` outline. Default browser outlines may be overridden by global CSS resets.

**Check global reset:**
```bash
grep -r 'outline.*none\|outline.*0' src/app/globals.css src/styles/ --include="*.css" 2>/dev/null
```

If `outline: none` is found without a replacement focus style — flag as critical.

**Per-design focus aesthetic guidance:**

| Design | Expected focus style |
|--------|---------------------|
| V5 Tunnel | Cyan `#00E5FF` 2px outline, 2px offset — matches HUD palette |
| V6 Strata | Molten orange `#FF5E1A` 2px outline |
| V7 Recursive | Electric red `#FF1E1E` 2px outline |
| V8 Codex | Gold leaf `#D4A04A` 2px solid border — no modern box-shadow feel |
| V9 Ticker | Phosphor green `#00FF41` 1px outline — terminal feel |
| V10 Atelier | 1px gold foil `#C9A861` outline, subtle — elegant |
| V11 Architectural | Red detail `#D03030` 1px technical outline |
| V12 Specimen | Malted red `#7A2D26` underline-style focus on links |
| V13 Conversation | Accent purple `#6B4EE6` 2px outline |
| V14 Cassette | LED red `#FF2D2D` glow via `box-shadow` |
| V15 Atlas | Accent rust `#A0432A` 2px outline |
| V16 Broadsheet | Headline red `#A4262C` 1px outline |
| V17 Nostromo | CRT amber `#FFB000` 2px outline |
| V18 Receipt | High-contrast black `#1A1A1A` 2px outline (already dark-on-light) |
| V19 Risograph | Riso teal `#00B7A8` 2px — avoids fluorescent pink on white |
| V20 Operator | IBM blue `#1D5CB6` 2px outline |

---

### 3.3 Keyboard Navigation

#### Scroll-IN designs (V5, V6, V7) — Critical

The tunnel/strata/recursive scroll experiences are driven by mouse scroll or trackpad. Keyboard users cannot advance the scroll in the same way.

**Minimum required fallback for each:**
- [ ] V5 Tunnel: Arrow key or Page Down advances scroll position; OR a "Skip to content" link at top jumps to static version of each checkpoint
- [ ] V6 Strata: Same requirement — keyboard must be able to advance through planes
- [ ] V7 Recursive: Same — keyboard must advance zoom levels
- [ ] All three: Tab order within visible content must follow DOM order (not visual position)
- [ ] All three: `scroll-behavior: smooth` in CSS must not trap focus when keyboard-advancing

**Test procedure:**
1. Load each page
2. Press Tab once to move past any skip link
3. Use arrow keys / Page Down — confirm content advances
4. Tab through interactive elements within current visible section
5. Confirm no focus trap

#### Standard designs (V8–V20)

- [ ] Tab order follows logical reading order for each design
- [ ] V9 Ticker: Ticker animations must not trap focus; confirm tickers are `aria-hidden="true"` or do not receive focus
- [ ] V13 Conversation: Chat input (if interactive) must be reachable by Tab; `Enter` must submit
- [ ] V14 Cassette: Skeuomorphic knobs/buttons must be keyboard-activatable (Space/Enter)

---

### 3.4 Reduced Motion Fallbacks

Every animation must respect `prefers-reduced-motion: reduce`. This is non-negotiable for scroll-IN designs.

**Global check:**
```bash
grep -r 'prefers-reduced-motion' src/app/mockup/v{5..20}* --include="*.tsx" --include="*.css"
```

**Per-design minimum:**

| Design | Primary animation | Reduced-motion fallback |
|--------|------------------|------------------------|
| V5 Tunnel | R3F camera fly + scroll | Static scene; checkpoints as standard scroll sections |
| V6 Strata | CSS Z-translation | Vertical scroll layout; planes appear without Z depth |
| V7 Recursive | Scale transforms | Sections fade in without scale; no recursive zoom |
| V8 Codex | Ink-bleed on hover | No hover transform; static |
| V9 Ticker | Continuous ticker scroll, number flip | Tickers pause; numbers static |
| V10 Atelier | Image scale 1.02 on hover | No scale transform |
| V11 Architectural | Line draw on scroll | Lines appear immediately at full opacity |
| V12 Specimen | Letterform scroll reveal | Elements appear at full opacity immediately |
| V13 Conversation | Typing indicator, message reveal | Messages appear instantly without animation |
| V14 Cassette | Tape spool spin, VU meter | All animations paused |
| V15 Atlas | Contour line draw, pin drop | Lines and pins appear static |
| V16 Broadsheet | Press reveal on first paint | No animation; content visible immediately |
| V17 Nostromo | CRT scanlines, indicator blinks | Static; blinks replaced with solid state |
| V18 Receipt | Print-out clip-path reveal | Sections appear instantly |
| V19 Risograph | Halftone shift, misregistration flicker | No movement; no hue-rotate |
| V20 Operator | Page-flip transition | No transition; sections stack directly |

**React implementation pattern to verify:**
```tsx
// In each animated component — confirm this pattern or equivalent:
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// OR using a hook:
import { useReducedMotion } from 'framer-motion'; // if framer is used
// OR CSS-only:
// @media (prefers-reduced-motion: reduce) { .animated-element { animation: none; transition: none; } }
```

---

### 3.5 Semantic HTML Structure

Every design must use correct landmark elements. Verify with browser accessibility tree (DevTools → Accessibility → tree view).

**Required landmarks:**
- `<nav>` — global navigation (inherited from layout; confirm no design overrides with a `<div>`)
- `<main>` — wraps the page content (one per page)
- `<section>` elements with accessible names (`aria-labelledby` pointing to heading, or `aria-label`)
- Heading hierarchy: `h1` in hero, `h2` for section titles, `h3` for subsections — no skipped levels
- `<footer>` if a footer-like CTA exists

**Special cases:**
- V9 Ticker: Scrolling tickers must have `role="marquee"` or be wrapped in `aria-live="off"` with `aria-hidden="true"` if purely decorative
- V13 Conversation: Chat container should use `role="log"` with `aria-live="polite"`
- V11 Architectural: SVG diagrams must have `<title>` and `<desc>` elements, or `aria-label` on the `<svg>`
- V14 Cassette: Decorative skeuomorphic elements (knobs, faders not linked to action) must be `aria-hidden="true"`
- V17 Nostromo: CRT overlay `<div>` must be `aria-hidden="true"` and `pointer-events: none`

---

### 3.6 ARIA Labels for Decorative-Looking Interactive Elements

Interactive elements that look decorative must be explicitly labeled.

| Design | Element | Required ARIA |
|--------|---------|---------------|
| V5 Tunnel | Scroll progress indicator | `aria-label="Scroll progress"` or `aria-hidden="true"` if decorative |
| V9 Ticker | Live ticker strip | `aria-label="Live statistics ticker"` + `aria-live="off"` or `aria-hidden="true"` |
| V11 Architectural | Dimension callout overlays | `aria-hidden="true"` (decorative); if interactive, label the trigger |
| V13 Conversation | Agent avatar | `aria-hidden="true"` (decorative image) |
| V14 Cassette | VU meter, tape spool | `aria-hidden="true"` |
| V15 Atlas | Map pins | `aria-label="{client name} — {category}"` |
| V17 Nostromo | Indicator lights, scanline overlay | `aria-hidden="true"` |
| V18 Receipt | Print-head visual effect | `aria-hidden="true"` |
| V19 Risograph | Color layer overlays | `aria-hidden="true"` |

---

## Section 4 — Performance Audit Checklist

### 4.1 Three.js / R3F Usage

Three.js and R3F are only sanctioned for V5 (and optionally V6/V7 via CSS fallback per the design brief).

**Check:**
```bash
grep -r 'from.*@react-three\|from.*three' src/app/mockup/v{6..20}* --include="*.tsx"
```

Expected result: **zero matches** for V6–V20. R3F in V6 or V7 is a spec violation; CSS-only Z/scale must be used.

| Check | Expected | Actual | Pass/Fail |
|-------|----------|--------|-----------|
| V5 uses R3F | Yes | | |
| V6–V20 do NOT import R3F or Three.js | None | | |
| V5 canvas height is fixed (not `auto`) | Yes | | |
| R3F Canvas in V5 has `dpr={[1, 2]}` or equivalent pixel-ratio cap | Yes | | |

---

### 4.2 Image Optimization

All `<img>` tags must be replaced with Next.js `<Image>` from `next/image`.

**Check:**
```bash
grep -rn '<img ' src/app/mockup/v{5..20}* --include="*.tsx"
```

Expected result: zero bare `<img>` tags. Any found must be reported with file + line number.

Additional checks:
- [ ] Portfolio images specify `width` and `height` props (or `fill` with a relative-positioned parent)
- [ ] Hero background images use `priority` prop
- [ ] Images that are purely decorative use `alt=""`

---

### 4.3 Font Loading Strategy

All fonts must use `display: 'swap'` in `next/font/google` config.

**Check:**
```bash
grep -rn "display:" src/app/mockup/v{5..20}* --include="*.tsx" | grep -v "'swap'"
# Should return no results — all display values should be 'swap'
```

Also verify:
- [ ] No `@import url(fonts.googleapis.com)` in CSS files — must use `next/font/google`
- [ ] Font variables are applied to the section root element (not to `<html>` body directly, which would be a layout-level concern)
- [ ] Variable fonts (Fraunces in V12, Inter in V5) use `variable` property in font config

---

### 4.4 Animation Performance — 60fps Target

**Self-audit steps (run in Chrome DevTools Performance tab):**

1. Open each design at `http://localhost:3000/mockup/v[N]`
2. Open DevTools → Performance → check "Screenshots" → Record for 5 seconds while scrolling
3. Look for frames taking >16ms in the main thread flame chart

**Per-design targets:**

| Design | Primary animation concern | Target | Notes |
|--------|--------------------------|--------|-------|
| V5 Tunnel | R3F render loop + scroll binding | 60fps | Use `useFrame` correctly; avoid per-frame state updates in React |
| V6 Strata | CSS transform on scroll | 60fps | Must use `transform` not `top/left`; no layout thrashing |
| V7 Recursive | Extreme scale transforms | 60fps | Scales >100x can cause subpixel rendering issues in Chrome |
| V9 Ticker | Continuous CSS animation | 60fps | Use `animation` not `setInterval + style.left` |
| V11 Architectural | SVG stroke animation | 60fps | SVG path animation is GPU-composited if `will-change: transform` set |
| V14 Cassette | Multiple simultaneous animations | 60fps | Cap concurrent animations; spool + VU meter + hover = 3 active at once |
| V19 Risograph | Halftone background + hover filter | 60fps | `filter: hue-rotate()` triggers compositor; test on integrated GPU |

---

### 4.5 Reduced Motion in Performance Context

Designs with heavy animation (V5, V9, V14) must not run their animation loops when `prefers-reduced-motion: reduce` is set. This is both an a11y and performance requirement.

**V5 Tunnel specifically:** The R3F render loop still runs even if animations are stopped. If reduced motion is detected, consider suspending the canvas entirely and rendering a static screenshot fallback.

---

## Section 5 — Mobile Responsiveness Audit

### 5.1 Breakpoint Collapse (768px / md)

Set browser viewport to exactly 768px width. Every design must render without:
- Horizontal overflow (check `document.documentElement.scrollWidth > window.innerWidth`)
- Text overflow (`overflow: hidden` on hero headings)
- Broken grid layouts (two-column collapsing to one)
- Overlapping elements

**Quick command (run in DevTools console):**
```javascript
document.documentElement.scrollWidth > window.innerWidth
// Must return false
```

| Design | No horizontal overflow at 768px? | Grid collapses gracefully? | Pass/Fail |
|--------|----------------------------------|---------------------------|-----------|
| V5 Tunnel | | | |
| V6 Strata | | | |
| V7 Recursive | | | |
| V8 Codex | | | |
| V9 Ticker | | | |
| V10 Atelier | | | |
| V11 Architectural | | | |
| V12 Specimen | | | |
| V13 Conversation | | | |
| V14 Cassette | | | |
| V15 Atlas | | | |
| V16 Broadsheet | | | |
| V17 Nostromo | | | |
| V18 Receipt | | | |
| V19 Risograph | | | |
| V20 Operator | | | |

---

### 5.2 Hero Text Overflow

Hero headings must not overflow their containers at any viewport width from 320px (iPhone SE) to 768px.

**High-risk designs:**
- V12 Specimen: Text scales to 720px — must use `clamp()` or `vw` units; static `px` sizes will overflow
- V9 Ticker: 60–90px hero numbers — verify `font-size: clamp(3rem, 10vw, 5.625rem)` or equivalent
- V7 Recursive: Hero at scale 1 → text must fit at 320px
- V16 Broadsheet: Multi-column layout — single-column on mobile must reflow correctly

**Check pattern:**
```bash
grep -rn 'text-\[.*rem\]\|text-\[.*px\]\|font-size.*px' src/app/mockup/v{5..20}*/Hero* --include="*.tsx" | grep -v clamp
# Flag any fixed pixel/rem hero font sizes without clamp()
```

---

### 5.3 Scroll-IN Designs — Mobile Degradation

V5, V6, and V7 must degrade to a functional vertical-scroll layout on mobile.

| Requirement | V5 Tunnel | V6 Strata | V7 Recursive |
|-------------|-----------|-----------|--------------|
| Has `@media (max-width: 768px)` override? | | | |
| Falls back to standard `overflow-y: auto` scroll? | | | |
| Engine is disabled or swapped out on mobile? | | | |
| Content (hero, services, portfolio, CTA) visible without scrolling trick? | | | |
| No 3D canvas blocking touch scroll? | | | |

**V5 additional mobile check:** R3F Canvas with touch-scroll events may conflict with iOS Safari's native scroll; confirm `touch-action: none` is NOT set globally on the page, or that the canvas has `events={null}` for pointer events when the mobile fallback is active.

---

### 5.4 Nav Height Clearance

The global nav is fixed at `var(--nav-height)` (treat as 80px). Every hero section must pad its top by at least 80px.

**Check:**
```bash
grep -rn 'pt-\|padding-top\|paddingTop\|mt-\|margin-top\|marginTop' src/app/mockup/v{5..20}*/Hero* --include="*.tsx" | grep -v 'node_modules'
# Look for pt-20 (80px in Tailwind) or equivalent
```

---

## Section 6 — Risk Flags

The following are the **7 highest-risk items** across the 16 designs. Each requires a dedicated manual test before the design can be marked production-ready.

---

### RISK-1 — V5 Tunnel: R3F + ScrollControls on Safari iOS

**Risk:** `@react-three/drei`'s `ScrollControls` component uses a custom scroll container that conflicts with Safari iOS's momentum scrolling and rubber-band effects. The tunnel may freeze, scroll erratically, or show a blank canvas.

**Test:** Load `/mockup/v5-tunnel` on a physical iPhone (Safari, not Chrome for iOS). Scroll from top to bottom. Confirm camera advances smoothly.

**Mitigation:** Implement a `useMobileDetect()` check that disables the R3F canvas on `max-width: 768px` and renders a static fallback with `IntersectionObserver`-driven section reveals instead.

---

### RISK-2 — V19 Risograph: Fluorescent Colors Fail Accessibility Contrast

**Risk:** Fluorescent pink `#FF48B0` on newsprint `#F5F0E1` yields approximately 2.8:1 contrast — below WCAG AA (4.5:1 for normal text, 3:1 for large). Riso yellow `#FFE100` on newsprint is near 1.5:1 and will fail all WCAG levels.

**Test:** Run all V19 text colors through [https://webaim.org/resources/contrastchecker/](https://webaim.org/resources/contrastchecker/).

**Mitigation:** Restrict fluorescent colors to large display text (>24px regular / >18.67px bold) or decorative elements only. Use `#1A1A1A` risograph black for all body copy, ensuring AA compliance while maintaining the aesthetic.

---

### RISK-3 — V9 Ticker: Hydration Mismatch from `Math.random()` / `Date.now()`

**Risk:** Live ticker values generated with `Math.random()` or `Date.now()` during render will differ between server and client, causing React hydration errors (`Text content does not match server-rendered HTML`). This will crash the entire page in strict mode.

**Test:** Open `/mockup/v9-ticker` and check the browser console for hydration errors immediately on page load.

**Mitigation:** All random/dynamic values must be initialized inside `useEffect` (client-only). Use `useState(null)` with a `null` initial render state and populate on mount.

---

### RISK-4 — V7 Recursive Zoom: Extreme CSS Scale Values on Low-Power Devices

**Risk:** Scaling a DOM element from `scale(0.001)` to `scale(1)` and simultaneously scaling another from `scale(1)` to `scale(1000)` creates compositing layers of extreme size. On integrated GPU or low-power devices (older Android, M1 MacBook in low-power mode), this can cause dropped frames, black flashes, or complete rendering failure.

**Test:** Run Chrome DevTools Performance recording during V7 scroll on a mid-tier laptop (simulate with CPU throttling at 4x slowdown). Check for frames >32ms.

**Mitigation:** Cap max scale at `scale(50)` with `opacity: 0` fade before the element would reach extreme values. Use `contain: layout style paint` on section wrappers.

---

### RISK-5 — V12 Specimen: Variable Font Axes Not Supported on Older Android WebViews

**Risk:** Fraunces uses optical-size (`opsz`) and style (`SOFT`, `WONK`) variation axes. Android WebView pre-Chrome 87 does not support CSS `font-variation-settings` reliably. The design may render with a fallback weight, breaking the entire "typeface showcase" concept.

**Test:** Load `/mockup/v12-specimen` in a BrowserStack session targeting Android 8 (Chrome 70).

**Mitigation:** Define a robust `@font-face` fallback stack. Ensure the layout does not completely break when variable axes are ignored — use static weight classes as base, enhance with variation settings via `@supports (font-variation-settings: normal)`.

---

### RISK-6 — V14 Cassette: CSS Skeuomorphism Heavy Gradient Load on Paint

**Risk:** Heavy use of `radial-gradient`, `conic-gradient`, `box-shadow` (multiple layers for chrome/depth effects), and `filter: drop-shadow` on multiple elements simultaneously causes long paint times. On first load, the design may flash or show incomplete gradients before the GPU catches up.

**Test:** Chrome DevTools → Rendering → Enable "Paint flashing". Scroll through V14. Extensive green overlays indicate excessive repaint regions.

**Mitigation:** Move purely decorative gradients to `::before`/`::after` pseudo-elements with `will-change: transform` so they are promoted to their own compositor layer and painted only once. Avoid animating `background` or `box-shadow` properties — animate `transform` and `opacity` only.

---

### RISK-7 — V6 Strata + V7 Recursive: CSS `perspective` Creates Stacking Context Side Effects

**Risk:** Setting `perspective` on a container creates a new stacking context, which means `position: fixed` children (such as the global nav) will no longer be fixed relative to the viewport — they will be fixed relative to the transformed container. This will visually break the nav on V6 and V7.

**Test:** Load `/mockup/v6-strata` and `/mockup/v7-recursive`. Confirm the global navigation stays fixed at the top while scrolling. Check that `<header>` or `<nav>` is NOT a descendant of any element with `transform`, `perspective`, `will-change: transform`, or `filter` applied.

**Mitigation:** Ensure the scroll engine's perspective/transform container is a sibling of the nav (not a parent). Use CSS containment carefully. Place the `StrataEngine` / `RecursiveEngine` as a direct child of `<main>`, with `<nav>` living in the layout file outside `<main>`.

---

## Sign-Off Template

Complete this section after running all checks above.

```
KPT Designs — V5–V20 QA Sign-Off
==================================

Reviewer: ___________________________________
Date: _______________________________________
Commit / PR reviewed: _______________________
Dev server URL: http://localhost:3000

SECTION 1 — Routing & Compilation
  [ ] All 16 routes return HTTP 200
  [ ] No TypeScript compile errors (npm run typecheck)
  [ ] No ESLint errors (npm run lint)
  [ ] Console is clean (no React hydration errors, no missing key warnings)
  Failures noted:


SECTION 2 — Brand Consistency
  [ ] All hero sections reference 4-in-1 stack (registrar/host/designer/AI agents)
  [ ] All primary CTAs → /start
  [ ] All secondary CTAs → /pricing
  [ ] All portfolio sections import @/lib/portfolio and show first 6 entries
  [ ] Numbers/dates use lining figures on oldstyle-default fonts
  [ ] "KPT" wordmark present in every hero
  [ ] "Est. 2004" present in every CTA/Finale section
  Failures noted:


SECTION 3 — Accessibility
  [ ] All color combinations pass WCAG AA (or flagged as decoration-only)
  [ ] Focus indicators visible on all interactive elements
  [ ] Keyboard navigation works for scroll-IN designs (V5/V6/V7)
  [ ] prefers-reduced-motion respected in all 16 designs
  [ ] Semantic landmarks correct (nav, main, section, h1–h3 hierarchy)
  [ ] ARIA labels applied to decorative-looking interactive elements
  Failures noted:


SECTION 4 — Performance
  [ ] Only V5 uses R3F / Three.js (V6–V20 have zero @react-three imports)
  [ ] No bare <img> tags (all use Next.js <Image>)
  [ ] All fonts use display: 'swap' via next/font/google
  [ ] 60fps confirmed on mid-tier hardware for high-animation designs (V5, V9, V14)
  [ ] Reduced motion disables animation loops, not just transitions
  Failures noted:


SECTION 5 — Mobile Responsiveness
  [ ] No horizontal overflow at 768px on any design
  [ ] Hero text does not overflow at 320px–768px range
  [ ] V5/V6/V7 degrade to vertical scroll on mobile
  [ ] All heroes clear the global nav (80px padding-top minimum)
  Failures noted:


SECTION 6 — Risk Items
  [ ] RISK-1: V5 Tunnel tested on Safari iOS physical device
  [ ] RISK-2: V19 Risograph contrast verified / fluorescents restricted to decorative use
  [ ] RISK-3: V9 Ticker has no hydration errors in console
  [ ] RISK-4: V7 Recursive tested under CPU throttle (4x) — no dropped frames
  [ ] RISK-5: V12 Specimen variable font fallback verified
  [ ] RISK-6: V14 Cassette paint time acceptable (no excessive repaint regions)
  [ ] RISK-7: V6/V7 nav stays fixed; perspective container does not trap fixed children
  Failures noted:


OVERALL STATUS
  [ ] PASS — All checks cleared; designs ready for client review
  [ ] CONDITIONAL PASS — Minor issues noted above; re-check before shipping
  [ ] FAIL — Blocking issues; designs must be revised before proceeding

Notes / additional findings:



Signature: _________________________________
```

---

*This checklist is generated against design-library.md as of 2026-04-28. Re-run Section 1 smoke tests and Section 6 risk checks whenever section files are updated.*
