"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX, Monitor, HelpCircle, ShieldCheck } from "lucide-react";
import { setSoundEnabled, getSoundEnabled, playClick } from "@/config/sounds";
import StartMenu from "./StartMenu";

interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
}

interface TaskbarProps {
  openWindows: WindowState[];
  activeWindow: string | null;
  onToggleWindow: (id: string) => void;
  onOpenWindow: (id: string) => void;
  onShutDownClick: () => void;
}

export default function Taskbar({
  openWindows,
  activeWindow,
  onToggleWindow,
  onOpenWindow,
  onShutDownClick
}: TaskbarProps) {
  const [time, setTime] = useState("");
  const [soundOn, setSoundOn] = useState(false);
  const [startOpen, setStartOpen] = useState(false);

  useEffect(() => {
    // Clock tick
    const tick = () => {
      const date = new Date();
      setTime(
        date.toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit"
        })
      );
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync sound status
  useEffect(() => {
    setSoundOn(getSoundEnabled());
  }, []);

  const handleSoundToggle = () => {
    playClick();
    const newSoundState = !soundOn;
    setSoundOn(newSoundState);
    setSoundEnabled(newSoundState);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full h-[40px] bg-[#d4d0c8] border-t-2 border-white shadow-[0_-1px_0_#808080] flex items-center justify-between z-[90] px-1 font-sans select-none pointer-events-auto">
      
      {/* Start Button & Active Window Buttons */}
      <div className="flex items-center gap-1.5 h-full relative">
        {/* Start Button (XP Greenish style) */}
        <button
          onClick={() => {
            playClick();
            setStartOpen(!startOpen);
          }}
          className={`h-[30px] px-3 font-extrabold text-sm text-white italic tracking-wider flex items-center gap-1 rounded-r-md cursor-pointer border-t-[1.5px] border-l-[1.5px] shadow-[0.5px_0.5px_0_0.5px_#103010] ${
            startOpen
              ? "bg-[#287828] border-[#103010] border-r border-b"
              : "bg-gradient-to-b from-[#3c9c3c] to-[#247424] border-[#6cfc6c] hover:brightness-110"
          }`}
          style={{
            borderBottomRightRadius: "6px",
            borderTopRightRadius: "6px"
          }}
        >
          <span className="text-base">❖</span>
          <span>пуск</span>
        </button>

        {/* Start Menu Popup */}
        <StartMenu
          isOpen={startOpen}
          onClose={() => setStartOpen(false)}
          onOpenWindow={onOpenWindow}
          onShutDownClick={onShutDownClick}
        />

        <div className="h-[20px] w-[1px] bg-[#808080] border-r border-white mx-1" />

        {/* Active Application Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-[50vw] sm:max-w-[70vw] hide-scrollbar">
          {openWindows
            .filter((win) => win.isOpen)
            .map((win) => {
              const isActive = activeWindow === win.id && !win.isMinimized;
              return (
                <button
                  key={win.id}
                  onClick={() => {
                    playClick();
                    onToggleWindow(win.id);
                  }}
                  className={`h-[28px] px-3 text-[11px] font-bold flex items-center gap-1.5 rounded-sm max-w-[120px] sm:max-w-[160px] truncate win-btn ${
                    isActive ? "win-btn active font-extrabold bg-[#e5e5e0] border-[#808080]" : ""
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-900/30 flex items-center justify-center text-[7px] text-white">
                    ⚙
                  </span>
                  <span className="truncate">{win.title}</span>
                </button>
              );
            })}
        </div>
      </div>

      {/* System Tray (Clock, Sound, Connection indicator) */}
      <div className="win-border-in bg-[#ece9d8] py-0.5 px-3 flex items-center gap-4 text-[11px] font-bold text-black border-l border-t border-[#808080] h-[28px]">
        {/* Connection status */}
        <div className="hidden sm:flex items-center gap-1 text-gray-600">
          <Monitor className="w-3.5 h-3.5" />
          <span className="text-[10px] tracking-wider font-mono">56K</span>
        </div>

        {/* Sound toggle button */}
        <button
          onClick={handleSoundToggle}
          className="flex items-center gap-1 hover:bg-black/5 p-1 rounded transition-colors text-black cursor-pointer"
          title={soundOn ? "Выключить звук" : "Включить звук"}
        >
          {soundOn ? (
            <Volume2 className="w-3.5 h-3.5 text-blue-900" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-red-700" />
          )}
          <span className="text-[10px]">{soundOn ? "SOUND: ON" : "SOUND: OFF"}</span>
        </button>

        {/* Clock Time */}
        <div className="font-mono text-xs border-l border-gray-400 pl-3 select-all">
          {time}
        </div>
      </div>

    </div>
  );
}
