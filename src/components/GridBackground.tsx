"use client";

import { motion } from "framer-motion";

export default function GridBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden bg-background pointer-events-none">
      {/* 1. Fine rectangular grid */}
      <div className="absolute inset-0 w-full h-full grid-bg opacity-30" />

      {/* 2. Concentric circles / arcs (SVG vectors) */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] opacity-10">
        <svg viewBox="0 0 1000 1000" fill="none" className="w-full h-full text-white">
          <circle cx="500" cy="500" r="450" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <circle cx="500" cy="500" r="300" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="500" cy="500" r="150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 5" />
          {/* Decorative diagonal crossing lines */}
          <line x1="150" y1="150" x2="850" y2="850" stroke="currentColor" strokeWidth="0.25" />
          <line x1="850" y1="150" x2="150" y2="850" stroke="currentColor" strokeWidth="0.25" />
        </svg>
      </div>

      {/* Another offset circle in the bottom right */}
      <div className="absolute -bottom-[20%] -right-[10%] w-[800px] h-[800px] opacity-5">
        <svg viewBox="0 0 1000 1000" fill="none" className="w-full h-full text-white">
          <circle cx="500" cy="500" r="400" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="500" cy="500" r="250" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6 6" />
        </svg>
      </div>

      {/* 3. Radial gradients / Soft lighting spots */}
      {/* Hero section main glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] glow-spot" />
      
      {/* Bento grid section glow */}
      <div className="absolute top-[30%] left-[10%] w-[500px] h-[500px] glow-spot" style={{ opacity: 0.12 }} />
      
      {/* Results/Pricing section glow */}
      <div className="absolute top-[60%] right-[10%] w-[600px] h-[600px] glow-spot" style={{ opacity: 0.1 }} />

      {/* Final CTA glow */}
      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] glow-spot" style={{ opacity: 0.15 }} />

      {/* Vignette / Edge dark gradient */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,#000000_100%] opacity-85" />
    </div>
  );
}
