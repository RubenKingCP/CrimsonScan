// API calls for SERVER components: forwards the user's cookie, because there's no browser to send it.
import { cookies } from "next/headers";            // reads cookies from the incoming page request
import { notFound, redirect } from "next/navigation";
import type { Scan, Site } from "@/lib/types";

const API = process.env.API_URL;                   // e.g. http://localhost:4000 (server-only, no NEXT_PUBLIC_)

async function serverRequest<T>(path: string): Promise<T> {
  const token = (await cookies()).get("token")?.value; // the JWT cookie, if signed in

  const res = await fetch(`${API}${path}`, {
    headers: token ? { Cookie: `token=${token}` } : {}, // pass it on to Express
    cache: "no-store",                             // always fresh data, never cached
  });

  if (res.status === 401) redirect("/login");      // not signed in / expired → login page
  if (res.status === 404) notFound();              // e.g. a scan id that doesn't exist → 404 page
  if (!res.ok) throw new Error(`API ${res.status}`); // anything else → Next's error page

  return res.json();                               // the data, typed as T
}

export const getSites = () => serverRequest<Site[]>("/sites");
export const getScans = () => serverRequest<Scan[]>("/scans");
export const getScan = (id: string) => serverRequest<Scan>(`/scans/${id}`);