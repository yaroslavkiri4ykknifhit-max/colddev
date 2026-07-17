import type { AdminSnapshot, DashboardData } from "@/types";

const client = {
  id: "CL-0001",
  name: "Алексей Смирнов",
  company: "Студия интерьеров Forma",
  phone: "+375 29 000-00-00",
  telegram: "@forma_demo",
  email: "hello@forma.demo",
  status: "Активен" as const,
  createdAt: "2026-06-18",
};

const projects = [
  {
    id: "CD-0007",
    clientId: client.id,
    name: "Сайт для студии Forma",
    type: "Корпоративный сайт",
    status: "В работе" as const,
    progress: 68,
    startedAt: "2026-06-20",
    deadline: "2026-08-14",
    previewUrl: "https://example.com",
    currentAction: "Мобильная адаптация и финальная сборка страниц",
    managerComment:
      "Основная версия уже собрана. Сейчас проверяем адаптив и готовим сайт к подключению домена.",
    lastUpdatedAt: "2026-07-16T16:40:00.000Z",
  },
  {
    id: "CD-0012",
    clientId: client.id,
    name: "Яндекс Директ — Forma",
    type: "Контекстная реклама",
    status: "На согласовании" as const,
    progress: 42,
    startedAt: "2026-07-02",
    deadline: "2026-07-28",
    currentAction: "Согласование объявлений и минус-фраз",
    managerComment:
      "Семантика собрана. После согласования объявлений запускаем первую тестовую неделю.",
    lastUpdatedAt: "2026-07-15T11:20:00.000Z",
  },
];

const stages = [
  {
    id: "ST-01",
    projectId: "CD-0007",
    title: "Анализ бизнеса",
    description: "Цели, аудит конкурентов и портрет клиента",
    order: 1,
    status: "done" as const,
    startedAt: "2026-06-20",
    completedAt: "2026-06-23",
  },
  {
    id: "ST-02",
    projectId: "CD-0007",
    title: "Структура и прототип",
    description: "Сценарии, страницы и логика блоков",
    order: 2,
    status: "done" as const,
    completedAt: "2026-06-29",
  },
  {
    id: "ST-03",
    projectId: "CD-0007",
    title: "Дизайн",
    description: "Визуальная система и макеты ключевых экранов",
    order: 3,
    status: "done" as const,
    completedAt: "2026-07-07",
  },
  {
    id: "ST-04",
    projectId: "CD-0007",
    title: "Разработка",
    description: "Сборка страниц и мобильная адаптация",
    order: 4,
    status: "active" as const,
    startedAt: "2026-07-08",
  },
  {
    id: "ST-05",
    projectId: "CD-0007",
    title: "Подключение домена",
    description: "Публикация, аналитика и техническая проверка",
    order: 5,
    status: "waiting" as const,
  },
  {
    id: "ST-06",
    projectId: "CD-0007",
    title: "Запуск",
    description: "Финальная проверка и передача проекта",
    order: 6,
    status: "waiting" as const,
  },
  {
    id: "ST-11",
    projectId: "CD-0012",
    title: "Сбор семантики",
    description: "Запросы, частотность и минус-фразы",
    order: 1,
    status: "done" as const,
  },
  {
    id: "ST-12",
    projectId: "CD-0012",
    title: "Подготовка кампаний",
    description: "Группы, объявления и стратегии",
    order: 2,
    status: "active" as const,
  },
  {
    id: "ST-13",
    projectId: "CD-0012",
    title: "Тестовый запуск",
    description: "Первая неделя и сбор статистики",
    order: 3,
    status: "waiting" as const,
  },
];

const updates = [
  {
    id: "UP-03",
    projectId: "CD-0007",
    title: "Собрали главную страницу",
    description:
      "Все ключевые блоки готовы, добавили анимации и проверили сценарий заявки.",
    date: "2026-07-16",
    category: "Сайт" as const,
    linkUrl: "https://example.com",
  },
  {
    id: "UP-02",
    projectId: "CD-0007",
    title: "Утверждён дизайн",
    description:
      "Зафиксировали синий акцент, типографику и систему карточек для всех страниц.",
    date: "2026-07-07",
    category: "Сайт" as const,
  },
  {
    id: "UP-01",
    projectId: "CD-0007",
    title: "Готов прототип",
    description:
      "Собрали структуру и расставили приоритеты для основных услуг.",
    date: "2026-06-29",
    category: "Общее" as const,
  },
  {
    id: "UP-11",
    projectId: "CD-0012",
    title: "Собрана семантика",
    description: "Подготовили 486 целевых запросов и список минус-фраз.",
    date: "2026-07-15",
    category: "Реклама" as const,
  },
];

const reports = [
  {
    id: "AD-001",
    projectId: "CD-0012",
    period: "Демо-прогноз на 30 дней",
    impressions: 14820,
    clicks: 643,
    spend: 428,
    leads: 19,
    budgetLeft: 572,
    comment:
      "Прогноз будет заменён фактическими показателями после запуска кампании.",
  },
];

const invoices = [
  {
    id: "INV-0104",
    projectId: "CD-0007",
    title: "Второй этап разработки сайта",
    amount: 600,
    createdAt: "2026-07-12",
    dueAt: "2026-07-22",
    status: "Ожидает оплаты" as const,
    comment: "Оплата после утверждения дизайн-макетов.",
  },
  {
    id: "INV-0091",
    projectId: "CD-0007",
    title: "Предоплата за разработку сайта",
    amount: 600,
    createdAt: "2026-06-18",
    dueAt: "2026-06-20",
    status: "Оплачено" as const,
  },
];

const services = [
  {
    id: "SRV-01",
    title: "Telegram-бот",
    description: "Автоматизируем ответы, сбор заявок и уведомления команды.",
    price: 450,
    priceMode: "from" as const,
    buttonLabel: "Обсудить",
    active: true,
    order: 1,
  },
  {
    id: "SRV-02",
    title: "Новый раздел сайта",
    description: "Добавим услугу, каталог или посадочную страницу под рекламу.",
    price: 200,
    priceMode: "fixed" as const,
    buttonLabel: "Заказать",
    active: true,
    order: 2,
  },
  {
    id: "SRV-03",
    title: "Ежемесячное сопровождение",
    description: "Правки, контроль работы, развитие сайта и рекламы.",
    price: null,
    priceMode: "request" as const,
    buttonLabel: "Узнать условия",
    active: true,
    order: 3,
  },
];

export const mockDashboardData: DashboardData = {
  client,
  projects,
  stages,
  updates,
  reports,
  invoices,
  services,
};

export const mockAdminSnapshot: AdminSnapshot = {
  ...mockDashboardData,
  clients: [
    client,
    {
      id: "CL-0002",
      name: "Мария Ковалёва",
      company: "KAVA Coffee",
      phone: "+375 44 000-00-00",
      telegram: "@kava_demo",
      email: "hello@kava.demo",
      status: "Активен",
      createdAt: "2026-07-04",
    },
  ],
  portfolio: [
    {
      id: "PF-01",
      kind: "portfolio",
      title: "FORMA — студия интерьеров",
      category: "Корпоративный сайт",
      description: "Сайт с каталогом проектов и понятной записью на консультацию.",
      result: "+38% обращений за первый месяц",
      url: "https://example.com",
      published: true,
      order: 1,
    },
    {
      id: "PF-02",
      kind: "case",
      title: "KAVA — заявки из Директа",
      category: "Яндекс Директ",
      description: "Пересобрали семантику и разделили кампании по намерению.",
      result: "Цена заявки снижена на 31%",
      published: true,
      order: 2,
    },
  ],
  activity: [
    {
      id: "AC-01",
      title: "Обновлён проект CD-0007",
      detail: "Готовность изменена до 68%",
      date: "2026-07-16T16:40:00.000Z",
    },
    {
      id: "AC-02",
      title: "Создан рекламный отчёт",
      detail: "Проект CD-0012",
      date: "2026-07-15T11:20:00.000Z",
    },
  ],
};

