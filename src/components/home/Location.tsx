"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { NAP, OPENING_HOURS } from "@/lib/site-config";

const mapsQuery = encodeURIComponent(
  `${NAP.streetAddress}, ${NAP.addressLocality}, Hungary`
);

export function Location() {
  return (
    <section id="location" className="scroll-mt-20 px-6 py-24">
      <Reveal>
        <h2 className="font-display mb-12 text-4xl">Find Us</h2>
      </Reveal>
      <div className="grid gap-8 md:grid-cols-2">
        <Reveal>
          <div className="aspect-video rounded-2xl bg-ink/5" aria-hidden />
        </Reveal>
        <Reveal delay={0.1} className="space-y-4">
          <p className="text-lg">
            {NAP.streetAddress}, {NAP.addressLocality}
          </p>
          <p className="text-ink/60">
            {OPENING_HOURS[0].opens} – {OPENING_HOURS[0].closes}, every day
          </p>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-ink px-6 py-3 font-semibold text-cream"
          >
            Get Directions
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
