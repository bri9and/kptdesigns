"use client";

import { EB_Garamond, JetBrains_Mono } from "next/font/google";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const garamond = EB_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const PAPER = "#F4EFE3";
const BROWN = "#3D2817";
const FOREST = "#2D5A3F";
const OCEAN = "#3D6E94";
const RUST = "#A0432A";
const FAINT = "rgba(61,40,23,0.18)";
const VFAINT = "rgba(61,40,23,0.08)";

// Viewbox 1000 x 380. Y axis: 320 = 0m elev, 40 = 1500m elev.
// Path runs through 4 waypoints: 200m, 850m, 1400m, 0m.
const yFor = (elev: number) => 320 - (elev / 1500) * 280;

const WAYPOINTS = [
  { id: "01", x: 130, elev: 200, stage: "DISCOVERY", title: "the trailhead", desc: "A short call to map terrain, fix scope, and pick a heading. We agree what we’re climbing before a single step is taken.", color: FOREST },
  { id: "02", x: 400, elev: 850, stage: "BUILD", title: "the climb", desc: "Steady ascent. Design and code in the open with weekly check-ins so the path stays clear and the load stays light.", color: OCEAN },
  { id: "03", x: 680, elev: 1400, stage: "REVIEW", title: "the summit", desc: "Private staging. Final notes, adjustments, and a long look at the view before we descend.", color: RUST },
  { id: "04", x: 920, elev: 0, stage: "DELIVERY", title: "back to ground level, codebase in hand", desc: "Source transferred, domain wired, AI agent connected if you want one. You leave the trail with the map.", color: BROWN },
] as const;

// Smooth elevation path — gentle approach, steep climb, summit, descent
const PROFILE_D = `
  M 0 ${yFor(40)}
  C 60 ${yFor(80)}, 90 ${yFor(160)}, ${WAYPOINTS[0].x} ${yFor(WAYPOINTS[0].elev)}
  C 200 ${yFor(280)}, 280 ${yFor(520)}, ${WAYPOINTS[1].x} ${yFor(WAYPOINTS[1].elev)}
  C 500 ${yFor(1100)}, 600 ${yFor(1340)}, ${WAYPOINTS[2].x} ${yFor(WAYPOINTS[2].elev)}
  C 760 ${yFor(1300)}, 820 ${yFor(800)}, ${WAYPOINTS[3].x} ${yFor(WAYPOINTS[3].elev)}
  L 1000 ${yFor(0)}
`.replace(/\s+/g, " ").trim();

const FILL_D = `${PROFILE_D} L 1000 340 L 0 340 Z`;

const ELEV_LINES = [0, 250, 500, 750, 1000, 1250, 1500];

const VIEW = { once: true, margin: "0px 0px -120px 0px" } as const;
const DRAW = { duration: 2.2, ease: [0.16, 1, 0.3, 1] as const };

export default function ProcessAtlas() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VIEW);

  return (
    <section
      ref={ref}
      className={garamond.className}
      style={{
        background: PAPER,
        color: BROWN,
        padding: "120px 32px 140px",
        position: "relative",
        overflow: "hidden",
        backgroundImage:
          `radial-gradient(${VFAINT} 1px, transparent 1px), radial-gradient(${VFAINT} 1px, transparent 1px)`,
        backgroundSize: "44px 44px, 44px 44px",
        backgroundPosition: "0 0, 22px 22px",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 8 }}>
          <span className={mono.className} style={{ fontSize: 11, letterSpacing: "0.22em", color: BROWN, fontWeight: 500 }}>
            § JOURNEY · ELEVATION PROFILE
          </span>
        </div>
        <div style={{ height: 1, background: BROWN, opacity: 0.7, marginBottom: 10 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 36 }}>
          <h2 style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.02, letterSpacing: "-0.01em", margin: 0, fontWeight: 400, fontStyle: "italic" }}>
            A four-waypoint traverse.
          </h2>
          <span className={mono.className} style={{ fontSize: 10, letterSpacing: "0.18em", opacity: 0.65 }}>
            SHEET 04 / SCALE 1:25,000
          </span>
        </div>

        {/* Map plate */}
        <div
          style={{
            position: "relative",
            border: `1px solid ${FAINT}`,
            background: `radial-gradient(120% 80% at 50% 0%, rgba(61,40,23,0.04), transparent 60%), ${PAPER}`,
            padding: "28px 28px 20px",
          }}
        >
          {/* Corner ticks */}
          {[
            { top: -1, left: -1, b: ["t", "l"] }, { top: -1, right: -1, b: ["t", "r"] },
            { bottom: -1, left: -1, b: ["b", "l"] }, { bottom: -1, right: -1, b: ["b", "r"] },
          ].map((c, i) => (
            <span key={i} style={{ position: "absolute", width: 14, height: 14, borderColor: BROWN, borderStyle: "solid", borderWidth: 0,
              ...(c.b.includes("t") ? { borderTopWidth: 1 } : {}), ...(c.b.includes("b") ? { borderBottomWidth: 1 } : {}),
              ...(c.b.includes("l") ? { borderLeftWidth: 1 } : {}), ...(c.b.includes("r") ? { borderRightWidth: 1 } : {}),
              top: c.top, bottom: c.bottom, left: c.left, right: c.right }} />
          ))}

          <svg viewBox="0 0 1000 380" preserveAspectRatio="none" style={{ width: "100%", height: "clamp(340px, 42vw, 460px)", display: "block" }}>
            <defs>
              <pattern id="atlas-hatch" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke={BROWN} strokeWidth="0.4" opacity="0.18" />
              </pattern>
              <linearGradient id="atlas-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={BROWN} stopOpacity="0.10" />
                <stop offset="100%" stopColor={BROWN} stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Elevation grid */}
            {ELEV_LINES.map((e) => (
              <g key={e}>
                <line x1="40" y1={yFor(e)} x2="975" y2={yFor(e)} stroke={BROWN} strokeWidth="0.4" strokeDasharray="2 5" opacity="0.22" />
                <text x="34" y={yFor(e) + 3} textAnchor="end" className={mono.className} fontSize="9" fill={BROWN} opacity="0.55" style={{ letterSpacing: "0.08em" }}>
                  {e}m
                </text>
              </g>
            ))}

            {/* Distance ticks */}
            {[0, 250, 500, 750, 1000].map((d) => (
              <g key={d}>
                <line x1={d === 0 ? 40 : d === 1000 ? 975 : d} y1="332" x2={d === 0 ? 40 : d === 1000 ? 975 : d} y2="338" stroke={BROWN} strokeWidth="0.5" opacity="0.5" />
                <text x={d === 0 ? 40 : d === 1000 ? 975 : d} y="354" textAnchor="middle" className={mono.className} fontSize="9" fill={BROWN} opacity="0.55" style={{ letterSpacing: "0.08em" }}>
                  {(d / 100).toFixed(1)}km
                </text>
              </g>
            ))}

            {/* Filled profile under curve */}
            <motion.path
              d={FILL_D}
              fill="url(#atlas-fill)"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.6 }}
            />
            <motion.path
              d={FILL_D}
              fill="url(#atlas-hatch)"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.8 }}
            />

            {/* Elevation contour line — animated draw */}
            <motion.path
              d={PROFILE_D}
              fill="none"
              stroke={BROWN}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={DRAW}
            />

            {/* Secondary faint contour offset above */}
            <motion.path
              d={PROFILE_D}
              fill="none"
              stroke={BROWN}
              strokeWidth="0.6"
              strokeDasharray="3 4"
              opacity="0.4"
              transform="translate(0,-14)"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ ...DRAW, delay: 0.3 }}
            />

            {/* Waypoint flags */}
            {WAYPOINTS.map((w, i) => {
              const wy = yFor(w.elev);
              return (
                <motion.g
                  key={w.id}
                  initial={{ opacity: 0, y: -18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.0 + i * 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  {/* Vertical guide line from waypoint down to baseline */}
                  <line x1={w.x} y1={wy} x2={w.x} y2={328} stroke={w.color} strokeWidth="0.7" strokeDasharray="2 3" opacity="0.45" />
                  {/* Flag pole */}
                  <line x1={w.x} y1={wy} x2={w.x} y2={wy - 38} stroke={BROWN} strokeWidth="1.1" />
                  {/* Flag */}
                  <polygon
                    points={`${w.x},${wy - 38} ${w.x + 28},${wy - 33} ${w.x},${wy - 28}`}
                    fill={w.color}
                    stroke={BROWN}
                    strokeWidth="0.6"
                  />
                  {/* Pin dot on path */}
                  <circle cx={w.x} cy={wy} r="4" fill={PAPER} stroke={w.color} strokeWidth="2" />
                  <circle cx={w.x} cy={wy} r="1.6" fill={BROWN} />
                  {/* Coord label above flag */}
                  <text x={w.x + 32} y={wy - 33} className={mono.className} fontSize="9" fill={BROWN} style={{ letterSpacing: "0.1em" }}>
                    {String(w.elev).padStart(4, "0")}m
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>

        {/* Waypoint legend cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginTop: 36 }}>
          {WAYPOINTS.map((w, i) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.2 + i * 0.2 }}
              style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 14, borderTop: `1px solid ${BROWN}` }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, background: w.color, display: "inline-block", borderRadius: 1 }} />
                <span className={mono.className} style={{ fontSize: 10, letterSpacing: "0.18em", color: BROWN, opacity: 0.7 }}>
                  WAYPOINT {w.id} · {w.stage}
                </span>
              </div>
              <div style={{ fontSize: 22, fontStyle: "italic", lineHeight: 1.15, letterSpacing: "-0.01em" }}>
                {w.title}
              </div>
              <div className={mono.className} style={{ fontSize: 10, letterSpacing: "0.14em", color: w.color, opacity: 0.9 }}>
                ELEV. {String(w.elev).padStart(4, "0")}m
              </div>
              <p style={{ margin: "4px 0 0", fontSize: 15, lineHeight: 1.55, color: BROWN, opacity: 0.85 }}>
                {w.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
