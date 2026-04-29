"use client";

/**
 * PipeCamEngine — V56 Pipe Cam
 *
 * Service plumbing's modern heroic image is the sewer-camera feed — fish-eye,
 * HUD overlay, depth and distance ticking. Hero is a live-feeling cam scroll
 * into a pipe; sections are clean-outs along the run.
 *
 * Trade showcase: Plumbing.
 */

import { useState } from "react";

const CLEANOUTS = [
  {
    label: "C/O 01",
    depth: "2.4 ft",
    distance: "12'",
    title: "Front sidewalk cleanout",
    diagnosis:
      "Hub-to-spigot transition holding. No belly. Roots at the second joint &mdash; pulling 11 oz of fibrous mat with the snake.",
  },
  {
    label: "C/O 02",
    depth: "3.1 ft",
    distance: "38'",
    title: "Yard cleanout, north of citrus",
    diagnosis:
      "1-inch belly &mdash; standing water 3/4 of pipe. Recommend hydro-jet, then re-cam to confirm flow.",
  },
  {
    label: "C/O 03",
    depth: "5.6 ft",
    distance: "62'",
    title: "Property-line tee",
    diagnosis:
      "City stub clay-to-cast iron. Visible offset 3/8 inch &mdash; typical for the &lsquo;78 vintage. No active leak; flag for monitoring.",
  },
  {
    label: "C/O 04",
    depth: "7.2 ft",
    distance: "94'",
    title: "Curb cleanout (city right-of-way)",
    diagnosis:
      "Main lateral &mdash; clay tile, 6 inch. Two root intrusions cleared. Mainline vent reads OK; lateral flowing free past 100 feet.",
  },
];

const RECENT = [
  { addr: "412 Argon St", finding: "ROOTS @ 38'", action: "Hydro-jet 3000 psi", hours: "2.0" },
  { addr: "1908 Cottonwood Pl", finding: "SAG @ 24'", action: "Locate-and-mark; quote replacement", hours: "1.5" },
  { addr: "27 Saguaro Ridge", finding: "OFFSET @ 62'", action: "Camera + report; monitor", hours: "1.0" },
  { addr: "554 Magnolia", finding: "GREASE 0&ndash;14'", action: "Hydro-jet kitchen branch", hours: "1.5" },
  { addr: "8800 Tempe Commerce", finding: "BELLY @ 38'", action: "Spot repair quoted", hours: "2.0" },
  { addr: "73 Birch Ln", finding: "CLEAR", action: "Cam to property line, no findings", hours: "0.75" },
];

const HUD_GLOSSARY = [
  { abbr: "DEPTH", expl: "Inches below grade. Read off the locator at the head; matches sondeworth within ¼ inch." },
  { abbr: "DIST", expl: "Feet of cable paid out from the reel. Caster-counter is gravity-fed; recalibrate at the cleanout." },
  { abbr: "TILT", expl: "Camera head pitch. 0&deg; is parallel to flow; +30&deg; means the head is climbing a back-pitch." },
  { abbr: "LUX", expl: "Ambient light at the head. Drops to 0 inside lateral. Spike means we&rsquo;ve found daylight &mdash; usually bad." },
];

export default function PipeCamEngine() {
  const [active, setActive] = useState(0);

  return (
    <>
      <style>{css}</style>
      <div className="pc-shell">
        {/* CHROME PUSH-ROD FRAME — top */}
        <header className="pc-top">
          <div className="pc-chrome-band" aria-hidden>
            <div className="pc-chrome-grip" />
            <div className="pc-chrome-grip" />
            <div className="pc-chrome-grip" />
          </div>
          <div className="pc-top-row">
            <div className="pc-callsign">
              <span className="pc-rec" aria-hidden />
              <span className="pc-callsign-text">CAM&nbsp;01&nbsp;&middot;&nbsp;LIVE</span>
            </div>
            <nav className="pc-nav" aria-label="primary">
              <a href="#feed" className="pc-nav-link">Feed</a>
              <a href="#hud" className="pc-nav-link">HUD</a>
              <a href="#recent" className="pc-nav-link">Recent pulls</a>
              <a href="#dispatch" className="pc-nav-link">Dispatch</a>
            </nav>
            <div className="pc-meta">
              <span>KPT DRAIN SVC</span>
              <span>LIC. C-36 #874-220</span>
            </div>
          </div>
        </header>

        {/* HERO — VIEWPORT */}
        <section className="pc-hero">
          <div className="pc-viewport" role="img" aria-label="Sewer camera fisheye view down a pipe">
            <div className="pc-fisheye" aria-hidden>
              <div className="pc-pipe">
                <div className="pc-pipe-ring pc-r1" />
                <div className="pc-pipe-ring pc-r2" />
                <div className="pc-pipe-ring pc-r3" />
                <div className="pc-pipe-ring pc-r4" />
                <div className="pc-pipe-ring pc-r5" />
                <div className="pc-pipe-ring pc-r6" />
                <div className="pc-pipe-core" />
                <div className="pc-pipe-water" />
              </div>
              <div className="pc-scanlines" />
              <div className="pc-vignette" />
            </div>

            {/* HUD overlay */}
            <div className="pc-hud" aria-hidden>
              <div className="pc-hud-row pc-hud-tl">
                <span className="pc-hud-key">DEPTH</span>
                <span className="pc-hud-val">02.4 FT</span>
              </div>
              <div className="pc-hud-row pc-hud-tr">
                <span className="pc-hud-key">DIST</span>
                <span className="pc-hud-val">012.0 FT</span>
              </div>
              <div className="pc-hud-row pc-hud-bl">
                <span className="pc-hud-key">CAM&nbsp;ID</span>
                <span className="pc-hud-val">RIDGID&nbsp;CS65X</span>
              </div>
              <div className="pc-hud-row pc-hud-br">
                <span className="pc-hud-key">04/28&nbsp;0742</span>
                <span className="pc-hud-val pc-hud-rec">&middot;REC&middot;</span>
              </div>
              <div className="pc-hud-crosshair">
                <span className="pc-cross-h" />
                <span className="pc-cross-v" />
                <span className="pc-cross-corner pc-cc-tl" />
                <span className="pc-cross-corner pc-cc-tr" />
                <span className="pc-cross-corner pc-cc-bl" />
                <span className="pc-cross-corner pc-cc-br" />
              </div>
            </div>

            <div className="pc-hero-overlay">
              <p className="pc-eyebrow">Live Feed &middot; Cam 01</p>
              <h1 className="pc-headline">
                We see the cleanout
                <br />
                before we cut the floor.
              </h1>
              <p className="pc-sub">
                Residential and commercial drain service. Camera inspection,
                hydro-jet, locate-and-mark before any demo. Tempe, Mesa, Chandler.
              </p>
              <div className="pc-cta-row">
                <a className="pc-cta pc-cta-fill" href="#dispatch">Send the cam</a>
                <a className="pc-cta pc-cta-line" href="#recent">Read the report</a>
              </div>
            </div>
          </div>
        </section>

        {/* LIVE FEED — clean-outs */}
        <section id="feed" className="pc-section">
          <div className="pc-section-head">
            <span className="pc-tag">FEED</span>
            <h2 className="pc-section-title">Cleanouts down the run.</h2>
            <p className="pc-section-meta">Hover to retract the snake-cable and hold focus.</p>
          </div>
          <div className="pc-cleanouts">
            <ol className="pc-co-list" role="list">
              {CLEANOUTS.map((c, i) => (
                <li
                  key={c.label}
                  className={`pc-co${active === i ? " on" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  tabIndex={0}
                >
                  <button type="button"
                    className="pc-co-btn"
                    onClick={() => setActive(i)}
                    aria-pressed={active === i}
                  >
                    <span className="pc-co-label">{c.label}</span>
                    <span className="pc-co-dist">{c.distance}</span>
                  </button>
                </li>
              ))}
            </ol>
            <article className="pc-co-detail" key={CLEANOUTS[active].label}>
              <header className="pc-co-detail-head">
                <span className="pc-co-detail-tag">{CLEANOUTS[active].label}</span>
                <span className="pc-co-detail-meta">
                  <span>DEPTH {CLEANOUTS[active].depth}</span>
                  <span>DIST {CLEANOUTS[active].distance}</span>
                </span>
              </header>
              <h3 className="pc-co-detail-title">{CLEANOUTS[active].title}</h3>
              <p className="pc-co-detail-body">{CLEANOUTS[active].diagnosis}</p>
              <div className="pc-co-mini" aria-hidden>
                <div className="pc-mini-pipe">
                  <span className="pc-mini-marker" style={{ left: `${15 + active * 22}%` }} />
                </div>
                <span className="pc-mini-legend">
                  HEAD &darr; {CLEANOUTS[active].distance}
                </span>
              </div>
            </article>
          </div>
        </section>

        {/* HUD */}
        <section id="hud" className="pc-section">
          <div className="pc-section-head">
            <span className="pc-tag">HUD</span>
            <h2 className="pc-section-title">What the readout means.</h2>
            <p className="pc-section-meta">Every report ships with the legend, plain-English.</p>
          </div>
          <ul className="pc-hud-glossary">
            {HUD_GLOSSARY.map((g) => (
              <li key={g.abbr} className="pc-hud-item" tabIndex={0}>
                <span className="pc-hud-abbr">{g.abbr}</span>
                <span className="pc-hud-expl">{g.expl}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* RECENT PULLS */}
        <section id="recent" className="pc-section">
          <div className="pc-section-head">
            <span className="pc-tag">PULLS</span>
            <h2 className="pc-section-title">Recent pulls.</h2>
            <p className="pc-section-meta">Last week, all of them. Findings, action, hours.</p>
          </div>
          <table className="pc-table">
            <thead>
              <tr>
                <th>Address</th>
                <th>Finding</th>
                <th>Action</th>
                <th>Hours</th>
              </tr>
            </thead>
            <tbody>
              {RECENT.map((r) => (
                <tr key={r.addr}>
                  <td className="pc-addr">{r.addr}</td>
                  <td className="pc-find" dangerouslySetInnerHTML={{ __html: r.finding }} />
                  <td className="pc-act">{r.action}</td>
                  <td className="pc-hr">{r.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* DISPATCH CTA */}
        <section id="dispatch" className="pc-section pc-section-cta">
          <div className="pc-cta-card">
            <div className="pc-cta-mini-cam" aria-hidden>
              <div className="pc-cta-fisheye">
                <div className="pc-cta-ring" />
                <div className="pc-cta-ring pc-cta-ring-2" />
                <div className="pc-cta-ring pc-cta-ring-3" />
                <span className="pc-cta-rec" />
              </div>
            </div>
            <div className="pc-cta-text">
              <p className="pc-eyebrow">24/7 dispatch</p>
              <h2 className="pc-cta-headline">Send the cam. Skip the demo.</h2>
              <p className="pc-cta-body">
                We push 100 feet of self-leveling fish-eye head down your line,
                locate the trouble in inches, and mark it with the sonde before
                anyone touches a saw. Reports back in 24 hours.
              </p>
              <div className="pc-cta-row">
                <a className="pc-cta pc-cta-fill" href="#">(480) 555-CAM-1</a>
                <a className="pc-cta pc-cta-line" href="#">Email a service request</a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pc-footer">
          <div className="pc-footer-hud">
            <span>DISPATCH&nbsp;ARMED</span>
            <span>UPTIME&nbsp;99.7%</span>
            <span>RESP&nbsp;&lt;90&nbsp;MIN&nbsp;METRO</span>
            <span>LAT 33.42&nbsp;&middot;&nbsp;LON&nbsp;-111.93</span>
          </div>
          <div className="pc-footer-rows">
            <span>KPT DRAIN SERVICE</span>
            <span>MASTER PLUMBER #B-9931</span>
            <span>UPC / IPC compliant</span>
            <span>&copy; 2026</span>
          </div>
        </footer>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;700&display=swap');

.pc-shell {
  --pc-bg: #0E1011;
  --pc-bg-2: #161A1C;
  --pc-mint: #6CE3B6;
  --pc-mint-dim: #3F9F7F;
  --pc-chrome: #BCC0C5;
  --pc-chrome-d: #6E7378;
  --pc-paper: #E5E9EC;
  --pc-rec: #FF3B3F;
  background: var(--pc-bg);
  color: var(--pc-paper);
  font-family: 'JetBrains Mono', 'DM Mono', monospace;
  min-height: 100vh;
  padding: 0;
}

/* TOP — chrome push-rod */
.pc-chrome-band {
  height: 14px;
  background:
    linear-gradient(180deg, #DDE0E3 0%, var(--pc-chrome) 50%, #7C7F82 100%);
  border-bottom: 1px solid #2A2D30;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
}
.pc-chrome-grip {
  width: 38px;
  height: 4px;
  background: linear-gradient(180deg, #5C6166 0%, #2A2D30 100%);
  border-radius: 2px;
}
.pc-top-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 24px;
  align-items: center;
  padding: 14px 28px;
  border-bottom: 1px solid #1F2225;
}
.pc-callsign {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(108, 227, 182, 0.08);
  border: 1px solid var(--pc-mint-dim);
  padding: 6px 12px;
  border-radius: 2px;
}
.pc-rec {
  width: 9px;
  height: 9px;
  background: var(--pc-rec);
  border-radius: 50%;
  animation: pc-rec-blink 1.4s ease-in-out infinite;
}
@keyframes pc-rec-blink {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0.25; }
}
@media (prefers-reduced-motion: reduce) {
  .pc-rec { animation: none; }
}
.pc-callsign-text {
  font-size: 11px;
  letter-spacing: 0.18em;
  color: var(--pc-mint);
  font-weight: 700;
}
.pc-nav {
  display: flex;
  justify-content: center;
  gap: 28px;
  flex-wrap: wrap;
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.pc-nav-link {
  color: var(--pc-paper);
  text-decoration: none;
  padding: 4px 0;
  position: relative;
  transition: color 180ms ease;
}
.pc-nav-link::after {
  content: '';
  position: absolute;
  inset: auto 0 -2px 0;
  height: 2px;
  background: var(--pc-mint);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 220ms cubic-bezier(0.7, 0, 0.3, 1);
}
.pc-nav-link:hover, .pc-nav-link:focus-visible { color: var(--pc-mint); outline: none; }
.pc-nav-link:hover::after, .pc-nav-link:focus-visible::after { transform: scaleX(1); }
.pc-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  font-size: 10px;
  letter-spacing: 0.14em;
  color: var(--pc-chrome-d);
}

/* HERO VIEWPORT */
.pc-hero { padding: 24px 28px 56px; }
.pc-viewport {
  position: relative;
  height: clamp(480px, 64vh, 720px);
  border: 14px solid;
  border-image: linear-gradient(180deg, #DDE0E3 0%, var(--pc-chrome) 50%, #7C7F82 100%) 1;
  border-radius: 8px;
  overflow: hidden;
  background: #050708;
  box-shadow: inset 0 0 0 2px #2A2D30, 0 12px 32px rgba(0,0,0,0.6);
}
.pc-fisheye {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  filter: blur(0.3px);
}
.pc-pipe {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}
.pc-pipe-ring {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid rgba(108, 227, 182, 0.18);
  background: radial-gradient(circle at 50% 35%, rgba(108, 227, 182, 0.08) 0%, transparent 60%);
  animation: pc-ring-zoom 6s linear infinite;
  transform-origin: center;
}
.pc-r1 { width: 120%; height: 120%; animation-delay: 0s; }
.pc-r2 { width: 90%; height: 90%; animation-delay: 1s; }
.pc-r3 { width: 65%; height: 65%; animation-delay: 2s; }
.pc-r4 { width: 45%; height: 45%; animation-delay: 3s; }
.pc-r5 { width: 28%; height: 28%; animation-delay: 4s; }
.pc-r6 { width: 14%; height: 14%; animation-delay: 5s; }
@keyframes pc-ring-zoom {
  0% { transform: scale(0.4); opacity: 0; border-color: rgba(108,227,182,0.6); }
  20% { opacity: 1; }
  100% { transform: scale(1.3); opacity: 0; border-color: rgba(108,227,182,0.05); }
}
@media (prefers-reduced-motion: reduce) {
  .pc-pipe-ring { animation: none; opacity: 1; }
}
.pc-pipe-core {
  position: absolute;
  width: 6%;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle at 40% 40%, #C5F1E0 0%, var(--pc-mint) 30%, #15392B 70%, #050708 100%);
  box-shadow: 0 0 24px rgba(108, 227, 182, 0.35), inset 0 0 8px rgba(0,0,0,0.5);
}
.pc-pipe-water {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 14%;
  background:
    radial-gradient(ellipse at 50% 30%, rgba(108, 227, 182, 0.18) 0%, transparent 70%),
    linear-gradient(180deg, #0F1A18 0%, #061211 100%);
  border-top: 1px solid rgba(108, 227, 182, 0.18);
}
.pc-scanlines {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1.5px, transparent 3px);
  pointer-events: none;
}
.pc-vignette {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.65) 100%);
  pointer-events: none;
  border-radius: 50%;
  transform: scale(1.5);
}

/* HUD */
.pc-hud {
  position: absolute;
  inset: 0;
  pointer-events: none;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: var(--pc-mint);
  text-shadow: 0 0 6px rgba(108,227,182,0.6);
}
.pc-hud-row {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.pc-hud-tl { top: 18px; left: 18px; }
.pc-hud-tr { top: 18px; right: 18px; align-items: flex-end; }
.pc-hud-bl { bottom: 18px; left: 18px; }
.pc-hud-br { bottom: 18px; right: 18px; align-items: flex-end; }
.pc-hud-key {
  font-size: 9px;
  letter-spacing: 0.18em;
  color: rgba(108,227,182,0.7);
}
.pc-hud-val {
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.06em;
}
.pc-hud-rec { color: var(--pc-rec); animation: pc-rec-blink 1.4s ease-in-out infinite; }
.pc-hud-crosshair {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.pc-cross-h, .pc-cross-v {
  position: absolute;
  background: rgba(108,227,182,0.25);
}
.pc-cross-h { top: 50%; left: 35%; right: 35%; height: 1px; }
.pc-cross-v { left: 50%; top: 35%; bottom: 35%; width: 1px; }
.pc-cross-corner {
  position: absolute;
  width: 24px;
  height: 24px;
  border: 1.5px solid rgba(108,227,182,0.4);
}
.pc-cc-tl { top: 60px; left: 60px; border-right: 0; border-bottom: 0; }
.pc-cc-tr { top: 60px; right: 60px; border-left: 0; border-bottom: 0; }
.pc-cc-bl { bottom: 60px; left: 60px; border-right: 0; border-top: 0; }
.pc-cc-br { bottom: 60px; right: 60px; border-left: 0; border-top: 0; }

/* HERO TEXT OVERLAY */
.pc-hero-overlay {
  position: absolute;
  inset: auto 8% 12% 8%;
  z-index: 5;
  background: linear-gradient(180deg, rgba(14,16,17,0) 0%, rgba(14,16,17,0.55) 60%);
  padding: 24px 28px 28px;
  border-left: 2px solid var(--pc-mint);
  max-width: 720px;
}
.pc-eyebrow {
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--pc-mint);
  margin: 0 0 14px;
}
.pc-headline {
  font-family: 'Inter', sans-serif;
  font-size: clamp(40px, 5.4vw, 80px);
  line-height: 0.98;
  margin: 0 0 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--pc-paper);
  text-shadow: 0 0 20px rgba(0,0,0,0.55);
}
.pc-sub {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  margin: 0 0 22px;
  max-width: 540px;
  color: rgba(229, 233, 236, 0.86);
}
.pc-cta-row { display: flex; gap: 14px; flex-wrap: wrap; }
.pc-cta {
  display: inline-block;
  padding: 12px 20px;
  text-decoration: none;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border: 1.5px solid var(--pc-mint);
  font-weight: 700;
  transition: background 200ms ease, color 200ms ease, transform 180ms ease;
}
.pc-cta-fill {
  background: var(--pc-mint);
  color: var(--pc-bg);
}
.pc-cta-fill:hover, .pc-cta-fill:focus-visible {
  background: var(--pc-paper);
  color: var(--pc-bg);
  border-color: var(--pc-paper);
  outline: none;
  transform: translate(-1px, -1px);
}
.pc-cta-line {
  background: transparent;
  color: var(--pc-mint);
}
.pc-cta-line:hover, .pc-cta-line:focus-visible {
  background: var(--pc-mint);
  color: var(--pc-bg);
  outline: none;
  transform: translate(-1px, -1px);
}
@media (prefers-reduced-motion: reduce) {
  .pc-cta { transition: background 200ms ease, color 200ms ease; }
  .pc-cta:hover, .pc-cta:focus-visible { transform: none; }
}

/* SECTIONS */
.pc-section { padding: 28px 28px 36px; }
.pc-section-head {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 18px;
  align-items: center;
  border-top: 1px dashed rgba(108, 227, 182, 0.25);
  padding-top: 26px;
  margin-bottom: 26px;
}
.pc-tag {
  background: var(--pc-mint);
  color: var(--pc-bg);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  padding: 5px 10px;
  text-transform: uppercase;
}
.pc-section-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(24px, 3vw, 36px);
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--pc-paper);
  line-height: 1;
}
.pc-section-meta {
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--pc-chrome-d);
  margin: 0;
  text-align: right;
  max-width: 260px;
}

/* CLEANOUTS */
.pc-cleanouts {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 28px;
}
.pc-co-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-left: 1px solid rgba(108,227,182,0.25);
}
.pc-co {
  position: relative;
  padding-left: 20px;
  outline: none;
}
.pc-co::before {
  content: '';
  position: absolute;
  left: -5px;
  top: 50%;
  width: 9px;
  height: 9px;
  background: var(--pc-bg);
  border: 1.5px solid var(--pc-mint-dim);
  transform: translateY(-50%);
  border-radius: 50%;
  transition: background 200ms ease, transform 200ms ease;
}
.pc-co.on::before { background: var(--pc-mint); box-shadow: 0 0 8px rgba(108,227,182,0.7); }
.pc-co-btn {
  background: transparent;
  border: 0;
  color: inherit;
  font: inherit;
  padding: 12px 14px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  text-align: left;
  cursor: pointer;
  transition: background 180ms ease;
  border-radius: 2px;
}
.pc-co.on .pc-co-btn,
.pc-co-btn:hover,
.pc-co-btn:focus-visible {
  background: rgba(108,227,182,0.08);
  outline: none;
}
.pc-co-label {
  font-size: 12px;
  letter-spacing: 0.14em;
  color: var(--pc-paper);
  font-weight: 700;
}
.pc-co-dist {
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--pc-mint);
}

.pc-co-detail {
  border: 1px solid rgba(108,227,182,0.25);
  background: var(--pc-bg-2);
  padding: 24px 26px 26px;
  position: relative;
}
.pc-co-detail::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 4px;
  background: var(--pc-mint);
}
.pc-co-detail-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.pc-co-detail-tag { color: var(--pc-mint); font-weight: 700; }
.pc-co-detail-meta { display: flex; gap: 14px; color: var(--pc-chrome-d); }
.pc-co-detail-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(22px, 2.6vw, 30px);
  margin: 0 0 10px;
  font-weight: 700;
  color: var(--pc-paper);
  letter-spacing: -0.01em;
}
.pc-co-detail-body {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  line-height: 1.55;
  margin: 0 0 18px;
  color: rgba(229,233,236,0.86);
}
.pc-co-mini {
  background: var(--pc-bg);
  padding: 14px 16px;
  border: 1px solid rgba(108,227,182,0.2);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.pc-mini-pipe {
  height: 14px;
  background: linear-gradient(180deg, #1A1F22 0%, #050708 100%);
  border: 1px solid var(--pc-mint-dim);
  position: relative;
  border-radius: 7px;
}
.pc-mini-marker {
  position: absolute;
  top: 50%;
  width: 11px;
  height: 11px;
  background: var(--pc-mint);
  border: 1px solid var(--pc-bg);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 6px rgba(108,227,182,0.6);
  transition: left 320ms cubic-bezier(0.4, 0, 0.2, 1);
}
@media (prefers-reduced-motion: reduce) {
  .pc-mini-marker { transition: none; }
}
.pc-mini-legend {
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--pc-chrome-d);
  text-transform: uppercase;
}

/* HUD GLOSSARY */
.pc-hud-glossary {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}
.pc-hud-item {
  border: 1px solid rgba(108,227,182,0.2);
  padding: 18px 18px 20px;
  outline: none;
  background: var(--pc-bg-2);
  transition: background 180ms ease, border-color 180ms ease, transform 180ms ease;
}
.pc-hud-item:hover, .pc-hud-item:focus-visible {
  background: rgba(108,227,182,0.06);
  border-color: var(--pc-mint);
  transform: translateY(-2px);
}
@media (prefers-reduced-motion: reduce) {
  .pc-hud-item { transition: background 180ms ease, border-color 180ms ease; }
  .pc-hud-item:hover, .pc-hud-item:focus-visible { transform: none; }
}
.pc-hud-abbr {
  display: inline-block;
  font-size: 12px;
  letter-spacing: 0.18em;
  color: var(--pc-mint);
  font-weight: 700;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(108,227,182,0.25);
}
.pc-hud-expl {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(229,233,236,0.85);
}

/* TABLE */
.pc-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid rgba(108,227,182,0.2);
  background: var(--pc-bg-2);
}
.pc-table thead th {
  background: var(--pc-mint);
  color: var(--pc-bg);
  text-align: left;
  padding: 12px 14px;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.pc-table tbody tr { border-top: 1px solid rgba(108,227,182,0.12); transition: background 180ms ease; }
.pc-table tbody tr:hover, .pc-table tbody tr:focus-within { background: rgba(108,227,182,0.06); }
.pc-table td { padding: 12px 14px; vertical-align: top; font-size: 13px; }
.pc-addr { color: var(--pc-paper); }
.pc-find { color: var(--pc-mint); font-weight: 700; letter-spacing: 0.06em; }
.pc-act { color: rgba(229,233,236,0.85); }
.pc-hr { color: var(--pc-chrome-d); width: 70px; }

/* CTA */
.pc-section-cta { padding-bottom: 56px; }
.pc-cta-card {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 32px;
  align-items: center;
  background: var(--pc-bg-2);
  border: 1px solid rgba(108,227,182,0.25);
  padding: 32px;
  position: relative;
}
.pc-cta-card::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 4px;
  background: var(--pc-mint);
}
.pc-cta-mini-cam {
  position: relative;
  aspect-ratio: 1;
  background: #050708;
  border: 8px solid;
  border-image: linear-gradient(180deg, #DDE0E3, #7C7F82) 1;
  display: grid;
  place-items: center;
  overflow: hidden;
}
.pc-cta-fisheye {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at 50% 50%, rgba(108,227,182,0.15) 0%, transparent 60%);
}
.pc-cta-ring {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid rgba(108,227,182,0.3);
  width: 100%;
  height: 100%;
  animation: pc-ring-zoom 6s linear infinite;
}
.pc-cta-ring-2 { width: 60%; height: 60%; animation-delay: 2s; }
.pc-cta-ring-3 { width: 28%; height: 28%; animation-delay: 4s; }
.pc-cta-rec {
  position: absolute;
  top: 14px;
  left: 14px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--pc-rec);
  animation: pc-rec-blink 1.4s ease-in-out infinite;
}
.pc-cta-headline {
  font-family: 'Inter', sans-serif;
  font-size: clamp(28px, 3.2vw, 42px);
  line-height: 1;
  margin: 0 0 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--pc-paper);
}
.pc-cta-body {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  line-height: 1.55;
  margin: 0 0 22px;
  max-width: 580px;
  color: rgba(229,233,236,0.86);
}

/* FOOTER */
.pc-footer {
  border-top: 1px solid rgba(108,227,182,0.25);
  padding: 14px 28px 22px;
}
.pc-footer-hud {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  font-size: 11px;
  letter-spacing: 0.18em;
  color: var(--pc-mint);
  border-bottom: 1px dashed rgba(108,227,182,0.2);
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.pc-footer-rows {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 28px;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: var(--pc-chrome-d);
  text-transform: uppercase;
}

/* FOCUS */
.pc-shell *:focus-visible { outline: 2px solid var(--pc-mint); outline-offset: 3px; }

@media (max-width: 980px) {
  .pc-cleanouts { grid-template-columns: 1fr; }
  .pc-co-list { flex-direction: row; overflow-x: auto; border-left: 0; border-bottom: 1px solid rgba(108,227,182,0.25); }
  .pc-co { padding-left: 0; padding-top: 16px; flex: 0 0 auto; }
  .pc-co::before { left: 50%; top: 0; transform: translate(-50%, -50%); }
  .pc-cta-card { grid-template-columns: 1fr; }
  .pc-section-head { grid-template-columns: 1fr; }
  .pc-section-meta { text-align: left; }
  .pc-hero-overlay { inset: auto 4% 6% 4%; padding: 18px 18px; }
  .pc-meta { display: none; }
}
`;
