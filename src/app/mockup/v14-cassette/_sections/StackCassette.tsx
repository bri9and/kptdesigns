"use client";

import { Inter, Caveat, VT323 } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"] });
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "600", "700"] });
const vt323 = VT323({ subsets: ["latin"], weight: "400" });

type Track = {
  id: string;
  name: string;
  time: string;
  blurb: string;
};

const SIDE_A: Track[] = [
  { id: "A1", name: "Next.js", time: "4:32", blurb: "the framework" },
  { id: "A2", name: "React", time: "5:15", blurb: "components" },
  { id: "A3", name: "Tailwind", time: "3:48", blurb: "styles" },
];

const SIDE_B: Track[] = [
  { id: "B1", name: "TypeScript", time: "6:12", blurb: "types" },
  { id: "B2", name: "Vercel Edge", time: "4:01", blurb: "the global press" },
  { id: "B3", name: "KPT Agents", time: "∞", blurb: "your inbound voice (sister-co)" },
];

function TrackRow({ track }: { track: Track }) {
  const isInfinite = track.time === "∞";
  return (
    <li className="group flex items-baseline gap-3 border-b border-dashed border-[#8B5A2B]/40 py-2 last:border-b-0">
      <span
        className={`${caveat.className} w-9 shrink-0 text-[22px] leading-none text-[#5C3A1E]`}
        aria-hidden
      >
        {track.id}.
      </span>
      <span
        className={`${inter.className} flex-1 text-[15px] font-medium tracking-tight text-[#1B130A]`}
      >
        {track.name}
      </span>
      <span
        className={`${vt323.className} shrink-0 text-[18px] leading-none ${
          isInfinite ? "text-[#FF2D2D]" : "text-[#FF2D2D]/85"
        }`}
        aria-label={isInfinite ? "infinite duration" : `duration ${track.time}`}
      >
        {track.time}
      </span>
      <span
        className={`${inter.className} hidden w-[170px] shrink-0 text-right text-[12px] italic text-[#5C3A1E]/85 md:inline-block`}
      >
        &ldquo;{track.blurb}&rdquo;
      </span>
    </li>
  );
}

function JCard({
  side,
  label,
  tracks,
  rotate,
}: {
  side: "A" | "B";
  label: string;
  tracks: Track[];
  rotate: string;
}) {
  return (
    <article
      className="relative w-full max-w-[480px]"
      style={{ transform: `rotate(${rotate})` }}
    >
      {/* paper drop shadow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 translate-x-2 translate-y-3 rounded-[3px] bg-black/55 blur-xl"
      />
      {/* ivory paper insert */}
      <div
        className="relative overflow-hidden rounded-[2px] border border-[#C9B98A] px-7 py-6"
        style={{
          background:
            "linear-gradient(180deg,#F8EFD4 0%,#F2E6BF 50%,#EDE0B5 100%)",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.6) inset, 0 -2px 6px rgba(120,80,30,0.18) inset, 0 18px 30px -18px rgba(0,0,0,0.5)",
        }}
      >
        {/* paper grain noise */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply"
          style={{
            backgroundImage:
              "radial-gradient(rgba(60,40,15,0.5) 1px, transparent 1px)",
            backgroundSize: "3px 3px",
          }}
        />
        {/* punch hole / reel cue */}
        <div className="absolute right-4 top-4 flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8B5A2B]/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#8B5A2B]/40" />
        </div>

        {/* header */}
        <header className="mb-4 flex items-end justify-between border-b border-[#8B5A2B]/50 pb-2">
          <h3
            className={`${caveat.className} text-[34px] leading-none text-[#3D2817]`}
          >
            SIDE {side} <span className="opacity-70">&middot; {label}</span>
          </h3>
          <span
            className={`${vt323.className} text-[16px] text-[#3D2817]/70`}
          >
            CrO&#8322;&nbsp;&middot;&nbsp;90
          </span>
        </header>

        {/* tracklist */}
        <ol className="flex flex-col">
          {tracks.map((t) => (
            <TrackRow key={t.id} track={t} />
          ))}
        </ol>

        {/* footer scribble */}
        <p
          className={`${caveat.className} mt-4 text-[18px] leading-tight text-[#5C3A1E]`}
        >
          rec. by KPT &mdash; est. 2004
        </p>
      </div>
    </article>
  );
}

function DurationMeter() {
  // 23:48 of an assumed 30:00 reel ≈ 79%
  const pct = 79;
  return (
    <div
      className="relative mx-auto mt-14 w-full max-w-[760px] rounded-[6px] border border-[#1a1208] px-5 py-4"
      style={{
        background:
          "linear-gradient(180deg,#1A1208 0%,#0F0A05 60%,#000 100%)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.06) inset, 0 -1px 0 rgba(0,0,0,0.8) inset, 0 18px 40px -20px rgba(0,0,0,0.9)",
      }}
    >
      <div className="mb-2 flex items-center justify-between">
        <span
          className={`${vt323.className} text-[16px] tracking-widest text-[#FF2D2D]`}
        >
          TAPE COUNTER
        </span>
        <span
          className={`${vt323.className} text-[16px] tracking-widest text-[#C8C8CC]/80`}
        >
          DOLBY&nbsp;B&nbsp;NR
        </span>
      </div>

      {/* meter rail */}
      <div className="relative h-3 overflow-hidden rounded-[2px] border border-black/70 bg-[#0a0703]">
        {/* tick marks */}
        <div className="pointer-events-none absolute inset-0 flex">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="flex-1 border-r border-[#C8C8CC]/15 last:border-r-0"
            />
          ))}
        </div>
        {/* fill */}
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: `${pct}%`,
            background:
              "linear-gradient(90deg,#7AE36B 0%,#E6D24A 60%,#FF2D2D 100%)",
            boxShadow: "0 0 8px rgba(255,45,45,0.55)",
          }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span
          className={`${vt323.className} text-[28px] leading-none text-[#FF2D2D]`}
          style={{ textShadow: "0 0 6px rgba(255,45,45,0.6)" }}
        >
          TOTAL: 23:48
        </span>
        <span
          className={`${vt323.className} text-[14px] tracking-widest text-[#C8C8CC]/70`}
        >
          BIAS&nbsp;HIGH&nbsp;&middot;&nbsp;EQ&nbsp;70&micro;s
        </span>
      </div>
    </div>
  );
}

export default function StackCassette() {
  return (
    <section
      id="stack"
      aria-label="Stack — track listing"
      className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-32"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, #5A3A22 0%, #3D2817 45%, #1F140B 100%)",
      }}
    >
      {/* walnut woodgrain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55] mix-blend-overlay"
        style={{
          backgroundImage: [
            "repeating-linear-gradient(92deg, rgba(0,0,0,0.35) 0 1px, transparent 1px 4px)",
            "repeating-linear-gradient(89deg, rgba(255,200,140,0.10) 0 2px, transparent 2px 9px)",
            "repeating-linear-gradient(91deg, rgba(0,0,0,0.18) 0 1px, transparent 1px 22px)",
          ].join(","),
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(60% 40% at 30% 30%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* section eyebrow */}
      <div className="relative mx-auto max-w-[1100px]">
        <div className="mb-10 flex flex-col items-start gap-2 md:mb-14">
          <span
            className={`${vt323.className} text-[14px] tracking-[0.35em] text-[#FF2D2D]`}
          >
            &#9654; PLAYING &middot; SIDE A / SIDE B
          </span>
          <h2
            className={`${caveat.className} text-[64px] leading-[0.9] text-[#F5EBD0] md:text-[88px]`}
            style={{
              textShadow:
                "0 1px 0 rgba(0,0,0,0.5), 0 8px 30px rgba(0,0,0,0.6)",
            }}
          >
            the stack mixtape
          </h2>
          <p
            className={`${inter.className} max-w-md text-[14px] leading-relaxed text-[#F5EBD0]/75`}
          >
            Six tracks. Two sides. One full-stack partner &mdash; registrar, host,
            designer, builder. Plus a B-side that never stops spinning.
          </p>
        </div>

        {/* J-cards */}
        <div className="relative grid grid-cols-1 justify-items-center gap-12 md:grid-cols-2 md:gap-8">
          <JCard side="A" label="TOOLS" tracks={SIDE_A} rotate="-1.6deg" />
          <JCard side="B" label="LAYER" tracks={SIDE_B} rotate="1.4deg" />
        </div>

        {/* meter */}
        <DurationMeter />
      </div>
    </section>
  );
}
