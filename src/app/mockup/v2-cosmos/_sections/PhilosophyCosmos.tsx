"use client";

import { Inter, JetBrains_Mono } from "next/font/google";
import { motion } from "framer-motion";

const inter = Inter({ subsets: ["latin"], weight: ["200", "400", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

const EASE = [0.16, 1, 0.3, 1] as const;
const VOID = "#02030A";
const STAR = "#F8F8FF";
const PLASMA = "#7B5BFF";
const NEBULA = "#FF6BC1";
const GREY = "#9BA3C7";

const starfield =
  "radial-gradient(1px 1px at 17% 23%, rgba(248,248,255,0.55), transparent 60%)," +
  "radial-gradient(1px 1px at 42% 71%, rgba(248,248,255,0.35), transparent 60%)," +
  "radial-gradient(1px 1px at 78% 14%, rgba(248,248,255,0.6), transparent 60%)," +
  "radial-gradient(1px 1px at 88% 58%, rgba(248,248,255,0.4), transparent 60%)," +
  "radial-gradient(1px 1px at 11% 82%, rgba(248,248,255,0.45), transparent 60%)," +
  "radial-gradient(1px 1px at 63% 36%, rgba(248,248,255,0.3), transparent 60%)," +
  "radial-gradient(1px 1px at 29% 49%, rgba(248,248,255,0.5), transparent 60%)," +
  "radial-gradient(1px 1px at 54% 88%, rgba(248,248,255,0.35), transparent 60%)," +
  "radial-gradient(1px 1px at 7% 12%, rgba(248,248,255,0.4), transparent 60%)," +
  "radial-gradient(1px 1px at 95% 91%, rgba(248,248,255,0.5), transparent 60%)";

const corner = (pos: "tl" | "tr" | "bl" | "br") => {
  const m: Record<string, React.CSSProperties> = {
    tl: { top: 0, left: 0, borderTop: `1px solid ${PLASMA}`, borderLeft: `1px solid ${PLASMA}` },
    tr: { top: 0, right: 0, borderTop: `1px solid ${PLASMA}`, borderRight: `1px solid ${PLASMA}` },
    bl: { bottom: 0, left: 0, borderBottom: `1px solid ${PLASMA}`, borderLeft: `1px solid ${PLASMA}` },
    br: { bottom: 0, right: 0, borderBottom: `1px solid ${PLASMA}`, borderRight: `1px solid ${PLASMA}` },
  };
  return { position: "absolute" as const, width: 32, height: 32, opacity: 0.6, pointerEvents: "none" as const, ...m[pos] };
};

export default function PhilosophyCosmos() {
  return (
    <section
      className={`${inter.className} relative w-full overflow-hidden`}
      style={{ background: VOID, color: STAR }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 92% 8%, rgba(123,91,255,0.18), transparent 60%)," +
            "radial-gradient(ellipse 55% 45% at 6% 96%, rgba(255,107,193,0.10), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{ backgroundImage: starfield }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,3,10,0.85) 0%, transparent 14%, transparent 86%, rgba(2,3,10,0.95) 100%)",
        }}
      />

      <div
        aria-hidden
        className={`${mono.className} hidden md:flex items-center gap-2 absolute top-8 left-8 text-[10px] tracking-[0.25em] uppercase`}
        style={{ color: GREY }}
      >
        <span style={{ width: 18, height: 1, background: PLASMA }} />
        <span>§01 · 40.44°N / 79.99°W</span>
      </div>
      <div
        aria-hidden
        className={`${mono.className} hidden md:flex items-center gap-2 absolute top-8 right-8 text-[10px] tracking-[0.25em] uppercase`}
        style={{ color: GREY }}
      >
        <span>SECTOR · PHILOSOPHY</span>
        <span style={{ width: 18, height: 1, background: PLASMA }} />
      </div>

      <div className="relative mx-auto px-6 sm:px-10 py-28 md:py-40" style={{ maxWidth: 1080 }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, ease: EASE }}
          className="flex items-center gap-4 mb-12 md:mb-20"
        >
          <span className={`${mono.className} text-[11px] uppercase`} style={{ color: STAR, letterSpacing: "0.32em" }}>
            § 01 / Philosophy
          </span>
          <span
            className="flex-1 h-px"
            style={{ background: `linear-gradient(90deg, ${PLASMA} 0%, rgba(123,91,255,0.4) 60%, transparent 100%)` }}
          />
          <span className={`${mono.className} text-[10px] uppercase opacity-60`} style={{ color: GREY, letterSpacing: "0.3em" }}>
            CHART · 002
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.1 }}
          className="font-light leading-[1.02]"
          style={{ color: STAR, fontSize: "clamp(2.6rem, 6.6vw, 5.4rem)", letterSpacing: "-0.015em", fontWeight: 200 }}
        >
          <span style={{ display: "block" }}>No templates.</span>
          <span style={{ display: "block" }}>
            No <em style={{ fontStyle: "italic", fontWeight: 200, color: NEBULA }}>shortcuts</em>.
          </span>
        </motion.h2>

        <div className="mt-16 md:mt-24 grid md:grid-cols-12 gap-y-14 md:gap-x-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
            className="md:col-span-6 md:col-start-1 relative"
          >
            <div
              aria-hidden
              className="absolute -left-4 top-1 h-full w-px"
              style={{ background: `linear-gradient(180deg, ${PLASMA} 0%, transparent 100%)` }}
            />
            <p className={`${mono.className} text-[10px] uppercase mb-5`} style={{ color: PLASMA, letterSpacing: "0.32em" }}>
              001 · Method
            </p>
            <p className="text-base md:text-lg leading-[1.7]" style={{ color: GREY, fontWeight: 300 }}>
              We hand-code every site from scratch. No templates. No page builders. No WordPress.
              Each line is written by a human who understands the territory — because the
              difference between rented and owned shows up in every pixel.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
            className="md:col-span-5 md:col-start-8 relative"
          >
            <div
              aria-hidden
              className="absolute -left-4 top-1 h-full w-px"
              style={{ background: `linear-gradient(180deg, ${NEBULA} 0%, transparent 100%)` }}
            />
            <p className={`${mono.className} text-[10px] uppercase mb-5`} style={{ color: NEBULA, letterSpacing: "0.32em" }}>
              002 · Ownership
            </p>
            <p className="text-base md:text-lg leading-[1.7]" style={{ color: GREY, fontWeight: 300 }}>
              You receive the complete source code. No lock-in. No subscription that holds your
              site hostage. Your website. Your code. <span style={{ color: STAR }}>Forever.</span>
            </p>
          </motion.div>
        </div>

        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
          className="relative mt-24 md:mt-36 md:ml-[12%] md:mr-[-4%]"
        >
          <div
            aria-hidden
            className={`${mono.className} absolute -top-6 left-0 text-[10px] tracking-[0.3em] uppercase`}
            style={{ color: PLASMA }}
          >
            ✦ Field Note
          </div>
          <blockquote
            className="font-light italic leading-[1.08]"
            style={{
              color: PLASMA,
              fontSize: "clamp(2rem, 5.2vw, 4.2rem)",
              letterSpacing: "-0.01em",
              fontWeight: 300,
              textShadow: "0 0 60px rgba(123,91,255,0.35)",
            }}
          >
            <span style={{ color: GREY, fontStyle: "normal", marginRight: "0.3em" }}>“</span>
            We don&apos;t ship templates.
            <br />
            <span style={{ color: STAR }}>We chart territory.</span>
            <span style={{ color: GREY, fontStyle: "normal", marginLeft: "0.15em" }}>”</span>
          </blockquote>
          <figcaption
            className={`${mono.className} mt-6 text-[10px] tracking-[0.3em] uppercase flex items-center gap-3`}
            style={{ color: GREY }}
          >
            <span style={{ width: 24, height: 1, background: GREY, opacity: 0.5 }} />
            KPT · Cartographer&apos;s Log
          </figcaption>
        </motion.figure>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.4 }}
          className={`${mono.className} mt-24 md:mt-32 flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase`}
          style={{ color: GREY, letterSpacing: "0.3em" }}
        >
          <div className="flex items-center gap-3">
            <span style={{ width: 6, height: 6, background: PLASMA, boxShadow: `0 0 10px ${PLASMA}` }} />
            END · §01
          </div>
          <span className="flex-1 h-px mx-2" style={{ background: "rgba(155,163,199,0.18)" }} />
          <div>NEXT · §02 / STACK</div>
        </motion.div>
      </div>

      <div aria-hidden style={corner("tl")} />
      <div aria-hidden style={corner("tr")} />
      <div aria-hidden style={corner("bl")} />
      <div aria-hidden style={corner("br")} />
    </section>
  );
}
