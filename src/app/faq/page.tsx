import type { Metadata } from "next";
import { GhostHeader } from "@/components/ghost/GhostHeader";
import { GhostFooter } from "@/components/ghost/GhostFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { HoverLink } from "@/components/motion/HoverLink";
import { breadcrumbSchema, faqPageSchema } from "@/components/seo/schema";
import { SITE_URL } from "@/lib/site-config";

const TITLE = "FAQ";
const DESCRIPTION =
  "Parking, takeaway, dogs and vegetarian options — everything you need to know before visiting Pizza Yolo at Club Aliga, Balatonaliga.";

const FAQ_ITEMS = [
  {
    question: "What is Detroit Style Pizza?",
    answer:
      "A square, thick-crust pizza with a crispy, caramelized cheese edge, baked in a steel pan. Read the full story on our Detroit Style Pizza page.",
  },
  {
    question: "Where is Pizza Yolo?",
    answer: "At Club Aliga, Balatonaliga, right on the shore of Lake Balaton.",
  },
  {
    question: "How far is Pizza Yolo from Siófok?",
    answer:
      "About 15 km — roughly a 15–20 minute drive along the south shore of Lake Balaton from Siófok to Club Aliga, Balatonvilágos.",
  },
  {
    question: "Can I order takeaway?",
    answer: "Yes — grab a slice and take it straight to the beach.",
  },
  {
    question: "Is there parking?",
    answer:
      "Car parking at Club Aliga costs 600 HUF per hour. If you're arriving on foot or by bike, it's easily accessible.",
  },
  {
    question: "Can I bring my dog?",
    answer: "Yes, dogs are welcome.",
  },
  {
    question: "Do you have vegetarian options?",
    answer: "Yes — the Trio is vegetarian, made with marinara, vodka and pesto sauce.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/faq",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Pizza Yolo" }],
  },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "FAQ", url: `${SITE_URL}/faq` },
        ])}
      />
      <GhostHeader />
      <main className="flex-1 px-6 py-16">
        <div className="mx-auto max-w-2xl space-y-12">
          <header>
            <Reveal className="space-y-4">
              <h1 className="font-display text-5xl md:text-6xl">{TITLE}</h1>
              <p className="text-lg text-ink/70">{DESCRIPTION}</p>
            </Reveal>
          </header>

          <dl className="space-y-8">
            {FAQ_ITEMS.map((item, index) => (
              <Reveal key={item.question} delay={index * 0.05} className="space-y-2">
                <dt className="text-xl font-semibold">{item.question}</dt>
                <dd className="text-ink/70">{item.answer}</dd>
              </Reveal>
            ))}
          </dl>

          <HoverLink
            href="/#location"
            className="inline-block rounded-full bg-ink px-6 py-3 font-semibold text-cream"
          >
            Find Us
          </HoverLink>
        </div>
      </main>
      <GhostFooter />
    </>
  );
}
