// Shared types for sites and findings, used by pages, components and api.ts.
export type SiteStatus = "verified" | "pending";

export type FindingCounts = { high: number; medium: number; low: number };

// A site the user has added. Only facts about the site itself; scan data lives in Scan.
export type Site = {
    id: string;
    name: string;            // e.g. "My Shop"
    domain: string;          // e.g. "myshop.example"; also links the site to its scan
    status: SiteStatus;      // verified or pending
    verifyToken: string;     // value for the DNS TXT record: crimsonscan-verify=<verifyToken>
    verifiedAt?: string;     // ISO date, set once verified
    lastCheckedAt?: string;  // ISO date of the last DNS check
    createdAt: string;       // ISO date the site was added
};

// A site together with its scan (null if it was never scanned), used by the dashboard.
export type SiteWithScan = Site & { scan: Scan | null };

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
    scannedAt: string;    // display text, e.g. "Today 17:02"
    pagesCrawled: number;  // how many pages ZAP visited
    durationMin: number;   // how long the scan took, in minutes
    findings: Finding[];   // every problem found
};