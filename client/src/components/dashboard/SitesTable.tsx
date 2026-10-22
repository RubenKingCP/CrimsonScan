// Table of the user's sites with status, last scan, findings and an action link.
import Link from "next/link";
import type { Site } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";
import { FindingsSummary } from "./FindingsSummary";

export function SitesTable({ sites }: { sites: Site[] }) {
  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <h2 className="border-b border-gray-200 px-5 py-4 font-semibold text-gray-900">Sites</h2>

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

function SiteRow({ site }: { site: Site }) {
  const verified = site.status === "verified";

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-5 py-3">
        <p className="font-medium text-gray-900">{site.name}</p>
        <p className="font-mono text-xs text-gray-500">{site.domain}</p>
      </td>
      <td className="px-5 py-3">
        <StatusBadge status={site.status} />
      </td>
      <td className="px-5 py-3 text-gray-600">{site.lastScan ?? "Never"}</td>
      <td className="px-5 py-3">
        <FindingsSummary findings={site.findings} />
      </td>
      <td className="px-5 py-3 text-right">
        <Link
          href={verified ? `/scans/${site.id}` : `/sites/${site.id}/verify`}
          className="font-medium text-crimson underline underline-offset-2 hover:text-crimson/80"
        >
          {verified ? "View results" : "Verify"}
        </Link>
      </td>
    </tr>
  );
}