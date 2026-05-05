"use client";

/**
 * SolderingEngine — V57 Solder Joint
 *
 * A clean solder joint IS the brand promise — fillet smooth, no pinholes.
 * Macro hero of a wiped joint glints under propane-blue light. Service
 * plumbing's craft pride visualized at 4× magnification.
 *
 * Trade showcase: Plumbing.
 */

import { useState } from "react";

const JOINTS = [
  {
    plate: "Plate 014",
    where: "412 Argon St &middot; Repipe",
    note: "1/2&quot; Type-L copper, 95/5 lead-free. Pre-cleaned, fluxed, swept the bead. Pressure-test 100 PSI &mdash; 0 drop overnight.",
    diameter: "1/2 in",
    fillet: "FULL",
    flux: "Oatey No. 95 tinning",
  },
  {
    plate: "Plate 027",
    where: "1908 Industrial Park &middot; DWV",
    note: "3/4&quot; copper to brass adapter. Inside the wall &mdash; no second chance. Solder takes the fillet on the down-side first, then around.",
    diameter: "3/4 in",
    fillet: "FULL",
    flux: "Oatey No. 95 tinning",
  },
  {
    plate: "Plate 033",
    where: "27 Saguaro Ridge &middot; Service",
    note: "1&quot; copper main, sweat ball valve. Heat the fitting, never the wire-pipe. Wipe clean while still warm with a damp rag.",
    diameter: "1 in",
    fillet: "FULL",
    flux: "Laco regular paste",
  },
  {
    plate: "Plate 041",
    where: "554 Magnolia &middot; Repair",
    note: "1/2&quot; copper to PEX-A transition. Brass body sweated in clean. Flexible run picks up the thermal cycle without fatigue at the joint.",
    diameter: "1/2 in",
    fillet: "FULL",
    flux: "Oatey No. 95 tinning",
  },
  {
    plate: "Plate 052",
    where: "8800 Tempe Commerce &middot; Tenant",
    note: "1-1/2&quot; CPVC to copper transition. Mechanical coupling on the CPVC side, sweated cap on the copper. Cleared inspector first walk.",
    diameter: "1-1/2 in",
    fillet: "FULL",
    flux: "n/a (mech)",
  },
  {
    plate: "Plate 061",
    where: "73 Birch Ln &middot; Service",
    note: "3/4&quot; copper sillcock with built-in stop. Sweated to the trunk line through a cedar shake shim &mdash; stub level, fillet wiped on the warm side.",
    diameter: "3/4 in",
    fillet: "FULL",
    flux: "Oatey No. 95 tinning",
  },
];

const PROCESS = [
  {
    n: "01",
    name: "Flux",
    body: "Wire brush the inside of the fitting. Emery the pipe end. Tinning flux on both, mated dry &mdash; if it doesn't seat clean dry, it won't seat clean wet.",
  },
  {
    n: "02",
    name: "Heat",
    body: "Propane on the fitting body, never the pipe wall. Watch the flux puddle. When it pulls past the seat, the joint is ready.",
  },
  {
    n: "03",
    name: "Feed",
    body: "Touch the wire to the joint, not to the flame. Capillary action pulls solder in &mdash; a half-turn of wire is the right amount for 1/2 inch.",
  },
  {
    n: "04",
    name: "Wipe",
    body: "Damp rag while still warm. Pull from the joint, not across &mdash; you set the fillet by what's left after the wipe, not what you laid down.",
  },
];

const TESTS = [
  { date: "04/22", site: "412 Argon St", press: "100 PSI", soak: "Overnight", result: "0 drop" },
  { date: "04/23", site: "1908 Industrial Park", press: "150 PSI", soak: "12 hr", result: "0 drop" },
  { date: "04/24", site: "27 Saguaro Ridge", press: "100 PSI", soak: "4 hr", result: "0 drop" },
  { date: "04/25", site: "554 Magnolia", press: "100 PSI", soak: "Overnight", result: "0 drop" },
  { date: "04/26", site: "8800 Tempe Commerce", press: "150 PSI", soak: "24 hr", result: "0 drop" },
];

export default function SolderingEngine() {
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <>
      <style>{css}</style>
      <div className="sj-shell">
        {/* TOP — flux-stained header */}
        <header className="sj-top">
          <div className="sj-emboss">
            <span className="sj-emboss-letter">KPT</span>
            <span className="sj-emboss-sub">JOINT &amp; SERVICE PLUMBING</span>
          </div>
          <nav className="sj-nav" aria-label="primary">
            <a href="#joints" className="sj-nav-link">The Joint</a>
            <a href="#wipe" className="sj-nav-link">The Wipe</a>
            <a href="#test" className="sj-nav-link">The Test</a>
            <a href="#dispatch" className="sj-nav-link">Dispatch</a>
          </nav>
          <div className="sj-meta">
            <span>VOL. 57</span>
            <span>JOINT BOOK</span>
          </div>
        </header>

        {/* HERO */}
        <section className="sj-hero">
          <div className="sj-hero-grid">
            <div className="sj-macro" aria-hidden>
              <div className="sj-macro-frame">
                <div className="sj-macro-pipe sj-pipe-l" />
                <div className="sj-macro-pipe sj-pipe-r" />
                <div className="sj-macro-fitting" />
                <div className="sj-macro-fillet" />
                <div className="sj-macro-fillet sj-fillet-2" />
                <div className="sj-macro-glint" />
                <div className="sj-macro-flame" />
                <div className="sj-macro-flux" />
                <div className="sj-macro-blur" />
              </div>
              <div className="sj-macro-meta">
                <span>4&times; MAGNIFICATION &middot; PLATE 001 &middot; PROPANE 1995&deg;F</span>
              </div>
            </div>
            <div className="sj-hero-text">
              <p className="sj-eyebrow">Field Plate &middot; Joint &amp; Service Plumbing</p>
              <h1 className="sj-headline">
                A clean fillet.
                <br />
                <em>No pinholes.</em>
                <br />
                Pressure-tested
                <br />
                before we close the wall.
              </h1>
              <p className="sj-sub">
                Service plumbing on copper, PEX, and CPVC &mdash; we sweat joints
                the way the inspector wishes everyone did.
              </p>
              <div className="sj-cta-row">
                <a className="sj-cta sj-cta-fill" href="#dispatch">Pressure-test a job</a>
                <a className="sj-cta sj-cta-line" href="#joints">See the joint book</a>
              </div>
            </div>
          </div>
        </section>

        {/* JOINTS — gallery */}
        <section id="joints" className="sj-section">
          <div className="sj-section-head">
            <span className="sj-tag">THE&nbsp;JOINT</span>
            <h2 className="sj-section-title">Plates from the field.</h2>
            <p className="sj-section-meta">Hover a plate to pull focus tighter.</p>
          </div>
          <div className="sj-plates">
            {JOINTS.map((j) => (
              <article
                key={j.plate}
                className="sj-plate"
                tabIndex={0}
                onMouseEnter={() => setFocused(j.plate)}
                onMouseLeave={() => setFocused(null)}
                onFocus={() => setFocused(j.plate)}
                onBlur={() => setFocused(null)}
                data-focus={focused === j.plate ? "true" : "false"}
              >
                <div className="sj-plate-img" aria-hidden>
                  <span className="sj-pl-pipe sj-pl-pipe-l" />
                  <span className="sj-pl-pipe sj-pl-pipe-r" />
                  <span className="sj-pl-fitting" />
                  <span className="sj-pl-fillet" />
                  <span className="sj-pl-glint" />
                  <span className="sj-pl-grain" />
                </div>
                <div className="sj-plate-foot">
                  <span className="sj-plate-tag">{j.plate}</span>
                  <span className="sj-plate-where" dangerouslySetInnerHTML={{ __html: j.where }} />
                </div>
                <p className="sj-plate-note" dangerouslySetInnerHTML={{ __html: j.note }} />
                <ul className="sj-plate-spec">
                  <li><em>OD</em>{j.diameter}</li>
                  <li><em>FILLET</em>{j.fillet}</li>
                  <li><em>FLUX</em>{j.flux}</li>
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* WIPE — process */}
        <section id="wipe" className="sj-section">
          <div className="sj-section-head">
            <span className="sj-tag">THE&nbsp;WIPE</span>
            <h2 className="sj-section-title">Flux. Heat. Feed. Wipe.</h2>
            <p className="sj-section-meta">Four steps, decades of practice.</p>
          </div>
          <ol className="sj-process">
            {PROCESS.map((p) => (
              <li key={p.n} className="sj-step">
                <span className="sj-step-n">{p.n}</span>
                <h3 className="sj-step-name">{p.name}</h3>
                <p className="sj-step-body">{p.body}</p>
                <span className="sj-step-flame" aria-hidden />
              </li>
            ))}
          </ol>
        </section>

        {/* TEST — pressure logs */}
        <section id="test" className="sj-section">
          <div className="sj-section-head">
            <span className="sj-tag">THE&nbsp;TEST</span>
            <h2 className="sj-section-title">Pressure-test logs.</h2>
            <p className="sj-section-meta">Last week, every rough-in. Zero drop, every line.</p>
          </div>
          <table className="sj-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Site</th>
                <th>Pressure</th>
                <th>Soak</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {TESTS.map((t) => (
                <tr key={t.date + t.site}>
                  <td className="sj-t-date">{t.date}</td>
                  <td className="sj-t-site">{t.site}</td>
                  <td className="sj-t-press">{t.press}</td>
                  <td className="sj-t-soak">{t.soak}</td>
                  <td className="sj-t-result">{t.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* CTA */}
        <section id="dispatch" className="sj-section sj-section-cta">
          <div className="sj-cta-card">
            <p className="sj-eyebrow">Pressure-test a job</p>
            <h2 className="sj-cta-headline">
              We sweat joints the way the inspector wishes everyone did.
            </h2>
            <p className="sj-cta-body">
              Copper, PEX, CPVC. Repipes, slab leaks, water-heater swaps,
              tenant rough-ins. We pressure-test before we close the wall, and
              the photo is on the invoice.
            </p>
            <div className="sj-cta-row">
              <a className="sj-cta sj-cta-fill" href="#">Open a ticket</a>
              <a className="sj-cta sj-cta-line" href="#">Email the office</a>
            </div>
            <p className="sj-cta-meta">
              Master plumber #B-9931 &middot; Tempe / Mesa / Chandler &middot; (480) 555-SOLD
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="sj-footer">
          <div className="sj-footer-stamp" aria-hidden>
            <span>FLUX STAINED &middot; FIELD TESTED</span>
          </div>
          <div className="sj-footer-rows">
            <span>MASTER PLUMBER #B-9931</span>
            <span>UPC / IPC compliant</span>
            <span>NIBCO / Mueller / Streamline cert</span>
            <span>&copy; 2026 KPT</span>
          </div>
        </footer>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,700;1,500;1,700&family=Inter:wght@400;500;700&family=DM+Mono:wght@400;500&display=swap');

.sj-shell {
  --sj-flux: #2A1A0F;
  --sj-flux-2: #3A271B;
  --sj-flux-3: #1A0E07;
  --sj-paper: #F0EAD8;
  --sj-paper-d: #C9C0A8;
  --sj-silver: #DEDFD7;
  --sj-copper: #B66E33;
  --sj-copper-d: #7C4621;
  --sj-propane: #2F8AC2;
  --sj-propane-h: #6FC1E6;
  --sj-flame: #F0A93B;
  background:
    radial-gradient(circle at 18% 12%, rgba(240, 169, 59, 0.05) 0px, transparent 240px),
    radial-gradient(circle at 82% 88%, rgba(47, 138, 194, 0.06) 0px, transparent 280px),
    var(--sj-flux);
  color: var(--sj-paper);
  min-height: 100vh;
  font-family: 'Inter', system-ui, sans-serif;
  padding: 0;
}

/* TOP */
.sj-top {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 24px;
  align-items: center;
  padding: 22px 32px;
  border-bottom: 1px solid rgba(240, 234, 216, 0.18);
}
.sj-emboss {
  display: flex;
  align-items: baseline;
  gap: 12px;
}
.sj-emboss-letter {
  font-family: 'Cormorant Garamond', 'Times New Roman', serif;
  font-style: italic;
  font-weight: 700;
  font-size: 28px;
  letter-spacing: 0.02em;
  color: var(--sj-paper);
  text-shadow: 0 0 1px rgba(0,0,0,0.4);
}
.sj-emboss-sub {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(240, 234, 216, 0.7);
}
.sj-nav {
  display: flex;
  justify-content: center;
  gap: 28px;
  flex-wrap: wrap;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.sj-nav-link {
  color: var(--sj-paper);
  text-decoration: none;
  padding: 6px 0;
  position: relative;
  transition: color 200ms ease;
}
.sj-nav-link::after {
  content: '';
  position: absolute;
  inset: auto 0 -2px 0;
  height: 1px;
  background: var(--sj-copper);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 240ms cubic-bezier(0.7, 0, 0.3, 1);
}
.sj-nav-link:hover, .sj-nav-link:focus-visible { color: var(--sj-copper); outline: none; }
.sj-nav-link:hover::after, .sj-nav-link:focus-visible::after { transform: scaleX(1); }
.sj-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.16em;
  color: rgba(240, 234, 216, 0.6);
}

/* HERO */
.sj-hero { padding: 36px 32px 64px; }
.sj-hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}
.sj-eyebrow {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--sj-copper);
  margin: 0 0 18px;
}
.sj-headline {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 700;
  font-size: clamp(48px, 6.4vw, 92px);
  line-height: 0.96;
  margin: 0 0 22px;
  letter-spacing: -0.01em;
  color: var(--sj-paper);
}
.sj-headline em {
  font-style: italic;
  color: var(--sj-copper);
  font-weight: 500;
}
.sj-sub {
  font-size: 17px;
  line-height: 1.55;
  margin: 0 0 28px;
  max-width: 460px;
  color: rgba(240, 234, 216, 0.86);
}
.sj-cta-row { display: flex; gap: 14px; flex-wrap: wrap; }
.sj-cta {
  display: inline-block;
  padding: 14px 22px;
  text-decoration: none;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border: 1.5px solid var(--sj-paper);
  font-weight: 700;
  transition: background 200ms ease, color 200ms ease, transform 180ms ease;
}
.sj-cta-fill {
  background: var(--sj-copper);
  color: var(--sj-paper);
  border-color: var(--sj-copper);
}
.sj-cta-fill:hover, .sj-cta-fill:focus-visible {
  background: var(--sj-paper);
  color: var(--sj-flux);
  outline: none;
  transform: translate(-1px, -1px);
}
.sj-cta-line {
  background: transparent;
  color: var(--sj-paper);
}
.sj-cta-line:hover, .sj-cta-line:focus-visible {
  background: var(--sj-paper);
  color: var(--sj-flux);
  outline: none;
  transform: translate(-1px, -1px);
}
@media (prefers-reduced-motion: reduce) {
  .sj-cta { transition: background 200ms ease, color 200ms ease; }
  .sj-cta:hover, .sj-cta:focus-visible { transform: none; }
}

/* MACRO HERO ART */
.sj-macro {
  position: relative;
  aspect-ratio: 4 / 3;
  background:
    radial-gradient(circle at 30% 30%, rgba(240, 169, 59, 0.18) 0px, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(47, 138, 194, 0.18) 0px, transparent 60%),
    radial-gradient(circle at 50% 50%, var(--sj-flux-2) 0%, var(--sj-flux-3) 100%);
  border: 1px solid rgba(240, 234, 216, 0.18);
  overflow: hidden;
  animation: sj-pull-focus 1400ms cubic-bezier(0.4, 0, 0.2, 1) both;
}
@keyframes sj-pull-focus {
  from { filter: blur(14px); opacity: 0.1; }
  to { filter: blur(0); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .sj-macro { animation: none; }
}
.sj-macro-frame {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}
.sj-macro-pipe {
  position: absolute;
  top: 35%;
  height: 30%;
  width: 35%;
  background:
    linear-gradient(180deg, #4A2614 0%, var(--sj-copper) 25%, #E5A472 50%, var(--sj-copper) 75%, #2C1306 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.3);
}
.sj-pipe-l { left: -2%; border-radius: 0 4px 4px 0; }
.sj-pipe-r { right: -2%; border-radius: 4px 0 0 4px; }
.sj-macro-fitting {
  position: absolute;
  top: 30%;
  left: 38%;
  width: 24%;
  height: 40%;
  background:
    linear-gradient(180deg, #5A2E14 0%, #B86836 30%, #DA9560 50%, #B86836 70%, #2C1306 100%);
  border-radius: 4px;
  box-shadow:
    inset 0 2px 0 rgba(255,255,255,0.25),
    inset 0 -2px 0 rgba(0,0,0,0.4);
}
.sj-macro-fillet {
  position: absolute;
  top: 30%;
  left: 36%;
  width: 4%;
  height: 40%;
  background:
    linear-gradient(180deg, #B8B5AA 0%, var(--sj-silver) 30%, #FFFFFF 50%, var(--sj-silver) 70%, #565448 100%);
  border-radius: 50%;
  box-shadow:
    0 0 6px rgba(255,255,255,0.4),
    inset 0 1px 0 rgba(255,255,255,0.6);
  filter: blur(0.4px);
}
.sj-fillet-2 { left: 60%; }
.sj-macro-glint {
  position: absolute;
  top: 38%;
  left: 50%;
  width: 6%;
  height: 6%;
  background: radial-gradient(circle, rgba(255,255,255,0.95) 0%, transparent 70%);
  transform: translateX(-50%);
  filter: blur(2px);
  animation: sj-glint 4s ease-in-out infinite;
}
@keyframes sj-glint {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; transform: translate(-50%, -2px); }
}
@media (prefers-reduced-motion: reduce) {
  .sj-macro-glint { animation: none; }
}
.sj-macro-flame {
  position: absolute;
  bottom: -10%;
  left: 30%;
  width: 30%;
  height: 60%;
  background:
    radial-gradient(ellipse at 50% 100%, rgba(240, 169, 59, 0.6) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 80%, rgba(47, 138, 194, 0.5) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 60%, rgba(111, 193, 230, 0.35) 0%, transparent 45%);
  filter: blur(8px);
  mix-blend-mode: screen;
  animation: sj-flicker 2.4s ease-in-out infinite;
}
@keyframes sj-flicker {
  0%, 100% { transform: scaleY(1); opacity: 0.85; }
  50% { transform: scaleY(1.06); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .sj-macro-flame { animation: none; }
}
.sj-macro-flux {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%;
  background:
    radial-gradient(ellipse at 50% 100%, rgba(70, 36, 12, 0.75) 0%, transparent 70%);
  filter: blur(10px);
}
.sj-macro-blur {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, transparent 30%, rgba(26, 14, 7, 0.55) 90%);
  pointer-events: none;
}
.sj-macro-meta {
  position: absolute;
  bottom: 12px;
  left: 16px;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  color: rgba(240, 234, 216, 0.85);
  text-transform: uppercase;
  background: rgba(26, 14, 7, 0.7);
  padding: 4px 8px;
  border-left: 2px solid var(--sj-copper);
}

/* SECTIONS */
.sj-section { padding: 28px 32px 42px; }
.sj-section-head {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 18px;
  align-items: center;
  border-top: 1px solid rgba(240, 234, 216, 0.18);
  padding-top: 26px;
  margin-bottom: 28px;
}
.sj-tag {
  background: var(--sj-copper);
  color: var(--sj-paper);
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 6px 10px;
  font-weight: 700;
}
.sj-section-title {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 700;
  font-size: clamp(28px, 3.6vw, 44px);
  margin: 0;
  letter-spacing: -0.01em;
  color: var(--sj-paper);
  line-height: 1;
}
.sj-section-meta {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(240, 234, 216, 0.6);
  margin: 0;
  text-align: right;
  max-width: 260px;
}

/* PLATES */
.sj-plates {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.sj-plate {
  background: var(--sj-flux-2);
  border: 1px solid rgba(240, 234, 216, 0.16);
  padding: 14px 14px 18px;
  outline: none;
  transition: background 200ms ease, transform 200ms ease, border-color 200ms ease;
  display: flex;
  flex-direction: column;
}
.sj-plate[data-focus="true"] {
  background: var(--sj-flux-3);
  border-color: var(--sj-copper);
  transform: translateY(-2px);
}
@media (prefers-reduced-motion: reduce) {
  .sj-plate { transition: background 200ms ease, border-color 200ms ease; }
  .sj-plate[data-focus="true"] { transform: none; }
}

.sj-plate-img {
  position: relative;
  aspect-ratio: 4 / 3;
  background:
    radial-gradient(circle at 30% 30%, rgba(240, 169, 59, 0.12) 0px, transparent 40%),
    radial-gradient(circle at 70% 70%, rgba(47, 138, 194, 0.10) 0px, transparent 50%),
    linear-gradient(135deg, var(--sj-flux-2) 0%, var(--sj-flux-3) 100%);
  border-radius: 2px;
  margin-bottom: 12px;
  overflow: hidden;
  filter: blur(0.6px);
  transition: filter 220ms ease;
}
.sj-plate[data-focus="true"] .sj-plate-img { filter: blur(0); }
@media (prefers-reduced-motion: reduce) {
  .sj-plate-img { transition: none; filter: blur(0); }
}
.sj-pl-pipe {
  position: absolute;
  top: 40%;
  height: 22%;
  width: 35%;
  background:
    linear-gradient(180deg, #4A2614 0%, var(--sj-copper) 30%, #E5A472 50%, var(--sj-copper) 70%, #2C1306 100%);
}
.sj-pl-pipe-l { left: -2%; }
.sj-pl-pipe-r { right: -2%; }
.sj-pl-fitting {
  position: absolute;
  top: 36%;
  left: 38%;
  width: 24%;
  height: 30%;
  background:
    linear-gradient(180deg, #5A2E14 0%, #B86836 30%, #DA9560 50%, #B86836 70%, #2C1306 100%);
  border-radius: 3px;
}
.sj-pl-fillet {
  position: absolute;
  top: 36%;
  left: 36%;
  width: 4%;
  height: 30%;
  background:
    linear-gradient(180deg, #B8B5AA 0%, var(--sj-silver) 50%, #565448 100%);
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(255,255,255,0.3);
}
.sj-pl-fillet::after {
  content: '';
  position: absolute;
  top: 0;
  left: 16px;
  width: 4px;
  height: 100%;
  background:
    linear-gradient(180deg, #B8B5AA 0%, var(--sj-silver) 50%, #565448 100%);
  border-radius: 50%;
}
.sj-pl-glint {
  position: absolute;
  top: 44%;
  left: 50%;
  width: 5%;
  height: 5%;
  background: radial-gradient(circle, rgba(255,255,255,0.85) 0%, transparent 70%);
  transform: translateX(-50%);
  filter: blur(1.5px);
}
.sj-pl-grain {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(240, 234, 216, 0.05) 0.4px, transparent 0.6px);
  background-size: 4px 4px;
  opacity: 0.5;
  pointer-events: none;
}

.sj-plate-foot {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: baseline;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(240, 234, 216, 0.16);
  margin-bottom: 10px;
}
.sj-plate-tag {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  color: var(--sj-copper);
  font-weight: 700;
}
.sj-plate-where {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 14px;
  color: rgba(240, 234, 216, 0.85);
  text-align: right;
}
.sj-plate-note {
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 12px;
  color: rgba(240, 234, 216, 0.82);
  flex: 1;
}
.sj-plate-spec {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.06em;
  color: rgba(240, 234, 216, 0.86);
}
.sj-plate-spec li em {
  font-style: normal;
  color: var(--sj-copper);
  letter-spacing: 0.16em;
  margin-right: 6px;
  text-transform: uppercase;
  font-size: 10px;
}

/* PROCESS */
.sj-process {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}
.sj-step {
  position: relative;
  background: var(--sj-flux-2);
  border: 1px solid rgba(240, 234, 216, 0.16);
  padding: 26px 22px 28px;
  overflow: hidden;
  transition: background 220ms ease, border-color 220ms ease;
}
.sj-step:hover, .sj-step:focus-within {
  background: var(--sj-flux-3);
  border-color: var(--sj-flame);
}
.sj-step-n {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 56px;
  font-weight: 700;
  color: var(--sj-copper);
  display: block;
  line-height: 0.9;
  margin-bottom: 4px;
}
.sj-step-name {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 700;
  font-size: 26px;
  margin: 0 0 12px;
  color: var(--sj-paper);
  letter-spacing: -0.01em;
  line-height: 1;
}
.sj-step-body {
  font-size: 14px;
  line-height: 1.55;
  margin: 0;
  color: rgba(240, 234, 216, 0.82);
}
.sj-step-flame {
  position: absolute;
  bottom: -40px;
  left: -40px;
  width: 160px;
  height: 160px;
  background:
    radial-gradient(circle at 50% 50%, rgba(240, 169, 59, 0.25) 0%, rgba(47, 138, 194, 0.18) 30%, transparent 60%);
  filter: blur(20px);
  pointer-events: none;
  opacity: 0.5;
  transition: opacity 220ms ease, transform 220ms ease;
}
.sj-step:hover .sj-step-flame, .sj-step:focus-within .sj-step-flame {
  opacity: 1;
  transform: translate(20px, -20px) scale(1.2);
}
@media (prefers-reduced-motion: reduce) {
  .sj-step, .sj-step-flame { transition: none; }
  .sj-step:hover .sj-step-flame { transform: none; }
}

/* TEST TABLE */
.sj-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--sj-flux-2);
  border: 1px solid rgba(240, 234, 216, 0.16);
}
.sj-table thead th {
  background: var(--sj-flux-3);
  color: var(--sj-copper);
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-align: left;
  padding: 12px 14px;
  border-bottom: 1px solid rgba(240, 234, 216, 0.18);
}
.sj-table tbody tr { border-top: 1px solid rgba(240, 234, 216, 0.1); transition: background 180ms ease; }
.sj-table tbody tr:hover, .sj-table tbody tr:focus-within { background: var(--sj-flux-3); }
.sj-table td { padding: 12px 14px; vertical-align: top; font-size: 13px; }
.sj-t-date { font-family: 'DM Mono', monospace; color: var(--sj-copper); width: 70px; }
.sj-t-site { color: var(--sj-paper); }
.sj-t-press { font-family: 'DM Mono', monospace; color: var(--sj-paper); }
.sj-t-soak { color: rgba(240, 234, 216, 0.78); }
.sj-t-result {
  font-family: 'DM Mono', monospace;
  color: var(--sj-propane-h);
  letter-spacing: 0.06em;
  font-weight: 700;
}

/* CTA */
.sj-section-cta { padding-bottom: 64px; }
.sj-cta-card {
  background: var(--sj-flux-3);
  border: 1px solid var(--sj-copper);
  padding: 48px 40px;
  position: relative;
  overflow: hidden;
}
.sj-cta-card::before {
  content: '';
  position: absolute;
  top: -80px;
  right: -80px;
  width: 240px;
  height: 240px;
  background:
    radial-gradient(circle at 50% 50%, rgba(240, 169, 59, 0.18) 0%, rgba(47, 138, 194, 0.12) 40%, transparent 70%);
  filter: blur(20px);
  pointer-events: none;
}
.sj-cta-headline {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 700;
  font-size: clamp(32px, 4vw, 56px);
  line-height: 1;
  margin: 0 0 18px;
  letter-spacing: -0.01em;
  max-width: 800px;
  color: var(--sj-paper);
}
.sj-cta-body {
  font-size: 17px;
  line-height: 1.55;
  margin: 0 0 26px;
  max-width: 640px;
  color: rgba(240, 234, 216, 0.86);
}
.sj-cta-meta {
  margin: 16px 0 0;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  color: rgba(240, 234, 216, 0.7);
  text-transform: uppercase;
}

/* FOOTER */
.sj-footer {
  border-top: 1px solid rgba(240, 234, 216, 0.18);
  padding: 24px 32px 32px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 24px;
  align-items: center;
}
.sj-footer-stamp {
  border: 1px solid var(--sj-copper);
  padding: 8px 14px;
  background: rgba(124, 70, 33, 0.18);
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sj-copper);
  transform: rotate(-1.5deg);
}
.sj-footer-rows {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 28px;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: rgba(240, 234, 216, 0.7);
  text-transform: uppercase;
  justify-content: flex-end;
}

/* FOCUS */
.sj-shell *:focus-visible { outline: 2px solid var(--sj-copper); outline-offset: 3px; }

@media (max-width: 980px) {
  .sj-hero-grid { grid-template-columns: 1fr; }
  .sj-plates { grid-template-columns: 1fr 1fr; }
  .sj-process { grid-template-columns: 1fr 1fr; }
  .sj-section-head { grid-template-columns: 1fr; }
  .sj-section-meta { text-align: left; }
  .sj-meta { display: none; }
  .sj-top { grid-template-columns: auto 1fr; }
  .sj-footer { grid-template-columns: 1fr; }
  .sj-footer-rows { justify-content: flex-start; }
}
@media (max-width: 640px) {
  .sj-plates { grid-template-columns: 1fr; }
  .sj-process { grid-template-columns: 1fr; }
}
`;
