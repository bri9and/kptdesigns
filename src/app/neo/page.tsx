"use client";

import { useState, useRef, useEffect } from "react";

export default function NeoPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [typing, setTyping] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Boot sequence typing effect
  useEffect(() => {
    const lines = [
      "> SYSTEM BREACH DETECTED...",
      "> INITIATING SECURITY PROTOCOL...",
      "> AUTHENTICATION REQUIRED",
    ];
    let lineIdx = 0;
    let charIdx = 0;
    let current = "";

    const interval = setInterval(() => {
      if (lineIdx >= lines.length) {
        clearInterval(interval);
        inputRef.current?.focus();
        return;
      }
      if (charIdx <= lines[lineIdx].length) {
        current =
          lines.slice(0, lineIdx).join("\n") +
          "\n" +
          lines[lineIdx].substring(0, charIdx);
        setTyping(current.trim());
        charIdx++;
      } else {
        lineIdx++;
        charIdx = 0;
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === "THEone") {
      setUnlocked(true);
    } else {
      setError(true);
      setPassword("");
      setTimeout(() => setError(false), 1500);
    }
  }

  if (unlocked) {
    return (
      <iframe
        src="/neo.html"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          border: "none",
          margin: 0,
          padding: 0,
        }}
        title="Neo"
      />
    );
  }

  return (
    <div style={styles.container}>
      <canvas id="rain-bg" style={styles.canvas} />
      <RainEffect />
      <div style={styles.crt} />
      <div style={styles.gate}>
        <pre style={styles.bootText}>{typing}</pre>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            <span style={styles.prompt}>&gt; password:</span>
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                ...styles.input,
                ...(error ? styles.inputError : {}),
              }}
              placeholder="••••••••"
              autoFocus
            />
          </label>
          <button type="submit" style={styles.btn}>
            [ ACCESS ]
          </button>
        </form>
        {error && (
          <div style={styles.error}>
            &gt; ACCESS DENIED — INVALID CREDENTIALS
          </div>
        )}
      </div>
    </div>
  );
}

function RainEffect() {
  useEffect(() => {
    const canvas = document.getElementById("rain-bg") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const chars =
      "\u30A0\u30A1\u30A2\u30A3\u30A4\u30A5\u30A6\u30A7\u30A8\u30A9\u30AA\u30AB\u30AC\u30AD\u30AE\u30AFABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(0).map(() => Math.random() * -100);

    function draw() {
      ctx!.fillStyle = "rgba(0, 2, 8, 0.06)";
      ctx!.fillRect(0, 0, canvas.width, canvas.height);
      ctx!.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (Math.random() > 0.3) continue; // sparse rain
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const brightness = Math.random();
        if (brightness > 0.9) {
          ctx!.fillStyle = "#00FF41";
          ctx!.shadowColor = "#00FF41";
          ctx!.shadowBlur = 10;
        } else {
          ctx!.fillStyle = "#003B00";
          ctx!.shadowBlur = 0;
        }

        ctx!.fillText(char, x, y);
        ctx!.shadowBlur = 0;

        if (y > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
      }
    }

    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return null;
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: "fixed",
    inset: 0,
    background: "#0D0208",
    fontFamily: "'Courier New', monospace",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  canvas: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  crt: {
    position: "absolute",
    inset: 0,
    zIndex: 1,
    pointerEvents: "none",
    background:
      "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)",
  },
  gate: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    padding: "40px",
  },
  bootText: {
    color: "#008F11",
    fontSize: "14px",
    lineHeight: "1.8",
    marginBottom: "40px",
    textAlign: "left",
    textShadow: "0 0 5px rgba(0,255,65,0.3)",
    minHeight: "80px",
    whiteSpace: "pre-wrap",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    border: "1px solid rgba(0,255,65,0.2)",
    background: "rgba(0,0,0,0.8)",
    padding: "4px 16px",
  },
  prompt: {
    color: "#008F11",
    fontSize: "14px",
    whiteSpace: "nowrap",
    textShadow: "0 0 5px rgba(0,255,65,0.3)",
  },
  input: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#00FF41",
    fontSize: "16px",
    fontFamily: "'Courier New', monospace",
    padding: "12px 0",
    width: "200px",
    caretColor: "#00FF41",
    textShadow: "0 0 8px rgba(0,255,65,0.4)",
  },
  inputError: {
    color: "#FF0000",
    textShadow: "0 0 8px rgba(255,0,0,0.4)",
  },
  btn: {
    background: "transparent",
    border: "1px solid #00FF41",
    color: "#00FF41",
    fontFamily: "'Courier New', monospace",
    fontSize: "14px",
    padding: "12px 32px",
    cursor: "pointer",
    letterSpacing: "3px",
    textShadow: "0 0 5px rgba(0,255,65,0.4)",
    transition: "all 0.3s",
  },
  error: {
    marginTop: "20px",
    color: "#FF0000",
    fontSize: "13px",
    textShadow: "0 0 8px rgba(255,0,0,0.5)",
    animation: "none",
  },
};
