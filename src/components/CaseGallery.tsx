"use client";

import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import { useMemo, useState } from "react";

type CaseGalleryProps = {
  images?: string[];
  title: string;
  compact?: boolean;
};

export function CaseGallery({ images = [], title, compact = false }: CaseGalleryProps) {
  const safeImages = useMemo(() => images.map((image) => image.trim()).filter(Boolean), [images]);
  const [activeIndex, setActiveIndex] = useState(0);

  const currentIndex = Math.min(activeIndex, Math.max(safeImages.length - 1, 0));
  const hasImages = safeImages.length > 0;
  const canNavigate = safeImages.length > 1;
  const move = (direction: -1 | 1) => {
    if (!canNavigate) return;
    setActiveIndex((current) => (current + direction + safeImages.length) % safeImages.length);
  };

  return (
    <div className={`case-gallery ${compact ? "is-compact" : ""}`} aria-label={`Фотографии кейса: ${title}`}>
      {hasImages ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={safeImages[currentIndex]} alt={`${title}, фото ${currentIndex + 1}`} />
      ) : (
        <div className="case-gallery-placeholder">
          <Images aria-hidden="true" />
          <span>Добавьте фотографии кейса в админке</span>
        </div>
      )}

      {canNavigate && (
        <>
          <button className="case-gallery-arrow case-gallery-arrow-left" type="button" aria-label="Предыдущее фото" onClick={() => move(-1)}>
            <ChevronLeft />
          </button>
          <button className="case-gallery-arrow case-gallery-arrow-right" type="button" aria-label="Следующее фото" onClick={() => move(1)}>
            <ChevronRight />
          </button>
          <div className="case-gallery-counter" aria-live="polite">{currentIndex + 1} / {safeImages.length}</div>
          <div className="case-gallery-dots" aria-hidden="true">
            {safeImages.map((image, index) => <span className={index === currentIndex ? "is-active" : ""} key={`${image}-${index}`} />)}
          </div>
        </>
      )}
    </div>
  );
}
