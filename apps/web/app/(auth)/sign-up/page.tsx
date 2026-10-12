import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = { title: "Create your account" };

// PLACEHOLDER: replaced once the Figma design for sign-up arrives.
// The form itself will live in components/auth/SignUpForm.tsx and be rendered
// here, so this file stays a thin server component.
export default function SignUpPage() {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-16">
      <h1 className="font-display text-3xl font-bold">Create your account</h1>
      <p className="mt-3 text-cr-dark/75">
        The sign-up form goes here. Design coming.
      </p>
      <p className="mt-6 text-sm">
        Already have an account?{" "}
        <Link
          href={ROUTES.signIn}
          className="font-bold text-cr-pink hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
