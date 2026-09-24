"use client";

import { ArrowUpRight, Images, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CaseGallery } from "@/components/CaseGallery";
import { siteConfig } from "@/config/site";
import { caseImages } from "@/lib/cases";
import { colddevApi } from "@/lib/api";
import type { PortfolioItem } from "@/types";

export function CaseSection() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let mounted = true;
    colddevApi.getPortfolio()
      .then((portfolio) => {
        if (!mounted) return;
        setItems(portfolio.filter((item) => (item.kind === "case" || item.kind === "portfolio") && item.published).sort((a, b) => a.order - b.order));
      })
      .catch(() => { if (mounted) setLoadError(true); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  return <section className="cd-section cd-cases" id="portfolio" aria-labelledby="cases-title">
    <div className="cd-shell">
      <div className="cd-section-head"><div><span className="cd-eyebrow">05 / Кейсы и примеры</span><h2 id="cases-title">Показываем работу.<br /><span className="cd-gradient">Понятные результаты.</span></h2></div><p>Фотографии, ход работы и результат — всё собрано в кейсе, который можно открыть полностью.</p></div>
      {loading ? <div className="cd-loading" role="status"><LoaderCircle size={20} /> Загружаем кейсы</div> : items.length ? <div className="cd-cases-grid">
        {items.slice(0, 4).map((item) => <article className="cd-case" key={item.id}>
          <CaseGallery images={caseImages(item)} title={item.title} compact />
          <div className="cd-case-copy"><span>{item.category || "Кейс"}</span><h3>{item.title}</h3><p>{item.result || item.description}</p>
            {item.id.startsWith("fallback-") ? <a href={siteConfig.contacts.orderUrl} target="_blank" rel="noreferrer">Обсудить свой проект <ArrowUpRight size={19} /></a> : <Link href={`/cases/?id=${encodeURIComponent(item.id)}`}>Посмотреть кейс <ArrowUpRight size={19} /></Link>}
          </div>
        </article>)}
      </div> : <div className="cd-case-state"><Images aria-hidden="true" /><div><strong>{loadError ? "Кейсы сейчас не загрузились" : "Готовим подробные кейсы"}</strong><p>{loadError ? "Напишите Ярославу — обсудим вашу задачу и подход к работе." : "А пока расскажите о своей задаче — обсудим подход и соберём понятный план запуска."}</p><a href={siteConfig.contacts.orderUrl} target="_blank" rel="noreferrer">Обсудить свой проект <ArrowUpRight size={17} /></a></div></div>}
    </div>
  </section>;
}
