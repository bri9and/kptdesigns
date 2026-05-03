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
  Upload,
  X,
} from "lucide-react";
import type { BrandProfile } from "@/lib/pipeline/types";

type CuratedAsset = { key: string; role: "hero" | "secondary" | "gallery" | "logo" };

type StudioProps = {
  jobId: string;
  generatedHtml: string;
  brandProfile: BrandProfile | null;
  sourceUrl: string | null;
  businessName: string | null;
  fontsHref: string | null;
  curatedAssets: CuratedAsset[];
  logoKey: string | null;
};

type ImagePicker = {
  editId: string;        // per-img id assigned by the bridge so we can find it again
  currentSrc: string;
} | null;

type SaveState = "idle" | "saving" | "saved" | "error";

export function Studio({
  jobId,
  generatedHtml,
  brandProfile,
  sourceUrl,
  businessName,
  fontsHref,
  curatedAssets,
  logoKey,
}: StudioProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [picker, setPicker] = useState<ImagePicker>(null);

  // Brand state — live overrides on top of the brand profile's defaults.
  // Everything but Source URL is editable.
  const initialPalette = brandProfile?.palette;
  const initialFonts = brandProfile?.fonts;
  const initialVoice = brandProfile?.voice;
  const [primary, setPrimary] = useState(initialPalette?.primary ?? "#1a4f8b");
  const [accent, setAccent] = useState(initialPalette?.accent1 ?? "#d92d20");
  const [ink, setInk] = useState(initialPalette?.ink ?? "#1a1a1a");
  const [canvas, setCanvas] = useState(initialPalette?.canvas ?? "#ffffff");
  const [editedBusinessName, setEditedBusinessName] = useState(
    businessName ?? brandProfile?.businessName ?? "",
  );
  const [displayFont, setDisplayFont] = useState(initialFonts?.display ?? "Inter");
  const [bodyFont, setBodyFont] = useState(initialFonts?.body ?? "Inter");
  const [tone, setTone] = useState<string>(initialVoice?.tone ?? "warm");

  function markDirty() {
    setDirty(true);
    setSaveState("idle");
  }

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
      const msg = e.data as {
        type?: string;
        html?: string;
        editId?: string;
        currentSrc?: string;
      };
      if (msg.type === "edit-tick") {
        setDirty(true);
        setSaveState("idle");
      } else if (msg.type === "pick-image" && msg.editId) {
        setPicker({ editId: msg.editId, currentSrc: msg.currentSrc ?? "" });
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Live-load any font the customer types in the sidebar. We inject a
  // <link rel="stylesheet"> into the iframe head pointing at Google
  // Fonts for both display + body, then push --brand-display-font and
  // --brand-body-font through set-vars so the fan-out updates the
  // customer-scoped vars too.
  useEffect(() => {
    const win = iframeRef.current?.contentWindow;
    const doc = iframeRef.current?.contentDocument;
    if (!win || !doc) return;
    const families = new Set<string>();
    if (displayFont) families.add(`${urlSafeFont(displayFont)}:wght@400;500;600;700`);
    if (bodyFont && bodyFont !== displayFont) {
      families.add(`${urlSafeFont(bodyFont)}:wght@300;400;500;700`);
    }
    if (families.size > 0) {
      const href = `https://fonts.googleapis.com/css2?family=${[...families].join("&family=")}&display=swap`;
      const existing = doc.querySelector("link[data-studio-fonts]");
      if (!existing || existing.getAttribute("href") !== href) {
        const link = doc.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.setAttribute("data-studio-fonts", "true");
        doc.head.appendChild(link);
        if (existing) existing.remove();
      }
    }
    win.postMessage(
      {
        type: "set-vars",
        vars: {
          "--brand-display-font": `"${displayFont}", system-ui, sans-serif`,
          "--brand-body-font": `"${bodyFont}", system-ui, sans-serif`,
          "--brand-serif-font": `"${displayFont}", Georgia, serif`,
        },
      },
      "*",
    );
    if (
      displayFont !== (initialFonts?.display ?? "Inter") ||
      bodyFont !== (initialFonts?.body ?? "Inter")
    ) {
      markDirty();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayFont, bodyFont]);

  // Apply a chosen image src into the iframe.
  const applyImageSrc = useCallback(
    (newSrc: string) => {
      if (!picker) return;
      const win = iframeRef.current?.contentWindow;
      if (!win) return;
      win.postMessage(
        { type: "set-image-src", editId: picker.editId, src: newSrc },
        "*",
      );
      setDirty(true);
      setPicker(null);
    },
    [picker],
  );

  // Push brand-var overrides into the iframe whenever the customer
  // changes a swatch. Also flips the dirty flag so Save lights up.
  // Skip on the very first run (initial state == brand profile defaults).
  const initialColorRef = useRef({ primary, accent, ink, canvas });
  useEffect(() => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.postMessage(
      {
        type: "set-vars",
        vars: {
          "--brand-primary": primary,
          "--brand-accent-1": accent,
          "--brand-ink": ink,
          "--brand-canvas": canvas,
        },
      },
      "*",
    );
    const init = initialColorRef.current;
    if (
      primary !== init.primary ||
      accent !== init.accent ||
      ink !== init.ink ||
      canvas !== init.canvas
    ) {
      setDirty(true);
      setSaveState("idle");
    }
  }, [primary, accent, ink, canvas]);

  const handleSave = useCallback(async () => {
    setSaveState("saving");
    setSaveError(null);

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

    // Brand-profile metadata edits ride alongside the HTML save.
    const brandPatch = {
      businessName: editedBusinessName,
      palette: { primary, accent1: accent, ink, canvas },
      fonts: { display: displayFont, body: bodyFont, mono: initialFonts?.mono },
      voice: { tone, formality: initialVoice?.formality, voiceSample: initialVoice?.voiceSample, notes: initialVoice?.notes },
    };

    try {
      const res = await fetch(`/api/edit/${jobId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html, brandProfile: brandPatch }),
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
  }, [jobId, editedBusinessName, primary, accent, ink, canvas, displayFont, bodyFont, tone, initialFonts?.mono, initialVoice?.formality, initialVoice?.voiceSample, initialVoice?.notes]);

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
          <Input
            label="Business name"
            value={editedBusinessName}
            onChange={(v) => { setEditedBusinessName(v); markDirty(); }}
          />
          <Field label="Source URL" value={sourceUrl ?? "—"} mono />
        </Section>

        <Section title="Brand colors">
          <Swatch
            label="Primary"
            value={primary}
            onChange={(v) => { setPrimary(v); }}
          />
          <Swatch label="Accent" value={accent} onChange={(v) => setAccent(v)} />
          <Swatch label="Ink (text)" value={ink} onChange={(v) => setInk(v)} />
          <Swatch label="Canvas" value={canvas} onChange={(v) => setCanvas(v)} />
          <p className="mt-3 text-[11px] leading-snug text-brand-text-muted">
            Click a swatch or type the hex directly. Changes apply live.
          </p>
        </Section>

        <Section title="Typography">
          <FontPicker
            label="Display font"
            value={displayFont}
            onChange={setDisplayFont}
            options={GOOGLE_FONTS_DISPLAY}
          />
          <FontPicker
            label="Body font"
            value={bodyFont}
            onChange={setBodyFont}
            options={GOOGLE_FONTS_BODY}
          />
          <p className="mt-3 text-[11px] leading-snug text-brand-text-muted">
            Picks any Google Font. Type a custom name or pick from the list.
          </p>
        </Section>

        <Section title="Voice">
          <Select
            label="Tone"
            value={tone}
            options={["formal", "casual", "warm", "technical", "playful", "rugged"]}
            onChange={(v) => { setTone(v); markDirty(); }}
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

      {picker ? (
        <ImagePickerModal
          jobId={jobId}
          currentSrc={picker.currentSrc}
          curatedAssets={curatedAssets}
          logoKey={logoKey}
          onPick={applyImageSrc}
          onClose={() => setPicker(null)}
        />
      ) : null}
    </div>
  );
}

/* ─────────────────── Image picker modal ─────────────────── */

function ImagePickerModal({
  jobId,
  currentSrc,
  curatedAssets,
  logoKey,
  onPick,
  onClose,
}: {
  jobId: string;
  currentSrc: string;
  curatedAssets: CuratedAsset[];
  logoKey: string | null;
  onPick: (newSrc: string) => void;
  onClose: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState("");

  // Build the gallery: curated assets in role order, plus logo if we have it.
  const gallery = useMemo(() => {
    const items: { url: string; role: string }[] = [];
    if (logoKey) {
      items.push({ url: `/api/asset/${logoKey}`, role: "logo" });
    }
    const order = ["hero", "secondary", "gallery", "logo"] as const;
    for (const role of order) {
      for (const a of curatedAssets) {
        if (a.role !== role) continue;
        const url = `/api/asset/${a.key}`;
        if (!items.some((i) => i.url === url)) items.push({ url, role });
      }
    }
    return items;
  }, [curatedAssets, logoKey]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`/api/edit/${jobId}/upload`, {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
      const data = (await res.json()) as { url?: string };
      if (!data.url) throw new Error("Upload returned no URL");
      onPick(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setUploading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-ink/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[80vh] w-[min(720px,90vw)] flex-col overflow-hidden rounded-2xl border border-brand-divider bg-brand-canvas shadow-[var(--brand-shadow-lg)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-brand-divider px-5 py-3">
          <h2 className="font-[family-name:var(--brand-display-font)] text-base font-medium text-brand-ink">
            Replace image
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-brand-text hover:bg-brand-surface-2 hover:text-brand-ink"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <p className="mb-3 text-[12px] text-brand-text-muted">
            Currently:{" "}
            <span className="font-[family-name:var(--brand-mono-font)] text-[11px] text-brand-text-strong">
              {currentSrc.length > 60 ? `…${currentSrc.slice(-60)}` : currentSrc}
            </span>
          </p>

          <div className="mb-4 flex items-center gap-2">
            <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-brand-divider bg-brand-surface px-3 py-3 text-sm text-brand-text hover:border-brand-primary hover:bg-brand-primary-soft hover:text-brand-primary transition-colors">
              {uploading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Uploading…
                </>
              ) : (
                <>
                  <Upload className="h-3.5 w-3.5" />
                  Upload from your computer
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          <div className="mb-5 flex gap-2">
            <input
              type="url"
              placeholder="…or paste an image URL"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 rounded-md border border-brand-divider bg-brand-canvas px-3 py-2 text-[13px] text-brand-ink outline-none focus:border-brand-primary"
            />
            <button
              type="button"
              disabled={!urlInput.trim()}
              onClick={() => urlInput.trim() && onPick(urlInput.trim())}
              className="rounded-md border border-brand-divider px-3 py-2 text-[13px] font-medium text-brand-ink disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-surface-2"
            >
              Use URL
            </button>
          </div>

          {error ? (
            <div className="mb-4 rounded-md border border-brand-primary bg-brand-primary-soft px-3 py-2 text-[12px] text-brand-primary-strong">
              {error}
            </div>
          ) : null}

          {gallery.length > 0 ? (
            <>
              <h3 className="mb-2 font-[family-name:var(--brand-mono-font)] text-[10px] uppercase tracking-[0.2em] text-brand-text-muted">
                Photos we found from your site
              </h3>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {gallery.map((item) => (
                  <button
                    key={item.url}
                    type="button"
                    onClick={() => onPick(item.url)}
                    className="group relative aspect-[4/3] overflow-hidden rounded-md border border-brand-divider bg-brand-surface hover:border-brand-primary"
                    title={item.role}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={item.role}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <span className="absolute bottom-1 left-1 rounded-sm bg-brand-ink/80 px-1.5 py-0.5 font-[family-name:var(--brand-mono-font)] text-[9px] uppercase tracking-wider text-brand-canvas">
                      {item.role}
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
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
  // Accept either picker change or typed hex (#rrggbb).
  const [text, setText] = useState(value);
  useEffect(() => setText(value), [value]);

  function commit(raw: string) {
    let v = raw.trim();
    if (!v.startsWith("#")) v = `#${v}`;
    if (/^#[0-9a-fA-F]{6}$/.test(v) || /^#[0-9a-fA-F]{3}$/.test(v)) {
      onChange(v.toLowerCase());
    }
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <span className="shrink-0 text-[12px] text-brand-text-strong">{label}</span>
      <span className="flex items-center gap-1.5">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={(e) => commit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") (e.target as HTMLInputElement).blur();
          }}
          className="w-[78px] rounded-md border border-brand-divider bg-brand-canvas px-2 py-1 font-[family-name:var(--brand-mono-font)] text-[11px] text-brand-text-strong outline-none focus:border-brand-primary"
          aria-label={`${label} hex`}
          spellCheck={false}
        />
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-7 w-9 cursor-pointer rounded-md border border-brand-divider bg-transparent"
          aria-label={label}
        />
      </span>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-[11px] text-brand-text-muted">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-brand-divider bg-brand-canvas px-2.5 py-1.5 text-[12px] text-brand-ink outline-none focus:border-brand-primary"
        spellCheck={false}
      />
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-[11px] text-brand-text-muted">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-brand-divider bg-brand-canvas px-2.5 py-1.5 text-[12px] text-brand-ink outline-none focus:border-brand-primary"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function FontPicker({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  // Datalist gives a free-text input + dropdown of common picks. The
  // user can type any Google Font name; we'll inject the link on commit.
  const id = `font-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div>
      <label className="mb-1 block text-[11px] text-brand-text-muted">
        {label}
      </label>
      <input
        type="text"
        list={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-brand-divider bg-brand-canvas px-2.5 py-1.5 font-[family-name:var(--brand-display-font)] text-[12px] text-brand-ink outline-none focus:border-brand-primary"
        spellCheck={false}
        style={{ fontFamily: `"${value}", system-ui, sans-serif` }}
      />
      <datalist id={id}>
        {options.map((o) => <option key={o} value={o} />)}
      </datalist>
    </div>
  );
}

function urlSafeFont(family: string): string {
  return family.trim().replace(/\s+/g, "+");
}

const GOOGLE_FONTS_DISPLAY = [
  "Inter","Oswald","Playfair Display","Fraunces","Plus Jakarta Sans","DM Serif Display",
  "Bebas Neue","Anton","Archivo Black","Lora","Cormorant Garamond","Manrope","Geist",
  "Space Grotesk","Marcellus","Bodoni Moda","Cinzel","Spectral","Tenor Sans","Karla",
  "Sora","Outfit","Familjen Grotesk","Bricolage Grotesque","Newsreader","Crimson Pro",
  "Libre Baskerville","Inter Tight","Roboto","Roboto Slab","Merriweather","Public Sans",
] as const;

const GOOGLE_FONTS_BODY = [
  "Inter","Roboto","Plus Jakarta Sans","Manrope","DM Sans","Source Sans 3","Open Sans",
  "Lato","Mulish","Nunito","Karla","Public Sans","Geist","Outfit","Spectral","Lora",
  "Newsreader","Crimson Pro","Merriweather","Libre Franklin","Familjen Grotesk",
  "Sora","Inter Tight","Work Sans","IBM Plex Sans","Atkinson Hyperlegible",
] as const;

/* ───────────────────────── iframe document ───────────────────────── */

function buildIframeDoc(html: string, fontsHref: string | null): string {
  const fontsLink = fontsHref
    ? `<link rel="stylesheet" href="${fontsHref}" crossorigin>`
    : "";
  // Bridge script for editor interactions inside the iframe.
  // Three responsibilities:
  //   1. TEXT EDITING — scoped contenteditable=plaintext-only on leaf
  //      text elements. Whole-body contenteditable was destructive.
  //   2. IMAGE SWAP — every <img> gets a click handler that opens the
  //      studio's image picker. Studio replies with a new src.
  //   3. SECTION REORDER — every direct top-level child of <body> gets
  //      a small ↑ / ↓ overlay; click swaps with the adjacent sibling.
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

    /* ---------- 1. TEXT EDITING — leaf elements only ---------- */
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
    const TEXT_SELECTOR = 'h1,h2,h3,h4,h5,h6,p,li,blockquote,a,button,figcaption,label,dt,dd,th,td,address';
    document.querySelectorAll(TEXT_SELECTOR).forEach((el) => {
      if (!isTextLeaf(el)) return;
      el.setAttribute('contenteditable', 'plaintext-only');
      if (el.tagName === 'A') {
        el.addEventListener('click', (ev) => {
          // Prevent navigation, but allow caret placement / selection.
          ev.preventDefault();
        });
      }
      if (el.tagName === 'BUTTON') {
        el.setAttribute('type', 'button');
      }
    });

    /* ---------- 2. IMAGE SWAP — click any <img> ---------- */
    let imgIdCounter = 0;
    document.querySelectorAll('img').forEach((img) => {
      const id = 'edit-img-' + (++imgIdCounter);
      img.setAttribute('data-edit-id', id);
      img.style.cursor = 'pointer';
      img.addEventListener('click', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        parent.postMessage(
          { type: 'pick-image', editId: id, currentSrc: img.getAttribute('src') || '' },
          '*'
        );
      });
    });

    /* ---------- 3. SECTION REORDER — ↑ / ↓ on top-level children ---------- */
    function makeReorderHandle(target, direction, label) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('data-studio-overlay', 'true');
      btn.title = label;
      btn.textContent = direction === 'up' ? '↑' : '↓';
      btn.style.cssText = [
        'position:absolute',
        direction === 'up' ? 'top:8px' : 'top:36px',
        'right:8px',
        'z-index:99999',
        'width:24px','height:24px','padding:0',
        'border:none','border-radius:6px',
        'background:rgba(91,143,185,0.92)',
        'color:#fff','font-size:14px','font-weight:600',
        'cursor:pointer','box-shadow:0 1px 4px rgba(0,0,0,0.25)',
        'opacity:0','transition:opacity 0.15s',
      ].join(';');
      btn.addEventListener('click', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const parent = target.parentElement;
        if (!parent) return;
        if (direction === 'up' && target.previousElementSibling) {
          parent.insertBefore(target, target.previousElementSibling);
        } else if (direction === 'down' && target.nextElementSibling && target.nextElementSibling.nextElementSibling) {
          parent.insertBefore(target.nextElementSibling, target);
        } else if (direction === 'down' && target.nextElementSibling) {
          parent.appendChild(target);
        }
        document.dispatchEvent(new Event('input', { bubbles: true }));
      });
      return btn;
    }

    function attachOverlay(target) {
      // Make sure the host can position children absolutely.
      const cs = getComputedStyle(target);
      if (cs.position === 'static') target.style.position = 'relative';
      const up = makeReorderHandle(target, 'up', 'Move section up');
      const down = makeReorderHandle(target, 'down', 'Move section down');
      target.appendChild(up);
      target.appendChild(down);
      target.addEventListener('mouseenter', () => { up.style.opacity = '1'; down.style.opacity = '1'; });
      target.addEventListener('mouseleave', () => { up.style.opacity = '0'; down.style.opacity = '0'; });
    }

    // Tag every real "page section" — semantic sectioning elements
    // (header, main > *, footer, aside, section). The freeform agent
    // commonly wraps the whole page in a single body-level <div>, so
    // body.children is just one wrapper — looking for sectioning
    // elements gets us the *actual* moveable units.
    const seenSections = new Set();
    function tagSection(el) {
      if (seenSections.has(el)) return;
      // Don't tag sections nested inside another tagged section — that
      // creates handle clutter and confusing re-orderings.
      let p = el.parentElement;
      while (p) {
        if (seenSections.has(p)) return;
        p = p.parentElement;
      }
      seenSections.add(el);
      attachOverlay(el);
    }
    document.querySelectorAll('header, footer, aside, section').forEach(tagSection);
    // Also pick up direct children of <main> that aren't already covered —
    // some AIs use <article> or bare <div> for hero / services / etc.
    const main = document.querySelector('main');
    if (main) {
      Array.from(main.children).forEach((c) => {
        if (c.tagName === 'STYLE' || c.tagName === 'SCRIPT') return;
        tagSection(c);
      });
    }

    /* ---------- Visual styles ---------- */
    const editStyle = document.createElement('style');
    editStyle.textContent =
      '[contenteditable="plaintext-only"]:focus { outline: 2px dashed rgba(91,143,185,0.6); outline-offset: 2px; border-radius: 2px; }' +
      '[contenteditable="plaintext-only"]:hover:not(:focus) { outline: 1px dashed rgba(91,143,185,0.3); outline-offset: 2px; cursor: text; }' +
      'img:not([data-studio-overlay]):hover { outline: 2px dashed rgba(91,143,185,0.55); outline-offset: 2px; cursor: pointer; }';
    document.head.appendChild(editStyle);

    /* ---------- Detect the customer's CSS variable prefix(es) ----------
     * The freeform agent scopes its CSS variables to a per-customer slug
     * (e.g. --cirigliano-primary). The studio's swatches send --brand-*
     * keys; we need to also fan out to whichever --<slug>-<role> the
     * agent actually used so picker changes show up.
     *
     * Strategy: parse every embedded <style>'s :root rule, collect all
     * declarations matching --<anything>-<role> for the roles we care
     * about. Build a map: role -> [varNames]. When a set-vars message
     * arrives, fan the value out to all variants.
     */
    const ROLE_KEYWORDS = {
      primary: ['primary'],
      'primary-strong': ['primary-strong','primary-dark','primary-deep','primary-active'],
      'primary-soft': ['primary-soft','primary-light','primary-pale','primary-tint'],
      'accent-1': ['accent-1','accent','accent-red','accent-secondary','accent-orange','accent-warm'],
      'accent-2': ['accent-2','accent-blue','accent-yellow','accent-cool'],
      'accent-3': ['accent-3','accent-green','accent-success'],
      ink: ['ink','text','text-strong','text-primary','foreground','fg'],
      canvas: ['canvas','bg','background','surface-base'],
      surface: ['surface','surface-soft','surface-1'],
    };
    const customerVarMap = {};
    function collectVars() {
      const decls = [];
      document.querySelectorAll('style').forEach((s) => {
        const txt = s.textContent || '';
        const re = /--([a-zA-Z0-9_-]+)\\s*:/g;
        let m2;
        while ((m2 = re.exec(txt)) !== null) {
          const fullName = '--' + m2[1];
          if (!decls.includes(fullName)) decls.push(fullName);
        }
      });
      for (const role of Object.keys(ROLE_KEYWORDS)) {
        customerVarMap[role] = [];
        const keywords = ROLE_KEYWORDS[role];
        for (const v of decls) {
          const tail = v.replace(/^--/, '').toLowerCase();
          if (keywords.some((k) => tail === k || tail.endsWith('-' + k))) {
            customerVarMap[role].push(v);
          }
        }
      }
    }
    collectVars();

    function fanOutVar(brandKey, value) {
      // brandKey is "--brand-primary" — strip prefix to find the role
      const role = brandKey.replace(/^--brand-/, '');
      const varList = customerVarMap[role] || [];
      // Always set the canonical brand-* var
      root.style.setProperty(brandKey, value);
      // Fan out to every customer-scoped variant for that role
      for (const v of varList) {
        root.style.setProperty(v, value);
      }
    }

    /* ---------- Studio → iframe messages ---------- */
    window.addEventListener('message', (e) => {
      const m = e.data || {};
      if (m.type === 'set-vars' && m.vars) {
        for (const [k, v] of Object.entries(m.vars)) {
          fanOutVar(k, v);
        }
      } else if (m.type === 'get-html') {
        // Strip our overlay buttons from the snapshot we hand back so the
        // saved HTML doesn't bake in editor chrome.
        const clone = document.body.cloneNode(true);
        clone.querySelectorAll('[data-studio-overlay]').forEach((n) => n.remove());
        clone.querySelectorAll('[contenteditable]').forEach((n) => n.removeAttribute('contenteditable'));
        clone.querySelectorAll('[data-edit-id]').forEach((n) => n.removeAttribute('data-edit-id'));
        // Capture every CSS variable override the customer set via the
        // sidebar color picker — both the canonical --brand-* and the
        // fanned-out customer-scoped --<slug>-* variants. Those live on
        // documentElement.style; the body snapshot wouldn't include them.
        // Inject a tiny <style> block so the saved HTML reproduces the
        // customer's chosen palette on next load.
        const overrides = [];
        for (let i = 0; i < root.style.length; i++) {
          const prop = root.style.item(i);
          if (prop && prop.startsWith('--')) {
            overrides.push(prop + ':' + root.style.getPropertyValue(prop) + ';');
          }
        }
        let html = clone.innerHTML;
        if (overrides.length > 0) {
          const styleEl = '<style data-studio-brand-overrides>:root{' + overrides.join('') + '}</style>';
          html = styleEl + html;
        }
        parent.postMessage({ type: 'html', html }, '*');
      } else if (m.type === 'set-image-src' && m.editId && typeof m.src === 'string') {
        const img = document.querySelector('img[data-edit-id="' + m.editId + '"]');
        if (img) {
          // Capture the slot's CURRENT rendered size BEFORE swapping so we
          // can lock the replacement to the same footprint. Without this,
          // dropping a 1200x800 photo into a 114x84 logo slot leaves the
          // browser to layout-shift and either stretch or shrink awkwardly.
          const rect = img.getBoundingClientRect();
          const slotW = Math.round(rect.width);
          const slotH = Math.round(rect.height);
          if (slotW > 0 && slotH > 0) {
            img.setAttribute('width', String(slotW));
            img.setAttribute('height', String(slotH));
            // Compose object-fit on top of any existing inline style.
            const existing = img.getAttribute('style') || '';
            const cleaned = existing.replace(/object-fit:[^;]*;?/gi, '').replace(/object-position:[^;]*;?/gi, '');
            img.setAttribute(
              'style',
              cleaned + ';object-fit:cover;object-position:center;width:' + slotW + 'px;height:' + slotH + 'px;'
            );
          }
          img.setAttribute('src', m.src);
          // Strip srcset / lazy-load attrs so the new src actually wins.
          img.removeAttribute('srcset');
          img.removeAttribute('data-lazy-src');
          img.removeAttribute('data-lazy-srcset');
          img.removeAttribute('sizes');
          // Trigger save tracking
          document.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    });
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
