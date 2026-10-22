// "2 high · 3 med · 4 low", with high in crimson. Dash if never scanned.
import type { FindingCounts } from "@/lib/types";

export function FindingsSummary({ findings }: { findings: FindingCounts | null }) {
  if (!findings) return <span className="text-gray-400">—</span>;

  const parts = [
    findings.high > 0 && <span className="font-semibold text-crimson">{findings.high} high</span>,
    findings.medium > 0 && <span>{findings.medium} med</span>,
    findings.low > 0 && <span>{findings.low} low</span>,
  ].filter(Boolean);

  if (parts.length === 0) return <span className="text-green-700">No issues</span>;

  return (
    <span className="text-gray-700">
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 && " · "}
          {part}
        </span>
      ))}
    </span>
  );
}