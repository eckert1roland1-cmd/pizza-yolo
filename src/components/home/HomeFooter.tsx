import { BrandLogo } from "@/components/ui/BrandLogo";
import { LegalLinks } from "@/components/legal/LegalLinks";
import { OpeningHours } from "@/components/ui/OpeningHours";
import { NAP, SOCIAL_LINKS } from "@/lib/site-config";

const NAV_LINKS = [
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Location" },
  { href: "#instagram", label: "Instagram" },
];

export function HomeFooter() {
  return (
    <footer className="space-y-8 border-t border-ink/5 px-6 py-16 text-sm text-ink/70">
      <BrandLogo className="text-ink" />
      <nav className="flex flex-wrap gap-6">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="hover:opacity-70">
            {link.label}
          </a>
        ))}
      </nav>
      <div className="space-y-1">
        <p>
          {NAP.streetAddress}, {NAP.addressLocality}
        </p>
        <OpeningHours className="space-y-1" />
      </div>
      <div className="flex gap-6">
        <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
          Instagram
        </a>
        <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
          TikTok
        </a>
      </div>
      <LegalLinks />
      <p>&copy; {new Date().getFullYear()} Pizza Yolo</p>
    </footer>
  );
}
