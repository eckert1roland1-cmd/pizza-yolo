"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { OpeningHours } from "@/components/ui/OpeningHours";
import { ShapeAccent } from "@/components/ui/ShapeAccent";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { GEO, NAP } from "@/lib/site-config";

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${GEO.latitude},${GEO.longitude}`;
const telHref = `tel:${NAP.telephone.replace(/\s+/g, "")}`;

export function Location() {
  return (
    <section
      id="location"
      className="relative scroll-mt-20 overflow-hidden px-6 py-24"
    >
      <ShapeAccent
        variant="half-circle"
        className="pointer-events-none absolute right-10 top-10 hidden h-8 w-16 text-brand/20 md:block"
      />
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
          <OpeningHours className="space-y-1 text-ink/70" />
          <div className="flex flex-wrap gap-4">
            <MagneticButton
              href={directionsUrl}
              external
              className="inline-block rounded-full bg-ink px-6 py-3 font-semibold text-cream"
            >
              Get Directions
            </MagneticButton>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              href={telHref}
              className="inline-block rounded-full border border-ink/20 px-6 py-3 font-semibold text-ink"
            >
              Call Us
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
