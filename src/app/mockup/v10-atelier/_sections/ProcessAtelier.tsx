"use client";

import { Playfair_Display, Inter } from "next/font/google";
import type { CSSProperties } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-playfair-atelier",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter-atelier",
  display: "swap",
});

const SERIF = "var(--font-playfair-atelier), serif";
const SANS = "var(--font-inter-atelier), sans-serif";
const GOLD = "#C9A861";
const INK = "#1A1612";
const CHARCOAL = "#3A3530";
const OXBLOOD = "#5E1A1A";
const GOLD_RULE =
  "linear-gradient(90deg, transparent 0%, #C9A861 50%, transparent 100%)";
const GOLD_FOIL =
  "linear-gradient(180deg, #E0C283 0%, #C9A861 45%, #8E6F2F 100%)";

const KICKER: CSSProperties = {
  fontFamily: SANS,
  fontWeight: 400,
  letterSpacing: "0.5em",
  textTransform: "uppercase",
  color: GOLD,
};

const FRENCH: CSSProperties = {
  fontFamily: SERIF,
  fontStyle: "italic",
  fontWeight: 400,
  fontSize: "clamp(36px, 4.4vw, 56px)",
  letterSpacing: "-0.015em",
  lineHeight: 1,
  backgroundImage: GOLD_FOIL,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

const NUMERAL: CSSProperties = {
  fontFamily: SERIF,
  fontWeight: 400,
  fontSize: "clamp(100px, 16vw, 180px)",
  letterSpacing: "-0.04em",
  color: INK,
};

const BODY: CSSProperties = {
  fontFamily: SERIF,
  fontWeight: 400,
  fontSize: "clamp(16px, 1.15vw, 18px)",
  lineHeight: 1.65,
  color: CHARCOAL,
};

type Phase = {
  numeral: string;
  french: string;
  english: string;
  body: string;
  align: "left" | "right";
};

const PHASES: Phase[] = [
  {
    numeral: "I",
    french: "Le Brief",
    english: "Initial Fitting",
    body:
      "We sit, in person or in pixels, and take the measurements of your ambition. Vision is captured in long-hand. Scope is agreed before a single thread is drawn. Nothing begins until you and the atelier are of one mind.",
    align: "left",
  },
  {
    numeral: "II",
    french: "Le Draft",
    english: "Design Proposal",
    body:
      "The first toile is presented within the week. Weekly fittings follow — silhouette, palette, typography, the cut of every interaction. Revisions sans limite. We refine until the garment moves as you do.",
    align: "right",
  },
  {
    numeral: "III",
    french: "La Répétition",
    english: "Private Rehearsal",
    body:
      "A private salon. The work is rehearsed end to end — every form, every state, every quiet edge. Final adjustments are pinned by hand. Approval is given with a signature, not a checkbox.",
    align: "left",
  },
  {
    numeral: "IV",
    french: "La Livraison",
    english: "Final Delivery",
    body:
      "Delivered into your hands. Code transferred. Domain in your name. Inbound agent installed and answering. Ownership granted, outright and unencumbered. The atelier remains, should you wish to commission again.",
    align: "right",
  },
];

export default function ProcessAtelier() {
  return (
    <section
      className={`${playfair.variable} ${inter.variable} relative isolate overflow-hidden bg-[#F8F2EA] text-[#1A1612]`}
      style={{ fontFamily: SERIF }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #5E1A1A 0, transparent 40%), radial-gradient(circle at 80% 70%, #C9A861 0, transparent 45%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1480px] px-6 pb-40 pt-32 md:px-16 md:pb-48 md:pt-40">
        <header className="mb-28 flex flex-col items-center gap-7 md:mb-36">
          <div className="h-px w-24 md:w-32" style={{ background: GOLD_RULE }} />
          <p
            className="text-center text-[10px] md:text-[11px]"
            style={{ ...KICKER, letterSpacing: "0.55em" }}
          >
            Commission &nbsp;·&nbsp; Process
          </p>
          <h2
            className="text-center"
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              color: INK,
            }}
          >
            Four phases, hand&#8209;stitched.
          </h2>
          <div className="h-px w-24 md:w-32" style={{ background: GOLD_RULE }} />
        </header>

        <ol className="flex flex-col">
          {PHASES.map((phase, i) => (
            <li key={phase.numeral} className="relative">
              {i > 0 && (
                <div
                  aria-hidden
                  className="absolute left-0 right-0 top-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(201,168,97,0.55) 18%, rgba(201,168,97,0.55) 82%, transparent 100%)",
                  }}
                />
              )}

              <div
                className={`grid grid-cols-12 items-start gap-x-6 gap-y-10 py-24 md:gap-x-10 md:py-32 ${
                  phase.align === "right" ? "md:[direction:rtl]" : ""
                }`}
              >
                <div
                  className={`col-span-12 md:col-span-6 ${
                    phase.align === "right"
                      ? "md:[direction:ltr] md:text-right md:-mr-4 lg:-mr-10"
                      : "md:-ml-4 lg:-ml-10"
                  }`}
                >
                  <span
                    aria-hidden
                    className="block select-none leading-[0.78]"
                    style={NUMERAL}
                  >
                    <span
                      className="mr-3 align-top text-[0.18em]"
                      style={{ ...KICKER, letterSpacing: "0.4em" }}
                    >
                      N°
                    </span>
                    {phase.numeral}
                  </span>
                </div>

                <div
                  className={`col-span-12 md:col-span-6 md:[direction:ltr] ${
                    phase.align === "right" ? "md:pr-2" : "md:pl-2"
                  }`}
                >
                  <div className="flex flex-col gap-5 md:max-w-[460px]">
                    <h3 style={FRENCH}>{phase.french}</h3>

                    <div className="flex items-center gap-4">
                      <span aria-hidden className="h-px w-8" style={{ background: GOLD }} />
                      <p
                        style={{
                          ...KICKER,
                          fontSize: "11px",
                          letterSpacing: "0.4em",
                          color: CHARCOAL,
                        }}
                      >
                        {phase.english}
                      </p>
                    </div>

                    <p style={BODY}>{phase.body}</p>

                    <p
                      className="mt-3"
                      style={{ ...KICKER, fontSize: "10px" }}
                    >
                      Phase {String(i + 1).padStart(2, "0")} / 04
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-center gap-5 md:mt-20">
          <div className="h-px w-40" style={{ background: GOLD_RULE }} />
          <p
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(14px, 1vw, 16px)",
              color: OXBLOOD,
              letterSpacing: "0.02em",
            }}
          >
            — Atelier KPT, est. MMIV —
          </p>
        </div>
      </div>
    </section>
  );
}
