"use client";

export default function CRTOverlay() {
  return (
    <>
      {/* CRT scanline grids */}
      <div className="crt-overlay" />
      {/* Vignette curvature corner shadow */}
      <div className="fixed inset-0 pointer-events-none z-[9998] crt-shadow" />
    </>
  );
}
