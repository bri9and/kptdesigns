/**
 * Hosting plan definitions — single source of truth for pricing.
 * Used by checkout API, webhook handler, and UI components.
 */

export const HOSTING_PLANS = {
  essential: {
    name: "Essential Hosting",
    slug: "essential" as const,
    priceMonthly: 4900, // cents
    priceDisplay: "$49",
    tagline: "Managed hosting with enterprise-grade security",
    features: [
      "SSL/HTTPS (automatic)",
      "DDoS protection",
      "Web application firewall",
      "Global edge network",
      "Automated deployments",
      "Daily backups via Git",
      "Uptime monitoring",
    ],
    popular: false,
  },
  care: {
    name: "Care Plan",
    slug: "care" as const,
    priceMonthly: 9900, // cents
    priceDisplay: "$99",
    tagline: "Hosting + edits + monthly reporting",
    features: [
      "Everything in Essential",
      "30 min content edits per month",
      "Web analytics dashboard",
      "Monthly performance report",
      "Security updates & patches",
      "Priority email support",
    ],
    popular: true,
  },
  growth: {
    name: "Growth Plan",
    slug: "growth" as const,
    priceMonthly: 19900, // cents
    priceDisplay: "$199",
    tagline: "Full support + dev time + speed insights",
    features: [
      "Everything in Care",
      "1 hr dev/design time per month",
      "Speed Insights monitoring",
      "Performance observability",
      "Monthly performance report",
      "48-hour priority response",
    ],
    popular: false,
  },
} as const;

export type HostingPlanSlug = keyof typeof HOSTING_PLANS;

export function isValidPlan(plan: string): plan is HostingPlanSlug {
  return plan in HOSTING_PLANS;
}
