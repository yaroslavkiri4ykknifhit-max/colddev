"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Copy,
  FileText,
  FolderKanban,
  Globe2,
  Home,
  Layers3,
  LogOut,
  Menu,
  Megaphone,
  Rocket,
  Send,
  Sparkles,
  UploadCloud,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/config/site";
import { colddevApi } from "@/lib/api";
import { formatDate, formatMoney, formatNumber, formatShortDate } from "@/lib/format";
import type { ClientSession, DashboardData, Invoice, Project } from "@/types";

type View = "overview" | "stages" | "updates" | "site" | "ads" | "payments" | "offers";

const navItems: Array<{ id: View; label: string; icon: typeof Home }> = [
  { id: "overview", label: "Обзор", icon: Home },
  { id: "stages", label: "Этапы", icon: Layers3 },
  { id: "updates", label: "Что уже сделано", icon: Clock3 },
  { id: "site", label: "Сайт и ссылки", icon: Globe2 },
  { id: "ads", label: "Реклама и заявки", icon: Megaphone },
  { id: "payments", label: "Счета и оплата", icon: CircleDollarSign },
  { id: "offers", label: "Что можно добавить", icon: Sparkles },
];

function StatusBadge({ status }: { status: string }) {
  const color = status === "Оплачено" || status === "Завершён"
    ? "status-green"
    : status === "Просрочено" || status === "Отменено"
      ? "status-red"
      : status === "Ожидает оплаты" || status === "Ожидает подтверждения"
        ? "status-yellow"
        : "status-blue";
  return <span className={`status-badge ${color}`}>{status}</span>;
}

export default function DashboardPage() {
  const [session, setSession] = useState<ClientSession | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [projectId, setProjectId] = useState("");
  const [view, setView] = useState<View>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [invoiceToPay, setInvoiceToPay] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const raw = sessionStorage.getItem("colddev.clientSession");
    if (!raw) {
      window.location.replace("/login");
      return;
    }
    try {
      const stored = JSON.parse(raw) as ClientSession;
      setSession(stored);
      setData(stored.data);
      setProjectId(stored.data.projects[0]?.id ?? "");
      colddevApi.getDashboard(stored.token).then((fresh) => {
        setData(fresh);
        setProjectId((current) => current || fresh.projects[0]?.id || "");
      }).catch(() => undefined);
    } catch {
      sessionStorage.removeItem("colddev.clientSession");
      window.location.replace("/login");
    }
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const project = data?.projects.find((item) => item.id === projectId) ?? data?.projects[0];
  const projectStages = data?.stages.filter((item) => item.projectId === project?.id).sort((a, b) => a.order - b.order) ?? [];
  const projectUpdates = data?.updates.filter((item) => item.projectId === project?.id) ?? [];
  const projectReports = data?.reports.filter((item) => item.projectId === project?.id) ?? [];
  const projectInvoices = data?.invoices.filter((item) => item.projectId === project?.id) ?? [];
  const pendingInvoice = projectInvoices.find((item) => item.status === "Ожидает оплаты");

  useEffect(() => {
    setInvoiceToPay(pendingInvoice?.id ?? "");
    setReceiptFile(null);
  }, [projectId, pendingInvoice?.id]);

  const logout = () => {
    sessionStorage.removeItem("colddev.clientSession");
    window.location.href = "/login";
  };

  const chooseView = (next: View) => {
    setView(next);
    setSidebarOpen(false);
  };

  const copyText = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setToast("Скопировано");
  };

  const uploadReceipt = async () => {
    if (!session || !receiptFile || !invoiceToPay) return;
    setUploading(true);
    try {
      const result = await colddevApi.markInvoicePaid(session.token, invoiceToPay, receiptFile);
      setData((current) => current && ({
        ...current,
        invoices: current.invoices.map((invoice) => invoice.id === invoiceToPay
          ? { ...invoice, status: result.status, receiptName: result.fileName }
          : invoice),
      }));
      setReceiptFile(null);
      setToast("Чек отправлен. Платёж ожидает подтверждения");
    } catch (error) {
      setToast(error instanceof Error ? error.message : "Не удалось отправить чек");
    } finally {
      setUploading(false);
    }
  };

  if (!data || !project) {
    return <main className="loading-screen"><div className="loader" /></main>;
  }

  return (
    <main className="product-page">
      <div className="product-shell">
        <aside className={`product-sidebar ${sidebarOpen ? "is-open" : ""}`}>
          <div className="sidebar-top"><Logo /><button className="mobile-nav-toggle" aria-label="Закрыть меню" onClick={() => setSidebarOpen(false)}><X size={17} /></button></div>
          <div className="sidebar-project">
            <label htmlFor="project-select">Выберите проект</label>
            <select id="project-select" value={project.id} onChange={(event) => setProjectId(event.target.value)}>
              {data.projects.map((item) => <option value={item.id} key={item.id}>{item.id} · {item.name}</option>)}
            </select>
          </div>
          <nav className="product-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              return <button className={view === item.id ? "is-active" : ""} onClick={() => chooseView(item.id)} key={item.id}><Icon />{item.label}</button>;
            })}
          </nav>
          <div className="sidebar-bottom">
            <a className="sidebar-support" href={siteConfig.contacts.telegramUrl} target="_blank" rel="noreferrer"><span>Остался вопрос?</span><strong><Send size={14} /> Написать Ярославу</strong></a>
            <button className="sidebar-logout" onClick={logout}><LogOut size={13} /> Выйти</button>
          </div>
        </aside>
        <section className="product-main">
          <header className="product-topbar">
            <div><h1>Проект: {project.name}</h1><p>Номер {project.id} · обновлено {formatDate(project.lastUpdatedAt)}</p></div>
            <div className="topbar-actions">
              <button className="mobile-nav-toggle" aria-label="Открыть меню" onClick={() => setSidebarOpen(true)}><Menu size={18} /></button>
              <div className="user-chip"><span className="user-avatar">{data.client.name.split(" ").map((part) => part[0]).join("").slice(0,2)}</span><div><strong>{data.client.name}</strong><span>{data.client.company}</span></div></div>
            </div>
          </header>
          <div className="product-content">
            {colddevApi.isDemoMode && <div className="notice">Это демонстрационный кабинет. Данные и загрузка чека работают локально и не отправляются в Google Drive.</div>}
            {view === "overview" && <Overview project={project} stages={projectStages} updates={projectUpdates} invoices={projectInvoices} setView={setView} />}
            {view === "stages" && <StagesView project={project} stages={projectStages} />}
            {view === "updates" && <UpdatesView updates={projectUpdates} />}
            {view === "site" && <SiteView project={project} stages={projectStages} />}
            {view === "ads" && <AdsView reports={projectReports} />}
            {view === "payments" && (
              <PaymentsView
                invoices={projectInvoices}
                invoiceToPay={invoiceToPay}
                setInvoiceToPay={setInvoiceToPay}
                receiptFile={receiptFile}
                setReceiptFile={setReceiptFile}
                uploading={uploading}
                uploadReceipt={uploadReceipt}
                copyText={copyText}
              />
            )}
            {view === "offers" && <OffersView project={project} services={data.services} />}
          </div>
        </section>
      </div>
      {toast && <div className="toast"><CheckCircle2 size={17} /> {toast}</div>}
    </main>
  );
}

function Overview({ project, stages, updates, invoices, setView }: { project: Project; stages: DashboardData["stages"]; updates: DashboardData["updates"]; invoices: Invoice[]; setView: (view: View) => void }) {
  const completed = stages.filter((stage) => stage.status === "done").length;
  const nextStage = stages.find((stage) => stage.status === "active") ?? stages.find((stage) => stage.status === "waiting");
  const unpaid = invoices.find((invoice) => invoice.status === "Ожидает оплаты");
  return <>
    <div className="client-current-card card">
      <div className="client-current-copy">
        <div className="client-current-top"><span>Что происходит сейчас</span><StatusBadge status={project.status} /></div>
        <h2>{project.currentAction}</h2>
        <p>{project.managerComment}</p>
        <div className="client-action-state"><Check size={17} /><div><strong>Сейчас от вас ничего не требуется</strong><span>Если понадобится решение или файл, это сообщение изменится.</span></div></div>
      </div>
      <div className="client-progress-panel">
        <span>Проект готов</span>
        <strong>{project.progress}%</strong>
        <div className="large-progress"><span style={{ width: `${project.progress}%` }} /></div>
        <small>Плановый запуск: {formatDate(project.deadline)}</small>
      </div>
    </div>
    <div className="stats-grid">
      <div className="stat-card card"><span>Готово этапов</span><strong>{completed} из {stages.length}</strong><small>Все этапы можно открыть в меню</small></div>
      <div className="stat-card card"><span>Текущий этап</span><strong>{nextStage?.title ?? "Проект готов"}</strong><small>{nextStage?.description ?? "Все работы завершены"}</small></div>
      <div className="stat-card card"><span>Плановая дата</span><strong>{formatShortDate(project.deadline)}</strong><small>Дата запуска проекта</small></div>
      <div className="stat-card card"><span>Ближайшая оплата</span><strong>{unpaid ? formatMoney(unpaid.amount) : "Нет"}</strong><small>{unpaid ? `Оплатить до ${formatShortDate(unpaid.dueAt)}` : "Все счета оплачены"}</small></div>
    </div>
    <div className="dashboard-columns">
      <div className="card"><div className="card-heading"><h3>Последние обновления по проекту</h3><button onClick={() => setView("updates")}>Открыть всю историю</button></div><div className="timeline">{updates.slice(0,3).map((update) => <div className="timeline-item" key={update.id}><span className="timeline-dot" /><div><h4>{update.title}</h4><p>{update.description}</p></div><time>{formatShortDate(update.date)}</time></div>)}</div></div>
      <div className="action-card card"><span>Главное на сегодня</span><h3>{unpaid ? `Есть счёт на ${formatMoney(unpaid.amount)}` : "От вас ничего не требуется"}</h3><p>{unpaid ? `Его нужно оплатить до ${formatDate(unpaid.dueAt)}. Реквизиты и загрузка чека находятся в разделе «Счета и оплата».` : "Работа идёт по плану. Следующее важное действие появится здесь."}</p>{unpaid && <button className="button button-primary button-small" onClick={() => setView("payments")}>Перейти к оплате <ArrowUpRight size={14} /></button>}</div>
    </div>
  </>;
}

function StagesView({ project, stages }: { project: Project; stages: DashboardData["stages"] }) {
  return <><div className="view-heading"><div><h2>Этапы проекта</h2><p>{project.progress}% готово · {stages.filter((item) => item.status === "done").length} этапа завершено</p></div><StatusBadge status={project.status} /></div><div className="stage-list">{stages.map((stage, index) => <article className={`stage-card card is-${stage.status}`} key={stage.id}><span className="stage-index">{stage.status === "done" ? <Check size={16} /> : String(index + 1).padStart(2,"0")}</span><div><h3>{stage.title}</h3><p>{stage.description}</p></div><span>{stage.status === "done" ? "Завершён" : stage.status === "active" ? "В работе" : stage.status === "paused" ? "Пауза" : "Ожидает"}</span></article>)}</div></>;
}

function UpdatesView({ updates }: { updates: DashboardData["updates"] }) {
  return <><div className="view-heading"><div><h2>Ход работы</h2><p>История изменений и заметки по проекту</p></div></div><div className="card"><div className="timeline">{updates.length ? updates.map((update) => <div className="timeline-item" key={update.id}><span className="timeline-dot" /><div><h4>{update.title} · {update.category}</h4><p>{update.description}</p>{update.linkUrl && <a href={update.linkUrl} target="_blank" rel="noreferrer" className="button button-ghost button-small">Открыть результат <ArrowUpRight size={13} /></a>}</div><time>{formatDate(update.date)}</time></div>) : <EmptyState title="Обновлений пока нет" text="Первая запись появится после начала работ." />}</div></div></>;
}

function SiteView({ project, stages }: { project: Project; stages: DashboardData["stages"] }) {
  return <><div className="view-heading"><div><h2>Сайт</h2><p>Ссылки и технический статус проекта</p></div>{project.previewUrl && <a className="button button-primary" href={project.previewUrl} target="_blank" rel="noreferrer">Открыть превью <ArrowUpRight size={16} /></a>}</div><div className="stats-grid"><div className="stat-card card"><span>Состояние</span><strong>В разработке</strong><small>Технических проблем нет</small></div><div className="stat-card card"><span>Версия</span><strong>0.{project.progress}</strong><small>Последняя сборка</small></div><div className="stat-card card"><span>Готово этапов</span><strong>{stages.filter((item) => item.status === "done").length}</strong><small>из {stages.length}</small></div><div className="stat-card card"><span>Домен</span><strong>{project.siteUrl ? "Подключён" : "Ожидает"}</strong><small>{project.siteUrl ?? "будет подключён перед запуском"}</small></div></div><div className="report-summary card"><span className="eyebrow">Комментарий менеджера</span><p>{project.managerComment}</p></div></>;
}

function AdsView({ reports }: { reports: DashboardData["reports"] }) {
  const report = reports[0];
  if (!report) return <><div className="view-heading"><div><h2>Реклама</h2><p>Статистика Яндекс Директа</p></div></div><div className="card"><EmptyState title="Рекламных отчётов пока нет" text="Показатели появятся после запуска кампаний." /></div></>;
  const costPerLead = report.leads ? report.spend / report.leads : 0;
  return <><div className="view-heading"><div><h2>Реклама</h2><p>{report.period}</p></div><StatusBadge status="В работе" /></div><div className="reports-grid"><div className="report-card card"><span>Показы</span><strong>{formatNumber(report.impressions)}</strong><small>охват объявлений</small></div><div className="report-card card"><span>Клики</span><strong>{formatNumber(report.clicks)}</strong><small>{((report.clicks/report.impressions)*100).toFixed(1)}% CTR</small></div><div className="report-card card"><span>Расход</span><strong>{formatMoney(report.spend)}</strong><small>осталось {formatMoney(report.budgetLeft)}</small></div><div className="report-card card"><span>Заявки</span><strong>{report.leads}</strong><small>{formatMoney(costPerLead)} за заявку</small></div></div><div className="report-summary card"><span className="eyebrow">Комментарий по периоду</span><p>{report.comment}</p></div></>;
}

function PaymentsView({ invoices, invoiceToPay, setInvoiceToPay, receiptFile, setReceiptFile, uploading, uploadReceipt, copyText }: { invoices: Invoice[]; invoiceToPay: string; setInvoiceToPay: (id: string) => void; receiptFile: File | null; setReceiptFile: (file: File | null) => void; uploading: boolean; uploadReceipt: () => void; copyText: (value: string) => void }) {
  const selected = invoices.find((item) => item.id === invoiceToPay);
  const hasPendingInvoice = invoices.some((item) => item.status === "Ожидает оплаты");

  return <>
    <div className="view-heading"><div><h2>Счета и оплата</h2><p>Здесь видно, сколько, когда и как нужно оплатить</p></div></div>
    <div className="invoice-list">
      {invoices.map((invoice) => <article className="invoice-card card" key={invoice.id}>
        <div><h3>{invoice.title}</h3><p>{invoice.id} · выставлен {formatShortDate(invoice.createdAt)}</p></div>
        <div className="invoice-amount"><span>Сумма</span><strong>{formatMoney(invoice.amount)}</strong></div>
        <div className="invoice-due"><span>Оплатить до</span><strong>{formatDate(invoice.dueAt)}</strong></div>
        <StatusBadge status={invoice.status} />
      </article>)}
    </div>
    {hasPendingInvoice && <div className="payment-panel" style={{marginTop:12}}>
      <div className="erip-card card">
        <span className="eyebrow eyebrow-invert">Как оплатить через ЕРИП</span>
        <span className="erip-amount-label">Сумма выбранного счёта</span>
        <h3>{selected ? formatMoney(selected.amount) : "Выберите счёт"}</h3>
        <ol className="erip-path">
          {siteConfig.erip.path.map((part, index) => <li key={part}><span>{index + 1}</span><strong>{part}</strong></li>)}
        </ol>
        <div className="erip-contract"><div><span>Номер договора</span><strong>{siteConfig.erip.contractNumber}</strong></div><button className="copy-button" onClick={() => copyText(siteConfig.erip.contractNumber)} title="Скопировать номер договора"><Copy size={16} /></button></div>
      </div>
      <div className="upload-card card">
        <h3>После оплаты приложите чек</h3>
        <p>Выберите оплаченный счёт и загрузите изображение или PDF. Мы проверим платёж и поменяем статус на «Оплачено».</p>
        <div className="field"><label htmlFor="invoice-select">Какой счёт оплатили</label><select id="invoice-select" value={invoiceToPay} onChange={(event) => setInvoiceToPay(event.target.value)}>{invoices.filter((item) => item.status === "Ожидает оплаты").map((item) => <option value={item.id} key={item.id}>{item.title} · {formatMoney(item.amount)}</option>)}</select></div>
        <label className="upload-zone" style={{marginTop:12}}><input type="file" accept=".jpg,.jpeg,.png,.webp,.pdf" onChange={(event) => setReceiptFile(event.target.files?.[0] ?? null)} /><UploadCloud size={25} /><strong>{receiptFile ? "Выбрать другой файл" : "Выбрать чек на устройстве"}</strong><span>JPG, PNG, WEBP или PDF · до 10 МБ</span></label>
        {receiptFile && <div className="upload-file">{receiptFile.name} · {(receiptFile.size/1024/1024).toFixed(2)} МБ</div>}
        <button className="button button-primary" style={{width:"100%",marginTop:12}} disabled={!receiptFile || uploading} onClick={uploadReceipt}>{uploading ? "Загружаем чек…" : "Подтвердить: я оплатил"}</button>
      </div>
    </div>}
  </>;
}

function OffersView({ project, services }: { project: Project; services: DashboardData["services"] }) {
  const priceLabel = (service: DashboardData["services"][number]) => service.priceMode === "request" ? "по запросу" : `${service.priceMode === "from" ? "от " : ""}${formatMoney(service.price ?? 0)}`;
  return <><div className="view-heading"><div><h2>Улучшить проект</h2><p>Дополнительные возможности для {project.name}</p></div></div><div className="offers-grid">{services.filter((item) => item.active).map((service, index) => <article className="offer-card card" key={service.id}><span className="offer-icon">{index === 0 ? <Send /> : index === 1 ? <FolderKanban /> : <Rocket />}</span><h3>{service.title}</h3><p>{service.description}</p><div className="offer-bottom"><span className="offer-price">{priceLabel(service)}</span><a className="button button-primary button-small" href={`${siteConfig.contacts.telegramUrl}?text=${encodeURIComponent(`Здравствуйте. Хочу обсудить услугу «${service.title}» для проекта ${project.id}.`)}`} target="_blank" rel="noreferrer">{service.buttonLabel}</a></div></article>)}</div></>;
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return <div className="empty-state"><FileText size={30} /><h3>{title}</h3><p>{text}</p></div>;
}
