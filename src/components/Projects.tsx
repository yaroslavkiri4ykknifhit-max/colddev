"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code, Target, Award, Search, User, Filter, Calendar, Settings, Bot, ChevronRight, Eye } from "lucide-react";
import { siteContent, Project } from "@/data/site-content";
import SectionHeading from "./SectionHeading";
import GlowCard from "./GlowCard";

export default function Projects() {
  const { projects } = siteContent;

  const renderMockup = (id: string) => {
    switch (id) {
      case "agency":
        return (
          <div className="w-full h-full bg-[#0a0a0c] p-4 flex flex-col gap-3 font-sans text-[10px] text-text-secondary select-none">
            {/* Minimal App Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="font-semibold text-white">Apex HR Portal</span>
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="w-2 h-2 rounded-full bg-white/20" />
              </div>
            </div>
            {/* Search & Filter row */}
            <div className="flex gap-2">
              <div className="flex-1 bg-white/5 border border-white/5 rounded px-2 py-1 flex items-center gap-1.5 text-text-tertiary">
                <Search className="w-3 h-3" />
                <span>Search candidates...</span>
              </div>
              <div className="bg-white/5 border border-white/5 rounded px-2 py-1 flex items-center gap-1.5 text-text-tertiary">
                <Filter className="w-3 h-3" />
                <span>Filters</span>
              </div>
            </div>
            {/* Candidate Card List */}
            <div className="space-y-2 overflow-hidden flex-1">
              <div className="bg-[#121215] border border-white/5 p-2 rounded flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-[8px]">
                    JD
                  </div>
                  <div>
                    <div className="font-bold text-white text-[9px]">John Doe</div>
                    <div className="text-[7px]">Senior Frontend Developer</div>
                  </div>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-white/5 text-white/60 text-[6px]">Matched 98%</span>
              </div>

              <div className="bg-[#121215] border border-white/5 p-2 rounded flex items-center justify-between shadow-lg opacity-70">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-[8px]">
                    AS
                  </div>
                  <div>
                    <div className="font-bold text-white text-[9px]">Alice Smith</div>
                    <div className="text-[7px]">Product Designer</div>
                  </div>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-white/5 text-white/60 text-[6px]">Matched 91%</span>
              </div>
            </div>
          </div>
        );
      case "autoservice":
        return (
          <div className="w-full h-full bg-[#070709] p-5 flex flex-col justify-between font-sans select-none relative overflow-hidden">
            {/* iPhone status bar representation */}
            <div className="flex justify-between items-center text-[8px] text-text-secondary border-b border-white/5 pb-2">
              <span>9:41</span>
              <span className="font-bold text-white">CarService Bot</span>
              <div className="w-3 h-1.5 border border-white/20 rounded-sm" />
            </div>

            {/* TG Mini App page */}
            <div className="bg-[#0f0f12] border border-white/5 rounded-lg p-3 flex-1 mt-3 flex flex-col gap-2.5 text-[9px]">
              <div className="text-white font-bold text-[10px]">Запись на ТО</div>
              <div className="space-y-1.5">
                <div className="bg-white/5 p-2 rounded border border-white/5 flex justify-between items-center">
                  <span>Выберите дату:</span>
                  <span className="font-bold text-white flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-white/50" /> 18 июля
                  </span>
                </div>
                <div className="bg-white/5 p-2 rounded border border-white/5 flex justify-between items-center">
                  <span>Услуга:</span>
                  <span className="font-bold text-white">Замена масла</span>
                </div>
              </div>

              {/* Volume call to action button */}
              <div className="mt-auto w-full py-2 rounded-md bg-white text-black font-bold text-center shadow-[0_3px_10px_rgba(255,255,255,0.1)]">
                Подтвердить запись
              </div>
            </div>
          </div>
        );
      case "localbiz":
        return (
          <div className="w-full h-full bg-black p-4 flex flex-col justify-between font-sans text-[10px] text-text-secondary select-none relative">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="font-bold text-white tracking-widest text-[9px] uppercase">Carbon Detailing</span>
              <span className="text-text-tertiary">Minsk</span>
            </div>

            {/* Slick premium dark service card mockup */}
            <div className="my-auto flex flex-col items-center justify-center text-center">
              {/* Premium dark car silhouette mockup */}
              <div className="w-32 h-14 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-lg border border-white/5 flex items-center justify-center mb-3">
                <span className="text-[7px] tracking-widest uppercase font-bold text-white/30">Premium Silhouette</span>
              </div>
              <h4 className="text-white font-bold text-[12px] leading-tight">Профессиональный детейлинг</h4>
              <p className="text-[8px] text-text-tertiary mt-1">Защитные покрытия, полировка, химчистка</p>
            </div>

            <div className="flex gap-2 justify-center border-t border-white/5 pt-2">
              <span className="px-2 py-0.5 rounded bg-white/5 text-[7px] text-white/60">Кварцевая защита</span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-[7px] text-white/60">Полировка кузова</span>
            </div>
          </div>
        );
      case "bot":
        return (
          <div className="w-full h-full bg-[#0a0a0c] p-4 flex flex-col gap-3 font-sans text-[9px] text-text-secondary select-none">
            {/* Telegram Header */}
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-[8px]">
                <Bot className="w-3 h-3 text-white/75" />
              </div>
              <div>
                <div className="font-bold text-white text-[9px]">Lead Qualifier Bot</div>
                <div className="text-[7px] text-white/40">bot</div>
              </div>
            </div>

            {/* Chat bubbles */}
            <div className="space-y-2.5 flex-1 overflow-hidden">
              <div className="flex justify-start">
                <div className="bg-[#121215] border border-white/5 p-2 rounded-lg max-w-[80%]">
                  Привет! Какой тип сайта вас интересует? Выберите вариант ниже:
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-white/10 text-white p-2 rounded-lg max-w-[80%]">
                  Интернет-магазин
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-[#121215] border border-white/5 p-2 rounded-lg max-w-[80%]">
                  Отлично! Какой примерный бюджет проекта?
                </div>
              </div>
            </div>

            {/* Quick replies */}
            <div className="grid grid-cols-2 gap-2 mt-auto">
              <div className="border border-white/10 bg-white/5 rounded text-center py-1 font-bold text-white text-[8px]">
                до 2000 BYN
              </div>
              <div className="border border-white/10 bg-white/5 rounded text-center py-1 font-bold text-white text-[8px]">
                от 2000 BYN
              </div>
            </div>
          </div>
        );
      default:
        return <div className="w-full h-full bg-white/5" />;
    }
  };

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="container mx-auto max-w-[1200px] px-4">
        {/* Section Heading */}
        <SectionHeading
          label="Портфолио"
          title="Проекты, созданные под реальные бизнес-задачи"
          subtitle="Я верю, что каждый проект должен быть уникальным отражением бизнеса, а не шаблонным решением. Вот некоторые из моих недавних работ."
          align="center"
        />

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project: Project, index: number) => (
            <GlowCard
              key={project.id}
              className="flex flex-col gap-6 p-4 md:p-6 min-h-[580px] group/project"
              hoverGlow={true}
              delay={index * 0.15}
            >
              {/* Mockup Preview Area */}
              <div className="relative aspect-[16/9] w-full rounded-md border border-white/5 bg-black/50 overflow-hidden shadow-inner flex items-center justify-center p-3">
                {/* Visual Glow behind mockup */}
                <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%]" />
                
                {/* Volumetric Device Frame */}
                <div className="relative w-full h-full rounded-lg border border-white/10 bg-[#09090b] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden transition-all duration-300 group-hover/project:scale-[1.02] group-hover/project:border-white/20">
                  {renderMockup(project.id)}
                </div>
              </div>

              {/* Details Area */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-text-secondary tracking-widest uppercase">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[9px] font-bold text-white/60">
                      <Target className="w-2.5 h-2.5" />
                      <span>Кейс</span>
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 group-hover/project:text-metallic transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tasks & Scope list */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] uppercase font-bold text-text-tertiary tracking-widest block">Область работ</span>
                    <div className="flex flex-wrap gap-2">
                      {project.tasks.map((task, tIdx) => (
                        <div key={tIdx} className="flex items-center gap-1.5 text-xs text-text-secondary">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tech & Metrics footer */}
                <div className="border-t border-white/5 pt-6 mt-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                    {/* Tech Stack */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-text-tertiary tracking-widest block">Стек</span>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 text-[10px] font-semibold rounded bg-white/5 border border-white/5 text-text-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Result Achieved */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-text-tertiary tracking-widest block flex items-center gap-1">
                        <Award className="w-3 h-3 text-white/50" /> Результат
                      </span>
                      <p className="text-xs text-white/80 font-medium italic">
                        «{project.result}»
                      </p>
                    </div>
                  </div>

                  {/* View Details Hover element */}
                  <div className="mt-6 flex items-center gap-1 text-xs font-bold text-white group-hover/project:gap-2 transition-all cursor-pointer">
                    <span>Смотреть проект</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-text-secondary group-hover/project:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
