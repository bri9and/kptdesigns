# Director's Scorecard — Final Walk (50 mockups)

**Date:** 2026-04-28
**Author:** Director's Walker (Tasks 21 + 22 consolidated)
**Method:** Local dev (`http://localhost:3000/mockup/<slug>`), Chrome MCP, 6–10s settle per page, single full-viewport screenshot. Pre-walked rows (v23, v24, v25, v26, v27, v48, v49, v52) carried forward from `2026-04-28-prewalk-batch-1-and-6.md`. Rebuilds (v34, v50, v51, v54, v58) walked fresh against the replacement-pack briefs. v50/v51 explicitly re-walked (pre-walk scored the cut originals, not the rebuilds).

---

## Preamble

50 mockups walked end-to-end. The catalog holds together: 47 of 50 are at or above 4.0 average; the strong middle (4.0–4.6) is genuinely distinct mockup-to-mockup, and the top of the pack (4.6–4.8) earns its place by either trade-honest gesture (v52-mat-temperature, v50-panel-directory, v25-roadside-neon) or finish-grade execution (v48-titleblock, v46-bench-grain, v60-letterpress, v71-zinc-roof). The five rebuilds shipped under the bar — every one of v34/v50/v51/v54/v58 lands at 4.4 or higher and the two re-walked rebuilds (v50, v51) jumped clear of the original cut versions. **One genuine blocker:** v67-knot-fluency is broken in current dev — hero text is invisible at 10s+ settle, only rope-strand placeholders render. Score 1 across the board, fix-before-deploy required.

**Average across all 50:** 4.59

**Top 5 (avg, with the 4.8 cohort tie-broken on interaction quality + originality of gesture):**
1. v40-lightboard — 5.0 (only mockup with a perfect interaction score; live energized schematic + telemetry)
2. v58-group-text (rebuild) — 5.0 (fleet-dispatch terminal, channel tabs + log + LEDs, fully replaces the cut iMessage chrome)
3. v52-mat-temperature — 4.8 (data-driven palette + dial; carried)
4. v25-roadside-neon — 4.8 (cinematic dusk paving window; carried)
5. v50-panel-directory (rebuild) — 4.8 (28-row hand-lettered breaker directory)

Honorable mentions, all 4.8: v30-saw-line, v34-bubble-level (rebuild), v35-tarpaper, v37-zonemap, v39-storypole, v41-windrow, v43-stencil-yard, v45-canopy-lift, v46-bench-grain, v48-titleblock, v49-channellock, v51-broadsheet (rebuild), v54-sandwich-board (rebuild), v55-pegboard-stack, v56-pipe-cam, v57-soldering, v59-isotype, v60-letterpress, v61-greenhouse, v62-zoning-overlay, v63-flipbook, v64-iso-icons, v65-shadowbox, v66-paint-stripe, v69-pellucid, v70-rfp-binder, v71-zinc-roof, v72-sticker-pack — the strong middle of the pack is genuinely strong.

**Bottom 5:**
1. v67-knot-fluency — 1.0 (broken — see fix-before-deploy)
2. v44-snap-line — 3.8 (concept right, execution lags v35 neighbor)
3. v53-color-block — 3.8 (heavy hero fade overlay impairs readability)
4. v24-paint-chip (carry-forward) — 4.0 (chip surface render below shipping bar)
5. v68-honey-do — 4.0 (placeholder card grid + arithmetic mismatch)

Also notable below 4.5: v27-rivetwork (4.2, carry-forward), v29-paper-mache (4.2), v38-anvil (4.4).

**Last-minute fixes:** see Fix-Before-Deploy at the end. Count is 1 hard blocker (v67) and 6 polish-flags. Everything else is shippable.

---

## Per-mockup scorecard

| slug | brief-fidelity | distinctness | trade-fit | polish | interaction | average | comment |
|---|---|---|---|---|---|---|---|
| v23-fieldnotes (carried from pre-walk) | 5 | 5 | 5 | 4 | 4 | 4.6 | Working pocket-book artifact — Tactile-Material in its purest form. |
| v24-paint-chip (carried from pre-walk) | 4 | 4 | 5 | 3 | 4 | 4.0 | Sharp IA; chip surface treatment under bar. Polish-flag standing. |
| v25-roadside-neon (carried from pre-walk) | 5 | 5 | 5 | 5 | 4 | 4.8 | Cinematic dusk paving window, no costume. |
| v26-pulpit (carried from pre-walk) | 5 | 5 | 5 | 5 | 3 | 4.6 | Editorial-Print restraint that earns its scale. A11y on focus rings still owed. |
| v27-rivetwork (carried from pre-walk) | 4 | 5 | 5 | 3 | 4 | 4.2 | Wordmark clip + outlined NORTH letterform reads wireframe. Polish-flag. |
| v28-herbarium | 5 | 5 | 5 | 4 | 4 | 4.6 | Latin specimen-sheet honored; archival linen + tape + "REG-2024-014" stamp all per brief. Hero type sits a touch low-contrast. |
| v29-paper-mache | 4 | 4 | 5 | 4 | 4 | 4.2 | Three layered torn-paper depths, "Story poles. Plumb cuts. Scribe to the wall." — but the masking-tape upper-left "CALLOUT / HEADLINE" reads as placeholder text rather than diegetic decoration. |
| v30-saw-line | 5 | 5 | 5 | 5 | 4 | 4.8 | "CROWN THE JOIST. / TOENAIL IT. / RACK THE WALL." in GT America Mono on plywood-tone, chalk-snap line + right-margin pencil ticks. Restrained, technical, true. |
| v31-pipe-stack | 5 | 5 | 5 | 4 | 4 | 4.6 | Isometric DWV (VTR/LAV/KIT/WC/CLEANOUT) with "Done with pipe dope, not promises." Stack drawing is line-thin against the field — could carry more weight. |
| v32-permit-board | 5 | 5 | 5 | 4 | 4 | 4.6 | Coroplast + zip-tie corners on "MILL ST. RETAIL FIT-OUT / DRY-IN BY OCT 30. PUNCHLIST 11/14." reads. Slight polish-watch on contrast in the body of the sign vs. the brief's "200pt Roboto Condensed Black." |
| v33-shock-line | 5 | 5 | 5 | 4 | 4 | 4.6 | Brady-label white + "AFCI on every bedroom branch" picked out in Klein-orange. The "HEADLINE — KIT" callout is brief-spec'd diegetic label content (not a placeholder), confirmed against brief. |
| v34-bubble-level (rebuild) | 5 | 5 | 5 | 5 | 4 | 4.8 | Three vials horizontally, bubble centered, "Plumb. Level. Tested." Replacement-pack target met cleanly. Instrument-grade reads. |
| v35-tarpaper | 5 | 5 | 5 | 5 | 4 | 4.8 | 30# felt black ground, "TEAR-OFF / TUESDAY..." big slab type with RIDGE CAP picked in OC pink, vertical bundle-side OWENS / CORNING / DURATION right rail. Brutalist, jobsite-true. |
| v36-tag-stamp | 5 | 5 | 5 | 4 | 4 | 4.6 | Aluminum tag + brass wire, "TIP set. / Crotch reduction. / Drop zone clear by 0900." with Drop-zone in tag-rectangle. ANSI Z133 trade fit honest. |
| v37-zonemap | 5 | 5 | 5 | 5 | 4 | 4.8 | Banded USDA gradient with 6B selected, "ZONE 6B. / LAST FROST May 11. / WE PLANT ON MAY 14." Trade-credibility borrowed honestly. |
| v38-anvil | 4 | 5 | 5 | 4 | 4 | 4.4 | Raw-iron + hammered headline reads. "Slag-orange pools at the base of each letter and cools to ash" not visible in static frame — likely interaction-only; verify in motion. |
| v39-storypole | 5 | 5 | 5 | 5 | 4 | 4.8 | Vertical wood rail with Roman numerals, "Cabinet runs from one stick. / Plumb to the wall." in Fraunces italic. Beautiful proportion. |
| v40-lightboard | 5 | 5 | 5 | 5 | 5 | 5.0 | Live energized schematic right side, "LIVE · 120/240 SERVICE · NEC 2023" pill, real telemetry (240V / 156A / 35 in-lb). The motion-and-state design earns the full five. |
| v41-windrow | 5 | 5 | 5 | 5 | 4 | 4.8 | Right-aligned "MAT AT 305. / DEWPOINT AT 48. / WE SCREED IN 14 MINUTES." with FRESH OIL — DO NOT DRIVE caution stripe. Distinct from v52 (data-dial) by being type-led atmosphere. |
| v42-flightcase | 5 | 5 | 5 | 4 | 4 | 4.6 | Top-down anvil-case with foam-cut pockets, "SHOW UP WITH WHAT THE / JOB NEEDS. / PACK IT BACK THE WAY / YOU FOUND IT." Pocket render reads a touch flat; the brief's foam-grain depth could carry more shadow. |
| v43-stencil-yard | 5 | 5 | 5 | 5 | 4 | 4.8 | DOT-spec stencil "MILL AND FILL. / TACK COAT. / JOINT DENSITY HOLDS AT 92." with 92.4% / 11 / 0 stat row. Public-works paving credibility nailed. |
| v44-snap-line | 4 | 4 | 5 | 3 | 3 | 3.8 | "Snap a line. / Lay a course. / Six-nail every shingle." copy is right; ground is light cream/sand rather than the brief's tarpaper-black. The snap-line is barely visible as a thin stroke; the bundle-cap badge reads under-rendered. Trade-fit OK but execution under bar vs. v35-tarpaper neighbor. |
| v45-canopy-lift | 5 | 5 | 5 | 5 | 4 | 4.8 | Canopy-silhouette parallax, "Lift the canopy. / Crotch reductions. / Drop zone signed and clear." in big italic. ANSI A300 trade-fit perfect. |
| v46-bench-grain | 5 | 5 | 5 | 5 | 4 | 4.8 | Tree-ring cross-section in warm sepia, "Heart, sapwood, / and the year you started." Best polish in the carpentry slate. |
| v47-bucket-truck | 5 | 5 | 5 | 4 | 4 | 4.6 | Cab POV, "BUCKET UP. / TIE IN. / DROP ZONE SIGNED." with telemetry stats (140 psi / 20 ft / 72° / 85%). Hero is a touch under-resolved at 6s — load-watch flag. |
| v48-titleblock (carried from pre-walk) | 5 | 5 | 5 | 5 | 4 | 4.8 | Architectural sheet titleblock at full size — most disciplined Technical-Terminal in the catalog. |
| v49-channellock (carried from pre-walk) | 5 | 5 | 5 | 4 | 5 | 4.8 | Pegboard + hand-painted KPT HANDYMAN wordmark, tools labeled in Sharpie. Tool illustrations a beat under-detailed but the page works. |
| v50-panel-directory (rebuild) | 5 | 5 | 5 | 5 | 4 | 4.8 | 28-row hand-lettered breaker directory with red AFCI rosettes, brass nameplate "PANEL · MAIN / 2218 ELM ST / 200A · 28 SLOT," "EVERY BREAKER LABELED. / EVERY LOAD KNOWN." Major upgrade from cut original. |
| v51-broadsheet (rebuild) | 5 | 5 | 5 | 5 | 4 | 4.8 | "THE KPT DAILY · LATE EDITION" tabloid masthead, 96pt "PIPE BURST — CALLS / ANSWERED.", halftone photo box, agate classifieds rail with real pricing lines. Rebuild lands the brief cleanly. |
| v52-mat-temperature (carried from pre-walk) | 5 | 5 | 5 | 5 | 4 | 4.8 | Data-driven palette with brushed-steel dial. Hydration warning on dial line-coords still owed (see fix-before-deploy). |
| v53-color-block | 4 | 4 | 4 | 3 | 4 | 3.8 | Swiss grid is right but the hero is sitting under a heavy fade overlay even at 6s+ settle; readability of the headline + stat blocks is compromised. The brief calls "agnostic" but the build leans plumbing — fine, but the type fade is a real polish issue. |
| v54-sandwich-board (rebuild) | 5 | 5 | 5 | 5 | 4 | 4.8 | A-frame slate, "Design / Install / Maintain" in chalk-script, two terracotta sandbags at foot, wood-frame credit. Hospitality-grade hand-lettering delivered. |
| v55-pegboard-stack | 5 | 5 | 5 | 5 | 4 | 4.8 | Milwaukee Packout-style stacked totes (TOTE / CASE 03 / CASE 02 / CASE 01) with "ONE-CALL-DOES-IT-ALL. / STACKED, PACKED, ON THE DOLLY BY 7." Distinct from v49 (fixed-shop pegboard) by being modular Packout. |
| v56-pipe-cam | 5 | 5 | 5 | 5 | 4 | 4.8 | Camera-feed POV in the dark, "DEPTH 02.4 FT / DIST 012.0 FT" telemetry, "We see the cleanout / before we cut the floor." Fish-eye effect subtle but right. |
| v57-soldering | 5 | 5 | 5 | 5 | 4 | 4.8 | Macro plate of soldered fittings, "A clean fillet. / No pinholes. / Pressure-tested before we close the wall." with 4× MAGNIFICATION · PROPANE 1985°F meta. Polished craft macro. |
| v58-group-text (rebuild) | 5 | 5 | 5 | 5 | 5 | 5.0 | Charcoal console with CH-1 FRAMERS / CH-2 MASONRY / CH-3 MEP / CH-4 INSPECT tabs, IBM Plex Mono log entries, "[KEY UP]" + "[MONITOR]" buttons with LEDs, real dispatch entries with [ACK] / [PHOTO] / [MEMO 0:09] badges. iMessage chrome cleanly excised. |
| v59-isotype | 5 | 5 | 5 | 5 | 4 | 4.8 | Vienna pictogram tally with legend "= 15 calls / 1 row = 420 calls / Vienna red on Cream / After Otto Neurath, Gerd Arntz, 1925-34." Stat row 4,200 / 1,180 / 12 / 97.4%. Authentically isotype. |
| v60-letterpress | 5 | 5 | 5 | 5 | 4 | 4.8 | "Mortise. / Tenon. / Dado. / Held under a bite that shows." in Caslon, with full Crane's Lettra · 220 lb · cotton + Vandercook 4 spec footer. Pure restraint. |
| v61-greenhouse | 5 | 5 | 5 | 5 | 4 | 4.8 | Greenhouse-frame grid overlay, "Hardscape, softscape, / and a greenhouse / full of what comes next." with bench cards P-1 Limelight Hydrangea through P-6 Coral Bark Maple. |
| v62-zoning-overlay | 5 | 5 | 5 | 5 | 4 | 4.8 | Zoning overlay with R-1 / C-2 / M-2 / I-3 / OS legend; "Permitted use. / Setback. / Parapet height. / Roof load to code." with last line picked in highlighted parchment. Bureaucratically credible. |
| v63-flipbook | 5 | 5 | 5 | 5 | 4 | 4.8 | Notepad/sketchbook with handwritten headline "From sketch / to scribed reveal, / page by page." Page-corner curl + 5-card "PAGE BY PAGE" panel (Sketch / Story pole / Mockup / Cut list / Reveal). |
| v64-iso-icons | 5 | 5 | 5 | 5 | 4 | 4.8 | NFPA 70E coral ground with ISO-7010 pictogram, "QUALIFIED PERSONS ONLY. / LOCKED-OUT. TAGGED-OUT. / ENERGIZED WHEN WE SAY SO." 5-card "WHAT WE ALWAYS DO" (PRE-UP / LOTO / VERIFY DEAD / BOND & GROUND / RE-ENERGIZE). |
| v65-shadowbox | 5 | 5 | 5 | 5 | 4 | 4.8 | Shadowbox frame with brass plate "KPT / HEIRLOOM CARPENTRY & MILLWORK," "Plumb. Square. / Held in raking light." Gallery/museum register. |
| v66-paint-stripe | 5 | 5 | 5 | 5 | 4 | 4.8 | Yellow thermoplastic stripes on dark asphalt, "STRIPE DAY. / LOT-SPEC TO ADA, / PAINTED IN THE / CURE WINDOW." with ADA pictogram in lower-right. Needed >6s settle on first nav (see load-watch). |
| v67-knot-fluency | 1 | 1 | 1 | 1 | 1 | 1.0 | **BROKEN.** After 10s+ settle the hero is invisible — only the four khaki rope-strand placeholder rectangles render; no headline, no subhead, no CTAs. `get_page_text` confirms only the section-2 "VT (Valdotain Tresse)" content is in the article element. Hero render is failing. **FIX BEFORE DEPLOY.** |
| v68-honey-do | 4 | 4 | 4 | 4 | 4 | 4.0 | Honey-do checklist with prices, subtotal/trip charge/due-Sat math. Trade-fit reads handyman. List is bright but the right-side image-card grid is a flat placeholder grid (4 empty cards). The "$810" arithmetic doesn't match (only one item is checked). |
| v69-pellucid | 5 | 5 | 5 | 5 | 4 | 4.8 | Translucent stacked glass plates, "Service that's / clear before it's / energized." with "clear" picked in pastel-iridescent gradient. Pellucid Electric trade fit + 22 yrs / 200A / $2M stat row. |
| v70-rfp-binder | 5 | 5 | 5 | 5 | 4 | 4.8 | Binder feel with PROJECT FACTS panel (1987 / GC #B-114882-A / $22M·$48M / 184 / 96.4% / EMR 0.71); "RFP. Submittals. / Change orders. / Closed-out clean." with TAB 01 PRE-CONSTRUCTION accordion. |
| v71-zinc-roof | 5 | 5 | 5 | 5 | 4 | 4.8 | Standing-seam zinc field, "Standing seam, / hand-formed eaves, / patina that earns its years." with full SPECIFICATION SHEET (Quartz-Zinc .8mm / 16" o.c. / Double-lock 1.5" / VENTITHERM mat / Stainless cleat hidden / 30yr·25yr). Luxury-trade target hit. |
| v72-sticker-pack | 5 | 5 | 5 | 5 | 4 | 4.8 | Hard-hat sticker collage (IBEW 26 / KLEIN / MILWAUKEE M18 / OSHA-30 / AFCI/GFCI / PANEL UP / WE BUILD GEAR ROOMS / flag), "PULL BOX. / PIGTAIL. / PANEL UP. / Local 26 in the field since '99." Layered, claimed, distinct from v50. |

---

## Fix-Before-Deploy

### Hard blocker (must fix)

1. **v67-knot-fluency — hero render broken.** After 10s+ settle on a fresh nav, the page shows only the four khaki rope-strand placeholder shapes; the headline, subhead, CTAs, and meta-line never render. `get_page_text` reports the only article content available is the second-section "VT (Valdotain Tresse)" knot description — the hero block is missing entirely. Likely a `PageApproach` resolved-state never hands off, or the hero opacity stays at 0. **Cannot ship.**

### Polish-flags (recommended fixes, not blockers)

2. **v52-mat-temperature** — SSR/CSR hydration mismatch on dial tick-mark `<line>` coordinates (last-digit float drift, e.g. `46.49357256562762` vs. `46.49357256562763`). Cosmetic in dev, but should be normalized before prod. Round dial-coord math to fixed precision OR mark the dial `<line>` block with `suppressHydrationWarning`. (Carried from pre-walk.)
3. **v27-rivetwork** — wordmark header clip ("NORTH FO" cut at viewport edge) and the giant outlined NORTH letterform reading as wireframe rather than plasma-cut steel. Layout bug + finish pass. (Carried from pre-walk.)
4. **v24-paint-chip** — chip surface treatment below shipping bar; chips read pastel/icon-flat instead of glossy hardware-store deck stock. Chip render rebuild-light. (Carried from pre-walk.)
5. **v29-paper-mache** — masking-tape upper-left badge reads "CALLOUT / HEADLINE" which scans as placeholder text. Replace with diegetic copy (a project name, a date, a slug like "FY 25 — RECENT") so it doesn't read as un-filled CMS content.
6. **v53-color-block** — heavy fade overlay on the hero is still visible at 6s+ and impairs headline / stat-block readability. Either shorten the entrance or raise the resolved-state opacity floor.
7. **v68-honey-do** — right-side card grid renders as 4 empty grey rectangles (presumably receipt/photo placeholders). Either populate with sample receipt artwork or hide the slot until populated. Also the subtotal arithmetic (`$810`) doesn't match a single checked item at `$810`; either show all 4 items as checked, or recompute.

### Load-watch (deploy as-is, document for QA harness)

- **v66-paint-stripe** needed roughly 10s settle to fully resolve (stripes + headline appeared blank at 6s). Pre-walk already flagged v49 / v50 / v52 as 6s+ settle pages. **If the QA harness uses a fixed wait, raise to 10s minimum across the catalog.**
- **v44-snap-line** average 3.8 — concept is right but execution lags v35-tarpaper enough that side-by-side it reads underdone. Not a blocker, but a candidate for a polish pass post-launch.
- **v53-color-block** average 3.8 — see polish-flag #6 above.

---

End of scorecard.
