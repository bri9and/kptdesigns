"use client";

import { useEffect, useRef } from "react";
import { Instrument_Serif, Barlow } from "next/font/google";
import { ArrowUpRight, Play, Clock, Globe } from "lucide-react";

const heading = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-heading" });
const body = Barlow({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-body" });

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4";

const css = `
  .liquid-glass {
    background: rgba(255,255,255,0.01);
    background-blend-mode: luminosity;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: none;
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
    position: relative;
    overflow: hidden;
  }
  .liquid-glass::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    background: linear-gradient(180deg,
      rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
      rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
      rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
  .liquid-glass-strong {
    background: rgba(255,255,255,0.01);
    background-blend-mode: luminosity;
    backdrop-filter: blur(50px);
    -webkit-backdrop-filter: blur(50px);
    border: none;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.15);
    position: relative;
    overflow: hidden;
  }
  .liquid-glass-strong::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    background: linear-gradient(180deg,
      rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 20%,
      rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
      rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.5) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  @keyframes aetherisRise {
    from { opacity: 0; transform: translateY(20px); filter: blur(10px); }
    to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
  }
  .aetheris-rise { opacity: 0; animation: aetherisRise 1s ease-out forwards; }
`;

const navLinks = ["Home", "Work", "Studio", "Process", "Inquire"];

export default function V83AetherisPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let raf = 0;
    let fadingOut = false;
    const FADE_MS = 500;
    const fadeTo = (target: number) => {
      if (raf) cancelAnimationFrame(raf);
      const start = parseFloat(v.style.opacity || "0");
      const startTime = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - startTime) / FADE_MS);
        v.style.opacity = String(start + (target - start) * t);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const onLoaded = () => {
      v.style.opacity = "0";
      void v.play();
      fadeTo(1);
    };
    const onTime = () => {
      if (!fadingOut && v.duration && v.duration - v.currentTime <= 0.55 && v.duration - v.currentTime > 0) {
        fadingOut = true;
        fadeTo(0);
      }
    };
    const onEnded = () => {
      v.style.opacity = "0";
      setTimeout(() => {
        v.currentTime = 0;
        void v.play();
        fadingOut = false;
        fadeTo(1);
      }, 100);
    };
    v.addEventListener("loadeddata", onLoaded);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnded);
    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("loadeddata", onLoaded);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <div
      className={`${heading.variable} ${body.variable} relative min-h-screen w-full overflow-hidden text-white`}
      style={{ background: "#000", fontFamily: "var(--font-body)" }}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute left-1/2 top-0 z-0 -translate-x-1/2 object-cover object-top transition-opacity"
        style={{ width: "120%", height: "120%", opacity: 0 }}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Floating navbar */}
      <div className="fixed left-0 right-0 top-4 z-50 flex items-center justify-between px-8 lg:px-16">
        <span
          className="liquid-glass grid h-12 w-12 place-items-center rounded-full text-2xl italic text-white"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          k
        </span>

        <div className="liquid-glass hidden items-center gap-1 rounded-full px-1.5 py-1.5 md:flex">
          {navLinks.map((l) => (
            <a
              key={l}
              href="#"
              className="rounded-full px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              {l}
            </a>
          ))}
          <a
            href="#"
            className="ml-1 inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-black"
          >
            Claim a Spot
            <ArrowUpRight size={14} strokeWidth={2} />
          </a>
        </div>

        <span className="h-12 w-12" aria-hidden />
      </div>

      {/* Hero content */}
      <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center px-4 pt-32 text-center">
        <div className="aetheris-rise liquid-glass mb-8 inline-flex items-center gap-3 rounded-full px-1 py-1 pr-3" style={{ animationDelay: "400ms" }}>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">New</span>
          <span className="text-sm text-white/90">First production launch · Q3 2026</span>
        </div>

        <h1
          className="aetheris-rise max-w-2xl text-6xl italic leading-[0.85] tracking-tight text-white md:text-7xl lg:text-[5.5rem]"
          style={{
            fontFamily: "var(--font-heading)",
            letterSpacing: "-4px",
            animationDelay: "550ms",
          }}
        >
          Production evolved. Performance unmistakable.
        </h1>

        <p
          className="aetheris-rise mt-6 max-w-2xl text-sm font-light leading-tight text-white md:text-base"
          style={{ animationDelay: "800ms" }}
        >
          We engineer high-performance landing pages and digital experiences for ambitious operators. Built for the long voyage, not the next quarter.
        </p>

        <div className="aetheris-rise mt-8 flex items-center gap-6" style={{ animationDelay: "1100ms" }}>
          <a
            href="#"
            className="liquid-glass-strong inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white"
          >
            Start Your Build
            <ArrowUpRight size={18} strokeWidth={2} />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full text-sm font-medium text-white/85 transition-colors hover:text-white"
          >
            <Play size={14} strokeWidth={0} className="fill-white" />
            View Lift-off
          </a>
        </div>

        <div className="aetheris-rise mt-10 flex flex-wrap items-stretch justify-center gap-4" style={{ animationDelay: "1300ms" }}>
          <div className="liquid-glass flex w-[220px] items-start gap-3 rounded-[1.25rem] p-5 text-left">
            <Clock className="h-7 w-7 shrink-0 text-white" strokeWidth={1.5} />
            <div>
              <p className="text-2xl italic" style={{ fontFamily: "var(--font-heading)" }}>5 days</p>
              <p className="text-xs text-white/65">Concept → launch on most builds.</p>
            </div>
          </div>
          <div className="liquid-glass flex w-[220px] items-start gap-3 rounded-[1.25rem] p-5 text-left">
            <Globe className="h-7 w-7 shrink-0 text-white" strokeWidth={1.5} />
            <div>
              <p className="text-2xl italic" style={{ fontFamily: "var(--font-heading)" }}>200+</p>
              <p className="text-xs text-white/65">Sites live. Counting.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
