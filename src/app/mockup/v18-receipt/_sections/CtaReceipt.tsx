"use client";

import Link from "next/link";
import { VT323 } from "next/font/google";

const vt323 = VT323({ subsets: ["latin"], weight: "400", display: "swap" });

const INK = "#1A1A1A";
const PAPER = "#FBFBFB";
const RED = "#B53D3D";

const ZIGZAG =
  "polygon(0 0,100% 0,100% calc(100% - 14px),96% 100%,92% calc(100% - 14px),88% 100%,84% calc(100% - 14px),80% 100%,76% calc(100% - 14px),72% 100%,68% calc(100% - 14px),64% 100%,60% calc(100% - 14px),56% 100%,52% calc(100% - 14px),48% 100%,44% calc(100% - 14px),40% 100%,36% calc(100% - 14px),32% 100%,28% calc(100% - 14px),24% 100%,20% calc(100% - 14px),16% 100%,12% calc(100% - 14px),8% 100%,4% calc(100% - 14px),0 100%)";

export default function CtaReceipt() {
  return (
    <section
      className={vt323.className}
      style={{ background: PAPER, color: INK, padding: "72px 16px 0" }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          margin: "0 auto",
          position: "relative",
          background:
            "linear-gradient(180deg,#FBFBFB 0%,#FBFBFB 70%,#F2EFE8 100%)",
          padding: "40px 28px 56px",
          boxShadow:
            "0 1px 0 rgba(0,0,0,0.04),0 24px 48px -24px rgba(26,26,26,0.18)",
          clipPath: ZIGZAG,
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.04) 1px,transparent 1px)",
            backgroundSize: "3px 3px",
            mixBlendMode: "multiply",
            opacity: 0.6,
          }}
        />

        <div style={hdr}>*** CHECK OUT ***</div>
        <Divider />

        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(40px,9vw,56px)",
            lineHeight: 0.95,
            letterSpacing: "0.02em",
            margin: "0 0 28px",
            color: INK,
            textShadow: "1px 1px 0 rgba(26,26,26,0.08)",
          }}
        >
          READY TO PRINT<br />YOURS?
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "0 auto 28px", maxWidth: 360 }}>
          <Link href="/start" className="rcta-p" style={primaryBtn}>
            &gt; GET STARTED
          </Link>
          <Link href="/pricing" className="rcta-s" style={secondaryBtn}>
            <Tick pos="tl" /><Tick pos="tr" /><Tick pos="bl" /><Tick pos="br" />
            VIEW PRICING
          </Link>
        </div>

        <Divider />

        <div style={{ textAlign: "center", fontSize: 26, letterSpacing: "0.12em", marginBottom: 8 }}>
          *** THANK YOU ***
        </div>
        <div style={{ textAlign: "center", fontSize: 18, letterSpacing: "0.08em", opacity: 0.78, marginBottom: 22 }}>
          VISIT US AT KPTDESIGNS.COM
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
          <Barcode />
        </div>
        <div style={{ textAlign: "center", fontSize: 14, letterSpacing: "0.22em", opacity: 0.7 }}>
          0 24• KPT •18 2026
        </div>

        <div style={{ textAlign: "center", fontSize: 12, letterSpacing: "0.32em", opacity: 0.55, marginTop: 14 }}>
          EOF · KPT · MMXXVI
        </div>
      </div>

      <style>{`
        .rcta-p:hover{background:#8E2A2A!important;border-color:#8E2A2A!important;transform:translateY(-1px)}
        .rcta-s:hover{background:${INK}!important;color:${PAPER}!important}
      `}</style>
    </section>
  );
}

const hdr: React.CSSProperties = {
  textAlign: "center",
  fontSize: 22,
  letterSpacing: "0.08em",
  color: INK,
  marginBottom: 18,
};

const primaryBtn: React.CSSProperties = {
  display: "block",
  textAlign: "center",
  fontFamily: "inherit",
  fontSize: 26,
  letterSpacing: "0.06em",
  padding: "14px 18px",
  background: RED,
  color: PAPER,
  textDecoration: "none",
  border: `2px solid ${RED}`,
  transition: "background 180ms ease,transform 180ms ease",
};

const secondaryBtn: React.CSSProperties = {
  position: "relative",
  display: "block",
  textAlign: "center",
  fontFamily: "inherit",
  fontSize: 26,
  letterSpacing: "0.06em",
  padding: "14px 18px",
  background: "transparent",
  color: INK,
  textDecoration: "none",
  border: `2px solid ${INK}`,
  transition: "background 180ms ease,color 180ms ease",
};

function Divider() {
  return (
    <div
      aria-hidden
      style={{ borderTop: `1px dashed ${INK}`, opacity: 0.45, margin: "0 0 22px" }}
    />
  );
}

function Tick({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 8,
    height: 8,
    borderColor: INK,
    borderStyle: "solid",
    borderWidth: 0,
  };
  const map: Record<typeof pos, React.CSSProperties> = {
    tl: { top: -2, left: -2, borderTopWidth: 2, borderLeftWidth: 2 },
    tr: { top: -2, right: -2, borderTopWidth: 2, borderRightWidth: 2 },
    bl: { bottom: -2, left: -2, borderBottomWidth: 2, borderLeftWidth: 2 },
    br: { bottom: -2, right: -2, borderBottomWidth: 2, borderRightWidth: 2 },
  };
  return <span aria-hidden style={{ ...base, ...map[pos] }} />;
}

function Barcode() {
  const widths = [2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 1, 2, 2, 1, 3, 1, 2, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 2, 1, 3, 1, 2];
  let x = 0;
  const bars: React.ReactElement[] = [];
  widths.forEach((w, i) => {
    if (i % 2 === 0) {
      bars.push(<rect key={i} x={x} y={0} width={w * 2} height={56} fill={INK} />);
    }
    x += w * 2;
  });
  return (
    <svg width="280" height="56" viewBox="0 0 280 56" role="img" aria-label="barcode">
      {bars}
    </svg>
  );
}
