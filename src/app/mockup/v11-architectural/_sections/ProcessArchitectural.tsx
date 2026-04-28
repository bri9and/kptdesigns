"use client";

import { Roboto, Roboto_Mono } from "next/font/google";
import { motion } from "framer-motion";

const mono = Roboto_Mono({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });
const body = Roboto({ subsets: ["latin"], weight: ["300", "400", "500"] });

const C = {
  bg: "#0E1E2E", white: "#E8EAEC", cyan: "#3D8DBF", red: "#D03030", paper: "#F5F2E8",
};

type Phase = { num: string; name: string; t: string; detail: string; start: number; width: number; critical?: boolean };

const PHASES: Phase[] = [
  { num: "01", name: "CONSULTATION", t: "T+0",  detail: "kickoff call · scope captured · pricing locked",     start: 0,  width: 14, critical: true },
  { num: "02", name: "CONSTRUCTION", t: "T+7",  detail: "design + build · weekly review meetings",           start: 14, width: 48, critical: true },
  { num: "03", name: "INSPECTION",   t: "T+30", detail: "private staging · client walkthrough · approvals", start: 62, width: 36 },
  { num: "04", name: "OCCUPANCY",    t: "T+47", detail: "deploy · code handover · agent commissioning",      start: 96, width: 4 },
];

const TICKS = [0, 7, 14, 21, 30, 37, 47];
const TMAX = 47;

export default function ProcessArchitectural() {
  return (
    <section
      className={`${body.className} relative w-full overflow-hidden`}
      style={{ background: C.bg, color: C.white, padding: "6rem 1.25rem 7rem" }}
    >
      {/* Faint blueprint grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{
        backgroundImage: `linear-gradient(${C.cyan}22 1px, transparent 1px), linear-gradient(90deg, ${C.cyan}22 1px, transparent 1px)`,
        backgroundSize: "24px 24px", opacity: 0.55,
      }} />
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{
        backgroundImage: `linear-gradient(${C.cyan}33 1px, transparent 1px), linear-gradient(90deg, ${C.cyan}33 1px, transparent 1px)`,
        backgroundSize: "120px 120px", opacity: 0.4,
      }} />
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{
        background: `radial-gradient(ellipse at 30% 0%, ${C.paper}06, transparent 60%)`,
      }} />

      <div className={`${mono.className} relative mx-auto max-w-6xl`}>
        {/* Sheet header */}
        <div className="flex items-baseline justify-between flex-wrap gap-2 text-[11px] tracking-[0.22em] uppercase">
          <div>SHEET A-005 <span style={{ color: C.cyan }}>·</span> CONSTRUCTION PHASING</div>
          <div className="flex items-center gap-4" style={{ color: C.cyan }}>
            <span>SCALE 1:48</span><span>REV. 04</span>
            <span style={{ color: C.red }}>DRAWN K.P.T.</span>
          </div>
        </div>
        <div className="mt-2" style={{ height: 2, background: C.red }} />
        <div className="mt-1 flex items-baseline justify-between text-[10px] tracking-[0.22em]" style={{ color: `${C.white}88` }}>
          <span>GANTT — PHASES 01–04</span><span>UNITS: DAYS</span>
        </div>

        {/* Title block */}
        <div className="mt-10 flex items-end justify-between gap-6 flex-wrap">
          <h2 className="font-light leading-[0.92] tracking-tight uppercase" style={{ fontSize: "clamp(40px, 7vw, 84px)" }}>
            FOUR PHASES.<br />
            <span style={{ color: C.cyan }}>FORTY-SEVEN</span> DAYS.
          </h2>
          <div className="text-[11px] tracking-[0.2em] max-w-[300px]" style={{ color: `${C.white}99` }}>
            DRAWING DEPICTS STANDARD OWNER-OCCUPIED DELIVERABLE FROM KICKOFF
            <span style={{ color: C.red }}> (T+0)</span> THROUGH FINAL OCCUPANCY <span style={{ color: C.red }}>(T+47)</span>.
          </div>
        </div>

        {/* Gantt diagram frame */}
        <div className="mt-12 relative" style={{ border: `1px solid ${C.white}55`, padding: "1.25rem 1rem 1rem" }}>
          {[{ top: -5, left: -5 }, { top: -5, right: -5 }, { bottom: -5, left: -5 }, { bottom: -5, right: -5 }].map((p, i) => (
            <div key={i} aria-hidden className="absolute" style={{ ...p, width: 10, height: 10 }}>
              <div style={{ position: "absolute", top: 4, left: 0, right: 0, height: 1, background: C.red }} />
              <div style={{ position: "absolute", left: 4, top: 0, bottom: 0, width: 1, background: C.red }} />
            </div>
          ))}

          {/* Tick scale */}
          <div className="relative h-6 ml-[160px] mr-2">
            {TICKS.map((d) => (
              <div key={d} className="absolute top-0 text-[10px] tracking-[0.18em]"
                style={{ left: `${(d / TMAX) * 100}%`, transform: "translateX(-50%)", color: C.cyan }}>
                <div style={{ height: 8, width: 1, background: C.cyan, margin: "0 auto 2px" }} />
                T+{d.toString().padStart(2, "0")}
              </div>
            ))}
          </div>

          {/* Phase rows */}
          <div className="mt-2 flex flex-col gap-3">
            {PHASES.map((p, i) => (
              <div key={p.num} className="grid grid-cols-[160px_1fr] items-center gap-3">
                <div className="text-[10px] tracking-[0.18em] leading-tight">
                  <div style={{ color: C.red }}>PHASE {p.num}</div>
                  <div style={{ color: C.white, fontWeight: 500 }}>{p.name}</div>
                  <div style={{ color: `${C.white}77`, marginTop: 2 }}>{p.t}</div>
                </div>

                <div className="relative" style={{ height: 56, borderTop: `1px dashed ${C.white}22`, borderBottom: `1px dashed ${C.white}22` }}>
                  {TICKS.map((d) => (
                    <div key={d} aria-hidden className="absolute top-0 bottom-0"
                      style={{ left: `${(d / TMAX) * 100}%`, width: 1, background: `${C.cyan}1f` }} />
                  ))}

                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-15% 0px" }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.18 }}
                    className="absolute"
                    style={{
                      left: `${p.start}%`, width: `${p.width}%`, top: 14, height: 28,
                      background: C.white, transformOrigin: "left center",
                      boxShadow: `0 0 0 1px ${C.bg}, 0 0 0 2px ${C.white}`,
                    }}
                  >
                    <div aria-hidden className="absolute inset-0" style={{
                      backgroundImage: `repeating-linear-gradient(45deg, ${C.bg}22 0 2px, transparent 2px 6px)`,
                    }} />
                    <div className="absolute inset-0 flex items-center px-2 text-[10px] tracking-[0.16em] uppercase overflow-hidden whitespace-nowrap"
                      style={{ color: C.bg, fontWeight: 700 }}>
                      {p.detail}
                    </div>
                    <div className="absolute -left-[3px] top-0 bottom-0" style={{ width: 3, background: C.red }} />
                    <div className="absolute -right-[3px] top-0 bottom-0" style={{ width: 3, background: C.red }} />
                  </motion.div>

                  {p.critical && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-15% 0px" }}
                      transition={{ duration: 0.5, delay: 0.9 + i * 0.18 }}
                      className="absolute text-[9px] tracking-[0.22em]"
                      style={{
                        left: `${p.start + p.width / 2}%`, top: -4,
                        transform: "translate(-50%, -100%)", color: C.red, whiteSpace: "nowrap",
                      }}
                    >
                      ◀ CRITICAL PATH ▶
                      <div aria-hidden style={{
                        position: "absolute", left: "50%", top: "100%", width: 1, height: 8, background: C.red,
                      }} />
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-15% 0px" }}
                    transition={{ duration: 0.4, delay: 1.1 + i * 0.18 }}
                    className="absolute text-[9px] tracking-[0.18em]"
                    style={{
                      left: `${p.start + p.width}%`, bottom: -2,
                      transform: "translate(-50%, 100%)", color: C.cyan, whiteSpace: "nowrap",
                    }}
                  >
                    {p.t}
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between text-[9px] tracking-[0.22em]" style={{ color: `${C.white}66` }}>
            <span>DWG. A-005 · CONSTRUCTION PHASING</span>
            <span style={{ color: C.cyan }}>NORTH ↑ TIME →</span>
            <span>SHEET 5 OF 12</span>
          </div>
        </div>

        {/* Schedule durability gauge */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6 items-start">
          <div>
            <div className="text-[10px] tracking-[0.22em]" style={{ color: C.red }}>GAUGE 03 · SCHEDULE DURABILITY</div>
            <div className="mt-2 text-[12px] tracking-[0.14em]" style={{ color: `${C.white}aa` }}>
              MEASURED ACROSS PRIOR 248 DELIVERABLES. OUTPUT INDICATES PROBABILITY
              THAT STATED DATES HOLD WITHOUT REVISION TO CRITICAL PATH.
            </div>

            <div className="mt-6 relative" style={{ width: "100%", maxWidth: 460 }}>
              <svg viewBox="0 0 200 110" className="w-full h-auto">
                <path d="M10,100 A90,90 0 0 1 190,100" fill="none" stroke={`${C.white}55`} strokeWidth="1" />
                {Array.from({ length: 11 }).map((_, k) => {
                  const ang = Math.PI - (k / 10) * Math.PI;
                  const x1 = 100 + Math.cos(ang) * 90, y1 = 100 - Math.sin(ang) * 90;
                  const x2 = 100 + Math.cos(ang) * (k % 5 === 0 ? 78 : 84);
                  const y2 = 100 - Math.sin(ang) * (k % 5 === 0 ? 78 : 84);
                  return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={k >= 9 ? C.red : C.cyan} strokeWidth={k % 5 === 0 ? 1.2 : 0.6} />;
                })}
                <motion.path
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 0.94 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                  d="M10,100 A90,90 0 0 1 190,100" fill="none" stroke={C.white} strokeWidth="2"
                />
                <motion.line
                  initial={{ rotate: -90 }} whileInView={{ rotate: 0.94 * 180 - 90 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                  style={{ transformOrigin: "100px 100px" }}
                  x1="100" y1="100" x2="100" y2="22" stroke={C.red} strokeWidth="1.5"
                />
                <circle cx="100" cy="100" r="3" fill={C.red} />
                <text x="10" y="108" fontSize="6" fontFamily="monospace" fill={C.cyan} letterSpacing="1">0%</text>
                <text x="100" y="14" fontSize="6" fontFamily="monospace" fill={C.cyan} textAnchor="middle" letterSpacing="1">50%</text>
                <text x="190" y="108" fontSize="6" fontFamily="monospace" fill={C.red} textAnchor="end" letterSpacing="1">100%</text>
              </svg>
              <div className="mt-2 flex items-baseline justify-between text-[10px] tracking-[0.2em]">
                <span style={{ color: `${C.white}77` }}>MIN.</span>
                <span style={{ color: C.white }}>READING</span>
                <span style={{ color: `${C.white}77` }}>MAX.</span>
              </div>
              <div className="mt-1 text-center font-light" style={{ color: C.white, fontSize: 36 }}>
                94<span style={{ color: C.cyan, fontSize: 18 }}>.2%</span>
              </div>
              <div className="text-center text-[9px] tracking-[0.22em]" style={{ color: `${C.white}77` }}>
                ON-TIME RATING · BAND <span style={{ color: C.red }}>A</span>
              </div>
            </div>
          </div>

          <aside className="text-[11px]" style={{ border: `1px solid ${C.white}55`, padding: "1rem" }}>
            <div className="text-[10px] tracking-[0.22em]" style={{ color: C.red }}>NOTES — REF. SHT A-005</div>
            <ol className="mt-2 list-decimal list-inside space-y-2 tracking-[0.06em]" style={{ color: `${C.white}cc` }}>
              <li>SCOPE LOCKED AT KICKOFF; NO MID-BUILD PIVOTS BILLED.</li>
              <li>ALL CRITICAL-PATH ITEMS DRAWN IN <span style={{ color: C.red }}>RED</span>.</li>
              <li>OWNER RETAINS REPO + REGISTRAR + HOST AT OCCUPANCY.</li>
              <li>OPTIONAL: KPT AGENTS COMMISSIONED IN PHASE 04.</li>
            </ol>
            <div className="mt-4 pt-3 text-[9px] tracking-[0.2em]" style={{ borderTop: `1px dashed ${C.white}33`, color: `${C.white}77` }}>
              SEALED · K.P.T. DRAFTING ROOM · EST. 2004
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
