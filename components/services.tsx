"use client"

import { motion } from "framer-motion"
import { GlassSurface } from "@/components/ui/glass-surface"
import BorderGlow from "@/components/ui/border-glow"

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: "Создание сайтов",
    description: "Лендинги, корпоративные сайты, интернет-магазины. Современный стек технологий, адаптивный дизайн, высокая скорость загрузки."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Веб-дизайн",
    description: "UI/UX дизайн с фокусом на конверсию. Уникальные интерфейсы, которые выделяют ваш бизнес среди конкурентов."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
    title: "Телеграм боты",
    description: "Боты для автоматизации продаж, поддержки клиентов, уведомлений. Интеграция с CRM, платёжными системами."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "Скрипты на заказ",
    description: "Автоматизация рутинных задач, парсинг данных, интеграции между сервисами. Экономия времени и ресурсов."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
    title: "Автоматизация заявок",
    description: "Настройка CRM-систем, автоматическая обработка лидов, уведомления менеджерам. Ни один лид не потеряется."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="16" />
      </svg>
    ),
    title: "Лидогенерация",
    description: "Сайты-генераторы заявок с высокой конверсией. A/B тестирование, аналитика, оптимизация воронки продаж."
  }
]

export function Services() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-primary text-sm tracking-widest uppercase mb-4">Услуги</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
          Что я делаю
        </h2>
      </motion.div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="h-full flex"
          >
            <BorderGlow
              edgeSensitivity={30}
              glowColor="184 36 63"
              backgroundColor="#2E2A2B"
              borderRadius={16}
              glowRadius={40}
              glowIntensity={0.8}
              colors={['#7EBDC2', '#BB4430', '#BCBBB8']}
              className="w-full h-full"
            >
              <GlassSurface
                borderRadius={16}
                borderWidth={0.06}
                brightness={30}
                opacity={0.3}
                blur={12}
                displace={2}
                backgroundOpacity={0}
                saturation={1.1}
                distortionScale={-30}
                redOffset={1}
                greenOffset={4}
                blueOffset={8}
                className="group p-8 w-full h-full text-left"
                style={{ background: 'transparent' }}
              >
                <div className="flex flex-col h-full w-full">
                  <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300 w-fit">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm flex-grow">{service.description}</p>
                </div>
              </GlassSurface>
            </BorderGlow>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
