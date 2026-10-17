"use client";

import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";

const movingPoster = "/media/norma-grab-start.jpg";
const stillPoster = "/media/norma-grab-poster.jpg";

export function HandScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    const scene = root?.closest<HTMLElement>(".scroll-scene");
    const pin = scene?.querySelector<HTMLElement>(".scroll-pin");
    if (!root || !video || !scene || !pin) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let targetTime = 0;
    let sourceLoaded = false;
    let isNearby = false;
    let disposed = false;

    // Keep at most one seek in flight. When it completes, seek to the latest
    // scroll position, rather than playing or queueing intermediate frames.
    const seekToLatest = () => {
      if (reduce.matches || video.readyState < 1 || video.seeking || !Number.isFinite(video.duration)) return;
      const lastFrame = Math.max(0, video.duration - 1 / 120);
      const next = Math.min(lastFrame, Math.max(0, targetTime));
      if (Math.abs(video.currentTime - next) > 1 / 240) video.currentTime = next;
    };

    const syncFrame = () => {
      animationFrame = 0;
      if (disposed || reduce.matches) return;
      const headerHeight = Number.parseFloat(window.getComputedStyle(scene).getPropertyValue("--header-height")) || 0;
      // A tall mobile hero scrolls far enough to reveal the hand before pinning.
      // Keep the original type sizes instead of squeezing the whole hero on screen.
      const stickyTop = Math.min(headerHeight, window.innerHeight - pin.offsetHeight);
      pin.style.setProperty("--scene-pin-top", `${stickyTop}px`);
      const scrollDistance = Math.max(1, scene.offsetHeight - pin.offsetHeight);
      const progress = Math.min(1, Math.max(0, (stickyTop - scene.getBoundingClientRect().top) / scrollDistance));
      scene.style.setProperty("--video-progress", progress.toFixed(5));
      targetTime = Number.isFinite(video.duration) ? progress * video.duration : 0;
      video.pause();
      seekToLatest();
    };

    const scheduleSync = () => {
      if (!disposed && !animationFrame) animationFrame = window.requestAnimationFrame(syncFrame);
    };

    const loadMedia = () => {
      if (sourceLoaded || reduce.matches) return;
      sourceLoaded = true;
      video.preload = "auto";
      video.src = "/media/norma-grab-scroll.mp4";
      video.load();
    };

    const updateMotionPreference = () => {
      video.pause();
      video.poster = reduce.matches ? stillPoster : movingPoster;
      if (reduce.matches) {
        video.removeAttribute("src");
        video.load();
        sourceLoaded = false;
        scene.style.setProperty("--video-progress", "0");
      } else {
        if (isNearby) loadMedia();
        scheduleSync();
      }
    };

    // Prepare the first frame before the section enters the viewport.
    const nearby = new IntersectionObserver(([entry]) => {
      isNearby = entry.isIntersecting;
      if (isNearby) loadMedia();
      scheduleSync();
    }, { rootMargin: "100% 0px", threshold: 0 });
    nearby.observe(scene);
    const resize = new ResizeObserver(scheduleSync);
    resize.observe(scene);
    resize.observe(pin);

    video.addEventListener("loadedmetadata", scheduleSync);
    video.addEventListener("loadeddata", scheduleSync);
    video.addEventListener("seeked", seekToLatest);
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);
    window.addEventListener("pageshow", scheduleSync);
    reduce.addEventListener("change", updateMotionPreference);
    updateMotionPreference();
    void document.fonts.ready.then(scheduleSync);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      nearby.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("pageshow", scheduleSync);
      reduce.removeEventListener("change", updateMotionPreference);
      video.removeEventListener("loadedmetadata", scheduleSync);
      video.removeEventListener("loadeddata", scheduleSync);
      video.removeEventListener("seeked", seekToLatest);
      pin.style.removeProperty("--scene-pin-top");
      video.pause();
    };
  }, []);

  return <div className="hand-scene" ref={rootRef}>
    <video ref={videoRef} muted playsInline disablePictureInPicture preload="none" poster={movingPoster} aria-label="Рука с металлическим диском движется вместе с прокруткой страницы" />
    <div className="scroll-video-cue" aria-hidden="true"><span><ArrowDown size={18} /> Листайте дальше</span><div className="scroll-video-track"><i /></div></div>
  </div>;
}
