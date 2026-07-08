import type { Metadata } from "next";
import { GhostHeader } from "@/components/ghost/GhostHeader";
import { GhostFooter } from "@/components/ghost/GhostFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { HoverLink } from "@/components/motion/HoverLink";
import { articleSchema, breadcrumbSchema } from "@/components/seo/schema";
import { SITE_URL } from "@/lib/site-config";

const TITLE = "What is Detroit Style Pizza?";
const DESCRIPTION =
  "Square, crispy-edged and packed with cheese to the corners — here's what makes Detroit Style Pizza different, and why Pizza Yolo serves it right on the beach at Club Aliga, Balatonaliga.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/detroit-style-pizza" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/detroit-style-pizza",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Pizza Yolo" }],
  },
};

export default function DetroitStylePizzaPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: TITLE,
          description: DESCRIPTION,
          url: `${SITE_URL}/detroit-style-pizza`,
          image: `${SITE_URL}/og-image.jpg`,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Detroit Style Pizza", url: `${SITE_URL}/detroit-style-pizza` },
        ])}
      />
      <GhostHeader />
      <main className="flex-1 px-6 py-16">
        <article className="mx-auto max-w-2xl space-y-12">
          <header>
            <Reveal className="space-y-4">
              <h1 className="font-display text-5xl md:text-6xl">{TITLE}</h1>
              <p className="text-lg text-ink/70">{DESCRIPTION}</p>
            </Reveal>
          </header>

          <section>
            <Reveal className="space-y-3">
              <h2 className="font-display text-3xl">A Detroit original</h2>
              <p className="text-ink/70">
                Detroit Style Pizza was born in the 1940s at Buddy&apos;s
                Rendezvous, a bar on Detroit&apos;s east side. The dough was
                baked in blue steel trays originally used to hold automotive
                parts in the city&apos;s factories — which is why the pizza
                came out square, not round. Decades later, it&apos;s one of
                the fastest-growing pizza styles in the world.
              </p>
            </Reveal>
          </section>

          <section>
            <Reveal className="space-y-3">
              <h2 className="font-display text-3xl">The square shape</h2>
              <p className="text-ink/70">
                Detroit Style Pizza is baked in a rectangular pan, giving
                every slice straight edges and a thick, focaccia-like crust —
                airy and soft inside, crispy on the bottom.
              </p>
            </Reveal>
          </section>

          <section>
            <Reveal className="space-y-3">
              <h2 className="font-display text-3xl">The cheese edge</h2>
              <p className="text-ink/70">
                Cheese is pushed all the way to the edge of the pan before
                baking, where it caramelizes against the hot steel and forms
                a crisp, lacy, slightly charred border around every slice —
                often considered the best part.
              </p>
            </Reveal>
          </section>

          <section>
            <Reveal className="space-y-4">
              <h2 className="font-display text-3xl">How it compares</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">vs. Neapolitan</h3>
                  <p className="text-ink/70">
                    Neapolitan pizza is round, thin and soft, baked in under
                    90 seconds in a wood-fired oven. Detroit Style is square,
                    thick and baked longer in a steel pan — more crust, more
                    chew.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">vs. Roman</h3>
                  <p className="text-ink/70">
                    Roman pizza al taglio is also baked in a pan and sold by
                    the slice, but it&apos;s stretched thin and light. Detroit
                    Style is deliberately thick, with a denser, bread-like
                    crumb.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">vs. New York</h3>
                  <p className="text-ink/70">
                    New York pizza is a large, thin, foldable round slice.
                    Detroit Style trades the fold for a crisp, caramelized
                    edge and a taller crust.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">vs. Pan pizza</h3>
                  <p className="text-ink/70">
                    Generic pan pizza is also baked in a tray, but usually
                    skips the signature edge-to-edge cheese and the
                    caramelized border that defines Detroit Style.
                  </p>
                </div>
              </div>
            </Reveal>
          </section>

          <section>
            <Reveal className="space-y-3">
              <h2 className="font-display text-3xl">Detroit Style, by the beach</h2>
              <p className="text-ink/70">
                At Pizza Yolo, we bake fresh Detroit Style Pizza every day at
                Club Aliga, Balatonaliga — right on Lake Balaton. Same square
                shape, same crispy cheese edge, served a few steps from the
                water.
              </p>
            </Reveal>
          </section>

          <HoverLink
            href="/#menu"
            className="inline-block rounded-full bg-ink px-6 py-3 font-semibold text-cream"
          >
            See the Menu
          </HoverLink>
        </article>
      </main>
      <GhostFooter />
    </>
  );
}
