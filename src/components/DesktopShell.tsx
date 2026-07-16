"use client";

import { useState, useEffect } from "react";
import { Folder, Terminal, Award, HelpCircle, Heart, Trash, FileText, Cpu, Settings } from "lucide-react";
import { playClick, playError, playOpenWindow, playMinimizeWindow } from "@/config/sounds";
import SystemWindow from "./SystemWindow";
import Taskbar from "./Taskbar";
import HeroTerminal from "./HeroTerminal";
import ServicesExplorer from "./ServicesExplorer";
import ProjectArchive from "./ProjectArchive";
import AboutTextFile from "./AboutTextFile";
import SetupWizard from "./SetupWizard";
import SoftwarePricing from "./SoftwarePricing";
import Guestbook from "./Guestbook";
import HelpCenter from "./HelpCenter";
import MessengerContact from "./MessengerContact";
import RetroBanner from "./RetroBanner";

interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  width?: string;
  defaultX: number;
  defaultY: number;
}

export default function DesktopShell() {
  const [windows, setWindows] = useState<WindowState[]>([
    { id: "about", title: "ABOUT_ME.TXT", isOpen: false, isMinimized: false, width: "450px", defaultX: 40, defaultY: 50 },
    { id: "services", title: "Control Panel - Services.exe", isOpen: false, isMinimized: false, width: "650px", defaultX: 180, defaultY: 80 },
    { id: "projects", title: "Project Archive", isOpen: false, isMinimized: false, width: "680px", defaultX: 120, defaultY: 100 },
    { id: "setup", title: "YAROSLAV Project Setup Wizard", isOpen: false, isMinimized: false, width: "520px", defaultX: 200, defaultY: 60 },
    { id: "pricing", title: "Software Catalog", isOpen: false, isMinimized: false, width: "680px", defaultX: 140, defaultY: 90 },
    { id: "guestbook", title: "Guestbook Forum", isOpen: false, isMinimized: false, width: "600px", defaultX: 90, defaultY: 120 },
    { id: "faq", title: "Help & Support Center", isOpen: false, isMinimized: false, width: "650px", defaultX: 160, defaultY: 70 },
    { id: "contact", title: "Instant Chat - YAROSLAV.EXE", isOpen: false, isMinimized: false, width: "580px", defaultX: 220, defaultY: 110 },
    { id: "recycle", title: "Recycle Bin", isOpen: false, isMinimized: false, width: "400px", defaultX: 50, defaultY: 150 },
    { id: "secret", title: "Secret Folder", isOpen: false, isMinimized: false, width: "420px", defaultX: 250, defaultY: 130 },
  ]);

  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [isShutDownVisible, setIsShutDownVisible] = useState(false);

  useEffect(() => {
    const handleOpenEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.id) {
        handleOpenWindow(customEvent.detail.id);
      }
    };
    window.addEventListener("open-window", handleOpenEvent);
    return () => window.removeEventListener("open-window", handleOpenEvent);
  }, []);

  const handleOpenWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((win) => {
        if (win.id === id) {
          return { ...win, isOpen: true, isMinimized: false };
        }
        return win;
      })
    );
    setActiveWindow(id);
  };

  const handleCloseWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((win) => {
        if (win.id === id) {
          return { ...win, isOpen: false };
        }
        return win;
      })
    );
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  };

  const handleMinimizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((win) => {
        if (win.id === id) {
          return { ...win, isMinimized: true };
        }
        return win;
      })
    );
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  };

  const handleToggleWindowFromTaskbar = (id: string) => {
    setWindows((prev) =>
      prev.map((win) => {
        if (win.id === id) {
          if (win.isMinimized) {
            setActiveWindow(id);
            return { ...win, isMinimized: false };
          }
          if (activeWindow === id) {
            playMinimizeWindow();
            return { ...win, isMinimized: true };
          }
          setActiveWindow(id);
          return win;
        }
        return win;
      })
    );
  };

  const handleShutDownClick = () => {
    playError();
    setIsShutDownVisible(true);
  };

  // Desktop Shortcut Icons definition
  const desktopIcons = [
    { id: "projects", name: "My Projects", icon: "📁" },
    { id: "services", name: "Services.exe", icon: "⚙" },
    { id: "setup", name: "Setup Wizard", icon: "💿" },
    { id: "about", name: "About Me.txt", icon: "📄" },
    { id: "pricing", name: "Pricing catalog", icon: "💾" },
    { id: "guestbook", name: "Guestbook", icon: "💬" },
    { id: "faq", name: "FAQ", icon: "❓" },
    { id: "contact", name: "Contact.icq", icon: "📟" },
    { id: "recycle", name: "Recycle Bin", icon: "🗑" },
    { id: "secret", name: "Secret Folder", icon: "📁" }
  ];

  return (
    <div className="w-full min-h-[92vh] pb-16 flex flex-col justify-between relative pointer-events-none">
      
      {/* 1. Desktop Shortcuts grid */}
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-5 p-6 sm:absolute sm:top-24 sm:left-4 z-10 w-44 pointer-events-auto">
        {desktopIcons.map((ico) => (
          <div
            key={ico.id}
            onDoubleClick={() => handleOpenWindow(ico.id)}
            onClick={() => handleOpenWindow(ico.id)} // Tap support
            className="flex flex-col items-center justify-center text-center p-2 border border-transparent hover:bg-white/5 hover:border-white/10 rounded cursor-pointer group transition-all"
          >
            <div className="text-3xl mb-1 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform select-none">
              {ico.icon}
            </div>
            <span className="text-[10px] font-bold text-white tracking-wide font-sans text-shadow-md select-none group-hover:underline">
              {ico.name}
            </span>
          </div>
        ))}
      </div>

      {/* 2. Drag-and-Drop Active Windows */}
      <div className="flex-1 w-full max-w-[1200px] mx-auto px-4 pt-28 pb-16 relative">
        
        {/* Main Terminal Homepage (Always visible base module) */}
        <div className="mb-12 pointer-events-auto">
          <HeroTerminal onOpenWindow={handleOpenWindow} />
        </div>

        {/* Windows containers */}
        <div className="absolute inset-0 top-24 pointer-events-none">
          
          {/* About Text Editor window */}
          <SystemWindow
            id="about"
            title="ABOUT_ME.TXT"
            isOpen={windows.find((w) => w.id === "about")?.isOpen || false}
            isMinimized={windows.find((w) => w.id === "about")?.isMinimized || false}
            onClose={() => handleCloseWindow("about")}
            onMinimize={() => handleMinimizeWindow("about")}
            activeWindow={activeWindow}
            setActiveWindow={setActiveWindow}
            width={windows.find((w) => w.id === "about")?.width}
            defaultX={40}
            defaultY={60}
          >
            <AboutTextFile />
          </SystemWindow>

          {/* Services explorer window */}
          <SystemWindow
            id="services"
            title="Control Panel - Services.exe"
            isOpen={windows.find((w) => w.id === "services")?.isOpen || false}
            isMinimized={windows.find((w) => w.id === "services")?.isMinimized || false}
            onClose={() => handleCloseWindow("services")}
            onMinimize={() => handleMinimizeWindow("services")}
            activeWindow={activeWindow}
            setActiveWindow={setActiveWindow}
            width={windows.find((w) => w.id === "services")?.width}
            defaultX={180}
            defaultY={90}
          >
            <ServicesExplorer />
          </SystemWindow>

          {/* Projects file explorer window */}
          <SystemWindow
            id="projects"
            title="Project Archive"
            isOpen={windows.find((w) => w.id === "projects")?.isOpen || false}
            isMinimized={windows.find((w) => w.id === "projects")?.isMinimized || false}
            onClose={() => handleCloseWindow("projects")}
            onMinimize={() => handleMinimizeWindow("projects")}
            activeWindow={activeWindow}
            setActiveWindow={setActiveWindow}
            width={windows.find((w) => w.id === "projects")?.width}
            defaultX={120}
            defaultY={110}
          >
            <ProjectArchive />
          </SystemWindow>

          {/* Setup wizard window */}
          <SystemWindow
            id="setup"
            title="YAROSLAV Project Setup Wizard"
            isOpen={windows.find((w) => w.id === "setup")?.isOpen || false}
            isMinimized={windows.find((w) => w.id === "setup")?.isMinimized || false}
            onClose={() => handleCloseWindow("setup")}
            onMinimize={() => handleMinimizeWindow("setup")}
            activeWindow={activeWindow}
            setActiveWindow={setActiveWindow}
            width={windows.find((w) => w.id === "setup")?.width}
            defaultX={200}
            defaultY={50}
          >
            <SetupWizard />
          </SystemWindow>

          {/* Pricing Catalog window */}
          <SystemWindow
            id="pricing"
            title="Software Catalog"
            isOpen={windows.find((w) => w.id === "pricing")?.isOpen || false}
            isMinimized={windows.find((w) => w.id === "pricing")?.isMinimized || false}
            onClose={() => handleCloseWindow("pricing")}
            onMinimize={() => handleMinimizeWindow("pricing")}
            activeWindow={activeWindow}
            setActiveWindow={setActiveWindow}
            width={windows.find((w) => w.id === "pricing")?.width}
            defaultX={140}
            defaultY={100}
          >
            <SoftwarePricing />
          </SystemWindow>

          {/* Guestbook window */}
          <SystemWindow
            id="guestbook"
            title="Guestbook Forum"
            isOpen={windows.find((w) => w.id === "guestbook")?.isOpen || false}
            isMinimized={windows.find((w) => w.id === "guestbook")?.isMinimized || false}
            onClose={() => handleCloseWindow("guestbook")}
            onMinimize={() => handleMinimizeWindow("guestbook")}
            activeWindow={activeWindow}
            setActiveWindow={setActiveWindow}
            width={windows.find((w) => w.id === "guestbook")?.width}
            defaultX={90}
            defaultY={130}
          >
            <Guestbook />
          </SystemWindow>

          {/* FAQ Support Center window */}
          <SystemWindow
            id="faq"
            title="Help & Support Center"
            isOpen={windows.find((w) => w.id === "faq")?.isOpen || false}
            isMinimized={windows.find((w) => w.id === "faq")?.isMinimized || false}
            onClose={() => handleCloseWindow("faq")}
            onMinimize={() => handleMinimizeWindow("faq")}
            activeWindow={activeWindow}
            setActiveWindow={setActiveWindow}
            width={windows.find((w) => w.id === "faq")?.width}
            defaultX={160}
            defaultY={80}
          >
            <HelpCenter />
          </SystemWindow>

          {/* Contact chat window */}
          <SystemWindow
            id="contact"
            title="Instant Chat - YAROSLAV.EXE"
            isOpen={windows.find((w) => w.id === "contact")?.isOpen || false}
            isMinimized={windows.find((w) => w.id === "contact")?.isMinimized || false}
            onClose={() => handleCloseWindow("contact")}
            onMinimize={() => handleMinimizeWindow("contact")}
            activeWindow={activeWindow}
            setActiveWindow={setActiveWindow}
            width={windows.find((w) => w.id === "contact")?.width}
            defaultX={220}
            defaultY={120}
          >
            <MessengerContact />
          </SystemWindow>

          {/* Recycle Bin window (interactive easter egg) */}
          <SystemWindow
            id="recycle"
            title="Recycle Bin"
            isOpen={windows.find((w) => w.id === "recycle")?.isOpen || false}
            isMinimized={windows.find((w) => w.id === "recycle")?.isMinimized || false}
            onClose={() => handleCloseWindow("recycle")}
            onMinimize={() => handleMinimizeWindow("recycle")}
            activeWindow={activeWindow}
            setActiveWindow={setActiveWindow}
            width={windows.find((w) => w.id === "recycle")?.width}
            defaultX={50}
            defaultY={150}
          >
            <div className="flex flex-col gap-4 font-sans text-xs">
              <span className="font-extrabold text-blue-900 border-b border-[#808080] pb-2 uppercase tracking-wide">
                Удаленные файлы и проекты
              </span>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-2xl">📄</span>
                  <span className="font-mono text-[10px] text-red-800 break-all leading-tight mt-1">SaaS_Landing_Design.fig</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl">📄</span>
                  <span className="font-mono text-[10px] text-red-800 break-all leading-tight mt-1">Apple_Styled_Theme.css</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl">📄</span>
                  <span className="font-mono text-[10px] text-red-800 break-all leading-tight mt-1">Slick_Minimalism.txt</span>
                </div>
              </div>
              <button
                onClick={() => {
                  playClick();
                  playError();
                  alert("Действие заблокировано системным администратором!");
                }}
                className="win-btn font-bold text-xs py-2 bg-red-100 border-red-300"
              >
                Очистить корзину
              </button>
            </div>
          </SystemWindow>

          {/* Secret Folder window (interactive easter egg) */}
          <SystemWindow
            id="secret"
            title="Secret Folder"
            isOpen={windows.find((w) => w.id === "secret")?.isOpen || false}
            isMinimized={windows.find((w) => w.id === "secret")?.isMinimized || false}
            onClose={() => handleCloseWindow("secret")}
            onMinimize={() => handleMinimizeWindow("secret")}
            activeWindow={activeWindow}
            setActiveWindow={setActiveWindow}
            width={windows.find((w) => w.id === "secret")?.width}
            defaultX={250}
            defaultY={130}
          >
            <div className="flex flex-col gap-4 font-sans text-xs">
              <span className="font-extrabold text-blue-900 border-b border-[#808080] pb-2 uppercase tracking-wide">
                Secret System Files
              </span>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🔑</span>
                <div className="flex flex-col">
                  <span className="font-bold text-black text-xs">Sysop Secret Key:</span>
                  <span className="font-mono text-[10px] text-gray-500">NEVER-GIVE-UP-BUILD-YOUR-IDEAS</span>
                </div>
              </div>
              <p className="italic text-gray-600 bg-gray-50 p-2 rounded border border-gray-200">
                «The best way to predict the future is to invent it.» — Alan Kay
              </p>
            </div>
          </SystemWindow>

        </div>
      </div>

      {/* 3. Shut Down Mockup Popup */}
      {isShutDownVisible && (
        <div className="fixed inset-0 bg-black/70 z-[200] flex items-center justify-center p-4 backdrop-blur-sm pointer-events-auto">
          <div className="bg-[#d4d0c8] p-[3px] rounded-sm win-border-out w-[320px] font-sans text-black flex flex-col shadow-2xl">
            {/* Header */}
            <div className="bg-[#000080] text-white p-1.5 flex items-center justify-between font-bold text-xs select-none">
              <span>Выключить компьютер</span>
              <button
                onClick={() => {
                  playClick();
                  setIsShutDownVisible(false);
                }}
                className="w-[16px] h-[14px] flex items-center justify-center p-0 win-btn text-black font-extrabold text-[8px] bg-red-400"
              >
                X
              </button>
            </div>
            
            {/* Body */}
            <div className="p-4 flex flex-col gap-2 bg-gray-50">
              <span className="text-3xl text-center">💻</span>
              <span className="text-center font-bold text-xs">Вы действительно хотите выйти из интернета?</span>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 p-2 border-t border-[#808080] bg-[#d4d0c8]">
              <button
                onClick={() => {
                  playClick();
                  setIsShutDownVisible(false);
                }}
                className="win-btn px-4 text-xs font-bold"
              >
                Да
              </button>
              <button
                onClick={() => {
                  playClick();
                  setIsShutDownVisible(false);
                }}
                className="win-btn px-4 text-xs"
              >
                Нет
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Global Taskbar */}
      <Taskbar
        openWindows={windows}
        activeWindow={activeWindow}
        onToggleWindow={handleToggleWindowFromTaskbar}
        onOpenWindow={handleOpenWindow}
        onShutDownClick={handleShutDownClick}
      />
    </div>
  );
}
