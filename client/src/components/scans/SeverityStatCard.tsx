// Count box for one severity, with a coloured top edge and number.
import type { Severity } from "@/lib/types";

// Tailwind needs full class names written out, so each colour is listed here.
const colours: Record<Severity, { border: string; text: string }> = {
  high: { border: "border-t-crimson", text: "text-crimson" },
  medium: { border: "border-t-amber-500", text: "text-amber-700" },
  low: { border: "border-t-blue-500", text: "text-blue-700" },
};

// Severity labels for the card title. Record<Severity, string> forces one entry per level.
const labels: Record<Severity, string> = { high: "High", medium: "Medium", low: "Low" };


// Count box for one severity, with a coloured top edge and number.
export function SeverityStatCard({ severity, count }: { severity: Severity; count: number }) {
  const c = colours[severity]; // pick the colours for this card

  return (
    <div className={`rounded-xl border border-gray-200 border-t-4 bg-white p-5 ${c.border}`}>
      {/* border-t-4: thicker top edge; c.border sets its colour */}
      <p className="text-sm text-gray-600">{labels[severity]}</p>
      <p className={`mt-1 text-3xl font-bold ${c.text}`}>{count}</p>
    </div>
  );
}