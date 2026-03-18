"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Loader2,
  Star,
  ExternalLink,
  CreditCard,
  Shield,
  Zap,
} from "lucide-react";
import { useSupabase } from "@/lib/useSupabase";
import { HOSTING_PLANS, type HostingPlanSlug } from "@/lib/hosting-plans";
import type { Site, Order } from "@/lib/supabase-types";
import { cn } from "@/lib/utils";

const planOrder: HostingPlanSlug[] = ["essential", "care", "growth"];

const planIcons: Record<HostingPlanSlug, typeof Shield> = {
  essential: Shield,
  care: Zap,
  growth: Star,
};

export default function HostingPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-white/30 animate-spin" />
      </div>
    }>
      <HostingContent />
    </Suspense>
  );
}

function HostingContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { supabase, isLoaded } = useSupabase();
  const siteId = params.id as string;

  const [site, setSite] = useState<Site | null>(null);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [manageLoading, setManageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for success/cancel query params
  const hostingStatus = searchParams.get("hosting");

  useEffect(() => {
    if (!isLoaded || !supabase) return;

    async function fetchData() {
      try {
        // Fetch site
        const { data: siteData } = await supabase!
          .from("sites")
          .select("*")
          .eq("id", siteId)
          .single();

        if (siteData) {
          setSite(siteData);

          // Fetch active hosting order for this site
          const { data: orders } = await supabase!
            .from("orders")
            .select("*")
            .eq("site_id", siteId)
            .eq("type", "hosting")
            .eq("status", "paid")
            .order("created_at", { ascending: false })
            .limit(1);

          if (orders && orders.length > 0) {
            setActiveOrder(orders[0]);
          }
        }
      } catch {
        setError("Failed to load site data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [siteId, isLoaded, supabase]);

  // Derive current plan from active order amount
  const currentPlan: HostingPlanSlug | null = activeOrder
    ? (Object.entries(HOSTING_PLANS).find(
        ([, plan]) => plan.priceMonthly === activeOrder.amount_cents
      )?.[0] as HostingPlanSlug) ?? null
    : null;

  const handleSubscribe = useCallback(
    async (plan: HostingPlanSlug) => {
      setCheckoutLoading(plan);
      setError(null);

      try {
        const res = await fetch("/api/hosting/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ siteId, plan }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || `Checkout failed (${res.status})`);
        }

        if (data.url) {
          window.location.href = data.url;
        }
      } catch (err) {
        setError(String((err as Error).message || err));
        setCheckoutLoading(null);
      }
    },
    [siteId]
  );

  const handleManage = useCallback(async () => {
    setManageLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/hosting/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Failed to open billing portal (${res.status})`);
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(String((err as Error).message || err));
      setManageLoading(false);
    }
  }, [siteId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-white/30 animate-spin" />
      </div>
    );
  }

  if (!site) {
    return (
      <div className="text-center py-20">
        <p className="text-white/50">Site not found.</p>
        <button
          onClick={() => router.push("/dashboard/sites")}
          className="mt-4 text-sm text-qyellow hover:text-qyellow-light transition-colors"
        >
          Back to Sites
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => router.push("/dashboard/sites")}
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Sites
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Hosting Plans</h1>
            <p className="text-sm text-white/50 mt-1">
              Choose a hosting plan for{" "}
              <span className="text-white/70 font-medium">{site.name}</span>
            </p>
          </div>
          {activeOrder && (
            <button
              onClick={handleManage}
              disabled={manageLoading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm text-white/70 hover:text-white hover:border-white/20 transition-colors"
            >
              {manageLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CreditCard className="w-4 h-4" />
              )}
              Manage Subscription
            </button>
          )}
        </div>
      </div>

      {/* Success / Cancel banners */}
      {hostingStatus === "success" && (
        <div className="rounded-lg p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
          <Check className="w-4 h-4 inline mr-2" />
          Subscription activated successfully! Your hosting plan is now active.
        </div>
      )}
      {hostingStatus === "cancelled" && (
        <div className="rounded-lg p-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
          Checkout was cancelled. You can try again below.
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Plan Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {planOrder.map((slug) => {
          const plan = HOSTING_PLANS[slug];
          const Icon = planIcons[slug];
          const isCurrent = currentPlan === slug;
          const isPopular = plan.popular;

          return (
            <div
              key={slug}
              className={cn(
                "relative rounded-xl border p-6 transition-all",
                isCurrent
                  ? "border-emerald-500/40 bg-emerald-500/5 ring-1 ring-emerald-500/20"
                  : isPopular
                    ? "border-qyellow/40 bg-qblack-light ring-1 ring-qyellow/20"
                    : "border-white/10 bg-qblack-light/50 hover:border-white/20"
              )}
            >
              {/* Badge */}
              {(isCurrent || isPopular) && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full",
                      isCurrent
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-qyellow/10 text-qyellow border border-qyellow/30"
                    )}
                  >
                    {isCurrent ? (
                      <>
                        <Check className="w-3 h-3" /> Current Plan
                      </>
                    ) : (
                      <>
                        <Star className="w-3 h-3" /> Popular
                      </>
                    )}
                  </span>
                </div>
              )}

              <div className="text-center mb-5 mt-2">
                <div
                  className={cn(
                    "inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3",
                    isCurrent
                      ? "bg-emerald-500/10"
                      : "bg-qyellow/10"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5",
                      isCurrent ? "text-emerald-400" : "text-qyellow"
                    )}
                  />
                </div>
                <h3 className="font-semibold text-white text-lg">{plan.name}</h3>
                <p className="text-sm text-white/50 mt-1">{plan.tagline}</p>
                <div className="mt-3">
                  <span className="text-3xl font-bold text-white">
                    {plan.priceDisplay}
                  </span>
                  <span className="text-sm text-white/40">/mo</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-6">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-white/70"
                  >
                    <Check className="w-4 h-4 text-qyellow mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {isCurrent ? (
                <button
                  onClick={handleManage}
                  disabled={manageLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-emerald-500/30 text-sm font-medium text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                >
                  {manageLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ExternalLink className="w-4 h-4" />
                  )}
                  Manage Subscription
                </button>
              ) : (
                <button
                  onClick={() => handleSubscribe(slug)}
                  disabled={checkoutLoading !== null}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-50",
                    isPopular
                      ? "bg-qyellow hover:bg-qyellow-light text-qblack-dark"
                      : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                  )}
                >
                  {checkoutLoading === slug ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : null}
                  {activeOrder ? "Switch to Plan" : "Subscribe"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="text-center text-xs text-white/30 pt-4">
        All plans include a 14-day money-back guarantee. Cancel anytime from the
        billing portal.
      </div>
    </div>
  );
}
