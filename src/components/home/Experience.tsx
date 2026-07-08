import { Reveal } from "@/components/motion/Reveal";
import { ShapeAccent } from "@/components/ui/ShapeAccent";

const MOMENTS = ["Beach", "Music", "Community", "Events", "Sunsets", "Relax"];

export function Experience() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-24 text-cream">
      <ShapeAccent
        variant="dots"
        className="pointer-events-none absolute bottom-8 right-8 hidden h-16 w-24 text-brand-light/30 md:block"
      />
      <Reveal>
        <h2 className="font-display mb-12 text-4xl">More than Pizza.</h2>
      </Reveal>
      <div className="flex flex-wrap gap-4">
        {MOMENTS.map((moment, index) => (
          <Reveal key={moment} delay={index * 0.05}>
            <span className="rounded-full border border-cream/20 px-5 py-2 text-sm">
              {moment}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
