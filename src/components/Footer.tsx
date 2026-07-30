"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ChevronRight,
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer
      id="footer"
      className="relative bg-cover bg-center bg-no-repeat text-white overflow-hidden py-16 border-t border-teal-800/40 w-full bg-linear-to-r from-[#007C7A]  to-[#203935]"

    >

      <Image src="/assets/footer background2.png" alt="footer background" width={900} height={600} className="absolute w-full bottom-0 h-[70%]" />

      {/* Inner Content Area - Clean without background styling */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Subscription Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-12 border-b border-teal-700/60 mb-14">
          <h3 className="text-xl sm:text-2xl font-bold text-white text-center lg:text-left">
            নিয়মিত ফ্রি কোর্সের আপডেট পেতে সাবস্ক্রাইব করুন।
          </h3>

          <form onSubmit={handleSubscribe} className="flex items-center w-full lg:w-auto max-w-md gap-3">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@mail.com"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/95 text-slate-800 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-[#00A89C] hover:bg-[#00897B] text-white font-bold text-sm flex items-center space-x-2 transition-all shadow-md active:scale-95 flex-shrink-0"
            >
              <span>{subscribed ? "Subscribed!" : "Submit"}</span>
              <Send className="w-4 h-4 ml-1" />
            </button>
          </form>
        </div>

        {/* 4-Column Navigation & Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-teal-700/60">
          {/* Col 1: প্রধান মেনু */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-lg font-bold text-white tracking-wide border-b border-teal-600/60 pb-2 inline-block">
              প্রধান মেনু
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link href="#about" className="hover:text-teal-200 flex items-center space-x-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-300" />
                  <span>আমাদের সম্পর্কে</span>
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-teal-200 flex items-center space-x-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-300" />
                  <span>প্যাকেজসমূহ</span>
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-teal-200 flex items-center space-x-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-300" />
                  <span>ডোনেট করুন</span>
                </Link>
              </li>
              <li>
                <Link href="#blogs" className="hover:text-teal-200 flex items-center space-x-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-300" />
                  <span>লেখাসমূহ</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: অন্যান্য পলিসি */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-lg font-bold text-white tracking-wide border-b border-teal-600/60 pb-2 inline-block">
              অন্যান্য পলিসি
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <a href="#refund" className="hover:text-teal-200 flex items-center space-x-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-300" />
                  <span>রিফান্ড পলিসি</span>
                </a>
              </li>
              <li>
                <a href="#cookies" className="hover:text-teal-200 flex items-center space-x-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-300" />
                  <span>কুকিজ পলিসি</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: অন্যান্য লিঙ্ক */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-lg font-bold text-white tracking-wide border-b border-teal-600/60 pb-2 inline-block">
              অন্যান্য লিঙ্ক
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <a href="#terms" className="hover:text-teal-200 flex items-center space-x-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-300" />
                  <span>টার্মস অ্যান্ড কন্ডিসনস</span>
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-teal-200 flex items-center space-x-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-300" />
                  <span>গোপনীয় নীতি</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: যোগাযোগ করুন */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-lg font-bold text-white tracking-wide border-b border-teal-600/60 pb-2 inline-block">
              যোগাযোগ করুন
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-teal-300 flex-shrink-0" />
                <span>sajibahhamed@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-teal-300 flex-shrink-0" />
                <span>01730-986832</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-teal-300 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Skinner Hollow Road <br />
                  Days Creek, OR 97429
                </span>
              </li>
            </ul>

            {/* Social Media Circular Buttons Row */}
            <div className="flex flex-wrap gap-2 pt-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-teal-800/80 hover:bg-teal-600 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-teal-800/80 hover:bg-teal-600 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-teal-800/80 hover:bg-teal-600 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-teal-800/80 hover:bg-teal-600 flex items-center justify-center transition-colors"
                aria-label="X / Twitter"
              >
                <span className="font-bold text-xs">X</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-teal-800/80 hover:bg-teal-600 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-teal-800/80 hover:bg-teal-600 flex items-center justify-center transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>

      </div>
      {/* Bottom Copyright Text */}
      <div className="pt-8 text-center text-xs text-teal-200/80 font-medium absolute bottom-0 flex items-center justify-center w-full">
        <p className="inline">Copyright © JibonQuran 2026. All Right Reserved.</p>
      </div>
    </footer>
  );
}
