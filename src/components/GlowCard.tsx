"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  lightTheme?: boolean;
  hoverGlow?: boolean;
  delay?: number;
  yOffset?: number;
}

export default function GlowCard({
  children,
  className = "",
  lightTheme = false,
  hoverGlow = true,
  delay = 0,
  yOffset = 20
}: GlowCardProps) {
  const cardStyleClass = lightTheme ? "glass-card-light" : "glass-card";
  const hoverClass = hoverGlow && !lightTheme ? "glass-card-border-glow" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1] // sleek custom ease-out
      }}
      whileHover={
        hoverGlow
          ? {
              y: -4,
              transition: { duration: 0.25, ease: "easeOut" }
            }
          : undefined
      }
      className={`relative rounded-lg p-6 overflow-hidden transition-all duration-300 ${cardStyleClass} ${hoverClass} ${className}`}
    >
      {/* Light sweep animation on hover */}
      {hoverGlow && !lightTheme && (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          <motion.div
            initial={{ left: "-100%" }}
            whileHover={{ left: "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
          />
        </div>
      )}

      {children}
    </motion.div>
  );
}
