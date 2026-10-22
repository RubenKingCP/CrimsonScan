// Table of the user's sites with status, last scan, findings and an action link.
import Link from "next/link";
import type { SiteWithScan } from "@/lib/types";
import { countFindings, formatScanDate } from "@/lib/scans";
import { StatusBadge } from "./StatusBadge";
import { FindingsSummary } from "./FindingsSummary";

type Props = {
  sites: SiteWithScan[];   // the rows to show (already sorted and limited by the page)
  totalCount: number;      // how many sites the user has in total
};

export function SitesTable({ sites, totalCount }: Props) {
  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <h2 className="font-semibold text-gray-900">Sites</h2>
        {totalCount > sites.length && (
          // Only shown when some sites are hidden by the 5-row limit
          <Link href="/scans" className="text-sm font-medium text-crimson hover:underline">
            View all {totalCount} →
          </Link>
        )}
      </div>

      {sites.length === 0 ? (
        <p className="px-5 py-10 text-center text-sm text-gray-500">
          No sites yet. Add one to start scanning.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-3 font-medium">Site</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Last scan</th>
                <th className="px-5 py-3 font-medium">Findings</th>
                <th className="px-5 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sites.map((site) => (
                <SiteRow key={site.id} site={site} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function SiteRow({ site }: { site: SiteWithScan }) {
  const { scan } = site; // the site's scan, or null if never scanned

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-5 py-3">
        <p className="font-medium text-gray-900">{site.name}</p>
        <p className="font-mono text-xs text-gray-500">{site.domain}</p>
      </td>
      <td className="px-5 py-3">
        <StatusBadge status={site.status} />
      </td>
      <td className="whitespace-nowrap px-5 py-3 text-gray-600">
        {scan ? formatScanDate(scan.scannedAt) : "Never"} {/* date from the scan */}
      </td>
      <td className="px-5 py-3">
        <FindingsSummary findings={scan ? countFindings(scan.findings) : null} />
        {/* counts calculated from the scan's findings; null shows "—" */}
      </td>
      <td className="px-5 py-3 text-right">
        <SiteAction site={site} />
      </td>
    </tr>
  );
}

// The link on the right depends on the site's state.
function SiteAction({ site }: { site: SiteWithScan }) {
  const linkClass = "whitespace-nowrap font-medium text-crimson underline underline-offset-2 hover:text-crimson/80";

  if (site.status === "pending") {
    return <Link href={`/sites/${site.id}/verify`} className={linkClass}>Verify</Link>;  // not verified yet
  }
  if (site.scan) {
    return <Link href={`/scans/${site.scan.id}`} className={linkClass}>View results</Link>; // uses the SCAN's id
  }
  return <span className="text-gray-400">Not scanned</span>; // verified, but no scan yet
}