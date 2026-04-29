"use client";

/**
 * MatTemperatureEngine — V52 Mat Temperature
 *
 * Pure-UI temperature gradient driven by simulated time-of-day. No NOAA call.
 * Cool-blue at dawn, ember at noon, slag at evening. The gradient is the
 * accent system. A live dial spins to current temp; setInterval advances
 * the simulated clock so the page is different on every visit.
 *
 * Trade: Paving (mat temp, joint density, compaction window).
 */

import { useEffect, useMemo, useState } from "react";

const PAST_MATS = [
  { addr: "1408 ELM ST", date: "04 / 22", area: "4,200 SF", temp: 312, lift: "1.5\"", density: "94.1%" },
  { addr: "RIVERSIDE 22", date: "04 / 18", area: "8,400 SF", temp: 305, lift: "2.0\"", density: "93.6%" },
  { addr: "MEADOW LN 07", date: "04 / 11", area: "1,640 SF", temp: 298, lift: "1.5\"", density: "92.8%" },
  { addr: "OAK CT 310", date: "04 / 04", area: "2,200 SF", temp: 318, lift: "1.5\"", density: "94.4%" },
  { addr: "PINE BLVD 44", date: "03 / 28", area: "12,000 SF", temp: 309, lift: "2.0\"", density: "93.9%" },
];

const CREW = [
  { name: "MARCO TIDD", role: "FOREMAN", target: 312, note: "Pulls the screed up two clicks if dewpoint creeps." },
  { name: "JESSE OWENS", role: "SCREED OP", target: 305, note: "Watches the windrow temp probe like he's reading tea." },
  { name: "DEAN CRUZ", role: "ROLLER", target: 295, note: "Final pass at 195°F or it's a punch list waiting to happen." },
  { name: "RAY BERTHEL", role: "DISPATCH", target: 310, note: "Plant-to-paver round-trips never under-run by one truck." },
];

// Map a fractional hour (0..24) to a temperature curve resembling spring weather:
// dawn 48°F at 5h, noon 72°F at 13h, evening 56°F at 20h, night 42°F at 1h.
function hourToTempF(h: number) {
  // smooth curve: cosine-shifted to peak at 13h
  const phase = ((h - 13) / 24) * Math.PI * 2;
  return 58 + Math.cos(phase) * -14; // peak 72, low 44
}

// temperature -> palette
function tempToPalette(t: number) {
  // anchor: 32°F cold-slag, 50°F cool, 68°F mid, 82°F ember
  const cold = { r: 32, g: 44, b: 56 };
  const cool = { r: 79, g: 139, b: 176 };
  const mid = { r: 198, g: 142, b: 92 };
  const ember = { r: 192, g: 77, b: 42 };
  function lerp(a: number, b: number, t: number) { return Math.round(a + (b - a) * t); }
  function mix(c1: typeof cold, c2: typeof cold, t: number) {
    return { r: lerp(c1.r, c2.r, t), g: lerp(c1.g, c2.g, t), b: lerp(c1.b, c2.b, t) };
  }
  let primary;
  if (t <= 50) primary = mix(cold, cool, (t - 32) / 18);
  else if (t <= 68) primary = mix(cool, mid, (t - 50) / 18);
  else primary = mix(mid, ember, Math.min(1, (t - 68) / 14));
  const accent = t >= 60 ? ember : cool;
  return { primary, accent };
}

function rgb({ r, g, b }: { r: number; g: number; b: number }, a = 1) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export default function MatTemperatureEngine() {
  // Simulated time-of-day clock. Advance ~1 simulated minute per real second
  // so the gradient shifts noticeably while the user is on the page, but
  // never hits the network.
  const [tickHour, setTickHour] = useState<number>(() => {
    const d = new Date();
    return d.getHours() + d.getMinutes() / 60;
  });
  const [hoveredMat, setHoveredMat] = useState<string | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = setInterval(() => {
      setTickHour((h) => (h + 1 / 60) % 24); // +1 sim minute every real second
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const ambientF = useMemo(() => Math.round(hourToTempF(tickHour)), [tickHour]);
  const dewpointF = useMemo(() => Math.round(ambientF - 8 - Math.sin(tickHour / 24 * Math.PI * 2) * 4), [ambientF, tickHour]);
  const windMph = useMemo(() => Math.round(6 + Math.abs(Math.sin(tickHour / 4)) * 8), [tickHour]);
  const palette = useMemo(() => tempToPalette(ambientF), [ambientF]);
  const status = useMemo(() => {
    if (ambientF < 50) return { label: "TOO COOL", code: "HOLD" };
    if (windMph >= 12) return { label: "WIND HIGH", code: "MARGINAL" };
    if (ambientF >= 60 && ambientF <= 85) return { label: "WINDOW OPEN", code: "GO" };
    return { label: "WATCH", code: "MARGINAL" };
  }, [ambientF, windMph]);

  // dial angle: -120deg at 32°F → +120deg at 100°F
  const dialAngle = useMemo(() => {
    const t = Math.max(0, Math.min(1, (ambientF - 32) / 68));
    return -120 + t * 240;
  }, [ambientF]);

  const cssVars: React.CSSProperties = {
    ["--mt-primary" as never]: rgb(palette.primary),
    ["--mt-primary-soft" as never]: rgb(palette.primary, 0.18),
    ["--mt-primary-edge" as never]: rgb(palette.primary, 0.5),
    ["--mt-accent" as never]: rgb(palette.accent),
    ["--mt-accent-soft" as never]: rgb(palette.accent, 0.22),
  };

  const ambientFmt = `${ambientF}°F`;
  const tickHrInt = Math.floor(tickHour);
  const tickMin = Math.floor((tickHour - tickHrInt) * 60);
  const clockFmt = `${tickHrInt.toString().padStart(2, "0")}:${tickMin.toString().padStart(2, "0")}`;

  return (
    <>
      <style>{css}</style>
      <div className="mt-shell" style={cssVars}>
        {/* HERO */}
        <section className="mt-hero">
          <div className="mt-hero-grad" aria-hidden />
          <div className="mt-hero-grid" aria-hidden />

          <header className="mt-hero-meta">
            <span className="mt-tag">KPT&nbsp;PAVING</span>
            <span className="mt-clock" aria-live="polite">SIM·{clockFmt}</span>
            <span className={`mt-status mt-status-${status.code.toLowerCase()}`}>{status.label}</span>
          </header>

          <div className="mt-hero-body">
            <h1 className="mt-h1">
              We pave at <span className="mt-h1-hot">305°</span>.<br />
              Right now your air's at{" "}
              <span className="mt-h1-live" aria-live="polite">{ambientF}°</span>.
            </h1>
            <p className="mt-sub">
              Driveway and lot paving — laid in the compaction window, sealed in
              the cure window, scheduled in the wind window. Every page-load
              reads the same chart we read in the truck.
            </p>
            <div className="mt-cta-row">
              <button type="button" className="mt-cta mt-cta-primary">
                Lock my window
              </button>
              <button type="button" className="mt-cta mt-cta-ghost">
                See compaction logs
              </button>
            </div>
          </div>

          {/* DIAL */}
          <div className="mt-dial-wrap">
            <div className="mt-dial" role="img" aria-label={`Ambient temperature ${ambientFmt}`}>
              <svg viewBox="0 0 200 200" className="mt-dial-svg">
                <defs>
                  <linearGradient id="dial-arc" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgb(79,139,176)" />
                    <stop offset="50%" stopColor="rgb(198,142,92)" />
                    <stop offset="100%" stopColor="rgb(192,77,42)" />
                  </linearGradient>
                </defs>
                {/* outer ring */}
                <circle cx="100" cy="100" r="90" stroke="rgba(242,239,233,0.16)" strokeWidth="2" fill="none" />
                {/* arc */}
                <path
                  d="M 30 150 A 80 80 0 1 1 170 150"
                  stroke="url(#dial-arc)"
                  strokeWidth="14"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* tick marks */}
                {Array.from({ length: 11 }, (_, i) => {
                  const a = -120 + (i / 10) * 240;
                  const rad = (a * Math.PI) / 180;
                  const x1 = 100 + Math.cos(rad - Math.PI / 2) * 72;
                  const y1 = 100 + Math.sin(rad - Math.PI / 2) * 72;
                  const x2 = 100 + Math.cos(rad - Math.PI / 2) * 64;
                  const y2 = 100 + Math.sin(rad - Math.PI / 2) * 64;
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(242,239,233,0.7)" strokeWidth="1.4" />;
                })}
                {/* needle */}
                <g style={{ transform: `rotate(${dialAngle}deg)`, transformOrigin: "100px 100px", transition: "transform 800ms cubic-bezier(0.22, 0.96, 0.32, 1)" }}>
                  <line x1="100" y1="100" x2="100" y2="32" stroke="var(--mt-accent)" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="100" cy="32" r="5" fill="var(--mt-accent)" />
                </g>
                <circle cx="100" cy="100" r="8" fill="rgba(242,239,233,0.9)" />
                <circle cx="100" cy="100" r="3" fill="#161A1F" />
              </svg>
              <div className="mt-dial-readout">
                <span className="mt-dial-temp">{ambientF}°F</span>
                <span className="mt-dial-label">AMBIENT · TEMPE, AZ</span>
              </div>
            </div>
            <ul className="mt-readouts">
              <li><span>DEWPOINT</span><strong>{dewpointF}°F</strong></li>
              <li><span>WIND</span><strong>{windMph} mph NW</strong></li>
              <li><span>SURFACE</span><strong>{ambientF + 4}°F</strong></li>
              <li><span>MAT TARGET</span><strong>305°F</strong></li>
            </ul>
          </div>
        </section>

        {/* WINDOW EXPLAINER */}
        <section className="mt-section">
          <h2 className="mt-h2">TODAY'S WINDOW · WHY EACH MATTERS</h2>
          <div className="mt-window-grid">
            <article className="mt-window-card" tabIndex={0}>
              <span className="mt-window-tag">AMBIENT</span>
              <span className="mt-window-num">{ambientF}°F</span>
              <p>Below 50°F the mat loses heat faster than the rollers can chase. Above 95°F the cure pulls forward and we lose joint density.</p>
            </article>
            <article className="mt-window-card" tabIndex={0}>
              <span className="mt-window-tag">DEWPOINT</span>
              <span className="mt-window-num">{dewpointF}°F</span>
              <p>Surface-vs-dewpoint spread under 5° kills the bond. We watch the spread, not the rain.</p>
            </article>
            <article className="mt-window-card" tabIndex={0}>
              <span className="mt-window-tag">WIND</span>
              <span className="mt-window-num">{windMph} mph</span>
              <p>A 12 mph crosswind cools the mat 30°F before the breakdown roller arrives. We push the schedule when wind picks up.</p>
            </article>
            <article className="mt-window-card" tabIndex={0}>
              <span className="mt-window-tag">DECISION</span>
              <span className={`mt-window-num mt-window-num-${status.code.toLowerCase()}`}>{status.code}</span>
              <p>Crew lead reads three numbers and one chart. Today's chart says: <strong>{status.label}</strong>.</p>
            </article>
          </div>
        </section>

        {/* PAST MATS */}
        <section className="mt-section">
          <h2 className="mt-h2">PAST MATS · TEMPERATURE LOGGED</h2>
          <p className="mt-section-sub">
            Hover a job to see the mat temperature it was screeded at. Below 285° we re-roll; below 270° we don't bill.
          </p>
          <ol className="mt-mats">
            {PAST_MATS.map((m) => {
              const onTarget = m.temp >= 295 && m.temp <= 320;
              return (
                <li
                  key={m.addr}
                  className={`mt-mat ${hoveredMat === m.addr ? "is-hovered" : ""}`}
                  onMouseEnter={() => setHoveredMat(m.addr)}
                  onMouseLeave={() => setHoveredMat(null)}
                  onFocus={() => setHoveredMat(m.addr)}
                  onBlur={() => setHoveredMat(null)}
                  tabIndex={0}
                >
                  <span className="mt-mat-addr">{m.addr}</span>
                  <span className="mt-mat-date">{m.date}</span>
                  <span className="mt-mat-area">{m.area}</span>
                  <span className="mt-mat-bar" aria-hidden>
                    <span
                      className="mt-mat-bar-fill"
                      style={{ width: `${Math.min(100, ((m.temp - 250) / 100) * 100)}%` }}
                    />
                  </span>
                  <span className={`mt-mat-temp ${onTarget ? "is-good" : "is-warn"}`}>{m.temp}°F</span>
                  <span className="mt-mat-density">{m.density}</span>
                  <span className="mt-mat-lift">{m.lift}</span>
                </li>
              );
            })}
          </ol>
        </section>

        {/* CREW */}
        <section className="mt-section">
          <h2 className="mt-h2">THE CREW · BY MAT-TEMP TARGET</h2>
          <div className="mt-crew">
            {CREW.map((c) => {
              const offset = ((c.target - 270) / 60) * 100;
              return (
                <article key={c.name} className="mt-crew-card" tabIndex={0}>
                  <header className="mt-crew-head">
                    <span className="mt-crew-name">{c.name}</span>
                    <span className="mt-crew-role">{c.role}</span>
                  </header>
                  <div className="mt-crew-target">
                    <span className="mt-crew-target-label">TARGET</span>
                    <span className="mt-crew-target-num">{c.target}°F</span>
                    <span className="mt-crew-track" aria-hidden>
                      <span className="mt-crew-marker" style={{ left: `${offset}%` }} />
                    </span>
                  </div>
                  <p className="mt-crew-note">{c.note}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-foot">
          <div className="mt-foot-grad" aria-hidden />
          <div className="mt-foot-l">
            <span className="mt-foot-mark">KPT PAVING</span>
            <span className="mt-foot-line">NAPA · CFA · DOT MC-770118</span>
            <span className="mt-foot-line">FRESH OIL · DO NOT DRIVE 24H</span>
          </div>
          <div className="mt-foot-r">
            <span className="mt-foot-readout">{ambientFmt} AT {clockFmt}</span>
            <span className="mt-foot-line">dispatch · 480.555.0188</span>
            <span className="mt-foot-line">jobs@kpt.paving</span>
          </div>
        </footer>
      </div>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&family=Inter:wght@400;500;700&display=swap');

  .mt-shell {
    --night: #161A1F;
    --paper: #F2EFE9;
    --muted: rgba(242,239,233,0.62);
    --slag: #2A2C2E;
    font-family: 'Inter', system-ui, sans-serif;
    background: var(--night);
    color: var(--paper);
    min-height: 100vh;
    padding: 24px 28px 64px 28px;
    box-sizing: border-box;
  }

  /* HERO */
  .mt-hero {
    position: relative;
    padding: 32px 36px 36px 36px;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid rgba(242,239,233,0.12);
    background: linear-gradient(140deg, rgba(0,0,0,0.45), rgba(0,0,0,0.25));
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
    gap: 32px;
    align-items: center;
    min-height: 70vh;
  }
  .mt-hero-grad {
    position: absolute; inset: 0;
    background:
      radial-gradient(circle at 18% 20%, var(--mt-primary-soft), transparent 60%),
      radial-gradient(circle at 82% 80%, var(--mt-accent-soft), transparent 60%),
      linear-gradient(180deg, var(--mt-primary-soft), transparent 50%);
    transition: background 1500ms ease-out;
    z-index: 0;
  }
  .mt-hero-grid {
    position: absolute; inset: 0;
    background:
      repeating-linear-gradient(0deg, transparent 0 39px, rgba(242,239,233,0.05) 39px 40px),
      repeating-linear-gradient(90deg, transparent 0 39px, rgba(242,239,233,0.05) 39px 40px);
    z-index: 0;
    pointer-events: none;
  }
  .mt-hero-meta, .mt-hero-body, .mt-dial-wrap { position: relative; z-index: 1; }
  .mt-hero-meta {
    grid-column: 1 / -1;
    display: flex; gap: 14px; align-items: center;
    font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
  }
  .mt-tag {
    background: var(--mt-primary);
    color: var(--paper);
    padding: 5px 10px;
    border-radius: 4px;
    font-weight: 700;
    transition: background 800ms;
  }
  .mt-clock { color: var(--muted); font-family: 'Roboto Condensed', monospace; letter-spacing: 0.3em; }
  .mt-status {
    margin-left: auto;
    padding: 5px 12px;
    border-radius: 4px;
    font-weight: 700;
  }
  .mt-status-go { background: rgba(91,166,108,0.2); color: #A4DCB1; }
  .mt-status-marginal { background: rgba(225,168,79,0.22); color: #FBD38D; }
  .mt-status-hold { background: rgba(192,77,42,0.22); color: #F0A88C; }

  .mt-h1 {
    font-family: 'Roboto Condensed', 'Inter', sans-serif;
    font-weight: 700;
    font-size: clamp(40px, 6.4vw, 92px);
    line-height: 1.0;
    letter-spacing: -0.01em;
    margin: 0 0 22px 0;
  }
  .mt-h1-hot { color: var(--mt-accent); transition: color 800ms; }
  .mt-h1-live {
    color: var(--mt-primary);
    transition: color 800ms;
    font-variant-numeric: tabular-nums;
  }
  .mt-sub {
    font-size: 16px; line-height: 1.55; max-width: 56ch;
    color: var(--muted);
    margin: 0 0 28px 0;
  }
  .mt-cta-row { display: flex; gap: 12px; flex-wrap: wrap; }
  .mt-cta {
    font: inherit;
    font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;
    padding: 14px 22px;
    border-radius: 4px;
    border: 1px solid var(--mt-primary-edge);
    background: transparent;
    color: var(--paper);
    cursor: pointer;
    transition: background 160ms, transform 160ms, color 160ms, border-color 160ms;
  }
  .mt-cta-primary {
    background: var(--mt-accent);
    color: var(--night);
    border-color: var(--mt-accent);
    font-weight: 700;
  }
  .mt-cta:hover, .mt-cta:focus-visible {
    transform: translateY(-2px);
    outline: none;
  }
  .mt-cta-ghost:hover { background: var(--mt-primary-soft); }
  .mt-cta-primary:hover { background: var(--paper); color: var(--night); border-color: var(--paper); }

  /* DIAL */
  .mt-dial-wrap {
    display: flex; flex-direction: column; gap: 18px; align-items: center;
  }
  .mt-dial {
    position: relative;
    width: 100%;
    max-width: 320px;
    aspect-ratio: 1 / 1;
  }
  .mt-dial-svg { width: 100%; height: 100%; }
  .mt-dial-readout {
    position: absolute; left: 50%; top: 60%; transform: translate(-50%, 0);
    text-align: center;
    display: flex; flex-direction: column; gap: 2px;
  }
  .mt-dial-temp {
    font-family: 'Roboto Condensed', monospace;
    font-size: 42px; font-weight: 700;
    color: var(--paper);
    font-variant-numeric: tabular-nums;
  }
  .mt-dial-label {
    font-size: 10px; letter-spacing: 0.24em; color: var(--muted);
  }
  .mt-readouts {
    list-style: none; padding: 0; margin: 0;
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 8px 18px;
    width: 100%; max-width: 320px;
  }
  .mt-readouts li {
    display: flex; justify-content: space-between;
    border-bottom: 1px dashed rgba(242,239,233,0.16);
    padding: 6px 0;
    font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase;
  }
  .mt-readouts span { color: var(--muted); }
  .mt-readouts strong {
    font-family: 'Roboto Condensed', monospace; color: var(--paper);
    font-variant-numeric: tabular-nums;
  }

  /* SECTIONS */
  .mt-section { margin: 80px 0; }
  .mt-h2 {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: clamp(24px, 3vw, 38px);
    margin: 0 0 8px 0;
    color: var(--paper);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .mt-section-sub {
    font-size: 14px;
    color: var(--muted);
    max-width: 60ch;
    margin: 0 0 24px 0;
    line-height: 1.55;
  }

  /* WINDOW GRID */
  .mt-window-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
  }
  .mt-window-card {
    border: 1px solid rgba(242,239,233,0.16);
    border-left: 3px solid var(--mt-primary);
    background: rgba(242,239,233,0.04);
    padding: 22px 22px 24px 22px;
    border-radius: 6px;
    transition: transform 160ms, border-color 160ms, background 160ms;
    cursor: pointer;
  }
  .mt-window-card:hover, .mt-window-card:focus-visible {
    transform: translateY(-3px);
    border-left-color: var(--mt-accent);
    background: rgba(242,239,233,0.08);
    outline: none;
  }
  .mt-window-tag {
    font-size: 10px; letter-spacing: 0.24em; color: var(--muted);
    text-transform: uppercase; display: block; margin-bottom: 12px;
  }
  .mt-window-num {
    font-family: 'Roboto Condensed', monospace;
    font-size: 36px; font-weight: 700;
    color: var(--mt-primary);
    display: block; margin-bottom: 12px;
    transition: color 800ms;
    font-variant-numeric: tabular-nums;
  }
  .mt-window-num-go { color: #A4DCB1; }
  .mt-window-num-marginal { color: #FBD38D; }
  .mt-window-num-hold { color: #F0A88C; }
  .mt-window-card p { font-size: 13px; line-height: 1.55; color: var(--muted); margin: 0; }
  .mt-window-card strong { color: var(--paper); }

  /* PAST MATS */
  .mt-mats {
    list-style: none; padding: 0; margin: 0;
    display: flex; flex-direction: column; gap: 4px;
  }
  .mt-mat {
    display: grid;
    grid-template-columns: 160px 78px 96px 1fr 80px 80px 60px;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    border: 1px solid rgba(242,239,233,0.12);
    border-radius: 4px;
    background: rgba(242,239,233,0.03);
    cursor: pointer;
    transition: background 160ms, border-color 160ms, padding 160ms;
    font-size: 13px;
  }
  .mt-mat:hover, .mt-mat:focus-visible, .mt-mat.is-hovered {
    background: var(--mt-primary-soft);
    border-color: var(--mt-primary);
    padding-left: 22px;
    outline: none;
  }
  .mt-mat-addr { font-weight: 700; letter-spacing: 0.06em; }
  .mt-mat-date, .mt-mat-area, .mt-mat-density, .mt-mat-lift {
    font-family: 'Roboto Condensed', monospace; color: var(--muted);
    font-variant-numeric: tabular-nums;
  }
  .mt-mat-bar {
    height: 8px; background: rgba(242,239,233,0.08); border-radius: 2px; overflow: hidden;
  }
  .mt-mat-bar-fill {
    display: block; height: 100%;
    background: linear-gradient(90deg, rgba(79,139,176,0.8), rgba(192,77,42,0.95));
  }
  .mt-mat-temp {
    font-family: 'Roboto Condensed', monospace;
    font-weight: 700;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .mt-mat-temp.is-good { color: #A4DCB1; }
  .mt-mat-temp.is-warn { color: #FBD38D; }

  /* CREW */
  .mt-crew { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .mt-crew-card {
    border: 1px solid rgba(242,239,233,0.14);
    border-radius: 6px;
    padding: 22px;
    background: rgba(242,239,233,0.03);
    cursor: pointer;
    transition: transform 160ms, background 160ms, border-color 160ms;
  }
  .mt-crew-card:hover, .mt-crew-card:focus-visible {
    transform: translateY(-2px);
    background: var(--mt-primary-soft);
    border-color: var(--mt-primary);
    outline: none;
  }
  .mt-crew-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 14px; }
  .mt-crew-name { font-weight: 700; letter-spacing: 0.06em; }
  .mt-crew-role {
    font-size: 11px; letter-spacing: 0.22em; color: var(--mt-accent);
    text-transform: uppercase;
    transition: color 800ms;
  }
  .mt-crew-target { display: grid; grid-template-columns: auto auto 1fr; align-items: center; gap: 12px; margin-bottom: 12px; }
  .mt-crew-target-label { font-size: 10px; letter-spacing: 0.24em; color: var(--muted); }
  .mt-crew-target-num {
    font-family: 'Roboto Condensed', monospace; font-size: 22px; font-weight: 700;
    color: var(--paper);
    font-variant-numeric: tabular-nums;
  }
  .mt-crew-track {
    position: relative; height: 4px;
    background: linear-gradient(90deg, rgba(79,139,176,0.6), rgba(192,77,42,0.85));
    border-radius: 2px;
  }
  .mt-crew-marker {
    position: absolute; top: -4px; width: 12px; height: 12px;
    transform: translateX(-50%);
    background: var(--paper);
    border-radius: 50%;
    box-shadow: 0 0 6px rgba(255,255,255,0.6);
  }
  .mt-crew-note { font-size: 13px; line-height: 1.5; color: var(--muted); margin: 0; }

  /* FOOTER */
  .mt-foot {
    position: relative;
    margin-top: 48px;
    padding: 28px 36px;
    border-radius: 12px;
    overflow: hidden;
    display: flex; justify-content: space-between; flex-wrap: wrap; gap: 20px;
    border: 1px solid rgba(242,239,233,0.12);
  }
  .mt-foot-grad {
    position: absolute; inset: 0;
    background: linear-gradient(120deg, var(--mt-primary-soft), var(--mt-accent-soft));
    transition: background 1500ms ease-out;
    z-index: 0;
  }
  .mt-foot-l, .mt-foot-r { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 4px; }
  .mt-foot-r { text-align: right; }
  .mt-foot-mark {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 24px; font-weight: 700;
    letter-spacing: 0.06em;
  }
  .mt-foot-line { font-size: 12px; color: var(--muted); letter-spacing: 0.06em; }
  .mt-foot-readout {
    font-family: 'Roboto Condensed', monospace;
    font-size: 18px; color: var(--paper);
    letter-spacing: 0.16em;
    font-variant-numeric: tabular-nums;
  }

  @media (prefers-reduced-motion: reduce) {
    .mt-hero-grad, .mt-foot-grad, .mt-tag, .mt-h1-hot, .mt-h1-live, .mt-window-num, .mt-crew-role {
      transition: none;
    }
  }

  @media (max-width: 900px) {
    .mt-hero { grid-template-columns: 1fr; min-height: auto; }
    .mt-window-grid { grid-template-columns: repeat(2, 1fr); }
    .mt-mat { grid-template-columns: 1fr 1fr; }
    .mt-crew { grid-template-columns: 1fr; }
    .mt-mat-bar, .mt-mat-density, .mt-mat-lift { display: none; }
  }
`;
