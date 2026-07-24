import { Reveal } from "@/components/motion/Reveal";
import { FEATURED_REVIEWS, GOOGLE_RATING, GOOGLE_REVIEW_COUNT, GOOGLE_REVIEWS_QUERY } from "@/lib/reviews";

const REVIEWS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(GOOGLE_REVIEWS_QUERY)}`;

function StarIcon() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path d="M10 1.5l2.6 5.4 5.9.7-4.4 4.1 1.2 5.9L10 14.8l-5.3 2.8 1.2-5.9-4.4-4.1 5.9-.7L10 1.5z" />
    </svg>
  );
}

function Stars() {
  return (
    <div aria-hidden className="flex gap-0.5 text-brand">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section className="bg-brand/5 px-6 py-24">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">Real Reviews</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display mt-2 text-4xl md:text-5xl">
          {GOOGLE_REVIEW_COUNT} Reviews. All Five Stars.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-3 flex items-center gap-2">
          <Stars />
          <span className="font-semibold text-ink">{GOOGLE_RATING.toFixed(1)} on Google</span>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {FEATURED_REVIEWS.map((review, index) => (
          <Reveal key={review.name} delay={0.15 + index * 0.05}>
            <div className="h-full space-y-4 rounded-2xl bg-white p-6 shadow-md shadow-ink/5">
              <Stars />
              <p className="text-ink/80">&ldquo;{review.quote}&rdquo;</p>
              <div className="text-sm text-ink/60">
                {review.name}
                {review.context ? ` — ${review.context}` : ""}
                <span className="block text-xs text-ink/40">Translated from Hungarian</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3}>
        <a
          href={REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block rounded-full bg-ink px-6 py-3 font-semibold text-cream"
        >
          Read More on Google
        </a>
      </Reveal>
    </section>
  );
}
