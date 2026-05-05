# Director's Pre-Walk — Batches 1 & 6 (v23–v27, v48–v52)

**Date:** 2026-04-28
**Author:** Pre-Walk agent (Gate 5 pre-stage)
**Status:** Early scorecard — visual-evidence pass only. Final QA still owed.
**Method:** Local dev server (`http://localhost:3000/mockup/<slug>`), Chrome MCP, ~2.5–6s settle wait per page (PageApproach entrance), one full-viewport screenshot per concept.

> **Screenshot reference note.** The Chrome MCP screenshot tool returns an in-memory image ID (e.g. `ss_65341j3c5`) rather than a filesystem path. IDs are listed below for traceability inside the conversation log, but no files were written to `~/Downloads` or any disk location. If the Director needs durable PNGs on disk, re-run with the page open and use the OS screenshot shortcut, or have the engine route output through a different sink.

> **Hover/focus interactions** were not exhaustively probed — this pass is the static-load eval. "Interaction" score below is read off the brief plus what the static frame already telegraphs (hover-targetable affordances visible, focus rings visible, etc.). A separate pointer-walk pass should follow.

---

### v23-fieldnotes
- **Screenshot:** `ss_9607m37eh` (1288×924 jpeg)
- **Brief fidelity:** 5 — Headline triplet ("Stake-and-flag walks. / Spec'd to plan. / Mulch on Friday."), kraft ground, FIELD stamp + "047" page number + "04 / 26 / 26" hand-numbered date, the three checkmarked margin notes, "Project Notes — Spring Round" rubber-stamped section head, "Drafted in the truck cab · 7:14 AM" credit, and "Today's Walk" horizontal-scroll dated entries below — all line up with the brief.
- **Distinctness:** 5 — Notebook-led / dot-grid / graphite / rubber-stamp vs. v24's fanned-deck primary-color chips and v60-letterpress's pressed-cotton formality. Reads completely apart from neighbors.
- **Trade fit:** 5 — Landscape designer's pocket book is trade-true; "Walk a property" CTA is the literal designer ritual.
- **Polish:** 4 — Type set thoughtfully, stamps and pencil look right. The script headline wraps awkwardly ("flag" alone on line 1) but that's the cost of the handwritten voice; minor.
- **Interaction:** 4 — Brief promises chalk-flag color reveal on hover for "Today's Walk" entries (visible in static frame as colored end-flags) and a pencil-stroke focus underline. Static frame shows the hover affordances exist; not verified live.
- **Average:** 4.6
- **One-liner:** Tactile-Material in its purest, least-costume form — a working artifact, not a decoration of one.
- **Flags:** none.

---

### v24-paint-chip
- **Screenshot:** `ss_02778zlgu` (1288×924 jpeg)
- **Brief fidelity:** 4 — Fanned chip deck top-right with pivoting clip is correct; headline triplet shipped as "Patch and paint. / Caulk and call it. / Done before the kid's bus." matching brief. The chip fan opens but the clip is small/low-contrast and the chips render as desaturated pastels rather than the punchy hardware-store "deck" the brief implies. "Pick a chip" / "Browse the deck" CTAs both present. Header reads "Fairfield Handyman Co · Deck No. 47 · Spring 2025."
- **Distinctness:** 4 — Clearly different from v49-channellock (turquoise pegboard, fixed shop) and v72-sticker-pack — but the pastel palette pulls it slightly closer to v23's kraft-tone neighborhood than the brief's "deck-cream + saturated chip family" promise.
- **Trade fit:** 5 — Paint-chip-as-IA is sharp handyman play; avoids the toolbelt-mascot trap entirely.
- **Polish:** 3 — Hero composition reads. But the chips lack the gloss-face/matte-back contrast described in Materials, and the topmost chip's text ("No Job Too Small") is washed out against its own ground. The "TAP" repeat marks cluttering the chip fan look like placeholder affordance hints, not finished print artwork.
- **Interaction:** 4 — Lift-on-cursor and "deal-flick" expand are core; the static frame shows the chips arranged for that interaction. Not verified live.
- **Average:** 4.0
- **One-liner:** The IA is great; the chips themselves need another pass on color saturation and surface treatment to feel like the object the brief promises.
- **Flags:** **polish-flag** — chip surface treatment is below shipping bar; rebuild-light recommended on chip render before final QA.

---

### v25-roadside-neon
- **Screenshot:** `ss_8038034zm` (1288×924 jpeg)
- **Brief fidelity:** 5 — Dusk-asphalt ground, "FRESH OIL" neon block sodium-amber upper-right, headline triplet "Fresh oil. / Tight joints. / Mat hit 305 at 7:14." in coral/sodium gradient. Subhead, "Quote a driveway" + "Call the dispatcher" CTAs present. Sub-banner "Dusk Strip · Open at 7:14 PM" + "Tonight's Run / 03 Signs Lit" section header below — all per brief.
- **Distinctness:** 5 — Nighttime cinematic field is structurally apart from v24's deck and v26's hymnal field, and apart from v41-windrow (daytime sensory) and v54-sound-stage (process-cinema).
- **Trade fit:** 5 — **Confirmed paving** in render (`Fresh Oil Paving Co · Est 1994 · Route 138 · MA-2 Shoulder` header). The brief-pack tradeShowcase is paving and the build matches. The note from the Director's-Walk task that "brief says tree-service but live build leans paving" appears to be a misremembering — this brief explicitly calls paving (line 92: "Paving crews already work the dusk window before the mat cools").
- **Polish:** 5 — Best-of-batch on atmosphere: dusk gradient feels real, neon glow has the right halo, type sits inside the ambient glow without fighting it.
- **Interaction:** 4 — Headlight-cone scroll trigger and per-sign crackle on hover are structural; static frame doesn't reveal them but the layout is built for them.
- **Average:** 4.8
- **One-liner:** Cinematic-Narrative landing the dusk paving-window aesthetic without paving cliché.
- **Flags:** none. (Bury the "tree-service" note from the task brief — this build is the right trade.)

---

### v26-pulpit
- **Screenshot:** `ss_6292n51ki` (1288×924 jpeg)
- **Brief fidelity:** 5 — One 200pt phrase ("We hold the critical path.") centered, single carmine rule beneath, massive negative space, footnote subhead anchored bottom-left under the rule. Wordmark "Holloway & Pratt — General Contractors · Est. 1962" upper-left in Caslon. Folio I label "The Rule of the House." Nav: Preface / Submittals / Recent work / Colophon — editorial spine intact.
- **Distinctness:** 5 — Pulpit-scale type vs. v60-letterpress's impression-bite and v70-rfp-binder's bound thoroughness. Singular voice.
- **Trade fit:** 5 — "The adult in the room" is exactly the GC pitch. Caslon at scale = authority through restraint.
- **Polish:** 5 — Editorial proportions, the rule sits where it should, color discipline is real (one carmine accent only).
- **Interaction:** 3 — Brief promises 600ms ink-bleed reveal per scroll-snap fold and a hover-pulled rule. The static-load frame is exactly the static-load frame; whether the snap-folds work is a live-pass question. Visible focus state for keyboard nav not evident from frame; verify before final.
- **Average:** 4.6
- **One-liner:** Editorial-Print delivered with restraint that earns its scale.
- **Flags:** **a11y-watch** — confirm focus rings on Preface/Submittals/Recent work/Colophon nav before final.

---

### v27-rivetwork
- **Screenshot:** `ss_6457gna8k` (1288×924 jpeg)
- **Brief fidelity:** 4 — Cold-rolled steel ground present, hot-orange weld-glow visible on the divider, headline "TEAR-OFF. / DRY-IN. / DONE BEFORE THE RAIN." in Mona Sans Black ExtraExpanded. Wordmark renders as "NORTH FO" with a giant outlined "NORTH" on the plate below — header is being clipped (full wordmark "NORTH FORTY ROOFING" or similar is cut off above the fold). 14 rivets along plate top edge correct. "Plates / Bolt Pattern / Recent Roofs" nav present. "555 · Roof · 1B" plasma-cut tag upper-right.
- **Distinctness:** 5 — Plate-and-weld-bead grammar is structurally apart from v35-tarpaper (felt + chalk) and v38-anvil (forged/struck). Easy to tell at 50ft.
- **Trade fit:** 5 — Roofing-as-metal (fasteners, flashings, edge metal, weight = competence) is honest. Reads commercial-roof, not residential-shingle.
- **Polish:** 3 — Brutalist intent is there but execution has rough edges: the wordmark clip ("NORTH FO"), the giant outlined NORTH letterform reads as a placeholder/wireframe rather than plasma-cut, and the orange weld-bead glow is uniform and digital-looking rather than the brief's "hot-orange that cools to slag over 1.2s."
- **Interaction:** 4 — Plate-slide-with-thunk on enter and rivet-pop-row-by-row are signature; static frame shows rivets in place but motion not verified.
- **Average:** 4.2
- **One-liner:** Brutalist-Industrial concept is right; the plate-cut wordmark and weld-glow need a finish pass.
- **Flags:** **polish-flag** — wordmark clip in header + outlined NORTH letterform reading as wireframe. Fix before final.

---

### v48-titleblock
- **Screenshot:** `ss_357647ogg` (1288×924 jpeg)
- **Brief fidelity:** 5 — Architectural sheet field, fixed right-margin titleblock with Project ("KPT GC · 24-011"), Client ("Riverside Lab Holdings"), Architect ("Halverson Kim AIA"), Drawn By ("KPT"), Checked ("M.S."), Sheet Index (A-001 / A-101 / A-201 / A-301 with revision triangles), revision label "Rev. 4 · 25.08.02," scale "1/4" = 1'-0"," and the headline triplet "RFP. Submittals. / RFI. Punch list. / Closed out clean." Reads as a real sheet.
- **Distinctness:** 5 — Architectural meta-frame is structurally apart from v32-permit-board (civic placard) and v70-rfp-binder (bound binder). The titleblock-as-chrome is the unique gesture.
- **Trade fit:** 5 — Most-read object in a GC's visual life. Right artifact, right trade.
- **Polish:** 5 — Type discipline, revision-triangle red, vellum field — proportions all read as the drafter's-page object the brief calls for. Sheet-flip wipe is the kind of motion that earns the meta-frame.
- **Interaction:** 4 — Hover-on-revision-triangle to pop the change-log is the signature interaction. Static frame shows triangles in place; live verification owed.
- **Average:** 4.8
- **One-liner:** Technical-Terminal at its most disciplined — the meta-frame is the message.
- **Flags:** none.

---

### v49-channellock
- **Screenshot:** `ss_7508l9dpu` (1288×924 jpeg, after extra wait — first frame at 2.5s was still mid-fade-in and read faded)
- **Brief fidelity:** 5 — Turquoise pegboard right-half with hung tools (Channellock 420, Klein 5-in-1, Stanley 25', Milwaukee M18, caulk gun, "flat pencil") each labeled in Sharpie, hand-painted "KPT HANDYMAN" wordmark across the top in Sharpie black, headline "HONEY-DO DONE. / PATCH AND PAINT, / CAULK AND CALL IT." with patch-and-paint in red accent, subhead about turnover/weekend windows, "Book a Saturday" + "See the pegboard" CTAs.
- **Distinctness:** 5 — Pegboard-on-wall (fixed shop) vs. v55-pegboard-stack (modular Packout case) and v68-honey-do (list-led). Trade-true without being twee.
- **Trade fit:** 5 — The pegboard outline ritual is shop-class scripture; this version respects that.
- **Polish:** 4 — The pegboard ground, peg-dots, and Sharpie-labeled tools all read. The tool illustrations themselves are a beat under-detailed (the "CAULK GUN" and "FLAT PENCIL" read as flat-color icons rather than the vintage tool-steel the brief promises). Wordmark hand-painted feel is good.
- **Interaction:** 5 — Hover-lifts-tool-revealing-Sharpie-outline is the brief's signature interaction; static frame shows the outline-behind-tool composition is set up for it. Pendulum sway also brief-spec'd.
- **Average:** 4.8
- **One-liner:** Playful-Toy with adult restraint — tools, not mascots.
- **Flags:** **load-watch** — needs >2.5s settle for the entrance to clear; default pre-walk wait of 2.5s captured a faded frame. Not a blocker, but the entrance is on the slow end.

---

### v50-trader-tarp
- **Screenshot:** `ss_38118mr16` (1288×924 jpeg, after ~9s settle — first two frames were blank then mid-fade)
- **Brief fidelity:** 5 — Yellow corrugated polypropylene field (vertical scan-line for corrugation visible), zip-tie corners visible, stenciled "FRESH OIL. / CURING / THROUGH / SUNDOWN." headline in tall stencil-paint black, secondary "DO NOT DRIVE" and "CONES UP 24H" coroplast signs floating right-edge, subhead, "Quote a sealcoat" + "Read the cure schedule" CTAs, "Today's Signs" yard below with stenciled job-cards (Elm St · 1408, Riverside 22, Meadow 07, Oak Ct · 310, Pine Blv 44) each tagged Curing/Done/Queued.
- **Distinctness:** 5 — Temporary corrugated job-sign vs. v43-stencil-yard (DOT highway spec) and v32-permit-board (city-issued). The artifact is small-job-paving's most ubiquitous trace.
- **Trade fit:** 5 — Sealcoat crews put this exact sign on every driveway. Trade-true.
- **Polish:** 5 — Stencil bite, corrugated scan-line, zip-tie corners — the artifact reads true. The "TODAY'S SIGNS" yard with state badges (Curing / Done / Queued) is a strong second beat.
- **Interaction:** 4 — Hover-flips-sign-6° wind-catch and zip-tie corner pop-in on entry are brief-spec'd. Static frame shows the affordances; live verification owed.
- **Average:** 4.8
- **One-liner:** Civic-Signage, pulled off without falling into the paving costume — the sign is the message, the message is the trade.
- **Flags:** **load-watch** — same as v49, needs ≥6s settle. **cliché-watch (BRIEF-IDENTIFIED, RESOLVED)** — brief flagged paving-costume risk; the build keeps the artifact narrow (job sign, not work-truck-and-cone collage) so the cliché is dodged.

---

### v51-galaxy-brain
- **Screenshot:** `ss_56738jl3v` (1288×924 jpeg, after 6s settle)
- **Brief fidelity:** 4 — Cosmic ink ground, dendrite/synapse network on right half with a glowing core node (~ember-gold) and branching nodes, headline "Networks of subs, / schedules, and / submittals." with "subs" picked out in italic, subhead about complex commercial work, "Map a project" + "See the network" CTAs, "Hover a node" affordance label visible. "Critical path. One project, one sequence." second-fold heading. Lévy-flight curvature reads more orderly/regular than the brief's biological irregularity, but the morphology is the right family.
- **Distinctness:** 5 — Dendrite/cosmic morphology is structurally apart from v40-lightboard (engineered schematic) and v69-pellucid (glass-plate depth). No neighbor reads similar.
- **Trade fit:** 5 — A GC literally runs a subs/RFI/submittal network; the dendrite is the most honest visualization of that web. Not a forced metaphor.
- **Polish:** 4 — Cosmic ink ground, synapse-cyan + ember-gold palette work. Branch lines are slightly thin against the ink and could lose visibility on lower-end displays. Wordmark "KPT · General Contracting" sits clean.
- **Interaction:** 4 — Hover-fires-synapse-pulse-along-connections is the signature; the visible "Hover a node" instruction is a UX win (hint without overexplaining). Live verification owed.
- **Average:** 4.4
- **One-liner:** Cosmic-Futuristic justified by trade reality, not used as window dressing.
- **Flags:** **a11y-watch** — branch lines may be sub-3:1 against cosmic ink; verify contrast before final.

---

### v52-mat-temperature
- **Screenshot:** `ss_7662hbb03` (1288×924 jpeg, after ~9s total settle)
- **Brief fidelity:** 5 — Gradient hero (slag/ember-brown — simulated late-day per the experimental sim mode), brushed-steel temp dial upper-right reading 72°F · "Ambient · Tempe, AZ", "Window Open" status pill upper-right, headline "We pave at 305°. / Right now your air's at 72°." with "305°" picked out in ember-orange and "72°" in cooler tone (the brief's data-driven palette working as advertised). Subhead about compaction/cure/wind windows. "Lock my window" + "See compaction logs" CTAs. Below the hero, "Today's Window · Why Each Matters" with Ambient (72°F) / Dewpoint (63°F) / Wind (8 mph) / Decision (GO) cards. SIM clock reads "01:06."
- **Distinctness:** 5 — Data-driven palette (live atmospheric readout) is structurally apart from v41-windrow (always-on visual heat-haze) and v66-paint-stripe (stripe-geometry led). Genuinely new gesture in the matrix.
- **Trade fit:** 5 — Crews track NOAA hourly dewpoint like farmers; the page IS the chart they read in the truck. Most authentic-trade concept in the batch.
- **Polish:** 5 — Dial reads as a real instrument (arc, needle, tick marks, brushed-steel ring), the gradient field has temperature-vocabulary (cool→ember), the four-card decision row gives the page a working diagnostic feel. Visually the most finished page in either batch.
- **Interaction:** 4 — Brief promises dial-spin-on-load (caught it in the second frame), 12s gradient-breathe synced to wind, hover-on-project-shows-paved-temp. Worth a live pass to verify the sim mode swaps gradient over time.
- **Average:** 4.8
- **One-liner:** Technical-Terminal pushed into atmospheric-data territory — experimental and shippable.
- **Flags:** **dev-warning (non-blocking)** — Next.js dev panel shows 2 issues on this page: (a) **SSR/CSR hydration mismatch** on dial tick-mark `<line>` elements (server-rendered `x1="46.49357256562762"` vs. client `x1={46.49357256562763}` — last-digit numeric-precision drift). Cosmetic in dev only, but should be normalized before prod (round dial-coord math to fixed precision OR mark the dial `<line>` block with `suppressHydrationWarning`). (b) **Clerk prod-key origin mismatch** is environmental (running prod Clerk keys on `localhost:3000`), not page-specific — ignore.

---

## Top 3

1. **v52-mat-temperature** (avg 4.8) — most original gesture in either batch; data-driven palette is shippable and trade-honest. Fix the dial hydration warning and this is a finalist.
2. **v25-roadside-neon** (avg 4.8) — the dusk paving window rendered without paving costume. Atmosphere is best-in-batch.
3. **v50-trader-tarp** (avg 4.8) — civic-signage in its most honest form; the brief flagged a cliché trap and the build dodged it cleanly.

(Honorable mentions, also 4.8 by average: **v48-titleblock** and **v49-channellock** — both trade-pure and well-finished.)

## Bottom 3

1. **v24-paint-chip** (avg 4.0) — concept is sharp but chip-surface render is below the bar; chips read pastel/icon-flat instead of glossy hardware-store deck stock. Polish pass needed.
2. **v27-rivetwork** (avg 4.2) — wordmark clip in header ("NORTH FO" cut), giant outlined NORTH letterform reads wireframe, weld-bead glow uniform/digital. Brutalist intent is right; finish pass owed.
3. **v51-galaxy-brain** (avg 4.4) — strong concept; branch-line contrast risk against cosmic ink + curve regularity not yet reading as biological/Lévy-flight. Tunable, not rebuildable.

## Needs-rebuild candidates before final QA

- **v24-paint-chip** — light rebuild on the chip render (saturation, gloss face vs. matte back, drop the "TAP" repeat hints which read as wireframe affordances).
- **v27-rivetwork** — header wordmark clip is a layout bug, not a polish issue; needs a real fix. Plate-cut letterform also wants another pass to read plasma-cut not outlined.

## Cross-batch notes

- **PageApproach entrance settling time is uneven.** Default 2.5s wait worked for v23/v24/v25/v26/v27/v48/v51/v52 but v49 needed ~4.5s and v50 needed ~9s for the corrugated tarp/zip-tie composition to fully resolve. If the final QA harness uses a fixed wait, raise it to 6s minimum.
- **No 500s, no blank-render blockers** observed across the 10 pages.
- **Dev-only console noise:** v52 hydration warning (above) is the only page-specific dev warning. The Clerk prod-key warning fires on every page in this dev environment and is environmental, not a build issue.
- **A11y watch list for final QA:** v26 keyboard focus rings, v51 branch-line contrast, all 10 pages — verify reduced-motion fallbacks ship the brief's resolved-state.
