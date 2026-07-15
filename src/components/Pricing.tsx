"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { siteContent } from "@/data/site-content";
import { siteConfig } from "@/config/site";
import SectionHeading from "./SectionHeading";
import GlowCard from "./GlowCard";
import PrimaryButton from "./PrimaryButton";

export default function Pricing() {
  const { pricing } = siteContent;

  return (
    <section id="pricing" className="py-20 md:py-28 relative">
      <div className="container mx-auto max-w-[1200px] px-4">
        {/* Section Heading */}
        <SectionHeading
          label="Тарифы"
          title="Прозрачные тарифы под ваши цели"
          subtitle="Выберите подходящий формат или свяжитесь со мной для индивидуального расчёта стоимости вашего проекта."
          align="center"
        />

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-[1000px] mx-auto">
          {pricing.map((plan, idx) => {
            const isPopular = plan.popular;
            const priceVal = siteConfig.pricing[plan.priceKey as keyof typeof siteConfig.pricing];

            return (
              <GlowCard
                key={plan.id}
                lightTheme={isPopular}
                hoverGlow={!isPopular}
                className={`flex flex-col justify-between p-8 min-h-[500px] ${
                  isPopular ? "scale-105 z-10" : "scale-100"
                }`}
                delay={idx * 0.15}
                yOffset={30}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex justify-between items-center mb-6">
                    <span className={`text-xs uppercase font-extrabold tracking-widest ${isPopular ? "text-black/55" : "text-text-tertiary"}`}>
                      {plan.name}
                    </span>
                    {isPopular && (
                      <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase rounded-full bg-black text-white shadow-lg">
                        Популярный
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-3xl font-extrabold tracking-tight">{priceVal}</span>
                  </div>

                  {/* Description */}
                  <p className={`text-sm mb-8 ${isPopular ? "text-black/75" : "text-text-secondary"}`}>
                    {plan.description}
                  </p>

                  <div className={`w-full h-[1px] my-6 ${isPopular ? "bg-black/10" : "bg-white/5"}`} />

                  {/* Features List */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs md:text-sm font-medium">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isPopular ? "text-black" : "text-white/60"}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="mt-auto pt-6">
                  {isPopular ? (
                    <motion.a
                      href={siteConfig.contacts.telegram}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 font-bold py-3.5 px-6 rounded-md bg-black text-white hover:bg-black/90 transition-colors shadow-lg shadow-black/20"
                      style={{ borderRadius: "12px" }}
                    >
                      <span>Выбрать тариф</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  ) : (
                    <PrimaryButton href={siteConfig.contacts.telegram} variant="secondary" className="w-full justify-center">
                      <span>Начать работу</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </PrimaryButton>
                  )}
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
