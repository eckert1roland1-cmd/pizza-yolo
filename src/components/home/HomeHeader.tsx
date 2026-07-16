"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { BrandLogo } from "@/components/ui/BrandLogo";

const NAV_LINKS = [
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Location" },
  { href: "/faq", label: "FAQ" },
];

export function HomeHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <motion.header
      animate={{
        backgroundColor: scrolled ? "rgba(255,253,250,0.9)" : "rgba(255,253,250,0)",
        borderColor: scrolled ? "rgba(48,48,48,0.05)" : "rgba(48,48,48,0)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-6 py-4 backdrop-blur transition-colors duration-300 ${
        scrolled ? "text-ink" : "text-cream"
      }`}
    >
      <BrandLogo className="text-current" />
      <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="hover:opacity-70">
            {link.label}
          </a>
        ))}
      </nav>
      <motion.a
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        href="#location"
        className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-cream"
      >
        Visit Us
      </motion.a>
    </motion.header>
  );
}
