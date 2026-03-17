import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase";
import { provisionSite } from "@/lib/provision";
import Stripe from "stripe";

/* eslint-disable @typescript-eslint/no-explicit-any */

const NAMESILO_KEY = process.env.NAMESILO_API_KEY;
const NAMESILO_BASE = "https://www.namesilo.com/api";
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

// Site package pricing (in cents) — must match checkout route
const SITE_PACKAGE_PRICES: Record<string, number> = {
  starter: 1650_00,
  professional: 2750_00,
  premium: 5500_00,
};

async function registerDomain(domain: string, years: number): Promise<{ success: boolean; error?: string }> {
  const url = `${NAMESILO_BASE}/registerDomain?version=1&type=json&key=${NAMESILO_KEY}&domain=${encodeURIComponent(domain)}&years=${years}&private=1&auto_renew=0`;

  const res = await fetch(url);
  const data = await res.json();
  const code = String(data.reply?.code);

  if (code === "300" || code === "301" || code === "302") {
    return { success: true };
  }

  return { success: false, error: data.reply?.detail || `NameSilo error code ${code}` };
}

/**
 * After a successful domain registration, record it in Supabase and
 * trigger the full provisioning pipeline if a site package was purchased.
 */
async function handleSuccessfulPurchase(session: Stripe.Checkout.Session): Promise<void> {
  const metadata = session.metadata;
  if (!metadata?.domain) return;

  const domain = metadata.domain;
  const years = parseInt(metadata.years || "1", 10);
  const clerkId = metadata.customer_id || null;
  const sitePackage = metadata.site_package || null;
  const sitePrompt = metadata.site_prompt || null;
  const wholesalePrice = parseFloat(metadata.wholesalePrice || "0");
  const customerEmail = session.customer_details?.email || session.customer_email || "";

  const supabase = createServiceClient();

  // ── Step 1: Upsert customer in Supabase ──
  let customerId: string | null = null;

  if (clerkId) {
    console.log(`[Webhook] Upserting customer for clerk_id: ${clerkId}`);
    try {
      // Try to find existing customer first
      const { data: existingCustomer } = await (supabase
        .from("customers") as any)
        .select("id")
        .eq("clerk_id", clerkId)
        .single();

      if (existingCustomer?.id) {
        customerId = existingCustomer.id;
        // Update email if we have one from Stripe
        if (customerEmail) {
          await (supabase.from("customers") as any)
            .update({ email: customerEmail, updated_at: new Date().toISOString() })
            .eq("id", customerId);
        }
        console.log(`[Webhook] Found existing customer: ${customerId}`);
      } else {
        // Create new customer
        const { data: newCustomer, error: custErr } = await (supabase
          .from("customers") as any)
          .insert({
            clerk_id: clerkId,
            email: customerEmail,
            updated_at: new Date().toISOString(),
          })
          .select("id")
          .single();

        if (custErr) {
          console.error(`[Webhook] Failed to create customer: ${custErr.message}`);
        } else {
          customerId = newCustomer.id;
          console.log(`[Webhook] Created new customer: ${customerId}`);
        }
      }
    } catch (err) {
      console.error(`[Webhook] Customer upsert error:`, err);
    }
  }

  // ── Step 2: Register domain at NameSilo ──
  console.log(`[Webhook] Registering ${domain} for ${years} year(s)...`);
  const regResult = await registerDomain(domain, years);

  if (!regResult.success) {
    console.error(`[Webhook] FAILED to register ${domain}: ${regResult.error}`);
    console.error(`[Webhook] Session ID: ${session.id}, Customer: ${customerEmail}`);
    // TODO: Send alert email to admin, issue refund if needed
    return;
  }

  console.log(`[Webhook] Successfully registered ${domain}`);

  // ── Step 3: Create domain record in Supabase ──
  let domainId: string | null = null;

  if (customerId) {
    try {
      const expiresAt = new Date();
      expiresAt.setFullYear(expiresAt.getFullYear() + years);

      const { data: domainRecord, error: domainErr } = await (supabase.from("domains") as any).insert({
        customer_id: customerId,
        domain_name: domain,
        registrar: "namesilo",
        status: "active",
        purchased_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString(),
        namesilo_order_id: session.id,
      })
        .select("id")
        .single();

      if (domainErr) {
        console.error(`[Webhook] Failed to save domain record: ${domainErr.message}`);
      } else {
        domainId = domainRecord.id;
        console.log(`[Webhook] Domain record saved: ${domainId}`);
      }
    } catch (err) {
      console.error(`[Webhook] Database error saving domain:`, err);
    }
  }

  // ── Step 4: Create domain order record ──
  let domainOrderId: string | null = null;

  if (customerId) {
    try {
      const domainRetailCents = Math.ceil(wholesalePrice * 1.30 * 100);
      const { data: orderRecord, error: orderErr } = await (supabase.from("orders") as any).insert({
        customer_id: customerId,
        domain_id: domainId,
        type: "domain",
        amount_cents: domainRetailCents,
        currency: "usd",
        stripe_payment_intent_id: session.payment_intent as string,
        status: "paid",
      })
        .select("id")
        .single();

      if (orderErr) {
        console.error(`[Webhook] Failed to save domain order: ${orderErr.message}`);
      } else {
        domainOrderId = orderRecord.id;
        console.log(`[Webhook] Domain order saved: ${domainOrderId}`);
      }
    } catch (err) {
      console.error(`[Webhook] Database error saving order:`, err);
    }
  }

  // ── Step 5: If site package was purchased, create site order and trigger provisioning ──
  if (customerId && sitePackage && sitePrompt) {
    console.log(`[Webhook] Site package "${sitePackage}" purchased — creating records...`);

    let siteOrderId: string | null = null;

    // Create site design order
    try {
      const sitePriceCents = SITE_PACKAGE_PRICES[sitePackage] || 0;
      const { data: siteOrder, error: siteOrderErr } = await (supabase.from("orders") as any).insert({
        customer_id: customerId,
        domain_id: domainId,
        type: "site_design",
        amount_cents: sitePriceCents,
        currency: "usd",
        stripe_payment_intent_id: session.payment_intent as string,
        status: "paid",
      })
        .select("id")
        .single();

      if (siteOrderErr) {
        console.error(`[Webhook] Failed to save site order: ${siteOrderErr.message}`);
      } else {
        siteOrderId = siteOrder.id;
        console.log(`[Webhook] Site order saved: ${siteOrderId}`);
      }
    } catch (err) {
      console.error(`[Webhook] Database error saving site order:`, err);
    }

    // Trigger provisioning pipeline
    if (siteOrderId) {
      console.log(`[Webhook] Triggering provisioning for ${domain}...`);
      try {
        const result = await provisionSite({
          customerId,
          domainName: domain,
          sitePrompt,
          orderId: siteOrderId,
        });

        if (result.success) {
          console.log(`[Webhook] Provisioning complete for ${domain} (site: ${result.siteId})`);
        } else {
          console.error(`[Webhook] Provisioning partially failed for ${domain}:`, result.steps);
        }
      } catch (err) {
        console.error(`[Webhook] Provisioning error for ${domain}:`, err);
      }
    }
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();

  // Verify webhook signature if secret is configured
  let event: Stripe.Event;
  if (WEBHOOK_SECRET) {
    const sig = req.headers.get("stripe-signature");
    if (!sig) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }
    try {
      event = getStripe().webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } else {
    // In test mode without webhook secret, parse directly
    event = JSON.parse(body) as Stripe.Event;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status === "paid") {
      // Fire-and-forget: handle the purchase asynchronously so we respond
      // to Stripe quickly (within their timeout window). Errors are logged
      // but don't cause a webhook retry.
      handleSuccessfulPurchase(session).catch((err) => {
        console.error("[Webhook] Unhandled error in purchase handler:", err);
      });
    }
  }

  return NextResponse.json({ received: true });
}
