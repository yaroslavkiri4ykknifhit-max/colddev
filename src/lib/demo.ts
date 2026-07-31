import type { AdminSnapshot, DashboardData } from "@/types";

const now = "2026-07-31T12:30:00.000Z";

export const demoDashboardData: DashboardData = {
  client: {
    id: "CL-0007",
    name: "Алексей Морозов",
    company: "FORMA",
    phone: "+375 29 000-00-00",
    telegram: "@forma_demo",
    email: "hello@forma.demo",
    status: "Активен",
    createdAt: "2026-07-01T10:00:00.000Z",
  },
  projects: [{
    id: "CD-0007",
    clientId: "CL-0007",
    name: "Сайт для FORMA",
    type: "Лендинг + реклама",
    status: "В работе",
    progress: 68,
    startedAt: "2026-07-07T10:00:00.000Z",
    deadline: "2026-08-14T10:00:00.000Z",
    previewUrl: "https://colddev.pro",
    currentAction: "Собираем мобильную версию и финальную анимацию",
    managerComment: "Основная структура готова. Сейчас доводим адаптив, скорость и последние интерактивные состояния.",
    lastUpdatedAt: now,
  }],
  stages: [
    { id: "ST-01", projectId: "CD-0007", title: "Исследование и структура", description: "Разобрали продукт, аудиторию и путь до заявки.", order: 1, status: "done", completedAt: "2026-07-10" },
    { id: "ST-02", projectId: "CD-0007", title: "Прототип и тексты", description: "Собрали логику экранов и согласовали содержание.", order: 2, status: "done", completedAt: "2026-07-15" },
    { id: "ST-03", projectId: "CD-0007", title: "Визуальный дизайн", description: "Утвердили стиль, типографику и ключевые экраны.", order: 3, status: "done", completedAt: "2026-07-24" },
    { id: "ST-04", projectId: "CD-0007", title: "Разработка и адаптив", description: "Собираем мобильную версию и интерактивные состояния.", order: 4, status: "active", startedAt: "2026-07-25" },
    { id: "ST-05", projectId: "CD-0007", title: "Запуск и аналитика", description: "Подключим домен, формы, аналитику и проверим цели.", order: 5, status: "waiting" },
  ],
  updates: [
    { id: "UP-03", projectId: "CD-0007", title: "Главная страница готова", description: "Собрали весь сценарий от первого экрана до заявки и добавили адаптивные состояния.", date: now, category: "Сайт", linkUrl: "https://colddev.pro" },
    { id: "UP-02", projectId: "CD-0007", title: "Подтвердили визуальную концепцию", description: "Зафиксировали цвет, шрифты, карточки и логику анимации.", date: "2026-07-28T14:00:00.000Z", category: "Сайт" },
    { id: "UP-01", projectId: "CD-0007", title: "Структура согласована", description: "Все смысловые блоки и точки конверсии утверждены.", date: "2026-07-20T09:00:00.000Z", category: "Общее" },
  ],
  reports: [{ id: "AD-01", projectId: "CD-0007", period: "Июль 2026", impressions: 48620, clicks: 1842, spend: 1260, leads: 37, budgetLeft: 740, comment: "Кампании набрали статистику. Лучший результат даёт горячий поиск — переносим туда часть бюджета." }],
  invoices: [
    { id: "INV-003", projectId: "CD-0007", title: "Второй этап разработки", amount: 600, createdAt: "2026-07-29", dueAt: "2026-08-04", status: "Ожидает оплаты" },
    { id: "INV-002", projectId: "CD-0007", title: "Рекламный бюджет", amount: 1200, createdAt: "2026-07-15", dueAt: "2026-07-18", status: "Оплачено" },
    { id: "INV-001", projectId: "CD-0007", title: "Старт проекта", amount: 700, createdAt: "2026-07-07", dueAt: "2026-07-09", status: "Оплачено" },
  ],
  services: [
    { id: "SV-01", title: "Telegram-бот для заявок", description: "Соберёт обращение, задаст вопросы и передаст готовый лид менеджеру.", price: 1499, priceMode: "from", buttonLabel: "Обсудить", active: true, order: 1 },
    { id: "SV-02", title: "Сквозная аналитика", description: "Соединим рекламу, заявки и продажи в одну понятную картину.", price: 599, priceMode: "from", buttonLabel: "Узнать детали", active: true, order: 2 },
    { id: "SV-03", title: "Поддержка и развитие", description: "Регулярные улучшения, новые блоки и контроль стабильности сайта.", price: 299, priceMode: "from", buttonLabel: "Подключить", active: true, order: 3 },
  ],
};

export const demoAdminSnapshot: AdminSnapshot = {
  ...demoDashboardData,
  clients: [
    demoDashboardData.client,
    { id: "CL-0008", name: "Мария Белова", company: "NORD", phone: "+375 29 111-11-11", telegram: "@nord_demo", email: "hello@nord.demo", status: "Активен", createdAt: "2026-07-18" },
  ],
  portfolio: [],
  activity: [
    { id: "ACT-03", title: "Обновлён проект CD-0007", detail: "Готовность изменена до 68%", date: now },
    { id: "ACT-02", title: "Добавлен рекламный отчёт", detail: "Июль 2026 · 37 заявок", date: "2026-07-30" },
    { id: "ACT-01", title: "Счёт отмечен как оплаченный", detail: "INV-002 · 1 200 BYN", date: "2026-07-18" },
  ],
};
