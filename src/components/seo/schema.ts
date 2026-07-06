import { GEO, NAP, OPENING_HOURS, SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/site-config";
import type { PizzaYoloEvent } from "@/lib/events";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: Object.values(SOCIAL_LINKS),
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: NAP.name,
    image: `${SITE_URL}/og-image.jpg`,
    url: SITE_URL,
    telephone: NAP.telephone,
    priceRange: NAP.priceRange,
    servesCuisine: "Detroit Style Pizza",
    address: {
      "@type": "PostalAddress",
      streetAddress: NAP.streetAddress,
      addressLocality: NAP.addressLocality,
      addressRegion: NAP.addressRegion,
      addressCountry: NAP.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    openingHoursSpecification: OPENING_HOURS.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    })),
    sameAs: Object.values(SOCIAL_LINKS),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function menuSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${SITE_NAME} Menu`,
    hasMenuSection: {
      "@type": "MenuSection",
      name: "Detroit Style Pizza",
      hasMenuItem: [
        {
          "@type": "MenuItem",
          name: "Trio",
          description: "Three flavors, one slice — marinara, vodka and pesto sauce.",
          suitableForDiet: "https://schema.org/VegetarianDiet",
        },
        {
          "@type": "MenuItem",
          name: "Pepperoni",
          description: "Loaded with crispy pepperoni and melted mozzarella.",
        },
        {
          "@type": "MenuItem",
          name: "Ham & Corn",
          description: "Simple, classic comfort food.",
        },
      ],
    },
  };
}

export function articleSchema({
  headline,
  description,
  url,
  image,
}: {
  headline: string;
  description: string;
  url: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image,
    url,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function eventSchema(event: PizzaYoloEvent) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    image: event.image,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: NAP.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: NAP.streetAddress,
        addressLocality: NAP.addressLocality,
        addressRegion: NAP.addressRegion,
        addressCountry: NAP.addressCountry,
      },
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
