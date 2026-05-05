# V4 — Terminal

**Concept:** A senior engineer's dotfiles brought to life. CRT phosphor, hand-built tooling, no marketing fluff. KPT Designs as the developer's developer. Inspired by Berkshelf's docs, vim color schemes, Cyberdeck builds, the Plan 9 OS aesthetic, godly.website's monospaced entries, Linear's "Engineers" page, htop, neofetch.

**Emotional target:** Gritty, confident, hand-crafted, technically literate. The opposite of "Lovable AI website builder" slop. This is what someone who *codes for a living* would pick.

## Palette
- True black: `#000000`
- Terminal green: `#33FF66` (phosphor)
- Amber alt: `#FFB000` (for status / warnings)
- Magenta accent: `#FF00FF` (rare, for selection / cursors)
- Off-white: `#E0E0E0`
- Dim grey: `#444`
- Dark grey: `#1A1A1A`
- Hairline: `#2A2A2A`

## Typography
- Everything in `JetBrains Mono` (via `next/font/google`), weights 400/500/700.
- Use SMALL sizes (12–14px body) — terminal feel. Hero numbers can go big (80–160px) but stay mono.
- ALL CAPS for headers in some sections, mixed-case for "log output."
- Letter-spacing 0 (mono is already wide). Line-height 1.4–1.6.

## Motion language
- Typewriter reveal on key text — letter by letter.
- Blinking block cursor `▮` after live-typing text.
- CRT scanlines as a fixed overlay (subtle: 1px lines at 4px spacing, ~0.04 opacity).
- Glitch flicker on hero load (very subtle hue/RGB split for ~150ms).
- Hover states: invert colors (bg→fg, fg→bg).
- Use Framer Motion for typewriter timing; CSS for cursor blink and scanlines.

## Hero specifics
- Black background, faint scanlines overlay (mix-blend-mode: overlay), faint CRT vignette
- ASCII art "KPT" in terminal green (multi-line block letters). Render with `<pre>`.
- Below ASCII: a fake terminal session
  ```
  $ kpt --version
  KPT DESIGNS v4.0.1 (2004-2026)
  $ kpt status
  > systems online · 47 sites deployed · 0 templates used
  $ kpt build --modern
  > _
  ```
  — last line has a blinking cursor.
- Status bar at bottom (vim/tmux style): segments separated by powerline arrows, showing "BRANCH: main · DEPLOYS: ✓ · CLIENTS: 47 · UPTIME: 99.99%"
- Top bar: tab list ("[home] [work] [process] [contact] -- INSERT --")

## Section identities
- Each section has a "boxed" header in ASCII frame characters (┌─┐ │ │ └─┘) — render with `<pre>` and care about alignment
- Cards are unstyled blocks with border `1px dashed #444` or solid `1px #2A2A2A`
- Numbers / stats: huge mono, terminal green, with amber units
- Buttons: `[ GET STARTED ]` style, with brackets, hover inverts
- Log-output style for testimonials / process steps (`[2026-04-28 14:32:01] INFO: Discovery call scheduled.`)
- Portfolio: terminal `ls -la` output style — table with permissions, dates, names

## Anti-patterns (DO NOT)
- No glassmorphism, no shadows, no gradients (except subtle scanlines)
- No rounded corners (radius: 0 everywhere)
- No emojis (use ASCII / box-drawing characters: ✓ ✗ → · ◆)
- No "modern SaaS" tropes
- No hero section with stock illustrations
- No marketing-speak headlines — use developer-flavored copy

## Available data
- `@/lib/portfolio` — see PortfolioItem type
- `next/font/google` — JetBrains Mono
- `framer-motion` — for typewriter
- Inline SVG / unicode for box-drawing

## Routing
Page is at `src/app/mockup/v4-terminal/page.tsx`. Sections live in `src/app/mockup/v4-terminal/_sections/`.
