"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import type { AuthMode, AuthSubmission } from "@/lib/auth";

const SUCCESS_TITLES: Record<AuthMode, string> = {
  creator: "Verification Request Initiated!",
  brand: "Campaign Escrow Brief Created!",
  login: "Welcome back!",
};

function successMessage(done: AuthSubmission): string {
  switch (done.kind) {
    case "creator":
      return `You have joined the queue as a verified ${done.lane}. Payout destination set to Naira via Paystack direct bank transfer.`;
    case "brand": {
      const name = done.campaign?.name || "your campaign";
      const budget = done.campaign?.budget
        ? ` with budget ${done.campaign.budget}`
        : "";
      return `Your campaign "${name}" is set${budget}. Vetted creators are now reviewing the brief.`;
    }
    case "login":
      return "Signing in to your CreatorsRewards live dashboard.";
  }
}

export function AuthSuccess({
  done,
  onClose,
}: {
  done: AuthSubmission;
  onClose: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // The form disappears on success, so move focus to the new message.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="p-6 sm:p-8 text-center space-y-4 overflow-y-auto">
      <div
        aria-hidden="true"
        className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center mx-auto"
      >
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-2xl font-bold focus:outline-none"
      >
        {SUCCESS_TITLES[done.kind]}
      </h3>
      <p className="text-sm text-cr-dark/80 max-w-sm mx-auto leading-relaxed">
        {successMessage(done)}
      </p>
      <button
        type="button"
        onClick={onClose}
        className="w-full py-3.5 rounded-xl bg-cr-pink hover:bg-cr-coral-hover text-white text-sm font-bold shadow-lg shadow-cr-pink/20 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cr-pink"
      >
        Enter Dashboard Preview
      </button>
    </div>
  );
}
