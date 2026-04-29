import type { Metadata } from "next";
import { PitchShell } from "./_components/PitchShell";

export const metadata: Metadata = {
  title: "KPT Designs · Pitch Tool",
  description: "Internal sales tool — generate a customer proposal in two minutes.",
  robots: { index: false, follow: false },
};

export default function PitchPage() {
  return (
      <PitchShell />
  );
}
