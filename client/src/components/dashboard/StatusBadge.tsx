// Pill showing whether a site's ownership is verified.
import type { SiteStatus } from "@/lib/types";

const styles: Record<SiteStatus, string> = {
  verified: "bg-green-100 text-green-800",
  pending: "bg-amber-100 text-amber-800",
};

const labels: Record<SiteStatus, string> = {
  verified: "Verified",
  pending: "Pending verification",
};

export function StatusBadge({ status }: { status: SiteStatus }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}