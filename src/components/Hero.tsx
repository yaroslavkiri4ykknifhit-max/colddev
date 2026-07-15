"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Globe, Compass, Terminal, Shield, Eye } from "lucide-react";
import { siteContent } from "@/data/site-content";
import { siteConfig } from "@/config/site";
import PrimaryButton from "./PrimaryButton";
import MetallicStar from "./MetallicStar";

export default function Hero() {
  const { label, title, description, cta, features } = siteContent.hero;

  // Split title to highlight "digital-продукты" or "приносят клиентов"
  const titleParts = title.split("digital-продукты");

  // A helper function to render correct icon for trust tags
  const getIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case "websites":
        return <Globe className="w-4 h-4 text-white/40" />;
      case "google ads":
        return <Compass className="w-4 h-4 text-white/40" />;
      case "telegram":
        return <Terminal className="w-4 h-4 text-white/40" />;
      case "mini apps":
        return <Sparkles className="w-4 h-4 text-white/40" />;
      case "automation":
        return <Shield className="w-4 h-4 text-white/40" />;
      case "ui/ux":
        return <Eye className="w-4 h-4 text-white/40" />;
      default:
        return <Sparkles className="w-4 h-4 text-white/40" />;
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-16 overflow-hidden"
    >
      <div className="container mx-auto max-w-[1200px] px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Label Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 rounded-full border border-white/5 bg-white/[0.02] text-xs font-semibold tracking-wider text-text-secondary uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-white/50" />
            {label}
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.05] mb-6 max-w-2xl"
          >
            {titleParts[0]}
            <span className="text-metallic block md:inline">digital-продукты</span>
            {titleParts[1]}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-text-secondary leading-relaxed mb-8 max-w-xl"
          >
            {description}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <PrimaryButton href={siteConfig.contacts.telegram} variant="primary">
              {cta.primary}
              <ArrowRight className="w-4 h-4 ml-2" />
            </PrimaryButton>
            <PrimaryButton href="#projects" variant="secondary">
              {cta.secondary}
            </PrimaryButton>
          </motion.div>

          {/* Features Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full border-t border-white/5 pt-6 flex flex-wrap gap-x-8 gap-y-3"
          >
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                {getIcon(feature)}
                <span>{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Floating Star Graphic Column */}
        <div className="lg:col-span-5 relative h-[350px] lg:h-[450px] flex items-center justify-center">
          {/* Main Large Metallic Star */}
          <div className="absolute top-[20%] left-[25%] lg:left-[20%]">
            <MetallicStar size={160} glowColor="rgba(255, 255, 255, 0.18)" />
          </div>

          {/* Smaller Metallic Star Offset */}
          <div className="absolute bottom-[20%] right-[20%] lg:right-[15%]">
            <MetallicStar size={85} glowColor="rgba(255, 255, 255, 0.1)" className="[animation-delay:-3s]" />
          </div>

          {/* Extra Background Arc Glow */}
          <div className="absolute w-[280px] h-[280px] rounded-full border border-white/5 opacity-40 pointer-events-none" />
          <div className="absolute w-[360px] h-[360px] rounded-full border border-white/5 border-dashed opacity-25 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
