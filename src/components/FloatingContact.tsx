"use client";

import Image from "next/image";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://wa.me/8801775551325"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-3 px-6 py-4 rounded-full bg-[#00A89C] hover:bg-[#00897B] text-white font-extrabold text-base shadow-2xl shadow-[#00A89C]/40 hover:scale-105 active:scale-95 transition-all group border border-white/20"
        aria-label="Chat on WhatsApp"
      >
        <div className="relative flex items-center justify-center">
          <Image
            src="/assets/Whatsapp logo.png"
            alt="WhatsApp Logo"
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
          />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-300 rounded-full animate-ping" />
        </div>
        <span className="tracking-wide">সরাসরি কথা বলুন....</span>
      </a>
    </div>
  );
}
