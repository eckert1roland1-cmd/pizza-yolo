import { Reveal } from "@/components/motion/Reveal";

function SquareIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 14h16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 17c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const USPS = [
  {
    title: "Detroit Style Pizza",
    description: "Square. Crispy. Soft inside.",
    icon: <SquareIcon />,
  },
  {
    title: "Beach Location",
    description: "Eat by Lake Balaton.",
    icon: <WaveIcon />,
  },
  {
    title: "Fresh Every Day",
    description: "Fresh ingredients. Fresh dough. Fast service.",
    icon: <SparkleIcon />,
  },
];

export function Usp() {
  return (
    <section className="px-6 py-24">
      <div className="grid gap-6 md:grid-cols-3">
        {USPS.map((usp, index) => (
          <div key={usp.title} className={index === 1 ? "md:-translate-y-6" : undefined}>
            <Reveal delay={index * 0.1}>
              <div className="space-y-4 rounded-2xl bg-white p-6 shadow-md shadow-ink/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                  {usp.icon}
                </div>
                <h2 className="font-display text-2xl">{usp.title}</h2>
                <p className="text-ink/70">{usp.description}</p>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
