"use client";

import { IBM_Plex_Mono } from "next/font/google";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const plex = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const C = {
  bg: "#000", green: "#00FF41", amber: "#FFA500", red: "#FF3030",
  grid: "#222", gridDim: "#141414", body: "#E8E8E8", dim: "#5a5a5a",
};

type Holding = {
  ticker: string; name: string; last: string; chg: string; pct: string;
  range: string; note: string; spark: number[]; trend: "up" | "moon";
};

const HOLDINGS: Holding[] = [
  { ticker: "NEXT.JS", name: "Next.js 16",  last: "16.1.6", chg: "+0.04", pct: "+0.25%", range: "ALL TIME HIGH", note: "APP ROUTER · RSC",     spark: [4,5,5,6,6,7,7,8,8,9,10,11], trend: "up" },
  { ticker: "REACT",   name: "React 19",    last: "19.2.3", chg: "+0.01", pct: "+0.05%", range: "STABLE",        note: "HOOKS · SUSPENSE",     spark: [7,7,8,7,8,8,7,8,8,8,9,9],   trend: "up" },
  { ticker: "TWCSS",   name: "Tailwind 4",  last: "4.0.0",  chg: "+1.20", pct: "+12.4%", range: "BREAKOUT",      note: "UTILITY-FIRST",        spark: [3,3,4,4,5,5,6,7,9,10,11,12],trend: "moon" },
  { ticker: "TS",      name: "TypeScript",  last: "5.x",    chg: "+0.05", pct: "+0.99%", range: "CONSOLIDATING", note: "STRICT",               spark: [6,6,7,6,7,7,7,7,8,7,8,8],   trend: "up" },
  { ticker: "VRCEL",   name: "Vercel Edge", last: "194",    chg: "+2.00", pct: "+1.04%", range: "GLOBAL EXP",    note: "99.99% UPTIME",        spark: [5,6,6,7,7,8,8,9,9,10,10,11],trend: "up" },
  { ticker: "KPTAI",   name: "KPT Agents",  last: "∞",      chg: " --- ", pct: "+∞%",    range: "LEVERAGED BUY", note: "INBOUND PHONE AGENTS", spark: [2,2,3,3,4,5,7,8,10,11,12,12],trend: "moon" },
];

const COLS = "82px 1fr 84px 70px 80px 110px 130px 1fr";

export default function StackTicker() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section ref={ref} className={plex.className} style={{
      background: C.bg, color: C.body, padding: "56px 16px 72px",
      borderTop: `1px solid ${C.grid}`, borderBottom: `1px solid ${C.grid}`,
      fontSize: 12, lineHeight: 1.35, position: "relative",
    }}>
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,255,65,0.02) 2px 3px)`,
      }}/>
      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 14, justifyContent: "space-between",
          borderTop: `1px solid ${C.green}`, borderBottom: `1px solid ${C.green}`,
          padding: "6px 10px", background: "rgba(0,255,65,0.04)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: C.green }}>&gt;</span>
            <span style={{ color: C.green, fontWeight: 700, letterSpacing: 1.4 }}>
              WATCHLIST — TECHNOLOGY HOLDINGS
            </span>
            <motion.span animate={{ opacity: [1,0,1] }} transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
              style={{ color: C.green, marginLeft: 4 }}>▌</motion.span>
          </div>
          <div style={{ display: "flex", gap: 14, color: C.dim, fontSize: 11 }}>
            <span>SESSION <span style={{ color: C.green }}>OPEN</span></span>
            <span>FEED <span style={{ color: C.green }}>LIVE</span></span>
            <span>F1 HELP</span><span>F4 SORT</span><span>F8 EXPORT</span>
          </div>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: COLS, gap: 10,
          padding: "8px 10px", color: C.dim, fontSize: 10.5, letterSpacing: 1.2,
          borderBottom: `1px solid ${C.grid}`,
        }}>
          <span>TICKER</span><span>NAME</span>
          <span style={{ textAlign: "right" }}>LAST</span>
          <span style={{ textAlign: "right" }}>CHG</span>
          <span style={{ textAlign: "right" }}>%</span>
          <span>52W</span><span>SPARK</span><span>NOTE</span>
        </div>

        <div role="table" aria-label="Technology holdings">
          {HOLDINGS.map((h, i) => <Row key={h.ticker} h={h} i={i} animate={inView} />)}
        </div>

        <div style={{
          marginTop: 18, display: "grid", gridTemplateColumns: "minmax(0,1fr) 280px", gap: 14,
          borderTop: `1px solid ${C.grid}`, paddingTop: 14,
        }}>
          <Candles inView={inView} />
          <SidePanel />
        </div>

        <div style={{
          marginTop: 14, padding: "5px 10px", display: "flex", justifyContent: "space-between",
          color: C.dim, fontSize: 10.5, letterSpacing: 1, borderTop: `1px solid ${C.grid}`,
        }}>
          <span>EXCH: <span style={{ color: C.green }}>KPT/NYC</span></span>
          <span>NET <span style={{ color: C.green }}>0.04ms</span></span>
          <span>HEAP <span style={{ color: C.amber }}>74%</span></span>
          <span>MKT CAP <span style={{ color: C.green }}>22YR/EXP</span></span>
          <span>// REGISTRAR · HOST · DESIGN · BUILD · AGENTS</span>
        </div>
      </div>
    </section>
  );
}

function Row({ h, i, animate }: { h: Holding; i: number; animate: boolean }) {
  const isMoon = h.trend === "moon";
  const chgColor = h.chg.includes("---") ? C.amber : C.green;
  return (
    <motion.div role="row"
      initial={{ opacity: 0, x: -6 }}
      animate={animate ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
      transition={{ duration: 0.35, delay: 0.06 * i, ease: "easeOut" }}
      style={{
        display: "grid", gridTemplateColumns: COLS, gap: 10, alignItems: "center",
        padding: "7px 10px", borderBottom: `1px dashed ${C.gridDim}`,
        background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.012)", fontSize: 12.5,
      }}>
      <span style={{ color: isMoon ? C.amber : C.green, fontWeight: 700, letterSpacing: 0.6 }}>
        {isMoon ? "▲▲" : "▲"} {h.ticker}
      </span>
      <span style={{ color: C.body }}>{h.name}</span>
      <span style={{ color: C.body, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{h.last}</span>
      <span style={{ color: chgColor, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{h.chg}</span>
      <span style={{ color: chgColor, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{h.pct}</span>
      <span style={{ color: isMoon ? C.amber : C.dim, fontSize: 10.5, letterSpacing: 0.8 }}>{h.range}</span>
      <Sparkline data={h.spark} color={isMoon ? C.amber : C.green} animate={animate} delay={0.1 + i * 0.08}/>
      <span style={{ color: C.dim, fontSize: 11, letterSpacing: 0.6 }}>{h.note}</span>
    </motion.div>
  );
}

function Sparkline({ data, color, animate, delay }: { data: number[]; color: string; animate: boolean; delay: number }) {
  const w = 120, hgt = 22;
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const pts = data.map((v, idx) => `${idx * step},${hgt - ((v - min) / range) * (hgt - 2) - 1}`).join(" ");
  const area = `0,${hgt} ${pts} ${w},${hgt}`;
  const id = `g-${color.replace("#","")}`;
  return (
    <svg width={w} height={hgt} style={{ display: "block" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${id})`} />
      <motion.polyline points={pts} fill="none" stroke={color} strokeWidth="1.25"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.9, delay, ease: "easeOut" }} />
      <circle cx={w} cy={hgt - ((data[data.length - 1] - min) / range) * (hgt - 2) - 1} r="1.6" fill={color}/>
    </svg>
  );
}

function Candles({ inView }: { inView: boolean }) {
  const candles = [
    { o: 60, c: 64, h: 66, l: 58 },  { o: 64, c: 62, h: 67, l: 60 },  { o: 62, c: 68, h: 70, l: 61 },
    { o: 68, c: 66, h: 71, l: 64 },  { o: 66, c: 72, h: 75, l: 65 },  { o: 72, c: 70, h: 76, l: 68 },
    { o: 70, c: 76, h: 80, l: 69 },  { o: 76, c: 74, h: 81, l: 72 },  { o: 74, c: 82, h: 86, l: 73 },
    { o: 82, c: 80, h: 87, l: 78 },  { o: 80, c: 88, h: 92, l: 79 },  { o: 88, c: 92, h: 96, l: 86 },
    { o: 92, c: 90, h: 97, l: 88 },  { o: 90, c: 96, h: 100, l: 89 },
    { o: 96, c: 140, h: 145, l: 95, kpt: true }, { o: 140, c: 138, h: 146, l: 134 },
  ];
  const W = 720, H = 180, pad = 28;
  const minV = 50, maxV = 150;
  const cw = (W - pad * 2) / candles.length;
  const yScale = (v: number) => H - pad - ((v - minV) / (maxV - minV)) * (H - pad * 2);
  return (
    <div style={{ border: `1px solid ${C.grid}`, padding: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", color: C.dim, fontSize: 10.5, letterSpacing: 1.1, marginBottom: 6 }}>
        <span>SESSION CHART · 1D · KPT/AGENTS FEATURED</span>
        <span>VOL <span style={{ color: C.green }}>1.4M</span> · HI <span style={{ color: C.amber }}>145.00</span> · LO <span style={{ color: C.dim }}>58.00</span></span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
        {[0,1,2,3,4].map(i => (
          <line key={i} x1={pad} x2={W - pad} y1={pad + i * ((H - pad * 2) / 4)} y2={pad + i * ((H - pad * 2) / 4)} stroke={C.grid} strokeDasharray="2 4" />
        ))}
        {[150,125,100,75,50].map((v, i) => (
          <text key={v} x={4} y={pad + i * ((H - pad * 2) / 4) + 3} fill={C.dim} fontSize="9" fontFamily="inherit">{v}</text>
        ))}
        {candles.map((c, i) => {
          const x = pad + i * cw + cw / 2;
          const up = c.c >= c.o;
          const fill = c.kpt ? C.amber : up ? C.green : C.red;
          const bodyTop = yScale(Math.max(c.o, c.c));
          const bodyBot = yScale(Math.min(c.o, c.c));
          return (
            <motion.g key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.04 }}>
              <line x1={x} x2={x} y1={yScale(c.h)} y2={yScale(c.l)} stroke={fill} strokeWidth="1" />
              <rect x={x - cw * 0.32} y={bodyTop} width={cw * 0.64} height={Math.max(2, bodyBot - bodyTop)} fill={fill} />
              {c.kpt && (<>
                <rect x={x - cw * 0.32 - 2} y={bodyTop - 2} width={cw * 0.64 + 4} height={bodyBot - bodyTop + 4} fill="none" stroke={C.amber} strokeDasharray="2 2" />
                <text x={x} y={yScale(c.h) - 6} textAnchor="middle" fill={C.amber} fontSize="9" fontFamily="inherit" letterSpacing="1">KPTAI ▲</text>
              </>)}
            </motion.g>
          );
        })}
        <line x1={pad} x2={W - pad} y1={H - pad} y2={H - pad} stroke={C.grid} />
      </svg>
    </div>
  );
}

function SidePanel() {
  const stats: { l: string; v: string; t: "green" | "amber" }[] = [
    { l: "P/E (PRAGMATISM)", v: "22.0x", t: "green" },
    { l: "DIVIDEND (REFERRALS)", v: "HIGH", t: "green" },
    { l: "VOLATILITY", v: "LOW", t: "green" },
    { l: "RECOMMENDATION", v: "STRONG BUY", t: "amber" },
  ];
  return (
    <div style={{ border: `1px solid ${C.grid}`, padding: 10, fontSize: 11, lineHeight: 1.55 }}>
      <div style={{ color: C.green, letterSpacing: 1.2, marginBottom: 6 }}>// ANALYST DESK</div>
      <div style={{ color: C.body, marginBottom: 8 }}>
        Tools chosen for longevity, not novelty. Each holding earns its slot by surviving real client work.
      </div>
      {stats.map(s => (
        <div key={s.l} style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px dashed ${C.gridDim}`, padding: "3px 0" }}>
          <span style={{ color: C.dim, letterSpacing: 0.8 }}>{s.l}</span>
          <span style={{ color: s.t === "amber" ? C.amber : C.green, fontWeight: 600 }}>{s.v}</span>
        </div>
      ))}
      <div style={{ marginTop: 8, color: C.dim, fontSize: 10.5, letterSpacing: 1 }}>
        EST. 2004 · ONE PROCESS · ONE BILL · OWNED OUTRIGHT
      </div>
    </div>
  );
}
