"use client";

import { UserProfile } from "@clerk/nextjs";

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Account</h1>
        <p className="text-sm text-white/50 mt-1">
          Manage your profile, email, and security settings.
        </p>
      </div>

      <div className="rounded-xl bg-qblack-light border border-white/10 overflow-hidden [&_.cl-rootBox]:w-full [&_.cl-card]:bg-transparent [&_.cl-card]:shadow-none [&_.cl-navbar]:bg-transparent [&_.cl-navbarButton]:text-white/70 [&_.cl-navbarButton:hover]:text-white [&_.cl-navbarButton\_\_active]:text-white [&_.cl-headerTitle]:text-white [&_.cl-headerSubtitle]:text-white/50 [&_.cl-profileSectionTitle]:text-white [&_.cl-profileSectionContent]:text-white/70 [&_.cl-formFieldLabel]:text-white/70 [&_.cl-badge]:bg-qyellow/10 [&_.cl-badge]:text-qyellow">
        <UserProfile
          appearance={{
            variables: {
              colorPrimary: "#0562EA",
              colorBackground: "transparent",
              colorText: "#ffffff",
              colorTextSecondary: "rgba(255, 255, 255, 0.5)",
              colorInputBackground: "#041B41",
              colorInputText: "#ffffff",
            },
            elements: {
              rootBox: "w-full",
              card: "bg-transparent shadow-none border-none",
              navbar: "bg-transparent border-r border-white/10",
              navbarButton: "text-white/60 hover:text-white hover:bg-white/5",
              pageScrollBox: "p-4 md:p-6",
              headerTitle: "text-white",
              headerSubtitle: "text-white/50",
              formFieldLabel: "text-white/70",
              formFieldInput:
                "bg-qblack border border-white/10 text-white placeholder:text-white/30",
              formButtonPrimary:
                "bg-qyellow hover:bg-qyellow-light text-white",
              profileSectionTitle: "text-white border-b border-white/10",
              profileSectionContent: "text-white/70",
              profileSectionPrimaryButton:
                "text-qyellow hover:text-qyellow-light",
              badge: "bg-qyellow/10 text-qyellow border-none",
              accordionTriggerButton: "text-white hover:bg-white/5",
              accordionContent: "text-white/70",
            },
          }}
        />
      </div>
    </div>
  );
}
