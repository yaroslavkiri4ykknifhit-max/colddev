type Metric = { value: string; label: string };

type CaseImage = {
  src: string;
  alt: string;
  caption: string;
  // Bounds of the source image inside the captured browser viewport.
  crop: { x: number; y: number; width: number; height: number };
};

export type AdvertisingCase = {
  id: string;
  title: string;
  period?: string;
  highlights: [Metric, Metric];
  takeaway: string;
  context?: string;
  goal?: string;
  steps: string[];
  keywords?: { title: string; examples: string }[];
  metrics: Metric[];
  images: CaseImage[];
};

export const advertisingCasesSource = "https://nice-monkey-9fb.notion.site/Google-Ads-8efe27e038a94c24aaa08912a41da658";

export const advertisingCases: AdvertisingCase[] = [
  {
    id: "headphones",
    title: "Магазин наушников",
    period: "За 2 месяца",
    highlights: [
      { value: "+80%", label: "к числу заказов" },
      { value: "+71%", label: "к выручке" },
    ],
    takeaway: "ROI 530–650% · заявка дешевле 3 $",
    steps: [
      "Изучили проект и ассортимент, целевую аудиторию и конкурентов. Подготовили план рекламы.",
      "Собрали ключевые и минус-слова по товарам. Разделили поисковые кампании на коммерческие и брендовые запросы.",
      "Загрузили товары в Merchant Center для товарных и торговых кампаний. Детально проработали кампании с учётом широкого ассортимента.",
      "Вынесли в объявления преимущества магазина. Протестировали скидки, бесплатную доставку и рассрочку.",
    ],
    keywords: [
      { title: "Коммерческие запросы", examples: "«Купить наушники», «Наушники цена»" },
      { title: "Брендовые запросы", examples: "«Наушники BOSE», «Беспроводные наушники SoundCore»" },
    ],
    metrics: [
      { value: "300–550 $ / мес.", label: "рекламный бюджет" },
      { value: "0,05–0,09 $", label: "переход на сайт" },
      { value: "+80%", label: "рост числа заказов" },
      { value: "+71%", label: "рост выручки" },
      { value: "530–650%", label: "окупаемость инвестиций (ROI)" },
      { value: "< 3 $", label: "стоимость заявки" },
    ],
    images: [
      {
        src: "/work/ads/headphones-shopping.webp",
        alt: "Примеры товарных объявлений магазина наушников в Google",
        caption: "Пример товарных объявлений",
        crop: { x: 0, y: 131.5, width: 1363, height: 673 },
      },
    ],
  },
  {
    id: "greenhouses",
    title: "Магазин теплиц",
    period: "За 2,5 месяца",
    highlights: [
      { value: "456", label: "заявок" },
      { value: "4,21 $", label: "за заявку" },
    ],
    takeaway: "136 клиентов · выручка более 20 000 $",
    steps: [
      "Изучили проект, целевую аудиторию и конкурентов.",
      "Проанализировали основные поисковые запросы и рекламные ставки.",
      "Подготовили и представили клиенту план рекламы. Создали и запустили рекламные кампании.",
    ],
    metrics: [
      { value: "33,2 тыс.", label: "переходов на сайт" },
      { value: "0,06 $", label: "стоимость клика (CPC)" },
      { value: "1 920 $", label: "рекламный бюджет" },
      { value: "456", label: "заявок" },
      { value: "4,21 $", label: "средняя стоимость заявки" },
      { value: "136", label: "клиентов" },
      { value: "29%", label: "конверсия из заявки в клиента" },
      { value: "14,12 $", label: "стоимость привлечения клиента" },
      { value: "> 20 000 $", label: "выручка" },
    ],
    images: [
      {
        src: "/work/ads/greenhouses-overview.webp",
        alt: "Обзор Google Ads магазина теплиц: 33,2 тысячи кликов и средняя цена клика 0,06 доллара",
        caption: "Обзор рекламного кабинета",
        crop: { x: 0, y: 161, width: 1363, height: 614 },
      },
      {
        src: "/work/ads/greenhouses-campaigns.webp",
        alt: "Показатели рекламных кампаний магазина теплиц в Google Ads",
        caption: "Показатели кампаний",
        crop: { x: 0, y: 155, width: 1363, height: 626 },
      },
    ],
  },
  {
    id: "massage",
    title: "Массажный салон",
    period: "За 2 месяца",
    highlights: [
      { value: "393", label: "регистрации на курс" },
      { value: "0,61 $", label: "за заявку" },
    ],
    takeaway: "Рекламный бюджет — 238 $",
    context: "До обращения компания запускала таргетированную рекламу. Качество обращений и количество людей, доходивших до сеансов оздоровительного массажа, её не устраивали.",
    goal: "Привлечь аудиторию в салон на курс аппаратного массажа.",
    steps: [
      "Изучили проект, структуру работы салона и процесс взаимодействия с клиентами.",
      "Проанализировали целевую аудиторию и конкурентов.",
      "Разработали предварительный план рекламы и представили его клиенту.",
    ],
    metrics: [
      { value: "393", label: "регистрации на курс" },
      { value: "0,61 $", label: "средняя стоимость заявки" },
      { value: "238 $", label: "рекламный бюджет" },
    ],
    images: [
      {
        src: "/work/ads/massage-results.webp",
        alt: "Результаты рекламы массажного салона: 393 конверсии и стоимость конверсии 0,61 доллара",
        caption: "Результаты в рекламном кабинете",
        crop: { x: 71.5, y: 83, width: 1220, height: 770 },
      },
    ],
  },
  {
    id: "clothing",
    title: "Магазин одежды",
    highlights: [
      { value: "1 033", label: "оформления заказа" },
      { value: "2,35 $", label: "за конверсию" },
    ],
    takeaway: "30 776 кликов · средний чек 37 $",
    goal: "Запустить окупаемую рекламу. Целевой показатель ROAS — не ниже 400%.",
    steps: [
      "Изучили проект, продукцию, целевую аудиторию и конкурентов. Подготовили предварительный план рекламы.",
      "Настроили расширенную электронную торговлю в Google Analytics для корректного расчёта эффективности рекламных кампаний.",
      "Создали списки аудиторий ремаркетинга, чтобы возвращать посетителей, которые уже были на сайте, но не оформили покупку.",
    ],
    metrics: [
      { value: "2 425 $", label: "рекламный бюджет" },
      { value: "30 776", label: "кликов по рекламе" },
      { value: "0,08 $", label: "стоимость клика (CPC)" },
      { value: "1 033", label: "конверсии: оформление заказа" },
      { value: "2,35 $", label: "стоимость конверсии (CPA)" },
      { value: "37 $", label: "средний чек" },
    ],
    images: [
      {
        src: "/work/ads/clothing-overview.webp",
        alt: "Обзор результатов рекламы интернет-магазина одежды в Google Ads",
        caption: "Обзор рекламного кабинета",
        crop: { x: 0, y: 177.5, width: 1363, height: 581 },
      },
      {
        src: "/work/ads/clothing-campaigns.webp",
        alt: "Таблица рекламных кампаний интернет-магазина одежды",
        caption: "Показатели отдельных кампаний",
        crop: { x: 0, y: 162.5, width: 1363, height: 611 },
      },
    ],
  },
];
