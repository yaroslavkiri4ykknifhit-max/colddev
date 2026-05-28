"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight, FolderGit2 } from "lucide-react"

const cases = [
  {
    id: 1,
    title: "vdb digital",
    category: "Digital Agency",
    client: "vdb (vdb.lt)",
    info: "Студийный сайт для международного диджитал-агентства. Полный цикл разработки и премиальный UI/UX дизайн.",
    tags: ["Web Development", "UI/UX Design", "Strategy"],
    metrics: "vdb.lt",
    image: "/case_vldb.png",
    link: "https://vdb.lt/en/",
  },
  {
    id: 2,
    title: "SAPSTROI",
    category: "Landscaping",
    client: "Строительная компания Sapstroi",
    info: "Профессиональный веб-сайт строительной компании. Проектирование воронки, мощение тротуарной плитки и благоустройство под ключ.",
    tags: ["Укладка плитки", "Благоустройство", "Установка бордюров"],
    metrics: "sapstroi.by",
    image: "/case_sapstroi.png",
    link: "https://sapstroi.by/",
  },
  {
    id: 3,
    title: "under buy",
    category: "Fashion Marketplace",
    client: "Концепт-стор under buy",
    info: "Ультраминималистичный дизайн премиального маркетплейса дизайнерской обуви и одежды.",
    tags: ["E-commerce", "Minimalism", "Editorial Design"],
    metrics: "underbuy.store",
    image: "/case_underbuy.png",
    link: "#",
  },
]

function CaseCard({
  caseItem,
  index,
}: {
  caseItem: (typeof cases)[number]
  index: number
}) {
  // 3D-наклон от курсора
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 25, mass: 0.5 }
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [4, -4]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-4, 4]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const clientX = e.clientX - rect.left - width / 2
    const clientY = e.clientY - rect.top - height / 2
    mouseX.set(clientX)
    mouseY.set(clientY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      className="sticky top-[14vh] w-full"
      style={{
        zIndex: index + 10,
      }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative cursor-pointer"
      >
        {/* Мягкое бледное красное свечение (#BB4430) под стиль сайта */}
        <div 
          className="absolute -inset-2 rounded-[2rem] opacity-30 blur-2xl transition duration-500 group-hover:opacity-45" 
          style={{ background: "radial-gradient(circle, rgba(187, 68, 48, 0.15) 0%, transparent 70%)" }}
        />

        {/* Тело карточки во всю ширину */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#2E2A2B] p-6 md:p-8 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-[#BB4430]/20">
          
          {/* Интерактивный блик */}
          <div className="pointer-events-none absolute -inset-px bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Двухколоночная сетка */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Описание на левой панели (5 колонок) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full pr-0 lg:pr-4">
              <div>
                {/* Надзаголовок с бледным красным акцентом */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <span className="flex items-center gap-2 rounded-full bg-[#BB4430]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#BB4430]">
                    <FolderGit2 className="h-3.5 w-3.5" />
                    {caseItem.category}
                  </span>
                  <span className="font-mono text-xs md:text-sm font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg">
                    {caseItem.metrics}
                  </span>
                </div>

                {/* Заголовок */}
                <h3 className="mb-6 text-3xl font-extrabold tracking-tight text-white transition-colors duration-300 group-hover:text-[#BB4430] leading-tight">
                  {caseItem.title}
                </h3>

                {/* Для кого сделано & Краткая инфо (Минимум текста) */}
                <div className="space-y-4 mb-8">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block mb-0.5">Для кого сделано:</span>
                    <span className="font-bold text-white text-base">{caseItem.client}</span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block mb-0.5">Краткая инфо:</span>
                    <span className="text-slate-300 text-sm leading-relaxed block">{caseItem.info}</span>
                  </div>
                </div>
              </div>

              {/* Подвал карточки */}
              <div className="flex flex-col gap-6 pt-6 border-t border-white/5">
                <div className="flex flex-wrap gap-2">
                  {caseItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Кнопка действия */}
                <a 
                  href={caseItem.link}
                  target={caseItem.link.startsWith("http") ? "_blank" : undefined}
                  rel={caseItem.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 text-xs md:text-sm font-bold text-[#BB4430] transition-all duration-300 hover:translate-x-1.5 w-fit"
                >
                  <span>Посмотреть проект</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Изображение на правой панели (7 колонок) */}
            <div className="lg:col-span-7 relative overflow-hidden rounded-2xl border border-white/5 shadow-2xl transition-colors duration-500 group-hover:border-[#BB4430]/10 bg-slate-900/50">
              <img 
                src={caseItem.image} 
                alt={caseItem.title}
                className="w-full h-auto object-cover rounded-2xl transition duration-700 group-hover:scale-[1.02]"
              />
            </div>
            
          </div>

          {/* Фоновый номер кейса */}
          <div className="pointer-events-none absolute left-6 bottom-4 text-[6rem] font-black text-white/[0.008] select-none leading-none">
            0{caseItem.id}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Cases() {
  return (
    <section id="cases" className="relative bg-transparent py-20">
      {/* Заголовок секции */}
      <div className="relative z-10 px-6 pb-16 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="mb-3 text-xs md:text-sm font-bold tracking-widest text-[#BB4430] uppercase">
            Выполненные работы
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            Избранные <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BB4430] to-orange-400">кейсы</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm md:text-base text-slate-400">
            Каждый проект — это история успешного сотрудничества и цифровых результатов.
          </p>
        </motion.div>
      </div>

      {/* Полноэкранный вертикальный список стопок карточек во всю ширину */}
      <div className="max-w-[1300px] mx-auto px-4 md:px-8 flex flex-col gap-12 pb-32">
        {cases.map((caseItem, i) => (
          <CaseCard
            key={caseItem.id}
            caseItem={caseItem}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}
