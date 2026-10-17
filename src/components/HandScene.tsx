"use client";
import { RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
export function HandScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const root = rootRef.current; const video = videoRef.current;
    if (!root || !video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let hasPlayed = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!hasPlayed) { video.src = "/media/norma-grab.mp4"; video.load(); hasPlayed = true; setLoaded(true); }
        if (!reduce.matches && !video.ended) void video.play().catch(() => {});
      } else video.pause();
    }, { threshold: 0.25 });
    observer.observe(root);
    return () => { observer.disconnect(); video.pause(); };
  }, []);
  const replay = () => {
    const video = videoRef.current; if (!video) return;
    if (!video.getAttribute("src")) { video.src = "/media/norma-grab.mp4"; setLoaded(true); }
    video.currentTime = 0; void video.play().catch(() => {});
  };
  return <div className="hand-scene" ref={rootRef}><video ref={videoRef} muted playsInline preload="none" poster="/media/norma-grab-poster.jpg" aria-label="Рука подхватывает металлический диск" /><button className="video-replay" type="button" onClick={replay} aria-label="Повторить анимацию с рукой"><RotateCcw size={15} /><span>{loaded ? "Ещё раз" : "Смотреть"}</span></button></div>;
}
