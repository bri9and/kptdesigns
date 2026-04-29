"use client";

/**
 * BucketTruckEngine — V47 Bucket Truck
 *
 * Cab-eye-view from a bucket-truck cab. Vinyl dash bottom, gauges across
 * lower band, view climbs the boom into a maple canopy. Boom rises with
 * scroll (camera tilt + parallax foreground). Hover lifts the bucket.
 */

import { useEffect, useRef, useState } from "react";

const LIFTS = [
  {
    altitude: "62 ft",
    address: "Manchester · NH",
    species: "Sugar maple — co-dom split",
    body:
      "Storm-shed lateral over a slate roof. Bucket up, single-line lower with a Port-a-Wrap on the trunk, no chips on the slate. Roof tarped, shrubs covered, walked the property at sundown.",
    note: "Aerial saw + Petzl Sequoia",
  },
  {
    altitude: "78 ft",
    address: "Concord · MA",
    species: "Northern red oak",
    body:
      "Crown raise to 14 ft over the new patio. Boom up the south side, climb-down on a static line for the inner-canopy work. ANSI A300 cuts only — laterals at one-third minimum.",
    note: "Climb-down · DRT",
  },
  {
    altitude: "45 ft",
    address: "Acton · MA",
    species: "Eastern white pine — leader removal",
    body:
      "Co-dominant leader stripped, included bark visible at the union. Bucket up, two-cut top, lowered piece-by-piece on a 3/4-inch double-braid. Drop zone signed at the end of the driveway.",
    note: "Port-a-Wrap · 3/4 db",
  },
  {
    altitude: "92 ft",
    address: "Keene · NH",
    species: "Eastern hemlock — full removal",
    body:
      "Insect-killed hemlock against power. Eversource line-clear coordinated, two utility flaggers on the wire side. Spar pole rigged top-down, brush chipped curbside, log-length stacked for the homeowner.",
    note: "Spar pole · top-down",
  },
];

const SADDLE = [
  { item: "Saddle", make: "Petzl Sequoia SRT", note: "Bridge replaced annual; D-ring inspected at every climb." },
  { item: "Friction", make: "Notch Rope Runner Pro", note: "Primary friction — single-rope efficient on 11mm." },
  { item: "Lanyard", make: "Yale Cougar Blue, 10ft", note: "Adjustable steel-core flipline, anti-chafe leather." },
  { item: "Ascender", make: "ART Ropeguide TwinLine", note: "Foot-ascender pairing for steep skyline climbs." },
  { item: "Prusiks", make: "8mm Ocean Polyester", note: "Rebuilt every 90 days regardless of wear pattern." },
  { item: "Helmet", make: "Petzl Vertex Vent", note: "ANSI Z89.1 Type 1 Class C · earmuffs, face-shield." },
];

const CHIPPER = [
  { unit: "Chip Truck", make: "International 4300 · 16-yd dump", year: "2021", svc: "MAR 04 — 2026", op: "Day-haul + brush" },
  { unit: "Bucket Truck", make: "Altec LRV-55 · 60-ft working height", year: "2019", svc: "FEB 18 — 2026", op: "Day-of climbs + storm" },
  { unit: "Brush Chipper", make: "Vermeer BC1500 · 18 in. capacity", year: "2022", svc: "FEB 02 — 2026", op: "Curbside + on-deck" },
  { unit: "Mini Skid", make: "Toro Dingo TX 1000 · grapple bucket", year: "2024", svc: "MAR 30 — 2026", op: "Log haul + brush prep" },
  { unit: "Stump Grinder", make: "Carlton SP4012 · self-propelled", year: "2020", svc: "MAR 17 — 2026", op: "Same-day grinds" },
  { unit: "Climbing Rig", make: "Knaack 60 + saddle locker", year: "—", svc: "Daily inventory", op: "Crew kit, never shared" },
];

export default function BucketTruckEngine() {
  const [scroll, setScroll] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Boom rises with scroll. Bucket altitude offset increases with hovered lift.
  const tilt = Math.min(scroll * 0.04, 18);
  const canopyOffset = -Math.min(scroll * 0.18, 240);
  const dashOffset = Math.min(scroll * 0.22, 200);
  const bucketAlt = hovered === null ? 0 : -50 - hovered * 18;

  // Animate gauge needles
  const needle = (base: number) => base + Math.sin(scroll * 0.005) * 6;

  return (
    <>
      <style>{css}</style>
      <div className="bt-shell">
        {/* CAB CANOPY (sky + maple canopy at top) */}
        <div className="bt-cab" style={{ transform: `perspective(1200px) rotateX(${tilt * 0.3}deg)` }}>
          <div className="bt-sky" style={{ transform: `translateY(${canopyOffset * 0.4}px)` }}>
            <div className="bt-sun" />
          </div>
          <svg
            className="bt-canopy"
            viewBox="0 0 1600 600"
            preserveAspectRatio="none"
            aria-hidden
            style={{ transform: `translateY(${canopyOffset}px)` }}
          >
            <path
              d="M0 320 C 120 200 220 240 320 200 S 480 160 580 220 S 760 180 880 240 S 1080 200 1200 260 S 1420 220 1600 280 L 1600 0 L 0 0 Z"
              fill="#2A331F"
            />
            <path
              d="M0 380 C 140 280 280 320 400 280 S 580 240 720 300 S 920 260 1080 320 S 1300 280 1600 340 L 1600 600 L 0 600 Z"
              fill="#3F4B33"
              opacity="0.9"
            />
          </svg>

          {/* Boom and bucket */}
          <div
            className="bt-boom"
            style={{ transform: `translate(-50%, ${bucketAlt}px) rotate(${-tilt * 0.4}deg)` }}
            aria-hidden
          >
            <div className="bt-boom-arm" />
            <div className="bt-boom-arm bt-boom-arm-2" />
            <div className="bt-bucket">
              <span className="bt-bucket-rope" />
              <span className="bt-bucket-rope bt-bucket-rope-2" />
            </div>
          </div>

          <div className="bt-hero-content">
            <div className="bt-hero-deco">
              <span className="bt-deco-tape" aria-hidden />
              <span className="bt-hero-tag">CAB · BUCKET 4 · 04 · 28</span>
              <span className="bt-deco-tape" aria-hidden />
            </div>
            <h1 className="bt-hero-h1">
              <span className="bt-hero-line">BUCKET UP.</span>
              <span className="bt-hero-line">TIE IN.</span>
              <span className="bt-hero-line bt-hero-orange">DROP ZONE SIGNED.</span>
            </h1>
            <p className="bt-hero-sub">
              Tree service from the cab to the chipper — trim, removal, and storm
              work with full ANSI Z133 work plans. ISA-certified climbers, line-clear
              coordinated with Eversource and PSNH, after-hours storm line answered
              the same night.
            </p>
            <div className="bt-cta-row">
              <a href="#lifts" className="bt-cta bt-cta-primary">
                BOOM UP A QUOTE
              </a>
              <a href="#lifts" className="bt-cta bt-cta-ghost">
                See the rigging →
              </a>
            </div>
          </div>
        </div>

        {/* DASH & GAUGES */}
        <div className="bt-dash" style={{ transform: `translateY(${dashOffset * 0.05}px)` }} aria-hidden>
          <div className="bt-vinyl" />
          <div className="bt-cluster">
            <Gauge label="BOOM PSI" value={needle(140)} max={200} unit="psi" />
            <Gauge label="REACH" value={Math.min(20 + scroll * 0.05, 92)} max={100} unit="ft" />
            <Gauge label="ENGINE" value={needle(72)} max={120} unit="°C" />
            <Gauge label="OUTRIGGER" value={needle(85)} max={100} unit="%" />
          </div>
          <div className="bt-dash-stripe" />
          <div className="bt-dash-sticker">
            <div>UNDERSTORY ARBORICULTURE</div>
            <div>ISA · MA-6118A · TRAQ #18221</div>
          </div>
        </div>

        {/* LIFTS */}
        <section id="lifts" className="bt-lifts">
          <header className="bt-section-head">
            <span className="bt-eye">TODAY&apos;S LIFT · 2026 SEASON</span>
            <h2 className="bt-h2">Worksites at altitude.</h2>
            <p className="bt-section-sub">
              Hover a lift. The bucket rises in the cab — visualization of where the
              climber was, working height noted, every entry pulled from the work
              plan.
            </p>
          </header>
          <div className="bt-lift-list">
            {LIFTS.map((l, i) => (
              <article
                key={l.address}
                className={`bt-lift${hovered === i ? " hot" : ""}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
                aria-label={`${l.address} — ${l.altitude}`}
              >
                <div className="bt-lift-alt">{l.altitude}</div>
                <div className="bt-lift-text">
                  <div className="bt-lift-meta">
                    <span className="bt-lift-addr">{l.address}</span>
                    <span className="bt-lift-species">{l.species}</span>
                  </div>
                  <p className="bt-lift-body">{l.body}</p>
                  <span className="bt-lift-note">{l.note}</span>
                </div>
                <div className="bt-lift-arrow" aria-hidden>↗</div>
              </article>
            ))}
          </div>
        </section>

        {/* SADDLE POCKET */}
        <section className="bt-saddle">
          <header className="bt-section-head">
            <span className="bt-eye">THE SADDLE POCKET</span>
            <h2 className="bt-h2">What&apos;s on the side D.</h2>
          </header>
          <div className="bt-saddle-grid">
            {SADDLE.map((s) => (
              <div key={s.item} className="bt-saddle-card">
                <div className="bt-saddle-item">{s.item}</div>
                <div className="bt-saddle-make">{s.make}</div>
                <p className="bt-saddle-note">{s.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CHIPPER */}
        <section className="bt-chipper">
          <header className="bt-section-head">
            <span className="bt-eye">THE CHIPPER · FLEET REGISTER</span>
            <h2 className="bt-h2">Equipment on the day-board.</h2>
          </header>
          <table className="bt-table">
            <thead>
              <tr>
                <th>UNIT</th>
                <th>MAKE / MODEL</th>
                <th>YEAR</th>
                <th>LAST SERVICE</th>
                <th>OPERATION</th>
              </tr>
            </thead>
            <tbody>
              {CHIPPER.map((row) => (
                <tr key={row.unit}>
                  <td className="bt-table-unit">{row.unit}</td>
                  <td>{row.make}</td>
                  <td>{row.year}</td>
                  <td>{row.svc}</td>
                  <td className="bt-table-op">{row.op}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <footer className="bt-footer">
          <div className="bt-foot-stencil">
            <span>UNDERSTORY ARBORICULTURE · MMXXVI</span>
            <span>·</span>
            <span>(978) 555-0190</span>
            <span>·</span>
            <span>STORM LINE 24 HR</span>
          </div>
          <div className="bt-foot-grid">
            <div>
              <div className="bt-foot-label">YARD</div>
              <div>312 Boston Post Rd · Sudbury, MA</div>
            </div>
            <div>
              <div className="bt-foot-label">CREDENTIALS</div>
              <div>ISA-Cert · TCIA-A · MA Pesticide AT-23-91</div>
            </div>
            <div>
              <div className="bt-foot-label">INSURANCE</div>
              <div>$2M GL · $5M umbrella · WC on file</div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

function Gauge({ label, value, max, unit }: { label: string; value: number; max: number; unit: string }) {
  const pct = Math.max(0, Math.min(1, value / max));
  const angle = -120 + pct * 240;
  return (
    <div className="bt-gauge" aria-label={`${label} ${Math.round(value)} ${unit}`}>
      <svg viewBox="0 0 100 80" className="bt-gauge-svg">
        <circle cx="50" cy="50" r="36" fill="#0E0B08" stroke="#2C2620" strokeWidth="2" />
        <path d="M 18 60 A 36 36 0 0 1 82 60" fill="none" stroke="#3A2F23" strokeWidth="3" />
        {Array.from({ length: 11 }).map((_, i) => {
          const a = -120 + i * 24;
          const x1 = 50 + Math.cos((a * Math.PI) / 180) * 30;
          const y1 = 50 + Math.sin((a * Math.PI) / 180) * 30;
          const x2 = 50 + Math.cos((a * Math.PI) / 180) * 36;
          const y2 = 50 + Math.sin((a * Math.PI) / 180) * 36;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#B98A2A" strokeWidth="1" />;
        })}
        <line
          x1="50"
          y1="50"
          x2={50 + Math.cos((angle * Math.PI) / 180) * 30}
          y2={50 + Math.sin((angle * Math.PI) / 180) * 30}
          stroke="#E76F2A"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="50" cy="50" r="3" fill="#E76F2A" />
      </svg>
      <div className="bt-gauge-label">{label}</div>
      <div className="bt-gauge-value">
        {Math.round(value)}
        <span className="bt-gauge-unit">{unit}</span>
      </div>
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600&family=Archivo+Narrow:wght@400;500;700&display=swap');

  .bt-shell {
    --dash: #1F1B17;
    --vinyl: #14110E;
    --orange: #E76F2A;
    --amber: #B98A2A;
    --cream: #F2E2C2;
    --rust: #6B3815;
    position: relative;
    min-height: 100vh; overflow: hidden;
    font-family: 'Inter', system-ui, sans-serif;
    background: var(--dash); color: var(--cream);
  }

  .bt-cab {
    position: relative;
    height: 760px;
    overflow: hidden;
    transform-origin: 50% 100%;
    will-change: transform;
    background: linear-gradient(180deg, #5C7C92 0%, #7A99B0 28%, #4A5A4C 60%, #2A331F 100%);
  }
  .bt-sky {
    position: absolute; top: 0; left: 0; right: 0; height: 60%;
    background: linear-gradient(180deg, #6F90A8, #91B0C5);
    will-change: transform;
  }
  .bt-sun {
    position: absolute; top: 50px; right: 12%;
    width: 130px; height: 130px;
    background: radial-gradient(circle, rgba(255,235,180,0.85), rgba(255,235,180,0.0) 70%);
    border-radius: 50%;
  }
  .bt-canopy {
    position: absolute; left: 0; right: 0; top: 0;
    width: 100%; height: 600px;
    will-change: transform;
  }

  .bt-boom {
    position: absolute; left: 50%; bottom: 28%;
    width: 220px; height: 320px;
    transform-origin: 50% 100%;
    z-index: 4;
    transition: transform 280ms cubic-bezier(0.22, 0.96, 0.32, 1);
  }
  .bt-boom-arm {
    position: absolute; bottom: 0; left: 50%;
    width: 18px; height: 220px;
    transform: translateX(-50%) rotate(-12deg);
    transform-origin: 50% 100%;
    background: linear-gradient(180deg, #9C9183, #5A5247);
    box-shadow: 2px 2px 6px rgba(0,0,0,0.4), inset -3px 0 0 rgba(0,0,0,0.3);
    border-radius: 4px;
  }
  .bt-boom-arm-2 {
    height: 160px;
    transform: translateX(-50%) rotate(-12deg) translate(20px, -180px);
    background: linear-gradient(180deg, #B5A893, #6E6557);
  }
  .bt-bucket {
    position: absolute; top: -10px; right: -34px;
    width: 88px; height: 80px;
    background: linear-gradient(180deg, var(--orange), var(--rust));
    border: 3px solid #2A1606;
    border-radius: 6px 6px 12px 12px;
    box-shadow: 4px 6px 14px rgba(0,0,0,0.5);
  }
  .bt-bucket-rope {
    position: absolute; top: -130px; left: 14px;
    width: 2px; height: 130px;
    background: #C8A572;
    transform: rotate(2deg);
  }
  .bt-bucket-rope-2 { left: auto; right: 14px; transform: rotate(-2deg); }

  .bt-hero-content {
    position: relative; z-index: 5;
    max-width: 1180px; margin: 0 auto;
    padding: 80px 48px 0;
  }
  .bt-hero-deco {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 24px;
  }
  .bt-deco-tape {
    flex: 1; max-width: 80px; height: 14px;
    background-image: repeating-linear-gradient(
      135deg, var(--orange) 0 8px, #2A1606 8px 16px
    );
  }
  .bt-hero-tag {
    font-family: 'Archivo Narrow', sans-serif; font-weight: 700;
    font-size: 13px; letter-spacing: 0.28em; color: #2A1606;
    background: var(--cream); padding: 6px 14px;
    border: 2px solid #2A1606;
  }
  .bt-hero-h1 {
    font-family: 'Anton', sans-serif;
    font-size: clamp(56px, 9vw, 132px);
    line-height: 0.92; letter-spacing: 0.02em;
    margin: 0 0 24px;
    color: var(--cream);
    text-shadow: 0 6px 22px rgba(0,0,0,0.45);
  }
  .bt-hero-line { display: block; }
  .bt-hero-orange { color: var(--orange); }
  .bt-hero-sub {
    font-size: 18px; line-height: 1.65; max-width: 560px;
    color: rgba(242,226,194,0.92);
    background: rgba(20,17,14,0.55);
    padding: 16px 20px;
    border-left: 4px solid var(--orange);
    margin: 0 0 32px;
  }
  .bt-cta-row { display: flex; gap: 16px; flex-wrap: wrap; }
  .bt-cta {
    display: inline-flex; align-items: center;
    padding: 14px 24px; text-decoration: none;
    font-family: 'Anton', sans-serif;
    letter-spacing: 0.18em; font-size: 15px;
    border: 3px solid #2A1606;
    transition: transform 200ms ease, background 200ms ease, color 200ms ease;
  }
  .bt-cta-primary {
    background: var(--orange); color: #2A1606;
  }
  .bt-cta-primary:hover, .bt-cta-primary:focus-visible {
    background: #FFA060; transform: translateY(-2px); outline: none;
    box-shadow: 0 6px 0 #2A1606;
  }
  .bt-cta-ghost {
    background: var(--cream); color: #2A1606;
  }
  .bt-cta-ghost:hover, .bt-cta-ghost:focus-visible {
    background: var(--orange); transform: translateY(-2px); outline: none;
    box-shadow: 0 6px 0 #2A1606;
  }

  .bt-dash {
    position: relative;
    background: var(--vinyl);
    border-top: 4px solid #08070A;
    padding: 22px 36px 18px;
    z-index: 6;
    will-change: transform;
  }
  .bt-vinyl {
    position: absolute; inset: 0; pointer-events: none; opacity: 0.6;
    background-image:
      repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 6px),
      radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: auto, 4px 4px;
  }
  .bt-cluster {
    position: relative;
    display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 28px;
    max-width: 1080px; margin: 0 auto 16px;
  }
  .bt-gauge {
    display: flex; flex-direction: column; align-items: center; gap: 4px;
  }
  .bt-gauge-svg { width: 110px; height: 88px; }
  .bt-gauge-label {
    font-family: 'Archivo Narrow', sans-serif; font-weight: 700;
    letter-spacing: 0.24em; font-size: 11px;
    color: var(--amber);
  }
  .bt-gauge-value {
    font-family: 'Anton', sans-serif; font-size: 22px;
    color: var(--orange);
    font-variant-numeric: tabular-nums;
  }
  .bt-gauge-unit {
    font-size: 11px; margin-left: 4px; color: var(--amber);
  }
  .bt-dash-stripe {
    height: 6px; margin: 14px 0 8px;
    background-image: repeating-linear-gradient(
      90deg, var(--orange) 0 12px, #2A1606 12px 24px
    );
  }
  .bt-dash-sticker {
    position: absolute; top: 12px; right: 36px;
    background: var(--orange); color: #2A1606;
    padding: 8px 14px; transform: rotate(-2deg);
    font-family: 'Archivo Narrow', sans-serif; font-weight: 700;
    border: 3px solid #2A1606;
    box-shadow: 3px 3px 0 #2A1606;
    text-align: center; font-size: 12px;
    letter-spacing: 0.12em;
  }
  .bt-dash-sticker div:first-child {
    font-family: 'Anton', sans-serif; letter-spacing: 0.18em; font-size: 13px;
  }

  .bt-section-head {
    max-width: 1180px; margin: 0 auto 32px;
    padding: 0 48px;
  }
  .bt-eye {
    display: block;
    font-family: 'Archivo Narrow', sans-serif; font-weight: 700;
    font-size: 12px; letter-spacing: 0.32em; color: var(--orange);
    margin-bottom: 14px;
  }
  .bt-h2 {
    font-family: 'Anton', sans-serif;
    font-size: clamp(36px, 6vw, 72px); letter-spacing: 0.02em;
    line-height: 1.05; margin: 0 0 16px; color: var(--cream);
  }
  .bt-section-sub {
    font-size: 16px; line-height: 1.65; max-width: 560px;
    color: rgba(242,226,194,0.78); margin: 0;
  }

  .bt-lifts { padding: 80px 0; }
  .bt-lift-list {
    max-width: 1180px; margin: 0 auto; padding: 0 48px;
  }
  .bt-lift {
    display: grid; grid-template-columns: 130px 1fr 60px;
    gap: 28px; align-items: center;
    padding: 28px 24px;
    border: 2px solid #2A2620;
    background: rgba(255,255,255,0.02);
    margin-bottom: 12px;
    transition: border-color 220ms ease, background 220ms ease, transform 220ms ease;
    outline: none;
  }
  .bt-lift:hover, .bt-lift.hot, .bt-lift:focus-visible {
    border-color: var(--orange);
    background: rgba(231,111,42,0.08);
    transform: translateX(6px);
  }
  .bt-lift-alt {
    font-family: 'Anton', sans-serif;
    font-size: 56px; line-height: 1;
    color: var(--orange); letter-spacing: 0.02em;
    text-shadow: 0 0 20px rgba(231,111,42,0.3);
  }
  .bt-lift-meta {
    display: flex; gap: 16px; align-items: baseline;
    margin-bottom: 8px;
  }
  .bt-lift-addr {
    font-family: 'Anton', sans-serif; font-size: 22px;
    letter-spacing: 0.06em; color: var(--cream);
  }
  .bt-lift-species {
    font-family: 'Archivo Narrow', sans-serif; font-style: italic;
    font-size: 14px; color: var(--amber);
  }
  .bt-lift-body {
    font-size: 15px; line-height: 1.65; color: rgba(242,226,194,0.82);
    margin: 0 0 8px;
  }
  .bt-lift-note {
    font-family: 'Archivo Narrow', sans-serif; font-weight: 700;
    font-size: 12px; letter-spacing: 0.18em; color: var(--orange);
  }
  .bt-lift-arrow {
    font-size: 32px; color: var(--amber);
    text-align: center;
    transition: transform 220ms ease, color 220ms ease;
  }
  .bt-lift:hover .bt-lift-arrow,
  .bt-lift.hot .bt-lift-arrow,
  .bt-lift:focus-visible .bt-lift-arrow {
    transform: translateY(-6px);
    color: var(--orange);
  }

  .bt-saddle { padding: 80px 0; background: rgba(255,255,255,0.02); }
  .bt-saddle-grid {
    max-width: 1180px; margin: 0 auto; padding: 0 48px;
    display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px;
  }
  .bt-saddle-card {
    background: var(--vinyl);
    border-left: 4px solid var(--amber);
    padding: 22px 22px;
    transition: border-left-color 200ms ease, transform 200ms ease;
  }
  .bt-saddle-card:hover, .bt-saddle-card:focus-within {
    border-left-color: var(--orange);
    transform: translateX(4px);
  }
  .bt-saddle-item {
    font-family: 'Archivo Narrow', sans-serif; font-weight: 700;
    font-size: 12px; letter-spacing: 0.28em; color: var(--orange);
    margin-bottom: 6px;
  }
  .bt-saddle-make {
    font-family: 'Anton', sans-serif; font-size: 22px;
    letter-spacing: 0.04em; color: var(--cream); margin-bottom: 10px;
  }
  .bt-saddle-note {
    font-size: 14px; line-height: 1.6;
    color: rgba(242,226,194,0.78); margin: 0;
  }

  .bt-chipper { padding: 80px 0; }
  .bt-table {
    max-width: 1180px; margin: 0 auto;
    width: calc(100% - 96px);
    border-collapse: collapse;
    background: var(--vinyl);
    border: 2px solid #2A2620;
  }
  .bt-table th, .bt-table td {
    padding: 14px 18px; text-align: left;
    border-bottom: 1px solid #2A2620;
    font-size: 14px;
  }
  .bt-table th {
    background: #08070A; color: var(--orange);
    font-family: 'Archivo Narrow', sans-serif; font-weight: 700;
    letter-spacing: 0.22em; font-size: 11px;
  }
  .bt-table tr:hover { background: rgba(231,111,42,0.06); }
  .bt-table-unit {
    font-family: 'Anton', sans-serif; letter-spacing: 0.06em;
    font-size: 16px; color: var(--cream);
  }
  .bt-table-op { color: var(--amber); }

  .bt-footer {
    background: #08070A;
    padding: 24px 48px 36px;
    border-top: 4px solid var(--orange);
  }
  .bt-foot-stencil {
    display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;
    padding: 18px 0;
    font-family: 'Anton', sans-serif; letter-spacing: 0.22em;
    font-size: 14px; color: var(--orange);
    border-bottom: 1px dashed #2A2620;
    margin-bottom: 24px;
  }
  .bt-foot-grid {
    max-width: 1080px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px; text-align: center;
    color: rgba(242,226,194,0.78);
    font-size: 14px; line-height: 1.7;
  }
  .bt-foot-label {
    font-family: 'Archivo Narrow', sans-serif; font-weight: 700;
    font-size: 11px; letter-spacing: 0.28em;
    color: var(--amber); margin-bottom: 4px;
  }

  @media (max-width: 880px) {
    .bt-cluster { grid-template-columns: repeat(2, 1fr); gap: 16px; }
    .bt-lift { grid-template-columns: 80px 1fr; gap: 16px; }
    .bt-lift-arrow { display: none; }
    .bt-saddle-grid, .bt-foot-grid { grid-template-columns: 1fr; }
    .bt-table { width: calc(100% - 48px); }
    .bt-section-head { padding: 0 24px; }
    .bt-lift-list, .bt-saddle-grid { padding: 0 24px; }
    .bt-hero-content { padding: 48px 24px 0; }
    .bt-boom { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .bt-cab, .bt-sky, .bt-canopy, .bt-dash, .bt-boom { transform: none !important; transition: none; }
    .bt-lift:hover, .bt-lift.hot, .bt-lift:focus-visible { transform: none; }
    .bt-cta:hover, .bt-cta:focus-visible { transform: none; box-shadow: 0 6px 0 #2A1606; }
    .bt-saddle-card:hover, .bt-saddle-card:focus-within { transform: none; }
  }
`;
