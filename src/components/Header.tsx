"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import PrimaryButton from "./PrimaryButton";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Главная", href: "#hero" },
    { name: "Услуги", href: "#benefits" },
    { name: "Проекты", href: "#projects" },
    { name: "Процесс", href: "#process" },
    { name: "Цены", href: "#pricing" },
    { name: "Контакты", href: "#contact" }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 px-4 md:px-8 py-4 transition-all duration-300">
        <div
          className={`mx-auto max-w-[1200px] flex items-center justify-between rounded-full border border-white/5 bg-black/45 backdrop-blur-md px-6 transition-all duration-300 ${
            isScrolled
              ? "py-2 px-5 bg-black/75 shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] border-white/10"
              : "py-4 shadow-none"
          }`}
        >
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-white/40 via-white to-white/10 flex items-center justify-center p-[1px] shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-xs text-white">
                YD
              </div>
            </div>
            <span className="font-bold tracking-tight text-white group-hover:text-white/80 transition-colors">
              {siteConfig.brandName}
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <PrimaryButton href={siteConfig.contacts.telegram} variant="primary" className="text-xs py-2 px-4">
              Обсудить проект
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </PrimaryButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-text-secondary hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[80px] z-30 bg-black/95 backdrop-blur-xl md:hidden px-6 py-8 flex flex-col justify-between border-t border-white/5"
          >
            <nav className="flex flex-col gap-6 text-center mt-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-medium text-text-secondary hover:text-white transition-colors py-2"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-4 pb-12">
              <PrimaryButton
                href={siteConfig.contacts.telegram}
                variant="primary"
                className="w-full py-4 text-center justify-center"
              >
                Обсудить проект
              </PrimaryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
