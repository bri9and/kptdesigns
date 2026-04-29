import type { Metadata } from "next";
import { PageApproach } from "@/app/mockup/_lib/PageApproach";
import { ProposalShell } from "./_proposal/ProposalShell";

export const metadata: Metadata = {
  title: "Proposal · Desert Coyote Landscape | KPT Designs",
  description:
    "A redesign proposal for Desert Coyote Landscape — a Sonoran Field Guide concept with on-domain estimate requests, project gallery, trailer rental, and full service architecture.",
};

export default function Page() {
  return (
    <PageApproach>
      <ProposalShell />
    </PageApproach>
  );
}
