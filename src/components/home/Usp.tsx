import { Reveal } from "@/components/motion/Reveal";
import { ShapeAccent } from "@/components/ui/ShapeAccent";

const USPS = [
  {
    title: "Detroit Style Pizza",
    description: "Square. Crispy. Soft inside.",
  },
  {
    title: "Beach Location",
    description: "Eat by Lake Balaton.",
  },
  {
    title: "Fresh Every Day",
    description: "Fresh ingredients. Fresh dough. Fast service.",
  },
];

export function Usp() {
  return (
    <section className="relative grid gap-8 px-6 py-24 md:grid-cols-3">
      <ShapeAccent
        variant="square"
        className="pointer-events-none absolute right-6 top-8 hidden h-12 w-12 text-brand/20 md:block"
      />
      {USPS.map((usp, index) => (
        <div key={usp.title} className={index === 1 ? "md:-translate-y-6" : undefined}>
          <Reveal delay={index * 0.1} className="space-y-2">
            <h2 className="font-display text-2xl">{usp.title}</h2>
            <p className="text-ink/60">{usp.description}</p>
          </Reveal>
        </div>
      ))}
    </section>
  );
}
