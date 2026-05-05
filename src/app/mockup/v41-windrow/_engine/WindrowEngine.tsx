"use client";

/**
 * WindrowEngine — V41 Windrow
 *
 * Mat-black asphalt with continuous SVG turbulence heat-haze on the lower
 * 30%. Probe thermometer reads 305°F. Cinematic-narrative paving page —
 * the crew's lived sensory truth made visible.
 */

import { useEffect, useMemo, useState } from "react";

const JOBS = [
  {
    id: "01",
    name: "Concord HS lot",
    sf: "44,200 SF",
    matAtScreed: "308°F",
    dewpoint: "44°F",
    crosswind: "6 mph",
    note: "Two-mat overlay on a 1996 binder course. Joint density 92.4% on the longitudinal.",
  },
  {
    id: "02",
    name: "Merrimac driveway",
    sf: "3,860 SF",
    matAtScreed: "302°F",
    dewpoint: "51°F",
    crosswind: "4 mph",
    note: "Tear-out, fresh 4\" gravel base, 2.5\" binder + 1.5\" wearing. Bordered with cobbled apron.",
  },
  {
    id: "03",
    name: "Rt-110 mill-and-fill",
    sf: "2.8 mi",
    matAtScreed: "311°F",
    dewpoint: "39°F",
    crosswind: "8 mph",
    note: "Night work. Tack-coat at 0.08 gal/yd². Three rollers, double-drum + rubber-tire.",
  },
];

const CREW = [
  { role: "Paver Op", name: "Mike Lavoie", years: 22, sticker: "LeeBoy 8520" },
  { role: "Screed Op (L)", name: "Tony Aguiar", years: 14, sticker: "Carlson EZ" },
  { role: "Screed Op (R)", name: "DJ Pereira", years: 9, sticker: "8' extension" },
  { role: "Roller Op #1", name: "Matt Doherty", years: 17, sticker: "Hamm HD12" },
  { role: "Roller Op #2", name: "Kris Boudreau", years: 6, sticker: "Sakai SW650" },
  { role: "Foreman", name: "Frank Quintanilha", years: 31, sticker: "NAPA-cert" },
];

export default function WindrowEngine() {
  const [probeIdx, setProbeIdx] = useState<number | null>(null);
  const [scrollCool, setScrollCool] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(m.matches);
    const onChange = () => setReduce(m.matches);
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const range = h.scrollHeight - h.clientHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, h.scrollTop / range)) : 0;
      setScrollCool(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mat color cools with scroll: cherry → mat-black → slag.
  const matColor = useMemo(() => {
    // 0.0 = cherry/hot (#C0291B), 0.5 = mat-black, 1.0 = slag/cool gray
    const r = Math.round(192 - 130 * scrollCool);
    const g = Math.round(41 + 50 * scrollCool);
    const b = Math.round(27 + 60 * scrollCool);
    return `rgb(${r}, ${g}, ${b})`;
  }, [scrollCool]);

  return (
    <>
      <style>{css}</style>
      <div className="wr-shell">
        <div className="wr-mat-bg" aria-hidden style={{ "--mat-tint": matColor } as React.CSSProperties} />

        {/* Heat haze SVG — bottom 30% */}
        <svg className="wr-haze" aria-hidden>
          <defs>
            <filter id="wr-turb" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence
                type="turbulence"
                baseFrequency={probeIdx !== null ? "0.012 0.04" : "0.008 0.03"}
                numOctaves="2"
                seed="2"
                result="t"
              >
                {!reduce && (
                  <animate
                    attributeName="baseFrequency"
                    dur="9s"
                    values="0.008 0.03; 0.013 0.04; 0.008 0.03"
                    repeatCount="indefinite"
                  />
                )}
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="t" scale={probeIdx !== null ? "16" : "9"} />
            </filter>
            <linearGradient id="wr-haze-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(221,215,203,0)" />
              <stop offset="60%" stopColor="rgba(221,215,203,0.18)" />
              <stop offset="100%" stopColor="rgba(192,41,27,0.08)" />
            </linearGradient>
          </defs>
          <rect
            x="-50"
            y="0"
            width="120%"
            height="100%"
            fill="url(#wr-haze-grad)"
            filter="url(#wr-turb)"
          />
        </svg>

        {/* TOP */}
        <header className="wr-top">
          <div className="wr-mark">
            <span className="wr-mark-1">WINDROW</span>
            <span className="wr-mark-2">ASPHALT &amp; PAVING — NAPA-CERT</span>
          </div>
          <nav className="wr-nav">
            <a href="#window">The Window</a>
            <a href="#mat">The Mat</a>
            <a href="#crew">Crew</a>
            <a href="#bid">Lock a window</a>
          </nav>
        </header>

        {/* HERO */}
        <section className="wr-hero">
          <div className="wr-hero-tag">
            <span className="wr-tag-pill">FRESH OIL — DO NOT DRIVE</span>
          </div>

          <h1 className="wr-h1">
            <span className="wr-h1-1">Mat at <strong>305</strong>.</span>
            <span className="wr-h1-1">Dewpoint at <strong>48</strong>.</span>
            <span className="wr-h1-1">We screed in <strong>14</strong> minutes.</span>
          </h1>

          <p className="wr-sub">
            Driveways, lots, and county roads — laid in the compaction window, not
            after it closes. We watch the dewpoint like farmers and the
            crosswind like sailors.
          </p>

          <div className="wr-ctas">
            <button type="button" className="wr-cta primary">Lock a window</button>
            <button type="button" className="wr-cta ghost">See the temp log</button>
          </div>

          {/* Probe gauge */}
          <div className="wr-probe" aria-label="Live mat temperature: 305 degrees Fahrenheit">
            <div className="wr-probe-stem" aria-hidden>
              <div className="wr-probe-shaft" />
              <div className="wr-probe-tip" />
            </div>
            <div className="wr-probe-readout">
              <div className="wr-probe-num">
                305<span className="wr-probe-deg">°F</span>
              </div>
              <div className="wr-probe-row"><span>WINDOW</span><span className="wr-probe-val">14:36 LEFT</span></div>
              <div className="wr-probe-row"><span>DEW POINT</span><span className="wr-probe-val">48°F</span></div>
              <div className="wr-probe-row"><span>X-WIND</span><span className="wr-probe-val">7 MPH NNE</span></div>
              <div className="wr-probe-bar">
                <span className="wr-probe-fill" style={{ width: "62%" }} />
              </div>
            </div>
          </div>
        </section>

        {/* THE WINDOW */}
        <section id="window" className="wr-window">
          <div className="wr-section-tag">
            <span className="wr-tag-num">§ 01</span>
            <span className="wr-tag-name">THE WINDOW</span>
            <span className="wr-tag-rule" aria-hidden />
          </div>

          <h2 className="wr-h2">
            A 12mph crosswind kills the day. Faster than rain.
          </h2>

          <div className="wr-window-row">
            <p className="wr-window-copy">
              Mix arrives behind the truck at 320°F. We need it on the road above
              275°F before the steel-drum touches it. That's 14 to 18 minutes,
              depending on the haul. Crosswind steals heat from the mat surface
              twice as fast as still air. Dewpoint over 55°F means the moisture
              never leaves the binder. We won't pour into a closing window — we
              schedule around it.
            </p>
            <ul className="wr-window-stats" role="list">
              <li><span>Mix at truck</span><span className="num">320°F</span></li>
              <li><span>Mat at screed (target)</span><span className="num">295–315°F</span></li>
              <li><span>Roller close-up</span><span className="num">≥ 240°F</span></li>
              <li><span>Joint density (target)</span><span className="num">≥ 92%</span></li>
              <li><span>Hard stop wind</span><span className="num">12 mph</span></li>
            </ul>
          </div>
        </section>

        {/* THE MAT */}
        <section id="mat" className="wr-mat">
          <div className="wr-section-tag">
            <span className="wr-tag-num">§ 02</span>
            <span className="wr-tag-name">THE MAT</span>
            <span className="wr-tag-rule" aria-hidden />
          </div>

          <h2 className="wr-h2">Recent jobs, logged at the screed.</h2>

          <ul className="wr-jobs" role="list">
            {JOBS.map((j, i) => (
              <li
                key={j.id}
                className={`wr-job ${probeIdx === i ? "probed" : ""}`}
                onMouseEnter={() => setProbeIdx(i)}
                onMouseLeave={() => setProbeIdx(null)}
                onFocus={() => setProbeIdx(i)}
                onBlur={() => setProbeIdx(null)}
                tabIndex={0}
              >
                <div className="wr-job-head">
                  <span className="wr-job-id">{j.id}</span>
                  <span className="wr-job-name">{j.name}</span>
                  <span className="wr-job-sf">{j.sf}</span>
                </div>
                <div className="wr-job-stats">
                  <div><span>MAT @ SCREED</span><b>{j.matAtScreed}</b></div>
                  <div><span>DEWPOINT</span><b>{j.dewpoint}</b></div>
                  <div><span>X-WIND</span><b>{j.crosswind}</b></div>
                </div>
                <p className="wr-job-note">{j.note}</p>
                <div className="wr-job-probe-line" aria-hidden>
                  <span className="wr-job-probe-tip" />
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* CREW */}
        <section id="crew" className="wr-crew">
          <div className="wr-section-tag">
            <span className="wr-tag-num">§ 03</span>
            <span className="wr-tag-name">CREW</span>
            <span className="wr-tag-rule" aria-hidden />
          </div>

          <h2 className="wr-h2">Hard-hat stickers, by name.</h2>

          <ul className="wr-crew-grid" role="list">
            {CREW.map((c) => (
              <li key={c.name} className="wr-crew-card" tabIndex={0}>
                <div className="wr-crew-hat" aria-hidden>
                  <svg viewBox="0 0 80 64">
                    <path d="M 6 50 Q 40 6 74 50 Z" fill="#FF8A00" stroke="#1F0F00" strokeWidth="1.5" />
                    <rect x="6" y="48" width="68" height="6" fill="#1F0F00" />
                    <rect x="36" y="22" width="8" height="22" fill="#1F0F00" />
                  </svg>
                  <div className="wr-sticker">{c.sticker}</div>
                </div>
                <div className="wr-crew-role">{c.role}</div>
                <div className="wr-crew-name">{c.name}</div>
                <div className="wr-crew-years">{c.years} yrs</div>
              </li>
            ))}
          </ul>
        </section>

        {/* BID */}
        <section id="bid" className="wr-bid">
          <h2 className="wr-h2 wr-h2-center">Lock a window before the season closes.</h2>
          <p className="wr-bid-sub">
            New England paving runs late April through mid-November. We book by
            the week, not by the day, and we don't pour into rain or a closing
            dewpoint. Send us the address; we'll come measure.
          </p>
          <div className="wr-ctas wr-ctas-center">
            <button type="button" className="wr-cta primary">Lock a window</button>
            <button type="button" className="wr-cta ghost">Call dispatch</button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="wr-foot">
          <div className="wr-foot-stamp" aria-hidden>
            ▮ FRESH OIL · NAPA #4827 · ESTABLISHED 1991
          </div>
          <div className="wr-foot-row">
            <div>
              <div className="wr-foot-h">Yard</div>
              <div>414 Elm St, Lawrence MA</div>
              <div>5:30am tailgate · M–F</div>
            </div>
            <div>
              <div className="wr-foot-h">Dispatch</div>
              <div>(978) 555-0117</div>
              <div>scheduling@windrow.test</div>
            </div>
            <div>
              <div className="wr-foot-h">Disclaimer</div>
              <div>Fresh oil cures 24–48hr. Tire scuffing fades after the first warm day. Sealcoat at year three.</div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

  .wr-shell {
    --mat: #0E0B09;
    --mat-2: #1A140F;
    --steam: #DDD7CB;
    --cherry: #C0291B;
    --slag: #6B6258;
    --orange: #FF8A00;
    --mat-tint: #0E0B09;
    font-family: 'Inter', sans-serif;
    color: var(--steam);
    background: var(--mat);
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }
  .wr-mat-bg {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background:
      radial-gradient(ellipse at 50% 100%, rgba(192,41,27,0.30), transparent 55%),
      linear-gradient(180deg, #1B1611 0%, var(--mat) 38%, var(--mat-2) 100%);
    transition: background 600ms ease-out;
  }
  .wr-mat-bg::after {
    content: "";
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 50% 110%, var(--mat-tint), transparent 50%);
    opacity: 0.45;
    mix-blend-mode: overlay;
    transition: background 800ms ease-out;
  }
  .wr-haze {
    position: fixed;
    left: 0; right: 0; bottom: 0; height: 36vh;
    width: 100%;
    z-index: 0;
    pointer-events: none;
    mix-blend-mode: screen;
    opacity: 0.85;
  }
  .wr-shell > *:not(.wr-haze):not(.wr-mat-bg) { position: relative; z-index: 1; }

  .wr-top {
    display: flex; align-items: center; justify-content: space-between;
    padding: 22px 48px;
    border-bottom: 1px solid rgba(221,215,203,0.10);
  }
  .wr-mark { display: flex; flex-direction: column; line-height: 1; }
  .wr-mark-1 {
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 26px;
    letter-spacing: 0.08em;
    color: var(--steam);
  }
  .wr-mark-2 {
    margin-top: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.22em;
    color: var(--slag);
  }
  .wr-nav { display: flex; gap: 22px; }
  .wr-nav a {
    color: var(--steam); text-decoration: none;
    font-family: 'Oswald', sans-serif;
    font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;
    padding: 6px 0; border-bottom: 1px solid transparent;
    transition: color 180ms, border-color 180ms;
  }
  .wr-nav a:hover, .wr-nav a:focus-visible {
    color: var(--cherry); border-bottom-color: var(--cherry); outline: none;
  }

  .wr-hero {
    padding: 80px 48px 100px;
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 56px;
    align-items: end;
  }
  @media (max-width: 980px) { .wr-hero { grid-template-columns: 1fr; } }

  .wr-hero-tag { margin-bottom: 18px; }
  .wr-tag-pill {
    display: inline-block;
    padding: 6px 12px;
    background: #F4D74D;
    color: #181307;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    border: 1.5px solid #1F1A0E;
    transform: skewX(-6deg);
  }

  .wr-h1 {
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: clamp(42px, 6vw, 96px);
    line-height: 0.95;
    letter-spacing: -0.005em;
    text-transform: uppercase;
    margin: 0 0 24px 0;
    color: var(--steam);
    text-shadow: 0 2px 24px rgba(0,0,0,0.6);
  }
  .wr-h1-1 { display: block; }
  .wr-h1 strong { color: var(--cherry); font-weight: 700; }

  .wr-sub {
    font-size: 17px;
    line-height: 1.5;
    color: #C2BCB0;
    max-width: 56ch;
    margin: 0 0 28px 0;
  }
  .wr-ctas { display: flex; gap: 14px; flex-wrap: wrap; }
  .wr-ctas-center { justify-content: center; }

  .wr-cta {
    font-family: 'Oswald', sans-serif;
    font-size: 13px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    padding: 14px 22px;
    background: transparent;
    color: var(--steam);
    border: 1.5px solid var(--steam);
    cursor: pointer;
    transition: background 200ms, color 200ms, transform 200ms, box-shadow 200ms;
  }
  .wr-cta.primary {
    background: var(--cherry);
    color: #FFF6F0;
    border-color: var(--cherry);
  }
  .wr-cta.primary:hover, .wr-cta.primary:focus-visible {
    background: #DD3623;
    box-shadow: 0 0 24px rgba(192,41,27,0.5);
    transform: translateY(-1px);
    outline: none;
  }
  .wr-cta.ghost:hover, .wr-cta.ghost:focus-visible {
    background: var(--steam); color: var(--mat); outline: none;
  }

  .wr-probe {
    position: relative;
    background: linear-gradient(180deg, #2A211A, #15110D);
    border: 1px solid rgba(221,215,203,0.18);
    box-shadow: 0 0 60px rgba(192,41,27,0.20), inset 0 0 30px rgba(0,0,0,0.5);
    padding: 22px 22px 18px;
  }
  .wr-probe-stem {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    width: 18px;
    height: 60px;
    pointer-events: none;
  }
  .wr-probe-shaft {
    position: absolute; left: 50%; transform: translateX(-50%);
    top: 0;
    width: 4px; height: 48px;
    background: linear-gradient(180deg, #B8B6B0, #7A7872);
    box-shadow: 0 0 0 1px #1A1814 inset, 0 0 8px rgba(0,0,0,0.6);
  }
  .wr-probe-tip {
    position: absolute; left: 50%; transform: translateX(-50%);
    bottom: 0;
    width: 8px; height: 12px;
    background: linear-gradient(180deg, #C0291B, #6B1812);
    border-radius: 0 0 50% 50%;
    box-shadow: 0 0 12px rgba(192,41,27,0.7);
  }
  .wr-probe-num {
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 76px;
    line-height: 1;
    color: #F4D74D;
    text-shadow: 0 0 18px rgba(244,215,77,0.4), 0 0 0 rgba(0,0,0,0.5);
    letter-spacing: -0.02em;
  }
  .wr-probe-deg {
    font-size: 26px; color: var(--steam); margin-left: 4px;
  }
  .wr-probe-row {
    display: flex; justify-content: space-between;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    color: var(--slag);
    padding: 4px 0;
    border-bottom: 1px dashed rgba(221,215,203,0.12);
  }
  .wr-probe-row:last-of-type { border-bottom: 0; }
  .wr-probe-val { color: var(--steam); }
  .wr-probe-bar {
    height: 6px;
    background: rgba(221,215,203,0.10);
    border: 1px solid rgba(221,215,203,0.20);
    margin-top: 10px;
    overflow: hidden;
  }
  .wr-probe-fill {
    display: block; height: 100%;
    background: linear-gradient(90deg, var(--cherry), var(--orange));
    box-shadow: 0 0 8px rgba(255,138,0,0.5);
  }

  .wr-section-tag {
    display: flex; align-items: center; gap: 16px;
    padding: 0 48px;
    margin-bottom: 22px;
  }
  .wr-tag-num {
    font-family: 'Oswald', sans-serif;
    font-size: 22px;
    color: var(--cherry);
    font-weight: 700;
    letter-spacing: 0.06em;
  }
  .wr-tag-name {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: 0.32em;
    color: var(--steam);
  }
  .wr-tag-rule { flex: 1; height: 1px; background: linear-gradient(90deg, var(--slag), transparent); }

  .wr-h2 {
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: clamp(28px, 3.6vw, 52px);
    line-height: 1.05;
    text-transform: uppercase;
    color: var(--steam);
    padding: 0 48px;
    margin: 0 0 32px 0;
    max-width: 28ch;
  }
  .wr-h2-center { padding: 0; margin-left: auto; margin-right: auto; max-width: 24ch; text-align: center; }

  .wr-window { padding: 40px 0 80px; border-top: 1px solid rgba(221,215,203,0.08); }
  .wr-window-row {
    display: grid; grid-template-columns: 1.4fr 1fr;
    gap: 40px;
    padding: 0 48px;
  }
  @media (max-width: 880px) { .wr-window-row { grid-template-columns: 1fr; } }
  .wr-window-copy {
    font-size: 16px; line-height: 1.6; color: #C2BCB0; margin: 0;
  }
  .wr-window-stats {
    list-style: none; padding: 0; margin: 0;
    border-top: 1px solid rgba(221,215,203,0.18);
    border-bottom: 1px solid rgba(221,215,203,0.18);
  }
  .wr-window-stats li {
    display: flex; justify-content: space-between;
    padding: 12px 4px;
    border-bottom: 1px dashed rgba(221,215,203,0.10);
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; letter-spacing: 0.10em;
    color: var(--slag);
  }
  .wr-window-stats li:last-child { border-bottom: 0; }
  .wr-window-stats .num { color: var(--cherry); font-weight: 700; }

  .wr-mat { padding: 40px 0 80px; border-top: 1px solid rgba(221,215,203,0.08); }
  .wr-jobs {
    list-style: none; padding: 0 48px; margin: 0;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }
  .wr-job {
    position: relative;
    padding: 22px 22px 26px;
    background: linear-gradient(180deg, rgba(26,20,15,0.85), rgba(14,11,9,0.85));
    border: 1px solid rgba(221,215,203,0.14);
    cursor: default;
    overflow: hidden;
    transition: border-color 220ms, transform 220ms, box-shadow 220ms;
  }
  .wr-job:hover, .wr-job:focus-visible, .wr-job.probed {
    border-color: var(--cherry);
    box-shadow: 0 0 28px rgba(192,41,27,0.20);
    transform: translateY(-2px);
    outline: none;
  }
  .wr-job-head {
    display: flex; align-items: baseline; gap: 12px;
    margin-bottom: 14px;
  }
  .wr-job-id {
    font-family: 'Oswald', sans-serif; font-weight: 700;
    font-size: 22px; color: var(--cherry);
  }
  .wr-job-name {
    flex: 1;
    font-family: 'Oswald', sans-serif; font-weight: 500;
    text-transform: uppercase;
    font-size: 16px; letter-spacing: 0.04em;
    color: var(--steam);
  }
  .wr-job-sf {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: 0.18em;
    color: var(--slag);
  }
  .wr-job-stats {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
    margin-bottom: 12px;
  }
  .wr-job-stats > div {
    background: rgba(221,215,203,0.04);
    padding: 8px 10px;
    border-left: 2px solid rgba(192,41,27,0.7);
  }
  .wr-job-stats span {
    display: block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; letter-spacing: 0.18em;
    color: var(--slag);
  }
  .wr-job-stats b {
    font-family: 'Oswald', sans-serif; font-weight: 700;
    font-size: 16px;
    color: var(--steam);
  }
  .wr-job-note {
    font-size: 14px; line-height: 1.55; color: #B8B2A6; margin: 0;
  }
  .wr-job-probe-line {
    position: absolute; left: 22px; right: 22px; bottom: 12px;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--cherry), transparent);
    opacity: 0;
    transform: scaleX(0); transform-origin: 0 0;
    transition: opacity 220ms, transform 360ms ease-out;
  }
  .wr-job:hover .wr-job-probe-line, .wr-job.probed .wr-job-probe-line {
    opacity: 1; transform: scaleX(1);
  }
  .wr-job-probe-tip {
    position: absolute; right: -3px; top: -3px;
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--cherry);
    box-shadow: 0 0 12px var(--cherry);
  }

  .wr-crew { padding: 40px 0 80px; border-top: 1px solid rgba(221,215,203,0.08); }
  .wr-crew-grid {
    list-style: none; padding: 0 48px; margin: 0;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 14px;
  }
  .wr-crew-card {
    padding: 18px 18px 20px;
    background: rgba(20,15,11,0.7);
    border: 1px solid rgba(221,215,203,0.10);
    cursor: default;
    transition: border-color 220ms, transform 220ms;
  }
  .wr-crew-card:hover, .wr-crew-card:focus-visible {
    border-color: var(--orange); transform: translateY(-2px); outline: none;
  }
  .wr-crew-hat {
    position: relative;
    width: 80px; height: 56px;
    margin-bottom: 10px;
  }
  .wr-crew-hat svg { width: 100%; height: 100%; }
  .wr-sticker {
    position: absolute; bottom: 9px; left: 8px; right: 8px;
    background: var(--steam); color: #1F1A0E;
    font-family: 'JetBrains Mono', monospace;
    font-size: 8px; letter-spacing: 0.12em; text-align: center;
    padding: 1px 0;
    border-radius: 1px;
    transform: rotate(-3deg);
  }
  .wr-crew-role {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; letter-spacing: 0.22em;
    color: var(--orange);
    margin-bottom: 4px;
  }
  .wr-crew-name {
    font-family: 'Oswald', sans-serif; font-weight: 700;
    font-size: 17px;
    color: var(--steam);
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }
  .wr-crew-years {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; color: var(--slag);
    margin-top: 4px;
  }

  .wr-bid {
    padding: 96px 48px 100px;
    border-top: 1px solid rgba(221,215,203,0.10);
    text-align: center;
  }
  .wr-bid-sub {
    font-size: 17px; line-height: 1.55; color: #C2BCB0;
    max-width: 56ch; margin: 0 auto 28px;
  }

  .wr-foot {
    padding: 36px 48px 32px;
    border-top: 2px solid var(--cherry);
    background: linear-gradient(180deg, transparent, rgba(0,0,0,0.5));
  }
  .wr-foot-stamp {
    font-family: 'Oswald', sans-serif;
    font-size: 13px; letter-spacing: 0.32em;
    color: var(--orange);
    text-transform: uppercase;
    margin-bottom: 18px;
  }
  .wr-foot-row {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
    font-size: 13px; line-height: 1.55; color: #C2BCB0;
  }
  @media (max-width: 720px) { .wr-foot-row { grid-template-columns: 1fr; } }
  .wr-foot-h {
    font-family: 'Oswald', sans-serif;
    font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--steam); margin-bottom: 6px;
  }

  @media (prefers-reduced-motion: reduce) {
    .wr-haze feTurbulence animate { display: none; }
    .wr-cta, .wr-job, .wr-crew-card, .wr-mat-bg { transition: none !important; }
    .wr-job-probe-line { transition: none !important; }
  }
`;
