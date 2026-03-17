"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@clerk/nextjs";
import {
  CheckCircle,
  Globe,
  ArrowRight,
  Loader2,
  Mail,
  Layout,
  LogIn,
  Rocket,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeUp, stagger } from "@/lib/animations";

interface SessionData {
  domain: string;
  email: string | null;
  status: string;
  sitePackage: string | null;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    fetch(`/api/domains/session?id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => setSession(data))
      .catch(() => setSession(null))
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading) {
    return (
      <div className="pt-40 pb-20 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-qyellow mx-auto" />
      </div>
    );
  }

  const hasSite = !!session?.sitePackage;

  return (
    <>
      <section className="pt-32 pb-20 bg-qblack-dark text-qwhite relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-light" />
        <div className="max-w-xl mx-auto px-6 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="mb-6">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-serif text-3xl sm:text-4xl font-bold mb-4"
            >
              {session?.domain ? (
                <>
                  <span className="text-qyellow">{session.domain}</span> is yours!
                </>
              ) : (
                "Payment received!"
              )}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-qwhite/60 text-base mb-6 max-w-md mx-auto">
              {session?.domain
                ? "Your domain is being registered now. You'll receive a confirmation email with DNS details and next steps."
                : "Your domain registration is being processed. We'll be in touch shortly."}
            </motion.p>

            {/* Site package confirmation */}
            {hasSite && (
              <motion.div
                variants={fadeUp}
                className="mb-6 px-5 py-4 rounded-xl bg-qyellow/5 border border-qyellow/20 text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-qyellow/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Rocket className="h-5 w-5 text-qyellow" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-qwhite mb-1">
                      Site build in progress
                    </p>
                    <p className="text-xs text-qwhite/50">
                      Your <span className="text-qyellow capitalize">{session?.sitePackage}</span> website is being
                      provisioned. We&apos;re setting up your repository, deployment, and DNS records.
                      You&apos;ll see progress in your dashboard.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {session?.email && (
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-qblack-light border border-qwhite/10 text-sm text-qwhite/60 mb-8"
              >
                <Mail className="h-4 w-4" />
                Confirmation sent to {session.email}
              </motion.div>
            )}

            {/* Not signed in prompt */}
            {!isSignedIn && (
              <motion.div
                variants={fadeUp}
                className="mb-8 px-5 py-4 rounded-xl bg-qblack-light border border-qwhite/10"
              >
                <div className="flex items-center gap-3 justify-center">
                  <LogIn className="h-5 w-5 text-qyellow" />
                  <div className="text-sm text-qwhite/60">
                    <Link
                      href="/sign-up"
                      className="text-qyellow hover:text-qyellow-light underline underline-offset-2 font-medium"
                    >
                      Create an account
                    </Link>
                    {" "}to manage your domain and track your site build.
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div variants={fadeUp} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {isSignedIn ? (
                  <Link
                    href="/dashboard"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "bg-qyellow hover:bg-qyellow-light text-qblack-dark font-semibold px-8"
                    )}
                  >
                    {hasSite ? (
                      <>
                        <Layout className="mr-2 h-4 w-4" />
                        View in Dashboard
                      </>
                    ) : (
                      <>
                        <Globe className="mr-2 h-4 w-4" />
                        Go to Dashboard
                      </>
                    )}
                  </Link>
                ) : (
                  <Link
                    href="/domains"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "bg-qyellow hover:bg-qyellow-light text-qblack-dark font-semibold px-8"
                    )}
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Search more domains
                  </Link>
                )}

                {!hasSite && (
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center h-11 px-8 text-base font-medium rounded-lg border border-qwhite/30 text-qwhite hover:bg-qwhite/10 transition-all"
                  >
                    Need a website? <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="pt-40 pb-20 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-qyellow mx-auto" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
