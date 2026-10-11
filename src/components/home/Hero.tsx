"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SOCIAL_LINKS } from "@/lib/site-config";

// Temporary Hero photo until a dedicated shoot replaces it.
const HERO_IMAGE = "/images/hero/oven-finish.webp";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col justify-end gap-6 overflow-hidden bg-gradient-to-b from-brand-light to-brand px-6 py-24 text-cream">
      <Image
        src={HERO_IMAGE}
        alt="Fresh Detroit Style Pizza coming out of the oven at Pizza Yolo"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-brand/40" />
      <GrainOverlay />
      <div className="relative z-10 flex flex-col gap-6">
        <h1 className="font-display text-7xl leading-[0.9] tracking-tight md:text-9xl">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="block"
          >
            Coming Soon.
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="max-w-md text-lg text-cream"
        >
          We&rsquo;re working hard right now. If all goes well, you&rsquo;ll be tasting us in
          different corners of the country soon.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="font-display text-3xl text-cream md:text-4xl"
        >
          New locations coming soon.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
          className="flex flex-wrap gap-4"
        >
          <MagneticButton
            href={SOCIAL_LINKS.instagram}
            external
            className="rounded-full bg-cream px-6 py-3 font-semibold text-brand"
          >
            Follow Us
          </MagneticButton>
          <MagneticButton
            href="#gallery"
            className="rounded-full border border-cream/40 px-6 py-3 font-semibold text-cream"
          >
            See Gallery
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
