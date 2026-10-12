import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = { title: "Sign in" };

// PLACEHOLDER: replaced once the Figma design for sign-in arrives.
// The form itself will live in components/auth/SignInForm.tsx and be rendered
// here, so this file stays a thin server component.
export default function SignInPage() {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-16">
      <h1 className="font-display text-3xl font-bold">Sign in</h1>
      <p className="mt-3 text-cr-dark/75">The sign-in form is coming.</p>
      <p className="mt-6 text-sm">
        New to CreatorsRewards?{" "}
        <Link
          href={ROUTES.signUp}
          className="font-bold text-cr-pink hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
