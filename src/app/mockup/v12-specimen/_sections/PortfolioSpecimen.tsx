"use client";

import { Fraunces, JetBrains_Mono } from "next/font/google";
import { portfolio } from "@/lib/portfolio";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const MALTED = "#7A2D26";
const INK = "#0A0A0A";
const PAPER = "#FAFAFA";

// Per-index typographic variation for visual interest.
const settings: {
  size: string;
  weight: number;
  italic: boolean;
  align: "center" | "left" | "right";
  tracking: string;
}[] = [
  { size: "clamp(60px,9vw,108px)", weight: 800, italic: false, align: "left",   tracking: "-0.04em" },
  { size: "clamp(56px,8vw,96px)",  weight: 300, italic: true,  align: "right",  tracking: "-0.02em" },
  { size: "clamp(64px,10vw,120px)",weight: 900, italic: false, align: "center", tracking: "-0.05em" },
  { size: "clamp(48px,7vw,84px)",  weight: 400, italic: true,  align: "left",   tracking: "-0.015em" },
  { size: "clamp(60px,9.5vw,112px)",weight: 600, italic: false, align: "center", tracking: "-0.03em" },
  { size: "clamp(52px,8.5vw,100px)",weight: 500, italic: true,  align: "right",  tracking: "-0.025em" },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function specimenHref(p: (typeof portfolio)[number]) {
  return p.href ?? `https://${p.url}`;
}

function isExternal(p: (typeof portfolio)[number]) {
  return !p.href;
}

export default function PortfolioSpecimen() {
  const items = portfolio.slice(0, 6);

  return (
    <section
      id="in-use"
      className={`${fraunces.className} relative w-full`}
      style={{ background: PAPER, color: INK }}
    >
      {/* Section header — malted-red rule + § 04 — IN USE */}
      <header
        className="mx-auto flex w-full max-w-[1400px] items-end justify-between px-6 pt-28 pb-10 md:px-12 md:pt-40"
      >
        <div className="flex items-end gap-6">
          <span
            aria-hidden
            style={{ background: MALTED }}
            className="mb-[10px] block h-[2px] w-[72px] md:w-[120px]"
          />
          <span
            className={`${mono.className} text-[11px] uppercase tracking-[0.32em]`}
            style={{ color: MALTED }}
          >
            § 04 — In Use
          </span>
        </div>
        <span
          className={`${mono.className} hidden text-[10px] uppercase tracking-[0.28em] md:inline`}
          style={{ color: INK, opacity: 0.55 }}
        >
          Folio · Type Specimens 01–06
        </span>
      </header>

      {/* Specimen index */}
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
        {items.map((p, i) => {
          const s = settings[i % settings.length];
          const launchYear = 2024 - (i % 3); // 2024 / 2023 / 2022 cadence
          const justify =
            s.align === "left"
              ? "justify-start text-left"
              : s.align === "right"
              ? "justify-end text-right"
              : "justify-center text-center";

          return (
            <article
              key={p.url}
              className="group relative border-t"
              style={{ borderColor: "rgba(10,10,10,0.16)" }}
            >
              {/* Folio chrome — top strip */}
              <div
                className={`${mono.className} flex items-center justify-between pt-6 pb-2 text-[10px] uppercase tracking-[0.3em]`}
                style={{ color: INK, opacity: 0.55 }}
              >
                <span>
                  <span style={{ color: MALTED }}>●</span>&nbsp;&nbsp;Folio {pad(i + 1)} / 06
                </span>
                <span className="hidden md:inline">
                  Fraunces · opsz 144 · wght {s.weight}
                  {s.italic ? " · ital" : ""}
                </span>
                <span>
                  Page {pad((i + 1) * 4)}
                </span>
              </div>

              {/* The specimen — page-like spread */}
              <a
                href={specimenHref(p)}
                target={isExternal(p) ? "_blank" : undefined}
                rel={isExternal(p) ? "noopener noreferrer" : undefined}
                className={`flex min-h-[68vh] w-full flex-col ${justify} py-14 md:py-24`}
              >
                {/* Crosshair sigil */}
                <div className={`flex w-full ${justify} mb-10`}>
                  <span
                    aria-hidden
                    className={`${mono.className} text-[10px] tracking-[0.4em]`}
                    style={{ color: MALTED }}
                  >
                    ✦ &nbsp; SPECIMEN {pad(i + 1)} &nbsp; ✦
                  </span>
                </div>

                {/* The headline — the project NAME as type specimen */}
                <h3
                  className="leading-[0.92] transition-[font-variation-settings,letter-spacing] duration-700 ease-out group-hover:[letter-spacing:-0.02em]"
                  style={{
                    fontWeight: s.weight,
                    fontSize: s.size,
                    fontStyle: s.italic ? "italic" : "normal",
                    letterSpacing: s.tracking,
                    color: INK,
                    fontVariationSettings: `"opsz" 144, "wght" ${s.weight}`,
                  }}
                >
                  {p.name}
                </h3>

                {/* Beneath: mono caps small */}
                <div className={`mt-10 flex w-full ${justify}`}>
                  <span
                    className={`${mono.className} text-[11px] uppercase tracking-[0.32em]`}
                    style={{ color: INK, opacity: 0.7 }}
                  >
                    Specimen {pad(i + 1)}
                    <span style={{ color: MALTED }}> · </span>
                    {p.category}
                    <span style={{ color: MALTED }}> · </span>
                    Launch {launchYear}
                  </span>
                </div>

                {/* Italic Fraunces description */}
                <div className={`mt-6 flex w-full ${justify}`}>
                  <p
                    className="max-w-[58ch] text-[15px] italic md:text-[16px]"
                    style={{
                      fontWeight: 400,
                      color: INK,
                      lineHeight: 1.5,
                      opacity: 0.82,
                    }}
                  >
                    “{p.desc}”
                  </p>
                </div>

                {/* URL footer for the spread */}
                <div className={`mt-12 flex w-full ${justify}`}>
                  <span
                    className={`${mono.className} text-[10px] uppercase tracking-[0.36em]`}
                    style={{ color: MALTED }}
                  >
                    {p.url} &nbsp;→
                  </span>
                </div>
              </a>
            </article>
          );
        })}

        {/* Final hairline + colophon */}
        <div
          className="border-t"
          style={{ borderColor: "rgba(10,10,10,0.16)" }}
        />
        <div
          className={`${mono.className} flex items-center justify-between py-8 text-[10px] uppercase tracking-[0.3em]`}
          style={{ color: INK, opacity: 0.55 }}
        >
          <span>End of Folio § 04</span>
          <span style={{ color: MALTED }}>— KPT Type Foundry —</span>
          <span>Set in Fraunces</span>
        </div>
      </div>
    </section>
  );
}
