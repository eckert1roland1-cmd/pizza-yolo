export type ConsentValue = "granted" | "denied";

export type ConsentPreferences = {
  analytics: ConsentValue;
  marketing: ConsentValue;
};

const STORAGE_KEY = "pizza-yolo-consent";

export const OPEN_CONSENT_EVENT = "pizza-yolo:open-cookie-settings";

export function getStoredConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsentPreferences) : null;
  } catch {
    return null;
  }
}

export function storeConsent(preferences: ConsentPreferences) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function applyConsent(preferences: ConsentPreferences) {
  window.gtag?.("consent", "update", {
    analytics_storage: preferences.analytics,
    ad_storage: preferences.marketing,
    ad_user_data: preferences.marketing,
    ad_personalization: preferences.marketing,
  });
}
