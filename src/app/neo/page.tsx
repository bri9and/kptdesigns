"use client";

import { useState, useRef } from "react";

export default function NeoPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
        src="/"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          border: "none",
        }}
        title="KPT Designs"
      />
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0A0A0A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 360 }}>
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#FF8000",
            letterSpacing: 2,
            marginBottom: 8,
          }}
        >
          KPT
        </div>
        <div
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.4)",
            marginBottom: 40,
          }}
        >
          Enter password to continue
        </div>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            style={{
              width: "100%",
              padding: "14px 16px",
              background: "#1A1A1A",
              border: error
                ? "1px solid rgba(255,0,0,0.5)"
                : "1px solid rgba(255,128,0,0.2)",
              borderRadius: 8,
              color: "#fff",
              fontSize: 16,
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              outline: "none",
              caretColor: "#FF8000",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px 0",
              background: "#FF8000",
              border: "none",
              borderRadius: 8,
              color: "#0A0A0A",
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              cursor: "pointer",
              letterSpacing: 1,
            }}
          >
            Continue
          </button>
        </form>
        {error && (
          <div
            style={{
              marginTop: 16,
              color: "rgba(255,0,0,0.7)",
              fontSize: 13,
            }}
          >
            Incorrect password
          </div>
        )}
      </div>
    </div>
  );
}
