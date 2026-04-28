"use client";

import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const PAPER = "#FAFAFA";
const SURFACE = "#1A1A2E";
const PURPLE = "#6B4EE6";
const PURPLE_BORDER = "rgba(107,78,230,0.35)";
const GREEN = "#00C896";
const GREY = "#E5E5E8";
const SOFT = "rgba(26,26,46,0.55)";
const FAINT = "rgba(26,26,46,0.35)";
const EASE = [0.16, 1, 0.3, 1] as const;

const SUGGESTIONS = ["E-commerce", "Brochure site", "Marketing site for my service business", "Just exploring"];

export default function HeroConversation() {
  const [showTyping, setShowTyping] = useState(true);
  const [showBubble, setShowBubble] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => { setShowTyping(false); setShowBubble(true); }, 1700),
      setTimeout(() => setShowChips(true), 2300),
      setTimeout(() => setShowInput(true), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      className={inter.className}
      style={{
        position: "relative", background: PAPER, color: SURFACE, minHeight: "100vh",
        paddingTop: "calc(var(--nav-height, 80px) + clamp(20px, 4vh, 56px))",
        paddingBottom: "clamp(40px, 8vh, 96px)",
        paddingInline: "clamp(16px, 4vw, 64px)",
        overflow: "hidden", isolation: "isolate",
        fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1, "ss01" 1',
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 18% 0%, rgba(107,78,230,0.06) 0%, transparent 55%), radial-gradient(ellipse at 82% 100%, rgba(0,200,150,0.04) 0%, transparent 50%)",
        }}
      />

      <div className="conv-shell" style={{
        position: "relative", zIndex: 1, maxWidth: 720, marginInline: "auto",
        display: "flex", flexDirection: "column", gap: "clamp(20px, 3vh, 32px)",
      }}>
        {/* Wordmark */}
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: "clamp(8px,1.6vh,18px)" }}>
          <span style={{ fontSize: 11, letterSpacing: "0.42em", textTransform: "uppercase", fontWeight: 500, color: FAINT }}>
            KPT&nbsp;·&nbsp;Designs
          </span>
        </div>

        {/* Online indicator */}
        <motion.div
          initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
        >
          <span style={{
            width: 8, height: 8, borderRadius: "50%", background: GREEN,
            animation: "kpt-pulse 2.4s ease-out infinite",
          }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: SOFT, letterSpacing: "-0.005em" }}>
            <span style={{ color: SURFACE, fontWeight: 600 }}>Kit</span>
            <span style={{ color: FAINT }}>&nbsp;·&nbsp;</span>agent online
            <span style={{ color: FAINT }}>&nbsp;·&nbsp;</span>
            <span style={{ color: SOFT }}>typically replies in seconds</span>
          </span>
        </motion.div>

        {/* Conversation */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, minHeight: 220 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, maxWidth: "92%" }}>
            <div aria-hidden style={{
              position: "relative", width: 36, height: 36, flexShrink: 0, borderRadius: "50%",
              background: `linear-gradient(135deg, ${SURFACE} 0%, ${PURPLE} 130%)`,
              color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, letterSpacing: "0.04em",
              boxShadow: "0 1px 0 rgba(255,255,255,0.18) inset, 0 6px 14px -8px rgba(26,26,46,0.4)",
            }}>
              <span style={{ position: "relative", zIndex: 1 }}>K</span>
              <span style={{
                position: "absolute", right: -1, bottom: -1, width: 11, height: 11,
                borderRadius: "50%", background: GREEN, border: `2px solid ${PAPER}`,
              }} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{
                display: "block", fontSize: 11, fontWeight: 500, color: FAINT,
                letterSpacing: "0.04em", marginBottom: 6, paddingLeft: 4,
              }}>
                Kit · KPT agent
              </span>

              <AnimatePresence mode="wait" initial={false}>
                {showTyping && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18 } }}
                    transition={{ duration: 0.34, ease: EASE }}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      background: SURFACE, borderRadius: 18, borderBottomLeftRadius: 6,
                      padding: "14px 18px",
                    }}
                    aria-label="Kit is typing"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        style={{ display: "block", width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.55)" }}
                        animate={{ y: [0, -4, 0], opacity: [0.45, 1, 0.45] }}
                        transition={{ duration: 1.0, ease: "easeInOut", repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </motion.div>
                )}

                {showBubble && (
                  <motion.div
                    key="bubble"
                    initial={{ opacity: 0, y: 14, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.55, ease: EASE }}
                    style={{
                      background: SURFACE, color: "rgba(255,255,255,0.94)",
                      borderRadius: 18, borderBottomLeftRadius: 6,
                      padding: "16px 20px 17px",
                      fontSize: "clamp(15px, 1.15vw, 17px)", lineHeight: 1.55,
                      letterSpacing: "-0.005em", fontWeight: 400, maxWidth: "100%",
                      boxShadow: "0 1px 0 rgba(0,0,0,0.04), 0 12px 28px -16px rgba(26,26,46,0.35)",
                    }}
                  >
                    Hi &mdash; I&rsquo;m <strong style={{ color: "#fff", fontWeight: 600 }}>Kit</strong>
                    , KPT&rsquo;s agent. We&rsquo;re a{" "}
                    <strong style={{ color: "#fff", fontWeight: 600 }}>registrar</strong>
                    <span style={{ color: "rgba(255,255,255,0.55)" }}>, </span>
                    <strong style={{ color: "#fff", fontWeight: 600 }}>host</strong>
                    <span style={{ color: "rgba(255,255,255,0.55)" }}>, </span>
                    <strong style={{ color: "#fff", fontWeight: 600 }}>designer</strong>
                    , and <strong style={{ color: "#fff", fontWeight: 600 }}>AI-agent shop</strong>{" "}
                    in one. What kind of site are you thinking about?
                  </motion.div>
                )}
              </AnimatePresence>

              <span style={{
                display: "block", fontSize: 10.5, color: FAINT, letterSpacing: "0.02em",
                marginTop: 6, paddingLeft: 4, minHeight: 14,
              }}>
                {showBubble ? "Just now" : ""}
              </span>
            </div>
          </div>

          {/* Chips */}
          <AnimatePresence>
            {showChips && (
              <motion.div
                key="chips"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                style={{
                  display: "flex", flexWrap: "wrap", gap: 8,
                  paddingLeft: "clamp(40px, 5vw, 52px)", paddingTop: 4,
                }}
              >
                <span style={{
                  fontSize: 10.5, fontWeight: 500, letterSpacing: "0.18em",
                  textTransform: "uppercase", color: FAINT, width: "100%", marginBottom: 2,
                }}>Suggested</span>
                {SUGGESTIONS.map((s, i) => {
                  const on = hover === i;
                  return (
                    <motion.button
                      key={s} type="button"
                      onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.06 * i, ease: EASE }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        cursor: "pointer", fontFamily: "inherit", fontSize: 13.5, fontWeight: 500,
                        letterSpacing: "-0.005em",
                        color: on ? "#fff" : PURPLE,
                        background: on ? PURPLE : "transparent",
                        border: `1px solid ${on ? PURPLE : PURPLE_BORDER}`,
                        padding: "9px 14px", borderRadius: 999,
                        transition: "background 180ms ease, color 180ms ease, border-color 180ms ease",
                      }}
                    >
                      {s}
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Composer */}
        <AnimatePresence>
          {showInput && (
            <motion.form
              key="composer"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              onSubmit={(e) => e.preventDefault()}
              style={{
                marginTop: "clamp(8px, 1.6vh, 20px)",
                display: "flex", alignItems: "center", gap: 10,
                background: "#fff", border: `1px solid ${GREY}`,
                borderRadius: 999, padding: "8px 8px 8px 20px",
                boxShadow: "0 1px 0 rgba(255,255,255,0.6) inset, 0 10px 30px -18px rgba(26,26,46,0.18)",
              }}
            >
              <span aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", background: PURPLE, opacity: 0.55, flexShrink: 0 }} />
              <input
                type="text" placeholder="Type a reply…" aria-label="Reply to Kit"
                style={{
                  flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent",
                  fontFamily: "inherit", fontSize: 15, letterSpacing: "-0.005em",
                  color: SURFACE, padding: "10px 0",
                }}
              />
              <motion.button
                type="submit" aria-label="Send"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.94 }}
                style={{
                  cursor: "pointer", width: 40, height: 40, borderRadius: "50%",
                  background: PURPLE, border: "none", flexShrink: 0,
                  display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff",
                  boxShadow: "0 6px 14px -6px rgba(107,78,230,0.55), 0 1px 0 rgba(255,255,255,0.25) inset",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M2.5 8h10M8 3.5L12.5 8 8 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Footnote */}
        <AnimatePresence>
          {showInput && (
            <motion.div
              key="footnote"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                fontSize: 11, color: FAINT, letterSpacing: "0.04em", marginTop: -6,
              }}
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                <rect x="2.5" y="5.5" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
                <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" stroke="currentColor" strokeWidth="1" />
              </svg>
              <span>Conversations stay with KPT. No data shared with third parties.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes kpt-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(0,200,150,0.55); }
          70%  { box-shadow: 0 0 0 10px rgba(0,200,150,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,200,150,0); }
        }
        @media (max-width: 540px) { .conv-shell { gap: 18px !important; } }
      `}</style>
    </section>
  );
}
