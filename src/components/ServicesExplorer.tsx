"use client";

import { useState } from "react";
import { Play, FileText, CheckSquare, RefreshCw, X } from "lucide-react";
import { siteContent, Service } from "@/data/site-content";
import { playClick, playOpenWindow, playError } from "@/config/sounds";

export default function ServicesExplorer() {
  const { services } = siteContent;
  const [runningApp, setRunningApp] = useState<Service | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [percent, setPercent] = useState(0);

  const simulateRun = (service: Service) => {
    playClick();
    setRunningApp(service);
    setPercent(0);
    setLogs([
      `EXECUTING FILE: ${service.filename}`,
      `SYSTEM ALLOCATING RAM (${service.size})...`,
      `LOADING ENGINE MODULES (${service.version})...`,
      `ESTABLISHING DATA COMPILER THREADS...`
    ]);

    let currentPercent = 0;
    const interval = setInterval(() => {
      currentPercent += 10;
      setPercent(currentPercent);
      if (currentPercent === 50) {
        setLogs((prev) => [...prev, `VERIFYING CONFIGURATION INTEGRITY: OK`, `CONNECTING CONTROLLERS...`]);
      }
      if (currentPercent === 100) {
        clearInterval(interval);
        setLogs((prev) => [
          ...prev,
          `EXECUTION SUCCESSFUL. STATUS: ${service.state}`,
          `MODULE IS STABLE AND READY FOR WORK.`
        ]);
        playOpenWindow();
      }
    }, 150);
  };

  return (
    <div className="flex flex-col gap-6 font-sans text-black relative">
      
      {/* Simulation Console Screen Popup */}
      {runningApp && (
        <div className="absolute inset-0 bg-black/85 z-40 flex items-center justify-center p-4 rounded border-2 border-green-500 shadow-2xl backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#000] border border-green-500 rounded p-4 font-mono text-[10px] text-green-500 flex flex-col gap-3 shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-green-500/30 pb-1.5 font-bold">
              <span>EXECUTION CONSOLE // {runningApp.filename}</span>
              <button
                onClick={() => {
                  playClick();
                  setRunningApp(null);
                }}
                className="text-red-500 hover:text-red-400 font-bold border border-red-500/30 px-1 cursor-pointer"
              >
                CLOSE
              </button>
            </div>
            
            {/* Logs List */}
            <div className="flex-1 min-h-[140px] flex flex-col gap-1 overflow-y-auto">
              {logs.map((log, idx) => (
                <div key={idx}>{log}</div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <span>PROGRESS: {percent}%</span>
                <span>STATUS: {percent === 100 ? "SUCCESS" : "RUNNING"}</span>
              </div>
              <div className="w-full h-4 bg-black border border-green-500 p-[1px]">
                <div className="h-full bg-green-500" style={{ width: `${percent}%` }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Explorer view panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-4 bg-[#d4d0c8] rounded-sm win-border-out flex flex-col justify-between min-h-[220px] group"
          >
            {/* Card Header */}
            <div>
              <div className="flex justify-between items-start border-b border-[#808080] pb-2 mb-3">
                <div className="flex items-center gap-2">
                  {/* Retro application executable glyph */}
                  <span className="text-xl">⚙</span>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-xs text-blue-900 font-mono tracking-wide">
                      {service.filename}
                    </span>
                    <span className="text-[9px] text-gray-500 uppercase font-semibold">
                      Размер: {service.size} | Версия: {service.version}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold border ${
                    service.state === "RUNNING"
                      ? "bg-green-100 text-green-800 border-green-300 animate-pulse"
                      : "bg-blue-100 text-blue-800 border-blue-300"
                  }`}
                >
                  {service.state}
                </span>
              </div>

              {/* Service description */}
              <h4 className="text-xs font-extrabold text-black mb-1">{service.title}</h4>
              <p className="text-[11px] text-gray-700 leading-relaxed mb-4">
                {service.description}
              </p>
            </div>

            {/* Action buttons and stability bar */}
            <div className="border-t border-[#808080] pt-3 mt-auto">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] font-bold text-gray-500">ИНТЕГРИРОВАНО:</span>
                <div className="w-[100px] h-3 bg-white border border-[#808080] p-[1px]">
                  <div className="h-full bg-blue-800" style={{ width: `${service.progress}%` }} />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => simulateRun(service)}
                  className="flex-1 win-btn text-[10px] font-bold flex items-center justify-center gap-1.5 bg-[#ece9d8] hover:bg-[#dfdfd0]"
                >
                  <Play className="w-3 h-3 text-green-700 fill-green-700" />
                  <span>RUN</span>
                </button>
                <button
                  onClick={() => {
                    playClick();
                    playError();
                    alert(`Системный отчет для ${service.filename}: Модуль полностью работоспособен и готов к интеграции в проект.`);
                  }}
                  className="win-btn text-[10px] font-bold flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3 h-3 text-gray-700" />
                  <span>DETAILS</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
