import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Поскольку у вас привязан собственный кастомный домен colddev.pro,
  // basePath должен быть пустым (""), иначе пути к CSS и JS ломаются.
  basePath: "",
};

export default nextConfig;
