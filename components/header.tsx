"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { GlassSurface } from "@/components/ui/glass-surface"
import BorderGlow from "@/components/ui/border-glow"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4 flex justify-center pointer-events-none`}
    >
      <div className="w-full max-w-5xl pointer-events-auto">
        <BorderGlow
          edgeSensitivity={20}
          glowColor="184 36 63"
          backgroundColor="#2E2A2B"
          borderRadius={20}
          glowRadius={25}
          glowIntensity={isScrolled ? 0.8 : 0.5}
          colors={['#7EBDC2', '#BB4430', '#BCBBB8']}
          className="w-full shadow-lg"
        >
          <GlassSurface
            borderRadius={20}
            borderWidth={0.05}
            brightness={40}
            opacity={0.3}
            blur={12}
            displace={1}
            backgroundOpacity={isScrolled ? 0.15 : 0.05}
            className="w-full px-6 py-3.5 flex flex-col"
            style={{ background: 'transparent' }}
          >
            <div className="flex items-center justify-between w-full">
              <motion.a 
                href="#"
                className="font-bold text-xl tracking-tight text-white flex items-center gap-1.5"
                whileHover={{ scale: 1.02 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-primary font-extrabold">COLD</span>
                <span className="text-muted-foreground font-light">DEV</span>
              </motion.a>
              
              <nav className="hidden md:flex items-center gap-8">
                <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
                  Услуги
                </a>
                <a href="#cases" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
                  Кейсы
                </a>
                <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
                  Контакты
                </a>
                <motion.a 
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 bg-primary text-primary-foreground text-sm rounded-lg font-semibold hover:shadow-[0_0_15px_rgba(126,189,194,0.3)] transition-all duration-300"
                >
                  Обсудить проект
                </motion.a>
              </nav>
              
              {/* Mobile menu button */}
              <button 
                className="md:hidden p-2 text-muted-foreground hover:text-white transition-colors cursor-pointer" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden md:hidden flex flex-col gap-4 mt-4 pt-4 border-t border-white/10 w-full"
                >
                  <a 
                    href="#services" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium text-muted-foreground hover:text-white py-1 transition-colors"
                  >
                    Услуги
                  </a>
                  <a 
                    href="#cases" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium text-muted-foreground hover:text-white py-1 transition-colors"
                  >
                    Кейсы
                  </a>
                  <a 
                    href="#contact" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium text-muted-foreground hover:text-white py-1 transition-colors"
                  >
                    Контакты
                  </a>
                  <motion.a 
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2.5 bg-primary text-primary-foreground text-sm rounded-lg font-semibold text-center mt-2"
                  >
                    Обсудить проект
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassSurface>
        </BorderGlow>
      </div>

      {/* Progress bar attached to header container */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-primary z-50 pointer-events-none"
        style={{ width: progressWidth }}
      />
    </motion.header>
  )
}
