"use client";

import Image from "next/image";
import { PhoneCall, X } from "lucide-react";
import { useState } from "react";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      {/* Contact Options Box */}
      {open && (
        <div className="bg-white border border-[#00A89C]/30 p-4 rounded-2xl shadow-2xl space-y-3 w-64 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-sm font-bold text-slate-900">সরাসরি কথা বলুন</span>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <a
            href="https://wa.me/8801700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-bold transition-colors"
          >
            <Image
              src="/assets/Whatsapp logo.png"
              alt="WhatsApp Logo"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
            <span>হোয়াটসঅ্যাপ মেসেজ করুন</span>
          </a>
          <a
            href="tel:+8801700000000"
            className="flex items-center space-x-3 p-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 text-sm font-bold transition-colors"
          >
            <PhoneCall className="w-5 h-5 text-teal-600" />
            <span>কল করুন</span>
          </a>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-3 px-5 py-3 rounded-full bg-[#00A89C] hover:bg-[#00897B] text-white font-bold text-sm shadow-xl shadow-[#00A89C]/30 hover:scale-105 active:scale-95 transition-all group"
        aria-label="Contact Floating Button"
      >
        <div className="relative flex items-center justify-center">
          <Image
            src="/assets/Whatsapp logo.png"
            alt="WhatsApp Logo"
            width={22}
            height={22}
            className="w-5 h-5 object-contain"
          />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
        </div>
        <span>সরাসরি কথা বলুন....</span>
      </button>
    </div>
  );
}
