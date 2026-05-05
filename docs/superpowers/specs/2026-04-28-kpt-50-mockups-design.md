# 50-Mockup Concept Catalog — Design Spec

**Date:** 2026-04-28
**Project:** `kptdesigns`
**Author:** Claude (via brainstorming skill, with cbas as Director)

## Summary

Add 50 new, visually-distinct concept mockups to `kptdesigns` under `/mockup/<slug>`,
each a full marketing page (hero + 3-5 sections + footer). Pure front-end:
hover/focus states, basic CSS/Framer transitions, no backend, no real data.
Audience: 9 trades (Tree Service, Landscaping, Roofing, Paving, Plumbing,
Electricians, Carpenters, General Contractors, Handyman). Some concepts will be
trade-agnostic (any trade can pick them); others will be made-for-the-trade and
filtered by audience. Catalog page (`src/app/mockup/page.tsx`) updated to surface
all 50 alongside the existing 13.

## Why

End users will be given the ability to pick a concept for their site. Today's
catalog is 13 concepts grouped under 4 categories (Baseline, Cosmic/Futuristic,
Editorial/Print, Technical/Terminal). Coverage is thin — many trades have no
concept that feels made-for-them, and the visual range skews toward
infrastructure/cosmic/editorial. 50 new concepts widen the picker and give every
trade real options. Cost is bounded by token budget, not engineering scope, since
each mockup is pure UI.

## Constraints

- **Pure UI.** No `fetch`, no Clerk, no Supabase, no API routes inside mockup
  pages. No new top-level dependencies without explicit Director sign-off.
- **No edits to global files** (`src/app/layout.tsx`, `globals.css`) without
  explicit approval. Each concept is isolated to its own folder.
- **`PageApproach` wrapper is mandatory** on every new page — keeps the depth-
  entrance behavior consistent with the existing 4 cosmic mockups.
- **Slug numbering continues at v23+.** Existing slugs v1–v22 stay stable
  (v20-operator, v21-neural, v22-liquid all already shipped). New concepts land
  at v23–v72.
- **Accessibility floor:** every interactive element keyboard-reachable;
  `prefers-reduced-motion` honored; WCAG AA color contrast on all text.
- **Performance floor:** no concept ships if first paint is >1.5s on the dev
  server, or if scroll jank is visible on a mid-tier laptop.
- **Real copy.** Trade-flavored to the showcased trade. No lorem ipsum.
- **Reachable.** Every concept must include at least one interaction-meaningful
  hover or focus state — not just decoration.

## Architecture

### File layout (per concept)

```
src/app/mockup/<slug>/
├── page.tsx           ← server entry; wraps engine in <PageApproach>
├── _engine/<Name>.tsx ← client component; the page itself
└── _sections/         ← optional; section components if the concept has them
```

Inline `<style>` tags following the existing cosmic-pages convention are fine
and preferred — they isolate each mockup and make any individual one trivial to
delete or replace.

### Slug convention

`v<NN>-<short-slug>` where `NN` runs 23–72 (50 slots). Examples (illustrative,
the Concept Lead picks the actual names): `v23-naturalist`, `v24-blueprint`,
`v25-roadside-neon`, `v26-pulpit`, etc.

### Catalog page (`src/app/mockup/page.tsx`)

The existing `catalog: Category[]` array is appended in place. New category
buckets are added where concepts don't fit existing ones. Anticipated new
buckets (Concept Lead proposes; Director approves):

- **Tactile / Material** — texture-forward, paper, canvas, weathered finishes.
- **Naturalist / Organic** — botanical, ecological, field-journal, made for
  Tree Service / Landscaping.
- **Brutalist / Industrial** — concrete, exposed structure, made for Paving /
  GCs / Roofing.
- **Cinematic / Narrative** — storytelling structure, scroll-as-screenplay.
- **Playful / Toy** — high color, kinetic typography, made for Handyman /
  consumer-friendly trades.

Existing buckets stay; new concepts may also be filed into them.

### Concept matrix dimensions

Every concept declared with these fields, owned by Concept Lead:

- `slug`, `name`, `emoji`, one-line `descriptor`, `risk`, `appeal` (existing
  catalog fields, keep schema)
- `thesis` — the central design idea in one sentence
- `palette` — primary + accent + neutral, named colors with hex
- `type` — heading + body pairing
- `motion` — entry, scroll behavior, hover/focus posture
- `tradeFit` — `agnostic` or one of the 9 trade slugs
- `tradeShowcase` — which of the 9 trades the actual mockup uses for its copy
  and example imagery (used even when `tradeFit === 'agnostic'`)
- `category` — which catalog bucket it lives in

Concept Lead's job is to ensure 50 are *meaningfully* different across these
dimensions — not 30 variants of "minimalist modern."

## The Team

Six roles, all dispatched as specialized Claude subagents orchestrated by the
Director.

| Role | Type | Job |
|---|---|---|
| Concept Lead | general-purpose subagent | Owns the 50-row matrix; ensures distinctness, coverage, no clichés. |
| Trade Researcher | general-purpose subagent | Pulls real-world cues for the 9 trades so trade-specific concepts feel earned. |
| Design Director | the conversation (cbas + Claude) | Reviews matrix, approves builds, runs final walk. |
| Build Squad | ~10 parallel general-purpose subagents | Each takes ~5 concepts; ships full pages. Briefed on shared infra (`PageApproach`, catalog conventions). |
| QA / Verifier | general-purpose subagent | Opens each built page; checks against brief; files defects. |
| Critic | `superpowers:code-reviewer` subagent | Challenges concepts, flags accessibility/perf/copyright/cliché traps; recommends cuts. |

## Workflow — Five Gates

Each gate has a deliverable that the Director reviews before the next gate
opens.

### Gate 1 — Concept Matrix

**Output:** one document, ~50 rows, all matrix fields filled.
**Owner:** Concept Lead (with Trade Researcher input on trade-specific entries).
**Review:** Director reviews for distinctness, coverage across emotional
registers (loud / quiet / futuristic / nostalgic / technical / poetic),
guarantee that every trade has at least 3 made-for-it concepts. Killed concepts
are replaced and re-reviewed.
**User checkpoint:** matrix presented to user before any code written.

### Gate 2 — Brief Pack

**Output:** 50 one-page briefs, ~150 words each, expanding each matrix row into
hero composition, sections, motion/interaction notes, copy tone, key
differentiators.
**Owner:** Concept Lead.
**Review:** Director spot-audits.

### Gate 3 — Build

**Output:** 50 routes under `/mockup/<slug>` + updated catalog page.
**Owner:** Build Squad (10 subagents in parallel, ~5 concepts each).
**Review:** Director spot-checks during build, escalates blockers.

### Gate 4 — QA + Critique

**Output:** defect list, cull list, replacement list.
**Owner:** QA / Verifier + Critic.
**Review:** Director decides what gets a rebuild round and what gets cut. Cut
concepts go back to Gate 2 with a replacement; Build Squad rebuilds only the
cuts.

### Gate 5 — Director's Review

**Output:** scorecard from Director walking every page.
**Action:** Director hands the 50 to user only after sign-off.

## Quality Bar

Each page must, at minimum:

- Render the depth-entrance from `PageApproach` cleanly
- Hero + 3+ supporting sections + footer
- At least one interaction-meaningful hover/focus state
- Real trade-flavored copy (no lorem)
- Pass accessibility floor (WCAG AA, keyboard, reduced-motion)
- Pass performance floor (no first-paint over 1.5s on dev, no visible scroll
  jank)
- Feel *different* from every other concept in the catalog. The Critic owns the
  "looks like #14" call.

## Out of Scope (explicit)

- No backend wiring (auth, DB, payments). The mockups are visual only.
- No real images sourced from the wild — illustrations and SVGs from inside
  each engine are fine; stock photo URLs are not.
- No deep scroll-bound 3D engines (à la `v5-tunnel`) for every concept — the
  budget per page doesn't support that universally. Save 3D for the 4-6
  concepts where it's the central thesis.
- No mobile-specific layouts for first pass. Concepts should be responsive but
  the showcase is desktop. Mobile polish lives in a follow-up if/when concepts
  get picked.
- No replacement of existing 13 concepts. They stay as-is.

## Risks

- **Sameness across 50.** Mitigation: Concept Lead's matrix is reviewed for
  distinctness before any code; Critic's "looks like #N" call at Gate 4.
- **Trade-specific concepts feeling costume-y.** Mitigation: Trade Researcher
  feeds real-world cues; Critic flags concepts that read as Halloween costume
  instead of native trade fluency.
- **Build squad inconsistency.** Mitigation: every squad member gets the same
  brief format, same houserules, same `PageApproach` wrapper. QA + Director
  spot-check enforces consistency.
- **Token / time spend ballooning.** Mitigation: gate-by-gate review prevents
  full-build-then-throw-away. Budget capped per concept; Director pulls cord on
  bad-quality squad output rather than letting it proceed.
- **Accessibility regressions across 50 concepts.** Mitigation: floor specified
  in houserules; QA verifies each page meets it.

## Definition of Done

- 50 routes under `/mockup/v23-...` through `/mockup/v72-...` exist and render
- Catalog page surfaces all 50 with appropriate category bucketing
- Every page passes Gate 4 verification (defect-free against its brief, no
  Critic flags)
- Director has signed off in Gate 5 with a per-concept scorecard
- All 50 deployed to production via `vercel --prod`
- Spec doc + concept matrix doc + brief pack archived in
  `docs/superpowers/specs/`

## Next Step

After this spec is approved, the writing-plans skill takes over to break the
five gates into a sequenced implementation plan with concrete subagent dispatch
points.
