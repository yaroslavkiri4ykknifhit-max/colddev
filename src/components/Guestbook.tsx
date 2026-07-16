"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Send, Globe } from "lucide-react";
import { siteContent, Testimonial } from "@/data/site-content";
import { playClick, playMessage } from "@/config/sounds";

export default function Guestbook() {
  const [messages, setMessages] = useState<Testimonial[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [messageText, setMessageText] = useState("");

  // Load and sync messages
  useEffect(() => {
    const saved = localStorage.getItem("guestbook_posts");
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages(siteContent.testimonials);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !messageText) return;

    playClick();

    const newPost: Testimonial = {
      id: Math.random().toString(),
      nickname: name.replace(/\s+/g, "_"),
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      msgNum: `#${messages.length + 1}`,
      avatar: (Math.floor(Math.random() * 3) + 1).toString(),
      status: "Guest",
      text: messageText,
      icqOnline: false
    };

    const updated = [newPost, ...messages];
    setMessages(updated);
    localStorage.setItem("guestbook_posts", JSON.stringify(updated));

    // Clear form
    setName("");
    setEmail("");
    setMessageText("");

    // Play notification sound
    setTimeout(() => {
      playMessage();
    }, 300);
  };

  return (
    <div className="flex flex-col gap-6 font-sans text-black">
      
      {/* Sign Guestbook Form */}
      <div className="p-5 bg-[#d4d0c8] rounded-sm win-border-out flex flex-col gap-3">
        <span className="font-extrabold text-xs text-blue-900 border-b border-[#808080] pb-2 uppercase tracking-wide flex items-center gap-1.5">
          <MessageSquare className="w-4 h-4 text-blue-700" /> Добавить запись в Гостевую Книгу
        </span>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-gray-700">ИМЯ / НИКНЕЙМ:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="p-2 win-border-in bg-white focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-gray-700">EMAIL (НЕ ПУБЛИКУЕТСЯ):</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 win-border-in bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 text-xs">
            <label className="font-bold text-gray-700">СООБЩЕНИЕ:</label>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              required
              rows={3}
              className="p-2 win-border-in bg-white focus:outline-none resize-y"
            />
          </div>

          <button type="submit" className="win-btn font-extrabold text-xs py-2 bg-blue-800 text-white border-blue-400 self-end px-6 flex items-center gap-2 cursor-pointer" style={{ color: "#fff" }}>
            <Send className="w-3.5 h-3.5" />
            <span>ОСТАВИТЬ ЗАПИСЬ</span>
          </button>
        </form>
      </div>

      {/* Guestbook Entries list */}
      <div className="flex flex-col gap-4">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">ПОСЛЕДНИЕ СООБЩЕНИЯ</span>
        
        <div className="space-y-4">
          {messages.map((item) => (
            <div key={item.id} className="p-4 bg-[#ece9d8] rounded-sm win-border-out flex flex-col gap-3 font-sans text-xs">
              
              {/* Entry metadata */}
              <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-white border border-gray-400 flex items-center justify-center font-bold text-lg select-none">
                    {item.avatar === "1" ? "🦊" : item.avatar === "2" ? "🐻" : "🐯"}
                  </div>
                  <div>
                    <span className="font-extrabold text-blue-900 font-mono tracking-wide">{item.nickname}</span>
                    <div className="flex items-center gap-2 text-[9px] text-gray-500 font-semibold uppercase">
                      <span>Статус: {item.status}</span>
                      <span>•</span>
                      <span>Сообщений: {item.msgNum}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end text-[9px] text-gray-400 font-mono">
                  <span>{item.date}</span>
                  {/* ICQ status replica */}
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${item.icqOnline ? "bg-green-600 animate-pulse" : "bg-red-600"}`} />
                    <span className="text-[8px] uppercase">ICQ {item.icqOnline ? "ONLINE" : "OFFLINE"}</span>
                  </div>
                </div>
              </div>

              {/* Message text */}
              <p className="text-gray-800 leading-relaxed italic bg-white/60 p-3 rounded win-border-in">
                «{item.text}»
              </p>

              {/* Action bar */}
              <div className="flex justify-end gap-3 text-[10px]">
                <button
                  onClick={() => {
                    playClick();
                    alert("Репликация отключена. В данный момент гостевая книга работает в режиме демонстрации.");
                  }}
                  className="hover:underline text-blue-900 font-bold"
                >
                  REPLY
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
