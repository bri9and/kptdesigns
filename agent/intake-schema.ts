/**
 * Structured intake captured by the Voice Landman agent during a single call.
 * Mirrors the questions in /agent/system-prompt.md. Nullable fields mean the
 * caller did not know or did not say. The agent should never invent values.
 */
export type CallReason =
  | "unsolicited_offer"
  | "considering_sale"
  | "curious"
  | "inherited"
  | "other";

export type MineralIntake = {
  caller_name: string;
  callback_number: string;
  county: string;
  state: "PA" | "OH" | "WV";
  approximate_acres: number;
  surface_or_mineral_only: "mineral_only" | "surface_and_mineral";
  currently_receiving_royalties: boolean;
  operator: string | null;
  is_leased: boolean;
  lease_start_year: number | null;
  call_reason: CallReason;
  notes: string;
};
