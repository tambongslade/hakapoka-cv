import type { Metadata, Viewport } from "next";
import { Newsreader, Manrope } from "next/font/google";
import { SITE, SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Newsreader({ subsets: ["latin"], variable: "--font-display", style: ["normal", "italic"], display: "swap", adjustFontFallback: false });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hermann Hakapoka — Intelligence économique & stratégie",
    template: "%s — Hermann Hakapoka",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: "Hermann Hakapoka", url: SITE_URL }],
  creator: "Hermann Hakapoka",
  keywords: [
    "Hermann Hakapoka",
    "intelligence économique",
    "stratégie",
    "géopolitique",
    "Afrique centrale",
    "CEMAC",
    "souveraineté économique",
    "prospective",
    "Cameroun",
  ],
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/feed.xml", title: "Publications — Hermann Hakapoka" }] },
  },
  openGraph: { locale: SITE.locale, type: "website", siteName: SITE.name, url: "/" },
  twitter: { card: "summary_large_image", creator: "@hakapoka" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#111827" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
