"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";

export function Style() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  // Parallax must render identically on the server and the client's first
  // paint (before this mounts), otherwise reduced-motion users whose browser
  // resolves the media query synchronously trigger a hydration mismatch.
  const [motionReady, setMotionReady] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- must run strictly post-hydration so server/first-client-paint output matches; there's no render-time alternative here.
    setMotionReady(true);
  }, []);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    motionReady && !prefersReducedMotion ? ["-8%", "8%"] : ["0%", "0%"]
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[80vh] flex-col justify-center overflow-hidden bg-ink px-6 py-24 text-cream"
    >
      <motion.div style={{ y }} className="absolute -inset-x-[10%] -inset-y-[15%] -rotate-3 scale-125">
        <Image
          src="/images/style/three-boxes.webp"
          alt="Three Pizza Yolo Detroit Style Pizza boxes with dips, top down"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-l from-ink/95 via-ink/65 to-ink/10" />
      <div className="relative z-10 ml-auto max-w-lg">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-light">
            Our Style
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-5xl leading-[0.95] md:text-6xl">
            Pizza Shouldn&apos;t Be Round.
            <br />
            Ours Isn&apos;t.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-md text-lg text-cream/80">
            New York Sicilian roots, Detroit in the pan. 48 hours of cold
            fermentation for a light, airy dough — crisped in cheese at
            the edge, finished with Italian ingredients.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <MagneticButton
            href="#menu"
            className="mt-8 inline-block rounded-full bg-brand px-6 py-3 font-semibold text-cream"
          >
            Today&apos;s Menu
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
