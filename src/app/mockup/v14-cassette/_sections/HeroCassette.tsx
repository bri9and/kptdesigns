"use client";

import type { CSSProperties, ReactNode } from "react";
import { Inter, VT323, Caveat } from "next/font/google";
import { motion } from "framer-motion";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "900"], display: "swap" });
const led = VT323({ subsets: ["latin"], weight: ["400"], display: "swap" });
const hand = Caveat({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });

const W = "#3D2817", WD = "#2A1A0E", WH = "#5C3D24";
const A = "#C8C8CC", AD = "#7E7E84", AH = "#F0F0F4";
const R = "#FF2D2D", RG = "rgba(255,45,45,0.55)";
const T = "#8B5A2B", TD = "#5C3717";
const I = "#F5EBD0", X = "#0F0A05";

const TRACKS = [["01", "Registrar"], ["02", "Host"], ["03", "Designer"], ["04", "Agents"]] as const;
const BTNS: { l: string; g: string; rec?: boolean }[] = [
  { l: "REW", g: "◀◀" }, { l: "PLAY", g: "▶" }, { l: "FF", g: "▶▶" },
  { l: "STOP", g: "■" }, { l: "REC", g: "●", rec: true },
];
const ease = [0.16, 0.8, 0.2, 1] as const;
const fadeUp = (delay = 0, y = 16) => ({
  initial: { opacity: 0, y }, animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease, delay },
});
const ALU_BRUSH = `repeating-linear-gradient(90deg, ${A} 0px, #B8B8BE 1px, ${AH} 2px, #BCBCC2 3px, ${A} 4px)`;
const CSS = `
@keyframes spool { from { transform: rotate(0); } to { transform: rotate(360deg); } }
@keyframes vuIdle { 0%,100% { transform: rotate(-32deg); } 50% { transform: rotate(-22deg); } }
@keyframes recPulse { 0%,100% { opacity: 0.55; box-shadow: 0 0 6px ${RG}, inset 0 -2px 3px rgba(0,0,0,0.5); } 50% { opacity: 1; box-shadow: 0 0 14px ${R}, 0 0 28px ${RG}, inset 0 -2px 3px rgba(0,0,0,0.5); } }
@keyframes ready { 0%,78%,100% { opacity: 1; } 85%,95% { opacity: 0.35; } }
.spool { animation: spool 7.5s linear infinite; transform-origin: center; }
.spool-fast { animation: spool 5.5s linear infinite; transform-origin: center; }
.vu-needle { animation: vuIdle 3.4s ease-in-out infinite; transform-origin: 50% 100%; transition: transform 0.4s cubic-bezier(0.2,0.7,0.2,1); }
.vu-meter:hover .vu-needle { animation: none; transform: rotate(28deg); }
.rec-led { animation: recPulse 1.6s ease-in-out infinite; }
.ready-led { animation: ready 4.2s ease-in-out infinite; }
.tbtn { transition: transform 0.08s ease, box-shadow 0.08s ease; }
.tbtn:active { transform: translateY(2px); box-shadow: inset 0 2px 4px rgba(0,0,0,0.55), inset 0 -1px 0 rgba(255,255,255,0.2), 0 1px 0 rgba(0,0,0,0.5) !important; }
@media (max-width: 880px) {
  .cassette-row { grid-template-columns: minmax(0,1fr) !important; }
  .vu-wrap { justify-self: center; }
  .kpt-wordmark { font-size: clamp(110px,28vw,220px) !important; }
}`;

export default function HeroCassette() {
  return (
    <section className={inter.className} style={{
      position: "relative", background: W, color: I, isolation: "isolate", overflow: "hidden",
      padding: "clamp(28px,4vh,56px) clamp(20px,5vw,72px) clamp(56px,9vh,120px)", minHeight: "100vh",
    }}>
      <Atmosphere />
      <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: 18, paddingBottom: 18 }}>
        <ModelPlate>KPT-DECK · MK IV · STEREO · NORMAL/CrO₂</ModelPlate>
        <span aria-hidden style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(200,200,204,0.25), transparent)" }} />
        <Ready />
      </div>
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", marginTop: "clamp(12px,2vh,24px)" }}>
        <motion.h1 aria-label="KPT" {...fadeUp(0, 10)} className="kpt-wordmark" style={{
          margin: 0, fontWeight: 900, fontSize: "clamp(140px,22vw,320px)", lineHeight: 0.82, letterSpacing: "-0.06em",
          background: `linear-gradient(180deg, ${AH} 0%, ${A} 28%, #6E6E74 52%, ${A} 76%, ${AH} 100%)`,
          WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
          WebkitTextStroke: "1px rgba(0,0,0,0.35)",
          textShadow: "0 4px 0 rgba(0,0,0,0.45), 0 12px 28px rgba(0,0,0,0.55)",
          transform: "scaleY(1.18) scaleX(0.92)", transformOrigin: "center bottom",
        }}>KPT</motion.h1>
        <div aria-hidden style={{
          margin: "8px auto 0", maxWidth: 640, height: 1, opacity: 0.55,
          background: `linear-gradient(90deg, transparent, ${AD} 18%, ${A} 50%, ${AD} 82%, transparent)`,
        }} />
      </div>
      <div className="cassette-row" style={{ position: "relative", zIndex: 2, marginTop: "clamp(28px,4.5vh,56px)", display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", alignItems: "center", gap: "clamp(20px,3vw,48px)" }}>
        <motion.div {...fadeUp(0.2, 24)} style={{ display: "flex", justifyContent: "center", minWidth: 0 }}><Cassette /></motion.div>
        <motion.div {...fadeUp(0.45)} className="vu-wrap"><VuMeter /></motion.div>
      </div>
      <motion.div {...fadeUp(0.6, 18)} style={{ position: "relative", zIndex: 2, marginTop: "clamp(28px,4.5vh,52px)", display: "flex", justifyContent: "center", gap: "clamp(10px,1.4vw,20px)", flexWrap: "wrap" }}>{BTNS.map((b) => <TBtn key={b.l} {...b} />)}</motion.div>
      <motion.div {...fadeUp(0.8, 12)} style={{ position: "relative", zIndex: 2, marginTop: "clamp(22px,3.5vh,40px)", textAlign: "center" }}>
        <span className={hand.className} style={{
          color: I, fontSize: "clamp(24px,2.6vw,38px)",
          display: "inline-flex", alignItems: "baseline", gap: "0.55em",
          transform: "rotate(-1.3deg)", textShadow: "0 1px 0 rgba(0,0,0,0.25)",
        }}>
          <span style={{ color: R, fontWeight: 700 }}>Side A</span>
          <Dot />Tracks 01-04<Dot />Total 47 minutes
        </span>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 1 }} style={{ position: "relative", zIndex: 2, marginTop: "clamp(28px,4vh,48px)", paddingTop: 16, borderTop: "1px dashed rgba(245,235,208,0.18)", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "clamp(14px,2vw,32px)", fontSize: 11, letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(245,235,208,0.7)" }}>
        {TRACKS.map(([n, name], i) => (
          <span key={n} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: T, fontWeight: 700 }}>{n}</span><span>{name}</span>
            {i < TRACKS.length - 1 && <span aria-hidden style={{ opacity: 0.4, marginLeft: 8 }}>—</span>}
          </span>
        ))}
      </motion.div>
      <style>{CSS}</style>
    </section>
  );
}

const Dot = () => <span aria-hidden style={{ opacity: 0.55 }}>·</span>;

function Cassette() {
  const cog = `conic-gradient(from 0deg, ${A}, ${AD} 18deg, ${AH} 36deg, ${AD} 54deg, ${A} 72deg, ${AD} 90deg, ${AH} 108deg, ${AD} 126deg, ${A} 144deg, ${AD} 162deg, ${AH} 180deg, ${AD} 198deg, ${A} 216deg, ${AD} 234deg, ${AH} 252deg, ${AD} 270deg, ${A} 288deg, ${AD} 306deg, ${AH} 324deg, ${AD} 342deg, ${A})`;
  return (
    <div style={{
      position: "relative", width: "min(720px,92vw)", aspectRatio: "1.55 / 1", borderRadius: 14, padding: "clamp(14px,2.2vw,22px)",
      background: `linear-gradient(180deg, #1a120a 0%, ${X} 50%, #07050b 100%)`,
      boxShadow: `0 30px 60px -20px rgba(0,0,0,0.7), 0 12px 22px -10px rgba(0,0,0,0.55),
        inset 0 2px 0 rgba(255,255,255,0.12), inset 0 -3px 0 rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.04)`,
    }}>
      <Screw style={{ top: 10, left: 10 }} /><Screw style={{ top: 10, right: 10 }} />
      <Screw style={{ bottom: 10, left: 10 }} /><Screw style={{ bottom: 10, right: 10 }} />
      <div style={{
        position: "relative", width: "100%", height: "60%", borderRadius: 6,
        background: `linear-gradient(180deg, #FBF3DC 0%, ${I} 55%, #E6D8B5 100%)`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.85), inset 0 -2px 8px rgba(94,55,23,0.18), 0 1px 0 rgba(0,0,0,0.4)",
        padding: "clamp(10px,1.6vw,18px) clamp(14px,2vw,22px)", color: X, overflow: "hidden",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, paddingBottom: 8, borderBottom: "1px solid rgba(94,55,23,0.35)" }}>
          <CL size="sm">KPT</CL>
          <span style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: TD, fontWeight: 700 }}>C-90 · TYPE II</span>
          <CL size="sm">Side A</CL>
        </div>
        <div style={{ paddingTop: 8, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <CL size="lg">KPT · MIXTAPE 26</CL>
            <div style={{ marginTop: 2 }}><CL size="md" italic>designs for the modern web</CL></div>
          </div>
          <div style={{ display: "flex", gap: 18, alignItems: "center" }}><MiniSpool /><MiniSpool /></div>
        </div>
        <div style={{
          position: "absolute", left: "clamp(14px,2vw,22px)", right: "clamp(14px,2vw,22px)", bottom: 8,
          display: "flex", justifyContent: "space-between", gap: 10,
          fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase",
          color: TD, fontWeight: 700, borderTop: "1px dashed rgba(94,55,23,0.5)", paddingTop: 4,
        }}>{TRACKS.map(([n, name]) => <span key={n}>{n} {name}</span>)}</div>
      </div>
      <div style={{
        position: "relative", width: "100%", height: "calc(40% - 12px)", marginTop: 12, borderRadius: 4,
        background: `${ALU_BRUSH}, linear-gradient(180deg, ${AH} 0%, ${A} 35%, ${AD} 100%)`,
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.45), inset 0 -1px 0 rgba(255,255,255,0.5)",
        padding: "clamp(8px,1.2vw,14px) clamp(40px,7vw,80px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "clamp(20px,3vw,40px)", overflow: "hidden",
      }}>
        <div aria-hidden style={{
          position: "absolute", inset: "clamp(6px,1vw,10px) clamp(28px,5vw,56px)", borderRadius: 3,
          background: `radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.06), transparent 55%), linear-gradient(180deg, ${WD} 0%, ${X} 100%)`,
          boxShadow: "inset 0 3px 8px rgba(0,0,0,0.85), inset 0 -1px 0 rgba(255,255,255,0.06)",
        }} />
        <div aria-hidden style={{
          position: "absolute", left: "26%", right: "26%", top: "50%",
          height: "clamp(10px,1.4vw,14px)", transform: "translateY(-50%)", borderRadius: 1,
          background: `linear-gradient(180deg, ${T} 0%, ${TD} 60%, #3a230f 100%)`,
          boxShadow: "0 1px 0 rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.15)",
        }} />
        <Spool grad={cog} /><Spool grad={cog} fast />
      </div>
      <div aria-hidden style={{
        position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)",
        width: "60%", height: 6, display: "flex", justifyContent: "space-between",
      }}>
        <span style={{ width: 14, height: 6, background: X, borderRadius: 1 }} />
        <span style={{ width: 14, height: 6, background: X, borderRadius: 1 }} />
      </div>
    </div>
  );
}

function MiniSpool() {
  return (
    <div aria-hidden style={{ width: 34, height: 34, borderRadius: "50%", background: `radial-gradient(circle at 35% 30%, #4a3a26, ${X} 70%)`, boxShadow: "inset 0 2px 4px rgba(0,0,0,0.85), 0 0 0 1.5px rgba(94,55,23,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="spool" style={{ width: 14, height: 14, borderRadius: "50%", position: "relative", background: "radial-gradient(circle at 30% 30%, #C8C8CC, #6E6E74 70%)", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.5)" }}>
        {[0, 60, 120, 180, 240, 300].map((d) => (
          <span key={d} style={{ position: "absolute", top: "50%", left: "50%", width: 2, height: 6, background: X, borderRadius: 1, transform: `translate(-50%,-50%) rotate(${d}deg) translateY(-3px)` }} />
        ))}
      </div>
    </div>
  );
}

function Spool({ grad, fast }: { grad: string; fast?: boolean }) {
  return (
    <div style={{ position: "relative", zIndex: 1, width: "clamp(64px,9vw,86px)", aspectRatio: "1 / 1", borderRadius: "50%", background: `radial-gradient(circle at 35% 30%, ${WH} 0%, #1a120a 60%, ${X} 100%)`, boxShadow: "inset 0 0 0 2px rgba(94,55,23,0.55), inset 0 4px 10px rgba(0,0,0,0.85), 0 1px 0 rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className={fast ? "spool-fast" : "spool"} style={{ width: "70%", height: "70%", borderRadius: "50%", position: "relative", background: grad, boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.45), inset 0 0 12px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} style={{ position: "absolute", top: "50%", left: "50%", width: "10%", height: "32%", background: "linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.85))", borderRadius: 1, transform: `translate(-50%,-50%) rotate(${i * 45}deg) translateY(-32%)` }} />
        ))}
        <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "22%", height: "22%", borderRadius: "50%", background: `radial-gradient(circle at 30% 30%, ${AH}, #6E6E74 75%)`, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.65)" }} />
      </div>
    </div>
  );
}

function Screw({ style }: { style: CSSProperties }) {
  return (
    <span aria-hidden style={{ position: "absolute", width: 10, height: 10, borderRadius: "50%", background: `radial-gradient(circle at 30% 30%, ${AH}, #6E6E74 70%, #2a2a30 100%)`, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.1)", ...style }}>
      <span style={{ position: "absolute", inset: 0, margin: "auto", width: "70%", height: 1, background: "rgba(0,0,0,0.65)", top: "50%", transform: "translateY(-50%) rotate(35deg)" }} />
    </span>
  );
}

function VuMeter() {
  const ticks = Array.from({ length: 13 }).map((_, i) => {
    const t = i / 12, a = Math.PI - t * Math.PI;
    return { i, t, x1: 100 + Math.cos(a) * 86, y1: 118 - Math.sin(a) * 86, x2: 100 + Math.cos(a) * 74, y2: 118 - Math.sin(a) * 74 };
  });
  return (
    <div className="vu-meter" style={{ position: "relative", width: "clamp(160px,18vw,220px)", aspectRatio: "1.4 / 1", borderRadius: 8, padding: 8, background: `linear-gradient(180deg, #1a120a 0%, ${X} 100%)`, boxShadow: "0 12px 24px -10px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.1), inset 0 -2px 0 rgba(0,0,0,0.5)" }}>
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 6, overflow: "hidden", background: `linear-gradient(180deg, #FBF3DC 0%, ${I} 60%, #E6D8B5 100%)`, boxShadow: "inset 0 0 0 1.5px rgba(0,0,0,0.55), inset 0 2px 6px rgba(0,0,0,0.25)" }}>
        <svg viewBox="0 0 200 130" preserveAspectRatio="none" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <defs><linearGradient id="vuArc" x1="0" x2="1">
            <stop offset="0%" stopColor="#0F0A05" /><stop offset="65%" stopColor="#0F0A05" />
            <stop offset="65%" stopColor={R} /><stop offset="100%" stopColor={R} />
          </linearGradient></defs>
          <path d="M 18 118 A 90 90 0 0 1 182 118" fill="none" stroke="url(#vuArc)" strokeWidth="2" />
          {ticks.map(({ i, t, x1, y1, x2, y2 }) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={t > 0.66 ? R : "#0F0A05"} strokeWidth={i % 3 === 0 ? 1.4 : 0.7} />
          ))}
          <text x="100" y="38" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0F0A05" letterSpacing="2">VU</text>
          <text x="22" y="125" fontSize="7" fill="#0F0A05" fontWeight="700">-20</text>
          <text x="92" y="32" fontSize="7" fill="#0F0A05" fontWeight="700">0</text>
          <text x="172" y="125" fontSize="7" fill={R} fontWeight="700">+5</text>
          <text x="100" y="58" textAnchor="middle" fontSize="6" fill={TD} letterSpacing="1">dB · Side A</text>
        </svg>
        <div className="vu-needle" style={{ position: "absolute", left: "50%", bottom: "10%", width: 2, height: "70%", transform: "rotate(-32deg)", transformOrigin: "50% 100%", borderRadius: 1, background: `linear-gradient(180deg, ${R} 0%, #0F0A05 100%)` }} />
        <span aria-hidden style={{ position: "absolute", left: "50%", bottom: "10%", transform: "translate(-50%,50%)", width: 10, height: 10, borderRadius: "50%", background: `radial-gradient(circle at 30% 30%, ${AH}, ${AD} 75%)`, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.4)" }} />
      </div>
    </div>
  );
}

function TBtn({ l, g, rec }: { l: string; g: string; rec?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <button type="button" aria-label={l} className="tbtn" style={{ position: "relative", width: "clamp(58px,7vw,78px)", height: "clamp(46px,5vw,58px)", borderRadius: 6, border: "1px solid rgba(0,0,0,0.6)", cursor: "pointer", padding: 0, background: `linear-gradient(180deg, ${AH} 0%, ${A} 35%, #9C9CA2 70%, ${AD} 100%), ${ALU_BRUSH}`, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.85), inset 0 -2px 0 rgba(0,0,0,0.45), 0 4px 0 rgba(0,0,0,0.55), 0 8px 14px -6px rgba(0,0,0,0.55)`, color: X, fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: rec ? 0 : 14, lineHeight: 1 }}>{g}</span>
        {rec && <span className="rec-led" aria-hidden style={{ width: 14, height: 14, borderRadius: "50%", background: `radial-gradient(circle at 30% 30%, #ff8a8a, ${R} 60%, #8a0000 100%)`, boxShadow: `0 0 10px ${RG}, inset 0 -2px 3px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4)` }} />}
      </button>
      <span style={{ fontSize: 9, letterSpacing: "0.36em", textTransform: "uppercase", color: rec ? R : "rgba(245,235,208,0.78)", fontWeight: 700, textShadow: "0 1px 0 rgba(0,0,0,0.5)" }}>{l}</span>
    </div>
  );
}

function ModelPlate({ children }: { children: ReactNode }) {
  const sc: CSSProperties = { position: "relative", top: "auto", left: "auto", width: 7, height: 7 };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", borderRadius: 3, background: `linear-gradient(180deg, ${AH} 0%, ${A} 50%, ${AD} 100%)`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.4), 0 1px 0 rgba(0,0,0,0.5)", color: X, fontSize: 9.5, letterSpacing: "0.32em", textTransform: "uppercase", fontWeight: 700 }}><Screw style={sc} /><span>{children}</span><Screw style={sc} /></span>
  );
}

function Ready() {
  return (
    <span className={led.className} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", borderRadius: 3, background: "linear-gradient(180deg, #1a0606, #0a0202)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.06)", color: R, fontSize: 18, letterSpacing: "0.18em", textShadow: `0 0 6px ${R}, 0 0 14px ${RG}` }}>
      <span className="ready-led" aria-hidden style={{ width: 8, height: 8, borderRadius: "50%", background: R, boxShadow: `0 0 8px ${R}, 0 0 16px ${RG}` }} />READY
    </span>
  );
}

function CL({ size, italic, children }: { size: "sm" | "md" | "lg"; italic?: boolean; children: ReactNode }) {
  const sz = { sm: "clamp(16px,1.6vw,22px)", md: "clamp(18px,1.8vw,26px)", lg: "clamp(28px,3.6vw,52px)" }[size];
  return (
    <span className={hand.className} style={{ fontSize: sz, fontWeight: size === "lg" ? 700 : 600, color: size === "lg" ? "#1a0e02" : TD, lineHeight: 1.05, fontStyle: italic ? "italic" : "normal", display: "inline-block", transform: size === "lg" ? "rotate(-1.6deg)" : "rotate(-0.6deg)" }}>{children}</span>
  );
}

function Atmosphere() {
  const layer = (z: number, s: CSSProperties): CSSProperties => ({ position: "absolute", inset: 0, zIndex: z, pointerEvents: "none", ...s });
  const wood = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='480' height='480'><filter id='w'><feTurbulence type='turbulence' baseFrequency='0.018 0.6' numOctaves='3' seed='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.18  0 0 0 0 0.10  0 0 0 0 0.05  0 0 0 0.42 0'/></filter><rect width='100%' height='100%' filter='url(%23w)'/></svg>\")";
  const grain = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.95  0 0 0 0 0.92  0 0 0 0 0.82  0 0 0 0.18 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";
  return (
    <>
      <div aria-hidden style={layer(0, { opacity: 0.78, mixBlendMode: "overlay", backgroundSize: "480px 480px", backgroundImage: wood })} />
      <div aria-hidden style={layer(0, { background: `radial-gradient(70% 55% at 50% 35%, rgba(120,80,40,0.18), transparent 60%), radial-gradient(120% 90% at 50% 130%, rgba(0,0,0,0.55), transparent 60%), linear-gradient(180deg, transparent, rgba(0,0,0,0.25))` })} />
      <div aria-hidden style={layer(1, { opacity: 0.18, mixBlendMode: "multiply", backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px)" })} />
      <div aria-hidden style={layer(1, { opacity: 0.32, mixBlendMode: "overlay", backgroundSize: "240px 240px", backgroundImage: grain })} />
    </>
  );
}
