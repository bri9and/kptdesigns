"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PALETTE = {
  void: "#02030A",
  latent: "#8B5CF6",
  cyan: "#00E5FF",
  pink: "#FF0080",
  text: "#F1F5FF",
  grey: "#9BA3C7",
};

const FAQS = [
  { q: "How long does a website take to build?", a: "Most projects ship in 1–4 weeks. A simple 3–5 page site can be done in a week. Larger projects with ecommerce or custom features take 2–4." },
  { q: "Do I own the code when it's done?", a: "Yes, 100%. We deliver the complete source code and repository. No lock-in, no proprietary platforms, no monthly fees unless you want hosting and support." },
  { q: "What if I already have a website?", a: "We handle the full migration — redesign, rebuild, content move, and 301 redirects so you don't lose any search rankings." },
  { q: "Do you work with businesses outside your area?", a: "We work with businesses nationwide. Everything is done remotely — from initial call to final delivery. Location is never a barrier." },
  { q: "What about phone calls when you're closed?", a: "That's KPT Agents — our AI inbound phone receptionist sister-company. It answers, qualifies, books, and routes 24/7 in your brand voice. One bill, one team, one process." },
  { q: "Can you help with SEO?", a: "Every site includes foundational SEO — meta tags, fast load, mobile responsiveness, clean structure. Ongoing SEO is part of our Growth Plan." },
];

function Item({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-panel-${index}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: 0.05 * index, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderBottom: "1px solid rgba(139,92,246,0.18)" }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-6 py-5 text-left group focus:outline-none focus-visible:outline-none"
        style={{ outline: "none" }}
      >
        <span className="flex items-center gap-4 min-w-0">
          <span
            className="font-mono uppercase shrink-0"
            style={{ fontSize: 10, letterSpacing: "0.32em", color: PALETTE.cyan }}
          >
            Q·{String(index + 1).padStart(2, "0")}
          </span>
          <span
            style={{
              fontSize: 17,
              fontWeight: 500,
              color: PALETTE.text,
              letterSpacing: "0.005em",
            }}
          >
            {q}
          </span>
        </span>
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 45 : 0, color: open ? PALETTE.cyan : PALETTE.grey }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono shrink-0"
          style={{ fontSize: 18, lineHeight: 1 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="pb-6 pl-[64px] pr-6"
              style={{ fontSize: 15, lineHeight: 1.75, color: PALETTE.grey, fontWeight: 300 }}
            >
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqNeural() {
  return (
    <div className="relative w-full min-h-screen flex items-center px-6 md:px-12 py-20">
      <div className="w-full max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1 }}
          className="font-mono uppercase mb-4"
          style={{ fontSize: 11, letterSpacing: "0.32em", color: PALETTE.grey }}
        >
          <span style={{ color: PALETTE.cyan }}>§ 07</span> · LAYER 05 · QUERIES
        </motion.div>

        <motion.h2
          id="sec-6-title"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(36px, 5.4vw, 72px)",
            fontWeight: 800,
            letterSpacing: "0.04em",
            lineHeight: 1,
            color: PALETTE.text,
            marginBottom: 36,
          }}
        >
          Common queries.
        </motion.h2>

        <div
          className="rounded-lg border backdrop-blur-md p-2 px-6"
          style={{
            background: "rgba(2,3,10,0.55)",
            borderColor: "rgba(139,92,246,0.22)",
          }}
        >
          {FAQS.map((f, i) => (
            <Item key={f.q} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
