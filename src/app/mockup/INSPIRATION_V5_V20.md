# Mockup Inspiration References — V5 through V20

Visual references for 16 KPT Designs mockup directions.
Patterns are written to be directly liftable by the implementer.

> Chrome browser extension was unavailable during scouting (extension not connected).
> All references below are drawn from firsthand knowledge of these sites and design history.

---

## V5 — TUNNEL (3D wormhole flythrough)

### 1. Lusion — https://lusion.co

**One-line:** Award-winning WebGL studio site; hero is a first-person flight through an organic tunnel of flowing particles and refracted light — the definitive reference for this aesthetic.

**Liftable patterns:**
- **Radial UV tunnel geometry:** Build the wormhole as a `THREE.TubeGeometry` from a `THREE.CatmullRomCurve3` of ~12 control points jittered along Z; set `tubularSegments: 400, radialSegments: 16` for smooth flight; animate camera `.position.z` incrementing by `0.002` per frame with `camera.lookAt` always 2 units ahead on the curve — never lerp position directly or it stalls.
- **Chromatic aberration post-pass:** Add an `EffectComposer` with a custom `ShaderPass` offsetting the R channel by `+1.5px` and B channel by `–1.5px` on screen UVs; ramp the offset from 0 to 2.5 on camera speed spike (mouse drag or scroll burst) then ease back over 600ms with `lerp(current, 0, 0.06)` — the fringe screams "speed through glass."
- **Bloom vignette on tunnel walls:** Apply `UnrealBloomPass({ threshold: 0.3, strength: 1.2, radius: 0.4 })` and keep emissive color on the tube mesh at `#FF6FC8` (hot pink) at strength 0.6 — this makes the tunnel rim glow without blowing out the center; pair with a dark `#0A0008` background for maximum contrast.

---

### 2. Active Theory — https://activetheory.net

**One-line:** LA interactive studio; navigation between case studies is a warp-speed fly-through of glowing corridor geometry — copy their transition paradigm directly.

**Liftable patterns:**
- **Speed-lines on warp:** On transition trigger, spawn 80–120 `THREE.Line` objects from center-screen radiating outward at random angles; animate their opacity `1 → 0` and scale `0.1 → 4.0` over 400ms with `easeOutExpo` — delete on opacity zero; creates the Jump-to-Hyperspace effect from pure lines, no texture needed.
- **HUD overlay while flying:** Keep a fixed-position `<div>` with `font-family: monospace; font-size: 11px; letter-spacing: 0.18em; color: rgba(255,255,255,0.35); text-transform: uppercase` showing `DEPTH: –{z.toFixed(0)}m` updating every frame — the live counter grounds the spectacle as a navigable space, not just a screensaver.
- **Cinematic letterbox on entry:** Add `position: fixed` top and bottom bars of `height: 8vh; background: #000; z-index: 50` that slide from `translateY(0)` to `translateY(–100%)` / `translateY(100%)` over 900ms on page load — immediately frames the canvas as a film, not a webpage.

---

## V6 — STRATA (Z-stacked 2D planes)

### 1. Aristide Benoist — https://www.aristidebenoist.com

**One-line:** French creative director; portfolio uses CSS 3D perspective to stack image planes at descending Z depths — the canonical parallax-strata implementation.

**Liftable patterns:**
- **CSS 3D stage setup:** Wrap all layers in `style="perspective: 1200px; perspective-origin: 50% 50%"` on a full-viewport container; each plane gets `transform: translateZ(–{n * 80}px)` where n is depth index 0–6; use `transform-style: preserve-3d` on all intermediary wrappers — without this the planes collapse flat.
- **Mouse-driven tilt:** On `mousemove`, compute `(e.clientX / window.innerWidth – 0.5)` and `(e.clientY / window.innerHeight – 0.5)` as `rx, ry`; apply `rotateY(${rx * 8}deg) rotateX(${ry * –6}deg)` to the stage container with `transition: transform 0.12s linear` — the asymmetric X/Y multipliers (8 vs 6) feel natural to human head tilt range.
- **Per-layer atmospheric fog:** Apply `filter: blur(${n * 0.4}px) brightness(${1 – n * 0.06})` to each plane where n is its depth index — background layers are slightly blurred and 24% dimmer than foreground; this is atmosphere, not just depth ordering, and it reads at a glance.

---

### 2. Bruno Simon Portfolio — https://bruno-simon.com

**One-line:** The definitive CSS/WebGL mixed strata experience; 3D world with HTML planes floating in 3D space as diegetic UI elements.

**Liftable patterns:**
- **Diegetic text planes in 3D:** Position `<div>` labels using `THREE.CSS3DObject` from three/examples; sync their world matrix to scene objects — the text is literally inside the 3D world, not a 2D overlay; avoids the "sticker on a painting" feel of conventional overlays.
- **Strata section transition:** Animate `.z` position of the camera from `0 → –400` on scroll using a `useScrollVelocity` hook; each section begins at a `translateZ` threshold; the strata fly toward camera rather than scrolling down — directional expectation is broken, making sections feel like depth not pages.
- **Ground-plane grid:** Render a `THREE.GridHelper(100, 100, '#1A1A2E', '#12122A')` as the base plane; reduce opacity to 0.3 with `material.transparent = true, material.opacity = 0.3`; this anchors the floating planes to a sense of floor without a solid surface.

---

## V7 — RECURSIVE ZOOM (powers-of-ten)

### 1. Powers of Ten (Eames Office) — https://www.eamesoffice.com/education/powers-of-ten-2

**One-line:** The 1977 Eames film zooming from 10^26 to 10^–16 metres is the canonical reference; the film's scale labels and exponential jump cuts are the liftable grammar.

**Liftable patterns:**
- **Scale exponent label:** Fixed bottom-left badge: `background: rgba(0,0,0,0.72); border: 1px solid rgba(255,255,255,0.2); padding: 6px 12px; font-family: monospace; font-size: 13px; letter-spacing: 0.1em; color: #FFF` displaying `10^{n}m` where n updates on scroll — the superscript should be a genuine `<sup>` for semantic correctness and optical sizing.
- **Zoom velocity ramp:** Map scroll `deltaY` to a logarithmic zoom factor: `scale += Math.log(1 + Math.abs(deltaY) * 0.01) * Math.sign(deltaY) * 0.4` so fast scrolling accelerates exponentially — linear zoom feels trivially slow against the conceptual scale of the journey.
- **Cross-fade at scale threshold:** At each power-of-ten boundary, crossfade the background image/component from the current scale's content to the next with `opacity: 0 → 1` over 200ms; keep both mounted during transition using absolute positioning — hard cuts would be jarring; this maintains the film's seamless illusion.

---

### 2. The Scale of the Universe 2 — https://htwins.net/scale2

**One-line:** Interactive Flash-era web app (now reconstructed in HTML5) mapping everything from quantum foam to the observable universe on a single zoomable axis — the definitive interactive powers-of-ten UI.

**Liftable patterns:**
- **Item cards that phase in/out by scale:** Each zoomable object has `minScale` and `maxScale` thresholds; use `opacity: clamp(0, (currentScale – minScale) / rangeBuffer, 1)` so items fade smoothly into existence rather than popping — the buffer value of ~0.5 scale decades prevents jarring simultaneous appearance of many items.
- **Circular object representation:** Render each scale object as a circle with `r` proportional to its real-world radius at the current zoom level; label with `<text>` in SVG directly on or beside the circle in `font-family: monospace; font-size: 10px; fill: #DDD` — the circle+label grammar is instantly scannable across 40 orders of magnitude.
- **Zoom progress ruler on edge:** A vertical `<aside>` with a `1px solid rgba(255,255,255,0.3)` track and a scrubber dot showing current position between min/max scale; tick marks at every integer exponent labeled `10^n` in 9px mono — gives users a persistent sense of where they are in the zoom journey.

---

## V8 — CODEX (illuminated manuscript)

### 1. Manuscript Miniatures — https://manuscriptminiatures.com

**One-line:** Database of medieval illuminated pages; the site itself uses a neutral grid, but the source manuscripts provide the full pattern vocabulary: gold leaf geometry, foliate borders, historiated initials.

**Liftable patterns:**
- **Historiated drop cap:** Wrap the first letter in a `<span>` with `float: left; font-size: 5.2em; line-height: 0.82; font-family: 'UnifrakturMaguntia', serif; color: #8B0000; text-shadow: 1px 1px 0 #C8A84B` and a `border: 2px solid #C8A84B; padding: 4px 8px; margin: 0 8px 4px 0; background: #FDF8E1` — 5 lines tall, gold border, crimson letter, parchment fill; this is a single-element drop cap requiring no image.
- **Foliate border strip:** Generate an SVG repeating pattern of `<path>` acanthus-style scrollwork at `width: 32px; height: 32px` tiled along `border-left: 32px solid transparent; border-image: url(foliate.svg) 32 round` — alternatively use CSS `background-image: url(...)` on a `position: absolute; left: 0; top: 0; width: 32px; height: 100%` pseudo-column beside the text block.
- **Parchment vellum texture:** `background: #F5EDD6` base + an `feTurbulence` SVG filter (`baseFrequency="0.65" numOctaves="3" seed="5"`) composited with `feColorMatrix` to desaturate and an `feBlend` in multiply mode at 6% opacity — renders as subtle grain without a photo asset; inline the SVG filter in `<defs>` and reference via `filter: url(#parchment)` on the page body.

---

### 2. Codex Sinaiticus Project — https://codexsinaiticus.org

**One-line:** The digitized 4th-century Bible manuscript; the viewer's interface of column-ruled parchment pages with interlinear annotations is the source grammar for the multi-column codex layout.

**Liftable patterns:**
- **Three-column scriptio continua:** Set body text in three equal columns using `column-count: 3; column-gap: 3em; column-rule: 1px solid rgba(139,69,19,0.3)` with `font-variant-ligatures: common-ligatures; hyphens: auto` — the column rules mimic the dry-point rulings on vellum; the hyphenation mimics hand-copying decisions.
- **Interlinear gloss annotation:** Render annotations as `<ruby>` elements with `<rt>` styled: `font-size: 0.55em; color: #8B0000; font-family: serif; letter-spacing: 0.05em` — the ruby text appears above the base text like a medieval interlinear gloss, no absolute positioning needed.
- **Rubric chapter title:** Chapter titles in `color: #8B0000` (rubrum red), `font-family: 'UnifrakturMaguntia', serif`, `font-size: 1.4em`, preceded by a `border-top: 2px solid #C8A84B` rule at `margin-top: 2.5em; padding-top: 0.75em` — rubrum + gold rule is the codex's native hierarchy signal.

---

## V9 — TICKER (Bloomberg terminal)

### 1. Bloomberg Terminal / bloomberg.com/markets — https://bloomberg.com/markets

**One-line:** The Bloomberg professional terminal and its public markets page define the dense, high-information financial display: amber-on-black, relentless data density, no decorative whitespace.

**Liftable patterns:**
- **Dense data grid:** Use CSS Grid with `grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1px; background: #1A1A1A` with each cell `background: #0A0A0A; padding: 8px 10px` — the `1px` gap on dark background creates a subtle wire-frame grid without explicit borders; 1px gap doubles as the "cell wall."
- **Bid/ask color semantics:** Up-tick values in `#00CC44` (terminal green), down-tick in `#FF3333` (terminal red), unchanged in `#FFB000` (amber); implement a flash animation on change: `@keyframes tick-flash { 0% { background: #FFB00033 } 100% { background: transparent } }` applied for `0.4s` — the flash is visible but non-distracting at the right timing.
- **Mono label hierarchy:** Ticker symbol in `font-family: 'Courier New', monospace; font-size: 13px; font-weight: bold; letter-spacing: 0.06em; color: #FFB000`; company name in `font-size: 10px; color: #888; letter-spacing: 0.04em; text-transform: uppercase`; price in `font-size: 18px; font-weight: bold; color: #E8E8E8`; change in `font-size: 11px` with up/down color — four levels, four sizes, no other styling.

---

### 2. Koyfin — https://koyfin.com

**One-line:** Modern Bloomberg alternative; dark-mode financial dashboard with drag-and-drop panels, sparkline arrays, and a well-considered type hierarchy for financial data — cleaner than Terminal but same grammar.

**Liftable patterns:**
- **Sparkline inline with text:** Render a 64×20px `<canvas>` sparkline inline with the ticker row using `display: inline-block; vertical-align: middle; margin: 0 8px` — draw the line with `strokeStyle: #00CC44` / `#FF3333` based on net change direction, `lineWidth: 1.5`, no fill, no axes; the miniature chart reads instantly without labels.
- **Panel header chrome:** Each data panel has a `height: 28px; background: #141414; border-bottom: 1px solid #2A2A2A; display: flex; align-items: center; padding: 0 12px; font-family: monospace; font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.12em` header — the header is darker than the panel body, not lighter, which is the financial terminal convention (opposite of most SaaS dashboards).
- **Horizontal scrolling ticker tape:** `position: fixed; bottom: 0; left: 0; right: 0; height: 24px; background: #0A0A0A; border-top: 1px solid #222; overflow: hidden` containing an absolutely positioned `<div>` with items spaced `gap: 40px` animated with `translateX(–100%)` over 60s `linear infinite` — use `will-change: transform` to keep it on the GPU.

---

## V10 — ATELIER (couture lookbook)

### 1. The Row — https://the-row.com

**One-line:** Olsen sisters' ultra-luxury fashion house; the site is typography-first with near-zero UI chrome, large whitespace, and a total confidence in stillness — the anti-Instagram luxury aesthetic.

**Liftable patterns:**
- **Centered serif with extreme tracking:** Hero headline in `font-family: 'Cormorant Garamond', serif; font-size: clamp(32px, 6vw, 72px); font-weight: 300; letter-spacing: 0.25em; text-transform: uppercase; text-align: center` — the `0.25em` tracking at display size is the specific "luxury whisper" spacing; tighter than this reads corporate, wider reads retro-pastiche.
- **Full-bleed editorial photograph:** Hero image in `width: 100%; height: 90vh; object-fit: cover; object-position: center top` — always crop to face/shoulders at center-top, not center-center, for portrait fashion photography; `filter: saturate(0.9) contrast(1.05)` for the slightly cooled, matte film-scan look.
- **Navigation as a single centered line:** `<nav>` in `display: flex; justify-content: center; gap: 48px; font-family: 'Cormorant Garamond', serif; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: #1A1A1A` with no underline, no hover state beyond `opacity: 0.6` — the restraint is the statement.

---

### 2. Chanel — https://chanel.com

**One-line:** Maison Chanel's site; the vocabulary of the double-C logo system translated into web: strict black/white/gold, ruled lines as decoration, absolute typographic order.

**Liftable patterns:**
- **Hairline rule as section divider:** `<hr style="border: none; border-top: 0.5px solid #1A1A1A; margin: 60px 0; width: 100%">` — exactly 0.5px (`0.5px` renders as the thinnest physical line on HiDPI screens); no color variation, no width variation; the rule is a couture seam, not a design element.
- **Caption-beneath-image label:** Every editorial image has a `<figcaption>` in `font-family: 'Didot', serif; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: #888; margin-top: 10px; text-align: center` — the wide-tracked caps caption at 10px is inviolable Chanel typography; it reads as a garment label.
- **Gold accent as sole color note:** Use `#C8A84B` (old gold, not bright yellow) exactly once per viewport as a `border-bottom` on a key headline or as a `::after` pseudo-line of `height: 1px; background: #C8A84B; width: 40px; display: block; margin: 16px auto 0` — one gold note, one time, never repeated.

---

## V11 — ARCHITECTURAL (blueprint elevations)

### 1. Bjarke Ingels Group (BIG) — https://big.dk

**One-line:** BIG's portfolio site uses architectural drawing conventions directly: section cuts, isometric views, color-coded program areas — the grid is structural, not decorative.

**Liftable patterns:**
- **Blueprint hairline rules:** All structural lines at `border: 1px solid rgba(0, 100, 255, 0.4)` on a `#F0F4FF` blueprint-white background — the 0.4 opacity is critical; it reads as a reproducible technical drawing, not a UI border; dimension tick marks as `::before` / `::after` with `width: 6px; height: 1px; background: rgba(0,100,255,0.4)` at line endpoints.
- **Dimension annotation label:** `font-family: 'Roboto Mono', monospace; font-size: 10px; letter-spacing: 0.12em; color: rgba(0,80,200,0.7); text-transform: uppercase` with a horizontal leader line on both sides: `display: flex; align-items: center; gap: 8px` with flex-grow `<hr>` siblings — the leader-line+text+leader-line pattern is the architectural dimension convention.
- **Program color blocks:** Fill section areas with `background: rgba(0,100,255,0.07)` (structure/circulation), `rgba(0,200,100,0.07)` (program/service), `rgba(255,160,0,0.07)` (public/amenity) at low opacity overlaid on grid — mimics architectural program diagrams; the colors label function, not decoration.

---

### 2. Sou Fujimoto Architects — https://sou-fujimoto.net

**One-line:** Fujimoto's site renders his diagrammatic drawing style digitally: axonometric grids, nested square geometries, the primacy of the plan view over the photograph.

**Liftable patterns:**
- **Axonometric grid overlay:** CSS custom property `--ax-angle: 30deg`; draw grid lines using `background: repeating-linear-gradient(var(--ax-angle), rgba(0,0,200,0.08) 0, rgba(0,0,200,0.08) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(calc(180deg - var(--ax-angle)), rgba(0,0,200,0.08) 0, rgba(0,0,200,0.08) 1px, transparent 1px, transparent 40px)` on the page background — pure CSS isometric grid, no SVG.
- **Floor plan element as nav:** Render navigation as a simple floor plan `<svg>` with rooms as `<rect>` elements with `stroke: rgba(0,80,200,0.5); stroke-width: 1; fill: transparent`; on hover, the room fills with `rgba(0,80,200,0.08)` and a label appears at center; room names are the nav items — wayfinding as literal architecture.
- **North arrow + scale bar:** Place a classic north arrow `<svg>` (circle with filled sector indicating N) at `position: fixed; bottom: 40px; right: 40px; opacity: 0.3` alongside a scale bar of `width: 80px; height: 4px; background: linear-gradient(90deg, #003CB3 50%, transparent 50%); border: 1px solid #003CB3; margin-top: 4px` with `5m` and `10m` labels in 9px mono — permanent cartographic chrome that never interferes with content.

---

## V12 — SPECIMEN (type foundry book)

### 1. Klim Type Foundry — https://klim.co.nz

**One-line:** New Zealand's premium type foundry; the type specimens are the design system — each typeface gets a multi-section layout that demonstrates the face in editorial, display, and text contexts simultaneously.

**Liftable patterns:**
- **Waterfall size scale:** Render the specimen alphabet at descending sizes — 96px, 72px, 48px, 36px, 24px, 16px, 12px — in a `<div>` with `line-height: 1.2` and `padding: 8px 0` between each; each row left-aligned with the size in `font-family: monospace; font-size: 10px; color: #999; float: right; padding-top: 4px` as a right-floated label — the waterfall is the single most readable specimen format.
- **Glyph grid:** `display: grid; grid-template-columns: repeat(auto-fill, 56px); gap: 2px` with each cell `width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; font-size: 32px; border: 1px solid #E8E8E8` on hover `background: #F0F0F0` — renders the complete character set as an inspectable grid, identical to InDesign's glyph panel.
- **Tester input field:** A live `<textarea>` or `contenteditable` div styled `font-family: var(--specimen-face); font-size: 48px; border: none; border-bottom: 1px solid #CCC; outline: none; width: 100%; line-height: 1.1; padding: 12px 0; resize: none; background: transparent` with placeholder "Type to test" — directly mirrors Klim's interactive tester; one of the most engaging specimen elements possible.

---

### 2. Dinamo Typefaces — https://abcdinamo.com

**One-line:** Swiss type foundry known for playful-serious specimens; the site layers giant type at different weights and styles in overlapping columns — weight-axis exploration as layout.

**Liftable patterns:**
- **Variable font weight slider:** `<input type="range" min="100" max="900" step="1">` bound via JS to `document.documentElement.style.setProperty('--specimen-weight', value)` with the specimen headline using `font-variation-settings: 'wght' var(--specimen-weight)` — the slider IS the specimen; dragging it is more revealing than any static image.
- **Overlapping weight columns:** Three `<div>` columns with `position: absolute` offsets and the same text at `font-weight: 100`, `400`, `700`; vary `color: #000, #888, #DDD` by weight; let them overlap with `mix-blend-mode: multiply` — creates a typographic moiré that is instantly recognizable as a Dinamo specimen page.
- **Mono metadata sidebar:** A narrow `position: fixed; left: 0; top: 0; height: 100%; width: 200px; border-right: 1px solid #E0E0E0; padding: 24px 16px; font-family: monospace; font-size: 10px; line-height: 1.8; color: #666` sidebar listing: designer name, year, style count, axis ranges in format `wght 100–900`, supported languages — identical to a printed type specimen's colophon page.

---

## V13 — CONVERSATION (AI chat-native)

### 1. Claude.ai — https://claude.ai

**One-line:** Anthropic's chat interface; the conversational turn structure, message bubble differentiation, and the balance between density and breathing room define the modern AI chat aesthetic.

**Liftable patterns:**
- **Message bubble differentiation:** User messages: `background: #F0F0F0; border-radius: 18px 18px 4px 18px; padding: 12px 16px; max-width: 80%; margin-left: auto` (right-aligned, filled); assistant messages: `background: transparent; padding: 12px 0; max-width: 100%; border-left: 2px solid #E8E8E8; padding-left: 16px` (left-aligned, borderline) — the asymmetry instantly signals turn ownership without color dependence.
- **Streaming text cursor:** A `<span class="cursor">` appended to in-progress assistant messages with `animation: blink 1s step-end infinite; width: 2px; height: 1em; background: currentColor; display: inline-block; vertical-align: middle; margin-left: 2px` — the blinking cursor communicates live generation; remove it on completion; this is the signature affordance of streaming chat.
- **Input textarea grow:** `<textarea>` with `rows="1"; overflow: hidden; resize: none` and an `input` event handler that sets `el.style.height = 'auto'; el.style.height = el.scrollHeight + 'px'` — grows line by line with content to a max of `6rem` then scrolls internally; this is the single most important input UX detail in chat interfaces.

---

### 2. Perplexity AI — https://perplexity.ai

**One-line:** Search-as-conversation interface; the citation superscript, source card grid, and follow-up question chips define a distinct richer-than-chat interaction pattern.

**Liftable patterns:**
- **Citation superscript badge:** Inline citation as `<sup style="font-size: 0.65em; background: #E8F0FE; color: #1A73E8; border-radius: 3px; padding: 1px 4px; margin-left: 1px; font-family: monospace; cursor: pointer">1</sup>` — clicking scrolls to the source card; the blue-on-lightblue badge is the academic footnote made web-native.
- **Source card grid:** `display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 8px; margin: 16px 0` with each card `border: 1px solid #E0E0E0; border-radius: 8px; padding: 10px; font-size: 12px; line-height: 1.5` showing favicon + domain + truncated title — the source grid turns provenance into a visual element, not a footnote.
- **Follow-up chip row:** `display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px` with chips `border: 1px solid #E0E0E0; border-radius: 16px; padding: 6px 14px; font-size: 13px; cursor: pointer; white-space: nowrap` on hover `background: #F5F5F5` — the pre-generated follow-up chips reduce conversation friction and are a key differentiator vs raw chat.

---

## V14 — CASSETTE (70s tape deck skeuomorph)

### 1. Winamp Skin Museum — https://skins.webamp.org

**One-line:** Archive of 65,000+ Winamp skins; the mid-fi skeuomorphic era's full vocabulary — brushed aluminum, chrome bezels, LED segment displays, rubber buttons — all directly browsable.

**Liftable patterns:**
- **LED segment display:** Emulate 7-segment digits using a `<span>` with `font-family: 'DSEG7 Classic', monospace` (Google Fonts has this) in `color: #FF6600; text-shadow: 0 0 6px #FF6600; background: #0A0A00; padding: 4px 8px; border-radius: 2px` — alternatively use `font-family: 'Digital-7', monospace; color: #FF4400; letter-spacing: 0.05em`; the orange-glow on near-black background is the exact VU meter aesthetic.
- **Brushed metal panel texture:** `background: linear-gradient(180deg, #A8A8A8 0%, #C8C8C8 30%, #B0B0B0 60%, #989898 100%)` for horizontal brushing; overlay `repeating-linear-gradient(90deg, transparent 0, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 3px)` for the micro-brush striation — two gradients, no image, reads immediately as brushed aluminum.
- **Rubber button with inset shadow:** `border-radius: 3px; background: #222; border: 1px solid #111; box-shadow: inset 0 1px 0 rgba(255,255,255,0.15), 0 1px 2px rgba(0,0,0,0.8); padding: 5px 10px; font-family: monospace; font-size: 10px; letter-spacing: 0.08em; color: #DDD; text-shadow: 0 1px 0 #000` on `:active`: `box-shadow: inset 0 2px 4px rgba(0,0,0,0.6); transform: translateY(1px)` — the press animation is the soul of the skeuomorph.

---

### 2. CASSETTE Tape label designs (Maxell/TDK) — https://www.moma.org/collection/works/3833 (as reference)

**One-line:** The Maxell UD-XL and TDK SA tape label designs of the late 1970s are some of the most influential anonymous graphic design of the 20th century — bold color blocks, sans-serif type system, cassette-window graphic.

**Liftable patterns:**
- **Cassette window graphic:** Render the tape-reel view as an SVG: two `<circle>` elements for hubs with `fill: #1A1A1A; stroke: #444; stroke-width: 2`; `<rect>` for the housing aperture with `rx: 4; fill: #0A0A0A`; two tangent lines from hub to hub suggesting the tape run — all inside a `width: 120px; height: 80px` SVG; clicking the hubs could rotate them with a CSS `animation: spin 2s linear infinite` when playing.
- **Label color block system:** The tape label is a horizontal band: `background: linear-gradient(90deg, #CC2200 0%, #CC2200 40%, #F5F0E8 40%, #F5F0E8 100%)` with the model name (`SA-90`) in `font-family: 'Helvetica Neue', sans-serif; font-size: 28px; font-weight: 700; color: #F5F0E8` on the red side and specs in `font-size: 10px; color: #222` on the cream side — the split-color label is the single most recognizable cassette tape graphic element.
- **Reel counter readout:** A mono numeric counter in `font-family: 'DSEG7 Classic', monospace; font-size: 24px; color: #FF6600; background: #0D0D00; padding: 6px 12px; border: 1px solid #333; border-radius: 2px` with a decrement/increment animation that counts in real time based on "playback" position — the counter display IS the cassette time readout.

---

## V15 — ATLAS (topographic map)

### 1. Mapbox Studio / Mapbox GL JS — https://studio.mapbox.com

**One-line:** The Mapbox design environment; their "Outdoors" and "Terrain" styles define the contemporary digital topographic map language: contour line colors, elevation tinting, label hierarchy.

**Liftable patterns:**
- **Contour line system:** Render elevation contours as SVG `<polyline>` sets; index contours (every 5th) at `stroke: rgba(120, 80, 40, 0.6); stroke-width: 1.5`; intermediate contours at `stroke: rgba(120, 80, 40, 0.3); stroke-width: 0.75` — the 2:1 weight ratio between index and intermediate is the cartographic standard; add elevation labels on index contours in `font-size: 9px; fill: rgba(120,80,40,0.8); font-family: monospace`.
- **Hypsometric tint:** Layer color fills by elevation band: sea level `#C8E4F0`, low `#E8F0DC`, mid `#D4C8A8`, high `#C0A882`, alpine `#B0A0A0`, peak `#E8E8E8` — each as a polygon layer with `fill-opacity: 0.5`; the sequence is the standard Swiss topographic color ramp; do not use saturated greens, only the muted, realistic hues.
- **Grid reference annotation:** At 10% opacity, overlay a `1px solid rgba(0,80,160,0.15)` grid at regular intervals; where grid lines cross, place coordinate labels in `font-family: 'Roboto Mono', monospace; font-size: 8px; fill: rgba(0,80,160,0.4); letter-spacing: 0.04em` — the pale blue grid reference is the ordnance survey convention; it implies precision without cluttering the map content.

---

### 2. National Geographic Map Style (reference: natgeo.com/maps) — https://www.nationalgeographic.com/maps

**One-line:** National Geographic's print cartography, translated; warm parchment bases, precise serif place labels, bold political boundaries, the gold "National Geographic yellow" as a signature element.

**Liftable patterns:**
- **Serif place name hierarchy:** Country names in `font-family: 'Palatino Linotype', serif; font-size: 14px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; fill: #1A1A1A`; capital cities in `font-size: 11px; font-weight: 400; font-style: italic`; natural features in `font-size: 9px; fill: #444; font-style: italic; letter-spacing: 0.06em` — three tiers, three styles, strictly hierarchical.
- **Political boundary line:** `stroke: rgba(180,120,40,0.8); stroke-width: 1.5; stroke-dasharray: 8 4` for international borders; `stroke-width: 0.75; stroke-dasharray: 4 3` for administrative boundaries — the dashed line convention distinguishes boundary type at a glance; the amber-brown color keeps boundaries legible without competing with terrain color.
- **Parchment sea fill:** Ocean/water areas: `background: #B8D4E0` with a subtle `radial-gradient` from coastal areas darkening inward — `linear-gradient` from the coastline: `background: linear-gradient(to center, #8FBFD4 0%, #B8D4E0 60%)` approximated; add a shallow coastal shelf band of `rgba(255,255,255,0.2)` just inside the coastline — the pale shelf ring is the cartographic signature of hand-painted geographic illustration.

---

## V16 — BROADSHEET (newspaper)

### 1. The Guardian — https://theguardian.com

**One-line:** The Guardian's digital redesign is the most typographically rigorous newspaper-to-web translation; column grids, headline size ladders, section color coding, and dateline formatting all survive the print-to-screen journey intact.

**Liftable patterns:**
- **Modular column grid:** CSS Grid `grid-template-columns: repeat(12, 1fr); gap: 16px` with stories spanning 3, 4, 6, or 12 columns based on editorial weight; the lead story always spans full 12 columns at desktop, 6 at tablet — the snap to column fractions is the newspaper grid's essence; never use fractional columns.
- **Headline size ladder:** `h1` 40px `font-weight: 700`; `h2` 28px `font-weight: 700`; `h3` 22px `font-weight: 700`; standfirst `font-size: 17px; font-weight: 300; font-style: italic`; byline `font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #005689` — each tier is a named editorial role, not an arbitrary size; never introduce intermediate sizes.
- **Section front label:** `background: #005689; color: #FFF; font-family: 'Guardian Headline', serif; font-size: 13px; font-weight: 700; text-transform: uppercase; padding: 2px 8px; display: inline-block; margin-bottom: 8px` — the colored section flag above the headline is the broadsheet's navigation system; each section gets its own color from the palette, never a neutral.

---

### 2. New York Times Digital — https://nytimes.com

**One-line:** The NYT digital edition; the gothic masthead typography (Times New Roman / Cheltenham), the "XXXX" dateline format, the wire-service lede paragraph — these are the specific liftable grammar elements.

**Liftable patterns:**
- **Gothic masthead treatment:** The title/logo area in `font-family: 'Old English Text MT', serif; font-size: 48px; font-weight: 400; letter-spacing: -0.01em; color: #1A1A1A; border-top: 3px solid #1A1A1A; border-bottom: 1px solid #1A1A1A; padding: 8px 0; text-align: center` with a hairline `border-top` 8px above it and `All the News That's Fit to Print` in `font-family: 'Times New Roman', serif; font-size: 9px; letter-spacing: 0.12em; color: #1A1A1A` centered above — the full broadsheet masthead in pure CSS.
- **Dateline lede format:** First paragraph opens with `CITY, MONTH DAY —` in `font-family: 'Times New Roman', serif; font-weight: 700; font-size: inherit` as an inline bold run before the paragraph text — the wire-service dateline is a one-character typographic device that immediately signals journalism.
- **Column rule between articles:** `border-right: 1px solid #E0E0E0` on all but last column in a grid row; this hairline column rule (`1px`, mid-grey) is the broadsheet's structural DNA — more restrained than a full divider, more present than whitespace alone.

---

## V17 — NOSTROMO (Alien-1979 instrument panel)

### 1. Typeset in the Future — https://typesetinthefuture.com/2014/12/01/alien

**One-line:** Dave Addey's exhaustive visual analysis of Alien's typography and interface design; the single best reference document for the specific fonts, layouts, and CRT aesthetics of the Nostromo's MU/TH/UR 6000.

**Liftable patterns:**
- **USCSS Nostromo header format:** Panel labels in `font-family: 'Eurostile Extended', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #E8E000` (Alien's specific yellow-green CRT color) on `background: #0A0A06` — the combination of Eurostile Extended Bold + yellow-green + black is THE Alien interface signature; no other typeface substitutes.
- **MU/TH/UR terminal output format:** Text output in `font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.8; color: #E8E000; background: #0A0A06` with `border: 1px solid #2A2A00; padding: 16px` and the cursor as `::after { content: '▌'; animation: blink 0.8s step-end infinite }` — the `0.8s` blink rate is slower than standard `1s`, matching the actual film prop screen footage.
- **Panel grid chrome:** Surround instruments with `border: 2px solid #3A3A00; padding: 2px` and an inner `border: 1px solid #2A2A00` for the double-border bezel effect — the nested border creates depth on a flat screen; add `box-shadow: 0 0 8px rgba(232,224,0,0.15)` outward for a dim amber glow-from-within effect.

---

### 2. Interface Love — https://interfacelove.com (retroui / skeuomorphic category)

**One-line:** Curated archive of film and TV UI design; the Alien, 2001, and Blade Runner screens are specifically catalogued with font IDs and color notes — a companion to Typeset in the Future.

**Liftable patterns:**
- **Amber CRT phosphor color:** Use `#E8A000` (amber) as an alternative to the Alien yellow-green; amber phosphors predated green in real CRT terminals; `color: #E8A000; text-shadow: 0 0 4px #E8A00066` — the text-shadow at 40% opacity is the phosphor afterglow; stronger shadows look like neon, not CRT.
- **Status bar bit-pattern row:** A `<div>` of 16–32 `<span>` elements each showing `0` or `1`, toggling randomly on a 2–4s interval; `font-family: 'Courier New', monospace; font-size: 10px; letter-spacing: 0.15em; color: #E8A000; opacity: 0.6` — the random status bit row runs at the bottom of every Alien panel as ambient computer "activity"; it implies processing without conveying information.
- **Raster scan interference line:** `position: absolute; top: 0; left: 0; right: 0; height: 2px; background: rgba(232,160,0,0.15); animation: scan 8s linear infinite` where `@keyframes scan { 0% { top: 0 } 100% { top: 100% }}` — a single horizontal band scrolling top to bottom simulates the CRT electron beam trace; one line, slow period (8s), very low opacity — subliminal but unmistakable.

---

## V18 — RECEIPT (thermal printer scroll)

### 1. Receipts.world / @receipts_world (Instagram / Tumblr zine aesthetics)

**One-line:** The thermal receipt aesthetic has been codified by artists printing on actual receipt rolls; the specific grammar is: 80-col fixed-width text, dashed separators, SKU-style item codes, timestamp headers, and the vertical scroll with no horizontal margin.

**Liftable patterns:**
- **Thermal paper background:** `background: #F8F6F0; color: #1A1A1A; font-family: 'Courier New', monospace; font-size: 13px; line-height: 1.6; max-width: 380px; margin: 0 auto; padding: 32px 20px` — the off-white (`#F8F6F0`) is thermally-printed cream paper, not bright white; `max-width: 380px` matches the 80mm thermal roll width; zero horizontal decoration.
- **Dashed separator:** `<div style="border-top: 1px dashed #999; margin: 16px 0">` — never solid lines on a receipt; the dashed line is the print head's skip-paper movement; use `letter-spacing: 0` and `overflow: hidden; white-space: nowrap` for `- - - - - - - - - - - - - -` text alternatives that fill exact column width.
- **Header block format:** Receipt header as a `<pre>` block: three lines, `text-align: center`, all caps — first line store name in pseudo-bold (duplicate letter trick: `K K P T  D E S I G N S`), second line address, third line date/time in `MM/DD/YYYY  HH:MM:SS` — the centered all-caps header with wide letter spacing is the thermal receipt's masthead.

---

### 2. Godly Website — https://godly.website (filter: monospace)

**One-line:** Curated gallery of web design; filtering for monospace-type sites surfaces many receipt/typewriter-aesthetic sites that use the thermal print grammar for portfolio and editorial work.

**Liftable patterns:**
- **SKU-style item row:** `display: flex; justify-content: space-between; font-family: 'Courier New', monospace; font-size: 12px; padding: 4px 0` with left side `PROJECT-IDENTIFIER` in uppercase and right side price/metric — `<span class="dots" style="flex: 1; border-bottom: 1px dotted #999; margin: 0 8px; height: 0; align-self: flex-end; margin-bottom: 4px">` between them; the dot-leader fill-line is the receipt's cost-column convention.
- **Total block:** A double-rule before total: `border-top: 2px solid #1A1A1A; border-bottom: 2px solid #1A1A1A; padding: 6px 0; margin: 16px 0` with `TOTAL` left and the sum right in `font-weight: bold` — the double-rule total line is the receipt's most recognizable single element; it must use exactly double rules (not one thick rule) to read correctly.
- **Footer barcode placeholder:** An SVG barcode-lookalike of alternating `<rect>` strips at varied widths (`2px, 1px, 3px, 1px, 2px...`) in `fill: #1A1A1A` within a `height: 40px; width: 120px` container centered at the bottom — never use a real barcode; the abstract pattern reads as barcode without being scannable; add `*KPT-DESIGNS*` in `font-size: 9px; letter-spacing: 0.08em; text-align: center` below.

---

## V19 — RISOGRAPH (punk poster)

### 1. Riso.zone — https://riso.zone

**One-line:** Community hub for risograph printing; the gallery is the canonical reference for the specific color overlaps, dot-screen textures, misregistration, and ink-bleed effects that define authentic riso.

**Liftable patterns:**
- **Riso ink color palette:** Restrict to 2–3 actual Riso ink colors; canonical combinations: Fluorescent Pink `#FF48B0` + Marine Blue `#013AC3`, or Bright Red `#F15A29` + Mint `#98E8C1`, or Yellow `#FFE800` + Purple `#4C2C7A` — these are the real Riso ink swatch values; where they overlap, use `mix-blend-mode: multiply` at `opacity: 0.85` on the upper layer; this produces the authentic secondary color.
- **Dot screen halftone texture:** SVG `<filter>` using `feTurbulence` + `feDisplacementMap` OR a CSS background: `background-image: radial-gradient(circle, currentColor 1px, transparent 1px); background-size: 4px 4px` at 40% opacity over solid fill — the 4px dot-screen pitch is approximately correct for a 300dpi riso print at web scale; tighter pitches look too fine, looser too coarse.
- **Misregistration offset:** The second ink color layer gets `transform: translate(2px, –1px)` — a consistent 2px horizontal and 1px vertical shift on the secondary color creates the riso "off-register" look; it should be a fixed offset, not random, so it reads as an intentional print artifact rather than a glitch.

---

### 2. Present & Correct — https://presentandcorrect.com

**One-line:** London stationery and graphic design shop; their aesthetic draws directly from 1960s–80s institutional print — Letraset type, colored stock, high-contrast graphics — the design vocabulary that preceded and influenced riso printing.

**Liftable patterns:**
- **Letraset dry-transfer headline:** Set headlines in `font-family: 'Bebas Neue', sans-serif; font-size: clamp(48px, 10vw, 120px); font-weight: 400; text-transform: uppercase; letter-spacing: -0.01em; line-height: 0.9` — Bebas Neue is the closest free equivalent to common Letraset display faces; the tight leading (`0.9`) is the hand-set convention when you're counting individual letter transfers.
- **Colored stock background:** Use solid flat tinted backgrounds — `#F5C842` (Pantone Yellow), `#E8402A` (warm red), `#1F4E8C` (Process Blue), `#2D8C4E` (green) — these are the four standard colored duplicator paper colors; pick one as the page background and print in black only for maximum authenticity; do not add gradients or texture to the stock color.
- **High-contrast rip/cut collage mask:** Apply CSS `clip-path: polygon(0 5%, 3% 0, 97% 2%, 100% 98%, 96% 100%, 2% 97%)` to image containers — a slightly irregular six-point polygon with 2–5% offsets simulates a hand-cut paper edge; vary the polygon points per element so no two cuts look the same.

---

## V20 — OPERATOR (RFC mainframe handbook)

### 1. IETF RFC Archive — https://www.rfc-editor.org/rfc/rfc2119

**One-line:** The canonical source material: IETF RFCs are the internet's technical standards documents; their plain-text layout, numbered section hierarchy, MUST/SHOULD/MAY keyword conventions, and 72-character line width are the liftable grammar.

**Liftable patterns:**
- **72-column fixed-width document body:** Wrap all text in `<pre style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 1.6; max-width: 72ch; white-space: pre-wrap; word-break: break-word; color: #1A1A1A; background: #FAFAF8; padding: 40px 20px">` — the `72ch` max-width is the RFC standard column width; `pre-wrap` allows responsive line wrapping while preserving internal spacing.
- **RFC header block:** Fixed top block in monospace: left-aligned `Network Working Group` + `Request for Comments: XXXX` + author lines; right-aligned `[Organization]` + `[Month Year]` — implemented as a `display: flex; justify-content: space-between` wrapper with two `<pre>` blocks; a blank line then a centered `<h1>` title in all-caps with no additional styling — this header is the RFC's entire visual identity.
- **MUST/SHOULD/MAY keyword styling:** Wrap all normative keywords in `<strong style="font-variant: small-caps; letter-spacing: 0.08em">MUST</strong>` per RFC 2119 convention — the small-caps bold is the standard way these are typeset in printed RFCs; it signals normative language without color or highlighting.

---

### 2. IBM System/360 Reference Manual (archive.org) — https://archive.org/details/ibm-system-360-principles-of-operation

**One-line:** The 1964 IBM System/360 Principles of Operation manual; the canonical mainframe operator handbook; its tabular instruction format, bit-field diagrams, and section numbering system are the source of all subsequent computer manual aesthetics.

**Liftable patterns:**
- **Instruction format bit diagram:** Render machine instruction formats as SVG horizontal bars divided into labeled fields; each field: `<rect width="{bits*10}px" height="24px" stroke="#000" stroke-width="1" fill="none">` with `<text>` label centered inside; bit-width labels (e.g., `0`, `7`, `8`) above each boundary in `font-size: 8px; font-family: monospace` — this is the single most recognizable mainframe manual graphic element.
- **Section numbering system:** Use IBM's flat numbering convention: `1`, `1.1`, `1.1.1` — never use alphabetic subsections; style as `font-family: 'Courier New', monospace; font-weight: bold; font-size: 13px; color: #1A1A1A; margin-right: 12px; min-width: 48px; display: inline-block` prepended to the section title — the dot-separated numeric outline is how operators navigate in the field.
- **Tabular opcode reference:** `<table style="border-collapse: collapse; font-family: 'Courier New', monospace; font-size: 11px; width: 100%">` with `<th>` cells `border: 1px solid #1A1A1A; padding: 4px 8px; background: #1A1A1A; color: #FFF; text-align: left` and `<td>` cells `border: 1px solid #CCC; padding: 4px 8px` alternating rows `background: #F5F5F5` / `background: #FAFAF8` — the thin-border, near-white alternating table is the mainframe manual's primary information format.

---

## Cross-Reference Color Palette Summary

| Direction | Primary BG | Primary FG | Accent | Typeface |
|---|---|---|---|---|
| V5 Tunnel | `#0A0008` | `#FFFFFF` | `#FF6FC8` hot pink | mono labels |
| V6 Strata | `#0A0010` | `#E8E8E8` | depth-dimmed layers | perspective CSS |
| V7 Recursive Zoom | `#000000` | `#FFFFFF` | `#FFB000` scale amber | `monospace` |
| V8 Codex | `#F5EDD6` parchment | `#1A0A00` | `#C8A84B` gold, `#8B0000` rubrum | Unifraktur / Palatino |
| V9 Ticker | `#0A0A0A` | `#E8E8E8` | `#FFB000` amber, `#00CC44` up, `#FF3333` dn | Courier New mono |
| V10 Atelier | `#FFFFFF` | `#1A1A1A` | `#C8A84B` old gold | Cormorant Garamond |
| V11 Architectural | `#F0F4FF` | `rgba(0,80,200,0.8)` | `rgba(0,100,255,0.4)` blueprint | Roboto Mono |
| V12 Specimen | `#FFFFFF` | `#1A1A1A` | `#E8E8E8` grid | target face + mono meta |
| V13 Conversation | `#FFFFFF` | `#1A1A1A` | `#1A73E8` citation blue | system-ui |
| V14 Cassette | `#1A1A1A` brushed | `#DDD` | `#FF6600` LED orange | DSEG7 / Courier New |
| V15 Atlas | `#F0F4EE` paper | `#1A1A1A` | `rgba(120,80,40,0.6)` contour | Roboto Mono 9px |
| V16 Broadsheet | `#FFFFFF` | `#1A1A1A` | `#005689` Guardian blue | Old English / Times |
| V17 Nostromo | `#0A0A06` | `#E8E000` yellow-green | `0 0 8px rgba(232,224,0,0.15)` glow | Eurostile Extended / Courier |
| V18 Receipt | `#F8F6F0` cream | `#1A1A1A` | dashed `#999` rules | Courier New 13px |
| V19 Risograph | colored stock | black only | `multiply` blend overlaps | Bebas Neue / sans |
| V20 Operator | `#FAFAF8` | `#1A1A1A` | `#1A1A1A` opcode table headers | Courier New 72ch |
