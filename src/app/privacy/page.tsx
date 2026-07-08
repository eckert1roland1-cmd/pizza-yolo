import type { Metadata } from "next";
import { GhostHeader } from "@/components/ghost/GhostHeader";
import { GhostFooter } from "@/components/ghost/GhostFooter";
import { CONTACT_EMAIL, NAP, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <>
      <GhostHeader />
      <main className="flex-1 px-6 py-16">
        <article className="mx-auto max-w-2xl space-y-10">
          <header className="space-y-2">
            <h1 className="font-display text-4xl md:text-5xl">Privacy Policy</h1>
            <p className="text-ink/70 text-sm">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>
          </header>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Who we are</h2>
            <p className="text-ink/70">
              {SITE_NAME} ({NAP.legalName}), {NAP.streetAddress}, {NAP.addressLocality}, {NAP.addressRegion}, Hungary,
              is the data controller for this website. If you have questions about your
              data, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                {CONTACT_EMAIL}
              </a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">What we collect</h2>
            <p className="text-ink/70">
              When you accept cookies via the banner on this site, we use the
              following third-party services to understand how the site is
              used and to measure our marketing:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-ink/70">
              <li>
                <strong>Google Analytics 4</strong> — page views, general
                location (city-level), device type, and on-site actions
                (e.g. clicking &quot;Get Directions&quot;, viewing the menu).
              </li>
              <li>
                <strong>Google Tag Manager</strong> — used only to load the
                other tools listed here; it does not collect data itself.
              </li>
              <li>
                <strong>Meta Pixel</strong> — page views and on-site actions,
                used to measure and improve our Instagram/Facebook advertising.
              </li>
            </ul>
            <p className="text-ink/70">
              None of these cookies are set until you actively accept them in
              the cookie banner. If you decline, only strictly necessary
              cookies (needed for the site to function) are used.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Why we collect it</h2>
            <p className="text-ink/70">
              To understand which parts of the site people actually use, to
              see whether visitors find directions/contact information, and
              to measure whether our social media advertising is reaching
              real visitors. We do not sell your data to anyone.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">How long we keep it</h2>
            <p className="text-ink/70">
              Analytics and advertising data is retained according to each
              provider&apos;s default retention period (Google Analytics: 14
              months; Meta Pixel: 180 days), after which it is automatically
              deleted by the provider.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Your rights</h2>
            <p className="text-ink/70">
              Under GDPR, you have the right to access, correct, or delete
              your personal data, to withdraw consent at any time, and to
              lodge a complaint with the Hungarian data protection authority
              (NAIH). You can withdraw or change your cookie consent anytime
              using the &quot;Cookie Settings&quot; link in the footer, or
              contact us directly at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                {CONTACT_EMAIL}
              </a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Third parties</h2>
            <p className="text-ink/70">
              Google and Meta process data as independent controllers under
              their own privacy policies. See{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Google&apos;s Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://www.facebook.com/privacy/policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Meta&apos;s Privacy Policy
              </a>{" "}
              for details.
            </p>
          </section>
        </article>
      </main>
      <GhostFooter />
    </>
  );
}
