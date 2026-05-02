# Handoff — Earthy Rebuild + Self-Serve Spike (Night of 2026-05-02)

This is what shipped overnight on the `feat/earthy-rebuild` branch. Read first, demo second, decide third.

---

## TL;DR

You can now **paste a URL on `http://localhost:3002/start` and 30 seconds later see a real, scrollable boutique-style preview at `/preview/<id>`**. The home page is rebuilt around this funnel. Everything is on branch `feat/earthy-rebuild`.

**The magic moment to see right now:**
1. http://localhost:3002/  → scroll the boutique home, hit any "Build my preview" / "Send us your URL" / "Start your project" CTA
2. http://localhost:3002/start → paste `ciriglianoplumbingllc.com`, hit Build my preview
3. ~30s later you land at `/preview/<id>` with a real, themed, scrollable site

A real Gemini-generated preview lives at: **http://localhost:3002/preview/4e269daf-7139-4587-9536-e28b135fe5f2**

Gemini wrote actual boutique copy specific to Cirigliano Plumbing — "Comprehensive Plumbing for Pittsburgh Homes", "Trusted Across the South Hills", "Trenchless Sewer Repair Innovations". Geographic specificity preserved from the source, which is exactly what the system prompt asks for. (Earlier demo at `806ebbd6-f81d-4b7a-9f20-fdc9ad740c96` was the templated fallback before we swapped to Gemini — still viewable on FS but the new one is the live demo.)

---

## Storage + AI now share kptagents' production credentials

After your direction to "use our API keys and Storage we use for kptagents," the spike was rewired to the working infra. **No more Anthropic, no more Supabase Storage** in the spike's hot path.

- **Storage** = Linode Object Storage (S3-compatible). Bucket is shared with kptagents — KPT Designs data is namespaced under `kptdesigns/intake-jobs/<id>.json` so the two projects' trees never collide. Mirrors how kptagents uses `recordings/`, `uploads/`, `invoices/`, `voice-previews/`.
- **AI** = Google Gemini (`gemini-3-flash-preview`), same model kptagents uses in `src/lib/email.ts`.
- `.env.local` appended `GOOGLE_API_KEY` + the five `LINODE_STORAGE_*` vars under a "Shared with kptagents" banner documenting why.
- The legacy Anthropic + Supabase env vars are still in `.env.local` (untouched, in case other parts of the codebase still want them) but the intake/preview pipeline no longer uses them.

**The FS fallback still exists** — if you blow away the Linode env vars on a dev box, the store transparently writes to `/tmp/kpt-intake/<id>.json` so the spike still demos offline.

---

## What got built tonight (4 commits on `feat/earthy-rebuild`)

```
dcecf6b feat(home): wire homepage CTAs to /start + boutique copy polish
f91867b fix(intake): unblock end-to-end demo with FS fallback + graceful AI degrade
dde627b feat(intake): /start funnel + /api/start pipeline endpoint + /preview renderer
[earlier]: theme foundation + chrome + sections (from the prior session)
```

### Foundation

- **Puck installed** (`@measured/puck`). The editor library you'll use to let customers edit their site after they pay.
- **Cheerio installed** for URL scraping.
- **Fraunces** (variable serif) added as `--font-earthy-serif` for boutique editorial headlines. Used in the home features h2, the start hero, the preview "preview not found" state, and elsewhere where we want the writerly feel.
- **`src/lib/puck-config.tsx`** — the bridge file. Registers all 8 earthy section components (Hero, Ribbon, Features, Showcase, Stats, LogoCloud, Quote, Cta) as Puck blocks with fields, defaults, and render functions. Also exports `BLOCK_SCHEMA_FOR_AI` (a markdown description of every block) which the AI generator uses as system-prompt context.
- **`src/lib/intake-store.ts`** — abstraction over storage with two backends (Supabase, FS), auto-selected.
- **`src/lib/scraper.ts`** — Cheerio-based URL scraper. Extracts title, meta, og:image, headings, links, images, condensed text. 15s timeout, 8KB text cap.
- **`src/lib/ai/site-generator.ts`** — Claude wrapper. System prompt teaches the boutique voice + the block schema. On failure, falls back to a templated tree.

### UI

- **`/start`** (`src/app/start/page.tsx`) — boutique funnel page. Big Fraunces italic h1: "Show us where you are. We'll show you where you could be." Pill input that prefills + auto-submits when arriving from `/?url=foo` (the homepage hero search uses this). Three-step "Read / Refine / Render" explainer. Helper toggles: "Don't have a site?" reveals a textarea for from-scratch intake; "What we extract" lists the data; "How long it takes" tooltip. Submitting state: bouncing dots + cycling flavor lines ("Reading your site…", "Choosing the right blocks…", etc.).
- **`/api/start`** (POST) — synchronous pipeline. Validates input → creates intake job → scrapes URL → Claude → persists Puck tree → returns `{id, status}`. 300s function timeout (Vercel default).
- **`/preview/[id]`** (`src/app/preview/[id]/page.tsx`) — Server Component. Three states:
  - Missing → "Preview not found" card.
  - In progress → Fraunces italic status copy + meta-refresh tag (auto-reloads every 2s).
  - Ready → sticky orange "Make this mine — $500" banner + the rendered Puck tree + a final CtaSection + a quiet disclosure footer.
  - Uses a tiny client wrapper `PreviewRenderer.tsx` because Puck's `<Render>` needs client context.

### Home + chrome

- Home page CTAs all point at `/start` now (was `/contact`). Six CTAs updated.
- Home features h2 reframed: "Considered websites for considered businesses" (Fraunces italic).
- StatsSection title: "Numbers we work to keep" (humble boutique).
- Bottom CtaSection: now mirrors the `/start` hook ("Show us where you are. We'll show you where you could be.").
- `src/components/layout-shell.tsx` — EarthyNav + EarthyFooter now wrap `/`, `/start`, and `/preview/*`.
- Hero (`src/components/earthy/hero.tsx`) refactored to accept props (so Puck can drive it). Tagline now in Fraunces italic. Search form posts to `/start`.
- Ribbon (`src/components/earthy/ribbon.tsx`) refactored to accept items as a prop.
- Clerk middleware allowlist widened to include `/start`, `/preview/*`, `/api/start` (anonymous preview = correct product behavior).
- `metadata` in `layout.tsx` updated to lead with the boutique positioning.

### Auto-fixes I had to make

- **Fraunces font config** — `axes: ["SOFT", "opsz"]` can't combine with explicit `weight: [...]` in next/font. Removed the weight array (Fraunces is variable, weight via Tailwind utilities still works). Required to make any page render.
- **Scraper User-Agent** — had a unicode em-dash in it which `fetch()` rejects as a non-ByteString header value. Replaced with ASCII hyphen.
- **Type cast warnings in puck-config.tsx** — needed `as unknown as X` because Puck's `WithPuckProps` shape doesn't structurally overlap with our typed prop shapes.

---

## What's intentionally NOT done (decide tomorrow)

- **The actual Puck editor.** Right now we generate Puck data and *render* it read-only. The editor (drag/drop, edit text, swap images) is the next spike. Puck is installed and the schema is locked in, so it's incremental — probably a `/edit/[id]` route in another half-day session.
- **Real Stripe checkout.** The "Make this mine — $500" button currently links to `/contact?from=preview&id=…`. Stripe wire-up = real money flow = wants its own focused session.
- **Per-customer GitHub + Vercel provisioning.** The "publish to my real domain" flow uses your existing `/api/provision/github` and `/api/provision/vercel` (which we're keeping). They need to be re-wired to consume the published Puck tree as a build input. Next-next spike.
- **Domain transfer-out.** Future sprint.
- **Account creation + dashboard.** The free preview is anonymous on purpose; the customer gets an account when they pay. Dashboard rebuild after that.
- **Deletion of legacy code.** All the old `/sites/*`, `/dashboard/*`, `/landman`, `/neo`, `/projects/touchdesign`, `/proposal/*`, `/mockup/*` pages still exist and still use the legacy dark `Header`/`Footer`. Nothing breaks; they just live in their own visual world. Sweep them whenever you're ready — the new earthy chrome only activates on `/`, `/start`, `/preview/*`.
- **Rate limiting on `/api/start`.** Right now anyone can hit it forever. Plan: per-IP, 3/day, captcha at signup. Need to add before exposing publicly.

---

## How the pipeline actually works (for when you read the code)

```
   Customer pastes URL on /start
            │
            ▼
   POST /api/start { url }
            │
            ▼
   createIntakeJob() → status: pending
            │
            ▼
   scrape(url) ─── Cheerio fetch + parse
            │       (title, meta, headings, links, images, ~8KB text)
            ▼
   updateIntakeJob() → status: scraping → status: generating
            │
            ▼
   generateSite(scraped) ─── Claude, with system prompt cached
            │                If Claude fails → templatedTree(scraped)
            ▼
   updateIntakeJob() → puck_data: <tree>, status: ready
            │
            ▼
   Response: { id, status: "ready" }
            │
            ▼
   Browser pushes router to /preview/<id>
            │
            ▼
   readIntakeJob(id) → fetch from FS or Supabase Storage
            │
            ▼
   <Render config={earthyConfig} data={puck_data} />
            │
            ▼
   Customer sees their boutique-style preview
```

**Where the puck_data lives right now:** `/tmp/kpt-intake/<id>.json` (FS fallback). Inspect them with `ls /tmp/kpt-intake/` and `cat /tmp/kpt-intake/<id>.json | jq`.

---

## File map of new code

```
src/lib/
├── puck-config.tsx           ← Puck schema + ICON_REGISTRY + BLOCK_SCHEMA_FOR_AI
├── intake-store.ts           ← Supabase Storage / FS fallback CRUD
├── scraper.ts                ← Cheerio URL fetcher + parser
└── ai/
    └── site-generator.ts     ← Claude wrapper + templatedTree fallback

src/app/
├── start/
│   └── page.tsx              ← funnel page (client component)
├── preview/[id]/
│   ├── page.tsx              ← async Server Component, 3 states
│   └── PreviewRenderer.tsx   ← client wrapper for Puck <Render>
└── api/start/
    └── route.ts              ← POST handler — the orchestration

supabase/migrations/
└── 002_intake_jobs.sql       ← CHECKED IN, NOT APPLIED. Use when you
                                  promote intake jobs to a real DB row.
```

Components from the prior session (`src/components/earthy/*`) are unchanged except `hero.tsx` and `ribbon.tsx`, which were refactored to accept props (with backward-compatible defaults).

---

## How to demo this tomorrow

1. Make sure dev server is running: `npm run dev` (it's been running on `:3002`).
2. Open http://localhost:3002/ — boutique home, scroll it.
3. Click "Send us your URL" or "Build my preview" — lands on `/start`.
4. Paste `ciriglianoplumbingllc.com` (or any small-business URL). Hit "Build my preview →".
5. Wait ~30s. Land on a `/preview/<id>` URL. The preview is real and scrollable.
6. The "preview not found" branch is also live — try http://localhost:3002/preview/00000000-0000-0000-0000-000000000000.

To see what AI generation looks like *with* a real Anthropic key:
1. Replace `ANTHROPIC_API_KEY` in `.env.local`.
2. Restart dev server.
3. Run again. The copy quality jumps dramatically.

---

## Questions I'd want answered before the next session

1. **Puck editor next, or real Stripe checkout next?** Both are valuable. Puck unlocks the "I can edit it" promise. Stripe unlocks revenue.
2. **Free-preview rate limit** — how strict do you want to be on day one? Per-IP / day? Captcha?
3. **Hand-off mechanism** — when a customer pays, do we (a) provision a brand-new GitHub repo from a template + invite them, or (b) host on KPT's infra by default with hand-off as an optional later upgrade? Affects whether the editor publishes to Supabase + ISR or commits to a per-customer repo.
4. **Pricing tiers** — sticking with "$500 starting price, scales with complexity" as a single anchor, or breaking into Starter / Plus / Custom on `/pricing`?
5. **Old code sweep** — do we delete `/sites/*`, `/dashboard/*`, `/landman`, `/neo`, `/proposal/*`, `/mockup/*` now that they're orphaned, or keep around as reference?

— Claude Opus 4.7
