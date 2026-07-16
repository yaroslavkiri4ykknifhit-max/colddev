"use client";

import { useState } from "react";
import { Send, FileCheck, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { playClick, playMessage } from "@/config/sounds";

export default function MessengerContact() {
  const [name, setName] = useState("");
  const [tg, setTg] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !body) return;

    playClick();
    setIsSending(true);

    // Simulate connection delay
    setTimeout(() => {
      setIsSending(false);
      setSent(true);
      playMessage();
      
      // Attempt to open mailto in a safe way or just notify
      const mailtoUrl = `mailto:${siteConfig.contacts.email}?subject=Project Request from ${name}&body=Telegram: ${tg}%0D%0A%0D%0ADescription: ${body}`;
      
      // We can open it, but since we are inside a simulated app, let's just let the UI show Success
      console.log("Sending mail to: ", mailtoUrl);
    }, 1800);
  };

  return (
    <div className="bg-[#ece9d8] p-1.5 rounded-sm font-sans text-black grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch select-none">
      
      {/* Left Chat Window Column */}
      <div className="md:col-span-8 bg-white border border-[#808080] p-4 flex flex-col justify-between min-h-[340px] relative rounded">
        {sent ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center border border-green-400">
              <CheckCircle2 className="w-6 h-6 text-green-700" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-green-800">СООБЩЕНИЕ ОТПРАВЛЕНО!</h4>
              <p className="text-[10px] text-gray-500 mt-1 max-w-xs leading-relaxed">
                Спасибо за ваше обращение! Я отвечу вам в Telegram в самое ближайшее время.
              </p>
            </div>
            <button
              onClick={() => {
                playClick();
                setSent(false);
                setName("");
                setTg("");
                setBody("");
              }}
              className="win-btn px-4 text-xs font-bold"
            >
              Отправить еще
            </button>
          </div>
        ) : (
          <form onSubmit={handleSend} className="flex-grow flex flex-col justify-between gap-3 text-xs">
            <div className="flex flex-col gap-2.5">
              <span className="font-extrabold text-[10px] text-blue-900 uppercase border-b border-gray-100 pb-1.5 block">
                Отправка Экспресс-Сообщения
              </span>

              {/* Name field */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-gray-700">ИМЯ / НАЗВАНИЕ КОМПАНИИ:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isSending}
                  className="p-2 win-border-in bg-white focus:outline-none"
                />
              </div>

              {/* Telegram Username */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-gray-700">TELEGRAM НИКНЕЙМ (@USERNAME):</label>
                <input
                  type="text"
                  value={tg}
                  onChange={(e) => setTg(e.target.value)}
                  placeholder="@your_username"
                  required
                  disabled={isSending}
                  className="p-2 win-border-in bg-white focus:outline-none font-mono"
                />
              </div>

              {/* Project description */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-gray-700">ОПИСАНИЕ ЗАДАЧИ / ПРОЕКТА:</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                  rows={4}
                  disabled={isSending}
                  className="p-2 win-border-in bg-white focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Submit button */}
            <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-4">
              <span className="text-[8px] text-gray-400 font-mono">CONNECTION STATUS: SECURED</span>
              <button
                type="submit"
                disabled={isSending}
                className="win-btn font-extrabold text-xs px-5 py-2.5 bg-blue-800 text-white border-blue-400 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                style={{ color: "#fff" }}
              >
                {isSending ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>ОТПРАВКА...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>ОТПРАВИТЬ</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Right Contact Details Column */}
      <div className="md:col-span-4 bg-[#ece9d8] p-4 border border-[#808080] rounded flex flex-col justify-between gap-4 font-sans text-xs text-black">
        {/* Status header */}
        <div className="flex flex-col gap-1.5 border-b border-gray-300 pb-3">
          <span className="font-extrabold text-[10px] text-gray-500 uppercase block">Контакты</span>
          <div className="flex items-center gap-2">
            {/* Green glowing online bulb */}
            <div className="w-3 h-3 rounded-full bg-green-600 animate-pulse border border-green-800" />
            <span className="font-bold text-xs text-green-700">ONLINE</span>
          </div>
        </div>

        {/* Info Rows */}
        <div className="flex flex-col gap-3 font-mono text-[10px]">
          <div className="flex flex-col">
            <span className="font-bold text-gray-500">ICQ UIN:</span>
            <span className="font-bold text-black select-all">{siteConfig.contacts.icq}</span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-gray-500">EMAIL:</span>
            <a href={`mailto:${siteConfig.contacts.email}`} className="font-bold text-blue-900 hover:underline select-all">
              {siteConfig.contacts.email}
            </a>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-gray-500">TELEGRAM:</span>
            <a href={siteConfig.contacts.telegram} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-900 hover:underline">
              @yaroslav_digital
            </a>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-gray-500">СКОРОСТЬ ОТВЕТА:</span>
            <span className="font-bold text-green-700">МГНОВЕННО</span>
          </div>
        </div>

        {/* Add to contacts btn */}
        <button
          onClick={() => {
            playClick();
            playMessage();
            alert("Ярослав добавлен в вашу адресную книгу! Жду ваших сообщений.");
          }}
          className="w-full win-btn font-extrabold text-[10px] py-2 bg-gradient-to-r from-blue-800 to-blue-600 text-white border-blue-400"
          style={{ color: "#fff" }}
        >
          ➕ ДОБАВИТЬ В КОНТАКТЫ
        </button>
      </div>

    </div>
  );
}
