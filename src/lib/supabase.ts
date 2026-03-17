import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase-types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

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
 * Note: For authenticated client access, pass the user's JWT from Clerk
 * via supabase.auth.setSession() or use supabase.auth.getUser().
 */
export function createBrowserClient() {
  return createClient<Database>(
    supabaseUrl,
    // The public URL is safe to expose; RLS protects the data.
    // For client-side, we still use the service URL but rely on RLS + auth.
    // In production, replace with NEXT_PUBLIC_SUPABASE_ANON_KEY.
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? supabaseUrl,
    {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
      },
    }
  );
}
