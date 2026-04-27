"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const HEADLINE_LEAD = ["The", "first", "call"];
const HEADLINE_BRIDGE = ["is"];
const HEADLINE_ITALIC = ["the", "whole", "deal."];

type WordProps = {
  word: string;
  index: number;
  italic?: boolean;
};

function Word({ word, index, italic }: WordProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: "0.5em", filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.85, delay: 0.18 + index * 0.07, ease: EASE }}
      className={`inline-block whitespace-pre ${italic ? "italic text-copper" : ""}`}
    >
      {word}
      {" "}
    </motion.span>
  );
}

function MetaCell({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/45">
        {label}
      </p>
      <p
        className={`mt-2 font-serif text-xl leading-tight md:text-2xl ${
          accent ? "text-copper" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default function Hero() {
  let i = 0;
  return (
    <section
      id="top"
      className="relative px-6 pb-24 pt-16 md:px-10 md:pb-36 md:pt-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-copper"
        >
          <span className="relative inline-flex h-1.5 w-1.5 items-center justify-center">
            <span className="pulse-ring absolute inset-0 rounded-full bg-copper/40" />
            <span className="pulse-dot relative inline-block h-1.5 w-1.5 rounded-full bg-copper" />
          </span>
          Voice Landman · Public Beta
        </motion.p>

        <h1 className="mt-10 max-w-5xl font-serif text-[2.75rem] leading-[1.02] tracking-tight md:text-[5.25rem]">
          {HEADLINE_LEAD.map((w) => (
            <Word key={`a-${w}-${i}`} word={w} index={i++} />
          ))}
          {HEADLINE_BRIDGE.map((w) => (
            <Word key={`b-${w}-${i}`} word={w} index={i++} />
          ))}
          <br className="hidden md:block" />
          {HEADLINE_ITALIC.map((w) => (
            <Word key={`c-${w}-${i}`} word={w} index={i++} italic />
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.95, ease: EASE }}
          className="mt-10 max-w-xl text-base leading-relaxed text-cream/70 md:text-lg"
        >
          Voice Landman picks up the line, listens like a person, and turns
          the first conversation into structured detail your team can
          actually act on. No menus, no scripts, no voicemail.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-cream/10 pt-10 md:grid-cols-4"
        >
          <MetaCell label="Coverage" value="Appalachian basin" />
          <MetaCell label="States" value="PA · OH · WV" />
          <MetaCell label="Plays" value="Marcellus · Utica" />
          <MetaCell label="Status" value="Live" accent />
        </motion.div>
      </div>
    </section>
  );
}
