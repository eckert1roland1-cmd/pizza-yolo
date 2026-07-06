import type { Metadata } from "next";
import { GhostHeader } from "@/components/ghost/GhostHeader";
import { GhostFooter } from "@/components/ghost/GhostFooter";
import { HoverLink } from "@/components/motion/HoverLink";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <GhostHeader />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <p className="font-display text-3xl text-brand">404</p>
        <h1 className="font-display mt-2 text-4xl md:text-5xl">
          Slice Not Found
        </h1>
        <p className="mt-4 max-w-md text-ink/60">
          This page wandered off the beach. Let&apos;s get you back to the
          pizza.
        </p>
        <HoverLink
          href="/"
          className="mt-8 inline-block rounded-full bg-ink px-6 py-3 font-semibold text-cream"
        >
          Back to Pizza Yolo
        </HoverLink>
      </main>
      <GhostFooter />
    </>
  );
}
