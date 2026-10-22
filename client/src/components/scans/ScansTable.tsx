// Table of scans: site, date, pages, findings and a link to the results page.
import Link from "next/link";
import type { Scan } from "@/lib/types";
import { countFindings, formatScanDate } from "@/lib/scans";
import { FindingsSummary } from "@/components/dashboard/FindingsSummary"; // reused from the dashboard

export function ScansTable({ scans }: { scans: Scan[] }) {
  return (
    <div className="overflow-x-auto">
      {/* scrolls sideways on narrow screens instead of breaking the layout */}
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
          <tr>
            <th className="px-5 py-3 font-medium">Site</th>
            <th className="px-5 py-3 font-medium">Last scanned</th>
            <th className="px-5 py-3 font-medium">Pages</th>
            <th className="px-5 py-3 font-medium">Findings</th>
            <th className="px-5 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {scans.map((scan) => (
            <tr key={scan.id} className="hover:bg-gray-50">
              <td className="px-5 py-3">
                <p className="font-medium text-gray-900">{scan.siteName}</p>
                <p className="font-mono text-xs text-gray-500">{scan.domain}</p>
              </td>
              <td className="whitespace-nowrap px-5 py-3 text-gray-600">
                {formatScanDate(scan.scannedAt)}
              </td>
              <td className="px-5 py-3 text-gray-600">{scan.pagesCrawled}</td>
              <td className="px-5 py-3">
                <FindingsSummary findings={countFindings(scan.findings)} />
              </td>
              <td className="px-5 py-3 text-right">
                <Link
                  href={`/scans/${scan.id}`}          // opens the results page you already have
                  className="whitespace-nowrap font-medium text-crimson underline underline-offset-2 hover:text-crimson/80"
                >
                  View results
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}