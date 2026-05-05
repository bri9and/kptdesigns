"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { VT323 } from "next/font/google";
import { motion, useInView } from "framer-motion";

const vt = VT323({ subsets: ["latin"], weight: "400" });

const BLACK = "#0A0A0F";
const AMBER = "#FFB000";
const CYAN = "#00E5FF";
const RED = "#FF3030";
const METAL = "#3A3A40";
const METAL_HI = "#5A5A62";
const METAL_LO = "#1C1C22";

const SIGNATURE = "MU/TH/UR · KPT.WEB · ESTABLISHED 2004 · PITTSBURGH PA";
const RIVET_POS = [
  { top: 10, left: 10 }, { top: 10, right: 10 },
  { bottom: 10, left: 10 }, { bottom: 10, right: 10 },
] as const;
const LED_COLORS = [RED, AMBER, CYAN, AMBER, RED] as const;

export default function CtaNostromo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  const [pressed, setPressed] = useState(false);

  return (
    <section
      ref={ref}
      className={`${vt.className} relative flex w-full items-center justify-center overflow-hidden`}
      style={{ background: BLACK, color: AMBER, minHeight: "100vh", paddingBlock: "clamp(80px,12vw,160px)" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{
        opacity: 0.18, mixBlendMode: "overlay",
        backgroundImage: "repeating-linear-gradient(to bottom, rgba(255,176,0,0.18) 0px, rgba(255,176,0,0.18) 1px, transparent 1px, transparent 3px)",
      }} />
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.85) 100%)",
      }} />

      <div className="relative mx-auto flex w-full max-w-[920px] flex-col items-center px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex w-full items-center justify-between gap-4 uppercase"
          style={{ color: AMBER, fontSize: "clamp(14px,1.6vw,20px)", letterSpacing: "0.22em", textShadow: "0 0 8px rgba(255,176,0,0.55)" }}
        >
          <span>TRANSMISSION 06 · ENGAGE</span>
          <span style={{ color: CYAN, opacity: 0.8 }}>SYS.06/06</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative w-full"
          style={{
            padding: "clamp(28px,5vw,56px) clamp(20px,4vw,48px)",
            background: "linear-gradient(155deg, #2A2A30 0%, #1A1A20 45%, #2F2F36 100%)",
            border: `1px solid ${METAL_HI}`, borderTopColor: "#6A6A72", borderBottomColor: "#101015",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.6), 0 30px 80px rgba(0,0,0,0.6)",
          }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{
            mixBlendMode: "overlay",
            backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 2px)",
          }} />

          {RIVET_POS.map((p, i) => (
            <span key={i} aria-hidden className="absolute" style={{
              ...p, width: 10, height: 10, borderRadius: "50%",
              background: "radial-gradient(circle at 30% 30%, #7A7A82, #1A1A20 70%)",
              boxShadow: "inset 0 0 2px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.05)",
            }} />
          ))}

          <div className="absolute left-0 right-0 top-4 flex justify-center gap-2">
            {LED_COLORS.map((c, i) => (
              <span key={i} aria-hidden className="kpt-led" style={{
                width: 8, height: 8, borderRadius: "50%", background: c,
                boxShadow: `0 0 8px ${c}, inset 0 0 2px rgba(0,0,0,0.5)`,
                animationDelay: `${i * 0.37}s`,
              }} />
            ))}
          </div>

          <div className="relative flex flex-col items-center pt-8">
            <button
              type="button"
              onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)} onMouseLeave={() => setPressed(false)}
              onTouchStart={() => setPressed(true)} onTouchEnd={() => setPressed(false)}
              aria-label="Engage"
              className="kpt-engage relative"
              style={{
                width: "clamp(180px,22vw,240px)", height: "clamp(180px,22vw,240px)",
                borderRadius: "50%", border: "none", cursor: "pointer", padding: 0,
                background: "radial-gradient(circle at 50% 110%, #1A1A20 0%, #0A0A0F 60%)",
                boxShadow: `inset 0 8px 18px rgba(0,0,0,0.85), inset 0 -2px 6px rgba(255,255,255,0.06), 0 0 0 1px ${METAL_LO}`,
              }}
            >
              <span aria-hidden className="kpt-rim absolute" style={{
                inset: "-14px", borderRadius: "50%", border: `2px solid ${RED}`,
                boxShadow: `0 0 24px ${RED}, inset 0 0 12px rgba(255,48,48,0.4)`, opacity: 0.85,
              }} />
              <span aria-hidden className="absolute" style={{
                inset: "6px", borderRadius: "50%",
                background: "conic-gradient(from 0deg, #4A4A52, #2A2A30, #5A5A62, #1C1C22, #4A4A52)",
                boxShadow: "inset 0 2px 4px rgba(255,255,255,0.12), inset 0 -2px 6px rgba(0,0,0,0.7)",
              }} />
              <span aria-hidden className="kpt-cap absolute" style={{
                inset: "22px", borderRadius: "50%",
                background: "radial-gradient(circle at 50% 35%, #2A2A2F 0%, #15151A 70%, #0A0A0F 100%)",
                boxShadow: pressed
                  ? "inset 0 6px 14px rgba(0,0,0,0.9), 0 0 24px rgba(255,48,48,0.7)"
                  : "inset 0 -3px 6px rgba(0,0,0,0.7), inset 0 3px 6px rgba(255,255,255,0.05), 0 0 12px rgba(255,48,48,0.35)",
                transform: pressed ? "translateY(2px)" : "translateY(0)",
                transition: "transform 80ms ease-out, box-shadow 120ms ease-out",
              }} />
              <span className="absolute inset-0 flex items-center justify-center" style={{
                color: AMBER, fontSize: "clamp(28px,3.4vw,44px)", letterSpacing: "0.18em",
                textShadow: "0 0 8px rgba(255,176,0,0.85), 0 0 18px rgba(255,176,0,0.4)",
                transform: pressed ? "translateY(2px)" : "translateY(0)",
                transition: "transform 80ms ease-out", pointerEvents: "none",
              }}>ENGAGE</span>
            </button>

            <div className="mt-10 text-center uppercase" style={{
              color: AMBER, fontSize: "clamp(18px,1.8vw,24px)", letterSpacing: "0.16em",
              textShadow: "0 0 6px rgba(255,176,0,0.5)",
            }}>
              BEGIN NEW PROJECT · CONFIRM Y/N
              <span aria-hidden className="kpt-caret ml-2 inline-block align-middle" />
            </div>

            <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <Link href="/start" className="kpt-toggle-amber inline-flex items-center justify-center gap-3 uppercase no-underline" style={{
                padding: "12px 24px", background: AMBER, color: BLACK, border: `1px solid ${METAL_HI}`,
                fontSize: "clamp(15px,1.5vw,18px)", letterSpacing: "0.18em",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -2px 0 rgba(0,0,0,0.25), 0 4px 0 #1C1C22",
              }}>
                <span aria-hidden style={{ width: 8, height: 8, borderRadius: "50%", background: BLACK }} />
                GET STARTED · Y
              </Link>
              <Link href="/pricing" className="kpt-toggle-cyan inline-flex items-center justify-center gap-3 uppercase no-underline" style={{
                padding: "12px 24px", background: "transparent", color: CYAN, border: `1px solid ${CYAN}`,
                fontSize: "clamp(15px,1.5vw,18px)", letterSpacing: "0.18em",
                transition: "background 140ms ease, color 140ms ease, box-shadow 140ms ease",
              }}>
                <span aria-hidden style={{ width: 8, height: 8, borderRadius: "50%", background: CYAN, boxShadow: `0 0 6px ${CYAN}` }} />
                VIEW PRICING · N
              </Link>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t pt-4 uppercase" style={{
            borderColor: METAL, color: AMBER, opacity: 0.7,
            fontSize: "clamp(11px,1.1vw,14px)", letterSpacing: "0.22em",
          }}>
            <span>{SIGNATURE}</span>
            <span style={{ color: CYAN }}>STATUS · NOMINAL</span>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes kpt-led-blink { 0%,78%,100% { opacity: 1; } 80%,88% { opacity: 0.15; } }
        .kpt-led { animation: kpt-led-blink 2.6s steps(1, end) infinite; }
        @keyframes kpt-caret-blink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
        .kpt-caret { width: 0.6em; height: 1em; background: ${AMBER}; box-shadow: 0 0 6px rgba(255,176,0,0.6); animation: kpt-caret-blink 1s steps(1, end) infinite; }
        @keyframes kpt-rim-pulse {
          0%,100% { box-shadow: 0 0 18px ${RED}, inset 0 0 10px rgba(255,48,48,0.35); opacity: 0.75; }
          50% { box-shadow: 0 0 32px ${RED}, inset 0 0 16px rgba(255,48,48,0.55); opacity: 1; }
        }
        .kpt-rim { animation: kpt-rim-pulse 2.2s ease-in-out infinite; }
        .kpt-engage:hover .kpt-cap {
          box-shadow: inset 0 -3px 6px rgba(0,0,0,0.7), inset 0 3px 6px rgba(255,255,255,0.08), 0 0 28px rgba(255,48,48,0.6) !important;
        }
        .kpt-toggle-amber:hover {
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -2px 0 rgba(0,0,0,0.25), 0 4px 0 #1C1C22, 0 0 22px rgba(255,48,48,0.55) !important;
        }
        .kpt-toggle-cyan:hover { background: ${CYAN} !important; color: ${BLACK} !important; box-shadow: 0 0 22px rgba(0,229,255,0.55) !important; }
      `}</style>
    </section>
  );
}
