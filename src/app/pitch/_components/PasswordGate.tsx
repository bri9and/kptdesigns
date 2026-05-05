"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { palette, fonts } from "@/app/sites/lake-arthur/_lib/tokens";

const PITCH_PASSWORD = "kpt2026";
const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 60;

export function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [shake, setShake] = useState(false);
  const [lockUntil, setLockUntil] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Tick once a second when locked out so the countdown updates.
  useEffect(() => {
    if (lockUntil === null) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [lockUntil]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const remaining = lockUntil ? Math.max(0, Math.ceil((lockUntil - now) / 1000)) : 0;
  const locked = remaining > 0;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (locked) return;
    if (value === PITCH_PASSWORD) {
      try { localStorage.setItem("kpt:pitch:unlocked", "1"); } catch { /* ignore */ }
      onUnlock();
      return;
    }
    const next = attempts + 1;
    setAttempts(next);
    setShake(true);
    setValue("");
    setTimeout(() => setShake(false), 380);
    if (next >= MAX_ATTEMPTS) {
      const until = Date.now() + LOCKOUT_SECONDS * 1000;
      setLockUntil(until);
      // when timer expires, release
      setTimeout(() => {
        setLockUntil(null);
        setAttempts(0);
      }, LOCKOUT_SECONDS * 1000 + 50);
    }
  }

  return (
    <motion.div
      className="pg-canvas"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="pg-card">
        <p className="pg-eyebrow">KPT Designs</p>
        <h1 className="pg-title"><em>Pitch Tool</em></h1>
        <p className="pg-sub">Internal · sales</p>

        <form onSubmit={onSubmit} className="pg-form" noValidate>
          <label className="pg-field">
            <span>Password</span>
            <input
              ref={inputRef}
              type="password"
              autoComplete="off"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={locked}
              className={shake ? "is-shake" : ""}
              aria-invalid={attempts > 0 && !locked ? "true" : undefined}
              aria-describedby="pg-msg"
            />
          </label>

          <button type="submit" className="pg-cta" disabled={locked || value.length === 0}>
            Unlock →
          </button>

          <p id="pg-msg" className="pg-msg" role={locked ? "alert" : undefined}>
            {locked
              ? `Too many tries — wait ${remaining}s`
              : attempts > 0
              ? "Try again."
              : " "}
          </p>
        </form>
      </div>
      <style>{css}</style>
    </motion.div>
  );
}

const css = `
.pg-canvas { position: relative; min-height: 100vh; background: ${palette.charcoal}; color: ${palette.cream}; display: flex; align-items: center; justify-content: center; padding: 2rem; }
.pg-card { width: 100%; max-width: 420px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.4rem; }
.pg-eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.34em; text-transform: uppercase; opacity: 0.65; margin: 0; }
.pg-title { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(2.4rem, 5vw, 3.4rem); margin: 0.5rem 0 0.25rem; line-height: 1.05; }
.pg-title em { font-style: italic; color: ${palette.dawn}; }
.pg-sub { font-family: ${fonts.body}; font-size: 0.7rem; letter-spacing: 0.28em; text-transform: uppercase; opacity: 0.55; margin: 0 0 2.5rem; }
.pg-form { width: 100%; display: flex; flex-direction: column; gap: 1rem; }
.pg-field { display: flex; flex-direction: column; gap: 0.5rem; text-align: left; }
.pg-field span { font-family: ${fonts.body}; font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase; opacity: 0.65; }
.pg-field input { background: rgba(244,239,223,0.06); border: 1px solid rgba(244,239,223,0.18); color: ${palette.cream}; padding: 1rem 1.1rem; border-radius: 4px; font-family: ${fonts.body}; font-size: 1rem; letter-spacing: 0.08em; transition: border-color 180ms, box-shadow 180ms; }
.pg-field input:focus { outline: none; border-color: ${palette.dawn}; box-shadow: 0 0 0 2px rgba(201,169,110,0.25); }
.pg-field input:disabled { opacity: 0.5; cursor: not-allowed; }
.pg-field input.is-shake { animation: pg-shake 380ms cubic-bezier(0.36, 0.07, 0.19, 0.97); border-color: #c95a4e; }
.pg-cta { background: ${palette.dawn}; color: ${palette.charcoal}; border: none; padding: 1rem 1.5rem; border-radius: 999px; font-family: ${fonts.body}; font-size: 0.8rem; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; transition: transform 180ms, box-shadow 180ms, opacity 180ms; }
.pg-cta:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(201,169,110,0.35); }
.pg-cta:focus-visible { outline: 2px solid ${palette.cream}; outline-offset: 2px; }
.pg-cta:disabled { opacity: 0.45; cursor: not-allowed; }
.pg-msg { font-family: ${fonts.body}; font-size: 0.78rem; letter-spacing: 0.04em; opacity: 0.78; margin: 0.5rem 0 0; min-height: 1.2em; }
@keyframes pg-shake {
  10%, 90% { transform: translateX(-1px); }
  20%, 80% { transform: translateX(2px); }
  30%, 50%, 70% { transform: translateX(-4px); }
  40%, 60% { transform: translateX(4px); }
}
@media (prefers-reduced-motion: reduce) {
  .pg-field input.is-shake { animation: none; }
  .pg-cta { transition: none; }
  .pg-cta:hover { transform: none; }
}
`;
