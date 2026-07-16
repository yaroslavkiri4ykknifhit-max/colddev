"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import { Minus, Square, X } from "lucide-react";
import { playClick, playOpenWindow, playMinimizeWindow } from "@/config/sounds";

interface SystemWindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  activeWindow: string | null;
  setActiveWindow: (id: string) => void;
  children: ReactNode;
  defaultX?: number;
  defaultY?: number;
  width?: string;
  height?: string;
}

export default function SystemWindow({
  id,
  title,
  isOpen,
  isMinimized,
  onClose,
  onMinimize,
  activeWindow,
  setActiveWindow,
  children,
  defaultX = 120,
  defaultY = 80,
  width = "500px",
  height = "auto"
}: SystemWindowProps) {
  const dragControls = useDragControls();
  const isActive = activeWindow === id;
  const isFirstRender = useRef(true);

  // Play open sound once when window is opened
  useEffect(() => {
    if (isOpen) {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        playOpenWindow();
      }
    } else {
      isFirstRender.current = true;
    }
  }, [isOpen]);

  if (!isOpen || isMinimized) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragListener={false}
      dragControls={dragControls}
      initial={{ x: defaultX, y: defaultY, scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      style={{
        width: width,
        height: height,
        zIndex: isActive ? 50 : 20,
        position: "absolute",
      }}
      onPointerDown={() => {
        setActiveWindow(id);
      }}
      className="bg-[#d4d0c8] p-[3px] rounded-sm select-none win-border-out flex flex-col pointer-events-auto"
    >
      {/* Title Bar */}
      <div
        onPointerDown={(e) => {
          setActiveWindow(id);
          dragControls.start(e);
        }}
        className={`win-titlebar p-1.5 flex items-center justify-between font-bold text-xs select-none retro-pointer ${
          isActive ? "" : "inactive"
        }`}
      >
        <span className="truncate flex items-center gap-1.5 max-w-[80%]">
          {/* Decorative mini application icon */}
          <span className="w-3.5 h-3.5 flex items-center justify-center bg-white/20 rounded-sm text-[8px] font-extrabold text-white">
            ⚙
          </span>
          {title}
        </span>
        
        {/* Title Bar Buttons */}
        <div className="flex gap-1">
          {/* Minimize Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playClick();
              playMinimizeWindow();
              onMinimize();
            }}
            className="w-[16px] h-[14px] flex items-center justify-center p-0 win-btn text-black font-extrabold text-[8px]"
          >
            <Minus className="w-2.5 h-2.5" />
          </button>
          
          {/* Maximize (disabled/decoration) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playClick();
            }}
            className="w-[16px] h-[14px] flex items-center justify-center p-0 win-btn text-black font-extrabold text-[8px] opacity-60"
          >
            <Square className="w-2 h-2" />
          </button>
          
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playClick();
              onClose();
            }}
            className="w-[16px] h-[14px] flex items-center justify-center p-0 win-btn text-black font-extrabold text-[8px] bg-red-400"
          >
            <X className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      {/* Menu Options Bar */}
      <div className="flex gap-3 px-2 py-0.5 border-b border-[#808080] text-[10px] text-black bg-[#d4d0c8]">
        <span className="hover:bg-blue-800 hover:text-white px-1 cursor-pointer">Файл</span>
        <span className="hover:bg-blue-800 hover:text-white px-1 cursor-pointer">Правка</span>
        <span className="hover:bg-blue-800 hover:text-white px-1 cursor-pointer">Вид</span>
        <span className="hover:bg-blue-800 hover:text-white px-1 cursor-pointer">Справка</span>
      </div>

      {/* Window Content Body */}
      <div className="flex-1 bg-[#ffffff] text-[#000000] p-4 m-[2px] win-border-in overflow-y-auto max-h-[70vh] text-xs">
        {children}
      </div>
    </motion.div>
  );
}
