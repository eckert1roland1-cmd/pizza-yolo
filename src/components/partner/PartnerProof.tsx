import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, GOOGLE_REVIEWS_QUERY } from "@/lib/reviews";

const REVIEWS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  GOOGLE_REVIEWS_QUERY
)}`;

const CLIPS = [
  {
    image: "/images/partner/clip-youtube.webp",
    alt: "Sallai Márk videója a PizzaYolóról",
    title: "Sallai Márk",
    meta: "YouTube · 44 ezer megtekintés",
  },
  {
    image: "/images/partner/clip-tiktok.webp",
    alt: "A Mario TikTok-videója a PizzaYolóról",
    title: "A Mario",
    meta: "TikTok · 125 ezer megtekintés",
  },
];

function Phone({ image, alt }: { image: string; alt: string }) {
  return (
    <div className="mx-auto w-full max-w-[16rem] rounded-[2.5rem] bg-ink p-2.5 shadow-xl shadow-ink/20">
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2rem] bg-ink">
        <span
          aria-hidden
          className="absolute left-1/2 top-2 z-10 h-5 w-[35%] -translate-x-1/2 rounded-full bg-ink"
        />
        <Image
          src={image}
          alt={alt}
          fill
          sizes="256px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export function PartnerProof() {
  return (
    <section id="bizonyitek" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              Már működik
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display mt-2 text-5xl md:text-6xl">
              Nem kell elhinned.
              <br />
              Nézd meg.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-ink/70">
              A terméket fizetett hirdetés nélkül is megtalálták. Kettő a sok
              megjelenés közül.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 rounded-2xl bg-brand/5 px-6 py-12 sm:grid-cols-2">
          {CLIPS.map((clip, index) => (
            <Reveal key={clip.title} delay={index * 0.08}>
              <Phone image={clip.image} alt={clip.alt} />
              <div className="mt-5 text-center">
                <p className="font-display text-2xl leading-none">{clip.title}</p>
                <p className="mt-1.5 text-sm text-ink/60">{clip.meta}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Reveal>
            <a
              href={REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col justify-between rounded-2xl border border-ink/10 p-8 transition-colors hover:border-brand/40"
            >
              <div>
                <div aria-hidden className="flex gap-0.5 text-brand">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg key={index} viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                      <path d="M10 1.5l2.6 5.4 5.9.7-4.4 4.1 1.2 5.9L10 14.8l-5.3 2.8 1.2-5.9-4.4-4.1 5.9-.7L10 1.5z" />
                    </svg>
                  ))}
                </div>
                <p className="font-display mt-4 text-4xl leading-tight">
                  {GOOGLE_REVIEW_COUNT} értékelés.
                  <br />
                  Mind ötcsillagos.
                </p>
              </div>
              <p className="mt-4 text-sm text-ink/60">
                {GOOGLE_RATING.toFixed(1)} a Google-on — nézd meg te is
              </p>
            </a>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex h-full flex-col justify-between rounded-2xl bg-ink p-8 text-cream">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-light">
                  Lemért csúcsóra
                </p>
                <p className="font-display mt-4 text-4xl leading-tight">
                  ~140 szelet
                  <br />
                  hatvan perc alatt.
                </p>
              </div>
              <p className="mt-4 text-sm text-cream/60">
                Öt emberrel, egy kitelepülésen mérve. Nem elméleti kapacitás.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
