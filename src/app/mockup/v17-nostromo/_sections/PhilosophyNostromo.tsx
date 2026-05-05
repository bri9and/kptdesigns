"use client";

import { VT323 } from "next/font/google";

const vt323 = VT323({ subsets: ["latin"], weight: "400" });

const MEMO = `FROM:    KPT.OPS
TO:      ALL HANDS
SUBJECT: BUILD DOCTRINE

ALL SITES HAND-CODED. NO TEMPLATES. NO PRE-FABS.
SOURCE TRANSFERRED ON COMPLETION. NO LOCK-IN.
CONFIRM RECEIPT.

CARRY ON.

                              --- MU/TH/UR`;

// serrated tear edge -> css clip-path
const tear = (side: "top" | "bottom") => {
  const teeth = 80;
  const pts: string[] = [];
  if (side === "top") {
    pts.push("0% 100%", "0% 6px");
    for (let i = 0; i <= teeth; i++)
      pts.push(`${(i / teeth) * 100}% ${i % 2 ? 6 : 0}px`);
    pts.push("100% 6px", "100% 100%");
  } else {
    pts.push("0% 0%", "0% calc(100% - 6px)");
    for (let i = 0; i <= teeth; i++)
      pts.push(`${(i / teeth) * 100}% calc(100% - ${i % 2 ? 6 : 0}px)`);
    pts.push("100% calc(100% - 6px)", "100% 0%");
  }
  return `polygon(${pts.join(", ")})`;
};
const TEAR_TOP = tear("top");
const TEAR_BOTTOM = tear("bottom");

const SWITCHES = [
  { l: "PWR", on: true }, { l: "AUX", on: true }, { l: "ENC", on: false },
  { l: "REC", on: true }, { l: "BCN", on: false },
];
const LEDS = [
  { l: "LIFE.SUP", c: "#00E5FF", s: "on" },
  { l: "MAIN.PWR", c: "#FFB000", s: "blink" },
  { l: "COMMS",    c: "#FFB000", s: "on" },
  { l: "ALERT",    c: "#FF3030", s: "blink-slow" },
  { l: "NAV.LOCK", c: "#00E5FF", s: "on" },
  { l: "CARGO",    c: "#FFB000", s: "off" },
];

export default function PhilosophyNostromo() {
  return (
    <section
      className={`${vt323.className} relative w-full overflow-hidden`}
      style={{ background: "#0A0A0F", color: "#FFB000", paddingBlock: "clamp(80px, 11vw, 160px)" }}
      aria-label="Philosophy"
    >
      {/* cockpit scanlines */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{
        backgroundImage: "repeating-linear-gradient(to bottom, rgba(255,176,0,0.05) 0 1px, transparent 1px 3px)",
        mixBlendMode: "screen",
      }} />
      {/* corner rivets */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{
        backgroundImage:
          "radial-gradient(circle at 24px 24px, rgba(58,58,64,0.7) 0 2px, transparent 3px)," +
          "radial-gradient(circle at calc(100% - 24px) 24px, rgba(58,58,64,0.7) 0 2px, transparent 3px)," +
          "radial-gradient(circle at 24px calc(100% - 24px), rgba(58,58,64,0.7) 0 2px, transparent 3px)," +
          "radial-gradient(circle at calc(100% - 24px) calc(100% - 24px), rgba(58,58,64,0.7) 0 2px, transparent 3px)",
      }} />

      <div className="relative mx-auto w-full max-w-[1080px] px-5 sm:px-8">
        <div className="flex items-baseline gap-4 mb-10 sm:mb-14">
          <span aria-hidden className="kpt-led-blink" style={{
            display: "inline-block", width: 10, height: 10, background: "#FF3030",
            boxShadow: "0 0 10px #FF3030", transform: "translateY(-2px)",
          }} />
          <h2 style={{
            fontSize: "clamp(28px, 5.4vw, 64px)", lineHeight: 0.95, color: "#FFB000",
            textShadow: "0 0 6px rgba(255,176,0,0.55), 0 0 18px rgba(255,176,0,0.25)",
            letterSpacing: "0.06em", margin: 0,
          }}>
            TRANSMISSION 02 &middot; PHILOSOPHY
          </h2>
        </div>

        {/* MEMO */}
        <div className="relative mx-auto" style={{ maxWidth: 760 }}>
          <div aria-hidden className="absolute" style={{
            left: "4%", right: "4%", bottom: "-22px", height: 30,
            background: "radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 70%)",
            filter: "blur(2px)",
          }} />
          <div style={{ transform: "rotate(-1.1deg)", filter: "drop-shadow(0 14px 18px rgba(0,0,0,0.55))" }}>
            <div style={{
              background: "#D4C9A8", color: "#1A1A1A",
              padding: "44px clamp(20px, 4vw, 56px) 52px",
              clipPath: TEAR_TOP, WebkitClipPath: TEAR_TOP, position: "relative",
            }}>
              <div style={{ clipPath: TEAR_BOTTOM, WebkitClipPath: TEAR_BOTTOM }}>
                <div aria-hidden className="pointer-events-none absolute inset-0" style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, rgba(0,0,0,0.04) 0 1px, transparent 1px 5px)," +
                    "radial-gradient(circle at 30% 20%, rgba(0,0,0,0.05) 0 1px, transparent 2px)," +
                    "radial-gradient(circle at 70% 60%, rgba(0,0,0,0.04) 0 1px, transparent 2px)",
                }} />
                <div aria-hidden className="absolute" style={{
                  top: 14, right: 18, transform: "rotate(8deg)",
                  border: "2px solid #A4262C", color: "#A4262C",
                  padding: "4px 10px", fontSize: "clamp(14px, 1.6vw, 18px)",
                  letterSpacing: "0.16em", opacity: 0.78,
                  boxShadow: "inset 0 0 0 1px rgba(164,38,44,0.35)",
                }}>
                  CLASSIFIED &middot; CREW EYES ONLY
                </div>
                <div aria-hidden className="absolute" style={{
                  left: 10, top: 16, bottom: 16, width: 14,
                  display: "flex", flexDirection: "column",
                  justifyContent: "space-between", alignItems: "center",
                }}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span key={i} style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: "#0A0A0F", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.6)",
                    }} />
                  ))}
                </div>
                <pre className="m-0 whitespace-pre-wrap relative" style={{
                  fontFamily: "inherit", fontSize: "clamp(16px, 2.2vw, 22px)",
                  lineHeight: 1.45, color: "#1A1A1A", paddingLeft: 28,
                }}>{MEMO}</pre>
                <div aria-hidden className="pointer-events-none absolute inset-0" style={{
                  backgroundImage: "repeating-linear-gradient(to bottom, rgba(0,0,0,0.08) 0 1px, transparent 1px 3px)",
                  mixBlendMode: "multiply",
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* INSTRUMENT PANEL */}
        <div className="relative mx-auto mt-20 sm:mt-24" style={{ maxWidth: 880 }}>
          <div style={{
            background: "linear-gradient(180deg, #2A2A30 0%, #1A1A1F 50%, #14141A 100%)",
            border: "1px solid #3A3A40", borderTopColor: "#4A4A52",
            padding: "18px clamp(16px, 3vw, 28px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -2px 0 rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.5)",
          }}>
            <div className="flex items-center justify-between" style={{
              color: "#7A7A82", fontSize: "clamp(12px, 1.4vw, 16px)",
              letterSpacing: "0.18em", marginBottom: 14,
            }}>
              <span>PNL.04 &middot; CREW.CTRL</span>
              <span>BUS A &middot; 28V DC</span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 items-center">
              <div className="flex flex-wrap gap-4">
                {SWITCHES.map((s) => (
                  <div key={s.l} className="flex flex-col items-center" style={{ width: 56 }}>
                    <div aria-hidden style={{
                      width: 22, height: 44, borderRadius: 3,
                      background: "linear-gradient(180deg, #0A0A0F 0%, #18181C 100%)",
                      border: "1px solid #3A3A40", position: "relative",
                      boxShadow: "inset 0 0 4px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)",
                    }}>
                      <span style={{
                        position: "absolute", left: "50%",
                        top: s.on ? 3 : "auto", bottom: s.on ? "auto" : 3,
                        transform: "translateX(-50%)", width: 12, height: 18,
                        background: "linear-gradient(180deg, #C8C8CC 0%, #6E6E76 100%)",
                        border: "1px solid #2A2A30", borderRadius: 2,
                        boxShadow: "0 1px 2px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.4)",
                      }} />
                    </div>
                    <span style={{
                      marginTop: 6, fontSize: 14, letterSpacing: "0.12em",
                      color: s.on ? "#FFB000" : "#5A5A60",
                      textShadow: s.on ? "0 0 4px rgba(255,176,0,0.45)" : "none",
                    }}>{s.l}</span>
                  </div>
                ))}
              </div>

              <div className="grid gap-x-5 gap-y-2" style={{ gridTemplateColumns: "repeat(2, minmax(0,1fr))" }}>
                {LEDS.map((d) => {
                  const off = d.s === "off";
                  const cls = d.s === "blink" ? "kpt-led-blink"
                    : d.s === "blink-slow" ? "kpt-led-blink-slow" : "";
                  return (
                    <div key={d.l} className="flex items-center gap-3" style={{
                      fontSize: "clamp(13px, 1.4vw, 16px)", letterSpacing: "0.1em",
                      color: off ? "#5A5A60" : "#C8C8CC",
                    }}>
                      <span aria-hidden className={cls} style={{
                        width: 11, height: 11, borderRadius: "50%",
                        background: off ? "#1F1F24" : d.c,
                        boxShadow: off ? "inset 0 0 3px rgba(0,0,0,0.8)"
                          : `0 0 6px ${d.c}, 0 0 14px ${d.c}80`,
                        border: "1px solid #0A0A0F", flexShrink: 0,
                      }} />
                      <span>{d.l}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div aria-hidden style={{
              height: 1, margin: "18px 0 10px",
              background: "linear-gradient(90deg, transparent, #3A3A40 20%, #3A3A40 80%, transparent)",
            }} />
            <div className="flex items-center justify-between" style={{
              fontSize: "clamp(12px, 1.3vw, 15px)", color: "#7A7A82", letterSpacing: "0.18em",
            }}>
              <span>SIG: MU/TH/UR 6000</span>
              <span style={{ color: "#00E5FF" }}>RX OK</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes kpt-led-blink-kf { 0%,60%{opacity:1} 70%,100%{opacity:0.25} }
        .kpt-led-blink { animation: kpt-led-blink-kf 1.4s steps(2,end) infinite; }
        @keyframes kpt-led-blink-slow-kf { 0%,80%{opacity:1} 90%,100%{opacity:0.15} }
        .kpt-led-blink-slow { animation: kpt-led-blink-slow-kf 2.6s steps(2,end) infinite; }
      `}</style>
    </section>
  );
}
