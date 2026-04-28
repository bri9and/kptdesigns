"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CtaCosmos() {
  return (
    <section
      aria-label="Final call to action"
      className="relative isolate overflow-hidden"
      style={{
        backgroundColor: "#02030A",
        paddingTop: "160px",
        paddingBottom: "160px",
      }}
    >
      {/* Nebula radial wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(123,91,255,0.22) 0%, rgba(255,107,193,0.12) 38%, rgba(255,128,0,0.06) 62%, rgba(2,3,10,0) 78%)",
        }}
      />

      {/* Star field — layered radial gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 12% 18%, #F8F8FF 0%, transparent 60%), radial-gradient(1px 1px at 27% 72%, #F8F8FF 0%, transparent 60%), radial-gradient(1.4px 1.4px at 41% 33%, #F8F8FF 0%, transparent 55%), radial-gradient(1px 1px at 58% 81%, #F8F8FF 0%, transparent 60%), radial-gradient(1px 1px at 66% 14%, #F8F8FF 0%, transparent 60%), radial-gradient(1.6px 1.6px at 73% 58%, #F8F8FF 0%, transparent 55%), radial-gradient(1px 1px at 84% 28%, #F8F8FF 0%, transparent 60%), radial-gradient(1px 1px at 91% 76%, #F8F8FF 0%, transparent 60%), radial-gradient(1px 1px at 8% 88%, #F8F8FF 0%, transparent 60%), radial-gradient(1.2px 1.2px at 49% 7%, #F8F8FF 0%, transparent 55%), radial-gradient(1px 1px at 35% 47%, rgba(248,248,255,0.7) 0%, transparent 60%), radial-gradient(1px 1px at 78% 92%, rgba(248,248,255,0.6) 0%, transparent 60%)",
        }}
      />

      {/* Comet streak */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute"
        initial={{ opacity: 0, x: "-20vw", y: "-10vh" }}
        animate={{ opacity: [0, 1, 1, 0], x: "120vw", y: "110vh" }}
        transition={{
          duration: 6,
          ease: EASE,
          repeat: Infinity,
          repeatDelay: 7,
          times: [0, 0.08, 0.85, 1],
        }}
        style={{ top: 0, left: 0, width: "260px", height: "1px" }}
      >
        <div
          style={{
            width: "100%",
            height: "1px",
            transform: "rotate(35deg)",
            transformOrigin: "left center",
            background:
              "linear-gradient(90deg, rgba(248,248,255,0) 0%, rgba(248,248,255,0.85) 70%, #F8F8FF 100%)",
            boxShadow: "0 0 8px rgba(248,248,255,0.6), 0 0 24px rgba(123,91,255,0.5)",
          }}
        />
      </motion.div>

      {/* Top + bottom hairlines for HUD framing */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(155,163,199,0.35), transparent)" }} />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(155,163,199,0.35), transparent)" }} />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.4, ease: EASE }}
          className="mb-6 font-mono text-[11px] uppercase"
          style={{ color: "#9BA3C7", letterSpacing: "0.4em" }}
        >
          <span style={{ color: "#FF8000" }}>◆</span>&nbsp;&nbsp;Final Transmission
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.8, ease: EASE }}
          className="font-sans font-extralight"
          style={{
            color: "#F8F8FF",
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            fontSize: "clamp(3rem, 9vw, 7.5rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.01em",
            textShadow: "0 0 40px rgba(123,91,255,0.25)",
          }}
        >
          <span style={{ letterSpacing: "0.08em", display: "inline-block" }}>Start</span>{" "}
          <span style={{ letterSpacing: "0.08em", display: "inline-block" }}>Your</span>{" "}
          <span
            style={{
              letterSpacing: "0.08em",
              display: "inline-block",
              backgroundImage: "linear-gradient(90deg, #F8F8FF 0%, #FF6BC1 50%, #FF8000 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Project
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.25 }}
          className="mt-8 max-w-2xl whitespace-nowrap text-base sm:text-lg"
          style={{ color: "#9BA3C7", fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
        >
          Tell us what you need. We chart the route.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.5 }}
          className="mt-14 flex flex-col items-center gap-5 sm:flex-row sm:gap-6"
        >
          <Link
            href="/start"
            className="group relative inline-flex h-14 items-center justify-center overflow-hidden border px-10 font-mono text-xs uppercase transition-colors duration-700"
            style={{
              backgroundColor: "#FF8000",
              color: "#02030A",
              borderColor: "#F8F8FF",
              letterSpacing: "0.32em",
              boxShadow: "0 0 0 1px rgba(248,248,255,0.15), 0 20px 60px -20px rgba(255,128,0,0.55)",
            }}
          >
            <span className="relative z-10">Get Started</span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 transition-transform duration-[1400ms] ease-out group-hover:translate-x-[300%]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(248,248,255,0.55), transparent)",
              }}
            />
          </Link>

          <Link
            href="/pricing"
            className="group relative inline-flex h-14 items-center justify-center border px-10 font-mono text-xs uppercase transition-all duration-700"
            style={{
              borderColor: "#F8F8FF",
              color: "#F8F8FF",
              letterSpacing: "0.32em",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 24px rgba(123,91,255,0.55), 0 0 64px rgba(123,91,255,0.35), inset 0 0 24px rgba(123,91,255,0.18)";
              e.currentTarget.style.borderColor = "#7B5BFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "#F8F8FF";
            }}
          >
            <span className="relative z-10">View Pricing</span>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 2, ease: EASE, delay: 0.9 }}
          className="mt-12 font-mono text-[10px] uppercase"
          style={{ color: "#9BA3C7", letterSpacing: "0.5em" }}
        >
          Est. 2004 <span style={{ color: "#7B5BFF" }}>·</span> Uplink Ready
        </motion.p>
      </div>
    </section>
  );
}
