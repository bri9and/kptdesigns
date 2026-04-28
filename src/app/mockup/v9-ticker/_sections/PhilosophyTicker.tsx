"use client";

import { IBM_Plex_Mono } from "next/font/google";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const PHOSPHOR = "#00FF41";
const AMBER = "#FFA500";
const DIM = "#7A7A7A";
const GRID = "#1A1A1A";
const PAPER = "#0A0A0A";

type Line =
  | { kind: "head"; text: string }
  | { kind: "bullet"; mark: "-" | "*"; text: string; risk?: string }
  | { kind: "rec"; label: string; value: string }
  | { kind: "blank" };

const LINES: Line[] = [
  { kind: "head", text: "> KPT.DSGN MAINTAINS HAND-CODE DOCTRINE" },
  { kind: "bullet", mark: "-", text: "NO TEMPLATES", risk: "RISK: NIL" },
  { kind: "bullet", mark: "-", text: "NO PAGE BUILDERS", risk: "RISK: NIL" },
  { kind: "bullet", mark: "-", text: "SOURCE OWNERSHIP: 100% TRANSFERRED ON DELIVERY" },
  { kind: "bullet", mark: "-", text: "LOCK-IN: ZERO" },
  { kind: "blank" },
  { kind: "head", text: "> COMPETITIVE ADVANTAGE" },
  { kind: "bullet", mark: "*", text: "22 YEAR OPERATING HISTORY" },
  { kind: "bullet", mark: "*", text: "DOMAIN OPS + HOSTING + DESIGN + AI AGENTS BUNDLED" },
  { kind: "bullet", mark: "*", text: "AVERAGE BUILD: 47 DAYS" },
  { kind: "blank" },
  { kind: "rec", label: "> RECOMMENDATION:", value: "STRONG BUY" },
];

function GaugeSidebar() {
  const ticks = Array.from({ length: 24 });
  const filled = 0.997;
  return (
    <div className="hidden md:flex flex-col gap-3 self-stretch shrink-0"
      style={{ borderLeft: `1px solid ${GRID}`, paddingLeft: 18, minWidth: 130 }}>
      <div style={{ color: DIM, fontSize: 10, letterSpacing: "0.18em" }}>DATA.CONFIDENCE</div>
      <div className="flex gap-3 flex-1">
        <div className="relative flex flex-col-reverse"
          style={{ width: 22, background: "#050505", border: `1px solid ${GRID}`, minHeight: 220 }}>
          {ticks.map((_, i) => {
            const ratio = (i + 1) / ticks.length;
            const lit = ratio <= filled;
            const color = i > 19 ? AMBER : PHOSPHOR;
            return (
              <motion.div key={i}
                initial={{ opacity: 0.2 }}
                animate={{ opacity: lit ? [0.55, 1, 0.55] : 0.08 }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
                style={{
                  height: `calc(${100 / ticks.length}% - 2px)`,
                  margin: "1px 2px",
                  background: lit ? color : "#0E0E0E",
                  boxShadow: lit ? `0 0 6px ${color}55` : "none",
                }}
              />
            );
          })}
        </div>
        <div className="flex flex-col justify-between" style={{ fontSize: 9, color: DIM, letterSpacing: "0.1em" }}>
          <span>100</span><span>75</span><span style={{ color: PHOSPHOR }}>—99.7</span>
          <span>50</span><span>25</span><span>0</span>
        </div>
      </div>
      <div style={{ fontSize: 10, color: PHOSPHOR, letterSpacing: "0.12em" }}>99.7% CONF.</div>
      <div style={{ fontSize: 9, color: DIM, lineHeight: 1.6 }}>SAMPLE N=412<br />SIGMA 0.0031<br />WINDOW 22Y</div>
    </div>
  );
}

function renderLine(line: Line, i: number) {
  if (line.kind === "blank") return <div key={i} style={{ height: "1.4em" }} />;
  if (line.kind === "head")
    return (
      <motion.div key={i}
        initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: i * 0.04 }}
        style={{ color: PHOSPHOR, fontWeight: 600, letterSpacing: "0.06em", textShadow: `0 0 12px ${PHOSPHOR}40` }}>
        {line.text}
      </motion.div>
    );
  if (line.kind === "bullet")
    return (
      <motion.div key={i}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.3, delay: i * 0.04 }}
        className="flex flex-wrap items-baseline gap-x-2"
        style={{ paddingLeft: "1.6em", color: "#E8E8E8" }}>
        <span style={{ color: DIM }}>{line.mark}</span>
        <span>{line.text}</span>
        {line.risk && (
          <span style={{
            marginLeft: "auto", color: AMBER, fontSize: 11, letterSpacing: "0.1em",
            border: `1px solid ${AMBER}55`, padding: "1px 6px",
          }}>({line.risk})</span>
        )}
      </motion.div>
    );
  return (
    <motion.div key={i}
      initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5, delay: 0.2 }}
      className="flex items-center gap-3 mt-2">
      <span style={{ color: PHOSPHOR, fontWeight: 600 }}>{line.label}</span>
      <motion.span
        animate={{ textShadow: [`0 0 0px ${AMBER}00`, `0 0 14px ${AMBER}cc`, `0 0 0px ${AMBER}00`] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        style={{
          color: AMBER, fontWeight: 700, fontSize: 18, letterSpacing: "0.14em",
          border: `1px solid ${AMBER}`, padding: "4px 12px",
        }}>
        {line.value}
      </motion.span>
      <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
        style={{ color: PHOSPHOR }}>▮</motion.span>
    </motion.div>
  );
}

export default function PhilosophyTicker() {
  const [now, setNow] = useState("14:32:07");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNow(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={mono.className}
      style={{
        background: PAPER, color: "#E8E8E8",
        borderTop: `1px solid ${GRID}`, borderBottom: `1px solid ${GRID}`,
        backgroundImage: `repeating-linear-gradient(0deg, transparent 0, transparent 23px, ${GRID} 23px, ${GRID} 24px)`,
      }}>
      <div className="flex items-center justify-between px-4 md:px-8 py-2"
        style={{
          background: "#000", color: PHOSPHOR,
          borderBottom: `1px solid ${PHOSPHOR}33`,
          fontSize: 11, letterSpacing: "0.14em",
        }}>
        <div className="flex items-center gap-3">
          <span style={{ color: AMBER }}>[ANALYST]</span>
          <span>PHILOSOPHY.TXT</span>
          <span style={{ color: DIM }}>—</span>
          <span>UPDATED 2026-04-28 14:32</span>
        </div>
        <div className="hidden sm:flex items-center gap-3" style={{ color: DIM }}>
          <span>SRC: KPT-INT</span>
          <span>{">"}</span>
          <span style={{ color: PHOSPHOR }}>LIVE {now}</span>
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}
            style={{ color: PHOSPHOR }}>_</motion.span>
        </div>
      </div>

      <div className="px-4 md:px-8 py-10 md:py-14 flex gap-8 md:gap-12 max-w-[1400px] mx-auto">
        <div className="flex-1 min-w-0">
          <div className="mb-6 flex items-center gap-4 flex-wrap"
            style={{ fontSize: 10, color: DIM, letterSpacing: "0.18em" }}>
            <span>DOC#KPT-PHIL-004</span>
            <span style={{ color: GRID }}>|</span>
            <span>CLASS: PUBLIC</span>
            <span style={{ color: GRID }}>|</span>
            <span style={{ color: AMBER }}>RATING: AAA</span>
            <span style={{ color: GRID }}>|</span>
            <span>PG 1/1</span>
          </div>

          <div style={{ fontSize: 14, lineHeight: 1.9, fontVariantNumeric: "tabular-nums" }}>
            {LINES.map(renderLine)}
          </div>

          <div className="mt-10 pt-4 flex items-center justify-between flex-wrap gap-3"
            style={{
              borderTop: `1px dashed ${GRID}`,
              fontSize: 10, color: DIM, letterSpacing: "0.16em",
            }}>
            <span>END.OF.REPORT // ANALYST: K.PORTER (KPT-04)</span>
            <span>
              <span style={{ color: PHOSPHOR }}>SIGNED</span> · 0xKPT...DSGN ·{" "}
              <span style={{ color: AMBER }}>VERIFIED</span>
            </span>
          </div>
        </div>

        <GaugeSidebar />
      </div>
    </section>
  );
}
