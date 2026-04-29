"use client";

// Demo helper for Desert Coyote's quote-request flow. No real API call,
// no persistence — fakes a 1.2s submission and returns a confirmation
// number so the UI feels like the real thing.

export async function fakeSubmitQuote(input: {
  projectType: string;
  size: string;
  contact: { name: string; email: string; phone: string };
}): Promise<{ ok: true; ticketId: string }> {
  await new Promise((r) => setTimeout(r, 1200));
  const ticketId = `DC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  // eslint-disable-next-line no-console
  console.log("[desert-coyote quote-demo] submission simulated", input, { ticketId });
  return { ok: true, ticketId };
}

export const DEMO_MODE = true as const;
