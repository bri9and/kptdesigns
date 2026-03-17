"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Globe, Plus, Loader2, Calendar, ExternalLink } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase";
import type { Domain } from "@/lib/supabase-types";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, { label: string; className: string }> = {
  active: {
    label: "Active",
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  expired: {
    label: "Expired",
    className: "bg-red-500/10 text-red-400 border-red-500/20",
  },
  transferred: {
    label: "Transferred",
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
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

function formatDate(dateStr: string | null) {
  if (!dateStr) return "--";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function DomainsPage() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDomains() {
      try {
        const supabase = createBrowserClient();
        const { data } = await supabase
          .from("domains")
          .select("*")
          .order("created_at", { ascending: false });
        setDomains(data ?? []);
      } catch {
        // Supabase not configured yet — show empty state
        setDomains([]);
      } finally {
        setLoading(false);
      }
    }
    fetchDomains();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Domains</h1>
          <p className="text-sm text-white/50 mt-1">
            Manage your registered domains.
          </p>
        </div>
        <Link
          href="/domains"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-qyellow hover:bg-qyellow-light text-white font-medium text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Buy New Domain
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="rounded-xl bg-qblack-light border border-white/10 p-12 flex justify-center">
          <Loader2 className="w-6 h-6 text-white/30 animate-spin" />
        </div>
      ) : domains.length === 0 ? (
        <div className="rounded-xl bg-qblack-light border border-white/10 p-12 text-center">
          <Globe className="w-12 h-12 text-white/15 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-1">
            No domains yet
          </h3>
          <p className="text-sm text-white/40 mb-6 max-w-sm mx-auto">
            Search and register your perfect domain name to get started.
          </p>
          <Link
            href="/domains"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-qyellow hover:bg-qyellow-light text-white font-medium text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            Browse Domains
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {domains.map((domain) => (
            <div
              key={domain.id}
              className="rounded-xl bg-qblack-light border border-white/10 p-5 hover:border-white/20 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="bg-qyellow/10 rounded-lg p-2">
                    <Globe className="w-4 h-4 text-qyellow" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-white">
                        {domain.domain_name}
                      </p>
                      <StatusBadge status={domain.status} />
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1 text-xs text-white/40">
                        <Calendar className="w-3 h-3" />
                        Purchased {formatDate(domain.purchased_at)}
                      </span>
                      {domain.expires_at && (
                        <span className="flex items-center gap-1 text-xs text-white/40">
                          <Calendar className="w-3 h-3" />
                          Expires {formatDate(domain.expires_at)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <a
                  href={`https://${domain.domain_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-qyellow transition-colors"
                >
                  Visit <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
