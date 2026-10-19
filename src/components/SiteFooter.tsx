import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-top">
        <div><Logo /><p>Делаем бизнес заметнее.</p></div>
        <nav aria-label="Навигация в подвале"><Link href="/#portfolio">Работы</Link><Link href="/#services">Тарифы</Link><Link href="/#process">Подход</Link></nav>
        <div className="footer-contacts">
          <a href={`tel:${siteConfig.contacts.phone}`}>{siteConfig.contacts.phoneDisplay}</a>
          <a href={siteConfig.contacts.telegramUrl} target="_blank" rel="noopener noreferrer">@{siteConfig.contacts.telegramUsername}<ArrowUpRight size={20} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="shell footer-legal"><span>{siteConfig.legal.fullName}</span><span>УНП {siteConfig.legal.unp}</span></div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} COLDDEV</span><span>Минск, Беларусь · Работаем онлайн</span><a href="#main-content">Наверх ↑</a></div>
    </footer>
  );
}
