"use client";

/**
 * RoadsideNeonEngine — V25 Roadside Neon
 *
 * Bent-tube neon signage on a dusk highway. A scroll-bound headlight
 * cone illuminates one sign at a time. Hover crackles a sign and
 * stabilizes it. Reduced-motion delivers all signs lit immediately.
 */

import { useEffect, useRef, useState } from "react";

const SERVICES = [
  {
    key: "drives",
    label: "Drives",
    color: "#FF5868",
    sub: "Residential driveways",
    line1: "DRIVES",
    line2: "& APRONS",
    description:
      "Tear-out, base repair, fresh mat at 305 degrees. Compaction window watched on NOAA hourly. We seal at six weeks, not two.",
    stats: ["1\" overlay", "1.5\" mill-and-fill", "12-yr mat life avg"],
  },
  {
    key: "lots",
    label: "Lots",
    color: "#FFB347",
    sub: "Commercial parking",
    line1: "LOTS",
    line2: "STRIPED",
    description:
      "Big-iron paver work. LeeBoy 8500 with screed extension. Stripe and stencil on the same shift. ADA truncated domes set with the cap.",
    stats: ["75-stall avg job", "ADA-compliant ramps", "DOT-spec stripe"],
  },
  {
    key: "shoulders",
    label: "Shoulders",
    color: "#7CC8E8",
    sub: "County shoulder work",
    line1: "COUNTY",
    line2: "SHOULDERS",
    description:
      "Mill-and-fill on shoulder runs. Crash-attenuator trucks. Sub-grade probed every fifty feet. We work the dusk window before the mat cools.",
    stats: ["8mph crosswind cap", "Dewpoint < spread temp", "ASE / NACE rated"],
  },
];

const RECENT = [
  { name: "Dunkin' &mdash; Stoughton", run: "Nov 2025", note: "12,400 SF lot. 1.5\" mill-and-fill. ADA compliant.", color: "#FF5868" },
  { name: "Holiday Inn &mdash; Mansfield", run: "Sep 2025", note: "84-stall lot. Tack coat hot. Striped same-day.", color: "#FFB347" },
  { name: "Rt. 138 &mdash; County DOT", run: "Aug 2025", note: "1.4 mi shoulder. Crash-attenuated. Night shift.", color: "#7CC8E8" },
  { name: "Maple Leaf &mdash; Easton", run: "Jul 2025", note: "Single-family driveway. 1\" overlay, sealed at 6 wks.", color: "#FF5868" },
];

export default function RoadsideNeonEngine() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [coneY, setConeY] = useState<number>(20);
  const shellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const t = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setConeY(20 + t * 70);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="rn-shell" ref={shellRef}>
        {/* DUSK SKY GRADIENT FIELD */}
        <div className="rn-sky" aria-hidden />
        <div className="rn-asphalt" aria-hidden />
        <div className="rn-stars" aria-hidden />

        {/* SCROLL-BOUND HEADLIGHT CONE */}
        <div
          className="rn-headlight"
          aria-hidden
          style={{ ["--cone-y" as string]: `${coneY}%` }}
        />

        {/* TOP NAV */}
        <header className="rn-top">
          <div className="rn-brand">
            <span className="rn-brand-bulb" aria-hidden />
            <div className="rn-brand-stack">
              <span className="rn-brand-name">FRESH OIL PAVING CO.</span>
              <span className="rn-brand-meta">EST 1994 &middot; ROUTE 138 &middot; MA-2 SHOULDER</span>
            </div>
          </div>
          <nav className="rn-nav">
            <a href="#tonight" className="rn-link">Tonight&rsquo;s run</a>
            <a href="#window" className="rn-link">The mat window</a>
            <a href="#strip" className="rn-link">Last strip</a>
            <a href="#dispatch" className="rn-link rn-link-call">555.305.7142</a>
          </nav>
        </header>

        {/* HERO */}
        <section className="rn-hero">
          <div className="rn-hero-marquee" aria-hidden>
            <span>FRESH</span>
            <span>OIL</span>
          </div>

          <div className="rn-hero-text">
            <span className="rn-eyebrow">DUSK STRIP &middot; OPEN AT 7:14 PM</span>
            <h1 className="rn-headline">
              <span className="rn-tube rn-tube-coral">Fresh oil.</span>
              <span className="rn-tube rn-tube-amber">Tight joints.</span>
              <span className="rn-tube rn-tube-coral rn-tube-italic">
                Mat hit 305 at 7:14.
              </span>
            </h1>
            <p className="rn-sub">
              Driveways, lots, county shoulders. Run the strip with us at dusk.
              We watch the dewpoint, we watch the wind, and we lay the mat
              before it cools.
            </p>
            <div className="rn-cta-row">
              <a href="#tonight" className="rn-cta rn-cta-primary">Quote a driveway</a>
              <a href="#dispatch" className="rn-cta rn-cta-secondary">Call the dispatcher</a>
            </div>
          </div>

          <div className="rn-roadlines" aria-hidden>
            <span /><span /><span /><span /><span /><span /><span />
          </div>
        </section>

        {/* TONIGHT'S RUN */}
        <section id="tonight" className="rn-section">
          <header className="rn-section-head">
            <span className="rn-section-eyebrow">TONIGHT&rsquo;S RUN / 03 SIGNS LIT</span>
            <h2 className="rn-section-title">Pick your stretch.</h2>
            <p className="rn-section-lead">
              Three lit-up signs across the strip. Each crackles when you hover.
              Each runs a different crew, a different tool list.
            </p>
          </header>

          <div className="rn-signs">
            {SERVICES.map((s, i) => (
              <article
                key={s.key}
                className={`rn-sign${hoverIdx === i ? " rn-sign-hot" : ""}`}
                style={{ ["--neon" as string]: s.color }}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx((h) => (h === i ? null : h))}
                onFocus={() => setHoverIdx(i)}
                onBlur={() => setHoverIdx((h) => (h === i ? null : h))}
                tabIndex={0}
              >
                <div className="rn-sign-pole" aria-hidden>
                  <span className="rn-sign-bolt" />
                  <span className="rn-sign-bolt" />
                </div>
                <div className="rn-sign-board">
                  <div className="rn-sign-tag">{s.sub.toUpperCase()}</div>
                  <div className="rn-sign-tube-line">{s.line1}</div>
                  <div className="rn-sign-tube-line rn-sign-tube-script">{s.line2}</div>
                  <div className="rn-sign-arrow" aria-hidden>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="rn-sign-detail">
                  <p className="rn-sign-desc">{s.description}</p>
                  <ul className="rn-sign-stats">
                    {s.stats.map((stat) => (
                      <li key={stat}>{stat}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* THE MAT WINDOW */}
        <section id="window" className="rn-section rn-section-window">
          <div className="rn-window-grid">
            <div className="rn-window-left">
              <span className="rn-section-eyebrow">THE MAT WINDOW / WHY WE WORK DUSK</span>
              <h2 className="rn-section-title">
                305&deg; in.
                <br />
                160&deg; out.
                <br />
                <span className="rn-window-accent">Watch the wind.</span>
              </h2>
              <p className="rn-window-body">
                A 12&nbsp;mph crosswind at dewpoint kills the compaction window
                faster than rain. We watch NOAA hourly. The screed runs at 305,
                we hand-set joints by 280, we walk the roller off at 160. Off
                the strip before the dew sets &mdash; that&rsquo;s the rule that
                keeps the mat tight at year ten.
              </p>
              <ul className="rn-window-list">
                <li>Probe temp logged at every windrow.</li>
                <li>NOAA dewpoint cross-checked at the dispatch board.</li>
                <li>Crosswind kills the joint &mdash; we postpone, we don&rsquo;t guess.</li>
                <li>Steel-wheel and rubber-tire compaction passes documented.</li>
              </ul>
            </div>

            <div className="rn-dial">
              <div className="rn-dial-face">
                <span className="rn-dial-label">MAT TEMP</span>
                <div className="rn-dial-num">305<span>&deg;F</span></div>
                <div className="rn-dial-bar">
                  <div className="rn-dial-fill" />
                  <div className="rn-dial-marks" aria-hidden>
                    <span /><span /><span /><span /><span />
                  </div>
                </div>
                <div className="rn-dial-row">
                  <span>DEWPOINT</span><span className="rn-dial-val">42&deg;F</span>
                </div>
                <div className="rn-dial-row">
                  <span>SPREAD TEMP</span><span className="rn-dial-val">61&deg;F</span>
                </div>
                <div className="rn-dial-row">
                  <span>WIND</span><span className="rn-dial-val">7 MPH SW</span>
                </div>
                <div className="rn-dial-status">CONDITIONS: GO</div>
              </div>
            </div>
          </div>
        </section>

        {/* LAST STRIP */}
        <section id="strip" className="rn-section">
          <header className="rn-section-head">
            <span className="rn-section-eyebrow">LAST STRIP / RECENT WORK</span>
            <h2 className="rn-section-title">The motel signs going by.</h2>
            <p className="rn-section-lead">
              Recent jobs receding into perspective. Swing in, get out, mat hot, joints tight.
            </p>
          </header>
          <div className="rn-motels">
            {RECENT.map((j, i) => (
              <article
                key={j.name}
                className="rn-motel"
                style={{
                  ["--neon" as string]: j.color,
                  ["--motel-i" as string]: String(i),
                }}
              >
                <div className="rn-motel-board">
                  <div
                    className="rn-motel-name"
                    dangerouslySetInnerHTML={{ __html: j.name }}
                  />
                  <div className="rn-motel-line" aria-hidden />
                  <div className="rn-motel-run">{j.run}</div>
                  <div className="rn-motel-note">{j.note}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* DISPATCH PLACARD */}
        <section id="dispatch" className="rn-section rn-section-dispatch">
          <div className="rn-placard">
            <div className="rn-placard-stripe" aria-hidden />
            <div className="rn-placard-inner">
              <div className="rn-placard-row">
                <span className="rn-placard-emoji" aria-hidden>!</span>
                <div>
                  <div className="rn-placard-eyebrow">FRESH OIL &mdash; DO NOT DRIVE</div>
                  <div className="rn-placard-headline">CALL THE DISPATCHER</div>
                </div>
              </div>
              <div className="rn-placard-phone">555 &middot; 305 &middot; 7142</div>
              <div className="rn-placard-meta">
                <span>MON&ndash;SAT 6A&ndash;9P</span>
                <span>NIGHT-SHIFT REQUESTS &middot; PAGE THE LOT</span>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="rn-footer">
          <div className="rn-footer-row">
            <span className="rn-footer-cert">ASE-CERTIFIED CREW LEADS</span>
            <span className="rn-footer-cert">DOT 138-A SPEC</span>
            <span className="rn-footer-cert">MA HIC #144881</span>
            <span className="rn-footer-cert">NACE COATING INSP.</span>
          </div>
          <p className="rn-footer-credit">
            Drafted in the cab of a chip-truck, 9:14 PM, dewpoint 42&deg;F, wind 7
            SW. &copy; 2026 Fresh Oil Paving Co.
          </p>
        </footer>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Inter:wght@400;500;700&family=Big+Shoulders+Display:wght@500;700;900&display=swap');

.rn-shell {
  position: relative;
  min-height: 100vh;
  background: #0E0F14;
  color: #F5E6C8;
  font-family: 'Inter', system-ui, sans-serif;
  padding: 28px 28px 56px;
  overflow: hidden;
  isolation: isolate;
}

.rn-sky {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse 100% 60% at 50% 100%, rgba(21, 22, 27, 1) 0%, rgba(21, 22, 27, 0.95) 60%, transparent 100%),
    linear-gradient(180deg, #1B1430 0%, #2A2440 18%, #54344A 38%, #8C4848 56%, #C46B45 70%, #1B1A22 92%);
  z-index: -3;
}
.rn-asphalt {
  position: fixed;
  bottom: 0;
  left: 0; right: 0;
  height: 50vh;
  background:
    repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 2px, transparent 2px, transparent 4px),
    radial-gradient(ellipse 120% 100% at 50% 100%, #15161B 0%, #0A0B0F 80%);
  z-index: -2;
}
.rn-stars {
  position: fixed;
  inset: 0 0 50% 0;
  background-image:
    radial-gradient(0.7px 0.7px at 12% 18%, rgba(245, 230, 200, 0.5), transparent),
    radial-gradient(0.6px 0.6px at 86% 22%, rgba(245, 230, 200, 0.4), transparent),
    radial-gradient(0.7px 0.7px at 38% 12%, rgba(245, 230, 200, 0.55), transparent),
    radial-gradient(0.5px 0.5px at 64% 38%, rgba(245, 230, 200, 0.3), transparent),
    radial-gradient(0.6px 0.6px at 92% 8%, rgba(245, 230, 200, 0.4), transparent);
  z-index: -2;
  pointer-events: none;
}

.rn-headlight {
  position: fixed;
  top: var(--cone-y, 30%);
  left: 50%;
  width: 1200px;
  height: 600px;
  transform: translate(-50%, -50%);
  background:
    radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255, 220, 168, 0.18) 0%, rgba(255, 220, 168, 0.08) 40%, transparent 75%);
  filter: blur(40px);
  pointer-events: none;
  z-index: -1;
  transition: top 220ms ease-out;
  mix-blend-mode: screen;
}
@media (prefers-reduced-motion: reduce) {
  .rn-headlight { display: none; }
}

.rn-top {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 4px 22px;
  border-bottom: 1px solid rgba(245, 230, 200, 0.18);
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 14px;
}
.rn-brand { display: flex; align-items: center; gap: 14px; }
.rn-brand-bulb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #FFD68A 0%, #FF5868 60%, #8B1F2A 100%);
  box-shadow: 0 0 12px rgba(255, 88, 104, 0.7), 0 0 32px rgba(255, 88, 104, 0.35);
  animation: rn-flicker 3.4s infinite;
}
@keyframes rn-flicker {
  0%, 100% { opacity: 1; }
  92%, 94% { opacity: 0.5; }
  96% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .rn-brand-bulb { animation: none; }
}
.rn-brand-stack { display: flex; flex-direction: column; line-height: 1.05; }
.rn-brand-name {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 600;
  font-size: 22px;
  letter-spacing: 0.01em;
  color: #FFB347;
}
.rn-brand-meta {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  letter-spacing: 0.22em;
  color: rgba(245, 230, 200, 0.65);
  margin-top: 2px;
}
.rn-nav {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}
.rn-link {
  color: rgba(245, 230, 200, 0.85);
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 500;
  position: relative;
  padding: 5px 2px;
  transition: color 200ms ease;
}
.rn-link::after {
  content: '';
  position: absolute;
  left: 0; bottom: -2px;
  width: 100%; height: 1.5px;
  background: #FF5868;
  box-shadow: 0 0 8px #FF5868;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 260ms cubic-bezier(0.7, 0, 0.3, 1);
}
.rn-link:hover, .rn-link:focus-visible {
  color: #FFB347;
  outline: none;
}
.rn-link:hover::after, .rn-link:focus-visible::after { transform: scaleX(1); }
.rn-link-call {
  font-family: 'Big Shoulders Display', sans-serif;
  font-weight: 700;
  letter-spacing: 0.06em;
  font-size: 18px;
  color: #FFB347;
  border: 1.5px solid #FFB347;
  padding: 6px 12px;
  text-shadow: 0 0 8px rgba(255, 179, 71, 0.5);
  box-shadow: 0 0 12px rgba(255, 179, 71, 0.18);
}
.rn-link-call::after { display: none; }
.rn-link-call:hover, .rn-link-call:focus-visible {
  background: #FFB347;
  color: #15161B;
  text-shadow: none;
}
@media (prefers-reduced-motion: reduce) {
  .rn-link::after { transition: none; }
}

.rn-hero {
  position: relative;
  z-index: 2;
  padding: 80px 12px 96px;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
}
.rn-hero-marquee {
  position: absolute;
  top: 18px;
  right: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: 'Big Shoulders Display', sans-serif;
  font-weight: 900;
  font-size: clamp(60px, 9vw, 138px);
  line-height: 0.86;
  color: #FFB347;
  letter-spacing: -0.02em;
  text-shadow:
    0 0 12px rgba(255, 179, 71, 0.6),
    0 0 32px rgba(255, 179, 71, 0.35),
    0 0 56px rgba(255, 88, 104, 0.18);
  opacity: 0.78;
  pointer-events: none;
  transform: rotate(-6deg);
}
.rn-hero-text {
  position: relative;
  max-width: 880px;
}

.rn-eyebrow {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  letter-spacing: 0.32em;
  color: #FFB347;
  border: 1px solid rgba(255, 179, 71, 0.5);
  padding: 6px 12px;
  margin-bottom: 28px;
  text-shadow: 0 0 8px rgba(255, 179, 71, 0.5);
}

.rn-headline {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  font-size: clamp(44px, 6.6vw, 100px);
  line-height: 1.02;
  letter-spacing: -0.01em;
  margin: 0 0 28px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rn-tube {
  display: inline-block;
}
.rn-tube-coral {
  color: #FF5868;
  text-shadow:
    0 0 4px rgba(255, 88, 104, 0.95),
    0 0 16px rgba(255, 88, 104, 0.6),
    0 0 36px rgba(255, 88, 104, 0.35),
    0 0 60px rgba(255, 88, 104, 0.18);
  animation: rn-tube-flicker 5s infinite;
}
.rn-tube-amber {
  color: #FFB347;
  text-shadow:
    0 0 4px rgba(255, 179, 71, 0.95),
    0 0 16px rgba(255, 179, 71, 0.6),
    0 0 36px rgba(255, 179, 71, 0.35),
    0 0 60px rgba(255, 179, 71, 0.18);
  animation: rn-tube-flicker 6.5s infinite 0.8s;
}
.rn-tube-italic { font-style: italic; }
@keyframes rn-tube-flicker {
  0%, 100% { opacity: 1; }
  90%, 92% { opacity: 0.55; }
  94% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .rn-tube-coral, .rn-tube-amber { animation: none; }
}

.rn-sub {
  font-family: 'Inter', sans-serif;
  font-size: 19px;
  line-height: 1.55;
  color: rgba(245, 230, 200, 0.85);
  max-width: 580px;
  margin: 0 0 36px;
}

.rn-cta-row { display: flex; flex-wrap: wrap; gap: 14px; }
.rn-cta {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 14px 24px;
  text-decoration: none;
  border: 1.5px solid;
  display: inline-block;
  transition: all 220ms ease;
}
.rn-cta-primary {
  background: #FF5868;
  border-color: #FF5868;
  color: #15161B;
  box-shadow: 0 0 16px rgba(255, 88, 104, 0.55);
}
.rn-cta-primary:hover, .rn-cta-primary:focus-visible {
  outline: none;
  background: #FFB347;
  border-color: #FFB347;
  color: #15161B;
  box-shadow: 0 0 24px rgba(255, 179, 71, 0.7);
  transform: translateY(-2px);
}
.rn-cta-secondary {
  background: transparent;
  border-color: rgba(245, 230, 200, 0.75);
  color: #F5E6C8;
}
.rn-cta-secondary:hover, .rn-cta-secondary:focus-visible {
  outline: none;
  background: rgba(245, 230, 200, 0.12);
  border-color: #F5E6C8;
  transform: translateY(-2px);
}
@media (prefers-reduced-motion: reduce) {
  .rn-cta { transition: none; }
}

.rn-roadlines {
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 24px;
  opacity: 0.7;
}
.rn-roadlines span {
  display: block;
  width: 64px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #F5E6C8, transparent);
  filter: blur(0.6px);
}

.rn-section {
  position: relative;
  z-index: 2;
  padding: 64px 12px 80px;
  border-top: 1px solid rgba(245, 230, 200, 0.12);
}

.rn-section-head { margin-bottom: 40px; max-width: 720px; }
.rn-section-eyebrow {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  letter-spacing: 0.28em;
  color: #FFB347;
  margin-bottom: 12px;
  text-shadow: 0 0 8px rgba(255, 179, 71, 0.4);
}
.rn-section-title {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 600;
  font-size: clamp(38px, 5.4vw, 68px);
  line-height: 1.02;
  letter-spacing: -0.01em;
  margin: 0 0 16px;
  color: #F5E6C8;
}
.rn-section-lead {
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  line-height: 1.55;
  color: rgba(245, 230, 200, 0.78);
  max-width: 600px;
  margin: 0;
}

.rn-signs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 28px;
}

.rn-sign {
  position: relative;
  background: rgba(8, 8, 12, 0.55);
  border: 1px solid rgba(245, 230, 200, 0.15);
  padding: 0 0 24px;
  outline: none;
  transition: transform 280ms ease, border-color 280ms ease, background 280ms ease;
  cursor: default;
  display: flex;
  flex-direction: column;
}
.rn-sign:focus-visible { border-color: var(--neon); }

.rn-sign-pole {
  position: relative;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  background: linear-gradient(180deg, #2A2C32 0%, #14151A 100%);
  border-bottom: 1px solid rgba(0,0,0,0.5);
}
.rn-sign-bolt {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #888, #2A2A2A);
  box-shadow: inset 0 0 0 1px #0a0a0a;
}
.rn-sign-board {
  position: relative;
  padding: 28px 22px 20px;
  background:
    radial-gradient(ellipse 90% 80% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%),
    rgba(8, 8, 12, 0.85);
  border-bottom: 1px dashed rgba(245, 230, 200, 0.18);
  text-align: center;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.rn-sign-tag {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  letter-spacing: 0.32em;
  color: rgba(245, 230, 200, 0.65);
  margin-bottom: 12px;
}
.rn-sign-tube-line {
  font-family: 'Big Shoulders Display', sans-serif;
  font-weight: 900;
  font-size: clamp(44px, 5vw, 64px);
  line-height: 0.94;
  letter-spacing: 0.01em;
  color: var(--neon);
  text-shadow: 0 0 4px rgba(0,0,0,0.6);
  -webkit-text-stroke: 1px rgba(0,0,0,0.2);
  transition: text-shadow 320ms ease, opacity 320ms ease;
  opacity: 0.5;
}
.rn-sign-tube-script {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 600;
  font-size: clamp(28px, 3.6vw, 42px);
  letter-spacing: 0.02em;
  margin-top: 4px;
  text-transform: none;
}
.rn-sign:hover .rn-sign-tube-line,
.rn-sign:focus-visible .rn-sign-tube-line,
.rn-sign-hot .rn-sign-tube-line {
  opacity: 1;
  text-shadow:
    0 0 4px var(--neon),
    0 0 12px var(--neon),
    0 0 28px var(--neon),
    0 0 48px var(--neon);
  animation: rn-sign-crackle 1100ms ease-out;
}
@keyframes rn-sign-crackle {
  0% { opacity: 0.5; filter: brightness(1); }
  10% { opacity: 1; filter: brightness(1.4); }
  18% { opacity: 0.4; }
  28% { opacity: 1; }
  36% { opacity: 0.7; }
  44% { opacity: 1; }
  100% { opacity: 1; filter: brightness(1); }
}
@media (prefers-reduced-motion: reduce) {
  .rn-sign-tube-line { opacity: 1; transition: none; }
  .rn-sign:hover .rn-sign-tube-line, .rn-sign:focus-visible .rn-sign-tube-line, .rn-sign-hot .rn-sign-tube-line {
    animation: none;
    text-shadow:
      0 0 4px var(--neon),
      0 0 12px var(--neon),
      0 0 28px var(--neon);
  }
}

.rn-sign-arrow {
  margin: 12px auto 0;
  display: flex;
  gap: 4px;
}
.rn-sign-arrow span {
  display: block;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--neon);
  box-shadow: 0 0 8px var(--neon);
  opacity: 0.45;
}
.rn-sign:hover .rn-sign-arrow span,
.rn-sign:focus-visible .rn-sign-arrow span,
.rn-sign-hot .rn-sign-arrow span { opacity: 1; }

.rn-sign-detail {
  padding: 18px 22px 0;
}
.rn-sign-desc {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.55;
  color: rgba(245, 230, 200, 0.85);
  margin: 0 0 14px;
}
.rn-sign-stats {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 1px dashed rgba(245, 230, 200, 0.2);
  padding-top: 12px;
}
.rn-sign-stats li {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  letter-spacing: 0.06em;
  color: rgba(245, 230, 200, 0.7);
}
.rn-sign-stats li::before { content: '\\2192  '; color: var(--neon); }

.rn-section-window {
  background: rgba(8, 8, 12, 0.4);
  margin: 0 -28px;
  padding: 80px 40px 96px;
  border-top: 1px solid rgba(245, 230, 200, 0.15);
  border-bottom: 1px solid rgba(245, 230, 200, 0.15);
}

.rn-window-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 56px;
  align-items: center;
  max-width: 1240px;
  margin: 0 auto;
}
.rn-window-accent { color: #FF5868; font-style: italic; }
.rn-window-body {
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  line-height: 1.6;
  color: rgba(245, 230, 200, 0.85);
  max-width: 580px;
  margin: 24px 0;
}
.rn-window-list {
  list-style: none;
  padding: 0;
  margin: 16px 0 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px dashed rgba(245, 230, 200, 0.25);
  padding-top: 16px;
}
.rn-window-list li {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: 0.02em;
  color: rgba(245, 230, 200, 0.85);
}
.rn-window-list li::before { content: '+ '; color: #FFB347; }

.rn-dial {
  display: flex;
  align-items: center;
  justify-content: center;
}
.rn-dial-face {
  width: 320px;
  background: rgba(8, 8, 12, 0.85);
  border: 2px solid #FF5868;
  border-radius: 18px;
  padding: 24px 22px;
  box-shadow: 0 0 24px rgba(255, 88, 104, 0.4), inset 0 0 18px rgba(255, 88, 104, 0.18);
  font-family: 'Big Shoulders Display', sans-serif;
}
.rn-dial-label {
  font-size: 11px;
  letter-spacing: 0.24em;
  color: #FFB347;
  font-weight: 500;
}
.rn-dial-num {
  font-size: 84px;
  font-weight: 900;
  color: #FF5868;
  line-height: 1;
  text-shadow: 0 0 12px rgba(255, 88, 104, 0.7);
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin: 4px 0 14px;
}
.rn-dial-num span { font-size: 22px; color: #FFB347; }
.rn-dial-bar {
  position: relative;
  width: 100%;
  height: 10px;
  background: rgba(245, 230, 200, 0.1);
  border-radius: 5px;
  margin-bottom: 18px;
  overflow: hidden;
}
.rn-dial-fill {
  position: absolute;
  inset: 0;
  width: 78%;
  background: linear-gradient(90deg, #FFB347 0%, #FF5868 100%);
  box-shadow: 0 0 12px rgba(255, 88, 104, 0.7);
}
.rn-dial-marks {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 6px;
  pointer-events: none;
}
.rn-dial-marks span {
  width: 1.5px;
  height: 100%;
  background: rgba(0,0,0,0.4);
}
.rn-dial-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  letter-spacing: 0.12em;
  color: rgba(245, 230, 200, 0.85);
  padding: 6px 0;
  border-bottom: 1px dashed rgba(245, 230, 200, 0.18);
}
.rn-dial-val { color: #FFB347; font-weight: 700; }
.rn-dial-status {
  margin-top: 14px;
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0.18em;
  color: #7CC8E8;
  text-shadow: 0 0 12px rgba(124, 200, 232, 0.6);
  text-align: center;
  border: 1.5px solid #7CC8E8;
  padding: 8px;
}

.rn-motels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 22px;
  perspective: 1200px;
}
.rn-motel {
  --motel-i: 0;
  position: relative;
  transform: rotateY(calc(var(--motel-i) * -2.5deg)) translateZ(calc(var(--motel-i) * -28px));
  transform-style: preserve-3d;
  transition: transform 320ms ease;
}
.rn-motel:hover, .rn-motel:focus-within {
  transform: rotateY(0) translateZ(20px);
}
@media (prefers-reduced-motion: reduce) {
  .rn-motel { transform: none; transition: none; }
  .rn-motel:hover, .rn-motel:focus-within { transform: none; }
}
.rn-motel-board {
  background: rgba(8, 8, 12, 0.85);
  border: 1.5px solid var(--neon);
  padding: 24px 22px;
  box-shadow:
    0 0 16px var(--neon),
    inset 0 0 12px rgba(255, 88, 104, 0.05);
  position: relative;
  min-height: 200px;
}
.rn-motel-name {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 600;
  font-size: 26px;
  color: var(--neon);
  text-shadow: 0 0 6px var(--neon), 0 0 18px var(--neon);
  line-height: 1.1;
  margin-bottom: 8px;
}
.rn-motel-line {
  width: 100%;
  height: 1.5px;
  background: var(--neon);
  box-shadow: 0 0 6px var(--neon);
  margin-bottom: 12px;
  opacity: 0.6;
}
.rn-motel-run {
  font-family: 'Big Shoulders Display', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.18em;
  color: #FFB347;
  margin-bottom: 8px;
}
.rn-motel-note {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  color: rgba(245, 230, 200, 0.85);
}

.rn-section-dispatch { padding-bottom: 96px; }

.rn-placard {
  position: relative;
  background: #FFD13B;
  color: #15161B;
  max-width: 720px;
  margin: 0 auto;
  border: 4px solid #15161B;
  padding: 4px;
  box-shadow: 0 0 24px rgba(255, 209, 59, 0.4);
}
.rn-placard-stripe {
  position: absolute;
  inset: 4px;
  background: repeating-linear-gradient(45deg, #FFD13B 0px, #FFD13B 12px, #15161B 12px, #15161B 18px);
  pointer-events: none;
  opacity: 0.3;
  z-index: 0;
}
.rn-placard-inner {
  position: relative;
  z-index: 1;
  background: #FFD13B;
  padding: 28px 32px;
  text-align: center;
}
.rn-placard-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  text-align: left;
  margin-bottom: 16px;
}
.rn-placard-emoji {
  display: grid;
  place-items: center;
  width: 48px; height: 48px;
  background: #15161B;
  color: #FFD13B;
  font-family: 'Big Shoulders Display', sans-serif;
  font-weight: 900;
  font-size: 36px;
  line-height: 1;
  flex-shrink: 0;
}
.rn-placard-eyebrow {
  font-family: 'Big Shoulders Display', sans-serif;
  font-weight: 900;
  font-size: 14px;
  letter-spacing: 0.2em;
  color: #15161B;
}
.rn-placard-headline {
  font-family: 'Big Shoulders Display', sans-serif;
  font-weight: 900;
  font-size: 24px;
  letter-spacing: 0.06em;
  margin-top: 2px;
}
.rn-placard-phone {
  font-family: 'Big Shoulders Display', sans-serif;
  font-weight: 900;
  font-size: clamp(48px, 7vw, 84px);
  line-height: 1;
  color: #15161B;
  letter-spacing: -0.01em;
  margin-bottom: 14px;
}
.rn-placard-meta {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 18px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  letter-spacing: 0.16em;
  color: #15161B;
  font-weight: 600;
}

.rn-footer {
  position: relative;
  z-index: 2;
  border-top: 1px dashed rgba(245, 230, 200, 0.25);
  padding: 18px 4px 4px;
  margin-top: 56px;
}
.rn-footer-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 12px;
}
.rn-footer-cert {
  font-family: 'Big Shoulders Display', sans-serif;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.18em;
  color: #FFB347;
  border: 1px solid rgba(255, 179, 71, 0.45);
  padding: 5px 10px;
}
.rn-footer-credit {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 14px;
  color: rgba(245, 230, 200, 0.7);
  margin: 0;
}

@media (max-width: 880px) {
  .rn-window-grid { grid-template-columns: 1fr; }
  .rn-hero-marquee { font-size: 60px; opacity: 0.4; }
}
`;
