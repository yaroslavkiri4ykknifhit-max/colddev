"use client";

import { useState, useEffect } from "react";
import { siteContent } from "@/data/site-content";
import { siteConfig } from "@/config/site";
import { playClick } from "@/config/sounds";

interface HeroTerminalProps {
  onOpenWindow: (id: string) => void;
}

export default function HeroTerminal({ onOpenWindow }: HeroTerminalProps) {
  const { title, tagline, marqueeText } = siteContent.hero;
  const [hits, setHits] = useState(siteConfig.stats.visitsCount);

  useEffect(() => {
    // Increment hit counter slightly for dynamic feel
    const interval = setInterval(() => {
      setHits((prev) => prev + Math.floor(Math.random() * 3));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6 font-sans text-black p-2 bg-[#d4d0c8] win-border-out">
      
      {/* Title Bar Banner */}
      <div className="bg-[#000080] text-white font-bold p-1 px-2.5 text-xs flex justify-between select-none">
        <span>YAROSLAV_HOMEPAGE.HTM // 2004 WEBMASTER PRO</span>
        <span className="animate-pulse text-[#00ff00]">● ONLINE</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-2">
        {/* Left Column: Ticker, Title, Tagline, Buttons */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-6">
          
          {/* Main chromium silver heading */}
          <div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tighter uppercase select-all text-chrome leading-none mb-3">
              {title}
            </h1>
            <div className="h-[2px] bg-[#808080] border-b border-white mb-4" />
            
            {/* Taglines */}
            <div className="font-mono text-xs text-blue-900 font-bold mb-4 uppercase tracking-widest flex flex-wrap gap-x-4 gap-y-1">
              <span>★ WEB DEVELOPER</span>
              <span>★ DIGITAL ARCHITECT</span>
              <span>★ TELEGRAM ENGINEER</span>
              <span>★ GOOGLE ADS MASTER</span>
            </div>

            <p className="text-sm text-gray-800 leading-relaxed font-semibold max-w-lg win-border-in p-4 bg-white shadow-inner">
              “{tagline}”
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                playClick();
                onOpenWindow("projects");
              }}
              className="win-btn font-extrabold text-xs px-5 py-2.5 bg-gradient-to-r from-blue-800 to-blue-600 text-white border-blue-400 hover:brightness-110"
              style={{ color: "#ffffff" }}
            >
              [ ПОСМОТРЕТЬ РАБОТЫ ]
            </button>
            
            <button
              onClick={() => {
                playClick();
                onOpenWindow("contact");
              }}
              className="win-btn font-extrabold text-xs px-5 py-2.5 bg-gradient-to-r from-green-800 to-green-600 text-white border-green-400 hover:brightness-110"
              style={{ color: "#ffffff" }}
            >
              [ СВЯЗАТЬСЯ В CHAT.EXE ]
            </button>
          </div>

          {/* Retro Badges Row */}
          <div className="flex flex-wrap items-center gap-3 border-t border-[#808080] pt-4">
            {/* MADE FOR THE WWW */}
            <div className="h-[31px] px-2 border border-dashed border-[#808080] bg-[#e5e5e0] flex items-center justify-center text-[8px] font-bold text-gray-600 uppercase tracking-wider">
              Made for WWW
            </div>
            {/* BEST AT 1024 */}
            <div className="h-[31px] px-2 border border-dashed border-[#808080] bg-[#e5e5e0] flex items-center justify-center text-[8px] font-bold text-gray-600 uppercase tracking-wider">
              Best at 1024×768
            </div>
            {/* NO TEMPLATES */}
            <div className="h-[31px] px-2 border-2 border-red-800 bg-red-900 text-white flex items-center justify-center text-[8px] font-extrabold uppercase tracking-wider">
              No Templates Used
            </div>
            {/* UNDER CONSTRUCTION */}
            <div className="h-[31px] px-2 border-2 border-yellow-600 bg-yellow-100 text-yellow-800 flex items-center gap-1 text-[8px] font-extrabold uppercase tracking-wider animate-pulse">
              <span>⚠</span> UNDER CONSTRUCTION
            </div>
          </div>
        </div>

        {/* Right Column: User Profile Terminal Card */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="bg-white p-4 win-border-in shadow-inner flex flex-col gap-4 font-mono text-[11px] text-gray-700">
            <span className="font-bold text-xs text-blue-900 border-b border-gray-200 pb-2 uppercase tracking-wider block">
              System Profile Card
            </span>

            {/* Profile Fields */}
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between border-b border-dashed border-gray-200 pb-1.5">
                <span className="font-bold text-gray-500">USER:</span>
                <span className="font-bold text-black">YAROSLAV</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-gray-200 pb-1.5">
                <span className="font-bold text-gray-500">STATUS:</span>
                <span className="font-bold text-green-600 animate-pulse">AVAILABLE FOR WORK</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-gray-200 pb-1.5">
                <span className="font-bold text-gray-500">LOCATION:</span>
                <span className="font-bold text-black">INTERNET 0.0.0.0</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-gray-200 pb-1.5">
                <span className="font-bold text-gray-500">SYSTEM LEVEL:</span>
                <span className="font-bold text-blue-800">ADVANCED MASTER</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-gray-200 pb-1.5">
                <span className="font-bold text-gray-500">DIAL-UP SPEED:</span>
                <span className="font-bold text-black">56.0 Kbps</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-gray-200 pb-1.5">
                <span className="font-bold text-gray-500">VISITOR HIT NO:</span>
                <span className="font-bold text-red-600 bg-red-50 px-1 rounded border border-red-200">
                  {hits.toString().padStart(6, "0")}
                </span>
              </div>
            </div>

            {/* Animated pixel avatar placeholder */}
            <div className="h-20 bg-gray-100 border border-gray-200 rounded flex items-center justify-center relative overflow-hidden shadow-inner mt-2">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-200 via-transparent to-transparent" />
              <span className="text-3xl animate-bounce">💻</span>
            </div>
          </div>
        </div>
      </div>

      {/* Endless Horizontal Marquee Banner */}
      <div className="bg-[#ffffcc] border border-[#d4d0c8] p-1.5 overflow-hidden select-none win-border-in mt-2 flex">
        <div className="animate-marquee-scroll whitespace-nowrap flex gap-8 font-mono text-xs text-red-800 font-bold select-none">
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>
    </div>
  );
}
