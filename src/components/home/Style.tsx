import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";

export function Style() {
  return (
    <section className="bg-ink px-6 py-24 text-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[3fr_2fr]">
        <Reveal>
          <div className="relative mx-auto aspect-[2/3] w-full max-w-lg overflow-hidden rounded-2xl md:-rotate-2">
            <Image
              src="/images/style/three-boxes.webp"
              alt="Three Pizza Yolo Detroit Style Pizza boxes with dips, top down — Trio, Pepperoni and Ham & Corn side by side"
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <div className="space-y-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-light">
              Our Style
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-5xl leading-[0.95] md:text-6xl">
              Pizza Shouldn&apos;t Be Round.
              <br />
              Ours Isn&apos;t.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg text-cream/80">
              New York Sicilian roots, Detroit in the pan. 48 hours of cold
              fermentation for a light, airy dough — crisped in cheese at
              the edge, finished with Italian ingredients.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <MagneticButton
              href="#menu"
              className="inline-block rounded-full bg-brand px-6 py-3 font-semibold text-cream"
            >
              Today&apos;s Menu
            </MagneticButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
