import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createVercelProject, sanitizeRepoName } from "@/lib/provision";

/**
 * POST /api/provision/vercel
 *
 * Creates a Vercel project linked to a GitHub repo and adds the custom domain.
 * Standalone endpoint for granular control or retries.
 */
export async function POST(req: NextRequest) {
  // ── Auth check ──
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── Parse + validate input ──
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { repoName, domainName } = body as {
    repoName?: string;
    domainName?: string;
  };

  if (!repoName || typeof repoName !== "string") {
    return NextResponse.json({ error: "repoName is required" }, { status: 400 });
  }
  if (!domainName || typeof domainName !== "string") {
    return NextResponse.json({ error: "domainName is required" }, { status: 400 });
  }

  const cleanDomain = domainName
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "");

  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z]{2,})+$/.test(cleanDomain)) {
    return NextResponse.json({ error: "Invalid domain name" }, { status: 400 });
  }

  // Sanitize repo name the same way provision.ts does
  const sanitizedRepo = sanitizeRepoName(repoName);

  try {
    const project = await createVercelProject(sanitizedRepo, cleanDomain);

    return NextResponse.json({
      success: true,
      projectId: project.projectId,
      deploymentUrl: project.deploymentUrl,
    });
  } catch (err) {
    console.error("[Vercel] Project creation failed:", err);
    return NextResponse.json(
      { error: "Failed to create Vercel project", detail: String(err) },
      { status: 502 }
    );
  }
}
