"use client";

/**
 * Client-only Puck renderer.
 *
 * @measured/puck's <Render /> relies on internal React contexts and the
 * registered components themselves use client-only APIs (animations,
 * intersection observers, etc.). Wrapping the call in a tiny client
 * component keeps the parent /preview/[id]/page.tsx an async Server
 * Component (so it can do the Supabase fetch) while still rendering the
 * Puck tree client-side without RSC errors.
 */
import { Render } from "@measured/puck";
import type { Data as PuckData } from "@measured/puck";
import { earthyConfig } from "@/lib/puck-config";

export function PreviewRenderer({ data }: { data: PuckData }) {
  return <Render config={earthyConfig} data={data} />;
}
