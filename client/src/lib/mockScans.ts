// TEMP: fake scans for building the results page. Delete when the scans API exists.
import type { Scan } from "@/lib/types"; // the shape every scan must follow

export const mockScans: Scan[] = [ // list of fake scans the page can look up by id
    {
        id: "1",                       // matches site "1" (My Shop) on the dashboard
        siteName: "My Shop",
        domain: "myshop.example",
        scanType: "Full scan",
        scannedAt: "2026-10-22T14:02:00Z",
        pagesCrawled: 48,
        durationMin: 6,
        findings: [
            { id: "f1", severity: "high", title: "Cross-site scripting (reflected)", location: "GET /search?q=", aiFixReady: true },
            { id: "f2", severity: "high", title: "SQL injection", location: "GET /api/products?id=", aiFixReady: true },
            { id: "f3", severity: "medium", title: "Content-Security-Policy header not set", location: "All pages (48)", aiFixReady: false },
            { id: "f4", severity: "medium", title: "Session cookie without HttpOnly flag", location: "Set-Cookie: session", aiFixReady: false },
            { id: "f5", severity: "medium", title: "Missing anti-clickjacking header", location: "All pages (48)", aiFixReady: false },
            { id: "f6", severity: "low", title: "Server leaks framework via X-Powered-By", location: "X-Powered-By: Express", aiFixReady: false },
            { id: "f7", severity: "low", title: "Strict-Transport-Security header not set", location: "All pages (48)", aiFixReady: false },
            { id: "f8", severity: "low", title: "Cookie without SameSite attribute", location: "Set-Cookie: prefs", aiFixReady: false },
            { id: "f9", severity: "low", title: "X-Content-Type-Options header missing", location: "All pages (48)", aiFixReady: false },
        ],
    },
    {
        id: "2",                       // matches site "2" (Portfolio) on the dashboard
        siteName: "Portfolio",
        domain: "maria.dev",
        scanType: "Full scan",
        scannedAt: "2026-10-22T14:03:00Z",   // My Shop (was finishedAt: "Today 17:02")
        pagesCrawled: 12,
        durationMin: 2,
        findings: [
            { id: "g1", severity: "medium", title: "Content-Security-Policy header not set", location: "All pages (12)", aiFixReady: false },
            { id: "g2", severity: "medium", title: "Missing anti-clickjacking header", location: "All pages (12)", aiFixReady: false },
            { id: "g3", severity: "low", title: "Server leaks framework via X-Powered-By", location: "X-Powered-By: Express", aiFixReady: false },
            { id: "g4", severity: "low", title: "Strict-Transport-Security header not set", location: "All pages (12)", aiFixReady: false },
            { id: "g5", severity: "low", title: "X-Content-Type-Options header missing", location: "All pages (12)", aiFixReady: false },
        ],

    },
    {
        id: "4",
        siteName: "Blog",
        domain: "ruben.blog",
        scanType: "Full scan",
        scannedAt: "2026-10-15T09:30:00Z",
        pagesCrawled: 20,
        durationMin: 3,
        findings: [
            { id: "h1", severity: "medium", title: "Content-Security-Policy header not set", location: "All pages (20)", aiFixReady: false },
        ],
    },
    {
        id: "5",
        siteName: "Café Menu",
        domain: "cafe-menu.example",
        scanType: "Quick scan",
        scannedAt: "2026-09-30T18:45:00Z",
        pagesCrawled: 5,
        durationMin: 1,
        findings: [],                       // a clean site: shows "No issues"
    },
    {
        id: "6",
        siteName: "Admin Panel",
        domain: "admin.myshop.example",
        scanType: "Full scan",
        scannedAt: "2026-10-20T12:00:00Z",
        pagesCrawled: 31,
        durationMin: 5,
        findings: [
            { id: "k1", severity: "high", title: "Broken access control on /admin/users", location: "GET /admin/users", aiFixReady: true },
            { id: "k2", severity: "low", title: "X-Content-Type-Options header missing", location: "All pages (31)", aiFixReady: false },
        ],
    }
];