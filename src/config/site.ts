export const siteConfig = {
  brandName: "COLDDEV",
  title: "COLDDEV — сайты и реклама для бизнеса",
  description:
    "Создаём сайты, запускаем Яндекс Директ и показываем весь ход работы в прозрачном клиентском кабинете.",
  url: "https://colddev.pro",
  contacts: {
    telegramUsername: "c0lddev",
    telegramUrl: "https://t.me/c0lddev",
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
