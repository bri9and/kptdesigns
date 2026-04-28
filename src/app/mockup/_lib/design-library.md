# Design Library — V5 through V20

Each entry below is the canonical brief for one mockup direction. Section-builder agents MUST read the relevant entry and stay strictly inside its palette / typography / motion / anti-patterns. The "Brand DNA" preamble applies to all 16.

## Brand DNA (applies to every design)

KPT Designs is a vertically integrated full-stack web partner: **registrar + host + designer + builder**, plus **inbound AI phone agents through sister company KPT Agents**. Tagline: "One process. One bill. One team. Owned outright. Est. 2004."

Section copy may reference any of these where natural — but do not stuff. The Hero and Stack sections are the most natural places to mention the four-in-one offering. Portfolio shows breadth across industries (use `@/lib/portfolio` data). CTA primary always links to `/start`, secondary to `/pricing`.

---

## V5 — Tunnel (scroll-IN)

**Concept:** Camera flies forward through a 3D tunnel. Each section is a checkpoint inside the tunnel. Walls show ambient texture (grid, code, stars).

**Palette:** Void `#000812` · cyan `#00E5FF` · electric blue `#0066FF` · soft white `#E8F1FF` · amber alert `#FFB000` · magenta accent `#FF00AA`
**Typography:** Inter (display, var weight 200/400/700) · JetBrains Mono (HUD chrome)
**Motion:** Continuous forward camera advance bound to scroll. Tunnel walls have subtle grid-line texture that pulses + drifts. R3F + ScrollControls. cubic-bezier(0.16, 1, 0.3, 1) at 1.4-2.4s for any non-scroll motion.
**Anti-patterns:** No traditional vertical sections. No shadows on cards. No earthy/warm palette. No static layout — the tunnel must feel alive.

**Engine note:** A `_engine/TunnelEngine.tsx` owns the R3F Canvas + ScrollControls + camera advancement. Checkpoint section files are 2D content blocks rendered as `<Html>` overlays inside the R3F scene OR positioned absolutely over the canvas at scroll-bound checkpoints. Pick what works.

---

## V6 — Strata (scroll-IN)

**Concept:** Sections are 2D planes stacked at different Z depths. Scrolling advances camera forward; planes pass through frame and behind viewer.

**Palette:** Off-black `#0B0B0F` · paper `#F4F1EB` · molten orange `#FF5E1A` · soft sage `#7B8E6F` · ink `#1A1A22`
**Typography:** Migra (substitute: Fraunces ultra-bold) for hero + GT America Mono (substitute: JetBrains Mono) for chrome. Inter for body.
**Motion:** Each plane fades in as it approaches camera, fades out as it passes. Z-translate bound to scroll progress. Subtle parallax on text within each plane. Sections feel like flipping through transparency slides.
**Anti-patterns:** No 3D scenes — pure CSS Z-translation + opacity. No conventional vertical layout. No bouncy springs.

**Engine note:** `_engine/StrataEngine.tsx` owns scroll progress + Z translation. Each section is a fixed-position pane that slides through Z based on scroll.

---

## V7 — Recursive Zoom (scroll-IN)

**Concept:** Each section is hidden as a detail INSIDE the previous one. Powers-of-Ten pattern. Hero KPT logo zooms in to reveal philosophy section, which zooms in to reveal stack, etc.

**Palette:** Off-white `#FCFCFA` · ink `#0A0A0A` · electric red `#FF1E1E` · accent gold `#FFC700` · cool grey `#9A9A9A`
**Typography:** Söhne (substitute: Inter at tighter tracking) for everything. Mono for callouts.
**Motion:** Scale-and-translate transforms bound to scroll. Section N+1 starts at scale 0.001, finishes at scale 1, while Section N scales from 1 to 1000 and fades. Continuous. 60fps target.
**Anti-patterns:** No traditional reveal. Every transition is the recursive zoom. No hover states with scale conflicts.

**Engine note:** `_engine/RecursiveEngine.tsx` owns scroll progress + per-section scale calc. Each section starts as a tiny detail-target inside the previous, expands to fill viewport.

---

## V8 — Codex

**Concept:** Illuminated medieval manuscript. Drop caps, marginalia, sigils, gold-leaf accents on aged vellum. Each section is a "folio."

**Palette:** Aged vellum `#F2E8D5` · ink black `#1B1410` · vermillion `#C72A1F` · ultramarine `#2845A8` · gold leaf `#D4A04A` · mulberry `#5C2D5E`
**Typography:** UnifrakturCook (or Goudy Bookletter 1911) for chapter heads · Crimson Pro / EB Garamond for body · narrow script for marginalia
**Motion:** None on type — it's "set" on the page. Subtle ink-bleed reveal on hover only. No scroll parallax.
**Anti-patterns:** No emojis. No modern UI tropes. No SaaS card grids. Drop caps everywhere.

---

## V9 — Ticker

**Concept:** Bloomberg / financial terminal. Live-updating stat tickers, market-depth charts, fixed status bar. Heavy on data viz.

**Palette:** Pitch black `#000` · phosphor green `#00FF41` · amber `#FFA500` · alert red `#FF3030` · grid grey `#222` · data white `#E8E8E8`
**Typography:** IBM Plex Mono (everything). 12-14px body, 60-90px hero numbers.
**Motion:** Tickers scroll constantly horizontally. Numbers flip. Charts redraw. Cursor blinks. Constant low-grade activity.
**Anti-patterns:** No earthy palette. No serif anywhere. No empty whitespace — info density is the look.

---

## V10 — Atelier

**Concept:** Couture / fashion house lookbook. Lookbook layout, model-shoot photography style for portfolio, hand-stitched detail.

**Palette:** Champagne pink `#F4E4DC` · ink `#1A1612` · gold foil `#C9A861` · oxblood `#5E1A1A` · cream `#F8F2EA` · charcoal `#3A3530`
**Typography:** Saol Display (sub: Playfair Display) ultra-thin · Helvetica Now (sub: Inter) all-caps wide-tracking labels
**Motion:** Slow elegant fades. Image hover: subtle scale 1.02 over 1.2s. No bouncy motion.
**Anti-patterns:** No tech aesthetic. No mono. No grid systems too rigid — couture is asymmetric.

---

## V11 — Architectural

**Concept:** Architectural blueprint and elevation drawings. Black background, white technical line drawings, dimension callouts, isometric portfolio renders.

**Palette:** Blueprint blue-black `#0E1E2E` · drafting white `#E8EAEC` · cyan dim `#3D8DBF` · red detail `#D03030` · paper grain `#F5F2E8`
**Typography:** Roboto Mono for callouts · Roboto for body. ALL CAPS labels, technical-drawing tracking.
**Motion:** Dimension lines draw on scroll. Hover on plate reveals dimension overlays. Slow technical reveal.
**Anti-patterns:** No filled shapes. Lines only. No warm/earthy.

---

## V12 — Specimen

**Concept:** Type-foundry specimen book. Pure typography. KPT IS the typeface being shown.

**Palette:** Specimen white `#FAFAFA` · ink `#0A0A0A` · single accent (pick one): malted red `#7A2D26`
**Typography:** Fraunces (variable, opsz 9-144) used at every conceivable size from 8px to 720px. JetBrains Mono for technical labels.
**Motion:** None except subtle reveal of letterforms on scroll.
**Anti-patterns:** No icons. No images (except portfolio plates, treated as type specimens). No color beyond the single accent.

---

## V13 — Conversation

**Concept:** AI-native chat interface. The whole site is a conversation with KPT's "agent." User messages on right, agent on left, agent reveals section content as responses. Ties directly to KPT Agents brand.

**Palette:** Soft white `#FAFAFA` · agent surface `#1A1A2E` · accent purple `#6B4EE6` · system green `#00C896` · soft grey `#E5E5E8`
**Typography:** Inter (everything). Chat bubble feel with appropriate weights.
**Motion:** Typing indicators (3 bouncing dots), message reveal slide-up, gentle agent typing animations.
**Anti-patterns:** No traditional landing layout. Everything is a chat exchange. No icon-soup; minimal iconography.

---

## V14 — Cassette

**Concept:** 70s/80s skeuomorphic tape deck and vinyl aesthetic. Side-A / Side-B for sections. Tactile knobs, VU meters, warm wood and chrome.

**Palette:** Deep walnut `#3D2817` · brushed aluminum `#C8C8CC` · LED red `#FF2D2D` · tape ribbon brown `#8B5A2B` · ivory label `#F5EBD0` · oxide black `#0F0A05`
**Typography:** Future PT (sub: Inter) condensed · Press Start 2P or VT323 for LED readouts · cursive label-maker (sub: Caveat) for hand-written tape labels.
**Motion:** Tape spools rotate. VU meters bounce on hover. Real CSS skeuomorphism with shadows and gradients.
**Anti-patterns:** No flat design. No clean modern type. Lean into the chunky physical-object feel.

---

## V15 — Atlas

**Concept:** Topographic map. Contour lines as section dividers. Portfolio plotted as pins on a stylized map. Each section has elevation badge.

**Palette:** Cartographer's white `#F4EFE3` · contour brown `#3D2817` · forest green `#2D5A3F` · ocean blue `#3D6E94` · accent rust `#A0432A`
**Typography:** Caslon (sub: EB Garamond) for headings · Spectrum Mono (sub: JetBrains Mono) for elevation/coordinate labels.
**Motion:** Contour lines draw on scroll. Map pins drop with bounce. Slow.
**Anti-patterns:** No cards. Information lives ON the map metaphor.

---

## V16 — Broadsheet

**Concept:** Front-page newspaper. Multi-column dense type, headlines, sub-decks, bylines, masthead. Wire copy energy.

**Palette:** Newsprint cream `#F5F0E1` · ink `#1A1A1A` · halftone grey `#999` · headline red `#A4262C` · faded yellow tint `#F4E97D`
**Typography:** Old Standard TT (sub: Playfair Display) for masthead · Source Serif (sub: Source Serif 4) for body · Bodoni Moda for decks · IBM Plex Mono for bylines.
**Motion:** None. Static newsprint. Maybe a subtle "fresh-off-the-press" reveal on first paint.
**Anti-patterns:** No animations. No modern UI. Embrace dense ugly-pretty newspaper energy.

---

## V17 — Nostromo

**Concept:** Sci-fi instrument panel à la Alien (1979) and 70s spacecraft control. Different from V4 Terminal — more analog spaceship cockpit, less hacker CLI.

**Palette:** Deep cockpit black `#0A0A0F` · CRT amber `#FFB000` · cyan readout `#00E5FF` · alert red `#FF3030` · machined metal `#3A3A40` · panel beige `#D4C9A8`
**Typography:** OCR-A or VT323 (everything) — pixelated, monospaced, vintage computer
**Motion:** CRT scanlines. Phosphor decay. Mechanical button-press feel. Indicator lights blink at irregular intervals.
**Anti-patterns:** No clean modern UI. Embrace 1970s analog-digital. No emojis.

---

## V18 — Receipt

**Concept:** Long thermal-printer scroll. Each section "prints out" as a receipt segment. Whole site is one continuous strip of paper.

**Palette:** Receipt white `#FBFBFB` · ink fade `#1A1A1A` · faded red carbon copy `#B53D3D` · faint blue carbon `#3D5A8A`
**Typography:** Receipt (sub: Anonymous Pro or VT323) — chunky thermal-printer mono
**Motion:** Each section "prints" out top-to-bottom on scroll-into-view. Faint print-head sound effect (no audio actually — just visual). Roller-feed jitter.
**Anti-patterns:** No fancy layouts. Pure receipt strip. Limited width.

---

## V19 — Risograph

**Concept:** Misregistered duotone risograph print. Concert poster / punk DIY aesthetic.

**Palette:** Riso fluorescent pink `#FF48B0` · riso teal `#00B7A8` · riso yellow `#FFE100` · risograph black `#1A1A1A` · paper newsprint `#F5F0E1`
**Typography:** Hand-drawn-feel: GT Cinetype (sub: Anybody from Google Fonts) · Stencil Std (sub: Stardos Stencil) for headlines
**Motion:** Subtle paper-grain shift. Halftone pattern animates very slowly. Misregistration flickers on hover (hue offset).
**Anti-patterns:** No clean digital aesthetic. Embrace ink-bleed, halftone dots, screen layers.

---

## V20 — Operator Manual

**Concept:** 1970s mainframe operator handbook / RFC document. Dense documentation energy, technical literacy.

**Palette:** Manual cream `#F4EFE0` · printed black `#1A1A1A` · IBM blue `#1D5CB6` · sub-section red `#A4262C` · warning amber `#C9A30D`
**Typography:** IBM Plex Mono · IBM Plex Serif for body · IBM Plex Sans for chrome
**Motion:** None. Static document feel. Page-flip transitions if anything.
**Anti-patterns:** No marketing slop. Dense technical writing. Numbered sections. Inline code blocks.

---

## Cross-design rules

1. Each design is fully responsive (md breakpoint at 768px).
2. Each design pads the hero to clear the global fixed nav (`var(--nav-height)`, treat as 80px).
3. CTA primary → `/start`. CTA secondary → `/pricing`.
4. Portfolio sections show first 6-8 entries from `@/lib/portfolio`.
5. No new npm dependencies. Three.js + R3F + drei are installed (use only on V5/V6/V7 if needed; V6/V7 prefer pure CSS Z-translation/scale).
6. All Google fonts loaded via `next/font/google` inside section files.
