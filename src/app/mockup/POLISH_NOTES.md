# Mockup Polish Notes
## Micro-interaction, Accessibility & Motion Specification

> These notes are an implementation checklist — not aspirational prose.
> Every value is meant to be copy-pasted directly into CSS / Framer Motion config.

---

## V2 — Cosmos

### Custom Cursor

- Default state: 10×10px filled circle, `#F8F8FF` (star white), no border, `mix-blend-mode: difference`.
- Hover over interactive element (button, link, card): circle scales to 32×32px over `200ms cubic-bezier(0.16, 1, 0.3, 1)`, opacity drops to 0.5, border appears `1px solid #7B5BFF` (plasma violet), fill disappears — becomes a ring.
- Hover over the Three.js canvas: cursor hides (`cursor: none`), replaced by a tiny crosshair SVG (6×6px, `#9BA3C7`) with `pointer-events: none` absolutely positioned.
- Clicking: ring pulses outward to 44px and fades in `120ms ease-out`.
- Implementation: single `<div id="cursor" />` positioned with `useMousePosition` hook, `transform: translate(-50%, -50%)`, `pointer-events: none`, `z-index: 9999`.
- Fallback: `cursor: default` on touch devices (detect via `pointer: coarse` media query).

### Selection / Focus Colors

```css
/* Text selection */
::selection {
  background-color: #7B5BFF; /* plasma violet */
  color: #F8F8FF;             /* star white */
}

/* Focus ring — all interactive elements */
:focus-visible {
  outline: 2px solid #7B5BFF;
  outline-offset: 4px;
  border-radius: 2px;
}

/* For dark-bg buttons where violet is hard to see */
.btn-cosmos:focus-visible {
  outline: 2px solid #FF8000; /* solar amber */
  outline-offset: 3px;
}
```

### Scrollbar Styling

```css
/* Webkit */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #02030A; }
::-webkit-scrollbar-thumb {
  background: #1A2148; /* midnight */
  border-radius: 2px;
}
::-webkit-scrollbar-thumb:hover { background: #7B5BFF; }

/* Firefox */
* { scrollbar-width: thin; scrollbar-color: #1A2148 #02030A; }
```

### Loading State

- **Initial page load (Three.js canvas):** Full-viewport splash on `#02030A`. Center: "KPT" in `JetBrains Mono` 11px `#9BA3C7` letter-spaced 0.3em, with a plasma-violet radial pulse (`box-shadow: 0 0 60px #7B5BFF33`) expanding and fading in `2s ease-in-out` loop. Disappears with a 600ms opacity fade once Three.js canvas is ready (`onCreated` callback).
- **Section content skeleton:** Dark bars at `#1A2148` (midnight), shimmer sweep using `background: linear-gradient(90deg, #1A2148 0%, #0A0E27 50%, #1A2148 100%)` animated over `1.8s linear infinite`. No rounded corners on skeleton bars — they use `border-radius: 0` to stay on-brand.
- **Portfolio cards:** Placeholder uses a faint star pattern (`background-image: radial-gradient(#F8F8FF08 1px, transparent 1px)`) as the background while data loads.

### Empty / 404 / Error States

- **Empty portfolio section:** HUD-chrome wrapper with mono label `// NO_ITEMS_FOUND`. Below: `signal strength bars` (3 bars, all greyed to `#1A2148`). Body copy: "Nothing has entered this sector." in `Inter` 400 `#9BA3C7`. CTA button outlined as usual.
- **404 page:** Full `#02030A` background. ASCII starfield placeholder (static `<pre>` of dots and asterisks). Centered mono text: `ERROR 404 · COORDINATE NOT FOUND`. Lat/long HUD reads `0.0000° N, 0.0000° E`. "Return to origin →" link in plasma violet.
- **Error boundary / network failure:** Same HUD chrome. Mono label `SIGNAL_LOST` in amber `#FF8000` (using amber for warnings, on-brand). Retry button in standard outlined style. No red — red is off-palette.

### Hover Micro-interactions

| Element | Effect | Duration | Easing |
|---|---|---|---|
| Nav link | Underline grows left→right via `scaleX` from 0 to 1, `transform-origin: left` | `300ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Outlined button | Solar amber `#FF8000` border fades in; diagonal shine sweep `linear-gradient(105deg, transparent 40%, #FF800022 50%, transparent 60%)` scrolls left→right | `400ms` border / `600ms` shine | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Portfolio card | `translateY(-6px)` + faint violet glow `box-shadow: 0 12px 40px #7B5BFF22` | `350ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| HUD stat number | Color transitions from `#9BA3C7` → `#F8F8FF`, units remain plasma violet | `200ms` | `ease-out` |
| Three.js canvas (mouse move) | Camera parallax: `±0.1 rad` clamp, lerp factor `0.05` per frame (not CSS — Three.js) | Continuous | `lerp(current, target, 0.05)` |

### Reduced-motion Respect

```css
@media (prefers-reduced-motion: reduce) {
  /* Kill Three.js auto-rotation — set a flag read by the canvas component */
  /* Disable parallax: stop camera mouse tracking, fix camera */
  /* Remove section fade-in motion — show content immediately at full opacity */
  /* Kill button shine sweep */
  /* Retain color transitions ≤ 200ms — they are not vestibular triggers */
  
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 150ms !important;
  }
}
```

Specifically: expose a `useReducedMotion()` hook (Framer Motion has this built-in as `useReducedMotion()`). Pass result to the Three.js canvas as a prop. When `true`: disable `autoRotate`, disable mouse parallax, set static camera. The loading splash pulse also stops.

### Accessibility

- **Body text contrast:** `#9BA3C7` on `#02030A` = **3.8:1** — this fails WCAG AA for body text. Bump body/paragraph text to `#C2C8E0` for **5.2:1** minimum. Keep `#9BA3C7` for secondary labels (captions, HUD chrome) where it reads as "intentionally dim."
- **Star white `#F8F8FF` on void `#02030A`:** **19.6:1** — excellent for headings.
- **Plasma violet `#7B5BFF` on void `#02030A`:** **5.6:1** — passes AA. Do not use for body text smaller than 14px; use for headings and labels only.
- **Solar amber `#FF8000` on void `#02030A`:** **7.2:1** — AAA. Fine for all sizes.
- **Focus rings:** `2px solid #7B5BFF`, offset `4px`. Min visible area: any focused element must have at least 3:1 contrast between focus indicator and adjacent color.
- **Three.js canvas:** `<canvas aria-label="Interactive starfield background — decorative" role="img" aria-hidden="false" />`. Tab order must skip the canvas.
- **HUD lat/long decorative chrome:** Wrap in `<span aria-hidden="true">` — it conveys aesthetic, not information.
- **Keyboard nav:** Hamburger / mobile nav must be operable with `Enter`/`Space`. Trap focus within mobile drawer. `Escape` closes it.

### Key Transition Timings

| Transition | Duration | Easing |
|---|---|---|
| Hero text reveal (framer-motion stagger) | First word at `0ms`, stagger `80ms` per word, each fades from `opacity:0, y:20px` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Section `whileInView` fade-up | `800ms`, `y: 40 → 0`, stagger children `100ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Three.js bloom-point opacity ramp (on mount) | `2500ms` ease-in, material opacity `0 → 1` | `linear` (handled in `useFrame`) |
| Page-level route transition (fade) | `400ms` exit, `600ms` enter | `ease-in` / `cubic-bezier(0.16, 1, 0.3, 1)` |
| Modal / drawer open | `350ms` from trigger, `y: 20 → 0, opacity: 0 → 1` | `cubic-bezier(0.16, 1, 0.3, 1)` |

---

## V3 — Editorial

### Custom Cursor

- Default: system cursor (`cursor: default`). Do not override on desktop — an editorial magazine does not fight the browser's idiom.
- Hover over text links: cursor becomes `cursor: text` (I-beam) — editorial convention, links feel like inline editorial references.
- Hover over the terracotta hand-drawn arrow SVG: `cursor: pointer` + the arrow SVG itself gets a subtle `rotate(3deg)` wobble over `300ms cubic-bezier(0.34, 1.56, 0.64, 1)` (mild spring, not space-slow — this is a tactile paper piece).
- Hover over portfolio image placeholders: custom circle cursor, 48×48px, `border: 1.5px solid #C56738` (terracotta), label "VIEW" in `JetBrains Mono` 9px `ALL CAPS` centered — this is the only custom cursor moment.
- Touch devices: no overrides.

### Selection / Focus Colors

```css
/* Text selection — feels like pen highlighter on paper */
::selection {
  background-color: #C56738;  /* terracotta */
  color: #F5F1EA;              /* paper */
}

/* Focus ring — ink-style */
:focus-visible {
  outline: 2px solid #0F0F0F;  /* ink */
  outline-offset: 3px;
  border-radius: 0;            /* no radius — editorial is rectilinear */
}

/* On terracotta backgrounds (pull-quote rules, dividers) */
.on-terracotta:focus-visible {
  outline: 2px solid #F5F1EA;
  outline-offset: 3px;
}
```

### Scrollbar Styling

```css
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: #F5F1EA; }
::-webkit-scrollbar-thumb {
  background: rgba(15, 15, 15, 0.2); /* ink at 20% */
}
::-webkit-scrollbar-thumb:hover {
  background: #C56738; /* terracotta on hover */
}

* { scrollbar-width: thin; scrollbar-color: rgba(15,15,15,0.2) #F5F1EA; }
```

### Loading State

- **No flashy splash.** The page renders statically — editorial content is "already on the page." Use `font-display: block` for Fraunces (swap would cause jarring layout reflow given the large, tightly-kerned display sizes). Reserve exact space for headlines with explicit `min-height` matching the computed line.
- **Portfolio image placeholders:** Cream-toned rectangle `#EDE8DF` with a subtle noise texture overlay (`filter: url(#grain)` SVG filter — add a global `<svg>` grain filter with `feTurbulence baseFrequency="0.65" numOctaves="3"`). No shimmer — shimmer is digital, not paper.
- **If data must load async:** A single hairline `1px solid rgba(15,15,15,0.08)` border rectangle placeholder, cream fill, mono label "loading §" at bottom-right in `JetBrains Mono` 10px. Zero animation.

### Empty / 404 / Error States

- **Empty portfolio:** A full-bleed cream panel with terracotta rule at top and bottom. Center: Fraunces italic `"Nothing set in type yet."` at 32px. Below in mono 11px: `§ 00 — NO ITEMS`. No CTA button — instead, an inline terracotta text-link styled as an editorial reference: `→ Return to contents`.
- **404 page:** Magazine-layout 404. Large Fraunces ultra-light "404" at 180px+ on paper background. Below, mono folio label: `PAGE NOT FOUND / KPT`. Body copy in Fraunces 400: "This page has been removed from the edition." Terracotta rule divider then a "← Back to Vol. 01" link.
- **Network error:** Minimal. Mono text: `[CONNECTION FAILED]` in `#5C5852` (soft graphite). Retry as an inline link. No red — keep it typographic.

### Hover Micro-interactions

| Element | Effect | Duration | Easing |
|---|---|---|---|
| Text link (body) | Terracotta underline draws in left→right: `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)` | `400ms` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (ease-out-quad — ink-bleed feel) |
| Nav link | Same clip-path underline draw, `2px solid #C56738` | `350ms` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Portfolio image | Grain texture overlay fades from `opacity: 0.4` → `opacity: 0.7`; no lift, no shadow — magazine images are flat | `300ms` | `ease-out` |
| Hand-drawn arrow SVG | `rotate(3deg)` + `translateX(3px)` on hover; gentle overshoot | `300ms` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Section number (large Fraunces) | Color shift: `#0F0F0F` → `#C56738` | `250ms` | `ease-out` |
| Pull-quote block | Left border grows from `2px` → `4px` `#C56738` | `300ms` | `ease-out` |

### Reduced-motion Respect

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable clip-path underline draw — show underline immediately at full width */
  a {
    text-decoration-color: #C56738;
    /* remove clip-path animation */
  }
  
  /* Disable framer-motion whileInView fade-ups — content immediately visible */
  /* Retain color transitions ≤ 200ms */
  
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 200ms !important;
  }
}
```

The arrow SVG wobble stops — it simply appears without rotation. The `framer-motion` `useReducedMotion()` hook suppresses all `whileInView` reveals. Because this design uses `once: true`, content is already present in DOM — reduced-motion users just see it without the fade.

### Accessibility

- **Ink `#0F0F0F` on paper `#F5F1EA`:** **15.9:1** — excellent. All body text passes AAA.
- **Terracotta `#C56738` on paper `#F5F1EA`:** **3.1:1** — passes AA large text (≥18px or ≥14px bold) only. Do NOT use terracotta as body text color. Use it exclusively for: rules/dividers, captions (large enough), section labels at 14px+ bold, link underlines (decorative, not the text itself).
- **Soft graphite `#5C5852` on paper `#F5F1EA`:** **5.8:1** — passes AA for all text. Good for captions and secondary body.
- **Oxblood `#6B1F1F` on paper `#F5F1EA`:** **7.4:1** — AAA.
- **Focus ring:** `2px solid #0F0F0F` (ink), offset 3px. Visible against both paper and white.
- **Drop caps:** Wrap in `<span aria-hidden="true">` and ensure the full first word is still readable by screen readers (do not split the word into drop-cap span + rest-of-word span without an `aria-label` on the paragraph).
- **Pull-quote large quotation marks:** `aria-hidden="true"` on the decorative `"` characters; the quote text itself has full markup.
- **Inline SVG hand-drawn arrow:** `<svg aria-hidden="true" focusable="false">` — decorative.
- **Fraunces variable font:** Declare the optical axis explicitly: `font-variation-settings: 'opsz' 144, 'wght' 800` for hero display. This ensures correct rendering across browsers.
- **Keyboard nav:** Skip-to-content link styled as a terracotta button, visible on `:focus`. Section anchors (`§ 02 — STACK`) must be real heading elements (`<h2>`) not just mono-styled spans.

### Key Transition Timings

| Transition | Duration | Easing |
|---|---|---|
| `whileInView` section reveal (stagger children) | `600ms` per element, stagger `80ms`, `y: 30 → 0, opacity: 0 → 1` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Hero "KPT" headline entry (on mount) | `900ms`, `opacity: 0 → 1, y: 10 → 0` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Hero table-of-contents items stagger | Start at `400ms` after mount, `80ms` per item | Same easing |
| Page route transition | `300ms` fade-out, `500ms` fade-in | `ease-in` / `ease-out` |
| Terracotta rule (section divider) draw-in | `600ms` `scaleX: 0 → 1`, `transform-origin: left` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |

---

## V4 — Terminal

### Custom Cursor

- Default: system cursor hidden (`cursor: none` on all `*`). Replaced with an 8×16px blinking block in terminal green `#33FF66` — CSS-only:
  ```css
  #cursor {
    width: 8px;
    height: 16px;
    background: #33FF66;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    animation: cursor-blink 1s step-start infinite;
  }
  @keyframes cursor-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  ```
  Position updated by `mousemove` listener; `transform: translate(0, -50%)` so it sits beside the mouse point (terminal cursor appears to the right of the caret position).
- Hover over interactive elements: cursor changes color to amber `#FFB000` (status/warning = hover signal in this palette).
- On `mousedown`: cursor squishes to 8×8px square over `80ms step-end`.
- Touch devices: restore `cursor: auto`.

### Selection / Focus Colors

```css
/* Selection — magenta, as specified for selection in the brief */
::selection {
  background-color: #FF00FF;  /* magenta accent */
  color: #000000;
}

/* Focus ring — terminal green, 2px, no offset (flush to element, terminal-authentic) */
:focus-visible {
  outline: 2px solid #33FF66;
  outline-offset: 0;
  border-radius: 0;
}

/* For amber/warning contexts */
.status-warning:focus-visible {
  outline: 2px solid #FFB000;
}
```

### Scrollbar Styling

```css
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #000000; }
::-webkit-scrollbar-thumb {
  background: #2A2A2A;  /* hairline */
}
::-webkit-scrollbar-thumb:hover { background: #33FF66; }

* { scrollbar-width: thin; scrollbar-color: #2A2A2A #000000; }
```

### Loading State

- **Terminal boot sequence:** On page load, before content renders, show 400ms of fake boot output in a `<pre>` block:
  ```
  [    0.000] KPT/kernel booting...
  [    0.142] Loading assets...
  [    0.389] OK
  ```
  Each line appears via typewriter (character by character, `30ms` per character). After the sequence, content fades in immediately (no delay).
- **Async content loading:** No shimmer. Instead, a single line: `> loading... ▮` with the blinking cursor. When data arrives, the `> loading...` line is replaced (overwritten-style: fade old line out in `100ms`, fade new content in `100ms`).
- **Portfolio `ls -la` table:** While loading, show placeholder rows as `---------- ? ??? ??? ????  -------- ??????????` in `#444` (dim grey). Rows fill in one by one from top, `50ms` stagger.

### Empty / 404 / Error States

- **Empty portfolio:** Terminal output:
  ```
  $ ls -la ./projects/
  total 0
  > no results found
  > hint: run 'kpt new --project <name>' to add one
  ```
  All in terminal green on black, mono. No icon, no illustration.
- **404 page:** ASCII art "404" using block characters, terminal green. Below:
  ```
  bash: /path/not/found: No such file or directory
  exit code: 404
  $ _
  ```
  With blinking cursor. One link: `$ cd /home →` styled as a command.
- **Error / network failure:** `[ERROR] Connection refused (ECONNREFUSED)` in amber `#FFB000` (amber = warnings in V4 palette). Retry: `$ retry --force` as a button styled with `[ RETRY ]` bracket convention.

### Hover Micro-interactions

| Element | Effect | Duration | Easing |
|---|---|---|---|
| `[ GET STARTED ]` button | Full invert: `background: #33FF66, color: #000000` | `80ms` | `step-end` (instant digital flip — no smooth transition; terminals don't ease) |
| Nav tab items | Background fills with `#1A1A1A`, text color stays green | `60ms` | `step-end` |
| Portfolio `ls -la` row | Row highlights: `background: #1A1A1A`, no color change on text | `60ms` | `step-end` |
| ASCII box-drawing card | Border color `#2A2A2A` → `#33FF66` | `80ms` | `step-end` |
| Status bar segment | Text color shifts `#E0E0E0` → `#FFB000` | `80ms` | `step-end` |
| `[log output]` testimonial line | `opacity: 0.6` → `1.0` | `100ms` | `ease-out` (the one softening allowed) |

Note: Terminal interactions should feel **instantaneous and digital** — resist applying `cubic-bezier` easing to anything except the typewriter reveal. `step-end` or very short durations (`60–80ms`) are authentic to the CRT aesthetic.

### Reduced-motion Respect

```css
@media (prefers-reduced-motion: reduce) {
  /* Stop CRT scanline animation (if animated) */
  .scanlines { animation: none; }
  
  /* Stop cursor blink — show solid cursor */
  #cursor, .blink-cursor {
    animation: none;
    opacity: 1;
  }
  
  /* Stop typewriter — show all text immediately at full opacity */
  /* Framer Motion: useReducedMotion() → skip typewriter, show complete strings */
  
  /* Kill glitch flicker entirely */
  .glitch-hero { animation: none; filter: none; }
  
  /* Keep step-end hover states — they are not vestibular triggers */
  /* Keep boot sequence — but show all lines simultaneously, no delay */
}
```

The glitch RGB-split flicker on hero load is the highest-risk animation for vestibular/photosensitive users. It **must** be gated behind `prefers-reduced-motion: no-preference` check. Duration is already only 150ms, but even short flicker can trigger photosensitive seizures — add `@media (prefers-reduced-motion: no-preference) and (prefers-color-scheme: ...)` guard.

### Accessibility

- **Terminal green `#33FF66` on true black `#000000`:** **11.8:1** — passes AAA. All text sizes clear.
- **Amber `#FFB000` on black `#000000`:** **9.5:1** — AAA. Good for warnings.
- **Off-white `#E0E0E0` on black `#000000`:** **16.7:1** — AAA.
- **Dim grey `#444` on black `#000000`:** **2.3:1** — FAILS AA. Use `#444` only for purely decorative elements (dashed borders, placeholder table dashes). Never for readable text. Use `#666` (`3.6:1`) or higher for any text that needs reading.
- **Magenta `#FF00FF` on black `#000000`:** **5.8:1** — passes AA. Use only for selection (where `color: #000` compensates) and occasional accents.
- **Focus ring:** `2px solid #33FF66`, offset `0`. The green ring is clearly visible against black and dark-grey backgrounds.
- **Typewriter animation:** Must complete within 4 seconds per string. Users who tab past a typewriting section must receive the full text content immediately (use `aria-label` on the container with the complete pre-written string). Alternatively, add a "skip animation" mechanism: pressing `Tab` or `Escape` during typewriting instantly reveals full text.
- **ASCII box-drawing characters:** Wrap decorative box frames in `<span aria-hidden="true">`. The content inside boxes must be in real text nodes outside (or duplicated with `aria-label`).
- **`ls -la` portfolio table:** Must be a real `<table>` with `<th scope="col">` headers (even if visually styled as mono text) for screen reader column navigation.
- **CRT scanlines overlay:** `<div aria-hidden="true" class="scanlines" />` — purely decorative.
- **Status bar powerline arrows:** `aria-hidden="true"` on the `▶` separator characters.
- **Keyboard nav:** The fake terminal tabs (`[home] [work] [process] [contact]`) must be real `<nav>` + `<a>` or `<button>` elements. `--INSERT--` label is decorative — `aria-hidden="true"`.

### Key Transition Timings

| Transition | Duration | Easing |
|---|---|---|
| Typewriter hero `$ kpt --version` line | `30ms` per character, start after 200ms page load delay | — (JS `setInterval`) |
| Typewriter subsequent lines | Previous line complete + `300ms` pause, then next line starts at `30ms`/char | — |
| Hero glitch flicker (RGB split) | `150ms` total, 3 flicker frames: `0ms`, `50ms`, `100ms` | `step-end` in keyframes |
| Boot sequence fade-out | `200ms` opacity fade when complete | `ease-out` |
| Section reveal (`whileInView`) | `0ms` — content snaps in with no motion. Optional: `opacity: 0 → 1` only, `200ms`, `ease-out` if motion is allowed | `ease-out` |
| Portfolio row stagger fill-in | `50ms` per row, `opacity: 0 → 1`, `step-end` | `step-end` |
| Page route transition | `100ms` fade-out (terminal blink), `100ms` fade-in | `step-end` |

---

## Cross-cutting Recommendations

### Font Loading Strategy

All three designs load from `next/font/google`. Follow this pattern consistently:

```tsx
// In layout.tsx or per-page — NOT in component files
import { Inter, JetBrains_Mono, Fraunces } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '400', '700'],
  variable: '--font-inter',
  display: 'swap',       // V2: swap is fine, text sizes don't cause jarring reflow
})

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],        // REQUIRED for optical size axis
  weight: ['200', '400', '700', '900'],
  variable: '--font-fraunces',
  display: 'block',      // V3: use 'block' to prevent flash on huge display sizes
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
})
```

- Use `display: 'block'` for Fraunces in V3 (Editorial) to prevent a jarring FOUT at 180px+ headline sizes.
- Only preload the weight/subset actually used above the fold. Do not preload all weights.
- Set `<html>` `lang="en"` on all pages — screen readers need it; font subsetting relies on it.

### Image Optimization

- All portfolio images: use Next.js `<Image>` with explicit `width` and `height` (or `fill` + parent `position: relative`). Never omit dimensions — this is the single biggest source of CLS.
- V2 (Cosmos): portfolio images are dark-toned or space-colored; use `placeholder="blur"` with a dark `blurDataURL` (a 1×1 `#1A2148` pixel, base64-encoded).
- V3 (Editorial): portfolio images use cream-toned `blurDataURL` (`#EDE8DF`).
- V4 (Terminal): no decorative images. If portfolio thumbnails exist, use a 1×1 black placeholder.
- All images: `sizes` attribute matching the actual CSS max-width at each breakpoint. Example for full-width: `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"`.
- Serve AVIF with WebP fallback via Next.js `formats: ['image/avif', 'image/webp']` in `next.config.js`.

### Layout Shift Prevention

- Reserve space for all Three.js canvases (V2) with `aspect-ratio: 16/9` or explicit `height` on the wrapper `<div>` before the canvas mounts. Without this, the page reflows when the canvas appears.
- Reserve space for Fraunces variable font headlines (V3) by setting `min-height` on headline containers equal to the expected rendered height. Use `font-size-adjust` if needed.
- Avoid conditional rendering that changes layout dimensions. If a component conditionally shows/hides, use `opacity` / `visibility` + `height: 0` instead of `display: none` for elements that affect layout.
- CLS budget target: **< 0.1** on all three designs. Test with Chrome DevTools Performance panel or Vercel Speed Insights.
- Sticky/fixed nav: all three designs should add `padding-top` equal to nav height on the `<main>` element to prevent content jump on route change.

### Skip Links & Keyboard Navigation

All three designs must include:

```tsx
// In layout.tsx, before everything else
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2"
  style={{ background: 'var(--color-primary)', color: 'var(--color-bg)' }}
>
  Skip to main content
</a>
<main id="main-content" tabIndex={-1}>
  {children}
</main>
```

Style the skip link on-brand per design:
- V2: `background: #7B5BFF, color: #F8F8FF`
- V3: `background: #C56738, color: #F5F1EA`
- V4: `background: #33FF66, color: #000000`

### Scroll Behavior

- Use `scroll-behavior: smooth` only in CSS for anchor-link navigation (section jumps). Do NOT apply globally — it causes nausea for users who do not expect it.
- V2: `scroll-snap-type: y mandatory` is tempting for the cosmic "sections" feel but will conflict with the Three.js canvas scroll parallax. Use `proximity` snapping at most, or avoid entirely.
- V4: No smooth scroll. Terminal aesthetic = immediate, no easing. Use `scroll-behavior: auto`.

### Reduced-motion Global Gate

At the application level (`layout.tsx` or a root provider), check `prefers-reduced-motion` and pass a context value down:

```tsx
const prefersReducedMotion = useReducedMotion() // framer-motion hook
```

This single boolean gates: Three.js auto-rotate (V2), typewriter animations (V4), clip-path underlines (V3), and all `whileInView` stagger delays. Every design's most distinctive motion feature has a reduced-motion off-switch.
