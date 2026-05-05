import Link from "next/link";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "500"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const INK = "#1A1612";
const CHAMPAGNE = "#F4E4DC";
const GOLD = "#C9A861";
const GOLD_DEEP = "#A8884A";
const CHARCOAL = "#3A3530";
const CREAM = "#F8F2EA";

const GRAIN_SVG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.10  0 0 0 0 0.09  0 0 0 0 0.07  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const HAIRLINE_GOLD = `linear-gradient(90deg, transparent, ${GOLD} 40%, ${GOLD} 60%, transparent)`;

export default function CtaAtelier() {
  return (
    <section
      className="relative isolate overflow-hidden"
      style={{ background: CHAMPAGNE, color: INK }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply"
        style={{ backgroundImage: GRAIN_SVG }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(248,242,234,0.55) 0%, rgba(244,228,220,0) 55%)",
        }}
      />

      <div className="relative mx-auto max-w-[1180px] px-6 sm:px-10 py-32 sm:py-40 md:py-48">
        <div
          className="relative mx-auto max-w-[920px] text-center"
          style={{ paddingInline: "clamp(0px, 4vw, 48px)" }}
        >
          {/* Top gold hairline + eyebrow */}
          <div className="flex items-center justify-center gap-5 sm:gap-7">
            <span
              className="block h-px w-16 sm:w-24"
              style={{ background: HAIRLINE_GOLD }}
            />
            <span
              className={`${inter.className} text-[10px] sm:text-[11px] uppercase`}
              style={{
                color: GOLD_DEEP,
                letterSpacing: "0.42em",
                fontWeight: 500,
              }}
            >
              Par Appel <span style={{ color: GOLD }}>·</span> By Appointment
            </span>
            <span
              className="block h-px w-16 sm:w-24"
              style={{ background: HAIRLINE_GOLD }}
            />
          </div>

          {/* Headline */}
          <h2
            className={`${playfair.className} mt-10 sm:mt-14`}
            style={{
              fontStyle: "italic",
              fontWeight: 400,
              color: INK,
              fontSize: "clamp(100px, 16vw, 200px)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
            }}
          >
            Prenez
            <br />
            <span style={{ display: "inline-block", paddingLeft: "0.18em" }}>
              rendez-vous.
            </span>
          </h2>

          {/* Subcopy */}
          <p
            className={`${inter.className} mx-auto mt-12 sm:mt-14 max-w-[640px] uppercase`}
            style={{
              color: CHARCOAL,
              letterSpacing: "0.32em",
              fontSize: "11px",
              lineHeight: 1.9,
            }}
          >
            We begin commissions with a short conversation.
            <br className="hidden sm:block" /> No retainer required.
          </p>

          {/* Buttons */}
          <div className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6">
            <Link
              href="/start"
              className={`${inter.className} group relative inline-flex items-center justify-center px-12 py-5 uppercase transition-colors duration-500`}
              style={{
                background: INK,
                color: GOLD,
                letterSpacing: "0.32em",
                fontSize: "11px",
                fontWeight: 500,
                minWidth: "240px",
              }}
            >
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "#0E0B08" }}
              />
              <span className="relative">Get Started</span>
            </Link>

            <Link
              href="/pricing"
              className={`${inter.className} group relative inline-flex items-center justify-center px-12 py-5 uppercase transition-colors duration-500`}
              style={{
                color: INK,
                border: `1px solid ${GOLD}`,
                letterSpacing: "0.32em",
                fontSize: "11px",
                fontWeight: 500,
                minWidth: "240px",
              }}
            >
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: GOLD }}
              />
              <span
                className="relative transition-colors duration-500 group-hover:text-[color:var(--cream)]"
                style={{ ["--cream" as string]: CREAM }}
              >
                View Pricing
              </span>
            </Link>
          </div>

          {/* Atelier signature */}
          <p
            className={`${inter.className} mt-20 sm:mt-24`}
            style={{
              color: CHARCOAL,
              fontStyle: "italic",
              fontSize: "12px",
              fontWeight: 300,
              letterSpacing: "0.08em",
              opacity: 0.78,
            }}
          >
            Atelier KPT &nbsp;·&nbsp; Made in Pittsburgh &nbsp;·&nbsp; Est. 2004
          </p>

          {/* Closing gold-foil ornament */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <span
              className="block h-px w-20"
              style={{ background: `linear-gradient(90deg, transparent, ${GOLD})` }}
            />
            <span
              aria-hidden
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                transform: "rotate(45deg)",
                background: GOLD,
                boxShadow: `0 0 0 4px ${CHAMPAGNE}, 0 0 0 5px ${GOLD}`,
              }}
            />
            <span
              className="block h-px w-20"
              style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
