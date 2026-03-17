// ─── Enum types matching the SQL schema ─────────────────────────────────────

export type DomainStatus = "pending" | "active" | "expired" | "transferred";

export type SiteStatus = "provisioning" | "building" | "live" | "suspended";

export type OrderType = "domain" | "site_design" | "hosting";

export type OrderStatus = "pending" | "paid" | "failed" | "refunded";

export type DraftStatus = "generating" | "ready" | "approved" | "rejected";

// ─── Row types ──────────────────────────────────────────────────────────────

export interface Customer {
  id: string;
  clerk_id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface Domain {
  id: string;
  customer_id: string;
  domain_name: string;
  registrar: string;
  status: DomainStatus;
  purchased_at: string | null;
  expires_at: string | null;
  namesilo_order_id: string | null;
  created_at: string;
}

export interface Site {
  id: string;
  customer_id: string;
  domain_id: string | null;
  name: string;
  github_repo: string | null;
  vercel_project_id: string | null;
  vercel_url: string | null;
  status: SiteStatus;
  template_prompt: string | null;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  customer_id: string;
  domain_id: string | null;
  site_id: string | null;
  type: OrderType;
  amount_cents: number;
  currency: string;
  stripe_payment_intent_id: string | null;
  stripe_subscription_id: string | null;
  status: OrderStatus;
  created_at: string;
}

export interface SiteDraft {
  id: string;
  site_id: string;
  customer_id: string;
  prompt: string;
  generated_code: string | null;
  status: DraftStatus;
  created_at: string;
  approved_at: string | null;
}

// ─── Insert types (omit server-generated fields) ───────────────────────────

export interface CustomerInsert {
  id?: string;
  clerk_id: string;
  email: string;
  full_name?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface DomainInsert {
  id?: string;
  customer_id: string;
  domain_name: string;
  registrar?: string;
  status?: DomainStatus;
  purchased_at?: string | null;
  expires_at?: string | null;
  namesilo_order_id?: string | null;
  created_at?: string;
}

export interface SiteInsert {
  id?: string;
  customer_id: string;
  domain_id?: string | null;
  name: string;
  github_repo?: string | null;
  vercel_project_id?: string | null;
  vercel_url?: string | null;
  status?: SiteStatus;
  template_prompt?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface OrderInsert {
  id?: string;
  customer_id: string;
  domain_id?: string | null;
  site_id?: string | null;
  type: OrderType;
  amount_cents: number;
  currency?: string;
  stripe_payment_intent_id?: string | null;
  stripe_subscription_id?: string | null;
  status?: OrderStatus;
  created_at?: string;
}

export interface SiteDraftInsert {
  id?: string;
  site_id: string;
  customer_id: string;
  prompt: string;
  generated_code?: string | null;
  status?: DraftStatus;
  created_at?: string;
  approved_at?: string | null;
}

// ─── Update types (all fields optional except id) ──────────────────────────

export type CustomerUpdate = Partial<Omit<Customer, "id">>;
export type DomainUpdate = Partial<Omit<Domain, "id">>;
export type SiteUpdate = Partial<Omit<Site, "id">>;
export type OrderUpdate = Partial<Omit<Order, "id">>;
export type SiteDraftUpdate = Partial<Omit<SiteDraft, "id">>;

// ─── Database type for Supabase client generics ─────────────────────────────

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: Customer;
        Insert: CustomerInsert;
        Update: CustomerUpdate;
      };
      domains: {
        Row: Domain;
        Insert: DomainInsert;
        Update: DomainUpdate;
      };
      sites: {
        Row: Site;
        Insert: SiteInsert;
        Update: SiteUpdate;
      };
      orders: {
        Row: Order;
        Insert: OrderInsert;
        Update: OrderUpdate;
      };
      site_drafts: {
        Row: SiteDraft;
        Insert: SiteDraftInsert;
        Update: SiteDraftUpdate;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      domain_status: DomainStatus;
      site_status: SiteStatus;
      order_type: OrderType;
      order_status: OrderStatus;
      draft_status: DraftStatus;
    };
  };
}
