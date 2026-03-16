"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Globe, ArrowRight, Loader2, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeUp, stagger } from "@/lib/animations";

interface SessionData {
  domain: string;
  email: string | null;
  status: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

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

            <motion.p variants={fadeUp} className="text-qwhite/60 text-base mb-8 max-w-md mx-auto">
              {session?.domain
                ? "Your domain is being registered now. You'll receive a confirmation email with DNS details and next steps."
                : "Your domain registration is being processed. We'll be in touch shortly."}
            </motion.p>

            {session?.email && (
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-qblack-light border border-qwhite/10 text-sm text-qwhite/60 mb-8"
              >
                <Mail className="h-4 w-4" />
                Confirmation sent to {session.email}
              </motion.div>
            )}

            <motion.div variants={fadeUp} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center h-11 px-8 text-base font-medium rounded-lg border border-qwhite/30 text-qwhite hover:bg-qwhite/10 transition-all"
                >
                  Need a website? <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
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
