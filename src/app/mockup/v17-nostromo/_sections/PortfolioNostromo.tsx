"use client";

import { VT323 } from "next/font/google";
import { portfolio } from "@/lib/portfolio";

const vt323 = VT323({ subsets: ["latin"], weight: "400" });

// Approximate deployment dates per mission slot — tuned to early-2024 vintage
const DEPLOY_DATES = [
  "2024-03-12",
  "2023-11-04",
  "2023-08-21",
  "2023-05-17",
  "2024-01-09",
  "2024-06-28",
];

const MISSION_NOTES = [
  "TEE-TIME INTEGRATION.",
  "24/7 EMERGENCY COMMS.",
  "KNOB & TUBE REWIRE OPS.",
  "GENERATIONAL CARGO HOLD.",
  "PEST CONTROL // BBB A+.",
  "SKYLINE OBSERVATION DECK.",
];

function slugify(name: string) {
  return name
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function MissionBlock({
  index,
  name,
  category,
  deployedAt,
  note,
  href,
}: {
  index: number;
  name: string;
  category: string;
  deployedAt: string;
  note: string;
  href: string;
}) {
  const num = String(index + 1).padStart(2, "0");
  const slug = slugify(name);
  const isInternal = href.startsWith("/");
  const external = !isInternal
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      {...external}
      className={`${vt323.className} group relative block border border-[#FFB000]/40 bg-[#0A0A0F] px-5 py-4 transition-colors duration-100 hover:bg-[#FFB000] hover:text-black`}
      style={{ textShadow: "0 0 6px rgba(255,176,0,0.45)" }}
    >
      {/* corner brackets */}
      <span aria-hidden className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l border-t border-[#FFB000]" />
      <span aria-hidden className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t border-[#FFB000]" />
      <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#FFB000]" />
      <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-[#FFB000]" />

      <div className="flex items-baseline justify-between gap-3 text-[20px] leading-none">
        <span className="tracking-[0.18em] text-[#FFB000] group-hover:text-black">
          MISSION {num} / {slug}
        </span>
        <span
          aria-hidden
          className="inline-block h-[10px] w-[10px] shrink-0 rounded-full bg-[#FFB000] group-hover:bg-black"
          style={{ boxShadow: "0 0 8px rgba(255,176,0,0.8)" }}
        />
      </div>

      <div className="mt-2 grid gap-x-6 gap-y-1 text-[19px] leading-tight text-[#FFB000]/90 group-hover:text-black sm:grid-cols-2">
        <p>
          COMMS: <span className="text-[#FFB000] group-hover:text-black">{category.toUpperCase()}</span>
          {"  "}/ DEPLOYED <span className="text-[#FFB000] group-hover:text-black">{deployedAt}</span>
        </p>
        <p className="sm:text-right">
          STATUS:{" "}
          <span className="text-[#00E5FF] group-hover:text-black" style={{ textShadow: "0 0 6px rgba(0,229,255,0.55)" }}>
            OK
          </span>
        </p>
      </div>

      <p className="mt-1 text-[19px] leading-tight tracking-wide text-[#FFB000]/80 group-hover:text-black">
        NOTE: {note}
      </p>
    </a>
  );
}

export default function PortfolioNostromo() {
  const missions = portfolio.slice(0, 6);

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-[#0A0A0F] px-6 py-24 sm:px-10 sm:py-32"
    >
      {/* CRT scanlines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,176,0,0.18) 0px, rgba(255,176,0,0.18) 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* phosphor radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, rgba(255,176,0,0.10) 0%, rgba(255,176,0,0.03) 35%, transparent 70%)",
        }}
      />
      {/* vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* header bar */}
        <header
          className={`${vt323.className} mb-10 border-y border-[#FFB000]/50 py-3`}
          style={{ textShadow: "0 0 8px rgba(255,176,0,0.55)" }}
        >
          <div className="flex flex-col gap-2 text-[#FFB000] sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-[26px] leading-none tracking-[0.2em] sm:text-[30px]">
              TRANSMISSION 04 · MANIFEST · DEPLOYED MISSIONS
            </h2>
            <span className="flex items-center gap-2 text-[18px] tracking-[0.18em] text-[#FFB000]/80">
              <span
                aria-hidden
                className="inline-block h-[10px] w-[10px] animate-pulse rounded-full bg-[#FF3030]"
                style={{ boxShadow: "0 0 8px rgba(255,48,48,0.9)" }}
              />
              REC // LIVE
            </span>
          </div>
          <p className="mt-1 text-[18px] tracking-[0.16em] text-[#FFB000]/70">
            U.S.C.S.S. KPT-DESIGNS &nbsp;//&nbsp; CARGO MANIFEST PAGE 01 OF 01 &nbsp;//&nbsp; OPERATOR: KIELY, S.
          </p>
        </header>

        {/* mission log grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {missions.map((p, i) => {
            const href = p.href ?? `https://${p.url}`;
            return (
              <MissionBlock
                key={p.url}
                index={i}
                name={p.name}
                category={p.category}
                deployedAt={DEPLOY_DATES[i] ?? "2024-01-01"}
                note={MISSION_NOTES[i] ?? p.desc.slice(0, 48).toUpperCase() + "..."}
                href={href}
              />
            );
          })}
        </div>

        {/* footer readout */}
        <footer
          className={`${vt323.className} mt-8 flex flex-col gap-1 border-t border-[#FFB000]/40 pt-3 text-[18px] tracking-[0.16em] text-[#FFB000]/75 sm:flex-row sm:items-center sm:justify-between`}
          style={{ textShadow: "0 0 6px rgba(255,176,0,0.4)" }}
        >
          <span>END OF MANIFEST &nbsp;//&nbsp; {missions.length} MISSIONS LOGGED</span>
          <span className="flex items-center gap-3">
            <span aria-hidden className="inline-block h-[8px] w-[8px] rounded-full bg-[#00E5FF]" style={{ boxShadow: "0 0 6px rgba(0,229,255,0.8)" }} />
            UPLINK NOMINAL · CHECKSUM 0x4E07
          </span>
        </footer>
      </div>
    </section>
  );
}
