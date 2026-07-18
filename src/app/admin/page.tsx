"use client";

import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  CircleDollarSign,
  ClipboardList,
  Copy,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/config/site";
import { colddevApi } from "@/lib/api";
import { formatDate, formatMoney, formatShortDate } from "@/lib/format";
import type {
  AdminSnapshot,
  AdvertisingReport,
  Client,
  Invoice,
  PortfolioItem,
  Project,
  ProjectStage,
  ProjectUpdate,
  ServiceOffer,
} from "@/types";

type AdminSection = "overview" | "clients" | "projects" | "stages" | "updates" | "ads" | "invoices" | "services" | "content";
type AdminEntity = Exclude<AdminSection, "overview" | "content"> | "portfolio" | "cases";

const navigationGroups: Array<{ label: string; items: Array<{ id: AdminSection; label: string; icon: typeof LayoutDashboard }> }> = [
  {
    label: "Главное",
    items: [
      { id: "overview", label: "Главная", icon: LayoutDashboard },
      { id: "clients", label: "Клиенты", icon: Users },
      { id: "projects", label: "Проекты", icon: FolderKanban },
    ],
  },
  {
    label: "Работа по проектам",
    items: [
      { id: "stages", label: "Этапы", icon: ClipboardList },
      { id: "updates", label: "Новости для клиента", icon: Activity },
      { id: "ads", label: "Отчёты по рекламе", icon: BarChart3 },
      { id: "invoices", label: "Счета и оплаты", icon: CircleDollarSign },
    ],
  },
  {
    label: "Сайт COLDDEV",
    items: [
      { id: "services", label: "Дополнительные услуги", icon: Sparkles },
      { id: "content", label: "Работы и кейсы", icon: BriefcaseBusiness },
    ],
  },
];

const allSections = navigationGroups.flatMap((group) => group.items);
const entityLabels: Record<AdminEntity, string> = {
  clients: "клиента",
  projects: "проект",
  stages: "этап",
  updates: "новость",
  ads: "отчёт по рекламе",
  invoices: "счёт",
  services: "услугу",
  portfolio: "работу",
  cases: "кейс",
};

const createSuccessMessages: Record<AdminEntity, string> = {
  clients: "Клиент добавлен",
  projects: "Проект добавлен",
  stages: "Этап добавлен",
  updates: "Новость добавлена",
  ads: "Отчёт добавлен",
  invoices: "Счёт добавлен",
  services: "Услуга добавлена",
  portfolio: "Работа добавлена",
  cases: "Кейс добавлен",
};

export default function AdminPage() {
  const [credential, setCredential] = useState("");
  const [snapshot, setSnapshot] = useState<AdminSnapshot | null>(null);
  const [section, setSection] = useState<AdminSection>("overview");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modal, setModal] = useState<{ entity: AdminEntity; item?: Record<string, unknown> } | null>(null);
  const [modalError, setModalError] = useState("");
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [newProjectAccess, setNewProjectAccess] = useState<{ projectId: string; accessCode: string; projectName: string } | null>(null);
  const [toast, setToast] = useState("");

  const authenticate = async (value: string) => {
    setAuthError("");
    setAuthLoading(true);
    try {
      const data = await colddevApi.getAdminSnapshot(value);
      sessionStorage.setItem("colddev.adminCredential", value);
      setCredential(value);
      setSnapshot(data);
    } catch (error) {
      sessionStorage.removeItem("colddev.adminCredential");
      setAuthError(error instanceof Error ? error.message : "Не удалось проверить аккаунт");
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("colddev.adminCredential");
    const timer = window.setTimeout(() => {
      if (stored) {
        void authenticate(stored);
      } else {
        setAuthLoading(false);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (snapshot || authLoading || !siteConfig.googleClientId) return;

    const renderGoogleButton = () => {
      const target = document.getElementById("google-admin-button");
      if (!target || !window.google) return;
      target.replaceChildren();
      window.google.accounts.id.initialize({
        client_id: siteConfig.googleClientId,
        callback: (response) => void authenticate(response.credential),
      });
      window.google.accounts.id.renderButton(target, { theme: "outline", size: "large", width: 300, text: "signin_with" });
    };

    if (window.google) {
      renderGoogleButton();
      return;
    }

    let script = document.getElementById("google-identity-script") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "google-identity-script";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", renderGoogleButton);
    return () => script?.removeEventListener("load", renderGoogleButton);
  }, [snapshot, authLoading]);

  const logout = () => {
    sessionStorage.removeItem("colddev.adminCredential");
    setSnapshot(null);
    setCredential("");
    setAuthError("");
  };

  const openModal = (entity: AdminEntity, item?: Record<string, unknown>) => {
    setModalError("");
    setModal({ entity, item });
  };

  const saveEntity = async (entity: AdminEntity, values: Record<string, unknown>, original?: Record<string, unknown>) => {
    if (saving || !snapshot) return;
    setSaving(true);
    setModalError("");

    try {
      const payload: Record<string, unknown> = original ? { ...original, ...values } : { ...values };
      let generatedAccessCode = "";

      if (!original && entity === "clients") {
        payload.id = nextReadableId("CL", snapshot.clients.map((item) => item.id));
      }
      if (!original && entity === "projects") {
        payload.id = nextReadableId("CD", snapshot.projects.map((item) => item.id));
        generatedAccessCode = createAccessCode();
        payload.accessCode = generatedAccessCode;
      }

      const result = await colddevApi.adminMutation(credential, entity, original ? "update" : "create", payload);
      const savedValue: Record<string, unknown> = { ...payload, id: String(result.id ?? payload.id ?? "") };

      setSnapshot((current) => current ? applyLocalMutation(current, entity, savedValue) : current);
      setModal(null);

      if (entity === "projects" && generatedAccessCode) {
        setNewProjectAccess({
          projectId: String(savedValue.id),
          accessCode: generatedAccessCode,
          projectName: String(savedValue.title ?? "Новый проект"),
        });
      } else {
        setToast(original ? "Изменения сохранены" : createSuccessMessages[entity]);
      }

      setRefreshing(true);
      colddevApi.getAdminSnapshot(credential)
        .then((data) => setSnapshot(data))
        .catch(() => undefined)
        .finally(() => setRefreshing(false));
    } catch (error) {
      setModalError(error instanceof Error ? error.message : "Не удалось сохранить. Попробуйте ещё раз.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  if (!snapshot) {
    return <AdminAuth error={authError} loading={authLoading} />;
  }

  const activeLabel = allSections.find((item) => item.id === section)?.label;
  return (
    <main className="product-page">
      <div className="product-shell admin-shell">
        <aside className={`product-sidebar admin-sidebar ${sidebarOpen ? "is-open" : ""}`}>
          <div className="sidebar-top"><Logo /><button className="mobile-nav-toggle" aria-label="Закрыть меню" onClick={() => setSidebarOpen(false)}><X size={17} /></button></div>
          <nav className="admin-navigation" aria-label="Разделы админки">
            {navigationGroups.map((group) => (
              <div className="admin-nav-group" key={group.label}>
                <span>{group.label}</span>
                <div className="product-nav">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return <button className={section === item.id ? "is-active" : ""} onClick={() => { setSection(item.id); setSidebarOpen(false); }} key={item.id}><Icon />{item.label}</button>;
                  })}
                </div>
              </div>
            ))}
          </nav>
          <div className="sidebar-bottom"><button className="sidebar-logout" onClick={logout}><LogOut size={13} /> Выйти из админки</button></div>
        </aside>

        <section className="product-main">
          <header className="product-topbar">
            <div><h1>{activeLabel}</h1><p>Управление COLDDEV · {siteConfig.adminEmail}</p></div>
            <div className="topbar-actions">
              <button className="mobile-nav-toggle" aria-label="Открыть меню" onClick={() => setSidebarOpen(true)}><Menu size={18} /></button>
              <span className={`sync-status ${refreshing ? "is-syncing" : ""}`}>{refreshing && <span className="button-spinner" />}{refreshing ? "Обновляем данные" : "Данные актуальны"}</span>
            </div>
          </header>

          <div className="product-content admin-view-enter" key={section}>
            {section === "overview" && <AdminOverview snapshot={snapshot} onCreateClient={() => openModal("clients")} onCreateProject={() => openModal("projects")} onCreateStage={() => openModal("stages")} onCreateUpdate={() => openModal("updates")} onCreateInvoice={() => openModal("invoices")} />}
            {section === "clients" && <ClientsSection snapshot={snapshot} onCreate={() => openModal("clients")} onEdit={(item) => openModal("clients", item)} />}
            {section === "projects" && <ProjectsSection snapshot={snapshot} onCreate={() => openModal("projects")} onEdit={(item) => openModal("projects", item)} />}
            {section === "stages" && <EditableListSection title="Этапы проектов" description="Покажите клиенту, из каких понятных шагов состоит работа." addLabel="Добавить этап" icon={<ClipboardList />} items={snapshot.stages} getTitle={(item) => item.title} getMeta={(item) => `${projectName(snapshot, item.projectId)} · ${stageStatusLabel(item.status)}`} getDetail={(item) => item.description} onCreate={() => openModal("stages")} onEdit={(item) => openModal("stages", item as unknown as Record<string, unknown>)} />}
            {section === "updates" && <EditableListSection title="Новости для клиента" description="Коротко сообщайте, что сделано и что изменилось в проекте." addLabel="Добавить новость" icon={<Activity />} items={snapshot.updates} getTitle={(item) => item.title} getMeta={(item) => `${projectName(snapshot, item.projectId)} · ${formatDate(item.date)}`} getDetail={(item) => item.description} onCreate={() => openModal("updates")} onEdit={(item) => openModal("updates", item as unknown as Record<string, unknown>)} />}
            {section === "ads" && <EditableListSection title="Отчёты по рекламе" description="Отдельная форма только для цифр и результатов Яндекс Директа." addLabel="Добавить отчёт" icon={<BarChart3 />} items={snapshot.reports} getTitle={(item) => item.period} getMeta={(item) => projectName(snapshot, item.projectId)} getDetail={(item) => `${item.leads} заявок · ${formatMoney(item.spend)} расходов · ${item.clicks} кликов`} onCreate={() => openModal("ads")} onEdit={(item) => openModal("ads", item as unknown as Record<string, unknown>)} />}
            {section === "invoices" && <EditableListSection title="Счета и оплаты" description="Выставляйте сумму, срок и меняйте статус после проверки чека." addLabel="Выставить счёт" icon={<CircleDollarSign />} items={snapshot.invoices} getTitle={(item) => item.title} getMeta={(item) => `${projectName(snapshot, item.projectId)} · оплатить до ${formatDate(item.dueAt)}`} getDetail={(item) => `${formatMoney(item.amount)} · ${item.status}${item.receiptName ? ` · чек: ${item.receiptName}` : ""}`} getLink={(item) => item.receiptUrl} onCreate={() => openModal("invoices")} onEdit={(item) => openModal("invoices", item as unknown as Record<string, unknown>)} />}
            {section === "services" && <ServicesSection snapshot={snapshot} onCreate={() => openModal("services")} onEdit={(item) => openModal("services", item)} />}
            {section === "content" && <ContentSection snapshot={snapshot} onCreate={(kind) => openModal(kind)} onEdit={(entity, item) => openModal(entity, item)} />}
          </div>
        </section>
      </div>

      {modal && <EntityModal entity={modal.entity} item={modal.item} snapshot={snapshot} saving={saving} error={modalError} onClose={() => !saving && setModal(null)} onSave={(values) => saveEntity(modal.entity, values, modal.item)} />}
      {newProjectAccess && <ProjectAccessModal credentials={newProjectAccess} onClose={() => setNewProjectAccess(null)} />}
      {toast && <div className="toast" role="status"><Check size={17} /> <div><strong>Готово</strong><span>{toast}</span></div></div>}
    </main>
  );
}

function AdminAuth({ error, loading }: { error: string; loading: boolean }) {
  return <main className="product-page"><div className="google-auth-card card"><Logo />{loading ? <div className="admin-auth-loading" role="status"><span className="loader" /><h1>Открываем админку</h1><p>Проверяем Google-аккаунт и загружаем данные. Обычно это занимает несколько секунд.</p></div> : <><h1>Вход в админку</h1><p>Войдите через {siteConfig.adminEmail}. После проверки откроются клиенты, проекты и оплаты.</p>{error && <div className="auth-error">{error}</div>}{siteConfig.apiUrl ? <div id="google-admin-button" className="google-button-wrap" /> : <div className="auth-setup-note">Подключите Google Apps Script, чтобы открыть рабочую админку.</div>}</>}</div></main>;
}

function AdminOverview({ snapshot, onCreateClient, onCreateProject, onCreateStage, onCreateUpdate, onCreateInvoice }: { snapshot: AdminSnapshot; onCreateClient: () => void; onCreateProject: () => void; onCreateStage: () => void; onCreateUpdate: () => void; onCreateInvoice: () => void }) {
  const unpaid = snapshot.invoices.filter((item) => item.status === "Ожидает оплаты" || item.status === "Ожидает подтверждения").length;
  const steps = [
    { label: "Клиент", done: snapshot.clients.length > 0, action: onCreateClient, actionLabel: "Добавить" },
    { label: "Проект", done: snapshot.projects.length > 0, action: onCreateProject, actionLabel: "Создать" },
    { label: "Этапы", done: snapshot.stages.length > 0, action: onCreateStage, actionLabel: "Добавить" },
    { label: "Обновления", done: snapshot.updates.length > 0, action: onCreateUpdate, actionLabel: "Опубликовать" },
  ];
  const next = steps.find((step) => !step.done) ?? { label: "Следующий шаг", done: true, action: onCreateUpdate, actionLabel: "Добавить обновление" };
  return <>
    <div className="view-heading"><div><span className="eyebrow">Маршрут администратора</span><h2>Ведите проект по шагам</h2><p>Сначала клиент, потом проект. Остальное появляется по ходу работы.</p></div></div>
    <section className="admin-next-action card"><div><span className="admin-step-kicker">Ваш следующий шаг</span><h3>{next.done ? "Проект уже ведётся" : `${next.label}: ${next.actionLabel.toLowerCase()}`}</h3><p>{next.done ? "Добавляйте новости, отчёты и счета по мере работы." : `Сейчас нужно: ${next.label.toLowerCase()}.`}</p></div><button className="button button-primary" onClick={next.action}>{next.done ? "Добавить обновление" : next.actionLabel} <ArrowRight size={16} /></button></section>
    <section className="admin-path" aria-label="Путь создания проекта">{steps.map((step, index) => <div className={`admin-path-step ${step.done ? "is-done" : index === steps.findIndex((item) => !item.done) ? "is-current" : ""}`} key={step.label}><span>{step.done ? <Check size={15} /> : index + 1}</span><strong>{step.label}</strong><small>{step.done ? "Готово" : index === steps.findIndex((item) => !item.done) ? "Сейчас" : "Дальше"}</small>{!step.done && index === steps.findIndex((item) => !item.done) && <button onClick={step.action}>{step.actionLabel}</button>}</div>)}</section>
    <div className="admin-kpis admin-kpis-compact"><div className="admin-kpi card"><span>Клиенты</span><strong>{snapshot.clients.length}</strong></div><div className="admin-kpi card"><span>Проекты</span><strong>{snapshot.projects.length}</strong></div><div className="admin-kpi card"><span>Проверить оплату</span><strong>{unpaid}</strong></div><button className="admin-kpi admin-kpi-action card" onClick={onCreateInvoice}><span>Новый счёт</span><strong><Plus size={19} /></strong></button></div>
    <div className="card admin-activity-card"><div className="card-heading"><h3>Последняя активность</h3><span>Система</span></div>{snapshot.activity.length ? <div className="activity-list">{snapshot.activity.slice(0, 5).map((item) => <div className="activity-row" key={item.id}><span className="activity-icon"><Activity size={15} /></span><div><strong>{item.title}</strong><span>{item.detail}</span></div><time>{formatShortDate(item.date)}</time></div>)}</div> : <EmptyInline text="Здесь появятся сохранённые действия." />}</div>
  </>;
}

function ClientsSection({ snapshot, onCreate, onEdit }: { snapshot: AdminSnapshot; onCreate: () => void; onEdit: (item: Record<string, unknown>) => void }) {
  const [query, setQuery] = useState("");
  const rows = snapshot.clients.filter((item) => `${item.name} ${item.company} ${item.id}`.toLowerCase().includes(query.toLowerCase()));
  return <><SectionHeading title="Клиенты" description="Сначала добавьте клиента, затем создайте для него один или несколько проектов." action="Добавить клиента" onAction={onCreate} /><div className="admin-toolbar"><label className="search-box"><Search size={15} /><input aria-label="Поиск клиентов" placeholder="Имя, компания или ID" value={query} onChange={(event) => setQuery(event.target.value)} /></label><span>{rows.length} из {snapshot.clients.length}</span></div>{rows.length ? <div className="card data-table-wrap"><table className="data-table"><thead><tr><th>Клиент</th><th>Контакты</th><th>Проекты</th><th>Статус</th><th><span className="sr-only">Действия</span></th></tr></thead><tbody>{rows.map((item) => <tr key={item.id}><td><strong>{item.company}</strong><small>{item.id} · {item.name}</small></td><td><strong>{item.telegram || "Telegram не указан"}</strong><small>{item.email || item.phone || "Контакты не указаны"}</small></td><td><strong>{snapshot.projects.filter((project) => project.clientId === item.id).length}</strong><small>проектов</small></td><td><span className={`status-badge ${item.status === "Активен" ? "status-green" : "status-gray"}`}>{item.status}</span></td><td><button className="edit-button" onClick={() => onEdit(item as unknown as Record<string, unknown>)}><Pencil size={14} /> Изменить</button></td></tr>)}</tbody></table></div> : <EmptyAdminState title={query ? "Ничего не найдено" : "Клиентов пока нет"} text={query ? "Попробуйте другой запрос." : "Добавьте первого клиента — после этого сможете создать его проект."} action={query ? undefined : "Добавить клиента"} onAction={onCreate} />}</>;
}

function ProjectsSection({ snapshot, onCreate, onEdit }: { snapshot: AdminSnapshot; onCreate: () => void; onEdit: (item: Record<string, unknown>) => void }) {
  return <><SectionHeading title="Проекты" description="Здесь находятся статус, прогресс, сроки и то, что видит клиент." action="Создать проект" onAction={onCreate} />{snapshot.projects.length ? <div className="card data-table-wrap"><table className="data-table"><thead><tr><th>Проект</th><th>Клиент</th><th>Готовность</th><th>Срок</th><th>Статус</th><th><span className="sr-only">Действия</span></th></tr></thead><tbody>{snapshot.projects.map((item) => <tr key={item.id}><td><strong>{item.name}</strong><small>{item.id} · {item.type}</small></td><td>{snapshot.clients.find((client) => client.id === item.clientId)?.company ?? "Клиент не найден"}</td><td><strong>{item.progress}%</strong><div className="mini-progress"><i style={{ width: `${item.progress}%` }} /></div></td><td>{formatShortDate(item.deadline)}</td><td><span className="status-badge status-blue">{item.status}</span></td><td><button className="edit-button" onClick={() => onEdit(item as unknown as Record<string, unknown>)}><Pencil size={14} /> Изменить</button></td></tr>)}</tbody></table></div> : <EmptyAdminState title="Проектов пока нет" text={snapshot.clients.length ? "Создайте проект, задайте срок и получите данные для входа клиента." : "Сначала добавьте клиента, затем создайте его первый проект."} action={snapshot.clients.length ? "Создать проект" : undefined} onAction={onCreate} />}</>;
}

function EditableListSection<T extends { id: string }>({ title, description, addLabel, icon, items, getTitle, getMeta, getDetail, getLink, onCreate, onEdit }: { title: string; description: string; addLabel: string; icon: React.ReactNode; items: T[]; getTitle: (item: T) => string; getMeta: (item: T) => string; getDetail: (item: T) => string; getLink?: (item: T) => string | undefined; onCreate: () => void; onEdit: (item: T) => void }) {
  return <><SectionHeading title={title} description={description} action={addLabel} onAction={onCreate} />{items.length ? <div className="card admin-record-list">{items.map((item) => <article className="admin-record-row" key={item.id}><span className="activity-icon">{icon}</span><div><strong>{getTitle(item)}</strong><span>{getMeta(item)}</span><p>{getDetail(item) || "Комментарий не добавлен"}</p>{getLink?.(item) && <a className="record-link" href={getLink(item)} target="_blank" rel="noreferrer">Открыть чек <ArrowUpRight size={12} /></a>}</div><button className="edit-button" onClick={() => onEdit(item)}><Pencil size={14} /> Изменить</button></article>)}</div> : <EmptyAdminState title="Записей пока нет" text={description} action={addLabel} onAction={onCreate} />}</>;
}

function ServicesSection({ snapshot, onCreate, onEdit }: { snapshot: AdminSnapshot; onCreate: () => void; onEdit: (item: Record<string, unknown>) => void }) {
  return <><SectionHeading title="Дополнительные услуги" description="Эти предложения клиент видит внутри своего кабинета." action="Добавить услугу" onAction={onCreate} />{snapshot.services.length ? <div className="offers-grid">{snapshot.services.map((item) => <article className="offer-card card" key={item.id}><span className="offer-icon"><Sparkles /></span><span className={`content-state ${item.active ? "is-visible" : ""}`}>{item.active ? "Показывается" : "Скрыта"}</span><h3>{item.title}</h3><p>{item.description}</p><div className="offer-bottom"><span className="offer-price">{item.priceMode === "request" ? "по запросу" : `${item.priceMode === "from" ? "от " : ""}${formatMoney(item.price ?? 0)}`}</span><button className="edit-button" onClick={() => onEdit(item as unknown as Record<string, unknown>)}><Pencil size={14} /> Изменить</button></div></article>)}</div> : <EmptyAdminState title="Услуг пока нет" text="Добавьте предложения, которые можно заказать из клиентского кабинета." action="Добавить услугу" onAction={onCreate} />}</>;
}

function ContentSection({ snapshot, onCreate, onEdit }: { snapshot: AdminSnapshot; onCreate: (kind: "portfolio" | "cases") => void; onEdit: (entity: "portfolio" | "cases", item: Record<string, unknown>) => void }) {
  return <><div className="view-heading"><div><h2>Работы и кейсы</h2><p>Один раздел для всего контента, который показывается на главной странице.</p></div><div className="heading-actions"><button className="button button-ghost" onClick={() => onCreate("portfolio")}><Plus size={16} /> Добавить работу</button><button className="button button-primary" onClick={() => onCreate("cases")}><Plus size={16} /> Добавить кейс</button></div></div>{snapshot.portfolio.length ? <div className="portfolio-grid">{snapshot.portfolio.map((item) => <article className="portfolio-card admin-content-card" key={item.id}><div className={`project-art ${item.kind === "case" ? "project-art-two" : "project-art-one"}`}><span className="content-kind">{item.kind === "case" ? "Кейс" : "Работа"}</span><span className="art-label">{item.title}</span></div><div className="portfolio-meta"><div><span>{item.category} · {item.published ? "опубликовано" : "скрыто"}</span><h3>{item.result || item.description}</h3></div><button className="edit-button" onClick={() => onEdit(item.kind === "case" ? "cases" : "portfolio", item as unknown as Record<string, unknown>)}><Pencil size={14} /> Изменить</button></div></article>)}</div> : <EmptyAdminState title="Работ и кейсов пока нет" text="Добавьте материалы — они появятся на главной странице сайта." action="Добавить работу" onAction={() => onCreate("portfolio")} />}</>;
}

function SectionHeading({ title, description, action, onAction }: { title: string; description: string; action: string; onAction: () => void }) {
  return <div className="view-heading"><div><h2>{title}</h2><p>{description}</p></div><button className="button button-primary" onClick={onAction}><Plus size={16} /> {action}</button></div>;
}

function EntityModal({ entity, item, snapshot, saving, error, onClose, onSave }: { entity: AdminEntity; item?: Record<string, unknown>; snapshot: AdminSnapshot; saving: boolean; error: string; onClose: () => void; onSave: (values: Record<string, unknown>) => void }) {
  const [values, setValues] = useState<Record<string, string>>(() => initialFormValues(entity, item, snapshot));
  const update = (key: string, value: string) => setValues((current) => ({ ...current, [key]: value }));
  const needsProject = ["stages", "updates", "ads", "invoices"].includes(entity);
  const blocked = (entity === "projects" && !snapshot.clients.length) || (needsProject && !snapshot.projects.length);
  const mode = item ? "Редактирование" : "Новая запись";

  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (!saving && event.target === event.currentTarget) onClose(); }}><section className="modal admin-entity-modal" role="dialog" aria-modal="true" aria-labelledby="entity-modal-title">
    <div className="modal-header"><div><span>{mode}</span><h2 id="entity-modal-title">{item ? "Изменить" : "Добавить"} {entityLabels[entity]}</h2></div><button className="icon-button" disabled={saving} aria-label="Закрыть" onClick={onClose}><X size={15} /></button></div>
    <form className="modal-form" onSubmit={(event) => { event.preventDefault(); onSave({ ...values, id: item?.id }); }}>
      <p className="modal-explanation">{formExplanation(entity)}</p>
      {blocked && <div className="form-warning">{entity === "projects" ? "Сначала добавьте хотя бы одного клиента." : "Сначала создайте проект — запись должна быть к нему привязана."}</div>}
      {error && <div className="auth-error modal-error" role="alert">{error}</div>}
      <fieldset className="modal-fields" disabled={saving || blocked}>
        {entity === "clients" && <ClientFields values={values} update={update} />}
        {entity === "projects" && <ProjectFields values={values} update={update} snapshot={snapshot} editing={Boolean(item)} />}
        {entity === "stages" && <StageFields values={values} update={update} snapshot={snapshot} />}
        {entity === "updates" && <UpdateFields values={values} update={update} snapshot={snapshot} />}
        {entity === "ads" && <AdvertisingFields values={values} update={update} snapshot={snapshot} />}
        {entity === "invoices" && <InvoiceFields values={values} update={update} snapshot={snapshot} />}
        {entity === "services" && <ServiceFields values={values} update={update} />}
        {(entity === "portfolio" || entity === "cases") && <PortfolioFields values={values} update={update} />}
      </fieldset>
      <div className="modal-footer"><button type="button" className="button button-ghost" disabled={saving} onClick={onClose}>Отмена</button><button type="submit" className="button button-primary" disabled={saving || blocked}>{saving ? <><span className="button-spinner" /> Сохраняем…</> : item ? "Сохранить изменения" : `Добавить ${entityLabels[entity]}`}</button></div>
    </form>
    {saving && <div className="modal-saving-state" role="status"><span className="loader" /><strong>Сохраняем запись</strong><span>Подождите несколько секунд</span></div>}
  </section></div>;
}

type FormFieldsProps = { values: Record<string, string>; update: (key: string, value: string) => void };

function ClientFields({ values, update }: FormFieldsProps) {
  return <><Field label="Имя контактного лица" value={values.name} onChange={(value) => update("name", value)} placeholder="Например, Алексей" required /><Field label="Компания" value={values.company} onChange={(value) => update("company", value)} placeholder="Название бизнеса" required /><Field label="Telegram" value={values.telegram} onChange={(value) => update("telegram", value)} placeholder="@username" /><Field label="Телефон" value={values.phone} onChange={(value) => update("phone", value)} placeholder="+375 29 000-00-00" /><Field label="Email" value={values.email} onChange={(value) => update("email", value)} type="email" placeholder="mail@example.com" /><SelectField label="Доступ" value={values.status} onChange={(value) => update("status", value)} options={[{ value: "Активен", label: "Активен" }, { value: "Заблокирован", label: "Заблокирован" }]} /></>;
}

function ProjectFields({ values, update, snapshot, editing }: FormFieldsProps & { snapshot: AdminSnapshot; editing: boolean }) {
  return <><SelectField label="Клиент" value={values.clientId} onChange={(value) => update("clientId", value)} options={snapshot.clients.map((client) => ({ value: client.id, label: `${client.company} · ${client.name}` }))} required full /><Field label="Название проекта" value={values.title} onChange={(value) => update("title", value)} placeholder="Например, сайт для стоматологии" required full /><SelectField label="Тип проекта" value={values.type} onChange={(value) => update("type", value)} options={["Лендинг", "Корпоративный сайт", "Интернет-магазин", "Яндекс Директ", "Сайт + реклама", "Доработка сайта"].map((value) => ({ value, label: value }))} /><SelectField label="Статус" value={values.status} onChange={(value) => update("status", value)} options={["В работе", "На согласовании", "Приостановлен", "Завершён"].map((value) => ({ value, label: value }))} /><Field label="Готовность" value={values.progress} onChange={(value) => update("progress", value)} type="number" min="0" max="100" hint="От 0 до 100%" required /><Field label="Плановая дата" value={values.deadline} onChange={(value) => update("deadline", value)} type="date" required /><Field label="Что делаем сейчас" value={values.currentAction} onChange={(value) => update("currentAction", value)} placeholder="Один конкретный текущий шаг" required full /><TextArea label="Комментарий клиенту" value={values.managerComment} onChange={(value) => update("managerComment", value)} placeholder="Простыми словами: что сделано и что будет дальше" full /><Field label="Тестовая версия сайта" value={values.previewUrl} onChange={(value) => update("previewUrl", value)} type="url" placeholder="https://..." /><Field label="Рабочий сайт" value={values.siteUrl} onChange={(value) => update("siteUrl", value)} type="url" placeholder="https://..." />{editing && <Field label="Новый код доступа" value={values.accessCode} onChange={(value) => update("accessCode", value)} placeholder="Оставьте пустым, чтобы не менять" hint="Меняйте только если старый код нужно отключить." full />}</>;
}

function StageFields({ values, update, snapshot }: FormFieldsProps & { snapshot: AdminSnapshot }) {
  return <><ProjectSelect snapshot={snapshot} value={values.projectId} onChange={(value) => update("projectId", value)} /><Field label="Название этапа" value={values.title} onChange={(value) => update("title", value)} placeholder="Например, дизайн главной страницы" required full /><TextArea label="Что входит в этап" value={values.description} onChange={(value) => update("description", value)} placeholder="Короткое понятное описание для клиента" full /><SelectField label="Статус этапа" value={values.status} onChange={(value) => update("status", value)} options={[{ value: "waiting", label: "Ещё не начат" }, { value: "active", label: "Сейчас в работе" }, { value: "done", label: "Завершён" }, { value: "paused", label: "Приостановлен" }]} /><Field label="Порядок" value={values.order} onChange={(value) => update("order", value)} type="number" min="1" hint="1 — первый этап, 2 — второй" required /><Field label="Дата начала" value={values.startedAt} onChange={(value) => update("startedAt", value)} type="date" /><Field label="Дата завершения" value={values.completedAt} onChange={(value) => update("completedAt", value)} type="date" /></>;
}

function UpdateFields({ values, update, snapshot }: FormFieldsProps & { snapshot: AdminSnapshot }) {
  return <><ProjectSelect snapshot={snapshot} value={values.projectId} onChange={(value) => update("projectId", value)} /><Field label="Дата публикации" value={values.date} onChange={(value) => update("date", value)} type="date" required /><Field label="Заголовок новости" value={values.title} onChange={(value) => update("title", value)} placeholder="Например, готова мобильная версия" required full /><TextArea label="Что сделано" value={values.description} onChange={(value) => update("description", value)} placeholder="Напишите так, как сказали бы клиенту в сообщении" required full /><SelectField label="Раздел" value={values.category} onChange={(value) => update("category", value)} options={["Сайт", "Реклама", "Документы", "Общее"].map((value) => ({ value, label: value }))} /><Field label="Ссылка на результат" value={values.linkUrl} onChange={(value) => update("linkUrl", value)} type="url" placeholder="https://..." /><Field label="Ссылка на изображение" value={values.imageUrl} onChange={(value) => update("imageUrl", value)} type="url" placeholder="https://..." full /></>;
}

function AdvertisingFields({ values, update, snapshot }: FormFieldsProps & { snapshot: AdminSnapshot }) {
  return <><ProjectSelect snapshot={snapshot} value={values.projectId} onChange={(value) => update("projectId", value)} /><Field label="Период отчёта" value={values.period} onChange={(value) => update("period", value)} placeholder="Например, 1–31 июля" required /><Field label="Показы" value={values.impressions} onChange={(value) => update("impressions", value)} type="number" min="0" required /><Field label="Клики" value={values.clicks} onChange={(value) => update("clicks", value)} type="number" min="0" required /><Field label="Расход, BYN" value={values.spend} onChange={(value) => update("spend", value)} type="number" min="0" step="0.01" required /><Field label="Заявки" value={values.leads} onChange={(value) => update("leads", value)} type="number" min="0" required /><Field label="Остаток бюджета, BYN" value={values.budgetLeft} onChange={(value) => update("budgetLeft", value)} type="number" min="0" step="0.01" /><TextArea label="Комментарий к результатам" value={values.comment} onChange={(value) => update("comment", value)} placeholder="Что изменилось и что будем улучшать дальше" full /><Field label="Ссылка на скриншот" value={values.screenshotUrl} onChange={(value) => update("screenshotUrl", value)} type="url" placeholder="https://..." full /></>;
}

function InvoiceFields({ values, update, snapshot }: FormFieldsProps & { snapshot: AdminSnapshot }) {
  return <><ProjectSelect snapshot={snapshot} value={values.projectId} onChange={(value) => update("projectId", value)} /><SelectField label="Статус" value={values.status} onChange={(value) => update("status", value)} options={["Ожидает оплаты", "Ожидает подтверждения", "Оплачено", "Просрочено", "Отменено"].map((value) => ({ value, label: value }))} />{values.receiptName ? <div className="form-receipt-card field-full"><span>Чек клиента</span><strong>{values.receiptName}</strong>{values.receiptUrl ? <a href={values.receiptUrl} target="_blank" rel="noreferrer">Открыть чек <ArrowUpRight size={13} /></a> : <small>Файл сохранён в папке проекта Google Drive.</small>}</div> : values.status === "Ожидает подтверждения" ? <div className="form-warning field-full">Статус уже «Ожидает подтверждения», но файл чека не пришёл в данные. Попросите клиента отправить его ещё раз из раздела «Оплата».</div> : null}<Field label="За что оплата" value={values.title} onChange={(value) => update("title", value)} placeholder="Например, разработка сайта — второй этап" required full /><Field label="Сумма, BYN" value={values.amount} onChange={(value) => update("amount", value)} type="number" min="0" step="0.01" required /><Field label="Оплатить до" value={values.dueAt} onChange={(value) => update("dueAt", value)} type="date" required /><TextArea label="Комментарий к счёту" value={values.comment} onChange={(value) => update("comment", value)} placeholder="Необязательное пояснение для клиента" full /></>;
}

function ServiceFields({ values, update }: FormFieldsProps) {
  return <><Field label="Название услуги" value={values.title} onChange={(value) => update("title", value)} placeholder="Например, Telegram-бот" required full /><TextArea label="Польза для клиента" value={values.description} onChange={(value) => update("description", value)} placeholder="Что получит клиент после заказа" required full /><SelectField label="Как показывать цену" value={values.priceMode} onChange={(value) => update("priceMode", value)} options={[{ value: "fixed", label: "Точная цена" }, { value: "from", label: "Цена от" }, { value: "request", label: "По запросу" }]} /><Field label="Цена, BYN" value={values.price} onChange={(value) => update("price", value)} type="number" min="0" step="0.01" hint={values.priceMode === "request" ? "Можно оставить пустым" : undefined} required={values.priceMode !== "request"} /><Field label="Текст кнопки" value={values.buttonLabel} onChange={(value) => update("buttonLabel", value)} placeholder="Обсудить" /><Field label="Порядок" value={values.order} onChange={(value) => update("order", value)} type="number" min="1" /><SelectField label="Видимость" value={values.active} onChange={(value) => update("active", value)} options={[{ value: "true", label: "Показывать клиентам" }, { value: "false", label: "Скрыть" }]} /><Field label="Ссылка на изображение" value={values.imageUrl} onChange={(value) => update("imageUrl", value)} type="url" placeholder="https://..." /></>;
}

function PortfolioFields({ values, update }: FormFieldsProps) {
  return <><Field label="Название" value={values.title} onChange={(value) => update("title", value)} placeholder="Название проекта" required /><Field label="Категория" value={values.category} onChange={(value) => update("category", value)} placeholder="Сайт / реклама / бот" required /><TextArea label="Короткое описание" value={values.description} onChange={(value) => update("description", value)} placeholder="Что было сделано" required full /><Field label="Главный результат" value={values.result} onChange={(value) => update("result", value)} placeholder="Например, 42 заявки за месяц" required full /><Field label="Ссылка на проект" value={values.url} onChange={(value) => update("url", value)} type="url" placeholder="https://..." /><Field label="Ссылка на изображение" value={values.imageUrl} onChange={(value) => update("imageUrl", value)} type="url" placeholder="https://..." /><SelectField label="Публикация" value={values.published} onChange={(value) => update("published", value)} options={[{ value: "true", label: "Показывать на сайте" }, { value: "false", label: "Сохранить скрытым" }]} /><Field label="Порядок" value={values.order} onChange={(value) => update("order", value)} type="number" min="1" /></>;
}

function ProjectSelect({ snapshot, value, onChange }: { snapshot: AdminSnapshot; value: string; onChange: (value: string) => void }) {
  return <SelectField label="Проект" value={value} onChange={onChange} options={snapshot.projects.map((project) => ({ value: project.id, label: `${project.id} · ${project.name}` }))} required full />;
}

function Field({ label, value, onChange, type = "text", full = false, required = false, placeholder, hint, min, max, step }: { label: string; value: string; onChange: (value: string) => void; type?: string; full?: boolean; required?: boolean; placeholder?: string; hint?: string; min?: string; max?: string; step?: string }) {
  return <div className={`field ${full ? "field-full" : ""}`}><label>{label}{required && <em>обязательно</em>}</label><input type={type} value={value} required={required} placeholder={placeholder} min={min} max={max} step={step} onChange={(event) => onChange(event.target.value)} />{hint && <small>{hint}</small>}</div>;
}

function TextArea({ label, value, onChange, full = false, required = false, placeholder }: { label: string; value: string; onChange: (value: string) => void; full?: boolean; required?: boolean; placeholder?: string }) {
  return <div className={`field ${full ? "field-full" : ""}`}><label>{label}{required && <em>обязательно</em>}</label><textarea value={value} required={required} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></div>;
}

function SelectField({ label, value, onChange, options, full = false, required = false }: { label: string; value: string; onChange: (value: string) => void; options: Array<{ value: string; label: string }>; full?: boolean; required?: boolean }) {
  return <div className={`field ${full ? "field-full" : ""}`}><label>{label}{required && <em>обязательно</em>}</label><select value={value} required={required} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>;
}

function EmptyAdminState({ title, text, action, onAction }: { title: string; text: string; action?: string; onAction: () => void }) {
  return <div className="empty-state card"><FolderKanban /><h3>{title}</h3><p>{text}</p>{action && <button className="button button-primary" onClick={onAction}><Plus size={16} /> {action}</button>}</div>;
}

function EmptyInline({ text }: { text: string }) {
  return <div className="empty-inline"><Check size={18} /><span>{text}</span></div>;
}

function ProjectAccessModal({ credentials, onClose }: { credentials: { projectId: string; accessCode: string; projectName: string }; onClose: () => void }) {
  const [copied, setCopied] = useState("");
  const copy = async (label: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
  };

  return <div className="modal-backdrop"><section className="modal access-result-modal" role="dialog" aria-modal="true" aria-labelledby="access-result-title"><div className="modal-header"><div><span>Готово</span><h2 id="access-result-title">Проект создан</h2></div><button className="icon-button" onClick={onClose}><X size={15} /></button></div><div className="access-result-content"><span className="admin-mode">ДАННЫЕ ДЛЯ ВХОДА КЛИЕНТА</span><h3>{credentials.projectName}</h3><p>Отправьте клиенту ID и код. Код показывается один раз — в таблице хранится только защищённая версия.</p><div className="access-result-row"><div><span>ID проекта</span><strong>{credentials.projectId}</strong></div><button onClick={() => copy("ID", credentials.projectId)}><Copy size={16} />{copied === "ID" ? "Скопировано" : "Копировать"}</button></div><div className="access-result-row"><div><span>Код доступа</span><strong>{credentials.accessCode}</strong></div><button onClick={() => copy("Код", credentials.accessCode)}><Copy size={16} />{copied === "Код" ? "Скопировано" : "Копировать"}</button></div><button className="button button-primary" onClick={onClose}>Готово, данные сохранены</button></div></section></div>;
}

function initialFormValues(entity: AdminEntity, item: Record<string, unknown> | undefined, snapshot: AdminSnapshot) {
  const today = dateInput(new Date());
  const due = dateInput(new Date(Date.now() + 14 * 86400000));
  const deadline = dateInput(new Date(Date.now() + 30 * 86400000));
  const defaultStatus = entity === "clients" ? "Активен" : entity === "projects" ? "В работе" : entity === "stages" ? "waiting" : entity === "invoices" ? "Ожидает оплаты" : "";
  return {
    title: String(item?.title ?? item?.name ?? ""),
    name: String(item?.name ?? ""),
    company: String(item?.company ?? ""),
    phone: String(item?.phone ?? ""),
    telegram: String(item?.telegram ?? ""),
    email: String(item?.email ?? ""),
    status: String(item?.status ?? defaultStatus),
    type: String(item?.type ?? "Корпоративный сайт"),
    clientId: String(item?.clientId ?? snapshot.clients[0]?.id ?? ""),
    projectId: String(item?.projectId ?? snapshot.projects[0]?.id ?? ""),
    progress: String(item?.progress ?? "0"),
    deadline: inputDateValue(item?.deadline, deadline),
    currentAction: String(item?.currentAction ?? ""),
    managerComment: String(item?.managerComment ?? ""),
    previewUrl: String(item?.previewUrl ?? ""),
    siteUrl: String(item?.siteUrl ?? ""),
    accessCode: "",
    description: String(item?.description ?? ""),
    order: String(item?.order ?? "1"),
    startedAt: inputDateValue(item?.startedAt),
    completedAt: inputDateValue(item?.completedAt),
    date: inputDateValue(item?.date, today),
    category: String(item?.category ?? "Общее"),
    imageUrl: String(item?.imageUrl ?? ""),
    linkUrl: String(item?.linkUrl ?? ""),
    period: String(item?.period ?? ""),
    impressions: String(item?.impressions ?? "0"),
    clicks: String(item?.clicks ?? "0"),
    spend: String(item?.spend ?? "0"),
    leads: String(item?.leads ?? "0"),
    budgetLeft: String(item?.budgetLeft ?? "0"),
    comment: String(item?.comment ?? ""),
    screenshotUrl: String(item?.screenshotUrl ?? ""),
    amount: String(item?.amount ?? ""),
    receiptName: String(item?.receiptName ?? ""),
    receiptUrl: String(item?.receiptUrl ?? ""),
    createdAt: inputDateValue(item?.createdAt, today),
    dueAt: inputDateValue(item?.dueAt, due),
    price: String(item?.price ?? ""),
    priceMode: String(item?.priceMode ?? "fixed"),
    buttonLabel: String(item?.buttonLabel ?? "Обсудить"),
    active: String(item?.active ?? true),
    result: String(item?.result ?? ""),
    url: String(item?.url ?? ""),
    published: String(item?.published ?? true),
  };
}

function formExplanation(entity: AdminEntity) {
  const copy: Record<AdminEntity, string> = {
    clients: "Контакты нужны только вам. После сохранения создайте для клиента проект.",
    projects: "Эту информацию клиент увидит в своём кабинете. Пишите простыми словами.",
    stages: "Этап отвечает на вопрос клиента: из каких шагов состоит работа и какой шаг идёт сейчас.",
    updates: "Новость появится в ленте проекта и покажет клиенту конкретный результат работы.",
    ads: "Заполните показатели за один период. Цена заявки будет рассчитана в кабинете автоматически.",
    invoices: "Реквизиты ЕРИП уже настроены. Здесь меняются только услуга, сумма, срок и статус.",
    services: "Карточка появится в разделе дополнительных услуг клиентского кабинета.",
    portfolio: "Работа появится в портфолио на главной странице.",
    cases: "Кейс показывает задачу и измеримый результат на главной странице.",
  };
  return copy[entity];
}

function nextReadableId(prefix: "CL" | "CD", ids: string[]) {
  const max = ids.reduce((current, id) => {
    const match = id.match(new RegExp(`^${prefix}-(\\d+)$`));
    return match ? Math.max(current, Number(match[1])) : current;
  }, 0);
  return `${prefix}-${String(max + 1).padStart(4, "0")}`;
}

function createAccessCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const random = crypto.getRandomValues(new Uint32Array(12));
  return Array.from(random, (value) => alphabet[value % alphabet.length]).join("").match(/.{1,4}/g)?.join("-") ?? "";
}

function applyLocalMutation(snapshot: AdminSnapshot, entity: AdminEntity, value: Record<string, unknown>): AdminSnapshot {
  const id = String(value.id ?? `${entity}-${Date.now()}`);
  if (entity === "clients") {
    const client: Client = { id, name: String(value.name ?? "Новый клиент"), company: String(value.company ?? "Новая компания"), phone: String(value.phone ?? ""), telegram: String(value.telegram ?? ""), email: String(value.email ?? ""), status: value.status === "Заблокирован" ? "Заблокирован" : "Активен", createdAt: String(value.createdAt ?? new Date().toISOString()) };
    return { ...snapshot, clients: upsert(snapshot.clients, client) };
  }
  if (entity === "projects") {
    const project: Project = { id, clientId: String(value.clientId ?? snapshot.clients[0]?.id), name: String(value.title ?? "Новый проект"), type: String(value.type ?? "Сайт"), status: (value.status as Project["status"]) ?? "В работе", progress: Number(value.progress ?? 0), startedAt: String(value.startedAt ?? new Date().toISOString()), deadline: String(value.deadline ?? ""), siteUrl: String(value.siteUrl ?? ""), previewUrl: String(value.previewUrl ?? ""), currentAction: String(value.currentAction ?? ""), managerComment: String(value.managerComment ?? ""), lastUpdatedAt: new Date().toISOString() };
    return { ...snapshot, projects: upsert(snapshot.projects, project) };
  }
  if (entity === "stages") {
    const stage: ProjectStage = { id, projectId: String(value.projectId), title: String(value.title), description: String(value.description ?? ""), order: Number(value.order ?? 1), status: (value.status as ProjectStage["status"]) ?? "waiting", startedAt: String(value.startedAt ?? ""), completedAt: String(value.completedAt ?? "") };
    return { ...snapshot, stages: upsert(snapshot.stages, stage) };
  }
  if (entity === "updates") {
    const update: ProjectUpdate = { id, projectId: String(value.projectId), title: String(value.title), description: String(value.description ?? ""), date: String(value.date), category: (value.category as ProjectUpdate["category"]) ?? "Общее", imageUrl: String(value.imageUrl ?? ""), linkUrl: String(value.linkUrl ?? "") };
    return { ...snapshot, updates: upsert(snapshot.updates, update) };
  }
  if (entity === "ads") {
    const report: AdvertisingReport = { id, projectId: String(value.projectId), period: String(value.period), impressions: Number(value.impressions ?? 0), clicks: Number(value.clicks ?? 0), spend: Number(value.spend ?? 0), leads: Number(value.leads ?? 0), budgetLeft: Number(value.budgetLeft ?? 0), comment: String(value.comment ?? ""), screenshotUrl: String(value.screenshotUrl ?? "") };
    return { ...snapshot, reports: upsert(snapshot.reports, report) };
  }
  if (entity === "invoices") {
    const invoice: Invoice = { id, projectId: String(value.projectId), title: String(value.title), amount: Number(value.amount ?? 0), createdAt: String(value.createdAt ?? new Date().toISOString()), dueAt: String(value.dueAt ?? ""), status: (value.status as Invoice["status"]) ?? "Ожидает оплаты", comment: String(value.comment ?? "") };
    return { ...snapshot, invoices: upsert(snapshot.invoices, invoice) };
  }
  if (entity === "services") {
    const service: ServiceOffer = { id, title: String(value.title ?? "Новая услуга"), description: String(value.description ?? ""), price: value.price === "" ? null : Number(value.price), priceMode: (value.priceMode as ServiceOffer["priceMode"]) ?? "fixed", buttonLabel: String(value.buttonLabel ?? "Обсудить"), imageUrl: String(value.imageUrl ?? ""), active: String(value.active) !== "false", order: Number(value.order ?? snapshot.services.length + 1) };
    return { ...snapshot, services: upsert(snapshot.services, service) };
  }
  const portfolioItem: PortfolioItem = { id, kind: entity === "cases" ? "case" : "portfolio", title: String(value.title ?? "Новая работа"), category: String(value.category ?? "Проект"), description: String(value.description ?? ""), result: String(value.result ?? ""), imageUrl: String(value.imageUrl ?? ""), url: String(value.url ?? ""), published: String(value.published) !== "false", order: Number(value.order ?? snapshot.portfolio.length + 1) };
  return { ...snapshot, portfolio: upsert(snapshot.portfolio, portfolioItem) };
}

function upsert<T extends { id: string }>(items: T[], item: T) {
  return items.some((current) => current.id === item.id) ? items.map((current) => current.id === item.id ? { ...current, ...item } : current) : [item, ...items];
}

function projectName(snapshot: AdminSnapshot, projectId: string) {
  const project = snapshot.projects.find((item) => item.id === projectId);
  return project ? `${project.id} · ${project.name}` : projectId;
}

function stageStatusLabel(status: ProjectStage["status"]) {
  return { waiting: "не начат", active: "в работе", done: "завершён", paused: "приостановлен" }[status];
}

function dateInput(date: Date) {
  return date.toISOString().slice(0, 10);
}

function inputDateValue(value: unknown, fallback = "") {
  const result = String(value ?? "");
  return /^\d{4}-\d{2}-\d{2}/.test(result) ? result.slice(0, 10) : fallback;
}
