"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import {
  DAYS_PER_MONTH,
  FRANCHISE,
  SLICE_PRICE_LABEL,
  VOLUME_RANGE,
  formatHuf,
  nextInStoreTier,
  sliceEconomics,
  type PartnerMode,
} from "@/lib/partner";

const MODES: { value: PartnerMode; label: string }[] = [
  { value: "own", label: "Saját PizzaYolo" },
  { value: "in-store", label: "Bolton belül" },
];

export function PartnerCalculator() {
  const [mode, setMode] = useState<PartnerMode>("own");
  const [volume, setVolume] = useState(VOLUME_RANGE.own.default);

  const range = VOLUME_RANGE[mode];
  const economics = sliceEconomics(mode, volume);
  const nextTier = mode === "in-store" ? nextInStoreTier(volume) : null;

  function changeMode(next: PartnerMode) {
    setMode(next);
    setVolume(VOLUME_RANGE[next].default);
  }

  return (
    <section id="kalkulator" className="scroll-mt-20 bg-ink px-6 py-24 text-cream">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-light">
            Számold ki
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display mt-2 text-5xl md:text-6xl">
            Mennyi marad egy szeleten?
          </h2>
        </Reveal>

        {/* Mobilon: választó → eredmény → csúszka, hogy húzás közben is
            lássam a változó összeget. Desktopon két hasáb. */}
        <div className="mt-12 grid items-start gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-10">
          <Reveal delay={0.1} className="space-y-8">
            <div
              role="group"
              aria-label="Konstrukció"
              className="flex gap-2 rounded-full bg-cream/10 p-1"
            >
              {MODES.map((option) => {
                const active = mode === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => changeMode(option.value)}
                    className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                      active ? "bg-brand text-cream" : "text-cream/60 hover:text-cream"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-baseline justify-between gap-4 border-b border-cream/10 pb-6">
              <span className="text-cream/70">Eladási ár szeletenként</span>
              <span className="font-display text-3xl tabular-nums">
                {SLICE_PRICE_LABEL}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="md:row-span-2">
            <div className="rounded-2xl bg-cream/5 p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-light">
                Nálad marad
              </p>
              <p className="font-display mt-2 text-7xl leading-none tabular-nums md:text-8xl">
                {formatHuf(economics.margin)}
                <span className="ml-2 align-top text-2xl text-cream/50">Ft</span>
              </p>
              <p className="mt-1 text-cream/60">szeletenként</p>

              <dl className="mt-8 space-y-2 border-t border-cream/10 pt-6 text-sm tabular-nums">
                <Row label="Nettó eladási ár" value={economics.net} />
                <Row label="Beszerzési ár" value={-economics.supply} />
                {economics.royalty > 0 ? (
                  <Row
                    label={`Royalty + marketing (${Math.round(
                      (FRANCHISE.royaltyRate + FRANCHISE.marketingRate) * 100
                    )}%)`}
                    value={-economics.royalty}
                  />
                ) : null}
              </dl>

              <p className="mt-5 text-sm text-brand-light">
                {mode === "own"
                  ? `Fix ${formatHuf(FRANCHISE.slicePrice)} Ft/szelet beszerzési ár, a forgalomtól függetlenül.`
                  : nextTier
                    ? `Napi ${nextTier.minSlicesPerDay} szelettől ${formatHuf(
                        nextTier.slicePrice
                      )} Ft-ra csökken a beszerzési ár.`
                    : "Ez már a legjobb beszerzési sáv."}
              </p>

              <div className="mt-6 border-t border-cream/10 pt-6">
                <p className="text-sm text-cream/60">Havonta</p>
                <p className="font-display mt-1 text-5xl tabular-nums md:text-6xl">
                  {formatHuf(economics.monthly)} Ft
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor="calc-volume" className="text-cream/70">
                  Napi eladott szelet
                </label>
                <output htmlFor="calc-volume" className="font-display text-3xl tabular-nums">
                  {formatHuf(volume)}
                </output>
              </div>
              <input
                id="calc-volume"
                type="range"
                min={range.min}
                max={range.max}
                step={range.step}
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
                className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-cream/20 accent-brand-light outline-offset-4"
              />
              <div className="mt-2 flex justify-between text-sm tabular-nums text-cream/40">
                <span>{formatHuf(range.min)}</span>
                <span>{formatHuf(range.max)}</span>
              </div>
              <p className="mt-3 text-sm text-cream/40">
                Havi {DAYS_PER_MONTH} nyitvatartási nappal számolunk.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.25}>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-cream/50">
            27%-os áfakulccsal számolunk — ez az elvitel esete. Helyben
            fogyasztásnál a kulcs kedvezőbb, tehát több marad. Az összegek
            kerekítve. Ez árrés: a bérleti díj, a bér és a rezsi még ebből megy.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-cream/60">{label}</dt>
      <dd className="font-medium">
        {value < 0 ? "−" : ""}
        {formatHuf(Math.abs(value))} Ft
      </dd>
    </div>
  );
}
