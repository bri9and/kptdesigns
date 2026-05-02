"use client";

/**
 * Scrollytelling 3D section.
 *
 * Layout: a tall (400vh) container with a sticky 100vh viewport inside
 * that holds the R3F canvas + the side copy. As the user scrolls past
 * the section, framer-motion's `useScroll` reports 0..1 progress,
 * which we feed to the 3D scene AND to the on-screen stage copy.
 *
 * Inspired by atom.peachworlds.com — but built around our boutique
 * narrative: Read → Refine → Render → Ship.
 */

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import { Scene } from "./scene";
import { SectionLabel } from "@/components/earthy/section-label";

const STAGES = [
  {
    n: "01",
    title: "Read",
    body: "We pull every word, image, and link from your existing site — even if it lives on Wix, GoDaddy, or a Facebook page.",
  },
  {
    n: "02",
    title: "Refine",
    body: "Our AI studies what your business actually does, listens to how you say it, and writes you a better version.",
  },
  {
    n: "03",
    title: "Render",
    body: "We compose the page from boutique blocks — hero, services, proof, contact — built around how your customers buy.",
  },
  {
    n: "04",
    title: "Ship",
    body: "Your domain registered, your site published, your code yours forever. Hosted with us or take it anywhere.",
  },
];

export function Scrollytelling3D() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Start when the top of the section meets the top of the viewport,
    // end when the bottom of the section meets the bottom. Gives us a
    // clean 0..1 across the full sticky range.
    offset: ["start start", "end end"],
  });

  // Map progress (0..1) to a stage index 0..3. The +0.001 keeps the last
  // stage from flickering at exactly p=1.
  const activeStage = useTransform(scrollYProgress, (p) => {
    const idx = Math.min(STAGES.length - 1, Math.floor(p * STAGES.length + 0.001));
    return idx;
  });

  return (
    <section
      ref={ref}
      className="relative bg-earthy-cream"
      // 4 viewport heights — one per stage, generous so the camera can breathe.
      style={{ height: "400vh" }}
    >
      <div className="sticky top-16 h-[calc(100vh-4rem)] w-full overflow-hidden">
        <div className="mx-auto grid h-full max-w-[1320px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-[1.05fr_0.95fr]">
          {/* Side copy — text changes per active stage. */}
          <div className="relative">
            <SectionLabel>How it works</SectionLabel>
            <h2 className="font-[family-name:var(--font-earthy-serif)] text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.1] tracking-tight text-earthy-ink">
              Four steps, one boutique site.
            </h2>

            <div className="relative mt-10 h-[260px]">
              {STAGES.map((stage, i) => (
                <Stage
                  key={stage.n}
                  stage={stage}
                  index={i}
                  activeStage={activeStage}
                />
              ))}
            </div>

            {/* Small progress strip — 4 segments, fills as scrollYProgress advances */}
            <div className="mt-10 flex gap-2">
              {STAGES.map((_, i) => (
                <ProgressBar key={i} index={i} progress={scrollYProgress} />
              ))}
            </div>
          </div>

          {/* The 3D canvas */}
          <div className="relative h-[min(72vh,700px)] w-full">
            <Canvas
              camera={{ position: [0, 0, 5.4], fov: 30 }}
              dpr={[1, 1.75]}
              gl={{ antialias: true, alpha: true }}
              style={{ background: "transparent" }}
            >
              <Scene progress={scrollYProgress} />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Stage copy — fades + slides in/out as the active stage changes      */
/* ------------------------------------------------------------------ */

function Stage({
  stage,
  index,
  activeStage,
}: {
  stage: (typeof STAGES)[number];
  index: number;
  activeStage: ReturnType<typeof useTransform<number, number>>;
}) {
  const opacity = useTransform(activeStage, (a) => (a === index ? 1 : 0));
  const y = useTransform(activeStage, (a) => (a === index ? 0 : a < index ? 24 : -24));

  return (
    <motion.div
      style={{ opacity, y }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="absolute inset-0"
    >
      <p className="font-[family-name:var(--font-earthy-mono)] text-xs tracking-[0.2em] text-earthy-orange">
        {stage.n}
      </p>
      <h3 className="mt-3 font-[family-name:var(--font-earthy-serif)] text-[clamp(1.6rem,2.6vw,2rem)] font-medium text-earthy-ink">
        {stage.title}
      </h3>
      <p className="mt-3 max-w-[460px] text-base leading-relaxed text-earthy-stone-700">
        {stage.body}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Progress bar — one segment per stage                                */
/* ------------------------------------------------------------------ */

function ProgressBar({
  index,
  progress,
}: {
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Each segment fills as `progress` crosses its own [i/4, (i+1)/4] range.
  const segWidth = useTransform(progress, (p) => {
    const localP = Math.max(0, Math.min(1, p * STAGES.length - index));
    return `${localP * 100}%`;
  });

  return (
    <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-earthy-stone-200">
      <motion.div
        className="absolute inset-y-0 left-0 bg-earthy-orange"
        style={{ width: segWidth }}
      />
    </div>
  );
}
