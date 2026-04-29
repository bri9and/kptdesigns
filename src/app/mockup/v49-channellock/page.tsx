import { PageApproach } from "../_lib/PageApproach";
import ChannellockEngine from "./_engine/ChannellockEngine";

export default function ChannellockPage() {
  return (
    <main style={{ background: "#44A5A0", color: "#131311", minHeight: "100vh" }}>
      <PageApproach>
        <ChannellockEngine />
      </PageApproach>
    </main>
  );
}
