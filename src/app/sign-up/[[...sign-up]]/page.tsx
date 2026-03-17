import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-qblack flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-qwhite">Create your account</h1>
          <p className="text-qwhite/60 mt-2 text-sm">
            Get started with Ego Web Design
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              cardBox: "w-full shadow-2xl",
              card: "bg-qblack-light border border-white/10 shadow-2xl",
              headerTitle: "text-qwhite",
              headerSubtitle: "text-qwhite/60",
              socialButtonsBlockButton:
                "bg-qblack border border-white/10 text-qwhite hover:bg-qblack-light",
              socialButtonsBlockButtonText: "text-qwhite",
              dividerLine: "bg-white/10",
              dividerText: "text-qwhite/40",
              formFieldLabel: "text-qwhite/80",
              formFieldInput:
                "bg-qblack border border-white/15 text-qwhite placeholder:text-qwhite/30 focus:border-qyellow focus:ring-1 focus:ring-qyellow/40",
              formButtonPrimary:
                "bg-qyellow hover:bg-qyellow-light text-white font-semibold shadow-md",
              footerActionLink: "text-qyellow hover:text-qyellow-light",
              footerActionText: "text-qwhite/60",
              identityPreviewEditButton: "text-qyellow hover:text-qyellow-light",
              formFieldAction: "text-qyellow hover:text-qyellow-light",
              alertText: "text-qwhite/80",
              badge: "bg-qyellow/20 text-qyellow",
              otpCodeFieldInput:
                "bg-qblack border border-white/15 text-qwhite",
            },
            layout: {
              socialButtonsPlacement: "bottom",
              showOptionalFields: false,
            },
          }}
        />
      </div>
    </div>
  );
}
