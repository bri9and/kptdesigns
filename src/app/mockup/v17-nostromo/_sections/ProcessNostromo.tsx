"use client";

import { VT323 } from "next/font/google";
import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const vt = VT323({ subsets: ["latin"], weight: "400" });

const C = {
  black: "#0A0A0F",
  panel: "#11111A",
  amber: "#FFB000",
  amberDim: "#7A5500",
  cyan: "#00E5FF",
  red: "#FF3030",
  metal: "#3A3A40",
  beige: "#D4C9A8",
};

type Stage = { id: string; title: string; body: string };
const STAGES: Stage[] = [
  { id: "01", title: "DISCOVERY", body: "INITIAL CONTACT / COMMS ESTABLISHED" },
  { id: "02", title: "BUILD", body: "DESIGN PHASE / CODE PHASE / WEEKLY DEBRIEF" },
  { id: "03", title: "VERIFICATION", body: "PRIVATE FLIGHT / CLIENT APPROVAL / PUBLIC LAUNCH" },
  { id: "04", title: "DELIVERY", body: "SOURCE TRANSFER / AGENT INTEGRATION / EOM" },
];

const STEP_DURATION = 600;
const STEP_GAP = 700;

function Dot({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block", width: 8, height: 8, borderRadius: 999,
        background: color, boxShadow: `0 0 8px ${color}`,
        animation: `nostromo-blink 1.6s ${delay}ms infinite`,
      }}
    />
  );
}

export default function ProcessNostromo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [checked, setChecked] = useState<boolean[]>(() => STAGES.map(() => false));
  const done = useMemo(() => checked.filter(Boolean).length, [checked]);
  const readiness = Math.round((done / STAGES.length) * 100);

  useEffect(() => {
    if (!inView) return;
    const timers = STAGES.map((_, idx) =>
      setTimeout(() => {
        setChecked((p) => { const n = [...p]; n[idx] = true; return n; });
      }, idx * STEP_GAP + STEP_DURATION)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <section
      ref={ref}
      className={`${vt.className} relative w-full overflow-hidden`}
      style={{ background: C.black, color: C.amber, padding: "96px 16px" }}
    >
      <style>{`
        @keyframes nostromo-blink { 0%,60%{opacity:1} 70%,100%{opacity:.15} }
        @keyframes nostromo-flicker { 0%,96%,100%{opacity:1} 97%{opacity:.7} 98%{opacity:.95} }
        @keyframes nostromo-sweep { 0%{transform:translateY(-100%)} 100%{transform:translateY(100%)} }
        .nostromo-scanlines::before {
          content:""; position:absolute; inset:0; pointer-events:none; z-index:2;
          background-image: repeating-linear-gradient(to bottom,
            rgba(255,176,0,.05) 0, rgba(255,176,0,.05) 1px, transparent 1px, transparent 3px);
        }
        .nostromo-sweep {
          position:absolute; left:0; right:0; height:60%; pointer-events:none; z-index:1;
          background: linear-gradient(to bottom, transparent, rgba(255,176,0,.06), transparent);
          animation: nostromo-sweep 7s linear infinite;
        }
      `}</style>

      <div className="nostromo-sweep" aria-hidden />
      <div className="nostromo-scanlines absolute inset-0" aria-hidden />

      <div className="relative mx-auto" style={{ maxWidth: 920, zIndex: 3 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
          <div className="flex items-center gap-3">
            <Dot color={C.red} />
            <span style={{ fontSize: 18, color: C.amberDim, letterSpacing: ".18em" }}>
              MUTHUR-6000 // OUTBOUND
            </span>
          </div>
          <span style={{ fontSize: 18, color: C.amberDim, letterSpacing: ".18em" }}>CH-47</span>
        </div>

        <h2
          style={{
            fontSize: "clamp(34px, 6vw, 64px)", lineHeight: 1, color: C.amber,
            textShadow: `0 0 14px ${C.amber}66, 0 0 2px ${C.amber}`,
            letterSpacing: ".04em", animation: "nostromo-flicker 5s infinite",
          }}
        >
          TRANSMISSION 05 · LAUNCH SEQUENCE
        </h2>
        <div style={{ marginTop: 8, fontSize: 20, color: C.beige, letterSpacing: ".12em" }}>
          USCSS-KPT // CHECKLIST · PRE-IGNITION HOLD
        </div>

        <div
          style={{
            marginTop: 32, background: C.panel, border: `1px solid ${C.metal}`,
            boxShadow: `inset 0 0 0 1px #1A1A24, 0 0 24px rgba(255,176,0,0.08)`, position: "relative",
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{
              padding: "10px 18px", borderBottom: `1px solid ${C.metal}`,
              background: "linear-gradient(to bottom,#15151E,#0E0E15)",
              fontSize: 18, color: C.amberDim, letterSpacing: ".16em",
            }}
          >
            <div className="flex items-center gap-3"><Dot color={C.cyan} /><span>PANEL · LSC-04</span></div>
            <span className="hidden sm:inline">SECTOR 5 // BAY 12</span>
            <div className="flex items-center gap-3"><span>STATUS</span><Dot color={C.amber} delay={400} /></div>
          </div>

          <div style={{ padding: "22px 18px 28px" }}>
            {STAGES.map((stage, i) => {
              const on = checked[i];
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35, delay: i * 0.12 }}
                  style={{
                    display: "grid", gridTemplateColumns: "44px 1fr auto",
                    alignItems: "start", gap: 14, padding: "14px 4px",
                    borderBottom: i < STAGES.length - 1 ? `1px dashed ${C.metal}` : "none",
                  }}
                >
                  <div
                    aria-hidden
                    style={{
                      width: 32, height: 32, border: `1.5px solid ${on ? C.cyan : C.amberDim}`,
                      display: "grid", placeItems: "center", fontSize: 26, color: C.cyan,
                      textShadow: on ? `0 0 10px ${C.cyan}` : "none",
                      transition: "border-color .4s, box-shadow .4s",
                      boxShadow: on ? `0 0 10px ${C.cyan}55` : "none", background: "#0B0B12",
                    }}
                  >
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={on ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                      style={{ display: "inline-block", lineHeight: 1 }}
                    >✓</motion.span>
                  </div>
                  <div>
                    <div style={{ fontSize: 24, color: C.amber, letterSpacing: ".08em", textShadow: `0 0 6px ${C.amber}55` }}>
                      STAGE {stage.id} · {stage.title}
                    </div>
                    <div style={{ fontSize: 18, color: C.beige, letterSpacing: ".12em", marginTop: 2 }}>
                      {stage.body}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 16, letterSpacing: ".18em",
                      color: on ? C.cyan : C.amberDim,
                      border: `1px solid ${on ? C.cyan : C.metal}`,
                      padding: "2px 8px", whiteSpace: "nowrap",
                      alignSelf: "center", background: "#0B0B12",
                    }}
                  >
                    {on ? "GREEN" : "HOLD"}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div style={{ borderTop: `1px solid ${C.metal}`, padding: "18px 18px 22px", background: "#0C0C14" }}>
            <div className="flex items-end justify-between" style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 22, color: C.amber, letterSpacing: ".14em" }}>LAUNCH READINESS</span>
              <span
                style={{
                  fontSize: 28, color: readiness === 100 ? C.cyan : C.amber,
                  textShadow: readiness === 100 ? `0 0 10px ${C.cyan}` : `0 0 6px ${C.amber}66`,
                  letterSpacing: ".06em",
                }}
              >{readiness}%</span>
            </div>
            <div style={{ height: 22, border: `1px solid ${C.metal}`, background: "#06060B", position: "relative", overflow: "hidden" }}>
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${readiness}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  height: "100%",
                  background: `repeating-linear-gradient(90deg, ${C.amber} 0 14px, ${C.amberDim} 14px 16px)`,
                  boxShadow: `0 0 12px ${C.amber}88`,
                }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: "repeating-linear-gradient(90deg, transparent 0 9.99%, rgba(0,0,0,.6) 9.99% 10%)",
                }}
              />
            </div>
            <div
              className="flex items-center justify-between"
              style={{ marginTop: 10, fontSize: 16, color: C.amberDim, letterSpacing: ".18em" }}
            >
              <span>T-MINUS · 00:00:{(STAGES.length - done).toString().padStart(2, "0")}</span>
              <span>{readiness === 100 ? "ALL CLEAR · IGNITION AUTHORIZED" : "STAND BY"}</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 18, fontSize: 18, color: C.amberDim, letterSpacing: ".16em" }}>
          // LOG · 47 DAYS AVG · SIMPLE IN 7 · COMPLEX IN 60 · END OF MESSAGE
        </div>
      </div>
    </section>
  );
}
