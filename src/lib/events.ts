export type PizzaYoloEvent = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  startDate: string;
  endDate?: string;
  image: string;
  updatedAt?: string;
};

// generateStaticParams() driven by this array is what actually publishes a page —
// add real entries here once a date is confirmed, archive (remove) once it's past.
export const events: PizzaYoloEvent[] = [
  {
    slug: "sunset-party",
    title: "Sunset Party at Pizza Yolo",
    summary:
      "A small sunset party at Pizza Yolo — pizza, drinks and music on the beach as the sun goes down. Friday, July 31, from 6 PM at Club Aliga, Balatonvilágos.",
    description:
      "Sunset. Pizza. Good people. No big production — just a relaxed evening on the beach with fresh slices, cold drinks and music as the sun drops over Lake Balaton. Friday, July 31, from 6 PM at Club Aliga. See you there.",
    startDate: "2026-07-31T18:00:00+02:00",
    endDate: "2026-07-31T21:00:00+02:00",
    image: "/images/gallery/beach-crew.webp",
    updatedAt: "2026-07-24",
  },
];

export function getEventBySlug(slug: string): PizzaYoloEvent | undefined {
  return events.find((event) => event.slug === slug);
}
