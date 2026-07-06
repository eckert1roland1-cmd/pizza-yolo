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

// No events are published yet. Add real entries here once a date is confirmed —
// generateStaticParams() driven by this array is what actually publishes a page.
export const events: PizzaYoloEvent[] = [];

export function getEventBySlug(slug: string): PizzaYoloEvent | undefined {
  return events.find((event) => event.slug === slug);
}
