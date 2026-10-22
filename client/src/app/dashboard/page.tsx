// Dashboard (/dashboard): the user's sites, summary stats and their latest findings.
import Link from "next/link";
import { mockSites } from "@/lib/mockSites";
import { StatCard } from "@/components/dashboard/StatCard";
import { SitesTable } from "@/components/dashboard/SitesTable";

export default function DashboardPage() {
  const sites = mockSites; // TEMP: replace with real data from the API

  const verifiedCount = sites.filter((s) => s.status === "verified").length;
  const totals = sites.reduce(
    (sum, s) => ({
      high: sum.high + (s.findings?.high ?? 0),
      medium: sum.medium + (s.findings?.medium ?? 0),
      low: sum.low + (s.findings?.low ?? 0),
    }),
    { high: 0, medium: 0, low: 0 }
  );
  const openFindings = totals.high + totals.medium + totals.low;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your sites</h1>
            <p className="mt-1 max-w-xs text-sm text-gray-600">
              Scan the sites you own and get plain-language fixes.
            </p>
          </div>
          <Link
            href="/sites/new"
            className="shrink-0 rounded-md bg-crimson px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-crimson/90"
          >
            + Add site
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <StatCard label="Verified sites" value={verifiedCount} />
          <StatCard
            label="Open findings"
            value={openFindings}
            highlight={openFindings > 0}
            detail={`${totals.high} high · ${totals.medium} medium · ${totals.low} low`}
          />
        </div>

        <SitesTable sites={sites} />
      </div>
    </main>
  );
}