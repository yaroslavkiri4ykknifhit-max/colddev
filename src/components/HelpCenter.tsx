"use client";

import { useState } from "react";
import { Folder, FileText, Printer, ArrowLeft, ArrowRight, Home, Search } from "lucide-react";
import { siteContent, FAQItem } from "@/data/site-content";
import { playClick } from "@/config/sounds";

export default function HelpCenter() {
  const { faq } = siteContent;
  const [selectedFaq, setSelectedFaq] = useState<FAQItem>(faq[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFaq, setFilteredFaq] = useState<FAQItem[]>(faq);

  const categories = [
    { key: "getting-started", name: "Getting Started" },
    { key: "development", name: "Website Development" },
    { key: "telegram", name: "Telegram Systems" },
    { key: "ads", name: "Google & Advertising" },
    { key: "support", name: "Technical Support" }
  ];

  const handleSelect = (item: FAQItem) => {
    playClick();
    setSelectedFaq(item);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    if (!searchQuery) {
      setFilteredFaq(faq);
      return;
    }
    const filtered = faq.filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFaq(filtered);
  };

  return (
    <div className="bg-[#d4d0c8] p-[3px] rounded-sm win-border-out font-sans text-black flex flex-col justify-between min-h-[380px] max-w-2xl mx-auto select-none">
      
      {/* Help Center Menu Bar (Print, Home, Back, Search) */}
      <div className="bg-[#d4d0c8] border-b border-[#808080] p-1.5 flex flex-wrap gap-2 items-center justify-between shadow-[inset_0_1px_0_#fff]">
        <div className="flex gap-1">
          <button
            onClick={() => {
              playClick();
              setSelectedFaq(faq[0]);
            }}
            className="win-btn text-[10px] font-bold flex items-center gap-1 py-1"
          >
            <Home className="w-3 h-3 text-blue-900" />
            <span>HOME</span>
          </button>
          
          <button
            onClick={() => {
              playClick();
              window.print();
            }}
            className="win-btn text-[10px] font-bold flex items-center gap-1 py-1"
          >
            <Printer className="w-3 h-3 text-gray-700" />
            <span>PRINT</span>
          </button>
        </div>

        {/* Search input */}
        <form onSubmit={handleSearch} className="flex gap-1 items-center">
          <input
            type="text"
            placeholder="Search help topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-1 win-border-in bg-white focus:outline-none text-[10px] w-32 sm:w-48 text-black"
          />
          <button type="submit" className="win-btn text-[10px] font-bold py-1 px-2.5">
            <Search className="w-3 h-3 text-gray-800" />
          </button>
        </form>
      </div>

      {/* Main split explorer */}
      <div className="flex-1 grid grid-cols-12 gap-1.5 p-1.5 bg-gray-50 items-stretch">
        
        {/* Left Pane: Category directories */}
        <div className="col-span-12 md:col-span-5 bg-white border border-[#808080] p-2 overflow-y-auto max-h-[220px] md:max-h-[320px]">
          <span className="text-[9px] font-extrabold text-blue-900 uppercase block mb-3 border-b border-gray-100 pb-1">
            РАЗДЕЛЫ СПРАВКИ
          </span>
          
          <div className="space-y-4">
            {categories.map((cat) => {
              const catFaqs = filteredFaq.filter((f) => f.category === cat.key);
              if (catFaqs.length === 0) return null;

              return (
                <div key={cat.key} className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 select-none">
                    <Folder className="w-3.5 h-3.5 text-yellow-600 shrink-0" />
                    <span>{cat.name}</span>
                  </div>
                  
                  {/* Category questions files */}
                  <div className="pl-4 space-y-1">
                    {catFaqs.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        className={`w-full text-left text-[10px] py-1 px-1.5 rounded flex items-start gap-1 ${
                          selectedFaq.id === item.id
                            ? "bg-blue-800 text-white font-bold"
                            : "text-gray-600 hover:bg-gray-100 hover:text-black"
                        }`}
                      >
                        <FileText className="w-3 h-3 mt-0.5 shrink-0" />
                        <span className="truncate">{item.question}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Help content viewer */}
        <div className="col-span-12 md:col-span-7 bg-white border border-[#808080] p-4 overflow-y-auto max-h-[220px] md:max-h-[320px] flex flex-col gap-4">
          {selectedFaq ? (
            <div className="flex flex-col gap-3">
              <h3 className="font-extrabold text-xs text-blue-900 border-b border-gray-100 pb-2 leading-snug">
                {selectedFaq.question}
              </h3>
              <p className="text-[11px] text-gray-700 leading-relaxed bg-[#f9f9f5] border border-gray-100 p-3 rounded">
                {selectedFaq.answer}
              </p>
            </div>
          ) : (
            <div className="my-auto text-center text-gray-400 font-bold text-[10px] uppercase">
              Выберите тему справки слева
            </div>
          )}
        </div>

      </div>

      {/* Status Bar */}
      <div className="bg-[#ece9d8] border-t border-[#808080] px-3 py-1 flex justify-between text-[9px] text-gray-500 font-mono">
        <span>Yaroslav Help Center v1.2</span>
        <span>SSL Secured Connection</span>
      </div>

    </div>
  );
}
