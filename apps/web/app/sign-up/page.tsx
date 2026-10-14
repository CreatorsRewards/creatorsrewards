"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  SiGoogle,
  SiYoutube,
  SiInstagram,
  SiX,
  SiTiktok,
  SiSnapchat,
} from "react-icons/si";
import React from "react";

export type Provider =
  | "google"
  | "tiktok"
  | "facebook"
  | "instagram"
  | "youtube"
  | "x"
  | "snapchat";

export default function SignUpPage() {
  const router = useRouter();

  const handleOAuthSignUp = (provider: Provider) => {
    // OAuth uses the exact same endpoint for both login and registration
    window.location.href = `/api/auth/${provider}`;
  };

  const handleCredentialsSignUp = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      // Proxy forwards this to NestJS: POST /auth/register
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Ensure these keys match exactly what your NestJS RegisterDto expects
        body: JSON.stringify({ fullName, email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Registration failed:", errorData.message);
        // TODO: Show error message to user in the UI
        return;
      }

      const data = await res.json();

      // If your NestJS register endpoint returns a JWT directly, you can save it here
      console.log("Success! Token:", data.accessToken);

      // Redirect to dashboard or onboarding
      router.push("/dashboard");
    } catch (error) {
      console.error("An unexpected error occurred", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: "24px", left: "24px" }}>
        <Link
          href="/"
          style={{
            color: "var(--text-muted)",
            fontSize: "14px",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <ArrowLeft size={16} strokeWidth={2} /> Back to Site
        </Link>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "40px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "24px",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            Create an Account
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            Join as a creator today
          </p>
        </div>

        {/* --- CREDENTIALS FORM --- */}
        <form
          onSubmit={handleCredentialsSignUp}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              htmlFor="fullName"
              style={{ fontSize: "14px", fontWeight: 500 }}
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Alex Johnson"
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                background: "transparent",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              htmlFor="email"
              style={{ fontSize: "14px", fontWeight: 500 }}
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                background: "transparent",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              htmlFor="password"
              style={{ fontSize: "14px", fontWeight: 500 }}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={8}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                background: "transparent",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              background: "var(--text-primary, #000)",
              color: "var(--bg-primary, #fff)",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              marginTop: "8px",
            }}
          >
            Sign Up
          </button>
        </form>

        {/* --- DIVIDER --- */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{ flex: 1, height: "1px", background: "var(--border)" }}
          />
          <span
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Or continue with
          </span>
          <div
            style={{ flex: 1, height: "1px", background: "var(--border)" }}
          />
        </div>

        {/* --- OAUTH BUTTONS --- */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <button
            type="button"
            className="btn-ghost"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "center",
              border: "1px solid var(--border)",
              padding: "12px",
              borderRadius: "8px",
              cursor: "pointer",
              background: "transparent",
            }}
            onClick={() => handleOAuthSignUp("google")}
          >
            <SiGoogle size={18} color="#4285F4" /> Sign up with Google
          </button>

          <button
            type="button"
            className="btn-ghost"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "center",
              border: "1px solid var(--border)",
              padding: "12px",
              borderRadius: "8px",
              cursor: "pointer",
              background: "transparent",
            }}
            onClick={() => handleOAuthSignUp("youtube")}
          >
            <SiYoutube size={18} color="#FF0000" /> Sign up with YouTube
          </button>

          <button
            type="button"
            className="btn-ghost"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "center",
              border: "1px solid var(--border)",
              padding: "12px",
              borderRadius: "8px",
              cursor: "pointer",
              background: "transparent",
            }}
            onClick={() => handleOAuthSignUp("instagram")}
          >
            <SiInstagram size={18} color="#E4405F" /> Sign up with Instagram
          </button>

          <button
            type="button"
            className="btn-ghost"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "center",
              border: "1px solid var(--border)",
              padding: "12px",
              borderRadius: "8px",
              cursor: "pointer",
              background: "transparent",
            }}
            onClick={() => handleOAuthSignUp("x")}
          >
            <SiX size={18} color="#000000" /> Sign up with X
          </button>

          <button
            type="button"
            className="btn-ghost"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "center",
              border: "1px solid var(--border)",
              padding: "12px",
              borderRadius: "8px",
              cursor: "pointer",
              background: "transparent",
            }}
            onClick={() => handleOAuthSignUp("tiktok")}
          >
            <SiTiktok size={18} color="#000000" /> Sign up with TikTok
          </button>

          <button
            type="button"
            className="btn-ghost"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "center",
              border: "1px solid var(--border)",
              padding: "12px",
              borderRadius: "8px",
              cursor: "pointer",
              background: "transparent",
            }}
            onClick={() => handleOAuthSignUp("snapchat")}
          >
            <SiSnapchat size={18} color="#FFFC00" /> Sign up with Snapchat
          </button>
        </div>

        {/* --- BOTTOM LINK --- */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
            Already have an account?{" "}
            <Link
              href="/sign-in"
              style={{
                color: "var(--text-primary)",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
