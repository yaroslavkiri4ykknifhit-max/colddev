"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const revealSelectors = [
  ".neo-heading",
  ".neo-service-card",
  ".pricing-brief",
  ".platform-inner",
  ".cabinet-title-row",
  ".cabinet-screen",
  ".cabinet-feature-list > article",
  ".neo-process-list > article",
  ".neo-case",
  ".cases-order-strip",
  ".neo-faq-grid",
  ".neo-final-card",
  ".case-article > *",
  ".auth-content > *",
  ".admin-auth-card > *",
].join(",");

export function AmbientExperience() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let animationFrame = 0;

    root.classList.add("motion-ready");

    const updateProgress = () => {
      animationFrame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateProgress);
    };

    const onPointerMove = (event: PointerEvent) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelectors));
    elements.forEach((element, index) => {
      element.dataset.reveal = "";
      element.style.setProperty("--reveal-order", String(index % 4));
    });

    let observer: IntersectionObserver | undefined;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-revealed"));
    } else {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer?.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

      elements.forEach((element) => {
        if (element.getBoundingClientRect().top < window.innerHeight * 0.94) {
          element.classList.add("is-revealed");
        } else {
          observer?.observe(element);
        }
      });
    }

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (finePointer && !reduceMotion) window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [pathname]);

  return (
    <div className="experience-layer" aria-hidden="true">
      <span className="page-progress" ref={progressRef} />
      <span className="pointer-aura" />
    </div>
  );
}
