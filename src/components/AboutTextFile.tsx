"use client";

import { useState, useEffect } from "react";

export default function AboutTextFile() {
  const [text, setText] = useState("");
  const content = `----------------------------------------
FILE: ABOUT_ME.TXT
LAST MODIFIED: TODAY
ENCODING: UTF-8
----------------------------------------

Привет. Я Ярослав.

Я разрабатываю сайты, Telegram-ботов, Mini Apps и рекламные системы для бизнеса.

Мне нравится превращать обычные идеи в работающие цифровые продукты, которые можно запустить, использовать и масштабировать.

SKILLS:
[██████████] Web Development
[█████████░] UI Design
[██████████] Telegram Systems
[████████░░] Google Ads
[█████████░] Automation

STATUS:
AVAILABLE FOR NEW PROJECTS
----------------------------------------`;

  useEffect(() => {
    // Typewriter effect
    let charIdx = 0;
    const interval = setInterval(() => {
      if (charIdx < content.length) {
        setText(content.substring(0, charIdx + 1));
        charIdx++;
      } else {
        clearInterval(interval);
      }
    }, 5); // very fast typing
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white text-black p-1 flex flex-col font-mono text-xs select-text selection:bg-blue-800 selection:text-white h-full min-h-[300px]">
      {/* Editor Menu Bar */}
      <div className="flex gap-4 px-2 py-1 border-b border-gray-200 text-[10px] text-gray-700 bg-gray-50 select-none">
        <span>Файл</span>
        <span>Правка</span>
        <span>Поиск</span>
        <span>Вид</span>
        <span>Справка</span>
      </div>

      {/* Editor Body */}
      <div className="flex-1 p-4 overflow-y-auto whitespace-pre-wrap leading-relaxed min-h-[240px]">
        {text}
        <span className="cursor-flash font-bold text-blue-900" />
      </div>

      {/* Status Bar */}
      <div className="bg-gray-100 border-t border-gray-200 px-3 py-1 flex justify-between text-[9px] text-gray-500 select-none">
        <span>Строка 24, Столбец 1</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}
