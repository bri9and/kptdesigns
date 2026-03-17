import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getStripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase";
import { HOSTING_PLANS, isValidPlan } from "@/lib/hosting-plans";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * POST /api/hosting/checkout
 *
 * Creates a Stripe Checkout Session for a hosting subscription.
 * Input: { siteId: string, plan: 'essential' | 'care' | 'growth' }
 */
export async function POST(req: NextRequest) {
  // ── Auth ──
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── Parse input ──
  let body: { siteId?: string; plan?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { siteId, plan } = body;

  if (!siteId || typeof siteId !== "string") {
    return NextResponse.json({ error: "siteId is required" }, { status: 400 });
  }
  if (!plan || typeof plan !== "string" || !isValidPlan(plan)) {
    return NextResponse.json(
      { error: "plan must be one of: essential, care, growth" },
      { status: 400 }
    );
  }

  const selectedPlan = HOSTING_PLANS[plan];

  // ── Verify ownership ──
  const supabase = createServiceClient();

  const { data: customer, error: custErr } = await (supabase
    .from("customers") as any)
    .select("id, email")
    .eq("clerk_id", userId)
    .single();

  if (custErr || !customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  const { data: site, error: siteErr } = await (supabase
    .from("sites") as any)
    .select("id, name, customer_id")
    .eq("id", siteId)
    .single();

  if (siteErr || !site) {
    return NextResponse.json({ error: "Site not found" }, { status: 404 });
  }

  if (site.customer_id !== customer.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // ── Check for existing active subscription on this site ──
  const { data: existingOrders } = await (supabase
    .from("orders") as any)
    .select("id, stripe_subscription_id, status")
    .eq("site_id", siteId)
    .eq("type", "hosting")
    .eq("status", "paid");

  if (existingOrders && existingOrders.length > 0) {
    return NextResponse.json(
      {
        error: "This site already has an active hosting subscription. Use the manage endpoint to change plans.",
      },
      { status: 409 }
    );
  }

  // ── Create Stripe Checkout Session ──
  const origin = req.nextUrl.origin;

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: customer.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: selectedPlan.name,
              description: `${selectedPlan.tagline} — ${site.name}`,
            },
            unit_amount: selectedPlan.priceMonthly,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        siteId,
        customerId: customer.id,
        plan,
        siteName: site.name,
      },
      success_url: `${origin}/dashboard/sites?hosting=success`,
      cancel_url: `${origin}/dashboard/sites?hosting=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[Hosting Checkout] Stripe error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
