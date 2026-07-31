import type { Metadata, Viewport } from "next";
import "@fontsource-variable/onest";
import "@fontsource-variable/unbounded";
import { AmbientExperience } from "@/components/AmbientExperience";
import { siteConfig } from "@/config/site";
import "./globals.css";
import "./polish.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.brandName}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: "/colddev-logo-card.png",
    apple: "/colddev-logo-card.png",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.brandName,
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "COLDDEV — вы видите всё" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#6457f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body>
        {children}
        <AmbientExperience />
      </body>
    </html>
  );
}
