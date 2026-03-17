import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getStripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * POST /api/hosting/manage
 *
 * Creates a Stripe Billing Portal session for the customer to manage
 * their hosting subscription (upgrade, downgrade, cancel, update payment).
 *
 * Input: { siteId: string }
 */
export async function POST(req: NextRequest) {
  // ── Auth ──
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── Parse input ──
  let body: { siteId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { siteId } = body;

  if (!siteId || typeof siteId !== "string") {
    return NextResponse.json({ error: "siteId is required" }, { status: 400 });
  }

  // ── Verify ownership ──
  const supabase = createServiceClient();

  const { data: customer, error: custErr } = await (supabase
    .from("customers") as any)
    .select("id")
    .eq("clerk_id", userId)
    .single();

  if (custErr || !customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  const { data: site, error: siteErr } = await (supabase
    .from("sites") as any)
    .select("id, customer_id")
    .eq("id", siteId)
    .single();

  if (siteErr || !site) {
    return NextResponse.json({ error: "Site not found" }, { status: 404 });
  }

  if (site.customer_id !== customer.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // ── Find the active subscription ──
  const { data: order } = await (supabase.from("orders") as any)
    .select("stripe_subscription_id")
    .eq("site_id", siteId)
    .eq("type", "hosting")
    .eq("status", "paid")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (!order?.stripe_subscription_id) {
    return NextResponse.json(
      { error: "No active subscription found for this site" },
      { status: 404 }
    );
  }

  // ── Get the Stripe customer ID from the subscription ──
  const origin = req.nextUrl.origin;

  try {
    const subscription = await getStripe().subscriptions.retrieve(
      order.stripe_subscription_id
    );

    const stripeCustomerId = typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

    // Create Billing Portal session
    const portalSession = await getStripe().billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${origin}/dashboard/sites/${siteId}/hosting`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (err) {
    console.error("[Hosting Manage] Stripe error:", err);
    return NextResponse.json(
      { error: "Failed to create billing portal session" },
      { status: 500 }
    );
  }
}
