// Search box and sort dropdown for the scans list. Only displays; the parent holds the values.
import type { ScanSort } from "@/lib/scans";

// Dropdown options, in display order.
const sortOptions: { value: ScanSort; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "az", label: "Name A–Z" },
  { value: "za", label: "Name Z–A" },
];

type Props = {
  query: string;                            // current search text
  onQueryChange: (value: string) => void;   // called on every keystroke
  sort: ScanSort;                           // current sort option
  onSortChange: (value: ScanSort) => void;  // called when the dropdown changes
};

export function ScanFilters({ query, onQueryChange, sort, onSortChange }: Props) {
  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
      {/* Full width and stacked on phones; side by side from sm: up */}

      <label className="relative block">
        <span className="sr-only">Search scans</span>      {/* label for screen readers */}
        <SearchIcon />
        <input
          type="search"                                     // adds a clear (×) button in most browsers
          value={query}                                     // controlled: the parent owns the text
          onChange={(e) => onQueryChange(e.target.value)}   // send each change up to the parent
          placeholder="Search by name or domain"
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-crimson focus:outline-none focus:ring-2 focus:ring-crimson/20 sm:w-64"
          // pl-9: room on the left for the icon; focus:ring: crimson glow when typing
        />
      </label>

      <label className="block">
        <span className="sr-only">Sort scans</span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as ScanSort)} // the value is always one of our options
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-crimson focus:outline-none focus:ring-2 focus:ring-crimson/20 sm:w-auto"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

// Magnifying glass inside the search box.
function SearchIcon() {
  return (
    <svg
      className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
      // absolute + top-1/2 + -translate-y-1/2: vertically centred on the left
      // pointer-events-none: clicks go through to the input
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}