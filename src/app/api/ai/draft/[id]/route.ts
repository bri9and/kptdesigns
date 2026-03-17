import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createServiceClient } from "@/lib/supabase";

/* eslint-disable @typescript-eslint/no-explicit-any */

// GET /api/ai/draft/[id] — Retrieve a draft
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Draft ID required" }, { status: 400 });
  }

  const supabase = createServiceClient();

  // Look up customer
  const { data: customer } = await (supabase
    .from("customers") as any)
    .select("id")
    .eq("clerk_id", userId)
    .single();

  if (!customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  // Fetch draft — verify ownership
  const { data: draft, error } = await (supabase
    .from("site_drafts") as any)
    .select("*")
    .eq("id", id)
    .single();

  if (error || !draft) {
    return NextResponse.json({ error: "Draft not found" }, { status: 404 });
  }

  if (draft.customer_id !== customer.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ draft });
}

// PATCH /api/ai/draft/[id] — Update draft status or code
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Draft ID required" }, { status: 400 });
  }

  let body: { status?: string; generated_code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const supabase = createServiceClient();

  // Look up customer
  const { data: customer } = await (supabase
    .from("customers") as any)
    .select("id")
    .eq("clerk_id", userId)
    .single();

  if (!customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  // Fetch draft — verify ownership
  const { data: draft, error: fetchErr } = await (supabase
    .from("site_drafts") as any)
    .select("id, customer_id, status")
    .eq("id", id)
    .single();

  if (fetchErr || !draft) {
    return NextResponse.json({ error: "Draft not found" }, { status: 404 });
  }

  if (draft.customer_id !== customer.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Build update payload
  const update: Record<string, unknown> = {};

  if (body.status) {
    const allowedStatuses = ["ready", "approved", "rejected"];
    if (!allowedStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: `Invalid status. Allowed: ${allowedStatuses.join(", ")}` },
        { status: 400 }
      );
    }
    update.status = body.status;
    if (body.status === "approved") {
      update.approved_at = new Date().toISOString();
    }
  }

  if (body.generated_code !== undefined) {
    if (typeof body.generated_code !== "string") {
      return NextResponse.json(
        { error: "generated_code must be a string" },
        { status: 400 }
      );
    }
    update.generated_code = body.generated_code;
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json(
      { error: "No valid fields to update" },
      { status: 400 }
    );
  }

  const { data: updated, error: updateErr } = await (supabase
    .from("site_drafts") as any)
    .update(update)
    .eq("id", id)
    .select("*")
    .single();

  if (updateErr) {
    return NextResponse.json(
      { error: "Failed to update draft" },
      { status: 500 }
    );
  }

  return NextResponse.json({ draft: updated });
}
