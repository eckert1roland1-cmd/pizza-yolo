import type { Metadata } from "next";
import { HomeHeader } from "@/components/home/HomeHeader";
import { Hero } from "@/components/home/Hero";
import { Usp } from "@/components/home/Usp";
import { Product } from "@/components/home/Product";
import { Gallery } from "@/components/home/Gallery";
import { Experience } from "@/components/home/Experience";
import { Location } from "@/components/home/Location";
import { HomeFooter } from "@/components/home/HomeFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { menuSchema } from "@/components/seo/schema";

export const metadata: Metadata = {
  title: "Pizza Yolo — Detroit Style Pizza Balaton | Beach Pizza in Balatonaliga",
  description:
    "Detroit Style Pizza by the beach. Fresh square slices served daily at Club Aliga, Balatonaliga — right on Lake Balaton.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Pizza Yolo — Detroit Style Pizza by the Beach",
    description:
      "Fresh Detroit Style Pizza served daily at Club Aliga, Balatonaliga, Lake Balaton.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Pizza Yolo" }],
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={menuSchema()} />
      <HomeHeader />
      <main className="flex-1">
        <Hero />
        <Usp />
        <Product />
        <Gallery />
        <Experience />
        <Location />
      </main>
      <HomeFooter />
    </>
  );
}
