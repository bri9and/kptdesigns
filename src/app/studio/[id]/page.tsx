/**
 * /studio/[id] — backoffice editor for a generated customer site.
 *
 * Conceptually this is the post-payment, post-claim surface where a
 * logged-in customer refines their site. For tonight it operates on
 * the same anonymous intake_job the preview uses, with no Clerk
 * gating, so you can land here straight from /preview/<id> by
 * swapping the path.
 *
 * Server component: loads the job + brand profile, hands the
 * generated HTML and brand controls to the client editor.
 */
import { readIntakeJob, type IntakeJob } from "@/lib/intake-store";
import { buildGoogleFontsHref } from "@/lib/pipeline/agents/building/theme";
import { Studio } from "./Studio";
import Link from "next/link";

type PageProps = { params: Promise<{ id: string }> };

async function safeReadIntakeJob(id: string): Promise<IntakeJob | null> {
  try {
    return await readIntakeJob(id);
  } catch {
    return null;
  }
}

export const metadata = {
  title: "Studio — KPT Designs",
  robots: { index: false, follow: false },
};

export default async function StudioPage({ params }: PageProps) {
  const { id } = await params;
  const job = await safeReadIntakeJob(id);

  if (!job) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-canvas px-6">
        <div className="w-full max-w-[480px] rounded-2xl border border-brand-divider bg-brand-canvas p-10 text-center">
          <h1 className="mb-3 font-[family-name:var(--brand-serif-font)] text-[clamp(1.6rem,3vw,2.25rem)] font-normal text-brand-ink">
            Site not found
          </h1>
          <p className="mb-6 text-brand-text">
            That studio link is invalid. Try generating a new site at{" "}
            <Link href="/start" className="text-brand-primary hover:underline">
              /start
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }

  if (job.status !== "ready" || !job.generated_html) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-canvas px-6">
        <div className="w-full max-w-[520px] rounded-2xl border border-brand-divider bg-brand-canvas p-10 text-center">
          <h1 className="mb-3 font-[family-name:var(--brand-serif-font)] text-[clamp(1.6rem,3vw,2.25rem)] font-normal italic text-brand-ink">
            Your site is still being built
          </h1>
          <p className="mb-6 text-brand-text">
            Watch the agents work at{" "}
            <Link href={`/preview/${id}`} className="text-brand-primary hover:underline">
              /preview/{id.slice(0, 8)}…
            </Link>
            . Come back here once it&rsquo;s ready.
          </p>
        </div>
      </div>
    );
  }

  const profile = job.findings?.brandProfile;
  const fontsHref = profile ? buildGoogleFontsHref(profile.fonts) : null;
  const curatedAssets = job.findings?.curatedAssets ?? [];

  // Scrub any editor artifacts that may have been baked into the saved HTML
  // by an older version of the bridge (which appended itself in <body> and
  // got captured in body.innerHTML on every save). We strip:
  //   - <script data-studio-injected>...</script>  (the bridge itself)
  //   - <style data-studio-injected>...</style>    (editor focus/hover styles)
  //   - <link data-studio-injected ...>            (studio-injected font links)
  // We KEEP <style data-studio-brand-overrides> — that one IS the customer's
  // saved palette and must persist.
  const cleanHtml = stripEditorArtifacts(job.generated_html);

  return (
    <Studio
      jobId={id}
      generatedHtml={cleanHtml}
      brandProfile={profile ?? null}
      sourceUrl={job.source_url ?? null}
      businessName={job.business_name ?? null}
      fontsHref={fontsHref ?? null}
      curatedAssets={curatedAssets}
      logoKey={job.findings?.logoKey ?? null}
    />
  );
}

function stripEditorArtifacts(html: string): string {
  return html
    .replace(/<script[^>]*data-studio-injected[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*data-studio-injected[\s\S]*?<\/style>/gi, "")
    .replace(/<link[^>]*data-studio-injected[^>]*>/gi, "")
    // Older saves may have added bridge scripts WITHOUT the data attribute —
    // those start with `(function(){` somewhere near the top. Strip <script>
    // blocks whose body opens with that signature.
    .replace(/<script>\s*\(function\(\)\{[\s\S]*?\}\)\(\);?\s*<\/script>/gi, "")
    // Older saves may also have un-tagged contenteditable focus styles.
    .replace(/<style>\s*\[contenteditable[\s\S]*?<\/style>/gi, "");
}
