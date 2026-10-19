"use client";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 901px)");
    const close = () => { if (media.matches) setOpen(false); };
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) { setOpen(false); toggleRef.current?.focus(); }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return <header className="site-header"><div className="shell header-inner"><Logo />
    <nav className={`header-nav${open ? " is-open" : ""}`} id="site-navigation" aria-label="Основная навигация">
      <Link href="/#portfolio" onClick={() => setOpen(false)}>Работы</Link>
      <Link href="/#services" onClick={() => setOpen(false)}>Тарифы</Link>
      <Link href="/#process" onClick={() => setOpen(false)}>Подход</Link>
      <a className="mobile-contact" href={siteConfig.contacts.orderUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Обсудить проект <ArrowUpRight size={18} /></a>
    </nav>
    <div className="header-actions"><a className="header-contact" href={siteConfig.contacts.orderUrl} target="_blank" rel="noreferrer">Обсудить проект <ArrowUpRight size={17} /></a><button className="menu-toggle" ref={toggleRef} type="button" aria-label={open ? "Закрыть меню" : "Открыть меню"} aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
  </div></header>;
}
