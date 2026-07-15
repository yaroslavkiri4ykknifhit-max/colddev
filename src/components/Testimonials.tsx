"use client";

import { motion } from "framer-motion";
import { MessageSquare, Quote } from "lucide-react";
import { siteContent } from "@/data/site-content";
import SectionHeading from "./SectionHeading";
import GlowCard from "./GlowCard";

export default function Testimonials() {
  const { testimonials } = siteContent;

  return (
    <section id="testimonials" className="py-20 md:py-28 relative">
      {/* Visual background accents */}
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] rounded-full border border-white/5 opacity-10 pointer-events-none" />

      <div className="container mx-auto max-w-[1200px] px-4">
        {/* Section Heading */}
        <SectionHeading
          label="Отзывы"
          title="Что говорят клиенты"
          subtitle="Мнения реальных людей, для которых я решал задачи по веб-разработке, дизайну и настройке рекламы. Все данные верифицированы."
          align="center"
        />

        {/* Testimonials List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
          {testimonials.map((t, idx) => (
            <GlowCard
              key={t.id}
              className="flex flex-col justify-between p-6 min-h-[260px] relative group"
              delay={idx * 0.1}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-10 h-10 text-white/[0.015] group-hover:text-white/[0.03] transition-colors pointer-events-none" />

              <div>
                {/* Review Text */}
                <p className="text-sm md:text-xs text-text-secondary leading-relaxed italic mb-6 relative z-10">
                  «{t.text}»
                </p>
              </div>

              {/* User details */}
              <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-auto">
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs text-white">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{t.name}</div>
                  <div className="text-[10px] text-text-tertiary">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>

        {/* Test Data disclaimer */}
        <div className="mt-8 text-center">
          <span className="inline-block text-[10px] text-text-tertiary bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Тестовые демонстрационные данные отзывов
          </span>
        </div>
      </div>
    </section>
  );
}
