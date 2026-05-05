"use client";

import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"], weight: ["400", "500", "700", "900"], variable: "--font-rubik" });

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260206_044704_dd33cb15-c23f-4cfc-aa09-a0465d4dcb54.mp4";

const css = `
  @keyframes neRise {
    from { opacity: 0; transform: translateY(30px) scale(0.96); filter: blur(8px); }
    to   { opacity: 1; transform: translateY(0) scale(1);       filter: blur(0); }
  }
  .ne-line  { opacity: 0; animation: neRise 1s cubic-bezier(.2,.7,.2,1) forwards; }
  .ne-cta   { opacity: 0; animation: neRise .8s cubic-bezier(.2,.7,.2,1) 1.1s forwards; }
`;

const lines = ["NEW ERA", "OF SITES", "STARTS NOW"];

export default function V81NewEraPage() {
  return (
    <div
      className={`${rubik.variable} relative min-h-screen w-full overflow-hidden`}
      style={{ background: "#21346e", fontFamily: "var(--font-rubik)" }}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:py-8">
        <span className="text-base font-bold uppercase tracking-[0.3em] text-white">KPT</span>
        <a
          href="#"
          className="rounded-full border border-white/30 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md transition-colors hover:bg-white/10"
        >
          Inquire
        </a>
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-16 md:pt-32">
        <h1
          className="font-bold uppercase text-white"
          style={{ lineHeight: 0.98, letterSpacing: "-3px" }}
        >
          {lines.map((line, i) => (
            <span
              key={line}
              className="ne-line block text-6xl md:text-8xl lg:text-[100px]"
              style={{ animationDelay: `${i * 200}ms` }}
            >
              {line}
            </span>
          ))}
        </h1>

        <div className="ne-cta mt-12">
          <a
            href="#"
            aria-label="Get Started"
            className="relative inline-flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            style={{ width: 184, height: 65 }}
          >
            <svg
              className="absolute inset-0"
              width="184"
              height="65"
              viewBox="0 0 184 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 14C0 6.268 6.268 0 14 0H156C171.464 0 184 12.536 184 28V51C184 58.732 177.732 65 170 65H28C12.536 65 0 52.464 0 37V14Z"
                fill="#fff"
              />
            </svg>
            <span
              className="relative z-10 text-[20px] font-bold uppercase"
              style={{ color: "#161a20", letterSpacing: "-0.5px" }}
            >
              Get Started
            </span>
          </a>
        </div>
      </main>

      <footer className="absolute bottom-0 left-0 right-0 z-10 mx-auto flex max-w-7xl items-end justify-between px-6 pb-8 text-[10px] font-medium uppercase tracking-[0.4em] text-white/60">
        <span>v81 — New Era</span>
        <span>kpt designs</span>
      </footer>
    </div>
  );
}
