"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { OpeningHours } from "@/components/ui/OpeningHours";
import { GEO, NAP } from "@/lib/site-config";

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${GEO.latitude},${GEO.longitude}`;

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
          <OpeningHours className="space-y-1 text-ink/60" />
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            href={directionsUrl}
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
