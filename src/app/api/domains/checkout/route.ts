import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getStripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase";

/* eslint-disable @typescript-eslint/no-explicit-any */

const NAMESILO_KEY = process.env.NAMESILO_API_KEY;
const MARKUP_MULTIPLIER = 1.30; // 30% markup on wholesale price

// Site package pricing (in cents)
const SITE_PACKAGES: Record<string, { name: string; priceCents: number; description: string }> = {
  starter: {
    name: "Starter Site Build",
    priceCents: 1650_00,
    description: "3-5 page custom website — mobile-responsive, SEO, contact form",
  },
  professional: {
    name: "Professional Site Build",
    priceCents: 2750_00,
    description: "5-10 page site with CMS, SEO optimization, and analytics",
  },
  premium: {
    name: "Premium Site Build",
    priceCents: 5500_00,
    description: "10+ pages with ecommerce, integrations, and brand strategy",
  },
};

export async function POST(req: NextRequest) {
  // ── Auth check ──
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { error: "You must be signed in to purchase a domain" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { domain, wholesalePrice, years = 1, customerId, sitePackage } = body;

  if (!domain || !wholesalePrice) {
    return NextResponse.json({ error: "domain and wholesalePrice are required" }, { status: 400 });
  }

  if (!NAMESILO_KEY) {
    return NextResponse.json({ error: "Domain service not configured" }, { status: 503 });
  }

  // Validate that the customerId matches the authenticated user
  if (customerId && customerId !== userId) {
    return NextResponse.json({ error: "Customer ID mismatch" }, { status: 403 });
  }

  // Validate site package if provided
  if (sitePackage && !SITE_PACKAGES[sitePackage]) {
    return NextResponse.json({ error: "Invalid site package" }, { status: 400 });
  }

  // ── Ensure customer exists in Supabase ──
  const supabase = createServiceClient();
  try {
    // Upsert customer by clerk_id — creates if new, updates timestamp if exists
    await (supabase.from("customers") as any).upsert(
      {
        clerk_id: userId,
        email: "", // Will be updated by webhook with Stripe email
        updated_at: new Date().toISOString(),
      },
      { onConflict: "clerk_id", ignoreDuplicates: true }
    );
  } catch (err) {
    // Non-fatal: log but proceed — the webhook will also create the customer
    console.error("[Checkout] Failed to upsert customer:", err);
  }

  // ── Build Stripe line items ──
  const retailPrice = Math.ceil(wholesalePrice * MARKUP_MULTIPLIER * 100);

  const lineItems: Array<{
    price_data: {
      currency: string;
      product_data: { name: string; description: string };
      unit_amount: number;
    };
    quantity: number;
  }> = [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: domain,
          description: `Domain registration — ${years} year${years > 1 ? "s" : ""} · Free WHOIS privacy`,
        },
        unit_amount: retailPrice,
      },
      quantity: 1,
    },
  ];

  // Add site package as second line item if requested
  if (sitePackage && SITE_PACKAGES[sitePackage]) {
    const pkg = SITE_PACKAGES[sitePackage];
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: pkg.name,
          description: pkg.description,
        },
        unit_amount: pkg.priceCents,
      },
      quantity: 1,
    });
  }

  const origin = req.nextUrl.origin;

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      metadata: {
        domain,
        years: String(years),
        wholesalePrice: String(wholesalePrice),
        customer_id: userId,
        ...(sitePackage ? { site_package: sitePackage } : {}),
        ...(sitePackage ? { site_prompt: `Build a ${SITE_PACKAGES[sitePackage].name.toLowerCase()} for ${domain}` } : {}),
      },
      success_url: `${origin}/domains/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/domains?cancelled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
