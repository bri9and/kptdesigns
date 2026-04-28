"use client";

import { Inter, Caveat, VT323 } from "next/font/google";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });
const vt323 = VT323({ subsets: ["latin"], weight: ["400"], display: "swap" });

const WALNUT = "#3D2817", ALUMINUM = "#C8C8CC", ALUMINUM_DARK = "#6E6E74";
const LED_RED = "#FF2D2D", LED_AMBER = "#FFB000", LED_GREEN = "#3CFF6E";
const IVORY = "#F5EBD0", OXIDE = "#0F0A05", RIBBON = "#8B5A2B";

type Stage = { track: string; name: string; level: number; caption: string };
const STAGES: Stage[] = [
  { track: "TRACK 01", name: "DISCOVERY", level: 62, caption: "we listen first. one short call, no waffle." },
  { track: "TRACK 02", name: "BUILD", level: 88, caption: "design + code, weekly check-ins, no surprises." },
  { track: "TRACK 03", name: "MIX", level: 74, caption: "private staging. you tweak, we polish." },
  { track: "TRACK 04", name: "MASTER", level: 95, caption: "ship live. you own the source. forever." },
];
const TRAVEL = 220;

export default function ProcessCassette() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -120px 0px" });

  return (
    <section className={inter.className} style={{
      position: "relative", padding: "120px 24px 140px", color: IVORY, overflow: "hidden",
      background: `radial-gradient(ellipse at 20% 0%, rgba(0,0,0,0.55), transparent 60%),
        radial-gradient(ellipse at 80% 100%, rgba(0,0,0,0.4), transparent 55%),
        repeating-linear-gradient(92deg, ${WALNUT} 0px, ${WALNUT} 3px, #4a3220 3px, #4a3220 5px,
        #1F140A 5px, #1F140A 8px, ${WALNUT} 8px, ${WALNUT} 14px), ${WALNUT}`,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto 36px", textAlign: "center" }}>
        <div className={caveat.className} style={{ fontSize: 32, opacity: 0.92 }}>
          recording session · 4 stages
        </div>
        <div style={{ marginTop: 6, fontSize: 11, letterSpacing: "0.4em", color: ALUMINUM, opacity: 0.7 }}>
          KPT-DECK · MODEL 2004 · ANALOG STUDIO PROCESS
        </div>
      </div>

      <div ref={ref} style={{
        maxWidth: 1100, margin: "0 auto", padding: "32px 28px 40px", borderRadius: 14,
        background: "linear-gradient(180deg, #2a2a2e 0%, #1a1a1e 50%, #0f0f12 100%)",
        boxShadow: `inset 0 2px 0 rgba(255,255,255,0.08), inset 0 -2px 4px rgba(0,0,0,0.6),
          0 24px 48px rgba(0,0,0,0.55)`,
        border: "1px solid rgba(0,0,0,0.6)", position: "relative",
      }}>
        {[{ top: 12, left: 12 }, { top: 12, right: 12 }, { bottom: 12, left: 12 }, { bottom: 12, right: 12 }].map((p, i) => (
          <div key={i} aria-hidden style={{
            position: "absolute", ...p, width: 14, height: 14, borderRadius: "50%",
            background: `radial-gradient(circle at 30% 30%, ${ALUMINUM}, ${ALUMINUM_DARK} 70%, #2a2a2e)`,
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.6)",
            backgroundImage: `linear-gradient(45deg, transparent 47%, rgba(0,0,0,0.7) 47% 53%, transparent 53%),
              radial-gradient(circle at 30% 30%, ${ALUMINUM}, ${ALUMINUM_DARK} 70%, #2a2a2e)`,
          }} />
        ))}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr) 1.4fr", gap: 14 }}>
          {STAGES.map((s, i) => <FaderStrip key={s.track} stage={s} animate={inView} delay={i * 0.15} />)}
          <MasterModule animate={inView} />
        </div>

        <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(4, 1fr) 1.4fr", gap: 14 }}>
          {STAGES.map((s, i) => (
            <motion.div key={s.track}
              initial={{ opacity: 0, y: 6 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={caveat.className}
              style={{
                fontSize: 18, color: "#1a1208",
                background: `linear-gradient(180deg, ${IVORY}, #ebe0c2)`,
                padding: "10px 12px", borderRadius: 3, lineHeight: 1.2, textAlign: "center",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.4)",
                transform: `rotate(${i % 2 === 0 ? -0.6 : 0.5}deg)`, border: "1px solid rgba(0,0,0,0.15)",
              }}>{s.caption}</motion.div>
          ))}
          <div />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={caveat.className}
        style={{
          maxWidth: 700, margin: "44px auto 0", textAlign: "center", fontSize: 30,
          color: IVORY, lineHeight: 1.3, textShadow: "0 1px 0 rgba(0,0,0,0.4)",
        }}>
        we record everything in one take. mistakes are kept.
      </motion.div>
    </section>
  );
}

function FaderStrip({ stage, animate, delay }: { stage: Stage; animate: boolean; delay: number }) {
  const offset = animate ? -((stage.level / 100) * TRAVEL) : 0;
  return (
    <div style={{
      padding: "16px 10px 14px", borderRadius: 6,
      background: "linear-gradient(180deg, #1c1c20 0%, #0f0f12 100%)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 2px rgba(0,0,0,0.7)",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
    }}>
      <div style={{
        width: "100%", textAlign: "center", padding: "6px 4px",
        background: `linear-gradient(180deg, ${ALUMINUM} 0%, ${ALUMINUM_DARK} 100%)`,
        borderRadius: 3, color: OXIDE, fontSize: 9, letterSpacing: "0.18em", fontWeight: 700,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 1px rgba(0,0,0,0.4)",
      }}>
        {stage.track}
        <div style={{ fontSize: 12, letterSpacing: "0.14em", marginTop: 2 }}>{stage.name}</div>
      </div>

      <LedMeter level={stage.level} animate={animate} />

      <div style={{ position: "relative", width: 38, height: TRAVEL + 30, marginTop: 6 }}>
        <div style={{
          position: "absolute", left: "50%", top: 6, bottom: 6, transform: "translateX(-50%)",
          width: 6, background: "linear-gradient(90deg, #050505, #1a1a1c 50%, #050505)",
          borderRadius: 3, boxShadow: "inset 0 1px 3px rgba(0,0,0,0.9)",
        }} />
        {Array.from({ length: 11 }).map((_, t) => (
          <div key={t} aria-hidden style={{
            position: "absolute",
            left: t % 2 === 0 ? 0 : 4, right: t % 2 === 0 ? 0 : 4,
            top: 12 + (t * (TRAVEL / 10)), height: 1,
            background: t === 8 ? LED_RED : "rgba(200,200,204,0.35)",
            opacity: t === 0 ? 0 : 1,
          }} />
        ))}
        <div className={vt323.className} style={{ position: "absolute", left: -8, top: 14, fontSize: 9, color: LED_RED }}>+6</div>
        <div className={vt323.className} style={{ position: "absolute", left: -8, bottom: 14, fontSize: 9, color: ALUMINUM_DARK }}>-∞</div>

        <motion.div
          initial={{ y: 0 }} animate={{ y: offset }}
          transition={{ duration: 1.4, delay: 0.3 + delay, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute", left: "50%", bottom: 6, transform: "translateX(-50%)",
            width: 36, height: 24, borderRadius: 4,
            background: `linear-gradient(180deg, #e8e8ec 0%, ${ALUMINUM} 30%, #888 60%, #2c2c30 100%)`,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.6),
              0 4px 8px rgba(0,0,0,0.7)`,
            border: "1px solid rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
          <div style={{ width: 24, height: 2, background: LED_RED, borderRadius: 1, boxShadow: `0 0 4px ${LED_RED}` }} />
        </motion.div>
      </div>

      <div className={vt323.className} style={{
        marginTop: 4, padding: "4px 8px", background: OXIDE, color: LED_AMBER,
        fontSize: 14, borderRadius: 2, boxShadow: "inset 0 1px 2px rgba(0,0,0,0.9)",
        minWidth: 48, textAlign: "center",
      }}>{String(stage.level).padStart(2, "0")} dB</div>
    </div>
  );
}

function LedMeter({ level, animate }: { level: number; animate: boolean }) {
  const segs = Array.from({ length: 10 }, (_, i) => {
    const lit = animate && (i + 1) * 10 <= level;
    const color = i >= 7 ? LED_RED : i >= 5 ? LED_AMBER : LED_GREEN;
    return { lit, color, idx: i };
  }).reverse();

  return (
    <div style={{
      padding: "4px 5px", background: OXIDE, borderRadius: 3,
      display: "flex", flexDirection: "column", gap: 2,
      boxShadow: "inset 0 1px 2px rgba(0,0,0,0.9)",
    }}>
      {segs.map((s) => (
        <motion.div key={s.idx}
          initial={{ opacity: 0.08 }}
          animate={{ opacity: s.lit ? 1 : 0.08 }}
          transition={{ duration: 0.3, delay: 0.5 + (9 - s.idx) * 0.04 }}
          style={{
            width: 18, height: 5, background: s.color, borderRadius: 1,
            boxShadow: s.lit ? `0 0 6px ${s.color}, inset 0 0 2px rgba(255,255,255,0.5)` : "none",
          }} />
      ))}
    </div>
  );
}

function MasterModule({ animate }: { animate: boolean }) {
  return (
    <div style={{
      padding: "16px 14px", borderRadius: 6,
      background: "linear-gradient(180deg, #2a2a2e 0%, #131318 100%)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 2px rgba(0,0,0,0.7)",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
      border: "1px solid rgba(0,0,0,0.5)",
    }}>
      <div style={{
        width: "100%", textAlign: "center", padding: "6px 4px",
        background: `linear-gradient(180deg, ${RIBBON} 0%, #5a3818 100%)`,
        borderRadius: 3, color: IVORY, fontSize: 10, letterSpacing: "0.22em", fontWeight: 700,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 1px rgba(0,0,0,0.5)",
      }}>MASTER OUTPUT</div>

      <div className={vt323.className} style={{
        width: "100%", padding: "10px 10px", background: OXIDE, color: LED_RED,
        textShadow: `0 0 8px ${LED_RED}, 0 0 2px ${LED_RED}`,
        fontSize: 18, letterSpacing: "0.1em", textAlign: "center", borderRadius: 3,
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(255,45,45,0.15)",
        lineHeight: 1.2,
      }}>
        47 DAYS
        <div style={{ fontSize: 14, color: LED_AMBER, textShadow: `0 0 6px ${LED_AMBER}`, marginTop: 2 }}>
          47 SITES SHIPPED
        </div>
      </div>

      <motion.div
        initial={{ rotate: -135 }} animate={animate ? { rotate: 90 } : { rotate: -135 }}
        transition={{ duration: 1.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative", width: 130, height: 130, borderRadius: "50%",
          background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${ALUMINUM} 18%, #909096 45%, #4a4a50 75%, #1a1a1e 100%)`,
          boxShadow: `inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -4px 8px rgba(0,0,0,0.7),
            0 8px 16px rgba(0,0,0,0.7), 0 0 0 4px #1a1a1e, 0 0 0 6px ${ALUMINUM_DARK}`,
        }}>
        <div style={{
          position: "absolute", inset: 14, borderRadius: "50%",
          background: `radial-gradient(circle at 40% 35%, #ddd 0%, ${ALUMINUM_DARK} 60%, #2a2a2e 100%)`,
          boxShadow: "inset 0 2px 3px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.6)",
        }} />
        <div style={{
          position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
          width: 4, height: 24, background: LED_RED, borderRadius: 2,
          boxShadow: `0 0 6px ${LED_RED}`,
        }} />
        <div style={{
          position: "absolute", inset: 0, margin: "auto", width: 18, height: 18, borderRadius: "50%",
          background: `radial-gradient(circle at 35% 30%, #fff, ${ALUMINUM_DARK})`,
          boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.4)",
        }} />
      </motion.div>

      <div style={{ display: "flex", gap: 14, fontSize: 9, letterSpacing: "0.1em", color: ALUMINUM_DARK, fontWeight: 600 }}><span>MIN</span><span style={{ color: LED_GREEN }}>●</span><span>MAX</span></div>
    </div>
  );
}
