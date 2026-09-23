"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PartnerMode } from "@/lib/partner";

const OPTIONS: { value: PartnerMode; title: string; blurb: string }[] = [
  {
    value: "own",
    title: "Saját PizzaYolo",
    blurb: "Önálló egységet nyitnék a márka alatt.",
  },
  {
    value: "in-store",
    title: "Bolton belüli sarok",
    blurb: "A meglévő helyem mellé tenném be.",
  },
];

export function ApplyModal({
  open,
  mode,
  onModeChange,
  onClose,
}: {
  open: boolean;
  mode: PartnerMode;
  onModeChange: (mode: PartnerMode) => void;
  onClose: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const data = new FormData(event.currentTarget);
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          name: String(data.get("name") || "").trim(),
          location: String(data.get("location") || "").trim(),
          phone: String(data.get("phone") || "").trim(),
          email: String(data.get("email") || "").trim(),
          message: String(data.get("message") || "").trim(),
          consent: data.get("consent") === "on",
          company: String(data.get("company") || ""),
        }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error || "Valami félrement. Próbáld újra.");
      setStatus("done");
      formRef.current?.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Valami félrement. Próbáld újra.");
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-ink/60 px-6 py-10 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="apply-modal-title"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            className="relative my-auto w-full max-w-lg rounded-2xl bg-cream p-8 text-ink shadow-xl"
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Bezárás"
              className="absolute right-4 top-4 text-ink/50 hover:text-ink"
            >
              ✕
            </button>

            {status === "done" ? (
              <div className="py-6 text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-brand">
                  Megvan
                </p>
                <h3 id="apply-modal-title" className="font-display mt-2 text-4xl">
                  Megkaptuk
                </h3>
                <p className="mt-3 text-ink/70">
                  Egy-két napon belül keresünk. Addig is gondold át, hol nyitnál
                  és mekkora helyed van.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 w-full rounded-full bg-ink px-6 py-3 font-semibold text-cream"
                >
                  Rendben
                </button>
              </div>
            ) : (
              <>
                <p className="text-sm font-semibold uppercase tracking-wide text-brand">
                  Jelentkezés
                </p>
                <h3 id="apply-modal-title" className="font-display mt-1 text-4xl">
                  Mit szeretnél?
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {OPTIONS.map((option) => {
                    const active = mode === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={active}
                        onClick={() => onModeChange(option.value)}
                        className={`rounded-xl border-2 p-4 text-left transition-colors ${
                          active
                            ? "border-brand bg-brand/5"
                            : "border-ink/10 hover:border-ink/25"
                        }`}
                      >
                        <span className="font-display block text-2xl leading-none">
                          {option.title}
                        </span>
                        <span className="mt-2 block text-sm text-ink/60">
                          {option.blurb}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="mt-6 space-y-3">
                  <Field name="name" label="Neved" autoComplete="name" required />
                  <Field
                    name="location"
                    label="Város vagy helyszín"
                    autoComplete="address-level2"
                    required
                  />
                  <Field name="phone" label="Telefonszám" type="tel" autoComplete="tel" required />
                  <Field name="email" label="E-mail" type="email" autoComplete="email" required />

                  <div>
                    <label htmlFor="apply-message" className="sr-only">
                      Üzenet
                    </label>
                    <textarea
                      id="apply-message"
                      name="message"
                      rows={3}
                      placeholder="Van meglévő helyed? Mikorra terveznéd? (nem kötelező)"
                      className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink placeholder-ink/40 outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    />
                  </div>

                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <label className="flex items-start gap-2 text-sm text-ink/70">
                    <input type="checkbox" name="consent" required className="mt-1" />
                    <span>
                      Hozzájárulok, hogy a megadott adatokkal felvegyétek velem a
                      kapcsolatot. Részletek az{" "}
                      <a href="/privacy" className="underline">
                        adatkezelési tájékoztatóban
                      </a>
                      .
                    </span>
                  </label>

                  {status === "error" ? (
                    <p role="alert" className="text-sm font-medium text-brand">
                      {errorMsg}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-full bg-brand px-6 py-3 font-semibold text-cream disabled:opacity-60"
                  >
                    {status === "loading" ? "Küldés…" : "Jelentkezés elküldése"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Field({
  name,
  label,
  type = "text",
  autoComplete,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  const id = `apply-${name}`;
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        placeholder={label}
        className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink placeholder-ink/40 outline-none focus-visible:ring-2 focus-visible:ring-brand"
      />
    </div>
  );
}
