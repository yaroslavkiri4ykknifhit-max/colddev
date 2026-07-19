import type { PortfolioItem } from "@/types";

export function parseImageUrls(value: string) {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function caseImages(item: Pick<PortfolioItem, "imageUrl" | "imageUrls">) {
  const images = item.imageUrls?.length ? item.imageUrls : item.imageUrl ? [item.imageUrl] : [];
  return images.map((image) => image.trim()).filter(Boolean);
}
