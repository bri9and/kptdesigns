import Link from "next/link";
import { Playfair_Display, Source_Serif_4, Bodoni_Moda, IBM_Plex_Mono } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], weight: ["400", "600"] });
const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["900"] });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "700"] });

const NEWSPRINT = "#F5F0E1";
const INK = "#1A1A1A";
const RED = "#A4262C";
const HALFTONE = "#999";

export default function CtaBroadsheet() {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: NEWSPRINT, color: INK }}>
      <style>{`
        .v16cta-primary { background-color: ${INK}; color: ${NEWSPRINT}; font-weight: 700; border-radius: 0; transition: background-color 180ms ease; }
        .v16cta-primary:hover { background-color: ${RED}; }
        .v16cta-secondary { background-color: transparent; color: ${INK}; font-weight: 700; border: 1.5px solid ${INK}; border-radius: 0; transition: background-color 180ms ease, color 180ms ease; }
        .v16cta-secondary:hover { background-color: ${INK}; color: ${NEWSPRINT}; }
      `}</style>

      {/* Newsprint grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.6) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.4) 1px, transparent 1px)",
          backgroundSize: "3px 3px, 7px 7px",
          backgroundPosition: "0 0, 1px 1px",
        }}
      />

      {/* Page-corner stamp */}
      <svg aria-hidden viewBox="0 0 120 120" className="absolute right-6 top-6 h-20 w-20 md:h-28 md:w-28 opacity-80" style={{ color: RED }}>
        <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
        <circle cx="60" cy="60" r="44" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="60" y="40" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="7" letterSpacing="2" fill="currentColor">KPT GAZETTE</text>
        <text x="60" y="66" textAnchor="middle" fontFamily="serif" fontSize="22" fontWeight="900" fill="currentColor">POST</text>
        <text x="60" y="84" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="7" letterSpacing="2" fill="currentColor">PAID · EST 2004</text>
      </svg>

      <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-10 md:py-24">
        {/* Section header */}
        <div className="mb-8 flex items-center gap-4">
          <span className={`${plexMono.className} text-[11px] uppercase tracking-[0.28em]`} style={{ color: INK }}>
            Classifieds · Back Page
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: RED }} />
          <span className={`${plexMono.className} text-[11px] uppercase tracking-[0.28em]`} style={{ color: HALFTONE }}>
            Vol. XXII · No. 47
          </span>
        </div>

        {/* Bordered ad box */}
        <div className="relative">
          {[
            "left-0 top-0 border-l border-t",
            "right-0 top-0 border-r border-t",
            "left-0 bottom-0 border-l border-b",
            "right-0 bottom-0 border-r border-b",
          ].map((cls, i) => (
            <span key={i} aria-hidden className={`absolute h-5 w-5 ${cls}`} style={{ borderColor: INK, borderWidth: "2px" }} />
          ))}

          <div className="relative border p-8 md:p-14" style={{ borderColor: INK, borderWidth: "1px" }}>
            <div aria-hidden className="pointer-events-none absolute inset-2 border" style={{ borderColor: INK, borderWidth: "1px", opacity: 0.35 }} />

            <div className="relative grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-14">
              {/* Copy column */}
              <div>
                <p className={`${plexMono.className} mb-4 text-[10px] uppercase tracking-[0.32em]`} style={{ color: RED }}>
                  ¶ Notice to Proprietors
                </p>
                <h2
                  className={bodoni.className}
                  style={{
                    color: INK,
                    fontWeight: 900,
                    fontSize: "clamp(56px, 11vw, 132px)",
                    lineHeight: 0.85,
                    letterSpacing: "-0.01em",
                    textTransform: "uppercase",
                  }}
                >
                  Wanted:
                </h2>
                <p
                  className={`${playfair.className} mt-3 italic`}
                  style={{ color: INK, fontSize: "clamp(20px, 2.4vw, 30px)", lineHeight: 1.15, fontWeight: 400 }}
                >
                  businesses ready for a hand-coded web partner.
                </p>

                <hr className="my-6 border-0 border-t" style={{ borderColor: INK, opacity: 0.4 }} />

                <p className={sourceSerif.className} style={{ fontSize: "15px", lineHeight: 1.55, color: INK, maxWidth: "44ch" }}>
                  We register your domain. We host the site. We design and build it. We connect inbound AI phone agents.{" "}
                  <span style={{ fontWeight: 600 }}>One process. One bill. One team.</span>
                </p>
              </div>

              {/* Stamps column */}
              <div className="flex flex-col justify-between gap-8 md:items-end">
                <div className="flex w-full flex-col gap-3 md:max-w-[260px]">
                  <Link href="/start" className={`${plexMono.className} v16cta-primary relative inline-flex items-center justify-center px-6 py-4 text-[12px] uppercase tracking-[0.24em]`}>
                    <span aria-hidden className="mr-3">→</span>
                    Get Started
                  </Link>
                  <Link href="/pricing" className={`${plexMono.className} v16cta-secondary relative inline-flex items-center justify-center px-6 py-4 text-[12px] uppercase tracking-[0.24em]`}>
                    View Pricing
                  </Link>
                </div>

                <div className="w-full md:max-w-[260px] md:text-right">
                  <div aria-hidden className="mb-3 h-px w-full" style={{ backgroundColor: INK, opacity: 0.5 }} />
                  <p className={`${playfair.className} italic`} style={{ fontSize: "12px", letterSpacing: "0.04em", color: INK }}>
                    Reply to Box 47 · KPT Gazette · Established 2004
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer wire */}
        <div className="mt-6 flex items-center justify-between">
          <span className={`${plexMono.className} text-[10px] uppercase tracking-[0.3em]`} style={{ color: HALFTONE }}>
            — End of Edition —
          </span>
          <span className={`${plexMono.className} text-[10px] uppercase tracking-[0.3em]`} style={{ color: HALFTONE }}>
            Page B-47
          </span>
        </div>
      </div>
    </section>
  );
}
