// Redirects based on the session cookie, before the page loads. The server still does the real check.
import { NextResponse, type NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const signedIn = Boolean(req.cookies.get("token"));   // only checks the cookie exists, not that it's valid
  const { pathname } = req.nextUrl;                      // e.g. "/sites/new"

  // Signed-in users don't need the login page: send them to the dashboard.
  if (pathname === "/login") {
    return signedIn ? NextResponse.redirect(new URL("/dashboard", req.url)) : NextResponse.next();
  }

  // Every other matched route is private: no cookie → login page.
  if (!signedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",               // handled specially above
    "/dashboard/:path*",
    "/scans/:path*",
    "/sites/:path*",        // add site, verify
    "/settings/:path*",     // not built yet, protected from day one
  ],
};