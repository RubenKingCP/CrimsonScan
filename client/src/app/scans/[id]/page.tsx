// Scan results (/scans/[id]): one scan's summary and findings.
// Only built when visited, from the dashboard's "View results" or the all-scans page.
import Link from "next/link";
import { formatScanDate } from "@/lib/scans";    // add to the imports
import { notFound } from "next/navigation";      // shows the 404 page
import { mockScans } from "@/lib/mockScans";      // TEMP data source
import type { Severity } from "@/lib/types";
import { SeverityStatCard } from "@/components/scans/SeverityStatCard";
import { FindingsList } from "@/components/scans/FindingsList";

const levels: Severity[] = ["high", "medium", "low"]; // order of the stat cards

// In Next.js 15+, params is a Promise, so the page is async and awaits it.
export default async function ScanResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;                    // the [id] part of the URL, e.g. "1"

  const scan = mockScans.find((s) => s.id === id); // TEMP: look the scan up in fake data
  if (!scan) notFound();                          // unknown id → 404, stops here

  // Count how many findings each severity has, e.g. { high: 2, medium: 3, low: 4 }.
  const counts = Object.fromEntries(
    levels.map((level) => [level, scan.findings.filter((f) => f.severity === level).length])
  ) as Record<Severity, number>;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
        {/* Back link to the dashboard */}
        <Link href="/dashboard" className="text-sm text-crimson hover:underline">
          ← All sites
        </Link>

        {/* Header: site name + scan details on the left, buttons on the right */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{scan.siteName}</h1>
            <p className="mt-1 text-sm text-gray-600">
              <span className="font-mono">{scan.domain}</span>
              {` · ${scan.scanType} · ${scan.scannedAt} · ${scan.pagesCrawled} pages crawled · ${scan.durationMin} min`}
            </p>
          </div>

          <div className="flex gap-3">
            {/* Placeholder buttons: no action yet */}
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              Compare with previous
            </button>
            <button
              type="button"
              className="rounded-md bg-crimson px-4 py-2 text-sm font-semibold text-white hover:bg-crimson/90"
            >
              Run new scan
            </button>
          </div>
        </div>

        {/* Three count boxes, side by side on wider screens, stacked on phones */}
        <div className="grid gap-4 sm:grid-cols-3">
          {levels.map((level) => (
            <SeverityStatCard key={level} severity={level} count={counts[level]} />
          ))}
        </div>

        {/* Filter tabs + list; runs in the browser */}
        <FindingsList scanId={scan.id} findings={scan.findings} />
      </div>
    </main>
  );
}