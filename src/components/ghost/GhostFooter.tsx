import { BrandLogo } from "@/components/ui/BrandLogo";
import { LegalLinks } from "@/components/legal/LegalLinks";

export function GhostFooter() {
  return (
    <footer className="space-y-4 border-t border-ink/5 px-6 py-16 text-sm text-ink/60">
      <BrandLogo className="text-ink" />
      <LegalLinks />
      <p>&copy; {new Date().getFullYear()} Pizza Yolo</p>
    </footer>
  );
}
