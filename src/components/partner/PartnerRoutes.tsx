import { Reveal } from "@/components/motion/Reveal";
import { ApplyButton } from "@/components/partner/ApplyProvider";

export function PartnerRoutes() {
  return (
    <section id="utak" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              Két út
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display mt-2 text-5xl md:text-6xl">
              Saját hely, vagy egy sarok a tiédben.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-ink/70">
              Ugyanaz a termék, ugyanaz a márka. A különbség a beszerzési árban
              van — és abban, mennyire lesz a hely PizzaYolo.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2">
          {/* Saját PizzaYolo */}
          <Reveal className="h-full">
            <div className="relative flex h-full flex-col rounded-2xl bg-brand p-8 text-cream">
              <span className="absolute -top-3 left-8 rounded-full bg-ink px-4 py-1 text-xs font-semibold uppercase tracking-wide text-cream">
                Kedvezőbb
              </span>
              <h3 className="font-display text-4xl">Saját PizzaYolo</h3>
              <p className="font-display mt-4 text-3xl leading-tight text-cream/90">
                Teljes márka,
                <br />
                saját egység.
              </p>
              <p className="mt-4 text-cream/80">
                Fix beszerzési ár, a forgalomtól függetlenül. A két konstrukció
                közül ez a kedvezőbb.
              </p>
              <ul className="mt-6 flex-1 space-y-2.5 text-cream/90">
                <Item light>Teljes arculat, saját egység</Item>
                <Item light>A teljes ízlap</Item>
                <Item light>Betanítás és folyamatos támogatás</Item>
                <Item light>Helyszínt együtt választunk</Item>
              </ul>
              <ApplyButton
                mode="own"
                className="mt-8 w-full rounded-full bg-cream px-6 py-3 font-semibold text-brand"
              >
                Ez érdekel
              </ApplyButton>
            </div>
          </Reveal>

          {/* Bolton belül */}
          <Reveal delay={0.05} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-ink/10 bg-cream p-8">
              <h3 className="font-display text-4xl">Bolton belüli sarok</h3>
              <p className="font-display mt-4 text-3xl leading-tight text-ink/80">
                A meglévő
                <br />
                helyed mellé.
              </p>
              <p className="mt-4 text-ink/70">
                Minimális beruházás, gyors indulás. A beszerzési ár a forgalommal
                csökken — minél több fogy, annál kedvezőbb.
              </p>
              <ul className="mt-6 flex-1 space-y-2.5 text-ink/80">
                <Item>A meglévő vendégkörödre épít</Item>
                <Item>Nincs külön bérleti díj</Item>
                <Item>Nincs royalty</Item>
                <Item>Bármikor átléphetsz saját egységbe</Item>
              </ul>
              <ApplyButton
                mode="in-store"
                className="mt-8 w-full rounded-full bg-ink px-6 py-3 font-semibold text-cream"
              >
                Ez érdekel
              </ApplyButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-ink/60">
            Az árazás minden partnernél egyedi — a helyszín, a várható forgalom
            és a konstrukció dönti el. A jelentkezésed után személyre szabott
            ajánlatot küldünk.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Item({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden className={light ? "text-cream/60" : "text-brand"}>
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}
