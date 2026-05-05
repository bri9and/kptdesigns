# 50-Mockup Critic Report — v23 through v72

**Date:** 2026-04-28
**Author:** Critic (subagent)
**Status:** Gate 4 deliverable. Director makes final call.

This report is uncharitable by design. Better to argue cuts and have the
Director overrule than to bless 50 by default. Final cut count recommended:
**6**. The catalog is unusually disciplined — Concept Lead and Trade Researcher
did real work — but six concepts add no structural option that the rest of the
50 don't already provide, or carry IP/cliché risk that reads as costume.

Sources read in order:
- `2026-04-28-kpt-50-mockups-design.md` (spec & quality bar)
- `2026-04-28-concept-matrix.md` (50 approved concepts)
- `2026-04-28-brief-pack.md` (50 briefs)
- `2026-04-28-trade-cues.md` (cliché traps)
- 50 engines under `/mockup/v23-*/_engine` through `/mockup/v72-*/_engine`

Structural-distinctness counts mean: do these two concepts answer different
questions for the user picking a site, or do they answer the same question with
different paint?

---

## 1. Sameness audit

For every concept I name two nearest neighbors and the visible difference. Pairs
where the difference is purely cosmetic are flagged with **(FLAG)**.

| slug | nearest neighbors | visible difference |
|---|---|---|
| v23-fieldnotes | v60-letterpress, v29-paper-mache | bound notebook vs. pressed sheet vs. layered torn collage — three different artifacts. OK. |
| v24-paint-chip | v49-channellock, v72-sticker-pack | fanned deck vs. pegboard wall vs. layered hard-hat stickers. Three different IAs. OK. |
| v25-roadside-neon | v41-windrow, v54-sound-stage | nighttime cinema vs. daytime sensory vs. cinematic-process. Different time-of-day and grammar. OK. |
| v26-pulpit | v60-letterpress, v70-rfp-binder | display Caslon scale vs. pressed-paper bite vs. bound-binder thoroughness. OK. |
| v27-rivetwork | v35-tarpaper, v38-anvil | cold-rolled welded plate vs. brutalist felt vs. hot-iron forge. OK. |
| v28-herbarium | v37-zonemap, v61-greenhouse | flat specimen vs. national hardiness map vs. glass dimensional structure. OK. |
| v29-paper-mache | v23-fieldnotes, v60-letterpress | torn collage depth vs. notebook stack vs. pressed-paper bite. OK. |
| v30-saw-line | v44-snap-line, v39-storypole | carpenter plywood + pencil vs. roofer tarpaper + chalk vs. vertical wood rail. OK. |
| v31-pipe-stack | v56-pipe-cam, v57-soldering | isometric DWV drawing vs. fish-eye camera POV vs. macro joint. OK. |
| v32-permit-board | v48-titleblock, v50-trader-tarp | civic placard vs. architectural meta-frame vs. temporary corrugated. OK. |
| v33-shock-line | v40-lightboard, v64-iso-icons | print typography vs. live schematic vs. ISO safety pictograms. OK. |
| v34-grid-north | v37-zonemap, v62-zoning-overlay | legal cadastral plat (landscaping) vs. USDA hardiness map (landscaping) vs. municipal GIS overlay (roofing). **(FLAG)** v34 vs. v37 are both maps for landscape design; the legal/ecological split is theoretical to a user picking a site. |
| v35-tarpaper | v44-snap-line, v71-zinc-roof | brutalist felt full-bleed vs. restrained snap-line geometry vs. luxury zinc. OK. |
| v36-tag-stamp | v45-canopy-lift, v67-knot-fluency | aluminum tag register vs. canopy parallax scenic vs. rigging system. OK. |
| v37-zonemap | v28-herbarium, v34-grid-north | full-bleed national gradient vs. flat specimen vs. legal plat. **(FLAG)** vs v34. |
| v38-anvil | v27-rivetwork, v60-letterpress | hot iron 3D peen vs. cold steel welded vs. paper bite. OK. |
| v39-storypole | v30-saw-line, v46-bench-grain | vertical burned numeral rail vs. horizontal chalk geometry vs. end-grain hero. OK. |
| v40-lightboard | v51-galaxy-brain, v33-shock-line | engineered schematic vs. dendrite/galaxy morphology vs. print typography. **(FLAG)** vs v51 — both lit network-of-nodes on dark, with hover-pulses along edges. Differentiator is "engineered vs biological" which only the brief makes clear. |
| v41-windrow | v25-roadside-neon, v52-mat-temperature | daytime SVG turbulence vs. nighttime neon vs. data-driven palette. OK. |
| v42-flightcase | v55-pegboard-stack, v49-channellock | anvil case interior (singular) vs. Packout exterior (modular) vs. pegboard (fixed). OK. |
| v43-stencil-yard | v50-trader-tarp, v66-paint-stripe | DOT highway typography vs. temporary coroplast vs. lot-stripe geometry. OK — three structurally different paving signage grammars. |
| v44-snap-line | v35-tarpaper, v30-saw-line | restrained roofer geometry vs. felt brutalist vs. carpenter plywood. OK. |
| v45-canopy-lift | v36-tag-stamp, v47-bucket-truck | scenic parallax vs. ledger artifact vs. cab POV. OK. |
| v46-bench-grain | v39-storypole, v60-letterpress | end-grain substrate vs. burned-numeral rail vs. paper bite. OK. |
| v47-bucket-truck | v45-canopy-lift, v54-sound-stage | continuous POV-from-cab vs. ground-up canopy vs. scene-by-scene cinema. OK. |
| v48-titleblock | v32-permit-board, v70-rfp-binder | architectural meta-frame vs. civic placard vs. bound binder. OK. |
| v49-channellock | v55-pegboard-stack, v68-honey-do | turquoise pegboard fixed shop vs. modular Packout vs. ruled-list. OK. |
| v50-trader-tarp | v43-stencil-yard, v32-permit-board | temporary corrugated vs. DOT highway vs. civic placard. OK. |
| v51-galaxy-brain | v21-neural (existing), v40-lightboard, v2-cosmos (existing) | dendrite/galaxy hybrid vs. neural network meshwork vs. lit schematic vs. plasma starfield. **(FLAG)** Differentiator from v21-neural is the "morphological pun" framing — visually it's the same dark-bg + node-and-edge animation. |
| v52-mat-temperature | v41-windrow, v66-paint-stripe | data-driven gradient vs. visual heat-haze vs. lot-stripe geometry. OK. |
| v53-color-block | v59-isotype, v26-pulpit | Swiss block grid vs. pictographic stats vs. display-Caslon scale. OK. |
| v54-sound-stage | v25-roadside-neon, v58-group-text | scene-by-scene cinema vs. cinema-as-place vs. live SMS thread. OK in form. (See §6 — concept thesis itself is flagged.) |
| v55-pegboard-stack | v49-channellock, v42-flightcase | modular Packout vs. fixed pegboard vs. anvil case. OK. |
| v56-pipe-cam | v31-pipe-stack, v57-soldering | fish-eye camera POV vs. isometric drawing vs. macro joint. OK. |
| v57-soldering | v31-pipe-stack, v56-pipe-cam | macro craft detail vs. isometric drawing vs. camera POV. OK — three honest plumbing facets. |
| v58-group-text | v54-sound-stage, v13-conversation (existing) | multi-party SMS vs. directed cinema vs. AI dialogue. OK in form. (See §5 — IP risk separate.) |
| v59-isotype | v53-color-block, v3-editorial (existing) | pictographic stats vs. Swiss block grid vs. offset magazine. OK. |
| v60-letterpress | v23-fieldnotes, v3-editorial (existing) | press impression vs. notebook informal vs. offset magazine. OK. |
| v61-greenhouse | v28-herbarium, v37-zonemap | living dimensional structure vs. flat specimen vs. national map. OK. |
| v62-zoning-overlay | v34-grid-north, v37-zonemap | municipal GIS roofing vs. legal plat landscape vs. hardiness map landscape. OK — different trade and different layer. |
| v63-flipbook | v23-fieldnotes, v60-letterpress | engineering-pad page-flip vs. bound notebook vs. pressed sheet. OK. |
| v64-iso-icons | v33-shock-line, v43-stencil-yard | ISO industrial safety vs. NEC + heat-shrink vs. DOT highway. OK. |
| v65-shadowbox | v28-herbarium, v60-letterpress | dimensional shadowbox vs. flat specimen vs. paper bite. OK. |
| v66-paint-stripe | v43-stencil-yard, v50-trader-tarp | lot-stripe geometry vs. DOT typography vs. temporary corrugated. OK. |
| v67-knot-fluency | v36-tag-stamp, v45-canopy-lift | rigging system vs. tag-and-register vs. canopy parallax. OK. |
| v68-honey-do | v49-channellock, v55-pegboard-stack | ruled-list task-led vs. pegboard tool-led vs. modular Packout. OK. |
| v69-pellucid | v22-liquid (existing), v40-lightboard | structured glass plates with prism vs. flowing liquid vs. lit schematic. OK structurally — but see §5 IP risk note. |
| v70-rfp-binder | v48-titleblock, v59-isotype | bound multi-doc binder vs. single sheet meta-frame vs. pictographic stats. OK. |
| v71-zinc-roof | v35-tarpaper, v27-rivetwork | luxury vertical metal seam vs. low-end felt vs. cold steel plate. OK. |
| v72-sticker-pack | v49-channellock, v64-iso-icons | chaotic lived sticker layer vs. ordered pegboard vs. regulated ISO. OK. |

### Top 3 sameness flags (with KEEP/CUT recommendations)

1. **v34-grid-north vs. v37-zonemap** — Both are full-bleed map grammars assigned to landscaping. The brief argues v34 = legal cadastral, v37 = ecological. To a user picking a site, both feel like "the map landscape one." The trade-cues never mention surveying as a landscaper's daily artifact (Hardiness Zone, however, IS named explicitly). **KEEP v37, CUT v34.** Reason: hardiness zone is in the trade cues; survey plat is theoretical for landscape design (it's a surveyor's artifact).

2. **v51-galaxy-brain vs. v40-lightboard + v21-neural (existing)** — All three are "lit network-of-nodes on dark background, hover pulses along connections." The Concept Lead's own thesis is "morphological pun" — i.e., the differentiator is conceptual, not visible. The Cosmic-Futuristic bucket is already crowded with v2-cosmos / v21-neural / v22-liquid. **KEEP v40 + v21 (existing), CUT v51.** Reason: nothing is visually accomplished that v40 or v21 don't already do; the "dendrites are like galaxies" pun is a thesis without page-level legs.

3. **v50-trader-tarp vs. v43-stencil-yard** — Both lean on DOT/regulated-signage typography for paving. v43 is rich (whole spec book, fleet, Z535 cards); v50's entire visual rests on a single yellow corrugated panel and offers little structural variety beyond the headline. Concept Lead flagged v50 themselves as the most fragile. **KEEP v43, CUT v50.** Reason: v50 is one corrugated panel stretched across a full page. v66-paint-stripe + v43 already cover paving signage from two sides (geometry + typography); v50 is a third bite at the same apple with the least bite force.

---

## 2. Cliché audit

I re-read trade-cues "clichés to avoid" before judging. The Concept Lead and
Build Squad showed real discipline here — almost every concept that *could*
have leaned on a costume-trap actively steers around it. Findings:

- **v33-shock-line (electricians)** — Concept Lead's own pre-flag. Engine
  delivered a Brady-label + NEC-codebook system with Klein orange as the only
  accent; *no lightning bolts*, *no sparks*, *no "lights on" jokes*. The
  copy ("AFCI on every bedroom branch", "pull box you don't have to open
  twice") is practitioner-fluent. **No cliché trap landed. KEEP.**

- **v68-honey-do (handyman)** — Concept Lead's own pre-flag. Engine delivered
  a utilitarian ruled list anchored on property-manager turnover work (the
  trade-cues "moat") with no thumbs-up, no smiley mascot, no "no job too
  small," no Comic-Sans-adjacent face. Pricing is flat-rate with the actual
  jobs handymen do. **No trap landed. KEEP.**

- **v25-roadside-neon (paving)** — Risk: "neon nostalgia" reads as Las Vegas
  costume, not paving. Engine offsets this by anchoring the copy in
  practitioner truths (305°F mat, NOAA hourly dewpoint, LeeBoy 8500). The
  neon is a vehicle for paving copy, not a costume. **No trap. KEEP** — but
  watch the copy stays disciplined; if a future copy revision drifts to "we
  pave the way," the costume will land.

- **v47-bucket-truck (tree-service)** — Risk: cab-eye-view + bar-oil amber
  reads like "lumberjack mascot" if posed loosely. Engine grounds it in
  ANSI Z133 work plans, climber gear specifics, chip-truck orange (real
  brand vocabulary, not cartoon orange). **No trap. KEEP.**

- **v72-sticker-pack (electricians)** — Risk: "IBEW Local 26 since '99" plus
  American-flag sticker reads as flag-waving costume if drawn cartoonish.
  Engine doesn't show actual IBEW logos as imagery (it shows the typography
  treatment), so trade-dress risk is muted. **No trap. KEEP** — but
  re-examine if any sticker SVG ever comes in showing real third-party
  marks (Klein/Milwaukee/IBEW logos at scale).

- **v50-trader-tarp (paving)** — Concept Lead's own pre-flag. Already
  recommended for cut (§1) on sameness grounds; the corrugated yellow
  ALSO reads on the "FRESH OIL — DO NOT DRIVE" placard which is
  copy-borrowed not redesigned. Borderline costume but the bigger problem
  is sameness, not cliché. **CUT (per §1).**

### Top 3 cliché-trap concepts (with disposition)

The disciplined news first: I am NOT recommending any concept be cut on
cliché-trap grounds. Every Concept Lead pre-flag was honored by the build.
The three closest-to-the-line concepts are:

1. **v25-roadside-neon** — closest to "Vegas nostalgia." Saved by paving copy
   discipline. **REWRITE NOTE for Director:** require any future copy edit
   stays in practitioner register (no "we pave the way," no "smooth as glass").

2. **v72-sticker-pack** — closest to flag-waving + recognizable trade marks.
   Saved by typography-not-logo treatment. **REWRITE NOTE for Director:** if
   any sticker SVG is ever swapped to render an actual IBEW / Klein /
   Milwaukee mark, that becomes a trade-dress problem. Keep stickers
   abstract.

3. **v68-honey-do** — closest to "friendly handyman." Saved by ruled-list
   utilitarianism + property-manager moat. **NO CHANGE NEEDED.**

---

## 3. Accessibility audit

Per-engine signals collected:

- `<button>` count vs. `type="button"` count
- `@media (prefers-reduced-motion: reduce)` block count
- `:focus` / `:focus-visible` rule count
- `useEffect` reduced-motion gate (matchMedia) presence

### Critical — `<button>` without `type="button"` defaults to `submit`

The matrix is below. Engines with `<button>` count > 0 AND `type="button"`
count = 0 fail this check.

| slug | <button> count | typed | verdict |
|---|---|---|---|
| v23-fieldnotes | 2 | 0 | **PATCH** — add `type="button"` |
| v24-paint-chip | 2 | 0 | **PATCH** |
| v38-anvil | 4 | 0 | **PATCH** |
| v40-lightboard | 4 | 0 | **PATCH** |
| v41-windrow | 4 | 0 | **PATCH** |
| v42-flightcase | 6 | 0 | **PATCH** |
| v54-sound-stage | 1 | 0 | **PATCH** |
| v55-pegboard-stack | 1 | 0 | **PATCH** |
| v56-pipe-cam | 1 | 0 | **PATCH** |
| v63-flipbook | 2 | 0 | **PATCH** |
| v64-iso-icons | 1 | 0 | **PATCH** |
| v66-paint-stripe | 1 | 0 | **PATCH** |
| v67-knot-fluency | 1 | 0 | **PATCH** |

13 engines need 1-line type-attribute additions. None are inside `<form>`
elements (mockups have no real forms), so the practical impact is zero, but
the attribute should be added regardless. **All PATCH** (Director can do
inline).

### Reduced-motion handling

49/50 engines have at least one `@media (prefers-reduced-motion: reduce)`
block OR a JS matchMedia gate. **v59-isotype** has zero CSS @media blocks;
it does gate via JS (`useEffect` reading `matchMedia`) so the count-up
animation is skipped. **Acceptable.**

Engines with only one `@media (prefers-reduced-motion)` block (count = 1)
are mostly the lower-motion concepts (the block gates the one continuous
animation they have). I spot-checked v28, v29, v30, v44, v45, v46 — each
correctly disables the animations they actually run. **No PATCH needed.**

### Keyboard focus states

49/50 engines have `:focus` or `:focus-visible` rules; v25 has 11, v72 has
18 — interactive concepts have proportionally more. **No engine ships with
zero focus styles.** Pass.

### Color contrast spot-checks

I spot-checked several palettes the Concept Matrix calls out:

- v23-fieldnotes: body `#1A1A14` on `#C7B58B` ≈ 13:1 (pass). Graphite
  `#525258` on kraft `#C7B58B` ≈ 4.6:1 (pass body, marginal for ≥18px).
- v33-shock-line: NEC body Charter on Brady white `#F4F4EE` ≈ 14:1 (pass).
- v37-zonemap: zone band gradient. Body type sits inside Zone 6b cyan
  `#5BB6D9` at large size — for any small body type sat directly over a
  saturated band, Director should re-check live. **PATCH spot-check
  recommended on v37.**
- v25-roadside-neon: body on dusk asphalt `#15161B` is bright text — pass.
- v47-bucket-truck: body on Dash Vinyl `#1F1B17` — pass.
- v51-galaxy-brain: body Söhne Buch on cosmic ink `#06070C` — pass for
  white text; if any gray subtext drops below #888, re-check. **PATCH
  spot-check.**
- v52-mat-temperature: gradient is data-driven, so contrast varies through
  the day. Director should verify at slag-cold (dawn) and ember-noon
  extremes. **PATCH spot-check.**

### Accessibility verdict

No REBUILD required for accessibility. ~13 engines need 1-line
`type="button"` patches; 3 engines need contrast spot-checks under live
data conditions. All PATCH-class.

---

## 4. Performance audit

### `will-change` on page-level elements

- **v45-canopy-lift** has 2 `will-change: transform` declarations on the
  parallax canopy layers. No removal logic — they sit on screen the whole
  time. Borderline acceptable since the layers DO transform constantly on
  scroll. **PATCH:** keep on the parallax layers only; verify no removal
  needed because they animate continuously.
- **v47-bucket-truck** has 4 `will-change: transform` declarations. Plus
  it calls `setScroll(window.scrollY)` on every scroll event with **no rAF
  throttle**, meaning a full React re-render of the engine on every scroll
  tick. On a low-spec device this will cause jank as the boom rises.
  **PATCH:** wrap the scroll handler in `requestAnimationFrame` and
  consider using a CSS variable updated via `ref.style.setProperty`
  instead of state.

### Layout-thrashing animation properties

`grep` for `animation:.*(top|left|width|height)` and
`transition:.*(top|left|width|height)` returned no positive matches across
all 50 engines. Concepts use `transform` correctly. **Pass.**

### Oversized inline assets

The largest engines by line count:
- v68-honey-do: 1362
- v72-sticker-pack: 1358
- v70-rfp-binder: 1342
- v71-zinc-roof: 1242 (with 50 inline SVG path/circle/rect/line/polygon —
  most of any engine, by far)
- v25-roadside-neon: 1129
- v69-pellucid: 1087
- v27-rivetwork: 1084
- v24-paint-chip: 1029

v71-zinc-roof's 50 inline SVG primitives is plausibly the seam-and-rivet
rhythm being drawn out — likely fine, but worth a 1.5s first-paint check
on the dev server.

**v68-honey-do at 1362 lines** is the heaviest engine in the catalog. Worth
spot-checking that the receipts list is not rendering all photos eagerly.

### Keyframes count

No engine has more than 4 `@keyframes` declarations. Below the 200-line
keyframe-CSS budget specified in the spec.

### Performance verdict

- **v47-bucket-truck — PATCH** (rAF throttle + remove will-change OR
  retain will-change but verify with profiler).
- **v45-canopy-lift — PATCH** (verify will-change is needed; the layers
  do constantly transform).
- **v71-zinc-roof — VERIFY** first-paint <1.5s (no PATCH unless it
  fails).
- **v68-honey-do — VERIFY** receipt photos are not eagerly rendered (no
  PATCH unless it fails).

No performance REBUILDs.

---

## 5. Copyright / licensing audit

### Critical — v58-group-text

Engine renders the iMessage interface frame-for-frame:

- iOS-style status bar with hardcoded "9:41" timestamp (Apple's marketing
  default time for iPhone shots — explicitly trade-dress).
- "iMessage" string in the thread metadata (Apple proprietary product
  name).
- SF Pro Display / SF Pro Text typography (Apple-licensed; using on web
  outside Apple platforms is gray-area).
- Bubble shape, color (`#0A84FF` Apple system blue, `#E5E5EA` system
  gray), tail position, "typing…" indicator.

This is the single most legally exposed concept in the catalog. The brief
notes "Distinct from v13-conversation (AI dialogue) — this is multi-party
crew SMS" — that's an *internal-catalog* differentiator, not a defense
against Apple's trade-dress claims. Apple is litigious; KPT does not need
this risk in a marketing site that any prospect or analyst will browse.

**REWRITE recommendation:** keep the multi-party group-text concept (it
honors the surprising-but-true cue beautifully); rebuild the chrome as a
generic SMS-thread aesthetic — different system font (Inter or Söhne),
different blue (not `#0A84FF`), no "9:41," no "iMessage" string, bubble
tail repositioned, no SF Pro. Or pivot to Android Messages aesthetic
(less litigated, more freedom). The CONCEPT survives; the SKIN must change.

### High — v69-pellucid

The brief uses "Apple-VisionOS-grade glass" as the explicit benchmark.
The engine does NOT use the strings "VisionOS" / "Apple" anywhere. SF Pro
typography is used. The frosted-glass/prism aesthetic is a category Apple
heavily occupies but doesn't own (Microsoft Acrylic, Linux compositors,
many web frameworks have similar). **Lower risk than v58.**

**REWRITE recommendation (LOW priority):** swap SF Pro for Inter/Söhne to
avoid the Apple-typography signal entirely. Aesthetic is broad enough to
not be trade-dress; typography is the only direct Apple signal. PATCH.

### Other concepts using SF Pro

The brief calls for SF Pro on v58-group-text and v69-pellucid. Anywhere
else the catalog uses SF Pro should also be patched out — but spot
search returned only those two. **PATCH-class.**

### Highway Gothic / FHWA Series E (v43, v50, v66)

Highway Gothic is published by the US DOT FHWA; its specifications are
public-domain (US gov works). No license issue. **Pass.**

### NEC code-book typography (v33)

NEC is published by NFPA; "Lippincott serif" is a generic serif descriptor,
and the engine uses Charter ITC (commercially licensed). **Pass.**

### IBM Plex / album-cover riffs / Disney imagery

I scanned for these. None present. **Pass.**

### Brand/manufacturer name-drops in copy

The engines reference real brand names in copy: GAF, OC (Owens Corning),
CertainTeed (v35, v44); Klein, Milwaukee, Channellock, Stihl (v25, v33,
v47, v49, v55, v72); Square D, Eaton, Lutron, Hampton Bay, GE Supreme
(v33, v68, v69); Procore, Buildertrend, Toughbook (briefs, possibly
engines); Hampton Bay, D&D Kwik-Fit, Kwikset SmartKey (v68); Milwaukee
Packout, Dewalt ToughSystem (v55).

This is **nominative use** — referring to a product by its name in
factually-accurate context — and is generally fair use in marketing copy.
The risk would be if any engine renders a logo or trade-dress (a Klein
yellow handle, a Milwaukee red box) photographically or in a way that
could be mistaken for endorsement. The current implementations keep these
references in TEXT, which is fine. **Pass — but DON'T add brand logos
later.**

### Copyright verdict

- **v58-group-text — REWRITE** (skin only; concept survives). High priority.
- **v69-pellucid — PATCH** (swap SF Pro for Inter/Söhne).
- All other 48 engines — Pass.

---

## 6. Concept weakness audit

Concepts whose thesis can't carry a full marketing page.

### v51-galaxy-brain — CUT

Thesis: "dendrites and galaxy filaments share morphology." This is a
poster, not a marketing page. Below the hero, the page is:
- The Network (same dendrite, again, with hover-pulses)
- Critical Path (same dendrite, lit in sequence)
- The Subs Constellation (same dendrite, different label)
- Footer

Three sections of the same visual idea with different copy. No
secondary visual register, no contrast section, no break. AND the
Cosmic-Futuristic bucket is already crowded with v2-cosmos, v21-neural,
v22-liquid (existing) and now v40-lightboard, v69-pellucid — six dark
glowy concepts in a 63-concept catalog (50 new + 13 existing). **CUT.**

### v54-sound-stage — CUT

The trade-fit reasoning ("GCs run jobs as productions — call sheets,
daily logs, schedule pressure") is a metaphor without a practitioner
basis. GCs do not think of themselves as movie producers; the trade-cues
for general-contractors mention permit placards, AIA contract type, group
text, dashboard pile, blueprint roll, mud-color boot-scrape — none of
which are cinematic. The concept is "vibe" without an organizing principle
that the trade actually uses. v32-permit-board, v48-titleblock, v51,
v58-group-text, v59-isotype, v70-rfp-binder all give GCs five other
made-for-it concepts; cutting one leaves five. **CUT.**

### v34-grid-north — CUT

Already flagged in §1. Survey-plat composition assigned to landscaping
(then re-showcased to landscaping) but landscapers don't carry survey
plats — surveyors do. The trade-cues for landscaping name Hardiness Zone
maps explicitly; survey plats are not in the cue list. v37 and v62
already cover map grammars for landscape and roofing. **CUT.**

### v50-trader-tarp — CUT

Already flagged in §1. The "FRESH OIL — DO NOT DRIVE" placard is the
entire visual; below the hero, every section is "another smaller
corrugated sign." One panel stretched over a marketing page. v43 and v66
cover paving signage from regulated and geometric directions; v50 adds a
thin third bite. **CUT.**

### v38-anvil — KEEP, watch the carpenters bucket

Carpenters have v29-paper-mache (showcase), v30-saw-line, v38-anvil,
v39-storypole, v46-bench-grain, v60-letterpress (showcase),
v63-flipbook (showcase), v65-shadowbox (showcase). That's 8 concepts
showcasing carpenters — heavy concentration. None overlap structurally
(notebook/snap-line/forge/storypole/end-grain/letterpress/flipbook/
shadowbox is real range). But the Director should be aware: cutting
heaviness lives here, not in the trade-specific concepts.

### Concept weakness verdict

CUTS: **v51, v54, v34, v50** (4 concepts).
Plus from §1 sameness: v34 was already counted; v50 was already counted.
Plus from §5 IP: v58 is REWRITE, not CUT.

---

## 7. Final cut list

| slug | KEEP | CUT | REASON (one line) |
|---|:---:|:---:|---|
| v23-fieldnotes | ✓ |   | Notebook-led artifact, cleanly different from v29 + v60. |
| v24-paint-chip | ✓ |   | Fanned paint deck IA is genuinely native to the trade. |
| v25-roadside-neon | ✓ |   | Costume-trap avoided by paving-true copy; cinematic without nostalgia. |
| v26-pulpit | ✓ |   | Display Caslon at 200pt is a distinct register from press/binder neighbors. |
| v27-rivetwork | ✓ |   | Cold-rolled welded plate is different from felt and forge. |
| v28-herbarium | ✓ |   | Specimen-led artifact for landscape, scholarly rather than scenic. |
| v29-paper-mache | ✓ |   | Layered torn collage with depth, distinct from notebook + press. |
| v30-saw-line | ✓ |   | Carpenter chalk + plywood + pencil ticks, restrained and trade-true. |
| v31-pipe-stack | ✓ |   | Isometric DWV is plumber's mental model, different from camera + macro. |
| v32-permit-board | ✓ |   | Coroplast jobsite sign is the most direct GC artifact in the catalog. |
| v33-shock-line | ✓ |   | NEC + heat-shrink discipline, no cliché lightning bolt; trade-true. |
| v34-grid-north |   | ✗ | Survey plat is not in landscape trade-cues; v37 covers map-grammar already. |
| v35-tarpaper | ✓ |   | Felt-and-chalk brutalist roof IS the dry-in moment, trade-true. |
| v36-tag-stamp | ✓ |   | Aluminum tree-tag register is native to arboriculture, no evergreen costume. |
| v37-zonemap | ✓ |   | USDA Hardiness Zone is in the trade-cues; honest borrowing. |
| v38-anvil | ✓ |   | Hot-iron / hand-strike, distinct from cold-rolled rivetwork. |
| v39-storypole | ✓ |   | Vertical 1x4 with burned numerals is a real cabinet-shop artifact. |
| v40-lightboard | ✓ |   | Live working schematic, different from print-typography v33. |
| v41-windrow | ✓ |   | SVG heat-haze is daytime sensory, different from neon and data-gradient. |
| v42-flightcase | ✓ |   | Anvil-case interior with foam cutouts, different from Packout exterior. |
| v43-stencil-yard | ✓ |   | DOT highway typography, regulated/federal grammar — trade-true paving. |
| v44-snap-line | ✓ |   | Restrained chalk-snap geometry, different from felt brutalism. |
| v45-canopy-lift | ✓ |   | Scenic parallax for tree-service, distinct from tag/rigging/cab POV. |
| v46-bench-grain | ✓ |   | End-grain hero with growth-ring layout grid, native to fine carpentry. |
| v47-bucket-truck | ✓ |   | Cab POV with weight, distinct continuous-POV from scene-cinema. |
| v48-titleblock | ✓ |   | Architectural meta-frame is the most-read object in a GC's visual life. |
| v49-channellock | ✓ |   | Pegboard-on-wall fixed shop, distinct from Packout-stack mobile rig. |
| v50-trader-tarp |   | ✗ | One corrugated panel stretched to a page; v43 + v66 cover paving signage. |
| v51-galaxy-brain |   | ✗ | Morphological pun thesis; collides with v21-neural + v40-lightboard. |
| v52-mat-temperature | ✓ |   | Data-driven gradient tied to NOAA is the strongest paving thesis. |
| v53-color-block | ✓ |   | Swiss restraint, distinct register from Caslon-pulpit and pictogram. |
| v54-sound-stage |   | ✗ | "GCs as movie producers" is metaphor without a practitioner basis. |
| v55-pegboard-stack | ✓ |   | Modular consumer Packout, different from anvil + pegboard. |
| v56-pipe-cam | ✓ |   | Sewer-cam POV is the modern service plumber's hero move, trade-true. |
| v57-soldering | ✓ |   | Macro joint at 4× is craft pride visualized, distinct from drawing/POV. |
| v58-group-text | ✓ |   | KEEP CONCEPT (multi-party SMS thread is brilliant trade fit), but **REWRITE chrome — drop iMessage trade dress, drop "9:41," drop SF Pro.** |
| v59-isotype | ✓ |   | Otto Neurath ISOTYPE is editorial-aesthetic, distinct from block-grid. |
| v60-letterpress | ✓ |   | Industrial-craft printing impression, sibling craft to fine carpentry. |
| v61-greenhouse | ✓ |   | Living dimensional structure with mullion grid, distinct from herbarium. |
| v62-zoning-overlay | ✓ |   | Municipal GIS for roofing — parapet/setback constraints are honest. |
| v63-flipbook | ✓ |   | Engineering-pad page-flip is playful counterpoint to formal letterpress. |
| v64-iso-icons | ✓ |   | ISO-7010 industrial safety, distinct from NEC + DOT signage. |
| v65-shadowbox | ✓ |   | Dimensional museum display, distinct from flat herbarium specimen. |
| v66-paint-stripe | ✓ |   | Lot-stripe geometry with ADA blue, distinct from highway typography. |
| v67-knot-fluency | ✓ |   | Friction-hitch / rigging system, distinct from tag and canopy. |
| v68-honey-do | ✓ |   | Utilitarian ruled list anchored on PM-turnover moat, no thumbs-up. |
| v69-pellucid | ✓ |   | Structured glass plates with prism, distinct from flowing v22-liquid. PATCH SF Pro out. |
| v70-rfp-binder | ✓ |   | Bound multi-document binder, distinct from single-sheet meta-frame. |
| v71-zinc-roof | ✓ |   | Luxury vertical-seam metal with patina, distinct from felt + plate. |
| v72-sticker-pack | ✓ |   | Chaotic layered sticker grammar, distinct from ordered pegboard. |

**KEEP: 46 — CUT: 4 — REWRITE chrome (concept survives): 1 (v58)**

---

## Disposition summary

The catalog is unusually disciplined — Concept Lead and Trade Researcher set
a high bar and the Build Squad mostly hit it. Four cuts (v34, v50, v51, v54)
plus one rewrite (v58 chrome) is on the lighter end of "healthy first pass"
(the spec anticipated 3-8 cuts).

If the Director wants a tighter cut list (3 instead of 4), drop v50 or v54
and keep v34 — but I'd argue v34 is the easiest defense to drop because
landscaping already has v37 + v28 + v45 + v61 + v67 as made-for-it concepts.

If the Director wants a heavier cut (5-6 instead of 4), candidates are:
- v54-sound-stage (already cut)
- v51-galaxy-brain (already cut)
- v50-trader-tarp (already cut)
- v34-grid-north (already cut)
- v45-canopy-lift OR v47-bucket-truck — pick one (tree-service has v36 +
  v45 + v47 + v67, four concepts, when the floor is three)
- v55-pegboard-stack OR v49-channellock — pick one (handyman has v24 +
  v49 + v55 + v68, four concepts, when the floor is three)

The Director makes the final call. Critic recommends 4 cuts + 1 rewrite.

End of report.
