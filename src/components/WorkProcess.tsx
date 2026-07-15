"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/data/site-content";
import SectionHeading from "./SectionHeading";
import GlowCard from "./GlowCard";

export default function WorkProcess() {
  const { process } = siteContent;

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <section id="process" className="py-20 md:py-28 relative">
      <div className="container mx-auto max-w-[1200px] px-4">
        {/* Section Heading */}
        <SectionHeading
          label="Процесс"
          title="Как строится процесс работы"
          subtitle="Последовательный подход от детальной аналитики до запуска продукта позволяет гарантировать высокое качество и соответствие дедлайнам."
          align="center"
        />

        {/* Process Steps grid (Timeline) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative"
        >
          {/* Connecting glowing line (background) */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 -z-10" />

          {process.map((step, idx) => (
            <motion.div key={idx} variants={itemVariants} className="h-full">
              <GlowCard className="relative h-full flex flex-col justify-between p-6 select-none group">
                {/* Step Number Background */}
                <div className="absolute top-2 right-4 text-6xl font-extrabold tracking-tighter text-white/[0.02] group-hover:text-white/[0.04] transition-colors duration-300 pointer-events-none">
                  {step.step}
                </div>

                <div>
                  {/* Step label badge */}
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 font-bold text-xs text-white mb-6">
                    {step.step}
                  </span>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-metallic transition-colors">
                    {step.title}
                  </h3>
                </div>

                <p className="text-xs md:text-sm text-text-secondary leading-relaxed mt-2">
                  {step.description}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
