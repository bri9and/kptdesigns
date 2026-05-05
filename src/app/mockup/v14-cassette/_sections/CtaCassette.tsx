"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Inter, Caveat, VT323 } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["700", "900"] });
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const vt323 = VT323({ subsets: ["latin"], weight: ["400"] });

export default function CtaCassette() {
  const [blink, setBlink] = useState(true);
  const [pressed, setPressed] = useState(false);
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (!pressed) { setTime("00:00:00"); return; }
    const start = Date.now();
    const pad = (n: number) => String(n).padStart(2, "0");
    const id = setInterval(() => {
      const t = Math.floor((Date.now() - start) / 10);
      setTime(`${pad(Math.floor(t / 360000) % 100)}:${pad(Math.floor(t / 6000) % 60)}:${pad(Math.floor(t / 100) % 60)}`);
    }, 50);
    return () => clearInterval(id);
  }, [pressed]);

  return (
    <section
      className="relative w-full overflow-hidden px-6 py-32 md:py-40"
      style={{ background: "radial-gradient(ellipse at 50% 30%, #5C3A22 0%, #3D2817 45%, #1F1209 100%)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(92deg, rgba(15,10,5,0.55) 0px, rgba(15,10,5,0.55) 1px, transparent 1px, transparent 4px), repeating-linear-gradient(88deg, rgba(120,72,30,0.18) 0px, rgba(120,72,30,0.18) 2px, transparent 2px, transparent 9px), radial-gradient(ellipse at 20% 40%, rgba(0,0,0,0.55), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.7) 100%)" }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className={`${inter.className} mb-3 text-[11px] font-bold uppercase tracking-[0.5em] text-[#F5EBD0]/60`}>
          Side A · Track 01
        </p>
        <h2
          className={`${inter.className} text-5xl font-black uppercase leading-none tracking-tight text-[#F5EBD0] md:text-7xl`}
          style={{
            fontStretch: "condensed",
            textShadow: "0 2px 0 rgba(0,0,0,0.6), 0 0 30px rgba(255,45,45,0.15)",
            letterSpacing: "-0.02em",
          }}
        >
          Press Play
        </h2>
        <p
          className={`${caveat.className} mt-4 text-2xl text-[#F5EBD0]/85 md:text-3xl`}
          style={{ transform: "rotate(-1.2deg)" }}
        >
          side a, track one. begins now.
        </p>

        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onMouseLeave={() => setPressed(false)}
            onTouchStart={() => setPressed(true)}
            onTouchEnd={() => setPressed(false)}
            aria-label="Press play"
            className="group relative h-44 w-44 rounded-full transition-transform duration-150 ease-out md:h-52 md:w-52"
            style={{ transform: pressed ? "translateY(4px) scale(0.97)" : undefined }}
          >
            <span
              aria-hidden
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle at 50% 30%, #2A1A0E, #100905 80%)",
                boxShadow: "inset 0 8px 18px rgba(0,0,0,0.85), 0 4px 14px rgba(0,0,0,0.6)",
              }}
            />
            <span
              aria-hidden
              className="absolute inset-3 rounded-full"
              style={{
                background:
                  "conic-gradient(from 220deg at 50% 50%, #E8E8EC, #9A9A9F, #C8C8CC, #6E6E73, #C8C8CC, #ECECF0, #9A9A9F, #E8E8EC)",
                boxShadow:
                  "inset 0 2px 0 rgba(255,255,255,0.85), inset 0 -10px 24px rgba(0,0,0,0.5), 0 2px 0 rgba(0,0,0,0.4)",
              }}
            />
            <span
              aria-hidden
              className="absolute inset-3 rounded-full opacity-60 mix-blend-overlay"
              style={{
                backgroundImage:
                  "repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.08) 0deg 1deg, rgba(0,0,0,0.08) 1deg 2deg)",
              }}
            />
            <span
              aria-hidden
              className="absolute inset-3 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(255,45,45,0.55) 0%, rgba(255,45,45,0) 65%)",
                boxShadow: "0 0 60px 6px rgba(255,45,45,0.6)",
              }}
            />
            <span aria-hidden className="absolute inset-0 flex items-center justify-center">
              <span
                className="block"
                style={{
                  width: 0,
                  height: 0,
                  marginLeft: "10px",
                  borderTop: "32px solid transparent",
                  borderBottom: "32px solid transparent",
                  borderLeft: "48px solid #2A1A0E",
                  filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.6)) drop-shadow(0 -1px 0 rgba(0,0,0,0.7))",
                }}
              />
            </span>
          </button>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-5 md:flex-row md:gap-6">
          <Link
            href="/start"
            className={`${inter.className} group relative inline-flex h-14 items-center gap-3 rounded-[6px] px-7 text-sm font-bold uppercase tracking-[0.32em] text-[#1A1410] transition-transform duration-150 active:translate-y-[2px]`}
            style={{
              background: "linear-gradient(180deg, #ECECF0 0%, #C8C8CC 50%, #8E8E93 100%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -2px 0 rgba(0,0,0,0.35), 0 4px 0 #2A1A0E, 0 6px 16px rgba(0,0,0,0.5)",
              textShadow: "0 1px 0 rgba(255,255,255,0.7), 0 -1px 0 rgba(0,0,0,0.25)",
            }}
          >
            <span
              aria-hidden
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "#FF2D2D", boxShadow: "0 0 6px rgba(255,45,45,0.9), inset 0 -1px 1px rgba(0,0,0,0.35)" }}
            />
            <span className="group-hover:text-[#FF2D2D] transition-colors duration-300">Get Started</span>
          </Link>

          <Link
            href="/pricing"
            className={`${caveat.className} group relative inline-flex h-14 items-center rounded-[6px] px-8 text-2xl text-[#1A1410] transition-transform duration-200 hover:-translate-y-[3px]`}
            style={{
              background: "linear-gradient(180deg, #FBF2D7 0%, #F5EBD0 60%, #E2D3A8 100%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.85), inset 0 -2px 0 rgba(0,0,0,0.15), 0 4px 0 #2A1A0E, 0 6px 16px rgba(0,0,0,0.45)",
              transform: "rotate(-0.6deg)",
            }}
          >
            View Pricing
          </Link>
        </div>

        <div className="mt-14 flex flex-col items-center gap-3">
          <div
            className="rounded-[4px] px-6 py-3"
            style={{
              background: "linear-gradient(180deg, #0F0A05 0%, #1A1006 100%)",
              boxShadow:
                "inset 0 2px 6px rgba(0,0,0,0.95), inset 0 -1px 0 rgba(255,255,255,0.05), 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <span
              className={`${vt323.className} text-4xl tracking-[0.18em] md:text-5xl`}
              style={{ color: "#FF2D2D", textShadow: "0 0 6px rgba(255,45,45,0.95), 0 0 14px rgba(255,45,45,0.55)" }}
            >
              {time.split(":").map((part, i) => (
                <span key={i}>
                  {part}
                  {i < 2 && (
                    <span style={{ opacity: blink ? 1 : 0.18 }} className="transition-opacity">:</span>
                  )}
                </span>
              ))}
            </span>
          </div>

          <div className={`${vt323.className} mt-2 flex items-center gap-5 text-xs uppercase tracking-[0.25em] text-[#F5EBD0]/45`}>
            {["⫷⫸ Dolby B", "CrO₂ · Chromium", "60 min · Type II"].map((t, i) => (
              <span key={t} className={`rounded-sm border border-[#F5EBD0]/30 px-2 py-[2px] ${i === 2 ? "hidden md:inline" : ""}`}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
