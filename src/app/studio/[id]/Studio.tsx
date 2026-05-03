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
  editId: string;        // per-element id assigned by the bridge so we can find it again
  currentSrc: string;
  kind: "img" | "background";
} | null;

type SizePopoverState = {
  editId: string;
  rect: { left: number; top: number; width: number; height: number };
  width: string;          // e.g. "1200" / "100" / ""
  widthUnit: "px" | "%" | "vw" | "auto";
  height: string;
  heightUnit: "px" | "vh" | "%" | "auto";
};
type SizePopover = SizePopoverState | null;

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
  const [sizePopover, setSizePopover] = useState<SizePopover>(null);

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
        setPicker({
          editId: msg.editId,
          currentSrc: msg.currentSrc ?? "",
          kind: "img",
        });
      } else if (msg.type === "pick-background" && msg.editId) {
        setPicker({
          editId: msg.editId,
          currentSrc: msg.currentSrc ?? "",
          kind: "background",
        });
      } else if (msg.type === "open-size" && msg.editId) {
        const rect = (msg as unknown as { rect?: SizePopoverState["rect"] }).rect;
        const sz = (msg as unknown as { size?: { width: string; widthUnit: SizePopoverState["widthUnit"]; height: string; heightUnit: SizePopoverState["heightUnit"] } }).size;
        setSizePopover({
          editId: msg.editId,
          rect: rect ?? { left: 0, top: 0, width: 0, height: 0 },
          width: sz?.width ?? "",
          widthUnit: sz?.widthUnit ?? "auto",
          height: sz?.height ?? "",
          heightUnit: sz?.heightUnit ?? "auto",
        });
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

  // Apply a chosen image src into the iframe — either swap an <img> src
  // or replace a CSS background-image, depending on which affordance opened
  // the picker.
  const applyImageSrc = useCallback(
    (newSrc: string) => {
      if (!picker) return;
      const win = iframeRef.current?.contentWindow;
      if (!win) return;
      win.postMessage(
        picker.kind === "background"
          ? { type: "set-background", editId: picker.editId, src: newSrc }
          : { type: "set-image-src", editId: picker.editId, src: newSrc },
        "*",
      );
      markDirty();
      setPicker(null);
    },
    [picker],
  );

  // Push a width/height change into the iframe.
  const applySize = useCallback(
    (
      width: string,
      widthUnit: SizePopoverState["widthUnit"],
      height: string,
      heightUnit: SizePopoverState["heightUnit"],
    ) => {
      if (!sizePopover) return;
      const win = iframeRef.current?.contentWindow;
      if (!win) return;
      win.postMessage(
        {
          type: "set-size",
          editId: sizePopover.editId,
          width: widthUnit === "auto" ? "auto" : `${width}${widthUnit}`,
          height: heightUnit === "auto" ? "auto" : `${height}${heightUnit}`,
        },
        "*",
      );
      markDirty();
      setSizePopover(null);
    },
    [sizePopover],
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

      {sizePopover ? (
        <SizePopoverPanel
          initial={sizePopover}
          onApply={applySize}
          onClose={() => setSizePopover(null)}
        />
      ) : null}
    </div>
  );
}

/* ─────────────────── Size popover ─────────────────── */

function SizePopoverPanel({
  initial,
  onApply,
  onClose,
}: {
  initial: SizePopoverState;
  onApply: (
    width: string,
    widthUnit: SizePopoverState["widthUnit"],
    height: string,
    heightUnit: SizePopoverState["heightUnit"],
  ) => void;
  onClose: () => void;
}) {
  const [w, setW] = useState(initial.width);
  const [wu, setWu] = useState(initial.widthUnit);
  const [h, setH] = useState(initial.height);
  const [hu, setHu] = useState(initial.heightUnit);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-ink/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-[min(420px,92vw)] rounded-2xl border border-brand-divider bg-brand-canvas p-5 shadow-[var(--brand-shadow-lg)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-1 font-[family-name:var(--brand-display-font)] text-base font-medium text-brand-ink">
          Resize section
        </h2>
        <p className="mb-4 text-[12px] text-brand-text-muted">
          Currently {Math.round(initial.rect.width)}×{Math.round(initial.rect.height)}px.
          Set <em>auto</em> on either dimension to release back to the layout flow.
        </p>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-[11px] text-brand-text-muted">Width</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={w}
                onChange={(e) => setW(e.target.value)}
                disabled={wu === "auto"}
                placeholder="—"
                className="flex-1 rounded-md border border-brand-divider bg-brand-canvas px-2.5 py-1.5 text-[13px] text-brand-ink outline-none focus:border-brand-primary disabled:opacity-50"
              />
              <select
                value={wu}
                onChange={(e) => setWu(e.target.value as typeof wu)}
                className="rounded-md border border-brand-divider bg-brand-canvas px-2 py-1.5 text-[12px] text-brand-ink outline-none focus:border-brand-primary"
              >
                <option value="auto">auto</option>
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="vw">vw</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[11px] text-brand-text-muted">Height</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={h}
                onChange={(e) => setH(e.target.value)}
                disabled={hu === "auto"}
                placeholder="—"
                className="flex-1 rounded-md border border-brand-divider bg-brand-canvas px-2.5 py-1.5 text-[13px] text-brand-ink outline-none focus:border-brand-primary disabled:opacity-50"
              />
              <select
                value={hu}
                onChange={(e) => setHu(e.target.value as typeof hu)}
                className="rounded-md border border-brand-divider bg-brand-canvas px-2 py-1.5 text-[12px] text-brand-ink outline-none focus:border-brand-primary"
              >
                <option value="auto">auto</option>
                <option value="px">px</option>
                <option value="vh">vh</option>
                <option value="%">%</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onApply("", "auto", "", "auto")}
            className="text-[12px] text-brand-text hover:text-brand-ink"
          >
            Reset to layout default
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-brand-divider px-3 py-1.5 text-[13px] text-brand-ink hover:bg-brand-surface-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onApply(w, wu, h, hu)}
              className="rounded-md bg-brand-primary px-3 py-1.5 text-[13px] font-medium text-brand-canvas hover:bg-brand-primary-strong"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
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
    ? `<link rel="stylesheet" href="${fontsHref}" data-studio-injected crossorigin>`
    : "";
  // Wrap the bridge script in a tagged <script data-studio-injected>...</script>
  // so get-html can strip it from the saved HTML cleanly. Without the tag, the
  // bridge gets baked into every save and accumulates copies in the persisted
  // HTML (4 copies after just a few saves in our last test).
  // Bridge script for editor interactions inside the iframe.
  // Three responsibilities:
  //   1. TEXT EDITING — scoped contenteditable=plaintext-only on leaf
  //      text elements. Whole-body contenteditable was destructive.
  //   2. IMAGE SWAP — every <img> gets a click handler that opens the
  //      studio's image picker. Studio replies with a new src.
  //   3. SECTION REORDER — every direct top-level child of <body> gets
  //      a small ↑ / ↓ overlay; click swaps with the adjacent sibling.
  const bridge = `
<script data-studio-injected>
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
    let editIdCounter = 0;
    function nextEditId(prefix) { return prefix + '-' + (++editIdCounter); }

    document.querySelectorAll('img').forEach((img) => {
      const id = nextEditId('edit-img');
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

    /* ---------- 2b. BACKGROUND IMAGE SWAP — for sections with CSS bg ---------- */
    function extractBgUrl(bg) {
      // Returns a URL if backgroundImage is "url(...)", null for none/gradients
      if (!bg || bg === 'none') return null;
      const m = bg.match(/url\\(\\s*["']?([^"')]+)["']?\\s*\\)/);
      return m ? m[1] : null;
    }
    function makeBgBadge(target) {
      const id = nextEditId('edit-bg');
      target.setAttribute('data-edit-bg-id', id);
      const cs = getComputedStyle(target);
      if (cs.position === 'static') target.style.position = 'relative';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('data-studio-overlay', 'true');
      btn.title = 'Replace background image';
      btn.textContent = '🖼  Background';
      btn.style.cssText = [
        'position:absolute','top:8px','left:8px','z-index:99999',
        'padding:4px 8px','border:none','border-radius:6px',
        'background:rgba(91,143,185,0.92)','color:#fff','font:600 11px/1 system-ui,sans-serif',
        'cursor:pointer','box-shadow:0 1px 4px rgba(0,0,0,0.25)',
        'opacity:0','transition:opacity 0.15s','letter-spacing:0.04em',
      ].join(';');
      btn.addEventListener('mouseenter', () => { btn.style.opacity = '1'; });
      btn.addEventListener('click', (ev) => {
        ev.preventDefault(); ev.stopPropagation();
        const cur = extractBgUrl(getComputedStyle(target).backgroundImage) || '';
        parent.postMessage({ type: 'pick-background', editId: id, currentSrc: cur }, '*');
      });
      target.appendChild(btn);
      target.addEventListener('mouseenter', () => { btn.style.opacity = '0.85'; });
      target.addEventListener('mouseleave', () => { btn.style.opacity = '0'; });
    }
    document.querySelectorAll('*').forEach((el) => {
      if (el === document.body || el.tagName === 'IMG' || el.hasAttribute('data-studio-overlay')) return;
      const url = extractBgUrl(getComputedStyle(el).backgroundImage);
      if (url) makeBgBadge(el);
    });

    /* ---------- 3. SECTION REORDER — ↑ / ↓ on top-level children ---------- */
    function makeOverlayBtn(target, opts) {
      // opts: { top, label, content, onClick }
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('data-studio-overlay', 'true');
      btn.title = opts.label;
      btn.textContent = opts.content;
      btn.style.cssText = [
        'position:absolute',
        'top:' + opts.top + 'px',
        'right:12px',
        'z-index:99999',
        'min-width:32px','height:28px','padding:0 10px',
        'border:none','border-radius:6px',
        'background:rgba(91,143,185,0.92)',
        'color:#fff','font:600 12px/1 system-ui,sans-serif',
        'cursor:pointer','box-shadow:0 2px 8px rgba(0,0,0,0.35)',
        // Always visible at low opacity so customers can SEE the controls
        // without having to hover-discover them; full opacity on hover.
        'opacity:0.55','transition:opacity 0.15s,transform 0.15s,background 0.15s',
        'display:inline-flex','align-items:center','justify-content:center','gap:5px',
        'letter-spacing:0.02em',
      ].join(';');
      btn.addEventListener('mouseenter', () => {
        btn.style.opacity = '1';
        btn.style.transform = 'scale(1.05)';
        btn.style.background = 'rgba(67,118,160,1)';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
        btn.style.background = 'rgba(91,143,185,0.92)';
      });
      btn.addEventListener('click', (ev) => { ev.preventDefault(); ev.stopPropagation(); opts.onClick(); });
      return btn;
    }

    function attachOverlay(target) {
      const cs = getComputedStyle(target);
      if (cs.position === 'static') target.style.position = 'relative';
      const sizeId = nextEditId('edit-size');
      target.setAttribute('data-edit-size-id', sizeId);

      const drag = makeOverlayBtn(target, { top: 12, label: 'Drag to reorder section', content: '⠿ Drag', onClick: () => {} });
      drag.style.cursor = 'grab';
      drag.setAttribute('data-studio-drag-handle', 'true');
      drag.addEventListener('pointerdown', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        drag.style.cursor = 'grabbing';
        startSectionDrag(target, ev, () => { drag.style.cursor = 'grab'; });
      });

      const size = makeOverlayBtn(target, { top: 46, label: 'Resize section', content: '⇲ Size', onClick: () => {
        // Surface current size + position to the studio so it can render
        // a popover next to the section.
        const r = target.getBoundingClientRect();
        const inlineW = target.style.width;
        const inlineH = target.style.height;
        function parse(val) {
          if (!val) return { num: '', unit: 'auto' };
          const m = val.match(/^([0-9.]+)(px|%|vw|vh)?$/);
          if (!m) return { num: '', unit: 'auto' };
          return { num: m[1], unit: m[2] || 'px' };
        }
        const wParsed = parse(inlineW);
        const hParsed = parse(inlineH);
        parent.postMessage({
          type: 'open-size',
          editId: sizeId,
          rect: { left: r.left, top: r.top, width: r.width, height: r.height },
          size: {
            width: wParsed.num,
            widthUnit: wParsed.unit === 'vh' ? 'auto' : wParsed.unit,
            height: hParsed.num,
            heightUnit: hParsed.unit === 'vw' ? 'auto' : hParsed.unit,
          },
        }, '*');
      } });

      target.appendChild(drag); target.appendChild(size);
      target.addEventListener('mouseenter', () => {
        drag.style.opacity = '1'; size.style.opacity = '1';
        target.style.outline = '2px dashed rgba(91,143,185,0.5)';
        target.style.outlineOffset = '-2px';
      });
      target.addEventListener('mouseleave', () => {
        drag.style.opacity = '0.55'; size.style.opacity = '0.55';
        target.style.outline = '';
      });
    }

    /* ---------- Drag-and-drop with snap zones (sections OR sub-elements) ---------- */
    let dragInProgress = false;
    function startSectionDrag(target, downEv, onEnd) {
      const parent = target.parentElement;
      if (!parent) { onEnd(); return; }
      // Siblings = any visible, non-overlay, non-script element under the parent.
      const siblings = Array.from(parent.children).filter((c) => {
        if (c.hasAttribute && c.hasAttribute('data-studio-overlay')) return false;
        if (c.tagName === 'SCRIPT' || c.tagName === 'STYLE') return false;
        const cr = c.getBoundingClientRect();
        return cr.width > 0 && cr.height > 0;
      });
      if (siblings.length < 2) { onEnd(); return; }

      // Detect layout axis: horizontal if the first two siblings sit side-by-side
      // and overlap vertically, otherwise vertical.
      const a = siblings[0].getBoundingClientRect();
      const b = siblings[1].getBoundingClientRect();
      const horizontal =
        b.left >= a.left + a.width / 2 && b.top < a.bottom && b.bottom > a.top;

      // Snap zones — one before each sibling, plus one after the last.
      const zones = [];
      siblings.forEach((s) => {
        const sr = s.getBoundingClientRect();
        if (horizontal) zones.push({ x: sr.left + window.scrollX, before: s });
        else zones.push({ y: sr.top + window.scrollY, before: s });
      });
      const lastSib = siblings[siblings.length - 1];
      const lastR = lastSib.getBoundingClientRect();
      if (horizontal) zones.push({ x: lastR.right + window.scrollX, before: null });
      else zones.push({ y: lastR.bottom + window.scrollY, before: null });

      // Ghost — clone of target that follows the cursor.
      const r = target.getBoundingClientRect();
      const ghost = target.cloneNode(true);
      ghost.querySelectorAll('[data-studio-overlay]').forEach((n) => n.remove());
      ghost.querySelectorAll('[contenteditable]').forEach((n) => n.removeAttribute('contenteditable'));
      ghost.setAttribute('data-studio-overlay', 'true');
      ghost.style.cssText = [
        'position:fixed','left:' + r.left + 'px','top:' + r.top + 'px',
        'width:' + r.width + 'px','max-height:220px','overflow:hidden',
        'pointer-events:none','z-index:99998','opacity:0.85',
        'transform:scale(0.95)','transform-origin:top left',
        'box-shadow:0 16px 40px rgba(0,0,0,0.4)',
        'border:2px solid rgba(91,143,185,1)','border-radius:8px',
        'background:#fff',
      ].join(';');
      document.body.appendChild(ghost);

      const origOpacity = target.style.opacity;
      const origOutline = target.style.outline;
      target.style.opacity = '0.25';
      target.style.outline = '2px dashed rgba(91,143,185,0.85)';
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
      dragInProgress = true;

      // Snap line — vertical bar (horizontal layout) or horizontal bar (vertical layout).
      const indicator = document.createElement('div');
      indicator.setAttribute('data-studio-overlay', 'true');
      const baseStyle = horizontal
        ? [
            'position:absolute',
            'top:' + (r.top + window.scrollY) + 'px',
            'height:' + r.height + 'px','width:4px',
            'transition:left 80ms ease-out','left:-9999px',
          ]
        : [
            'position:absolute',
            'left:' + (r.left + window.scrollX) + 'px',
            'width:' + r.width + 'px','height:4px',
            'transition:top 80ms ease-out','top:-9999px',
          ];
      indicator.style.cssText = baseStyle.concat([
        'background:#5b8fb9','border-radius:2px',
        'box-shadow:0 0 12px rgba(91,143,185,0.9)',
        'z-index:99997','pointer-events:none',
      ]).join(';');
      document.body.appendChild(indicator);

      const offsetX = downEv.clientX - r.left;
      const offsetY = downEv.clientY - r.top;
      let activeZone = null;

      function onMove(ev) {
        ghost.style.left = (ev.clientX - offsetX) + 'px';
        ghost.style.top = (ev.clientY - offsetY) + 'px';
        let best = null, bestDist = Infinity;
        if (horizontal) {
          const pX = ev.clientX + window.scrollX;
          for (const z of zones) {
            const d = Math.abs(z.x - pX);
            if (d < bestDist) { bestDist = d; best = z; }
          }
          if (best) indicator.style.left = (best.x - 2) + 'px';
        } else {
          const pY = ev.clientY + window.scrollY;
          for (const z of zones) {
            const d = Math.abs(z.y - pY);
            if (d < bestDist) { bestDist = d; best = z; }
          }
          if (best) indicator.style.top = (best.y - 2) + 'px';
        }
        activeZone = best;
      }

      function cleanup() {
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
        document.removeEventListener('pointercancel', onUp);
        ghost.remove();
        indicator.remove();
        target.style.opacity = origOpacity;
        target.style.outline = origOutline;
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        dragInProgress = false;
        onEnd();
      }

      function onUp() {
        if (activeZone && activeZone.before !== target && activeZone.before !== target.nextSibling) {
          parent.insertBefore(target, activeZone.before);
          document.dispatchEvent(new Event('input', { bubbles: true }));
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        cleanup();
      }

      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
      document.addEventListener('pointercancel', onUp);
      onMove(downEv);
    }

    /* ---------- Floating ⠿ handle for sub-element drag ----------
     * A single button that hovers over whichever in-section element the
     * cursor is on (paragraphs, buttons, list items, anything with a
     * sibling). Click + drag the handle to reorder that element among
     * its siblings — re-uses startSectionDrag for snap behavior.
     */
    const itemHandle = document.createElement('button');
    itemHandle.type = 'button';
    itemHandle.setAttribute('data-studio-overlay', 'true');
    itemHandle.setAttribute('data-studio-item-handle', 'true');
    itemHandle.title = 'Drag to reorder';
    itemHandle.textContent = '⠿';
    itemHandle.style.cssText = [
      'position:absolute','z-index:99996',
      'width:22px','height:22px','padding:0',
      'border:none','border-radius:4px',
      'background:rgba(91,143,185,0.95)','color:#fff',
      'font:600 14px/1 system-ui,sans-serif',
      'cursor:grab','box-shadow:0 1px 4px rgba(0,0,0,0.35)',
      'display:none','align-items:center','justify-content:center',
      'pointer-events:auto','opacity:0.92',
      'top:-9999px','left:-9999px',
    ].join(';');
    document.body.appendChild(itemHandle);

    let hoverTarget = null;
    let hoverOutlineEl = null;

    function findMovableItem(el) {
      let cur = el;
      while (cur && cur !== document.body && cur !== document.documentElement) {
        if (cur.hasAttribute && cur.hasAttribute('data-studio-overlay')) {
          cur = cur.parentElement; continue;
        }
        if (seenSections.has(cur)) return null; // sections have their own handle
        const p = cur.parentElement;
        if (p && p !== document.body) {
          const sibs = Array.from(p.children).filter((s) => {
            if (s === cur) return false;
            if (s.hasAttribute && s.hasAttribute('data-studio-overlay')) return false;
            if (s.tagName === 'SCRIPT' || s.tagName === 'STYLE') return false;
            const sr = s.getBoundingClientRect();
            return sr.width > 0 && sr.height > 0;
          });
          if (sibs.length >= 1) {
            const r = cur.getBoundingClientRect();
            if (r.width >= 24 && r.height >= 16) return cur;
          }
        }
        cur = cur.parentElement;
      }
      return null;
    }

    function showItemHandle(t) {
      if (hoverOutlineEl && hoverOutlineEl !== t) {
        hoverOutlineEl.style.outline = hoverOutlineEl._studioOrigOutline || '';
      }
      hoverTarget = t;
      if (!t) {
        itemHandle.style.display = 'none';
        hoverOutlineEl = null;
        return;
      }
      const r = t.getBoundingClientRect();
      itemHandle.style.display = 'flex';
      itemHandle.style.left = (r.right - 24 + window.scrollX) + 'px';
      itemHandle.style.top = (r.top + 4 + window.scrollY) + 'px';
      if (hoverOutlineEl !== t) {
        t._studioOrigOutline = t.style.outline;
        t.style.outline = '1px dashed rgba(91,143,185,0.7)';
        t.style.outlineOffset = '2px';
        hoverOutlineEl = t;
      }
    }

    // Use setTimeout, not requestAnimationFrame: srcdoc iframes can have rAF
    // throttled when no real user input is happening, which would leave the
    // floating handle stuck at -9999px.
    let mmTimer = null;
    let lastMM = null;
    document.addEventListener('mousemove', (ev) => {
      if (dragInProgress) return;
      if (ev.target === itemHandle) return;
      lastMM = ev;
      if (mmTimer) return;
      mmTimer = setTimeout(() => {
        mmTimer = null;
        if (!lastMM) return;
        const t = document.elementFromPoint(lastMM.clientX, lastMM.clientY);
        if (!t || t === itemHandle) return;
        const candidate = findMovableItem(t);
        if (candidate !== hoverTarget) showItemHandle(candidate);
      }, 30);
    });

    itemHandle.addEventListener('pointerdown', (ev) => {
      if (!hoverTarget) return;
      ev.preventDefault(); ev.stopPropagation();
      const t = hoverTarget;
      itemHandle.style.display = 'none';
      itemHandle.style.cursor = 'grabbing';
      if (hoverOutlineEl) {
        hoverOutlineEl.style.outline = hoverOutlineEl._studioOrigOutline || '';
        hoverOutlineEl = null;
      }
      startSectionDrag(t, ev, () => {
        itemHandle.style.cursor = 'grab';
        hoverTarget = null;
      });
    });

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

    /* ---------- Reposition badge for swapped images ----------
     * Swapped images (those with inline object-fit:cover) get a small
     * "↔ Reposition" badge that, when clicked, arms a "click-the-image-
     * to-set-object-position" mode. The next click on the image sets
     * object-position to that x,y as percentages, sliding the visible
     * crop window. Click outside the image to cancel without changing.
     */
    function enableReposition(img) {
      if (img.hasAttribute('data-studio-reposition-wired')) return;
      img.setAttribute('data-studio-reposition-wired', 'true');
      const wrap = img.parentElement;
      if (!wrap) return;
      const wrapCs = getComputedStyle(wrap);
      if (wrapCs.position === 'static') wrap.style.position = 'relative';

      const badge = document.createElement('button');
      badge.type = 'button';
      badge.setAttribute('data-studio-overlay', 'true');
      badge.title = 'Drag the crop position';
      badge.textContent = '↔ Reposition';
      badge.style.cssText = [
        'position:absolute','top:8px','right:8px','z-index:99999',
        'padding:4px 8px','border:none','border-radius:6px',
        'background:rgba(91,143,185,0.92)','color:#fff','font:600 11px/1 system-ui,sans-serif',
        'cursor:pointer','box-shadow:0 1px 4px rgba(0,0,0,0.25)',
        'opacity:0','transition:opacity 0.15s','letter-spacing:0.04em',
      ].join(';');
      wrap.appendChild(badge);
      img.addEventListener('mouseenter', () => { badge.style.opacity = '1'; });
      wrap.addEventListener('mouseleave', () => { badge.style.opacity = '0'; });

      let armed = false;
      let onImgClick;
      let onCancel;
      function arm() {
        armed = true;
        img.style.outline = '2px solid rgba(91,143,185,0.85)';
        img.style.cursor = 'crosshair';
        badge.textContent = 'click image…';
        onImgClick = (ev) => {
          if (!armed) return;
          const r = img.getBoundingClientRect();
          const x = Math.max(0, Math.min(100, ((ev.clientX - r.left) / r.width) * 100));
          const y = Math.max(0, Math.min(100, ((ev.clientY - r.top) / r.height) * 100));
          const existing = img.getAttribute('style') || '';
          const cleaned = existing.replace(/object-position:[^;]*;?/gi, '');
          img.setAttribute('style', cleaned + ';object-position:' + x.toFixed(1) + '% ' + y.toFixed(1) + '%;');
          disarm();
          document.dispatchEvent(new Event('input', { bubbles: true }));
          ev.preventDefault();
          ev.stopPropagation();
        };
        onCancel = (ev) => {
          if (ev.target === img || ev.target === badge) return;
          disarm();
        };
        img.addEventListener('click', onImgClick, true);
        setTimeout(() => document.addEventListener('click', onCancel, true), 0);
      }
      function disarm() {
        armed = false;
        img.style.outline = '';
        img.style.cursor = 'pointer';
        badge.textContent = '↔ Reposition';
        if (onImgClick) img.removeEventListener('click', onImgClick, true);
        if (onCancel) document.removeEventListener('click', onCancel, true);
      }
      badge.addEventListener('click', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        if (armed) disarm(); else arm();
      });
    }
    document.querySelectorAll('img[style*="object-fit"]').forEach((img) => enableReposition(img));

    /* ---------- Visual styles ---------- */
    const editStyle = document.createElement('style');
    editStyle.setAttribute('data-studio-injected', 'true');
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
        // Strip every editor artifact from the snapshot we hand back so the
        // saved HTML doesn't bake in editor chrome OR the bridge script
        // itself (which would re-run on next load and accumulate copies).
        const clone = document.body.cloneNode(true);
        clone.querySelectorAll('[data-studio-overlay]').forEach((n) => n.remove());
        clone.querySelectorAll('[data-studio-injected]').forEach((n) => n.remove());
        clone.querySelectorAll('[contenteditable]').forEach((n) => n.removeAttribute('contenteditable'));
        clone.querySelectorAll('[data-edit-id]').forEach((n) => n.removeAttribute('data-edit-id'));
        clone.querySelectorAll('[data-edit-bg-id]').forEach((n) => n.removeAttribute('data-edit-bg-id'));
        clone.querySelectorAll('[data-edit-size-id]').forEach((n) => n.removeAttribute('data-edit-size-id'));
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
          // APPEND, not prepend — the AI's :root rule lives somewhere
          // earlier in the body's style blocks; an override that appears
          // first in the cascade gets beaten by it. Putting our overrides
          // last makes them win on equal specificity.
          const styleEl = '<style data-studio-brand-overrides>:root{' + overrides.join('') + '}</style>';
          html = html + styleEl;
        }
        parent.postMessage({ type: 'html', html }, '*');
      } else if (m.type === 'set-image-src' && m.editId && typeof m.src === 'string') {
        const img = document.querySelector('img[data-edit-id="' + m.editId + '"]');
        if (img) {
          // Capture the slot's CURRENT rendered size BEFORE swapping so we
          // can lock the replacement to the same footprint.
          const rect = img.getBoundingClientRect();
          const slotW = Math.round(rect.width);
          const slotH = Math.round(rect.height);
          if (slotW > 0 && slotH > 0) {
            img.setAttribute('width', String(slotW));
            img.setAttribute('height', String(slotH));
            const existing = img.getAttribute('style') || '';
            const cleaned = existing.replace(/object-fit:[^;]*;?/gi, '').replace(/object-position:[^;]*;?/gi, '');
            img.setAttribute(
              'style',
              cleaned + ';object-fit:cover;object-position:center;width:' + slotW + 'px;height:' + slotH + 'px;'
            );
          }
          img.setAttribute('src', m.src);
          img.removeAttribute('srcset');
          img.removeAttribute('data-lazy-src');
          img.removeAttribute('data-lazy-srcset');
          img.removeAttribute('sizes');
          // Attach a one-shot click-to-reposition handler so the customer
          // can shift the crop window by clicking somewhere on the image.
          enableReposition(img);
          document.dispatchEvent(new Event('input', { bubbles: true }));
        }
      } else if (m.type === 'enter-reposition' && m.editId) {
        const img = document.querySelector('img[data-edit-id="' + m.editId + '"]');
        if (img) enableReposition(img);
      } else if (m.type === 'set-background' && m.editId && typeof m.src === 'string') {
        const target = document.querySelector('[data-edit-bg-id="' + m.editId + '"]');
        if (target) {
          const existing = target.getAttribute('style') || '';
          const cleaned = existing.replace(/background-image:[^;]*;?/gi, '');
          // Use !important to defeat the AI's CSS class background-image.
          target.setAttribute(
            'style',
            cleaned + ';background-image:url("' + m.src + '") !important;background-size:cover;background-position:center;'
          );
          document.dispatchEvent(new Event('input', { bubbles: true }));
        }
      } else if (m.type === 'set-size' && m.editId) {
        const target = document.querySelector('[data-edit-size-id="' + m.editId + '"]');
        if (target) {
          const existing = target.getAttribute('style') || '';
          let cleaned = existing.replace(/(^|;)\\s*width\\s*:[^;]*/gi, '').replace(/(^|;)\\s*height\\s*:[^;]*/gi, '');
          if (typeof m.width === 'string' && m.width !== 'auto') cleaned += ';width:' + m.width;
          if (typeof m.height === 'string' && m.height !== 'auto') cleaned += ';height:' + m.height;
          // Make sure absolute-position-relative stays on so reorder/bg buttons remain anchored.
          target.setAttribute('style', cleaned);
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
