"use client";

import { IBM_Plex_Mono } from "next/font/google";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

const plex = IBM_Plex_Mono({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const PHOSPHOR = "#00FF41", AMBER = "#FFA500", RED = "#FF3030";
const GRID = "#1a1a1a", DIM = "#3a3a3a", WHITE = "#E8E8E8";

type Dir = "▲" | "▼" | "■";
const TAPE: { l: string; v: string; d: Dir }[] = [
  { l: "DOM_UPTIME", v: "99.99%", d: "▲" },
  { l: "LIGHTHOUSE", v: "98", d: "▲" },
  { l: "CLIENT_RETENTION", v: "100%", d: "▲" },
  { l: "AGENT_CALLS_TODAY", v: "247", d: "▲" },
  { l: "DEPLOYMENTS_WK", v: "12", d: "▼" },
  { l: "REGISTRAR_RENEW", v: "194/194", d: "▲" },
  { l: "HOST_INCIDENTS", v: "0", d: "■" },
  { l: "DESIGN_REVS_AVG", v: "1.4", d: "▼" },
  { l: "BUILD_TIME_P50", v: "47s", d: "▼" },
  { l: "DOMAINS_OWNED", v: "194", d: "▲" },
  { l: "SISTER_AGENTS_LIVE", v: "31", d: "▲" },
  { l: "INBOUND_ANSWERED", v: "98.6%", d: "▲" },
  { l: "VENDORS", v: "1", d: "■" },
  { l: "BILLS_PER_CLIENT", v: "1", d: "■" },
  { l: "EST_YEAR", v: "2004", d: "■" },
];
const STATUS = [
  { k: "TICKER", v: "KPT.DSGN" }, { k: "REV_YTD", v: "USD 47.M" },
  { k: "YOY", v: "+12.4%" }, { k: "POPS", v: "194 LIVE" },
  { k: "CLIENTS", v: "47 · CHURN 0" }, { k: "MKT", v: "OPEN" },
];
const STACK = [
  { c: "REG", l: "REGISTRAR" }, { c: "HST", l: "HOST" },
  { c: "BLD", l: "BUILDER" }, { c: "AGT", l: "AGENTS" },
];

function Flipper({ base, drift, dec = 0, pre = "", suf = "", iv = 2400 }: {
  base: number; drift: number; dec?: number; pre?: string; suf?: string; iv?: number;
}) {
  const [val, setVal] = useState(base);
  const [bump, setBump] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setVal(base + (Math.random() - 0.45) * drift);
      setBump((b) => b + 1);
    }, iv + Math.random() * 800);
    return () => clearInterval(t);
  }, [base, drift, iv]);
  return (
    <motion.span key={bump} initial={{ opacity: 0.4, y: -3 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }} style={{ color: PHOSPHOR }}>
      {pre}{val.toFixed(dec)}{suf}
    </motion.span>
  );
}

function DepthChart() {
  const W = 560, H = 280;
  const pts = useMemo(() => {
    const N = 96, arr: number[] = []; let y = 0.5;
    for (let i = 0; i < N; i++) {
      y += (Math.sin(i * 0.42) + Math.cos(i * 0.17)) * 0.018;
      y += ((i * 9301 + 49297) % 233) / 233 / 28 - 0.018;
      y = Math.max(0.08, Math.min(0.92, y));
      arr.push(y);
    }
    return arr.map((v, i) => Math.min(0.95, v + (i / N) * 0.18));
  }, []);
  const path = pts.map((p, i) => {
    const x = (i / (pts.length - 1)) * W, yy = H - p * H;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${yy.toFixed(1)}`;
  }).join(" ");
  const lastY = H - pts[pts.length - 1] * H;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id="depthFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={PHOSPHOR} stopOpacity="0.35" />
          <stop offset="100%" stopColor={PHOSPHOR} stopOpacity="0" />
        </linearGradient>
        <pattern id="grid" width={W / 14} height={H / 7} patternUnits="userSpaceOnUse">
          <path d={`M ${W / 14} 0 L 0 0 0 ${H / 7}`} fill="none" stroke={GRID} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="#000" />
      <rect width={W} height={H} fill="url(#grid)" />
      {[0.2, 0.4, 0.6, 0.8].map((p) => (
        <g key={p}>
          <line x1="0" x2={W} y1={H - p * H} y2={H - p * H} stroke={DIM} strokeDasharray="2 4" strokeWidth="0.6" />
          <text x="6" y={H - p * H - 4} fill={DIM} fontSize="9">{(p * 100).toFixed(0)}</text>
        </g>
      ))}
      <path d={`${path} L${W},${H} L0,${H} Z`} fill="url(#depthFill)" />
      <motion.path d={path} fill="none" stroke={PHOSPHOR} strokeWidth="1.4"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, ease: "easeOut" }} />
      <motion.circle cx={W} cy={lastY} r={3.5} fill={PHOSPHOR}
        animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
      <line x1={W} x2={W} y1={0} y2={H} stroke={PHOSPHOR} strokeWidth="0.5" strokeDasharray="2 3" opacity="0.4" />
      <text x={W - 60} y={14} fill={PHOSPHOR} fontSize="9.5">ENG_RATE</text>
      <text x="6" y={H - 6} fill={DIM} fontSize="9">T-90D</text>
      <text x={W - 30} y={H - 6} fill={DIM} fontSize="9">NOW</text>
    </svg>
  );
}

function CommandBar() {
  const [tick, setTick] = useState(true);
  useEffect(() => { const t = setInterval(() => setTick((v) => !v), 520); return () => clearInterval(t); }, []);
  const fk = (k: string, l: string) => (<><span style={{ color: AMBER }}>{k}</span><span style={{ color: DIM }}>{l}</span></>);
  return (
    <div style={{ borderTop: `1px solid ${PHOSPHOR}`, background: "#000", padding: "10px 18px",
      display: "flex", alignItems: "center", gap: 14, fontSize: 12 }}>
      {fk("F1", "HELP")}{fk("F2", "QUOTE")}{fk("F3", "STACK")}{fk("F4", "BUILD")}
      <span style={{ marginLeft: "auto", color: PHOSPHOR }}>
        &gt; kpt<span style={{ opacity: tick ? 1 : 0, marginLeft: 4 }}>_</span>
      </span>
      <span style={{ color: DIM }}>type &apos;help&apos; for commands</span>
    </div>
  );
}

function DataCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ color: DIM, fontSize: 9.5, letterSpacing: "0.16em" }}>{label}</span>
      <span style={{ fontSize: 18, fontWeight: 600 }}>{children}</span>
    </div>
  );
}

export default function HeroTicker() {
  const tape = [...TAPE, ...TAPE, ...TAPE];
  return (
    <section className={plex.className} style={{ background: "#000", color: WHITE, minHeight: "100vh",
      paddingTop: "var(--nav-height, 80px)", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, rgba(0,255,65,0.035) 0 1px, transparent 1px 3px)",
        mixBlendMode: "screen", zIndex: 2 }} />

      {/* STATUS BAR */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${STATUS.length}, 1fr)`,
        borderBottom: `1px solid ${PHOSPHOR}`, background: "#000", fontSize: 11, letterSpacing: "0.08em" }}>
        {STATUS.map((s, i) => (
          <div key={s.k} style={{ padding: "8px 14px",
            borderRight: i < STATUS.length - 1 ? `1px solid ${GRID}` : "none",
            display: "flex", gap: 10, alignItems: "center", whiteSpace: "nowrap", overflow: "hidden" }}>
            <span style={{ color: DIM }}>{s.k}</span>
            <span style={{ color: PHOSPHOR }}>{s.v}</span>
          </div>
        ))}
      </div>

      {/* TICKER TAPE */}
      <div style={{ borderBottom: `1px solid ${GRID}`, background: "#050505", overflow: "hidden", position: "relative", height: 34 }}>
        <motion.div animate={{ x: ["0%", "-66.6667%"] }} transition={{ duration: 90, ease: "linear", repeat: Infinity }}
          style={{ display: "flex", gap: 28, whiteSpace: "nowrap", padding: "8px 0", fontSize: 12, willChange: "transform" }}>
          {tape.map((t, i) => {
            const c = t.d === "▲" ? PHOSPHOR : t.d === "▼" ? RED : AMBER;
            return (
              <span key={i} style={{ display: "inline-flex", gap: 8 }}>
                <span style={{ color: DIM }}>{t.l}</span>
                <span style={{ color: WHITE }}>{t.v}</span>
                <span style={{ color: c }}>{t.d}</span>
                <span style={{ color: DIM }}>·</span>
              </span>
            );
          })}
        </motion.div>
      </div>

      {/* MAIN GRID */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "minmax(0,1.05fr) minmax(0,1fr)", borderBottom: `1px solid ${GRID}` }}>
        {/* LEFT */}
        <div style={{ borderRight: `1px solid ${GRID}`, padding: "28px 32px 24px",
          display: "flex", flexDirection: "column", gap: 22, position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, letterSpacing: "0.18em", color: DIM }}>
            <span>PANE_01 · IDENTITY</span>
            <span style={{ color: PHOSPHOR }}>● LIVE</span>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            style={{ fontSize: "clamp(100px, 18vw, 200px)", fontWeight: 700, color: PHOSPHOR,
              letterSpacing: "-0.04em", textShadow: "0 0 22px rgba(0,255,65,0.35)", lineHeight: 0.82 }}>
            KPT<span style={{ fontSize: "0.32em", color: AMBER, fontWeight: 500,
              letterSpacing: "0.04em", marginLeft: 6, verticalAlign: "top" }}>.DSGN</span>
          </motion.div>
          <div style={{ display: "flex", gap: 0, fontSize: 11, letterSpacing: "0.16em", color: WHITE,
            borderTop: `1px dashed ${DIM}`, borderBottom: `1px dashed ${DIM}`, padding: "9px 0", flexWrap: "wrap" }}>
            {STACK.map((s, i) => (
              <span key={s.c} style={{ display: "inline-flex", alignItems: "center" }}>
                <span style={{ color: AMBER, marginRight: 6 }}>{s.c}</span>
                <span>{s.l}</span>
                {i < STACK.length - 1 && <span style={{ color: PHOSPHOR, margin: "0 12px" }}>│</span>}
              </span>
            ))}
          </div>
          <div style={{ border: `1px solid ${GRID}`, padding: "12px 14px", display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr", gap: "12px 18px", fontSize: 12 }}>
            <DataCell label="REV_YTD"><Flipper base={47.2} drift={0.6} dec={2} pre="$" suf="M" /></DataCell>
            <DataCell label="POPS_LIVE"><Flipper base={194} drift={2} /></DataCell>
            <DataCell label="UPTIME"><Flipper base={99.99} drift={0.02} dec={2} suf="%" /></DataCell>
            <DataCell label="AGENT_CALLS"><Flipper base={247} drift={6} /></DataCell>
            <DataCell label="DEPLOYS_24H"><Flipper base={3.4} drift={1.2} dec={1} /></DataCell>
            <DataCell label="CHURN_TTM"><span style={{ color: PHOSPHOR }}>0.00%</span></DataCell>
          </div>
          <div style={{ fontSize: 11, color: DIM, letterSpacing: "0.14em", marginTop: "auto",
            borderTop: `1px solid ${GRID}`, paddingTop: 12, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <span>ONE_PROCESS · ONE_BILL · ONE_TEAM · <span style={{ color: AMBER }}>OWNED_OUTRIGHT</span></span>
            <span>EST. 2004</span>
          </div>
          <div style={{ display: "flex", gap: 0, fontSize: 12 }}>
            <a href="/start" style={{ background: PHOSPHOR, color: "#000", padding: "10px 20px",
              fontWeight: 700, letterSpacing: "0.14em", textDecoration: "none" }}>[F5] EXEC › START_BUILD</a>
            <a href="/pricing" style={{ border: `1px solid ${PHOSPHOR}`, borderLeft: "none", color: PHOSPHOR,
              padding: "10px 20px", letterSpacing: "0.14em", textDecoration: "none" }}>[F6] QUOTE › PRICING</a>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: "grid", gridTemplateRows: "auto 1fr auto", background: "#000" }}>
          <div style={{ borderBottom: `1px solid ${GRID}`, padding: "10px 18px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            fontSize: 11, letterSpacing: "0.14em", color: DIM, flexWrap: "wrap", gap: 8 }}>
            <span>PANE_02 · ENGAGEMENT_RATE <span style={{ color: PHOSPHOR, marginLeft: 8 }}>+18.6%</span></span>
            <span>
              <span style={{ color: AMBER }}>1D</span><span style={{ margin: "0 8px" }}>·</span>
              <span>1W</span><span style={{ margin: "0 8px" }}>·</span>
              <span style={{ color: PHOSPHOR }}>90D</span><span style={{ margin: "0 8px" }}>·</span>
              <span>YTD</span><span style={{ margin: "0 8px" }}>·</span><span>ALL</span>
            </span>
          </div>
          <div style={{ position: "relative", minHeight: 280 }}><DepthChart /></div>
          <div style={{ borderTop: `1px solid ${GRID}`, display: "grid", gridTemplateColumns: "1fr 1fr", fontSize: 11 }}>
            <div style={{ padding: "10px 14px", borderRight: `1px solid ${GRID}` }}>
              <div style={{ color: DIM, marginBottom: 6, letterSpacing: "0.14em" }}>BID · INBOUND</div>
              {[["E-COMMERCE", "12"], ["LAW_FIRMS", "9"], ["RESTAURANT", "7"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", color: PHOSPHOR, padding: "2px 0" }}>
                  <span>{k}</span><span>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "10px 14px" }}>
              <div style={{ color: DIM, marginBottom: 6, letterSpacing: "0.14em" }}>ASK · CAPACITY</div>
              {[["BUILDS_OPEN", "4"], ["AGENTS_QUEUE", "2"], ["DOMAINS_AVL", "∞"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", color: AMBER, padding: "2px 0" }}>
                  <span>{k}</span><span>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CommandBar />
    </section>
  );
}
