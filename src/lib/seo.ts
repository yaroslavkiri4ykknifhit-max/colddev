import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { services, servicePath, type ServiceDirection } from "./services";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title, description, alternates: { canonical: path },
    openGraph: { title: `${title} — COLDDEV`, description, url: path, siteName: "COLDDEV", locale: "ru_RU", type: "website", images: [{ url: "/social-cover.png", width: 1200, height: 630, alt: "COLDDEV — сайты, реклама и автоматизация" }] },
    twitter: { card: "summary_large_image", title: `${title} — COLDDEV`, description, images: ["/social-cover.png"] },
  };
}

export function breadcrumbs(name: string, path: string) {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "COLDDEV", item: `${siteConfig.url}/` },
      { "@type": "ListItem", position: 2, name, item: `${siteConfig.url}${path}` },
    ],
  };
}

const founderId = `${siteConfig.url}${siteConfig.founder.path}#person`;

export const founderPerson = {
  "@type": "Person", "@id": founderId,
  name: siteConfig.founder.name,
  alternateName: [siteConfig.founder.fullName, "Ярослав Алексеевич Киричук"],
  url: `${siteConfig.url}${siteConfig.founder.path}`,
  description: siteConfig.founder.description,
  jobTitle: siteConfig.founder.role,
  worksFor: { "@type": "Organization", "@id": `${siteConfig.url}/#organization`, name: "COLDDEV", url: `${siteConfig.url}/` },
  knowsAbout: ["Веб-разработка", "Контекстная реклама", "Автоматизация бизнеса", "Привлечение клиентов"],
  sameAs: [siteConfig.contacts.telegramUrl],
};

export const profileStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteConfig.url}${siteConfig.founder.path}#profile`,
  url: `${siteConfig.url}${siteConfig.founder.path}`,
  name: `${siteConfig.founder.name} — ${siteConfig.founder.role.toLowerCase()}`,
  inLanguage: "ru-RU",
  mainEntity: founderPerson,
};

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization", "@id": `${siteConfig.url}/#organization`, name: "COLDDEV", alternateName: "colddev",
      url: `${siteConfig.url}/`, description: siteConfig.description,
      logo: `${siteConfig.url}/colddev-mark.png`, telephone: siteConfig.contacts.phone,
      sameAs: [siteConfig.contacts.telegramUrl],
      founder: { "@id": founderId },
      contactPoint: { "@type": "ContactPoint", telephone: siteConfig.contacts.phone, contactType: "sales", availableLanguage: "ru" },
    },
    founderPerson,
    {
      "@type": "WebSite", "@id": `${siteConfig.url}/#website`, url: `${siteConfig.url}/`,
      name: "COLDDEV", alternateName: "colddev", inLanguage: "ru-RU", publisher: { "@id": `${siteConfig.url}/#organization` },
    },
    {
      "@type": "ItemList", name: "Направления COLDDEV",
      itemListElement: services.map((service, index) => ({ "@type": "ListItem", position: index + 1, name: service.title, url: `${siteConfig.url}${servicePath(service)}` })),
    },
  ],
};

export function serviceStructuredData(service: ServiceDirection) {
  return {
    "@context": "https://schema.org", "@type": "Service", name: service.title,
    serviceType: service.title, description: service.shortDescription, url: `${siteConfig.url}${servicePath(service)}`,
    provider: { "@type": "Organization", "@id": `${siteConfig.url}/#organization`, name: "COLDDEV", url: `${siteConfig.url}/` },
    areaServed: { "@type": "Country", name: "Беларусь" },
  };
}
