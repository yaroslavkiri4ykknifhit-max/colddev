import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Если вы используете домен *.github.io/colddev, то basePath должен быть "/colddev".
  // Если у вас привязан свой личный кастомный домен (например, yaroslav-digital.com),
  // то basePath должен быть пустой строкой "".
  basePath: process.env.NODE_ENV === "production" ? "/colddev" : "",
};

export default nextConfig;
