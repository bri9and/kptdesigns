"use client";

import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { portfolio } from "@/lib/portfolio";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const PAPER = "#F4F1EB";
const INK = "#1A1A22";
const MOLTEN = "#FF5E1A";
const SAGE = "#7B8E6F";
const VOID = "#0B0B0F";

export default function PortfolioPlane() {
  const items = portfolio.slice(0, 6);

  return (
    <section
      aria-labelledby="strata-portfolio-title"
      className={`${fraunces.variable} ${inter.variable} ${mono.variable} relative w-full h-full flex items-center justify-center px-6 md:px-12 py-16`}
      style={{
        background: PAPER,
        color: INK,
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* Radial mask: edges fade to void */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 75% 70% at 50% 50%, transparent 55%, ${VOID} 100%)`,
          zIndex: 2,
        }}
      />

      {/* Paper grain wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(123,142,111,0.18) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,94,26,0.10) 0%, transparent 45%)",
          zIndex: 1,
        }}
      />

      <div className="relative w-full max-w-[1280px] mx-auto" style={{ zIndex: 3 }}>
        {/* Section header */}
        <header className="mb-10 md:mb-14 flex items-end gap-5">
          <div
            className="text-[11px] md:text-[12px] tracking-[0.32em] uppercase whitespace-nowrap"
            style={{
              fontFamily: "var(--font-mono), ui-monospace, monospace",
              color: INK,
            }}
          >
            <span style={{ color: MOLTEN }}>Stratum 05</span>
            <span className="mx-3 opacity-40">·</span>
            <span>Field</span>
          </div>
          <div
            className="flex-1 h-[2px] mb-[3px]"
            style={{
              background: `linear-gradient(90deg, ${MOLTEN} 0%, ${MOLTEN} 38%, transparent 100%)`,
            }}
          />
          <div
            className="text-[10px] tracking-[0.32em] uppercase opacity-60 hidden md:block"
            style={{ fontFamily: "var(--font-mono), ui-monospace, monospace" }}
          >
            06 / {portfolio.length.toString().padStart(2, "0")}
          </div>
        </header>

        {/* H2 — visually present, sits above the grid */}
        <h2
          id="strata-portfolio-title"
          className="mb-8 md:mb-10"
          style={{
            margin: 0,
            marginBottom: "clamp(28px, 4vh, 44px)",
            fontFamily: "var(--font-fraunces), 'Fraunces', Georgia, serif",
            fontWeight: 500,
            fontSize: "clamp(2.1rem, 4.4vw, 3.6rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
            color: INK,
          }}
        >
          A field of <em style={{ fontStyle: "italic", color: MOLTEN, fontWeight: 500 }}>work.</em>
        </h2>

        {/* Grid: 1 col mobile, 2x3 sm, 3x2 md+ */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {items.map((project, i) => {
            const linkHref = project.href ?? `https://${project.url}`;
            const isExternal = !project.href;
            const stratumNum = String(i + 1).padStart(2, "0");

            return (
              <li key={project.url} className="relative group">
                <a
                  href={linkHref}
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="block relative h-[280px] md:h-[320px] overflow-hidden transition-transform duration-700 ease-out hover:-translate-y-[2px]"
                  style={{
                    backgroundColor: PAPER,
                    boxShadow: "0 1px 0 rgba(26,26,34,0.08)",
                  }}
                >
                  {/* Image layer */}
                  {project.image && (
                    <div
                      aria-hidden
                      className="absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                      style={{
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "saturate(0.85) contrast(0.95)",
                      }}
                    />
                  )}

                  {/* Paper-feel overlay */}
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: "rgba(244,241,235,0.4)" }}
                  />

                  {/* Top-bottom paper wash for legibility */}
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(244,241,235,0.55) 0%, rgba(244,241,235,0.15) 35%, rgba(244,241,235,0.55) 100%)",
                    }}
                  />

                  {/* Stratum index marker */}
                  <div
                    className="absolute top-4 left-4 text-[10px] tracking-[0.3em] uppercase"
                    style={{
                      fontFamily: "var(--font-mono), ui-monospace, monospace",
                      color: INK,
                    }}
                  >
                    <span style={{ color: MOLTEN }}>·</span> {stratumNum}
                  </div>

                  {/* External arrow glyph */}
                  <div
                    className="absolute top-4 right-4 text-[14px] leading-none transition-transform duration-500 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                    style={{
                      fontFamily: "var(--font-mono), ui-monospace, monospace",
                      color: MOLTEN,
                    }}
                  >
                    {isExternal ? "↗" : "→"}
                  </div>

                  {/* Card content (lower zone) */}
                  <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-4">
                    {/* Sage hairline divider */}
                    <div
                      className="w-full h-px mb-3"
                      style={{ backgroundColor: SAGE, opacity: 0.55 }}
                    />

                    {/* Category */}
                    <div
                      className="text-[10px] tracking-[0.28em] uppercase mb-2"
                      style={{
                        fontFamily: "var(--font-mono), ui-monospace, monospace",
                        color: MOLTEN,
                      }}
                    >
                      {project.category}
                    </div>

                    {/* Project name */}
                    <h3
                      className="text-[22px] md:text-[26px] leading-[1.05] tracking-[-0.01em] mb-2"
                      style={{
                        fontFamily:
                          "var(--font-fraunces), 'Fraunces', Georgia, serif",
                        fontWeight: 500,
                        color: INK,
                      }}
                    >
                      {project.name}
                    </h3>

                    {/* Description, single line */}
                    <p
                      className="text-[12.5px] leading-snug overflow-hidden whitespace-nowrap text-ellipsis"
                      style={{
                        fontFamily: "var(--font-inter), system-ui, sans-serif",
                        fontWeight: 400,
                        color: INK,
                        opacity: 0.78,
                      }}
                    >
                      {project.desc}
                    </p>
                  </div>

                  {/* Card edge: thin sage outline on hover */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    style={{
                      boxShadow: `inset 0 0 0 1px ${SAGE}`,
                    }}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Footer rule */}
        <div className="mt-10 md:mt-14 flex items-center gap-4">
          <div
            className="flex-1 h-px"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${SAGE} 50%, transparent 100%)`,
              opacity: 0.5,
            }}
          />
          <div
            className="text-[10px] tracking-[0.32em] uppercase opacity-60"
            style={{ fontFamily: "var(--font-mono), ui-monospace, monospace" }}
          >
            end stratum 05
          </div>
          <div
            className="flex-1 h-px"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${SAGE} 50%, transparent 100%)`,
              opacity: 0.5,
            }}
          />
        </div>
      </div>
    </section>
  );
}
