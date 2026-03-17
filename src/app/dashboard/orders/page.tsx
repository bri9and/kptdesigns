"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Loader2 } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase";
import type { Order } from "@/lib/supabase-types";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, { label: string; className: string }> = {
  paid: {
    label: "Paid",
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  failed: {
    label: "Failed",
    className: "bg-red-500/10 text-red-400 border-red-500/20",
  },
  refunded: {
    label: "Refunded",
    className: "bg-white/5 text-white/50 border-white/10",
  },
};

const typeLabels: Record<string, string> = {
  domain: "Domain",
  site_design: "Site Design",
  hosting: "Hosting",
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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatAmount(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const supabase = createBrowserClient();
        const { data } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false });
        setOrders(data ?? []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <p className="text-sm text-white/50 mt-1">
          Your billing and order history.
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <div className="rounded-xl bg-qblack-light border border-white/10 p-12 flex justify-center">
          <Loader2 className="w-6 h-6 text-white/30 animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-xl bg-qblack-light border border-white/10 p-12 text-center">
          <ShoppingCart className="w-12 h-12 text-white/15 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-1">
            No orders yet
          </h3>
          <p className="text-sm text-white/40 max-w-sm mx-auto">
            When you purchase domains, site designs, or hosting, your orders
            will appear here.
          </p>
        </div>
      ) : (
        <div className="rounded-xl bg-qblack-light border border-white/10 overflow-hidden">
          {/* Table header — desktop only */}
          <div className="hidden sm:grid sm:grid-cols-[1fr_120px_100px_100px] gap-4 px-5 py-3 border-b border-white/5 text-xs font-medium text-white/40 uppercase tracking-wider">
            <span>Date</span>
            <span>Type</span>
            <span className="text-right">Amount</span>
            <span className="text-right">Status</span>
          </div>

          <div className="divide-y divide-white/5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="px-5 py-4 sm:grid sm:grid-cols-[1fr_120px_100px_100px] sm:gap-4 sm:items-center"
              >
                {/* Date */}
                <div>
                  <p className="text-sm text-white">
                    {formatDate(order.created_at)}
                  </p>
                  <p className="text-xs text-white/30 sm:hidden mt-0.5">
                    {typeLabels[order.type] ?? order.type}
                  </p>
                </div>

                {/* Type — desktop */}
                <p className="hidden sm:block text-sm text-white/70">
                  {typeLabels[order.type] ?? order.type}
                </p>

                {/* Amount */}
                <p className="text-sm font-medium text-white sm:text-right mt-1 sm:mt-0">
                  {formatAmount(order.amount_cents, order.currency)}
                </p>

                {/* Status */}
                <div className="sm:text-right mt-2 sm:mt-0">
                  <StatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
