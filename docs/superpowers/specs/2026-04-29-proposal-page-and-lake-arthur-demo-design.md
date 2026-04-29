# Proposal Page + Lake Arthur Golf Club Redesign Demo — Design Spec

**Date:** 2026-04-29
**Project:** `kptdesigns`
**Author:** Claude (via brainstorming skill, with cbas as Director)
**Branch:** `feat/mockup-playground`

## Summary

Two new public routes:

- **`/sites/lake-arthur`** — a complete redesign of Lake Arthur Golf Club
  (Butler, PA) in the **Lakeside Field Guide** aesthetic (editorial / magazine
  / Kinfolk × National Geographic). Single long scroll, ten sections covering
  all four revenue lines (tee times, banquets, tournaments, leagues) plus pro
  shop, visit, footer. Pure UI: forms validate but do not persist; deposit
  step renders Stripe Elements in test mode but never creates a PaymentIntent.
- **`/proposal/lake-arthur`** — a cinematic wrapper around the redesign that
  Lake Arthur owners experience first. Branded intro frame fades through the
  existing `PageApproach` depth-entrance into the embedded redesign rendered
  fullscreen, with floating chrome: annotation rail (right edge), before/after
  toggle (bottom-left), scope drawer (bottom-right). All chrome is dismissible
  so the redesign can stand on its own.

The proposal page is the productized "first pass" presentation kptdesigns
shows new customers. Lake Arthur is the inaugural test instance and the
template that future `/proposal/<slug>` instances will follow naturally — no
formal templating system is built tonight.

## Why

End-game: `/proposal/<slug>` becomes how kptdesigns pitches every prospective
customer — a knock-your-socks-off cinematic presentation of a real, clickable
redesign of their site. Tonight builds the inaugural instance for Lake Arthur
Golf Club, exercising the full kptdesigns mockup methodology end-to-end on a
real customer.

Lake Arthur fits because:
- Their current site (`lakearthur.com`) is dated and undersells the property —
  before/after contrast will land hard.
- They sit on Lake Arthur (the lake) in Moraine State Park country — a
  genuinely scenic asset their current site barely uses. Drone footage is the
  obvious unlock.
- They have **four** revenue lines already (tee times, banquets, tournaments,
  leagues) plus a pro shop. The Lakeside Field Guide format handles
  multi-line businesses better than a pure cinematic reel would.
- Director (cbas) plans to film a hole-by-hole drone reel of the actual
  course — placeholder loops tonight slot directly out for filmed footage
  later.

Backend wiring (real Stripe charges, persistence, email, multi-tenant
templating) is explicitly deferred. Tonight is presentation.

## Constraints

- **Pure UI.** No `fetch` to internal APIs, no Clerk gates, no Supabase
  reads/writes, no email sends, no real Stripe charges. Forms validate via
  `react-hook-form` + `zod` and render realistic success states only.
- **`PageApproach` wrapper is mandatory** on both new routes — keeps the
  depth-entrance behavior consistent with the existing catalog.
- **No edits to global files** (`src/app/layout.tsx`, `globals.css`) without
  explicit Director approval. Each route is isolated to its own folder, with
  inline `<style>` tags and route-scoped components following the existing
  cosmic-pages convention.
- **No new top-level dependencies** without Director sign-off. Everything
  needed (`framer-motion`, `@stripe/stripe-js`, `react-hook-form`, `zod`,
  `lucide-react`, Tailwind, Next 16) is already installed.
- **Accessibility floor:** every interactive element keyboard-reachable;
  `prefers-reduced-motion` honored across all animations including the
  cinematic intro and `PageApproach` (already honored upstream); WCAG AA
  color contrast on all text.
- **Performance floor:** no first-paint regression on the dev server > 1.5s;
  no visible scroll jank on a mid-tier laptop. Drone video is the heaviest
  asset — must be `<video preload="metadata">`, muted, autoplaying loop, and
  served compressed (target ≤ 4 MB for the hero loop).
- **Real copy.** Lake-Arthur-flavored throughout. No lorem. Course data
  (par, yardage, signature holes) marked as `[owner-supplied — placeholder]`
  in the annotation rail so the customer immediately sees what they need to
  verify.
- **Public access.** Both routes are public — `/proposal/lake-arthur` is the
  link cbas sends to Lake Arthur owners; no auth gate.

## Architecture

### File layout

```
src/app/proposal/lake-arthur/
├── page.tsx                          ← server entry; wraps in <PageApproach>
└── _proposal/
    ├── ProposalShell.tsx             ← client component; orchestrates intro,
    │                                   embedded redesign, floating chrome
    ├── Intro.tsx                     ← 3.5s branded intro frame
    ├── AnnotationRail.tsx            ← right-edge dot rail + slide-out cards
    ├── BeforeAfter.tsx               ← bottom-left pill, crossfades viewport
    ├── ScopeDrawer.tsx               ← bottom-right "Proposal details" sheet
    └── annotations.ts                ← scroll-position-keyed annotation data

src/app/sites/lake-arthur/
├── page.tsx                          ← server entry; wraps in <PageApproach>
└── _sections/
    ├── DroneHero.tsx
    ├── CourseAtAGlance.tsx
    ├── FieldGuide.tsx                ← 18 holes
    ├── BookTeeTime.tsx               ← Stripe Elements demo
    ├── Banquets.tsx
    ├── Tournaments.tsx
    ├── Leagues.tsx
    ├── ProShop.tsx
    ├── Visit.tsx
    └── Footer.tsx

src/app/sites/lake-arthur/_lib/
├── content.ts                        ← all hardcoded course/holes/rates data
├── tokens.ts                         ← palette + type tokens
└── stripe-demo.ts                    ← Stripe.js loader + demo-mode helpers

public/proposal/lake-arthur/
└── before.png                        ← screenshot of lakearthur.com

public/sites/lake-arthur/
├── drone-hero.mp4                    ← stock CC-licensed aerial loop
└── photos/                           ← banner_1/2/3 from current site +
                                       curated CC0 stock
```

The proposal route **renders the redesign directly via component composition**
— it imports the redesign's section components, not via iframe. This avoids
CORS issues, double scrollbars, and motion desync. The redesign route remains
independently visitable.

### Routes summary

| Route | Visibility | Purpose |
|---|---|---|
| `/proposal/lake-arthur` | Public | Cinematic pitch wrapper around the redesign |
| `/sites/lake-arthur` | Public | The redesign itself, standalone |

## The Redesign — `/sites/lake-arthur`

### Aesthetic: Lakeside Field Guide

National Geographic / Kinfolk editorial sensibility. Generous whitespace,
serif display type, italic pull-quotes, marginalia-style captions.
Photography is large and generously bled. Motion is editorial: slow
scroll-fades, no fast bounces. Drone footage owns the motion budget.

**Type:**
- Display: Playfair Display (existing in the project)
- Body: Inter (already used elsewhere in the project)
- Captions: Inter italic small-caps

**Palette:**
- Deep water `#0E2A3F`
- Fairway green `#2C5530`
- Cream paper `#F4EFDF`
- Dawn gold `#C9A96E`
- Charcoal `#1A1A1A`

### Sections (top → bottom)

1. **Drone Hero** — fullscreen looping video (stock CC0 aerial of a wooded PA
   course, replaceable with their drone reel later). Soft serif type emerges
   over a vignette: `Lake Arthur` / `Golf on the lake` / address bottom-edge.
   Subtle down-arrow scroll cue.

2. **Course at a Glance** — editorial typographic block. `18 holes` / `Par 72*`
   / `~6,400 yds*` / character pull-quote ("Picturesque, ideal for all
   levels — designed to help you focus on your game and leave the
   distractions of life behind."). Asterisks bound to annotation-rail flag.

3. **The 18 Holes — Field Guide** — vertical flow, hole 1 → 18. Each hole
   row:
   - Hole number (large display numeral)
   - Par + yardage (placeholder)
   - Character note (one or two sentences in editorial voice — e.g.,
     "Dogleg right with the lake hugging the entire left edge. Aim at the
     stand of oaks; let the slope feed you toward the green.")
   - Drone-clip frame (initially the hero loop reused; flagged for swap)
   - Optional sidebar tip in italic small-caps marginalia
   - Generous white space between rows

4. **Book a Tee Time** — anchor `#book`. Three-step inline flow:
   - Step 1 — date picker, time picker (15-min slots, 6 AM → 5 PM), # players
     (1–4 stepper), cart vs walking radio, optional discount code.
     Live total computed from rates table. `Continue to deposit` CTA.
   - Step 2 — deposit summary ($10 per player hold), Stripe Elements card
     field rendered in test mode. `Confirm reservation` CTA shows 1.2s
     "processing…" state then resolves.
   - Step 3 — success state: confirmation number `LA-XXXXX` (random per
     session), summary, "Add to calendar" download button (generates an
     `.ics` blob client-side), "Book another" link returns to Step 1.

5. **Banquets & Weddings** — anchor `#banquets`. Lush hero image (sunset
   wedding-feel CC0 stock for tonight). Two-column inquiry form on the right:
   event type (wedding / corporate / charity tournament / private dinner /
   other), event date, headcount, name/email/phone, free-text "Tell us about
   your vision". Submit shows: "Thanks — Pat from our events team will reach
   out within 24 hours."

6. **Tournaments** — anchor `#tournaments`. Three-card grid: charity scramble,
   corporate outing, member-guest. Click opens a detail panel inline (not a
   modal) with format / capacity / starting price (placeholder) / inclusions
   list + a mini inquiry form (date / contact / details).

7. **Leagues** — anchor `#leagues`. Four-card grid: Mon men's, Wed women's,
   Thu seniors, Sun couples (placeholder schedule — flagged in annotations).
   Each card: schedule, season window, fee, "Sign up" reveals an inline form
   (name, email, phone, league pick) → "Welcome — we've added you to the
   roster, season starts <date>."

8. **Pro Shop** — anchor `#shop`. 6-12 product cards (logo merchandise,
   accessories — placeholder). Add-to-cart is decorative tonight ("Coming
   soon to the new shop"). "View full shop" links to their existing
   `/shop` until the real shop ships.

9. **Visit** — address (255 Isle Road, Butler, PA 16001), Google Maps
   embed (the public no-API embed iframe), hours (placeholder), phone
   (724) 865-2765, contact form (name / email / message → success state).

10. **Footer** — Lake Arthur logotype, social links (placeholder), nav,
    copyright, "Designed by KPT Designs" small mark linking back to
    `/proposal/lake-arthur`.

### Forms strategy

All forms use `react-hook-form` + `zod` for validation. On valid submit,
each form:
- Disables inputs during a 600–1200ms simulated "processing" state.
- Resolves to a realistic success state (not an alert, not a redirect).
- `console.log`s the validated payload for QA verification.

The Stripe Elements deposit form additionally:
- Loads `@stripe/stripe-js` lazily on the Step 2 mount.
- Uses the real publishable key from env (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`).
- Skips `PaymentIntent` creation entirely. The `demoMode` flag in
  `stripe-demo.ts` short-circuits before any network call.
- The card field is interactive (real Stripe Elements rendering) so the
  visual fidelity is genuine; the submit handler fakes the charge.

## The Proposal Wrapper — `/proposal/lake-arthur`

### Composition

1. **Intro frame** (component: `Intro.tsx`). Black canvas, ~3.5s total,
   skippable on click or any key:
   - 0–800ms: small Inter (weight 200) `KPT Designs presents` fades in.
   - 800–2400ms: large Playfair italic `A proposal for Lake Arthur Golf Club`
     fades in below.
   - 2400–3000ms: small caps `Butler, PA · April 2026` fades in.
   - 3000–3500ms: full canvas fades to black, hands off to `PageApproach`
     depth-entrance into the embedded redesign.

2. **Embedded redesign** — the redesign's section components rendered in a
   container that owns the full viewport. Lenis smooth-scroll if already
   active site-wide; otherwise native.

3. **Floating chrome** — three persistent UI elements, each independently
   dismissible:

#### Annotation Rail (`AnnotationRail.tsx`)

- Right edge of viewport, 28px wide strip with a vertical track and dot
  markers tied to scroll positions of flagged sections (course-at-a-glance,
  book-a-tee-time, banquets, tournaments, leagues, drone-hero, footer).
- When the user scrolls into a flagged section, a card slides out from the
  rail with `What changed:` line + `Why:` line + dismiss X. Auto-dismisses
  after 5s if untouched.
- Mute toggle at the rail top: silences future auto-pops; markers still
  clickable on demand.
- Annotation copy lives in `annotations.ts` keyed by anchor ID.

#### Before/After Toggle (`BeforeAfter.tsx`)

- Bottom-left pill, two states: `Before` / `After`. Default = After.
- Selecting `Before` crossfades the viewport (600ms) to a fullscreen
  `before.png` screenshot of `lakearthur.com`. Scroll is locked to the
  screenshot's natural aspect (we show the full screenshot, scroll vertically
  through the captured image).
- Selecting `After` crossfades back to the live redesign.
- Keyboard shortcut: `B` to toggle.

#### Scope Drawer (`ScopeDrawer.tsx`)

- Bottom-right "Proposal details" button. Click slides up a sheet from the
  bottom (max-height 88vh, dismissible by Esc, click-outside, or close X).
- Drawer sections:
  - Scope of work (bullet list of what's being delivered)
  - Deliverables (live site, CMS, ongoing support tier, etc.)
  - Timeline: 3 weeks from approval to launch (placeholder dates)
  - Pricing: gated behind a `Reveal pricing` button so it isn't the
    visual headline (placeholder figures clearly tagged as draft)
  - Our process: brief KPT methodology blurb
  - Three CTAs: `Approve direction` / `Request changes` / `Schedule a call`
    — each opens a small confirmation/contact form. UI-only tonight.

### Annotation copy (initial)

Stored in `annotations.ts`. One entry per flagged anchor. Sample:

```ts
{
  anchorId: "book",
  what: "Direct online booking with a small deposit hold replaces the
         third-party `cps.golf` link-out.",
  why: "Customers stay on your domain, you capture the email + payment
        method, and a $10/player hold cuts no-shows."
}
```

Six initial entries:
- `course-at-a-glance` — "Course details surfaced as the second thing
  visitors see, not buried five clicks deep."
- `book` — booking flow (above).
- `banquets` — "Banquet leads captured directly with full context — event
  type, date, vision — instead of a generic contact form."
- `tournaments` — "Each tournament type gets its own entry point with the
  format and inclusions visible upfront."
- `leagues` — "Self-serve league signup; roster grows without phone tag."
- `drone-hero` — "Replace this stock loop with your filmed drone reel —
  hole-by-hole footage will live throughout the field guide."

## Tech Approach

- **Framework:** Next.js 16.1.6 App Router, React 19.
- **Styling:** Tailwind 4 + inline `<style>` tags per component (catalog
  convention). Palette/type tokens in `_lib/tokens.ts` exported as Tailwind
  arbitrary values for consistency.
- **Motion:** `framer-motion` for the intro frame, annotation card slide,
  drawer, before/after crossfade, and scroll-fade-in on each redesign
  section. `prefers-reduced-motion` shorts all animations.
- **Forms:** `react-hook-form` + `zod` schemas co-located per form file.
- **Stripe:** `@stripe/stripe-js` lazy-loaded on `BookTeeTime` Step 2.
  Demo-mode short-circuit in `stripe-demo.ts`.
- **Calendar download:** client-side `.ics` blob built from booking values,
  triggered via `<a download>`.
- **Maps:** Google Maps no-API embed iframe; lazy-loaded below the fold.
- **Drone video:** stock CC0 MP4 at `/public/sites/lake-arthur/drone-hero.mp4`,
  served `<video autoPlay muted loop playsInline preload="metadata">`. Per-hole
  clips reuse the hero loop initially with a `data-placeholder="true"`
  attribute the QA agent can grep for.
- **Before screenshot:** captured tonight via the Chrome MCP browser tools
  (`navigate` to `lakearthur.com`, full-page screenshot), saved to
  `/public/proposal/lake-arthur/before.png`.
- **Course content:** all in `_lib/content.ts` — single source of truth for
  course meta, 18 holes, rates table, tournaments, leagues, products,
  contact. Placeholder values explicitly tagged with a const helper:

```ts
const PLACEHOLDER = (v: string) => ({ value: v, isPlaceholder: true });
```

  …so the QA pass and annotation rail can both surface flagged values.

### Reused project infra

- `PageApproach` wrapper from `src/app/mockup/_lib/PageApproach.tsx`.
- Tailwind theme + global typography from existing site (no overrides).
- Lucide icons (already installed) for UI affordances (Calendar, MapPin,
  ArrowRight, X, ChevronDown, etc.).
- Existing `/public/concepts/` patterns for self-contained section assets.

## Quality Bar

Each section must:
- Render with no console errors and no hydration warnings.
- Pass keyboard navigation (Tab order, Enter/Space activation, Esc dismissal).
- Respect `prefers-reduced-motion` (animations short-circuit to instant
  state).
- Hit WCAG AA contrast on all text.
- First paint ≤ 1.5s on dev server.
- No visible scroll jank on a mid-tier laptop.

The proposal page must additionally:
- Allow skipping the intro at any time (click or keypress).
- Allow muting/dismissing every floating UI element.
- Allow direct linking to `/sites/lake-arthur` for visitors who want the
  redesign without the proposal chrome.

## Out of Scope (explicit)

- Real Stripe charges, webhooks, payment intents, customer creation, refunds.
- Real DB persistence — no Supabase reads/writes from these routes.
- Email sends — no Resend calls; success states are visual only.
- Authenticated proposal links (signed URLs, expiry, view tracking) — public
  link tonight; auth-gating is a follow-up.
- Mobile polish — desktop showcase first; layouts are responsive but not
  fine-tuned for narrow viewports tonight.
- Real drone footage — placeholder loop swaps for filmed reel later.
- Real photography library — three banner images from their current site
  + curated CC0 stock; full photo library is a follow-up.
- Multi-customer DB-driven proposal templating — Lake Arthur content is
  hardcoded; a `/proposal/<slug>` system pulling from a DB lives in a
  follow-up after this proves the format.
- Replacement of their existing `cps.golf` booking integration — the
  in-page booking flow tonight is a UI demo of what's possible. Real
  integration with their tee-sheet system is part of build phase.
- Mobile app, internationalization, dark mode toggle, search.
- A/B testing infrastructure or analytics wiring.

## Risks

- **Drone video weight.** Mitigation: ≤ 4 MB cap, `preload="metadata"`,
  poster frame for instant paint, single shared loop (no per-hole clips
  tonight).
- **Stripe Elements visual breaking.** Mitigation: render in a fixed-height
  container with a fallback skeleton; if the script fails to load, fall back
  to a styled placeholder card field that still validates and submits.
- **Before/after screenshot capture failing.** Mitigation: if the Chrome MCP
  capture fails, fall back to a stylized "current site" placeholder card
  with a screenshot-style frame and bullet-listed pain points; the
  before/after toggle still works.
- **Cinematic intro perceived as "in the way" on repeat visits.**
  Mitigation: skippable from any input; persisted dismissal in `localStorage`
  so a returning customer doesn't replay it.
- **Annotation rail crowding the redesign.** Mitigation: rail is 28px,
  cards auto-dismiss in 5s, full mute toggle. Default state is "rail markers
  visible, no auto-pop"; first auto-pop happens only when the user enters
  the first flagged section.
- **Placeholder values mistaken for committed claims.** Mitigation: every
  placeholder field is wrapped via the `PLACEHOLDER` helper and the
  annotation rail surfaces them explicitly: "These values are working
  placeholders — confirm before publish."
- **Token/time spend tonight.** Mitigation: dispatch parallel subagents for
  independent sections (the 10 redesign sections + 4 proposal-chrome
  components are largely independent); Director reviews at section
  boundaries; cut sections to placeholder if budget pressure hits.
- **Course/business data accuracy.** Mitigation: nothing in the page is
  presented as fact unless verified — par/yardage/league schedule/rates
  tagged as placeholder; phone/address/booking URL are pulled directly from
  their site.

## Definition of Done

- `/sites/lake-arthur` renders all 10 sections, all 4 forms validate and show
  realistic success states, Stripe Elements card field renders without
  network calls.
- `/proposal/lake-arthur` plays the cinematic intro, embeds the redesign
  fullscreen, exposes annotation rail / before-after toggle / scope drawer,
  all dismissible.
- `before.png` captured and rendered on the toggle.
- All placeholder values flagged in `_lib/content.ts` and surfaced in the
  annotation rail.
- Both routes accessible at `/sites/lake-arthur` and `/proposal/lake-arthur`
  on dev server with no console errors and no hydration warnings.
- Director walkthrough: visit both routes in a real browser, confirm the
  golden path (intro → scroll → tee time book → confirm → toggle to before
  → open scope drawer → reveal pricing → close).
- Spec doc + (subsequent) plan doc archived in `docs/superpowers/specs/`
  and `docs/superpowers/plans/`.

## Next Step

After this spec is approved by the user, the **writing-plans** skill takes
over to break the work into a sequenced implementation plan with concrete
subagent dispatch points, gated reviews, and verification commands.
