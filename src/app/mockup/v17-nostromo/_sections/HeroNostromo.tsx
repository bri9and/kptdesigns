"use client";

import { VT323 } from "next/font/google";
import { motion } from "framer-motion";
import { useEffect, useState, type CSSProperties } from "react";

const vt = VT323({ subsets: ["latin"], weight: "400" });

const COCKPIT = "#0A0A0F";
const AMBER = "#FFB000";
const CYAN = "#00E5FF";
const ALERT = "#FF3030";
const METAL = "#3A3A40";
const BEIGE = "#D4C9A8";
const GREEN = "#3DFF7A";

const metalPanel: CSSProperties = {
  background: `linear-gradient(180deg, ${METAL} 0%, #1F1F25 50%, #15151A 100%)`,
  border: "1px solid rgba(0,0,0,0.6)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -2px 6px rgba(0,0,0,0.65), 0 4px 14px rgba(0,0,0,0.6)",
  borderRadius: 4,
  position: "relative",
};
const beigePanel: CSSProperties = {
  background: "linear-gradient(180deg, #D4C9A8 0%, #B6AB8B 60%, #93886A 100%)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -3px 8px rgba(0,0,0,0.35), 0 6px 18px rgba(0,0,0,0.5)",
  border: "1px solid #2A2620",
  borderRadius: 4,
  position: "relative",
};

const screwBase: CSSProperties = {
  position: "absolute", width: 10, height: 10, borderRadius: "50%",
  background: "radial-gradient(circle at 35% 30%, #888, #333 60%, #111 100%)",
  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.35), inset 0 -1px 1px rgba(0,0,0,0.6), 0 1px 1px rgba(0,0,0,0.6)",
  zIndex: 4,
};
const Screws = () => (
  <>
    {[
      { top: 6, left: 6 }, { top: 6, right: 6 },
      { bottom: 6, left: 6 }, { bottom: 6, right: 6 },
    ].map((p, i) => (
      <span key={i} aria-hidden style={{ ...screwBase, ...p }}>
        <span style={{ position: "absolute", inset: 1, borderTop: "1.5px solid rgba(0,0,0,0.65)", transform: "rotate(35deg)", top: "45%" }} />
      </span>
    ))}
  </>
);

const BOOT = [
  "INITIATING KPT.WEB MODULE", "REGISTRAR ONLINE", "HOST ONLINE",
  "DESIGNER STANDBY", "AGENT STANDBY", "MU/TH/UR HANDSHAKE OK", "SUBSYSTEM SYNC //",
];

function CRTPanel() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const id = setInterval(() => setTick(t => t + 1), 700); return () => clearInterval(id); }, []);
  const lines = Array.from({ length: 9 }, (_, i) => BOOT[(tick + i) % BOOT.length]);
  return (
    <div style={{ ...metalPanel, padding: 16, height: "100%" }}>
      <Screws />
      <div style={{ fontSize: 11, color: BEIGE, letterSpacing: "0.18em", marginBottom: 8, textTransform: "uppercase" }}>CRT-01 · BOOT STREAM</div>
      <div style={{
        background: "radial-gradient(ellipse at center, #0E1F18 0%, #050A08 80%)",
        border: "2px solid #000", borderRadius: 12, padding: "14px 16px",
        height: "calc(100% - 28px)", overflow: "hidden", position: "relative",
        boxShadow: "inset 0 0 60px rgba(0,229,255,0.08), inset 0 0 12px rgba(0,0,0,0.9)",
      }}>
        <div style={{ color: CYAN, fontSize: 18, lineHeight: "20px", textShadow: `0 0 6px ${CYAN}, 0 0 12px rgba(0,229,255,0.6)` }}>
          {lines.map((l, i) => (
            <div key={`${tick}-${i}`} style={{ opacity: 1 - i * 0.09 }}>
              &gt; {l}{i === 0 && <span style={{ color: AMBER, marginLeft: 6 }}>_</span>}
            </div>
          ))}
        </div>
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.45) 0 1px, transparent 1px 3px)",
          pointerEvents: "none",
        }} />
      </div>
    </div>
  );
}

function ToggleRow() {
  const [states, setStates] = useState<boolean[]>([true, true, false, true]);
  const labels = ["NAV", "PWR", "COM", "AGT"];
  return (
    <div style={{ ...beigePanel, padding: 16, height: "100%" }}>
      <Screws />
      <div style={{ fontSize: 11, color: "#2A2620", letterSpacing: "0.22em", marginBottom: 12, fontWeight: 700 }}>SWITCHBANK · 04</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {labels.map((lab, i) => (
          <button key={lab} onClick={() => setStates(s => s.map((v, j) => j === i ? !v : v))}
            style={{ all: "unset", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 30, height: 56, borderRadius: 6,
              background: "linear-gradient(180deg, #1A1A1F 0%, #0A0A0F 100%)",
              border: "1px solid #000", position: "relative",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.8), inset 0 -1px 0 rgba(255,255,255,0.05)", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", left: "50%", width: 14, height: 26, marginLeft: -7,
                top: states[i] ? 4 : 26,
                background: "linear-gradient(180deg, #E8E4D8 0%, #9B957F 60%, #5C5847 100%)",
                borderRadius: 3,
                boxShadow: "0 2px 3px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -2px 1px rgba(0,0,0,0.4)",
                transition: "top 120ms cubic-bezier(.5,1.6,.4,1)",
              }} />
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", background: "#0A0A0F", padding: "2px 8px", borderRadius: 2, border: "1px solid #000" }}>
              <span style={{ color: states[i] ? GREEN : "#555", textShadow: states[i] ? `0 0 4px ${GREEN}` : "none" }}>{lab}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Gauge() {
  const [angle, setAngle] = useState(-30);
  useEffect(() => { const id = setInterval(() => setAngle(-60 + Math.random() * 120), 900); return () => clearInterval(id); }, []);
  return (
    <div style={{ ...metalPanel, padding: 14, height: "100%", display: "flex", flexDirection: "column" }}>
      <Screws />
      <div style={{ fontSize: 11, color: BEIGE, letterSpacing: "0.2em", marginBottom: 8 }}>OPS PRESSURE · KPA</div>
      <div style={{ flex: 1, display: "grid", placeItems: "center" }}>
        <div style={{
          position: "relative", width: 150, height: 150, borderRadius: "50%",
          background: "radial-gradient(circle at 30% 25%, #2A2A30 0%, #0A0A0F 70%)",
          border: "6px solid", borderColor: "#1F1F25 #0A0A0F #050507 #1A1A1F",
          boxShadow: "inset 0 0 30px rgba(0,0,0,0.85), 0 4px 8px rgba(0,0,0,0.5)",
        }}>
          {Array.from({ length: 21 }).map((_, i) => (
            <div key={i} style={{
              position: "absolute", left: "50%", top: "50%", width: 1,
              height: i % 5 === 0 ? 12 : 6,
              background: i % 5 === 0 ? AMBER : "#665030",
              transformOrigin: "50% 65px",
              transform: `translate(-50%, -65px) rotate(${-90 + i * 9}deg)`,
            }} />
          ))}
          <motion.div animate={{ rotate: angle }} transition={{ type: "spring", stiffness: 60, damping: 8 }}
            style={{
              position: "absolute", left: "50%", top: "50%", width: 2, height: 56,
              marginLeft: -1, marginTop: -50,
              background: `linear-gradient(180deg, ${CYAN} 0%, #007A8A 100%)`,
              transformOrigin: "50% 90%", boxShadow: `0 0 6px ${CYAN}`, borderRadius: 1,
            }} />
          <div style={{
            position: "absolute", left: "50%", top: "50%", width: 14, height: 14,
            marginLeft: -7, marginTop: -7, borderRadius: "50%",
            background: "radial-gradient(circle at 35% 30%, #999, #222)",
            boxShadow: "0 0 4px rgba(0,0,0,0.9)",
          }} />
          <div style={{
            position: "absolute", bottom: 22, left: 0, right: 0, textAlign: "center",
            fontSize: 16, color: AMBER, letterSpacing: "0.1em", textShadow: `0 0 6px ${AMBER}`,
          }}>{Math.round(50 + angle)} K</div>
        </div>
      </div>
    </div>
  );
}

const LEDS = [
  { label: "COMMS LINK", color: GREEN, period: 1700 },
  { label: "LIFE SUPPORT", color: GREEN, period: 2300 },
  { label: "AGT.CALLER", color: AMBER, period: 1100 },
  { label: "DEPLOY", color: ALERT, period: 1900 },
];

function LedGrid() {
  const [t, setT] = useState(0);
  useEffect(() => { const id = setInterval(() => setT(x => x + 1), 130); return () => clearInterval(id); }, []);
  return (
    <div style={{ ...beigePanel, padding: 14, height: "100%" }}>
      <Screws />
      <div style={{ fontSize: 11, color: "#2A2620", letterSpacing: "0.22em", marginBottom: 10, fontWeight: 700 }}>STATUS BUS · 04</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {LEDS.map((l, i) => {
          const phase = (t * 130 + i * 311) % l.period;
          const on = phase < l.period * (0.45 + (i % 2) * 0.2);
          return (
            <div key={l.label} style={{
              background: "#1A1714", borderRadius: 3, padding: "8px 10px",
              display: "flex", alignItems: "center", gap: 10,
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.7)",
            }}>
              <span style={{
                width: 14, height: 14, borderRadius: "50%",
                background: on
                  ? `radial-gradient(circle at 35% 30%, #fff 0%, ${l.color} 35%, #1a0a00 100%)`
                  : "radial-gradient(circle at 35% 30%, #444, #0a0a0a)",
                boxShadow: on ? `0 0 10px ${l.color}, 0 0 18px ${l.color}` : "inset 0 0 4px #000",
                border: "1px solid #000",
              }} />
              <span style={{ color: "#E8E4D8", fontSize: 14, letterSpacing: "0.14em" }}>{l.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function HeroNostromo() {
  return (
    <section className={vt.className} style={{
      position: "relative", minHeight: "100vh",
      background: `radial-gradient(ellipse at 50% 0%, #14141C 0%, ${COCKPIT} 60%)`,
      padding: "28px 20px 80px", overflow: "hidden", color: AMBER,
    }}>
      <style>{`
        @keyframes nostromo-cursor { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
        @keyframes nostromo-flicker { 0%, 19%, 22%, 62%, 64%, 100% { opacity: 1 } 20%, 21%, 63% { opacity: 0.85 } }
        @keyframes nostromo-alert {
          0%, 100% { background-color: #1a0808; box-shadow: inset 0 0 10px rgba(255,48,48,0.3); }
          50% { background-color: #3a0a0a; box-shadow: inset 0 0 30px rgba(255,48,48,0.7), 0 0 20px rgba(255,48,48,0.4); }
        }
        @media (max-width: 820px) {
          .kpt-nostromo-grid { grid-template-columns: 1fr !important; grid-template-rows: auto !important; }
          .kpt-nostromo-grid > div { grid-row: auto !important; grid-column: auto !important; min-height: 220px; }
        }
      `}</style>

      <div style={{ ...metalPanel, padding: "14px 22px", marginBottom: 18, animation: "nostromo-flicker 7s infinite" }}>
        <Screws />
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          flexWrap: "wrap", gap: 12, color: AMBER,
          fontSize: "clamp(28px, 5.5vw, 64px)", lineHeight: 1, letterSpacing: "0.08em",
          textShadow: `0 0 10px ${AMBER}, 0 0 22px rgba(255,176,0,0.45)`,
        }}>
          <span>MU/TH/UR</span>
          <span style={{ color: BEIGE, fontSize: "clamp(14px, 1.8vw, 22px)", letterSpacing: "0.3em" }}>CONFIG: KPT.WEB</span>
          <span style={{ color: GREEN, fontSize: "clamp(14px, 1.8vw, 22px)", letterSpacing: "0.3em", textShadow: `0 0 8px ${GREEN}` }}>
            STATUS: NOMINAL<span style={{ animation: "nostromo-cursor 1s steps(1) infinite" }}>_</span>
          </span>
        </div>
      </div>

      <div className="kpt-nostromo-grid" style={{
        display: "grid",
        gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr) minmax(0,1fr)",
        gridTemplateRows: "minmax(220px, 1fr) minmax(180px, auto)", gap: 14,
      }}>
        <div style={{ gridRow: "1 / span 2" }}><CRTPanel /></div>
        <div><ToggleRow /></div>
        <div><Gauge /></div>
        <div style={{ gridColumn: "2 / span 2" }}><LedGrid /></div>
      </div>

      <div style={{
        marginTop: 16, padding: "14px 22px", border: "2px solid #5A1010", borderRadius: 4,
        color: "#FFD8D8", fontSize: "clamp(18px, 2.2vw, 26px)", letterSpacing: "0.18em",
        animation: "nostromo-alert 1.4s ease-in-out infinite",
        display: "flex", alignItems: "center", gap: 16, textShadow: `0 0 8px ${ALERT}`,
      }}>
        <span style={{ color: ALERT, fontSize: "1.3em" }}>&#9650;</span>
        <span style={{ color: ALERT }}>PROXIMITY ALERT</span>
        <span style={{ color: BEIGE, opacity: 0.6 }}>·</span>
        <span>12 INBOUND CALLS</span>
        <span style={{ marginLeft: "auto", color: AMBER, fontSize: "0.8em", letterSpacing: "0.3em" }}>AGT.CALLER ENGAGED</span>
      </div>

      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)",
        mixBlendMode: "overlay", pointerEvents: "none", zIndex: 50,
      }} />
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.7) 100%)",
        pointerEvents: "none", zIndex: 51,
      }} />
    </section>
  );
}
