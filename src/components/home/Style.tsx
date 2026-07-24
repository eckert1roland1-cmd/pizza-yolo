import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";

export function Style() {
  return (
    <section className="relative bg-ink text-cream">
      <div className="relative aspect-[2600/691] w-full">
        <Image
          src="/images/style/three-pizzas-banner.webp"
          alt="Three Pizza Yolo Detroit Style Pizza boxes with dips, side by side — Ham & Corn, Trio and Pepperoni"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-ink/90 via-ink/40 to-ink/10 md:block" />
      </div>
      <div className="relative z-10 px-6 py-12 md:absolute md:inset-0 md:flex md:flex-col md:justify-end md:px-12 md:py-16">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-light">
            Our Style
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display mt-2 text-4xl leading-[0.95] md:text-6xl">
            Pizza Shouldn&apos;t Be Round.
            <br />
            Ours Isn&apos;t.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-md text-lg text-cream/80">
            New York Sicilian roots, Detroit in the pan. 48 hours of cold
            fermentation for a light, airy dough — crisped in cheese at
            the edge, finished with Italian ingredients.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <MagneticButton
            href="#menu"
            className="mt-6 inline-block rounded-full bg-brand px-6 py-3 font-semibold text-cream"
          >
            Today&apos;s Menu
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
