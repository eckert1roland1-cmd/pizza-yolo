import type { Metadata } from "next";
import { GhostHeader } from "@/components/ghost/GhostHeader";
import { GhostFooter } from "@/components/ghost/GhostFooter";
import { CONTACT_EMAIL, NAP, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Use",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <>
      <GhostHeader />
      <main className="flex-1 px-6 py-16">
        <article className="mx-auto max-w-2xl space-y-10">
          <header className="space-y-2">
            <h1 className="font-display text-4xl md:text-5xl">Terms of Use</h1>
            <p className="text-ink/50 text-sm">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>
          </header>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Using this website</h2>
            <p className="text-ink/70">
              This website is provided by {SITE_NAME} ({NAP.legalName}),{" "}
              {NAP.streetAddress}, {NAP.addressLocality}, {NAP.addressRegion}, Hungary. It
              exists to share information about our menu, location and opening
              hours. It does not currently support online ordering or
              payments.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Accuracy</h2>
            <p className="text-ink/70">
              We try to keep menu items, prices, and opening hours accurate,
              but they can change without notice. Please contact us or check
              our Google Business Profile if you need to confirm details
              before visiting.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Intellectual property</h2>
            <p className="text-ink/70">
              The {SITE_NAME} name, logo, and branding are our property. Please
              don&apos;t reuse our photography or branding without asking
              first.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Contact</h2>
            <p className="text-ink/70">
              Questions about these terms? Reach us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                {CONTACT_EMAIL}
              </a>.
            </p>
          </section>
        </article>
      </main>
      <GhostFooter />
    </>
  );
}
