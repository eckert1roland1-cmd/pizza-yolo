"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { COUPON_CODE } from "@/lib/site-config";

export function CouponModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 px-6 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="coupon-modal-title"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-sm rounded-2xl bg-cream p-8 text-center text-ink shadow-xl"
          >
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 text-ink/50 hover:text-ink"
            >
              ✕
            </button>
            <p className="text-sm font-semibold tracking-wide text-brand uppercase">You&apos;re in</p>
            <h3 id="coupon-modal-title" className="font-display mt-2 text-3xl">
              10% Off Your Next Slice
            </h3>
            <p className="mt-3 text-ink/70">
              Show this code at the truck. We also sent it to your inbox.
            </p>
            <div className="mt-6 rounded-xl border-2 border-dashed border-brand/40 bg-brand/5 py-4">
              <span className="font-display text-3xl tracking-[0.2em] text-brand">
                {COUPON_CODE}
              </span>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-ink px-6 py-3 font-semibold text-cream"
            >
              Got It
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
