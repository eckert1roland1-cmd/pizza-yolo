// A partnerkonstrukciók közös típusai és a jelentkezési űrlap választható
// értékei. Az űrlap és az /api/partner végpont ugyanezt olvassa, így a
// validáció és a megjelenített opciók nem tudnak szétcsúszni.
//
// Az árazás szándékosan NEM szerepel itt: minden partner egyedi ajánlatot kap
// a jelentkezése után. A repó nyilvános, így ez egyben azt is jelenti, hogy a
// beszerzési árak nem olvashatók ki a forráskódból.

export const SLICES_PER_TRAY = 8;

export type PartnerMode = "own" | "in-store";

export type Option = { value: string; label: string };

export const MODE_LABELS: Record<PartnerMode, string> = {
  own: "Saját PizzaYolo",
  "in-store": "Bolton belüli sarok",
};

/** Van-e már helyszíne. Ez dönti el, mennyire konkrét az ajánlat. */
export const VENUE_STATUS: Option[] = [
  { value: "have", label: "Van már helyem" },
  { value: "looking", label: "Most keresem" },
];

/** A hely jellege — konstrukciónként más a releváns lista. */
export const VENUE_TYPES: Record<PartnerMode, Option[]> = {
  own: [
    { value: "street", label: "Utcai üzlet" },
    { value: "mall", label: "Bevásárlóközpont, food court" },
    { value: "seasonal", label: "Strand vagy szezonális hely" },
    { value: "mobile", label: "Food truck, kitelepülés" },
    { value: "undecided", label: "Még nincs eldöntve" },
  ],
  "in-store": [
    { value: "restaurant", label: "Étterem" },
    { value: "cafe", label: "Kávézó, cukrászda" },
    { value: "bar", label: "Bár, pub" },
    { value: "shop", label: "Bolt, delikát" },
    { value: "other", label: "Egyéb vendéglátóhely" },
  ],
};

/** Várható napi darabszám — ez a legfontosabb input az árajánlathoz. */
export const VOLUME_BANDS: Option[] = [
  { value: "under60", label: "Napi 60 szelet alatt" },
  { value: "60to120", label: "Napi 60–120 szelet" },
  { value: "120to200", label: "Napi 120–200 szelet" },
  { value: "over200", label: "Napi 200 szelet felett" },
  { value: "unknown", label: "Nem tudom megbecsülni" },
];

export const TIMELINES: Option[] = [
  { value: "1m", label: "Egy hónapon belül" },
  { value: "1to3m", label: "1–3 hónapon belül" },
  { value: "3to6m", label: "3–6 hónapon belül" },
  { value: "browsing", label: "Még csak tájékozódom" },
];

/** A választható értékek ellenőrzése a szerveroldalon. */
export function labelFor(options: Option[], value: string) {
  return options.find((o) => o.value === value)?.label ?? null;
}
