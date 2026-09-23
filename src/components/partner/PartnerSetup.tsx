import { Reveal } from "@/components/motion/Reveal";

const NEEDED = [
  "Elektromos sütő",
  "Fagyasztó",
  "Pult és hűtővitrin",
  "Kassza",
  "Betanított munkatárs",
];

const NOT_NEEDED = [
  "Ipari pizzakemence",
  "Ipari dagasztógép",
  "Kelesztőszekrény",
  "Előkészítő konyha",
  "Hűtőkamra az alapanyagoknak",
  "Konyhai elszívórendszer",
  "Pizzaiolo a bérlistán",
  "Tizenöt alapanyag beszerzése és selejtje",
  "Receptfejlesztés és állandó minőség",
];

export function PartnerSetup() {
  return (
    <section id="beruhazas" className="scroll-mt-20 bg-brand/5 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              A belépő
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display mt-2 text-5xl md:text-6xl">
              Amire szükséged van.
              <br />
              És amire nincs.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-ink/70">
              Ipari pizzakemence nem kell — elektromos sütőben sül. A jobb oldali
              lista az, amit egy hagyományos pizzéria megvesz, mielőtt az első
              szelet elfogy.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid items-start gap-6 md:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl bg-cream p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-3xl leading-none text-brand">
                  Amire szükséged van
                </h3>
                <span className="shrink-0 font-display text-2xl tabular-nums text-brand/50">
                  {NEEDED.length}
                </span>
              </div>
              <ul className="mt-6 space-y-px">
                {NEEDED.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border-t border-ink/5 py-3 first:border-t-0"
                  >
                    <span
                      aria-hidden
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand/12 text-sm font-bold text-brand"
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-2xl border border-ink/10 p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-3xl leading-none text-ink/45">
                  Amire nincs
                </h3>
                <span className="shrink-0 font-display text-2xl tabular-nums text-ink/25">
                  {NOT_NEEDED.length}
                </span>
              </div>
              <ul className="mt-6 space-y-px">
                {NOT_NEEDED.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border-t border-ink/5 py-3 first:border-t-0"
                  >
                    <span
                      aria-hidden
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink/5 text-sm font-bold text-ink/25"
                    >
                      ✕
                    </span>
                    <span className="text-ink/45 line-through decoration-ink/20">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-ink/5 pt-5 text-sm text-ink/50">
                Egy hagyományos pizzéria mind a {NOT_NEEDED.length} tételt megveszi.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 text-sm text-ink/50">
            Bolton belül a bal oldali listából is csak az kell, ami még nincs meg nálad.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
