"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Eye, EyeOff, Loader2 } from "lucide-react";
import {
  SiGoogle,
  SiYoutube,
  SiInstagram,
  SiX,
  SiTiktok,
  SiSnapchat,
} from "react-icons/si";
import type { IconType } from "react-icons";

// Keep exporting this: the sign-in page imports it
export type Provider =
  | "google"
  | "tiktok"
  | "facebook"
  | "instagram"
  | "youtube"
  | "x"
  | "snapchat";

type SignUpRole = "UGC_CREATOR" | "BRAND";

/* -------------------------------------------------------------------------- */
/*  Config                                                                    */
/* -------------------------------------------------------------------------- */

const ROLE_OPTIONS: {
  value: SignUpRole;
  emoji: string;
  title: string;
  description: string;
  chips: string[];
  iconBg: string;
}[] = [
  {
    value: "UGC_CREATOR",
    emoji: "🎬",
    title: "I'm a Creator",
    description:
      "Find campaigns, create content and earn from your performance.",
    chips: ["UGC", "Clippers", "Micro", "Nano"],
    iconBg: "#ffffff",
  },
  {
    value: "BRAND",
    emoji: "🏢",
    title: "I'm a Brand",
    description: "Launch campaigns, work with creators and grow your reach.",
    chips: ["Beauty", "FMCG", "Fintech", "Lifestyle"],
    iconBg: "#fde2bd",
  },
];

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

/* -------------------------------------------------------------------------- */
/*  Small pieces                                                              */
/* -------------------------------------------------------------------------- */

function Field({
  id,
  label,
  type = "text",
  placeholder,
  value,
  autoComplete,
  inputMode,
  minLength,
  onChange,
}: {
  id: string;
  label: string;
  type?: "text" | "email" | "tel" | "password";
  placeholder: string;
  value: string;
  autoComplete: string;
  inputMode?: "tel" | "email" | "text";
  minLength?: number;
  onChange: (value: string) => void;
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={isPassword && show ? "text" : type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          minLength={minLength}
          required
          onChange={(e) => onChange(e.target.value)}
          className={`${INPUT} ${isPassword ? "pr-12" : ""}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-black/50 hover:text-black/80"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function SignUpPage() {
  const router = useRouter();

  const [role, setRole] = useState<SignUpRole>("UGC_CREATOR");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const phoneDigits = phone.replace(/\D/g, "");
  const canSubmit =
    fullName.trim().length > 0 &&
    email.trim().length > 0 &&
    phoneDigits.length >= 7 &&
    password.length >= 8 &&
    !submitting;

  const handleOAuthSignUp = (provider: Provider) => {
    // OAuth uses the same endpoint for login and registration, and needs a
    // full browser navigation, not fetch.
    window.location.href = `/api/auth/${provider}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setSubmitting(true);

    try {
      // The proxy route forwards to NestJS POST /auth/register
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Keys must match your NestJS RegisterDto
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password,
          role,
        }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const message = Array.isArray(data?.message)
          ? data.message.join(", ")
          : data?.message;
        setError(message ?? "We couldn't create your account. Try again.");
        return;
      }

      // No token logging or storage here. Have the proxy route set it as an
      // HTTP-only cookie instead.
      router.push("/dashboard");
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
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-(--text-primary) shadow-sm transition-opacity hover:opacity-80"
        >
          <ArrowLeft size={18} strokeWidth={2} />
        </button>

        <h1 className="mb-6 mt-6 font-(family-name:--font-display) text-2xl font-bold text-(--text-primary)">
          Let&apos;s get you set up
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5">
          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {/* Role */}
          <div>
            <p className="mb-3 text-sm font-semibold text-(--text-primary)">
              How do you want to use{" "}
              <span className="rounded bg-(--cr-pink) px-1.5 py-0.5 text-white">
                CreatorsRewards?
              </span>
            </p>
            <div
              role="radiogroup"
              aria-label="Account type"
              className="flex flex-col gap-3"
            >
              {ROLE_OPTIONS.map((opt) => {
                const selected = role === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setRole(opt.value)}
                    className={`relative rounded-2xl p-4 text-left transition-colors ${
                      selected
                        ? "bg-(--cr-pink) text-stone-900"
                        : "border border-black/5 bg-white/80 text-stone-900 hover:bg-white"
                    }`}
                  >
                    {selected && (
                      <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-white">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    )}
                    <div className="flex items-start gap-3">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg"
                        style={{ background: opt.iconBg }}
                      >
                        {opt.emoji}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{opt.title}</p>
                        <p
                          className={`mt-0.5 text-sm ${
                            selected ? "font-medium" : "text-black/60"
                          }`}
                        >
                          {opt.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {opt.chips.map((chip) => (
                        <span
                          key={chip}
                          className={`rounded-full px-3 py-1 text-xs ${
                            selected
                              ? "bg-white/25 text-white"
                              : "border border-black/15 text-black/70"
                          }`}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details */}
          <Field
            id="fullName"
            label="Full name"
            placeholder="Amara Okafor"
            autoComplete="name"
            value={fullName}
            onChange={setFullName}
          />
          <Field
            id="email"
            label="Email"
            type="email"
            inputMode="email"
            placeholder="amara@email.com"
            autoComplete="email"
            value={email}
            onChange={setEmail}
          />
          <Field
            id="phone"
            label="Phone number"
            type="tel"
            inputMode="tel"
            placeholder="+234 800 000 0000"
            autoComplete="tel"
            value={phone}
            onChange={setPhone}
          />
          <Field
            id="password"
            label="Password"
            type="password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            minLength={8}
            value={password}
            onChange={setPassword}
          />

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-(--cr-pink) p-3.5 font-semibold text-stone-900 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Continue
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-(--text-muted)">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-(--cr-pink) no-underline hover:opacity-80"
          >
            Sign in
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

        <div className="grid grid-cols-2 gap-3 pb-6">
          {OAUTH_PROVIDERS.map(({ provider, label, icon: Icon, color }) => (
            <button
              key={provider}
              type="button"
              className="btn-ghost w-full"
              onClick={() => handleOAuthSignUp(provider)}
            >
              <Icon size={18} color={color} /> {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}