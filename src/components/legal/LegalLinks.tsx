"use client";

import Link from "next/link";
import { OPEN_CONSENT_EVENT } from "@/lib/consent";

export function LegalLinks() {
  return (
    <div className="flex flex-wrap gap-6">
      <Link href="/privacy" className="hover:opacity-70">
        Privacy
      </Link>
      <Link href="/terms" className="hover:opacity-70">
        Terms
      </Link>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
        className="hover:opacity-70"
      >
        Cookie Settings
      </button>
    </div>
  );
}
