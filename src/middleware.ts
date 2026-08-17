import { auth } from "@/auth";
import { NextResponse } from "next/server";

/**
 * Middleware for authentication
 *
 * Current setup:
 * - Free plan active (premium checks disabled)
 * - Auth routes redirect authenticated users to dashboard
 */

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;

  // Define route patterns
  const isAuthRoute =
    nextUrl.pathname.startsWith("/login") ||
    nextUrl.pathname.startsWith("/checkout");

  const isApiRoute = nextUrl.pathname.startsWith("/api");

  // Auth route handling (login, checkout)
  if (isAuthRoute) {
    if (session) {
      // Already logged in - redirect to user dashboard
      if (session?.user?.id) {
        return NextResponse.redirect(new URL(`/${session.user.id}/dashboard`, nextUrl.origin));
      }
    }
    return NextResponse.next();
  }

  // API route protection for user-specific endpoints
  if (isApiRoute && nextUrl.pathname.startsWith("/api/user")) {
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // Default - allow access
  return NextResponse.next();
});

// Routes to protect
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - /studio (Sanity Studio)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|studio(?:/.*)?).*)",
  ],
};
