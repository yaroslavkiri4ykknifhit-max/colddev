"use client";

interface BannerProps {
  leftText: string;
  rightText: string;
  leftBg?: string;
  rightBg?: string;
  leftColor?: string;
  rightColor?: string;
}

export function RetroBannerSingle({
  leftText,
  rightText,
  leftBg = "#000080",
  rightBg = "#000000",
  leftColor = "#ffffff",
  rightColor = "#ffffff"
}: BannerProps) {
  return (
    <div
      className="inline-flex h-[31px] w-[88px] text-[8px] font-extrabold uppercase font-mono border border-black overflow-hidden select-none select-none hover:scale-105 transition-transform"
      style={{
        boxShadow: "1px 1px 0px rgba(255,255,255,0.3)"
      }}
    >
      {/* Left segment */}
      <div
        className="w-1/2 flex items-center justify-center text-center p-0.5 leading-none"
        style={{ backgroundColor: leftBg, color: leftColor }}
      >
        {leftText}
      </div>
      {/* Right segment */}
      <div
        className="w-1/2 flex items-center justify-center text-center p-0.5 leading-none"
        style={{ backgroundColor: rightBg, color: rightColor }}
      >
        {rightText}
      </div>
    </div>
  );
}

export default function RetroBanner() {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-center select-none">
      <RetroBannerSingle leftText="Made with" rightText="NextJS" leftBg="#800080" rightBg="#0a0a0c" />
      <RetroBannerSingle leftText="56k" rightText="DialUp" leftBg="#006000" rightBg="#dfdfdf" rightColor="#000000" />
      <RetroBannerSingle leftText="No AI" rightText="Code" leftBg="#800000" rightBg="#ffffcc" rightColor="#800000" />
      <RetroBannerSingle leftText="HTML" rightText="Static" leftBg="#0a246a" rightBg="#3a3a3c" />
      <RetroBannerSingle leftText="Caffeine" rightText="Powered" leftBg="#5e3a24" rightBg="#000000" />
      <RetroBannerSingle leftText="Best" rightText="Viewed" leftBg="#000080" rightBg="#00ffff" rightColor="#000000" />
    </div>
  );
}
