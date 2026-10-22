// Shared types for sites and findings, used by pages, components and api.ts.
export type SiteStatus = "verified" | "pending";

export type FindingCounts = { high: number; medium: number; low: number };

export type Site = {
  id: string;
  name: string;
  domain: string;
  status: SiteStatus;
  lastScan: string | null;
  findings: FindingCounts | null;
};

// The three severity levels a finding can have.
export type Severity = "high" | "medium" | "low";

// One security problem found in a scan.
export type Finding = {
  id: string;            // unique id, used for the link to its detail page
  severity: Severity;    // how serious it is
  title: string;         // short name, e.g. "SQL injection"
  location: string;      // where it was found, e.g. "GET /api/products?id="
  aiFixReady: boolean;   // true when the AI has already written a fix
};

// One finished scan of a site, with all its findings.
export type Scan = {
  id: string;            // the id in the URL: /scans/<id>
  siteName: string;      // e.g. "My Shop"
  domain: string;        // e.g. "myshop.example"
  scanType: string;      // e.g. "Full scan"
  finishedAt: string;    // display text, e.g. "Today 17:02"
  pagesCrawled: number;  // how many pages ZAP visited
  durationMin: number;   // how long the scan took, in minutes
  findings: Finding[];   // every problem found
};