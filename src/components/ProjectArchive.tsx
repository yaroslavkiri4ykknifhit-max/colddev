"use client";

import { useState } from "react";
import { Folder, FileCode, Monitor, Award, BookOpen, Clock, File } from "lucide-react";
import { siteContent, Project } from "@/data/site-content";
import { playClick } from "@/config/sounds";

export default function ProjectArchive() {
  const { projects } = siteContent;
  const [selectedProj, setSelectedProj] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "tech" | "results" | "readme">("general");

  const selectProject = (project: Project) => {
    playClick();
    setSelectedProj(project);
    setActiveTab("general");
  };

  const closeInspector = () => {
    playClick();
    setSelectedProj(null);
  };

  return (
    <div className="flex flex-col gap-6 font-sans text-black relative min-h-[380px]">
      
      {/* File Inspector Windows-style Properties popup */}
      {selectedProj && (
        <div className="absolute inset-0 bg-black/60 z-40 flex items-center justify-center p-4 rounded backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#d4d0c8] p-[3px] rounded-sm win-border-out flex flex-col font-sans text-black shadow-2xl">
            {/* Header */}
            <div className="bg-[#000080] text-white p-1.5 flex items-center justify-between font-bold text-xs select-none">
              <span className="truncate flex items-center gap-1.5">
                📄 Свойства: {selectedProj.filename}
              </span>
              <button
                onClick={closeInspector}
                className="w-[16px] h-[14px] flex items-center justify-center p-0 win-btn text-black font-extrabold text-[8px] bg-red-400"
              >
                X
              </button>
            </div>

            {/* Properties Tabs */}
            <div className="flex gap-1 px-1 pt-1.5 border-b border-[#808080]">
              {(["general", "tech", "results", "readme"] as const).map((tab) => {
                const labelMap = {
                  general: "Общие",
                  tech: "Стек",
                  results: "Результат",
                  readme: "README"
                };
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      playClick();
                      setActiveTab(tab);
                    }}
                    className={`px-3 py-1 text-[10px] font-bold rounded-t-sm border-t border-x ${
                      isActive
                        ? "bg-white border-[#808080] -mb-[1px] pb-1.5 z-10"
                        : "bg-[#d4d0c8] border-[#808080] opacity-80"
                    }`}
                  >
                    {labelMap[tab]}
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            <div className="bg-white p-4 m-1.5 win-border-in flex-1 overflow-y-auto max-h-[50vh] text-xs">
              {activeTab === "general" && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">📄</span>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-sm text-black">{selectedProj.title}</span>
                      <span className="text-[10px] text-gray-500 font-mono">{selectedProj.filename}</span>
                    </div>
                  </div>

                  <div className="h-[1px] bg-gray-200" />

                  <table className="w-full text-left text-[11px] leading-relaxed">
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <th className="py-2 text-gray-500 font-bold w-1/3">Тип файла:</th>
                        <td className="py-2 text-black font-semibold">Приложение (.exe)</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <th className="py-2 text-gray-500 font-bold">Категория:</th>
                        <td className="py-2 text-blue-900 font-bold">{selectedProj.category}</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <th className="py-2 text-gray-500 font-bold">Дата релиза:</th>
                        <td className="py-2 text-black font-mono">{selectedProj.date}</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <th className="py-2 text-gray-500 font-bold">Размер:</th>
                        <td className="py-2 text-black font-mono">{selectedProj.size}</td>
                      </tr>
                      <tr>
                        <th className="py-2 text-gray-500 font-bold">Статус:</th>
                        <td className="py-2 font-extrabold text-green-700">{selectedProj.status}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "tech" && (
                <div className="flex flex-col gap-3">
                  <span className="font-bold text-blue-900 flex items-center gap-1.5">
                    <FileCode className="w-4 h-4 text-blue-700" /> Использованные технологии:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProj.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-[#ece9d8] border border-[#808080] font-mono text-[10px] font-bold text-black"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded flex flex-col gap-1.5">
                    <span className="font-bold text-[10px] text-gray-500 uppercase">Список задач:</span>
                    <div className="space-y-1">
                      {selectedProj.tasks.map((task, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-[11px] text-gray-700">
                          <span>•</span> <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "results" && (
                <div className="flex flex-col gap-3">
                  <span className="font-bold text-green-700 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-green-600" /> Бизнес-результаты:
                  </span>
                  <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded font-semibold italic text-xs leading-relaxed">
                    «{selectedProj.result}»
                  </div>
                </div>
              )}

              {activeTab === "readme" && (
                <div className="flex flex-col gap-3 font-mono text-[11px] leading-relaxed text-gray-700 selection:bg-black selection:text-white">
                  <span className="font-bold border-b border-gray-200 pb-1 flex items-center gap-1.5 text-black">
                    <BookOpen className="w-4 h-4 text-gray-600" /> README.TXT:
                  </span>
                  <p className="bg-gray-50 p-3 border border-gray-100 rounded">
                    {selectedProj.description}
                  </p>
                </div>
              )}
            </div>

            {/* Footer buttons */}
            <div className="flex justify-end gap-2 p-2 border-t border-[#808080] bg-[#d4d0c8]">
              <button onClick={closeInspector} className="win-btn px-4 text-xs font-bold">
                ОК
              </button>
              <button onClick={closeInspector} className="win-btn px-4 text-xs">
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Folders & Executable Grid */}
      <div className="bg-white p-4 win-border-in shadow-inner flex-1 grid grid-cols-2 sm:grid-cols-4 gap-6 select-none">
        {projects.map((project) => (
          <div
            key={project.id}
            onDoubleClick={() => selectProject(project)}
            onClick={() => selectProject(project)} // Allow simple click for mobile friendliness
            className="flex flex-col items-center text-center p-2 rounded hover:bg-blue-800/10 border border-transparent hover:border-blue-800/20 cursor-pointer transition-colors duration-150 group"
          >
            {/* Visual Icon representing exe files */}
            <div className="w-10 h-10 flex items-center justify-center text-3xl mb-2 group-hover:scale-105 transition-transform">
              ⚙
            </div>
            
            <span className="font-mono text-[10px] font-bold text-gray-800 group-hover:text-blue-900 group-hover:underline break-all leading-tight">
              {project.filename}
            </span>
            <span className="text-[8px] text-gray-400 mt-1 uppercase font-semibold">
              {project.size}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
