"use client";

import { motion } from "framer-motion";
import { Star, ArrowUpRight, CheckCircle2, ChevronRight, Play, Heart, MessageSquare, Send } from "lucide-react";
import SectionHeading from "./SectionHeading";
import GlowCard from "./GlowCard";

export default function BenefitsBento() {
  return (
    <section id="benefits" className="py-20 md:py-28 relative">
      <div className="container mx-auto max-w-[1200px] px-4">
        {/* Section Heading */}
        <SectionHeading
          label="Преимущества"
          title="Разработка, которая решает задачи бизнеса"
          subtitle="Не просто красивый интерфейс, а полноценный инструмент для продаж, автоматизации и роста вашего бренда в цифровой среде."
          align="center"
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Ratings & Stats (Col-span 7 on Desktop) */}
          <GlowCard className="md:col-span-7 flex flex-col justify-between min-h-[360px]" delay={0.1}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-text-tertiary font-bold">SEO & Дизайн</span>
                <h3 className="text-xl font-bold text-white mt-1">Оптимизированный интерфейс</h3>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-white/5 border border-white/10 text-white/70">
                Data-Driven
              </span>
            </div>

            {/* Visual: Ratings List from the screenshot */}
            <div className="space-y-3 bg-black/40 border border-white/5 p-5 rounded-lg my-auto">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs text-text-secondary">Customer visits</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-white text-white" />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs text-text-secondary">Page Funnels</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-white text-white" />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs text-text-secondary">Page impressions</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-white text-white" />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm text-text-secondary mt-6">
              Проектируем интерфейсы на основе глубокого UX-анализа, который превращает случайных посетителей в лояльных клиентов.
            </p>
          </GlowCard>

          {/* Card 2: Speed & Curved Chart (Col-span 5 on Desktop) */}
          <GlowCard className="md:col-span-5 flex flex-col justify-between min-h-[360px]" delay={0.2}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-text-tertiary font-bold">Производительность</span>
                <h3 className="text-xl font-bold text-white mt-1">Скорость загрузки 99+</h3>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-white/5 border border-white/10 text-white/70">
                PageSpeed
              </span>
            </div>

            {/* Visual: Curved Chart in Glassmorphic block */}
            <div className="relative bg-white/[0.02] border border-white/5 rounded-lg p-4 my-3 overflow-hidden shadow-inner h-32 flex flex-col justify-end">
              <div className="absolute top-2 left-3 flex flex-col">
                <span className="text-[10px] text-text-tertiary uppercase">Traffic Conversion</span>
                <span className="text-lg font-bold text-white">+45.2%</span>
              </div>
              
              {/* SVG Curved Chart Line */}
              <svg viewBox="0 0 200 60" className="w-full h-full text-white/80 overflow-visible">
                <defs>
                  <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>
                {/* Area under curve */}
                <path
                  d="M0 60 C30 55, 50 35, 80 40 C110 45, 130 15, 170 10 C185 8, 195 5, 200 5 L200 60 Z"
                  fill="url(#chart-glow)"
                />
                {/* Curve */}
                <path
                  d="M0 60 C30 55, 50 35, 80 40 C110 45, 130 15, 170 10 C185 8, 195 5, 200 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                {/* Glow Dot */}
                <circle cx="170" cy="10" r="3" fill="#ffffff" />
                <circle cx="170" cy="10" r="6" stroke="#ffffff" strokeWidth="1.5" fill="none" className="animate-ping" />
              </svg>
            </div>

            <p className="text-sm text-text-secondary mt-2">
              Используем Next.js и современные серверные технологии, чтобы сайт загружался мгновенно на любом устройстве.
            </p>
          </GlowCard>

          {/* Card 3: Google Search Console (Col-span 5 on Desktop) */}
          <GlowCard className="md:col-span-5 flex flex-col justify-between min-h-[360px]" delay={0.3}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-text-tertiary font-bold">Продвижение & Ads</span>
                <h3 className="text-xl font-bold text-white mt-1">Реклама и Лидогенерация</h3>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-white/5 border border-white/10 text-white/70">
                Google Ads
              </span>
            </div>

            {/* Visual: Google Connect Mockup from screenshot */}
            <div className="bg-black/30 border border-white/5 rounded-lg p-5 flex flex-col items-center justify-center gap-3 relative overflow-hidden group/console my-auto">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                {/* Custom minimalist Google 'G' shape logo */}
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                  <path
                    fill="currentColor"
                    d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.111 4.114a5.5 5.5 0 0 1-5.5-5.5c0-3.037 2.463-5.5 5.5-5.5c1.48 0 2.766.599 3.717 1.545l3.053-3.053C18.847 4.148 15.799 3 12.24 3C6.59 3 2 7.59 2 13.24c0 5.65 4.59 10.24 10.24 10.24c5.895 0 9.799-4.143 9.799-9.958c0-.687-.06-1.354-.18-1.99H12.24Z"
                  />
                </svg>
              </div>
              <span className="text-[10px] text-text-tertiary">Google Search Console</span>
              
              {/* Glass Button inside card resembling the screenshot */}
              <div className="px-4 py-1.5 rounded bg-white/5 border border-white/10 text-xs text-white/90 flex items-center gap-2 group-hover/console:bg-white/10 transition-colors cursor-pointer">
                <span>Connect with</span>
                <span className="font-bold">Google</span>
              </div>

              {/* Cursor indicator */}
              <div className="absolute bottom-2 right-12 text-white opacity-40 group-hover/console:translate-x-1 group-hover/console:-translate-y-1 transition-transform">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M4.5 2v17.5l5.3-5.3h7.7L4.5 2z" />
                </svg>
              </div>
            </div>

            <p className="text-sm text-text-secondary mt-6">
              Интеграция с рекламными сетями и системами веб-аналитики для оценки стоимости привлечения каждого клиента.
            </p>
          </GlowCard>

          {/* Card 4: Stacked Notification Tags (Col-span 7 on Desktop) */}
          <GlowCard className="md:col-span-7 flex flex-col justify-between min-h-[360px]" delay={0.4}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-text-tertiary font-bold">Интеграции</span>
                <h3 className="text-xl font-bold text-white mt-1">Автоматизация & Telegram</h3>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-white/5 border border-white/10 text-white/70">
                Web3 & TG
              </span>
            </div>

            {/* Visual: Stacked tags from the screenshot */}
            <div className="relative h-28 my-auto flex flex-col justify-center items-center">
              {/* Slab 1 (Bottom, tilted) */}
              <div className="absolute w-[220px] p-2.5 rounded bg-[#0c0c0e] border border-white/5 text-[10px] text-text-secondary flex items-center justify-between shadow-lg rotate-[-6deg] translate-y-6 opacity-45">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white/30" />
                  <span>CRM: Сделка обновлена</span>
                </div>
                <span className="text-text-tertiary">14:02</span>
              </div>

              {/* Slab 2 (Middle, tilted) */}
              <div className="absolute w-[230px] p-3 rounded bg-[#111114] border border-white/5 text-xs text-white/80 flex items-center justify-between shadow-xl rotate-[3deg] translate-y-1 opacity-75">
                <div className="flex items-center gap-2">
                  <Send className="w-3.5 h-3.5 text-white/50" />
                  <span>Заявка отправлена в чат</span>
                </div>
                <span className="text-[10px] text-text-secondary">14:05</span>
              </div>

              {/* Slab 3 (Top, highlighted) */}
              <div className="absolute w-[240px] p-3.5 rounded bg-[#18181c] border border-white/10 text-xs text-white flex items-center justify-between shadow-2xl rotate-[-2deg] -translate-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="font-semibold">Новый лид из Telegram!</span>
                </div>
                <span className="text-[10px] text-text-secondary">Только что</span>
              </div>
            </div>

            <p className="text-sm text-text-secondary mt-6">
              Создаем автоматические воронки продаж, интегрируем Telegram Mini Apps и ботов, оптимизируя бизнес-процессы.
            </p>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
