"use client";

import Link from "next/link";
import { Anybody, Stardos_Stencil } from "next/font/google";

const anybody = Anybody({ subsets: ["latin"], weight: ["400", "700", "900"] });
const stencil = Stardos_Stencil({ subsets: ["latin"], weight: ["400", "700"] });

const PINK = "#FF48B0";
const TEAL = "#00B7A8";
const YELLOW = "#FFE100";
const INK = "#1A1A1A";
const PAPER = "#F5F0E1";

export default function CtaRisograph() {
  return (
    <section
      className="relative w-full overflow-hidden px-6 py-32 md:py-44"
      style={{ background: PAPER, color: INK }}
    >
      {/* Halftone dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #1A1A1A 1px, transparent 1.4px)",
          backgroundSize: "7px 7px",
        }}
      />
      {/* Pink halftone overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25 mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #FF48B0 1.2px, transparent 1.6px)",
          backgroundSize: "11px 11px",
          backgroundPosition: "2px 1px",
        }}
      />
      {/* Paper grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(94deg, rgba(26,26,26,0.05) 0 1px, transparent 1px 3px), repeating-linear-gradient(7deg, rgba(26,26,26,0.04) 0 1px, transparent 1px 4px)",
        }}
      />
      {/* Ink-bleed edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(26,26,26,0.18) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl text-center">
        {/* Top tag */}
        <div
          className={`${stencil.className} mb-6 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] md:text-xs`}
          style={{ color: INK }}
        >
          <span>BACK COVER</span>
          <span aria-hidden style={{ color: PINK }}>★</span>
          <span>NO. 19</span>
          <span aria-hidden style={{ color: TEAL }}>✺</span>
          <span>RISO PRESS</span>
        </div>

        {/* Massive DO IT headline with cyan misregistration */}
        <h2
          className={`${stencil.className} relative mx-auto inline-block text-[28vw] font-bold uppercase leading-[0.82] md:text-[18rem]`}
          style={{ letterSpacing: "-0.04em" }}
        >
          <span
            aria-hidden
            className="absolute inset-0 select-none"
            style={{ color: TEAL, transform: "translate(-6px, 5px)", mixBlendMode: "multiply" }}
          >
            DO IT
          </span>
          <span
            aria-hidden
            className="absolute inset-0 select-none"
            style={{ color: YELLOW, transform: "translate(3px, -4px)", mixBlendMode: "multiply", opacity: 0.7 }}
          >
            DO IT
          </span>
          <span className="relative" style={{ color: PINK, mixBlendMode: "multiply" }}>
            DO IT
          </span>
          {/* Doodles around headline */}
          <span
            aria-hidden
            className={`${anybody.className} absolute -left-4 top-2 hidden text-5xl md:block`}
            style={{ color: INK, transform: "rotate(-18deg)" }}
          >
            ⚡
          </span>
          <span
            aria-hidden
            className={`${anybody.className} absolute -right-2 -top-4 hidden text-6xl md:block`}
            style={{ color: TEAL, transform: "rotate(14deg)" }}
          >
            ✱
          </span>
          <span
            aria-hidden
            className={`${anybody.className} absolute -bottom-6 right-12 hidden text-4xl md:block`}
            style={{ color: PINK }}
          >
            ~~~
          </span>
        </h2>

        {/* Subhead */}
        <p
          className={`${stencil.className} mx-auto mt-10 inline-block text-2xl uppercase tracking-[0.18em] md:text-4xl`}
          style={{
            color: YELLOW,
            textShadow: `2px 2px 0 ${INK}, 4px 4px 0 ${INK}`,
            transform: "rotate(-1.5deg)",
          }}
        >
          PICK A DATE / PICK UP / GO
        </p>

        {/* Body line */}
        <p
          className={`${anybody.className} mx-auto mt-8 max-w-xl text-lg italic md:text-2xl`}
          style={{ color: INK, transform: "rotate(0.6deg)" }}
        >
          we&apos;ll listen. we&apos;ll build. we&apos;ll hand it back.
        </p>

        {/* Ticket-stub buttons */}
        <div className="mt-14 flex flex-col items-center justify-center gap-7 md:flex-row md:gap-10">
          {/* Primary: ink-filled ticket */}
          <Link
            href="/start"
            className={`${stencil.className} group relative inline-flex items-center gap-4 px-10 py-5 text-lg uppercase tracking-[0.28em] transition-transform duration-200 hover:-translate-y-1 hover:rotate-[-1.4deg] md:text-2xl`}
            style={{
              background: INK,
              color: PAPER,
              boxShadow: `6px 6px 0 ${PINK}, 12px 12px 0 ${TEAL}`,
              clipPath:
                "polygon(0 0, 6% 50%, 0 100%, 100% 100%, 94% 50%, 100% 0)",
              filter: "drop-shadow(0 0 0 transparent)",
            }}
          >
            <span aria-hidden className="text-2xl group-hover:text-[#FF48B0] transition-colors">★</span>
            <span className="relative">
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ color: YELLOW, transform: "translate(2px, -2px)" }}
              >
                Get Started
              </span>
              Get Started
            </span>
            <span aria-hidden className="text-2xl group-hover:text-[#00B7A8] transition-colors">★</span>
          </Link>

          {/* Secondary: cyan-bordered ticket */}
          <Link
            href="/pricing"
            className={`${stencil.className} group relative inline-flex items-center gap-3 px-10 py-5 text-lg uppercase tracking-[0.28em] transition-transform duration-200 hover:-translate-y-1 hover:rotate-[1.4deg] md:text-2xl`}
            style={{
              background: PAPER,
              color: INK,
              border: `3px solid ${TEAL}`,
              boxShadow: `5px 5px 0 ${INK}`,
              clipPath:
                "polygon(0 0, 6% 50%, 0 100%, 100% 100%, 94% 50%, 100% 0)",
            }}
          >
            <span
              aria-hidden
              className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{
                background: TEAL,
                clipPath: "polygon(0 0, 6% 50%, 0 100%, 100% 100%, 94% 50%, 100% 0)",
                transform: "translate(-3px, 3px)",
                mixBlendMode: "multiply",
              }}
            />
            <span className="relative">
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ color: PINK, transform: "translate(-2px, 2px)", mixBlendMode: "multiply" }}
              >
                View Pricing
              </span>
              View Pricing
            </span>
          </Link>
        </div>

        {/* Tiny stencil credit line */}
        <p
          className={`${stencil.className} mt-16 text-[10px] uppercase tracking-[0.5em] md:text-xs`}
          style={{ color: INK }}
        >
          <span aria-hidden style={{ color: PINK }}>◆</span>{" "}
          EST. 2004 · PITTSBURGH PA · HAND-PRINTED{" "}
          <span aria-hidden style={{ color: TEAL }}>◆</span>
        </p>

        {/* Scattered doodles */}
        <span
          aria-hidden
          className={`${anybody.className} absolute -left-2 top-12 text-5xl md:left-6 md:top-24`}
          style={{ color: PINK, transform: "rotate(-22deg)" }}
        >
          ✱
        </span>
        <span
          aria-hidden
          className={`${anybody.className} absolute right-4 top-20 text-6xl md:right-12 md:top-32`}
          style={{ color: TEAL, transform: "rotate(18deg)", mixBlendMode: "multiply" }}
        >
          ⚡
        </span>
        <span
          aria-hidden
          className={`${anybody.className} absolute bottom-24 left-8 hidden text-5xl md:block`}
          style={{ color: YELLOW, transform: "rotate(-9deg)" }}
        >
          ✺
        </span>
        <span
          aria-hidden
          className={`${anybody.className} absolute bottom-12 right-6 text-4xl md:right-20 md:bottom-20`}
          style={{ color: INK, transform: "rotate(12deg)" }}
        >
          ✎
        </span>
        <span
          aria-hidden
          className={`${anybody.className} absolute left-1/2 top-4 hidden -translate-x-1/2 text-3xl md:block`}
          style={{ color: PINK, transform: "translateX(-50%) rotate(4deg)" }}
        >
          ~~~~
        </span>
      </div>
    </section>
  );
}
