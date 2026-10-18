"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Unlock,
} from "lucide-react";

const MIN_LENGTH = 8;

const INPUT_BASE =
  "w-full rounded-xl border bg-white/70 px-4 py-3 pr-12 text-sm text-(--text-primary) outline-none transition-colors placeholder:text-black/40";
const LABEL =
  "text-xs font-medium uppercase tracking-wide text-(--text-primary)";
const BUTTON =
  "mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-(--cr-pink) p-3.5 font-semibold text-stone-900 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

/* -------------------------------------------------------------------------- */
/*  Password field with show/hide toggle                                      */
/* -------------------------------------------------------------------------- */

function PasswordField({
  id,
  label,
  placeholder,
  value,
  autoComplete,
  error,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  autoComplete: string;
  error?: string | null;
  onChange: (value: string) => void;
}) {
  const [show, setShow] = useState(false);

  // Pink outline once filled (as in the design), red when invalid
  const border = error
    ? "border-red-500"
    : value
      ? "border-(--cr-pink)"
      : "border-black/10 focus:border-(--cr-pink)";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          className={`${INPUT_BASE} ${border}`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-black/50 hover:text-black/80"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Success screen                                                            */
/* -------------------------------------------------------------------------- */

function SuccessScreen() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #9fd3c2 0%, #c8fce4 55%, #c8fce4 100%)",
      }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col px-6 py-6">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          {/* Locked -> unlocked */}
          <div className="mb-8 flex items-center gap-4">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
              <Lock size={26} className="text-red-500" />
              <span className="absolute h-0.5 w-12 -rotate-45 rounded bg-red-500" />
            </div>
            <ArrowRight size={18} strokeWidth={3} className="text-stone-900" />
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-[0_0_32px_rgba(52,211,153,0.55)]">
              <Unlock size={32} className="text-stone-900" />
            </div>
          </div>

          <h1 className="font-(family-name:--font-display) text-2xl font-bold leading-tight text-(--text-primary)">
            Password Reset
          </h1>
          <p className="mb-4 font-(family-name:--font-display) text-2xl font-bold text-(--cr-pink)">
            Successfully
          </p>
          <p className="max-w-64 text-xs text-(--text-muted)">
            Your password has been updated. You can now sign in securely with
            your new password.
          </p>
        </div>

        <Link href="/sign-in" className={`${BUTTON} no-underline`}>
          Sign In with New Password
        </Link>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

function ResetPasswordForm() {
  const router = useRouter();
  const token = useSearchParams().get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const tooShort = password.length > 0 && password.length < MIN_LENGTH;
  const mismatch = confirm.length > 0 && password !== confirm;
  const canSubmit =
    !!token &&
    password.length >= MIN_LENGTH &&
    password === confirm &&
    !submitting;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setSubmitting(true);

    try {
      // The proxy route forwards to NestJS POST /auth/reset-password
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const message = Array.isArray(data?.message)
          ? data.message.join(", ")
          : data?.message;
        setError(
          message ?? "We couldn't reset your password. Please try again.",
        );
        return;
      }

      setDone(true);
    } catch {
      setError("Something went wrong. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) return <SuccessScreen />;

  return (
    // Swap bg-[#c8fce4] for your mint token if you have one
    <div className="min-h-screen bg-[#c8fce4]">
      <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col px-6 py-6">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-(--text-primary) shadow-sm transition-opacity hover:opacity-80"
        >
          <ArrowLeft size={18} strokeWidth={2} />
        </button>

        <h1 className="mb-2 mt-6 font-(family-name:--font-display) text-2xl font-bold text-(--text-primary)">
          Set a new password
        </h1>
        <p className="mb-8 text-sm text-(--text-muted)">
          Make it something you haven&apos;t used before.
        </p>

        {!token ? (
          <div className="flex flex-1 flex-col gap-4">
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              This reset link is invalid or has expired.
            </p>
            <Link
              href="/forgot-password"
              className={`${BUTTON} no-underline`}
            >
              Request a new link
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5">
            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <PasswordField
              id="new-password"
              label="New password"
              placeholder="Create a strong password"
              autoComplete="new-password"
              value={password}
              onChange={setPassword}
              error={
                tooShort ? `Use at least ${MIN_LENGTH} characters.` : null
              }
            />
            <PasswordField
              id="confirm-password"
              label="Confirm password"
              placeholder="Re-enter your password"
              autoComplete="new-password"
              value={confirm}
              onChange={setConfirm}
              error={mismatch ? "Passwords don't match." : null}
            />

            <button type="submit" disabled={!canSubmit} className={BUTTON}>
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Save New Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// useSearchParams needs a Suspense boundary or `next build` fails
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}