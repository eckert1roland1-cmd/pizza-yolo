"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ApplyModal } from "./ApplyModal";
import type { PartnerMode } from "@/lib/partner";

type ApplyContextValue = { openApply: (mode?: PartnerMode) => void };

const ApplyContext = createContext<ApplyContextValue | null>(null);

export function useApply() {
  const context = useContext(ApplyContext);
  if (!context) throw new Error("useApply needs an ApplyProvider above it.");
  return context;
}

export function ApplyProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<PartnerMode>("own");
  // Minden megnyitás új példányt kap, így tiszta űrlappal indul.
  const [openCount, setOpenCount] = useState(0);

  const openApply = useCallback((next?: PartnerMode) => {
    if (next) setMode(next);
    setOpenCount((count) => count + 1);
    setIsOpen(true);
  }, []);

  const value = useMemo(() => ({ openApply }), [openApply]);

  return (
    <ApplyContext.Provider value={value}>
      {children}
      <ApplyModal
        key={openCount}
        open={isOpen}
        mode={mode}
        onModeChange={setMode}
        onClose={() => setIsOpen(false)}
      />
    </ApplyContext.Provider>
  );
}

export function ApplyButton({
  mode,
  className,
  children = "Jelentkezem",
}: {
  mode?: PartnerMode;
  className?: string;
  children?: React.ReactNode;
}) {
  const { openApply } = useApply();
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => openApply(mode)}
      className={className ?? "rounded-full bg-brand px-6 py-3 font-semibold text-cream"}
    >
      {children}
    </motion.button>
  );
}
