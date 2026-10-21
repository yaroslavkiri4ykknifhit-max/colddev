import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CaseSection } from "@/components/CaseSection";
import { AdvertisingCaseSection } from "@/components/AdvertisingCaseSection";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StructuredData } from "@/components/StructuredData";
import { breadcrumbs, pageMetadata } from "@/lib/seo";
export const metadata: Metadata = pageMetadata("Наши работы — сайты и реклама", "Портфолио COLDDEV: шесть сайтов и четыре кейса Google Ads. Результаты рекламы, задачи, ход работы и скриншоты рекламных кабинетов.", "/cases/");
export default function CasesPage() {
  return <div className="site"><a className="skip-link" href="#main-content">Перейти к содержимому</a><SiteHeader /><main id="main-content"><StructuredData data={breadcrumbs("Наши работы", "/cases/")} /><div className="shell archive-back"><Link href="/"><ArrowLeft size={16} /> На главную</Link></div><CaseSection archive /><AdvertisingCaseSection /></main><SiteFooter /></div>;
}
