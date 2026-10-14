"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";

const INPUT =
  "w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-(--text-primary) outline-none transition-colors placeholder:text-black/40 focus:border-(--cr-pink)";
const LABEL =
  "text-xs font-medium uppercase tracking-wide text-(--text-primary)";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = email.trim().length > 0 && !submitting;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setSubmitting(true);

    const trimmed = email.trim();

    try {
      // The proxy route forwards to NestJS POST /auth/forgot-password
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const message = Array.isArray(data?.message)
          ? data.message.join(", ")
          : data?.message;
        setError(message ?? "We couldn't send the code. Please try again.");
        return;
      }

      // Go to the "enter your code" screen. Adjust the route to match yours.
      router.push(`/reset-password?email=${encodeURIComponent(trimmed)}`);
    } catch {
      setError("Something went wrong. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // Swap bg-[#c8fce4] for your mint token if you have one
    <div className="min-h-screen bg-[#c8fce4]">
      <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col px-6 py-6">
        {/* Back */}
        <Link
          href="/sign-in"
          aria-label="Back to sign in"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-(--text-primary) shadow-sm transition-opacity hover:opacity-80"
        >
          <ArrowLeft size={18} strokeWidth={2} />
        </Link>

        {/* Header */}
        <h1 className="mb-2 mt-6 font-(family-name:--font-display) text-2xl font-bold text-(--text-primary)">
          Reset your password
        </h1>
        <p className="mb-8 text-sm text-(--text-muted)">
          Enter the email tied to your account and we&apos;ll send a code.
        </p>

        {/* Form: the button is pushed to the bottom, as in the design */}
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5">
          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className={LABEL}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="amara@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={INPUT}
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-(--cr-pink) p-3.5 font-semibold text-stone-900 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Send Reset Code
          </button>
        </form>
      </div>
    </div>
  );
}