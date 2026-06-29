"use client"

import { motion } from "framer-motion"
import { GlassSurface } from "@/components/ui/glass-surface"
import BorderGlow from "@/components/ui/border-glow"
import { Send, Github, Linkedin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="py-12 px-4 md:px-8 flex justify-center w-full">
      <div className="w-full max-w-5xl">
        <BorderGlow
          edgeSensitivity={20}
          glowColor="184 36 63"
          backgroundColor="#2E2A2B"
          borderRadius={20}
          glowRadius={25}
          glowIntensity={0.5}
          colors={['#7EBDC2', '#BB4430', '#BCBBB8']}
          className="w-full"
        >
          <GlassSurface
            borderRadius={20}
            borderWidth={0.05}
            brightness={40}
            opacity={0.3}
            blur={10}
            displace={1}
            backgroundOpacity={0.05}
            className="w-full px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6"
            style={{ background: 'transparent' }}
          >
            <div className="text-center md:text-left">
              <div className="font-bold text-xl mb-1 text-white">
                <span className="text-primary font-extrabold">COLD</span>
                <span className="text-muted-foreground font-light">DEV</span>
              </div>
              <div className="text-muted-foreground text-xs md:text-sm">
                © {currentYear}. Все права защищены.
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://t.me/c0lddev" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all duration-300 cursor-pointer"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all duration-300 cursor-pointer"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all duration-300 cursor-pointer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </GlassSurface>
        </BorderGlow>
      </div>
    </footer>
  )
}
