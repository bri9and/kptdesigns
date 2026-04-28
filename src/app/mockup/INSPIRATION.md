# Mockup Inspiration References

Visual references for the three KPT Designs mockup directions.
Patterns are written to be directly liftable by the implementer.

> Note: Chrome browser MCP extension was unavailable during scouting (extension not connected).
> References below are drawn from deep firsthand knowledge of these sites as of mid-2025.

---

## V2 — Cosmos

### 1. Three.js Journey — https://threejs-journey.com

**One-line:** Bruno Simon's course site uses a full-viewport WebGL world where the user literally drives through 3D terrain.

**Liftable patterns:**
- **Depth-fog gradient on starfield:** Apply `THREE.FogExp2(0x02030A, 0.0012)` so distant star clusters fade into void rather than hard-cutoff — creates the infinite-space illusion without clipping.
- **HUD typography overlay:** Headline sits dead-center in viewport with `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)` atop the canvas; `mix-blend-mode: normal` at z-index 10; canvas never blurs or dims — the type floats in space, not on a card.
- **Additive blending on points:** `THREE.AdditiveBlending` + `depthWrite: false` on the points material; use two `<Points>` layers — one large/bright for "close" stars, one small/dim for "far" — gives convincing depth without raymarching.

---

### 2. Void / Hi-Res Black Ice — https://void.hi-res.net/blackice

**One-line:** A single full-screen animated crystalline simulation; zero chrome, no nav, pure awe.

**Liftable patterns:**
- **Radial vignette for space depth:** CSS overlay: `radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #02030A 100%)` as an absolutely-positioned `<div>` above the canvas at opacity 0.85 — darkens edges, focuses eye on center glow.
- **Plasma color leak at horizon:** Position a second radial at `bottom center`: `radial-gradient(ellipse 120% 40% at 50% 100%, #7B5BFF22, transparent 60%)` — appears as a violet aurora behind the starfield.
- **No UI on load:** Delay all text/HUD elements by 1.8s with `framer-motion` `initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1.2 }}` — let the canvas breathe first.

---

### 3. Stripe Press / Cosmos-era homepage — https://press.stripe.com

**One-line:** Dense editorial grid on a near-black background; meticulous type hierarchy using both serif and mono; feels like a published artifact.

**Liftable patterns:**
- **Stat/HUD chrome:** Wrap coordinate-style labels in a `<dl>` grid: `dt` in JetBrains Mono 10px `#9BA3C7` ALL CAPS tracked at `0.15em`; `dd` in JetBrains Mono 14px `#F8F8FF`; separate with `1px solid #1A2148`; the whole block has `border: 1px solid #1A2148; padding: 12px 16px` — reads as a navigation console instrument panel.
- **Sparse hero subhead:** Keep the hero subhead to ≤ 7 words at Inter 300, `letter-spacing: 0.08em`, color `#9BA3C7` — placing it 24px below the main headline at 50% the headline's font size creates the "log line below title card" rhythm.
- **Plasma-violet gradient underline:** Use a `<span>` with `background: linear-gradient(90deg, #7B5BFF, #FF6BC1); background-size: 100% 2px; background-position: 0 100%; background-repeat: no-repeat; padding-bottom: 3px` instead of a CSS border — the gradient bleeds slightly at the ends like a laser line.

---

## V3 — Editorial

### 4. Pentagram — https://www.pentagram.com/work

**One-line:** The world's most respected design firm's portfolio; type-led, asymmetric, generous white space, zero decoration.

**Liftable patterns:**
- **Asymmetric two-column hero grid:** CSS Grid: `grid-template-columns: 3fr 2fr; gap: 0; align-items: end` — left column for the monster headline, right column for the numbered feature list. The deliberate `align-items: end` makes the two columns bottom-align, which reads as considered, not accidental.
- **Mono folio labels:** Every section gets a top-of-column folio in JetBrains Mono 10px `#5C5852` ALL CAPS: `"VOLUME 01 · EST. 2004"` left-aligned, `"001 / KPT"` right-aligned, separated by a `1px solid rgba(15,15,15,0.08)` full-width rule at the top. Margin below rule: 40px before first headline.
- **Terracotta rule section divider:** `<hr>` replaced with a `<div>` of `height: 1px; background: #C56738; width: 100%; margin: 80px 0 16px` followed immediately by a mono index label `"§ 02 — STACK"` in JetBrains Mono 10px terracotta tracked at `0.2em`.

---

### 5. Kinfolk Magazine — https://kinfolk.com

**One-line:** Slow-living magazine aesthetic: oversized pull quotes, column body text, extreme restraint in color and ornament.

**Liftable patterns:**
- **Variable-weight Fraunces hero:** Set display headline at `font-variation-settings: 'wght' 800, 'opsz' 144` for the largest instance; drop to `'wght' 300, 'opsz' 9` for caption-level text in the same section — the optical size axis makes captions feel like fine print from a different era, not just smaller text.
- **Pull quote with hanging quotation marks:** Wrap pull quote in a `<blockquote>` with `position: relative; padding-left: 0`; inject `content: '\201C'` via `::before` pseudo with `position: absolute; left: -0.55em; font-size: 4em; line-height: 0.8; color: #C56738; font-family: Fraunces` — the mark hangs outside the text column, classic print behavior.
- **Paper background micro-texture:** Use `background-color: #F5F1EA` + a 200×200px SVG noise pattern at 3% opacity as `background-image` (inline data URI of an feTurbulence filter result) — gives the page a slightly matte, uncoated-stock feel without a photo.

---

### 6. It's Nice That — https://www.itsnicethat.com

**One-line:** Creative industry editorial; dense article grids, strong category labels, controlled hierarchy across very varied content types.

**Liftable patterns:**
- **Drop cap first paragraph:** Apply to the first `<p>` of each section: `p:first-of-type::first-letter { float: left; font-size: 4.5em; line-height: 0.75; font-weight: 800; font-variation-settings: 'wght' 900, 'opsz' 144; margin: 0.05em 0.1em 0 0; color: #0F0F0F }` — the drop cap takes 3 lines, consistent with European book-setting tradition.
- **Marginalia column:** At viewport ≥ 1280px, add a right-side `position: absolute; right: -180px; width: 160px` column for mono-caps captions in JetBrains Mono 10px terracotta — these appear beside body text like footnotes, not below it. Wrap the parent in `position: relative`.
- **Ink-draw underline hover:** Replace default anchor underline with: `text-decoration: none; background-image: linear-gradient(#C56738, #C56738); background-size: 0% 1px; background-position: left bottom; background-repeat: no-repeat; transition: background-size 0.35s cubic-bezier(0.25, 1, 0.5, 1)` — on `:hover`, set `background-size: 100% 1px`. The line draws left-to-right like ink flowing.

---

## V4 — Terminal

### 7. Linear — https://linear.app

**One-line:** Product homepage where the hero is a dark, pixel-precise UI mockup of the app itself; the design is the product demo.

**Liftable patterns:**
- **Status bar bottom chrome (tmux-style):** Fixed `<footer>` at `position: fixed; bottom: 0; left: 0; right: 0; height: 24px; background: #1A1A1A; border-top: 1px solid #2A2A2A; display: flex; align-items: center; font-family: JetBrains Mono; font-size: 11px; color: #33FF66` — segments separated by a `|` character in `#444`; leftmost segment with `background: #33FF66; color: #000; padding: 0 8px` for the "active" powerline anchor.
- **Tab bar top chrome (vim-style):** Fixed `<header>` of `height: 22px; background: #000; border-bottom: 1px solid #2A2A2A` containing inline tab items; active tab: `background: #1A1A1A; color: #E0E0E0; padding: 0 12px`; inactive: `color: #444`; rightmost element: `"-- INSERT --"` in `#FFB000` — immediately communicates vi modal editor context.
- **Typewriter on hero text:** Implement with Framer Motion `useAnimate` or a simple `useEffect` that appends characters to state at 40ms intervals for "log output" text and 20ms for command text — the speed difference between command and response mimics real terminal latency perception.

---

### 8. Blot.im — https://blot.im

**One-line:** A publishing tool with a deliberately plain text-first site; no images, no icons, dense prose, absolute confidence in the writing.

**Liftable patterns:**
- **Dashed-border card (unstyled block):** `border: 1px dashed #444; padding: 16px 20px; background: transparent; border-radius: 0` — when hovered: `background: #1A1A1A; border-color: #33FF66; transition: all 0.1s linear` — the instant (0.1s) transition is intentional; smooth easing feels wrong in a terminal context.
- **`ls -la` portfolio table:** Render portfolio items as a `<table>` with `border-collapse: collapse`; columns: permissions (`drwxr-xr-x`), link count, user, size, month, day, time, name — use real-looking fake permissions, color the name column in `#33FF66`, dim the metadata in `#444`; `font-size: 12px; line-height: 1.6`.
- **ASCII box-drawing section headers:** Use `<pre>` for section titles inside a box: top/bottom `─` repeated to match title width, capped with `┌`/`┐` and `└`/`┘`; sides `│`; title line has `│ SECTION NAME                    │` padded to fixed width. Compute the padding in JS at render time based on viewport-responsive column width for pixel-perfect alignment.

---

### 9. Batch.sh / CLI-aesthetic Saas — https://batchsh.com

**One-line:** Developer-tool SaaS that leans fully into terminal aesthetic for its marketing site; scanlines, mono type, fake CLI sessions.

**Liftable patterns:**
- **CRT scanline overlay (CSS-only):** `position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999; background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)` — the 4px repeat (3px gap + 1px line) at 0.04 opacity is the sweet spot: visible on dark backgrounds, invisible on screenshots.
- **Glitch flicker on mount:** On the hero ASCII art `<pre>`, apply a keyframe animation that runs once at page load: at 0% normal; at 5% `transform: translateX(3px); filter: hue-rotate(90deg)`; at 10% `transform: translateX(-2px); filter: hue-rotate(-90deg)`; at 15% back to normal — total duration 150ms, `animation-fill-mode: forwards` — the effect is subliminal but signals "CRT" to the nervous system.
- **CRT vignette:** `box-shadow: inset 0 0 120px 60px rgba(0,0,0,0.7)` on a fixed full-viewport `<div>` above canvas — darkens all four corners simultaneously, simulating phosphor screen curvature falloff. Cheaper than a radial-gradient and composites correctly over the scanline layer.

---

## Cross-Cutting Notes

| Pattern | Cosmos | Editorial | Terminal |
|---|---|---|---|
| Font stack | Inter / JetBrains Mono | Fraunces / JetBrains Mono | JetBrains Mono only |
| Background | `#02030A` void | `#F5F1EA` paper | `#000000` true black |
| Accent | `#7B5BFF` plasma-violet | `#C56738` terracotta | `#33FF66` phosphor-green |
| Motion speed | Slow (1.5–4s) | Subtle (scroll-triggered) | Fast snap (0.1s) or typewriter |
| Overlay trick | Plasma radial leak | Paper noise texture | CRT scanlines |
| Section marker | HUD coordinate chrome | Terracotta rule + mono folio | ASCII box-drawing header |
