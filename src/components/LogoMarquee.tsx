"use client";

import { motion } from "framer-motion";
import { Globe, Compass, Cpu, Layers, Terminal, Play, Square, Triangle } from "lucide-react";

export default function LogoMarquee() {
  const logos = [
    { name: "Google", icon: <Globe className="w-4 h-4" /> },
    { name: "Framer", icon: <Triangle className="w-4 h-4 rotate-180" /> },
    { name: "Apple", icon: <Cpu className="w-4 h-4" /> },
    { name: "Adobe", icon: <Compass className="w-4 h-4" /> },
    { name: "LinkedIn", icon: <Square className="w-4 h-4" /> },
    { name: "Microsoft", icon: <Layers className="w-4 h-4" /> },
    { name: "Figma", icon: <Play className="w-4 h-4 rotate-90" /> },
    { name: "GitHub", icon: <Terminal className="w-4 h-4" /> }
  ];

  return (
    <section className="relative py-10 border-y border-white/5 bg-black/20 overflow-hidden select-none">
      {/* Edge gradient masks */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex w-max">
        {/* First track */}
        <motion.div
          animate={{ x: [0, "-50%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
          className="flex gap-16 pr-16 items-center whitespace-nowrap"
        >
          {logos.concat(logos).map((logo, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 text-text-tertiary hover:text-white/40 transition-colors duration-300"
            >
              {logo.icon}
              <span className="text-sm font-semibold uppercase tracking-wider">{logo.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
