"use client";

import { IBM_Plex_Mono } from "next/font/google";
import { portfolio } from "@/lib/portfolio";

const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const C = {
  green: "#00FF41",
  amber: "#FFA500",
  grid: "#222",
  dim: "#555",
  white: "#E8E8E8",
} as const;

const GRID_COLS = "minmax(0,2.6fr) 1.4fr 0.9fr 1fr minmax(0,3fr)";

function stagger(i: number) {
  const base = new Date("2026-04-14T00:00:00Z").getTime();
  const offset = (i * 19 + (i % 4) * 5 + 3) % 365;
  const d = new Date(base - offset * 86400000);
  const yr = String(d.getUTCFullYear()).slice(2);
  const mo = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dy = String(d.getUTCDate()).padStart(2, "0");
  return `${yr}.${mo}.${dy}`;
}

function ticker(i: number, name: string) {
  const sym = (name.replace(/[^A-Za-z]/g, "").toUpperCase().slice(0, 4) + "XXXX").slice(0, 4);
  return `${sym}-${String(100 + i * 13).slice(-3)}`;
}

const clip = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + "…" : s);

const PINS: Array<{ x: number; y: number; hot?: boolean }> = [
  { x: 95, y: 88 }, { x: 142, y: 70 }, { x: 178, y: 122, hot: true },
  { x: 232, y: 102 }, { x: 286, y: 90 }, { x: 318, y: 138 },
  { x: 372, y: 78 }, { x: 412, y: 116, hot: true }, { x: 458, y: 96 },
  { x: 492, y: 142 }, { x: 524, y: 78 }, { x: 208, y: 168 }, { x: 348, y: 178 },
];

export default function PortfolioTicker() {
  const rows = portfolio.slice(0, 6).map((p, i) => ({
    name: p.name,
    sym: ticker(i, p.name),
    industry: p.category.toUpperCase(),
    launch: stagger(i),
    note: clip(p.desc, 60),
    href: p.href ?? `https://${p.url}`,
    external: !p.href,
    delta: ((i * 37) % 73) / 10 + 0.4,
  }));

  return (
    <section
      id="work"
      className={`${mono.className} relative border-y`}
      style={{
        background: "#000",
        color: C.white,
        borderColor: C.grid,
        backgroundImage:
          "linear-gradient(to right, rgba(34,34,34,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,34,34,0.55) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    >
      <div className="px-4 sm:px-6 py-10 sm:py-14 max-w-[1400px] mx-auto">
        {/* SECTION HEADER BAR */}
        <div
          className="flex items-stretch border text-[10px] sm:text-[11px] uppercase tracking-[0.18em]"
          style={{ borderColor: C.green, color: C.green }}
        >
          <div
            className="px-3 py-2 border-r flex items-center gap-2"
            style={{ borderColor: C.green, background: "rgba(0,255,65,0.06)" }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: C.green, boxShadow: `0 0 6px ${C.green}` }}
            />
            <span className="font-semibold">DEAL FLOW</span>
          </div>
          <div className="px-3 py-2 border-r flex items-center" style={{ borderColor: C.green }}>
            CLIENT BOOK
          </div>
          <div
            className="px-3 py-2 border-r flex items-center"
            style={{ borderColor: C.green, color: C.amber }}
          >
            47 ACTIVE
          </div>
          <div
            className="hidden sm:flex px-3 py-2 border-r items-center ml-auto"
            style={{ borderColor: C.green, color: C.dim }}
          >
            T+0 · UTC 14:23:07
          </div>
          <div className="hidden md:flex px-3 py-2 items-center" style={{ color: C.amber }}>
            ▲ +12.4%
          </div>
        </div>

        {/* TABLE COLUMN HEADER */}
        <div
          className="hidden md:grid mt-6 px-3 py-2 text-[10px] uppercase tracking-[0.16em] border-b"
          style={{ color: C.dim, borderColor: C.grid, gridTemplateColumns: GRID_COLS }}
        >
          <span>Client</span>
          <span>Industry</span>
          <span>Launch</span>
          <span>Status</span>
          <span>Note</span>
        </div>

        {/* ROWS */}
        <ul className="text-[12px] sm:text-[13px] leading-snug">
          {rows.map((r, i) => (
            <li key={r.sym} className="border-b last:border-b-0" style={{ borderColor: C.grid }}>
              <a
                href={r.href}
                target={r.external ? "_blank" : undefined}
                rel={r.external ? "noopener noreferrer" : undefined}
                className="group block px-3 py-2 md:py-1.5 transition-colors duration-75"
              >
                <div
                  className="md:grid items-baseline gap-3 group-hover:bg-[#00FF41] group-hover:text-black"
                  style={{ gridTemplateColumns: GRID_COLS }}
                >
                  <div className="flex items-baseline gap-2 min-w-0">
                    <span
                      className="text-[10px] tabular-nums w-8 shrink-0 group-hover:!text-black"
                      style={{ color: C.dim }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-semibold truncate group-hover:!text-black"
                      style={{ color: C.green }}
                    >
                      {r.name}
                    </span>
                    <span
                      className="hidden lg:inline text-[10px] tabular-nums group-hover:!text-black"
                      style={{ color: C.dim }}
                    >
                      [{r.sym}]
                    </span>
                  </div>
                  <div className="truncate group-hover:!text-black" style={{ color: C.amber }}>
                    {r.industry}
                  </div>
                  <div className="tabular-nums group-hover:!text-black" style={{ color: C.white }}>
                    {r.launch}
                  </div>
                  <div className="flex items-baseline gap-1 group-hover:!text-black">
                    <span className="font-semibold group-hover:!text-black" style={{ color: C.green }}>
                      DEPLOYED
                    </span>
                    <span className="group-hover:!text-black" style={{ color: C.green }}>▲</span>
                    <span
                      className="text-[10px] tabular-nums group-hover:!text-black"
                      style={{ color: C.dim }}
                    >
                      +{r.delta.toFixed(1)}%
                    </span>
                  </div>
                  <div
                    className="truncate text-[11px] sm:text-[12px] group-hover:!text-black"
                    style={{ color: C.white, opacity: 0.78 }}
                  >
                    {r.note}
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {/* GEOGRAPHIC DISTRIBUTION */}
        <div className="mt-8 border" style={{ borderColor: C.grid }}>
          <div
            className="flex items-center justify-between px-3 py-1.5 border-b text-[10px] uppercase tracking-[0.18em]"
            style={{ borderColor: C.grid, color: C.dim }}
          >
            <span>
              GEO · DISTRIBUTION <span style={{ color: C.amber }}>// CONUS</span>
            </span>
            <span style={{ color: C.green }}>
              ◉ 13 NODES · {PINS.filter((p) => p.hot).length} HOT
            </span>
          </div>
          <div className="px-3 py-3">
            <svg viewBox="0 0 600 220" className="w-full h-auto" aria-hidden role="presentation">
              <defs>
                <pattern id="v9grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M20 0H0V20" fill="none" stroke={C.grid} strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="600" height="220" fill="url(#v9grid)" />
              <path
                d="M60 110 L92 70 L150 58 L220 50 L300 54 L380 48 L470 58 L530 64 L555 84 L548 118 L520 150 L470 168 L400 178 L320 190 L240 192 L170 178 L120 158 L82 140 Z"
                fill="none"
                stroke={C.green}
                strokeOpacity="0.45"
                strokeWidth="1"
              />
              <line x1="0" y1="110" x2="600" y2="110" stroke={C.grid} strokeDasharray="2 4" />
              <line x1="300" y1="0" x2="300" y2="220" stroke={C.grid} strokeDasharray="2 4" />
              {PINS.map((p, i) => (
                <g key={i}>
                  <circle
                    cx={p.x} cy={p.y} r={p.hot ? 9 : 6}
                    fill="none"
                    stroke={p.hot ? C.amber : C.green}
                    strokeOpacity="0.4"
                  />
                  <circle cx={p.x} cy={p.y} r={p.hot ? 2.4 : 1.8} fill={p.hot ? C.amber : C.green} />
                </g>
              ))}
              <text x="8" y="14" fill={C.dim} fontSize="9" fontFamily="ui-monospace, monospace">40°N</text>
              <text x="572" y="14" fill={C.dim} fontSize="9" fontFamily="ui-monospace, monospace" textAnchor="end">75°W</text>
              <text x="8" y="214" fill={C.dim} fontSize="9" fontFamily="ui-monospace, monospace">33°N</text>
              <text x="572" y="214" fill={C.dim} fontSize="9" fontFamily="ui-monospace, monospace" textAnchor="end">118°W</text>
            </svg>
          </div>
          <div
            className="flex flex-wrap items-center gap-x-4 gap-y-1 px-3 py-1.5 border-t text-[10px] uppercase tracking-[0.16em]"
            style={{ borderColor: C.grid, color: C.dim }}
          >
            <span><span style={{ color: C.green }}>◉</span> ACTIVE</span>
            <span><span style={{ color: C.amber }}>◉</span> HOT MARKET</span>
            <span className="ml-auto">VOL · 47 / 30D · ▲ +6</span>
          </div>
        </div>
      </div>
    </section>
  );
}
