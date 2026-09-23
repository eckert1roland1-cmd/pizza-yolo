import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SLICES_PER_TRAY } from "@/lib/partner";

const FLAVORS = [
  { name: "Pikáns Pepperoni", image: "/images/partner/flavor-pepperoni.webp" },
  { name: "Son-ku", image: "/images/partner/flavor-chicken.webp" },
  { name: "Trio", image: "/images/partner/flavor-trio.webp", note: "Vegetáriánus" },
];

const SPECS = [
  { value: "30×40 cm", label: "tepsiméret" },
  { value: `${SLICES_PER_TRAY} szelet`, label: "egy tepsiből" },
  { value: "1–5 perc", label: "egy rendelés kiadása" },
];

export function PartnerProduct() {
  return (
    <section id="termek" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              A termék
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display mt-2 text-5xl md:text-6xl">
              Éttermi minőség.
              <br />
              Szeletenként.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-ink/70">
              Detroit pizza több ízben, szeletenként árulva. Egy rendelést egy-öt
              perc alatt kiadsz.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-ink/10 sm:grid-cols-3">
            {SPECS.map((spec) => (
              <div key={spec.label} className="bg-cream p-6">
                <dt className="font-display text-4xl leading-none">{spec.value}</dt>
                <dd className="mt-2 text-sm text-ink/60">{spec.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {FLAVORS.map((flavor, index) => (
            <Reveal key={flavor.name} delay={index * 0.05} className="h-full">
              <div className="flex h-full flex-col gap-3">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-ink/5">
                  <Image
                    src={flavor.image}
                    alt={`${flavor.name} szelet`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-3xl leading-none">{flavor.name}</h3>
                  {flavor.note ? (
                    <span className="shrink-0 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                      {flavor.note}
                    </span>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 grid gap-6 border-t border-ink/10 pt-10 md:grid-cols-2">
            <p className="text-lg text-ink/70">
              Külön adagolt házi szószokkal és egyedileg gyártott hozzávalókkal.
            </p>
            <p className="text-lg text-ink/70">
              Folyamatosan bővülő ízlap. További ízek kizárólag PizzaYolo
              franchise partnereknek — egyénileg egyeztetve.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
