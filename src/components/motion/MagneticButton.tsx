"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const STRENGTH = 0.35;
const MAX_OFFSET = 10;

export function MagneticButton({
  href,
  className,
  children,
  external,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [isFinePointer, setIsFinePointer] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading matchMedia (an external system) must happen post-hydration; there's no render-time alternative here.
    setIsFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  function handleMouseMove(event: React.MouseEvent<HTMLAnchorElement>) {
    if (prefersReducedMotion || !isFinePointer) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(Math.min(offsetX * STRENGTH, MAX_OFFSET), -MAX_OFFSET));
    y.set(Math.max(Math.min(offsetY * STRENGTH, MAX_OFFSET), -MAX_OFFSET));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </motion.a>
  );
}
