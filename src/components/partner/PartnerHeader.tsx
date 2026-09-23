import { BrandLogo } from "@/components/ui/BrandLogo";
import { ApplyButton } from "@/components/partner/ApplyProvider";

const NAV_LINKS = [
  { href: "#termek", label: "Termék" },
  { href: "#beruhazas", label: "Beruházás" },
  { href: "#utak", label: "Két út" },
];

export function PartnerHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-cream/90 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
        <BrandLogo className="text-ink" />
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:opacity-70">
              {link.label}
            </a>
          ))}
        </nav>
        <ApplyButton className="shrink-0 rounded-full bg-ink px-5 py-2 text-sm font-semibold text-cream hover:opacity-90">
          Jelentkezem
        </ApplyButton>
      </div>
    </header>
  );
}
