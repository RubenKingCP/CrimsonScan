import "server-only"; // build error if a "use client" file ever imports this

// Server-side API calls, for pages (server components): load the data a page needs.
// There's no browser here, so the user's cookie is read from the request and forwarded by hand.
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import type { Scan, Site } from "@/lib/types";
import { mockScans } from "@/lib/mockScans"; // TEMP: until the scans API exists

const API = process.env.API_URL; // server-only address, e.g. http://localhost:4000

async function serverRequest<T>(path: string): Promise<T> {
  const token = (await cookies()).get("token")?.value; // the JWT cookie, if signed in

  const res = await fetch(`${API}${path}`, {
    headers: token ? { Cookie: `token=${token}` } : {}, // forward it to Express
    cache: "no-store",                                  // always fresh, never cached
  });

  if (res.status === 401) redirect("/login");          // signed out or expired → login page
  if (res.status === 404) notFound();                  // unknown or someone else's → 404 page
  if (!res.ok) throw new Error(`API ${res.status}`);   // anything else → Next's error page
  return res.json();
}

// Sites (real API)
export const getSites = () => serverRequest<Site[]>("/sites");
export const getSite = (id: string) => serverRequest<Site>(`/sites/${encodeURIComponent(id)}`);

// Scans (TEMP: mock data until GET /scans exists)
export async function getScans(): Promise<Scan[]> {
  return mockScans;
}

export async function getScan(id: string): Promise<Scan> {
  const scan = mockScans.find((s) => s.id === id);
  if (!scan) notFound(); // same behaviour the real API's 404 will have
  return scan;
}