import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Logo />
          <p className="footer-note">
            Сайты, реклама и прозрачная работа<br />для бизнеса.
          </p>
        </div>
        <div className="footer-links">
          <span className="eyebrow">Навигация</span>
          <Link href="/#services">Услуги</Link>
          <Link href="/#process">Как работаем</Link>
          <Link href="/#portfolio">Портфолио</Link>
          <Link href="/login">Кабинет клиента</Link>
        </div>
        <div className="footer-links">
          <span className="eyebrow">Контакт</span>
          <a href={siteConfig.contacts.telegramUrl} target="_blank" rel="noreferrer">
            @{siteConfig.contacts.telegramUsername} <ArrowUpRight size={15} />
          </a>
          <span>Отвечаем в Telegram</span>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} COLDDEV</span>
        <span>Сделано в Беларуси</span>
      </div>
    </footer>
  );
}
