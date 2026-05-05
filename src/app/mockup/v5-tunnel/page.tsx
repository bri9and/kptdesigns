import { PageApproach } from "../_lib/PageApproach";
import TunnelEngine from "./_engine/TunnelEngine";

export default function TunnelPage() {
  return (
    <main style={{ background: "#000812", color: "#E8F1FF", minHeight: "100vh" }}>
      <PageApproach>
        <TunnelEngine />
      </PageApproach>
    </main>
  );
}
