// The only place the client talks to the server. Sends the JWT cookie with every call.
const API = process.env.NEXT_PUBLIC_API_URL;

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

// Rreturn the user name
export const getMe = (): Promise<{ username: string }> => request("/auth/me");
export const getRepos = () => request("/github/repos");
export const getScans = () => request("/scans");
export const getScan = (id: string) => request(`/scans/${id}`);
export const startScan = (body: { repo?: string; url?: string }) =>
  request("/scans", { method: "POST", body: JSON.stringify(body) });
export const deleteScan = (id: string) => request(`/scans/${id}`, { method: "DELETE" });
