// Small coloured pill showing a finding's severity: HIGH, MEDIUM or LOW.
import type { Severity } from "@/lib/types"; // "high" | "medium" | "low"

// Colours for each level. Record<Severity, string> forces one entry per level.
const styles: Record<Severity, string> = {
  high: "bg-crimson text-white",          // solid red: most urgent
  medium: "bg-amber-100 text-amber-800",  // soft orange
  low: "bg-blue-100 text-blue-800",       // soft blue
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={`inline-block w-20 rounded px-2 py-0.5 text-center text-[10px] font-bold uppercase tracking-wide ${styles[severity]}`}
    // w-20: same width for every badge so the titles line up
    // text-[10px]: smaller than text-xs, as in the design
    // uppercase: shows "high" as "HIGH" without changing the data
    >
      {severity}
    </span>
  );
}