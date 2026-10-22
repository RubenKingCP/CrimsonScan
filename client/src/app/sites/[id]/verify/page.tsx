// Verify site (/sites/[id]/verify): shows the DNS TXT record to add, and a button to check it.
import Link from "next/link";
import { getSite } from "@/lib/api/server";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { CopyButton } from "@/components/sites/CopyButton";
import { VerifyButton } from "@/components/sites/VerifyButton";

export default async function VerifySitePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;              // the [id] part of the URL
  const site = await getSite(id);           // 404 page if it isn't one of the user's sites
  const record = `crimsonscan-verify=${site.verifyToken}`; // the exact TXT value to add

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl space-y-6 px-4 py-8">
        <Link href="/dashboard" className="text-sm text-crimson hover:underline">
          ← All sites
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{site.name}</h1>
            <p className="mt-1 font-mono text-sm text-gray-600">{site.domain}</p>
          </div>
          <StatusBadge status={site.status} />
        </div>

        {site.status === "verified" ? (
          // Already verified: nothing left to do here
          <section className="rounded-xl border border-green-200 bg-green-50 p-6">
            <h2 className="font-semibold text-green-900">Ownership verified</h2>
            <p className="mt-1 text-sm text-green-800">
              You can now scan this site. You can remove the TXT record if you like, but keeping it does no harm.
            </p>
            <Link
              href="/dashboard"
              className="mt-4 inline-block rounded-md bg-crimson px-4 py-2 text-sm font-semibold text-white hover:bg-crimson/90"
            >
              Back to dashboard
            </Link>
          </section>
        ) : (
          // Pending: explain the DNS record and offer the check button
          <section className="space-y-5 rounded-xl border border-gray-200 bg-white p-6">
            <div>
              <h2 className="font-semibold text-gray-900">Prove you own this domain</h2>
              <p className="mt-1 text-sm text-gray-600">
                Sign in to wherever you manage your domain&apos;s DNS (for example your registrar or Cloudflare)
                and add this record:
              </p>
            </div>

            <dl className="divide-y divide-gray-200 rounded-lg border border-gray-200 text-sm">
              <RecordRow label="Type">
                <code className="font-mono">TXT</code>
              </RecordRow>
              <RecordRow label="Name / Host">
                <code className="font-mono">@</code>
                <span className="text-gray-500">
                  {" "}or <code className="font-mono">{site.domain}</code>, depending on your provider
                </span>
              </RecordRow>
              <RecordRow label="Value">
                <div className="flex items-center gap-3">
                  <code className="min-w-0 break-all font-mono">{record}</code>
                  <CopyButton value={record} />
                </div>
              </RecordRow>
            </dl>

            <p className="text-sm text-gray-600">
              Then click below. New records can take a few minutes to show up, so it&apos;s fine to come back later:
              this page stays available from your dashboard.
            </p>

            <VerifyButton siteId={site.id} />
          </section>
        )}
      </div>
    </main>
  );
}

// One row of the DNS record table: label on the left, value on the right (stacked on phones).
function RecordRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 px-4 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4">
      <dt className="text-gray-500">{label}</dt>
      <dd className="text-gray-900">{children}</dd>
    </div>
  );
}