"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { SOCIAL_LINKS } from "@/lib/site-config";

type GalleryItem =
  | { type: "image"; label: string; alt: string; src: string }
  | { type: "video"; label: string; alt: string; src: string; poster: string };

const GALLERY_ITEMS: GalleryItem[] = [
  {
    type: "image",
    label: "Pizza",
    alt: "Pizza Yolo's Trio, Pepperoni and Ham & Corn slices with dip cups, laid out on a beach blanket",
    src: "/images/gallery/pizza-trio-board.webp",
  },
  {
    type: "image",
    label: "Beach",
    alt: "A Pizza Yolo box and a cold Peroni beer on a boat blanket at Lake Balaton",
    src: "/images/gallery/beach-crew.webp",
  },
  {
    type: "image",
    label: "Friends",
    alt: "Two friends sharing Pizza Yolo slices at a picnic table by the truck",
    src: "/images/gallery/friends-sharing.webp",
  },
  {
    type: "video",
    label: "Balaton",
    alt: "Pizza Yolo boxes floating on the surface of Lake Balaton",
    src: "/videos/lake-float.mp4",
    poster: "/images/gallery/lake-float-poster.webp",
  },
  {
    type: "image",
    label: "Drinks",
    alt: "Cold drinks from the FilGo dispenser at Pizza Yolo",
    src: "/images/gallery/drinks-filgo.webp",
  },
  {
    type: "image",
    label: "The Truck",
    alt: "A Pizza Yolo team member serving fresh slices from the truck window",
    src: "/images/gallery/truck-staff.webp",
  },
  {
    type: "image",
    label: "Fresh",
    alt: "Fresh parmesan being sprinkled over a hot Pepperoni pizza straight out of the oven",
    src: "/images/gallery/pizza-fresh-oven.webp",
  },
  {
    type: "video",
    label: "Sauces",
    alt: "Pizza Yolo dip cups — tomato, pesto and garlic aioli — around fresh slices",
    src: "/videos/dips.mp4",
    poster: "/images/gallery/dips-poster.webp",
  },
  {
    type: "image",
    label: "Beach Boxes",
    alt: "Pizza Yolo boxes and dip cups laid out on a beach blanket",
    src: "/images/gallery/beach-boxes.webp",
  },
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
                  alt={item.alt}
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
                  aria-label={item.alt}
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
