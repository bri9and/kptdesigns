import { PageApproach } from "../_lib/PageApproach";
import GroupTextEngine from "./_engine/GroupTextEngine";

export default function GroupTextPage() {
  return (
    <main style={{ background: "#F2F2F7", color: "#0B0B10", minHeight: "100vh" }}>
      <PageApproach>
        <GroupTextEngine />
      </PageApproach>
    </main>
  );
}
