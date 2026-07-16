"use client";

import { useState } from "react";
import BootScreen from "@/components/BootScreen";
import DesktopShell from "@/components/DesktopShell";
import CRTOverlay from "@/components/CRTOverlay";
import RetroBanner from "@/components/RetroBanner";
import { siteConfig } from "@/config/site";
import { playClick } from "@/config/sounds";

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [desktopRef, setDesktopRef] = useState<any>(null);

  // Reference helper to open windows from top bar
  const triggerOpenWindow = (id: string) => {
    playClick();
    if (desktopRef) {
      desktopRef.handleOpenWindow(id);
    } else {
      // Find the element via custom event dispatch or window global
      const event = new CustomEvent("open-window", { detail: { id } });
      window.dispatchEvent(event);
    }
  };

  return (
    <>
      {/* 1. DOS-like System Boot Loader */}
      {!booted && <BootScreen onBootComplete={() => setBooted(true)} />}

      {/* 2. Main Desktop System */}
      {booted && (
        <div className="min-h-screen bg-gradient-to-b from-[#0a246a]/20 via-[#0d0c1d] to-[#0a246a]/20 pixel-pattern-bg relative flex flex-col justify-between crt-screen retro-cursor">
          {/* Top Vintage App Bar Navigation */}
          <header className="fixed top-0 left-0 w-full z-50 bg-[#d4d0c8] win-border-out font-sans text-black select-none p-1 flex flex-col gap-1">
            <div className="flex items-center justify-between px-2 py-0.5 border-b border-white">
              <span className="font-extrabold text-[11px] text-blue-900 tracking-wider">
                💻 {siteConfig.title}
              </span>
              <div className="flex items-center gap-3 text-[10px] text-gray-600 font-bold">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                  <span>ONLINE</span>
                </span>
                <span>CONNECTION: 56K</span>
              </div>
            </div>

            {/* Retro Toolbar Menu */}
            <div className="flex flex-wrap gap-2 px-1 py-1 border-t border-[#808080]">
              <button
                onClick={() => triggerOpenWindow("about")}
                className="win-btn text-[10px] font-bold py-1 px-3 flex items-center gap-1"
              >
                <span>📄</span> <span>ABOUT.EXE</span>
              </button>
              <button
                onClick={() => triggerOpenWindow("services")}
                className="win-btn text-[10px] font-bold py-1 px-3 flex items-center gap-1"
              >
                <span>⚙</span> <span>SERVICES</span>
              </button>
              <button
                onClick={() => triggerOpenWindow("projects")}
                className="win-btn text-[10px] font-bold py-1 px-3 flex items-center gap-1"
              >
                <span>📁</span> <span>PROJECTS</span>
              </button>
              <button
                onClick={() => triggerOpenWindow("setup")}
                className="win-btn text-[10px] font-bold py-1 px-3 flex items-center gap-1"
              >
                <span>💿</span> <span>PROCESS</span>
              </button>
              <button
                onClick={() => triggerOpenWindow("pricing")}
                className="win-btn text-[10px] font-bold py-1 px-3 flex items-center gap-1"
              >
                <span>💾</span> <span>PRICING</span>
              </button>
              <button
                onClick={() => triggerOpenWindow("guestbook")}
                className="win-btn text-[10px] font-bold py-1 px-3 flex items-center gap-1"
              >
                <span>💬</span> <span>GUESTBOOK</span>
              </button>
              <button
                onClick={() => triggerOpenWindow("contact")}
                className="win-btn text-[10px] font-bold py-1 px-3 flex items-center gap-1 bg-gradient-to-r from-blue-800 to-blue-600 text-white border-blue-400"
                style={{ color: "#ffffff" }}
              >
                <span>📟</span> <span>CONTACT</span>
              </button>
            </div>
          </header>

          {/* DesktopShell */}
          <main className="flex-grow w-full z-10">
            <DesktopShell />
          </main>

          {/* Retro Portal Footer */}
          <footer className="w-full bg-[#d4d0c8] border-t-2 border-white shadow-[0_-1px_0_#808080] py-6 pb-20 z-20 font-sans text-black select-none text-center flex flex-col gap-4 mt-auto">
            <div className="container mx-auto max-w-[1200px] px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex flex-col items-center md:items-start gap-1">
                <span className="font-extrabold text-blue-900">
                  © 2004–2026 {siteConfig.brandName}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">
                  THIS SITE IS ALWAYS UNDER CONSTRUCTION
                </span>
              </div>

              {/* Pixel Banners */}
              <RetroBanner />

              <div className="flex flex-col items-center md:items-end text-[10px] text-gray-500 font-mono">
                <span>LAST UPDATED: TODAY</span>
                <span>BEST VIEWED ON CRT MONITOR</span>
              </div>
            </div>

            {/* Giant watermark outline signature */}
            <div className="w-full text-center mt-3 select-none pointer-events-none opacity-5">
              <span
                className="text-[4rem] sm:text-[8rem] font-extrabold tracking-tighter uppercase leading-none"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px #000",
                }}
              >
                {siteConfig.brandName}
              </span>
            </div>
          </footer>

          {/* 3. CRT Monitor Screen Simulation Overlays */}
          <CRTOverlay />
        </div>
      )}
    </>
  );
}
