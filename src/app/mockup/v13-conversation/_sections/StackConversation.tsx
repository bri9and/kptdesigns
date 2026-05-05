"use client";

import { motion } from "framer-motion";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const PALETTE = {
  bg: "#FAFAFA",
  surface: "#1A1A2E",
  purple: "#6B4EE6",
  green: "#00C896",
  grey: "#E5E5E8",
  greyDeep: "#C9C9CF",
  ink: "#1A1A2E",
  inkSoft: "#5A5A6E",
};

type Tool = {
  name: string;
  version: string;
  description: string;
  category: "framework" | "runtime" | "styling" | "types" | "deployment" | "agents";
  accent: "purple" | "green";
  highlight?: boolean;
};

const TOOLS: Tool[] = [
  { name: "Next.js", version: "v16", description: "App Router, server components, edge-ready routing.", category: "framework", accent: "purple" },
  { name: "React", version: "v19", description: "Concurrent runtime with actions and async transitions.", category: "runtime", accent: "purple" },
  { name: "Tailwind", version: "v4", description: "Utility-first styling with the new oxide engine.", category: "styling", accent: "purple" },
  { name: "TypeScript", version: "v5.6", description: "Strict types end to end. No untyped surfaces.", category: "types", accent: "purple" },
  { name: "Vercel Edge", version: "global", description: "Sub-50ms cold starts across 30+ regions.", category: "deployment", accent: "green" },
  { name: "KPT Agents", version: "inbound", description: "Your inbound AI phone agent — sister company.", category: "agents", accent: "green", highlight: true },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.35 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

function CategoryDot({ accent }: { accent: "purple" | "green" }) {
  const color = accent === "purple" ? PALETTE.purple : PALETTE.green;
  return (
    <span
      aria-hidden
      className="relative inline-flex h-2 w-2 shrink-0 rounded-full"
      style={{ background: color, boxShadow: `0 0 0 3px ${color}22` }}
    />
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const isGreen = tool.accent === "green";
  const isHighlight = !!tool.highlight;

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="group relative flex flex-col gap-2 rounded-xl border bg-white p-4 sm:p-5"
      style={{
        borderColor: isHighlight ? `${PALETTE.green}55` : "#EDEDF0",
        background: isHighlight ? `linear-gradient(180deg, #F2FFFB 0%, #FFFFFF 70%)` : "#FFFFFF",
        boxShadow: isHighlight
          ? `0 1px 0 #FFFFFF inset, 0 6px 18px -10px ${PALETTE.green}55`
          : "0 1px 0 #FFFFFF inset, 0 4px 14px -10px rgba(26,26,46,0.18)",
      }}
    >
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <CategoryDot accent={tool.accent} />
          <h4
            className="truncate font-semibold tracking-tight"
            style={{ color: PALETTE.ink, fontSize: "17px", letterSpacing: "-0.01em" }}
          >
            {tool.name}
          </h4>
        </div>
        <span
          className="font-mono uppercase"
          style={{
            fontSize: "10px",
            letterSpacing: "0.08em",
            color: isGreen ? PALETTE.green : PALETTE.inkSoft,
            background: isGreen ? `${PALETTE.green}12` : "#F4F4F7",
            padding: "3px 7px",
            borderRadius: "6px",
            fontWeight: 600,
          }}
        >
          {tool.version}
        </span>
      </header>

      <p
        className="leading-relaxed"
        style={{ color: PALETTE.inkSoft, fontSize: "12px" }}
      >
        {tool.description}
      </p>

      <footer className="mt-1 flex items-center justify-between">
        <span
          className="font-mono uppercase"
          style={{ fontSize: "9.5px", letterSpacing: "0.14em", color: isGreen ? PALETTE.green : "#9A9AA8" }}
        >
          {tool.category}
        </span>
        {isHighlight && (
          <span
            className="font-mono uppercase"
            style={{ fontSize: "9.5px", letterSpacing: "0.14em", color: PALETTE.green, fontWeight: 700 }}
          >
            sister co.
          </span>
        )}
      </footer>
    </motion.article>
  );
}

export default function StackConversation() {
  return (
    <section className={`${inter.className} w-full`} style={{ background: PALETTE.bg }}>
      <div className="mx-auto w-full max-w-3xl px-5 py-20 sm:py-28">
        {/* timestamp / divider */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-10" style={{ background: PALETTE.greyDeep }} />
          <span
            className="font-mono uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.18em", color: PALETTE.inkSoft }}
          >
            today · 09:42
          </span>
          <span className="h-px w-10" style={{ background: PALETTE.greyDeep }} />
        </div>

        {/* USER bubble */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-end"
        >
          <div
            className="max-w-[78%] rounded-2xl rounded-br-md px-4 py-3"
            style={{
              background: PALETTE.surface,
              color: "#FFFFFF",
              fontSize: "15px",
              lineHeight: 1.5,
              boxShadow: "0 8px 24px -16px rgba(26,26,46,0.55)",
            }}
          >
            What tech stack do you use?
          </div>
        </motion.div>

        {/* AGENT message group */}
        <div className="mt-5 flex flex-col items-start gap-3">
          {/* agent avatar + label row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex items-center gap-2 pl-1"
          >
            <span
              className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${PALETTE.purple}, ${PALETTE.surface})` }}
            >
              K
            </span>
            <span className="font-medium" style={{ fontSize: "12px", color: PALETTE.inkSoft, letterSpacing: "0.01em" }}>
              KPT Agent
            </span>
            <span style={{ fontSize: "11px", color: "#9A9AA8" }}>· typed in 0.4s</span>
          </motion.div>

          {/* AGENT bubble */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[88%] rounded-2xl rounded-tl-md px-4 py-3"
            style={{
              background: "#FFFFFF",
              color: PALETTE.ink,
              fontSize: "15px",
              lineHeight: 1.55,
              border: `1px solid ${PALETTE.grey}`,
              boxShadow: "0 1px 0 #FFFFFF inset, 0 6px 18px -14px rgba(26,26,46,0.25)",
            }}
          >
            Here&apos;s our default stack. We can adjust per project.
          </motion.div>

          {/* expandable RESULT CARD attached to agent */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
            className="w-full max-w-[88%] rounded-2xl p-3 sm:p-4"
            style={{ background: PALETTE.grey, border: `1px solid #DCDCE2` }}
          >
            {/* header strip — looks like a tool result */}
            <motion.div
              variants={cardVariants}
              className="mb-3 flex items-center justify-between px-2 pt-1"
            >
              <div className="flex items-center gap-2">
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: "10px", letterSpacing: "0.16em", color: PALETTE.inkSoft, fontWeight: 600 }}
                >
                  tool · stack.lookup
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: PALETTE.green }} />
                  <span className="font-mono" style={{ fontSize: "10px", color: PALETTE.green, letterSpacing: "0.1em" }}>
                    OK
                  </span>
                </span>
              </div>
              <span className="font-mono" style={{ fontSize: "10px", color: "#9A9AA8" }}>
                6 results
              </span>
            </motion.div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {TOOLS.map((tool) => (
                <ToolCard key={tool.name} tool={tool} />
              ))}
            </div>

            <motion.div variants={cardVariants} className="mt-3 px-2 pb-1">
              <p style={{ fontSize: "11.5px", color: PALETTE.inkSoft, lineHeight: 1.55 }}>
                Registrar, host, designer, builder — plus inbound AI phone agents through{" "}
                <span style={{ color: PALETTE.green, fontWeight: 600 }}>KPT Agents</span>. One process. One bill.
              </p>
            </motion.div>
          </motion.div>

          {/* follow-up suggestion chips */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="mt-1 flex flex-wrap gap-2 pl-1"
          >
            {["Why these tools?", "Can we swap React for Vue?", "Tell me about KPT Agents"].map((q) => (
              <button
                key={q}
                className="rounded-full border px-3 py-1.5 transition hover:bg-white"
                style={{
                  borderColor: PALETTE.greyDeep,
                  fontSize: "12px",
                  color: PALETTE.ink,
                  background: "#FFFFFFAA",
                }}
              >
                {q}
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
