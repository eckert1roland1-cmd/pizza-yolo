// A partnerkonstrukciók közös típusai és állandói.
//
// Az árazás szándékosan NEM szerepel itt: minden partner egyedi ajánlatot kap
// a jelentkezése után. A repó nyilvános, így ez egyben azt is jelenti, hogy a
// beszerzési árak nem olvashatók ki a forráskódból.

export const SLICES_PER_TRAY = 8;

export type PartnerMode = "own" | "in-store";
