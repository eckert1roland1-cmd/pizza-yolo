"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

const GALLERY_ITEMS = [
  { label: "Pizza", image: "/images/gallery/pizza-trio-board.webp" },
  { label: "Beach", image: null },
  { label: "Friends", image: null },
  { label: "Sunset", image: null },
  { label: "Boxes", image: "/images/gallery/bite-me.webp" },
  { label: "Lifestyle", image: null },
];

export function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-20 px-6 py-24">
      <Reveal>
        <h2 className="font-display mb-12 text-4xl">Gallery</h2>
      </Reveal>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {GALLERY_ITEMS.map((item, index) => (
          <Reveal key={item.label} delay={index * 0.05}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-ink/5 text-sm text-ink/30"
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={`Pizza Yolo — ${item.label}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                />
              ) : (
                item.label
              )}
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
