"use client";

import { motion } from "framer-motion";

interface MetallicStarProps {
  size?: number;
  className?: string;
  glowColor?: string;
  animate?: boolean;
}

export default function MetallicStar({
  size = 120,
  className = "",
  glowColor = "rgba(255, 255, 255, 0.15)",
  animate = true
}: MetallicStarProps) {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
      animate={
        animate
          ? {
              y: [0, -8, 0],
              rotate: [0, 5, 0],
            }
          : undefined
      }
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.05, rotate: 15 }}
    >
      {/* Background Soft Glow */}
      <div
        className="absolute inset-0 rounded-full filter blur-[30px]"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, rgba(255,255,255,0) 70%)`,
          transform: "scale(1.5)",
        }}
      />

      {/* SVG Volumetric Metallic Star */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
      >
        <defs>
          {/* Light Silver Gradient */}
          <linearGradient id="silver-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#d1d1d6" />
            <stop offset="100%" stopColor="#8e8e93" />
          </linearGradient>

          {/* Medium Silver Gradient */}
          <linearGradient id="silver-med" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e5e5ea" />
            <stop offset="50%" stopColor="#aeaeb2" />
            <stop offset="100%" stopColor="#48484a" />
          </linearGradient>

          {/* Dark Silver Gradient for shading */}
          <linearGradient id="silver-dark" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8e8e93" />
            <stop offset="50%" stopColor="#3a3a3c" />
            <stop offset="100%" stopColor="#1c1c1e" />
          </linearGradient>

          {/* Deep shadow gradient for contrast */}
          <linearGradient id="silver-shadow" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#2c2c2e" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
        </defs>

        {/* Top Tip - Left Face (Highlighted) */}
        <path d="M50 0 L50 50 L42 42 Z" fill="url(#silver-light)" />
        {/* Top Tip - Right Face (Medium Shadow) */}
        <path d="M50 0 L58 42 L50 50 Z" fill="url(#silver-med)" />

        {/* Right Tip - Top Face (Light Highlight) */}
        <path d="M100 50 L50 50 L58 42 Z" fill="url(#silver-light)" />
        {/* Right Tip - Bottom Face (Dark Shadow) */}
        <path d="M100 50 L58 58 L50 50 Z" fill="url(#silver-dark)" />

        {/* Bottom Tip - Right Face (Medium Highlight) */}
        <path d="M50 100 L50 50 L58 58 Z" fill="url(#silver-med)" />
        {/* Bottom Tip - Left Face (Deep Shadow) */}
        <path d="M50 100 L42 58 L50 50 Z" fill="url(#silver-shadow)" />

        {/* Left Tip - Bottom Face (Medium Highlight) */}
        <path d="M0 50 L50 50 L42 58 Z" fill="url(#silver-med)" />
        {/* Left Tip - Top Face (Deep Shadow) */}
        <path d="M0 50 L42 42 L50 50 Z" fill="url(#silver-dark)" />
      </svg>
    </motion.div>
  );
}
