"use client";

import { motion } from "framer-motion";
import { ArrowRight, Send, HelpCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import MetallicStar from "./MetallicStar";
import PrimaryButton from "./PrimaryButton";

export default function FinalCTA() {
  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto max-w-[1200px] px-4">
        
        {/* Large Bento Card */}
        <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#0a0a0c] to-[#040405] p-8 md:p-16 text-center overflow-hidden shadow-2xl">
          
          {/* Background Glow */}
          <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(255,255,255,0.025)_0%,transparent_70%] pointer-events-none" />
          <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] glow-spot" />

          {/* Floating Volumetric Stars */}
          <div className="absolute top-[10%] left-[8%] hidden lg:block">
            <MetallicStar size={80} glowColor="rgba(255,255,255,0.08)" className="[animation-delay:-2s]" />
          </div>
          <div className="absolute bottom-[10%] right-[8%] hidden lg:block">
            <MetallicStar size={110} glowColor="rgba(255,255,255,0.1)" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            
            {/* Label */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 rounded-full border border-white/5 bg-white/[0.02] text-xs font-semibold tracking-wider text-text-secondary uppercase">
              Связь
            </span>

            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight text-metallic">
              Есть идея? Давайте превратим её в работающий digital-продукт
            </h2>

            {/* Description */}
            <p className="text-sm md:text-base text-text-secondary mb-10 max-w-lg leading-relaxed">
              Обсудите вашу задачу напрямую со мной. Мы составим оптимальную структуру проекта, подберем технологический стек и рассчитаем смету.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full sm:w-auto">
              <PrimaryButton
                href={siteConfig.contacts.telegram}
                variant="primary"
                className="w-full sm:w-auto justify-center px-8"
              >
                <Send className="w-4 h-4 mr-2" />
                Написать в Telegram
              </PrimaryButton>

              <PrimaryButton
                href={`mailto:${siteConfig.contacts.email}`}
                variant="secondary"
                className="w-full sm:w-auto justify-center px-8"
              >
                Обсудить стоимость
                <ArrowRight className="w-4 h-4 ml-2" />
              </PrimaryButton>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
