"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { SOCIAL_LINKS } from "@/lib/site-config";

type GalleryItem =
  | { type: "image"; label: string; src: string }
  | { type: "video"; label: string; src: string; poster: string };

const GALLERY_ITEMS: GalleryItem[] = [
  { type: "image", label: "Pizza", src: "/images/gallery/pizza-trio-board.webp" },
  { type: "image", label: "Beach", src: "/images/gallery/beach-crew.webp" },
  { type: "image", label: "Friends", src: "/images/gallery/friends-sharing.webp" },
  { type: "video", label: "Balaton", src: "/videos/lake-float.mp4", poster: "/images/gallery/lake-float-poster.webp" },
  { type: "image", label: "Boxes", src: "/images/gallery/bite-me.webp" },
  { type: "image", label: "The Truck", src: "/images/gallery/truck-staff.webp" },
  { type: "image", label: "Fresh", src: "/images/gallery/pizza-closeup.webp" },
  { type: "video", label: "Sauces", src: "/videos/dips.mp4", poster: "/images/gallery/dips-poster.webp" },
  { type: "image", label: "Beach Boxes", src: "/images/gallery/beach-boxes.webp" },
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
              className="relative aspect-square overflow-hidden rounded-2xl bg-ink/5"
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={`Pizza Yolo — ${item.label}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <video
                  src={item.src}
                  poster={item.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label={`Pizza Yolo — ${item.label}`}
                  className="h-full w-full object-cover"
                />
              )}
            </motion.div>
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
