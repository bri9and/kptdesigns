import type { Metadata } from "next";
import { ProposalShell } from "./_proposal/ProposalShell";

export const metadata: Metadata = {
  title: "Proposal · Lake Arthur Golf Club | KPT Designs",
  description:
    "A redesign proposal for Lake Arthur Golf Club — a Lakeside Field Guide concept with on-domain booking, banquet leads, tournament inquiries, and self-serve league signup.",
};

export default function Page() {
  return (
      <ProposalShell />
  );
}
