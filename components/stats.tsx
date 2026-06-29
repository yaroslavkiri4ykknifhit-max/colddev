"use client"

import { motion } from "framer-motion"
import { GlassSurface } from "@/components/ui/glass-surface"
import BorderGlow from "@/components/ui/border-glow"

const stats = [
  { value: "50+", label: "Проектов" },
  { value: "4+", label: "Года опыта" },
  { value: "100%", label: "Довольных клиентов" },
  { value: "24/7", label: "Поддержка" },
]

export function Stats() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full flex"
            >
              <BorderGlow
                edgeSensitivity={20}
                glowColor="184 36 63"
                backgroundColor="#2E2A2B"
                borderRadius={16}
                glowRadius={30}
                glowIntensity={0.7}
                colors={['#7EBDC2', '#BB4430', '#BCBBB8']}
                className="w-full h-full"
              >
                <GlassSurface
                  borderRadius={16}
                  borderWidth={0.05}
                  brightness={30}
                  opacity={0.3}
                  blur={10}
                  displace={1}
                  backgroundOpacity={0}
                  className="p-6 flex flex-col justify-center items-center text-center w-full h-full"
                  style={{ background: 'transparent' }}
                >
                  <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-2 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-xs md:text-sm font-medium">{stat.label}</div>
                </GlassSurface>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
