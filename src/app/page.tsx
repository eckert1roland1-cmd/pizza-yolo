import type { Metadata } from "next";
import { HomeHeader } from "@/components/home/HomeHeader";
import { Hero } from "@/components/home/Hero";
import { Gallery } from "@/components/home/Gallery";
import { Reviews } from "@/components/home/Reviews";
import { Newsletter } from "@/components/home/Newsletter";
import { HomeFooter } from "@/components/home/HomeFooter";

// Coming-soon landing: no open location right now. The menu and location
// sections are parked until the next opening.
export const metadata: Metadata = {
  title: "Pizza Yolo — Detroit Style Pizza | Coming Soon",
  description:
    "Detroit Style Pizza by the slice. We're working hard on what's next — new locations coming soon.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Pizza Yolo — Coming Soon",
    description: "We're working hard right now. New locations coming soon.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Pizza Yolo" }],
  },
};

export default function Home() {
  return (
    <>
      <HomeHeader />
      <main className="flex-1">
        <Hero />
        <Reviews />
        <Gallery />
        <Newsletter />
      </main>
      <HomeFooter />
    </>
  );
}
