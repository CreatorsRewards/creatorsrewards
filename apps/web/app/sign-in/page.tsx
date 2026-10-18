"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import {
  SiGoogle,
  SiYoutube,
  SiInstagram,
  SiX,
  SiTiktok,
  SiSnapchat,
} from "react-icons/si";
import type { IconType } from "react-icons";
// `import type` so the page file isn't pulled in at runtime. Better still,
// move `Provider` to a shared types file and import it from there.
import type { Provider } from "../sign-up/page";

// Add, remove or reorder providers here
const OAUTH_PROVIDERS: {
  provider: Provider;
  label: string;
  icon: IconType;
  color: string;
}[] = [
  { provider: "google", label: "Google", icon: SiGoogle, color: "#4285F4" },
  { provider: "youtube", label: "YouTube", icon: SiYoutube, color: "#FF0000" },
  { provider: "instagram", label: "Instagram", icon: SiInstagram, color: "#E4405F" },
  { provider: "x", label: "X", icon: SiX, color: "#000000" },
  { provider: "tiktok", label: "TikTok", icon: SiTiktok, color: "#000000" },
  { provider: "snapchat", label: "Snapchat", icon: SiSnapchat, color: "#FFFC00" },
];

const INPUT =
  "w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-(--text-primary) outline-none transition-colors placeholder:text-black/40 focus:border-(--cr-pink)";
const LABEL =
  "text-xs font-medium uppercase tracking-wide text-(--text-primary)";

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOAuthSignIn = (provider: Provider) => {
    // OAuth needs a full browser navigation, not fetch. The Next.js proxy
    // (/api/auth/:provider) forwards to NestJS.
    window.location.href = `/api/auth/${provider}`;
  };

  const handleCredentialsSignIn = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      // The proxy route forwards to NestJS POST /auth/signin
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const message = Array.isArray(data?.message)
          ? data.message.join(", ")
          : data?.message;
        setError(message ?? "Incorrect email or password.");
        return;
      }

      // Don't log or store the token here. Have the proxy route set it as an
      // HTTP-only cookie instead, so page scripts can never read it.
      router.push(data?.mustChangePassword ? "/change-password" : "/dashboard");
    } catch {
      setError("Something went wrong. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // Swap bg-[#c8fce4] for your mint token if you have one
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#c8fce4] p-6">
      <Link
        href="/"
        className="absolute left-6 top-6 flex items-center gap-1.5 text-sm text-(--text-muted) no-underline transition-colors hover:text-(--text-primary)"
      >
        <ArrowLeft size={16} strokeWidth={2} /> Back to Site
      </Link>

      <div className="w-full max-w-sm">
        {/* Header */}
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-(--cr-pink) px-3 py-1.5 text-xs font-medium text-white">
          <span aria-hidden>👋</span> Good to see you again
        </span>
        <h1 className="mb-1 font-(family-name:--font-display) text-3xl font-bold text-(--text-primary)">
          Welcome back
        </h1>
        <p className="mb-8 text-sm text-(--text-muted)">
          Log in to keep earning
        </p>

        {/* Credentials form */}
        <form onSubmit={handleCredentialsSignIn} className="flex flex-col gap-5">
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
              className={INPUT}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className={LABEL}>
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••••••"
                required
                className={`${INPUT} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-black/50 hover:text-black/80"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Link
            href="/forgot-password"
            className="self-end text-sm font-medium text-(--cr-pink) no-underline hover:opacity-80"
          >
            Forgot password?
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-(--cr-pink) p-3.5 font-semibold text-stone-900 transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-(--text-muted)">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-(--cr-pink) no-underline hover:opacity-80"
          >
            Sign Up
          </Link>
        </p>

        {/* OAuth: delete this block if you only want email + password */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-black/10" />
          <span className="text-xs uppercase tracking-wider text-(--text-muted)">
            Or continue with
          </span>
          <div className="h-px flex-1 bg-black/10" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {OAUTH_PROVIDERS.map(({ provider, label, icon: Icon, color }) => (
            <button
              key={provider}
              type="button"
              className="btn-ghost w-full"
              onClick={() => handleOAuthSignIn(provider)}
            >
              <Icon size={18} color={color} /> {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}