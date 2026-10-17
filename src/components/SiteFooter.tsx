import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";
export function SiteFooter() {
  return <footer className="site-footer"><div className="shell footer-top"><div><Logo /><p>Делаем бизнес заметнее.</p></div><nav aria-label="Навигация в подвале"><Link href="/#portfolio">Работы</Link><Link href="/#services">Услуги</Link><Link href="/#process">Подход</Link></nav><a href={siteConfig.contacts.telegramUrl} target="_blank" rel="noreferrer">@{siteConfig.contacts.telegramUsername} <ArrowUpRight size={18} /></a></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} COLDDEV</span><span>Минск, Беларусь · Работаем онлайн</span><a href="#main-content">Наверх ↑</a></div></footer>;
}
