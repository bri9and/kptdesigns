# V3 — Editorial

**Concept:** A design studio's own monograph. Every page is a magazine spread. KPT Designs is a master craftsperson, not a SaaS vendor. Inspired by Pentagram's monographs, Apple's "Designed by Apple in California" book, Aesop print ads, Kinfolk magazine, IT'S NICE THAT, Awwwards "Sites of the Year."

**Emotional target:** Considered, expensive, quietly confident. Slow scroll, deliberate pacing.

## Palette
- Paper: `#F5F1EA` (warm cream, NOT white)
- Ink: `#0F0F0F` (true near-black for text)
- Terracotta (brand-tie): `#C56738`
- Oxblood: `#6B1F1F`
- Sage: `#9CAF88`
- Soft graphite: `#5C5852`
- Hairline: `rgba(15,15,15,0.08)`

## Typography (the soul of this design)
- Display: `Fraunces` (variable serif via `next/font/google`) — wght 200–900, opsz 9–144. Use HEAVY opsz at hero, light opsz for fine print.
- Body: `Fraunces` 400 at smaller sizes, OR pair with `Inter` 400 for body — pick one consistently across all sections.
- Mono / captions: `JetBrains Mono` 400, ALL CAPS, wide tracking, small (10-11px). Used like magazine folios.
- Italic Fraunces for pull quotes — generous quotation marks.
- HEADLINES MAY HAVE OPTICAL ALIGNMENT (hanging punctuation, drop caps).

## Motion language
- Subtle. Stuff fades up on scroll, page-turn-style transitions.
- No parallax 3D. No fancy WebGL.
- Hover: underline draws in slow, ink-bleed style (clip-path animation).
- Body text appears "set" — already on the page, not animating in.
- Use `framer-motion` whileInView with `once: true`.

## Hero specifics
- Asymmetric magazine grid. Two columns, deliberately mismatched.
- LEFT: massive Fraunces "KPT" in ultra-bold, with optical kerning. Below it, in smaller Fraunces: "Designs."
- RIGHT: a "table of contents" style card listing 4-5 numbered features ("01 — Hand-Coded · 02 — Custom Type · 03 — Performance Sub-1s · 04 — Owned Outright"), JetBrains Mono labels.
- A single hand-drawn arrow (SVG) from one column pointing to another, organic / wobbly, drawn in terracotta.
- Top edge: a thin terracotta rule with "VOLUME 01 — ESTABLISHED 2004" in mono caps.
- Bottom edge: page folio "001 / KPT" right-aligned in mono.
- A pull quote sits below the fold, italic Fraunces, generous quote marks: "We don't ship templates. We set type."

## Section identities
- Sections use real magazine columns (max-width ~700px for body, with marginalia in mono).
- Pull quotes are LARGE Fraunces italic with hanging quote marks
- Numbers / stats use Fraunces ultra-light at huge sizes (180px+) with mono labels
- Section dividers: a thin terracotta rule + small mono index label ("§ 02 — STACK")
- Image placeholders: cream-toned with subtle film grain
- Drop caps on first paragraph of each section
- Captions in JetBrains Mono, italic, terracotta, small

## Anti-patterns (DO NOT)
- No icons in lucide-react style (too SaaS). If icons needed, draw inline SVG with hand-feel.
- No card grids with shadows
- No gradients except subtle paper texture
- No emojis
- No animation easing that feels like "tech demo"

## Available data
- `@/lib/portfolio` — see PortfolioItem type
- `next/font/google` — Fraunces, Inter, JetBrains Mono
- `framer-motion` — installed (use sparingly)
- Inline SVG for hand-drawn details

## Routing
Page is at `src/app/mockup/v3-editorial/page.tsx`. Sections live in `src/app/mockup/v3-editorial/_sections/`.
