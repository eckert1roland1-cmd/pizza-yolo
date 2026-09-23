import { Reveal } from "@/components/motion/Reveal";
import { ShapeAccent } from "@/components/ui/ShapeAccent";
import { ApplyButton } from "@/components/partner/ApplyProvider";
import { CONTACT_EMAIL, NAP } from "@/lib/site-config";

export function PartnerCta() {
  return (
    <section id="jelentkezes" className="relative scroll-mt-20 overflow-hidden bg-brand px-6 py-24 text-cream">
      <ShapeAccent
        variant="square"
        className="pointer-events-none absolute left-8 top-10 hidden h-14 w-14 text-cream/20 md:block"
      />
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="font-display text-5xl md:text-6xl">
            Beszéljünk arról, hol nyitnál.
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mx-auto mt-5 max-w-lg text-lg text-cream/80">
            Mondd el, milyen helyed van vagy mit terveznél. Megnézzük együtt,
            melyik konstrukció illik hozzád.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ApplyButton className="mt-8 rounded-full bg-cream px-8 py-4 text-lg font-semibold text-brand">
            Jelentkezem
          </ApplyButton>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 text-sm text-cream/70">
            Vagy írj közvetlenül:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
              {CONTACT_EMAIL}
            </a>{" "}
            ·{" "}
            <a href={`tel:${NAP.telephone.replace(/\s/g, "")}`} className="underline">
              {NAP.telephone}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
