import type { Metadata } from "next";
import Image from "next/image";
import { GhostFooter } from "@/components/ghost/GhostFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/components/seo/schema";
import { ApplyProvider } from "@/components/partner/ApplyProvider";
import { PartnerHeader } from "@/components/partner/PartnerHeader";
import { PartnerHero } from "@/components/partner/PartnerHero";
import { PartnerProduct } from "@/components/partner/PartnerProduct";
import { PartnerSetup } from "@/components/partner/PartnerSetup";
import { PartnerCalculator } from "@/components/partner/PartnerCalculator";
import { PartnerRoutes } from "@/components/partner/PartnerRoutes";
import { PartnerProof } from "@/components/partner/PartnerProof";
import { PartnerMarketing } from "@/components/partner/PartnerMarketing";
import { PartnerCta } from "@/components/partner/PartnerCta";
import { SITE_URL } from "@/lib/site-config";

const TITLE = "Partnerprogram";
const DESCRIPTION =
  "Nyiss saját PizzaYolót, vagy tedd be a meglévő helyed mellé. Detroit style pizza szeletenként — sütő, fagyasztó, pult, és nincs szükség pizzaiolóra.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/partner" },
  openGraph: {
    title: `${TITLE} | Pizza Yolo`,
    description: DESCRIPTION,
    url: "/partner",
    locale: "hu_HU",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Pizza Yolo" }],
  },
};

export default function PartnerPage() {
  return (
    <ApplyProvider>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: TITLE, url: `${SITE_URL}/partner` },
        ])}
      />
      <PartnerHeader />
      <main lang="hu" className="flex-1">
        <PartnerHero />
        <PartnerProduct />

        <div className="relative h-[clamp(14rem,32vw,26rem)] overflow-hidden">
          <Image
            src="/images/partner/band-oven.webp"
            alt="Frissen sült tepsi a sütőnél"
            fill
            sizes="100vw"
            className="object-cover object-[center_42%]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-6 pb-8 pt-24">
            <p className="font-display mx-auto max-w-6xl text-3xl text-cream md:text-5xl">
              Fagyasztóból a sütőbe. Nyolc szelet, pár perc.
            </p>
          </div>
        </div>

        <PartnerSetup />
        <PartnerCalculator />
        <PartnerRoutes />
        <PartnerProof />
        <PartnerMarketing />
        <PartnerCta />
      </main>
      <GhostFooter />
    </ApplyProvider>
  );
}
