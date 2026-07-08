"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

const PRODUCTS = [
  {
    name: "Trio",
    description: "Three flavors. One slice.",
    note: "Vegetarian — marinara, vodka and pesto sauce.",
    image: "/images/menu/trio.webp",
  },
  {
    name: "Pepperoni",
    description: "Loaded with crispy pepperoni and melted mozzarella.",
    image: "/images/menu/pepperoni.webp",
  },
  {
    name: "Ham & Corn",
    description: "Simple. Classic. Comfort food.",
    image: "/images/menu/ham-and-corn.webp",
  },
];

export function Product() {
  return (
    <section id="menu" className="scroll-mt-20 px-6 py-24">
      <Reveal>
        <h2 className="font-display mb-12 text-4xl">Today&apos;s Menu</h2>
      </Reveal>
      <div className="grid gap-8 md:grid-cols-3">
        {PRODUCTS.map((product, index) => (
          <Reveal key={product.name} delay={index * 0.1}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-2 rounded-2xl border border-ink/10 p-6"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-ink/5">
                <Image
                  src={product.image}
                  alt={`${product.name} Detroit Style Pizza slice`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="font-display text-2xl">{product.name}</h3>
              <p className="text-ink/70">{product.description}</p>
              {product.note ? <p className="text-sm text-ink/70">{product.note}</p> : null}
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
