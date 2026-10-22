// Add site (/sites/new): name + domain form. On success it goes to the verify page.
import Link from "next/link";
import { AddSiteForm } from "@/components/sites/AddSiteForm";

export default function NewSitePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-xl space-y-6 px-4 py-8">
        <Link href="/dashboard" className="text-sm text-crimson hover:underline">
          ← All sites
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add a site</h1>
          <p className="mt-1 text-sm text-gray-600">You can only scan sites you own.</p>
        </div>
        <AddSiteForm />
      </div>
    </main>
  );
}