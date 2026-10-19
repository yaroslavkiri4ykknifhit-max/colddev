"use client";

import { useEffect, useRef, useState } from "react";

export function CountUp({ value }: { value: number }) {
  const element = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !element.current) return;

    let frame = 0;
    let started = false;
    let startTime: number | undefined;
    setDisplay(0);

    const finish = () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      setDisplay(value);
    };
    const tick = (time: number) => {
      startTime ??= time;
      const progress = Math.min((time - startTime) / 950, 1);
      setDisplay(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      observer.disconnect();
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.5 });

    observer.observe(element.current);
    const onMotionChange = () => { if (motion.matches) finish(); };
    motion.addEventListener("change", onMotionChange);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      motion.removeEventListener("change", onMotionChange);
    };
  }, [value]);

  return (
    <span className="count-up" ref={element}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
