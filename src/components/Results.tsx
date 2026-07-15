"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, CheckCircle, Smartphone, Zap } from "lucide-react";
import { siteContent } from "@/data/site-content";
import GlowCard from "./GlowCard";

export default function Results() {
  const { results } = siteContent;

  const getMetricIcon = (label: string) => {
    if (label.includes("проектов")) return <CheckCircle className="w-5 h-5 text-white/50" />;
    if (label.includes("PageSpeed")) return <Zap className="w-5 h-5 text-white/50" />;
    if (label.includes("экран")) return <Smartphone className="w-5 h-5 text-white/50" />;
    return <TrendingUp className="w-5 h-5 text-white/50" />;
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-black/40 border-y border-white/5">
      <div className="container mx-auto max-w-[1200px] px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Descriptive info */}
        <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full border border-white/5 bg-white/[0.02] text-xs font-semibold tracking-wider text-text-secondary uppercase">
            <TrendingUp className="w-3.5 h-3.5 text-white/50" />
            Результаты
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.1] text-metallic">
            Результат, который можно измерить
          </h2>

          <p className="text-base text-text-secondary leading-relaxed mb-8 max-w-lg">
            Любое техническое или визуальное решение имеет одну цель — приносить пользу вашему бизнесу. Я проектирую интерфейсы и настраиваю рекламу, ориентируясь на конкретные бизнес-показатели, такие как конверсия, лояльность клиентов и автоматизация рутины.
          </p>

          {/* Simple bullet points */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white mt-0.5">
                ✓
              </div>
              <p className="text-sm text-text-secondary">Только прозрачные метрики без нереалистичных обещаний</p>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white mt-0.5">
                ✓
              </div>
              <p className="text-sm text-text-secondary">Интеграция сквозной аналитики для контроля окупаемости инвестиций</p>
            </div>
          </div>
        </div>

        {/* Right Column: Angled Volumetric Cards Stacking like in the reference */}
        <div className="lg:col-span-6 relative h-[380px] sm:h-[450px] w-full flex items-center justify-center lg:justify-end z-10">
          {/* Background Decorative Circle */}
          <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full border border-white/5 opacity-10 pointer-events-none" />

          {/* Metric Card 1 (Top Left, tilted slightly right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30, rotate: -4 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, rotate: -4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.03, y: -4, rotate: -2, zIndex: 30 }}
            className="absolute top-[5%] left-[5%] sm:left-[15%] w-[220px] p-5 rounded-lg border border-white/10 bg-[#0a0a0c] shadow-[0_15px_45px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              {getMetricIcon(results[0].label)}
              <span className="text-[9px] uppercase tracking-wider text-text-tertiary font-bold">Успех</span>
            </div>
            <div className="text-3xl font-extrabold text-white mb-1">{results[0].value}</div>
            <div className="text-xs font-bold text-white/90">{results[0].label}</div>
            <p className="text-[10px] text-text-secondary mt-1">{results[0].subtext}</p>
          </motion.div>

          {/* Metric Card 2 (Top Right, tilted slightly left) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30, rotate: 6 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.03, y: -4, rotate: 3, zIndex: 30 }}
            className="absolute top-[15%] right-[5%] sm:right-[10%] w-[210px] p-5 rounded-lg border border-white/10 bg-[#08080a] shadow-[0_15px_45px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              {getMetricIcon(results[1].label)}
              <span className="text-[9px] uppercase tracking-wider text-text-tertiary font-bold">Скорость</span>
            </div>
            <div className="text-3xl font-extrabold text-white mb-1">{results[1].value}</div>
            <div className="text-xs font-bold text-white/90">{results[1].label}</div>
            <p className="text-[10px] text-text-secondary mt-1">{results[1].subtext}</p>
          </motion.div>

          {/* Metric Card 3 (Bottom Center, tilted slightly right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.03, y: -4, rotate: 0, zIndex: 30 }}
            className="absolute bottom-[10%] left-[10%] sm:left-[25%] w-[230px] p-5 rounded-lg border border-white/10 bg-[#0a0a0c] shadow-[0_15px_45px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              {getMetricIcon(results[3].label)}
              <span className="text-[9px] uppercase tracking-wider text-text-tertiary font-bold">Лиды</span>
            </div>
            <div className="text-3xl font-extrabold text-white mb-1">{results[3].value}</div>
            <div className="text-xs font-bold text-white/90">{results[3].label}</div>
            <p className="text-[10px] text-text-secondary mt-1">{results[3].subtext}</p>
          </motion.div>

          {/* Metric Card 4 (Smallest, Bottom Right, tilted left) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30, rotate: 8 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.03, y: -4, rotate: 5, zIndex: 30 }}
            className="absolute bottom-[2%] right-[5%] w-[190px] p-4 rounded-lg border border-white/10 bg-[#080809] shadow-[0_15px_45px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] cursor-pointer"
          >
            <div className="text-2xl font-extrabold text-white mb-1">{results[4].value}</div>
            <div className="text-[11px] font-bold text-white/90">{results[4].label}</div>
            <p className="text-[9px] text-text-secondary mt-1">{results[4].subtext}</p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
