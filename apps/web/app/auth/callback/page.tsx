"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { UserRole } from "@repo/types";

function AuthCallbackContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter();

  useEffect(() => {
    if (!code) return;
    // Handle your OAuth / Auth exchange logic here
    // 1. Grab the token from the URL (e.g., ?token=eyJh...)
    const token = searchParams.get("token");

    if (token) {
      // 2. Save the token (localStorage, Context, or send to an API to set a cookie)
      localStorage.setItem("auth_token", token);

      try {
        // 2. Decode the token to read the payload
        // (Make sure your backend includes the 'role' in the JWT payload)
        const decodedToken = jwtDecode<{ role: UserRole }>(token);

        // 3. Route based on the role
        switch (decodedToken.role) {
          case UserRole.SUPER_ADMIN:
            router.push("/admin");
            break;
          case UserRole.CUSTOMER_REP:
            router.push("/support");
            break;
          case UserRole.UGC_CREATOR:
            router.push("/creator");
            break;
          case UserRole.CLIPPER:
            router.push("/clipper");
            break;
          case UserRole.BRAND:
            router.push("/brand");
            break;
          default:
            // Fallback for unknown roles
            router.push("/unauthorized");
        }
      } catch (error) {
        console.error("Invalid token format", error);
        router.push("/login?error=invalid_token");
      }
    } else {
      // Handle missing token scenario
      router.push("/login?error=auth_failed");
    }
  }, [code, router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Completing authentication, please wait...</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p>Loading auth callback...</p>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
