"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import {
  ArrowRight,
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
  LogOut,
  Menu,
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

type View = "overview" | "work" | "results" | "payments" | "offers";
type ReceiptFlow = "idle" | "uploading" | "success" | "error";

const navItems: Array<{ id: View; label: string; mobileLabel: string; icon: typeof Home }> = [
  { id: "overview", label: "Главная", mobileLabel: "Главная", icon: Home },
  { id: "work", label: "Ход работы", mobileLabel: "Работа", icon: Clock3 },
  { id: "results", label: "Результаты", mobileLabel: "Результаты", icon: Globe2 },
  { id: "payments", label: "Оплата", mobileLabel: "Оплата", icon: CircleDollarSign },
  { id: "offers", label: "Улучшить проект", mobileLabel: "Ещё", icon: Sparkles },
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
  const [invoiceToPay, setInvoiceToPay] = useState("");
  const [receiptFlow, setReceiptFlow] = useState<ReceiptFlow>("idle");
  const [receiptError, setReceiptError] = useState("");
  const [uploadSeconds, setUploadSeconds] = useState(10);
  const [uploadTotal, setUploadTotal] = useState(10);
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

  useEffect(() => {
    if (receiptFlow === "uploading") {
      const timer = window.setInterval(() => setUploadSeconds((current) => Math.max(1, current - 1)), 1000);
      return () => window.clearInterval(timer);
    }
    if (receiptFlow === "success") {
      const timer = window.setTimeout(() => setReceiptFlow("idle"), 2600);
      return () => window.clearTimeout(timer);
    }
  }, [receiptFlow]);

  const project = data?.projects.find((item) => item.id === projectId) ?? data?.projects[0];
  const projectStages = data?.stages
    .filter((item) => item.projectId === project?.id)
    .sort((a, b) => a.order - b.order) ?? [];
  const projectUpdates = data?.updates
    .filter((item) => item.projectId === project?.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) ?? [];
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyText = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setToast("Скопировано");
  };

  const uploadReceipt = async () => {
    if (!session || !receiptFile || !invoiceToPay) return;
    const estimate = Math.max(7, Math.min(18, Math.ceil(receiptFile.size / 1024 / 1024) * 2 + 7));
    setUploadTotal(estimate);
    setUploadSeconds(estimate);
    setReceiptError("");
    setReceiptFlow("uploading");
    try {
      const result = await colddevApi.markInvoicePaid(session.token, invoiceToPay, receiptFile);
      setData((current) => current && ({
        ...current,
        invoices: current.invoices.map((invoice) => invoice.id === invoiceToPay
          ? { ...invoice, status: result.status, receiptName: result.fileName }
          : invoice),
      }));
      setReceiptFile(null);
      setReceiptFlow("success");
    } catch (error) {
      setReceiptError(error instanceof Error ? error.message : "Не удалось отправить чек");
      setReceiptFlow("error");
    }
  };

  if (!data || !project) {
    return <main className="cabinet-loading"><Logo /><div className="cabinet-loading-orbit"><span className="loader" /></div><h1>Открываем кабинет</h1><p>Загружаем ваш проект</p></main>;
  }

  const activeView = navItems.find((item) => item.id === view)?.label ?? "Главная";

  return (
    <main className="product-page">
      <div className="product-shell">
        <button
          className={`sidebar-scrim ${sidebarOpen ? "is-visible" : ""}`}
          aria-label="Закрыть меню"
          onClick={() => setSidebarOpen(false)}
        />
        <aside className={`product-sidebar ${sidebarOpen ? "is-open" : ""}`}>
          <div className="sidebar-top">
            <Logo />
            <button className="mobile-nav-toggle" aria-label="Закрыть меню" onClick={() => setSidebarOpen(false)}><X size={17} /></button>
          </div>
          <div className="sidebar-project">
            <label htmlFor="project-select">Ваш проект</label>
            <select id="project-select" value={project.id} onChange={(event) => setProjectId(event.target.value)}>
              {data.projects.map((item) => <option value={item.id} key={item.id}>{item.name} · {item.id}</option>)}
            </select>
            <small>{data.projects.length > 1 ? `Доступно проектов: ${data.projects.length}` : "Все данные относятся к этому проекту"}</small>
          </div>
          <span className="sidebar-section-label">Разделы кабинета</span>
          <nav className="product-nav" aria-label="Разделы кабинета">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  className={view === item.id ? "is-active" : ""}
                  aria-current={view === item.id ? "page" : undefined}
                  onClick={() => chooseView(item.id)}
                  key={item.id}
                >
                  <Icon />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="sidebar-bottom">
            <a className="sidebar-support" href={siteConfig.contacts.telegramUrl} target="_blank" rel="noreferrer">
              <span>Нужна помощь?</span>
              <strong><Send size={14} /> Написать Ярославу</strong>
            </a>
            <button className="sidebar-logout" onClick={logout}><LogOut size={13} /> Выйти из кабинета</button>
          </div>
        </aside>

        <section className="product-main">
          <header className="product-topbar">
            <div className="topbar-title">
              <span>{activeView}</span>
              <h1>{project.name}</h1>
              <p>{project.id} · обновлено {formatDate(project.lastUpdatedAt)}</p>
            </div>
            <div className="topbar-actions">
              <div className="user-chip">
                <span className="user-avatar">{data.client.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>
                <div><strong>{data.client.name}</strong><span>{data.client.company}</span></div>
              </div>
              <button className="mobile-nav-toggle" aria-label="Открыть меню кабинета" onClick={() => setSidebarOpen(true)}><Menu size={18} /></button>
            </div>
          </header>

          <div className="product-content dashboard-view-enter" key={`${project.id}-${view}`}>
            {view === "overview" && (
              <Overview
                clientName={data.client.name}
                project={project}
                stages={projectStages}
                updates={projectUpdates}
                invoices={projectInvoices}
                setView={chooseView}
              />
            )}
            {view === "work" && <WorkView project={project} stages={projectStages} updates={projectUpdates} />}
            {view === "results" && <ResultsView project={project} stages={projectStages} reports={projectReports} />}
            {view === "payments" && (
              <PaymentsView
                invoices={projectInvoices}
                invoiceToPay={invoiceToPay}
                setInvoiceToPay={setInvoiceToPay}
                receiptFile={receiptFile}
                setReceiptFile={setReceiptFile}
                uploading={receiptFlow === "uploading"}
                uploadReceipt={uploadReceipt}
                copyText={copyText}
              />
            )}
            {view === "offers" && <OffersView project={project} services={data.services} />}
          </div>
        </section>
      </div>

      <nav className="mobile-bottom-nav" aria-label="Основная навигация">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              className={view === item.id ? "is-active" : ""}
              aria-current={view === item.id ? "page" : undefined}
              onClick={() => chooseView(item.id)}
              key={item.id}
            >
              <Icon />
              <span>{item.mobileLabel}</span>
              {item.id === "payments" && pendingInvoice && <i aria-label="Есть неоплаченный счёт" />}
            </button>
          );
        })}
      </nav>
      {receiptFlow !== "idle" && <ReceiptUploadOverlay stage={receiptFlow} seconds={uploadSeconds} total={uploadTotal} error={receiptError} onClose={() => setReceiptFlow("idle")} onRetry={() => void uploadReceipt()} />}
      {toast && <div className="toast"><CheckCircle2 size={17} /> {toast}</div>}
    </main>
  );
}

function Overview({ clientName, project, stages, updates, invoices, setView }: {
  clientName: string;
  project: Project;
  stages: DashboardData["stages"];
  updates: DashboardData["updates"];
  invoices: Invoice[];
  setView: (view: View) => void;
}) {
  const firstName = clientName.split(" ")[0] || clientName;
  const completed = stages.filter((stage) => stage.status === "done").length;
  const currentStage = stages.find((stage) => stage.status === "active") ?? stages.find((stage) => stage.status === "waiting");
  const unpaid = invoices.find((invoice) => invoice.status === "Ожидает оплаты");
  const awaitingPayment = invoices.find((invoice) => invoice.status === "Ожидает подтверждения");
  const latestUpdate = updates[0];

  return <>
    <div className="dashboard-welcome">
      <div>
        <span>Ваш проект</span>
        <h2>Привет, {firstName}</h2>
      </div>
      <StatusBadge status={project.status} />
    </div>

    <section className="dashboard-now-grid" aria-label="Главное по проекту">
      <article className="dashboard-now-card card">
        <span className="dashboard-card-label">Сейчас</span>
        <h3>{project.currentAction || "Работа над проектом идёт"}</h3>
        <p>{project.managerComment || "Все изменения и следующие шаги появятся здесь."}</p>
        <div className="dashboard-now-meta">
          <div><span>Текущий этап</span><strong>{currentStage?.title ?? "Проект завершён"}</strong></div>
          <div><span>Обновлено</span><strong>{formatDate(project.lastUpdatedAt)}</strong></div>
        </div>
      </article>

      <article className={`client-next-step card ${unpaid ? "needs-action" : "is-clear"}`}>
        <span className="dashboard-card-label">От вас сейчас</span>
        {unpaid ? <>
          <span className="client-next-icon"><CircleDollarSign /></span>
          <h3>Оплатить счёт</h3>
          <p>{formatMoney(unpaid.amount)} · до {formatDate(unpaid.dueAt)}</p>
          <button className="button button-primary" onClick={() => setView("payments")}>Перейти к оплате <ArrowRight size={16} /></button>
        </> : awaitingPayment ? <>
          <span className="client-next-icon is-pending"><Clock3 /></span>
          <h3>Чек на проверке</h3>
          <p>Мы проверяем платёж. Результат появится здесь.</p>
          <button className="button button-ghost" onClick={() => setView("payments")}>Открыть счёт <ArrowRight size={16} /></button>
        </> : <>
          <span className="client-next-icon"><Check /></span>
          <h3>Всё под контролем</h3>
          <p>Сейчас от вас ничего не требуется.</p>
        </>}
      </article>
    </section>

    <section className="project-path-card card" aria-label="Прогресс проекта">
      <div className="project-path-head">
        <div><span className="dashboard-card-label">До запуска</span><h3>{project.progress}% готово</h3></div>
        <div className="project-deadline"><span>Плановая дата</span><strong>{formatShortDate(project.deadline)}</strong></div>
      </div>
      <div className="project-progress-track" aria-label={`Проект готов на ${project.progress}%`}><span style={{ width: `${project.progress}%` }} /></div>
      <div className="project-path-foot">
        <span>{completed} из {stages.length} этапов завершено</span>
        <button onClick={() => setView("work")}>Посмотреть весь ход работы <ArrowRight size={14} /></button>
      </div>
    </section>

    <section className="dashboard-latest card">
      <div><span className="dashboard-card-label">Последнее обновление</span><h3>{latestUpdate?.title ?? "Работа продолжается"}</h3><p>{latestUpdate?.description ?? "Новые события появятся здесь после следующего шага."}</p></div>
      <div className="dashboard-latest-actions"><button className="button button-ghost" onClick={() => setView("work")}>Вся работа <ArrowRight size={15} /></button><a className="button button-primary" href={siteConfig.contacts.telegramUrl} target="_blank" rel="noreferrer">Задать вопрос <Send size={15} /></a></div>
    </section>
  </>;
}

function WorkView({ project, stages, updates }: {
  project: Project;
  stages: DashboardData["stages"];
  updates: DashboardData["updates"];
}) {
  const activeStage = stages.find((stage) => stage.status === "active");
  const completed = stages.filter((stage) => stage.status === "done").length;

  return <>
    <div className="view-heading client-view-heading">
      <div><span className="dashboard-card-label">Ход работы</span><h2>От первого шага до запуска</h2><p>Сверху — этапы проекта. Ниже — подробная история обновлений.</p></div>
      <StatusBadge status={project.status} />
    </div>

    {activeStage && <div className="work-current-card card">
      <span>Сейчас в работе</span>
      <div><h3>{activeStage.title}</h3><p>{activeStage.description}</p></div>
      <strong>{project.progress}%</strong>
    </div>}

    <section className="work-section">
      <div className="section-simple-heading"><h3>Этапы проекта</h3><span>{completed} из {stages.length} завершено</span></div>
      <div className="stage-list client-stage-list">
        {stages.map((stage, index) => (
          <article className={`stage-card card is-${stage.status}`} key={stage.id}>
            <span className="stage-index">{stage.status === "done" ? <Check size={16} /> : index + 1}</span>
            <div><h3>{stage.title}</h3><p>{stage.description}</p></div>
            <span>{stage.status === "done" ? "Готово" : stage.status === "active" ? "Сейчас" : stage.status === "paused" ? "Пауза" : "Дальше"}</span>
          </article>
        ))}
      </div>
    </section>

    <section className="work-section">
      <div className="section-simple-heading"><h3>История проекта</h3><span>Новые записи сверху</span></div>
      <div className="card"><UpdateTimeline updates={updates} /></div>
    </section>
  </>;
}

function UpdateTimeline({ updates, compact = false }: { updates: DashboardData["updates"]; compact?: boolean }) {
  if (!updates.length) return <EmptyState title="История пока пустая" text="Первая запись появится после начала работ." />;

  return <div className={`timeline client-timeline ${compact ? "is-compact" : ""}`}>
    {updates.map((update) => <article className="timeline-item" key={update.id}>
      <span className="timeline-dot" />
      <div>
        <span className="timeline-category">{update.category}</span>
        <h4>{update.title}</h4>
        <p>{update.description}</p>
        {update.linkUrl && <a href={update.linkUrl} target="_blank" rel="noreferrer">Открыть результат <ArrowUpRight size={13} /></a>}
      </div>
      <time>{formatDate(update.date)}</time>
    </article>)}
  </div>;
}

function ResultsView({ project, stages, reports }: {
  project: Project;
  stages: DashboardData["stages"];
  reports: DashboardData["reports"];
}) {
  const report = reports[0];
  const costPerLead = report?.leads ? report.spend / report.leads : 0;

  return <>
    <div className="view-heading client-view-heading">
      <div><span className="dashboard-card-label">Результаты</span><h2>Сайт, ссылки и реклама</h2><p>Всё, что уже можно открыть или измерить, собрано на одном экране.</p></div>
    </div>

    <section className="result-site-card card">
      <div>
        <span className="dashboard-card-label">Ваш сайт</span>
        <h3>{project.name}</h3>
        <p>{project.siteUrl ? "Рабочий адрес подключён. Можно открыть сайт в новой вкладке." : "Рабочий адрес появится здесь перед запуском."}</p>
      </div>
      <div className="result-site-status">
        <div><span>Готовность</span><strong>{project.progress}%</strong></div>
        <div><span>Завершено этапов</span><strong>{stages.filter((item) => item.status === "done").length} из {stages.length}</strong></div>
      </div>
      <div className="result-site-actions">
        {project.previewUrl && <a className="button button-primary" href={project.previewUrl} target="_blank" rel="noreferrer">Открыть текущую версию <ArrowUpRight size={15} /></a>}
        {project.siteUrl && <a className="button button-ghost" href={project.siteUrl} target="_blank" rel="noreferrer">Открыть рабочий сайт <ArrowUpRight size={15} /></a>}
      </div>
    </section>

    <section className="work-section">
      <div className="section-simple-heading"><h3>Реклама и заявки</h3><span>{report?.period ?? "После запуска рекламы"}</span></div>
      {report ? <>
        <div className="reports-grid client-reports-grid">
          <div className="report-card card"><span>Показы</span><strong>{formatNumber(report.impressions)}</strong><small>сколько раз увидели рекламу</small></div>
          <div className="report-card card"><span>Переходы на сайт</span><strong>{formatNumber(report.clicks)}</strong><small>{report.impressions ? `${((report.clicks / report.impressions) * 100).toFixed(1)}% от показов` : "0% от показов"}</small></div>
          <div className="report-card card"><span>Потрачено</span><strong>{formatMoney(report.spend)}</strong><small>осталось {formatMoney(report.budgetLeft)}</small></div>
          <div className="report-card card is-accent"><span>Получено заявок</span><strong>{report.leads}</strong><small>{formatMoney(costPerLead)} за одну заявку</small></div>
        </div>
        <div className="report-summary card"><span className="dashboard-card-label">Комментарий по результатам</span><p>{report.comment}</p></div>
      </> : <div className="card"><EmptyState title="Реклама ещё не запущена" text="После запуска здесь появятся показы, переходы, расходы и заявки." /></div>}
    </section>
  </>;
}

function PaymentsView({ invoices, invoiceToPay, setInvoiceToPay, receiptFile, setReceiptFile, uploading, uploadReceipt, copyText }: {
  invoices: Invoice[];
  invoiceToPay: string;
  setInvoiceToPay: (id: string) => void;
  receiptFile: File | null;
  setReceiptFile: (file: File | null) => void;
  uploading: boolean;
  uploadReceipt: () => void;
  copyText: (value: string) => void;
}) {
  const pendingInvoices = invoices.filter((item) => item.status === "Ожидает оплаты");
  const selected = pendingInvoices.find((item) => item.id === invoiceToPay) ?? pendingInvoices[0];
  const history = invoices.filter((item) => item.id !== selected?.id);

  return <>
    <div className="view-heading client-view-heading">
      <div><span className="dashboard-card-label">Оплата</span><h2>{selected ? "Оплатите счёт" : "Оплата в порядке"}</h2><p>{selected ? "Два шага: ЕРИП и чек." : "Все ваши счета закрыты или находятся на проверке."}</p></div>
      {selected && <div className="payment-heading-total"><span>К оплате</span><strong>{formatMoney(selected.amount)}</strong></div>}
    </div>

    {selected ? <>
      {pendingInvoices.length > 1 && <div className="payment-selector"><span>Выберите счёт</span><select aria-label="Счёт для оплаты" value={selected.id} onChange={(event) => setInvoiceToPay(event.target.value)}>{pendingInvoices.map((item) => <option value={item.id} key={item.id}>{item.title} · {formatMoney(item.amount)}</option>)}</select></div>}
      <article className="payment-focus card"><div><span className="invoice-label">Счёт к оплате</span><h3>{selected.title}</h3><p>{selected.id} · оплатить до {formatDate(selected.dueAt)}</p></div><strong>{formatMoney(selected.amount)}</strong></article>
      <div className="payment-action-grid">
        <div className="erip-card card"><span className="payment-step-label">1 · Оплатить</span><h3>{formatMoney(selected.amount)} <button className="copy-button" onClick={() => copyText(selected.amount.toFixed(2).replace(".", ","))} title="Скопировать сумму"><Copy size={16} /></button></h3><ol className="erip-path">{siteConfig.erip.path.map((part, index) => <li key={part}><span>{index + 1}</span><strong>{part}</strong></li>)}</ol><div className="erip-contract"><div><span>Номер договора</span><strong>{siteConfig.erip.contractNumber}</strong></div><button className="copy-button" onClick={() => copyText(siteConfig.erip.contractNumber)} title="Скопировать номер договора"><Copy size={16} /></button></div></div>
        <div className="upload-card card"><span className="payment-step-label">2 · Отправить чек</span><h3>Прикрепите чек</h3><p>Подойдёт фото или PDF до 10 МБ.</p><label className="upload-zone"><input type="file" accept=".jpg,.jpeg,.png,.webp,.pdf" onChange={(event) => setReceiptFile(event.target.files?.[0] ?? null)} /><UploadCloud size={25} /><strong>{receiptFile ? "Выбрать другой файл" : "Выбрать файл"}</strong><span>JPG, PNG, WEBP или PDF</span></label>{receiptFile && <div className="upload-file">{receiptFile.name} · {(receiptFile.size / 1024 / 1024).toFixed(2)} МБ</div>}<button className="button button-primary upload-submit" disabled={!receiptFile || uploading} onClick={uploadReceipt}>{uploading ? "Отправляем…" : "Я оплатил — отправить"}</button></div>
      </div>
    </> : <div className="payment-done-card card"><span className="payment-done-icon"><CheckCircle2 /></span><h3>Сейчас всё в порядке</h3><p>Новых счетов к оплате нет. Здесь останется история ваших платежей.</p></div>}

    {history.length > 0 && <section className="payment-history"><div className="section-simple-heading"><h3>История счетов</h3><span>{history.length}</span></div><div className="payment-history-list">{history.map((invoice) => <article className="payment-history-row card" key={invoice.id}><div><strong>{invoice.title}</strong><span>{invoice.id} · {formatShortDate(invoice.createdAt)}</span>{invoice.receiptName && <small className="invoice-receipt-name">Чек отправлен: {invoice.receiptName}</small>}</div><strong>{formatMoney(invoice.amount)}</strong><StatusBadge status={invoice.status} /></article>)}</div></section>}
  </>;
}

function ReceiptUploadOverlay({ stage, seconds, total, error, onClose, onRetry }: { stage: ReceiptFlow; seconds: number; total: number; error: string; onClose: () => void; onRetry: () => void }) {
  const isUploading = stage === "uploading";
  const isSuccess = stage === "success";
  const progress = isSuccess || stage === "error" ? 100 : Math.max(8, Math.min(94, Math.round(((total - seconds) / total) * 100)));
  return <div className="receipt-flow-overlay" role="status" aria-live="polite">
    <div className={`receipt-flow-card ${isSuccess ? "is-success" : stage === "error" ? "is-error" : ""}`}>
      {isUploading && <div className="receipt-flow-orbit"><span className="loader" /></div>}
      {isSuccess && <span className="receipt-flow-check"><Check size={42} /></span>}
      {stage === "error" && <span className="receipt-flow-error"><X size={42} /></span>}
      <span className="receipt-flow-kicker">{isUploading ? "Платёж" : isSuccess ? "Готово" : "Не получилось"}</span>
      <h2>{isUploading ? "Отправляем чек" : isSuccess ? "Чек отправлен" : "Чек не отправился"}</h2>
      <p>{isUploading ? (seconds > 1 ? `Обычно осталось около ${seconds} секунд. Не закрывайте кабинет.` : "Почти готово. Проверяем файл…") : isSuccess ? "Счёт отмечен как «Ожидает подтверждения». Мы проверим платёж и обновим статус." : error}</p>
      <div className="receipt-flow-progress"><span style={{ width: `${progress}%` }} /></div>
      {isUploading && <span className="receipt-flow-caption">Шаг 1 из 2 · сохраняем файл в защищённое хранилище</span>}
      {isSuccess && <button className="button button-primary" onClick={onClose}>Вернуться к счетам</button>}
      {stage === "error" && <div className="receipt-flow-actions"><button className="button button-primary" onClick={onRetry}>Попробовать ещё раз</button><button className="button button-ghost" onClick={onClose}>Закрыть</button></div>}
    </div>
  </div>;
}

function OffersView({ project, services }: { project: Project; services: DashboardData["services"] }) {
  const priceLabel = (service: DashboardData["services"][number]) => service.priceMode === "request"
    ? "по запросу"
    : `${service.priceMode === "from" ? "от " : ""}${formatMoney(service.price ?? 0)}`;

  const activeServices = services.filter((item) => item.active);

  return <>
    <div className="view-heading client-view-heading">
      <div><span className="dashboard-card-label">Дополнительные услуги</span><h2>Что можно добавить к проекту</h2><p>Выберите нужную возможность — в Telegram откроется готовое сообщение.</p></div>
    </div>
    <div className="offers-grid">
      {activeServices.length ? activeServices.map((service, index) => <article className="offer-card card" key={service.id}>
        <span className="offer-icon">{index === 0 ? <Send /> : index === 1 ? <FolderKanban /> : <Rocket />}</span>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <div className="offer-bottom">
          <span className="offer-price">{priceLabel(service)}</span>
          <a className="button button-primary button-small" href={`${siteConfig.contacts.telegramUrl}?text=${encodeURIComponent(`Здравствуйте. Хочу обсудить услугу «${service.title}» для проекта ${project.id}.`)}`} target="_blank" rel="noreferrer">{service.buttonLabel}</a>
        </div>
      </article>) : <div className="card"><EmptyState title="Услуги скоро появятся" text="Если нужна доработка уже сейчас, напишите Ярославу в Telegram." /></div>}
    </div>
  </>;
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return <div className="empty-state"><FileText size={30} /><h3>{title}</h3><p>{text}</p></div>;
}
