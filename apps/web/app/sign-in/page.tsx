"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react"; // Keep Lucide for UI icons
// Import brand icons from the Simple Icons (si) pack
import {
  SiGoogle,
  SiYoutube,
  SiInstagram,
  SiX,
  SiTiktok,
  SiSnapchat,
} from "react-icons/si";
import { useRouter } from "next/navigation";
import { Provider } from "../sign-up/page";
import React from "react";

export default function SignInPage() {
  const router = useRouter();

  const handleOAuthSignIn = (provider: Provider) => {
    console.log(`Initiating OAuth for: ${provider}`);
    // 1. OAuth requires a full browser navigation, not an AJAX/fetch call.
    // 2. We hit the Next.js proxy (/api/auth/google), which forwards to NestJS.
    window.location.href = `/api/auth/${provider}`;
  };

  const handleCredentialsSignIn = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    // Grab the values directly from the form
    const formData = new FormData(e.currentTarget);
    const identifier = formData.get("identifier");
    const password = formData.get("password");

    try {
      // Call the proxy route, which forwards to NestJS POST /auth/signin
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Adjust the keys here to match exactly what your NestJS LoginDto expects
        body: JSON.stringify({ email: identifier, password }),
      });

      if (!res.ok) {
        // Handle error (e.g., show toast notification to user)
        const errorData = await res.json();
        console.error("Login failed:", errorData.message);
        return;
      }

      const data = await res.json();

      // The JWT is returned here (data.accessToken).
      // You can store it in localStorage, or ideally, set it as an HTTP-only cookie
      console.log("Success! Token:", data.accessToken);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("An unexpected error occurred", error);
    }
  };

  return (
    <div className="min-h-screen bg-(--bg-page) flex flex-col items-center justify-center p-6 relative">
      {/* --- BACK BUTTON --- */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-muted no-underline hover:text-primary transition-colors"
        >
          <ArrowLeft size={16} strokeWidth={2} /> Back to Site
        </Link>
      </div>

      {/* --- LOGIN CARD --- */}
      <div className="w-full max-w-100 bg-(--bg-card) border border-(--border) rounded-2xl p-10 shadow-sm">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="font-(family-name:--font-display) text-2xl font-bold mb-2 text-(--text-primary)">
            Welcome Back
          </h1>
          <p className="text-(--text-muted) text-sm">
            Sign in to your creator account
          </p>
        </div>

        {/* --- CREDENTIALS FORM --- */}
        <form
          onSubmit={handleCredentialsSignIn}
          className="flex flex-col gap-4 mb-6"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="identifier"
              className="text-sm font-medium text-(--text-primary)"
            >
              Email or Username
            </label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              placeholder="you@example.com"
              required
              className="w-full p-3 rounded-lg border border-(--border) bg-transparent box-border outline-none focus:border-(--violet) transition-colors text-(--text-primary)"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="text-sm font-medium text-(--text-primary)"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-(--text-muted) no-underline hover:text-(--violet) transition-colors"
              >
                Forgot?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full p-3 rounded-lg border border-(--border) bg-transparent box-border outline-none focus:border-(--violet) transition-colors text-(--text-primary)"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-2 rounded-lg bg-(--cr-pink) text-white font-semibold border-none cursor-pointer hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>
        </form>

        {/* --- DIVIDER --- */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-(--border)" />
          <span className="text-xs text-(--text-muted) uppercase tracking-wider">
            Or continue with
          </span>
          <div className="flex-1 h-px bg-(--border)" />
        </div>

        {/* --- OAUTH BUTTONS --- */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="btn-ghost w-full"
            onClick={() => handleOAuthSignIn("google")}
          >
            <SiGoogle size={18} color="#4285F4" /> Continue with Google
          </button>

          <button
            type="button"
            className="btn-ghost w-full"
            onClick={() => handleOAuthSignIn("youtube")}
          >
            <SiYoutube size={18} color="#FF0000" /> Continue with YouTube
          </button>

          <button
            type="button"
            className="btn-ghost w-full"
            onClick={() => handleOAuthSignIn("instagram")}
          >
            <SiInstagram size={18} color="#E4405F" /> Continue with Instagram
          </button>

          <button
            type="button"
            className="btn-ghost w-full"
            onClick={() => handleOAuthSignIn("x")}
          >
            <SiX size={18} color="#000000" /> Continue with X
          </button>

          <button
            type="button"
            className="btn-ghost w-full"
            onClick={() => handleOAuthSignIn("tiktok")}
          >
            <SiTiktok size={18} color="#000000" /> Continue with TikTok
          </button>

          <button
            type="button"
            className="btn-ghost w-full"
            onClick={() => handleOAuthSignIn("snapchat")}
          >
            <SiSnapchat size={18} color="#FFFC00" /> Continue with Snapchat
          </button>
        </div>
      </div>
    </div>
  );
}
