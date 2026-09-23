import { Reveal } from "@/components/motion/Reveal";

const PILLARS = [
  {
    title: "Kész grafikai anyagok",
    body: "Menütábla, pulti és kültéri megjelenés, csomagolás, közösségi sablonok. Nem neked kell megterveztetned.",
  },
  {
    title: "Közös kampányok",
    body: "Szezonális akciók és új ízek egyszerre, minden ponton. Egy márka hangja, nem tizenöt külön próbálkozás.",
  },
  {
    title: "Tartalom és elérés",
    body: "A márka körüli tartalom központilag készül. Az eddigi elérés mögött nulla hirdetési költés van.",
  },
];

export function PartnerMarketing() {
  return (
    <section className="bg-brand/5 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              Mögötted
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display mt-2 text-5xl md:text-6xl">
              A marketing központi.
              <br />
              Neked sütni kell.
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.05} className="h-full">
              <div className="h-full rounded-2xl bg-cream p-7">
                <h3 className="font-display text-3xl leading-tight">{pillar.title}</h3>
                <p className="mt-3 text-ink/70">{pillar.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
