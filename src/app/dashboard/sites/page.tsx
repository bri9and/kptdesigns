"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Monitor,
  Loader2,
  ExternalLink,
  Pencil,
  Plus,
  Github,
  Server,
  Check,
} from "lucide-react";
import { createBrowserClient } from "@/lib/supabase";
import { HOSTING_PLANS, type HostingPlanSlug } from "@/lib/hosting-plans";
import type { Site, Order } from "@/lib/supabase-types";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, { label: string; className: string }> = {
  live: {
    label: "Live",
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  building: {
    label: "Building",
    className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  provisioning: {
    label: "Provisioning",
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  suspended: {
    label: "Suspended",
    className: "bg-red-500/10 text-red-400 border-red-500/20",
  },
};

function StatusBadge({ status }: { status: string }) {
  const style = statusStyles[status] ?? {
    label: status,
    className: "bg-white/5 text-white/50 border-white/10",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border",
        style.className
      )}
    >
      {style.label}
    </span>
  );
}

/** Derive plan name from order amount */
function getHostingPlanName(order: Order): string {
  const entry = Object.entries(HOSTING_PLANS).find(
    ([, plan]) => plan.priceMonthly === order.amount_cents
  );
  return entry ? entry[1].name : "Hosting";
}

function HostingBadge({ order }: { order: Order }) {
  const planName = getHostingPlanName(order);
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border bg-violet-500/10 text-violet-400 border-violet-500/20">
      <Server className="w-3 h-3" />
      {planName}
    </span>
  );
}

export default function SitesPage() {
  return (
    <Suspense fallback={
      <div className="rounded-xl bg-qblack-light border border-white/10 p-12 flex justify-center">
        <Loader2 className="w-6 h-6 text-white/30 animate-spin" />
      </div>
    }>
      <SitesContent />
    </Suspense>
  );
}

function SitesContent() {
  const searchParams = useSearchParams();
  const [sites, setSites] = useState<Site[]>([]);
  const [hostingOrders, setHostingOrders] = useState<Record<string, Order>>({});
  const [loading, setLoading] = useState(true);

  const hostingStatus = searchParams.get("hosting");

  useEffect(() => {
    async function fetchSites() {
      try {
        const supabase = createBrowserClient();
        const { data } = await supabase
          .from("sites")
          .select("*")
          .order("created_at", { ascending: false });
        setSites(data ?? []);

        // Fetch active hosting orders for all sites
        if (data && data.length > 0) {
          const siteIds = data.map((s: Site) => s.id);
          const { data: orders } = await (supabase
            .from("orders") as ReturnType<typeof supabase.from>)
            .select("*")
            .in("site_id", siteIds)
            .eq("type", "hosting")
            .eq("status", "paid")
            .order("created_at", { ascending: false });

          if (orders) {
            // Keep only the most recent hosting order per site
            const orderMap: Record<string, Order> = {};
            for (const order of orders as Order[]) {
              if (order.site_id && !orderMap[order.site_id]) {
                orderMap[order.site_id] = order;
              }
            }
            setHostingOrders(orderMap);
          }
        }
      } catch {
        setSites([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSites();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Sites</h1>
          <p className="text-sm text-white/50 mt-1">
            View and manage your websites.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-qyellow hover:bg-qyellow-light text-white font-medium text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Request New Site
        </Link>
      </div>

      {/* Hosting status banners */}
      {hostingStatus === "success" && (
        <div className="rounded-lg p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
          <Check className="w-4 h-4 inline mr-2" />
          Hosting subscription activated successfully!
        </div>
      )}
      {hostingStatus === "cancelled" && (
        <div className="rounded-lg p-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
          Hosting checkout was cancelled. You can try again from the site hosting page.
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="rounded-xl bg-qblack-light border border-white/10 p-12 flex justify-center">
          <Loader2 className="w-6 h-6 text-white/30 animate-spin" />
        </div>
      ) : sites.length === 0 ? (
        <div className="rounded-xl bg-qblack-light border border-white/10 p-12 text-center">
          <Monitor className="w-12 h-12 text-white/15 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-1">
            No sites yet
          </h3>
          <p className="text-sm text-white/40 mb-6 max-w-sm mx-auto">
            Once you purchase a domain and site design, your sites will appear
            here.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-qyellow hover:bg-qyellow-light text-white font-medium text-sm transition-colors"
          >
            Get Started
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {sites.map((site) => {
            const hostingOrder = hostingOrders[site.id];
            return (
              <div
                key={site.id}
                className="rounded-xl bg-qblack-light border border-white/10 p-5 hover:border-white/20 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="bg-qyellow/10 rounded-lg p-2 shrink-0">
                      <Monitor className="w-4 h-4 text-qyellow" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-white truncate">
                          {site.name}
                        </p>
                        <StatusBadge status={site.status} />
                        {hostingOrder && <HostingBadge order={hostingOrder} />}
                      </div>
                      <div className="flex items-center gap-4 mt-1 flex-wrap">
                        {site.vercel_url && (
                          <a
                            href={site.vercel_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-white/40 hover:text-qyellow transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {site.vercel_url.replace(/^https?:\/\//, "")}
                          </a>
                        )}
                        {site.github_repo && (
                          <a
                            href={`https://github.com/${site.github_repo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-white/40 hover:text-qyellow transition-colors"
                          >
                            <Github className="w-3 h-3" />
                            {site.github_repo}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {hostingOrder ? (
                      <Link
                        href={`/dashboard/sites/${site.id}/hosting`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-violet-500/20 text-xs text-violet-400 hover:text-violet-300 hover:border-violet-500/30 transition-colors"
                      >
                        <Server className="w-3 h-3" />
                        Manage Hosting
                      </Link>
                    ) : (
                      <Link
                        href={`/dashboard/sites/${site.id}/hosting`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-qyellow/10 border border-qyellow/20 text-xs text-qyellow hover:bg-qyellow/20 hover:border-qyellow/30 transition-colors"
                      >
                        <Server className="w-3 h-3" />
                        Choose Hosting Plan
                      </Link>
                    )}
                    <Link
                      href={`/dashboard/sites/${site.id}/edit`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white/60 hover:text-white hover:border-white/20 transition-colors"
                    >
                      <Pencil className="w-3 h-3" />
                      Request Changes
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
