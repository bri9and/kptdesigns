"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, LogOut, Shield, Mail, User } from "lucide-react";

export default function AccountPage() {
  const { user, isLoaded } = useUser();
  const clerk = useClerk();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nameInitialized, setNameInitialized] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [signingOut, setSigningOut] = useState(false);

  // Initialize form fields once user loads
  if (isLoaded && user && !nameInitialized) {
    setFirstName(user.firstName ?? "");
    setLastName(user.lastName ?? "");
    setNameInitialized(true);
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-earthy-stone-600" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const initials = [user.firstName?.[0], user.lastName?.[0]]
    .filter(Boolean)
    .join("")
    .toUpperCase() || "?";

  const primaryEmail = user.primaryEmailAddress?.emailAddress ?? "—";

  async function handleUpdateName(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    setSaveError("");

    try {
      await user!.update({ firstName, lastName });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update name";
      setSaveError(message);
      setTimeout(() => setSaveError(""), 5000);
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await clerk.signOut();
      router.push("/");
    } catch {
      setSigningOut(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-earthy-ink">Account</h1>
        <p className="text-sm text-earthy-stone-600 mt-1">
          Manage your profile, email, and security settings.
        </p>
      </div>

      {/* Profile Section */}
      <div className="rounded-xl bg-qblack-light border border-earthy-stone-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="h-5 w-5 text-earthy-stone-600" />
          <h2 className="text-lg font-semibold text-earthy-ink">Profile</h2>
        </div>

        <div className="flex items-center gap-4 mb-6">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={user.fullName ?? "Avatar"}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-qyellow text-qblack-dark flex items-center justify-center text-xl font-bold">
              {initials}
            </div>
          )}
          <div>
            <p className="text-earthy-ink font-medium">
              {user.fullName || "No name set"}
            </p>
            <p className="text-sm text-earthy-stone-600">{primaryEmail}</p>
          </div>
        </div>

        <form onSubmit={handleUpdateName} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-earthy-stone-600 mb-1.5">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="w-full px-4 py-3 rounded-lg bg-qblack border border-earthy-stone-200 text-earthy-ink placeholder:text-earthy-stone-500 focus:outline-none focus:border-qyellow focus:ring-1 focus:ring-qyellow/30"
              />
            </div>
            <div>
              <label className="block text-sm text-earthy-stone-600 mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="w-full px-4 py-3 rounded-lg bg-qblack border border-earthy-stone-200 text-earthy-ink placeholder:text-earthy-stone-500 focus:outline-none focus:border-qyellow focus:ring-1 focus:ring-qyellow/30"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-qyellow hover:bg-qyellow-light text-qblack-dark font-semibold text-sm rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {saving ? "Saving..." : "Update Name"}
            </button>

            {saveSuccess && (
              <span className="text-sm text-green-400">
                Name updated successfully
              </span>
            )}
            {saveError && (
              <span className="text-sm text-red-400">{saveError}</span>
            )}
          </div>
        </form>
      </div>

      {/* Email Section */}
      <div className="rounded-xl bg-qblack-light border border-earthy-stone-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="h-5 w-5 text-earthy-stone-600" />
          <h2 className="text-lg font-semibold text-earthy-ink">Email Addresses</h2>
        </div>

        <div className="space-y-3">
          {user.emailAddresses.map((email) => (
            <div
              key={email.id}
              className="flex items-center justify-between px-4 py-3 rounded-lg bg-qblack border border-earthy-stone-200"
            >
              <span className="text-earthy-ink text-sm">{email.emailAddress}</span>
              {email.id === user.primaryEmailAddressId && (
                <span className="text-xs font-medium bg-qyellow/10 text-qyellow px-2.5 py-1 rounded-full">
                  Primary
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Security Section */}
      <div className="rounded-xl bg-qblack-light border border-earthy-stone-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-5 w-5 text-earthy-stone-600" />
          <h2 className="text-lg font-semibold text-earthy-ink">Security</h2>
        </div>

        <div className="px-4 py-3 rounded-lg bg-qblack border border-earthy-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-earthy-ink font-medium">
                Two-Factor Authentication
              </p>
              <p className="text-xs text-earthy-stone-600 mt-0.5">
                Add an extra layer of security to your account
              </p>
            </div>
            {user.twoFactorEnabled ? (
              <span className="text-xs font-medium bg-green-500/10 text-green-400 px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
                <Eye className="h-3 w-3" />
                2FA Enabled
              </span>
            ) : (
              <span className="text-xs font-medium bg-yellow-500/10 text-yellow-400 px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
                <EyeOff className="h-3 w-3" />
                2FA not set up
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Sign Out Section */}
      <div className="rounded-xl bg-qblack-light border border-earthy-stone-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <LogOut className="h-5 w-5 text-earthy-stone-600" />
          <h2 className="text-lg font-semibold text-earthy-ink">Sign Out</h2>
        </div>

        <p className="text-sm text-earthy-stone-600 mb-4">
          Sign out of your account on this device.
        </p>

        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 font-semibold text-sm rounded-lg px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
        >
          {signingOut ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          {signingOut ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    </div>
  );
}
