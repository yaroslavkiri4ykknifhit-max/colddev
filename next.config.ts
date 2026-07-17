import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // GitHub Pages serves nested static routes most reliably as folders.
  trailingSlash: true,
  // Поскольку у вас привязан собственный кастомный домен colddev.pro,
  // basePath должен быть пустым (""), иначе пути к CSS и JS ломаются.
  basePath: "",
};

export default nextConfig;
