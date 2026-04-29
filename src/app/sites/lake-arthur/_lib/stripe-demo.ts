"use client";

// Demo-mode Stripe helper. We do NOT mount real Stripe Elements tonight
// (would require @stripe/react-stripe-js, a new dependency). Instead, the
// booking flow renders a styled card-input placeholder and calls
// fakeChargeDeposit() to simulate the charge.

export async function fakeChargeDeposit(input: {
  amountCents: number;
  description: string;
}): Promise<{ ok: true; confirmationId: string }> {
  await new Promise((r) => setTimeout(r, 1200));
  const confirmationId = `LA-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  // eslint-disable-next-line no-console
  console.log("[lake-arthur stripe-demo] charge simulated", input, { confirmationId });
  return { ok: true, confirmationId };
}

export const DEMO_MODE = true as const;
