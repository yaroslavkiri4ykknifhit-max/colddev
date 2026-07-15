"use client";

import { siteConfig } from "@/config/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const serviceLinks = [
    { name: "Разработка сайтов", href: "#benefits" },
    { name: "Дизайн интерфейсов", href: "#benefits" },
    { name: "Telegram Mini Apps", href: "#benefits" },
    { name: "Автоматизация бизнеса", href: "#benefits" },
    { name: "Google Ads реклама", href: "#benefits" }
  ];

  const infoLinks = [
    { name: "Главная", href: "#hero" },
    { name: "Проекты", href: "#projects" },
    { name: "Процесс", href: "#process" },
    { name: "Цены", href: "#pricing" },
    { name: "Отзывы", href: "#testimonials" }
  ];

  return (
    <footer id="footer" className="relative border-t border-white/5 bg-black/40 pt-16 pb-8 overflow-hidden">
      
      {/* Decorative radial lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-white/[0.015] blur-[80px] pointer-events-none rounded-full" />

      <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
        
        {/* Links section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <a href="#hero" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-white/40 via-white to-white/10 flex items-center justify-center p-[1px]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-[10px] text-white">
                  YD
                </div>
              </div>
              <span className="font-bold text-white tracking-tight">{siteConfig.brandName}</span>
            </a>
            <p className="text-xs text-text-secondary leading-relaxed max-w-xs">
              Создание премиальных цифровых решений, которые сочетают в себе передовой дизайн, чистый код и инструменты лидогенерации.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-white mb-4">Услуги</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-xs text-text-secondary hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-white mb-4">Навигация</h4>
            <ul className="space-y-2">
              {infoLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-xs text-text-secondary hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-white mb-4">Контакты</h4>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li>
                Telegram:{" "}
                <a href={siteConfig.contacts.telegram} className="text-white hover:underline">
                  @yaroslav_digital
                </a>
              </li>
              <li>
                Email:{" "}
                <a href={`mailto:${siteConfig.contacts.email}`} className="text-white hover:underline">
                  {siteConfig.contacts.email}
                </a>
              </li>
              <li>Телефон: {siteConfig.contacts.phone}</li>
              <li>Локация: {siteConfig.contacts.address}</li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-[1px] bg-white/5 mb-8" />

        {/* Sub-footer metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-text-tertiary">
          <span>© {currentYear} {siteConfig.brandName}. Все права защищены.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Условия использования</a>
          </div>
        </div>

        {/* Large outline brand watermark at the bottom (SEOTalos style) */}
        <div className="w-full text-center mt-12 select-none pointer-events-none translate-y-10 sm:translate-y-16">
          <span
            className="text-[4rem] sm:text-[8rem] lg:text-[11rem] font-extrabold tracking-tighter uppercase leading-none"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.03)",
            }}
          >
            {siteConfig.brandName}
          </span>
        </div>

      </div>
    </footer>
  );
}
