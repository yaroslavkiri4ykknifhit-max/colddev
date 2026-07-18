"use client";

import { Menu, Send, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Logo />
        <nav className={open ? "header-nav is-open" : "header-nav"}>
          <Link href="/#services" onClick={() => setOpen(false)}>
            Что получите
          </Link>
          <Link href="/#cabinet" onClick={() => setOpen(false)}>
            Личный кабинет
          </Link>
          <Link href="/#process" onClick={() => setOpen(false)}>
            Как работаем
          </Link>
          <Link href="/#portfolio" onClick={() => setOpen(false)}>
            Кейсы
          </Link>
        </nav>
        <div className="header-actions">
          <Link className="button neo-header-login header-login" href="/login">
            Войти в кабинет
          </Link>
          <a
            className="button button-dark header-telegram"
            href={siteConfig.contacts.telegramUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Send size={16} /> Получить расчёт
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
