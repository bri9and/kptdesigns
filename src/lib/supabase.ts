import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase-types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Server-side Supabase client with service role key.
 * Bypasses RLS — use only in server components, API routes, and server actions.
 */
export function createServiceClient() {
  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Client-side Supabase client using the public anon key.
 * Respects RLS policies — safe to use in client components.
 *
 * Pass a Clerk JWT token to authenticate requests so RLS policies
 * can identify the user. Without a token, queries will be anonymous
 * and RLS will block access to user-scoped data.
 */
export function createBrowserClient(token?: string) {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
