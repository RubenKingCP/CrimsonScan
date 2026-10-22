"use client"; // runs in the browser: typing, submitting and showing errors

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSite } from "@/lib/api/client";

const inputClass =
  "mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-crimson focus:outline-none focus:ring-2 focus:ring-crimson/20";

export function AddSiteForm() {
  const router = useRouter();
  const [name, setName] = useState("");                  // "My Shop"
  const [domain, setDomain] = useState("");              // "myshop.com"
  const [error, setError] = useState<string | null>(null); // message from the server, if any
  const [saving, setSaving] = useState(false);           // true while waiting for the server

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();                                  // stop the browser's full-page form submit
    setError(null);
    setSaving(true);
    try {
      const site = await createSite({ name, domain });   // POST /sites
      router.push(`/sites/${site.id}/verify`);           // next step: prove ownership
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong."); // e.g. "You've already added this domain."
      setSaving(false);                                  // only re-enable on failure; on success we leave the page
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-gray-200 bg-white p-6">
      <label className="block">
        <span className="text-sm font-medium text-gray-900">Name</span>
        <input
          required
          maxLength={60}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="My Shop"
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-900">Domain</span>
        <input
          required
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="myshop.com"
          autoCapitalize="none"                          // phones: don't capitalise the first letter
          autoCorrect="off"
          spellCheck={false}
          className={`${inputClass} font-mono`}
        />
        <span className="mt-1 block text-xs text-gray-500">
          Without https:// is fine. You&apos;ll prove you own it in the next step.
        </span>
      </label>

      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-crimson px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-crimson/90 disabled:opacity-50"
        >
          {saving ? "Adding…" : "Add site"}
        </button>
      </div>
    </form>
  );
}