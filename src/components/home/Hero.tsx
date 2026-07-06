"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="flex min-h-[90vh] flex-col justify-end gap-6 bg-gradient-to-b from-brand-light to-brand px-6 py-24 text-cream">
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="font-display text-7xl leading-[0.9] tracking-tight md:text-9xl"
      >
        Detroit Style Pizza.
        <br />
        By the Beach.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        className="max-w-md text-lg text-cream"
      >
        Fresh Detroit Style Pizza served daily at Club Aliga, Balatonaliga.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        className="flex flex-wrap gap-4"
      >
        <motion.a
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          href="#location"
          className="rounded-full bg-cream px-6 py-3 font-semibold text-brand"
        >
          Visit Us
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          href="#menu"
          className="rounded-full border border-cream/40 px-6 py-3 font-semibold text-cream"
        >
          View Menu
        </motion.a>
      </motion.div>
    </section>
  );
}
