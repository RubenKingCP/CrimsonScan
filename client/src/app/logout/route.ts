// GET /logout: deletes the session cookie on this site, then goes to /login.
import { NextResponse, type NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/login", req.url));
  res.cookies.delete("token");   // removes the expired/invalid cookie
  return res;
}