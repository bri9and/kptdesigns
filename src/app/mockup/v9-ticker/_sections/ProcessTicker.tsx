"use client";

import { IBM_Plex_Mono } from "next/font/google";
import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const C = {
  bg: "#000", panel: "#050505", grid: "#222", hair: "#141414",
  data: "#E8E8E8", dim: "#666", faint: "#3A3A3A",
  green: "#00FF41", amber: "#FFA500", red: "#FF3030",
};

type Status = "DONE" | "ACTIVE" | "PENDING";
type Stage = { t: string; ts: string; code: string; label: string; detail: string; qty: string };

const STAGES: Stage[] = [
  { t: "T+00", ts: "08:00:01.204", code: "DSC", label: "DISCOVERY", detail: "call · scope captured · pricing locked",      qty: "1.000" },
  { t: "T+07", ts: "08:00:07.118", code: "BLD", label: "BUILD",     detail: "design + code + weekly review",                qty: "1.000" },
  { t: "T+30", ts: "08:00:30.067", code: "LCH", label: "LAUNCH",    detail: "private staging · approval · public deploy",   qty: "1.000" },
  { t: "T+47", ts: "08:00:47.000", code: "DLV", label: "DELIVERY",  detail: "repo handed over · agent connection live",     qty: "1.000" },
];

function StatusGlyph({ s }: { s: Status }) {
  if (s === "DONE")
    return <span style={{ color: C.green, textShadow: `0 0 6px ${C.green}` }}>{"▲"}</span>;
  if (s === "ACTIVE")
    return (
      <motion.span
        animate={{ opacity: [1, 0.35, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ color: C.amber, textShadow: `0 0 6px ${C.amber}` }}
      >→</motion.span>
    );
  return <span style={{ color: C.faint }}>·</span>;
}

function Flip({ value }: { value: string }) {
  return (
    <motion.span key={value} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.18, ease: "easeOut" }} style={{ display: "inline-block" }}>
      {value}
    </motion.span>
  );
}

export default function ProcessTicker() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [states, setStates] = useState<Status[]>(() => STAGES.map(() => "PENDING") as Status[]);
  const [elapsed, setElapsed] = useState(0);
  const [confidence, setConfidence] = useState(82.4);
  const [cursor, setCursor] = useState(true);
  const [tape, setTape] = useState(0);

  useEffect(() => { const t = setInterval(() => setCursor((v) => !v), 530); return () => clearInterval(t); }, []);

  useEffect(() => {
    if (!inView) return;
    const STAGGER = 900, ACTIVE = 550;
    const timers: ReturnType<typeof setTimeout>[] = [];
    STAGES.forEach((_, i) => {
      timers.push(setTimeout(() => setStates((p) => { const n = [...p]; n[i] = "ACTIVE"; return n; }), i * STAGGER));
      timers.push(setTimeout(() => setStates((p) => { const n = [...p]; n[i] = "DONE"; return n; }), i * STAGGER + ACTIVE));
    });
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => {
      setElapsed((v) => v + 1);
      setConfidence((v) => Number(Math.max(80, Math.min(99.9, v + (Math.random() - 0.45) * 0.4)).toFixed(2)));
      setTape((v) => (v + 1) % 9999);
    }, 220);
    return () => clearInterval(t);
  }, [inView]);

  const doneCount = states.filter((s) => s === "DONE").length;
  const progress = Math.round((doneCount / STAGES.length) * 100);

  const tapeLine = useMemo(() => {
    const seed = (tape * 31) % 9999;
    return `MKT BUILD ▲ +0.00  KPT.DSGN ▲ ${(2.4 + (seed % 30) / 100).toFixed(2)}%  SLIPPAGE 0.00  FILL 100%  ORD#${(48211 + tape).toString().padStart(6, "0")}  EXEC OK  ▲`;
  }, [tape]);

  const colCls = "grid grid-cols-[44px_88px_44px_1fr_56px] sm:grid-cols-[60px_104px_56px_1fr_70px_64px] gap-3 px-3";

  return (
    <section ref={ref} className={`${mono.className} relative w-full`}
      style={{ background: C.bg, color: C.data, padding: "5rem 1rem 6rem", fontFeatureSettings: '"tnum" 1, "zero" 1' }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.35]" style={{
        backgroundImage: `linear-gradient(${C.grid} 1px, transparent 1px), linear-gradient(90deg, ${C.grid} 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        maskImage: "radial-gradient(ellipse at center, #000 50%, transparent 100%)",
      }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: `repeating-linear-gradient(0deg, ${C.data} 0 1px, transparent 1px 3px)` }} />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-baseline justify-between flex-wrap gap-2 text-[11px] tracking-[0.18em]">
          <div style={{ color: C.green, textShadow: `0 0 8px ${C.green}` }}>EXECUTION SEQUENCE · STAGE 1 OF 4</div>
          <div className="flex items-center gap-4" style={{ color: C.dim }}>
            <span>SESSION #KPT-{(48000 + tape).toString().padStart(6, "0")}</span>
            <span style={{ color: C.green }}>{cursor ? "● LIVE" : "○ LIVE"}</span>
          </div>
        </div>

        <div className="mt-3 overflow-hidden" style={{ borderTop: `1px solid ${C.grid}`, borderBottom: `1px solid ${C.grid}` }}>
          <div className="whitespace-nowrap py-1.5 text-[11px] tracking-[0.14em]"
            style={{ color: C.amber, animation: "kpt-marquee 38s linear infinite", willChange: "transform" }}>
            {`${tapeLine}    ${tapeLine}    ${tapeLine}`}
          </div>
        </div>

        <h2 className="mt-8 font-light leading-[0.92] tracking-tight" style={{ fontSize: "clamp(48px, 8vw, 92px)", color: C.data }}>
          47<span style={{ color: C.green }}>.00</span>
          <span className="ml-3 align-middle text-[14px] tracking-[0.22em]" style={{ color: C.dim }}>DAYS · AVG CYCLE TO HANDOVER</span>
        </h2>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
          <div style={{ background: C.panel, border: `1px solid ${C.grid}` }}>
            <div className={`${colCls} py-2 text-[10px] tracking-[0.18em]`}
              style={{ borderBottom: `1px solid ${C.grid}`, color: C.dim }}>
              <span>STATUS</span><span>TIMESTAMP</span><span>SYM</span><span>STAGE / DESCRIPTION</span>
              <span className="hidden sm:inline text-right">QTY</span><span className="text-right">T+</span>
            </div>

            {STAGES.map((s, i) => {
              const status = states[i];
              const accent = status === "DONE" ? C.green : status === "ACTIVE" ? C.amber : C.faint;
              const rowColor = status === "DONE" ? C.data : status === "ACTIVE" ? C.amber : C.faint;
              return (
                <motion.div key={s.code}
                  initial={{ opacity: 0, x: -6 }}
                  animate={status === "PENDING" ? { opacity: 0.4, x: 0 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`${colCls} py-2.5 text-[12px] sm:text-[13px] items-baseline`}
                  style={{ borderBottom: `1px dashed ${C.hair}`, color: rowColor }}>
                  <span className="flex items-center gap-2">
                    <StatusGlyph s={status} />
                    <span style={{ color: C.dim, fontSize: 10 }} className="hidden sm:inline">
                      {status === "DONE" ? "FILL" : status === "ACTIVE" ? "WORK" : "PEND"}
                    </span>
                  </span>
                  <span style={{ color: C.dim }}>{s.ts}</span>
                  <span style={{ color: accent, fontWeight: 600 }}>{s.code}</span>
                  <span>
                    <span style={{ color: accent, fontWeight: 700 }}>{s.label}</span>
                    <span style={{ color: C.dim }}> — {s.detail}</span>
                  </span>
                  <span className="hidden sm:inline text-right" style={{ color: C.dim }}>{s.qty}</span>
                  <span className="text-right" style={{ color: accent }}>{s.t}</span>
                </motion.div>
              );
            })}

            <div className="px-3 py-2.5 flex items-center gap-3 text-[10px] tracking-[0.16em]"
              style={{ borderTop: `1px solid ${C.grid}`, color: C.dim }}>
              <span>PROGRESS</span>
              <div className="relative flex-1 h-[6px]" style={{ background: "#0c0c0c", border: `1px solid ${C.hair}` }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{ height: "100%", background: C.green, boxShadow: `0 0 8px ${C.green}` }} />
              </div>
              <span style={{ color: C.green, minWidth: 42, textAlign: "right" }}>
                <Flip value={`${progress.toString().padStart(3, "0")}%`} />
              </span>
            </div>
          </div>

          <aside className="text-[12px]" style={{ background: C.panel, border: `1px solid ${C.grid}` }}>
            <div className="px-3 py-2 text-[10px] tracking-[0.2em]" style={{ borderBottom: `1px solid ${C.grid}`, color: C.dim }}>EXECUTION METRICS</div>

            <div className="px-3 py-4" style={{ borderBottom: `1px dashed ${C.hair}` }}>
              <div className="text-[10px] tracking-[0.2em]" style={{ color: C.dim }}>TOTAL TIME</div>
              <div className="mt-1 leading-none" style={{ fontSize: 42, color: C.data, fontWeight: 300 }}>
                <Flip value={`00:${elapsed.toString().padStart(2, "0")}:${((tape * 7) % 60).toString().padStart(2, "0")}`} />
              </div>
              <div className="mt-1 text-[10px]" style={{ color: C.dim }}>cycle clock · live</div>
            </div>

            <div className="px-3 py-3 flex items-baseline justify-between" style={{ borderBottom: `1px dashed ${C.hair}` }}>
              <span className="text-[10px] tracking-[0.2em]" style={{ color: C.dim }}>SLIPPAGE</span>
              <span style={{ color: C.green, fontSize: 18, fontWeight: 600, textShadow: `0 0 6px ${C.green}` }}>0.0000</span>
            </div>

            <div className="px-3 py-3" style={{ borderBottom: `1px dashed ${C.hair}` }}>
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] tracking-[0.2em]" style={{ color: C.dim }}>CONFIDENCE</span>
                <span style={{ color: C.amber, fontSize: 18, fontWeight: 600 }}><Flip value={confidence.toFixed(2)} /></span>
              </div>
              <div className="mt-2 flex items-end gap-[2px] h-[28px]">
                {Array.from({ length: 28 }).map((_, k) => {
                  const seed = ((tape + k * 13) % 100) / 100;
                  const h = 6 + seed * 22;
                  const isHi = (k + tape) % 9 === 0;
                  return <div key={k} style={{ width: 4, height: h, background: isHi ? C.amber : C.green, opacity: isHi ? 0.95 : 0.7, boxShadow: isHi ? `0 0 4px ${C.amber}` : "none" }} />;
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 text-[11px]">
              {[
                { k: "FILLS", v: `${doneCount}/4`, c: C.green },
                { k: "REJECTS", v: "0", c: C.green },
                { k: "REVISIONS", v: "∞", c: C.amber },
                { k: "OWNERSHIP", v: "100%", c: C.green },
              ].map((cell, idx) => (
                <div key={cell.k} className="px-3 py-2.5"
                  style={{ borderBottom: idx < 2 ? `1px dashed ${C.hair}` : "none", borderRight: idx % 2 === 0 ? `1px dashed ${C.hair}` : "none" }}>
                  <div className="text-[10px] tracking-[0.18em]" style={{ color: C.dim }}>{cell.k}</div>
                  <div className="mt-0.5" style={{ color: cell.c, fontWeight: 600 }}>{cell.v}</div>
                </div>
              ))}
            </div>

            <div className="px-3 py-2.5 flex items-center gap-2 text-[11px]" style={{ borderTop: `1px solid ${C.grid}`, color: C.dim }}>
              <span style={{ color: C.green }}>&gt;</span><span>kpt.exec</span>
              <span aria-hidden style={{ display: "inline-block", width: 7, height: 13, background: cursor ? C.green : "transparent", boxShadow: cursor ? `0 0 6px ${C.green}` : "none" }} />
            </div>
          </aside>
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 px-3 py-2 text-[10px] tracking-[0.18em]"
          style={{ background: C.panel, border: `1px solid ${C.grid}`, color: C.dim }}>
          <span>NET: <span style={{ color: C.green }}>STABLE</span></span>
          <span>FEED: <span style={{ color: C.green }}>OPEN</span></span>
          <span>VENUE: <span style={{ color: C.amber }}>KPT/PRIMARY</span></span>
          <span className="text-right sm:text-left">BUILD: <span style={{ color: C.data }}>v9.ticker.4</span></span>
        </div>
      </div>

      <style jsx>{`
        @keyframes kpt-marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-33.333%, 0, 0); }
        }
      `}</style>
    </section>
  );
}
