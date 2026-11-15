"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { ROLE_DASHBOARD_MAP } from "@/proxy";

// Helper function to read a cookie by name on the client side
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export default function OAuthDashboardBridge() {
  const router = useRouter();

  useEffect(() => {
    // Give the browser a microsecond to ensure the Set-Cookie header is fully committed
    const timer = setTimeout(() => {
      const token = getCookie("access_token");

      if (!token) {
        // If cookie is still missing after a brief pause, redirect to sign-in
        router.replace("/sign-in");
        return;
      }

      try {
        // Decode token to find role
        const decoded = jwtDecode<{
          role: string;
          mustChangePassword?: boolean;
        }>(token);

        if (decoded.mustChangePassword) {
          router.replace("/change-password");
          return;
        }

        const target = ROLE_DASHBOARD_MAP[decoded.role] || "/unauthorized";
        router.replace(target);
      } catch (error) {
        console.error("Failed to decode token from cookie:", error);
        router.replace("/sign-in");
      }
    }, 100); // 100ms delay ensures cookie persistence across cross-origin OAuth redirects

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-4 text-sm font-medium text-gray-600">
          Setting up your workspace...
        </p>
      </div>
    </div>
  );
}
