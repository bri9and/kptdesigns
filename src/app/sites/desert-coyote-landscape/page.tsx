import type { Metadata } from "next";
import { PageApproach } from "@/app/mockup/_lib/PageApproach";
import { DesertCoyoteSite } from "./DesertCoyoteSite";

export const metadata: Metadata = {
  title: "Desert Coyote Landscape | East Valley AZ",
  description:
    "Sonoran-tough landscapes in Mesa, Gilbert, Chandler, and Queen Creek. Hardscape, irrigation, turf, sod, trees. Free estimates by appointment.",
};

export default function Page() {
  return (
    <PageApproach>
      <DesertCoyoteSite />
    </PageApproach>
  );
}
