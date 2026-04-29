"use client";

/**
 * KnotFluencyEngine — V67 Knot Fluency
 *
 * Saddle-black ground. Friction-hitch and tie-in-point diagrams as section
 * markers. Kernmantle-lime rope traces the page. Anodized-red hardware as
 * accent. Climbing-arborist tree-service showcase.
 */

import { useState } from "react";

const HITCHES = [
  {
    id: "distel",
    name: "Distel hitch",
    use: "Primary friction hitch on a moving-rope system.",
    body: "Four wraps and a Prusik finish on a kernmantle eye-and-eye. Sets fast, tends well, releases under load.",
    path: "M30 50 Q30 20 60 20 Q90 20 90 50 Q90 80 60 80 Q30 80 30 50 M28 30 Q60 12 92 30 M28 50 Q60 32 92 50 M28 70 Q60 52 92 70",
  },
  {
    id: "vt",
    name: "VT (Valdotain Tresse)",
    use: "Smooth descent on doubled-rope or single-rope-system.",
    body: "Three braids with a doubled finish. Feeds clean through a pulley, dresses tight on the climb back up.",
    path: "M30 18 L60 30 L90 18 M30 36 L60 48 L90 36 M30 54 L60 66 L90 54 M30 72 L60 84 L90 72 M30 18 L30 82 M90 18 L90 82",
  },
  {
    id: "schwabisch",
    name: "Schwabisch",
    use: "Asymmetric workhorse for canopy moves.",
    body: "Three-and-two; long leg up the standing line, short leg down. Holds when you need it, slips when you ask.",
    path: "M30 24 Q60 14 90 24 M30 38 Q60 28 90 38 M30 52 Q60 42 90 52 M40 66 Q60 60 80 66 M40 80 Q60 74 80 80 M40 24 L40 80 M80 24 L80 80",
  },
  {
    id: "michoacan",
    name: "Michoacan",
    use: "South-American hybrid; compact, fast.",
    body: "Two-leg basket with a triple-fisherman lock. Reads like a Distel; holds like a sewn eye.",
    path: "M50 14 Q30 30 30 50 Q30 70 50 86 M50 14 Q70 30 70 50 Q70 70 50 86 M40 30 L60 30 M40 50 L60 50 M40 70 L60 70",
  },
];

const SYSTEM = [
  { label: "MRS", title: "Moving Rope System", body: "Doubled rope through a TIP. Climber moves up, the rope moves around the limb. Old-school grace, new-school SRT mechanics on the saw side." },
  { label: "SRS", title: "Stationary Rope System", body: "Single line anchored at the trunk or in a basal anchor. Faster ascents, cleaner rope management, gear-heavy entry." },
];

const CLIMBS = [
  { id: "01", site: "White-oak crown reduction", system: "MRS · Distel", note: "Three TIPs. Spar pole drop on the lead. No spike scars." },
  { id: "02", site: "Honey-locust fine prune", system: "SRS · Hitchclimber", note: "Six entry points, redirect off the redirect ring. Clean light through." },
  { id: "03", site: "Norway maple windsail removal", system: "MRS · VT", note: "Two-rigger setup, GRCS at the base. Lowering the stem in 8&apos; sections." },
  { id: "04", site: "Eastern hemlock canopy lift", system: "SRS · Schwabisch", note: "Lift to 14&apos;. Three-foot mulch ring laid at end of day. No volcano." },
  { id: "05", site: "Pin-oak crotch reduction", system: "MRS · Distel", note: "Drop-zone tarped, chipper feed-wheel sharp. Crew of three." },
];

function Knot({ path, animated }: { path: string; animated: boolean }) {
  return (
    <svg className={`kf-knot${animated ? " kf-knot-tying" : ""}`} viewBox="0 0 120 100" aria-hidden>
      <path d={path} />
    </svg>
  );
}

export default function KnotFluencyEngine() {
  const [openHitch, setOpenHitch] = useState<string>("distel");
  const [openSystem, setOpenSystem] = useState<string>("MRS");

  return (
    <>
      <style>{css}</style>
      <div className="kf-shell">
        <div className="kf-rope-trace" aria-hidden>
          <svg viewBox="0 0 100 1200" preserveAspectRatio="none">
            <path
              d="M50 0 Q70 100 50 220 Q30 340 50 460 Q70 580 50 700 Q30 820 50 940 Q70 1060 50 1200"
              stroke="#C0E140"
              strokeWidth="3"
              strokeDasharray="14 8"
              fill="none"
            />
          </svg>
        </div>

        {/* TOP BAR */}
        <header className="kf-top">
          <div className="kf-mark">
            <svg viewBox="0 0 60 60" className="kf-mark-glyph" aria-hidden>
              <circle cx="30" cy="30" r="22" fill="none" stroke="#C0E140" strokeWidth="3" />
              <path d="M14 30 Q30 12 46 30 M14 30 Q30 48 46 30" stroke="#C92228" strokeWidth="3" fill="none" />
            </svg>
            <div>
              <span className="kf-mark-name">KPT &middot; CLIMBING ARBORISTS</span>
              <span className="kf-mark-sub">ISA-CERT TWS-7104A · INSURED CRANE-ASSIST · TCIA</span>
            </div>
          </div>
          <nav className="kf-nav">
            <a href="#hitches" className="kf-nav-link">Hitches</a>
            <a href="#system" className="kf-nav-link">System</a>
            <a href="#climbs" className="kf-nav-link">Climbs</a>
            <a href="#tie-in" className="kf-nav-link">Tie in</a>
          </nav>
        </header>

        {/* HERO */}
        <section className="kf-hero">
          <div className="kf-hero-knot">
            <Knot path={HITCHES[0].path} animated />
            <span className="kf-hero-knot-label">DISTEL · 4-WRAP · BLAZE 9.7mm</span>
          </div>
          <div className="kf-hero-text">
            <span className="kf-tag">Tailgate · 7:14 AM</span>
            <h1 className="kf-headline">
              Rope-runner pro.
              <br />
              ZigZag.
              <br />
              <span className="kf-headline-em">Distel hitch.</span>
              <span className="kf-headline-coda"> Climb&rsquo;s clean.</span>
            </h1>
            <p className="kf-sub">
              Climbing-arborist tree work — moving-rope-system fluency on every
              climb, no spike scars on prunes. We&rsquo;ll set the TIP before
              we touch the saw.
            </p>
            <div className="kf-cta-row">
              <a className="kf-cta kf-cta-primary" href="#tie-in">Tie in</a>
              <a className="kf-cta kf-cta-secondary" href="#system">See the rigging</a>
            </div>
          </div>
        </section>

        {/* HITCHES */}
        <section id="hitches" className="kf-section">
          <div className="kf-section-head">
            <span className="kf-section-num">I.</span>
            <h2 className="kf-section-title">The Hitches</h2>
            <p className="kf-section-aside">Hover or focus a hitch to dress it tighter.</p>
          </div>
          <div className="kf-hitches">
            {HITCHES.map((h) => (
              <article
                key={h.id}
                className={`kf-hitch${openHitch === h.id ? " on" : ""}`}
                tabIndex={0}
                onMouseEnter={() => setOpenHitch(h.id)}
                onFocus={() => setOpenHitch(h.id)}
              >
                <div className="kf-hitch-knot">
                  <Knot path={h.path} animated={openHitch === h.id} />
                </div>
                <div className="kf-hitch-text">
                  <h3>{h.name}</h3>
                  <p className="kf-hitch-use">{h.use}</p>
                  <p className="kf-hitch-body">{h.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SYSTEM */}
        <section id="system" className="kf-section">
          <div className="kf-section-head">
            <span className="kf-section-num">II.</span>
            <h2 className="kf-section-title">The System</h2>
            <p className="kf-section-aside">Two systems on the truck, picked at the trunk before the boots.</p>
          </div>
          <div className="kf-system-tabs" role="tablist">
            {SYSTEM.map((s) => (
              <button
                key={s.label}
                role="tab"
                aria-selected={openSystem === s.label}
                className={`kf-system-tab${openSystem === s.label ? " on" : ""}`}
                onClick={() => setOpenSystem(s.label)}
                onMouseEnter={() => setOpenSystem(s.label)}
                onFocus={() => setOpenSystem(s.label)}
              >
                <span className="kf-system-label">{s.label}</span>
                <span className="kf-system-name">{s.title}</span>
              </button>
            ))}
          </div>
          <div className="kf-system-pane">
            {SYSTEM.map((s) => (
              <div key={s.label} className={`kf-system-card${openSystem === s.label ? " on" : ""}`}>
                <div className="kf-system-diagram" aria-hidden>
                  {s.label === "MRS" ? (
                    <svg viewBox="0 0 220 240">
                      <path d="M110 16 L110 60" stroke="#5A412A" strokeWidth="6" />
                      <ellipse cx="110" cy="60" rx="36" ry="14" fill="#5A412A" />
                      <path d="M86 60 Q86 130 70 220" stroke="#C0E140" strokeWidth="3" fill="none" />
                      <path d="M134 60 Q134 130 150 220" stroke="#C0E140" strokeWidth="3" fill="none" />
                      <circle cx="70" cy="220" r="6" fill="#C92228" />
                      <circle cx="150" cy="220" r="6" fill="#C92228" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 220 240">
                      <path d="M110 16 L110 60" stroke="#5A412A" strokeWidth="6" />
                      <ellipse cx="110" cy="60" rx="36" ry="14" fill="#5A412A" />
                      <rect x="100" y="58" width="20" height="10" fill="#C92228" />
                      <path d="M110 68 Q110 140 110 220" stroke="#C0E140" strokeWidth="3" fill="none" />
                      <circle cx="110" cy="220" r="6" fill="#C92228" />
                    </svg>
                  )}
                </div>
                <div className="kf-system-text">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RECENT CLIMBS */}
        <section id="climbs" className="kf-section">
          <div className="kf-section-head">
            <span className="kf-section-num">III.</span>
            <h2 className="kf-section-title">Recent Climbs</h2>
            <p className="kf-section-aside">Categorized by rigging system. No spikes on prune work — ever.</p>
          </div>
          <ol className="kf-climbs">
            {CLIMBS.map((c) => (
              <li key={c.id} className="kf-climb" tabIndex={0}>
                <span className="kf-climb-num">{c.id}</span>
                <div className="kf-climb-body">
                  <h3 dangerouslySetInnerHTML={{ __html: c.site }} />
                  <p className="kf-climb-note" dangerouslySetInnerHTML={{ __html: c.note }} />
                </div>
                <span className="kf-climb-system">{c.system}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <section id="tie-in" className="kf-section kf-section-cta">
          <div className="kf-cta-card">
            <div className="kf-cta-knot">
              <Knot path={HITCHES[1].path} animated />
            </div>
            <div className="kf-cta-text">
              <span className="kf-tag">Walk-it day</span>
              <h2 className="kf-cta-headline">Walk us the property. We&rsquo;ll set a TIP.</h2>
              <p className="kf-cta-body">
                Forty minutes on site. We climb a target tree, set our tie-in,
                and price the work from the canopy. You get the bid that
                afternoon — written from the saddle, not the truck cab.
              </p>
              <div className="kf-cta-row">
                <a className="kf-cta kf-cta-primary" href="#">Schedule a walk</a>
                <a className="kf-cta kf-cta-secondary" href="#">See the gear list</a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="kf-footer">
          <span className="kf-footer-stamp">SADDLE 04 / 26 / 26</span>
          <span>ISA-CERTIFIED · TCIA-ACCREDITED · GEAR INSPECTED 03 / 30 / 26</span>
          <span>(508) 555-0142 · CALLS RETURNED FROM THE CAB</span>
        </footer>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@500;600;700&family=Archivo:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap');

.kf-shell {
  min-height: 100vh;
  background:
    radial-gradient(ellipse at 20% 0%, #1A1A14 0%, #0E0E0E 60%, #050505 100%);
  color: #C0E140;
  font-family: 'Archivo', system-ui, sans-serif;
  position: relative;
  padding: 28px 24px 64px;
  overflow-x: hidden;
}
.kf-rope-trace {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.18;
}
.kf-rope-trace svg { width: 100%; height: 100%; }
.kf-shell > * { position: relative; z-index: 1; }

.kf-knot {
  width: 120px;
  height: 100px;
  fill: none;
  stroke: #C0E140;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.kf-knot-tying path {
  stroke-dasharray: 800;
  stroke-dashoffset: 800;
  animation: kf-tie 1.6s cubic-bezier(0.7, 0, 0.3, 1) forwards;
}
@keyframes kf-tie {
  to { stroke-dashoffset: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .kf-knot-tying path { animation: none; stroke-dashoffset: 0; }
}

.kf-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px;
  border-bottom: 1px solid rgba(192, 225, 64, 0.4);
  padding-bottom: 18px;
  margin-bottom: 36px;
}
.kf-mark { display: flex; align-items: center; gap: 14px; }
.kf-mark-glyph { width: 48px; height: 48px; flex-shrink: 0; }
.kf-mark-name {
  display: block;
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.06em;
  color: #C0E140;
  text-transform: uppercase;
}
.kf-mark-sub {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  color: rgba(192, 225, 64, 0.55);
}
.kf-nav { display: flex; gap: 22px; flex-wrap: wrap; }
.kf-nav-link {
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #C0E140;
  text-decoration: none;
  padding: 4px 0;
  position: relative;
  transition: color 220ms ease;
}
.kf-nav-link::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: -2px;
  height: 2px;
  background: #C92228;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 280ms cubic-bezier(0.7, 0, 0.3, 1);
}
.kf-nav-link:hover, .kf-nav-link:focus-visible {
  outline: none;
  color: #C92228;
}
.kf-nav-link:hover::after, .kf-nav-link:focus-visible::after { transform: scaleX(1); }
@media (prefers-reduced-motion: reduce) { .kf-nav-link::after { transition: none; } }

.kf-hero {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 56px;
  align-items: center;
  padding: 32px 0 80px;
  border-bottom: 1px solid rgba(192, 225, 64, 0.3);
  margin-bottom: 56px;
}
.kf-hero-knot {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
.kf-hero-knot .kf-knot {
  width: 280px;
  height: 240px;
  stroke-width: 3;
  filter: drop-shadow(0 0 12px rgba(192, 225, 64, 0.25));
}
.kf-hero-knot-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  color: #C92228;
  border: 1px solid #C92228;
  padding: 5px 10px;
}
.kf-tag {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.24em;
  color: #C0E140;
  background: rgba(192, 225, 64, 0.12);
  border: 1px solid rgba(192, 225, 64, 0.4);
  padding: 4px 10px;
  margin-bottom: 18px;
  text-transform: uppercase;
}
.kf-headline {
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: 700;
  font-size: clamp(48px, 7.5vw, 104px);
  line-height: 0.96;
  margin: 0 0 22px;
  color: #C0E140;
  letter-spacing: -0.005em;
  text-transform: uppercase;
}
.kf-headline-em { color: #C92228; }
.kf-headline-coda {
  font-family: 'Archivo', sans-serif;
  font-style: italic;
  font-weight: 500;
  color: rgba(192, 225, 64, 0.85);
  font-size: 0.7em;
  text-transform: none;
  letter-spacing: 0;
}
.kf-sub {
  font-family: 'Archivo', sans-serif;
  font-size: 19px;
  line-height: 1.5;
  color: rgba(192, 225, 64, 0.85);
  max-width: 560px;
  margin: 0 0 28px;
}
.kf-cta-row { display: flex; gap: 14px; flex-wrap: wrap; }
.kf-cta {
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  padding: 14px 24px;
  text-decoration: none;
  border: 2px solid #C0E140;
  transition: transform 200ms ease, background 200ms ease, color 200ms ease;
}
.kf-cta-primary { background: #C0E140; color: #0E0E0E; }
.kf-cta-primary:hover, .kf-cta-primary:focus-visible {
  outline: none;
  background: #C92228;
  border-color: #C92228;
  color: #FFFFFF;
  transform: translate(-1px, -1px);
}
.kf-cta-secondary { background: transparent; color: #C0E140; }
.kf-cta-secondary:hover, .kf-cta-secondary:focus-visible {
  outline: none;
  background: rgba(192, 225, 64, 0.12);
  transform: translate(-1px, -1px);
}
@media (prefers-reduced-motion: reduce) { .kf-cta { transition: none; } }

.kf-section { padding: 48px 0; }
.kf-section-head {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 16px;
  align-items: baseline;
  margin-bottom: 32px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(192, 225, 64, 0.35);
}
.kf-section-num {
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: 700;
  font-size: 36px;
  color: #C92228;
}
.kf-section-title {
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: 700;
  font-size: clamp(32px, 5vw, 56px);
  margin: 0;
  color: #C0E140;
  text-transform: uppercase;
  letter-spacing: 0.005em;
}
.kf-section-aside {
  grid-column: 2;
  font-family: 'Archivo', sans-serif;
  font-size: 14px;
  color: rgba(192, 225, 64, 0.6);
  margin: 4px 0 0;
}

.kf-hitches {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
.kf-hitch {
  background: rgba(20, 20, 20, 0.7);
  border: 1px solid rgba(192, 225, 64, 0.3);
  padding: 24px 22px 26px;
  outline: none;
  transition: border-color 220ms ease, transform 220ms ease, background 220ms ease;
  position: relative;
}
.kf-hitch::before {
  content: '';
  position: absolute;
  top: 14px;
  left: 14px;
  width: 8px;
  height: 8px;
  background: #C92228;
  border-radius: 50%;
}
.kf-hitch-knot {
  display: grid;
  place-items: center;
  height: 130px;
  margin-bottom: 14px;
  border-bottom: 1px dashed rgba(192, 225, 64, 0.25);
  padding-bottom: 12px;
}
.kf-hitch-knot .kf-knot { width: 130px; height: 110px; }
.kf-hitch h3 {
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: 700;
  font-size: 22px;
  letter-spacing: 0.04em;
  margin: 0 0 6px;
  color: #C0E140;
  text-transform: uppercase;
}
.kf-hitch-use {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: #C92228;
  margin: 0 0 10px;
  text-transform: uppercase;
}
.kf-hitch-body {
  font-family: 'Archivo', sans-serif;
  font-size: 14px;
  line-height: 1.55;
  color: rgba(192, 225, 64, 0.78);
  margin: 0;
}
.kf-hitch:hover, .kf-hitch:focus-visible, .kf-hitch.on {
  border-color: #C0E140;
  background: rgba(192, 225, 64, 0.06);
  transform: translateY(-3px);
}
.kf-hitch:hover .kf-knot, .kf-hitch:focus-visible .kf-knot, .kf-hitch.on .kf-knot {
  stroke-width: 2.6;
  stroke: #C0E140;
}
@media (prefers-reduced-motion: reduce) {
  .kf-hitch { transition: none; }
  .kf-hitch:hover, .kf-hitch:focus-visible { transform: none; }
}

.kf-system-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.kf-system-tab {
  background: transparent;
  border: 1.5px solid rgba(192, 225, 64, 0.4);
  color: #C0E140;
  padding: 12px 18px;
  cursor: pointer;
  font: inherit;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  transition: background 200ms ease, border-color 200ms ease;
}
.kf-system-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  color: #C92228;
}
.kf-system-name {
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: 600;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.kf-system-tab:hover, .kf-system-tab:focus-visible, .kf-system-tab.on {
  outline: none;
  background: rgba(192, 225, 64, 0.08);
  border-color: #C0E140;
}
.kf-system-tab.on { background: #C0E140; color: #0E0E0E; }
.kf-system-tab.on .kf-system-label { color: #C92228; }

.kf-system-pane { position: relative; min-height: 260px; }
.kf-system-card {
  display: none;
  grid-template-columns: 240px 1fr;
  gap: 36px;
  align-items: center;
  padding: 28px 28px 32px;
  border: 1px solid rgba(192, 225, 64, 0.3);
  background: rgba(192, 225, 64, 0.04);
}
.kf-system-card.on { display: grid; }
.kf-system-diagram { display: grid; place-items: center; }
.kf-system-diagram svg { width: 220px; height: 240px; }
.kf-system-card h3 {
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: 700;
  font-size: clamp(24px, 3.4vw, 36px);
  margin: 0 0 12px;
  color: #C0E140;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}
.kf-system-card p {
  font-family: 'Archivo', sans-serif;
  font-size: 16px;
  line-height: 1.55;
  color: rgba(192, 225, 64, 0.85);
  margin: 0;
  max-width: 520px;
}

.kf-climbs { list-style: none; margin: 0; padding: 0; display: grid; gap: 0; }
.kf-climb {
  display: grid;
  grid-template-columns: 50px 1fr 220px;
  gap: 18px;
  padding: 18px 0;
  border-bottom: 1px solid rgba(192, 225, 64, 0.2);
  align-items: center;
  outline: none;
  transition: padding-left 240ms ease, background 240ms ease;
}
.kf-climb-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 18px;
  color: #C92228;
}
.kf-climb h3 {
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: 700;
  font-size: 22px;
  margin: 0 0 4px;
  color: #C0E140;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}
.kf-climb-note {
  font-family: 'Archivo', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(192, 225, 64, 0.7);
  margin: 0;
}
.kf-climb-system {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  color: #C0E140;
  border: 1px solid #C0E140;
  padding: 4px 8px;
  text-align: center;
}
.kf-climb:hover, .kf-climb:focus-visible {
  padding-left: 18px;
  background: linear-gradient(90deg, rgba(192, 225, 64, 0.1) 0%, transparent 100%);
}
.kf-climb:hover .kf-climb-system, .kf-climb:focus-visible .kf-climb-system {
  background: #C92228;
  border-color: #C92228;
  color: #FFFFFF;
}
@media (prefers-reduced-motion: reduce) { .kf-climb { transition: none; } }

.kf-section-cta { padding-bottom: 80px; }
.kf-cta-card {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 48px;
  align-items: center;
  border: 2px solid #C0E140;
  background: rgba(20, 20, 20, 0.7);
  padding: 48px 48px 56px;
}
.kf-cta-knot { display: grid; place-items: center; }
.kf-cta-knot .kf-knot {
  width: 240px;
  height: 220px;
  stroke-width: 2.6;
  filter: drop-shadow(0 0 16px rgba(192, 225, 64, 0.3));
}
.kf-cta-headline {
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: 700;
  font-size: clamp(32px, 4.5vw, 56px);
  margin: 12px 0 16px;
  color: #C0E140;
  text-transform: uppercase;
  line-height: 1;
}
.kf-cta-body {
  font-family: 'Archivo', sans-serif;
  font-size: 17px;
  line-height: 1.55;
  color: rgba(192, 225, 64, 0.85);
  max-width: 560px;
  margin: 0 0 28px;
}

.kf-footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid rgba(192, 225, 64, 0.4);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  color: rgba(192, 225, 64, 0.6);
  text-transform: uppercase;
}
.kf-footer-stamp {
  border: 1px solid #C92228;
  color: #C92228;
  padding: 4px 10px;
}

@media (max-width: 880px) {
  .kf-hero { grid-template-columns: 1fr; gap: 32px; text-align: center; }
  .kf-hero-knot { order: 0; }
  .kf-cta-row { justify-content: center; }
  .kf-section-head { grid-template-columns: 40px 1fr; }
  .kf-section-aside { grid-column: 1 / -1; }
  .kf-system-card { grid-template-columns: 1fr; gap: 24px; }
  .kf-climb { grid-template-columns: 36px 1fr; }
  .kf-climb-system { grid-column: 1 / -1; padding-left: 54px; text-align: left; }
  .kf-cta-card { grid-template-columns: 1fr; padding: 32px 24px; }
}
`;
