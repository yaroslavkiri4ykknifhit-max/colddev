"use client";

import { ArrowLeft, ArrowUpRight, LoaderCircle, Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CaseGallery } from "@/components/CaseGallery";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { siteConfig } from "@/config/site";
import { caseImages } from "@/lib/cases";
import { colddevApi } from "@/lib/api";
import type { PortfolioItem } from "@/types";

export default function CasesPage() {
  const [caseId] = useState(() => typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("id") ?? "");
  const [caseItem, setCaseItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(Boolean(caseId));
  const [error, setError] = useState(caseId ? "" : "Кейс не выбран");

  useEffect(() => {
    if (!caseId) return;
    colddevApi.getPortfolio()
      .then((items) => {
        const found = items.find((item) => item.id === caseId && (item.kind === "case" || item.kind === "portfolio") && item.published);
        if (found) setCaseItem(found);
        else setError("Этот кейс пока недоступен");
      })
      .catch((reason) => setError(reason instanceof Error ? reason.message : "Не удалось загрузить кейс"))
      .finally(() => setLoading(false));
  }, [caseId]);

  return <>
    <SiteHeader />
    <main className="case-article-page">
      <div className="shell">
        <Link href="/#portfolio" className="case-back-link"><ArrowLeft /> Все кейсы</Link>
        {loading ? <div className="case-article-state"><LoaderCircle className="is-spinning" /><strong>Открываем кейс</strong><span>Загружаем фотографии и описание</span></div> : error ? <div className="case-article-state is-error"><strong>{error}</strong><span>Вернитесь к списку кейсов или напишите нам.</span><Link className="button button-primary" href="/#portfolio">Вернуться к кейсам</Link></div> : caseItem ? <article className="case-article">
          <div className="case-article-heading">
            <span className="neo-kicker">{caseItem.category || "Кейс COLDDEV"}</span>
            <h1>{caseItem.title}</h1>
            {caseItem.result && <p className="case-article-result">{caseItem.result}</p>}
          </div>
          <CaseGallery images={caseImages(caseItem)} title={caseItem.title} />
          <div className="case-article-body">
            <div className="case-article-copy">
              <span className="neo-kicker">Что сделали</span>
              <p>{caseItem.description || "Описание кейса появится здесь после публикации в админке."}</p>
            </div>
            <aside className="case-article-cta">
              <strong>Хотите такой же понятный результат?</strong>
              <p>Расскажите о задаче — соберём план и покажем следующий шаг.</p>
              <a className="button button-primary" href={siteConfig.contacts.orderUrl} target="_blank" rel="noreferrer"><Send /> Обсудить проект <ArrowUpRight /></a>
            </aside>
          </div>
        </article> : null}
      </div>
    </main>
    <SiteFooter />
  </>;
}
