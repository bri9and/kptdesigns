"use client";

/**
 * SoundStageEngine — V54 Sound Stage
 *
 * The site reads as a film shoot — title cards open each section, gaffer-tape
 * labels mark equipment, hero is shot at 1.85:1. A clap-slate transitions
 * between scenes.
 *
 * Trade showcase: General Contractors.
 */

import { useState } from "react";

const SCENES = [
  {
    num: "01",
    name: "PRE-CON",
    title: "Pre-construction",
    log: "Schedule, budget, RFP. The script before the shoot.",
    rows: [
      { take: "T-04", note: "Architect: HKS — IFC set issued 03/14. Page count: 187." },
      { take: "T-05", note: "Budget: $4.6M GMP. Allowance buckets called out in Schedule A." },
      { take: "T-06", note: "Trade buyout — 11 of 14 subs awarded; mech and elec out for second-look." },
    ],
  },
  {
    num: "02",
    name: "FRAME",
    title: "Frame",
    log: "Subs in, walls up, dry-in. Production stills below.",
    rows: [
      { take: "T-12", note: "Foundation cure complete. SOG pour 04/02; psi 4500 break at 28 days." },
      { take: "T-13", note: "Wall framing dry-in 80%. MEP rough-ins on critical path through wk 18." },
      { take: "T-14", note: "Roof set, deck dried-in. PM walks Tuesday and Thursday before standup." },
    ],
  },
  {
    num: "03",
    name: "PUNCH",
    title: "Punch",
    log: "Punch list as a dailies log. We ship clean, not fast.",
    rows: [
      { take: "T-22", note: "Architect punch — 38 items. 31 closed by Friday. 7 awaiting product." },
      { take: "T-23", note: "Owner punch — 12 items. Touch-up paint, two HVAC balance points." },
      { take: "T-24", note: "Final inspection scheduled 05/19 with city. CO targeted 05/23." },
    ],
  },
];

const STILLS = [
  { tag: "WK 17", scene: "Pour day", caption: "SOG, 4500 psi. Walked the joints with the iron-workers at 6:30." },
  { tag: "WK 19", scene: "Walls up", caption: "Framers in at 7. Masonry at 9. Dry-in by Friday." },
  { tag: "WK 22", scene: "MEP rough", caption: "Mech, elec, plumb stacked through the corridor — checked clearances Tuesday." },
  { tag: "WK 26", scene: "Sheetrock", caption: "Hangers Monday, mud Wednesday, sand Friday. Texture Saturday." },
  { tag: "WK 29", scene: "Trim & paint", caption: "Doors, base, casing. Paint behind millwork before set." },
  { tag: "WK 31", scene: "Punch", caption: "Architect's pen, owner's eyes. We close 90% on the first walk." },
];

const CALL_SHEET = [
  { time: "06:00", crew: "Site lead", task: "Walk the trailer, unlock gate, hot coffee on by 06:30." },
  { time: "06:45", crew: "Subs check-in", task: "Hard hat, fall harness, JHA signed. Whiteboard updated by 07:00." },
  { time: "07:00", crew: "Standup", task: "Three things: yesterday, today, blockers. Five minutes flat." },
  { time: "10:30", crew: "PM walk", task: "PM and super walk the floor. RFIs flagged by photo." },
  { time: "12:30", crew: "Lunch", task: "30 min on site. Tools down, no work-while-eating on the deck." },
  { time: "15:30", crew: "Inspector", task: "City framing inspection. Tape measure and code book on the rail." },
  { time: "16:30", crew: "Cleanup", task: "Sweep, dump cart, lock the trailer. Tomorrow's plan to the group text." },
];

export default function SoundStageEngine() {
  const [activeScene, setActiveScene] = useState<string>("01");
  const [paused, setPaused] = useState<string | null>(null);

  return (
    <>
      <style>{css}</style>
      <div className="ss-shell">
        {/* GLOBAL SLATE */}
        <div className="ss-bars" aria-hidden>
          <div className="ss-bar ss-bar-top" />
          <div className="ss-bar ss-bar-bottom" />
        </div>

        {/* TOP — SLATE */}
        <header className="ss-top">
          <div className="ss-slate" aria-label="Production slate">
            <div className="ss-slate-stripes" aria-hidden>
              <span /><span /><span /><span /><span /><span />
            </div>
            <div className="ss-slate-body">
              <span className="ss-slate-row">
                <em>PROD.</em>
                <strong>KPT&nbsp;CONSTRUCTION&nbsp;CO.</strong>
              </span>
              <span className="ss-slate-row">
                <em>JOB</em>
                <strong>BERKELEY&nbsp;SQUARE&nbsp;OFFICES</strong>
              </span>
              <span className="ss-slate-row">
                <em>SCENE / TAKE</em>
                <strong>54 / 26</strong>
              </span>
              <span className="ss-slate-row">
                <em>DATE</em>
                <strong>04 / 28 / 26</strong>
              </span>
            </div>
          </div>
          <nav className="ss-nav" aria-label="primary">
            <a href="#scenes" className="ss-nav-link">Scenes</a>
            <a href="#stills" className="ss-nav-link">Stills</a>
            <a href="#call" className="ss-nav-link">Call Sheet</a>
            <a href="#contact" className="ss-nav-link">Greenlight</a>
          </nav>
        </header>

        {/* HERO — ACADEMY 1.85:1 */}
        <section className="ss-hero" aria-label="Hero">
          <div className="ss-frame">
            <span className="ss-tape ss-tape-tl">FRAME 01</span>
            <span className="ss-tape ss-tape-tr">A&nbsp;CAM</span>
            <span className="ss-tape ss-tape-bl">EXT.&nbsp;JOBSITE&nbsp;&mdash;&nbsp;DAY</span>
            <span className="ss-tape ss-tape-br">RUN&nbsp;TIME&nbsp;31&nbsp;WKS</span>
            <div className="ss-hero-content">
              <p className="ss-eyebrow">A KPT Production &mdash; in 4 acts</p>
              <h1 className="ss-headline">
                Pre-construction.
                <br />
                Frame. Punch.
                <br />
                <span className="ss-headline-fin">Premiere.</span>
              </h1>
              <p className="ss-sub">
                General contracting on architect-led projects. Every phase a
                scene, every change order a script note. We ship clean.
              </p>
              <div className="ss-cta-row">
                <a className="ss-cta ss-cta-fill" href="#contact">Greenlight a project</a>
                <a className="ss-cta ss-cta-line" href="#call">Read the call sheet</a>
              </div>
            </div>
          </div>
          <p className="ss-hero-credit">
            <span className="ss-cred-dot" /> Shot at 1.85:1 &middot; lensed by KPT &middot; SAG&minus;AIA collaboration
          </p>
        </section>

        {/* SCENES */}
        <section id="scenes" className="ss-section">
          <div className="ss-section-head">
            <span className="ss-clap" aria-hidden>
              <span className="ss-clap-top" />
              <span className="ss-clap-body">SCENE</span>
            </span>
            <h2 className="ss-section-title">Three scenes, one cut.</h2>
            <p className="ss-section-meta">Click a scene tab to switch the dailies log.</p>
          </div>

          <div className="ss-scene-tabs" role="tablist">
            {SCENES.map((s) => (
              <button
                key={s.num}
                role="tab"
                aria-selected={activeScene === s.num}
                className={`ss-scene-tab${activeScene === s.num ? " on" : ""}`}
                onClick={() => setActiveScene(s.num)}
              >
                <span className="ss-scene-num">{s.num}</span>
                <span className="ss-scene-name">{s.name}</span>
              </button>
            ))}
          </div>

          {SCENES.filter((s) => s.num === activeScene).map((s) => (
            <div className="ss-scene-card" key={s.num}>
              <div className="ss-titlecard">
                <span className="ss-tc-eye">SCENE {s.num} &mdash; {s.name}</span>
                <h3 className="ss-tc-title">{s.title}</h3>
                <p className="ss-tc-log">{s.log}</p>
              </div>
              <ul className="ss-dailies">
                {s.rows.map((r) => (
                  <li key={r.take} className="ss-daily">
                    <span className="ss-daily-take">{r.take}</span>
                    <span className="ss-daily-note">{r.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* STILLS — production photos as caption frames */}
        <section id="stills" className="ss-section">
          <div className="ss-section-head">
            <span className="ss-clap" aria-hidden>
              <span className="ss-clap-top" />
              <span className="ss-clap-body">STILLS</span>
            </span>
            <h2 className="ss-section-title">Production stills.</h2>
            <p className="ss-section-meta">Hover a frame to freeze on the dailies caption.</p>
          </div>
          <div className="ss-stills">
            {STILLS.map((st) => (
              <article
                key={st.tag}
                className="ss-still"
                tabIndex={0}
                onMouseEnter={() => setPaused(st.tag)}
                onMouseLeave={() => setPaused(null)}
                onFocus={() => setPaused(st.tag)}
                onBlur={() => setPaused(null)}
                data-paused={paused === st.tag ? "true" : "false"}
              >
                <span className="ss-still-tag">{st.tag}</span>
                <div className="ss-still-frame" aria-hidden>
                  <div className="ss-still-art" />
                  <div className="ss-still-grain" />
                  {paused === st.tag && <span className="ss-still-freeze">FREEZE</span>}
                </div>
                <h3 className="ss-still-scene">{st.scene}</h3>
                <p className="ss-still-cap">{st.caption}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CALL SHEET */}
        <section id="call" className="ss-section">
          <div className="ss-section-head">
            <span className="ss-clap" aria-hidden>
              <span className="ss-clap-top" />
              <span className="ss-clap-body">CALL</span>
            </span>
            <h2 className="ss-section-title">Daily call sheet.</h2>
            <p className="ss-section-meta">A working GC's day, scheduled like a shoot.</p>
          </div>
          <table className="ss-callsheet">
            <thead>
              <tr>
                <th>Time</th>
                <th>Crew</th>
                <th>Task</th>
              </tr>
            </thead>
            <tbody>
              {CALL_SHEET.map((c) => (
                <tr key={c.time}>
                  <td className="ss-cs-time">{c.time}</td>
                  <td className="ss-cs-crew">{c.crew}</td>
                  <td className="ss-cs-task">{c.task}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* CTA */}
        <section id="contact" className="ss-section ss-section-cta">
          <div className="ss-cta-card">
            <span className="ss-tape ss-tape-cta">END&nbsp;CARD</span>
            <p className="ss-eyebrow">Final reel</p>
            <h2 className="ss-cta-headline">Greenlight a project.</h2>
            <p className="ss-cta-body">
              We pre-con on architect-led commercial fit-outs and ground-up
              under 60K SF. Send us the IFC set; we&rsquo;ll send a budget back
              in 10 working days.
            </p>
            <div className="ss-cta-row">
              <a className="ss-cta ss-cta-fill" href="#">Send drawings</a>
              <a className="ss-cta ss-cta-line" href="#">Schedule a walk</a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="ss-footer">
          <div className="ss-end-crawl">
            <span>
              KPT CONSTRUCTION CO. &middot; A KPT PRODUCTION &middot;
              GENERAL CONTRACTOR LIC. #B-771-9931 &middot;
              AIA / ABC member &middot; OSHA 30 in field, OSHA 10 minimum on every sub
              &middot; Bonded &amp; insured &middot; Tempe / Mesa / Chandler
            </span>
          </div>
          <p className="ss-foot-credit">
            &copy; KPT 2026 &middot; lensed by KPT &middot; cut clean &middot; printed at 1.85:1
          </p>
        </footer>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500;1,700;1,900&family=Inter:wght@400;500;700&family=DM+Mono:wght@400;500&display=swap');

.ss-shell {
  --ss-slate: #131214;
  --ss-bone: #F4EDD8;
  --ss-tape: #FFCB05;
  --ss-blood: #94221F;
  --ss-grid: #2A282C;
  background: var(--ss-slate);
  color: var(--ss-bone);
  min-height: 100vh;
  font-family: 'Inter', system-ui, sans-serif;
  padding: 0;
}

/* CINEMA BARS */
.ss-bars {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 50;
}
.ss-bar {
  position: absolute;
  left: 0;
  right: 0;
  height: 18px;
  background: #000;
}
.ss-bar-top { top: 0; }
.ss-bar-bottom { bottom: 0; }

.ss-top {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 24px;
  align-items: flex-start;
  padding: 38px 36px 12px;
}
.ss-slate {
  border: 1.5px solid var(--ss-bone);
  background: var(--ss-slate);
  color: var(--ss-bone);
  width: 360px;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.ss-slate-stripes {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  height: 18px;
}
.ss-slate-stripes span {
  background: var(--ss-bone);
}
.ss-slate-stripes span:nth-child(2),
.ss-slate-stripes span:nth-child(4),
.ss-slate-stripes span:nth-child(6) { background: var(--ss-slate); }
.ss-slate-body {
  display: grid;
  gap: 4px;
  padding: 10px 12px 12px;
  border-top: 1.5px solid var(--ss-bone);
}
.ss-slate-row {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 8px;
  align-items: baseline;
}
.ss-slate-row em { font-style: normal; opacity: 0.7; }
.ss-slate-row strong { font-weight: 500; }

.ss-nav {
  display: flex;
  justify-content: flex-end;
  gap: 22px;
  flex-wrap: wrap;
  margin-top: 6px;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.ss-nav-link {
  color: var(--ss-bone);
  text-decoration: none;
  position: relative;
  padding: 6px 0;
  transition: color 200ms ease;
}
.ss-nav-link::after {
  content: '';
  position: absolute;
  inset: auto 0 0 0;
  height: 2px;
  background: var(--ss-tape);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 240ms cubic-bezier(0.7, 0, 0.3, 1);
}
.ss-nav-link:hover, .ss-nav-link:focus-visible { color: var(--ss-tape); outline: none; }
.ss-nav-link:hover::after, .ss-nav-link:focus-visible::after { transform: scaleX(1); }

/* HERO */
.ss-hero { padding: 28px 36px 80px; }
.ss-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 1.85 / 1;
  background:
    radial-gradient(circle at 20% 110%, rgba(255, 203, 5, 0.14) 0px, transparent 60%),
    radial-gradient(circle at 90% 0%, rgba(148, 34, 31, 0.16) 0px, transparent 60%),
    linear-gradient(180deg, #1A1A1C 0%, #0E0E10 100%);
  border: 1.5px solid var(--ss-bone);
  overflow: hidden;
}
.ss-frame::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(0deg, rgba(244, 237, 216, 0.04) 0px, transparent 1.5px, transparent 3px),
    radial-gradient(circle at 50% 50%, transparent 60%, rgba(0, 0, 0, 0.55) 100%);
  pointer-events: none;
}
.ss-tape {
  position: absolute;
  background: var(--ss-tape);
  color: #131214;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  font-weight: 700;
  padding: 6px 10px;
  text-transform: uppercase;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.35);
  animation: ss-tape-pull 200ms ease-out 200ms both;
}
@keyframes ss-tape-pull {
  from { transform: translateX(-12px) rotate(-4deg); opacity: 0; }
  to { transform: translateX(0) rotate(0); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .ss-tape { animation: none; }
}
.ss-tape-tl { top: 14px; left: 14px; transform: rotate(-2deg); }
.ss-tape-tr { top: 14px; right: 14px; transform: rotate(2deg); }
.ss-tape-bl { bottom: 14px; left: 14px; transform: rotate(-1deg); }
.ss-tape-br { bottom: 14px; right: 14px; transform: rotate(2deg); }

.ss-hero-content {
  position: absolute;
  inset: auto 8% 12% 8%;
  z-index: 2;
  max-width: 720px;
}
.ss-eyebrow {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ss-tape);
  margin: 0 0 18px;
}
.ss-headline {
  font-family: 'Playfair Display', 'Times New Roman', serif;
  font-style: italic;
  font-weight: 700;
  font-size: clamp(46px, 6.4vw, 96px);
  line-height: 0.96;
  margin: 0 0 20px;
  color: var(--ss-bone);
  letter-spacing: -0.01em;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.55);
}
.ss-headline-fin { color: var(--ss-blood); }
.ss-sub {
  font-size: 16px;
  line-height: 1.45;
  margin: 0 0 24px;
  max-width: 540px;
  color: rgba(244, 237, 216, 0.92);
}

.ss-cta-row { display: flex; gap: 14px; flex-wrap: wrap; }
.ss-cta {
  display: inline-block;
  padding: 14px 22px;
  text-decoration: none;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border: 1.5px solid var(--ss-bone);
  font-weight: 700;
  transition: background 200ms ease, color 200ms ease, transform 200ms ease;
}
.ss-cta-fill {
  background: var(--ss-tape);
  color: #131214;
  border-color: var(--ss-tape);
}
.ss-cta-fill:hover, .ss-cta-fill:focus-visible {
  background: var(--ss-blood);
  color: var(--ss-bone);
  border-color: var(--ss-blood);
  outline: none;
  transform: translate(-1px, -1px);
}
.ss-cta-line {
  background: transparent;
  color: var(--ss-bone);
}
.ss-cta-line:hover, .ss-cta-line:focus-visible {
  background: var(--ss-bone);
  color: var(--ss-slate);
  outline: none;
  transform: translate(-1px, -1px);
}
@media (prefers-reduced-motion: reduce) {
  .ss-cta { transition: background 200ms ease, color 200ms ease; }
  .ss-cta:hover, .ss-cta:focus-visible { transform: none; }
}

.ss-hero-credit {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin: 18px 0 0;
  color: rgba(244, 237, 216, 0.7);
  display: flex;
  align-items: center;
  gap: 10px;
}
.ss-cred-dot {
  width: 8px;
  height: 8px;
  background: var(--ss-blood);
  border-radius: 50%;
  display: inline-block;
}

/* SECTION HEAD — clap */
.ss-section { padding: 36px 36px 56px; }
.ss-section-head {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  gap: 4px 22px;
  margin-bottom: 36px;
  align-items: center;
}
.ss-clap {
  grid-row: span 2;
  width: 76px;
  height: 76px;
  position: relative;
}
.ss-clap-top {
  position: absolute;
  top: -2px;
  left: 0;
  width: 100%;
  height: 18px;
  background:
    repeating-linear-gradient(110deg, var(--ss-bone) 0px, var(--ss-bone) 12px, var(--ss-slate) 12px, var(--ss-slate) 24px);
  border: 1.5px solid var(--ss-bone);
  transform-origin: top left;
  animation: ss-clap-snap 600ms cubic-bezier(0.4, 0, 0.2, 1) both;
}
@keyframes ss-clap-snap {
  0% { transform: rotate(-26deg); }
  60% { transform: rotate(0deg); }
  72% { transform: rotate(-3deg); }
  100% { transform: rotate(0deg); }
}
@media (prefers-reduced-motion: reduce) {
  .ss-clap-top { animation: none; }
}
.ss-clap-body {
  position: absolute;
  inset: 18px 0 0 0;
  background: var(--ss-slate);
  border: 1.5px solid var(--ss-bone);
  display: grid;
  place-items: center;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  font-weight: 700;
  color: var(--ss-bone);
}
.ss-section-title {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 700;
  font-size: clamp(28px, 3.4vw, 44px);
  margin: 0;
  line-height: 1;
  letter-spacing: -0.01em;
}
.ss-section-meta {
  grid-column: 2;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(244, 237, 216, 0.7);
  margin: 0;
}

/* SCENES */
.ss-scene-tabs {
  display: flex;
  gap: 0;
  border: 1.5px solid var(--ss-bone);
  width: fit-content;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.ss-scene-tab {
  background: transparent;
  border: 0;
  border-right: 1.5px solid var(--ss-bone);
  padding: 14px 22px;
  display: flex;
  align-items: baseline;
  gap: 10px;
  cursor: pointer;
  color: var(--ss-bone);
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition: background 200ms ease, color 200ms ease;
}
.ss-scene-tab:last-child { border-right: 0; }
.ss-scene-tab.on { background: var(--ss-tape); color: var(--ss-slate); }
.ss-scene-tab:hover, .ss-scene-tab:focus-visible { background: var(--ss-bone); color: var(--ss-slate); outline: none; }
.ss-scene-num { font-weight: 700; }
.ss-scene-name { font-weight: 500; }

.ss-scene-card {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 32px;
  align-items: flex-start;
  border: 1.5px solid var(--ss-bone);
  padding: 28px;
}
.ss-titlecard {
  background: var(--ss-bone);
  color: var(--ss-slate);
  padding: 24px;
  border: 2px solid var(--ss-slate);
  position: relative;
}
.ss-titlecard::after {
  content: '';
  position: absolute;
  inset: 6px;
  border: 1px solid var(--ss-slate);
  pointer-events: none;
}
.ss-tc-eye {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.ss-tc-title {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 700;
  font-size: 36px;
  margin: 12px 0 8px;
  line-height: 1;
}
.ss-tc-log {
  font-size: 14px;
  line-height: 1.45;
  margin: 0;
}

.ss-dailies {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 14px;
}
.ss-daily {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 18px;
  padding-bottom: 14px;
  border-bottom: 1px dashed rgba(244, 237, 216, 0.3);
}
.ss-daily:last-child { border-bottom: 0; }
.ss-daily-take {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.14em;
  color: var(--ss-tape);
}
.ss-daily-note { font-size: 15px; line-height: 1.5; }

/* STILLS */
.ss-stills {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}
.ss-still {
  border: 1.5px solid var(--ss-bone);
  padding: 14px;
  outline: none;
  transition: transform 220ms ease, background 220ms ease;
}
.ss-still:hover, .ss-still:focus-visible {
  background: rgba(244, 237, 216, 0.08);
  transform: translate(-1px, -2px);
}
@media (prefers-reduced-motion: reduce) {
  .ss-still { transition: background 220ms ease; }
  .ss-still:hover, .ss-still:focus-visible { transform: none; }
}
.ss-still-tag {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  display: inline-block;
  background: var(--ss-tape);
  color: var(--ss-slate);
  padding: 4px 8px;
  margin-bottom: 12px;
}
.ss-still-frame {
  position: relative;
  aspect-ratio: 1.85 / 1;
  background:
    radial-gradient(circle at 30% 70%, rgba(255, 203, 5, 0.18), transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(148, 34, 31, 0.22), transparent 55%),
    linear-gradient(135deg, #2A282C 0%, #0F0F11 100%);
  border: 1px solid rgba(244, 237, 216, 0.4);
  margin-bottom: 12px;
  overflow: hidden;
}
.ss-still-art {
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(72deg, transparent 0px, transparent 16px, rgba(244, 237, 216, 0.05) 16px, rgba(244, 237, 216, 0.05) 17px),
    repeating-linear-gradient(108deg, transparent 0px, transparent 30px, rgba(255, 203, 5, 0.06) 30px, rgba(255, 203, 5, 0.06) 31px);
  mix-blend-mode: screen;
}
.ss-still-grain {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(244, 237, 216, 0.05) 0.4px, transparent 0.6px);
  background-size: 4px 4px;
  opacity: 0.6;
}
.ss-still-freeze {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--ss-blood);
  color: var(--ss-bone);
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  padding: 4px 8px;
  font-weight: 700;
  animation: ss-freeze-in 220ms ease-out both;
}
@keyframes ss-freeze-in {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .ss-still-freeze { animation: none; }
}
.ss-still-scene {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 700;
  font-size: 22px;
  margin: 0 0 6px;
  line-height: 1.05;
}
.ss-still-cap {
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
  color: rgba(244, 237, 216, 0.78);
}

/* CALL SHEET */
.ss-callsheet {
  width: 100%;
  border-collapse: collapse;
  border: 1.5px solid var(--ss-bone);
  font-family: 'DM Mono', monospace;
  font-size: 13px;
}
.ss-callsheet thead th {
  background: var(--ss-bone);
  color: var(--ss-slate);
  text-align: left;
  padding: 12px 14px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 11px;
}
.ss-callsheet tbody tr {
  border-top: 1px solid rgba(244, 237, 216, 0.3);
  transition: background 180ms ease;
}
.ss-callsheet tbody tr:hover, .ss-callsheet tbody tr:focus-within {
  background: rgba(255, 203, 5, 0.12);
}
.ss-callsheet td {
  padding: 12px 14px;
  vertical-align: top;
}
.ss-cs-time { color: var(--ss-tape); width: 90px; font-weight: 700; }
.ss-cs-crew { width: 200px; color: var(--ss-bone); }
.ss-cs-task { color: rgba(244, 237, 216, 0.86); line-height: 1.5; }

/* CTA */
.ss-section-cta { padding-bottom: 64px; }
.ss-cta-card {
  background: var(--ss-bone);
  color: var(--ss-slate);
  padding: 56px 48px;
  border: 2px solid var(--ss-slate);
  position: relative;
}
.ss-tape-cta {
  position: absolute;
  top: -16px;
  left: 36px;
}
.ss-cta-card .ss-eyebrow { color: var(--ss-blood); }
.ss-cta-headline {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 900;
  font-size: clamp(40px, 5vw, 72px);
  margin: 0 0 18px;
  line-height: 0.96;
  color: var(--ss-slate);
}
.ss-cta-body {
  font-size: 17px;
  line-height: 1.5;
  margin: 0 0 28px;
  max-width: 600px;
  color: #2A282C;
}
.ss-cta-card .ss-cta-line { color: var(--ss-slate); border-color: var(--ss-slate); }
.ss-cta-card .ss-cta-line:hover, .ss-cta-card .ss-cta-line:focus-visible { background: var(--ss-slate); color: var(--ss-bone); }

/* FOOTER */
.ss-footer {
  border-top: 1.5px solid var(--ss-bone);
  padding: 18px 0 24px;
  overflow: hidden;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.ss-end-crawl {
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  margin-bottom: 12px;
  border-bottom: 1px solid rgba(244, 237, 216, 0.3);
  padding: 10px 0;
}
.ss-end-crawl span {
  display: inline-block;
  padding-left: 100%;
  animation: ss-crawl 36s linear infinite;
  color: rgba(244, 237, 216, 0.85);
}
@keyframes ss-crawl {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}
@media (prefers-reduced-motion: reduce) {
  .ss-end-crawl span { animation: none; padding-left: 36px; }
}
.ss-foot-credit {
  text-align: center;
  margin: 0;
  padding: 0 36px;
  color: rgba(244, 237, 216, 0.6);
}

/* FOCUS */
.ss-shell *:focus-visible { outline: 2px solid var(--ss-tape); outline-offset: 3px; }

@media (max-width: 980px) {
  .ss-top { grid-template-columns: 1fr; }
  .ss-slate { width: 100%; }
  .ss-nav { justify-content: flex-start; }
  .ss-stills { grid-template-columns: 1fr 1fr; }
  .ss-scene-card { grid-template-columns: 1fr; }
  .ss-hero-content { inset: auto 5% 8% 5%; }
}
@media (max-width: 640px) {
  .ss-stills { grid-template-columns: 1fr; }
  .ss-callsheet { font-size: 12px; }
  .ss-cs-crew { width: 120px; }
}
`;
