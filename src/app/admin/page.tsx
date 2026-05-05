import { requireAdmin } from "@/lib/auth/admin";
import { AdminBuildForm } from "./_components/AdminBuildForm";

export const metadata = {
  title: "Admin — KPT Designs",
};

export default async function AdminPage() {
  const user = await requireAdmin();
  const email = user.emailAddresses[0]?.emailAddress ?? "(no email)";

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <header className="mb-10">
        <p className="text-sm uppercase tracking-widest text-stone-500">
          Admin
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          Build a site
        </h1>
        <p className="mt-3 text-stone-600">
          Paste a customer URL and we&apos;ll run the discovery → synthesis →
          building pipeline. You&apos;ll land on the preview when it&apos;s done.
        </p>
        <p className="mt-2 text-xs text-stone-500">Signed in as {email}</p>
      </header>

      <AdminBuildForm />
    </main>
  );
}
