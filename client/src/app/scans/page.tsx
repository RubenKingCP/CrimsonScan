// All scans (/scans): every site the user has scanned, one row per site, searchable and sortable.
import { mockScans } from "@/lib/mockScans";                // TEMP data source
import { ScansBrowser } from "@/components/scans/ScansBrowser";

export default function ScansPage() {
  const scans = mockScans;                                   // TEMP: replace with data from the API

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your scans</h1>
          <p className="mt-1 text-sm text-gray-600">
            The latest results for every site you&apos;ve scanned.
          </p>
        </div>

        {/* Search, sort and the table; runs in the browser */}
        <ScansBrowser scans={scans} />
      </div>
    </main>
  );
}