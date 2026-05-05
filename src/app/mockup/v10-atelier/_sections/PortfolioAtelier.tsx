import { Playfair_Display, Inter } from "next/font/google";
import { portfolio } from "@/lib/portfolio";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const CHAMPAGNE = "#F4E4DC";
const CREAM = "#F8F2EA";
const INK = "#1A1612";
const GOLD = "#C9A861";
const CHARCOAL = "#3A3530";

// Editorial rhythm: alternating portrait / landscape plates with offsets
const ASPECTS = ["4 / 5", "3 / 2", "4 / 5", "3 / 2", "4 / 5", "3 / 2"] as const;
const OFFSETS = ["0", "3.5rem", "0", "5rem", "1.5rem", "4rem"] as const;

const plateHref = (item: { href?: string; url: string }) =>
  item.href ?? `https://${item.url}`;

const GRAIN_SVG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.45  0 0 0 0 0.36  0 0 0 0 0.30  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export default function PortfolioAtelier() {
  const looks = portfolio.slice(0, 6);

  return (
    <section
      id="lookbook"
      className={`${inter.className} relative overflow-hidden`}
      style={{ background: CHAMPAGNE, color: INK, padding: "9rem 0 11rem" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply"
        style={{ backgroundImage: GRAIN_SVG, backgroundSize: "220px 220px" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(248,242,234,0.85) 0%, rgba(244,228,220,0) 55%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-12">
        <header className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <span
            className="text-[11px] md:text-[12px]"
            style={{ color: GOLD, letterSpacing: "0.46em", fontWeight: 500 }}
          >
            LOOKBOOK · COLLECTION 26
          </span>
          <span
            aria-hidden
            className="mt-5 block h-px"
            style={{
              width: "88px",
              background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
            }}
          />
          <h2
            className={`${playfair.className} mt-7 text-4xl md:text-6xl`}
            style={{ fontWeight: 400, letterSpacing: "-0.01em", color: INK }}
          >
            The Atelier <em style={{ fontWeight: 400 }}>Selects</em>
          </h2>
          <p
            className="mt-5 max-w-md text-[13px] leading-relaxed"
            style={{ color: CHARCOAL }}
          >
            Six pieces from the current collection — hand-tailored sites, each
            cut to the cloth of its proprietor.
          </p>
        </header>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-20 md:gap-y-28">
          {looks.map((item, i) => {
            const lookNo = String(i + 1).padStart(2, "0");
            return (
              <li key={item.url} className="group" style={{ marginTop: OFFSETS[i] }}>
                <a
                  href={plateHref(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div
                    className="relative w-full overflow-hidden"
                    style={{
                      aspectRatio: ASPECTS[i],
                      background: CREAM,
                      boxShadow:
                        "0 30px 60px -30px rgba(26,22,18,0.35), 0 1px 0 rgba(201,168,97,0.25)",
                    }}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-[10px] z-20"
                      style={{ border: `1px solid ${GOLD}33` }}
                    />

                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.name}
                        className="absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-[1400ms] ease-out group-hover:scale-[1.025] group-hover:[filter:saturate(0.25)_contrast(1.04)_sepia(0.05)_brightness(0.98)]"
                        style={{
                          filter:
                            "sepia(0.18) saturate(0.92) contrast(1.06) brightness(0.97)",
                        }}
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ background: CREAM }}
                      >
                        <span
                          className={`${playfair.className} italic text-2xl`}
                          style={{ color: GOLD }}
                        >
                          {item.name}
                        </span>
                      </div>
                    )}

                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 z-10"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(94,26,26,0.06) 0%, rgba(26,22,18,0.18) 100%)",
                      }}
                    />

                    <span
                      className="absolute left-5 top-5 z-30 text-[10px]"
                      style={{
                        color: GOLD,
                        letterSpacing: "0.4em",
                        fontWeight: 500,
                      }}
                    >
                      KPT · {lookNo}
                    </span>
                  </div>

                  <div className="mt-7 flex flex-col">
                    <span
                      className="text-[10.5px]"
                      style={{
                        color: GOLD,
                        letterSpacing: "0.42em",
                        fontWeight: 500,
                      }}
                    >
                      LOOK {lookNo}
                    </span>

                    <h3
                      className={`${playfair.className} relative mt-3 inline-block self-start text-[22px] md:text-[26px] leading-[1.15]`}
                      style={{ color: INK, fontWeight: 500 }}
                    >
                      <span className="relative">
                        {item.name}
                        <span
                          aria-hidden
                          className="pointer-events-none absolute -bottom-1 left-0 right-0 h-px transition-[clip-path] duration-[1100ms] ease-[cubic-bezier(.2,.7,.2,1)] [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0%_0_0)]"
                          style={{ background: GOLD }}
                        />
                      </span>
                    </h3>

                    <span
                      className={`${playfair.className} mt-2 text-[13px] italic`}
                      style={{ color: CHARCOAL, fontWeight: 400 }}
                    >
                      {item.category}
                    </span>

                    <p
                      className="mt-3 max-w-[34ch] text-[14px] leading-relaxed"
                      style={{ color: CHARCOAL }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </a>
              </li>
            );
          })}
        </ol>

        <div className="mt-24 flex items-center justify-center gap-4">
          <span aria-hidden className="h-px w-16" style={{ background: `${GOLD}99` }} />
          <span
            className="text-[10.5px]"
            style={{ color: CHARCOAL, letterSpacing: "0.42em", fontWeight: 500 }}
          >
            END OF LOOKBOOK
          </span>
          <span aria-hidden className="h-px w-16" style={{ background: `${GOLD}99` }} />
        </div>
      </div>
    </section>
  );
}
