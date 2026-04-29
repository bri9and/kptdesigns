import type { Metadata } from "next";
import { ProposalShell } from "./_proposal/ProposalShell";

export const metadata: Metadata = {
  title: "Proposal · Desert Coyote Landscape | KPT Designs",
  description:
    "A redesign proposal for Desert Coyote Landscape — a Sonoran Field Guide concept with on-domain estimate requests, project gallery, trailer rental, and full service architecture.",
};

// No PageApproach wrapper — the depth-entrance zoom didn't fit the
// production-site feel for Desert Coyote.
export default function Page() {
  return <ProposalShell />;
}
