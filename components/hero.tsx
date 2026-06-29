"use client"

import { motion } from "framer-motion"
import { GlassSurface } from "@/components/ui/glass-surface"
import BorderGlow from "@/components/ui/border-glow"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8 py-32 relative overflow-hidden">
      <div className="w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <BorderGlow
            edgeSensitivity={30}
            glowColor="184 36 63"
            backgroundColor="#2E2A2B"
            borderRadius={32}
            glowRadius={60}
            glowIntensity={0.8}
            colors={['#7EBDC2', '#BB4430', '#BCBBB8']}
            className="w-full shadow-2xl"
          >
            <GlassSurface
              borderRadius={32}
              borderWidth={0.06}
              brightness={30}
              opacity={0.3}
              blur={16}
              displace={3}
              backgroundOpacity={0.05}
              saturation={1.2}
              distortionScale={-80}
              redOffset={2}
              greenOffset={8}
              blueOffset={15}
              className="p-8 md:p-16 text-left w-full"
              style={{ background: 'transparent' }}
            >
              <div className="max-w-3xl flex flex-col items-start">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6"
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>Веб-разработчик & Дизайнер</span>
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] mb-6 text-white text-balance tracking-tight"
                >
                  Создаю <span className="text-primary hover:text-primary/80 transition-colors duration-300">digital-решения</span>, которые приносят результат
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
                >
                  Современные сайты, телеграм боты, автоматизация бизнес-процессов и лидогенерация. 
                  Превращаю ваши идеи в работающие цифровые инструменты для бизнеса.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="flex flex-wrap gap-4 w-full sm:w-auto"
                >
                  <a 
                    href="#cases" 
                    className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(126,189,194,0.4)] transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Смотреть кейсы</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a 
                    href="#contact" 
                    className="w-full sm:w-auto px-8 py-4 border border-white/10 hover:border-white/20 rounded-xl font-semibold hover:bg-white/5 transition-all duration-300 text-center cursor-pointer"
                  >
                    Связаться
                  </a>
                </motion.div>
              </div>
            </GlassSurface>
          </BorderGlow>
        </motion.div>
      </div>
    </section>
  )
}
