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
  ".admin-auth-benefits > div",
].join(",");

const tiltSelectors = [
  ".neo-service-card",
  ".pricing-free-card",
  ".neo-case",
  ".cabinet-feature-list > article",
  ".dashboard-now-card",
  ".client-next-step",
  ".payment-focus",
  ".admin-next-action",
  ".admin-quick-actions > button",
  ".admin-kpi-action",
].join(",");

const spotlightSelectors = [
  ".neo-service-card",
  ".pricing-free-card",
  ".neo-case",
  ".cabinet-screen",
  ".dashboard-now-card",
  ".client-next-step",
  ".payment-focus",
  ".admin-next-action",
  ".admin-quick-actions > button",
  ".admin-kpi",
].join(",");

const magneticSelectors = [
  ".button",
  ".neo-control-bar > a",
  ".case-full-link",
].join(",");

const counterSelectors = [
  ".tile-progress > strong",
  ".admin-kpi > strong",
  ".stats-card > strong",
  ".report-stat > strong",
].join(",");

const loopSelectors = [
  ".hard-line-track",
  ".tile-progress",
  ".tile-update",
  ".orb-a",
  ".orb-b",
  ".liquid-ring",
  ".project-progress-track > span",
].join(",");

function queryWithSelf(scope: ParentNode, selector: string) {
  const elements = Array.from(scope.querySelectorAll<HTMLElement>(selector));
  if (scope instanceof HTMLElement && scope.matches(selector)) elements.unshift(scope);
  return elements;
}

export function AmbientExperience() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLSpanElement>(null);
  const cursorCoreRef = useRef<HTMLSpanElement>(null);
  const cursorRingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const fullMotion = finePointer && !reduceMotion && (!deviceMemory || deviceMemory > 4);
    const observedReveal = new WeakSet<HTMLElement>();
    const observedCounter = new WeakSet<HTMLElement>();
    const observedLoop = new WeakSet<HTMLElement>();
    const cleanups: Array<() => void> = [];
    let scrollFrame = 0;
    let pointerFrame = 0;
    let activeTilt: HTMLElement | null = null;
    let activeMagnet: HTMLElement | null = null;
    let activeSpotlight: HTMLElement | null = null;
    let pointerVisible = false;
    const pointer = { targetX: -100, targetY: -100, ringX: -100, ringY: -100 };

    root.classList.add("motion-ready");
    root.classList.toggle("motion-lite", !fullMotion);

    const updateProgress = () => {
      scrollFrame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateProgress);
    };

    const revealObserver = !reduceMotion && "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const element = entry.target as HTMLElement;
            element.classList.add("is-revealed");
            revealObserver?.unobserve(element);
          });
        }, { rootMargin: "0px 0px -7% 0px", threshold: 0.08 })
      : undefined;

    const counterObserver = !reduceMotion && "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const element = entry.target as HTMLElement;
            counterObserver?.unobserve(element);
            const original = element.dataset.motionCount;
            if (!original) return;
            const match = original.match(/^(\+?)(\d+(?:[.,]\d+)?)(%?)$/);
            if (!match) return;
            const prefix = match[1];
            const target = Number(match[2].replace(",", "."));
            const suffix = match[3];
            const decimals = match[2].includes(",") || match[2].includes(".") ? 1 : 0;
            const startedAt = performance.now();
            const duration = 1050;
            const tick = (time: number) => {
              const raw = Math.min(1, (time - startedAt) / duration);
              const eased = 1 - Math.pow(1 - raw, 4);
              const value = target * eased;
              element.textContent = `${prefix}${value.toFixed(decimals).replace(".", ",")}${suffix}`;
              if (raw < 1) window.requestAnimationFrame(tick);
              else element.textContent = original;
            };
            window.requestAnimationFrame(tick);
          });
        }, { threshold: 0.45 })
      : undefined;

    const loopObserver = "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => entry.target.classList.toggle("is-motion-visible", entry.isIntersecting));
        }, { rootMargin: "20% 0px 20% 0px" })
      : undefined;

    const registerMotion = (scope: ParentNode = document) => {
      queryWithSelf(scope, revealSelectors).forEach((element, index) => {
        if (observedReveal.has(element)) return;
        observedReveal.add(element);
        element.dataset.reveal = "";
        element.style.setProperty("--reveal-order", String(index % 5));
        if (element.matches(".neo-heading, .cabinet-title-row, .case-article-heading")) {
          element.dataset.revealKind = "heading";
        } else if (element.matches(".neo-service-card, .neo-case, .cabinet-feature-list > article")) {
          element.dataset.revealKind = "card";
        }
        if (!revealObserver || element.getBoundingClientRect().top < window.innerHeight * 0.94) {
          element.classList.add("is-revealed");
        } else {
          revealObserver.observe(element);
        }
      });

      if (fullMotion) {
        queryWithSelf(scope, tiltSelectors).forEach((element) => element.classList.add("motion-tilt"));
        queryWithSelf(scope, magneticSelectors).forEach((element) => {
          if (!(element instanceof HTMLButtonElement && element.disabled)) element.classList.add("motion-magnetic");
        });
        queryWithSelf(scope, spotlightSelectors).forEach((element) => {
          if (element.querySelector(":scope > .motion-spotlight")) return;
          element.classList.add("motion-spot");
          const light = document.createElement("span");
          light.className = "motion-spotlight";
          light.setAttribute("aria-hidden", "true");
          element.append(light);
        });
      }

      queryWithSelf(scope, counterSelectors).forEach((element) => {
        if (observedCounter.has(element)) return;
        const value = element.textContent?.trim() ?? "";
        if (!/^\+?\d+(?:[.,]\d+)?%?$/.test(value)) return;
        observedCounter.add(element);
        element.dataset.motionCount = value;
        if (counterObserver) counterObserver.observe(element);
      });

      queryWithSelf(scope, loopSelectors).forEach((element) => {
        if (observedLoop.has(element)) return;
        observedLoop.add(element);
        element.classList.add("motion-managed-loop");
        if (loopObserver) loopObserver.observe(element);
        else element.classList.add("is-motion-visible");
      });

      queryWithSelf(scope, ".neo-hero-scene").forEach((element) => element.classList.add("motion-scene"));
    };

    const resetInteractiveElement = (element: HTMLElement | null) => {
      if (!element) return;
      element.style.removeProperty("--tilt-rx");
      element.style.removeProperty("--tilt-ry");
      element.style.removeProperty("--magnetic-x");
      element.style.removeProperty("--magnetic-y");
      element.classList.remove("is-motion-hovered");
    };

    const drawPointer = () => {
      pointerFrame = 0;
      pointer.ringX += (pointer.targetX - pointer.ringX) * 0.18;
      pointer.ringY += (pointer.targetY - pointer.ringY) * 0.18;
      cursorCoreRef.current?.style.setProperty("transform", `translate3d(${pointer.targetX}px, ${pointer.targetY}px, 0)`);
      cursorRingRef.current?.style.setProperty("transform", `translate3d(${pointer.ringX}px, ${pointer.ringY}px, 0)`);
      root.style.setProperty("--pointer-x", `${pointer.ringX}px`);
      root.style.setProperty("--pointer-y", `${pointer.ringY}px`);

      const scene = document.querySelector<HTMLElement>(".neo-hero-scene.motion-scene");
      if (scene) {
        const x = (pointer.targetX / Math.max(window.innerWidth, 1) - 0.5) * 2;
        const y = (pointer.targetY / Math.max(window.innerHeight, 1) - 0.5) * 2;
        scene.style.setProperty("--scene-rx", `${(-y * 1.4).toFixed(2)}deg`);
        scene.style.setProperty("--scene-ry", `${(x * 2.1).toFixed(2)}deg`);
        scene.style.setProperty("--scene-x", `${(x * 8).toFixed(2)}px`);
        scene.style.setProperty("--scene-y", `${(y * 6).toFixed(2)}px`);
        scene.style.setProperty("--scene-back-x", `${(-x * 5.6).toFixed(2)}px`);
        scene.style.setProperty("--scene-back-y", `${(-y * 4.2).toFixed(2)}px`);
      }

      if (Math.abs(pointer.targetX - pointer.ringX) > 0.08 || Math.abs(pointer.targetY - pointer.ringY) > 0.08) {
        pointerFrame = window.requestAnimationFrame(drawPointer);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      if (!pointerVisible) {
        pointerVisible = true;
        root.classList.add("pointer-is-visible");
        pointer.ringX = event.clientX;
        pointer.ringY = event.clientY;
      }
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(drawPointer);

      const target = event.target instanceof Element ? event.target : null;
      const tilt = target?.closest<HTMLElement>(".motion-tilt") ?? null;
      const magnet = target?.closest<HTMLElement>(".motion-magnetic") ?? null;
      const spotlight = target?.closest<HTMLElement>(".motion-spot") ?? null;

      if (activeTilt !== tilt) resetInteractiveElement(activeTilt);
      if (activeMagnet !== magnet && activeMagnet !== activeTilt) resetInteractiveElement(activeMagnet);
      if (activeSpotlight !== spotlight) activeSpotlight?.classList.remove("is-motion-hovered");
      activeTilt = tilt;
      activeMagnet = magnet;
      activeSpotlight = spotlight;

      if (tilt) {
        const rect = tilt.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        tilt.style.setProperty("--tilt-rx", `${(-y * 2.2).toFixed(2)}deg`);
        tilt.style.setProperty("--tilt-ry", `${(x * 2.8).toFixed(2)}deg`);
        tilt.classList.add("is-motion-hovered");
      }

      if (magnet) {
        const rect = magnet.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 7;
        magnet.style.setProperty("--magnetic-x", `${x.toFixed(2)}px`);
        magnet.style.setProperty("--magnetic-y", `${y.toFixed(2)}px`);
      }

      if (spotlight) {
        const rect = spotlight.getBoundingClientRect();
        spotlight.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        spotlight.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
        spotlight.classList.add("is-motion-hovered");
      }
    };

    const onPointerLeave = () => {
      root.classList.remove("pointer-is-visible");
      pointerVisible = false;
      resetInteractiveElement(activeTilt);
      resetInteractiveElement(activeMagnet);
      activeSpotlight?.classList.remove("is-motion-hovered");
      activeTilt = null;
      activeMagnet = null;
      activeSpotlight = null;
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>(".button, .product-nav button, .mobile-bottom-nav button, .admin-mobile-bottom-nav button, .case-gallery-arrow")
        : null;
      if (!target || target instanceof HTMLButtonElement && target.disabled) return;
      const rect = target.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "motion-ripple";
      ripple.style.setProperty("--ripple-x", `${event.clientX - rect.left}px`);
      ripple.style.setProperty("--ripple-y", `${event.clientY - rect.top}px`);
      target.append(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    };

    const onVisibilityChange = () => root.classList.toggle("motion-paused", document.hidden);

    registerMotion();
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) registerMotion(node);
      }));
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    if (fullMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onPointerLeave);
    }

    cleanups.push(
      () => window.removeEventListener("scroll", onScroll),
      () => document.removeEventListener("pointerdown", onPointerDown),
      () => document.removeEventListener("visibilitychange", onVisibilityChange),
      () => window.removeEventListener("pointermove", onPointerMove),
      () => document.documentElement.removeEventListener("mouseleave", onPointerLeave),
    );

    return () => {
      revealObserver?.disconnect();
      counterObserver?.disconnect();
      loopObserver?.disconnect();
      mutationObserver.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      root.classList.remove("motion-ready", "motion-lite", "motion-paused", "pointer-is-visible");
    };
  }, [pathname]);

  return (
    <div className="experience-layer" aria-hidden="true">
      <span className="page-progress" ref={progressRef} />
      <span className="pointer-aura" />
      <span className="motion-cursor-core" ref={cursorCoreRef} />
      <span className="motion-cursor-ring" ref={cursorRingRef} />
    </div>
  );
}
