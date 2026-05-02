"use client";

/**
 * /start — the self-serve preview funnel entry.
 *
 * Paste a URL (or describe your business), POST to /api/start,
 * watch a flavor loading state, and get pushed to /preview/[id]
 * when the AI is done.
 *
 * Note: this page reads ?url= via useSearchParams, which makes it
 * client-only (no static prerender). The default export wraps the
 * actual page in a Suspense boundary as Next.js requires when
 * useSearchParams is used in a Client Component.
 */
import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Link2 } from "lucide-react";

import { SectionLabel } from "@/components/earthy/section-label";
import { RevealRoot } from "@/components/earthy/reveal";

const PROGRESS_LINES = [
  "Reading your site…",
  "Listening to what you do…",
  "Choosing the right blocks…",
  "Picking colors that work for you…",
  "Writing copy in your voice…",
  "Composing the layout…",
];

const STEPS = [
  {
    n: "01",
    title: "Read",
    body: "We pull every word, image, and link from your existing site.",
  },
  {
    n: "02",
    title: "Refine",
    body: "Our AI studies what your business does and writes you a better version.",
  },
  {
    n: "03",
    title: "Render",
    body: "You see a real, scrollable preview in our boutique style — yours to keep or remix.",
  },
];

export default function StartPage() {
  return (
    <Suspense fallback={null}>
      <StartPageInner />
    </Suspense>
  );
}

function StartPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNotes, setShowNotes] = useState(false);
  const [showExtract, setShowExtract] = useState(false);
  const [progressIdx, setProgressIdx] = useState(0);

  // Prefill from ?url= when arriving from the homepage hero search.
  // If a URL is present, auto-submit so the customer doesn't have to
  // press the button a second time.
  useEffect(() => {
    const initial = searchParams.get("url")?.trim();
    if (!initial || !inputRef.current || !formRef.current) return;
    inputRef.current.value = initial;
    formRef.current.requestSubmit();
    // We only want this on initial mount; deps array intentionally narrow.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cycle the flavor progress lines while the request is in flight.
  useEffect(() => {
    if (!submitting) return;
    const id = setInterval(() => {
      setProgressIdx((i) => (i + 1) % PROGRESS_LINES.length);
    }, 3000);
    return () => clearInterval(id);
  }, [submitting]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const urlInput = form.elements.namedItem("url") as HTMLInputElement | null;
    const notesArea = form.elements.namedItem(
      "notes",
    ) as HTMLTextAreaElement | null;

    const url = urlInput?.value.trim() ?? "";
    const notes = notesArea?.value.trim() ?? "";

    if (!url && !notes) {
      setError("Paste a URL or describe what your business does.");
      return;
    }

    setError(null);
    setSubmitting(true);
    setProgressIdx(0);

    try {
      const res = await fetch("/api/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url || undefined,
          notes: notes || undefined,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        id?: string;
        status?: string;
        error?: string;
      };

      if (!res.ok || data.status !== "ready" || !data.id) {
        setError(
          data.error ?? "We couldn't generate your preview. Please try again.",
        );
        setSubmitting(false);
        return;
      }

      router.push(`/preview/${data.id}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Network error — please try again.",
      );
      setSubmitting(false);
    }
  }

  return (
    <>
      <RevealRoot />

      <section className="relative overflow-hidden bg-gradient-to-b from-brand-canvas to-brand-surface pt-32 pb-16">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <SectionLabel>Free preview</SectionLabel>

          <h1
            className="mt-6 font-[family-name:var(--brand-serif-font)] italic leading-[1.05] tracking-tight text-brand-ink"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
          >
            Show us where you are. We&apos;ll show you where you could be.
          </h1>

          <p className="mx-auto mt-6 max-w-[640px] font-[family-name:var(--brand-body-font)] text-[1.15rem] leading-relaxed text-brand-text">
            Paste your existing website (or a Facebook page, or a Google
            listing, or just describe what you do). We&apos;ll scrape it, study
            it, and rebuild it as a boutique-grade site in under a minute. No
            signup. No credit card.
          </p>

          {submitting ? (
            <GeneratingState line={PROGRESS_LINES[progressIdx]} />
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mx-auto mt-10 w-full max-w-[720px]"
            >
              <div className="flex items-center rounded-full border border-brand-divider bg-brand-canvas py-2 pr-2 pl-7 shadow-[var(--brand-shadow-sm)] transition-all duration-300 hover:border-transparent hover:shadow-[var(--brand-shadow-md)] focus-within:border-transparent focus-within:shadow-[var(--brand-shadow-md)]">
                <Link2 className="mr-3.5 h-5 w-5 flex-shrink-0 text-brand-text-muted" />
                <input
                  ref={inputRef}
                  name="url"
                  type="text"
                  inputMode="url"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="ciriglianoplumbingllc.com"
                  className="flex-1 border-none bg-transparent py-2.5 font-[family-name:var(--brand-body-font)] text-base text-brand-ink outline-none placeholder:text-brand-text"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 cursor-pointer rounded-full border-none bg-brand-primary px-7 py-3 font-[family-name:var(--brand-display-font)] text-sm font-medium text-brand-canvas transition-all duration-200 hover:bg-brand-primary-strong hover:shadow-[0_2px_12px_rgba(197,103,56,0.4)]"
                >
                  Build my preview →
                </button>
              </div>

              {showNotes ? (
                <textarea
                  name="notes"
                  rows={4}
                  placeholder="Tell us what your business does, who you serve, and what makes you you."
                  className="mt-4 w-full resize-none rounded-2xl border border-brand-divider bg-brand-canvas px-5 py-4 font-[family-name:var(--brand-body-font)] text-base text-brand-ink shadow-[var(--brand-shadow-sm)] outline-none transition-all duration-200 placeholder:text-brand-text focus:border-transparent focus:shadow-[var(--brand-shadow-md)]"
                />
              ) : null}

              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-[family-name:var(--brand-body-font)] text-sm text-brand-text-strong">
                <button
                  type="button"
                  onClick={() => setShowNotes((s) => !s)}
                  className="cursor-pointer underline-offset-4 transition-colors hover:text-brand-primary hover:underline"
                >
                  {showNotes ? "Just use the URL" : "Don't have a site?"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowExtract((s) => !s)}
                  className="cursor-pointer underline-offset-4 transition-colors hover:text-brand-primary hover:underline"
                  aria-expanded={showExtract}
                >
                  What we extract
                </button>

                <span
                  className="cursor-help underline-offset-4 hover:underline"
                  title="~30 seconds."
                >
                  How long it takes
                </span>
              </div>

              {showExtract ? (
                <div className="mx-auto mt-4 max-w-[520px] rounded-2xl border border-brand-divider bg-brand-canvas/60 px-6 py-4 text-left font-[family-name:var(--brand-body-font)] text-sm leading-relaxed text-brand-text">
                  <p className="mb-2 font-[family-name:var(--brand-display-font)] font-medium text-brand-ink">
                    From your existing site we read:
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-brand-text-strong">
                    <li>Headlines, services, and your written voice</li>
                    <li>Contact info, hours, and service area</li>
                    <li>Photos, logos, and testimonials</li>
                    <li>Page structure and internal navigation</li>
                  </ul>
                </div>
              ) : null}

              {error ? (
                <p className="mx-auto mt-5 max-w-[520px] font-[family-name:var(--brand-body-font)] text-sm text-red-700">
                  {error}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </section>

      <section className="bg-brand-surface pb-24">
        <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-10 px-6 text-left md:grid-cols-3 md:gap-8">
          {STEPS.map((step) => (
            <div key={step.n}>
              <p className="font-[family-name:var(--brand-mono-font)] text-xs tracking-[0.2em] text-brand-primary">
                {step.n}
              </p>
              <h3 className="mt-3 font-[family-name:var(--brand-display-font)] text-[1.35rem] font-semibold text-brand-ink">
                {step.title}
              </h3>
              <p className="mt-2 font-[family-name:var(--brand-body-font)] text-base leading-relaxed text-brand-text-strong">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-24 max-w-xl px-6 text-center font-[family-name:var(--brand-body-font)] text-sm text-brand-text-strong">
          Generation costs us ~$0.20 per preview. We rate-limit at 3 per IP per
          day.
        </p>
      </section>
    </>
  );
}

function GeneratingState({ line }: { line: string }) {
  return (
    <div className="mt-14 flex flex-col items-center">
      <h2 className="font-[family-name:var(--brand-serif-font)] text-[clamp(1.5rem,3vw,2rem)] italic text-brand-ink">
        Generating your preview&hellip;
      </h2>

      <div className="mt-8 flex justify-center gap-2.5">
        <span
          className="h-3 w-3 rounded-full bg-brand-primary"
          style={{ animation: "earthyBounce 1.4s ease-in-out 0s infinite" }}
        />
        <span
          className="h-3 w-3 rounded-full bg-brand-accent-1"
          style={{
            animation: "earthyBounce 1.4s ease-in-out 0.15s infinite",
          }}
        />
        <span
          className="h-3 w-3 rounded-full bg-brand-accent-2"
          style={{
            animation: "earthyBounce 1.4s ease-in-out 0.3s infinite",
          }}
        />
        <span
          className="h-3 w-3 rounded-full bg-brand-accent-3"
          style={{
            animation: "earthyBounce 1.4s ease-in-out 0.45s infinite",
          }}
        />
      </div>

      <p
        key={line}
        className="mt-8 min-h-[1.75rem] font-[family-name:var(--brand-body-font)] text-[0.95rem] text-brand-text"
        style={{ animation: "earthyFadeUp 0.6s var(--earthy-ease) both" }}
      >
        {line}
      </p>
    </div>
  );
}
