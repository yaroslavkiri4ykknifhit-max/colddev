"use client";

import { Menu, Send, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.toggle("menu-is-open", open);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("menu-is-open");
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Logo />
        <nav id="site-navigation" className={open ? "header-nav is-open" : "header-nav"} aria-label="Основная навигация">
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
          <a
            className="header-mobile-order"
            href={siteConfig.contacts.orderUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            Получить расчёт <Send size={16} />
          </a>
        </nav>
        <div className="header-actions">
          <Link className="button neo-header-login header-login" href="/login">
            Войти в кабинет
          </Link>
          <a
            className="button button-dark header-telegram"
            href={siteConfig.contacts.orderUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Send size={16} /> Получить расчёт
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-controls="site-navigation"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
