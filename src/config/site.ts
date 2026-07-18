export const siteConfig = {
  brandName: "COLDDEV",
  title: "COLDDEV — вы видите всё, мы делаем остальное",
  description:
    "Сайты и Яндекс Директ для бизнеса. После заказа вы видите этапы, сроки, рекламу и оплаты в личном кабинете COLDDEV.",
  url: "https://colddev.pro",
  contacts: {
    telegramUsername: "c0lddev",
    telegramUrl: "https://t.me/c0lddev",
    orderUrl: `https://t.me/c0lddev?text=${encodeURIComponent("Здравствуйте! Хочу обсудить сайт или рекламу для моего бизнеса.")}`,
  },
  erip: {
    title: "ЕРИП",
    path: [
      "Банковские и финансовые услуги",
      "Банки, НКФО",
      "МТБанк",
      "Пополнение дебетовой карты",
    ],
    contractNumber: "34223187",
  },
  adminEmail: "yaroslav.paraonov@gmail.com",
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
  apiUrl: process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ?? "",
};
