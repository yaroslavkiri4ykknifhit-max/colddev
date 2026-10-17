export type ProjectCategory = "Услуги" | "Магазины" | "Бренды";
export type PortfolioProject = {
  id: string; title: string; category: ProjectCategory; description: string;
  url: string; domain: string; cover: string; theme: string; label: string;
};

// Portfolio belongs to the static build. No runtime API or database is required.
export const projects: PortfolioProject[] = [
  { id: "krepkipol", title: "Крепкий пол", category: "Услуги", description: "Полусухая стяжка пола в Гомеле и области.", url: "http://krepkipol.by/", domain: "krepkipol.by", cover: "/work/krepkipol.webp", theme: "floor", label: "Строительство" },
  { id: "climate", title: "КлиматМинск", category: "Услуги", description: "Продажа и установка кондиционеров в Минске.", url: "https://xn--80apbfdcibk4bh.xn--90ais/", domain: "климатминск.бел", cover: "/work/climate.webp", theme: "climate", label: "Климатическая техника" },
  { id: "nwo", title: "New Way Out", category: "Бренды", description: "Образовательный проект об обучении продажам.", url: "https://newwayout.online/", domain: "newwayout.online", cover: "/work/nwo.webp", theme: "nwo", label: "Образование" },
  { id: "aks", title: "АксХоум", category: "Магазины", description: "Интернет-магазин мебели для дома.", url: "https://akshome.by/", domain: "akshome.by", cover: "/work/aks.webp", theme: "aks", label: "Мебель и интерьер" },
  { id: "simon", title: "PRODSIMON", category: "Бренды", description: "Личный бренд и образовательные продукты.", url: "https://prodsimon.ru/", domain: "prodsimon.ru", cover: "/work/simon.webp", theme: "simon", label: "Личный бренд" },
  { id: "bakatkin", title: "Bakatkin Prod", category: "Бренды", description: "Digital-агентство для брендов одежды.", url: "https://bakatkin-prod.ru/", domain: "bakatkin-prod.ru", cover: "/work/bakatkin.webp", theme: "bakatkin", label: "Fashion / Digital" },
];
