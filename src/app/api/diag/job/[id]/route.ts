/**
 * Diagnostic — returns the full intake job so we can inspect agent state
 * during development. Intentionally not gated by auth (the spike still
 * uses anonymous flow). Remove or auth-gate before public production.
 */
import { NextResponse } from "next/server";
import { readIntakeJob } from "@/lib/intake-store";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const job = await readIntakeJob(id);
  if (!job) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(job);
}
