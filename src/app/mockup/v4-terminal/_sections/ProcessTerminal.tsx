"use client";

import { JetBrains_Mono } from "next/font/google";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

const C = {
  green: "#33FF66",
  amber: "#FFB000",
  off: "#E0E0E0",
  dim: "#7A7A7A",
  hair: "#2A2A2A",
};

type Step = { id: number; label: string; body: string };
type Status = "pending" | "running" | "done";

const STEPS: Step[] = [
  { id: 1, label: "DISCOVERY", body: "talk briefly · scope defined" },
  { id: 2, label: "BUILD", body: "designed · coded · weekly progress" },
  { id: 3, label: "REVIEW", body: "iterated · launched · verified" },
  { id: 4, label: "DELIVERY", body: "source delivered · ownership transferred" },
];

const SPINNER = ["|", "/", "-", "\\"] as const;
const LABEL_PAD = 9;

const pad = (s: string, n: number) => (s.length >= n ? s : s + " ".repeat(n - s.length));

function Spinner() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SPINNER.length), 150);
    return () => clearInterval(t);
  }, []);
  return <span style={{ color: C.amber }}>{SPINNER[i]}</span>;
}

function StepLine({ step, status }: { step: Step; status: Status }) {
  const marker =
    status === "done" ? <span style={{ color: C.green }}>✓</span>
    : status === "running" ? <Spinner />
    : <span style={{ color: C.dim }}>·</span>;
  const arrow = status === "running"
    ? <span style={{ color: C.amber }}>→</span>
    : <span style={{ color: C.dim }}>{">"}</span>;
  return (
    <div className="flex items-baseline gap-2 whitespace-pre">
      <span>{arrow}</span>
      <span style={{ color: C.dim }}>{`[step ${step.id}/4]`}</span>
      <span style={{ color: status === "pending" ? C.dim : C.off, fontWeight: 700 }}>
        {pad(step.label, LABEL_PAD)}
      </span>
      <span>{marker}</span>
      <span
        className="hidden sm:inline"
        style={{ color: status === "pending" ? C.hair : C.dim }}
      >
        {step.body}
      </span>
    </div>
  );
}

export default function ProcessTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [states, setStates] = useState<Status[]>(() => STEPS.map(() => "pending") as Status[]);
  const [showDone, setShowDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const STAGGER = 800;
    const RUN = 600;
    STEPS.forEach((_, idx) => {
      const startAt = idx * STAGGER;
      timers.push(setTimeout(() => {
        setStates((p) => { const n = [...p]; n[idx] = "running"; return n; });
      }, startAt));
      timers.push(setTimeout(() => {
        setStates((p) => { const n = [...p]; n[idx] = "done"; return n; });
      }, startAt + RUN));
    });
    timers.push(setTimeout(() => setShowDone(true), STEPS.length * STAGGER + RUN + 200));
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <section
      ref={ref}
      className={`${mono.className} w-full bg-black text-[13px] leading-[1.55] py-20 sm:py-28 px-4 sm:px-8`}
      style={{ color: C.off }}
    >
      <div className="mx-auto max-w-3xl">
        <pre
          aria-hidden
          className="text-[11px] sm:text-[13px] mb-10 select-none overflow-x-auto"
          style={{ color: C.green, lineHeight: 1.2 }}
        >{`┌─────────────────────────────────────┐
│  § 05 / PROCESS · build pipeline    │
└─────────────────────────────────────┘`}</pre>

        <div className="p-5 sm:p-7" style={{ border: `1px solid ${C.hair}`, background: "#0A0A0A" }}>
          <div
            className="flex items-center justify-between text-[11px] mb-4 pb-3"
            style={{ borderBottom: `1px dashed ${C.hair}`, color: C.dim }}
          >
            <span>~/kpt/build</span>
            <span className="hidden sm:inline">tty/02 · zsh</span>
            <span style={{ color: C.green }}>● online</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span style={{ color: C.green }}>$</span>
            <span>kpt build</span>
            <span style={{ color: C.amber }}>--client=you</span>
          </div>

          <div className="mt-3 space-y-1.5">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -6 }}
                animate={states[i] !== "pending" ? { opacity: 1, x: 0 } : { opacity: 0.25, x: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <StepLine step={step} status={states[i]} />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showDone ? 1 : 0 }}
              transition={{ duration: 0.35 }}
              className="pt-2 flex items-baseline gap-2 whitespace-pre flex-wrap"
            >
              <span style={{ color: C.dim }}>{">"}</span>
              <span style={{ color: "#7CFFA0", fontWeight: 700 }}>done.</span>
              <span>ready to deploy.</span>
              <span style={{ color: C.dim }}>(47s elapsed)</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showDone ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex items-baseline gap-2 pt-1"
            >
              <span style={{ color: C.green }}>$</span>
              <span
                aria-hidden
                className="inline-block animate-pulse"
                style={{ width: "8px", height: "14px", background: C.off }}
              />
            </motion.div>
          </div>
        </div>

        <ul className="sm:hidden mt-4 space-y-1 text-[12px]" style={{ color: C.dim }}>
          {STEPS.map((s) => (
            <li key={s.id}>
              <span style={{ color: C.off, fontWeight: 700 }}>{s.label}</span> — {s.body}
            </li>
          ))}
        </ul>

        <div className="mt-10 pt-6" style={{ borderTop: `1px dashed ${C.hair}` }}>
          <div className="text-[11px] mb-2" style={{ color: C.dim }}>{"// log entry"}</div>
          <p className="text-[14px] sm:text-[15px]" style={{ color: C.off }}>
            <span style={{ color: C.amber }}># </span>
            47 days average. simple sites in 7. complex in 60.
          </p>
        </div>
      </div>
    </section>
  );
}
