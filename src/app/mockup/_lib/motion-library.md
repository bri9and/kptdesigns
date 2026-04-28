# Motion Library — V5 through V20

Reference for agents implementing animation in any KPT Designs mockup direction. Each value is authoritative — do not substitute without a comment.

---

## 1. Universal Easing Primitives

These four curves are the canonical easing vocabulary. Import or copy-paste the CSS custom-property block into any design's root stylesheet.

```css
:root {
  /* Spring-like settle — cosmic/cinematic scrolljack designs */
  --ease-kpt-slow: cubic-bezier(0.16, 1, 0.3, 1);

  /* Crisp material — terminal/data/punchy interactions */
  --ease-kpt-snap: cubic-bezier(0.4, 0, 0.2, 1);

  /* Discrete steps — typewriter, glitch, receipt printing */
  --ease-kpt-step-12: steps(12, end);
  --ease-kpt-step-8:  steps(8, end);
  --ease-kpt-step-2:  steps(2, end);

  /* Ink-like deceleration — editorial hover reveals, ink-bleed */
  --ease-kpt-ink: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

| Token | Raw Value | Character | Designs |
|---|---|---|---|
| `kpt-slow` | `cubic-bezier(0.16, 1, 0.3, 1)` | Overshoots slightly, settles slowly | V5, V6, V7, V10, V15 |
| `kpt-snap` | `cubic-bezier(0.4, 0, 0.2, 1)` | Fast-out, slow-in — material | V9, V11, V13, V17 |
| `kpt-step` | `steps(N, end)` | Discrete jumps, no interpolation | V9, V14, V17, V18, V20 |
| `kpt-ink` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Gradual deceleration | V8, V12, V16, V19 |

---

## 2. Per-Design Motion Fingerprint

### V5 — Tunnel

| Property | Value |
|---|---|
| Primary easing | `kpt-slow` — `cubic-bezier(0.16, 1, 0.3, 1)` |
| Scroll-bound camera | Z-advance via R3F `ScrollControls` — no explicit duration (bound to scroll progress) |
| UI element reveals | 1400 – 2400 ms |
| Ambient grid-wall pulse | 4000 – 8000 ms loop, `kpt-slow` |
| Ambient point-light drift | 6000 ms loop, `linear` |
| Key animations | Continuous forward camera Z-advance · grid-line pulse · checkpoint `<Html>` fade-in on scroll threshold |
| Motion don'ts | No bouncy springs. No Y-axis slide-ins. No stagger on HUD text. No eased scroll — scroll must be 1:1 raw progress. |

---

### V6 — Strata

| Property | Value |
|---|---|
| Primary easing | `kpt-slow` — `cubic-bezier(0.16, 1, 0.3, 1)` |
| Plane Z-translate | Bound to scroll progress — no duration |
| Plane opacity fade-in | 600 ms, `kpt-slow` |
| Plane opacity fade-out | 400 ms, `kpt-ink` |
| Text parallax within plane | 200 – 400 ms offset relative to plane, `kpt-slow` |
| Key animations | Transparency-slide plane pass-through · text parallax offset · perspective Z-transition |
| Motion don'ts | No 3D scenes (pure CSS). No bouncy springs. No horizontal movement. |

---

### V7 — Recursive Zoom

| Property | Value |
|---|---|
| Primary easing | `kpt-slow` — `cubic-bezier(0.16, 1, 0.3, 1)` |
| Scale-in (entering section) | `scale(0.001)` → `scale(1)`, bound to scroll progress |
| Scale-out (leaving section) | `scale(1)` → `scale(1000)`, bound to scroll progress + `opacity` 1 → 0 at 80% progress |
| Target: 60 fps | Scale transforms GPU-composited only (`transform`, no layout) |
| Key animations | Powers-of-Ten recursive scale · continuous no-gap transitions between sections |
| Motion don'ts | No hover `scale` states — conflict with scroll scale. No independent CSS keyframe loops during transition. |

---

### V8 — Codex

| Property | Value |
|---|---|
| Primary easing | `kpt-ink` — `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Ink-bleed reveal (hover only) | 800 – 1200 ms, `kpt-ink`, `clip-path` radial expand |
| Drop-cap first paint | Static — no animation |
| Marginal glow | 0 ms — CSS `box-shadow` only, no transition |
| Scroll | Standard vertical, no parallax |
| Key animations | Hover ink-bleed on illuminated initials and sigil elements only |
| Motion don'ts | No scroll parallax. No type animation. No floaty/bouncy anything. Ink bleeds are hover-only, not auto-play. |

---

### V9 — Ticker

| Property | Value |
|---|---|
| Primary easing | `kpt-snap` — `cubic-bezier(0.4, 0, 0.2, 1)` |
| Ticker horizontal scroll | Infinite marquee — 20 000 ms `linear` |
| Number flip (odometer) | 120 ms per digit, `steps(1, end)` |
| Chart redraw | 800 ms, `kpt-snap` |
| Cursor blink | 1000 ms `steps(2, end)` infinite |
| Key animations | Horizontal ticker marquee · number-flip odometer · live chart redraw · cursor blink |
| Motion don'ts | No slow fades. No scale transforms. No scroll-hijack. |

---

### V10 — Atelier

| Property | Value |
|---|---|
| Primary easing | `kpt-slow` — `cubic-bezier(0.16, 1, 0.3, 1)` |
| Section fade-in | 1200 ms, `kpt-slow` |
| Image hover scale | `scale(1.02)`, 1200 ms, `kpt-slow` |
| Image hover overlay | `opacity` 0 → 0.15, 800 ms, `kpt-ink` |
| CTA hover | 300 ms, `kpt-snap` |
| Key animations | Slow elegant fade-in on scroll · subtle image scale on hover |
| Motion don'ts | No bouncy springs. No fast snappy transitions. Nothing feels tech. |

---

### V11 — Architectural

| Property | Value |
|---|---|
| Primary easing | `kpt-snap` — `cubic-bezier(0.4, 0, 0.2, 1)` |
| Dimension-line draw-on | `stroke-dashoffset` 100% → 0, 1000 – 1800 ms, `kpt-snap`, triggered by scroll |
| Hover dimension overlay | 400 ms fade-in, `kpt-snap` |
| Blueprint grid render | 0 ms — static, no animation |
| Key animations | SVG line draw-on scroll · hover dimension callout reveal |
| Motion don'ts | No filled-shape animations. No parallax. No warm aesthetic transitions. |

---

### V12 — Specimen

| Property | Value |
|---|---|
| Primary easing | `kpt-ink` — `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Letterform scroll reveal | `opacity` 0 → 1 + `translateY(24px)` → `0`, 600 ms, `kpt-ink` |
| Variable font axis animation | `font-variation-settings` `opsz` 9 → 144 on scroll, bound to progress |
| Key animations | Letterform reveal on scroll · variable-font axis interpolation |
| Motion don'ts | No icons. No image parallax. No color transitions beyond opacity. |

---

### V13 — Conversation

| Property | Value |
|---|---|
| Primary easing | `kpt-snap` — `cubic-bezier(0.4, 0, 0.2, 1)` |
| Message bubble slide-up | `translateY(16px)` → `0` + `opacity` 0 → 1, 320 ms, `kpt-snap` |
| Typing indicator dot bounce | 600 ms loop, `cubic-bezier(0.45, 0.05, 0.55, 0.95)`, staggered 100 ms per dot |
| Thinking / loading | 3-dot bounce loop, infinite until response |
| Agent response reveal | Staggered word-by-word or bubble-by-bubble, 40 ms per token approx |
| Key animations | Bubble slide-up · typing indicator · staggered agent response |
| Motion don'ts | No page transitions. No scroll-hijack. No icon animations beyond cursor. |

---

### V14 — Cassette

| Property | Value |
|---|---|
| Primary easing | `kpt-step` — `steps(8, end)` for mechanical, `kpt-slow` for smooth mechanical |
| Tape spool rotation | `rotate(360deg)`, 8000 ms `linear` infinite — left spool CCW when "playing" |
| VU meter bounce | `scaleY` 0.1 → 1.0, 80 – 200 ms, `steps(4, end)` randomized on hover |
| Button press | `translateY(2px)` + `box-shadow` shrink, 80 ms `steps(1, end)` |
| LED blink | 1200 ms `steps(2, end)` infinite |
| Key animations | Tape spool CSS rotation · VU meter live response · button press depth |
| Motion don'ts | No flat modern transitions. No opacity-only fades — everything needs tactile physicality. |

---

### V15 — Atlas

| Property | Value |
|---|---|
| Primary easing | `kpt-slow` — `cubic-bezier(0.16, 1, 0.3, 1)` |
| Contour line draw | `stroke-dashoffset` 100% → 0, 1200 – 2000 ms, `kpt-slow`, on scroll |
| Map pin drop | `translateY(-20px)` → `0` + `scale(0)` → `1`, 500 ms, `cubic-bezier(0.34, 1.56, 0.64, 1)` (slight overshoot intentional) |
| Elevation badge fade | `opacity` 0 → 1, 400 ms, `kpt-ink` |
| Key animations | Contour draw on scroll · pin drop with bounce · elevation label reveal |
| Motion don'ts | No cards. No horizontal slides. No fast/aggressive easing. |

---

### V16 — Broadsheet

| Property | Value |
|---|---|
| Primary easing | `kpt-ink` — `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| First-paint press reveal | `opacity` 0 → 1 + subtle `blur(1px)` → `blur(0)`, 600 ms, `kpt-ink`, runs once on mount |
| Hover links | `color` transition, 150 ms, `linear` |
| All other motion | None |
| Key animations | Single first-paint reveal only |
| Motion don'ts | No scroll animations. No parallax. No continuous loops. One reveal on load, nothing else. |

---

### V17 — Nostromo

| Property | Value |
|---|---|
| Primary easing | `kpt-snap` — `cubic-bezier(0.4, 0, 0.2, 1)` |
| CRT scanline scroll | `translateY` 0 → 100%, 5000 ms `linear` infinite |
| Phosphor decay on text | `text-shadow` fade, 800 ms `kpt-snap` after interaction |
| Indicator light blink | 1000 – 3000 ms randomized `steps(2, end)` infinite — stagger each indicator |
| RGB glitch split | `translateX` ±3px on R/B channels, 200 ms `steps(4, end)`, hover or periodic |
| Button press (panel) | `box-shadow` inset shrink + `brightness(1.4)`, 60 ms `steps(1, end)` |
| Key animations | CRT scanlines · phosphor decay · irregular indicator blink · RGB glitch on hover |
| Motion don'ts | No clean modern easing. No bouncy springs. No smooth fades — everything is analog/digital. |

---

### V18 — Receipt

| Property | Value |
|---|---|
| Primary easing | `kpt-step` — `steps(12, end)` |
| Section print reveal | Height `0` → `auto` (via max-height proxy), `steps(12, end)`, 800 ms per section |
| Roller-feed jitter | `translateY(1px)` → `translateY(-1px)` alternating, 60 ms `steps(2, end)`, during "printing" |
| Print-head line | Thin horizontal rule sweeps down, 800 ms `steps(12, end)` |
| Key animations | Top-to-bottom stepped height reveal · roller jitter · print-head sweep |
| Motion don'ts | No smooth fades. No scale transforms. No parallax. Receipt prints in steps only. |

---

### V19 — Risograph

| Property | Value |
|---|---|
| Primary easing | `kpt-ink` — `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Misregistration hover flicker | `translateX` ±2px on color layers, 150 ms `steps(3, end)` on hover |
| Halftone pattern drift | `backgroundPosition` shift 0 → 4px, 8000 ms `linear` infinite |
| Paper grain shift | `backgroundPosition` shift 0 → 2px, 12 000 ms `linear` infinite |
| Hue-shift (riso channels) | `hue-rotate` ±4deg, 3000 ms `kpt-ink` alternate infinite |
| Key animations | Hover misregistration flicker · halftone drift · paper grain shift |
| Motion don'ts | No clean digital effects. No fast motion. Subtle analog drift only — nothing obvious. |

---

### V20 — Operator Manual

| Property | Value |
|---|---|
| Primary easing | `kpt-ink` — `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Page-flip transition | `rotateY(0)` → `rotateY(-90deg)` + next page `rotateY(90deg)` → `rotateY(0)`, 400 ms `kpt-ink` |
| Section anchor jump | Instant (`scroll-behavior: auto`) — no smooth scroll |
| All other motion | None |
| Key animations | Page-flip on section nav only |
| Motion don'ts | No scroll animations. No loops. No hover effects. Static document — motion only on deliberate navigation. |

---

## 3. Reusable Framer Motion Variants (TypeScript)

Paste these into a shared `_lib/motion-variants.ts` file. All durations in seconds (Framer convention).

```typescript
// src/app/mockup/_lib/motion-variants.ts
import { Variants } from "framer-motion";

// ─── Easing constants ──────────────────────────────────────────────────────────
export const EASE_KPT_SLOW = [0.16, 1, 0.3, 1] as const;
export const EASE_KPT_SNAP = [0.4, 0, 0.2, 1] as const;
export const EASE_KPT_INK  = [0.25, 0.46, 0.45, 0.94] as const;

// ─── fadeUp ───────────────────────────────────────────────────────────────────
// Used by: V5 (HUD overlays), V6 (plane text), V10, V12, V13
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_KPT_SLOW },
  },
};

// ─── fadeInScale ──────────────────────────────────────────────────────────────
// Used by: V5 (checkpoint reveals), V13 (bubble appear), V15 (pin reveal)
export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_KPT_SLOW },
  },
};

// ─── staggeredChildren ────────────────────────────────────────────────────────
// Wrap any list. Children use fadeUp or fadeInScale as their own variant.
export const staggeredChildren: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// ─── scrollReveal ─────────────────────────────────────────────────────────────
// Apply to any motion.div with whileInView="visible" initial="hidden"
// viewport={{ once: true, margin: "-80px" }}
// Used by: V8, V10, V11 (line draw trigger), V12, V15, V16
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_KPT_INK },
  },
};

// ─── typewriter ───────────────────────────────────────────────────────────────
// Use with useAnimate() from framer-motion.
// Call animateTypewriter(scope, text, charDuration) on mount.
// Used by: V9 (terminal output), V13 (agent response), V17, V18, V20
//
// Example usage:
//   const [scope, animate] = useAnimate();
//   useEffect(() => { animateTypewriter(scope, "Hello World", 0.04); }, []);
//
export async function animateTypewriter(
  scope: ReturnType<typeof import("framer-motion").useAnimate>[0],
  text: string,
  charDurationSec = 0.04
) {
  const { animate } = await import("framer-motion");
  for (let i = 0; i <= text.length; i++) {
    await animate(
      scope.current,
      { "--typewriter-chars": i } as Record<string, number>,
      { duration: 0, ease: "linear" }
    );
    await new Promise((r) => setTimeout(r, charDurationSec * 1000));
  }
}

// ─── glitch ───────────────────────────────────────────────────────────────────
// RGB-split keyframe variant for V17 (Nostromo) and V19 (Risograph hover).
// Apply as `animate` on a motion.div wrapping text.
// Trigger on hover or on a timed interval.
//
// CSS companion required — see Section 4 (risograph-misregistration / glitch-split).
export const glitchAnimate = {
  x: [0, -3, 3, -2, 2, 0],
  filter: [
    "none",
    "drop-shadow(3px 0 0 #FF3030) drop-shadow(-3px 0 0 #00E5FF)",
    "drop-shadow(-3px 0 0 #FF3030) drop-shadow(3px 0 0 #00E5FF)",
    "drop-shadow(2px 0 0 #FF3030) drop-shadow(-2px 0 0 #00E5FF)",
    "drop-shadow(-1px 0 0 #FF3030) drop-shadow(1px 0 0 #00E5FF)",
    "none",
  ],
  transition: {
    duration: 0.2,
    ease: "linear",
    times: [0, 0.2, 0.4, 0.6, 0.8, 1],
  },
};

// ─── chatBubbleSlideUp ────────────────────────────────────────────────────────
// V13 — Conversation: per-message animation
export const chatBubbleSlideUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: EASE_KPT_SNAP },
  },
};

// ─── typingDot ────────────────────────────────────────────────────────────────
// V13 — each dot in the typing indicator
// Stagger with staggeredChildren (0.1s stagger)
export const typingDot: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [-4, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: "loop",
      ease: [0.45, 0.05, 0.55, 0.95],
    },
  },
};
```

---

## 4. CSS Keyframe Library

Named animations any design can include. Paste the entire block or cherry-pick by design.

```css
/* ─── @keyframes blink-cursor ────────────────────────────────────────────── */
/* V9 Ticker · V13 Conversation · V17 Nostromo · V18 Receipt · V20 Operator  */
@keyframes blink-cursor {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
.blink-cursor {
  animation: blink-cursor 1s steps(2, end) infinite;
}

/* ─── @keyframes scan-lines ──────────────────────────────────────────────── */
/* V9 Ticker · V17 Nostromo                                                  */
/* Overlay a repeating-linear-gradient pseudo-element; shift Y on this.      */
@keyframes scan-lines {
  0%   { transform: translateY(0%); }
  100% { transform: translateY(100%); }
}
.scan-lines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 3px,
    rgba(0, 0, 0, 0.12) 3px,
    rgba(0, 0, 0, 0.12) 4px
  );
  pointer-events: none;
  animation: scan-lines 5s linear infinite;
}

/* ─── @keyframes tape-spool-rotate ──────────────────────────────────────── */
/* V14 Cassette — apply to left spool (CCW) and right spool (CW)             */
@keyframes tape-spool-rotate-cw {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes tape-spool-rotate-ccw {
  from { transform: rotate(0deg); }
  to   { transform: rotate(-360deg); }
}
.tape-spool-right {
  animation: tape-spool-rotate-cw  8s linear infinite;
}
.tape-spool-left {
  animation: tape-spool-rotate-ccw 8s linear infinite;
}
/* Pause both when [data-playing="false"] */
[data-playing="false"] .tape-spool-right,
[data-playing="false"] .tape-spool-left {
  animation-play-state: paused;
}

/* ─── @keyframes typewriter-cursor ──────────────────────────────────────── */
/* Distinct from blink-cursor — used inline after typewriter text.           */
/* V9, V13, V17, V18                                                         */
@keyframes typewriter-cursor {
  0%, 49%  { border-right-color: currentColor; }
  50%, 100% { border-right-color: transparent; }
}
.typewriter-cursor {
  border-right: 2px solid currentColor;
  animation: typewriter-cursor 1s steps(2, end) infinite;
  padding-right: 2px;
}

/* ─── @keyframes risograph-misregistration ───────────────────────────────── */
/* V19 Risograph — subtle continuous hue drift on color layers               */
/* Apply to .riso-layer-pink or .riso-layer-teal pseudo-elements             */
@keyframes risograph-misregistration {
  0%   { transform: translate(0px, 0px);   filter: hue-rotate(0deg);   }
  25%  { transform: translate(1px, -1px);  filter: hue-rotate(2deg);   }
  50%  { transform: translate(-1px, 1px);  filter: hue-rotate(-2deg);  }
  75%  { transform: translate(1px, 1px);   filter: hue-rotate(1deg);   }
  100% { transform: translate(0px, 0px);   filter: hue-rotate(0deg);   }
}
.riso-layer-pink {
  animation: risograph-misregistration 3000ms cubic-bezier(0.25, 0.46, 0.45, 0.94) alternate infinite;
}
.riso-layer-teal {
  animation: risograph-misregistration 4000ms cubic-bezier(0.25, 0.46, 0.45, 0.94) alternate-reverse infinite;
}

/* ─── @keyframes glitch-split ────────────────────────────────────────────── */
/* V17 Nostromo · V19 Risograph hover                                        */
@keyframes glitch-split {
  0%, 100% {
    text-shadow: none;
    transform: translateX(0);
  }
  20% {
    text-shadow: 3px 0 0 #FF3030, -3px 0 0 #00E5FF;
    transform: translateX(-2px);
  }
  40% {
    text-shadow: -3px 0 0 #FF3030, 3px 0 0 #00E5FF;
    transform: translateX(2px);
  }
  60% {
    text-shadow: 2px 0 0 #FF3030, -2px 0 0 #00E5FF;
    transform: translateX(-1px);
  }
  80% {
    text-shadow: none;
    transform: translateX(1px);
  }
}
.glitch-text:hover {
  animation: glitch-split 200ms steps(4, end);
}

/* ─── @keyframes receipt-print ───────────────────────────────────────────── */
/* V18 Receipt — stepped height reveal for each section                      */
@keyframes receipt-print {
  from { max-height: 0; opacity: 0.4; }
  to   { max-height: 2000px; opacity: 1; }
}
.receipt-section {
  overflow: hidden;
  animation: receipt-print 800ms steps(12, end) forwards;
}

/* ─── @keyframes roller-jitter ───────────────────────────────────────────── */
/* V18 Receipt — micro vertical jitter during print reveal                   */
@keyframes roller-jitter {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(1px); }
}
.receipt-section.printing {
  animation:
    receipt-print  800ms steps(12, end) forwards,
    roller-jitter   60ms steps(2, end) 8 forwards;
}

/* ─── @keyframes ink-bleed ───────────────────────────────────────────────── */
/* V8 Codex · V12 Specimen — hover reveal via radial clip-path               */
@keyframes ink-bleed {
  from { clip-path: circle(0% at 50% 50%); }
  to   { clip-path: circle(150% at 50% 50%); }
}
.ink-bleed-hover:hover .ink-bleed-target {
  animation: ink-bleed 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

/* ─── @keyframes dimension-draw ─────────────────────────────────────────── */
/* V11 Architectural — SVG stroke draw-on via stroke-dashoffset              */
/* Set stroke-dasharray="<totalLength>" stroke-dashoffset="<totalLength>"    */
/* on the SVG path, then trigger this class when in view.                    */
@keyframes dimension-draw {
  from { stroke-dashoffset: var(--line-length, 1000); }
  to   { stroke-dashoffset: 0; }
}
.dimension-line.in-view {
  animation: dimension-draw 1200ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* ─── @keyframes halftone-drift ─────────────────────────────────────────── */
/* V19 Risograph — very slow halftone pattern background drift               */
@keyframes halftone-drift {
  from { background-position: 0 0; }
  to   { background-position: 4px 4px; }
}
.halftone-layer {
  animation: halftone-drift 8000ms linear infinite;
}
```

---

## 5. Reduced-Motion Fallback Patterns

Wrap all animation declarations in a `@media (prefers-reduced-motion: no-preference)` block, or use the inverse `@media (prefers-reduced-motion: reduce)` override. Framer Motion reads `useReducedMotion()`.

### Global kill-switch (Framer Motion)

```typescript
// In any component that uses motion
import { useReducedMotion, Variants } from "framer-motion";

function useAccessibleVariants(full: Variants, reduced: Variants): Variants {
  const prefersReduced = useReducedMotion();
  return prefersReduced ? reduced : full;
}
```

### Per-design fallback table

| Design | Disabled in reduced-motion | Substitute |
|---|---|---|
| **V5 Tunnel** | Scroll-bound camera Z-advance, grid pulse, point-light drift | Standard vertical scroll; tunnel renders as static hero image; checkpoints are standard sections |
| **V6 Strata** | Z-translate plane pass-through, text parallax | Standard vertical scroll; each plane is a normal full-height section |
| **V7 Recursive Zoom** | Scroll-bound scale transitions | Sections appear with `opacity` 0 → 1 fade on scroll (`whileInView`), no scale |
| **V8 Codex** | Ink-bleed hover clip-path animation | Hover shows overlay instantly (`transition: none`) |
| **V9 Ticker** | Horizontal marquee, number-flip odometer, chart redraws, cursor blink | Numbers are static; marquee is static strip; charts are static SVGs; no cursor |
| **V10 Atelier** | Image scale hover, slow fade-in on scroll | Images static; sections visible on load without fade |
| **V11 Architectural** | SVG dimension-line draw-on, hover overlays | Lines pre-drawn (full `stroke-dashoffset: 0`); overlays visible without animation |
| **V12 Specimen** | Letterform scroll reveal, variable-font axis animation | All text visible at full opacity; `font-variation-settings` set to target value statically |
| **V13 Conversation** | Bubble slide-up, typing-indicator bounce, staggered agent response | Bubbles appear instantly; typing indicator is static three-dot ellipsis; responses appear immediately |
| **V14 Cassette** | Tape spool rotation, VU meter bounce, LED blink | Spools static; VU meters at resting state; LEDs solid (no blink) |
| **V15 Atlas** | Contour line draw, map pin drop bounce | Lines pre-drawn; pins at final position; no bounce |
| **V16 Broadsheet** | First-paint blur/opacity reveal | Page rendered fully visible on load |
| **V17 Nostromo** | CRT scanline scroll, phosphor decay, indicator light blink, RGB glitch | Scanlines static overlay; phosphor decay instant; indicators solid; no glitch |
| **V18 Receipt** | Stepped height reveal, roller jitter, print-head sweep | All sections fully visible on load; no print animation |
| **V19 Risograph** | Misregistration hover flicker, halftone drift, hue-shift loops | Layers at `transform: translate(0,0)`, `filter: none`; background-position static |
| **V20 Operator Manual** | Page-flip transition | Section content revealed instantly; no rotation transform |

### CSS reduced-motion block (global)

```css
@media (prefers-reduced-motion: reduce) {
  /* Kill all infinite loops */
  .blink-cursor,
  .scan-lines::after,
  .tape-spool-right,
  .tape-spool-left,
  .riso-layer-pink,
  .riso-layer-teal,
  .halftone-layer,
  .typewriter-cursor {
    animation: none;
  }

  /* Kill all hover animations */
  .glitch-text:hover { animation: none; }
  .ink-bleed-hover:hover .ink-bleed-target { animation: none; clip-path: none; }

  /* Pre-reveal receipt sections */
  .receipt-section {
    animation: none;
    max-height: none;
    opacity: 1;
  }

  /* Pre-draw dimension lines */
  .dimension-line {
    stroke-dashoffset: 0 !important;
    animation: none;
  }

  /* Stop ticker marquee */
  .ticker-marquee {
    animation: none;
    /* Fallback: allow overflow scroll */
    overflow-x: auto;
  }
}
```

---

*Last updated: 2026-04-28 · 16 designs catalogued (V5 – V20)*
