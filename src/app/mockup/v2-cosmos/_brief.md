# V2 — Cosmos

**Concept:** Cosmic exploration. The user is navigating a vast 3D field that maps the territory of modern web. KPT Designs is the cartographer. Inspired by osr.org/oms (One Million Stars), James Webb deep-field imagery, and the Three.js journey demos.

**Emotional target:** Awe, scale, calm precision. Not a product demo — a planetarium.

## Palette
- Void: `#02030A`
- Deep navy: `#0A0E27`
- Midnight: `#1A2148`
- Star white: `#F8F8FF`
- Plasma violet: `#7B5BFF`
- Nebula pink: `#FF6BC1`
- Solar amber (KPT brand-tie): `#FF8000`
- Cool grey text: `#9BA3C7`

## Typography
- Display: `Inter` (loaded via `next/font/google`), weights 200/400/700, very loose tracking on headlines
- Body: `Inter` 400
- Mono / data: `JetBrains Mono` 400/500 for stats and HUD-style chrome
- Headlines may use VARIABLE letter-spacing — wide on hero, normal on body

## Motion language
- Slow. 1.5–4s eases. Cubic-bezier(0.16, 1, 0.3, 1).
- Hero starfield: real Three.js using `@react-three/fiber` + `@react-three/drei`. Use `<Points>` instanced, mouse parallax, slow auto-rotate.
- Sections fade in with `<motion.*>` from `framer-motion` (already installed).
- No bouncing, no spring overshoot. Cosmic = inertia.

## Hero specifics (most important section)
- Three.js starfield background, full viewport, ~5000 points
- Parallax: rotate camera slightly with mouse position (clamp ±0.1 rad)
- Slow auto-rotation on Y axis (0.0005 rad/frame)
- Bloom-style glow on points (use additive blending, low opacity, large size)
- Foreground: huge centered "KPT DESIGNS" with super-loose tracking, plasma-violet underline gradient
- Subhead: "We map the modern web."
- Below: small HUD chrome (lat/long-style coordinates, signal strength bars, date stamp) — feels like a navigation console
- Optional: faint constellation lines connecting closest stars (use `<Line>` from drei)

## Section identities (apply to non-hero sections)
- Sections sit on `var(--void)` or near-black with subtle radial gradient hints of nebula color
- Use HUD-styled chrome: thin 1px borders, mono numerical labels, small connector ticks
- Cards float over a faint star backdrop pattern
- Numbers are big, mono, with units in plasma-violet
- Buttons: outlined with star-white border, solar-amber accent on hover, slow shine sweep

## Anti-patterns (DO NOT)
- No racing/F1 vibe (that's V1's territory)
- No standard rounded-card SaaS look
- No light backgrounds — this is space
- No emoji
- No frosted-glass / glassmorphism (overused)

## Available data
- `@/lib/portfolio` — array of `PortfolioItem`. Use for portfolio section.
- `next/font/google` — for fonts
- `@react-three/fiber`, `@react-three/drei`, `three` — installed
- `framer-motion` — installed
- `lucide-react` — icon set, already used elsewhere

## Routing
Page is at `src/app/mockup/v2-cosmos/page.tsx`. Sections live in `src/app/mockup/v2-cosmos/_sections/`.
