// Browser-side API calls, for "use client" components: user actions and the navbar username.
// The browser attaches the JWT cookie itself because of credentials: "include".
import type { Site } from "@/lib/types";

const API = process.env.NEXT_PUBLIC_API_URL; // public server address, e.g. http://localhost:4000

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...options,
    credentials: "include", // send the cookie with the request
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const body = await res.json().catch(() => null); // some error responses have no JSON body
  if (!res.ok) throw new Error(body?.error ?? `Request failed (${res.status})`); // the server's message, if any
  return body as T;
}

// Auth
export const getMe = () => request<{ username: string }>("/auth/me");
export const logout = () => request<{ message: string }>("/auth/logout", { method: "POST" });

// Sites
export const createSite = (input: { name: string; domain: string }) =>
  request<Site>("/sites", { method: "POST", body: JSON.stringify(input) });
export const verifySite = (id: string) =>
  request<{ site: Site; verified: boolean }>(`/sites/${id}/verify`, { method: "POST" });
export const deleteSite = (id: string) => request<{ ok: true }>(`/sites/${id}`, { method: "DELETE" });

// Scans (not built on the server yet)
export const getRepos = () => request("/github/repos");
export const startScan = (body: { repo?: string; url?: string }) =>
  request("/scans", { method: "POST", body: JSON.stringify(body) });
export const deleteScan = (id: string) => request(`/scans/${id}`, { method: "DELETE" });