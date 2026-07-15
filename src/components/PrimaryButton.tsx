"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  href?: string;
}

export default function PrimaryButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  href
}: PrimaryButtonProps) {
  const isPrimary = variant === "primary";

  const buttonStyle = isPrimary
    ? "bg-gradient-to-b from-white to-[#e5e5ea] text-black shadow-[0_4px_12px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,1)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.15),inset_0_1px_0_rgba(255,255,255,1)]"
    : "bg-black/40 border border-white/10 text-white hover:bg-white/5 hover:border-white/20";

  const content = (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`relative inline-flex items-center justify-center font-medium py-3 px-6 rounded-md transition-all duration-200 cursor-pointer overflow-hidden ${buttonStyle} ${className}`}
      style={{
        borderRadius: "12px",
      }}
    >
      {/* Primary button glare effect */}
      {isPrimary && (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full hover:animate-[shine_1s_ease]" />
      )}
      {children}
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  return content;
}
