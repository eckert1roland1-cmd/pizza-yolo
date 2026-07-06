"use client";

import { useEffect, useState } from "react";
import {
  applyConsent,
  getStoredConsent,
  OPEN_CONSENT_EVENT,
  storeConsent,
  type ConsentPreferences,
} from "@/lib/consent";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getStoredConsent()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading localStorage (an external system) must happen post-hydration to avoid an SSR/client mismatch; there's no render-time alternative here.
      setVisible(true);
    }

    const openBanner = () => setVisible(true);
    window.addEventListener(OPEN_CONSENT_EVENT, openBanner);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, openBanner);
  }, []);

  function decide(preferences: ConsentPreferences) {
    storeConsent(preferences);
    applyConsent(preferences);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-ink/10 bg-cream/95 p-6 backdrop-blur">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-ink/70">
          We use cookies to understand site traffic and measure our social
          ads. Nothing is set until you accept. See our{" "}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide({ analytics: "denied", marketing: "denied" })}
            className="rounded-full border border-ink/20 px-5 py-2 text-sm font-semibold text-ink"
          >
            Necessary Only
          </button>
          <button
            type="button"
            onClick={() => decide({ analytics: "granted", marketing: "granted" })}
            className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-cream"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
