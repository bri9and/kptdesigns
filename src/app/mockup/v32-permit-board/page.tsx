import { PageApproach } from "../_lib/PageApproach";
import PermitBoardEngine from "./_engine/PermitBoardEngine";

export default function PermitBoardPage() {
  return (
    <main style={{ background: "#F0EFE9", color: "#0E1F2E", minHeight: "100vh" }}>
      <PageApproach>
        <PermitBoardEngine />
      </PageApproach>
    </main>
  );
}
