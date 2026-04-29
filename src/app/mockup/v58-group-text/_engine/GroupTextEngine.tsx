"use client";

/**
 * GroupTextEngine — V58 Group Text
 *
 * GC dispatch as a working iMessage thread. Hover on a photo bubble lifts +
 * brightens it; focusing the composer reveals a "typing…" indicator and
 * shows the next dispatch staged. Reduced-motion drops the cascade and
 * holds the thread static.
 */

import { useState, useEffect } from "react";

type MsgKind = "dispatch" | "reply" | "photo" | "voice" | "system";
type Msg = {
  id: string;
  who: string;
  side: "in" | "out";
  kind: MsgKind;
  body?: string;
  caption?: string;
  duration?: string;
  swatch?: string;
  time: string;
};

const THREAD: Msg[] = [
  { id: "s1", who: "", side: "in", kind: "system", body: "MORNING DISPATCH · WED 6:42 AM · 4 SUBS · 1 OWNER", time: "" },
  { id: "m1", who: "Marco (GC)", side: "out", kind: "dispatch", body: "Framers in at 7. Masonry at 9. Dry-in by Friday — that's the whole week.", time: "6:42 AM" },
  { id: "m2", who: "Dre — Framing Lead", side: "in", kind: "reply", body: "Crew of four rolling. We pulled the deck yesterday so we're ahead.", time: "6:44 AM" },
  { id: "m3", who: "Dre — Framing Lead", side: "in", kind: "photo", caption: "South wall racked. Plumb to 1/16. Crowns up.", swatch: "linear-gradient(135deg,#C9B999 0%,#8C7A5E 60%,#3E332A 100%)", time: "6:45 AM" },
  { id: "m4", who: "Marco (GC)", side: "out", kind: "reply", body: "Read. Tell Sam to crown the long joist before the deck — last time we paid for it on tile.", time: "6:46 AM" },
  { id: "m5", who: "Lenny — Mason", side: "in", kind: "reply", body: "9 AM is fine. Ordered another pallet of Type S because the chimney's bigger than the print.", time: "7:11 AM" },
  { id: "m6", who: "Lenny — Mason", side: "in", kind: "voice", duration: "0:42", caption: "RE: chimney flashing — wants a counter-flash, not a step.", time: "7:12 AM" },
  { id: "m7", who: "Marco (GC)", side: "out", kind: "dispatch", body: "RFI logged — counter-flash spec'd. I'll loop the roofer on Thursday's thread.", time: "7:14 AM" },
  { id: "m8", who: "Owner — D. Patel", side: "in", kind: "reply", body: "Reading along. Friday dry-in still good?", time: "7:18 AM" },
  { id: "m9", who: "Marco (GC)", side: "out", kind: "reply", body: "Still good. We'll send a Friday 4 PM walk-through photo set.", time: "7:18 AM" },
  { id: "m10", who: "", side: "in", kind: "system", body: "PUNCH-OUT QUEUE · 3 ITEMS · OWNER + 2 SUBS LIVE", time: "" },
];

const ATTACHMENTS = [
  { name: "Framing — south wall", swatch: "linear-gradient(135deg,#C9B999,#3E332A)", note: "Plumb to 1/16. Crowns up." },
  { name: "Foundation — cure log", swatch: "linear-gradient(135deg,#8E8B83,#3A3936)", note: "28-day. 4,200 PSI break." },
  { name: "Roof — dry-in tarp", swatch: "linear-gradient(135deg,#1F2A33,#0E1418)", note: "Friday EOD. Counter-flash on chimney." },
  { name: "Site — boot-scrape", swatch: "linear-gradient(135deg,#7C5A3A,#3D2A19)", note: "Mud color of the soil." },
];

const VOICE_MEMOS = [
  { who: "Lenny — Mason", duration: "0:42", title: "Chimney counter-flash request", transcript: "Hey Marco — Lenny. Chimney came in two courses taller than the print. I want a counter-flash, not step. Step on this much exposure won't hold. Send the roofer my way." },
  { who: "Sam — Framing", duration: "0:31", title: "Joist crown direction", transcript: "Three of the LVLs in the bundle are crowned hard. We're flipping them so crown's up. Tile guys will thank us." },
  { who: "D. Patel — Owner", duration: "1:08", title: "Change order — pantry millwork", transcript: "Looked at the plan again. We want the pantry deeper by twelve inches and a pull-out for the small appliance counter. Whatever that costs, log it as a CO." },
];

const STATS = [
  { k: "Active threads", v: "11" },
  { k: "Subs on speed dial", v: "12" },
  { k: "RFIs answered today", v: "7" },
  { k: "Punch items closed (week)", v: "23" },
];

export default function GroupTextEngine() {
  const [revealed, setRevealed] = useState<number>(0);
  const [hover, setHover] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const [composer, setComposer] = useState("");
  const [openMemo, setOpenMemo] = useState<number | null>(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (reduced) {
      setRevealed(THREAD.length);
      return;
    }
    if (revealed >= THREAD.length) return;
    const t = setTimeout(() => setRevealed((r) => r + 1), 380 + Math.random() * 220);
    return () => clearTimeout(t);
  }, [revealed, reduced]);

  return (
    <>
      <style>{css}</style>
      <div className="gt-shell">
        {/* TOP BAR */}
        <header className="gt-top">
          <div className="gt-status">
            <span className="gt-dot" /> 9:41 <span className="gt-bars" aria-hidden>•••••</span> 5G <span className="gt-batt">87%</span>
          </div>
          <div className="gt-thread-head">
            <div className="gt-avatars" aria-hidden>
              <span className="gt-av" style={{ background: "#FF8A4C" }}>M</span>
              <span className="gt-av" style={{ background: "#0A84FF" }}>D</span>
              <span className="gt-av" style={{ background: "#30D158" }}>L</span>
              <span className="gt-av" style={{ background: "#FFD60A", color: "#000" }}>P</span>
            </div>
            <div className="gt-thread-name">PATEL ADDITION · DRY-IN WEEK</div>
            <div className="gt-thread-meta">5 people · iMessage</div>
          </div>
          <button className="gt-info" type="button" aria-label="Thread info">i</button>
        </header>

        {/* THREAD */}
        <section className="gt-thread" aria-label="Active group thread">
          {THREAD.slice(0, revealed).map((m) => (
            <Bubble
              key={m.id}
              msg={m}
              hover={hover === m.id}
              onHover={(v) => setHover(v ? m.id : null)}
            />
          ))}

          {focused && composer.length === 0 && (
            <div className="gt-typing" aria-live="polite">
              <span /><span /><span />
              <em>You — typing…</em>
            </div>
          )}
        </section>

        {/* COMPOSER */}
        <div className="gt-composer">
          <button className="gt-plus" type="button" aria-label="Attach">+</button>
          <input
            className="gt-input"
            type="text"
            placeholder="Message — Patel Addition"
            value={composer}
            onChange={(e) => setComposer(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-label="Compose message"
          />
          <button className="gt-send" type="button" aria-label="Send">↑</button>
        </div>

        {/* HEADLINE BLOCK */}
        <section className="gt-hero" id="thread">
          <div className="gt-eyebrow">PATEL ADDITION · WED 6:42 AM</div>
          <h1 className="gt-headline">
            Framers in at 7. <br />
            Masonry at 9. <br />
            <span className="gt-headline-em">Dry-in by Friday.</span>
          </h1>
          <p className="gt-sub">
            General contracting where the group text <em>is</em> the schedule —
            we run the thread, you read the thread, the job ships clean.
          </p>
          <div className="gt-cta-row">
            <a className="gt-cta gt-cta-primary" href="#thread">Open the thread</a>
            <a className="gt-cta" href="#dispatches">See the dispatches</a>
          </div>

          <dl className="gt-stats">
            {STATS.map((s) => (
              <div key={s.k} className="gt-stat">
                <dt>{s.k}</dt>
                <dd>{s.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* PHOTO ATTACHMENTS */}
        <section className="gt-attachments" id="dispatches" aria-labelledby="att-title">
          <h2 id="att-title" className="gt-h2">Photo attachments</h2>
          <p className="gt-section-sub">
            Inline jobsite photos as portfolio. Hover to expand a card; the
            crew shoots the photo, the thread is the gallery.
          </p>
          <div className="gt-att-grid">
            {ATTACHMENTS.map((a) => (
              <button
                key={a.name}
                type="button"
                className="gt-att-card"
                style={{ ["--swatch" as string]: a.swatch }}
              >
                <span className="gt-att-swatch" aria-hidden />
                <span className="gt-att-name">{a.name}</span>
                <span className="gt-att-note">{a.note}</span>
              </button>
            ))}
          </div>
        </section>

        {/* VOICE MEMOS */}
        <section className="gt-voice" aria-labelledby="voice-title">
          <h2 id="voice-title" className="gt-h2">Voice memos · change orders</h2>
          <p className="gt-section-sub">
            The phone-call moments still go in the thread. Tap a memo to read
            the transcript — every CO leaves a paper trail.
          </p>
          <ul className="gt-memos" role="list">
            {VOICE_MEMOS.map((v, i) => (
              <li key={v.title} className={`gt-memo${openMemo === i ? " is-open" : ""}`}>
                <button
                  type="button"
                  className="gt-memo-head"
                  aria-expanded={openMemo === i}
                  onClick={() => setOpenMemo(openMemo === i ? null : i)}
                >
                  <span className="gt-memo-play" aria-hidden>▶</span>
                  <span className="gt-memo-meta">
                    <span className="gt-memo-who">{v.who}</span>
                    <span className="gt-memo-title">{v.title}</span>
                  </span>
                  <span className="gt-memo-wave" aria-hidden>
                    {Array.from({ length: 28 }).map((_, k) => (
                      <span key={k} style={{ height: 4 + ((k * 13) % 22) }} />
                    ))}
                  </span>
                  <span className="gt-memo-dur">{v.duration}</span>
                </button>
                <div className="gt-memo-body">
                  <span className="gt-memo-trans-label">TRANSCRIPT</span>
                  <p>{v.transcript}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* FOOTER */}
        <footer className="gt-foot">
          <div className="gt-foot-left">
            <span className="gt-foot-mark">[Marco GC, LLC]</span>
            <span>AIA Member · MA HIC #178204 · CSL #098221</span>
          </div>
          <div className="gt-foot-right">
            <span>Tagged in 11 active threads</span>
            <span>Last dispatch · 7:18 AM</span>
          </div>
        </footer>
      </div>
    </>
  );
}

function Bubble({ msg, hover, onHover }: { msg: Msg; hover: boolean; onHover: (v: boolean) => void }) {
  if (msg.kind === "system") {
    return (
      <div className="gt-sys">{msg.body}</div>
    );
  }
  const isOut = msg.side === "out";
  return (
    <div className={`gt-row ${isOut ? "gt-row-out" : "gt-row-in"}`}>
      {!isOut && <div className="gt-who">{msg.who}</div>}
      <div
        className={`gt-bubble gt-bubble-${msg.kind} ${isOut ? "gt-bubble-out" : "gt-bubble-in"}${hover ? " is-hover" : ""}`}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        onFocus={() => onHover(true)}
        onBlur={() => onHover(false)}
        tabIndex={msg.kind === "photo" || msg.kind === "voice" ? 0 : -1}
        role={msg.kind === "photo" || msg.kind === "voice" ? "button" : undefined}
      >
        {msg.kind === "photo" && (
          <>
            <span className="gt-photo" style={{ background: msg.swatch }} aria-hidden />
            <span className="gt-photo-cap">{msg.caption}</span>
          </>
        )}
        {msg.kind === "voice" && (
          <span className="gt-vm">
            <span className="gt-vm-play" aria-hidden>▶</span>
            <span className="gt-vm-wave" aria-hidden>
              {Array.from({ length: 22 }).map((_, k) => (
                <span key={k} style={{ height: 3 + ((k * 17) % 16) }} />
              ))}
            </span>
            <span className="gt-vm-dur">{msg.duration}</span>
            <span className="gt-vm-cap">{msg.caption}</span>
          </span>
        )}
        {(msg.kind === "dispatch" || msg.kind === "reply") && msg.body}
      </div>
      {msg.time && <div className="gt-time">{msg.time}</div>}
    </div>
  );
}

const css = `
  .gt-shell {
    --bg: #F2F2F7;
    --paper: #FFFFFF;
    --gray: #E5E5EA;
    --gray-2: #C8C7CC;
    --ink: #0B0B10;
    --muted: #6E6E73;
    --imsg: #007AFF;
    --green: #34C759;
    --red: #FF453A;
    --amber: #FF9F0A;
    --line: rgba(11,11,16,0.08);
    background: var(--bg);
    color: var(--ink);
    font-family: -apple-system, "SF Pro Text", "SF Pro", system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
    font-size: 15px;
    line-height: 1.4;
    min-height: 100vh;
    padding: clamp(16px, 3vw, 28px);
    box-sizing: border-box;
  }

  .gt-top {
    position: sticky;
    top: 0;
    background: rgba(248,248,250,0.92);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--line);
    border-radius: 14px 14px 0 0;
    padding: 8px 14px 12px;
    z-index: 5;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 6px;
    align-items: center;
  }
  .gt-status {
    grid-column: 1 / -1;
    font-size: 11px;
    font-weight: 600;
    color: var(--muted);
    display: flex;
    gap: 8px;
    align-items: center;
    letter-spacing: 0.04em;
  }
  .gt-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); display: inline-block; }
  .gt-bars { letter-spacing: -2px; }
  .gt-batt { margin-left: auto; }

  .gt-thread-head { display: flex; flex-direction: column; align-items: center; }
  .gt-avatars { display: flex; gap: -4px; margin-bottom: 4px; }
  .gt-av {
    width: 28px; height: 28px;
    border-radius: 50%;
    color: #fff;
    font-weight: 600;
    font-size: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--paper);
    margin-left: -8px;
  }
  .gt-av:first-child { margin-left: 0; }
  .gt-thread-name { font-weight: 600; font-size: 14px; letter-spacing: -0.01em; }
  .gt-thread-meta { color: var(--muted); font-size: 11px; }

  .gt-info {
    width: 28px; height: 28px;
    border-radius: 50%;
    border: 1.5px solid var(--imsg);
    color: var(--imsg);
    background: transparent;
    font-style: italic;
    font-weight: 600;
    cursor: pointer;
    justify-self: end;
  }

  .gt-thread {
    background: var(--paper);
    padding: 12px 14px 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-height: 48vh;
  }

  .gt-sys {
    align-self: center;
    text-align: center;
    color: var(--muted);
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin: 14px 0 6px;
  }

  .gt-row { display: flex; flex-direction: column; gap: 2px; }
  .gt-row-out { align-items: flex-end; }
  .gt-row-in { align-items: flex-start; }

  .gt-who {
    font-size: 11px;
    color: var(--muted);
    padding: 0 12px;
    margin-top: 4px;
  }
  .gt-time {
    font-size: 10px;
    color: var(--muted);
    padding: 0 12px;
    letter-spacing: 0.04em;
  }

  .gt-bubble {
    max-width: 72%;
    padding: 8px 12px;
    border-radius: 18px;
    font-size: 14px;
    line-height: 1.32;
    animation: gt-thump 280ms cubic-bezier(0.2, 0.9, 0.3, 1.4) both;
    transform-origin: 50% 100%;
    transition: transform 180ms ease, box-shadow 180ms ease;
  }
  @keyframes gt-thump {
    0% { transform: translateY(8px) scale(0.9); opacity: 0; }
    70% { transform: translateY(-1px) scale(1.02); opacity: 1; }
    100% { transform: translateY(0) scale(1); opacity: 1; }
  }
  @media (prefers-reduced-motion: reduce) {
    .gt-bubble { animation: none; }
  }
  .gt-bubble-in { background: var(--gray); color: var(--ink); border-bottom-left-radius: 4px; }
  .gt-bubble-out { background: var(--imsg); color: #fff; border-bottom-right-radius: 4px; }

  .gt-bubble-photo, .gt-bubble-voice {
    padding: 4px;
    cursor: pointer;
  }
  .gt-bubble-photo { background: transparent; }
  .gt-photo {
    display: block;
    width: 280px;
    height: 200px;
    border-radius: 14px;
    background: linear-gradient(135deg,#999,#333);
    box-shadow: 0 1px 0 rgba(0,0,0,0.04), inset 0 0 0 1px rgba(255,255,255,0.12);
  }
  .gt-photo-cap {
    display: block;
    background: var(--gray);
    color: var(--ink);
    padding: 6px 10px;
    border-radius: 0 0 12px 12px;
    font-size: 12px;
    margin-top: -4px;
  }
  .gt-bubble-photo.is-hover { transform: translateY(-3px) scale(1.015); box-shadow: 0 18px 32px rgba(11,11,16,0.18); }
  .gt-bubble-photo:focus-visible { outline: 3px solid var(--imsg); outline-offset: 2px; }

  .gt-bubble-voice {
    background: var(--gray);
    border-radius: 18px;
    padding: 8px 12px;
  }
  .gt-vm { display: inline-flex; align-items: center; gap: 8px; }
  .gt-vm-play { color: var(--red); font-size: 14px; }
  .gt-vm-wave { display: inline-flex; gap: 2px; align-items: center; }
  .gt-vm-wave > span { width: 2px; background: var(--red); border-radius: 2px; }
  .gt-vm-dur { color: var(--muted); font-size: 11px; font-variant-numeric: tabular-nums; }
  .gt-vm-cap { color: var(--ink); font-size: 13px; margin-left: 4px; }
  .gt-bubble-voice.is-hover { transform: translateY(-2px); box-shadow: 0 8px 18px rgba(255,69,58,0.16); }
  .gt-bubble-voice:focus-visible { outline: 3px solid var(--red); outline-offset: 2px; }

  .gt-typing {
    align-self: flex-end;
    background: var(--gray);
    padding: 8px 14px;
    border-radius: 18px;
    border-bottom-right-radius: 4px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--muted);
  }
  .gt-typing span {
    width: 6px; height: 6px; border-radius: 50%; background: var(--muted);
    animation: gt-pulse 1.1s infinite ease-in-out;
  }
  .gt-typing span:nth-child(2) { animation-delay: 0.18s; }
  .gt-typing span:nth-child(3) { animation-delay: 0.36s; }
  .gt-typing em { font-style: normal; }
  @keyframes gt-pulse {
    0%, 100% { opacity: 0.3; transform: scale(0.85); }
    50% { opacity: 1; transform: scale(1); }
  }
  @media (prefers-reduced-motion: reduce) {
    .gt-typing span { animation: none; opacity: 0.6; }
  }

  .gt-composer {
    background: var(--paper);
    border-top: 1px solid var(--line);
    padding: 10px 12px 14px;
    display: flex;
    gap: 8px;
    align-items: center;
    border-radius: 0 0 14px 14px;
    margin-bottom: 28px;
  }
  .gt-plus, .gt-send {
    width: 30px; height: 30px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    font-weight: 600;
  }
  .gt-plus { background: var(--gray); color: var(--ink); }
  .gt-send { background: var(--imsg); color: #fff; }
  .gt-input {
    flex: 1;
    border: 1px solid var(--gray-2);
    background: var(--paper);
    color: var(--ink);
    padding: 8px 14px;
    border-radius: 18px;
    font-size: 14px;
    font-family: inherit;
    outline: none;
    transition: border-color 160ms ease;
  }
  .gt-input:focus { border-color: var(--imsg); box-shadow: 0 0 0 3px rgba(0,122,255,0.18); }

  .gt-hero {
    padding: 48px clamp(8px, 2vw, 24px);
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    background: var(--paper);
    border-radius: 14px;
    margin-bottom: 28px;
  }
  .gt-eyebrow {
    font-size: 11px;
    letter-spacing: 0.18em;
    color: var(--imsg);
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 18px;
  }
  .gt-headline {
    font-family: "SF Pro Display", -apple-system, system-ui, sans-serif;
    font-weight: 700;
    font-size: clamp(36px, 6.4vw, 84px);
    line-height: 1.02;
    letter-spacing: -0.035em;
    margin: 0 0 22px;
    color: var(--ink);
  }
  .gt-headline-em { color: var(--imsg); }

  .gt-sub {
    font-size: 17px;
    line-height: 1.5;
    color: #2C2C2E;
    max-width: 60ch;
    margin: 0 0 28px;
  }
  .gt-sub em { font-style: italic; color: var(--imsg); }

  .gt-cta-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 32px; }
  .gt-cta {
    display: inline-block;
    padding: 12px 22px;
    border-radius: 22px;
    background: var(--gray);
    color: var(--ink);
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    transition: transform 140ms ease, background 140ms ease;
  }
  .gt-cta:hover, .gt-cta:focus-visible { transform: translateY(-1px); background: var(--gray-2); outline: none; }
  .gt-cta-primary { background: var(--imsg); color: #fff; }
  .gt-cta-primary:hover, .gt-cta-primary:focus-visible { background: #0064D8; }
  .gt-cta:focus-visible { outline: 3px solid var(--imsg); outline-offset: 3px; }

  .gt-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1px;
    margin: 0;
    border: 1px solid var(--line);
    background: var(--line);
    border-radius: 10px;
    overflow: hidden;
  }
  .gt-stat {
    background: var(--paper);
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .gt-stat dt {
    font-size: 11px;
    letter-spacing: 0.12em;
    color: var(--muted);
    text-transform: uppercase;
  }
  .gt-stat dd {
    font-size: 28px;
    font-weight: 700;
    color: var(--ink);
    margin: 0;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;
  }

  .gt-attachments, .gt-voice {
    background: var(--paper);
    padding: 36px clamp(8px, 2vw, 24px);
    border-radius: 14px;
    margin-bottom: 28px;
    border: 1px solid var(--line);
  }
  .gt-h2 {
    font-family: "SF Pro Display", -apple-system, system-ui, sans-serif;
    font-size: clamp(22px, 3vw, 32px);
    font-weight: 700;
    margin: 0 0 6px;
    letter-spacing: -0.02em;
  }
  .gt-section-sub {
    color: var(--muted);
    margin: 0 0 24px;
    max-width: 56ch;
    font-size: 14px;
  }

  .gt-att-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 14px;
  }
  .gt-att-card {
    --swatch: linear-gradient(135deg,#888,#333);
    background: var(--paper);
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 4px;
    text-align: left;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font: inherit;
    color: inherit;
    transition: transform 200ms ease, box-shadow 200ms ease;
  }
  .gt-att-swatch {
    display: block;
    background: var(--swatch);
    aspect-ratio: 4 / 3;
    border-radius: 10px;
  }
  .gt-att-name { padding: 0 10px; font-weight: 600; font-size: 14px; }
  .gt-att-note { padding: 0 10px 12px; color: var(--muted); font-size: 12px; }
  .gt-att-card:hover, .gt-att-card:focus-visible {
    transform: translateY(-4px) scale(1.012);
    box-shadow: 0 24px 40px rgba(11,11,16,0.14);
    outline: none;
  }
  .gt-att-card:focus-visible { box-shadow: 0 0 0 3px var(--imsg), 0 24px 40px rgba(11,11,16,0.14); }

  .gt-memos { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
  .gt-memo {
    border: 1px solid var(--line);
    border-radius: 14px;
    overflow: hidden;
    background: var(--paper);
  }
  .gt-memo-head {
    width: 100%;
    background: var(--gray);
    border: none;
    padding: 12px 14px;
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    gap: 12px;
    align-items: center;
    cursor: pointer;
    font: inherit;
    color: inherit;
    text-align: left;
    transition: background 140ms ease;
  }
  .gt-memo-head:hover, .gt-memo-head:focus-visible { background: #DCDCE0; outline: none; }
  .gt-memo-head:focus-visible { box-shadow: inset 0 0 0 2px var(--red); }
  .gt-memo-play { color: var(--red); font-size: 16px; }
  .gt-memo-meta { display: flex; flex-direction: column; gap: 2px; }
  .gt-memo-who { font-size: 12px; color: var(--muted); }
  .gt-memo-title { font-weight: 600; font-size: 14px; }
  .gt-memo-wave { display: inline-flex; gap: 2px; align-items: center; }
  .gt-memo-wave > span { width: 2px; background: var(--red); border-radius: 2px; opacity: 0.85; }
  .gt-memo-dur { font-size: 12px; color: var(--muted); font-variant-numeric: tabular-nums; }

  .gt-memo-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 320ms ease, padding 320ms ease;
    padding: 0 14px;
  }
  .gt-memo.is-open .gt-memo-body {
    max-height: 320px;
    padding: 14px;
  }
  .gt-memo-trans-label {
    font-size: 10px;
    letter-spacing: 0.16em;
    color: var(--muted);
    display: block;
    margin-bottom: 6px;
  }
  .gt-memo-body p { margin: 0; font-size: 14px; line-height: 1.5; color: #2C2C2E; }
  @media (prefers-reduced-motion: reduce) {
    .gt-memo-body { transition: none; }
  }

  .gt-foot {
    background: var(--paper);
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 22px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    font-size: 12px;
    color: var(--muted);
    letter-spacing: 0.04em;
  }
  .gt-foot-mark { font-weight: 700; color: var(--ink); margin-right: 12px; letter-spacing: 0.06em; }
  .gt-foot-left, .gt-foot-right { display: flex; gap: 12px; flex-wrap: wrap; }
  .gt-foot-right { color: var(--imsg); }
`;
