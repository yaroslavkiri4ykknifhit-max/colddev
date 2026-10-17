import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/Logo";
export default function NotFound() {
  return <main className="not-found shell"><Logo /><span className="eyebrow">404 / Мимо координат</span><h1>Здесь пусто.<br /><em>Но мы рядом.</em></h1><p>Такой страницы нет. Все работы и услуги — на главной.</p><Link href="/" className="button">На главную <span className="button-icon"><ArrowUpRight /></span></Link></main>;
}
