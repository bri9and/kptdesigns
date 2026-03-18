import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Anthropic from "@anthropic-ai/sdk";
import { createServiceClient } from "@/lib/supabase";
import { SITE_GENERATION_PROMPT, buildUserPrompt } from "@/lib/ai-prompts";
import rateLimit from "@/lib/rate-limit";

const limiter = rateLimit({ interval: 60_000, uniqueTokenPerInterval: 500 });

/* eslint-disable @typescript-eslint/no-explicit-any */

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const maxDuration = 60; // Allow up to 60s for generation

export async function POST(req: NextRequest) {
  // ── Auth ──────────────────────────────────────────────────────────────────
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── Rate limit by authenticated user ──────────────────────────────────────
  const { success } = limiter.check(30, userId);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  // ── Validate input ────────────────────────────────────────────────────────
  let body: {
    siteId?: string;
    prompt?: string;
    businessName?: string;
    domain?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { siteId, prompt, businessName, domain } = body;

  if (!siteId || typeof siteId !== "string") {
    return NextResponse.json({ error: "siteId is required" }, { status: 400 });
  }
  if (!prompt || typeof prompt !== "string" || prompt.trim().length < 10) {
    return NextResponse.json(
      { error: "prompt is required (minimum 10 characters)" },
      { status: 400 }
    );
  }
  if (!businessName || typeof businessName !== "string") {
    return NextResponse.json(
      { error: "businessName is required" },
      { status: 400 }
    );
  }

  // ── Verify ownership ─────────────────────────────────────────────────────
  const supabase = createServiceClient();

  // Look up customer by Clerk ID
  const { data: customer, error: custErr } = await (supabase
    .from("customers") as any)
    .select("id")
    .eq("clerk_id", userId)
    .single();

  if (custErr || !customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  // Verify this site belongs to the customer
  const { data: site, error: siteErr } = await (supabase
    .from("sites") as any)
    .select("id, name, customer_id")
    .eq("id", siteId)
    .single();

  if (siteErr || !site) {
    return NextResponse.json({ error: "Site not found" }, { status: 404 });
  }

  if (site.customer_id !== customer.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // ── Create draft record (status: generating) ─────────────────────────────
  const { data: draft, error: draftErr } = await (supabase
    .from("site_drafts") as any)
    .insert({
      site_id: siteId,
      customer_id: customer.id,
      prompt: prompt.trim(),
      status: "generating",
    })
    .select("id")
    .single();

  if (draftErr || !draft) {
    return NextResponse.json(
      { error: "Failed to create draft" },
      { status: 500 }
    );
  }

  // ── Stream response from Claude ───────────────────────────────────────────
  const userPrompt = buildUserPrompt(businessName, domain, prompt.trim());

  try {
    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 8192,
      system: SITE_GENERATION_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    // Set up streaming response
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        // Send the draft ID immediately so the client knows it
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "draft_id", draftId: draft.id })}\n\n`
          )
        );

        let fullCode = "";

        stream.on("text", (text) => {
          fullCode += text;
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "chunk", text })}\n\n`
            )
          );
        });

        stream.on("error", async (error) => {
          // Update draft status to indicate failure
          await (supabase.from("site_drafts") as any)
            .update({ status: "rejected", generated_code: null })
            .eq("id", draft.id);

          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "error", message: String(error) })}\n\n`
            )
          );
          controller.close();
        });

        stream.on("end", async () => {
          // Strip markdown fences if Claude included them despite instructions
          let cleanCode = fullCode.trim();
          if (cleanCode.startsWith("```")) {
            cleanCode = cleanCode.replace(/^```[a-z]*\n?/, "").replace(/\n?```$/, "");
          }

          // Save the generated code
          await (supabase.from("site_drafts") as any)
            .update({
              generated_code: cleanCode,
              status: "ready",
            })
            .eq("id", draft.id);

          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "done", draftId: draft.id })}\n\n`
            )
          );
          controller.close();
        });
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    // If we fail before streaming starts, clean up the draft
    await (supabase.from("site_drafts") as any)
      .update({ status: "rejected" })
      .eq("id", draft.id);

    return NextResponse.json(
      { error: "AI generation failed: " + String(error) },
      { status: 500 }
    );
  }
}
