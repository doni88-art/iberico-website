import type { Metadata, Viewport } from "next";
import { Playfair_Display, Karla } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { WhatsOnProvider } from "@/lib/whats-on";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CustomCursor } from "@/components/CustomCursor";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.weareiberico.com"),
  title: {
    default: "IBÉRICO — Tapas y Vino | Spanish Restaurant, Ho Chi Minh City",
    template: "%s | IBÉRICO Tapas y Vino",
  },
  description:
    "Best Spanish Restaurant, Gourmet Vietnam Awards 2025. Authentic Spanish tapas and wine at Thảo Điền, Thị Sách, and Hội An — premium Iberian ingredients, sharing plates, and a curated Spanish wine list.",
  keywords: [
    "Spanish restaurant Ho Chi Minh",
    "tapas Saigon",
    "iberico ham Vietnam",
    "Spanish wine bar HCMC",
    "Thao Dien restaurant",
    "best tapas Ho Chi Minh City",
    "best spanish restaurant vietnam",
  ],
  openGraph: {
    title: "IBÉRICO — Tapas y Vino",
    description:
      "Best Spanish Restaurant, Gourmet Vietnam Awards 2025 — authentic tapas and wine in the heart of Ho Chi Minh City.",
    url: "https://www.weareiberico.com",
    siteName: "IBÉRICO Tapas y Vino",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#18130f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${karla.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <ScrollProgress />
        <CustomCursor />
        <LanguageProvider>
          <WhatsOnProvider>{children}</WhatsOnProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
