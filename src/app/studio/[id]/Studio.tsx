"use client";

/**
 * Studio — backoffice editor for a generated customer site.
 *
 * Layout: split view with a brand-controls sidebar on the left and
 * an iframe canvas on the right that renders the customer's bespoke
 * HTML. The iframe body is `contenteditable="true"` so the customer
 * can click any text and type. Brand controls (color picker, font)
 * mutate CSS variables inside the iframe live; save persists the
 * current HTML back to the intake job.
 *
 * Iframe is srcDoc-based, fully sandboxed from the studio chrome's
 * CSS — the customer's generated styles can't leak out, and our
 * earthy chrome can't bleed in. Communication is via postMessage:
 *  - studio → iframe: { type: 'set-vars', vars: {...} } | { type: 'get-html' }
 *  - iframe → studio: { type: 'html', html } | { type: 'edit-tick' }
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Save,
  Eye,
  RefreshCcw,
  Globe,
  ArrowLeft,
  Loader2,
  Check,
} from "lucide-react";
import type { BrandProfile } from "@/lib/pipeline/types";

type StudioProps = {
  jobId: string;
  generatedHtml: string;
  brandProfile: BrandProfile | null;
  sourceUrl: string | null;
  businessName: string | null;
  fontsHref: string | null;
};

type SaveState = "idle" | "saving" | "saved" | "error";

export function Studio({
  jobId,
  generatedHtml,
  brandProfile,
  sourceUrl,
  businessName,
  fontsHref,
}: StudioProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);

  // Brand state — live overrides on top of the brand profile's defaults
  const initialPalette = brandProfile?.palette;
  const [primary, setPrimary] = useState(initialPalette?.primary ?? "#1a4f8b");
  const [accent, setAccent] = useState(initialPalette?.accent1 ?? "#d92d20");
  const [ink, setInk] = useState(initialPalette?.ink ?? "#1a1a1a");
  const [canvas, setCanvas] = useState(initialPalette?.canvas ?? "#ffffff");

  // Build the iframe srcDoc once. The body is contenteditable; we inject
  // a tiny script that postMessages out on edits and responds to vars.
  const srcDoc = useMemo(
    () => buildIframeDoc(generatedHtml, fontsHref),
    [generatedHtml, fontsHref],
  );

  // Listen for messages from the iframe.
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (!e.data || typeof e.data !== "object") return;
      const msg = e.data as { type?: string; html?: string };
      if (msg.type === "edit-tick") {
        setDirty(true);
        setSaveState("idle");
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Push brand-var overrides into the iframe whenever the customer
  // changes a swatch.
  useEffect(() => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.postMessage(
      {
        type: "set-vars",
        vars: {
          // Both kinds of selector — branded namespace and any vendor-set vars
          // the AI may have used in the generated CSS.
          "--brand-primary": primary,
          "--brand-accent-1": accent,
          "--brand-ink": ink,
          "--brand-canvas": canvas,
        },
      },
      "*",
    );
  }, [primary, accent, ink, canvas]);

  const handleSave = useCallback(async () => {
    setSaveState("saving");
    setSaveError(null);

    // Ask the iframe for its current body HTML.
    const win = iframeRef.current?.contentWindow;
    if (!win) {
      setSaveState("error");
      setSaveError("Editor canvas not ready");
      return;
    }

    const html = await new Promise<string | null>((resolve) => {
      const onMsg = (e: MessageEvent) => {
        if (e.data?.type === "html") {
          window.removeEventListener("message", onMsg);
          resolve(e.data.html ?? null);
        }
      };
      window.addEventListener("message", onMsg);
      win.postMessage({ type: "get-html" }, "*");
      // Timeout safety — if the iframe doesn't respond, give up.
      setTimeout(() => {
        window.removeEventListener("message", onMsg);
        resolve(null);
      }, 4000);
    });

    if (!html) {
      setSaveState("error");
      setSaveError("Couldn't read editor contents");
      return;
    }

    try {
      const res = await fetch(`/api/edit/${jobId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
      setSaveState("saved");
      setDirty(false);
      setTimeout(() => setSaveState("idle"), 2000);
    } catch (err) {
      setSaveState("error");
      setSaveError(err instanceof Error ? err.message : "Save failed");
    }
  }, [jobId]);

  return (
    <div className="grid h-screen grid-cols-[320px_1fr] grid-rows-[56px_1fr] bg-brand-surface text-brand-ink">
      {/* ── Top bar ──────────────────────────────────────────────────── */}
      <header className="col-span-2 flex items-center justify-between border-b border-brand-divider bg-brand-canvas px-6">
        <div className="flex items-center gap-4">
          <Link
            href={`/preview/${jobId}`}
            className="flex items-center gap-2 rounded-lg p-1.5 text-brand-text hover:text-brand-ink hover:bg-brand-surface-2 transition-colors"
            title="Back to preview"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-baseline gap-3">
            <span className="font-[family-name:var(--brand-mono-font)] text-[10px] uppercase tracking-[0.2em] text-brand-text-muted">
              Studio
            </span>
            <span className="font-[family-name:var(--brand-display-font)] text-sm font-medium text-brand-ink">
              {businessName ?? sourceUrl ?? "Untitled site"}
            </span>
            {dirty && (
              <span className="font-[family-name:var(--brand-mono-font)] text-[10px] uppercase tracking-wider text-brand-primary">
                · unsaved
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/preview/${jobId}`}
            target="_blank"
            className="flex items-center gap-1.5 rounded-lg border border-brand-divider px-3 py-1.5 text-sm text-brand-text hover:text-brand-ink hover:bg-brand-surface-2 transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </Link>
          <button
            type="button"
            disabled
            className="flex items-center gap-1.5 rounded-lg border border-brand-divider px-3 py-1.5 text-sm text-brand-text-muted cursor-not-allowed opacity-60"
            title="Coming next iteration"
          >
            <Globe className="h-3.5 w-3.5" />
            Publish
          </button>
          <SaveButton state={saveState} onClick={handleSave} disabled={!dirty} />
        </div>
      </header>

      {/* ── Sidebar ──────────────────────────────────────────────────── */}
      <aside className="row-start-2 overflow-y-auto border-r border-brand-divider bg-brand-canvas">
        <Section title="Site">
          <Field label="Business name" value={businessName ?? ""} />
          <Field label="Source URL" value={sourceUrl ?? "—"} mono />
        </Section>

        <Section title="Brand colors">
          <Swatch label="Primary" value={primary} onChange={setPrimary} />
          <Swatch label="Accent" value={accent} onChange={setAccent} />
          <Swatch label="Ink (text)" value={ink} onChange={setInk} />
          <Swatch label="Canvas" value={canvas} onChange={setCanvas} />
          <p className="mt-3 text-[11px] leading-snug text-brand-text-muted">
            Live preview only — color changes apply to the canvas immediately.
            Hit <strong>Save</strong> in the top bar to persist them.
          </p>
        </Section>

        <Section title="Typography">
          <Field
            label="Display font"
            value={brandProfile?.fonts?.display ?? "—"}
            mono
          />
          <Field
            label="Body font"
            value={brandProfile?.fonts?.body ?? "—"}
            mono
          />
          <p className="mt-3 text-[11px] leading-snug text-brand-text-muted">
            Font picker coming next iteration. Tonight: text edits + color
            tweaks.
          </p>
        </Section>

        <Section title="Voice">
          <Field
            label="Tone"
            value={brandProfile?.voice?.tone ?? "—"}
            mono
          />
          {brandProfile?.voice?.voiceSample ? (
            <div className="mt-2 rounded-lg border border-brand-divider-soft bg-brand-surface px-3 py-2 font-[family-name:var(--brand-body-font)] text-[12px] italic leading-snug text-brand-text">
              &ldquo;{brandProfile.voice.voiceSample}&rdquo;
            </div>
          ) : null}
        </Section>

        <Section title="Regenerate">
          <button
            type="button"
            disabled
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-brand-divider bg-brand-canvas px-3 py-2.5 text-sm text-brand-text-muted cursor-not-allowed opacity-60"
            title="Coming next iteration"
          >
            <RefreshCcw className="h-3.5 w-3.5" />
            Regenerate from scratch
          </button>
          <p className="mt-2 text-[11px] leading-snug text-brand-text-muted">
            Send the discovery snapshot back through the freeform agent.
            Shape, copy, and layout will all change. Coming next.
          </p>
        </Section>

        {saveError && (
          <div className="m-4 rounded-lg border border-brand-primary bg-brand-primary-soft px-3 py-2 text-[12px] text-brand-primary-strong">
            {saveError}
          </div>
        )}
      </aside>

      {/* ── Canvas ───────────────────────────────────────────────────── */}
      <main className="row-start-2 overflow-hidden bg-brand-surface-2 p-6">
        <div className="h-full overflow-hidden rounded-xl border border-brand-divider bg-brand-canvas shadow-[var(--brand-shadow-md)]">
          <iframe
            ref={iframeRef}
            title="Customer site editor"
            srcDoc={srcDoc}
            className="h-full w-full border-0"
            sandbox="allow-same-origin allow-scripts allow-forms"
          />
        </div>
      </main>
    </div>
  );
}

/* ─────────────────────────── helpers ─────────────────────────── */

function SaveButton({
  state,
  onClick,
  disabled,
}: {
  state: SaveState;
  onClick: () => void;
  disabled: boolean;
}) {
  if (state === "saving") {
    return (
      <button
        type="button"
        disabled
        className="flex items-center gap-1.5 rounded-lg bg-brand-primary px-3 py-1.5 text-sm font-medium text-brand-canvas opacity-80"
      >
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        Saving…
      </button>
    );
  }
  if (state === "saved") {
    return (
      <button
        type="button"
        disabled
        className="flex items-center gap-1.5 rounded-lg bg-brand-accent-3 px-3 py-1.5 text-sm font-medium text-brand-canvas"
      >
        <Check className="h-3.5 w-3.5" />
        Saved
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-1.5 rounded-lg bg-brand-primary px-3 py-1.5 text-sm font-medium text-brand-canvas transition-all hover:bg-brand-primary-strong disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Save className="h-3.5 w-3.5" />
      Save
    </button>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-brand-divider px-5 py-4">
      <h3 className="mb-3 font-[family-name:var(--brand-mono-font)] text-[10px] uppercase tracking-[0.2em] text-brand-text-muted">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-[11px] text-brand-text-muted">
        {label}
      </label>
      <div
        className={`truncate rounded-md border border-brand-divider-soft bg-brand-surface px-2.5 py-1.5 text-[12px] text-brand-text-strong ${mono ? "font-[family-name:var(--brand-mono-font)]" : ""}`}
        title={value}
      >
        {value}
      </div>
    </div>
  );
}

function Swatch({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3">
      <span className="text-[12px] text-brand-text-strong">{label}</span>
      <span className="flex items-center gap-2">
        <span className="font-[family-name:var(--brand-mono-font)] text-[11px] text-brand-text-muted">
          {value}
        </span>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-7 w-9 cursor-pointer rounded-md border border-brand-divider bg-transparent"
          aria-label={label}
        />
      </span>
    </label>
  );
}

/* ───────────────────────── iframe document ───────────────────────── */

function buildIframeDoc(html: string, fontsHref: string | null): string {
  const fontsLink = fontsHref
    ? `<link rel="stylesheet" href="${fontsHref}" crossorigin>`
    : "";
  // The bridge script handles two messages and emits 'edit-tick' on edits.
  // CRITICAL: do NOT make <body> globally contenteditable. Whole-body
  // contenteditable lets the browser destroy structural elements when
  // you replace selected text — triple-clicking inside a flex header
  // and typing can delete the entire header row. Instead, walk the
  // generated DOM, find every leaf element that contains text and only
  // inline children, and mark just those `contenteditable="plaintext-only"`.
  // plaintext-only also blocks rich-text shenanigans (no <div> on Enter,
  // no formatting). Saves us a class of bugs.
  const bridge = `
<script>
  (function(){
    const root = document.documentElement;
    const debounce = (fn, ms) => {
      let t;
      return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
    };
    const tick = debounce(() => {
      parent.postMessage({ type: 'edit-tick' }, '*');
    }, 250);
    document.addEventListener('input', tick);
    window.addEventListener('message', (e) => {
      const m = e.data || {};
      if (m.type === 'set-vars' && m.vars) {
        for (const [k, v] of Object.entries(m.vars)) {
          root.style.setProperty(k, v);
        }
      } else if (m.type === 'get-html') {
        parent.postMessage({ type: 'html', html: document.body.innerHTML }, '*');
      }
    });

    // Inline tags that are safe to live inside a contenteditable leaf.
    const INLINE_OK = new Set([
      'A','SPAN','EM','STRONG','B','I','U','CODE','SMALL','MARK','SUB','SUP','TIME','ABBR','BR'
    ]);
    function isTextLeaf(el) {
      let hasText = false;
      for (const child of el.childNodes) {
        if (child.nodeType === 3) {
          if (child.textContent && child.textContent.trim().length > 0) hasText = true;
        } else if (child.nodeType === 1) {
          if (!INLINE_OK.has(child.tagName)) return false;
        }
      }
      return hasText;
    }
    // Candidate selectors — any element type that typically holds editable text.
    const SELECTOR = 'h1,h2,h3,h4,h5,h6,p,li,blockquote,a,button,figcaption,label,dt,dd,th,td,address';
    document.querySelectorAll(SELECTOR).forEach((el) => {
      if (!isTextLeaf(el)) return;
      // plaintext-only: edits only the visible text, preserves the
      // element type + attributes + child structure.
      el.setAttribute('contenteditable', 'plaintext-only');
      // Preserve clicks on links/buttons that ALSO have hrefs we don't
      // want navigation away from while editing.
      if (el.tagName === 'A') {
        el.addEventListener('click', (ev) => ev.preventDefault());
      }
      if (el.tagName === 'BUTTON') {
        el.setAttribute('type', 'button');
      }
    });

    // Visual cue: dashed outline on focus, plus image hover affordance.
    const editStyle = document.createElement('style');
    editStyle.textContent =
      '[contenteditable="plaintext-only"]:focus { outline: 2px dashed rgba(91,143,185,0.6); outline-offset: 2px; border-radius: 2px; }' +
      '[contenteditable="plaintext-only"]:hover:not(:focus) { outline: 1px dashed rgba(91,143,185,0.3); outline-offset: 2px; cursor: text; }' +
      'img:hover { outline: 2px dashed rgba(91,143,185,0.55); outline-offset: 2px; cursor: pointer; }';
    document.head.appendChild(editStyle);
  })();
</script>`;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${fontsLink}
  </head>
  <body>${html}${bridge}</body>
</html>`;
}
