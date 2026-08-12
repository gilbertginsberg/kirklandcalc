"use client";

import { useState } from "react";

export default function ShareButton({ text, url }: { text: string; url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text, url });
        return;
      } catch {
        // user cancelled or share failed — fall back to copy
      }
    }
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-full bg-kc-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-kc-navy-light"
    >
      {copied ? "Copied! 🎉" : "Share your result →"}
    </button>
  );
}
