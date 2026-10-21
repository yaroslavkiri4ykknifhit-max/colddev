export type PortfolioProject = {
  id: string; title: string; description: string;
  url: string; domain: string; cover: string; theme: string; label: string;
  mobile: string; mobileHeight?: number;
};

// Portfolio belongs to the static build. No runtime API or database is required.
export const projects: PortfolioProject[] = [
  { id: "krepkipol", title: "Крепкий пол", description: "Полусухая стяжка пола в Гомеле и области.", url: "http://krepkipol.by/", domain: "krepkipol.by", cover: "/work/krepkipol-desktop.webp", mobile: "/work/krepkipol-mobile.webp", theme: "floor", label: "Строительство" },
  { id: "climate", title: "КлиматМинск", description: "Продажа и установка кондиционеров в Минске.", url: "https://xn--80apbfdcibk4bh.xn--90ais/", domain: "климатминск.бел", cover: "/work/climate-desktop.webp", mobile: "/work/climate-mobile.webp", mobileHeight: 1400, theme: "climate", label: "Климатическая техника" },
  { id: "nwo", title: "New Way Out", description: "Образовательный проект об обучении продажам.", url: "https://newwayout.online/", domain: "newwayout.online", cover: "/work/nwo-desktop.webp", mobile: "/work/nwo-mobile.webp", theme: "nwo", label: "Образование" },
  { id: "aks", title: "АксХоум", description: "Интернет-магазин мебели для дома.", url: "https://akshome.by/", domain: "akshome.by", cover: "/work/aks-desktop.webp", mobile: "/work/aks-mobile.webp", mobileHeight: 1400, theme: "aks", label: "Мебель и интерьер" },
  { id: "simon", title: "PRODSIMON", description: "Личный бренд и образовательные продукты.", url: "https://project16359306.tilda.ws/", domain: "prodsimon.ru", cover: "/work/simon-desktop.webp", mobile: "/work/simon-mobile.webp", theme: "simon", label: "Личный бренд" },
  { id: "bakatkin", title: "Bakatkin Prod", description: "Digital-агентство для брендов одежды.", url: "https://bakatkin-prod.ru/", domain: "bakatkin-prod.ru", cover: "/work/bakatkin-desktop.webp", mobile: "/work/bakatkin-mobile.webp", theme: "bakatkin", label: "Fashion / Digital" },
];
