"use client";

import { useEffect, useRef } from "react";
import { Instrument_Serif, Inter } from "next/font/google";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" });
const sans = Inter({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-sans" });

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4";

const css = `
  @keyframes aetheraRise {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .aethera-rise        { opacity: 0; animation: aetheraRise .9s cubic-bezier(.2,.7,.2,1) forwards; }
  .aethera-rise-d1     { opacity: 0; animation: aetheraRise .9s cubic-bezier(.2,.7,.2,1) .2s forwards; }
  .aethera-rise-d2     { opacity: 0; animation: aetheraRise .9s cubic-bezier(.2,.7,.2,1) .4s forwards; }
  .aethera-rise-d3     { opacity: 0; animation: aetheraRise .9s cubic-bezier(.2,.7,.2,1) .6s forwards; }
`;

const navLinks = [
  { label: "Home", active: true },
  { label: "Studio" },
  { label: "About" },
  { label: "Journal" },
  { label: "Reach Us" },
];

export default function V75AetheraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let raf = 0;
    const tick = () => {
      if (v.duration) {
        const t = v.currentTime;
        const d = v.duration;
        const fadeIn = Math.min(1, t / 0.5);
        const fadeOut = Math.min(1, Math.max(0, (d - t) / 0.5));
        v.style.opacity = String(Math.min(fadeIn, fadeOut));
      }
      raf = requestAnimationFrame(tick);
    };
    const onEnded = () => {
      v.style.opacity = "0";
      setTimeout(() => {
        v.currentTime = 0;
        void v.play();
      }, 100);
    };
    v.addEventListener("ended", onEnded);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <div className={`${sans.variable} ${serif.variable} relative min-h-screen w-full overflow-hidden bg-white text-black`}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="absolute left-0 right-0 z-0" style={{ top: "300px", height: "calc(100vh - 300px)" }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover transition-opacity duration-300"
          style={{ opacity: 0 }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      </div>

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-8">
        <span
          className="aethera-rise text-3xl tracking-tight text-black"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          KPT<sup className="ml-0.5 text-xs">®</sup>
        </span>
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((l, i) => (
            <a
              key={l.label}
              href="#"
              className={`aethera-rise text-sm transition-colors hover:text-black ${l.active ? "text-black" : "text-[#6F6F6F]"}`}
              style={{ animationDelay: `${100 + i * 40}ms`, fontFamily: "var(--font-sans)" }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#"
          className="aethera-rise rounded-full bg-black px-6 py-2.5 text-sm text-white transition-transform hover:scale-[1.03]"
          style={{ animationDelay: "300ms", fontFamily: "var(--font-sans)" }}
        >
          Begin Project
        </a>
      </nav>

      <section
        className="relative z-10 mx-auto flex flex-col items-center px-6 pb-40 text-center"
        style={{ paddingTop: "calc(8rem - 75px)" }}
      >
        <h1
          className="aethera-rise max-w-7xl text-5xl font-normal leading-[0.95] sm:text-7xl md:text-8xl"
          style={{
            fontFamily: "var(--font-serif)",
            letterSpacing: "-2.46px",
          }}
        >
          Beyond <em className="italic text-[#6F6F6F]">noise,</em> we build
          <br />
          <em className="italic text-[#6F6F6F]">the inevitable.</em>
        </h1>

        <p
          className="aethera-rise-d1 mt-8 max-w-2xl text-base leading-relaxed text-[#6F6F6F] sm:text-lg"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Custom-coded landing pages for brilliant operators, fearless founders, and thoughtful brands. Through the noise, we craft digital havens for deep work and pure conversion.
        </p>

        <a
          href="#"
          className="aethera-rise-d2 mt-12 rounded-full bg-black px-14 py-5 text-base text-white transition-transform hover:scale-[1.03]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Begin Project
        </a>
      </section>
    </div>
  );
}
