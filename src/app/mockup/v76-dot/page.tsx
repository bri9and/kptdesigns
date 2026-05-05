"use client";

import { useEffect, useState } from "react";
import { Instrument_Serif, Inter } from "next/font/google";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" });
const sans = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-sans" });

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260427_054418_a6d194f0-ac86-4df9-abe5-ded73e596d7c.mp4";

const messages = ["Hi, KPT here.", "Got 30 mins?", "Let's build."];

const css = `
  @import url('https://db.onlinewebfonts.com/c/440b53b1a1c65037f944ff19259d8014?family=Nokia+Cellphone+FC+Small');

  @keyframes dotRise {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes dotPop {
    from { opacity: 0; transform: scale(.95); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes dotBlink {
    0%, 100% { opacity: 0; }
    50%      { opacity: 1; }
  }
  .dot-pop  { opacity: 0; animation: dotPop  1.5s cubic-bezier(.16,1,.3,1) forwards; }
  .dot-rise { opacity: 0; animation: dotRise 1.2s cubic-bezier(.16,1,.3,1) .3s forwards; }
  .dot-blink { animation: dotBlink .8s steps(1) infinite; }
  .font-nokia { font-family: 'Nokia Cellphone FC Small', monospace; }

  .dot-cta {
    background: #0871E7;
    box-shadow: inset 0 -4px 4px rgba(255,255,255,0.39);
    outline: 1px solid #0871E7;
    outline-offset: -1px;
    position: relative;
    overflow: hidden;
  }
  .dot-cta::before {
    content: "";
    position: absolute;
    width: 80%; height: 16px; left: 10%; top: 1px;
    background: linear-gradient(180deg, #DEF0FC 0%, transparent 100%);
    border-radius: 12px;
    transition: transform 250ms ease-out;
  }
  .dot-cta:hover::before { transform: scaleX(1.05); }
`;

export default function V76DotPage() {
  const [text, setText] = useState("");
  const [msgIdx, setMsgIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = messages[msgIdx];
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setMsgIdx((i) => (i + 1) % messages.length);
      return;
    }
    const t = setTimeout(
      () => {
        setText((cur) =>
          deleting ? current.slice(0, cur.length - 1) : current.slice(0, cur.length + 1),
        );
      },
      deleting ? 50 : 100,
    );
    return () => clearTimeout(t);
  }, [text, msgIdx, deleting]);

  return (
    <div className={`${sans.variable} ${serif.variable} relative min-h-screen w-full overflow-hidden bg-[#F3F4ED]`}>
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
      <div className="absolute inset-0 z-[1] bg-white/5" />

      {/* Floating glass nav */}
      <div className="pointer-events-none fixed top-6 left-1/2 z-50 w-[95%] max-w-5xl -translate-x-1/2">
        <nav className="pointer-events-auto flex items-center justify-between rounded-full border border-black/10 bg-white/40 px-5 py-2.5 backdrop-blur-md">
          <span
            className="text-[28px] tracking-tight text-[#1a1a1a]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            kpt.
          </span>
          <div className="hidden items-center gap-10 md:flex">
            {["Philosophy", "Work", "Process", "Tribe"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-[14px] text-[#1a1a1a] transition-opacity hover:opacity-60"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {l}
              </a>
            ))}
          </div>
          <a
            href="#"
            className="dot-cta group rounded-full px-5 py-2 text-[14px] font-medium text-white"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Link up
          </a>
        </nav>
      </div>

      <div className="pointer-events-none relative z-20 flex min-h-screen flex-col items-center justify-start pt-32 text-center md:pt-40">
        <h1
          className="dot-pop mb-6 text-[38px] leading-[0.85] tracking-tight text-[#1a1a1a] md:text-[56px] lg:text-[72px]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Short page.
          <br />
          Heavy lift.
        </h1>
        <p
          className="dot-rise mx-auto max-w-xl px-6 text-[16px] leading-relaxed text-[#1a1a1a]/70 md:text-[18px]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          One landing page. One conversion goal. A quiet rhythm in the noise of templates and bloat.
        </p>

        {/* Nokia screen overlay */}
        <div className="font-nokia absolute bottom-[32%] left-[48.5%] z-30 flex w-[110px] -translate-x-1/2 justify-start text-left text-[10px] leading-tight break-words text-[#2A3616] sm:w-[130px] sm:text-[14px] md:left-[47.5%] lg:left-[48.5%]">
          <span style={{ minHeight: "1.5em" }}>{text}</span>
          <span className="dot-blink ml-1 inline-block h-3 w-1.5 align-middle bg-[#2A3616]" />
        </div>
      </div>
    </div>
  );
}
