"use client";

/**
 * TagStampEngine — V36 Tag Stamp
 *
 * Aluminum tree-tag debossing as the visual system. Numbers slightly off-axis
 * from a hand-stamp, brass wire loops, deboss shadow on a hand-lettered ledger
 * ground. Native to arboriculture, no cartoon evergreens.
 */

import { useState } from "react";

const TAGS = [
  {
    no: "047",
    title: "Live oak — crotch reduction",
    species: "Quercus virginiana",
    work: "Crotch reduction at 18\". Dead-wooded, end-weight relieved over the patio.",
    z133: "Z133.1 §8.3 — pruning",
    crew: "M.O. + L.G.",
    date: "04 / 22",
  },
  {
    no: "048",
    title: "Norway maple — TIP set",
    species: "Acer platanoides",
    work: "TIP set at 42'. Climber on a single rope, redirected through the central spar.",
    z133: "Z133.1 §6.2 — climbing",
    crew: "M.O. solo",
    date: "04 / 23",
  },
  {
    no: "049",
    title: "Silver maple — removal",
    species: "Acer saccharinum",
    work: "Sectional removal. Drop zone clear by 0900. Stump ground -8\" below grade.",
    z133: "Z133.1 §10 — removal",
    crew: "Full crew · 4",
    date: "04 / 24",
  },
  {
    no: "050",
    title: "Red oak — canopy lift",
    species: "Quercus rubra",
    work: "Lifted to 14'. No spike scars on a prune; foot-locked on Hitch Climber.",
    z133: "Z133.1 §8.5 — lifts",
    crew: "L.G. + apprentice",
    date: "04 / 25",
  },
  {
    no: "051",
    title: "Honeylocust — drop zone",
    species: "Gleditsia triacanthos",
    work: "Drop zone established. Cones, ribbon, ground crew briefed before the saw spun.",
    z133: "Z133.1 §3.1 — work plan",
    crew: "Full crew · 3",
    date: "04 / 26",
  },
  {
    no: "052",
    title: "Tulip poplar — co-dominant",
    species: "Liriodendron tulipifera",
    work: "Co-dominant stem reduced. End-weight bias addressed with a redirect.",
    z133: "Z133.1 §8.3 — pruning",
    crew: "M.O. + L.G.",
    date: "04 / 27",
  },
];

const SADDLE = [
  { name: "Hitch Climber pulley", spec: "DMM aluminum body, becket eye", note: "Friction hitch ride. Inspected before every climb." },
  { name: "Rope-runner Pro", spec: "RopeTek mechanical hitch", note: "Set-it-and-forget-it on the ride up. Limited working load 130 kg." },
  { name: "Flipline — kernmantle", spec: "Sterling 11 mm, 12'", note: "Side D, captured ascender; set short on a spar." },
  { name: "Wraptor", spec: "Powered ascender", note: "When the climb is 80'+. Battery-checked at the truck." },
  { name: "Steel-core lanyard", spec: "10 mm, 12 ft", note: "Backup tie-in for chainsaw work. Replaced on cut, not on year." },
  { name: "Throw weight + line", spec: "12 oz, 1.75 mm Zing-It", note: "TIP setting from the ground. Two attempts; if no, climber sets." },
];

const Z133_NOTES = [
  {
    sec: "§3.1",
    head: "Pre-work plan",
    body:
      "Every job starts with a written work plan. Hazards identified, drop zones marked, electrical clearance verified, escape routes named. Signed by the crew lead and posted at the truck.",
  },
  {
    sec: "§6.2",
    head: "Climbing systems",
    body:
      "Two points of attachment when chainsawing aloft. SRT or DRT, climber's call. Hitch checked at every reset; lanyard inspected before tie-in.",
  },
  {
    sec: "§8.3",
    head: "Pruning",
    body:
      "Cuts at the branch collar. No flush cuts. No spikes on prunes — spikes leave wounds that the tree will close around for fifteen years. Climbing spurs are for removals only.",
  },
  {
    sec: "§10",
    head: "Removals",
    body:
      "Sectional removal when the drop is contested. Top-down with redirects through the central leader. Ground crew briefed on signals before the saw spins.",
  },
];

export default function TagStampEngine() {
  const [openTag, setOpenTag] = useState<number | null>(null);
  const [openZ133, setOpenZ133] = useState<number | null>(0);

  return (
    <>
      <style>{css}</style>
      <div className="ts-shell">
        <div className="ts-ledger" aria-hidden />

        {/* TOP */}
        <header className="ts-top">
          <div className="ts-stamp">
            <span className="ts-stamp-line">REGISTERED ARBORIST</span>
            <span className="ts-stamp-line ts-stamp-line-bold">KPT — TREE WORKS</span>
            <span className="ts-stamp-line">ISA #NE-7142A · ANSI Z133</span>
          </div>
          <nav className="ts-nav" aria-label="Primary">
            <a className="ts-nav-link" href="#tagged">Tagged work</a>
            <a className="ts-nav-link" href="#saddle">The saddle</a>
            <a className="ts-nav-link" href="#z133">Z133 notes</a>
            <a className="ts-nav-link ts-nav-cta" href="#tag">Tag a tree</a>
          </nav>
        </header>

        {/* HERO */}
        <section className="ts-hero">
          <div className="ts-hero-tag" aria-hidden>
            <div className="ts-tag-wire ts-tag-wire-large" />
            <div className="ts-tag-plate ts-tag-plate-large">
              <div className="ts-tag-hole" />
              <div className="ts-tag-no">NO. <span>047</span></div>
              <div className="ts-tag-row">KPT</div>
              <div className="ts-tag-row ts-tag-row-small">TREE WORKS</div>
              <div className="ts-tag-rule" />
              <div className="ts-tag-row ts-tag-row-small">04 / 22 / 26</div>
            </div>
          </div>
          <div className="ts-hero-stack">
            <p className="ts-hero-cite">FIELD LEDGER · WK 17</p>
            <h1 className="ts-headline">
              TIP set.
              <br />
              Crotch reduction.
              <br />
              <span className="ts-headline-stamp">Drop zone</span>
              <span className="ts-headline-clear"> clear by 0900.</span>
            </h1>
            <p className="ts-sub">
              Arboriculture done by climbers — ANSI Z133 work plans on every
              job, no spike scars on prunes.
            </p>
            <div className="ts-cta-row">
              <a href="#tag" className="ts-cta ts-cta-primary">Tag a tree</a>
              <a href="#z133" className="ts-cta ts-cta-secondary">Read the work plan</a>
            </div>
            <ul className="ts-hero-vitals">
              <li><span>ISA</span> certified climbers · 3</li>
              <li><span>TIP</span> set in &lt; 2 throws</li>
              <li><span>SPIKES</span> removals only — never on a prune</li>
            </ul>
          </div>
        </section>

        {/* TAGGED WORK */}
        <section className="ts-section" id="tagged">
          <header className="ts-section-head">
            <span className="ts-section-num">§ 01</span>
            <h2 className="ts-section-title">Tagged work</h2>
            <p className="ts-section-kicker">
              Every tree we touch gets a tag — debossed aluminum, hand-stamped
              numbers, brass wire. Hover to push the tag forward; click to
              read the entry.
            </p>
          </header>

          <ul className="ts-tags">
            {TAGS.map((t, i) => {
              const open = openTag === i;
              return (
                <li key={t.no}>
                  <button
                    type="button"
                    className={`ts-tag${open ? " is-open" : ""}`}
                    onClick={() => setOpenTag((cur) => (cur === i ? null : i))}
                    aria-expanded={open}
                  >
                    <span className="ts-tag-wire" aria-hidden />
                    <span className="ts-tag-plate">
                      <span className="ts-tag-hole" aria-hidden />
                      <span className="ts-tag-no">
                        NO. <span>{t.no}</span>
                      </span>
                      <span className="ts-tag-row ts-tag-row-small">
                        {t.species}
                      </span>
                      <span className="ts-tag-rule" aria-hidden />
                      <span className="ts-tag-row ts-tag-row-title">
                        {t.title}
                      </span>
                      <span className="ts-tag-row ts-tag-row-meta">
                        {t.date} · {t.crew}
                      </span>
                    </span>
                  </button>
                  {open && (
                    <div className="ts-tag-flap">
                      <p className="ts-tag-flap-work">{t.work}</p>
                      <p className="ts-tag-flap-meta">
                        <span>{t.z133}</span>
                        <span>· {t.crew}</span>
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        {/* THE SADDLE */}
        <section className="ts-section" id="saddle">
          <header className="ts-section-head">
            <span className="ts-section-num">§ 02</span>
            <h2 className="ts-section-title">The saddle</h2>
            <p className="ts-section-kicker">
              Climb gear, ordered. Hitch fluency is a daily obsession at
              7am tailgate.
            </p>
          </header>

          <ul className="ts-saddle">
            {SADDLE.map((s, i) => (
              <li key={s.name} className="ts-saddle-row">
                <span className="ts-saddle-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="ts-saddle-icon" aria-hidden>
                  {/* tiny inline gear glyphs */}
                  {i === 0 && (
                    <svg viewBox="0 0 24 24" width="22" height="22">
                      <circle cx="12" cy="12" r="9" fill="none" stroke="#26241D" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="5" fill="none" stroke="#26241D" strokeWidth="1.5" />
                      <path d="M3 12 L21 12" stroke="#26241D" strokeWidth="1.5" />
                    </svg>
                  )}
                  {i === 1 && (
                    <svg viewBox="0 0 24 24" width="22" height="22">
                      <rect x="6" y="4" width="12" height="16" rx="2" fill="none" stroke="#26241D" strokeWidth="1.5" />
                      <path d="M9 4 L9 20 M15 4 L15 20" stroke="#26241D" strokeWidth="1.2" />
                    </svg>
                  )}
                  {i === 2 && (
                    <svg viewBox="0 0 24 24" width="22" height="22">
                      <path d="M3 6 C 8 14, 16 10, 21 18" fill="none" stroke="#26241D" strokeWidth="1.6" />
                      <circle cx="3" cy="6" r="2" fill="#26241D" />
                      <circle cx="21" cy="18" r="2" fill="#26241D" />
                    </svg>
                  )}
                  {i === 3 && (
                    <svg viewBox="0 0 24 24" width="22" height="22">
                      <rect x="7" y="3" width="10" height="14" fill="none" stroke="#26241D" strokeWidth="1.5" />
                      <circle cx="12" cy="20" r="2" fill="none" stroke="#26241D" strokeWidth="1.5" />
                      <path d="M9 7 L15 7 M9 11 L15 11" stroke="#26241D" strokeWidth="1.2" />
                    </svg>
                  )}
                  {i === 4 && (
                    <svg viewBox="0 0 24 24" width="22" height="22">
                      <path d="M4 4 L20 20 M20 4 L4 20" stroke="#26241D" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="4" fill="none" stroke="#26241D" strokeWidth="1.5" />
                    </svg>
                  )}
                  {i === 5 && (
                    <svg viewBox="0 0 24 24" width="22" height="22">
                      <circle cx="6" cy="18" r="3" fill="#26241D" />
                      <path d="M6 18 L20 4" stroke="#26241D" strokeWidth="1.5" />
                      <circle cx="20" cy="4" r="2" fill="none" stroke="#26241D" strokeWidth="1.5" />
                    </svg>
                  )}
                </span>
                <div className="ts-saddle-text">
                  <h4 className="ts-saddle-name">{s.name}</h4>
                  <p className="ts-saddle-spec">{s.spec}</p>
                  <p className="ts-saddle-note">{s.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Z133 NOTES */}
        <section className="ts-section" id="z133">
          <header className="ts-section-head">
            <span className="ts-section-num">§ 03</span>
            <h2 className="ts-section-title">Z133 notes</h2>
            <p className="ts-section-kicker">
              Plain-language excerpts from the standard with our notes.
              Small-caps headers, debossed numerics.
            </p>
          </header>

          <div className="ts-z133">
            {Z133_NOTES.map((z, i) => {
              const open = openZ133 === i;
              return (
                <article key={z.sec} className={`ts-z133-row${open ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="ts-z133-tab"
                    onClick={() =>
                      setOpenZ133((cur) => (cur === i ? null : i))
                    }
                    aria-expanded={open}
                  >
                    <span className="ts-z133-sec">{z.sec}</span>
                    <span className="ts-z133-head">{z.head}</span>
                    <span className="ts-z133-mark" aria-hidden>{open ? "—" : "+"}</span>
                  </button>
                  <div className="ts-z133-body" aria-hidden={!open}>
                    <p>{z.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="ts-foot" id="tag">
          <div className="ts-foot-stamp">
            <span className="ts-foot-stamp-arc">KPT · TREE WORKS</span>
            <span className="ts-foot-stamp-mid">047</span>
            <span className="ts-foot-stamp-arc ts-foot-stamp-arc-bottom">REG. ARBORIST · ANSI Z133</span>
          </div>
          <div className="ts-foot-grid">
            <div>
              <p className="ts-foot-label">Lead climber</p>
              <p className="ts-foot-value">M. Olafsson — ISA NE-7142A</p>
            </div>
            <div>
              <p className="ts-foot-label">Crew</p>
              <p className="ts-foot-value">3 climbers · 2 ground · CDL chip-truck driver</p>
            </div>
            <div>
              <p className="ts-foot-label">Service area</p>
              <p className="ts-foot-value">Western Mass · Pioneer Valley</p>
            </div>
            <div>
              <p className="ts-foot-label">Tag a tree</p>
              <p className="ts-foot-value">
                <a className="ts-foot-link" href="#tag">tag@kpt-tree.work</a>
              </p>
            </div>
          </div>
          <p className="ts-foot-rule">
            © KPT Tree Works 2026 — No spike scars on prunes. Drop zone clear before the saw spins.
          </p>
        </footer>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');

:root, .ts-shell {
  --ledger: #E8E3D6;
  --ledger-2: #DDD7C5;
  --ink: #26241D;
  --ink-soft: #4A463C;
  --aluminum: #BFC2BD;
  --aluminum-shade: #8E938C;
  --deboss: #4A4D49;
  --brass: #B6925A;
  --brass-deep: #8C6E3F;
  --rule: #1F1F1A;
}

.ts-shell {
  position: relative;
  font-family: 'Inter', system-ui, sans-serif;
  color: var(--ink);
  background: var(--ledger);
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 40px 80px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/* Hand-lettered ledger ground — horizontal rule lines + faint vertical column */
.ts-ledger {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent 0 31px,
      rgba(176, 152, 96, 0.18) 31px 32px
    ),
    linear-gradient(90deg, transparent 0 84px, rgba(190,90,90,0.25) 84px 85px, transparent 85px);
  opacity: 0.55;
}

/* TOP */
.ts-top {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  margin-bottom: 0;
  border-bottom: 1px solid var(--ink);
}
.ts-stamp {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  border: 2px solid var(--ink);
  padding: 8px 14px;
  line-height: 1.5;
  text-transform: uppercase;
  background: var(--ledger);
  box-shadow: 2px 2px 0 0 var(--ink-soft);
}
.ts-stamp-line-bold { font-weight: 700; font-size: 13px; }
.ts-nav {
  display: flex;
  gap: 24px;
  font-size: 13px;
  font-weight: 500;
}
.ts-nav-link {
  color: var(--ink);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  padding-bottom: 2px;
  transition: border-color 160ms, color 160ms;
}
.ts-nav-link:hover, .ts-nav-link:focus-visible {
  border-bottom-color: var(--brass);
  color: var(--brass-deep);
  outline: none;
}
.ts-nav-cta {
  background: var(--ink);
  color: var(--ledger);
  padding: 8px 14px;
  border-bottom: none;
}
.ts-nav-cta:hover, .ts-nav-cta:focus-visible {
  background: var(--brass-deep);
  color: var(--ledger);
  border-bottom: none;
}

/* HERO */
.ts-hero {
  position: relative;
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 64px;
  margin: 56px 0 96px;
  align-items: start;
}
@media (max-width: 880px) {
  .ts-hero { grid-template-columns: 1fr; gap: 32px; }
}

.ts-hero-tag {
  position: relative;
  width: 240px;
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ts-sway 4400ms ease-in-out infinite;
  transform-origin: 50% 0%;
}
@keyframes ts-sway {
  0%, 100% { transform: rotate(-1.4deg); }
  50% { transform: rotate(1.4deg); }
}
.ts-tag-wire {
  width: 1.5px;
  height: 36px;
  background: var(--brass);
  position: relative;
}
.ts-tag-wire-large { height: 48px; }
.ts-tag-wire::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -8px);
  width: 12px;
  height: 12px;
  border: 1.5px solid var(--brass);
  border-radius: 50%;
  background: transparent;
}

/* Tag plate primitive */
.ts-tag-plate {
  position: relative;
  width: 200px;
  background: var(--aluminum);
  background-image:
    repeating-linear-gradient(
      90deg,
      rgba(255,255,255,0.04) 0 1px,
      rgba(0,0,0,0.05) 1px 2px
    );
  border: 1px solid var(--aluminum-shade);
  padding: 22px 18px 18px;
  box-shadow:
    inset 0 1px 0 0 rgba(255,255,255,0.45),
    inset 0 -1px 0 0 rgba(0,0,0,0.1),
    2px 4px 8px rgba(0,0,0,0.18);
  text-align: center;
  transform-origin: 50% 0%;
  transition: transform 240ms, box-shadow 240ms;
}
.ts-tag-plate-large {
  width: 240px;
  padding: 28px 22px 22px;
}
.ts-tag-plate::after {
  content: "";
  position: absolute;
  inset: 4px;
  border: 1px dashed var(--aluminum-shade);
  pointer-events: none;
  opacity: 0.4;
}
.ts-tag-hole {
  position: absolute;
  top: 8px;
  left: 50%;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transform: translateX(-50%);
  background: var(--ledger);
  box-shadow:
    inset 0 1px 0 0 rgba(0,0,0,0.35),
    inset 0 -1px 0 0 rgba(255,255,255,0.4);
}
.ts-tag-no {
  font-family: 'DM Serif Display', serif;
  font-size: 28px;
  letter-spacing: 0.06em;
  color: var(--deboss);
  margin-top: 6px;
  text-shadow:
    -1px -1px 0 rgba(255,255,255,0.6),
    1px 1px 0 rgba(0,0,0,0.18);
}
.ts-tag-no span {
  display: inline-block;
  transform: rotate(-2deg) translateY(-1px);
  font-weight: 400;
}
.ts-tag-row {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.18em;
  color: var(--deboss);
  margin: 6px 0 0;
  text-shadow:
    -1px -1px 0 rgba(255,255,255,0.5),
    1px 1px 0 rgba(0,0,0,0.18);
  text-transform: uppercase;
}
.ts-tag-row-small { font-size: 9.5px; letter-spacing: 0.12em; font-weight: 500; }
.ts-tag-row-title { font-size: 11px; line-height: 1.3; padding: 0 4px; }
.ts-tag-row-meta { font-size: 9px; letter-spacing: 0.1em; opacity: 0.85; }
.ts-tag-rule {
  margin: 10px auto;
  width: 60%;
  height: 1px;
  background: var(--aluminum-shade);
}

.ts-hero-stack {
  position: relative;
  max-width: 720px;
  z-index: 2;
}
.ts-hero-cite {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--brass-deep);
  margin: 8px 0 24px;
  font-weight: 700;
  text-transform: uppercase;
}
.ts-headline {
  font-family: 'DM Serif Display', serif;
  font-weight: 400;
  font-size: clamp(44px, 6.4vw, 84px);
  line-height: 1.04;
  letter-spacing: -0.01em;
  margin: 0 0 28px;
}
.ts-headline-stamp {
  display: inline-block;
  background: var(--aluminum);
  border: 1px solid var(--aluminum-shade);
  color: var(--deboss);
  padding: 0 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.78em;
  letter-spacing: 0.03em;
  transform: rotate(-1deg);
  vertical-align: 4px;
  text-shadow: -1px -1px 0 rgba(255,255,255,0.5), 1px 1px 0 rgba(0,0,0,0.15);
}
.ts-headline-clear { font-style: italic; }

.ts-sub {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  line-height: 1.55;
  max-width: 56ch;
  margin: 0 0 28px;
  color: var(--ink-soft);
}
.ts-cta-row { display: flex; gap: 14px; margin-bottom: 28px; flex-wrap: wrap; }
.ts-cta {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.05em;
  text-decoration: none;
  padding: 12px 18px;
  border: 1.5px solid var(--ink);
  transition: background 160ms, color 160ms, transform 160ms;
}
.ts-cta-primary { background: var(--ink); color: var(--ledger); }
.ts-cta-primary:hover, .ts-cta-primary:focus-visible {
  background: var(--brass-deep);
  border-color: var(--brass-deep);
  outline: none;
  transform: translate(-2px, -2px);
}
.ts-cta-secondary { background: transparent; color: var(--ink); }
.ts-cta-secondary:hover, .ts-cta-secondary:focus-visible {
  background: var(--ink);
  color: var(--ledger);
  outline: none;
  transform: translate(-2px, -2px);
}

.ts-hero-vitals {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  border-top: 1px solid var(--ink);
  padding-top: 14px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
}
.ts-hero-vitals li { color: var(--ink-soft); }
.ts-hero-vitals span {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--brass-deep);
  margin-right: 8px;
}

/* SECTIONS */
.ts-section { position: relative; margin-bottom: 96px; z-index: 2; }
.ts-section-head {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 24px 36px;
  align-items: baseline;
  margin-bottom: 36px;
  border-top: 1px solid var(--ink);
  padding-top: 24px;
}
.ts-section-num {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.16em;
  color: var(--brass-deep);
}
.ts-section-title {
  font-family: 'DM Serif Display', serif;
  font-weight: 400;
  font-size: clamp(30px, 4vw, 48px);
  letter-spacing: -0.01em;
  margin: 0;
}
.ts-section-kicker {
  grid-column: 2;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.55;
  max-width: 60ch;
  color: var(--ink-soft);
  margin: 0;
}

/* TAGS GRID */
.ts-tags {
  list-style: none;
  margin: 0;
  padding: 24px 0 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 56px 32px;
}
@media (max-width: 880px) { .ts-tags { grid-template-columns: repeat(2, 1fr); gap: 48px 24px; } }
@media (max-width: 560px) { .ts-tags { grid-template-columns: 1fr; } }

.ts-tag {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: transparent;
  border: 0;
  cursor: pointer;
  font: inherit;
  padding: 0;
}
.ts-tag:focus-visible { outline: 2px solid var(--brass-deep); outline-offset: 6px; }
.ts-tag .ts-tag-plate {
  width: 200px;
  transition: transform 240ms cubic-bezier(.4,.2,.2,1), box-shadow 240ms;
}
.ts-tag:hover .ts-tag-plate, .ts-tag:focus-visible .ts-tag-plate, .ts-tag.is-open .ts-tag-plate {
  transform: translateY(-6px) rotate(-1.5deg);
  box-shadow:
    inset 0 1px 0 0 rgba(255,255,255,0.5),
    inset 0 -1px 0 0 rgba(0,0,0,0.1),
    6px 12px 18px rgba(0,0,0,0.22);
}
.ts-tag-flap {
  margin-top: 16px;
  background: var(--ledger-2);
  border: 1px solid var(--ink-soft);
  padding: 14px 16px;
  width: 100%;
  max-width: 320px;
  font-family: 'Inter', sans-serif;
  animation: ts-flap-in 220ms ease-out;
  position: relative;
}
.ts-tag-flap::before {
  content: "";
  position: absolute;
  top: -7px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 12px;
  height: 12px;
  background: var(--ledger-2);
  border-left: 1px solid var(--ink-soft);
  border-top: 1px solid var(--ink-soft);
}
@keyframes ts-flap-in {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.ts-tag-flap-work {
  font-size: 14px;
  line-height: 1.55;
  margin: 0 0 10px;
  color: var(--ink);
}
.ts-tag-flap-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--brass-deep);
  margin: 0;
  display: flex;
  gap: 8px;
}

/* SADDLE */
.ts-saddle { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--ink); }
.ts-saddle-row {
  display: grid;
  grid-template-columns: 56px 56px 1fr;
  gap: 16px;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid rgba(38,36,29,0.18);
  transition: background 160ms;
}
.ts-saddle-row:hover { background: rgba(182,146,90,0.08); }
.ts-saddle-num {
  font-family: 'DM Serif Display', serif;
  font-style: italic;
  font-size: 26px;
  color: var(--brass-deep);
}
.ts-saddle-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  background: var(--ledger-2);
  border: 1px solid var(--ink-soft);
}
.ts-saddle-text { display: grid; gap: 4px; }
.ts-saddle-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 17px;
  margin: 0;
}
.ts-saddle-spec {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--brass-deep);
  margin: 0;
  text-transform: uppercase;
}
.ts-saddle-note {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: var(--ink-soft);
  margin: 0;
}

/* Z133 */
.ts-z133 { border-top: 1px solid var(--ink); }
.ts-z133-row { border-bottom: 1px solid rgba(38,36,29,0.2); }
.ts-z133-tab {
  display: grid;
  grid-template-columns: 80px 1fr 30px;
  gap: 18px;
  align-items: baseline;
  width: 100%;
  background: transparent;
  border: 0;
  padding: 18px 0;
  text-align: left;
  cursor: pointer;
  font: inherit;
  color: var(--ink);
  transition: background 160ms;
}
.ts-z133-tab:hover, .ts-z133-tab:focus-visible {
  background: rgba(182,146,90,0.1);
  outline: none;
}
.ts-z133-sec {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.14em;
  color: var(--brass-deep);
}
.ts-z133-head {
  font-family: 'DM Serif Display', serif;
  font-size: 22px;
  font-style: italic;
}
.ts-z133-mark {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 18px;
  text-align: right;
  color: var(--brass-deep);
}
.ts-z133-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 280ms cubic-bezier(.5,.1,.3,1), padding 200ms;
  padding: 0 0 0 98px;
}
.ts-z133-row.is-open .ts-z133-body {
  max-height: 240px;
  padding-bottom: 24px;
}
.ts-z133-body p {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
  max-width: 60ch;
  color: var(--ink);
}

/* FOOTER */
.ts-foot {
  position: relative;
  border-top: 4px solid var(--ink);
  padding-top: 36px;
  margin-top: 24px;
  z-index: 2;
}
.ts-foot-stamp {
  position: relative;
  width: 132px;
  height: 132px;
  border-radius: 50%;
  border: 2px solid var(--ink);
  display: grid;
  place-items: center;
  margin-bottom: 28px;
  background: var(--ledger);
}
.ts-foot-stamp-mid {
  font-family: 'DM Serif Display', serif;
  font-style: italic;
  font-size: 36px;
  color: var(--ink);
}
.ts-foot-stamp-arc {
  position: absolute;
  top: 14px;
  left: 0;
  right: 0;
  text-align: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.16em;
  font-weight: 700;
}
.ts-foot-stamp-arc-bottom { top: auto; bottom: 14px; }

.ts-foot-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 28px;
}
@media (max-width: 720px) { .ts-foot-grid { grid-template-columns: repeat(2, 1fr); } }
.ts-foot-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--brass-deep);
  margin: 0 0 6px;
  font-weight: 700;
  text-transform: uppercase;
}
.ts-foot-value {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  color: var(--ink);
}
.ts-foot-link {
  color: var(--brass-deep);
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 3px;
}
.ts-foot-link:hover, .ts-foot-link:focus-visible { color: var(--ink); outline: none; }
.ts-foot-rule {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--ink-soft);
  border-top: 1px dashed var(--ink-soft);
  padding-top: 14px;
  margin: 0;
  letter-spacing: 0.06em;
}

@media (prefers-reduced-motion: reduce) {
  .ts-hero-tag { animation: none !important; }
  .ts-tag .ts-tag-plate, .ts-saddle-row, .ts-cta, .ts-nav-link, .ts-z133-body, .ts-tag-flap {
    transition: none !important;
    animation: none !important;
  }
}
`;
