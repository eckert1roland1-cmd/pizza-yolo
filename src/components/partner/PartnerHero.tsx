import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { ShapeAccent } from "@/components/ui/ShapeAccent";
import { ApplyButton } from "@/components/partner/ApplyProvider";
import { GOOGLE_REVIEW_COUNT } from "@/lib/reviews";

const STATS = [
  { value: String(GOOGLE_REVIEW_COUNT), label: "értékelés. Mind ötcsillagos." },
  { value: "~140", label: "szelet egy óra alatt, öt emberrel." },
  { value: "125 000", label: "megtekintés egyetlen videón." },
];

export function PartnerHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-12 md:pb-24 md:pt-16">
      <ShapeAccent
        variant="dots"
        className="pointer-events-none absolute right-6 top-6 hidden h-10 w-16 text-brand/25 lg:block"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
        <div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              Partnerprogram
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display mt-3 text-7xl leading-[0.95] md:text-8xl">
              Pizzéria.
              <br />
              <span className="text-brand">Pizzás nélkül.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-lg text-ink/70">
              Detroit style pizza, nyolc szeletre vágva. Sütő, fagyasztó, pult —
              ennyi kell hozzá. Nincs dagasztás, nincs szószfőzés, nincs ipari
              kemence.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ApplyButton className="rounded-full bg-brand px-7 py-3.5 font-semibold text-cream">
                Jelentkezem
              </ApplyButton>
              <a
                href="#utak"
                className="rounded-full border border-ink/15 px-7 py-3.5 font-semibold text-ink hover:border-ink/40"
              >
                Hogyan működik?
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-ink/5 md:rotate-1">
            <Image
              src="/images/partner/hero-slice.webp"
              alt="Detroit style pepperoni szelet"
              fill
              priority
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-px overflow-hidden rounded-2xl bg-ink/10 sm:grid-cols-3">
        {STATS.map((stat, index) => (
          <Reveal key={stat.label} delay={0.2 + index * 0.05} className="h-full">
            <div className="h-full bg-cream p-6">
              <p className="font-display text-5xl leading-none tabular-nums">{stat.value}</p>
              <p className="mt-2 text-sm text-ink/60">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
