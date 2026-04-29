import { PageApproach } from "../_lib/PageApproach";
import GroupTextEngine from "./_engine/GroupTextEngine";

export default function GroupTextPage() {
  return (
    <main style={{ background: "#1B1E22", color: "#E6E6E1", minHeight: "100vh" }}>
      <PageApproach>
        <GroupTextEngine />
      </PageApproach>
    </main>
  );
}
