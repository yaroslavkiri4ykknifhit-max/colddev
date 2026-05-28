"use client"

import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className="max-w-4xl"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-primary text-sm tracking-widest uppercase mb-4"
        >
          Веб-разработчик & Дизайнер
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-balance"
        >
          Создаю <span className="text-primary">digital-решения</span>, которые приносят результат
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mb-10"
        >
          Современные сайты, телеграм боты, автоматизация бизнес-процессов и лидогенерация. 
          Превращаю идеи в работающие инструменты для вашего бизнеса.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-wrap gap-4"
        >
          <a 
            href="#cases" 
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Смотреть кейсы
          </a>
          <a 
            href="#contact" 
            className="px-8 py-4 border border-border rounded-lg font-medium hover:bg-secondary transition-colors"
          >
            Связаться
          </a>
        </motion.div>
      </motion.div>
      

    </section>
  )
}
