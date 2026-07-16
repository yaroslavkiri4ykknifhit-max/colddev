"use client";

import { useState } from "react";
import { Cpu, Terminal, Play, Check } from "lucide-react";
import { siteContent } from "@/data/site-content";
import { playClick, playOpenWindow } from "@/config/sounds";

export default function SetupWizard() {
  const { processSteps } = siteContent;
  const [currentStep, setCurrentStep] = useState(0); // 0 to 5

  const handleNext = () => {
    playClick();
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      playOpenWindow();
      alert("Настройка проекта завершена! Вы готовы запустить свой следующий цифровой продукт.");
      setCurrentStep(0);
    }
  };

  const handleBack = () => {
    playClick();
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const activeStepData = processSteps[currentStep];
  const percentComplete = Math.floor(((currentStep + 1) / 6) * 100);

  return (
    <div className="bg-[#d4d0c8] p-[3px] rounded-sm win-border-out font-sans text-black flex flex-col justify-between min-h-[360px] max-w-lg mx-auto select-none">
      
      {/* Wizard Banner Header */}
      <div className="bg-white border-b border-[#808080] p-4 flex justify-between items-start">
        <div className="flex flex-col gap-1.5">
          <span className="font-bold text-xs text-black">
            Шаг {activeStepData.id} из 6: {activeStepData.title}
          </span>
          <span className="text-[10px] text-gray-500">
            Yaroslav Project Setup Wizard
          </span>
        </div>
        <div className="text-2xl text-blue-900">💻</div>
      </div>

      {/* Main Content Pane */}
      <div className="flex-1 grid grid-cols-12 gap-4 p-4 items-stretch bg-gray-50">
        {/* Left Side: Setup Wizard Art (Blue Retro background with text) */}
        <div className="hidden sm:flex sm:col-span-4 bg-[#0a246a] text-white p-3 flex-col justify-between rounded-sm shadow-md">
          <span className="font-bold text-[10px] uppercase tracking-wider text-blue-200">
            YAROSLAV SETUP
          </span>
          <div className="text-4xl text-center my-auto animate-pulse">💿</div>
          <span className="text-[8px] text-blue-300 font-mono">
            BUILD 2004.EXE
          </span>
        </div>

        {/* Right Side: Step details & description */}
        <div className="col-span-12 sm:col-span-8 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-xs uppercase text-blue-900">
              {activeStepData.title}
            </span>
            <p className="text-[11px] text-gray-700 leading-relaxed bg-white border border-gray-200 p-3 rounded shadow-inner">
              {activeStepData.description}
            </p>
          </div>

          {/* Setup Progress */}
          <div className="flex flex-col gap-1.5 mt-auto">
            <div className="flex justify-between text-[9px] font-bold text-gray-500">
              <span>СТАТУС УСТАНОВКИ</span>
              <span>{percentComplete}%</span>
            </div>
            <div className="w-full h-4 bg-white border border-[#808080] p-[1px] rounded-sm">
              <div
                className="h-full bg-gradient-to-r from-blue-950 to-blue-700 transition-all duration-300"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wizard Footer controls */}
      <div className="border-t border-[#808080] bg-[#d4d0c8] p-3 flex justify-between items-center shadow-[inset_0_1px_0_#fff]">
        <button
          onClick={() => {
            playClick();
            setCurrentStep(0);
          }}
          className="win-btn text-[10px] font-bold px-3 py-1 bg-red-100 border-red-300"
        >
          Cancel
        </button>

        <div className="flex gap-2">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`win-btn text-[10px] font-bold px-4 py-1 ${
              currentStep === 0 ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            &lt; Back
          </button>
          
          <button onClick={handleNext} className="win-btn text-[10px] font-bold px-4 py-1">
            {currentStep === 5 ? "Finish" : "Next >"}
          </button>
        </div>
      </div>

    </div>
  );
}
