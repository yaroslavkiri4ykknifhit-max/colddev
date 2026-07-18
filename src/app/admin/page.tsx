"use client";

import {
  Activity,
  BarChart3,
  BriefcaseBusiness,
  Check,
  ChevronDown,
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
import { colddevApi } from "@/lib/api";
import { formatDate, formatMoney, formatShortDate } from "@/lib/format";
import type { AdminSnapshot, Client, PortfolioItem, Project, ServiceOffer } from "@/types";
import { siteConfig } from "@/config/site";

type AdminSection = "overview" | "clients" | "projects" | "stages" | "updates" | "ads" | "invoices" | "services" | "portfolio" | "cases";

const sections: Array<{ id: AdminSection; label: string; icon: typeof LayoutDashboard }> = [
  { id: "overview", label: "Обзор", icon: LayoutDashboard },
  { id: "clients", label: "Клиенты", icon: Users },
  { id: "projects", label: "Проекты", icon: FolderKanban },
  { id: "stages", label: "Этапы", icon: ClipboardList },
  { id: "updates", label: "Обновления", icon: Activity },
  { id: "ads", label: "Реклама", icon: BarChart3 },
  { id: "invoices", label: "Счета и оплаты", icon: CircleDollarSign },
  { id: "services", label: "Доп. услуги", icon: Sparkles },
  { id: "portfolio", label: "Портфолио", icon: BriefcaseBusiness },
  { id: "cases", label: "Кейсы", icon: BriefcaseBusiness },
];

export default function AdminPage() {
  const [credential, setCredential] = useState("");
  const [snapshot, setSnapshot] = useState<AdminSnapshot | null>(null);
  const [section, setSection] = useState<AdminSection>("overview");
  const [authError, setAuthError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modal, setModal] = useState<{ entity: AdminSection; item?: Record<string, unknown> } | null>(null);
  const [newProjectAccess, setNewProjectAccess] = useState<{ projectId: string; accessCode: string; projectName: string } | null>(null);
  const [toast, setToast] = useState("");

  const authenticate = async (value: string) => {
    setAuthError("");
    try {
      const data = await colddevApi.getAdminSnapshot(value);
      sessionStorage.setItem("colddev.adminCredential", value);
      setCredential(value);
      setSnapshot(data);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Не удалось проверить аккаунт");
    }
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("colddev.adminCredential");
    // The stored credential is an external browser session restored on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) authenticate(stored);
  }, []);

  useEffect(() => {
    if (snapshot || !siteConfig.googleClientId) return;
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      const target = document.getElementById("google-admin-button");
      if (target && window.google) {
        window.google.accounts.id.initialize({ client_id: siteConfig.googleClientId, callback: (response) => authenticate(response.credential) });
        window.google.accounts.id.renderButton(target, { theme: "outline", size: "large", width: 300, text: "signin_with" });
      }
    };
    document.head.appendChild(script);
  }, [snapshot]);

  const logout = () => {
    sessionStorage.removeItem("colddev.adminCredential");
    setSnapshot(null);
    setCredential("");
  };

  const saveEntity = async (entity: AdminSection, values: Record<string, unknown>, original?: Record<string, unknown>) => {
    try {
      const payload: Record<string, unknown> = original ? { ...original, ...values } : { ...values };
      let generatedAccessCode = "";

      if (!original && snapshot && entity === "clients") {
        payload.id = nextReadableId("CL", snapshot.clients.map((item) => item.id));
      }

      if (!original && snapshot && entity === "projects") {
        payload.id = nextReadableId("CD", snapshot.projects.map((item) => item.id));
        generatedAccessCode = createAccessCode();
        payload.accessCode = generatedAccessCode;
      }

      const result = await colddevApi.adminMutation(credential, entity, original ? "update" : "create", payload);
      const savedValue: Record<string, unknown> = { ...payload, id: String(result.id ?? payload.id ?? "") };

      if (snapshot) {
        try {
          setSnapshot(await colddevApi.getAdminSnapshot(credential));
        } catch {
          setSnapshot(applyLocalMutation(snapshot, entity, savedValue));
        }
      }

      setModal(null);
      if (entity === "projects" && generatedAccessCode) {
        setNewProjectAccess({
          projectId: String(savedValue.id),
          accessCode: generatedAccessCode,
          projectName: String(savedValue.title ?? "Новый проект"),
        });
      } else {
        setToast("Изменения сохранены");
      }
    } catch (error) {
      setToast(error instanceof Error ? error.message : "Не удалось сохранить изменения");
    }
  };

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  if (!snapshot) {
    return <AdminAuth error={authError} />;
  }

  const activeLabel = sections.find((item) => item.id === section)?.label;
  return (
    <main className="product-page">
      <div className="product-shell admin-shell">
        <aside className={`product-sidebar admin-sidebar ${sidebarOpen ? "is-open" : ""}`}>
          <div className="sidebar-top"><Logo /><button className="mobile-nav-toggle" onClick={() => setSidebarOpen(false)}><X size={17} /></button></div>
          <span className="admin-mode">ADMIN / GOOGLE AUTH</span>
          <nav className="product-nav" style={{marginTop: 18}}>
            {sections.map((item) => { const Icon = item.icon; return <button className={section === item.id ? "is-active" : ""} onClick={() => {setSection(item.id);setSidebarOpen(false);}} key={item.id}><Icon />{item.label}</button>; })}
          </nav>
          <div className="sidebar-bottom"><button className="sidebar-logout" style={{color:"#9a9ea7"}} onClick={logout}><LogOut size={13} /> Выйти из админки</button></div>
        </aside>
        <section className="product-main">
          <header className="product-topbar"><div><h1>{activeLabel}</h1><p>Управление COLDDEV · {siteConfig.adminEmail}</p></div><div className="topbar-actions"><button className="mobile-nav-toggle" onClick={() => setSidebarOpen(true)}><Menu size={18} /></button><span className="admin-mode">GOOGLE SHEETS / LIVE</span></div></header>
          <div className="product-content">
            {section === "overview" && <AdminOverview snapshot={snapshot} setSection={setSection} />}
            {section === "clients" && <ClientsSection snapshot={snapshot} onCreate={() => setModal({entity:"clients"})} onEdit={(item) => setModal({entity:"clients", item})} />}
            {section === "projects" && <ProjectsSection snapshot={snapshot} onCreate={() => setModal({entity:"projects"})} onEdit={(item) => setModal({entity:"projects", item})} />}
            {section === "stages" && <AdminListSection title="Этапы проектов" description="Настройка последовательности и статусов работ" icon={<ClipboardList />} rows={snapshot.stages.map((item) => ({id:item.id, title:item.title, subtitle:`${item.projectId} · ${item.status}`, detail:item.description}))} onCreate={() => setModal({entity:"stages"})} onEdit={(item) => setModal({entity:"stages", item})} />}
            {section === "updates" && <AdminListSection title="Обновления" description="Публикации, которые видит клиент в ленте проекта" icon={<Activity />} rows={snapshot.updates.map((item) => ({id:item.id, title:item.title, subtitle:`${item.projectId} · ${formatDate(item.date)}`, detail:item.description}))} onCreate={() => setModal({entity:"updates"})} onEdit={(item) => setModal({entity:"updates", item})} />}
            {section === "ads" && <AdminListSection title="Рекламные отчёты" description="Периодические показатели Яндекс Директа" icon={<BarChart3 />} rows={snapshot.reports.map((item) => ({id:item.id, title:item.period, subtitle:item.projectId, detail:`${item.leads} заявок · ${formatMoney(item.spend)} расходов`}))} onCreate={() => setModal({entity:"ads"})} onEdit={(item) => setModal({entity:"ads", item})} />}
            {section === "invoices" && <AdminListSection title="Счета и оплаты" description="Создание счетов и ручное подтверждение чеков" icon={<CircleDollarSign />} rows={snapshot.invoices.map((item) => ({id:item.id, title:item.title, subtitle:`${item.projectId} · ${formatDate(item.dueAt)}`, detail:`${formatMoney(item.amount)} · ${item.status}`}))} onCreate={() => setModal({entity:"invoices"})} onEdit={(item) => setModal({entity:"invoices", item})} />}
            {section === "services" && <ServicesSection snapshot={snapshot} onCreate={() => setModal({entity:"services"})} onEdit={(item) => setModal({entity:"services", item})} />}
            {section === "portfolio" && <PortfolioSection snapshot={snapshot} kind="portfolio" onCreate={() => setModal({entity:"portfolio"})} onEdit={(item) => setModal({entity:"portfolio", item})} />}
            {section === "cases" && <PortfolioSection snapshot={snapshot} kind="case" onCreate={() => setModal({entity:"cases"})} onEdit={(item) => setModal({entity:"cases", item})} />}
          </div>
        </section>
      </div>
      {modal && <EntityModal entity={modal.entity} item={modal.item} snapshot={snapshot} onClose={() => setModal(null)} onSave={(values) => saveEntity(modal.entity, values, modal.item)} />}
      {newProjectAccess && <ProjectAccessModal credentials={newProjectAccess} onClose={() => setNewProjectAccess(null)} />}
      {toast && <div className="toast"><Check size={16} /> {toast}</div>}
    </main>
  );
}

function AdminAuth({ error }: { error: string }) {
  return <main className="product-page"><div className="google-auth-card card"><Logo /><h1>Вход в админку</h1><p>Доступ через разрешённый Google-аккаунт {siteConfig.adminEmail}. Здесь вы управляете клиентами, проектами и оплатами.</p>{error && <div className="auth-error">{error}</div>}{siteConfig.apiUrl ? <div id="google-admin-button" className="google-button-wrap" /> : <div className="auth-setup-note">Подключите Google Apps Script, чтобы открыть рабочую админку.</div>}</div></main>;
}

function AdminOverview({ snapshot, setSection }: { snapshot: AdminSnapshot; setSection: (section: AdminSection) => void }) {
  const unpaid = snapshot.invoices.filter((item) => item.status === "Ожидает оплаты" || item.status === "Ожидает подтверждения").length;
  return <><div className="view-heading"><div><h2>Добрый день, Ярослав</h2><p>Сводка по клиентам и проектам на сегодня</p></div><button className="button button-primary" onClick={() => setSection("projects")}><Plus size={16} /> Новый проект</button></div><div className="admin-kpis"><div className="admin-kpi card"><span>Активные клиенты</span><strong>{snapshot.clients.length}</strong><small>в базе COLDDEV</small></div><div className="admin-kpi card"><span>Проекты в работе</span><strong>{snapshot.projects.filter((item) => item.status !== "Завершён").length}</strong><small>по всем клиентам</small></div><div className="admin-kpi card"><span>Ждут оплаты</span><strong>{unpaid}</strong><small>нужно проверить</small></div><div className="admin-kpi card"><span>Активная реклама</span><strong>{snapshot.reports.length}</strong><small>отчётов в системе</small></div></div><div className="admin-grid" style={{marginTop:12}}><div className="card"><div className="card-heading"><h3>Последние действия</h3><span>Activity log</span></div><div className="activity-list">{snapshot.activity.map((item) => <div className="activity-row" key={item.id}><span className="activity-icon"><Activity size={15} /></span><div><strong>{item.title}</strong><span>{item.detail}</span></div><time>{formatShortDate(item.date)}</time></div>)}</div></div><div className="card card-padding"><span className="eyebrow">Быстрый доступ</span><div className="product-nav" style={{marginTop:15}}><button onClick={() => setSection("clients")}><Users /> Добавить клиента <ChevronDown size={14} style={{marginLeft:"auto",transform:"rotate(-90deg)"}} /></button><button onClick={() => setSection("invoices")}><CircleDollarSign /> Проверить оплаты <ChevronDown size={14} style={{marginLeft:"auto",transform:"rotate(-90deg)"}} /></button><button onClick={() => setSection("portfolio")}><BriefcaseBusiness /> Обновить портфолио <ChevronDown size={14} style={{marginLeft:"auto",transform:"rotate(-90deg)"}} /></button></div></div></div></>;
}

function ClientsSection({ snapshot, onCreate, onEdit }: { snapshot: AdminSnapshot; onCreate: () => void; onEdit: (item: Record<string, unknown>) => void }) {
  const [query, setQuery] = useState("");
  const rows = snapshot.clients.filter((item) => `${item.name} ${item.company} ${item.id}`.toLowerCase().includes(query.toLowerCase()));
  return <><div className="view-heading"><div><h2>Клиенты</h2><p>Контакты и доступы к проектам</p></div><button className="button button-primary" onClick={onCreate}><Plus size={16} /> Добавить клиента</button></div><div className="admin-toolbar"><label className="search-box"><Search size={15} /><input placeholder="Поиск по имени или компании" value={query} onChange={(event) => setQuery(event.target.value)} /></label></div><div className="card data-table-wrap"><table className="data-table"><thead><tr><th>Клиент</th><th>Контакты</th><th>Проекты</th><th>Статус</th><th /></tr></thead><tbody>{rows.map((item) => <tr key={item.id}><td><strong>{item.company}</strong><small>{item.id} · {item.name}</small></td><td><strong>{item.telegram}</strong><small>{item.email}</small></td><td><strong>{snapshot.projects.filter((project) => project.clientId === item.id).length}</strong><small>проектов</small></td><td><span className="status-badge status-green">{item.status}</span></td><td><div className="row-actions"><button className="icon-button" onClick={() => onEdit(item as unknown as Record<string, unknown>)}><Pencil size={14} /></button></div></td></tr>)}</tbody></table></div></>;
}

function ProjectsSection({ snapshot, onCreate, onEdit }: { snapshot: AdminSnapshot; onCreate: () => void; onEdit: (item: Record<string, unknown>) => void }) {
  return <><div className="view-heading"><div><h2>Проекты</h2><p>Несколько проектов могут принадлежать одному клиенту</p></div><button className="button button-primary" onClick={onCreate}><Plus size={16} /> Создать проект</button></div><div className="card data-table-wrap"><table className="data-table"><thead><tr><th>Проект</th><th>Клиент</th><th>Прогресс</th><th>Дедлайн</th><th>Статус</th><th /></tr></thead><tbody>{snapshot.projects.map((item) => <tr key={item.id}><td><strong>{item.name}</strong><small>{item.id} · {item.type}</small></td><td>{snapshot.clients.find((client) => client.id === item.clientId)?.company ?? "—"}</td><td><strong>{item.progress}%</strong><div className="mini-progress" style={{width:100,background:"#e8ebf0",marginTop:6}}><i style={{width:`${item.progress}%`,background:"var(--blue)"}} /></div></td><td>{formatShortDate(item.deadline)}</td><td><span className="status-badge status-blue">{item.status}</span></td><td><button className="icon-button" onClick={() => onEdit(item as unknown as Record<string, unknown>)}><Pencil size={14} /></button></td></tr>)}</tbody></table></div></>;
}

function AdminListSection({ title, description, icon, rows, onCreate, onEdit }: { title: string; description: string; icon: React.ReactNode; rows: Array<{id:string;title:string;subtitle:string;detail:string}>; onCreate: () => void; onEdit: (item: Record<string, unknown>) => void }) {
  return <><div className="view-heading"><div><h2>{title}</h2><p>{description}</p></div><button className="button button-primary" onClick={onCreate}><Plus size={16} /> Добавить</button></div><div className="card"><div className="activity-list">{rows.map((row) => <div className="activity-row" key={row.id}><span className="activity-icon">{icon}</span><div><strong>{row.title}</strong><span>{row.subtitle} · {row.detail}</span></div><div className="row-actions"><button className="icon-button" onClick={() => onEdit(row)}><Pencil size={14} /></button></div></div>)}</div></div></>;
}

function ServicesSection({ snapshot, onCreate, onEdit }: { snapshot: AdminSnapshot; onCreate: () => void; onEdit: (item: Record<string, unknown>) => void }) {
  return <><div className="view-heading"><div><h2>Дополнительные услуги</h2><p>Карточки, которые клиент видит в разделе «Улучшить проект»</p></div><button className="button button-primary" onClick={onCreate}><Plus size={16} /> Новая услуга</button></div><div className="offers-grid">{snapshot.services.map((item) => <article className="offer-card card" key={item.id}><span className="offer-icon"><Sparkles /></span><h3>{item.title}</h3><p>{item.description}</p><div className="offer-bottom"><span className="offer-price">{item.priceMode === "request" ? "по запросу" : `${item.priceMode === "from" ? "от " : ""}${formatMoney(item.price ?? 0)}`}</span><button className="icon-button" onClick={() => onEdit(item as unknown as Record<string, unknown>)}><Pencil size={14} /></button></div></article>)}</div></>;
}

function PortfolioSection({ snapshot, kind, onCreate, onEdit }: { snapshot: AdminSnapshot; kind: "portfolio" | "case"; onCreate: () => void; onEdit: (item: Record<string, unknown>) => void }) {
  const items = snapshot.portfolio.filter((item) => item.kind === kind);
  return <><div className="view-heading"><div><h2>{kind === "case" ? "Кейсы" : "Портфолио"}</h2><p>Публикации, которые появятся на главной странице</p></div><button className="button button-primary" onClick={onCreate}><Plus size={16} /> Добавить</button></div><div className="portfolio-grid">{items.map((item) => <article className="portfolio-card" key={item.id}><div className={`project-art ${kind === "case" ? "project-art-two" : "project-art-one"}`}><span className="art-label">{item.title}</span></div><div className="portfolio-meta"><div><span>{item.category}</span><h3>{item.result}</h3></div><button className="icon-button" onClick={() => onEdit(item as unknown as Record<string, unknown>)}><Pencil size={14} /></button></div></article>)}</div></>;
}

function EntityModal({ entity, item, snapshot, onClose, onSave }: { entity: AdminSection; item?: Record<string, unknown>; snapshot: AdminSnapshot; onClose: () => void; onSave: (values: Record<string, unknown>) => void }) {
  const title = item ? "Редактировать запись" : `Добавить: ${sections.find((section) => section.id === entity)?.label}`;
  const [values, setValues] = useState<Record<string, string>>(() => ({
    title: String(item?.title ?? item?.name ?? ""),
    name: String(item?.name ?? ""),
    company: String(item?.company ?? ""),
    type: String(item?.type ?? "Корпоративный сайт"),
    description: String(item?.description ?? ""),
    result: String(item?.result ?? ""),
    amount: String(item?.amount ?? ""),
    progress: String(item?.progress ?? "0"),
    deadline: String(item?.deadline ?? "2026-08-30"),
    price: String(item?.price ?? ""),
    category: String(item?.category ?? "Сайт"),
    telegram: String(item?.telegram ?? ""),
    email: String(item?.email ?? ""),
    clientId: String(item?.clientId ?? snapshot.clients[0]?.id ?? ""),
    projectId: String(item?.projectId ?? snapshot.projects[0]?.id ?? ""),
    currentAction: String(item?.currentAction ?? "Подготовка проекта"),
    managerComment: String(item?.managerComment ?? "Работа началась. Следующее обновление появится в кабинете."),
    siteUrl: String(item?.siteUrl ?? ""),
    previewUrl: String(item?.previewUrl ?? ""),
  }));
  const update = (key: string, value: string) => setValues((current) => ({ ...current, [key]: value }));
  const isClient = entity === "clients";
  const isProject = entity === "projects";
  const isInvoice = entity === "invoices";
  const isService = entity === "services";
  const isWork = ["stages", "updates", "ads"].includes(entity);
  const isPortfolio = ["portfolio", "cases"].includes(entity);
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {if (event.target === event.currentTarget) onClose();}}><section className="modal" role="dialog" aria-modal="true"><div className="modal-header"><h2>{title}</h2><button className="icon-button" onClick={onClose}><X size={15} /></button></div><div className="modal-form">
    {isClient && <><Field label="Имя клиента" value={values.name} onChange={(value) => update("name", value)} /><Field label="Компания" value={values.company} onChange={(value) => update("company", value)} /><Field label="Telegram" value={values.telegram} onChange={(value) => update("telegram", value)} /><Field label="Email" value={values.email} onChange={(value) => update("email", value)} /></>}
    {isProject && <><Field label="Название проекта" value={values.title} onChange={(value) => update("title", value)} /><Field label="Тип проекта" value={values.type} onChange={(value) => update("type", value)} /><Field label="Готовность, %" value={values.progress} onChange={(value) => update("progress", value)} type="number" /><Field label="Дедлайн" value={values.deadline} onChange={(value) => update("deadline", value)} type="date" /><div className="field field-full"><label>Клиент</label><select value={values.clientId} onChange={(event) => update("clientId", event.target.value)}>{snapshot.clients.map((client) => <option key={client.id} value={client.id}>{client.company}</option>)}</select></div><Field label="Что делаем сейчас" value={values.currentAction} onChange={(value) => update("currentAction", value)} full /><Field label="Комментарий клиенту" value={values.managerComment} onChange={(value) => update("managerComment", value)} full /><Field label="Ссылка на текущую версию" value={values.previewUrl} onChange={(value) => update("previewUrl", value)} /><Field label="Рабочий сайт" value={values.siteUrl} onChange={(value) => update("siteUrl", value)} />{item && <Field label="Новый код доступа (необязательно)" value={String(values.accessCode ?? "")} onChange={(value) => update("accessCode", value)} full />}</>}
    {isInvoice && <><Field label="Название услуги" value={values.title} onChange={(value) => update("title", value)} /><Field label="Сумма, BYN" value={values.amount} onChange={(value) => update("amount", value)} type="number" /><Field label="Срок оплаты" value={values.deadline} onChange={(value) => update("deadline", value)} type="date" /><div className="field field-full"><label>Проект</label><select value={values.projectId} onChange={(event) => update("projectId", event.target.value)}>{snapshot.projects.map((project) => <option key={project.id} value={project.id}>{project.id} · {project.name}</option>)}</select></div></>}
    {isService && <><Field label="Название услуги" value={values.title} onChange={(value) => update("title", value)} /><Field label="Цена" value={values.price} onChange={(value) => update("price", value)} type="number" /><Field label="Описание" value={values.description} onChange={(value) => update("description", value)} full /><div className="field"><label>Формат цены</label><select value={String(item?.priceMode ?? "fixed")} onChange={(event) => update("priceMode", event.target.value)}><option value="fixed">Фиксированная</option><option value="from">От</option><option value="request">По запросу</option></select></div></>}
    {isWork && <><Field label="Заголовок" value={values.title} onChange={(value) => update("title", value)} /><Field label="Проект" value={String(item?.projectId ?? snapshot.projects[0]?.id)} onChange={(value) => update("projectId", value)} /><Field label="Описание" value={values.description} onChange={(value) => update("description", value)} full /><Field label="Период / дата" value={values.category} onChange={(value) => update("category", value)} /></>}
    {isPortfolio && <><Field label="Название" value={values.title} onChange={(value) => update("title", value)} /><Field label="Категория" value={values.category} onChange={(value) => update("category", value)} /><Field label="Описание" value={values.description} onChange={(value) => update("description", value)} full /><Field label="Результат / показатель" value={values.result} onChange={(value) => update("result", value)} full /></>}
    {!isClient && !isProject && !isInvoice && !isService && !isWork && !isPortfolio && <Field label="Название" value={values.title} onChange={(value) => update("title", value)} />}
    <div className="modal-footer"><button className="button button-ghost" onClick={onClose}>Отмена</button><button className="button button-primary" onClick={() => onSave({...values, id:item?.id})}>Сохранить</button></div>
  </div></section></div>;
}

function Field({ label, value, onChange, type = "text", full = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; full?: boolean }) {
  return <div className={`field ${full ? "field-full" : ""}`}><label>{label}</label><input type={type} value={value} onChange={(event) => onChange(event.target.value)} /></div>;
}

function ProjectAccessModal({ credentials, onClose }: { credentials: { projectId: string; accessCode: string; projectName: string }; onClose: () => void }) {
  const [copied, setCopied] = useState("");
  const copy = async (label: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
  };

  return <div className="modal-backdrop"><section className="modal access-result-modal" role="dialog" aria-modal="true" aria-labelledby="access-result-title">
    <div className="modal-header"><h2 id="access-result-title">Проект создан</h2><button className="icon-button" onClick={onClose}><X size={15} /></button></div>
    <div className="access-result-content">
      <span className="admin-mode">ДАННЫЕ ДЛЯ ВХОДА КЛИЕНТА</span>
      <h3>{credentials.projectName}</h3>
      <p>Скопируйте и отправьте клиенту оба значения. Код показывается здесь один раз — в таблице хранится только его защищённый хеш.</p>
      <div className="access-result-row"><div><span>ID проекта</span><strong>{credentials.projectId}</strong></div><button onClick={() => copy("ID", credentials.projectId)}><Copy size={16} />{copied === "ID" ? "Скопировано" : "Копировать"}</button></div>
      <div className="access-result-row"><div><span>Код доступа</span><strong>{credentials.accessCode}</strong></div><button onClick={() => copy("Код", credentials.accessCode)}><Copy size={16} />{copied === "Код" ? "Скопировано" : "Копировать"}</button></div>
      <button className="button button-primary" onClick={onClose}>Готово, я сохранил данные</button>
    </div>
  </section></div>;
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

function applyLocalMutation(snapshot: AdminSnapshot, entity: AdminSection, value: Record<string, unknown>): AdminSnapshot {
  const id = String(value.id ?? `${entity}-${Date.now()}`);
  if (entity === "clients") {
    const client: Client = { id, name: String(value.name ?? "Новый клиент"), company: String(value.company ?? "Новая компания"), phone: String(value.phone ?? ""), telegram: String(value.telegram ?? ""), email: String(value.email ?? ""), status: "Активен", createdAt: new Date().toISOString() };
    return { ...snapshot, clients: upsert(snapshot.clients, client) };
  }
  if (entity === "projects") {
    const project: Project = { id, clientId: String(value.clientId ?? snapshot.clients[0]?.id), name: String(value.title ?? "Новый проект"), type: String(value.type ?? "Сайт"), status: "В работе", progress: Number(value.progress ?? 0), startedAt: new Date().toISOString(), deadline: String(value.deadline ?? "2026-08-30"), currentAction: "Подготовка проекта", managerComment: "", lastUpdatedAt: new Date().toISOString() };
    return { ...snapshot, projects: upsert(snapshot.projects, project) };
  }
  if (entity === "services") {
    const service: ServiceOffer = { id, title: String(value.title ?? "Новая услуга"), description: String(value.description ?? ""), price: value.price ? Number(value.price) : null, priceMode: (value.priceMode as ServiceOffer["priceMode"]) ?? "fixed", buttonLabel: "Обсудить", active: true, order: snapshot.services.length + 1 };
    return { ...snapshot, services: upsert(snapshot.services, service) };
  }
  if (entity === "portfolio" || entity === "cases") {
    const item: PortfolioItem = { id, kind: entity === "cases" ? "case" : "portfolio", title: String(value.title ?? "Новая работа"), category: String(value.category ?? "Проект"), description: String(value.description ?? ""), result: String(value.result ?? ""), published: true, order: snapshot.portfolio.length + 1 };
    return { ...snapshot, portfolio: upsert(snapshot.portfolio, item) };
  }
  return snapshot;
}

function upsert<T extends { id: string }>(items: T[], item: T) {
  return items.some((current) => current.id === item.id) ? items.map((current) => current.id === item.id ? { ...current, ...item } : current) : [item, ...items];
}
