"use client";

import { motion } from "framer-motion";
import { Folder, Settings, Terminal, ShieldAlert, Cpu, Award } from "lucide-react";
import { siteConfig } from "@/config/site";
import { playClick, playError } from "@/config/sounds";

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWindow: (id: string) => void;
  onShutDownClick: () => void;
}

export default function StartMenu({
  isOpen,
  onClose,
  onOpenWindow,
  onShutDownClick
}: StartMenuProps) {
  if (!isOpen) return null;

  const leftMenu = [
    { id: "projects", name: "Project Archive", icon: <Folder className="w-4 h-4 text-yellow-600" /> },
    { id: "services", name: "Control Panel (Services)", icon: <Settings className="w-4 h-4 text-blue-600" /> },
    { id: "about", name: "ABOUT_ME.TXT", icon: <Terminal className="w-4 h-4 text-gray-700" /> },
    { id: "setup", name: "Project Setup Wizard", icon: <Cpu className="w-4 h-4 text-indigo-600" /> },
    { id: "pricing", name: "Software Pricing catalog", icon: <Award className="w-4 h-4 text-green-600" /> },
    { id: "guestbook", name: "Sign Guestbook", icon: <Folder className="w-4 h-4 text-yellow-600" /> },
  ];

  return (
    <div
      className="absolute bottom-[40px] left-0 w-[420px] bg-[#d4d0c8] win-border-out z-[100] font-sans flex flex-col shadow-2xl pointer-events-auto"
      style={{
        borderTopLeftRadius: "5px",
        borderTopRightRadius: "5px",
        overflow: "hidden"
      }}
    >
      {/* Start Menu Header (Windows XP Blue Theme style) */}
      <div className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 p-3 flex items-center gap-3 border-b-2 border-orange-500">
        <div className="w-10 h-10 rounded-full border-2 border-white bg-white/20 flex items-center justify-center font-bold text-white shadow-lg overflow-hidden">
          {/* Retro avatar glyph */}
          <span className="text-xl">🤵</span>
        </div>
        <div className="flex flex-col text-white">
          <span className="font-bold text-sm">YAROSLAV</span>
          <span className="text-[10px] text-blue-200">webmaster@colddev.pro</span>
        </div>
      </div>

      {/* Main columns */}
      <div className="grid grid-cols-2 bg-white">
        {/* Left Column (Programs list) */}
        <div className="p-2 border-r border-[#d4d0c8] flex flex-col gap-1 bg-white">
          <span className="text-[10px] font-bold text-gray-400 px-2 pb-1.5 uppercase">Часто используемые</span>
          {leftMenu.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                playClick();
                onOpenWindow(item.id);
                onClose();
              }}
              className="w-full text-left px-2 py-1.5 flex items-center gap-2.5 rounded hover:bg-blue-800 hover:text-white transition-colors duration-150 text-xs font-semibold text-black"
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        {/* Right Column (System / Places) */}
        <div className="bg-[#ece9d8] p-2 flex flex-col justify-between">
          <div className="flex flex-col gap-1.5 text-xs text-black">
            <span className="text-[10px] font-bold text-gray-500 uppercase px-1">Информация</span>
            
            <div className="px-1.5 py-1 flex flex-col">
              <span className="font-bold text-[10px] text-gray-600">Соединение:</span>
              <span className="font-semibold text-blue-900">{siteConfig.stats.connection}</span>
            </div>

            <div className="px-1.5 py-1 flex flex-col">
              <span className="font-bold text-[10px] text-gray-600">Посетителей:</span>
              <span className="font-mono text-green-700 font-bold">{siteConfig.stats.visitsCount}</span>
            </div>

            <div className="px-1.5 py-1 flex flex-col">
              <span className="font-bold text-[10px] text-gray-600">Статус сервера:</span>
              <span className="font-semibold text-green-700">{siteConfig.stats.serverStatus}</span>
            </div>
          </div>

          <div className="border-t border-[#d4d0c8] pt-2 mt-4 text-[10px] text-center font-bold text-gray-500 italic">
            BEST VIEWED AT 1024×768
          </div>
        </div>
      </div>

      {/* Start Menu Footer (Log Off / Turn Off) */}
      <div className="bg-[#ece9d8] p-2 flex justify-between border-t border-white shadow-[inset_0_1px_0_#fff]">
        <button
          onClick={() => {
            playClick();
            playError();
            alert("Вы не можете выйти из сети. Разработчик всегда на связи!");
          }}
          className="win-btn text-[10px] font-bold flex items-center gap-1.5"
        >
          <Folder className="w-3.5 h-3.5 text-yellow-600" />
          <span>Выйти</span>
        </button>

        <button
          onClick={() => {
            playClick();
            onClose();
            onShutDownClick();
          }}
          className="win-btn text-[10px] font-bold bg-red-100 flex items-center gap-1.5"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
          <span>Выключить...</span>
        </button>
      </div>
    </div>
  );
}
