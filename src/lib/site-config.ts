export const SITE_URL = "https://pizzayolo.eu";

export const SITE_NAME = "Pizza Yolo";

export const NAP = {
  name: SITE_NAME,
  legalName: "Pizza Yolo",
  streetAddress: "Aligai út",
  addressLocality: "Balatonvilágos",
  addressRegion: "Somogy",
  postalCode: "8171",
  addressCountry: "HU",
  telephone: "+36 70 414 8910",
  priceRange: "$$",
};

export const CONTACT_EMAIL = "info@pizzayolo.eu";

// Exact pin from the Pizza Yolo Google Business Profile listing.
export const GEO = {
  latitude: 46.9854332,
  longitude: 18.1656624,
};

// Closed Monday–Thursday. Matches the hours listed on Google Business Profile.
export const OPENING_HOURS = [
  { dayOfWeek: ["Friday"], opens: "12:30", closes: "21:00" },
  { dayOfWeek: ["Saturday"], opens: "11:00", closes: "23:00" },
  { dayOfWeek: ["Sunday"], opens: "11:00", closes: "22:00" },
];

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/realpizzayolo",
  tiktok: "https://tiktok.com/@realpizzayolo",
};

// Single shared code, shown in-app and emailed on signup. Redeemed in person
// at the truck — there's no online ordering system to enforce per-user codes.
export const COUPON_CODE = "YOLO10";
