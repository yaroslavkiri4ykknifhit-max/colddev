export interface Project {
  id: string;
  filename: string;
  title: string;
  category: string;
  date: string;
  size: string;
  status: "STABLE" | "BETA" | "DEPRECATED";
  description: string;
  tasks: string[];
  technologies: string[];
  result: string;
}

export interface Service {
  id: string;
  filename: string;
  title: string;
  version: string;
  size: string;
  description: string;
  state: "READY" | "RUNNING" | "PAUSED";
  progress: number; // 0-100
}

export interface Testimonial {
  id: string;
  nickname: string;
  date: string;
  msgNum: string;
  avatar: string; // 1-3
  status: "Elite Member" | "Sysop" | "Guest";
  text: string;
  icqOnline: boolean;
}

export interface FAQItem {
  id: string;
  category: "getting-started" | "development" | "telegram" | "ads" | "support";
  question: string;
  answer: string;
}

export const siteContent = {
  hero: {
    title: "YAROSLAV.EXE",
    subtitle: "PERSONAL INTERNET TERMINAL",
    tagline: "Создаю сайты, Telegram-ботов, Mini Apps и рекламные системы для бизнеса. От первого экрана до первой заявки.",
    marqueeText: " ★ WELCOME TO YAROSLAV.EXE TERMINAL ★ WEB DEVELOPMENT ★ TELEGRAM BOTS ★ MINI APPS ★ GOOGLE ADS ★ AUTOMATION ★ SYSTEM STATUS: AVAILABLE FOR WORK ★ VISITORS WELCOME ★ "
  },
  services: [
    {
      id: "website",
      filename: "WEB_SITE_BUILDER.EXE",
      title: "Разработка Веб-сайтов",
      version: "v4.2.0",
      size: "812 KB",
      description: "Создание лендингов, промо-сайтов, интернет-магазинов и сложных веб-систем с высокой конверсией.",
      state: "READY",
      progress: 100
    },
    {
      id: "telegram-bot",
      filename: "TELEGRAM_BOT.EXE",
      title: "Telegram Боты",
      version: "v2.5.1",
      size: "420 KB",
      description: "Автоматизация ответов, фильтрации лидов, сбора платежей и уведомлений прямо в ваш Telegram-чат.",
      state: "RUNNING",
      progress: 92
    },
    {
      id: "mini-app",
      filename: "MINI_APP.EXE",
      title: "Telegram Mini Apps",
      version: "v1.0.8",
      size: "1.2 MB",
      description: "Интерактивные интерфейсы, запускаемые внутри мессенджера Telegram (веб-приложения в чате).",
      state: "READY",
      progress: 100
    },
    {
      id: "google-ads",
      filename: "GOOGLE_ADS.EXE",
      title: "Контекстная Реклама",
      version: "v3.1.0",
      size: "340 KB",
      description: "Настройка Google Ads и Яндекс.Директ для мгновенного привлечения целевых клиентов.",
      state: "READY",
      progress: 85
    },
    {
      id: "design",
      filename: "DESIGN_SYSTEM.EXE",
      title: "UX/UI Дизайн",
      version: "v1.1.0",
      size: "2.1 MB",
      description: "Проектирование логической структуры, прототипирование путей пользователя и детальный дизайн макетов.",
      state: "READY",
      progress: 100
    },
    {
      id: "automation",
      filename: "AUTOMATION.EXE",
      title: "Интеграции и CRM",
      version: "v2.0.4",
      size: "512 KB",
      description: "Связывание сайтов с CRM (Bitrix24, amoCRM), распределение лидов, автоматическая отчетность.",
      state: "RUNNING",
      progress: 98
    }
  ] as Service[],
  projects: [
    {
      id: "recruiting",
      filename: "BUDEYA_RECRUITING.exe",
      title: "Платформа кадрового агентства Apex",
      category: "Веб-приложение / CRM",
      date: "2025-11-20",
      size: "4.8 MB",
      status: "STABLE",
      description: "Сложная система подбора кандидатов с личным кабинетом, фильтрацией откликов и автоматической рассылкой резюме.",
      tasks: ["Архитектура базы данных", "Личный кабинет соискателя", "Автоматические воронки подбора"],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
      result: "Время квалификации откликов уменьшилось на 60%, конверсия выросла."
    },
    {
      id: "mini-app-car",
      filename: "MIRARI_MINI_APP.exe",
      title: "CarService Telegram Mini App",
      category: "Telegram Web App",
      date: "2026-02-14",
      size: "2.4 MB",
      status: "STABLE",
      description: "Мини-приложение для записи на СТО, каталога запчастей и онлайн-оплаты внутри мессенджера Telegram.",
      tasks: ["Дизайн UX/UI", "Разработка Mini App", "Интеграция Stripe эквайринга"],
      technologies: ["React", "Telegram API", "Tailwind CSS", "Node.js"],
      result: "Более 40% записей перешли в автоматический режим через Telegram."
    },
    {
      id: "local-detailing",
      filename: "LOCAL_BUSINESS_SITE.html",
      title: "Лендинг Студии Детейлинга Carbon",
      category: "Промо-сайт / Реклама",
      date: "2026-04-10",
      size: "1.1 MB",
      status: "STABLE",
      description: "Стильный лендинг премиум детейлинг центра с комплексным маркетингом и настройкой контекстной рекламы.",
      tasks: ["Проектирование прототипа", "Ретро-эффекты и анимации", "Запуск кампаний в Google Ads"],
      technologies: ["Next.js", "Framer Motion", "Google Ads API"],
      result: "Конверсия сайта составила 9.2%, снижена стоимость заявки."
    },
    {
      id: "sales-bot",
      filename: "SALES_BOT_v2.4.exe",
      title: "Интеллектуальный чат-бот для продаж",
      category: "Telegram Бот",
      date: "2026-05-30",
      size: "950 KB",
      status: "BETA",
      description: "Многофункциональный бот для автоматизации первичной обработки и квалификации лидов.",
      tasks: ["Логическая структура диалога", "Написание бэкенда бота", "Интеграция CRM"],
      technologies: ["Node.js", "Grammy API", "MongoDB", "Express"],
      result: "Автоматизировано 80% типовых обращений на этапе сбора требований."
    }
  ] as Project[],
  processSteps: [
    {
      id: 1,
      title: "Анализ и Техническое задание",
      description: "Изучаю цели бизнеса, анализирую конкурентов, пишу детальную спецификацию и требования к системе."
    },
    {
      id: 2,
      title: "Проектирование и Прототип",
      description: "Создаю структурную схему экранов, прорабатываю пути пользователя для максимальной конверсии."
    },
    {
      id: 3,
      title: "Ретро/Премиум Дизайн",
      description: "Разрабатываю визуальный стиль, собираю дизайн-систему, рисую макеты интерфейсов."
    },
    {
      id: 4,
      title: "Программирование и Сборка",
      description: "Пишу чистый, оптимизированный код на Next.js, настраиваю анимации и серверный рендеринг."
    },
    {
      id: 5,
      title: "Подключение API и CRM",
      description: "Интегрирую ботов, платежные шлюзы, CRM, базы данных и системы аналитики."
    },
    {
      id: 6,
      title: "Тестирование и Запуск",
      description: "Тестирую работу системы во всех браузерах и экранах, переношу на сервер, подключаю домен."
    }
  ],
  pricingCd: [
    {
      id: "lite",
      name: "YAROSLAV WEB LITE",
      version: "v1.0",
      priceKey: "lite",
      requirements: "Windows 98/XP, 128MB RAM, 56K Modem",
      features: [
        "Уникальный дизайн",
        "Адаптивная верстка",
        "Интеграция формы с Telegram",
        "Базовая SEO подготовка",
        "Яндекс.Метрика / Google Analytics"
      ]
    },
    {
      id: "pro",
      name: "YAROSLAV WEB PROFESSIONAL",
      version: "v2.5",
      priceKey: "pro",
      requirements: "Windows 2000/XP, 512MB RAM, DSL Connection",
      features: [
        "Индивидуальный дизайн",
        "Анимации Framer Motion",
        "Многостраничный сайт",
        "Настройка Google Ads рекламы",
        "Расширенная интеграция с CRM",
        "1 месяц технической поддержки"
      ],
      featured: true
    },
    {
      id: "ultimate",
      name: "YAROSLAV WEB ULTIMATE",
      version: "v4.0",
      priceKey: "ultimate",
      requirements: "Windows XP/Vista, 1GB RAM, BroadBand LAN",
      features: [
        "Разработка Telegram Mini App",
        "Создание Telegram-бота",
        "Автоматизация бизнес-процессов",
        "Сложные бэкенд интеграции",
        "Полноценная продуктовая разработка"
      ]
    }
  ],
  testimonials: [
    {
      id: "1",
      nickname: "Alex_HR_Boss",
      date: "2025-12-01 18:24",
      msgNum: "#248",
      avatar: "1",
      status: "Elite Member",
      text: "Разработка платформы Apex HR была сделана на высшем уровне. Автоматический разбор кандидатов экономит кучу времени. Сборка стабильная, лагов нет.",
      icqOnline: true
    },
    {
      id: "2",
      nickname: "Carbon_Detailer",
      date: "2026-04-18 11:05",
      msgNum: "#312",
      avatar: "2",
      status: "Guest",
      text: "Отличный лендинг! Google Ads сразу начал давать заявки, реклама окупилась в первый месяц. Дизайн действительно привлекает внимание клиентов.",
      icqOnline: false
    },
    {
      id: "3",
      nickname: "CarService_Pro",
      date: "2026-02-20 15:40",
      msgNum: "#295",
      avatar: "3",
      status: "Sysop",
      text: "Mini App в Telegram — это бомба. Запись на сервис работает автоматически. Рекомендую Ярослава как профи в автоматизации и ботах.",
      icqOnline: true
    }
  ] as Testimonial[],
  faq: [
    {
      id: "faq-1",
      category: "getting-started",
      question: "Что нужно предоставить перед стартом?",
      answer: "Желательно иметь описание вашего продукта, логотип (при наличии) и примеры сайтов, стиль которых вам импонирует. Если этого нет, я помогу составить структуру и написать базовые тексты."
    },
    {
      id: "faq-2",
      category: "development",
      question: "Сколько времени занимает разработка сайта?",
      answer: "Простой Landing Page занимает 7–14 дней. Полноценный корпоративный сайт — от 3 до 5 недель. Разработка сложных кастомных приложений и Mini Apps обсуждается индивидуально."
    },
    {
      id: "faq-3",
      category: "telegram",
      question: "Что такое Telegram Mini Apps?",
      answer: "Это полноценные веб-приложения, которые открываются прямо внутри мессенджера Telegram. Они позволяют совершать покупки, записываться на услуги и взаимодействовать с пользователем без необходимости скачивать сторонние приложения."
    },
    {
      id: "faq-4",
      category: "ads",
      question: "Можно ли настроить рекламу после запуска?",
      answer: "Да. Все разработанные сайты оптимизированы под высокие рекламные нагрузки и требования SEO. Я настраиваю рекламные кампании в Google Ads и Яндекс.Директ для быстрого привлечения первых клиентов."
    },
    {
      id: "faq-5",
      category: "support",
      question: "Предоставляется ли поддержка после запуска?",
      answer: "Да, после публикации проекта я бесплатно предоставляю 30 дней технической поддержки для исправления возможных неполадок. Также мы можем договориться о ежемесячном сопровождении."
    }
  ] as FAQItem[]
};
