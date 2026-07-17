export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export const formatShortDate = (date: string) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "short",
  }).format(new Date(date));

export const formatMoney = (amount: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "BYN",
    maximumFractionDigits: 0,
  }).format(amount);

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value);

