import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://urbanforge.in"),
  title: {
    default: "UrbanForge — Forged for the Streets, Built for the Bold",
    template: "%s | UrbanForge",
  },
  description:
    "Premium streetwear, tech gadgets & accessories for Delhi's urban youth. Shop the freshest drops — neon aesthetics, futuristic fits, and tools that slap.",
  keywords: [
    "streetwear india",
    "delhi fashion",
    "urban clothing",
    "tech gadgets india",
    "sneakers delhi",
    "cyberpunk fashion",
    "neon streetwear",
    "UrbanForge",
  ],
  authors: [{ name: "UrbanForge" }],
  creator: "UrbanForge",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://urbanforge.in",
    siteName: "UrbanForge",
    title: "UrbanForge — Forged for the Streets",
    description:
      "Premium streetwear, gadgets & accessories for urban Delhi youth.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "UrbanForge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UrbanForge",
    description: "Forged for the streets. Built for the bold.",
    images: ["/og-image.png"],
    creator: "@urbanforge_in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "UrbanForge",
    url: "https://urbanforge.in",
    logo: "https://urbanforge.in/logo.png",
    description:
      "Premium streetwear, gadgets & accessories for Delhi urban youth",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-98765-43210",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://instagram.com/urbanforge_in",
      "https://twitter.com/urbanforge_in",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className={manrope.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0a0a0f] text-white font-manrope antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-dvh flex flex-col">
            {/* Background gradient blobs */}
            <div
              className="pointer-events-none fixed inset-0 overflow-hidden"
              aria-hidden="true"
            >
              <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl" />
              <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />
              <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-blue-500/4 blur-3xl" />
            </div>

            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
