"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { siteContent } from "@/data/site-content";
import SectionHeading from "./SectionHeading";

export default function FAQ() {
  const { faq } = siteContent;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 relative">
      <div className="container mx-auto max-w-[1000px] px-4 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Heading */}
        <div className="md:col-span-5 flex flex-col items-start text-left md:sticky md:top-28">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full border border-white/5 bg-white/[0.02] text-xs font-semibold tracking-wider text-text-secondary uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-white/50" />
            FAQ
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.1] text-metallic">
            Ответы на частые вопросы
          </h2>

          <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-sm">
            Ответы на ключевые вопросы о процессах, сроках и деталях взаимодействия при создании цифровых продуктов.
          </p>
        </div>

        {/* Right Column: Accordion */}
        <div className="md:col-span-7 space-y-4">
          {faq.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-lg border border-white/5 bg-white/[0.01] overflow-hidden transition-all duration-300"
                style={{
                  borderColor: isOpen ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.05)"
                }}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-white hover:text-white/80 transition-colors"
                >
                  <span className="text-sm md:text-base leading-snug">{item.question}</span>
                  <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { height: "auto", opacity: 1 },
                        collapsed: { height: 0, opacity: 0 }
                      }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-text-secondary leading-relaxed border-t border-white/[0.02]">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
