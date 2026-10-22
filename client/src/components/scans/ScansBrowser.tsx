"use client"; // runs in the browser: the search text and sort choice change as the user types

import { useMemo, useState } from "react";
import type { Scan } from "@/lib/types";
import { filterAndSortScans, type ScanSort } from "@/lib/scans";
import { ScanFilters } from "./ScanFilters";
import { ScansTable } from "./ScansTable";

export function ScansBrowser({ scans }: { scans: Scan[] }) {
  const [query, setQuery] = useState("");                  // search text, empty at first
  const [sort, setSort] = useState<ScanSort>("newest");    // default: newest first

  // Recalculate the visible list only when the scans, search or sort changes.
  const visible = useMemo(() => filterAndSortScans(scans, query, sort), [scans, query, sort]);

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Header: title + count on the left, search and sort on the right */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-5 py-4">
        <h2 className="font-semibold text-gray-900">
          All scans <span className="font-normal text-gray-500">({visible.length})</span>
        </h2>
        <ScanFilters query={query} onQueryChange={setQuery} sort={sort} onSortChange={setSort} />
      </div>

      {scans.length === 0 ? (
        // The user has never scanned anything
        <p className="px-5 py-10 text-center text-sm text-gray-500">
          No scans yet. Scan a verified site from your dashboard.
        </p>
      ) : visible.length === 0 ? (
        // There are scans, but the search matches none of them
        <div className="px-5 py-10 text-center text-sm text-gray-500">
          <p>No scans match “{query}”.</p>
          <button
            type="button"
            onClick={() => setQuery("")}                    // empty the search box
            className="mt-2 font-medium text-crimson hover:underline"
          >
            Clear search
          </button>
        </div>
      ) : (
        <ScansTable scans={visible} />
      )}
    </section>
  );
}