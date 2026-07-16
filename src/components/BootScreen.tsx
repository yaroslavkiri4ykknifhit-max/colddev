"use client";

import { useState, useEffect } from "react";
import { playStartup, playClick } from "@/config/sounds";

interface BootScreenProps {
  onBootComplete: () => void;
}

export default function BootScreen({ onBootComplete }: BootScreenProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [showBoot, setShowBoot] = useState(true);

  const bootTexts = [
    "BOOTING YAROSLAV WEB SYSTEM...",
    "LOADING PORTFOLIO DATABASE (site-content.db)...",
    "CONNECTING TO TELEGRAM SERVER (api.telegram.org)...",
    "INITIALIZING DESIGN COMPILER (framer-motion.dll)...",
    "GOOGLE ADS GRAPHICS DRIVER: OK",
    "CLIENT GENERATION CORE MODULE: ONLINE",
    "ESTABLISHING DIAL-UP HANDSHAKE: OK (56.0 Kbps)",
    "WELCOME TO THE DIGITAL EXPERIENCE AREA."
  ];

  useEffect(() => {
    // Check if session storage exists
    const hasBooted = sessionStorage.getItem("has_booted");
    if (hasBooted === "true") {
      setShowBoot(false);
      onBootComplete();
      return;
    }

    // Print lines one by one
    let lineIdx = 0;
    const lineInterval = setInterval(() => {
      if (lineIdx < bootTexts.length) {
        setLines((prev) => [...prev, bootTexts[lineIdx]]);
        lineIdx++;
      } else {
        clearInterval(lineInterval);
      }
    }, 250);

    // Progress bar increment
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    // Complete boot trigger
    const completeTimeout = setTimeout(() => {
      handleComplete();
    }, 2800);

    return () => {
      clearInterval(lineInterval);
      clearInterval(progressInterval);
      clearTimeout(completeTimeout);
    };
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem("has_booted", "true");
    setShowBoot(false);
    playStartup();
    onBootComplete();
  };

  const handleSkip = () => {
    playClick();
    handleComplete();
  };

  if (!showBoot) return null;

  return (
    <div className="fixed inset-0 bg-black text-green-500 font-mono p-6 z-[999] flex flex-col justify-between selection:bg-green-500 selection:text-black">
      {/* Boot Logs */}
      <div className="flex-1 flex flex-col gap-1.5 overflow-hidden text-xs md:text-sm">
        {lines.map((line, idx) => (
          <div key={idx} className="leading-relaxed">
            {line}
          </div>
        ))}
        {lines.length === bootTexts.length && (
          <div className="cursor-flash text-white font-bold mt-2">
            SYSTEM READY. PRESS ANY KEY TO EXECUTE OR WAIT FOR SHELL...
          </div>
        )}
      </div>

      {/* Progress bar at the bottom */}
      <div className="w-full max-w-md mx-auto flex flex-col gap-3 items-center border border-green-500/30 p-5 rounded bg-black/50 shadow-lg">
        <span className="text-xs uppercase tracking-widest text-green-400">YAROSLAV.EXE - Loading System</span>
        
        {/* Visual Progress Bar */}
        <div className="w-full h-5 bg-black border-2 border-green-500 p-[2px] rounded-sm">
          <div
            className="h-full bg-green-500 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <span className="text-[10px] text-green-500/70">{progress}% Loaded</span>
      </div>

      {/* Skip Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSkip}
          className="border border-green-500 px-3 py-1 text-xs hover:bg-green-500 hover:text-black transition-colors rounded cursor-pointer"
        >
          SKIP INTRO [ESC]
        </button>
      </div>
    </div>
  );
}
