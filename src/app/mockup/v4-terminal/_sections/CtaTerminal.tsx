"use client";

import Link from "next/link";
import { JetBrains_Mono } from "next/font/google";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// "INITIATE" rendered as a tight block-letter ASCII header (8 glyphs, 6w each).
const ASCII_INITIATE = ` ___ _   _ ___ _____ ___   _  _____ ___
|_ _| \\ | |_ _|_   _|_ _| /_\\|_   _| __|
 | ||  \\| || |  | |  | | / _ \\ | | | _|
|___|_|\\__|___| |_| |___/_/ \\_\\|_| |___|`;

const SIGNATURE = "EOF · KPT DESIGNS · ©2026 · MADE IN ARIZONA · 0 ERRORS";

export default function CtaTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });

  return (
    <section
      ref={ref}
      className={`${jetbrains.className} relative flex w-full items-center justify-center bg-black text-[#E0E0E0]`}
      style={{
        minHeight: "100vh",
        paddingBlock: "clamp(80px, 12vw, 160px)",
      }}
    >
      {/* CRT scanlines overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(51,255,102,0.6) 0px, rgba(51,255,102,0.6) 1px, transparent 1px, transparent 4px)",
        }}
      />
      {/* faint vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1100px] flex-col items-center px-5 sm:px-8">
        {/* ASCII block letters: INITIATE */}
        <motion.pre
          aria-label="INITIATE"
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="m-0 select-none whitespace-pre overflow-x-auto text-center"
          style={{
            color: "#33FF66",
            fontSize: "clamp(8px, 1.4vw, 14px)",
            lineHeight: 1.15,
            fontWeight: 700,
            textShadow: "0 0 10px rgba(51,255,102,0.45)",
          }}
        >
          {ASCII_INITIATE}
        </motion.pre>

        {/* spacer */}
        <div style={{ height: "clamp(28px, 5vw, 56px)" }} />

        {/* fake terminal session */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="w-full max-w-[640px]"
          style={{
            fontSize: "clamp(12px, 1.4vw, 14px)",
            lineHeight: 1.7,
          }}
        >
          <div className="whitespace-pre">
            <span style={{ color: "#33FF66", fontWeight: 700 }}>$</span>
            <span style={{ color: "#E0E0E0" }}> kpt new </span>
            <span style={{ color: "#FFB000" }}>--client=you</span>
          </div>
          <div className="whitespace-pre" style={{ color: "#5A5A5A" }}>
            <span style={{ color: "#33FF66" }}>&gt;</span>
            <span> project initialized.</span>
          </div>
          <div className="flex flex-wrap items-center" style={{ color: "#5A5A5A" }}>
            <span style={{ color: "#33FF66" }}>&gt;</span>
            <span>&nbsp;press&nbsp;</span>
            <span style={{ color: "#33FF66", fontWeight: 700 }}>[ENTER]</span>
            <span>&nbsp;to begin&nbsp;·&nbsp;</span>
            <span style={{ color: "#E0E0E0", fontWeight: 700 }}>[ESC]</span>
            <span>&nbsp;to view pricing.</span>
            <span
              aria-hidden
              className="kpt-cta-blink ml-1 inline-block"
              style={{ width: "0.55em", height: "1.05em", background: "#33FF66", boxShadow: "0 0 6px rgba(51,255,102,0.6)", transform: "translateY(2px)" }}
            />
          </div>
        </motion.div>

        {/* spacer */}
        <div style={{ height: "clamp(36px, 5vw, 64px)" }} />

        {/* bracketed terminal-command buttons */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
          className="flex flex-col items-center gap-3 sm:flex-row sm:gap-5"
        >
          <Link
            href="/start"
            className="kpt-cta-btn kpt-cta-btn-primary inline-block whitespace-nowrap uppercase"
            style={{
              fontSize: "clamp(11px, 1.2vw, 13px)",
              letterSpacing: "0.2em",
              fontWeight: 500,
              padding: "14px 26px",
              border: "1px solid #33FF66",
              color: "#33FF66",
              background: "#000000",
              borderRadius: 0,
              transition: "background 120ms linear, color 120ms linear",
            }}
          >
            [ ENTER · GET STARTED ]
          </Link>
          <Link
            href="/pricing"
            className="kpt-cta-btn kpt-cta-btn-secondary inline-block whitespace-nowrap uppercase"
            style={{
              fontSize: "clamp(11px, 1.2vw, 13px)",
              letterSpacing: "0.2em",
              fontWeight: 500,
              padding: "14px 26px",
              border: "1px solid #E0E0E0",
              color: "#E0E0E0",
              background: "#000000",
              borderRadius: 0,
              transition: "background 120ms linear, color 120ms linear",
            }}
          >
            [ ESC · VIEW PRICING ]
          </Link>
        </motion.div>

        {/* spacer */}
        <div style={{ height: "clamp(40px, 6vw, 72px)" }} />

        {/* signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          className="text-center uppercase"
          style={{
            color: "#444",
            fontSize: "clamp(9px, 1vw, 11px)",
            letterSpacing: "0.22em",
            fontWeight: 500,
          }}
        >
          {SIGNATURE}
        </motion.div>
      </div>

      <style>{`
        @keyframes kpt-cta-blink-kf {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .kpt-cta-blink {
          animation: kpt-cta-blink-kf 1s steps(1, end) infinite;
        }
        .kpt-cta-btn-primary:hover {
          background: #33FF66 !important;
          color: #000000 !important;
        }
        .kpt-cta-btn-secondary:hover {
          background: #E0E0E0 !important;
          color: #000000 !important;
        }
      `}</style>
    </section>
  );
}
