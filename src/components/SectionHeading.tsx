"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  className = ""
}: SectionHeadingProps) {
  const isLeft = align === "left";

  return (
    <div
      className={`flex flex-col mb-12 md:mb-16 ${
        isLeft ? "items-start text-left" : "items-center text-center"
      } ${className}`}
    >
      {/* 1. Label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full border border-white/5 bg-white/[0.02] text-xs font-semibold tracking-wider text-text-secondary uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
      >
        <span className="w-1 h-1 rounded-full bg-white/40" />
        {label}
      </motion.div>

      {/* 2. Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-3xl leading-[1.1] text-metallic"
      >
        {title}
      </motion.h2>

      {/* 3. Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-base md:text-lg text-text-secondary max-w-2xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
