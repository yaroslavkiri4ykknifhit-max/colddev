import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { services, servicePath } from "@/lib/services";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteConfig.url}/`, changeFrequency: "monthly", priority: 1 },
    ...services.map((service) => ({ url: `${siteConfig.url}${servicePath(service)}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${siteConfig.url}/cases/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}${siteConfig.founder.path}`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
