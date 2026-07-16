"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { ShapeAccent } from "@/components/ui/ShapeAccent";
import { CouponModal } from "@/components/ui/CouponModal";

export function Newsletter() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const consent = formData.get("consent") === "on";
    const company = String(formData.get("company") || "");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent, company }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("idle");
      setModalOpen(true);
      formRef.current?.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section className="relative overflow-hidden bg-brand px-6 py-24 text-cream">
      <ShapeAccent
        variant="square"
        className="pointer-events-none absolute left-10 top-10 hidden h-12 w-12 text-cream/20 md:block"
      />
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <h2 className="font-display text-4xl">Get 10% Off Your Next Visit</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-4 text-cream/80">
            Join the list for a one-time discount code, plus the occasional
            update on events and new drops.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder="you@email.com"
                className="w-full rounded-full bg-cream px-6 py-3 text-ink placeholder-ink/40 outline-none focus-visible:ring-2 focus-visible:ring-cream"
              />
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === "loading"}
                className="shrink-0 rounded-full bg-ink px-6 py-3 font-semibold text-cream disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : "Get My Code"}
              </motion.button>
            </div>

            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <label className="flex items-start gap-2 text-left text-sm text-cream/80">
              <input type="checkbox" name="consent" required className="mt-1" />
              <span>
                I&apos;d like to get emails from Pizza Yolo (discounts, events,
                updates). Unsubscribe anytime. See our{" "}
                <a href="/privacy" className="underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>

            {status === "error" ? (
              <p role="alert" className="text-sm font-medium text-cream">
                {errorMsg}
              </p>
            ) : null}
          </form>
        </Reveal>
      </div>
      <CouponModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
