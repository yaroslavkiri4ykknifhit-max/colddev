import type { Metadata, Viewport } from "next";
import "@fontsource-variable/onest";
import { siteConfig } from "@/config/site";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: siteConfig.title, template: `%s — ${siteConfig.brandName}` },
  description: siteConfig.description, metadataBase: new URL(siteConfig.url),
  applicationName: "COLDDEV",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  alternates: { canonical: "/" }, icons: { icon: "/icon.svg", apple: "/colddev-logo-card.png" },
  openGraph: { title: siteConfig.title, description: siteConfig.description, url: siteConfig.url, siteName: siteConfig.brandName, locale: "ru_RU", type: "website", images: [{ url: "/social-cover.png", width: 1200, height: 630, alt: "COLDDEV — ваш бизнес на виду. Сайты и реклама." }] },
  twitter: { card: "summary_large_image", title: siteConfig.title, description: siteConfig.description, images: ["/social-cover.png"] },
};
export const viewport: Viewport = { themeColor: "#f6f7f6", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru" data-scroll-behavior="smooth"><body>{children}</body></html>;
}
