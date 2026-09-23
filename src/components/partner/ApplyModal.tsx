"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MODE_LABELS,
  TIMELINES,
  VENUE_STATUS,
  VENUE_TYPES,
  VOLUME_BANDS,
  type Option,
  type PartnerMode,
} from "@/lib/partner";

const MODE_BLURBS: Record<PartnerMode, string> = {
  own: "Önálló egységet nyitnék a márka alatt.",
  "in-store": "A meglévő helyem mellé tenném be.",
};

type Errors = Record<string, string>;

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
  const closeRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const [venueStatus, setVenueStatus] = useState("");
  const [venueType, setVenueType] = useState("");
  const [location, setLocation] = useState("");
  const [volume, setVolume] = useState("");
  const [timeline, setTimeline] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // A hely jellege konstrukciófüggő, ezért váltáskor a választás elavul.
  function changeMode(next: PartnerMode) {
    onModeChange(next);
    setVenueType("");
  }

  function validateStep1() {
    const next: Errors = {};
    if (!venueStatus) next.venueStatus = "Válaszd ki, van-e már helyed.";
    if (!venueType) next.venueType = "Válaszd ki a hely jellegét.";
    if (!location.trim()) next.location = "Írd be a várost vagy a helyszínt.";
    if (!volume) next.volume = "Egy becslés is segít — ebből tudunk árat adni.";
    if (!timeline) next.timeline = "Mikorra tervezed?";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function validateStep2() {
    const next: Errors = {};
    if (!name.trim()) next.name = "A neved kell.";
    if (phone.replace(/\D/g, "").length < 7) next.phone = "Adj meg egy elérhető telefonszámot.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Adj meg egy érvényes e-mail címet.";
    if (!consent) next.consent = "A kapcsolatfelvételhez a hozzájárulásod kell.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goToStep2() {
    if (!validateStep1()) return;
    setErrors({});
    setStep(2);
    sheetRef.current?.scrollTo({ top: 0 });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateStep2()) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          venueStatus,
          venueType,
          location: location.trim(),
          volume,
          timeline,
          name: name.trim(),
          company: company.trim(),
          phone: phone.trim(),
          email: email.trim(),
          message: message.trim(),
          consent,
          website: honeypot,
        }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error || "Valami félrement. Próbáld újra.");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Valami félrement. Próbáld újra.");
      requestAnimationFrame(() =>
        errorRef.current?.scrollIntoView({ block: "center", behavior: "smooth" })
      );
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
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-ink/60 px-4 py-8 backdrop-blur-sm sm:px-6"
          onClick={onClose}
        >
          <motion.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="apply-modal-title"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            className="relative my-auto w-full max-w-xl rounded-2xl bg-cream p-6 text-ink shadow-xl sm:p-8"
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Bezárás"
              className="absolute right-4 top-4 z-10 text-ink/50 hover:text-ink"
            >
              ✕
            </button>

            {status === "done" ? (
              <Done mode={mode} onClose={onClose} />
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-semibold uppercase tracking-wide text-brand">
                    Jelentkezés
                  </p>
                  <span className="text-sm text-ink/40">{step} / 2</span>
                </div>
                <div
                  className="mt-3 h-1 w-full overflow-hidden rounded-full bg-ink/10"
                  role="progressbar"
                  aria-valuenow={step}
                  aria-valuemin={1}
                  aria-valuemax={2}
                >
                  <motion.div
                    className="h-full bg-brand"
                    initial={false}
                    animate={{ width: step === 1 ? "50%" : "100%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>

                <h3 id="apply-modal-title" className="font-display mt-5 text-4xl">
                  {step === 1 ? "Hol nyitnál?" : "Hogyan érünk el?"}
                </h3>
                <p className="mt-2 text-sm text-ink/60">
                  {step === 1
                    ? "Ezekből tudunk személyre szabott ajánlatot adni."
                    : "Egy-két napon belül keresünk az ajánlattal."}
                </p>

                {step === 1 ? (
                  <div className="mt-6 space-y-6">
                    <Field label="Melyik érdekel?" error={errors.mode}>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {(Object.keys(MODE_LABELS) as PartnerMode[]).map((value) => {
                          const active = mode === value;
                          return (
                            <button
                              key={value}
                              type="button"
                              aria-pressed={active}
                              onClick={() => changeMode(value)}
                              className={`rounded-xl border-2 p-4 text-left transition-colors ${
                                active
                                  ? "border-brand bg-brand/5"
                                  : "border-ink/10 hover:border-ink/25"
                              }`}
                            >
                              <span className="font-display block text-2xl leading-none">
                                {MODE_LABELS[value]}
                              </span>
                              <span className="mt-2 block text-sm text-ink/60">
                                {MODE_BLURBS[value]}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </Field>

                    <Field label="Van már helyszíned?" error={errors.venueStatus}>
                      <Segmented
                        name="venueStatus"
                        options={VENUE_STATUS}
                        value={venueStatus}
                        onChange={setVenueStatus}
                      />
                    </Field>

                    <Field
                      label={mode === "own" ? "Milyen helyet terveznél?" : "Milyen helyed van?"}
                      error={errors.venueType}
                      htmlFor="apply-venueType"
                    >
                      <Select
                        id="apply-venueType"
                        options={VENUE_TYPES[mode]}
                        value={venueType}
                        onChange={setVenueType}
                        placeholder="Válassz…"
                      />
                    </Field>

                    <Field label="Város vagy helyszín" error={errors.location} htmlFor="apply-location">
                      <input
                        id="apply-location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Pl. Siófok, Fő utca"
                        autoComplete="address-level2"
                        className={inputCls(errors.location)}
                      />
                    </Field>

                    <Field
                      label="Mennyi fogyna naponta?"
                      hint="Becslés is elég. Ez a legfontosabb adat az árajánlathoz."
                      error={errors.volume}
                      htmlFor="apply-volume"
                    >
                      <Select
                        id="apply-volume"
                        options={VOLUME_BANDS}
                        value={volume}
                        onChange={setVolume}
                        placeholder="Válassz…"
                      />
                    </Field>

                    <Field label="Mikorra tervezed?" error={errors.timeline} htmlFor="apply-timeline">
                      <Select
                        id="apply-timeline"
                        options={TIMELINES}
                        value={timeline}
                        onChange={setTimeline}
                        placeholder="Válassz…"
                      />
                    </Field>

                    <button
                      type="button"
                      onClick={goToStep2}
                      className="w-full rounded-full bg-brand px-6 py-3 font-semibold text-cream"
                    >
                      Tovább
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                    <Field label="Neved" error={errors.name} htmlFor="apply-name">
                      <input
                        id="apply-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        className={inputCls(errors.name)}
                      />
                    </Field>

                    <Field label="Cégnév" hint="Ha van már céged." htmlFor="apply-company">
                      <input
                        id="apply-company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        autoComplete="organization"
                        className={inputCls()}
                      />
                    </Field>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Telefonszám" error={errors.phone} htmlFor="apply-phone">
                        <input
                          id="apply-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          autoComplete="tel"
                          className={inputCls(errors.phone)}
                        />
                      </Field>
                      <Field label="E-mail" error={errors.email} htmlFor="apply-email">
                        <input
                          id="apply-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                          className={inputCls(errors.email)}
                        />
                      </Field>
                    </div>

                    <Field label="Bármi, amit tudnunk érdemes" htmlFor="apply-message">
                      <textarea
                        id="apply-message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Vendéglátós tapasztalat, meglévő üzlet, kérdés…"
                        className={inputCls()}
                      />
                    </Field>

                    <input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />

                    <div>
                      <label className="flex items-start gap-2 text-sm text-ink/70">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="mt-1"
                        />
                        <span>
                          Hozzájárulok, hogy a megadott adatokkal felvegyétek velem a
                          kapcsolatot. Részletek az{" "}
                          <a href="/privacy" className="underline">
                            adatkezelési tájékoztatóban
                          </a>
                          .
                        </span>
                      </label>
                      {errors.consent ? <ErrorText>{errors.consent}</ErrorText> : null}
                    </div>

                    {status === "error" ? (
                      <div
                        ref={errorRef}
                        role="alert"
                        className="flex gap-3 rounded-xl border-2 border-brand bg-brand/5 p-4"
                      >
                        <span
                          aria-hidden
                          className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-cream"
                        >
                          !
                        </span>
                        <p className="text-sm font-medium text-ink">{errorMsg}</p>
                      </div>
                    ) : null}

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="rounded-full border border-ink/15 px-6 py-3 font-semibold text-ink hover:border-ink/40"
                      >
                        Vissza
                      </button>
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="flex-1 rounded-full bg-brand px-6 py-3 font-semibold text-cream disabled:opacity-60"
                      >
                        {status === "loading" ? "Küldés…" : "Jelentkezés elküldése"}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Done({ mode, onClose }: { mode: PartnerMode; onClose: () => void }) {
  return (
    <div className="py-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">Megvan</p>
      <h3 id="apply-modal-title" className="font-display mt-2 text-4xl">
        Megkaptuk
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-ink/70">
        Egy-két napon belül keresünk a <b>{MODE_LABELS[mode]}</b> konstrukcióra
        szabott ajánlattal. Ha addig eszedbe jut valami, csak válaszolj a
        visszaigazoló e-mailre.
      </p>
      <button
        onClick={onClose}
        className="mt-6 w-full rounded-full bg-ink px-6 py-3 font-semibold text-cream"
      >
        Rendben
      </button>
    </div>
  );
}

function inputCls(error?: string) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-ink placeholder-ink/40 outline-none focus-visible:ring-2 focus-visible:ring-brand ${
    error ? "border-brand" : "border-ink/15"
  }`;
}

function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
        {label}
      </label>
      {hint ? <p className="mt-0.5 text-xs text-ink/50">{hint}</p> : null}
      <div className="mt-2">{children}</div>
      {error ? <ErrorText>{error}</ErrorText> : null}
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="mt-1.5 text-sm font-medium text-brand">
      {children}
    </p>
  );
}

function Segmented({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div role="group" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "border-brand bg-brand text-cream"
                : "border-ink/15 text-ink hover:border-ink/40"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function Select({
  id,
  options,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputCls()} appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23303030' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
