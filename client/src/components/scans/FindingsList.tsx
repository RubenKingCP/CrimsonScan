"use client"; // runs in the browser, because the filter tabs need useState and onClick

import { useState } from "react";                  // remembers which tab is selected
import Link from "next/link";                      // client-side links between pages
import type { Finding, Severity } from "@/lib/types";
import { SeverityBadge } from "./SeverityBadge";

type Filter = "all" | Severity;                    // the four tabs: all, high, medium, low

const tabs: { value: Filter; label: string }[] = [ // tab order and their text
  { value: "all", label: "All" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export function FindingsList({ scanId, findings }: { scanId: string; findings: Finding[] }) {
  const [filter, setFilter] = useState<Filter>("all"); // starts on "All"

  // The findings to show: all of them, or only the selected severity.
  const visible = filter === "all" ? findings : findings.filter((f) => f.severity === filter);

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Header row: title on the left, tabs on the right; wraps on small screens */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-5 py-4">
        <h2 className="font-semibold text-gray-900">Findings</h2>

        <div className="flex gap-2" role="tablist">
          {tabs.map((tab) => {
            const active = filter === tab.value; // is this the selected tab?
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={active}              // tells screen readers which tab is on
                onClick={() => setFilter(tab.value)} // switch the filter
                className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                  active ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
                {tab.value === "all" && ` ${findings.length}`} {/* "All 9" */}
              </button>
            );
          })}
        </div>
      </div>

      {visible.length === 0 ? (
        // Shown when a tab has nothing, e.g. "High" on a site without high findings
        <p className="px-5 py-10 text-center text-sm text-gray-500">No findings at this level.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {/* divide-y: a line between rows */}
          {visible.map((finding) => (
            <FindingRow key={finding.id} scanId={scanId} finding={finding} />
          ))}
        </ul>
      )}
    </section>
  );
}

// One row: badge, title + location, and the action link on the right.
function FindingRow({ scanId, finding }: { scanId: string; finding: Finding }) {
  return (
    <li className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50">
      <SeverityBadge severity={finding.severity} />

      <div className="min-w-0 flex-1">
        {/* flex-1: takes the free space; min-w-0: lets long text wrap */}
        <p className="font-medium text-gray-900">{finding.title}</p>
        <p className="truncate font-mono text-xs text-gray-500">{finding.location}</p>
      </div>

      <Link
        href={`/scans/${scanId}/findings/${finding.id}`} // placeholder detail page (404 for now)
        className={`shrink-0 text-sm ${
          finding.aiFixReady ? "font-medium text-crimson hover:underline" : "text-gray-500 hover:text-gray-800"
        }`}
      >
        {finding.aiFixReady ? "AI fix ready →" : "Explain →"}
      </Link>
    </li>
  );
}