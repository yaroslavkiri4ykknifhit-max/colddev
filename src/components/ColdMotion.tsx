"use client";

import { useEffect } from "react";

export function ColdMotion() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = document.querySelectorAll<HTMLElement>(".cold-site .cd-reveal");
    if (media.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("cd-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08 });
    elements.forEach((element) => {
      // Keep initial content visible; enhance only sections below the viewport.
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add("cd-will-reveal");
        observer.observe(element);
      }
    });
    const revealAll = () => {
      if (media.matches) elements.forEach((element) => element.classList.add("cd-visible"));
    };
    media.addEventListener("change", revealAll);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", revealAll);
      elements.forEach((element) => element.classList.remove("cd-will-reveal"));
    };
  }, []);
  return null;
}
