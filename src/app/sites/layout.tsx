export default function SitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Strip the KWD header/footer — portfolio sites render standalone
  return <>{children}</>;
}
