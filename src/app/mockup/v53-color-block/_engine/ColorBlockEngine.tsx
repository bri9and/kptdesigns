"use client";

/**
 * ColorBlockEngine — V53 Color Block
 *
 * International Typographic Style at full saturation. Hard rectangles of
 * color on a 12-column grid; one typeface (system Helvetica-style stack)
 * at three weights; no photographs, no gradients, no metaphor.
 *
 * Trade showcase: Plumbing.
 */

import { useState } from "react";

const SERVICES = [
  {
    code: "01",
    title: "Repipe",
    body:
      "Whole-house copper-to-PEX repipes. Wall opens, manifolds set, pressure-tested at 100 PSI before drywall.",
    bg: "#0066CC",
    fg: "#F2EEE5",
    flip: "#CF1F5C",
  },
  {
    code: "02",
    title: "DWV",
    body:
      "Drain-waste-vent rough-ins on commercial fit-outs. Cleanouts placed where they should've been on the print.",
    bg: "#CF1F5C",
    fg: "#F2EEE5",
    flip: "#0066CC",
  },
  {
    code: "03",
    title: "Service",
    body:
      "Trap arms, closet flanges, water heaters. Old gate valve out, full-port ball valve in. Same-day, invoiced clean.",
    bg: "#0A0A0A",
    fg: "#F2EEE5",
    flip: "#0066CC",
  },
];

const JOBS = [
  { addr: "412 Argon St", scope: "Repipe — copper to PEX-A", days: 3, kind: "repipe" },
  { addr: "1908 Industrial Park Way", scope: "DWV rough-in, 6\" PVC", days: 5, kind: "dwv" },
  { addr: "27 Oakridge Ct", scope: "50-gal water heater swap", days: 1, kind: "service" },
  { addr: "554 Magnolia Pl", scope: "Trap arm + closet flange", days: 1, kind: "service" },
  { addr: "8800 Tempe Commerce Dr", scope: "Tenant fit-out, 14 fixtures", days: 9, kind: "dwv" },
  { addr: "73 Birch Ln", scope: "Pressure regulator + main shut-off", days: 1, kind: "service" },
  { addr: "1445 Saguaro Bl", scope: "Repipe, slab leak repair", days: 4, kind: "repipe" },
  { addr: "9 Foothill Tr", scope: "Tankless install, gas line up-size", days: 2, kind: "service" },
];

const RATES = [
  { col: "Hourly — Service", num: "$165", note: "First hour, 1-hour minimum, materials at cost +20%." },
  { col: "Hourly — Helper", num: "$95", note: "Second body when scope warrants it. Same code, half the rate." },
  { col: "Flat — Water Heater", num: "$1,890", note: "50-gal gas. Pan, T&P, expansion tank, haul-off included." },
  { col: "Flat — Hose Bibb", num: "$285", note: "Frost-free sillcock. Includes the wall patch on stucco." },
  { col: "Repipe — per fixture", num: "$725", note: "PEX-A manifold, copper stub-outs, pressure test, drywall patch." },
  { col: "After-hours", num: "$245", note: "10pm to 6am. Two-hour minimum. Flat-rate jobs +30%." },
];

export default function ColorBlockEngine() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      <style>{css}</style>
      <div className="cb-shell">
        {/* TOP NAV STRIP */}
        <header className="cb-top">
          <div className="cb-top-mark">
            <span className="cb-mark-block" aria-hidden />
            <span className="cb-mark-text">KPT/PLUMBING</span>
          </div>
          <nav className="cb-nav" aria-label="primary">
            <a href="#services" className="cb-nav-link">01 Services</a>
            <a href="#grid" className="cb-nav-link">02 The Grid</a>
            <a href="#rates" className="cb-nav-link">03 Rates</a>
            <a href="#contact" className="cb-nav-link">04 Open a Ticket</a>
          </nav>
          <div className="cb-top-meta">
            <span>LIC. C-36 #874-220</span>
            <span>TEMPE / MESA / CHANDLER</span>
          </div>
        </header>

        {/* HERO — 12-COLUMN BLOCK GRID */}
        <section className="cb-hero" aria-label="Hero">
          <div className="cb-hero-grid">
            <div className="cb-block cb-block-cyan cb-headline-block">
              <p className="cb-eyebrow">Vol. 53 — Plumbing System</p>
              <h1 className="cb-headline">
                Pipe dope.
                <br />
                Trap arms.
                <br />
                Cleanouts where
                <br />
                they should&rsquo;ve been.
              </h1>
              <p className="cb-sub">
                Service plumbing on residential repipes and commercial DWV —
                clean rough-ins, clean punch-out, clean invoice.
              </p>
            </div>
            <div className="cb-block cb-block-magenta cb-hero-cta">
              <p className="cb-cta-num">01 / 02</p>
              <a className="cb-cta cb-cta-fill" href="#contact">Open a ticket</a>
              <a className="cb-cta cb-cta-line" href="#services">See the system</a>
              <p className="cb-cta-meta">24-hour dispatch &mdash; (480) 555-PIPE</p>
            </div>
            <div className="cb-block cb-block-bone cb-hero-stat">
              <p className="cb-stat-num">412</p>
              <p className="cb-stat-label">jobs closed Q1 — invoiced net 14, none in dispute</p>
            </div>
            <div className="cb-block cb-block-black cb-hero-stat-alt">
              <p className="cb-stat-num">100 PSI</p>
              <p className="cb-stat-label">pressure-test floor on every rough-in before drywall</p>
            </div>
            <div className="cb-block cb-block-cyan-dim cb-hero-stat-alt">
              <p className="cb-stat-num">7&nbsp;am</p>
              <p className="cb-stat-label">first-truck rolls — Tempe yard, every working day</p>
            </div>
            <div className="cb-block cb-block-magenta-dim cb-hero-stat-alt">
              <p className="cb-stat-num">1978</p>
              <p className="cb-stat-label">earliest stack we&rsquo;ll still service. Older, we&rsquo;ll quote a swap.</p>
            </div>
          </div>
        </section>

        {/* SERVICES — THREE BLOCKS */}
        <section id="services" className="cb-section">
          <header className="cb-section-head">
            <span className="cb-section-num">01</span>
            <h2 className="cb-section-title">Three Services</h2>
            <span className="cb-section-rule" aria-hidden />
            <span className="cb-section-meta">Hover swaps to complement.</span>
          </header>
          <div className="cb-services">
            {SERVICES.map((s) => (
              <a
                key={s.code}
                href="#contact"
                className="cb-service"
                style={{
                  ["--s-bg" as string]: s.bg,
                  ["--s-fg" as string]: s.fg,
                  ["--s-flip" as string]: s.flip,
                }}
                onMouseEnter={() => setHovered(s.code)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(s.code)}
                onBlur={() => setHovered(null)}
                data-active={hovered === s.code ? "true" : "false"}
              >
                <span className="cb-service-code">{s.code}</span>
                <span className="cb-service-title">{s.title}</span>
                <span className="cb-service-body">{s.body}</span>
                <span className="cb-service-arrow" aria-hidden>&rarr;</span>
              </a>
            ))}
          </div>
        </section>

        {/* GRID — RECENT JOBS */}
        <section id="grid" className="cb-section">
          <header className="cb-section-head">
            <span className="cb-section-num">02</span>
            <h2 className="cb-section-title">The Grid</h2>
            <span className="cb-section-rule" aria-hidden />
            <span className="cb-section-meta">Recent jobs — 12-col field.</span>
          </header>
          <div className="cb-grid-jobs">
            {JOBS.map((j, i) => (
              <article key={j.addr} className={`cb-grid-job cb-grid-job-${j.kind}`} tabIndex={0}>
                <span className="cb-job-idx">#{(i + 1).toString().padStart(2, "0")}</span>
                <h3 className="cb-job-addr">{j.addr}</h3>
                <p className="cb-job-scope">{j.scope}</p>
                <span className="cb-job-days">{j.days} {j.days === 1 ? "day" : "days"} on site</span>
              </article>
            ))}
          </div>
        </section>

        {/* RATE CARD */}
        <section id="rates" className="cb-section cb-section-rates">
          <header className="cb-section-head">
            <span className="cb-section-num">03</span>
            <h2 className="cb-section-title">Rates</h2>
            <span className="cb-section-rule" aria-hidden />
            <span className="cb-section-meta">Hourly / flat / repipe / after-hours.</span>
          </header>
          <div className="cb-rates">
            {RATES.map((r) => (
              <div key={r.col} className="cb-rate" tabIndex={0}>
                <span className="cb-rate-col">{r.col}</span>
                <span className="cb-rate-num">{r.num}</span>
                <span className="cb-rate-note">{r.note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="cb-section cb-section-contact">
          <div className="cb-contact-block">
            <p className="cb-contact-eye">04 — Open a ticket</p>
            <h2 className="cb-contact-headline">
              Phoenix, Tempe, Mesa, Chandler. Same-day on the metro.
            </h2>
            <div className="cb-contact-row">
              <a className="cb-cta cb-cta-fill" href="#">Send dispatch</a>
              <a className="cb-cta cb-cta-line cb-cta-line-light" href="#">Email the office</a>
            </div>
            <p className="cb-contact-meta">
              Office 7&ndash;5 weekdays. After-hours dispatch routes through the on-call truck.
            </p>
          </div>
        </section>

        {/* FOOTER — SWISS RULE */}
        <footer className="cb-footer">
          <div className="cb-footer-row">
            <span className="cb-foot-cell">KPT&nbsp;/&nbsp;PLUMBING</span>
            <span className="cb-foot-cell">MASTER PLUMBER #B-9931</span>
            <span className="cb-foot-cell">DISPATCH (480) 555-PIPE</span>
            <span className="cb-foot-cell">&copy; 2026</span>
          </div>
          <p className="cb-foot-credit">
            Set in Helvetica-class. Three-color system. No photographs, no gradients, no metaphor.
          </p>
        </footer>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');

.cb-shell {
  --cb-cyan: #0066CC;
  --cb-cyan-dim: #4F8FCC;
  --cb-magenta: #CF1F5C;
  --cb-magenta-dim: #C66088;
  --cb-bone: #F2EEE5;
  --cb-black: #0A0A0A;
  --cb-rule: #0A0A0A;
  background: var(--cb-bone);
  color: var(--cb-black);
  font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  min-height: 100vh;
  padding: 0;
}

.cb-top {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 32px;
  padding: 22px 36px;
  border-bottom: 1px solid var(--cb-black);
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.cb-top-mark {
  display: flex;
  align-items: center;
  gap: 10px;
}
.cb-mark-block {
  width: 18px;
  height: 18px;
  background: var(--cb-cyan);
  display: inline-block;
}
.cb-mark-text { font-weight: 900; letter-spacing: 0.06em; }
.cb-nav {
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
}
.cb-nav-link {
  color: var(--cb-black);
  text-decoration: none;
  position: relative;
  padding: 4px 0;
  transition: color 160ms ease;
}
.cb-nav-link::after {
  content: '';
  position: absolute;
  inset: auto 0 -2px 0;
  height: 2px;
  background: var(--cb-magenta);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 220ms cubic-bezier(0.7, 0, 0.3, 1);
}
.cb-nav-link:hover, .cb-nav-link:focus-visible { outline: none; }
.cb-nav-link:hover::after, .cb-nav-link:focus-visible::after { transform: scaleX(1); }
.cb-top-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  font-weight: 400;
  font-size: 11px;
  color: #333;
}

/* HERO 12-COL */
.cb-hero { padding: 0 36px 0; }
.cb-hero-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(120px, auto);
  gap: 18px;
  padding: 48px 0 64px;
}
.cb-block {
  padding: 28px;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--cb-black);
  animation: cb-slide-in 720ms cubic-bezier(0.22, 0.96, 0.32, 1) both;
}
@keyframes cb-slide-in {
  from { transform: translateX(40px); opacity: 0; }
  to { transform: none; opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .cb-block { animation: none; }
}
.cb-block-cyan { background: var(--cb-cyan); color: var(--cb-bone); }
.cb-block-magenta { background: var(--cb-magenta); color: var(--cb-bone); }
.cb-block-bone { background: var(--cb-bone); color: var(--cb-black); }
.cb-block-black { background: var(--cb-black); color: var(--cb-bone); }
.cb-block-cyan-dim { background: var(--cb-cyan-dim); color: var(--cb-black); }
.cb-block-magenta-dim { background: var(--cb-magenta-dim); color: var(--cb-black); }

.cb-headline-block { grid-column: span 7; grid-row: span 3; padding: 40px 44px 44px; animation-delay: 0ms; }
.cb-hero-cta { grid-column: span 5; grid-row: span 2; display: flex; flex-direction: column; gap: 10px; animation-delay: 80ms; }
.cb-hero-stat { grid-column: span 3; grid-row: span 1; animation-delay: 160ms; }
.cb-hero-stat-alt { grid-column: span 3; grid-row: span 1; animation-delay: 220ms; }
.cb-hero-stat-alt:nth-of-type(4) { animation-delay: 280ms; }
.cb-hero-stat-alt:nth-of-type(5) { animation-delay: 340ms; }
.cb-hero-stat-alt:nth-of-type(6) { animation-delay: 400ms; }

.cb-eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin: 0 0 18px;
  opacity: 0.92;
}
.cb-headline {
  font-size: clamp(48px, 6.4vw, 96px);
  line-height: 0.94;
  font-weight: 900;
  letter-spacing: -0.02em;
  margin: 0 0 22px;
}
.cb-sub {
  font-size: 16px;
  line-height: 1.45;
  margin: 0;
  max-width: 460px;
  font-weight: 400;
  opacity: 0.95;
}

.cb-cta-num {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin: 0 0 8px;
  opacity: 0.9;
}
.cb-cta {
  display: inline-block;
  padding: 14px 22px;
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border: 2px solid var(--cb-bone);
  transition: background 180ms ease, color 180ms ease, transform 180ms ease;
}
.cb-cta-fill {
  background: var(--cb-bone);
  color: var(--cb-magenta);
}
.cb-cta-fill:hover, .cb-cta-fill:focus-visible {
  outline: none;
  background: var(--cb-cyan);
  color: var(--cb-bone);
  border-color: var(--cb-bone);
  transform: translate(-1px, -1px);
}
.cb-cta-line {
  background: transparent;
  color: var(--cb-bone);
}
.cb-cta-line:hover, .cb-cta-line:focus-visible {
  outline: none;
  background: var(--cb-bone);
  color: var(--cb-magenta);
  transform: translate(-1px, -1px);
}
.cb-cta-line-light { color: var(--cb-black); border-color: var(--cb-black); }
.cb-cta-line-light:hover, .cb-cta-line-light:focus-visible { background: var(--cb-cyan); color: var(--cb-bone); border-color: var(--cb-cyan); }
@media (prefers-reduced-motion: reduce) {
  .cb-cta { transition: background 180ms ease, color 180ms ease; }
  .cb-cta:hover, .cb-cta:focus-visible { transform: none; }
}
.cb-cta-meta {
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin: 8px 0 0;
  opacity: 0.85;
}

.cb-stat-num {
  font-size: clamp(40px, 5vw, 64px);
  font-weight: 900;
  margin: 0 0 6px;
  letter-spacing: -0.02em;
  line-height: 1;
}
.cb-stat-label {
  font-size: 12px;
  letter-spacing: 0.06em;
  margin: 0;
  line-height: 1.3;
  font-weight: 500;
}

/* SECTIONS */
.cb-section {
  padding: 56px 36px 32px;
  border-top: 1px solid var(--cb-black);
}
.cb-section-head {
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  gap: 18px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--cb-black);
  margin-bottom: 28px;
}
.cb-section-num {
  font-weight: 900;
  font-size: 14px;
  letter-spacing: 0.16em;
  background: var(--cb-black);
  color: var(--cb-bone);
  padding: 6px 10px;
}
.cb-section-title {
  font-size: clamp(28px, 3.6vw, 48px);
  font-weight: 900;
  letter-spacing: -0.02em;
  margin: 0;
}
.cb-section-rule { height: 2px; background: var(--cb-black); }
.cb-section-meta {
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 500;
}

/* SERVICES */
.cb-services {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.cb-service {
  padding: 32px 28px 28px;
  display: grid;
  gap: 14px;
  grid-template-rows: auto auto 1fr auto;
  background: var(--s-bg);
  color: var(--s-fg);
  text-decoration: none;
  border: 1px solid var(--cb-black);
  position: relative;
  min-height: 280px;
  transition: background 220ms ease, color 220ms ease, transform 200ms ease;
}
.cb-service[data-active="true"], .cb-service:focus-visible {
  background: var(--s-flip);
  outline: none;
  transform: translate(-2px, -2px);
}
@media (prefers-reduced-motion: reduce) {
  .cb-service { transition: background 180ms ease, color 180ms ease; }
  .cb-service[data-active="true"] { transform: none; }
}
.cb-service-code {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.cb-service-title {
  font-size: clamp(36px, 4.4vw, 56px);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1;
}
.cb-service-body {
  font-size: 15px;
  line-height: 1.45;
  font-weight: 400;
  max-width: 320px;
}
.cb-service-arrow {
  font-size: 24px;
  font-weight: 900;
  align-self: end;
  justify-self: end;
}

/* GRID JOBS */
.cb-grid-jobs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.cb-grid-job {
  background: var(--cb-bone);
  border: 1px solid var(--cb-black);
  padding: 22px 22px 18px;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  gap: 8px;
  outline: none;
  transition: background 180ms ease, color 180ms ease;
  cursor: default;
}
.cb-grid-job-repipe:hover, .cb-grid-job-repipe:focus-visible { background: var(--cb-cyan); color: var(--cb-bone); }
.cb-grid-job-dwv:hover, .cb-grid-job-dwv:focus-visible { background: var(--cb-magenta); color: var(--cb-bone); }
.cb-grid-job-service:hover, .cb-grid-job-service:focus-visible { background: var(--cb-black); color: var(--cb-bone); }
.cb-job-idx {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.cb-job-addr {
  font-size: 22px;
  font-weight: 900;
  margin: 0;
  letter-spacing: -0.01em;
  line-height: 1.05;
}
.cb-job-scope {
  font-size: 13px;
  line-height: 1.4;
  margin: 0;
  font-weight: 400;
}
.cb-job-days {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-top: 1px solid currentColor;
  padding-top: 8px;
  opacity: 0.85;
}

/* RATES */
.cb-rates {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.cb-rate {
  border: 1px solid var(--cb-black);
  padding: 22px;
  display: grid;
  gap: 10px;
  outline: none;
  transition: background 180ms ease, color 180ms ease;
}
.cb-rate:hover, .cb-rate:focus-visible {
  background: var(--cb-cyan);
  color: var(--cb-bone);
}
.cb-rate-col {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.cb-rate-num {
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1;
}
.cb-rate-note {
  font-size: 13px;
  line-height: 1.4;
  font-weight: 400;
  border-top: 1px solid currentColor;
  padding-top: 8px;
  opacity: 0.92;
}

/* CONTACT */
.cb-section-contact { padding-bottom: 80px; }
.cb-contact-block {
  background: var(--cb-magenta);
  color: var(--cb-bone);
  padding: 48px 44px;
  border: 1px solid var(--cb-black);
}
.cb-contact-eye {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin: 0 0 18px;
}
.cb-contact-headline {
  font-size: clamp(32px, 4vw, 56px);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1;
  margin: 0 0 26px;
  max-width: 760px;
}
.cb-contact-row { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 18px; }
.cb-contact-meta {
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 0;
  opacity: 0.95;
}

/* FOOTER */
.cb-footer {
  border-top: 1px solid var(--cb-black);
  padding: 22px 36px;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.cb-footer-row {
  display: flex;
  flex-wrap: wrap;
  gap: 18px 32px;
  border-bottom: 1px solid var(--cb-black);
  padding-bottom: 14px;
  margin-bottom: 12px;
  font-weight: 700;
}
.cb-foot-credit { margin: 0; font-weight: 400; opacity: 0.78; }

/* FOCUS RING — 1px keyboard ring */
.cb-shell *:focus-visible { outline: 2px solid var(--cb-magenta); outline-offset: 2px; }

@media (max-width: 980px) {
  .cb-headline-block { grid-column: span 12; grid-row: span 2; }
  .cb-hero-cta { grid-column: span 12; }
  .cb-hero-stat, .cb-hero-stat-alt { grid-column: span 6; }
  .cb-services { grid-template-columns: 1fr; }
  .cb-grid-jobs { grid-template-columns: repeat(2, 1fr); }
  .cb-rates { grid-template-columns: 1fr; }
  .cb-top { grid-template-columns: auto 1fr; }
  .cb-top-meta { display: none; }
  .cb-section-head { grid-template-columns: auto 1fr; }
  .cb-section-rule, .cb-section-meta { display: none; }
}
`;
