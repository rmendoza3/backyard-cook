import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Fraunces, Bebas_Neue, Inter } from "next/font/google";
import ChatWidget from "@/components/ChatWidget";
import Script from "next/script";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://backyardcookbakersfield.com"),
  title: {
    default: "Backyard Cook | Wood-Fired BBQ in Bakersfield, CA",
    template: "%s | Backyard Cook",
  },
  description: "Wood-fired BBQ smoked on Traeger, cooked to order in Bakersfield, CA. Pickup and delivery available.",
  keywords: ["BBQ Bakersfield", "Traeger catering", "smoked meat Bakersfield", "BBQ delivery Bakersfield", "Kern County BBQ"],
  openGraph: {
    title: "Backyard Cook | Wood-Fired BBQ in Bakersfield, CA",
    description: "Wood-fired BBQ smoked on Traeger, cooked to order in Bakersfield, CA. Pickup and delivery available.",
    url: "https://backyardcookbakersfield.com",
    siteName: "Backyard Cook",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Backyard Cook | Wood-Fired BBQ in Bakersfield, CA",
    description: "Wood-fired BBQ smoked on Traeger, cooked to order in Bakersfield, CA.",
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
      className={`${fraunces.variable} ${bebasNeue.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Backyard Cook",
              description: "Wood-fired BBQ smoked on Traeger, cooked to order in Bakersfield, CA.",
              servesCuisine: "Barbecue",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bakersfield",
                addressRegion: "CA",
                addressCountry: "US",
              },
              areaServed: "Bakersfield, CA and Kern County",
              sameAs: ["https://instagram.com/backyard.cook"],
            }),
          }}
        />
        <Script
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Backyard Cook",
              description: "Wood-fired BBQ smoked on Traeger, cooked to order in Bakersfield, CA.",
              servesCuisine: "Barbecue",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bakersfield",
                addressRegion: "CA",
                addressCountry: "US",
              },
              areaServed: "Bakersfield, CA and Kern County",
              sameAs: ["https://instagram.com/backyard.cook"]
            }),
          }}
        />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
