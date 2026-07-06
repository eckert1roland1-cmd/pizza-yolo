"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function HoverLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className="inline-block">
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}
