import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CaseSection } from "@/components/CaseSection";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
export const metadata: Metadata = { title: "Наши работы", description: "Шесть проектов COLDDEV: Крепкий пол, КлиматМинск, New Way Out, АксХоум, PRODSIMON и Bakatkin Prod. Посмотрите сайты в деле.", alternates: { canonical: "/cases/" } };
export default function CasesPage() {
  return <div className="site"><a className="skip-link" href="#main-content">Перейти к содержимому</a><SiteHeader /><main id="main-content"><div className="shell archive-back"><Link href="/"><ArrowLeft size={16} /> На главную</Link></div><CaseSection archive /></main><SiteFooter /></div>;
}
