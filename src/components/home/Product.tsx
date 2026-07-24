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
    price: "2450 Ft",
  },
  {
    name: "Pepperoni",
    description: "Loaded with crispy pepperoni and melted mozzarella.",
    image: "/images/menu/pepperoni.webp",
    price: "2650 Ft",
  },
  {
    name: "Ham & Corn",
    description: "Simple. Classic. Comfort food.",
    image: "/images/menu/ham-and-corn.webp",
    price: "2650 Ft",
  },
];

export function Product() {
  return (
    <section id="menu" className="scroll-mt-20 px-6 py-24">
      <Reveal>
        <h2 className="font-display mb-12 text-4xl">Today&apos;s Menu</h2>
      </Reveal>
      <div className="grid items-stretch gap-8 md:grid-cols-3">
        {PRODUCTS.map((product, index) => (
          <Reveal key={product.name} delay={index * 0.1} className="h-full">
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex h-full flex-col space-y-3 rounded-2xl bg-white p-6 shadow-md shadow-ink/5 transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/10"
            >
              <div className="relative aspect-[5/4] overflow-hidden rounded-xl bg-ink/5">
                <Image
                  src={product.image}
                  alt={`${product.name} Detroit Style Pizza slice`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-4xl">{product.name}</h3>
                <span className="shrink-0 rounded-full bg-brand px-3 py-1 text-sm font-semibold text-cream">
                  {product.price}
                </span>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-ink/70">{product.description}</p>
                {product.note ? <p className="text-sm text-ink/70">{product.note}</p> : null}
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
