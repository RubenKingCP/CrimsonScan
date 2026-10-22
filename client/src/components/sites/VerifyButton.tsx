"use client"; // runs in the browser: clicking, waiting and showing the result

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifySite } from "@/lib/api/client";

type State = "idle" | "checking" | "not-found" | "error";

export function VerifyButton({ siteId }: { siteId: string }) {
  const router = useRouter();
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function check() {
    setState("checking");
    try {
      const { verified } = await verifySite(siteId);      // POST /sites/:id/verify
      if (verified) {
        router.refresh();                                  // re-render this page: it now shows "Verified"
        return;
      }
      setState("not-found");                               // record not there (yet)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={check}
        disabled={state === "checking"}
        className="rounded-md bg-crimson px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-crimson/90 disabled:opacity-50"
      >
        {state === "checking" ? "Checking DNS…" : "Verify now"}
      </button>

      {state === "not-found" && (
        <p role="status" className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900">
          We couldn&apos;t find the record yet. DNS changes can take from a few minutes up to an hour to appear.
          Check that the value matches exactly, then try again.
        </p>
      )}
      {state === "error" && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}