"use client";

import { Check, ShieldAlert } from "lucide-react";
import { siteContent } from "@/data/site-content";
import { siteConfig } from "@/config/site";
import { playClick } from "@/config/sounds";

export default function SoftwarePricing() {
  const { pricingCd } = siteContent;

  return (
    <div className="flex flex-col gap-6 font-sans text-black select-none">
      
      {/* Boxed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {pricingCd.map((plan) => {
          const isFeatured = plan.featured;
          const priceVal = siteConfig.pricing[plan.priceKey as keyof typeof siteConfig.pricing];
          
          // Generate a fake serial number
          const fakeSerial = `SN-${plan.priceKey.toUpperCase()}-1337-${Math.floor(Math.random() * 9000 + 1000)}`;

          return (
            <div
              key={plan.id}
              className={`p-5 rounded-sm win-border-out flex flex-col justify-between min-h-[460px] relative ${
                isFeatured ? "bg-gradient-to-b from-[#b5c7d9] to-[#d4d0c8]" : "bg-[#d4d0c8]"
              }`}
            >
              {/* Featured Badge */}
              {isFeatured && (
                <span className="absolute top-2 right-2 px-2 py-0.5 text-[8px] font-extrabold uppercase rounded bg-blue-800 text-white shadow">
                  РЕКОМЕНДУЕМЫЙ
                </span>
              )}

              <div>
                {/* 3D Box Representation in SVG/CSS */}
                <div className="w-full aspect-[4/3] relative flex items-center justify-center bg-white/40 win-border-in p-4 mb-4 overflow-hidden rounded">
                  {/* CD Disk representation coming out of box */}
                  <div className="absolute right-6 w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-yellow-300 border border-white flex items-center justify-center shadow-lg group-hover:translate-x-2 transition-transform select-none z-10">
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-400 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#d4d0c8]" />
                    </div>
                  </div>
                  
                  {/* Volumetric Software Box */}
                  <div className={`w-24 h-28 bg-[#0a246a] border-l-8 border-l-blue-900 border border-blue-400 flex flex-col justify-between p-2 shadow-xl z-20 ${
                    isFeatured ? "bg-gradient-to-br from-blue-900 to-blue-700" : "bg-gradient-to-br from-gray-800 to-gray-600 border-l-gray-950 border-gray-400"
                  }`}>
                    <span className="text-[6px] text-blue-200 font-mono tracking-widest font-bold">YAROSLAV WEB</span>
                    <div className="my-auto text-center text-white font-extrabold text-[10px] tracking-tight leading-none uppercase">
                      {plan.name.split(" ")[2] || "LITE"}
                    </div>
                    <span className="text-[5px] text-right text-white/50 font-mono">{plan.version}</span>
                  </div>
                </div>

                {/* Box details */}
                <h3 className="text-sm font-extrabold text-blue-900 tracking-tight mb-2">
                  {plan.name} {plan.version}
                </h3>
                
                {/* Price */}
                <div className="mb-4 bg-white/60 p-2 win-border-in flex justify-between items-center">
                  <span className="text-[9px] font-bold text-gray-500 uppercase">ЦЕНА ПРОДУКТА:</span>
                  <span className="text-base font-extrabold text-red-700 font-mono">{priceVal}</span>
                </div>

                {/* Serial key */}
                <div className="mb-4 font-mono text-[9px] text-gray-600 bg-gray-50 p-1.5 win-border-in text-center select-all">
                  KEY: {fakeSerial}
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-[11px] text-gray-800">
                      <Check className="w-3 h-3 text-green-700 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements & Action button */}
              <div className="border-t border-[#808080] pt-4 mt-auto">
                <span className="text-[8px] font-bold text-gray-400 uppercase block mb-3 font-mono">
                  СИСТЕМНЫЕ ТРЕБОВАНИЯ: {plan.requirements}
                </span>

                <a
                  href={siteConfig.contacts.telegram}
                  onClick={() => playClick()}
                  className={`w-full win-btn font-extrabold text-xs py-2 block text-center ${
                    isFeatured ? "bg-blue-800 text-white border-blue-400 hover:bg-blue-900" : "bg-gray-200 text-black border-gray-400"
                  }`}
                  style={isFeatured ? { color: "#ffffff" } : {}}
                >
                  ЗАКАЗАТЬ BOX
                </a>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* 100% Original badge */}
      <div className="flex justify-center mt-4">
        <div className="inline-flex items-center gap-2 border border-dashed border-[#808080] bg-[#e5e5e0] p-2.5 text-[10px] font-bold uppercase tracking-wider text-gray-700">
          <span>🛡</span>
          <span>100% Original Software - Certified Webmaster Product</span>
        </div>
      </div>

    </div>
  );
}
