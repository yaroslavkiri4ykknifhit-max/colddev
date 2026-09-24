"use client";

import { ArrowUpRight, BarChart3, Check, ChevronRight, Circle, FileCheck2, LayoutDashboard, WalletCards } from "lucide-react";
import { useId, useRef, useState } from "react";

const tabs = [
  { key: "stages", label: "Этапы", icon: LayoutDashboard },
  { key: "ads", label: "Реклама", icon: BarChart3 },
  { key: "payments", label: "Оплаты", icon: WalletCards },
] as const;
type TabKey = typeof tabs[number]["key"];

/** Illustrative interface only. Never uses client data or performs API mutations. */
export function DashboardPreview({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState<TabKey>("stages");
  const id = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  return <div className={`cd-dashboard${compact ? " is-compact" : ""}`}>
    <div className="cd-dashboard-header"><span className="cd-dashboard-brand">colddev<span>/</span></span><span className="cd-example-label">Пример интерфейса</span><span className="cd-dashboard-avatar">Я</span></div>
    <div className="cd-dashboard-body">
      <div className="cd-dashboard-heading"><div><span>ВАШ ПРОЕКТ</span><strong>Сайт для бизнеса</strong></div><span className="cd-status"><i /> В работе</span></div>
      {!compact && <div className="cd-dashboard-tabs" role="tablist" aria-label="Разделы примера кабинета">{tabs.map(({ key, label, icon: Icon }, index) => <button ref={(node) => { tabRefs.current[index] = node; }} type="button" role="tab" id={`${id}-${key}`} aria-controls={`${id}-panel-${key}`} aria-selected={active === key} tabIndex={active === key ? 0 : -1} key={key} onClick={() => setActive(key)} onKeyDown={(event) => {
        let next: number;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabs.length - 1;
        else return;
        event.preventDefault(); setActive(tabs[next].key); tabRefs.current[next]?.focus();
      }}><Icon size={15} />{label}</button>)}</div>}
      <div className="cd-dashboard-content" {...(!compact ? { role: "tabpanel", id: `${id}-panel-${active}`, "aria-labelledby": `${id}-${active}`, tabIndex: 0 } : {})} key={active}>
        {active === "stages" && <>
          <div className="cd-project-focus"><div><span>СЕЙЧАС ДЕЛАЕМ</span><h3>Мобильную версию<br />и финальную проверку</h3><p><span><Check size={12} /></span> Работа идёт по плану</p></div><div className="cd-progress-ring"><span>68<small>%</small></span></div></div>
          <div className="cd-stage-list"><div><span className="is-done"><Check size={13} /></span><p>Структура и дизайн</p><small>Готово</small></div><div><span className="is-current"><Circle size={10} /></span><p>Разработка</p><small>В работе</small></div><div><span><Circle size={10} /></span><p>Проверка и запуск</p><ChevronRight size={14} /></div></div>
        </>}
        {active === "ads" && <><div className="cd-preview-subtitle"><span>Яндекс Директ</span><strong>Реклама в цифрах</strong><p>Расход, заявки и цена обращения — в одном отчёте.</p></div><div className="cd-report-grid"><div><span>Расход</span><strong>240 <small>BYN</small></strong></div><div><span>Заявки</span><strong>12</strong></div><div><span>Цена заявки</span><strong>20 <small>BYN</small></strong></div></div><div className="cd-report-note"><BarChart3 size={18} /><span>Условный пример отчёта. Результаты зависят от проекта.</span></div></>}
        {active === "payments" && <><div className="cd-preview-subtitle"><span>Счета и документы</span><strong>Всё об оплатах</strong><p>Суммы, статусы и чеки собраны в кабинете.</p></div><div className="cd-invoice"><FileCheck2 size={22} /><div><strong>Первый этап проекта</strong><span>Пример счёта</span></div><span className="cd-invoice-paid"><Check size={12} /> Оплачено</span></div><div className="cd-invoice-info"><WalletCards size={18} /><span>Оплата через ЕРИП / загрузка чека</span><ArrowUpRight size={15} /></div></>}
      </div>
    </div>
    <div className="cd-dashboard-footer"><span>Все этапы. Все сроки. Вся картина.</span><span>colddev / кабинет</span></div>
  </div>;
}
