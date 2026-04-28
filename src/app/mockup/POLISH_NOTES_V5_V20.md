# Polish & Accessibility Notes — V5 through V20

> Implementation checklist. Every hex value, timing, and easing is meant to be copy-pasted.
> Derived from `_lib/design-library.md` palette/typography/motion specs per design.

---

## V5 — Tunnel (scroll-IN)

### Custom Cursor
- Default: `cursor: none` on all `*`. Replaced with a 12×12px solid circle, `#00E5FF` (cyan), `mix-blend-mode: screen`, `pointer-events: none`, `z-index: 9999`.
- Hover over CTA button: circle expands to 40×40px over `200ms cubic-bezier(0.16, 1, 0.3, 1)`, fill fades out, replaced by a 2px `#00E5FF` ring.
- Hover over tunnel checkpoint text (HUD labels): cursor becomes a 6×18px vertical bar in `#FFB000` (amber alert) — mimicking a targeting reticle.
- On `mousedown`: ring pulses outward to 56px, fades in `120ms ease-out`.
- Touch devices: `cursor: auto`, no overrides.

### Selection / Focus Colors
```css
::selection {
  background-color: #00E5FF; /* cyan */
  color: #000812;             /* void */
}

:focus-visible {
  outline: 2px solid #00E5FF;
  outline-offset: 4px;
  border-radius: 0; /* HUD chrome is rectilinear */
}

/* For elements on cyan backgrounds */
.on-cyan:focus-visible {
  outline: 2px solid #FFB000; /* amber alert */
  outline-offset: 3px;
}
```

### Scrollbar Styling
```css
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: #000812; }
::-webkit-scrollbar-thumb {
  background: #0066FF; /* electric blue */
  border-radius: 0;
}
::-webkit-scrollbar-thumb:hover { background: #00E5FF; }

* { scrollbar-width: thin; scrollbar-color: #0066FF #000812; }
```

### Loading / Skeleton State
- Full-viewport `#000812` splash. Center: `KPT` in `JetBrains Mono` 11px `#00E5FF` letter-spaced 0.4em.
- A 1px cyan grid radiates outward from center — pure CSS `conic-gradient` pulsing `opacity: 0.1 → 0.4 → 0.1` over `2s ease-in-out infinite`.
- Once R3F `onCreated` fires: splash fades out `600ms ease-out`.
- Checkpoint content skeletons: `background: #001430` bars, NO shimmer — the tunnel walls provide motion; skeletons must be static to avoid competing with the 3D scene.

### Empty / 404 / Error States
- **Empty portfolio checkpoint:** HUD frame `1px solid #0066FF33`, mono label `// CHECKPOINT_EMPTY` in `#00E5FF` 11px. Below in `#E8F1FF`: "No projects in this sector." CTA outlined in `#00E5FF`.
- **404:** Full `#000812`. Centered JetBrains Mono: `TUNNEL_NOT_FOUND · 0x404`. Below: fake coordinate readout `X: 0.000 · Y: 0.000 · Z: ∞` in `#0066FF`. Link: `← RETURN TO ORIGIN` in cyan.
- **Network error:** `SIGNAL_LOST` in amber `#FFB000`. Mono sub-label: `[CONNECTION REFUSED]`. Retry button: `[ RETRY ]` bracket-style, `#FFB000` border, `200ms step-end` hover invert.

### Hover Micro-interactions

| Element | Effect | Duration | Easing |
|---|---|---|---|
| CTA primary button | Diagonal shine: `linear-gradient(105deg, transparent 40%, #00E5FF18 50%, transparent 60%)` sweeps left→right; border brightens `#0066FF → #00E5FF` | `500ms` shine / `200ms` border | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Nav link | Underline `scaleX: 0 → 1`, `transform-origin: left`, `2px solid #00E5FF` | `280ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Checkpoint card | `translateY(-4px)` + `box-shadow: 0 8px 32px #00E5FF1A` | `320ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| HUD stat value | Color `#E8F1FF → #00E5FF`, unit label stays `#0066FF` | `180ms` | `ease-out` |
| Tunnel grid line (canvas hover) | Brightness pulse — handled in R3F `useFrame`, lerp factor `0.04` | Continuous | `lerp` |

### Reduced-motion Respect — V5 Specific
```css
@media (prefers-reduced-motion: reduce) {
  /* DISABLE: forward-camera tunnel advance. Fall back to standard vertical scroll. */
  /* Implementation: check useReducedMotion() in TunnelEngine.tsx.
     When true: disable ScrollControls camera advance, render checkpoints as
     static full-width <section> elements stacked vertically below each other. */

  /* DISABLE: tunnel grid pulse animation */
  .tunnel-grid { animation: none; opacity: 0.15; }

  /* DISABLE: ambient particle drift */
  .tunnel-stars { animation: none; }

  /* RETAIN: color transitions ≤ 200ms (not vestibular triggers) */
  /* RETAIN: button border color hover */

  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 150ms !important;
  }
}
```
**Fallback navigation for keyboard/screen reader/reduced-motion users:**
- When `prefers-reduced-motion: reduce` OR when `pointer: coarse` (touch), `TunnelEngine` renders a vertical-sections layout. Each checkpoint becomes a `<section id="checkpoint-N">` with full height.
- A sticky side-nav renders: `[1] [2] [3] [4] [5]` circle dots linked to `#checkpoint-N` anchors. Aria label: `"Tunnel checkpoints"`.
- Screen readers: `<canvas aria-hidden="true" role="presentation" />`. All checkpoint content lives in sibling `<div>` elements outside the canvas — the canvas is purely decorative.
- Skip link: `"Skip to first checkpoint"` → `#checkpoint-1`, visible on `:focus`.

### Accessibility
- **Cyan `#00E5FF` on void `#000812`:** 14.8:1 — AAA. Safe for all text sizes.
- **Electric blue `#0066FF` on void `#000812`:** 3.2:1 — passes AA for large text (≥18px or ≥14px bold) only. Do NOT use for body copy. Use for decorative borders and HUD chrome only.
- **Soft white `#E8F1FF` on void `#000812`:** 18.4:1 — AAA. Primary body text color.
- **Amber `#FFB000` on void `#000812`:** 8.9:1 — AAA. Alerts and warnings.
- **Magenta `#FF00AA` on void `#000812`:** 5.1:1 — passes AA. Accent-only; not for body text.
- **Focus ring:** `2px solid #00E5FF`, offset `4px`. Visible against all tunnel backgrounds.
- **ScrollControls scroll-hijacking:** Must not trap keyboard users. Ensure native `Tab` traversal ignores R3F canvas. All checkpoint content must be reachable via keyboard without scrolling (via the side-dot-nav or skip links).
- **Decorative HUD chrome** (coordinate overlays, grid marks): `aria-hidden="true"`.
- **Color-only information warning:** Amber `#FFB000` is used for alerts. Always pair with a text label (e.g. `⚠ ALERT:` prefix in JetBrains Mono) — do not rely on color alone.

### Key Transition Timings

| Transition | Duration | Easing |
|---|---|---|
| Camera advance per scroll unit (R3F) | Continuous, bound to `scrollProgress` | `lerp(pos, target, 0.08)` per frame |
| Checkpoint text reveal (Html overlay) | `600ms`, `opacity: 0 → 1, y: 20 → 0` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Checkpoint exit fade | `400ms`, `opacity: 1 → 0` | `ease-in` |
| Loading splash fade-out | `600ms` | `ease-out` |
| Side-dot-nav anchor scroll | `scroll-behavior: smooth` (CSS only, not JS) | Native browser |
| Route transition (leaving tunnel) | `300ms` fade-out, `#000812` fill | `ease-in` |

---

## V6 — Strata (scroll-IN)

### Custom Cursor
- Default: 8×8px filled square, `#FF5E1A` (molten orange), `pointer-events: none`. Square = strata layer metaphor.
- Hover interactive: square morphs to 28×28px hollow square (border only), `border: 1.5px solid #FF5E1A`, over `220ms cubic-bezier(0.16, 1, 0.3, 1)`.
- On plane (strata layer) hover: cursor becomes a `+` crosshair in `#F4F1EB` (paper), 24×24px SVG.
- Touch devices: `cursor: auto`.

### Selection / Focus Colors
```css
::selection {
  background-color: #FF5E1A; /* molten orange */
  color: #F4F1EB;             /* paper */
}

:focus-visible {
  outline: 2px solid #FF5E1A;
  outline-offset: 3px;
  border-radius: 1px;
}

/* On dark #0B0B0F background */
.on-dark:focus-visible {
  outline: 2px solid #F4F1EB;
  outline-offset: 3px;
}
```

### Scrollbar Styling
```css
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: #0B0B0F; }
::-webkit-scrollbar-thumb { background: #1A1A22; }
::-webkit-scrollbar-thumb:hover { background: #FF5E1A; }

* { scrollbar-width: thin; scrollbar-color: #1A1A22 #0B0B0F; }
```

### Loading / Skeleton State
- Black `#0B0B0F` viewport. Center: three horizontal bars — `20px`, `12px`, `8px` high — in `#1A1A22`, spacing `8px`. These represent the strata planes. They animate upward `translateY: 0 → -8px → 0` in sequence, `600ms` each, staggered `200ms`. Stops when StrataEngine reports ready.
- Plane content skeletons: `#1A1A22` fill on `#0B0B0F`, no shimmer. Static bars in the proportions of the actual content.

### Empty / 404 / Error States
- **Empty portfolio plane:** Plane renders normally but contains `[  STRATUM VOID  ]` in `GT America Mono` centered, `#7B8E6F` (sage). Dimensions callout: `W: 100vw · D: 0 items`.
- **404:** Three strata planes visible, all reading `404` — each at different Z depths, each at slightly different opacity (`1.0`, `0.6`, `0.3`). Bottom plane: `LAYER NOT FOUND` in Fraunces. Orange CTA to return.
- **Network error:** Plane background shifts to `#1A1A22`. Center label: `STRATUM UNREACHABLE` in orange. Retry link.

### Hover Micro-interactions

| Element | Effect | Duration | Easing |
|---|---|---|---|
| CTA button | Orange fill sweeps in from left: `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)`; text flips `#0B0B0F` | `350ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Nav link | `scaleX` underline, `#FF5E1A`, 2px | `280ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Portfolio plane card | `translateZ: -8px)` toward viewer (CSS `perspective` parent); subtle orange glow `0 4px 24px #FF5E1A22` | `400ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Sage label text | `#7B8E6F → #F4F1EB` | `200ms` | `ease-out` |
| Strata plane parallax | Text within plane shifts `±4px` on mouse-move, `lerp factor 0.06` | Continuous | `lerp` |

### Reduced-motion Respect — V6 Specific
```css
@media (prefers-reduced-motion: reduce) {
  /* DISABLE: Z-translate strata advance — fall back to vertical scroll sections */
  /* In StrataEngine.tsx: useReducedMotion() → render planes as static <section>
     elements at normal document flow, no CSS Z-translation, no opacity scroll binding */

  /* DISABLE: plane parallax text shift */
  .strata-plane-text { transform: none !important; }

  /* DISABLE: plane fade-in/fade-out on scroll */
  .strata-plane { opacity: 1 !important; transform: none !important; }

  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 150ms !important;
  }
}
```
**Keyboard/screen reader fallback:** `StrataEngine` must render all planes in DOM order at all times (they may be `visibility: hidden` visually when not active, but must not be `display: none` or `aria-hidden` when keyboard-focused). Provide a `<nav aria-label="Strata sections">` with anchor links to each plane's `id`. Each plane must be a landmark `<section>` with an `aria-labelledby` pointing to its heading.

### Accessibility
- **Molten orange `#FF5E1A` on off-black `#0B0B0F`:** 6.4:1 — AA for all sizes.
- **Paper `#F4F1EB` on off-black `#0B0B0F`:** 17.2:1 — AAA.
- **Sage `#7B8E6F` on off-black `#0B0B0F`:** 4.8:1 — passes AA. Acceptable for secondary text ≥14px.
- **Ink `#1A1A22` on paper `#F4F1EB`:** 14.6:1 — AAA (for any plane using paper as background).
- **Focus ring:** `2px solid #FF5E1A`, offset `3px`. Visible against both dark and paper backgrounds.
- **Scroll-driven Z animation:** Same vestibular risk as V5. Screen readers should receive a linearized DOM; `StrataEngine` outputs content as real text nodes, not canvas pixels.
- **No color-only information** — section labels include text identifiers, not just Z-depth color coding.

### Key Transition Timings

| Transition | Duration | Easing |
|---|---|---|
| Plane approach (Z-translate per scroll unit) | Continuous scroll-bound | `lerp(z, target, 0.1)` per frame |
| Plane content opacity (approach) | `opacity: 0 → 1` over 30% of scroll window | `ease-out` |
| Plane content opacity (recede) | `opacity: 1 → 0` over 20% of scroll window | `ease-in` |
| Loading planes stagger | `600ms` each, `200ms` stagger | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Route transition | `350ms` fade, orange flash frame at `175ms` | `ease-in` / `ease-out` |

---

## V7 — Recursive Zoom (scroll-IN)

### Custom Cursor
- Default: `cursor: crosshair` (the zoom/target metaphor).
- Hover over the zoom target (the inner "portal" detail): cursor becomes a `+` magnifier — 32×32px SVG circle with `+` center, `stroke: #FF1E1E` (electric red), no fill, `pointer-events: none`.
- Hover over CTA: cursor reverts to `pointer`.
- Touch devices: `cursor: auto`. Pinch-zoom must be allowed (`touch-action: manipulation`, NOT `none`).

### Selection / Focus Colors
```css
::selection {
  background-color: #FF1E1E; /* electric red */
  color: #FCFCFA;             /* off-white */
}

:focus-visible {
  outline: 2px solid #FF1E1E;
  outline-offset: 4px;
  border-radius: 0;
}

/* On red-accented elements */
.on-red:focus-visible {
  outline: 2px solid #FFC700; /* accent gold */
  outline-offset: 3px;
}
```

### Scrollbar Styling
```css
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: #FCFCFA; }
::-webkit-scrollbar-thumb { background: #9A9A9A; }
::-webkit-scrollbar-thumb:hover { background: #FF1E1E; }

* { scrollbar-width: thin; scrollbar-color: #9A9A9A #FCFCFA; }
```

### Loading / Skeleton State
- Off-white `#FCFCFA` viewport. Center: `KPT` in Söhne (Inter fallback) 120px `#0A0A0A`, scaled to `scale(1)`. A red crosshair SVG overlaid at center, `opacity: 0.3`. No animation — static until RecursiveEngine is ready, then hero scales in from `scale(0.8)` over `800ms cubic-bezier(0.16, 1, 0.3, 1)`.
- Section skeletons: `#F0F0EE` background bars, `border-radius: 0`, no shimmer. Static.

### Empty / 404 / Error States
- **Empty portfolio section (within zoom level):** Text at scale: `— NOTHING HERE —` in Söhne caps `#9A9A9A`, centered. A red hairline `1px solid #FF1E1E` box frames it.
- **404:** Hero text "404" at 360px+, Söhne 900 weight, `#0A0A0A`. Inside the `4` numeral: a recursive "404" at 10% scale — SVG nested. Red: `PAGE NOT FOUND`. Gold: `Return` CTA.
- **Error:** Mono `[ERROR]` in red. Sub-text in `#9A9A9A`. The zoom-target crosshair stays but shows an `×` instead of `+`, red `#FF1E1E`.

### Hover Micro-interactions

| Element | Effect | Duration | Easing |
|---|---|---|---|
| CTA button | Border `#9A9A9A → #FF1E1E`; background: red fills from center `scale: 0 → 1` radially | `300ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Nav link | Underline draw left→right, `2px solid #FF1E1E` | `280ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Section portal (zoom target) | `scale: 1 → 1.04`, `box-shadow: 0 0 0 2px #FF1E1E` | `350ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Gold accent number | `#FFC700` → `#FF1E1E` crossfade | `220ms` | `ease-out` |
| TOC item (fallback nav) | Red bullet scales `1 → 1.5`, text `#0A0A0A → #FF1E1E` | `200ms` | `ease-out` |

### Reduced-motion Respect — V7 Specific
```css
@media (prefers-reduced-motion: reduce) {
  /* DISABLE: recursive scale-and-translate zoom between sections.
     In RecursiveEngine.tsx: useReducedMotion() → render sections as a
     hierarchical TOC (table of contents) layout:
     - Top level: all section headings listed
     - Clicking a heading navigates to that section (standard anchor)
     - No scale transforms at all */

  /* DISABLE: any scale() transforms on section wrappers */
  .recursive-section { transform: none !important; opacity: 1 !important; }

  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 150ms !important;
  }
}
```
**Hierarchical TOC fallback (keyboard + reduced-motion):**
- `RecursiveEngine` always renders a `<nav aria-label="Page sections" class="toc-nav">` in document flow — visually hidden in full-motion mode via `opacity: 0; pointer-events: none`, shown when `prefers-reduced-motion: reduce`.
- TOC items: `<ol>` with `<li><a href="#section-N">Section title</a></li>`. Screen readers always see this nav regardless of motion setting.
- Each section has `id="section-N"` and `aria-label="[section name]"`. RecursiveEngine targets must be real DOM nodes, not computed canvas positions.
- **Critical**: The scale-from-`0.001` technique makes content computationally present but visually microscopic — ensure `aria-hidden` is toggled correctly so only the active section is announced by screen readers.

### Accessibility
- **Ink `#0A0A0A` on off-white `#FCFCFA`:** 19.1:1 — AAA. Body text excellent.
- **Electric red `#FF1E1E` on off-white `#FCFCFA`:** 4.5:1 — passes AA (barely). Use for headings ≥18px and accents. Do NOT use for body text ≤14px.
- **Cool grey `#9A9A9A` on off-white `#FCFCFA`:** 2.9:1 — FAILS AA. Use only for decorative elements (placeholder bars, crosshair opacity). For readable secondary text use `#696969` (4.6:1) or darker.
- **Gold `#FFC700` on off-white `#FCFCFA`:** 1.9:1 — FAILS AA. Use only as an accent color for large display elements (≥48px), never for body or caption text.
- **Focus ring:** `2px solid #FF1E1E`, offset `4px`. Red ring is clearly visible on the light off-white background.
- **Scale transforms on large elements:** Can cause significant content motion visible across the full viewport. This is the highest vestibular risk in the entire V5–V20 set. The reduced-motion fallback must be total — no scale transitions at all, not even subtle ones.

### Key Transition Timings

| Transition | Duration | Easing |
|---|---|---|
| Section zoom-in (scroll-bound advance) | Continuous per `scrollProgress` | `lerp(scale, target, 0.06)` per frame |
| Section N exit (scale 1 → 1000, fade) | Over 40% of scroll window | `ease-in` |
| Section N+1 entry (scale 0.001 → 1) | Over 40% of scroll window | `cubic-bezier(0.16, 1, 0.3, 1)` |
| TOC anchor scroll (fallback) | `scroll-behavior: smooth` | Native browser |
| Hero initial entry | `800ms`, `scale: 0.8 → 1, opacity: 0 → 1` | `cubic-bezier(0.16, 1, 0.3, 1)` |

---

## V8 — Codex

### Custom Cursor
- Default: system cursor. Do not override — the illuminated manuscript aesthetic defers to the browser; scribes used quills, not crosshairs.
- Hover over a folio section: cursor becomes `cursor: text` (I-beam) — as though reading a manuscript.
- Hover over drop cap or sigil: `cursor: zoom-in` — they invite close inspection.
- Hover over CTA: `cursor: pointer`.
- Touch devices: no overrides.

### Selection / Focus Colors
```css
::selection {
  background-color: #D4A04A; /* gold leaf */
  color: #1B1410;             /* ink black */
}

:focus-visible {
  outline: 2px solid #C72A1F; /* vermillion */
  outline-offset: 3px;
  border-radius: 0;
}

/* On vellum backgrounds */
.on-vellum:focus-visible {
  outline: 2px solid #2845A8; /* ultramarine */
  outline-offset: 3px;
}
```

### Scrollbar Styling
```css
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: #F2E8D5; } /* vellum */
::-webkit-scrollbar-thumb {
  background: #D4A04A; /* gold leaf */
  border-radius: 0;
}
::-webkit-scrollbar-thumb:hover { background: #C72A1F; } /* vermillion */

* { scrollbar-width: thin; scrollbar-color: #D4A04A #F2E8D5; }
```

### Loading / Skeleton State
- No loading splash. Content should render from the server (SSR/SSG) — a manuscript is "already written." Use `font-display: block` for UnifrakturCook and Crimson Pro to prevent FOUT at large display sizes.
- If async content (portfolio folios) must load: a hairline `1px solid #D4A04A` bordered rectangle on vellum, no animation. Inside: a small inked cross `✝` (decorative) in `#D4A04A`. Caption below in EB Garamond italic 12px: `"illuminating…"` — aesthetically authentic.
- Never shimmer — shimmer is antithetical to the timeless manuscript aesthetic.

### Empty / 404 / Error States
- **Empty portfolio folio:** Full vellum panel with vermillion ruling at top. Crimson Pro italic centered: `"This folio hath been left blank."` Below in marginalia script (Caveat): `nota bene: no works yet`. Gold-leaf drop cap `E` begins the sentence.
- **404:** Large folio page. UnifrakturCook: `Folio CDIV` (Latin for 404). Crimson Pro body: `"The page thou seekest hath been excised from this codex."` Vermillion marginalia: `† missing`. Gold link: `← Return to the First Folio`.
- **Error:** Vermillion ruled border thickens to `3px`. Marginalia in `#C72A1F`: `[error in transmission]`. Ultramarine link: `Retry illumination`.

### Hover Micro-interactions

| Element | Effect | Duration | Easing |
|---|---|---|---|
| CTA button (vellum + vermillion) | Ink-bleed: `background` fills from a center radial `#C72A1F`, text flips to `#F2E8D5` | `500ms` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (ink-bleed feel) |
| Nav link | Underline draws in via `clip-path`, `2px solid #C72A1F`, `transform-origin: left` | `400ms` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Drop cap / sigil | Subtle gold glow: `text-shadow: 0 0 8px #D4A04A66` | `400ms` | `ease-out` |
| Portfolio folio card | `box-shadow: inset 0 0 0 1px #D4A04A` appears (gold leaf border highlight) | `350ms` | `ease-out` |
| Marginalia text | `opacity: 0.5 → 1.0` on folio hover | `300ms` | `ease-out` |

### Reduced-motion Respect — V8 Specific
```css
@media (prefers-reduced-motion: reduce) {
  /* V8 has minimal motion by design — but verify: */

  /* DISABLE: ink-bleed radial fill on CTA — use instant background swap */
  .btn-codex { transition: background-color 0ms, color 0ms; }

  /* DISABLE: clip-path underline draw — show underline statically */
  a { text-decoration: underline; text-decoration-color: #C72A1F; }

  /* RETAIN: color transitions ≤ 150ms — not vestibular */
  /* NO scroll parallax in V8 — no further disabling needed */
}
```
V8 is the lowest-risk design for reduced-motion users: no scroll-driven 3D, no parallax, no auto-animation. The primary caution is ensuring the ink-bleed radial fill (CSS `radial-gradient` clip animation) is suppressed.

### Accessibility
- **Ink `#1B1410` on vellum `#F2E8D5`:** 14.1:1 — AAA.
- **Vermillion `#C72A1F` on vellum `#F2E8D5`:** 5.8:1 — passes AA for all text sizes.
- **Ultramarine `#2845A8` on vellum `#F2E8D5`:** 7.3:1 — AAA.
- **Gold `#D4A04A` on vellum `#F2E8D5`:** 2.2:1 — FAILS AA. Gold is decorative only (borders, initials, ornaments). Never use as text color.
- **Gold on ink `#1B1410`:** 6.8:1 — AAA. Gold-on-dark is acceptable.
- **Mulberry `#5C2D5E` on vellum `#F2E8D5`:** 5.1:1 — passes AA.
- **Drop caps:** `<span aria-hidden="true">` on the oversized initial letter; full word readable in screen reader via `aria-label` on the `<p>`.
- **UnifrakturCook / blackletter:** Blackletter is notoriously hard to read for dyslexic users. Restrict it to headings ≤ 80 chars total. Body text must remain Crimson Pro / EB Garamond. Add `lang="en"` on the page (helps screen readers).
- **Marginalia:** `<aside aria-label="Marginalia note">` — must be navigable but clearly labeled as supplementary.
- **Ornamental sigils/borders:** `aria-hidden="true"` on all purely decorative SVG/unicode ornaments.
- **Focus ring:** Vermillion `2px`, offset `3px`. High contrast against vellum.

### Key Transition Timings

| Transition | Duration | Easing |
|---|---|---|
| Folio `whileInView` entry | `700ms`, `opacity: 0 → 1, y: 16 → 0` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Drop cap reveal (initial letter) | `900ms`, `opacity: 0 → 1` only (no translate) | `ease-out` |
| Marginalia appear on folio hover | `300ms`, `opacity: 0.5 → 1` | `ease-out` |
| Page route transition | `400ms` vellum-fade (opacity on page wrapper) | `ease-in` / `ease-out` |
| Ink-bleed CTA hover | `500ms` radial fill | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |

---

## V9 — Ticker

### Custom Cursor
- Default: `cursor: none`. Replaced with a `|` blinking vertical bar, 2×16px, `#00FF41` (phosphor green), blink `1s step-start infinite` — a literal text cursor in the terminal.
- Hover over a ticker row: cursor becomes a `→` arrow glyph in `#00FF41`, 12px, `JetBrains Mono`.
- Hover over chart: crosshair `cursor: crosshair`.
- On `mousedown`: `|` bar squishes to `2×8px` for `80ms step-end`.
- Touch devices: `cursor: auto`.

### Selection / Focus Colors
```css
::selection {
  background-color: #00FF41; /* phosphor green */
  color: #000000;
}

:focus-visible {
  outline: 1px solid #00FF41;
  outline-offset: 0;
  border-radius: 0; /* terminal — no radius */
}

/* For amber context elements */
.ticker-amber:focus-visible {
  outline: 1px solid #FFA500;
  outline-offset: 0;
}
```

### Scrollbar Styling
```css
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: #000; }
::-webkit-scrollbar-thumb { background: #222; }
::-webkit-scrollbar-thumb:hover { background: #00FF41; }

* { scrollbar-width: thin; scrollbar-color: #222 #000; }
```

### Loading / Skeleton State
- Black `#000` background. Full-viewport fake boot ticker:
  ```
  KPTX  ——————  LOADING...
  [████████░░░░]  67%
  CONNECTING TO MARKET DATA...
  ```
  Each line in `IBM Plex Mono` 12px `#00FF41`, appearing character by character at `20ms/char`. Percentage counter counts up from 0–100 over `1.2s`. When ready: ticker bar content snaps in `step-end`, 0ms delay.
- Data skeleton rows: `background: #111` bars, `1px solid #222` border, no shimmer. Static.

### Empty / 404 / Error States
- **Empty section:** `> NO_DATA · 0 items ·` in `#00FF41`. Below: `[  AWAITING FEED  ]` flashing at `1s` intervals. CTA: `SUBMIT PROJECT` styled as `[ SUBMIT ]`.
- **404:** Full black. ASCII block art `404` in phosphor green (block characters). Below: `bash: route not found (exit 404)`. Blinking cursor `▮`. Link: `$ cd / --home`.
- **Network error / feed failure:** `FEED_DISCONNECTED` in `#FF3030` (alert red). Below in amber: `retry in 30s...` countdown. Retry button: `[ RECONNECT ]` in amber border.

### Hover Micro-interactions

| Element | Effect | Duration | Easing |
|---|---|---|---|
| Ticker row | `background: #111` highlight; no text color change | `60ms` | `step-end` |
| `[ GET STARTED ]` button | Full invert: `background: #00FF41, color: #000` | `80ms` | `step-end` |
| Stat number (hero KPI) | Color pulses to `#FFF` for `200ms` then returns to `#00FF41` | `200ms` | `ease-out` |
| Chart bar (on hover) | Brightness: `filter: brightness(1.4)` | `100ms` | `ease-out` |
| Status bar ticker segment | `opacity: 0.7 → 1.0` | `80ms` | `step-end` |
| Nav link | Phosphor-green `1px` underline instant-on | `60ms` | `step-end` |

### Reduced-motion Respect — V9 Specific
```css
@media (prefers-reduced-motion: reduce) {
  /* DISABLE: horizontal scrolling ticker — show as static table instead */
  .ticker-strip {
    animation: none;
    overflow-x: auto;
    white-space: nowrap;
  }

  /* DISABLE: number flip animations (rolling odometer effect) */
  .number-flip { animation: none; }

  /* DISABLE: chart redraw animations */
  .chart-bar { transition: none; }

  /* DISABLE: cursor blink — show solid cursor */
  #cursor, .blink-cursor { animation: none; opacity: 1; }

  /* DISABLE: loading ticker boot sequence — show content immediately */
  .boot-sequence { display: none; }

  /* RETAIN: color hover states (step-end, ≤ 100ms) — not vestibular */

  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

### Accessibility — Color-only Information Warning (CRITICAL)
V9 uses green (`#00FF41`) for positive price movement and red (`#FF3030`) for negative — a direct "green = up / red = down" financial convention. **This is color-only information and fails WCAG SC 1.4.1.** Remediation required:
- Positive values: prefix with `▲` triangle glyph and text `+` symbol. Example: `▲ +2.3%`.
- Negative values: prefix with `▼` triangle glyph and text `−` symbol. Example: `▼ −1.7%`.
- The `▲`/`▼` glyphs must have `aria-label="up"` / `aria-label="down"` on their wrapping `<span>`.
- Alternatively wrap in `<span role="img" aria-label="Price increased by 2.3 percent">▲ +2.3%</span>`.
- Ticker table: must be a real `<table>` with `<th scope="col">` headers: `Symbol | Price | Change | % Change | Volume`.
- `aria-sort` attribute on sortable columns.
- Screen reader summary: `<caption class="sr-only">Live market data for KPT services</caption>`.

Additional contrast checks:
- **Phosphor green `#00FF41` on black `#000`:** 15.3:1 — AAA.
- **Amber `#FFA500` on black `#000`:** 9.1:1 — AAA.
- **Alert red `#FF3030` on black `#000`:** 5.7:1 — passes AA. Acceptable for the ▼ glyph and label.
- **Data white `#E8E8E8` on black `#000`:** 17.8:1 — AAA.
- **Grid grey `#222` on black `#000`:** 1.2:1 — decorative borders only, never text.
- **Focus ring:** `1px solid #00FF41`, offset `0`. Terminal-flush.
- **Auto-updating content:** Ticker numbers update live. Wrap in `aria-live="off"` for the scrolling strip (constant updates would be catastrophic for screen readers). Provide a static `<table>` below the strip with `aria-live="polite"` that updates at most every 30 seconds.

### Key Transition Timings

| Transition | Duration | Easing |
|---|---|---|
| Horizontal ticker scroll | `40s linear infinite` | `linear` |
| Number flip (odometer) | `120ms` per digit | `ease-in-out` |
| Chart bar redraw | `800ms` on data update | `ease-out` |
| Boot sequence per-line | `20ms/char`, lines staggered `300ms` after previous line completes | JS `setInterval` |
| Section `whileInView` | `opacity: 0 → 1` only, `150ms step-end` | `step-end` |
| Route transition | `80ms` fade-out / `80ms` fade-in | `step-end` |

---

## V10 — Atelier

### Custom Cursor
- Default: `cursor: none`. Replaced with a 6×6px dot, `#1A1612` (ink), `border-radius: 50%`. Small and precise — couture is restrained.
- Hover over portfolio image: dot expands to 64×64px ring, `border: 1px solid #1A1612`, fill transparent; label `VIEW` in Helvetica Now (Inter fallback) 8px ALL CAPS centers inside the ring. Transition `300ms cubic-bezier(0.16, 1, 0.3, 1)`.
- Hover over CTA button: dot → 48×48px ring, `border: 1px solid #C9A861` (gold foil).
- Hover over text link: cursor reverts to `text` (I-beam).
- Touch devices: `cursor: auto`.

### Selection / Focus Colors
```css
::selection {
  background-color: #C9A861; /* gold foil */
  color: #1A1612;             /* ink */
}

:focus-visible {
  outline: 1px solid #1A1612;
  outline-offset: 4px;
  border-radius: 0; /* couture is rectilinear */
}

/* On dark ink or oxblood backgrounds */
.on-dark:focus-visible {
  outline: 1px solid #F4E4DC; /* champagne pink */
  outline-offset: 4px;
}
```

### Scrollbar Styling
```css
::-webkit-scrollbar { width: 2px; }
::-webkit-scrollbar-track { background: #F8F2EA; } /* cream */
::-webkit-scrollbar-thumb { background: rgba(26,22,18,0.2); }
::-webkit-scrollbar-thumb:hover { background: #C9A861; }

* { scrollbar-width: thin; scrollbar-color: rgba(26,22,18,0.2) #F8F2EA; }
```

### Loading / Skeleton State
- No splash. Pure white `#F8F2EA` viewport renders immediately. Use `font-display: block` for Playfair Display to prevent FOUT at large lookbook headlines.
- Portfolio image placeholders: `#EDE4D6` fill (warm cream placeholder matching brand palette). No shimmer — couture does not shimmer. A `1px solid #C9A86133` border only.
- If async loading: a fine italic caption below the placeholder in Playfair italic 11px `#3A3530`: `"Loading…"` — nothing else.

### Empty / 404 / Error States
- **Empty lookbook:** Full `#F8F2EA`. Playfair Display ultra-thin italic centered: `"The atelier is empty."` Below in Helvetica Now 9px ALL CAPS wide-tracking: `NO PIECES IN COLLECTION`. Gold rule `1px #C9A861` above and below.
- **404:** Lookbook spread. Left folio: large `404` in Playfair ultra-thin `#F4E4DC` on oxblood `#5E1A1A` background. Right folio: `This page has been archived.` in Playfair italic. Gold foil link: `Return to the Collection`.
- **Error:** Minimal. A single `1px solid #C9A861` horizontal rule. Below: Helvetica Now 9px: `UNAVAILABLE — PLEASE RETRY`. No color change — couture restraint.

### Hover Micro-interactions

| Element | Effect | Duration | Easing |
|---|---|---|---|
| Portfolio image | `scale: 1.0 → 1.02`; grain overlay `opacity: 0.3 → 0.5` | `1200ms` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — deliberately slow, luxurious |
| CTA button (outlined) | Gold fill sweeps in from left via `clip-path`; text color flips `#1A1612 → #F8F2EA` | `600ms` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Nav link | Underline draw: `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)`, `1px solid #1A1612` | `400ms` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Section heading (Playfair) | `letter-spacing` widens `0.01em → 0.04em` | `500ms` | `ease-out` |
| Gold rule divider | `scaleX: 0 → 1`, `transform-origin: left` on scroll-in | `800ms` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |

### Reduced-motion Respect — V10 Specific
```css
@media (prefers-reduced-motion: reduce) {
  /* DISABLE: image scale on hover — show at scale(1.0) permanently */
  .lookbook-image { transform: none !important; transition: none; }

  /* DISABLE: clip-path underline draw — show underline statically */
  a, .nav-link {
    text-decoration: underline;
    text-decoration-color: #1A1612;
  }

  /* DISABLE: letter-spacing animation */
  .atelier-heading { transition: none; }

  /* RETAIN: gold fill sweep on CTA (opacity-only version: just show gold bg) */
  .btn-atelier { background: #C9A861; color: #1A1612; transition: none; }

  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0ms !important;
  }
}
```

### Accessibility
- **Ink `#1A1612` on champagne pink `#F4E4DC`:** 13.1:1 — AAA.
- **Ink `#1A1612` on cream `#F8F2EA`:** 14.3:1 — AAA.
- **Gold `#C9A861` on cream `#F8F2EA`:** 2.8:1 — FAILS AA. Gold is DECORATIVE ONLY. Never use as body or caption text color.
- **Gold `#C9A861` on ink `#1A1612`:** 5.9:1 — passes AA. Gold on dark is acceptable for headings.
- **Oxblood `#5E1A1A` on champagne `#F4E4DC`:** 8.2:1 — AAA.
- **Charcoal `#3A3530` on champagne `#F4E4DC`:** 10.1:1 — AAA. Good secondary text color.
- **Focus ring:** `1px solid #1A1612`, offset `4px`. Thin but high-contrast on cream/champagne.
- **The large-cursor `VIEW` ring:** Ensure it does not obscure focus rings on interactive elements underneath. Apply `pointer-events: none` and `z-index: 9000` (below modals, above content).
- **Image alt text:** Portfolio photos must have descriptive `alt`. Example: `alt="Screenshot of [client] homepage redesign, featuring hero banner and navigation."`.
- **Slow hover animations (1200ms):** These are hover-only, not auto-playing. Not a reduced-motion concern for auto-play, but do disable on reduced-motion per above.

### Key Transition Timings

| Transition | Duration | Easing |
|---|---|---|
| Hero text entry (stagger words) | `800ms` each, `80ms` stagger, `y: 12 → 0, opacity: 0 → 1` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| `whileInView` section reveal | `1000ms`, `opacity: 0 → 1` only | `ease-out` |
| Portfolio image hover scale | `1200ms` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Gold rule draw-in (scroll) | `800ms` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Route transition | `600ms` cream-fade | `ease-in` / `ease-out` |

---

## V11 — Architectural

### Custom Cursor
- Default: `cursor: crosshair` — drafting table convention; no override needed.
- Hover over dimension callout / annotation: cursor becomes `cursor: zoom-in`.
- Hover over CTA: `cursor: pointer`.
- Hover over technical line-drawing plate: a 2-axis crosshair SVG (`#3D8DBF` cyan dim, 32×32px, `1px` stroke) tracks the mouse, `pointer-events: none`. Snaps to nearest `8px` grid point via `Math.round(x/8)*8`.
- Touch devices: `cursor: auto`.

### Selection / Focus Colors
```css
::selection {
  background-color: #3D8DBF; /* cyan dim */
  color: #F5F2E8;             /* paper grain */
}

:focus-visible {
  outline: 1px solid #3D8DBF;
  outline-offset: 2px;
  border-radius: 0;
}

/* On light paper-grain backgrounds */
.on-paper:focus-visible {
  outline: 1px solid #0E1E2E; /* blueprint blue-black */
  outline-offset: 2px;
}
```

### Scrollbar Styling
```css
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: #0E1E2E; }
::-webkit-scrollbar-thumb { background: #3D8DBF; border-radius: 0; }
::-webkit-scrollbar-thumb:hover { background: #E8EAEC; }

* { scrollbar-width: thin; scrollbar-color: #3D8DBF #0E1E2E; }
```

### Loading / Skeleton State
- Blueprint dark `#0E1E2E` viewport. A single 1px `#3D8DBF` horizontal line draws across the screen from left to right over `800ms linear` — the "drawing table" sweep. Once complete: content appears.
- Section skeleton: no shimmer. `1px` line boxes in `#3D8DBF1A` (very faint cyan) showing the wireframe layout. Dimension leader lines `---[?]---` in `#3D8DBF` 10px Roboto Mono where text will appear.

### Empty / 404 / Error States
- **Empty portfolio plate:** Full blueprint panel. Dashed rectangle `border: 1px dashed #3D8DBF`. Center in Roboto Mono 10px ALL CAPS: `PLATE VACANT · NO DRAWINGS ON FILE`. Dimension callout: `W: TBD · H: TBD`.
- **404:** Isometric wireframe cube drawn via SVG, all `#3D8DBF` 1px lines. Label: `ELEVATION 404 — STRUCTURE NOT FOUND`. Roboto body: `This section has not been drafted.` Cyan link: `← Return to plan`.
- **Error:** `[DRAWING ERROR]` in `#D03030` (red detail). Sub: `LOAD FAILED · CHECK CONNECTION`. Retry styled as a dimension callout box: `[RETRY →]`.

### Hover Micro-interactions

| Element | Effect | Duration | Easing |
|---|---|---|---|
| Dimension callout | Leader lines extend outward `+8px` each side; numbers brighten `#3D8DBF → #E8EAEC` | `300ms` | `ease-out` |
| CTA button | Border brightens `#3D8DBF → #E8EAEC`; diagonal `1px` hatch pattern overlays fill | `280ms` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Nav link | Underline draw, `1px solid #3D8DBF`, scaleX | `260ms` | `ease-out` |
| Portfolio plate | Dimension overlay grid fades in `opacity: 0 → 0.6`; plate lifts `translateY(-2px)` | `350ms` | `ease-out` |
| Technical line drawing | On scroll-in: lines draw via `stroke-dashoffset` animation | `1200ms` | `ease-in-out` |

### Reduced-motion Respect — V11 Specific
```css
@media (prefers-reduced-motion: reduce) {
  /* DISABLE: stroke-dashoffset line draw animations */
  svg line, svg path, svg polyline {
    stroke-dashoffset: 0 !important;
    animation: none !important;
  }

  /* DISABLE: dimension line extend on hover */
  .dimension-callout { transition: none; }

  /* DISABLE: loading line sweep — show content immediately */
  .loading-sweep { display: none; }

  /* RETAIN: color/brightness hover transitions ≤ 200ms */
}
```

### Accessibility
- **Drafting white `#E8EAEC` on blueprint `#0E1E2E`:** 12.8:1 — AAA.
- **Cyan dim `#3D8DBF` on blueprint `#0E1E2E`:** 3.5:1 — passes AA for large text (≥18px) only. Not for body copy.
- **Red `#D03030` on blueprint `#0E1E2E`:** 4.5:1 — passes AA for headings ≥18px.
- **Paper grain `#F5F2E8` on blueprint `#0E1E2E`:** 15.7:1 — AAA.
- **Cyan on paper grain `#F5F2E8`:** 2.7:1 — FAILS AA. Never use cyan dim as text on light backgrounds.
- **Focus ring:** `1px solid #3D8DBF`, offset `2px`. Consider thickening to `2px solid` for minimum 3:1 focus indicator contrast.
- **SVG line drawings:** All decorative SVGs must have `aria-hidden="true"`. SVGs containing information (isometric portfolio renders) need `role="img"` and `aria-label`.
- **ALL CAPS labels:** Fine for short Roboto Mono labels (≤6 words). Never use `text-transform: uppercase` on body paragraphs — impacts readability for dyslexic users.
- **Dimension callouts:** Values must be real DOM text nodes. SVG `<text>` elements are not reliably read by screen readers without explicit `aria-label` on the parent `<g>`.

### Key Transition Timings

| Transition | Duration | Easing |
|---|---|---|
| SVG line draw (on scroll-in) | `1200ms`, `stroke-dashoffset` full → 0 | `ease-in-out` |
| Dimension overlay fade-in | `350ms` | `ease-out` |
| Loading line sweep | `800ms` | `linear` |
| `whileInView` reveal | `600ms`, `opacity: 0 → 1` | `ease-out` |
| Route transition | `300ms` blueprint-dark fade | `ease-in` / `ease-out` |

---

## V12 — Specimen

### Custom Cursor
- Default: `cursor: text` sitewide — we are reading a type specimen.
- Hover over a large letterform (interactive specimen glyph): `cursor: zoom-in`.
- Hover over CTA: `cursor: pointer`.
- Touch: `cursor: auto`.

### Selection / Focus Colors
```css
::selection {
  background-color: #7A2D26; /* malted red */
  color: #FAFAFA;
}

:focus-visible {
  outline: 2px solid #7A2D26;
  outline-offset: 3px;
  border-radius: 0;
}
```

### Scrollbar Styling
```css
::-webkit-scrollbar { width: 2px; }
::-webkit-scrollbar-track { background: #FAFAFA; }
::-webkit-scrollbar-thumb { background: #0A0A0A; border-radius: 0; }
::-webkit-scrollbar-thumb:hover { background: #7A2D26; }

* { scrollbar-width: thin; scrollbar-color: #0A0A0A #FAFAFA; }
```

### Loading / Skeleton State
- White `#FAFAFA` viewport. Center: A single Fraunces character `K` at 240px, `#0A0A0A`, fades in `opacity: 0 → 1` over `600ms ease-out`. No spinner.
- Use `font-display: block` for Fraunces variable (opsz 9–144). Without this, the 720px hero letterform will FOUT catastrophically.
- Content skeletons: `#F0F0F0` bars, no shimmer, no animation. Static geometry.

### Empty / 404 / Error States
- **Empty portfolio:** Fraunces opsz 144 ultra-light: `∅` centered at 240px. Below in JetBrains Mono 11px: `/* no specimens loaded */`.
- **404:** Fraunces 900 weight at max opsz: `404` at 480px+ filling the viewport. JetBrains Mono: `specimen not found`. Malted red link: `← back to index`.
- **Error:** `!` in Fraunces 900, 360px, `#7A2D26`. JetBrains Mono: `load_error: retry?`. Red link: `retry`.

### Hover Micro-interactions

| Element | Effect | Duration | Easing |
|---|---|---|---|
| Large specimen letterform | `font-variation-settings: 'opsz' 9 → 'opsz' 144` — optical size morphs; character "opens up" | `600ms` | `ease-in-out` |
| CTA button | Red border fills: `background: #7A2D26, color: #FAFAFA` | `300ms` | `ease-out` |
| Nav link | Malted red underline draw, `2px` | `280ms` | `ease-out` |
| Size specimen label | `#0A0A0A → #7A2D26` | `200ms` | `ease-out` |
| Technical label row | `opacity: 0.5 → 1.0` | `200ms` | `ease-out` |

### Reduced-motion Respect — V12 Specific
```css
@media (prefers-reduced-motion: reduce) {
  /* DISABLE: font-variation-settings animation on hover */
  .specimen-glyph {
    transition: none;
    font-variation-settings: 'opsz' 72, 'wght' 400;
  }

  /* DISABLE: scroll reveal for letterforms — show immediately */
  .letterform-reveal { opacity: 1 !important; transform: none !important; }

  /* RETAIN: color transitions ≤ 200ms */
}
```

### Accessibility
- **Ink `#0A0A0A` on white `#FAFAFA`:** 19.1:1 — AAA.
- **Malted red `#7A2D26` on white `#FAFAFA`:** 7.4:1 — AAA for all text sizes.
- **Focus ring:** `2px solid #7A2D26`, offset `3px`. AAA contrast against white.
- **Fraunces at extreme optical sizes:** Screen readers read the text content regardless of visual size. Ensure hero letterforms are in real `<h1>`/`<h2>` elements, not just `<div>`s with large `font-size`.
- **Decorative letterforms vs. semantic headings:** A 720px `K` used as texture must be `aria-hidden="true"`. The real heading must exist elsewhere in the DOM (can be visually overlapping).
- **Portfolio plates "treated as type specimens":** Still require descriptive `alt` text — `alt="Project name: client homepage redesign"`.
- **JetBrains Mono technical labels:** Real DOM text nodes required; avoid SVG `<text>` without aria wrappers.
- **`font-variation-settings` animation:** Not a vestibular risk (no translate/scale), but can cause optical discomfort at extreme shifts. Restrict the opsz range on hover to `36 → 144` rather than `9 → 144` to reduce visual shock.

### Key Transition Timings

| Transition | Duration | Easing |
|---|---|---|
| Letterform mount | `600ms`, `opacity: 0 → 1` | `ease-out` |
| `font-variation-settings` hover morph | `600ms` | `ease-in-out` |
| `whileInView` text reveal | `500ms`, `opacity: 0 → 1, y: 8 → 0` | `ease-out` |
| CTA fill | `300ms` | `ease-out` |
| Route transition | `400ms` white-fade | `ease-in` / `ease-out` |

---

## V13 — Conversation

### Custom Cursor
- Default: system cursor. Chat maps to browser conventions — no override.
- Hover over CTA / send button: `cursor: pointer`.
- Hover over inline link in agent response: `cursor: pointer`.
- Touch: no overrides.

### Selection / Focus Colors
```css
::selection {
  background-color: #6B4EE6; /* accent purple */
  color: #FAFAFA;
}

:focus-visible {
  outline: 2px solid #6B4EE6;
  outline-offset: 2px;
  border-radius: 8px; /* chat-bubble radius */
}

/* On agent-surface dark backgrounds */
.agent-surface:focus-visible {
  outline: 2px solid #00C896; /* system green */
  outline-offset: 2px;
  border-radius: 8px;
}
```

### Scrollbar Styling
```css
/* Chat scroll container — not the page scroll */
.chat-container::-webkit-scrollbar { width: 3px; }
.chat-container::-webkit-scrollbar-track { background: #FAFAFA; }
.chat-container::-webkit-scrollbar-thumb { background: #E5E5E8; border-radius: 2px; }
.chat-container::-webkit-scrollbar-thumb:hover { background: #6B4EE6; }

.chat-container { scrollbar-width: thin; scrollbar-color: #E5E5E8 #FAFAFA; }
```

### Loading / Skeleton State
- Chat interface renders immediately (SSR). Agent "typing" indicator shows before first message: three dots in `#6B4EE6`, animating `translateY: 0 → -4px → 0` in sequence, `400ms` per cycle, stagger `100ms`, `ease-in-out infinite`.
- Skeleton message bubbles: `#E5E5E8` filled rounded rectangles (`border-radius: 12px`), no shimmer.
- Max typing indicator wait: `3s` — then show an error message in the chat.

### Empty / 404 / Error States
- **Empty portfolio response:** Agent bubble: `"I don't have any projects to share right now — but the team is building. Drop a note at /start and we'll be in touch."` Purple CTA inline in bubble.
- **404:** Agent bubble: `"Hmm, I can't find that page. You might have taken a wrong turn."` System indicator: `● PAGE NOT FOUND (404)` in green. User bubble: `"Take me home →"`.
- **Network error:** Typing indicator times out. System message (centered, `#9A9A9A`): `Connection lost. Tap to retry.`

### Hover Micro-interactions

| Element | Effect | Duration | Easing |
|---|---|---|---|
| CTA button | `#6B4EE6 → #7B5EF6`; `scale: 1 → 1.02` | `200ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Agent message bubble | `box-shadow: 0 2px 8px #6B4EE622 → 0 4px 16px #6B4EE633` | `250ms` | `ease-out` |
| Nav link | Purple underline draw, `2px`, scaleX | `280ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Inline text link in bubble | Green `#00C896` underline instant | `150ms` | `ease-out` |

### Reduced-motion Respect — V13 Specific
```css
@media (prefers-reduced-motion: reduce) {
  /* DISABLE: typing indicator bounce */
  .typing-dot { animation: none; opacity: 1; }

  /* DISABLE: message slide-up reveal */
  .message-reveal { transform: none !important; animation: none !important; }

  /* DISABLE: bubble scale on CTA hover */
  .btn-conversation { transform: none !important; }

  /* RETAIN: opacity-only transitions ≤ 200ms */
}
```

### Accessibility
- **Ink `#1A1A2E` on soft white `#FAFAFA`:** 15.8:1 — AAA.
- **Soft white `#FAFAFA` on agent surface `#1A1A2E`:** 15.8:1 — AAA.
- **Accent purple `#6B4EE6` on soft white `#FAFAFA`:** 5.3:1 — passes AA.
- **System green `#00C896` on agent surface `#1A1A2E`:** 8.1:1 — AAA.
- **Soft grey `#E5E5E8` as bubble background:** Body text inside must use `#1A1A2E`, not mid-grey.
- **Focus ring:** `2px solid #6B4EE6`, offset `2px`, `border-radius: 8px` matching bubble shape.
- **Chat as navigation pattern:** Each "section" delivered as a chat exchange. Screen readers must navigate by heading (`<h2>`) within agent responses. Each substantive response should contain a semantic heading.
- **Typing indicator:** Container must be `aria-live="polite"`. Announce `"KPT is typing"` text node. Dots animation is `aria-hidden="true"`.
- **Message list:** `role="log"` on chat container with `aria-live="polite" aria-atomic="false"` — only new messages announced.
- **Auto-scroll:** After new content appears, programmatically scroll only if user is already at bottom. Never hijack scroll if user is reading older messages.
- **Chat input field:** Must have `<label>` (even if visually hidden), `aria-label="Message"`, and `autocomplete="off"` if appropriate.

### Key Transition Timings

| Transition | Duration | Easing |
|---|---|---|
| Message slide-up reveal | `350ms`, `y: 16 → 0, opacity: 0 → 1` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Typing dots bounce cycle | `400ms`, `100ms` stagger | `ease-in-out` |
| Typing dots appear | `200ms` fade-in | `ease-out` |
| Typing dots disappear | `150ms` fade-out | `ease-in` |
| Route transition | `300ms` fade | `ease-in` / `ease-out` |

---

## V14 — Cassette

### Custom Cursor
- Default: `cursor: none`. Replaced with a `◉` target reticle in `#C8C8CC` (brushed aluminum), 16×16px SVG, `pointer-events: none`.
- Hover over knob or button: cursor becomes `↻` circular arrow in `#C8C8CC` 20px — suggests rotation/press.
- Hover over tape window (portfolio VU section): cursor becomes `▶` in `#FF2D2D` (LED red).
- Hover over CTA: system `cursor: pointer`.
- Touch: `cursor: auto`.

### Selection / Focus Colors
```css
::selection {
  background-color: #8B5A2B; /* tape ribbon brown */
  color: #F5EBD0;             /* ivory label */
}

:focus-visible {
  outline: 2px solid #C8C8CC; /* brushed aluminum */
  outline-offset: 3px;
  border-radius: 2px;
}

/* On dark walnut backgrounds */
.on-walnut:focus-visible {
  outline: 2px solid #F5EBD0;
  outline-offset: 3px;
}
```

### Scrollbar Styling
```css
::-webkit-scrollbar { width: 6px; } /* chunky — on brand */
::-webkit-scrollbar-track { background: #0F0A05; }
::-webkit-scrollbar-thumb {
  background: #3D2817;
  border-radius: 3px;
  border: 1px solid #8B5A2B;
}
::-webkit-scrollbar-thumb:hover { background: #8B5A2B; }

* { scrollbar-width: thin; scrollbar-color: #3D2817 #0F0A05; }
```

### Loading / Skeleton State
- Oxide black `#0F0A05` viewport. Two VU meter bars bounce from 0 to full height alternately over `600ms ease-in-out`. VT323 12px `#F5EBD0`: `LOADING...`. Fade in `400ms` on ready.
- Section skeletons: walnut `#3D2817` fill bars with `1px solid #8B5A2B` borders. Static.

### Empty / 404 / Error States
- **Empty portfolio (tape window):** `[ NO TAPE ]` in VT323 LED red `#FF2D2D`. Caveat label: `"side A — blank"`. VU meters flatline.
- **404:** Cassette body with cracked label. VT323: `TRACK 404 — NOT FOUND`. Caveat: `"This tape has been recorded over."` LED red CTA: `[ REWIND ]`.
- **Error:** VU meters redline at 100%. VT323: `ERROR — SIGNAL CLIPPING`. `[ RETRY ]` button.

### Hover Micro-interactions

| Element | Effect | Duration | Easing |
|---|---|---|---|
| Tape spool (SVG) | `rotate(360deg)` continuous on hover | `2000ms` | `linear` |
| VU meter bar | `scaleY: 0.4 → 1.0 → 0.6` random bounce | `400ms` per beat | `ease-in-out` |
| Knob element | `rotate: 0 → 15deg` | `300ms` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| CTA button | `box-shadow: inset 0 -3px 0 #0F0A05 → inset 0 -1px 0 #0F0A05` — physical press | `120ms` | `ease-in` |
| Nav link | Ivory underline draw, `2px`, scaleX | `280ms` | `ease-out` |
| Portfolio card | `translateY(-3px)`, walnut shadow deepens | `300ms` | `ease-out` |

### Reduced-motion Respect — V14 Specific
```css
@media (prefers-reduced-motion: reduce) {
  /* DISABLE: tape spool rotation */
  .tape-spool { animation: none !important; transform: none !important; }

  /* DISABLE: VU meter bounce */
  .vu-meter-bar { animation: none !important; height: 60% !important; }

  /* DISABLE: knob rotation on hover */
  .cassette-knob { transform: none !important; transition: none; }

  /* DISABLE: LED blink animations */
  .led-indicator { animation: none; opacity: 1; }

  /* RETAIN: box-shadow press-down on CTA (≤ 120ms) — tactile, not vestibular */
}
```

### Accessibility
- **Ivory `#F5EBD0` on oxide black `#0F0A05`:** 16.9:1 — AAA.
- **Aluminum `#C8C8CC` on oxide black `#0F0A05`:** 11.8:1 — AAA.
- **LED red `#FF2D2D` on oxide black `#0F0A05`:** 5.3:1 — passes AA. Short labels and alerts only.
- **Tape brown `#8B5A2B` on oxide black `#0F0A05`:** 3.8:1 — AA large text only. Not for body copy.
- **Ivory `#F5EBD0` on walnut `#3D2817`:** 9.7:1 — AAA. Label text on cassette body.
- **Focus ring:** `2px solid #C8C8CC`, offset `3px`. Aluminum ring — visible on dark walnut.
- **Skeuomorphic controls (knobs):** Must be real `<button>` elements. Knob = `aria-label="Volume control"`. Draggable knob = `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- **VU meters:** `aria-hidden="true"` if decorative. If conveying actual data levels, provide `aria-label` on the container.
- **VT323 pixel font readouts:** Keep to 2–4 words max. Wrap in `aria-label` on container for clean screen reader output.
- **Color-only warning:** Any red LED indicator must include a text label alongside: `● ERROR` not just a red circle.

### Key Transition Timings

| Transition | Duration | Easing |
|---|---|---|
| Spool rotation | `2000ms` per revolution | `linear` |
| VU meter beat | `400ms` per cycle | `ease-in-out` |
| Knob hover | `300ms` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| CTA press-down | `120ms` (down) / `200ms` (release) | `ease-in` / `ease-out` |
| Section `whileInView` | `500ms`, `opacity: 0 → 1, y: 12 → 0` | `ease-out` |
| Route transition | `400ms` oxide-black fade | `ease-in` / `ease-out` |

---

## V15 — Atlas

### Custom Cursor
- Default: compass crosshair SVG `cursor: url('/cursors/compass-crosshair.svg') 12 12, crosshair`. SVG: 24×24px compass rose, `#3D2817` lines.
- Hover over portfolio map pin: `cursor: pointer` + pin scales `1.0 → 1.2`.
- Hover over contour line region: `cursor: zoom-in`.
- Touch: `cursor: auto`.

### Selection / Focus Colors
```css
::selection {
  background-color: #A0432A; /* accent rust */
  color: #F4EFE3;             /* cartographer white */
}

:focus-visible {
  outline: 2px solid #A0432A;
  outline-offset: 3px;
  border-radius: 1px;
}

.on-dark-region:focus-visible {
  outline: 2px solid #F4EFE3;
  outline-offset: 3px;
}
```

### Scrollbar Styling
```css
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #F4EFE3; }
::-webkit-scrollbar-thumb { background: #3D2817; border-radius: 0; }
::-webkit-scrollbar-thumb:hover { background: #A0432A; }

* { scrollbar-width: thin; scrollbar-color: #3D2817 #F4EFE3; }
```

### Loading / Skeleton State
- Cartographer white `#F4EFE3` viewport. Concentric contour-line ovals draw outward from center via `stroke-dashoffset`, `stroke: #3D281733`, over `1200ms ease-out`. Once ready: map pins drop in.
- Portfolio pin skeletons: `#D9D0C2` circles. No animation.

### Empty / 404 / Error States
- **Empty portfolio map:** Contour lines but no pins. Center callout: `NO SITES PLOTTED` in JetBrains Mono 11px `#3D2817`. Coordinate: `0.0000° N · 0.0000° E`.
- **404:** Ocean blue `#3D6E94` fill region. Callout: `UNMAPPED TERRITORY · REF: 404`. EB Garamond italic: `"This region has not been surveyed."` Rust link: `← Return to known territories`.
- **Error:** Rust `#A0432A` elevation badge at center: `ELEVATION: ERROR`. Mono: `Signal lost at this coordinate.` Retry as a pin-drop button.

### Hover Micro-interactions

| Element | Effect | Duration | Easing |
|---|---|---|---|
| Map pin | `translateY(-4px)` + tooltip `opacity: 0 → 1` | `300ms` / `200ms` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Contour line region | `opacity: 0.6 → 0.9`, fill darkens | `400ms` | `ease-out` |
| CTA button | Rust fill left→right `clip-path`; text flips white | `350ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Nav link | Rust underline draw | `280ms` | `ease-out` |
| Elevation badge | `scale: 1 → 1.08` + `box-shadow` deepen | `300ms` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

### Reduced-motion Respect — V15 Specific
```css
@media (prefers-reduced-motion: reduce) {
  /* DISABLE: contour line draw animation */
  .contour-line { stroke-dashoffset: 0 !important; animation: none !important; }

  /* DISABLE: map pin drop bounce */
  .map-pin { animation: none !important; transform: none !important; opacity: 1 !important; }

  /* DISABLE: loading contour sweep */
  .loading-contour { display: none; }

  /* RETAIN: tooltip fade (opacity only, ≤ 200ms) */
}
```

### Accessibility
- **Contour brown `#3D2817` on cartographer white `#F4EFE3`:** 12.7:1 — AAA.
- **Rust `#A0432A` on cartographer white `#F4EFE3`:** 5.3:1 — passes AA for all text.
- **Forest green `#2D5A3F` on cartographer white `#F4EFE3`:** 7.6:1 — AAA.
- **Ocean blue `#3D6E94` on cartographer white `#F4EFE3`:** 3.9:1 — AA large text only. Not for body copy.
- **Focus ring:** `2px solid #A0432A`, offset `3px`. Rust ring stands out on the light map.
- **Color-coded map pins:** Industry-color pins fail WCAG SC 1.4.1 if color is the only differentiator. Add a text label or icon inside each pin, plus a tooltip with the category name.
- **Map navigation for keyboard users:** Portfolio items on the map must have a parallel `<ul>` list (visually hidden or in an accessible aside) with one `<a>` per project. Screen readers and keyboard users navigate this list.
- **SVG map background:** `aria-hidden="true"`. Labeled regions with meaning need `role="img"` and `aria-label` on the parent `<g>`.
- **Coordinate/elevation labels:** Must be real DOM text. SVG `<text>` requires explicit `aria-label` on parent `<g>` to be reliably announced.

### Key Transition Timings

| Transition | Duration | Easing |
|---|---|---|
| Contour line draw | `1200ms` | `ease-out` |
| Map pin drop | `400ms`, `y: -20 → 0`, spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Pin tooltip appear | `200ms`, `opacity: 0 → 1` | `ease-out` |
| Section scroll-in | `700ms`, `opacity: 0 → 1` | `ease-out` |
| Route transition | `400ms` cartographer-white fade | `ease-in` / `ease-out` |

---

## V16 — Broadsheet

### Custom Cursor
- Default: system cursor. Newspaper defers to browser.
- Hover over headline link: `cursor: pointer`.
- Hover over portfolio image: `cursor: zoom-in`.
- Hover over byline: `cursor: text`.
- Touch: no overrides.

### Selection / Focus Colors
```css
::selection {
  background-color: #A4262C; /* headline red */
  color: #F5F0E1;             /* newsprint cream */
}

:focus-visible {
  outline: 2px solid #A4262C;
  outline-offset: 2px;
  border-radius: 0;
}

.on-red:focus-visible {
  outline: 2px solid #F5F0E1;
  outline-offset: 2px;
}
```

### Scrollbar Styling
```css
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: #F5F0E1; }
::-webkit-scrollbar-thumb { background: #999; border-radius: 0; }
::-webkit-scrollbar-thumb:hover { background: #1A1A1A; }

* { scrollbar-width: thin; scrollbar-color: #999 #F5F0E1; }
```

### Loading / Skeleton State
- No loading splash. SSR/SSG required. `font-display: block` for Old Standard TT and Source Serif 4.
- Async portfolio placeholders: `#E8E3D6` fill rectangle, `1px solid #999` border, halftone dot CSS overlay (`radial-gradient` 2px spacing). No shimmer.
- Fallback text: Source Serif 4 italic 11px: `[loading copy…]` at column start.

### Empty / 404 / Error States
- **Empty portfolio:** Headline: `"NO COPY FILED"` in Old Standard TT. Source Serif body: `"This edition goes to press without items in this section."` Yellow `#F4E97D` tint block behind.
- **404:** Masthead: `THE KPT GAZETTE — PAGE NOT FOUND`. Deck: `"Article Removed From Edition"`. Red rule, body copy. Return link at foot.
- **Error:** Column with red rule. Headline: `"WIRE COPY DELAYED"`. IBM Plex Mono byline: `BY AUTOMATED SYSTEMS · RETRY ↻`.

### Hover Micro-interactions

| Element | Effect | Duration | Easing |
|---|---|---|---|
| Headline text link | Red `#A4262C` underline draws in via `clip-path` | `300ms` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Portfolio article image | Halftone overlay `opacity: 0.2 → 0.5` darkens | `400ms` | `ease-out` |
| CTA button | Red fills background; text goes cream | `250ms` | `ease-out` |
| Nav link | Same `clip-path` underline draw | `250ms` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Byline text | `#999 → #1A1A1A` | `200ms` | `ease-out` |

### Reduced-motion Respect — V16 Specific
```css
@media (prefers-reduced-motion: reduce) {
  /* V16 is static newsprint by design */

  /* DISABLE: fresh-press first-paint fade-in */
  .fresh-press-reveal { animation: none !important; opacity: 1 !important; }

  /* DISABLE: clip-path underline draw */
  a { text-decoration: underline; text-decoration-color: #A4262C; }
}
```
V16 is the second safest design for reduced-motion users after V8 Codex. No scroll hijack, no parallax, no auto-animation.

### Accessibility
- **Ink `#1A1A1A` on newsprint `#F5F0E1`:** 14.7:1 — AAA.
- **Red `#A4262C` on newsprint `#F5F0E1`:** 6.1:1 — AAA. Headlines and rules at all sizes.
- **Halftone grey `#999` on newsprint `#F5F0E1`:** 2.7:1 — FAILS AA. `#999` is decorative only. Bylines use `#666` minimum (4.6:1).
- **Yellow tint `#F4E97D` as block background:** Body text on yellow must be `#1A1A1A` (15.2:1 — fine).
- **Focus ring:** `2px solid #A4262C`, offset `2px`. Strong contrast on newsprint.
- **CSS multi-column layout:** Screen readers read DOM order. Ensure DOM order = intended reading order. Use `column-count` for visual layout only.
- **Line-height lock warning:** Do not set `line-height: 1.2 !important` for "newsprint density" — WCAG SC 1.4.12 requires user override capability. Use `clamp()` instead.
- **IBM Plex Mono bylines at small sizes:** Minimum 12px rendered. Never below 11px even in densest columns.
- **Skip link:** Styled with red background, cream text. Critical for dense newspaper with many nav links before content.

### Key Transition Timings

| Transition | Duration | Easing |
|---|---|---|
| Fresh-press first-paint reveal | `800ms`, `opacity: 0 → 1` on `<main>` | `ease-out` |
| Headline hover underline draw | `300ms` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Image hover halftone overlay | `400ms` | `ease-out` |
| CTA fill | `250ms` | `ease-out` |
| Route transition | `200ms` fade | `ease-in` / `ease-out` |

---

## V17 — Nostromo

### Custom Cursor
- Default: `cursor: none`. Replaced with a `+` reticle SVG in `#FFB000` (CRT amber), 20×20px, `1px` stroke. The reticle is `pointer-events: none`, `z-index: 9999`. Moves via `mousemove`.
- Hover over panel button or control: reticle color switches to `#FF3030` (alert red) over `60ms step-end`.
- Hover over CRT readout zone: a scanline overlay appears over the cursor SVG, `opacity: 0.3`.
- On `mousedown`: reticle shrinks to 12×12px over `80ms step-end`.
- Touch: `cursor: auto`.

### Selection / Focus Colors
```css
::selection {
  background-color: #FFB000; /* CRT amber */
  color: #0A0A0F;             /* cockpit black */
}

:focus-visible {
  outline: 1px solid #FFB000;
  outline-offset: 0;
  border-radius: 0;
}

/* On cyan readout sections */
.readout-cyan:focus-visible {
  outline: 1px solid #00E5FF;
  outline-offset: 0;
}
```

### Scrollbar Styling
```css
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #0A0A0F; }
::-webkit-scrollbar-thumb { background: #3A3A40; border-radius: 0; }
::-webkit-scrollbar-thumb:hover { background: #FFB000; }

* { scrollbar-width: thin; scrollbar-color: #3A3A40 #0A0A0F; }
```

### Loading / Skeleton State
- Deep cockpit black `#0A0A0F` viewport. CRT boot sequence in VT323 14px `#FFB000`:
  ```
  USCSS NOSTROMO · MU/TH/UR 6000
  INITIALIZING SYSTEMS...
  NAVIGATION: OK
  LIFE SUPPORT: OK
  COMMUNICATIONS: LOADING...
  ```
  Each line appears character by character at `25ms/char`, lines staggered `400ms`. After sequence: content fades in `300ms`.
- Section skeletons: `#1A1A20` bars (slightly lighter than cockpit black), `1px solid #3A3A40` border. No shimmer. Static panels.

### Empty / 404 / Error States
- **Empty portfolio panel:** VT323 `#FFB000`: `NO PAYLOAD ON MANIFEST`. Cyan sub-label: `CARGO BAY: EMPTY`. Amber CTA: `[ CONTACT COMMAND ]`.
- **404:** Full cockpit screen. VT323 large: `NAVIGATION ERROR · 404`. Sub-label in `#00E5FF`: `COURSE NOT FOUND IN STAR CHARTS`. Panel beige body: `This destination does not exist in the navigation database.` Amber: `[ RETURN TO BASE ]`.
- **Error:** Alert red `#FF3030` indicator lights (3 blinking circles in CSS). VT323: `SYSTEM FAULT · RETRY?`. `[ RETRY ]` in amber border.

### Hover Micro-interactions

| Element | Effect | Duration | Easing |
|---|---|---|---|
| Panel button / CTA | Invert: `background: #FFB000, color: #0A0A0F` | `80ms` | `step-end` |
| Indicator light | Brightness pulse `filter: brightness(1.6)` | `100ms` | `ease-out` |
| Readout number | `#FFB000 → #FFFFFF` for `200ms` then return | `200ms` | `ease-out` |
| Nav link | Amber underline instant-on | `60ms` | `step-end` |
| Panel section | Amber `1px` border brightens on hover | `100ms` | `ease-out` |
| Phosphor "bloom" (text glow) | `text-shadow: 0 0 8px #FFB00066 → 0 0 16px #FFB000AA` on hover | `300ms` | `ease-out` |

### Reduced-motion Respect — V17 Specific
```css
@media (prefers-reduced-motion: reduce) {
  /* DISABLE: CRT scanline animation */
  .scanlines { animation: none !important; opacity: 0.08; } /* static scanlines: faint stripes only */

  /* DISABLE: phosphor decay / phosphor bloom glow animation */
  .phosphor-text { text-shadow: 0 0 4px #FFB00044; animation: none !important; }

  /* DISABLE: indicator light blink */
  .indicator-light { animation: none !important; opacity: 1; }

  /* DISABLE: boot sequence typewriter — show all lines immediately */
  .boot-line { opacity: 1 !important; }

  /* DISABLE: reticle cursor animation */
  #nostromo-cursor { transition: none; }

  /* RETAIN: step-end hover states (≤ 100ms) — not vestibular triggers */

  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```
**Scanlines note:** Static scanlines (CSS `repeating-linear-gradient` with no animation) are not a reduced-motion concern. The concern is animated scanlines — a moving horizontal bar sweeping down. Disable the sweep; retain the static stripe texture.

### Accessibility
- **CRT amber `#FFB000` on cockpit black `#0A0A0F`:** 9.1:1 — AAA. Primary text color. All sizes clear.
- **Cyan `#00E5FF` on cockpit black `#0A0A0F`:** 14.9:1 — AAA.
- **Alert red `#FF3030` on cockpit black `#0A0A0F`:** 5.7:1 — passes AA. Acceptable for alerts and labels.
- **Panel beige `#D4C9A8` on cockpit black `#0A0A0F`:** 10.4:1 — AAA.
- **Machined metal `#3A3A40` on cockpit black `#0A0A0F`:** 1.4:1 — FAILS. Decorative borders only; no text.
- **Focus ring:** `1px solid #FFB000`, offset `0`. Terminal-flush amber ring — high contrast on dark.
- **CRT scanlines overlay:** `<div aria-hidden="true" class="scanlines">` — purely decorative.
- **Color-only alert information:** Red indicator lights must have a text label (`FAULT`, `ALERT`, etc.) alongside — not just a red glow.
- **VT323 pixel font:** Limit to headings and readouts. Body text must remain readable OCR-style (still VT323 but at minimum 14px rendered, line-height 1.5).
- **Blink animations on indicator lights:** CSS `animation: blink` — must be fully disabled under `prefers-reduced-motion`. Blinking content (>3Hz) can trigger photosensitive seizures. Keep blink rate at `1Hz` (1s cycle) even in standard mode.
- **Boot sequence:** Typewriter must complete within `4s` total. If user presses `Tab` or `Escape` during boot, all lines appear immediately.

### Key Transition Timings

| Transition | Duration | Easing |
|---|---|---|
| Boot sequence per character | `25ms/char` | JS `setInterval` |
| Boot sequence line stagger | `400ms` after previous line completes | — |
| Panel button hover invert | `80ms` | `step-end` |
| Phosphor glow hover | `300ms` | `ease-out` |
| Readout number flash | `200ms` out / `200ms` in | `ease-out` |
| `whileInView` section | `opacity: 0 → 1`, `150ms step-end` | `step-end` |
| Route transition | `150ms` cockpit-black fade | `step-end` |

---

## V18 — Receipt

### Custom Cursor
- Default: system cursor. The receipt metaphor implies reading — no cursor override.
- Hover over "line item" (portfolio entry): `cursor: pointer`.
- Hover over CTA: `cursor: pointer`.
- Touch: no overrides.

### Selection / Focus Colors
```css
::selection {
  background-color: #B53D3D; /* faded red carbon */
  color: #FBFBFB;
}

:focus-visible {
  outline: 1px solid #1A1A1A;
  outline-offset: 2px;
  border-radius: 0;
}

/* On faded carbon red backgrounds */
.on-carbon-red:focus-visible {
  outline: 1px solid #FBFBFB;
  outline-offset: 2px;
}
```

### Scrollbar Styling
```css
/* The whole page IS a vertical scroll — the receipt strip */
::-webkit-scrollbar { width: 2px; }
::-webkit-scrollbar-track { background: #FBFBFB; }
::-webkit-scrollbar-thumb { background: #1A1A1A; border-radius: 0; }
::-webkit-scrollbar-thumb:hover { background: #B53D3D; }

* { scrollbar-width: thin; scrollbar-color: #1A1A1A #FBFBFB; }
```

### Loading / Skeleton State
- Receipt white `#FBFBFB` viewport. A print-head animation: a thin `2px` `#1A1A1A` line slides from top of each section downward, revealing text beneath it at `30ms/line` (simulating thermal printing). This IS the loading state — content "prints" as it loads.
- If data loads async: a dashed `1px` line with `-- -- --` text (thermal-print placeholder for item fields).

### Empty / 404 / Error States
- **Empty portfolio section:** Receipt line: `ITEMS .............. 0`. Below: `(no projects on record)` in Anonymous Pro italic. Carbon copy red total: `TOTAL .............. $0.00`.
- **404:** Receipt header: `KPT DESIGNS`. Divider: `================================`. Item: `REF ................. 404`. Description: `PAGE NOT FOUND`. Total: `ERROR`. Footer: `THANK YOU FOR YOUR VISIT`. Carbon copy red `(RECEIPT NOT VALID)`. Return link styled as: `* REPRINT: RETURN HOME *`.
- **Error:** Print head stops mid-receipt. A jagged `---[PAPER JAM]---` line in carbon red. Below: `PLEASE RELOAD AND RETRY`. Retry link.

### Hover Micro-interactions

| Element | Effect | Duration | Easing |
|---|---|---|---|
| Line item (portfolio entry) | `background: #F0F0F0`; very subtle — stays on-receipt | `100ms` | `ease-out` |
| CTA button | Border `#1A1A1A → #B53D3D`; carbon copy red fills | `200ms` | `ease-out` |
| Nav link | `#1A1A1A` underline draws left→right, `1px` | `250ms` | `ease-out` |
| Section separator line | `opacity: 0.4 → 1.0` | `150ms` | `ease-out` |
| Receipt total row | `font-weight: 400 → 700` | `150ms` | `ease-out` |

### Reduced-motion Respect — V18 Specific
```css
@media (prefers-reduced-motion: reduce) {
  /* DISABLE: print-head reveal animation — show all content immediately */
  .print-reveal {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }

  /* DISABLE: roller-feed jitter (if implemented as translateX micro-jitter) */
  .receipt-strip { animation: none !important; }

  /* RETAIN: color transitions ≤ 200ms */
  /* RETAIN: background highlight on hover (no motion) */
}
```

### Accessibility
- **Ink fade `#1A1A1A` on receipt white `#FBFBFB`:** 18.7:1 — AAA.
- **Carbon copy red `#B53D3D` on receipt white `#FBFBFB`:** 5.0:1 — passes AA for all text.
- **Faint blue carbon `#3D5A8A` on receipt white `#FBFBFB`:** 6.3:1 — passes AA.
- **Focus ring:** `1px solid #1A1A1A`, offset `2px`. Ink on paper — max contrast.
- **Receipt layout (narrow width):** The receipt metaphor demands narrow content (320–380px max-width). On wide screens, center the strip with ample negative space. This is fine for mobile but on desktop, `max-width: 380px; margin: 0 auto` with side gutters.
- **Monospace font (Anonymous Pro / VT323):** All body in mono is acceptable for short receipt-style content. If long body copy appears, ensure minimum 16px and line-height 1.5.
- **Print-head animation accessibility:** Staggered text-reveal creates content that is present in the DOM but visually obscured mid-animation. Screen readers must receive full text immediately — the animation is purely visual. Implement as CSS clip-path on a `<div>` wrapper, with the text node at full opacity underneath.
- **Receipt totals and calculations:** Any numerical total that is semantically important must have a text label (not just visual positioning). Example: `<dt>Total</dt><dd>$12,000</dd>` using a `<dl>`.

### Key Transition Timings

| Transition | Duration | Easing |
|---|---|---|
| Print-head reveal (per section) | `30ms/text-line`, triggered on scroll-into-view | JS `setInterval` |
| Roller-feed jitter | `80ms` micro-`translateX: ±1px`, once on section entry | `step-end` |
| Line item hover highlight | `100ms` | `ease-out` |
| CTA carbon-red fill | `200ms` | `ease-out` |
| Route transition | `200ms` white-fade | `ease-in` / `ease-out` |

---

## V19 — Risograph

### Custom Cursor
- Default: `cursor: none`. Replaced with a misregistered cursor — two overlapping circles: one `#FF48B0` (riso pink) and one `#00B7A8` (riso teal), offset `3px` from each other. Simulates riso ink-registration error. `pointer-events: none`, `z-index: 9999`.
- Hover over portfolio card: cursor circles offset widens to `6px`, adds a `#FFE100` (riso yellow) third offset circle at `45deg`.
- Hover over CTA: single `#FF48B0` circle only (clean for CTA — not confusing).
- Touch: `cursor: auto`.

### Selection / Focus Colors
```css
::selection {
  background-color: #FF48B0; /* riso pink */
  color: #1A1A1A;
}

:focus-visible {
  outline: 2px solid #1A1A1A; /* risograph black */
  outline-offset: 3px;
  border-radius: 0;
}

/* On dark/black elements */
.on-black:focus-visible {
  outline: 2px solid #FF48B0;
  outline-offset: 3px;
}
```

### Scrollbar Styling
```css
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #F5F0E1; } /* newsprint */
::-webkit-scrollbar-thumb { background: #1A1A1A; border-radius: 0; }
::-webkit-scrollbar-thumb:hover { background: #FF48B0; }

* { scrollbar-width: thin; scrollbar-color: #1A1A1A #F5F0E1; }
```

### Loading / Skeleton State
- Newsprint `#F5F0E1` viewport. Three colored bars stack (pink, teal, yellow) each at `4px` height, cycling upward like a print drum warming up, `500ms ease-in-out` loop. Once ready: bars snap away `step-end`, content appears.
- Content skeletons: `#E8E4D8` fill (slightly darker newsprint) rectangles. Halftone dot overlay as texture. No shimmer.

### Empty / 404 / Error States
- **Empty portfolio:** Large halftone dot field (CSS `radial-gradient` pattern) fills the section area. Center: Stardos Stencil: `NO PRINTS YET`. Pink sub-label in Anybody: `come back soon`.
- **404:** Full-bleed riso poster layout. Pink: `4` · Teal: `0` · Yellow: `4` — three large numerals slightly misregistered. Risograph black: `PAGE NOT FOUND`. Newsprint body. Pink CTA: `BACK`.
- **Error:** Halftone dots shift hue to pink. Center: `PRINT ERROR` in stencil. Teal: `Retry →`.

### Hover Micro-interactions

| Element | Effect | Duration | Easing |
|---|---|---|---|
| Portfolio card | Misregistration flicker: `hue-rotate(30deg)` on card image for `200ms` then return | `200ms` / `200ms` | `ease-out` / `ease-in` |
| CTA button | Pink fills from center radially; text → newsprint | `300ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Nav link | Teal `#00B7A8` underline draw, `2px`, scaleX | `280ms` | `ease-out` |
| Halftone dot pattern | Very slow `hue-rotate` drift: `0 → 360deg` over `20s linear infinite` on the background — restrained | `20s` | `linear` |
| Section heading | Pink underline slides in from left on hover | `250ms` | `ease-out` |

### Reduced-motion Respect — V19 Specific
```css
@media (prefers-reduced-motion: reduce) {
  /* DISABLE: misregistration flicker on portfolio card hover */
  .riso-card { filter: none !important; transition: none; }

  /* DISABLE: hue-rotate drift on halftone background */
  .halftone-bg { animation: none !important; }

  /* DISABLE: misregistered cursor offset animation */
  #riso-cursor-pink, #riso-cursor-teal { transition: none; }
  /* Show single #1A1A1A dot cursor instead */

  /* DISABLE: loading drum-bar animation */
  .loading-drum { animation: none !important; display: none; }

  /* RETAIN: color hover transitions ≤ 250ms */
  /* RETAIN: underline draw (clip-path — not vestibular) */
}
```

### Accessibility — Fluorescent Colors Warning (CRITICAL)
V19 uses three fluorescent colors: riso pink `#FF48B0`, riso teal `#00B7A8`, and riso yellow `#FFE100`. These are used to layer information and distinguish design sections.

**Color-only information warning:** If section identity or portfolio category is communicated only by which riso color overlays it, this fails WCAG SC 1.4.1. Add text labels for any categorization.

Contrast checks:
- **Riso pink `#FF48B0` on newsprint `#F5F0E1`:** 2.8:1 — FAILS AA. Pink is NOT a text color. Use it for large decorative headings (≥48px) or borders only. Body text must be `#1A1A1A`.
- **Riso teal `#00B7A8` on newsprint `#F5F0E1`:** 3.1:1 — passes AA for large text (≥18px) only.
- **Riso yellow `#FFE100` on newsprint `#F5F0E1`:** 1.3:1 — FAILS catastrophically. Yellow on newsprint is purely decorative. NEVER use yellow as a text color.
- **Risograph black `#1A1A1A` on newsprint `#F5F0E1`:** 14.7:1 — AAA. All body text must use black.
- **Riso pink `#FF48B0` on risograph black `#1A1A1A`:** 5.7:1 — passes AA. Pink on dark is acceptable for headings.
- **Riso teal `#00B7A8` on risograph black `#1A1A1A`:** 7.6:1 — AAA. Teal on dark is good for links/labels.
- **Focus ring:** `2px solid #1A1A1A`, offset `3px`. Black ring on newsprint — maximum visibility regardless of fluorescent overlaps.
- **Misregistration cursor:** Must not obscure focus rings on interactive elements. The pink/teal offset circles should have `pointer-events: none` and `z-index < focus-ring z-index`.
- **Halftone patterns:** `aria-hidden="true"` on all decorative pattern divs.
- **`hue-rotate` filter on hover:** Flickering hue shifts can cause discomfort for users with vestibular or photosensitive conditions. Even at 200ms it is borderline. Gate strictly behind `prefers-reduced-motion: no-preference` check (not just default). Consider removing the effect entirely from small card thumbnails where it would be rapid and unexpected.

### Key Transition Timings

| Transition | Duration | Easing |
|---|---|---|
| Loading drum bars | `500ms` per cycle | `ease-in-out` |
| Card hue-rotate flicker | `200ms` out / `200ms` return | `ease-out` / `ease-in` |
| Halftone bg hue drift | `20s` full rotation | `linear` |
| CTA radial fill | `300ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `whileInView` reveal | `600ms`, `opacity: 0 → 1, y: 16 → 0` | `ease-out` |
| Route transition | `350ms` newsprint fade | `ease-in` / `ease-out` |

---

## V20 — Operator Manual

### Custom Cursor
- Default: system cursor. Technical documentation respects the browser.
- Hover over inline code block: `cursor: text`.
- Hover over CTA: `cursor: pointer`.
- Hover over section number anchor: `cursor: pointer`.
- Touch: no overrides.

### Selection / Focus Colors
```css
::selection {
  background-color: #1D5CB6; /* IBM blue */
  color: #F4EFE0;             /* manual cream */
}

:focus-visible {
  outline: 2px solid #1D5CB6;
  outline-offset: 2px;
  border-radius: 0;
}

/* On IBM blue backgrounds */
.on-ibm-blue:focus-visible {
  outline: 2px solid #F4EFE0;
  outline-offset: 2px;
}
```

### Scrollbar Styling
```css
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #F4EFE0; }
::-webkit-scrollbar-thumb { background: #1A1A1A; border-radius: 0; }
::-webkit-scrollbar-thumb:hover { background: #1D5CB6; }

* { scrollbar-width: thin; scrollbar-color: #1A1A1A #F4EFE0; }
```

### Loading / Skeleton State
- Manual cream `#F4EFE0` viewport. No loading splash — static document, SSR/SSG required. `font-display: block` for IBM Plex Serif and IBM Plex Mono.
- Async content placeholders: `#E8E3D4` fill (slightly darker cream), `1px solid #1A1A1A` border. No shimmer. A dotted leader line `..........` in IBM Plex Mono 10px filling the placeholder width.

### Empty / 404 / Error States
- **Empty section:** IBM Plex Mono: `/* SECTION INTENTIONALLY LEFT BLANK */`. IBM blue horizontal rule above and below. No other decoration.
- **404:** Document section header: `§ 404 — REFERENCE NOT FOUND`. IBM Plex Serif body: `"The referenced section does not exist in this revision of the manual. Consult the index."` IBM blue link: `→ Return to Table of Contents`. Warning amber callout box: `NOTE: This page is not part of this document revision.`
- **Error:** Warning amber `#C9A30D` callout block. IBM Plex Mono header: `!! SYSTEM ERROR`. Body: `Data retrieval failed. Please retry the operation.` Blue CTA: `RETRY`.

### Hover Micro-interactions

| Element | Effect | Duration | Easing |
|---|---|---|---|
| CTA button | IBM blue fills background; cream text | `200ms` | `ease-out` |
| Section number anchor | Blue `#1D5CB6` underline draws in | `250ms` | `ease-out` |
| Nav link | Same blue underline draw | `250ms` | `ease-out` |
| Inline code block | `background: #E8E3D4 → #D0C9BB`; border brightens | `150ms` | `ease-out` |
| Warning/note callout box | `box-shadow: 0 2px 8px #1D5CB622` deepens on hover | `200ms` | `ease-out` |
| Table row | `background: transparent → #EDE8DA` | `100ms` | `ease-out` |

### Reduced-motion Respect — V20 Specific
```css
@media (prefers-reduced-motion: reduce) {
  /* V20 has NO animations by design — static documentation */

  /* The only motion is any page-flip transition: */
  /* DISABLE: page-flip transition if implemented */
  .page-flip { animation: none !important; }

  /* DISABLE: underline draw — show statically */
  a { text-decoration: underline; text-decoration-color: #1D5CB6; }

  /* Nothing else to disable — V20 fully respects reduced-motion by default */
}
```
V20 is the safest design in the entire set for reduced-motion users: static document, no scroll hijack, no parallax, no auto-animation, no cursor override.

### Accessibility
- **Printed black `#1A1A1A` on manual cream `#F4EFE0`:** 15.0:1 — AAA.
- **IBM blue `#1D5CB6` on manual cream `#F4EFE0`:** 7.1:1 — AAA. Links and headings.
- **Sub-section red `#A4262C` on manual cream `#F4EFE0`:** 6.1:1 — AAA. Section markers.
- **Warning amber `#C9A30D` on manual cream `#F4EFE0`:** 3.4:1 — passes AA for large text (≥18px) only. Use amber for background tints only; body text on amber must be `#1A1A1A`.
- **IBM blue on warning amber callout:** `#1D5CB6` on `#C9A30D` = 2.0:1 — FAILS. Use `#1A1A1A` for text inside amber callout boxes.
- **Focus ring:** `2px solid #1D5CB6`, offset `2px`. Blue ring on cream — strong and on-brand.
- **Dense documentation layout:** Each section must have a real `<h2>` or `<h3>` heading. The section numbering (`§ 2.1`) must be in the heading element, not in a sibling `<span>` — heading hierarchy must be intact for screen reader navigation.
- **Numbered sections:** Use `<ol>` for numbered content lists. Do not fake numbering with CSS `counter-content` for content that is semantically ordered — CSS counters are not announced by all screen readers.
- **Inline code blocks:** `<code>` element required. Not `<span class="mono">`. Screen readers announce `<code>` contextually.
- **Tables:** All data tables must use `<th scope="col/row">`, `<caption>`, and `aria-describedby` for complex tables. The operator manual aesthetic invites heavy table use — every table must be accessible.
- **RFC-style definition lists:** Use `<dl><dt>Term</dt><dd>Definition</dd></dl>` for glossary entries. Do not simulate with `<p><strong>Term:</strong> Definition</p>`.
- **Warning/note callout boxes:** Use `role="note"` or `role="status"` on callout divs. `role="alert"` for critical warnings. These ARIA roles ensure screen readers announce the callout appropriately.

### Key Transition Timings

| Transition | Duration | Easing |
|---|---|---|
| Page-flip transition (if used) | `400ms` | `ease-in-out` |
| CTA fill | `200ms` | `ease-out` |
| Section anchor hover | `250ms` | `ease-out` |
| Table row highlight | `100ms` | `ease-out` |
| Route transition | `300ms` cream-fade | `ease-in` / `ease-out` |

---

## Cross-cutting Recommendations

### Font Loading Strategy

All 16 designs load from `next/font/google`. Follow this pattern for every design:

```tsx
// In layout.tsx or per-page _layout — NOT inside component files
import {
  Inter, JetBrains_Mono, Fraunces, IBM_Plex_Mono, IBM_Plex_Serif, IBM_Plex_Sans,
  Crimson_Pro, EB_Garamond, Playfair_Display, Source_Serif_4, Old_Standard_TT,
  Roboto_Mono, Anonymous_Pro, VT323, Caveat, Stardos_Stencil
} from 'next/font/google'
```

**`font-display` rules by design:**

| Design | Font | `display` | Reason |
|---|---|---|---|
| V5 Tunnel | Inter, JetBrains Mono | `swap` | HUD chrome — FOUT is brief and acceptable |
| V6 Strata | Fraunces, JetBrains Mono | `block` / `swap` | Fraunces `block` for hero; mono `swap` |
| V7 Recursive | Inter (Söhne sub) | `swap` | No large optical extremes |
| V8 Codex | UnifrakturCook, Crimson Pro, EB Garamond | `block` | All three used at display sizes; FOUT unacceptable |
| V9 Ticker | IBM Plex Mono | `swap` | Terminal style — fallback is acceptable briefly |
| V10 Atelier | Playfair Display, Inter | `block` / `swap` | Playfair `block` for large lookbook sizes |
| V11 Architectural | Roboto Mono, Roboto | `swap` | Standard — fallbacks are visually close |
| V12 Specimen | Fraunces (variable, opsz) | `block` | 720px letterforms — FOUT is catastrophic |
| V13 Conversation | Inter | `swap` | Chat bubbles — acceptable fallback |
| V14 Cassette | VT323, Caveat | `swap` | Both short-label only; FOUT brief |
| V15 Atlas | EB Garamond, JetBrains Mono | `block` / `swap` | EB Garamond `block` for large display headings |
| V16 Broadsheet | Old Standard TT, Source Serif 4 | `block` | Masthead headlines — FOUT unacceptable |
| V17 Nostromo | VT323, OCR-A (sub: VT323) | `swap` | Readouts only; fallback mono acceptable |
| V18 Receipt | Anonymous Pro | `swap` | Short lines; fallback mono acceptable |
| V19 Risograph | Stardos Stencil, Anybody | `swap` | Display-only headings; FOUT brief |
| V20 Operator | IBM Plex Mono, IBM Plex Serif, IBM Plex Sans | `swap` | All three IBM Plex fonts are similar to system fallbacks |

**Variable fonts:**
- Fraunces (V6, V12): declare the `axes: ['opsz']` parameter in `next/font/google` config. Required for optical size axis to work.
- Inter (V5, V7, V13): `weight: ['200', '400', '700']` — three weights. Only load what is used above the fold.

**Preload policy:** Only preload the primary display font for each design (the one visible in the hero above the fold). Do not preload all variants. Example:
```tsx
// V12 Specimen: preload Fraunces only
const fraunces = Fraunces({ subsets: ['latin'], axes: ['opsz'], display: 'block', variable: '--font-fraunces' })
```

### Image Optimization

- All portfolio images: use Next.js `<Image>` with explicit `width` and `height` or `fill` + `position: relative` parent. Never omit dimensions — this is the primary CLS source.
- `blurDataURL` per design: use a 1×1 pixel in the dominant background color, base64-encoded.
- `sizes` attribute: match actual CSS max-width at each breakpoint:
  ```tsx
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
  ```
- AVIF + WebP fallback in `next.config.js`:
  ```js
  images: { formats: ['image/avif', 'image/webp'] }
  ```
- **Three.js designs (V5, V6, V7):** Reserve space for canvas before it mounts:
  ```css
  .r3f-canvas-wrapper { aspect-ratio: 16/9; min-height: 100vh; }
  ```
  Without this, the page reflows when the canvas appears (CLS spike).
- **V8 Codex, V10 Atelier:** Grain texture overlays implemented as CSS `noise.svg` filters (`feTurbulence`) — not image files. No image optimization needed, but ensure the SVG filter is inlined or pre-fetched, not blocking.

### Three.js Cleanup

Applies to V5 (Tunnel), and optionally V6/V7 (though those prefer CSS Z-translation per spec):

```tsx
// In TunnelEngine.tsx — cleanup on unmount
useEffect(() => {
  return () => {
    // Dispose geometries
    scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose()
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(m => m.dispose())
        } else {
          object.material.dispose()
        }
      }
    })
    // Dispose renderer
    gl.dispose()
    // Clear ScrollControls scroll listener
    // (R3F ScrollControls cleans up internally on unmount if used correctly)
  }
}, [scene, gl])
```

- Use `<Preload all />` from `@react-three/drei` to warm GPU textures before the user scrolls.
- Gate the entire R3F canvas behind a `useEffect` check for `window` (SSR safety) — R3F cannot render server-side.
- Monitor WebGL context loss events: `canvas.addEventListener('webglcontextlost', handler)` — on context loss, show the reduced-motion fallback layout immediately.

### Shared Accessibility Patterns

**Skip links (all 16 designs):**
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded"
  style={{ background: 'var(--color-focus-bg)', color: 'var(--color-focus-text)' }}
>
  Skip to main content
</a>
<main id="main-content" tabIndex={-1}>
  {children}
</main>
```
Style per design: use the primary accent color as `--color-focus-bg` and background color as `--color-focus-text`.

**Global `useReducedMotion()` gate:**
```tsx
// In root layout or a MotionProvider
const prefersReducedMotion = useReducedMotion() // framer-motion
// Pass as context; all engines (TunnelEngine, StrataEngine, RecursiveEngine) read from context
```
Every design's most distinctive motion feature has a named off-switch in these notes. The global gate applies ALL of them with one boolean.

**Heading hierarchy (all 16):**
- Only one `<h1>` per page — the primary page heading.
- Section headings: `<h2>`.
- Sub-sections: `<h3>`.
- Never skip levels. Never use `<h4>+` for font-size alone — use `<p>` with a font class.
- Decorative section numbers (e.g., V8 folio numbers, V20 `§` markers) must live inside the heading element, not in a sibling element: `<h2><span aria-hidden="true">§ 2</span> Stack</h2>`.

**Focus management on route change:**
```tsx
// After Next.js route transition, move focus to main content region
useEffect(() => {
  document.getElementById('main-content')?.focus()
}, [pathname])
```
This ensures screen reader users are not left focused on the previous page's last element after navigation.

**`aria-live` budget:** Keep `aria-live` regions to a minimum per page. V9 Ticker has the highest risk — the constantly-updating ticker strip must be `aria-live="off"`. Only static data snapshots (tables) should use `aria-live="polite"` with throttled updates (max every 30s).

**Color-not-only checklist:**
- V9 Ticker: green/red price movement → ▲/▼ glyph required.
- V14 Cassette: red LED indicators → text label required.
- V15 Atlas: color-coded map pins → text category label required.
- V17 Nostromo: red alert lights → text label required.
- V19 Risograph: fluorescent color layers → text labels for any categorization.

**Touch targets (all 16):**
- Minimum 44×44px for all interactive elements.
- On V9 Ticker: chart bars and ticker rows must have `min-height: 44px` or use `hitSlop` equivalents on mobile.
- On V15 Atlas: map pins must be minimum 44×44px hit area even if the visible pin is smaller (use a transparent `::after` pseudo-element to expand the hit area).
- On V18 Receipt: line items must be minimum 44px height.

**Font size floor (all 16):**
- Body text: minimum `16px` rendered.
- Captions and labels: minimum `12px` rendered.
- Exception: V9 Ticker allows `12px` for dense data labels (standard financial terminal convention) — but these labels are supplementary, not primary content.
- JetBrains Mono / VT323 readouts: minimum `11px` — but always paired with `aria-label` on the container for screen readers.

**Reduced-motion implementation priority by design risk:**

| Risk Level | Designs | Primary Concern |
|---|---|---|
| CRITICAL | V5 Tunnel, V7 Recursive | Full-viewport camera/scale advance; vestibular risk |
| HIGH | V6 Strata, V9 Ticker | Z-translation; constant movement |
| MEDIUM | V14 Cassette, V17 Nostromo, V19 Risograph | Rotating/blinking/hue-shifting elements |
| LOW | V8 Codex, V10 Atelier, V11 Architectural, V12 Specimen, V13 Conversation, V15 Atlas, V16 Broadsheet, V18 Receipt, V20 Operator | Minimal or no auto-animation |

For CRITICAL designs: test with macOS Accessibility → Display → Reduce Motion enabled before every deploy. The fallback layout must be genuinely usable, not just "visible."

**CLS budget (all 16):**
- Target: `< 0.1` on all designs.
- Primary risks: web font loading (use `font-display: block` on display fonts), Three.js canvas mounting (reserve space), and async portfolio image loading (use `<Image>` with explicit dimensions).
- Test with: Chrome DevTools Performance panel → Core Web Vitals overlay, or Vercel Speed Insights.

