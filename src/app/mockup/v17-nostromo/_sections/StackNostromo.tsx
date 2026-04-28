"use client";

import { motion } from "framer-motion";
import { VT323 } from "next/font/google";

const vt = VT323({ subsets: ["latin"], weight: "400", display: "swap" });

type LedColor = "green" | "amber" | "red";

type Module = {
  code: string;
  name: string;
  desc: string;
  led: LedColor;
  metric: string;
  value: number; // 0..100
  badge?: string;
};

const MODULES: Module[] = [
  { code: "MOD-01 · NXT.RUNTIME", name: "Next.js", desc: "App router · server components · edge ready.", led: "green", metric: "LOAD", value: 64 },
  { code: "MOD-02 · RCT.CORE", name: "React 19", desc: "Concurrent renderer · suspense pipeline live.", led: "green", metric: "LOAD", value: 72 },
  { code: "MOD-03 · TWN.STYLES", name: "Tailwind v4", desc: "Atomic class layer · zero unused CSS.", led: "green", metric: "UPTIME", value: 99 },
  { code: "MOD-04 · TYP.GUARD", name: "TypeScript", desc: "Static typing · strict null checks engaged.", led: "amber", metric: "INTEGRITY", value: 88 },
  { code: "MOD-05 · VRC.EDGE", name: "Vercel Edge", desc: "Global POPs · 30ms cold-start envelope.", led: "green", metric: "UPTIME", value: 96 },
  { code: "MOD-06 · KPT.AGENTS", name: "KPT Agents", desc: "Inbound voice line · routes work to studio.", led: "red", metric: "STATUS", value: 100, badge: "AGT.CALLER · STANDING BY" },
];

const LED_HEX: Record<LedColor, string> = {
  green: "#3CFF6A",
  amber: "#FFB000",
  red: "#FF3030",
};

function CornerScrew({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const cls =
    pos === "tl"
      ? "left-1.5 top-1.5"
      : pos === "tr"
        ? "right-1.5 top-1.5"
        : pos === "bl"
          ? "left-1.5 bottom-1.5"
          : "right-1.5 bottom-1.5";
  return (
    <span aria-hidden className={`pointer-events-none absolute ${cls} flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#1A1A1F] ring-1 ring-[#3A3A40] shadow-[inset_0_0_2px_#0008]`}>
      <span className="block h-1.5 w-px rotate-45 bg-[#0A0A0F]" />
    </span>
  );
}

function Gauge({ value, color }: { value: number; color: string }) {
  const ticks = Array.from({ length: 21 });
  return (
    <div className="relative h-2.5 w-full rounded-[1px] bg-[#0F0F12] ring-1 ring-inset ring-[#3A3A40]/70 shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)]">
      <div className="absolute inset-0 flex items-center justify-between px-[3px]">
        {ticks.map((_, i) => (
          <span key={i} className="h-1 w-px bg-[#3A3A40]" />
        ))}
      </div>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full"
        style={{
          background: `linear-gradient(90deg, ${color}33 0%, ${color} 60%, ${color} 100%)`,
          boxShadow: `0 0 8px ${color}AA, inset 0 0 4px ${color}`,
        }}
      />
    </div>
  );
}

function StatusLed({ color, blink }: { color: LedColor; blink: boolean }) {
  const hex = LED_HEX[color];
  return (
    <motion.span
      animate={blink ? { opacity: [1, 0.35, 1, 1, 0.7, 1] } : { opacity: 1 }}
      transition={{ duration: 2.6, repeat: Infinity, repeatDelay: Math.random() * 1.5, times: [0, 0.08, 0.16, 0.55, 0.62, 1] }}
      className="relative inline-block h-2.5 w-2.5 rounded-full"
      style={{ background: hex, boxShadow: `0 0 6px ${hex}, 0 0 12px ${hex}66, inset 0 0 2px #fff8` }}
    />
  );
}

function ModuleCard({ m, idx }: { m: Module; idx: number }) {
  const ledHex = LED_HEX[m.led];
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative isolate"
    >
      {/* machined-metal frame */}
      <div
        className="relative rounded-[2px] p-[1px]"
        style={{
          background: "linear-gradient(180deg,#4A4A4F 0%,#222226 50%,#3A3A40 100%)",
          boxShadow: "0 1px 0 #0008, 0 6px 18px rgba(0,0,0,0.6)",
        }}
      >
        <div
          className="relative rounded-[1px] border border-[#D4C9A8]/15 px-4 py-4"
          style={{
            background: "linear-gradient(180deg,#0F0F13 0%,#0A0A0F 60%,#0C0C11 100%)",
            boxShadow: "inset 0 1px 0 #FFB00012, inset 0 0 0 1px #00000080, inset 0 -16px 24px -10px #0008",
          }}
        >
          {/* corner screws */}
          <CornerScrew pos="tl" />
          <CornerScrew pos="tr" />
          <CornerScrew pos="bl" />
          <CornerScrew pos="br" />

          {/* header strip */}
          <div className="mb-3 flex items-center justify-between border-b border-[#3A3A40]/70 pb-2">
            <span className={`${vt.className} text-[13px] tracking-[0.18em] text-[#FFB000] [text-shadow:0_0_6px_rgba(255,176,0,0.55)]`}>
              {m.code}
            </span>
            <span className="flex items-center gap-2">
              <StatusLed color={m.led} blink={m.led !== "red"} />
              <span className={`${vt.className} text-[11px] tracking-[0.2em]`} style={{ color: ledHex }}>
                {m.led === "green" ? "NOMINAL" : m.led === "amber" ? "WATCH" : "ALERT"}
              </span>
            </span>
          </div>

          {/* tool name */}
          <div className={`${vt.className} text-[40px] leading-none text-[#D4C9A8] [text-shadow:0_0_10px_rgba(212,201,168,0.18)]`}>
            {m.name}
          </div>

          {/* description */}
          <p className="mt-2 text-[11px] leading-snug tracking-[0.08em] text-[#00E5FF]/85 [text-shadow:0_0_6px_rgba(0,229,255,0.35)]">
            {m.desc}
          </p>

          {/* gauge block */}
          <div className="mt-4">
            <div className={`${vt.className} mb-1 flex items-baseline justify-between text-[12px] tracking-[0.18em] text-[#FFB000]/85`}>
              <span>{m.metric}</span>
              <span className="text-[#FFB000] [text-shadow:0_0_6px_rgba(255,176,0,0.6)]">
                {m.value.toString().padStart(3, "0")}<span className="text-[#FFB000]/50">%</span>
              </span>
            </div>
            <Gauge value={m.value} color={ledHex} />
          </div>

          {/* footer / badge */}
          <div className="mt-3 flex items-center justify-between border-t border-[#3A3A40]/70 pt-2">
            <span className={`${vt.className} text-[11px] tracking-[0.22em] text-[#D4C9A8]/55`}>
              CH-{(idx + 1).toString().padStart(2, "0")} · BUS-A
            </span>
            {m.badge ? (
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className={`${vt.className} text-[11px] tracking-[0.22em]`}
                style={{ color: "#FF3030", textShadow: "0 0 6px rgba(255,48,48,0.7)" }}
              >
                {m.badge}
              </motion.span>
            ) : (
              <span className={`${vt.className} text-[11px] tracking-[0.22em] text-[#D4C9A8]/40`}>
                LINK · OK
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function StackNostromo() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0F] px-6 py-20 md:px-10 md:py-28">
      {/* scanline overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.18] mix-blend-screen"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,176,0,0.22) 0px, rgba(255,176,0,0.22) 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "radial-gradient(ellipse at 50% 30%, transparent 0%, rgba(0,0,0,0.65) 80%)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* section header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-[#3A3A40] pb-4">
          <div>
            <div className={`${vt.className} text-[13px] tracking-[0.32em] text-[#FFB000]/70`}>
              NOSTROMO · COMMERCIAL TOWING VEHICLE
            </div>
            <h2
              className={`${vt.className} mt-1 text-[34px] leading-none tracking-[0.18em] text-[#FFB000] md:text-[44px]`}
              style={{ textShadow: "0 0 10px rgba(255,176,0,0.55), 0 0 24px rgba(255,176,0,0.25)" }}
            >
              TRANSMISSION 03 · SYSTEMS
            </h2>
          </div>
          <div className={`${vt.className} flex items-center gap-3 text-[12px] tracking-[0.22em] text-[#D4C9A8]/70`}>
            <StatusLed color="green" blink />
            <span>BUS-A · 06 MODULES ONLINE</span>
          </div>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {MODULES.map((m, i) => (
            <ModuleCard key={m.code} m={m} idx={i} />
          ))}
        </div>

        {/* footer transmission line */}
        <div className={`${vt.className} mt-10 flex items-center justify-between border-t border-[#3A3A40] pt-3 text-[11px] tracking-[0.28em] text-[#D4C9A8]/55`}>
          <span>TX-03 / END-OF-FRAME</span>
          <span>WEYLAND-YUTANI · ALL FREQUENCIES NORMAL</span>
        </div>
      </div>
    </section>
  );
}
