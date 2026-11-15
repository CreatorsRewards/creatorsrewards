import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Define role-to-dashboard mapping based on your switch case
const ROLE_DASHBOARD_MAP: Record<string, string> = {
  SUPER_ADMIN: "/admin",
  CUSTOMER_REP: "/support",
  UGC_CREATOR: "/creator",
  CLIPPER: "/clipper",
  BRAND: "/brand",
};

// Define route prefixes that require specific roles
const ROLE_PROTECTED_ROUTES: Record<string, string[]> = {
  SUPER_ADMIN: ["/admin"],
  CUSTOMER_REP: ["/support"],
  UGC_CREATOR: ["/creator"],
  CLIPPER: ["/clipper"],
  BRAND: ["/brand"],
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ---------------------------------------------------------------------------
  // GUARD: Ignore browser extension probes, well-known files, and static assets
  // ---------------------------------------------------------------------------
  if (
    pathname.startsWith("/.well-known") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  const tokenCookie = request.cookies.get("access_token");
  const token = tokenCookie?.value;

  let isAuthenticated = false;
  let userRole: string | null = null;

  // 1. Verify and decode the token if it exists
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      isAuthenticated = true;
      userRole = (payload.role as string) || null;
    } catch (error) {
      // Token is invalid or expired
      isAuthenticated = false;

      console.log("Token verification failed:", error);
    }
  }

  const isAuthPage =
    pathname.startsWith("/sign-up") || pathname.startsWith("/sign-in");

  // ---------------------------------------------------------------------------
  // RULE 1: Signed-in users trying to access Sign-In / Sign-Up go to their dashboard
  // ---------------------------------------------------------------------------
  if (isAuthenticated && isAuthPage) {
    const dashboardPath =
      (userRole && ROLE_DASHBOARD_MAP[userRole]) || "/unauthorized";
    return NextResponse.redirect(new URL(dashboardPath, request.url));
  }

  // ---------------------------------------------------------------------------
  // RULE 2: Unauthenticated users trying to access protected pages go to /signin
  // ---------------------------------------------------------------------------
  const isProtectedPath = Object.values(ROLE_PROTECTED_ROUTES).some((routes) =>
    routes.some((route) => pathname.startsWith(route)),
  );

  if (isProtectedPath && !isAuthenticated) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("from", pathname); // Optional: remember where they wanted to go
    return NextResponse.redirect(signInUrl);
  }

  // ---------------------------------------------------------------------------
  // RULE 3: Authenticated but unauthorized users go to /unauthorized
  // ---------------------------------------------------------------------------
  if (isProtectedPath && isAuthenticated) {
    const allowedRoutes = userRole ? ROLE_PROTECTED_ROUTES[userRole] || [] : [];
    const hasAccess = allowedRoutes.some((route) => pathname.startsWith(route));

    if (!hasAccess) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths the proxy should run on
export const config = {
  matcher: [
    "/admin/:path*",
    "/support/:path*",
    "/creator/:path*",
    "/clipper/:path*",
    "/brand/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
