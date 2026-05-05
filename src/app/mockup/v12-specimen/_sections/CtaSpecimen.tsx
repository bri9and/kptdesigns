import Link from "next/link";
import { Fraunces, JetBrains_Mono } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["italic", "normal"],
  display: "swap",
  axes: ["opsz"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SPECIMEN = "#FAFAFA";
const INK = "#0A0A0A";
const MALTED = "#7A2D26";

const HAIRLINE_MALTED = `linear-gradient(90deg, transparent, ${MALTED} 18%, ${MALTED} 82%, transparent)`;

export default function CtaSpecimen() {
  return (
    <section
      className="relative isolate overflow-hidden"
      style={{ background: SPECIMEN, color: INK }}
    >
      <div
        className="relative mx-auto w-full max-w-[1280px] px-6 sm:px-10"
        style={{
          paddingTop: "clamp(120px, 16vw, 200px)",
          paddingBottom: "clamp(120px, 16vw, 200px)",
        }}
      >
        {/* Opening malted-red hairline */}
        <div
          aria-hidden
          className="mx-auto h-px w-full max-w-[1100px]"
          style={{ background: HAIRLINE_MALTED }}
        />

        {/* Eyebrow — section number + label */}
        <div className="mt-10 flex items-center justify-center">
          <span
            className={`${mono.className} uppercase`}
            style={{
              color: MALTED,
              fontSize: "11px",
              letterSpacing: "0.36em",
              fontWeight: 500,
            }}
          >
            <span style={{ fontWeight: 400 }}>§ 06</span>
            <span style={{ color: MALTED, opacity: 0.55, margin: "0 0.9em" }}>
              —
            </span>
            <span>To Begin</span>
          </span>
        </div>

        {/* Headline — single specimen letterform "Set." */}
        <h2
          className={`${fraunces.className} mt-12 sm:mt-16 text-center`}
          style={{
            fontStyle: "italic",
            fontWeight: 200,
            color: MALTED,
            fontSize: "clamp(200px, 38vw, 400px)",
            lineHeight: 0.85,
            letterSpacing: "-0.04em",
            fontVariationSettings: '"opsz" 144',
          }}
        >
          Set.
        </h2>

        {/* Subcopy — typeset specifications */}
        <p
          className={`${mono.className} mx-auto mt-14 sm:mt-16 max-w-[760px] text-center uppercase`}
          style={{
            color: INK,
            fontSize: "11px",
            letterSpacing: "0.34em",
            lineHeight: 2.1,
            fontWeight: 400,
          }}
        >
          We Typeset Your Web. One Process. One Team. Owned Outright.
        </p>

        {/* Buttons */}
        <div className="mt-16 sm:mt-20 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-5">
          <Link
            href="/start"
            className={`${mono.className} group relative inline-flex items-center justify-center uppercase`}
            style={{
              background: INK,
              color: SPECIMEN,
              letterSpacing: "0.32em",
              fontSize: "11px",
              fontWeight: 500,
              padding: "20px 44px",
              minWidth: "240px",
              borderRadius: 0,
              transition: "background-color 280ms ease, color 280ms ease",
            }}
          >
            <span className="relative">Get Started</span>
          </Link>

          <Link
            href="/pricing"
            className={`${mono.className} group relative inline-flex items-center justify-center uppercase`}
            style={{
              background: "transparent",
              color: INK,
              border: `1px solid ${INK}`,
              letterSpacing: "0.32em",
              fontSize: "11px",
              fontWeight: 500,
              padding: "20px 44px",
              minWidth: "240px",
              borderRadius: 0,
              transition: "background-color 280ms ease, color 280ms ease",
            }}
          >
            <span
              aria-hidden
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: INK }}
            />
            <span
              className="relative transition-colors duration-300 group-hover:text-[var(--specimen)]"
              style={{ ["--specimen" as string]: SPECIMEN }}
            >
              View Pricing
            </span>
          </Link>
        </div>

        {/* Foundry signature */}
        <p
          className={`${fraunces.className} mt-16 sm:mt-20 text-center`}
          style={{
            fontStyle: "italic",
            fontWeight: 300,
            color: INK,
            opacity: 0.78,
            fontSize: "13px",
            letterSpacing: "0.08em",
            fontVariationSettings: '"opsz" 14',
          }}
        >
          Est. 2004 · Made in Pittsburgh
        </p>

        {/* Closing malted-red hairline */}
        <div
          aria-hidden
          className="mx-auto mt-14 h-px w-full max-w-[1100px]"
          style={{ background: HAIRLINE_MALTED }}
        />
      </div>
    </section>
  );
}
