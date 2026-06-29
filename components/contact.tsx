"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { GlassSurface } from "@/components/ui/glass-surface"
import { toast } from "sonner"
import BorderGlow from "@/components/ui/border-glow"

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    contact: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.name.trim() || !formState.contact.trim() || !formState.message.trim()) {
      toast.error("Пожалуйста, заполните все поля формы")
      return
    }
    console.log("Form submitted:", formState)
    toast.success("Заявка отправлена! Свяжемся с вами в ближайшее время.")
    setFormState({
      name: "",
      contact: "",
      message: ""
    })
  }

  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary text-sm tracking-widest uppercase mb-4">Контакт</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Давайте обсудим ваш проект
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Расскажите о вашей идее — я помогу найти оптимальное решение 
              и предложу план реализации. Первая консультация бесплатно.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Telegram</div>
                  <a 
                    href="https://t.me/c0lddev" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    @c0lddev
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Email</div>
                  <a 
                    href="mailto:yaroslav.paraonov@gmail.com" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    yaroslav.paraonov@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <BorderGlow
              edgeSensitivity={30}
              glowColor="184 36 63"
              backgroundColor="#2E2A2B"
              borderRadius={24}
              glowRadius={40}
              glowIntensity={0.8}
              colors={['#7EBDC2', '#BB4430', '#BCBBB8']}
              className="w-full"
            >
              <GlassSurface
                borderRadius={24}
                borderWidth={0.06}
                brightness={30}
                opacity={0.3}
                blur={12}
                displace={2}
                backgroundOpacity={0}
                saturation={1.1}
                distortionScale={-40}
                redOffset={1}
                greenOffset={5}
                blueOffset={10}
                className="p-8 w-full text-left"
                style={{ background: 'transparent' }}
              >
              <form onSubmit={handleSubmit} className="space-y-6 w-full">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-white">
                    Имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#3D393A]/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-white"
                    placeholder="Как вас зовут?"
                  />
                </div>
                
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium mb-2 text-white">
                    Telegram или Email
                  </label>
                  <input
                    type="text"
                    id="contact"
                    value={formState.contact}
                    onChange={(e) => setFormState({ ...formState, contact: e.target.value })}
                    className="w-full px-4 py-3 bg-[#3D393A]/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-white"
                    placeholder="@username или email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-white">
                    Расскажите о проекте
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#3D393A]/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none text-white"
                    placeholder="Опишите вашу идею или задачу..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Отправить заявку
                </motion.button>
              </form>
            </GlassSurface>
            </BorderGlow>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
