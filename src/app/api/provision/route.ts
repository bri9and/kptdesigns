import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { provisionSite } from "@/lib/provision";
import { createServiceClient } from "@/lib/supabase";
import rateLimit from "@/lib/rate-limit";

const limiter = rateLimit({ interval: 60_000, uniqueTokenPerInterval: 500 });

/**
 * POST /api/provision
 *
 * Master provisioning endpoint — orchestrates the full pipeline:
 * GitHub repo → Vercel project → DNS → Supabase.
 *
 * Called after successful domain purchase + site design payment.
 */
export async function POST(req: NextRequest) {
  // ── Auth check ──
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── Rate limit by authenticated user ──
  const { success } = limiter.check(30, userId);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  // ── Parse + validate input ──
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { customerId, domainName, sitePrompt, orderId } = body as {
    customerId?: string;
    domainName?: string;
    sitePrompt?: string;
    orderId?: string;
  };

  if (!customerId || typeof customerId !== "string") {
    return NextResponse.json({ error: "customerId is required" }, { status: 400 });
  }
  if (!domainName || typeof domainName !== "string") {
    return NextResponse.json({ error: "domainName is required" }, { status: 400 });
  }
  if (!sitePrompt || typeof sitePrompt !== "string") {
    return NextResponse.json({ error: "sitePrompt is required" }, { status: 400 });
  }
  if (!orderId || typeof orderId !== "string") {
    return NextResponse.json({ error: "orderId is required" }, { status: 400 });
  }

  // ── Ownership check: verify the authenticated user owns this customer record ──
  const supabase = createServiceClient();
  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .select("clerk_id")
    .eq("id", customerId)
    .single();

  if (customerError || !customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  if ((customer as { clerk_id: string }).clerk_id !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // ── Sanitize domain ──
  const cleanDomain = domainName
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "");

  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z]{2,})+$/.test(cleanDomain)) {
    return NextResponse.json({ error: "Invalid domain name" }, { status: 400 });
  }

  // ── Run provisioning pipeline ──
  try {
    const result = await provisionSite({
      customerId,
      domainName: cleanDomain,
      sitePrompt,
      orderId,
    });

    const status = result.success ? 200 : 207; // 207 Multi-Status if partial
    return NextResponse.json(result, { status });
  } catch (err) {
    console.error("[Provision] Unexpected error:", err);
    return NextResponse.json(
      { error: "Provisioning failed unexpectedly", detail: String(err) },
      { status: 500 }
    );
  }
}
