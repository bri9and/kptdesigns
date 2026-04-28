"use client";

import { useState } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const inter = Inter({ subsets: ["latin"], weight: ["200", "400", "500", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

const C = {
  cyan: "#00E5FF",
  white: "#E8F1FF",
  amber: "#FFB000",
  magenta: "#FF00AA",
  grey: "#9BA3C7",
} as const;

const FAQS = [
  {
    q: "How long does a website take to build?",
    a: "Most projects take 1–4 weeks depending on complexity. A simple 3–5 page site can be done in a week. Larger projects with ecommerce or custom features take 2–4 weeks.",
  },
  {
    q: "Do I own the code when it's done?",
    a: "Yes, 100%. When your site is finished we deliver the complete source code. It's yours — no lock-in, no proprietary platforms, no monthly fees unless you want hosting and support.",
  },
  {
    q: "What if I already have a website?",
    a: "We handle the full migration. We redesign and rebuild your site, move your content, and set up redirects so you don't lose any search rankings.",
  },
  {
    q: "Do you work with businesses outside your area?",
    a: "We work with businesses nationwide. Everything is done remotely — from the initial call to final delivery. Location is never a barrier.",
  },
  {
    q: "What technologies do you use?",
    a: "We use modern frameworks: Next.js, React, Tailwind CSS, TypeScript, deployed on Vercel's edge network. The same stack used by top tech companies.",
  },
  {
    q: "Can you help with SEO?",
    a: "Every site we build includes foundational SEO — proper meta tags, fast load times, mobile responsiveness, and clean code structure. We also offer ongoing SEO optimization as part of our Growth Plan.",
  },
];

/**
 * FaqCheckpoint — checkpoint 07 of 08
 *
 * 6 expandable FAQ items rendered as plain HTML overlay.
 */
export default function FaqCheckpoint() {
  return (
    <div
      className={inter.className}
      style={{
        position: "relative",
        width: "min(900px, 92vw)",
        margin: "0 auto",
        padding: "clamp(20px, 3vw, 36px)",
        background: "rgba(0,8,18,0.62)",
        backdropFilter: "blur(14px) saturate(120%)",
        WebkitBackdropFilter: "blur(14px) saturate(120%)",
        border: `1px solid ${C.cyan}33`,
        boxShadow: `inset 0 0 0 1px rgba(0,229,255,0.06), 0 0 60px rgba(0,8,18,0.55)`,
        color: C.white,
      }}
    >
      <div
        className={mono.className}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 12,
          fontSize: 11,
          letterSpacing: "0.26em",
          color: C.cyan,
          textTransform: "uppercase",
          marginBottom: 18,
        }}
      >
        <span>{"//"} CHECKPOINT 07 · KNOWN_QUERIES</span>
        <span style={{ color: C.amber }}>● TRANSMISSION OPEN</span>
      </div>

      <h2
        style={{
          fontWeight: 200,
          fontSize: "clamp(32px, 4.6vw, 60px)",
          lineHeight: 1.04,
          letterSpacing: "-0.02em",
          margin: 0,
          color: C.white,
        }}
      >
        Common{" "}
        <span style={{ color: C.cyan, fontWeight: 700 }}>questions.</span>
      </h2>

      <div
        aria-hidden
        style={{
          height: 1,
          marginTop: 20,
          marginBottom: 8,
          background: `linear-gradient(90deg, ${C.cyan} 0%, ${C.cyan}33 60%, transparent 100%)`,
        }}
      />

      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {FAQS.map((f, i) => (
          <FaqRow key={f.q} q={f.q} a={f.a} index={i} />
        ))}
      </ul>
    </div>
  );
}

function FaqRow({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <li
      style={{
        borderBottom: `1px solid ${C.cyan}1f`,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          all: "unset",
          cursor: "pointer",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 4px",
          gap: 16,
          color: C.white,
          fontSize: 15,
          fontWeight: 500,
          letterSpacing: "0.005em",
          lineHeight: 1.4,
        }}
      >
        <span style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <span
            className={mono.className}
            style={{
              fontSize: 10,
              letterSpacing: "0.28em",
              color: C.amber,
              minWidth: 26,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{q}</span>
        </span>
        <ChevronDown
          size={18}
          color={C.cyan}
          strokeWidth={1.6}
          style={{
            flexShrink: 0,
            transition: "transform 280ms cubic-bezier(0.16,1,0.3,1)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                margin: 0,
                padding: "0 4px 18px 40px",
                fontSize: 13,
                lineHeight: 1.7,
                color: C.grey,
                fontWeight: 300,
              }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
