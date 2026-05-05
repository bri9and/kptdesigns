import HeroConversation from "./_sections/HeroConversation";
import PhilosophyConversation from "./_sections/PhilosophyConversation";
import StackConversation from "./_sections/StackConversation";
import PortfolioConversation from "./_sections/PortfolioConversation";
import ProcessConversation from "./_sections/ProcessConversation";
import CtaConversation from "./_sections/CtaConversation";

export default function ConversationPage() {
  return (
    <main style={{ background: "#FAFAFA", color: "#1A1A2E", minHeight: "100vh" }}>
      <HeroConversation />
      <PhilosophyConversation />
      <StackConversation />
      <PortfolioConversation />
      <ProcessConversation />
      <CtaConversation />
    </main>
  );
}
