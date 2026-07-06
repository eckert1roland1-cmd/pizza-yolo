import type { Metadata } from "next";
import { Jersey_10, Poppins } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/components/seo/schema";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";
import { MotionProvider } from "@/components/motion/MotionProvider";

const jersey10 = Jersey_10({
  variable: "--font-jersey",
  weight: "400",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} — Detroit Style Pizza by the Beach | Balatonaliga`,
  },
  description:
    "Detroit Style Pizza by the beach. Fresh square slices served daily at Club Aliga, Balatonaliga, Lake Balaton.",
  openGraph: {
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jersey10.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={websiteSchema()} />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
