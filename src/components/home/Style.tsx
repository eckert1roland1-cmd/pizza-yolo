import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";

export function Style() {
  return (
    <section className="flex flex-col bg-ink text-cream md:flex-row md:items-stretch">
      <div className="relative aspect-[2/3] w-full md:aspect-[2/3] md:w-[440px] md:shrink-0">
        <Image
          src="/images/style/three-boxes.webp"
          alt="Three Pizza Yolo Detroit Style Pizza boxes with dips, top down — Trio, Pepperoni and Ham & Corn"
          fill
          sizes="(min-width: 768px) 440px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center px-6 py-16 md:px-12 md:py-24">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-light">
            Our Style
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display mt-2 text-5xl leading-[0.95] md:text-6xl">
            Pizza Shouldn&apos;t Be Round.
            <br />
            Ours Isn&apos;t.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-md text-lg text-cream/80">
            New York Sicilian roots, Detroit in the pan. 48 hours of cold
            fermentation for a light, airy dough — crisped in cheese at
            the edge, finished with Italian ingredients.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <MagneticButton
            href="#menu"
            className="mt-8 inline-block rounded-full bg-brand px-6 py-3 font-semibold text-cream"
          >
            Today&apos;s Menu
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
