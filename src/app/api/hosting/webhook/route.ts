import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase";
import { HOSTING_PLANS, isValidPlan } from "@/lib/hosting-plans";
import Stripe from "stripe";

/* eslint-disable @typescript-eslint/no-explicit-any */

const WEBHOOK_SECRET = process.env.STRIPE_HOSTING_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET;

/**
 * POST /api/hosting/webhook
 *
 * Stripe webhook handler for hosting subscription events.
 * Handles:
 *   - checkout.session.completed (new subscription)
 *   - invoice.paid (recurring payment)
 *   - customer.subscription.deleted (cancellation)
 *   - customer.subscription.updated (plan change)
 */
export async function POST(req: NextRequest) {
  const body = await req.text();

  // ── Verify webhook signature ──
  let event: Stripe.Event;

  if (!WEBHOOK_SECRET) {
    if (process.env.NODE_ENV === "production") {
      console.error("[Hosting Webhook] STRIPE_HOSTING_WEBHOOK_SECRET is not set in production");
      return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
    }
    // In development without webhook secret, parse directly
    event = JSON.parse(body) as Stripe.Event;
  } else {
    const sig = req.headers.get("stripe-signature");
    if (!sig) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }
    try {
      event = getStripe().webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
    } catch (err) {
      console.error("[Hosting Webhook] Signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  }

  const supabase = createServiceClient();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session, supabase);
        break;
      }
      case "invoice.paid": {
        await handleInvoicePaid(event.data.object as Stripe.Invoice, supabase);
        break;
      }
      case "customer.subscription.deleted": {
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription, supabase);
        break;
      }
      case "customer.subscription.updated": {
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription, supabase);
        break;
      }
      default: {
        // Unhandled event type — acknowledge receipt
        break;
      }
    }
  } catch (err) {
    console.error(`[Hosting Webhook] Error handling ${event.type}:`, err);
    // Return 200 to prevent Stripe retries for non-transient errors
    // The error is logged for manual investigation
  }

  return NextResponse.json({ received: true });
}

/**
 * New subscription started via checkout.
 * Creates an order record in Supabase.
 */
async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  supabase: ReturnType<typeof createServiceClient>
) {
  const metadata = session.metadata;
  if (!metadata?.siteId || !metadata?.customerId || !metadata?.plan) {
    console.error("[Hosting Webhook] checkout.session.completed missing metadata:", metadata);
    return;
  }

  const { siteId, customerId, plan } = metadata;
  const subscriptionId = typeof session.subscription === "string"
    ? session.subscription
    : (session.subscription as Stripe.Subscription)?.id ?? null;

  // Determine amount from plan
  const amountCents = isValidPlan(plan) ? HOSTING_PLANS[plan].priceMonthly : 0;

  // Create order record
  const { error: orderErr } = await (supabase.from("orders") as any).insert({
    customer_id: customerId,
    site_id: siteId,
    type: "hosting",
    amount_cents: amountCents,
    currency: "usd",
    stripe_subscription_id: subscriptionId,
    stripe_payment_intent_id: typeof session.payment_intent === "string"
      ? session.payment_intent
      : null,
    status: "paid",
  });

  if (orderErr) {
    console.error("[Hosting Webhook] Failed to create order:", orderErr.message);
  }
}

/**
 * Extract subscription ID from an invoice.
 * In Stripe API 2026-02-25, subscription is nested under parent.subscription_details.
 */
function getSubscriptionIdFromInvoice(invoice: Stripe.Invoice): string | null {
  const sub = invoice.parent?.subscription_details?.subscription;
  if (!sub) return null;
  return typeof sub === "string" ? sub : sub.id;
}

/**
 * Recurring invoice paid — create a new order record for the billing period.
 */
async function handleInvoicePaid(
  invoice: Stripe.Invoice,
  supabase: ReturnType<typeof createServiceClient>
) {
  const subscriptionId = getSubscriptionIdFromInvoice(invoice);

  if (!subscriptionId) {
    // Not a subscription invoice — ignore
    return;
  }

  // Skip the first invoice (already handled by checkout.session.completed)
  if (invoice.billing_reason === "subscription_create") {
    return;
  }

  // Look up existing order with this subscription to get site and customer info
  const { data: existingOrder } = await (supabase.from("orders") as any)
    .select("customer_id, site_id")
    .eq("stripe_subscription_id", subscriptionId)
    .eq("type", "hosting")
    .limit(1)
    .single();

  if (!existingOrder) {
    console.error(
      `[Hosting Webhook] invoice.paid — no existing order found for subscription ${subscriptionId}`
    );
    return;
  }

  const amountCents = invoice.amount_paid ?? 0;

  // Extract payment intent ID from the payments list if available
  const paymentIntentId = invoice.payments?.data?.[0]?.payment?.payment_intent
    ? (typeof invoice.payments.data[0].payment.payment_intent === "string"
        ? invoice.payments.data[0].payment.payment_intent
        : invoice.payments.data[0].payment.payment_intent?.id ?? null)
    : null;

  const { error: orderErr } = await (supabase.from("orders") as any).insert({
    customer_id: existingOrder.customer_id,
    site_id: existingOrder.site_id,
    type: "hosting",
    amount_cents: amountCents,
    currency: invoice.currency || "usd",
    stripe_subscription_id: subscriptionId,
    stripe_payment_intent_id: paymentIntentId,
    status: "paid",
  });

  if (orderErr) {
    console.error("[Hosting Webhook] Failed to create recurring order:", orderErr.message);
  }
}

/**
 * Subscription cancelled — update the site status.
 */
async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
  supabase: ReturnType<typeof createServiceClient>
) {
  const subscriptionId = subscription.id;

  // Find the order(s) tied to this subscription
  const { data: orders } = await (supabase.from("orders") as any)
    .select("id, site_id")
    .eq("stripe_subscription_id", subscriptionId)
    .eq("type", "hosting");

  if (!orders || orders.length === 0) {
    console.error(
      `[Hosting Webhook] subscription.deleted — no orders found for ${subscriptionId}`
    );
    return;
  }

  // Mark all hosting orders for this subscription as refunded/cancelled
  const { error: updateErr } = await (supabase.from("orders") as any)
    .update({ status: "refunded" })
    .eq("stripe_subscription_id", subscriptionId)
    .eq("type", "hosting")
    .eq("status", "paid");

  if (updateErr) {
    console.error("[Hosting Webhook] Failed to update order status:", updateErr.message);
  }

  // Suspend the site (hosting no longer active)
  const siteId = orders[0].site_id;
  if (siteId) {
    const { error: siteErr } = await (supabase.from("sites") as any)
      .update({ status: "suspended" })
      .eq("id", siteId);

    if (siteErr) {
      console.error("[Hosting Webhook] Failed to suspend site:", siteErr.message);
    }
  }
}

/**
 * Subscription updated (e.g., plan change).
 * Update the order amount if the plan changed.
 */
async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription,
  supabase: ReturnType<typeof createServiceClient>
) {
  const subscriptionId = subscription.id;
  const status = subscription.status;

  // If the subscription became active again (e.g., reactivated after past_due)
  if (status === "active") {
    // Find the site and ensure it's not suspended
    const { data: order } = await (supabase.from("orders") as any)
      .select("site_id")
      .eq("stripe_subscription_id", subscriptionId)
      .eq("type", "hosting")
      .limit(1)
      .single();

    if (order?.site_id) {
      const { data: site } = await (supabase.from("sites") as any)
        .select("status")
        .eq("id", order.site_id)
        .single();

      if (site?.status === "suspended") {
        await (supabase.from("sites") as any)
          .update({ status: "live" })
          .eq("id", order.site_id);

      }
    }
  }
}
