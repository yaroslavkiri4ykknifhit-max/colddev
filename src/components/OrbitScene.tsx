"use client";

import { useEffect, useRef } from "react";
import { fallbackGrid, gridLines, orbitLayout, rotatePoint, traceFrontLine } from "@/lib/orbit-geometry";

const graticules = gridLines();
const fallbackViews = [{ name: "wide", width: 1600, height: 800 }, { name: "narrow", width: 400, height: 620 }];
const staticGrids = fallbackViews.map((view) => ({ ...view, paths: fallbackGrid(view.width, view.height), layout: orbitLayout(view.width, view.height) }));
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function OrbitScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const panel = root?.parentElement;
    const context = canvas?.getContext("2d", { alpha: false });
    if (!root || !canvas || !panel || !context) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(min-width: 701px) and (hover: hover) and (pointer: fine)");
    let width = 0;
    let height = 0;
    let scale = 1;
    let frame = 0;
    let lastTime = 0;
    let visible = false;
    let disposed = false;
    let pointer: { x: number; y: number } | null = null;
    const state = { yaw: 0, pitch: 30, heading: 141 };
    const target = { ...state };

    const paint = () => {
      const { cx, cy, radius, disc, marker } = orbitLayout(width, height);
      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.fillStyle = "#000";
      context.fillRect(0, 0, width, height);
      context.fillStyle = "#2c2c2e";
      context.beginPath(); context.arc(cx, cy, radius, 0, Math.PI * 2); context.fill();
      context.strokeStyle = "#3a3a3c";
      context.lineWidth = 0.8;
      const move = (point: { x: number; y: number }) => context.moveTo(cx + point.x * radius, cy - point.y * radius);
      const line = (point: { x: number; y: number }) => context.lineTo(cx + point.x * radius, cy - point.y * radius);
      for (const points of graticules) {
        context.beginPath(); traceFrontLine(points, state, move, line); context.stroke();
      }
      context.beginPath(); context.arc(cx, cy, radius, 0, Math.PI * 2); context.stroke();
      const dot = rotatePoint(marker, state);
      if (dot.z > 0) {
        const x = cx + dot.x * radius;
        const y = cy - dot.y * radius;
        const direction = state.heading * Math.PI / 180;
        const spread = 17 * Math.PI / 180;
        const reach = disc * 2.5;
        const beam = context.createRadialGradient(x, y, disc * 0.2, x, y, reach);
        beam.addColorStop(0, "rgba(61,139,253,1)");
        beam.addColorStop(0.45, "rgba(61,139,253,0.6)");
        beam.addColorStop(1, "rgba(61,139,253,0)");
        const feather = (value: number) => value < 0.55 ? 1 : Math.cos((value - 0.55) / 0.45 * Math.PI / 2) ** 2;
        context.save();
        context.beginPath(); context.arc(cx, cy, radius, 0, Math.PI * 2); context.clip();
        context.fillStyle = beam;
        for (let index = 0; index < 24; index++) {
          const edge = 1 - index / 24;
          context.globalAlpha = 0.6 * (feather(1 - (index + 1) / 24) - feather(edge));
          context.beginPath(); context.moveTo(x, y);
          context.arc(x, y, reach, direction - spread * edge, direction + spread * edge);
          context.closePath(); context.fill();
        }
        context.restore();
        context.save();
        context.shadowColor = "rgba(0,0,0,0.5)";
        context.shadowBlur = disc * 0.28;
        context.shadowOffsetY = disc * 0.06;
        context.fillStyle = "#d6d6da";
        context.beginPath(); context.arc(x, y, disc / 2, 0, Math.PI * 2); context.fill();
        context.restore();
        context.fillStyle = "#3d8bfd";
        context.beginPath(); context.arc(x, y, disc * 0.29, 0, Math.PI * 2); context.fill();
      }
      root.dataset.ready = "true";
    };

    const animate = (time: number) => {
      frame = 0;
      if (disposed || !visible || document.hidden) { lastTime = 0; return; }
      const delta = lastTime ? Math.min(time - lastTime, 48) : 16.7;
      lastTime = time;
      const ease = reduce.matches ? 1 : 1 - Math.exp(-delta / 110);
      const angle = ((target.heading - state.heading + 540) % 360) - 180;
      state.yaw += (target.yaw - state.yaw) * ease;
      state.pitch += (target.pitch - state.pitch) * ease;
      state.heading = (state.heading + angle * ease + 360) % 360;
      paint();
      if (!reduce.matches && Math.max(Math.abs(target.yaw - state.yaw), Math.abs(target.pitch - state.pitch), Math.abs(angle)) > 0.02) frame = requestAnimationFrame(animate);
      else lastTime = 0;
    };
    const schedule = () => {
      if (!disposed && visible && !document.hidden && !frame) frame = requestAnimationFrame(animate);
    };
    const setTarget = () => {
      if (reduce.matches) { Object.assign(target, { yaw: 0, pitch: 30, heading: 141 }); }
      else if (pointer && finePointer.matches) {
        const rect = panel.getBoundingClientRect();
        target.yaw = (pointer.x - rect.left) / rect.width * 30 - 15;
        target.pitch = 30 - ((pointer.y - rect.top) / rect.height - 0.5) * 18;
        const layout = orbitLayout(width, height);
        const dot = rotatePoint(layout.marker, state);
        target.heading = (Math.atan2(pointer.y - rect.top - (layout.cy - dot.y * layout.radius), pointer.x - rect.left - (layout.cx + dot.x * layout.radius)) * 180 / Math.PI + 360) % 360;
      } else {
        const rect = panel.getBoundingClientRect();
        const progress = finePointer.matches ? 0 : clamp((window.innerHeight / 2 - rect.top - rect.height / 2) / window.innerHeight, -1, 1);
        target.yaw = progress * 10;
        target.pitch = 30 + progress * 5;
        target.heading = 141 + progress * 18;
      }
      schedule();
    };
    const resize = () => {
      width = panel.clientWidth; height = panel.clientHeight;
      if (!width || !height) return;
      scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * scale); canvas.height = Math.round(height * scale);
      paint(); setTarget();
    };
    const movePointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer = { x: event.clientX, y: event.clientY }; setTarget();
    };
    const leavePointer = () => { pointer = null; setTarget(); };
    const scroll = () => { if (visible && !finePointer.matches) setTarget(); };
    const visibility = () => {
      cancelAnimationFrame(frame); frame = 0; lastTime = 0;
      if (!document.hidden) setTarget();
    };
    const preference = () => {
      cancelAnimationFrame(frame); frame = 0; lastTime = 0;
      if (reduce.matches) { Object.assign(state, { yaw: 0, pitch: 30, heading: 141 }); paint(); }
      setTarget();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) setTarget();
      else { cancelAnimationFrame(frame); frame = 0; lastTime = 0; }
    }, { rootMargin: "100px 0px" });
    const sizing = new ResizeObserver(resize);
    resize(); observer.observe(panel); sizing.observe(panel);
    panel.addEventListener("pointermove", movePointer, { passive: true });
    panel.addEventListener("pointerleave", leavePointer);
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    reduce.addEventListener("change", preference);
    finePointer.addEventListener("change", leavePointer);
    return () => {
      disposed = true; cancelAnimationFrame(frame);
      observer.disconnect(); sizing.disconnect();
      panel.removeEventListener("pointermove", movePointer);
      panel.removeEventListener("pointerleave", leavePointer);
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("visibilitychange", visibility);
      reduce.removeEventListener("change", preference);
      finePointer.removeEventListener("change", leavePointer);
    };
  }, []);

  return <div className="orbit-scene" ref={rootRef} aria-hidden="true">
    {staticGrids.map(({ name, width, height, paths, layout }) => {
      const dot = rotatePoint(layout.marker, { yaw: 0, pitch: 30 });
      const x = layout.cx + dot.x * layout.radius;
      const y = layout.cy - dot.y * layout.radius;
      const reach = layout.disc * 2.5;
      const start = 124 * Math.PI / 180;
      const end = 158 * Math.PI / 180;
      const beamPath = `M${x},${y}L${x + reach * Math.cos(start)},${y + reach * Math.sin(start)}A${reach},${reach} 0 0 1 ${x + reach * Math.cos(end)},${y + reach * Math.sin(end)}Z`;
      return <svg className={`orbit-fallback orbit-fallback-${name}`} key={name} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          <radialGradient id={`orbit-beam-${name}`} cx={x} cy={y} r={reach} gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#3d8bfd" stopOpacity="0.7" /><stop offset="0.45" stopColor="#3d8bfd" stopOpacity="0.4" /><stop offset="1" stopColor="#3d8bfd" stopOpacity="0" /></radialGradient>
          <filter id={`orbit-feather-${name}`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
          <clipPath id={`orbit-clip-${name}`}><circle cx={layout.cx} cy={layout.cy} r={layout.radius} /></clipPath>
        </defs>
        <rect width={width} height={height} fill="#000" />
        <circle cx={layout.cx} cy={layout.cy} r={layout.radius} fill="#2c2c2e" stroke="#3a3a3c" />
        <g fill="none" stroke="#3a3a3c" strokeWidth="0.8">{paths.map((path, index) => <path key={index} d={path} />)}</g>
        <g clipPath={`url(#orbit-clip-${name})`}><path d={beamPath} fill={`url(#orbit-beam-${name})`} filter={`url(#orbit-feather-${name})`} /></g>
        <circle cx={x} cy={y} r={layout.disc / 2} fill="#d6d6da" />
        <circle cx={x} cy={y} r={layout.disc * 0.29} fill="#3d8bfd" />
      </svg>;
    })}
    <canvas ref={canvasRef} />
  </div>;
}
