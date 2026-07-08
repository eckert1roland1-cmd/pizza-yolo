import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GhostHeader } from "@/components/ghost/GhostHeader";
import { GhostFooter } from "@/components/ghost/GhostFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { breadcrumbSchema, eventSchema } from "@/components/seo/schema";
import { events, getEventBySlug } from "@/lib/events";
import { SITE_URL } from "@/lib/site-config";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};

  return {
    title: event.title,
    description: event.summary,
    alternates: { canonical: `/events/${slug}` },
    openGraph: {
      title: event.title,
      description: event.summary,
      url: `/events/${slug}`,
      images: [event.image],
    },
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return (
    <>
      <JsonLd data={eventSchema(event)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: event.title, url: `${SITE_URL}/events/${slug}` },
        ])}
      />
      <GhostHeader />
      <main className="flex-1 px-6 py-16">
        <article className="mx-auto max-w-2xl space-y-6">
          <Reveal className="space-y-6">
            <h1 className="font-display text-5xl md:text-6xl">{event.title}</h1>
            <p className="text-lg text-ink/70">{event.summary}</p>
            <p className="text-ink/70">{event.description}</p>
          </Reveal>
        </article>
      </main>
      <GhostFooter />
    </>
  );
}
