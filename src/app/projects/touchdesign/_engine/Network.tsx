"use client";

/**
 * Network — the canvas. Pan/zoom, operator hit-testing, wire drawing,
 * keyboard shortcuts, and rAF loop for the live viewports.
 *
 * Architecture:
 *   ┌──────────────────────────────────────────────┐
 *   │ wrapper (100vw × 100vh, overflow hidden)     │
 *   │   <Toolbar/>                                 │ ← top
 *   │   <canvas-grid> (CSS background, fixed)      │
 *   │   <transform-layer> translate(panX,panY) scale(zoom)
 *   │     <svg wires/>                             │
 *   │     <Operator/> × N                          │
 *   │   <ParameterPanel/>                          │ ← right
 *   │   <Timeline/>                                │ ← bottom
 *   │   <StatusBar/>                               │ ← bottom-bottom
 *   │   <DeepView/> (overlay when open)            │
 *   └──────────────────────────────────────────────┘
 *
 * Pan: drag empty canvas, OR space+drag, OR middle-mouse.
 * Zoom: wheel; centers on cursor.
 *
 * IMPORTANT (from project notes): never call useTransform() inside child
 * components rendered via .map — it crashed Turbopack prod minification.
 * We use direct refs + rAF for all per-tick styling instead.
 */

import {
  useCallback, useEffect, useMemo, useRef, useState,
} from "react";
import { JetBrains_Mono, Inter } from "next/font/google";
import { useReducedMotion } from "framer-motion";

import {
  CANVAS_BG, CANVAS_BG_2, CANVAS_GRID,
  ZOOM_MAX, ZOOM_MIN, GRID, OP_TYPE_ORDER, type OpType,
} from "./palette";
import { OPERATORS, opMap } from "./operators";
import { WIRES } from "./wires";

import Operator, { portPosition } from "../_components/Operator";
import Wire from "../_components/Wire";
import ParameterPanel from "../_components/ParameterPanel";
import Toolbar from "../_components/Toolbar";
import Timeline from "../_components/Timeline";
import StatusBar from "../_components/StatusBar";
import DeepView from "../_components/DeepView";

/* ----- fonts ----- */

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--td-mono",
});
const display = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--td-display",
});

/* ----- constants ----- */

const WIRE_TYPE = (id: string): OpType => opMap.get(id)?.type ?? "DAT";

/* ----- mobile fallback ----- */

function MobileFallback() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <div
      className={`${mono.variable} ${display.variable}`}
      style={{
        background: CANVAS_BG, color: "#e8e8e8", minHeight: "100vh",
        fontFamily: "var(--td-display), system-ui, sans-serif",
      }}
    >
      <header
        style={{
          position: "sticky", top: 0, zIndex: 50,
          padding: "12px 16px",
          background: "rgba(20,20,20,0.96)",
          borderBottom: "1px solid #2a2a2a",
          fontFamily: "var(--td-mono), monospace",
          fontSize: 10, letterSpacing: 2, color: "#FFB000",
          display: "flex", justifyContent: "space-between",
        }}
      >
        <span>KPT_WEB · NETWORK</span>
        <span style={{ color: "#666" }}>BUILD 47</span>
      </header>
      <main style={{ padding: "16px 12px 60px" }}>
        <div
          style={{
            fontFamily: "var(--td-mono), monospace",
            fontSize: 10, color: "#666", letterSpacing: 1.4,
            marginBottom: 14,
          }}
        >
          {"// tap an operator to expand — mobile-friendly stack view of the network"}
        </div>
        {OPERATORS.map((op) => {
          const open = openId === op.id;
          return (
            <button
              key={op.id}
              onClick={() => setOpenId(open ? null : op.id)}
              style={{
                width: "100%", textAlign: "left",
                background: "#161616",
                border: `1px solid ${open ? "#FFD700" : "#2a2a2a"}`,
                borderRadius: 6,
                padding: 12,
                marginBottom: 10,
                color: "#e8e8e8",
                fontFamily: "var(--td-display), system-ui, sans-serif",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      padding: "2px 6px",
                      background: typeColor(op.type),
                      color: op.type === "DAT" || op.type === "CHOP" || op.type === "EXEC" ? "#0a0a0a" : "#fff",
                      fontSize: 9, fontWeight: 700, letterSpacing: 1.4,
                      fontFamily: "var(--td-mono), monospace", borderRadius: 2,
                    }}
                  >
                    {op.type}
                  </span>
                  <span style={{ fontFamily: "var(--td-mono), monospace", fontSize: 13 }}>{op.name}</span>
                </div>
                <span style={{ color: "#666", fontFamily: "var(--td-mono), monospace", fontSize: 11 }}>
                  {open ? "[-]" : "[+]"}
                </span>
              </div>
              {op.deep?.blurb && (
                <div style={{ color: "#888", fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>
                  {op.deep.blurb}
                </div>
              )}
              {open && op.deep?.rows && (
                <div style={{ marginTop: 10, fontFamily: "var(--td-mono), monospace", fontSize: 11 }}>
                  {op.deep.rows.map((r) => (
                    <div key={r.k} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: "1px dashed #232323" }}>
                      <span style={{ color: "#666" }}>{r.k}</span>
                      <span style={{ color: "#cfcfcf" }}>{r.v}</span>
                    </div>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </main>
    </div>
  );
}

function typeColor(t: OpType) {
  return ({
    TOP: "#FF00AA", CHOP: "#7FFF00", SOP: "#3D8BFF",
    MAT: "#1FCFB6", DAT: "#E0E0E0", COMP: "#888888", EXEC: "#FFB000",
  } as Record<OpType, string>)[t];
}

/* ----- desktop network ----- */

interface ViewState {
  panX: number;
  panY: number;
  zoom: number;
}

const INITIAL_VIEW: ViewState = { panX: 60, panY: 0, zoom: 0.95 };

export default function Network() {
  const [mobile, setMobile] = useState<boolean | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (mobile === null) {
    return <div style={{ background: CANVAS_BG, width: "100%", height: "100vh" }} />;
  }
  if (mobile) return <MobileFallback />;
  return <Desktop frozen={reduceMotion} />;
}

function Desktop({ frozen }: { frozen: boolean }) {
  /* ----- view state ----- */
  const [view, setView] = useState<ViewState>(INITIAL_VIEW);
  // Keep a ref mirror so wheel/pan handlers can read latest without re-binding.
  const viewRef = useRef<ViewState>(view);
  useEffect(() => { viewRef.current = view; }, [view]);

  /* ----- selection / hover state ----- */
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openId,     setOpenId]     = useState<string | null>(null);
  const [filter,     setFilter]     = useState<OpType | null>(null);
  const [hoverWire,  setHoverWire]  = useState<string | null>(null);
  const [pulseId,    setPulseId]    = useState<string | null>(null);
  const pulseTimeoutRef = useRef<number | null>(null);

  /* ----- timeline ----- */
  const [playing, setPlaying] = useState(true);
  const [frame,   setFrame]   = useState(0);
  const [fps,     setFps]     = useState(60);
  const [cookSpark, setCookSpark] = useState<number[]>(() =>
    Array.from({ length: 60 }, (_, i) => 0.4 + 0.3 * Math.sin(i * 0.2))
  );

  /* ----- rAF loop: drives viewports + frame counter + cook sparkline ----- */
  const tRef = useRef(0);
  const [tickT, setTickT] = useState(0);
  const lastFpsAtRef = useRef(performance.now());
  const fpsFramesRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    let lastTime = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      if (playing && !frozen) {
        tRef.current += dt;
      }
      // throttle setState — every ~33ms (~30Hz) is plenty for SVG viewports
      if (Math.abs(tRef.current - tickT) > 0.033 || frozen) {
        setTickT(tRef.current);
      }

      // frame counter
      if (playing && !frozen) setFrame((f) => f + 1);

      // fps measurement
      fpsFramesRef.current++;
      if (now - lastFpsAtRef.current >= 1000) {
        setFps(fpsFramesRef.current);
        fpsFramesRef.current = 0;
        lastFpsAtRef.current = now;
        // push a synthetic cook time sample
        setCookSpark((s) => {
          const next = [...s.slice(1), 0.35 + Math.random() * 0.5];
          return next;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // tickT dep intentionally omitted — we use it for compare only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, frozen]);

  /* ----- pan: drag-on-canvas ----- */
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const dragStartRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const spaceDownRef = useRef(false);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    // ignore drags that started on a node/panel
    const target = e.target as HTMLElement;
    const isNode = target.closest("[data-op]") || target.closest("[data-no-pan]");
    const middleMouse = e.button === 1;
    if ((isNode && !middleMouse && !spaceDownRef.current) || e.button === 2) return;
    draggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX, y: e.clientY,
      panX: viewRef.current.panX, panY: viewRef.current.panY,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setView((v) => ({
      ...v,
      panX: dragStartRef.current!.panX + dx,
      panY: dragStartRef.current!.panY + dy,
    }));
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    draggingRef.current = false;
    dragStartRef.current = null;
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch { /* */ }
  }, []);

  /* ----- wheel zoom (centers on cursor) ----- */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      // Only zoom when wheeling inside the canvas area (let scroll happen in panels)
      const target = e.target as HTMLElement;
      if (target.closest("[data-no-zoom]")) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const v = viewRef.current;
      const dz = -e.deltaY * 0.0015;
      const nextZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, v.zoom * Math.exp(dz)));
      // Anchor: world point under cursor before == after.
      // world = (screen - pan) / zoom
      const worldX = (mx - v.panX) / v.zoom;
      const worldY = (my - v.panY) / v.zoom;
      const nextPanX = mx - worldX * nextZoom;
      const nextPanY = my - worldY * nextZoom;
      setView({ panX: nextPanX, panY: nextPanY, zoom: nextZoom });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  /* ----- keyboard ----- */
  const recenter = useCallback(() => {
    setView(INITIAL_VIEW);
    setSelectedId(null);
    setFilter(null);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.code === "Space") { spaceDownRef.current = true; }
      if (e.key === "Escape") { setSelectedId(null); setOpenId(null); setFilter(null); }
      if (e.key === "h" || e.key === "H") { recenter(); }
      // 1..7 → filter by type
      if (e.key >= "1" && e.key <= "7") {
        const idx = Number(e.key) - 1;
        const t = OP_TYPE_ORDER[idx];
        if (t) setFilter((cur) => (cur === t ? null : t));
      }
      // arrows nudge canvas
      const step = 36;
      if (e.key === "ArrowLeft")  setView((v) => ({ ...v, panX: v.panX + step }));
      if (e.key === "ArrowRight") setView((v) => ({ ...v, panX: v.panX - step }));
      if (e.key === "ArrowUp")    setView((v) => ({ ...v, panY: v.panY + step }));
      if (e.key === "ArrowDown")  setView((v) => ({ ...v, panY: v.panY - step }));
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.code === "Space") spaceDownRef.current = false;
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onUp);
    };
  }, [recenter]);

  /* ----- selection helpers ----- */
  const onSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);
  const onOpen = useCallback((id: string) => {
    setSelectedId(id);
    setOpenId(id);
  }, []);
  const onCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedId(null);
    }
  }, []);

  const onPulse = useCallback((id: string) => {
    setPulseId(id);
    if (pulseTimeoutRef.current) window.clearTimeout(pulseTimeoutRef.current);
    pulseTimeoutRef.current = window.setTimeout(() => setPulseId(null), 600);
    // bump cook sparkline
    setCookSpark((s) => [...s.slice(1), 0.95]);
  }, []);

  /* ----- highlight: which wires touch the selected/pulsed node ----- */
  const connectedWires = useMemo(() => {
    if (!selectedId && !pulseId) return new Set<string>();
    const id = selectedId ?? pulseId!;
    const set = new Set<string>();
    WIRES.forEach((w) => {
      if (w.from === id || w.to === id) set.add(w.id);
    });
    return set;
  }, [selectedId, pulseId]);

  /* ----- canvas world bounds → svg viewBox ----- */
  // Operators range roughly 0..1180 wide, 0..820 tall. Pad generously.
  const SVG_W = 1400;
  const SVG_H = 920;

  /* ----- selected operator object ----- */
  const selectedOp = selectedId ? opMap.get(selectedId) ?? null : null;
  const openOp     = openId     ? opMap.get(openId)     ?? null : null;

  /* ----- hover hint for status bar ----- */
  const hoverHint = useMemo(() => {
    if (hoverWire) {
      const w = WIRES.find((w) => w.id === hoverWire);
      if (w) return `wire: ${w.from} → ${w.to}`;
    }
    if (selectedOp) return `${selectedOp.type} · ${selectedOp.name} · ${selectedOp.params.length} params`;
    return "select an operator · pan empty canvas · wheel to zoom";
  }, [hoverWire, selectedOp]);

  /* ----- viewport thumbnails: shared time tick ----- */
  // Pulse flashes use tickT as the "global clock".

  const flowOffset = ((tRef.current * 60) % 1000);

  return (
    <div
      ref={wrapperRef}
      className={`${mono.variable} ${display.variable}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClick={onCanvasClick}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: CANVAS_BG,
        color: "#e8e8e8",
        fontFamily: "var(--td-display), system-ui, sans-serif",
        cursor: draggingRef.current ? "grabbing" : "default",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      <a href="#td-main" className="td-skip">Skip to content</a>

      {/* grid backdrop — fixed, NOT panned, but offset by pan to fake infinite grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: CANVAS_BG,
          backgroundImage: `
            linear-gradient(${CANVAS_GRID} 1px, transparent 1px),
            linear-gradient(90deg, ${CANVAS_GRID} 1px, transparent 1px),
            radial-gradient(ellipse 80% 60% at 50% 40%, ${CANVAS_BG_2} 0%, ${CANVAS_BG} 70%)
          `,
          backgroundSize: `${GRID * view.zoom}px ${GRID * view.zoom}px, ${GRID * view.zoom}px ${GRID * view.zoom}px, 100% 100%`,
          backgroundPosition: `${view.panX}px ${view.panY}px, ${view.panX}px ${view.panY}px, 0 0`,
          opacity: 0.85,
          pointerEvents: "none",
        }}
      />

      {/* TOOLBAR */}
      <Toolbar
        filter={filter}
        onFilter={setFilter}
        onHome={recenter}
        build={47}
      />

      {/* TRANSFORM LAYER (operators + wires) */}
      <div
        id="td-main"
        style={{
          position: "absolute",
          top: 40, left: 0, right: 300, bottom: 92,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0, left: 0,
            transformOrigin: "0 0",
            transform: `translate(${view.panX}px, ${view.panY}px) scale(${view.zoom})`,
            willChange: "transform",
          }}
        >
          {/* WIRES */}
          <svg
            width={SVG_W}
            height={SVG_H}
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            style={{ position: "absolute", top: 0, left: 0, overflow: "visible", pointerEvents: "none" }}
          >
            <g style={{ pointerEvents: "auto" }}>
              {WIRES.map((w) => {
                const fromOp = opMap.get(w.from);
                const toOp   = opMap.get(w.to);
                if (!fromOp || !toOp) return null;
                const a = portPosition(fromOp, "out", w.outIdx);
                const b = portPosition(toOp,   "in",  w.inIdx);
                const fromType = WIRE_TYPE(w.from);
                const isFiltered = filter ? (fromOp.type !== filter && toOp.type !== filter) : false;
                const isSelected = connectedWires.has(w.id);
                const dimmed = (selectedId && !isSelected) || isFiltered;
                return (
                  <Wire
                    key={w.id}
                    id={w.id}
                    x1={a.x} y1={a.y}
                    x2={b.x} y2={b.y}
                    type={fromType}
                    highlighted={isSelected}
                    dimmed={!!dimmed}
                    flowOffset={flowOffset + (w.id.length * 11) % 100}
                    hovered={hoverWire === w.id}
                    onHover={setHoverWire}
                  />
                );
              })}
            </g>
          </svg>

          {/* OPERATORS */}
          {OPERATORS.map((op) => {
            const isSelected = selectedId === op.id;
            const filterMiss = filter && op.type !== filter;
            const connected =
              selectedId
                ? Array.from(connectedWires).some((id) => {
                    const w = WIRES.find((w) => w.id === id);
                    return w && (w.from === op.id || w.to === op.id);
                  })
                : false;
            const dimmed = (!!selectedId && !isSelected && !connected) || !!filterMiss;
            const highlighted = pulseId === op.id;
            return (
              <div key={op.id} data-op>
                <Operator
                  op={op}
                  selected={isSelected}
                  dimmed={dimmed}
                  highlighted={highlighted}
                  t={tickT}
                  frozen={frozen}
                  onSelect={onSelect}
                  onOpen={onOpen}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* PARAMETER PANEL */}
      <div data-no-pan data-no-zoom>
        <ParameterPanel
          op={selectedOp}
          onClose={() => setSelectedId(null)}
          onPulse={onPulse}
          onOpen={() => selectedId && setOpenId(selectedId)}
        />
      </div>

      {/* TIMELINE */}
      <Timeline
        frame={frame}
        fps={fps}
        cookSparkline={cookSpark}
        playing={playing}
        onTogglePlay={() => setPlaying((p) => !p)}
        onStop={() => { setPlaying(false); setFrame(0); }}
      />

      {/* STATUS BAR */}
      <StatusBar
        zoom={view.zoom}
        panX={view.panX}
        panY={view.panY}
        selectedName={selectedOp ? selectedOp.name : null}
        hoverHint={hoverHint}
      />

      {/* DEEP VIEW MODAL */}
      <DeepView op={openOp} onClose={() => setOpenId(null)} />

      {/* keyboard shortcut helper — bottom-left floating */}
      <KbdHint />

      <style>{`
        html, body { overflow: hidden !important; height: 100%; }
        body { background: ${CANVAS_BG}; }
        .td-skip {
          position: absolute; left: -9999px; top: 8px; z-index: 100;
          background: #FFD700; color: #0a0a0a; padding: 6px 10px;
          font-family: var(--td-mono), monospace; font-size: 11px; letter-spacing: 1.5px;
          border-radius: 3px;
        }
        .td-skip:focus { left: 8px; }
      `}</style>
    </div>
  );
}

function KbdHint() {
  const [open, setOpen] = useState(true);
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Show keyboard shortcuts"
        style={{
          position: "absolute", bottom: 80, left: 12, zIndex: 30,
          padding: "4px 8px",
          background: "#161616", border: "1px solid #2a2a2a",
          color: "#FFB000", fontFamily: "var(--td-mono), monospace",
          fontSize: 10, letterSpacing: 1.4, cursor: "pointer", borderRadius: 3,
        }}
      >
        ?
      </button>
    );
  }
  return (
    <div
      data-no-pan data-no-zoom
      style={{
        position: "absolute",
        bottom: 80, left: 12, zIndex: 30,
        background: "rgba(15,15,15,0.96)",
        border: "1px solid #2a2a2a",
        borderRadius: 4,
        padding: "10px 14px",
        fontFamily: "var(--td-mono), monospace",
        fontSize: 10,
        color: "#888",
        letterSpacing: 1.2,
        backdropFilter: "blur(8px)",
        maxWidth: 240,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ color: "#FFB000", letterSpacing: 1.6 }}>{"// shortcuts"}</span>
        <button
          onClick={() => setOpen(false)}
          aria-label="Hide shortcuts"
          style={{ background: "transparent", border: "none", color: "#666", cursor: "pointer", fontSize: 12, lineHeight: 1 }}
        >×</button>
      </div>
      <Row k="drag"          v="pan canvas" />
      <Row k="wheel"         v="zoom on cursor" />
      <Row k="click"         v="select operator" />
      <Row k="dbl-click"     v="open deep view" />
      <Row k="1-7"           v="filter by type" />
      <Row k="h"             v="home" />
      <Row k="esc"           v="deselect" />
      <Row k="arrows"        v="nudge canvas" />
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "2px 0" }}>
      <span style={{ color: "#cfcfcf" }}>{k}</span>
      <span style={{ color: "#666" }}>{v}</span>
    </div>
  );
}
