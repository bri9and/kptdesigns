"use client";

import { JetBrains_Mono } from "next/font/google";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

type LogLevel = "INFO" | "WARN" | "OK";

const LOG_LINES: { ts: string; level: LogLevel; msg: string }[] = [
  { ts: "2026-04-28 14:32:01", level: "INFO", msg: "hand-coded from scratch. no templates." },
  { ts: "2026-04-28 14:32:01", level: "INFO", msg: "no page builders. no wordpress. no shopify." },
  { ts: "2026-04-28 14:32:02", level: "INFO", msg: "source code delivered on completion." },
  { ts: "2026-04-28 14:32:02", level: "INFO", msg: "no lock-in. no proprietary platforms." },
  { ts: "2026-04-28 14:32:03", level: "WARN", msg: "templates considered harmful." },
  { ts: "2026-04-28 14:32:03", level: "OK", msg: "your website  ·  your code  ·  forever." },
];

const LEVEL_STYLE: Record<LogLevel, { label: string; body: string }> = {
  INFO: { label: "#5A5A5A", body: "#E0E0E0" },
  WARN: { label: "#FFB000", body: "#FFB000" },
  OK: { label: "#33FF66", body: "#33FF66" },
};

const ASCII_HEADER = `┌──────────────────────────────────┐
│  § 02 / PHILOSOPHY               │
└──────────────────────────────────┘`;

const COMMENT_BLOCK = `# templates ship a generic future.
# code ships exactly what was promised.`;

export default function PhilosophyTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });

  const charDelay = 0.012; // seconds per char
  const lineGap = 0.18;

  const lineStarts: number[] = [];
  let acc = 0.4;
  for (const ln of LOG_LINES) {
    lineStarts.push(acc);
    const len = `[${ln.ts}] ${ln.level.padEnd(5)} ${ln.msg}`.length;
    acc += len * charDelay + lineGap;
  }
  const cursorStart = acc;
  const commentStart = cursorStart + 0.4;

  return (
    <section
      ref={ref}
      className={`${jetbrains.className} relative w-full bg-black text-[#E0E0E0]`}
      style={{ paddingBlock: "clamp(64px, 9vw, 128px)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(51,255,102,0.6) 0 1px, transparent 1px 4px)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1100px] px-5 sm:px-8">
        {/* tmux-style window chrome */}
        <div
          className="flex items-center justify-between border border-solid text-[10px] uppercase tracking-[0.18em]"
          style={{ borderColor: "#2A2A2A", color: "#5A5A5A", padding: "8px 14px", background: "#0A0A0A" }}
        >
          <div className="flex items-center gap-3">
            <span style={{ color: "#33FF66" }}>●</span>
            <span style={{ color: "#FFB000" }}>●</span>
            <span style={{ color: "#444" }}>●</span>
            <span className="ml-3 hidden sm:inline">~/kpt/philosophy.log</span>
          </div>
          <div className="flex gap-4">
            <span>tail -f</span>
            <span className="hidden sm:inline">tty/2</span>
            <span style={{ color: "#33FF66" }}>● LIVE</span>
          </div>
        </div>

        {/* terminal body */}
        <div
          className="border border-t-0 border-solid"
          style={{ borderColor: "#2A2A2A", background: "#000000", padding: "clamp(20px, 3vw, 36px)" }}
        >
          <pre
            aria-label="Section: Philosophy"
            className="m-0 select-none whitespace-pre overflow-x-auto"
            style={{
              color: "#33FF66",
              fontSize: "clamp(10px, 1.6vw, 14px)",
              lineHeight: 1.2,
              textShadow: "0 0 8px rgba(51,255,102,0.35)",
              fontWeight: 500,
            }}
          >
            {ASCII_HEADER}
          </pre>

          <div style={{ height: "clamp(20px, 3vw, 36px)" }} />

          <div
            className="flex flex-col"
            style={{ fontSize: "clamp(11px, 1.35vw, 14px)", lineHeight: 1.7, gap: "2px" }}
          >
            {LOG_LINES.map((ln, i) => {
              const styles = LEVEL_STYLE[ln.level];
              const fullText = `[${ln.ts}] ${ln.level.padEnd(5)} ${ln.msg}`;
              const start = lineStarts[i];
              const charDur = fullText.length * charDelay;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.001, delay: start }}
                  className="relative whitespace-pre overflow-hidden"
                  style={{ color: styles.body }}
                >
                  <span style={{ color: "#444" }}>[{ln.ts}]</span>
                  <span> </span>
                  <span style={{ color: styles.label, fontWeight: 700 }}>{ln.level.padEnd(5)}</span>
                  <span> </span>
                  <span style={{ color: styles.body }}>{ln.msg}</span>
                  {/* typewriter mask: black overlay retreating left-to-right */}
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "#000000" }}
                    initial={{ x: "0%" }}
                    animate={inView ? { x: "101%" } : { x: "0%" }}
                    transition={{ duration: charDur, delay: start, ease: "linear" }}
                  />
                </motion.div>
              );
            })}

            {/* prompt + blinking cursor */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.2, delay: cursorStart }}
              className="flex items-center"
              style={{ marginTop: "12px", color: "#E0E0E0" }}
            >
              <span style={{ color: "#33FF66", fontWeight: 700 }}>&gt;</span>
              <span
                aria-hidden
                className="ml-2 inline-block kpt-blink"
                style={{
                  width: "0.6em",
                  height: "1.1em",
                  background: "#33FF66",
                  boxShadow: "0 0 6px rgba(51,255,102,0.6)",
                  transform: "translateY(2px)",
                }}
              />
            </motion.div>
          </div>

          <div aria-hidden style={{ height: 1, background: "#2A2A2A", margin: "clamp(24px, 4vw, 44px) 0" }} />

          <motion.pre
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.6, delay: commentStart, ease: "easeOut" }}
            className="m-0 whitespace-pre-wrap"
            style={{
              color: "#5A5A5A",
              fontSize: "clamp(12px, 1.6vw, 16px)",
              lineHeight: 1.7,
              borderLeft: "2px solid #2A2A2A",
              paddingLeft: "clamp(12px, 2vw, 20px)",
            }}
          >
            {COMMENT_BLOCK}
          </motion.pre>
        </div>

        {/* status bar */}
        <div
          className="flex flex-wrap items-center justify-between border border-t-0 border-solid text-[10px] uppercase tracking-[0.2em]"
          style={{ borderColor: "#2A2A2A", color: "#5A5A5A", padding: "6px 14px", background: "#0A0A0A", gap: "8px" }}
        >
          <span>
            <span style={{ color: "#33FF66" }}>NORMAL</span>
            <span style={{ color: "#2A2A2A" }}>  ·  </span>
            philosophy.log
          </span>
          <span className="hidden sm:inline">6 LINES  ·  UTF-8  ·  LF</span>
          <span>
            EOF <span style={{ color: "#FFB000" }}>OK</span>
          </span>
        </div>
      </div>

      <style>{`
        @keyframes kpt-blink-kf { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        .kpt-blink { animation: kpt-blink-kf 1s steps(1,end) infinite; }
      `}</style>
    </section>
  );
}
