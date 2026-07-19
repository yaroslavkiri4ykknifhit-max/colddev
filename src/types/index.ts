export type ProjectStatus =
  | "В работе"
  | "На согласовании"
  | "Приостановлен"
  | "Завершён";

export type StageStatus = "done" | "active" | "waiting" | "paused";

export type InvoiceStatus =
  | "Ожидает оплаты"
  | "Ожидает подтверждения"
  | "Оплачено"
  | "Просрочено"
  | "Отменено";

export interface Client {
  id: string;
  name: string;
  company: string;
  phone: string;
  telegram: string;
  email: string;
  status: "Активен" | "Заблокирован";
  createdAt: string;
}

export interface Project {
  id: string;
  clientId: string;
  name: string;
  type: string;
  status: ProjectStatus;
  progress: number;
  startedAt: string;
  deadline: string;
  siteUrl?: string;
  previewUrl?: string;
  currentAction: string;
  managerComment: string;
  lastUpdatedAt: string;
}

export interface ProjectStage {
  id: string;
  projectId: string;
  title: string;
  description: string;
  order: number;
  status: StageStatus;
  startedAt?: string;
  completedAt?: string;
}

export interface ProjectUpdate {
  id: string;
  projectId: string;
  title: string;
  description: string;
  date: string;
  category: "Сайт" | "Реклама" | "Документы" | "Общее";
  imageUrl?: string;
  linkUrl?: string;
}

export interface AdvertisingReport {
  id: string;
  projectId: string;
  period: string;
  impressions: number;
  clicks: number;
  spend: number;
  leads: number;
  budgetLeft: number;
  comment: string;
  screenshotUrl?: string;
}

export interface Invoice {
  id: string;
  projectId: string;
  title: string;
  amount: number;
  createdAt: string;
  dueAt: string;
  status: InvoiceStatus;
  comment?: string;
  receiptName?: string;
  receiptUrl?: string;
}

export interface ServiceOffer {
  id: string;
  title: string;
  description: string;
  price: number | null;
  priceMode: "fixed" | "from" | "request";
  buttonLabel: string;
  imageUrl?: string;
  active: boolean;
  order: number;
}

export interface PortfolioItem {
  id: string;
  kind: "portfolio" | "case";
  title: string;
  category: string;
  description: string;
  result: string;
  imageUrl?: string;
  imageUrls?: string[];
  url?: string;
  published: boolean;
  order: number;
}

export interface DashboardData {
  client: Client;
  projects: Project[];
  stages: ProjectStage[];
  updates: ProjectUpdate[];
  reports: AdvertisingReport[];
  invoices: Invoice[];
  services: ServiceOffer[];
}

export interface AdminSnapshot extends DashboardData {
  clients: Client[];
  portfolio: PortfolioItem[];
  activity: Array<{
    id: string;
    title: string;
    detail: string;
    date: string;
  }>;
}

export interface ClientSession {
  token: string;
  expiresAt: string;
  data: DashboardData;
}
