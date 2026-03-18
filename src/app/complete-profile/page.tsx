"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { ArrowRight, Loader2 } from "lucide-react";

export default function CompleteProfilePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-qblack flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-qwhite/40" />
      </div>
    );
  }

  if (!user) {
    router.push("/sign-in");
    return null;
  }

  // If user already has a name, redirect to dashboard
  if (user.firstName && user.lastName) {
    router.push("/dashboard");
    return null;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const firstName = (formData.get("firstName") as string).trim();
    const lastName = (formData.get("lastName") as string).trim();

    if (!firstName || !lastName) {
      setError("Both fields are required.");
      setSaving(false);
      return;
    }

    try {
      await user!.update({ firstName, lastName });
      router.push("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update profile";
      setError(message);
      setSaving(false);
    }
  }

  const email = user.primaryEmailAddress?.emailAddress ?? "";
  const isPrivateRelay = email.includes("privaterelay");

  return (
    <div className="min-h-screen bg-qblack flex items-center justify-center px-6">
      <div className="w-full max-w-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-10">
          <Logo variant="full" size="lg" className="inline-block mb-8" />
          <h1 className="text-[28px] font-bold text-qwhite tracking-tight">
            Complete your profile
          </h1>
          <p className="text-qwhite/40 mt-2 text-[15px]">
            {isPrivateRelay
              ? "Apple hides your name — let us know what to call you."
              : "Tell us your name so we can personalize your experience."}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="cp-first" className="block text-[13px] font-medium text-qwhite/50 mb-2">
                First name
              </label>
              <input
                id="cp-first"
                type="text"
                name="firstName"
                required
                autoFocus
                defaultValue={user.firstName ?? ""}
                autoComplete="given-name"
                placeholder="Jane"
                className="w-full h-12 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-qwhite placeholder:text-qwhite/20 text-[15px] focus:outline-none focus:border-qyellow/60 focus:ring-2 focus:ring-qyellow/20 transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="cp-last" className="block text-[13px] font-medium text-qwhite/50 mb-2">
                Last name
              </label>
              <input
                id="cp-last"
                type="text"
                name="lastName"
                required
                defaultValue={user.lastName ?? ""}
                autoComplete="family-name"
                placeholder="Smith"
                className="w-full h-12 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-qwhite placeholder:text-qwhite/20 text-[15px] focus:outline-none focus:border-qyellow/60 focus:ring-2 focus:ring-qyellow/20 transition-all duration-200"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full h-12 rounded-xl bg-qyellow hover:bg-qyellow-light text-white font-semibold text-[15px] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2 shadow-lg shadow-qyellow/20 hover:shadow-qyellow/30"
          >
            {saving ? (
              <Loader2 className="h-4.5 w-4.5 animate-spin" />
            ) : (
              <>
                Continue <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
