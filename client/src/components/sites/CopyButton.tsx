"use client"; // uses the clipboard and a short "Copied" state

import { useState } from "react";

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);         // needs https or localhost
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);           // back to "Copy" after 2 seconds
    } catch {
      // Clipboard blocked: the value is still visible for the user to select by hand.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="shrink-0 rounded-md border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}