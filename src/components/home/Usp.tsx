import { Reveal } from "@/components/motion/Reveal";

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
    <section className="grid gap-8 px-6 py-24 md:grid-cols-3">
      {USPS.map((usp, index) => (
        <Reveal key={usp.title} delay={index * 0.1} className="space-y-2">
          <h2 className="font-display text-2xl">{usp.title}</h2>
          <p className="text-ink/60">{usp.description}</p>
        </Reveal>
      ))}
    </section>
  );
}
