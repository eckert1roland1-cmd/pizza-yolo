"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { SOCIAL_LINKS } from "@/lib/site-config";

export function InstagramFeed() {
  return (
    <section id="instagram" className="scroll-mt-20 px-6 py-24">
      <Reveal>
        <h2 className="font-display mb-12 text-4xl">Follow Along</h2>
      </Reveal>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Reveal key={index} delay={index * 0.05}>
            <div className="aspect-square rounded-xl bg-ink/5" aria-hidden />
          </Reveal>
        ))}
      </div>
      <motion.a
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block rounded-full bg-ink px-6 py-3 font-semibold text-cream"
      >
        Follow Pizza Yolo
      </motion.a>
    </section>
  );
}
