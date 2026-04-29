import { PageApproach } from "../_lib/PageApproach";
import TitleblockEngine from "./_engine/TitleblockEngine";

export default function TitleblockPage() {
  return (
    <main style={{ background: "#F2EEDD", color: "#181816", minHeight: "100vh" }}>
      <PageApproach>
        <TitleblockEngine />
      </PageApproach>
    </main>
  );
}
