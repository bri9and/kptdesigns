"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  Globe,
  Monitor,
  FileEdit,
  ShoppingCart,
  Pencil,
  ArrowRight,
  Activity,
} from "lucide-react";

export default function DashboardOverview() {
  const { user, isLoaded } = useUser();

  const stats = [
    {
      label: "Total Domains",
      value: "0",
      icon: Globe,
      color: "text-qyellow",
      bg: "bg-qyellow/10",
    },
    {
      label: "Active Sites",
      value: "0",
      icon: Monitor,
      color: "text-qyellow-light",
      bg: "bg-qyellow-light/10",
    },
    {
      label: "Pending Drafts",
      value: "0",
      icon: FileEdit,
      color: "text-earthy-stone-700",
      bg: "bg-earthy-stone-100",
    },
  ];

  const quickActions = [
    {
      label: "Buy a Domain",
      href: "/domains",
      icon: ShoppingCart,
      description: "Search and register a new domain name",
    },
    {
      label: "Request Site Changes",
      href: "/contact",
      icon: Pencil,
      description: "Submit a change request for your site",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-earthy-ink">
          {isLoaded ? (
            <>
              Welcome back
              {user?.firstName ? `, ${user.firstName}` : ""}
            </>
          ) : (
            <span className="inline-block w-48 h-8 bg-earthy-stone-100 rounded animate-pulse" />
          )}
        </h1>
        <p className="mt-1 text-earthy-stone-600 text-sm">
          Here&apos;s an overview of your account.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl bg-qblack-light border border-earthy-stone-200 p-5 flex items-center gap-4"
          >
            <div className={`${stat.bg} rounded-lg p-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-earthy-ink">{stat.value}</p>
              <p className="text-xs text-earthy-stone-600">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-earthy-ink mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="group rounded-xl bg-qblack-light border border-earthy-stone-200 p-5 hover:border-qyellow/30 transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-qyellow/10 rounded-lg p-2.5">
                    <action.icon className="w-5 h-5 text-qyellow" />
                  </div>
                  <div>
                    <p className="font-medium text-earthy-ink group-hover:text-qyellow transition-colors">
                      {action.label}
                    </p>
                    <p className="text-xs text-earthy-stone-500 mt-0.5">
                      {action.description}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-earthy-stone-400 group-hover:text-qyellow group-hover:translate-x-0.5 transition-all mt-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold text-earthy-ink mb-4">
          Recent Activity
        </h2>
        <div className="rounded-xl bg-qblack-light border border-earthy-stone-200 p-8 text-center">
          <Activity className="w-10 h-10 text-earthy-stone-400 mx-auto mb-3" />
          <p className="text-sm text-earthy-stone-500">
            No recent activity yet.
          </p>
          <p className="text-xs text-earthy-stone-500 mt-1">
            Activity from domains, sites, and orders will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
