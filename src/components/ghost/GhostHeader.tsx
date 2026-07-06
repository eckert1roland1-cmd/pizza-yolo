"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function GhostHeader() {
  return (
    <header className="flex items-center justify-between border-b border-ink/5 px-6 py-4">
      <BrandLogo />
      <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
        <Link
          href="/#menu"
          className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-cream hover:opacity-90"
        >
          See the Menu
        </Link>
      </motion.div>
    </header>
  );
}
