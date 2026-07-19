"use client";

import { ArrowUpRight, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CaseGallery } from "@/components/CaseGallery";
import { siteConfig } from "@/config/site";
import { caseImages } from "@/lib/cases";
import { colddevApi } from "@/lib/api";
import type { PortfolioItem } from "@/types";

export function CaseSection() {
  const [items, setItems] = useState<PortfolioItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let mounted = true;
    colddevApi.getPortfolio()
      .then((portfolio) => {
        if (!mounted) return;
        const cases = portfolio.filter((item) => (item.kind === "case" || item.kind === "portfolio") && item.published).sort((a, b) => a.order - b.order);
        setItems(cases);
      })
      .catch(() => {
        if (!mounted) return;
        setLoadError("Кейсы пока не подключились к публичной странице. Проверьте обновление Apps Script.");
        setItems([]);
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  return (
    <section className="neo-section cases-section" id="portfolio">
      <div className="shell">
        <div className="neo-heading cases-heading">
          <span className="neo-kicker">Кейсы и примеры</span>
          <h2>ПОКАЗЫВАЕМ РАБОТУ.<br /><em>ПОНЯТНЫЕ РЕЗУЛЬТАТЫ.</em></h2>
          <p>Фотографии, ход работы и результат — всё собрано в кейсе, который можно открыть полностью.</p>
          {loading && <span className="cases-loading"><LoaderCircle /> Загружаем реальные кейсы</span>}
          {loadError && <span className="cases-loading is-error">{loadError}</span>}
        </div>
        {items?.length ? <div className="neo-cases-grid">
          {items.slice(0, 4).map((item, index) => (
            <article className={`neo-case ${index === 0 ? "neo-case-main" : ""}`} key={item.id}>
              <CaseGallery images={caseImages(item)} title={item.title} compact />
              <div className="case-meta">
                <div>
                  <span>{item.category || "Кейс"}</span>
                  <h3>{item.title}</h3>
                  <p>{item.result || item.description}</p>
                </div>
                {item.id.startsWith("fallback-") ? <a href={siteConfig.contacts.orderUrl} target="_blank" rel="noreferrer" className="case-full-link">Обсудить свой проект <ArrowUpRight /></a> : <Link href={`/cases/?id=${encodeURIComponent(item.id)}`} className="case-full-link">Посмотреть кейс полностью <ArrowUpRight /></Link>}
              </div>
            </article>
          ))}
        </div> : !loading && <div className="cases-empty"><strong>Кейсы скоро появятся здесь</strong><span>Добавьте опубликованный кейс в админке — он появится на этой странице автоматически.</span></div>}
        <div className="cases-order-strip">
          <div><span>Ваш проект может стать следующим</span><strong>Обсудим задачу и соберём понятный план запуска</strong></div>
          <a className="button button-primary button-large" href={siteConfig.contacts.orderUrl} target="_blank" rel="noreferrer">Обсудить свой проект <ArrowUpRight /></a>
        </div>
      </div>
    </section>
  );
}
