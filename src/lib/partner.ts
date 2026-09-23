// A partneri ajánlat számai egy helyen. A kalkulátor és a szekciók ugyanezt
// olvassák, hogy ne tudjanak szétcsúszni. Forrás: PizzaYolo_Pénzügy.xlsx.

export const VAT_RATE = 0.27; // elvitelre; helyben fogyasztásnál kedvezőbb
export const SLICES_PER_TRAY = 8;
export const DAYS_PER_MONTH = 26;

/** Ajánlott fogyasztói ár. A kalkulátorban fix, nem állítható. */
export const SLICE_PRICE = 2200;
export const SLICE_PRICE_LABEL = "~2200 Ft";

/** Saját PizzaYolo: fix beszerzési ár + royalty a nettó forgalomra. */
export const FRANCHISE = {
  slicePrice: 750,
  royaltyRate: 0.03,
  marketingRate: 0.01,
};

/** Bolton belül: nincs royalty, a beszerzési ár a forgalommal lépcsőzik. */
export const IN_STORE_TIERS = [
  { minSlicesPerDay: 120, slicePrice: 850 },
  { minSlicesPerDay: 60, slicePrice: 900 },
  { minSlicesPerDay: 0, slicePrice: 958 },
] as const;

export type PartnerMode = "own" | "in-store";

/** Reális napi darabszám konstrukciónként — a csúszka ebben mozog. */
export const VOLUME_RANGE: Record<
  PartnerMode,
  { min: number; max: number; step: number; default: number }
> = {
  own: { min: 140, max: 350, step: 5, default: 160 },
  "in-store": { min: 20, max: 120, step: 5, default: 60 },
};

export function inStoreSlicePrice(slicesPerDay: number) {
  const tier = IN_STORE_TIERS.find((t) => slicesPerDay >= t.minSlicesPerDay);
  return tier ? tier.slicePrice : IN_STORE_TIERS[IN_STORE_TIERS.length - 1].slicePrice;
}

/** A következő olcsóbb sáv, vagy null ha már a legjobban van. */
export function nextInStoreTier(slicesPerDay: number) {
  const better = [...IN_STORE_TIERS]
    .reverse()
    .find((t) => t.minSlicesPerDay > slicesPerDay);
  return better ?? null;
}

export type SliceEconomics = {
  net: number;
  supply: number;
  royalty: number;
  margin: number;
  monthly: number;
};

export function sliceEconomics(mode: PartnerMode, slicesPerDay: number): SliceEconomics {
  const net = SLICE_PRICE / (1 + VAT_RATE);
  const supply = mode === "own" ? FRANCHISE.slicePrice : inStoreSlicePrice(slicesPerDay);
  const royalty =
    mode === "own" ? net * (FRANCHISE.royaltyRate + FRANCHISE.marketingRate) : 0;
  const margin = net - supply - royalty;

  return {
    net: Math.round(net),
    supply,
    royalty: Math.round(royalty),
    margin: roundTo(margin, 10),
    monthly: roundTo(margin * slicesPerDay * DAYS_PER_MONTH, 10_000),
  };
}

function roundTo(value: number, unit: number) {
  return Math.round(value / unit) * unit;
}

export function formatHuf(value: number) {
  return new Intl.NumberFormat("hu-HU").format(Math.max(0, Math.round(value)));
}
