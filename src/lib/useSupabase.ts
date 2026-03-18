"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "@clerk/nextjs";
import { createBrowserClient } from "./supabase";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./supabase-types";

/**
 * React hook that returns an authenticated Supabase client.
 *
 * Fetches the Clerk JWT (using the "supabase" token template) and
 * creates a Supabase browser client with the token in the Authorization
 * header. This allows RLS policies to identify the current user.
 *
 * Returns `{ supabase, isLoaded }` — wait for `isLoaded` before querying.
 */
export function useSupabase(): {
  supabase: SupabaseClient<Database> | null;
  isLoaded: boolean;
} {
  const { session, isLoaded: isSessionLoaded } = useSession();
  const [token, setToken] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isSessionLoaded) return;

    if (!session) {
      // No active session — client will be anonymous
      setToken(null);
      setIsLoaded(true);
      return;
    }

    let cancelled = false;

    async function fetchToken() {
      try {
        const jwt = await session!.getToken({ template: "supabase" });
        if (!cancelled) {
          setToken(jwt);
          setIsLoaded(true);
        }
      } catch {
        // Token fetch failed — fall back to anonymous
        if (!cancelled) {
          setToken(null);
          setIsLoaded(true);
        }
      }
    }

    fetchToken();

    // Refresh the token periodically (every 50s — JWT typically expires at 60s)
    const interval = setInterval(fetchToken, 50_000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [session, isSessionLoaded]);

  const supabase = useMemo(() => {
    if (!isLoaded) return null;
    return createBrowserClient(token ?? undefined);
  }, [token, isLoaded]);

  return { supabase, isLoaded };
}
