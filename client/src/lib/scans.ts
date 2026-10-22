// Helpers for working with scans: counting findings, formatting dates, searching and sorting.
import type { Finding, FindingCounts, Scan, SiteWithScan, Site } from "@/lib/types";

// The four sort options in the dropdown.
export type ScanSort = "newest" | "oldest" | "az" | "za";

// Turns a list of findings into { high, medium, low } counts.
export function countFindings(findings: Finding[]): FindingCounts {
  const counts = { high: 0, medium: 0, low: 0 };          // start every level at zero
  for (const f of findings) counts[f.severity]++;          // add one to the finding's level
  return counts;
}

// Formats an ISO date for display, e.g. "22 Oct 2026, 17:02".
// A fixed locale and time zone make the server and browser produce the same text.
// Different text would cause a React "hydration mismatch" warning.
export function formatScanDate(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    dateStyle: "medium",                                    // 22 Oct 2026
    timeStyle: "short",                                     // 17:02
    timeZone: "Europe/Athens",                              // your time zone; change if needed
  });
}

// Keeps scans whose site name or domain contains the search text, then sorts them.
export function filterAndSortScans(scans: Scan[], query: string, sort: ScanSort): Scan[] {
  const q = query.trim().toLowerCase();                     // ignore spaces and capitals

  const matches = q
    ? scans.filter(
        (s) => s.siteName.toLowerCase().includes(q) || s.domain.toLowerCase().includes(q)
      )
    : [...scans];                                           // no search: copy the full list
                                                            // (sort() changes the array, so never sort the original)

  const byDate = (a: Scan, b: Scan) =>
    new Date(a.scannedAt).getTime() - new Date(b.scannedAt).getTime(); // older first
  const byName = (a: Scan, b: Scan) =>
    a.siteName.localeCompare(b.siteName, "en", { sensitivity: "base" }); // A→Z, ignores case

  switch (sort) {
    case "newest": return matches.sort((a, b) => byDate(b, a)); // reversed: newer first
    case "oldest": return matches.sort(byDate);
    case "az":     return matches.sort(byName);
    case "za":     return matches.sort((a, b) => byName(b, a)); // reversed: Z→A
  }
}

// Pairs each site with its scan by matching domains. Sites never scanned get scan: null.
export function attachScans(sites: Site[], scans: Scan[]): SiteWithScan[] {
  const byDomain = new Map(scans.map((s) => [s.domain, s])); // domain → scan, for quick lookups
  return sites.map((site) => ({ ...site, scan: byDomain.get(site.domain) ?? null }));
}

// Order for the dashboard: sites waiting for verification first (they need action),
// then scanned sites newest first, then verified sites never scanned.
export function sortForDashboard(sites: SiteWithScan[]): SiteWithScan[] {
  const rank = (s: SiteWithScan) => (s.status === "pending" ? 0 : s.scan ? 1 : 2); // group number
  const time = (s: SiteWithScan) => (s.scan ? new Date(s.scan.scannedAt).getTime() : 0);

  return [...sites].sort(
    (a, b) => rank(a) - rank(b) || time(b) - time(a) // same group → newer first
  );
}