"use client";

import Link from "next/link";
import { BookOpen, Phone, Mail, MapPin, Facebook, Youtube, Send, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 border-t border-slate-800 text-slate-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white tracking-wide">
                  কুরআন জীবন
                </span>
                <span className="text-[11px] text-emerald-400 font-bold tracking-wider">
                  QURAN IJIBON
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-slate-400 font-medium">
              কুরআন জীবন একটি নির্ভরযোগ্য ও আন্তর্জাতিক অনলাইন কুরআন শিক্ষা প্রতিষ্ঠান। আমাদের মূল লক্ষ্য বিশ্বজুড়ে ঘরে ঘরে সহীহ কুরআন শিক্ষা ও দ্বীনি আলোক ছড়িয়ে দেওয়া।
            </p>

            <div className="flex space-x-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-rose-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-teal-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white text-base font-bold tracking-wider uppercase border-b border-emerald-500/40 pb-2 inline-block">
              কুইক লিংক
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link href="#home" className="hover:text-emerald-400 transition-colors">
                  হোম পেজ
                </Link>
              </li>
              <li>
                <Link href="#why-us" className="hover:text-emerald-400 transition-colors">
                  আমাদের সার্ভিস
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-emerald-400 transition-colors">
                  বিশেষ ফিচারসমূহ
                </Link>
              </li>
              <li>
                <Link href="#blogs" className="hover:text-emerald-400 transition-colors">
                  সাম্প্রতিক ব্লগ
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-emerald-400 transition-colors">
                  সাধারণ প্রশ্নাবলী
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-base font-bold tracking-wider uppercase border-b border-emerald-500/40 pb-2 inline-block">
              আমাদের কোর্সসমূহ
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <a href="#contact" className="hover:text-emerald-400 transition-colors">
                  নূরানী কায়দা শিক্ষা (প্রাথমিক)
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-emerald-400 transition-colors">
                  নাজেরা ও তাজবীদ শিক্ষা
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-emerald-400 transition-colors">
                  আমপারা ও হিফজুল কুরআন
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-emerald-400 transition-colors">
                  জরুরি মাসআলা ও দুআ শিক্ষা
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-emerald-400 transition-colors">
                  মহিলাদের জন্য খাস কোর্স
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-base font-bold tracking-wider uppercase border-b border-emerald-500/40 pb-2 inline-block">
              যোগাযোগ
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>ঢাকা, বাংলাদেশ (অনলাইন বৈশ্বিক সেবা)</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>+৮৮০ ১৭০০-০০০০০০</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>info@quranijibon.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} কুরআন জীবন (Quranijibon)। সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center space-x-1">
            <span>Designed & Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>for Quranijibon</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
