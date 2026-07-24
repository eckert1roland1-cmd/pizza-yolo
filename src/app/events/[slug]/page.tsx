import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { GhostHeader } from "@/components/ghost/GhostHeader";
import { GhostFooter } from "@/components/ghost/GhostFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { breadcrumbSchema, eventSchema } from "@/components/seo/schema";
import { events, getEventBySlug } from "@/lib/events";
import { GEO, SITE_URL } from "@/lib/site-config";

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

function formatEventDate(startISO: string, endISO?: string) {
  const start = new Date(startISO);
  const datePart = start.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const startTime = start.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  if (!endISO) return `${datePart}, from ${startTime}`;
  const endTime = new Date(endISO).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  return `${datePart}, ${startTime}–${endTime}`;
}

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${GEO.latitude},${GEO.longitude}`;

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
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink/5">
              <Image
                src={event.image}
                alt={event.title}
                fill
                sizes="(min-width: 768px) 700px, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <h1 className="font-display text-5xl md:text-6xl">{event.title}</h1>
            <p className="text-lg font-semibold text-brand">
              {formatEventDate(event.startDate, event.endDate)}
            </p>
            <p className="text-ink/70">{event.description}</p>
            <MagneticButton
              href={directionsUrl}
              external
              className="inline-block rounded-full bg-ink px-6 py-3 font-semibold text-cream"
            >
              Get Directions
            </MagneticButton>
          </Reveal>
        </article>
      </main>
      <GhostFooter />
    </>
  );
}
