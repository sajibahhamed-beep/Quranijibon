"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import TeacherApplyModal from "@/components/TeacherApplyModal";
import {
  Sparkles,
  BookOpen,
  Heart,
  UserCheck,
  Award,
  Clock,
  Laptop,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Users,
  CalendarCheck,
  Send,
  MessageCircle,
  Globe2,
} from "lucide-react";

export default function JoinTeacherClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "আমি কি পার্ট-টাইম বা অন্য চাকরির পাশাপাশি শিক্ষকতা করতে পারব?",
      a: "হ্যাঁ, আলহামদুলিল্লাহ! কুরআন জীবন প্ল্যাটফর্মে আপনি আপনার সুবিধাজনক সময় ও দিন (সকাল, দুপুর, বিকেল কিংবা রাত) নির্বাচন করে ক্লাস নিতে পারবেন। আপনার ফাঁকা সময় অনুযায়ী শিক্ষার্থীদের শিডিউল সাজিয়ে দেওয়া হবে।",
    },
    {
      q: "মহিলা শিক্ষিকাদের জন্য পর্দার নিরাপত্তা ও ক্লাসের পরিবেশ কেমন?",
      a: "আমাদের প্ল্যাটফর্মে কঠোরভাবে শরীয়াহর পর্দা ও অনুশাসন রক্ষা করা হয়। মহিলা শিক্ষার্থীদের জন্য শুধুমাত্র অভিজ্ঞ ও দ্বীনদার মহিলা শিক্ষিকা নির্ধারণ করা হয়। ঘরে বসেই সর্বোচ্চ শালীনতা ও নিরাপত্তার সাথে শিক্ষিকাগণ পাঠদান করতে পারেন।",
    },
    {
      q: "স্বল্প সম্মানী বা পারিশ্রমিক কীভাবে নির্ধারিত ও প্রদান করা হয়?",
      a: "আপনি স্বেচ্ছাসেবী হিসেবে ফি সাবিলিল্লাহ দ্বীনি খেদমত করতে পারেন অথবা সম্মানীভিত্তিক (Honorarium) শিক্ষক হিসেবে যুক্ত হতে পারেন। প্রতি মাসের ক্লাস হিসাব অনুযায়ী শিক্ষক-শিক্ষিকাদের ব্যাংক অ্যাকাউন্ট বা মোবাইল ব্যাংকিং (বিকাশ/নগদ)-এর মাধ্যমে সময়মতো সম্মানী পরিশোধ করা হয়।",
    },
    {
      q: "অনলাইনে ক্লাস নেওয়ার জন্য আমার কী কী ডিভাইসের প্রয়োজন হবে?",
      a: "ক্লাস নেওয়ার জন্য একটি সচল স্মার্টফোন অথবা কম্পিউটার/ল্যাপটপ এবং একটি ভালো ইন্টারনেট সংযোগ ও হেডফোন প্রয়োজন। জুম (Zoom) বা গুগল মিট ব্যবহারের সাধারণ নিয়মাবলী আমাদের ওরিয়েন্টেশনে সম্পূর্ণ বিনামূল্যে শিখিয়ে দেওয়া হবে।",
    },
    {
      q: "আবেদন করার পর কীভাবে নির্বাচিত হব এবং কতদিন সময় লাগবে?",
      a: "আপনার অনলাইন আবেদনপত্র জমার পর আমাদের একাডেমি টিম ৩-৫ কার্যদিবসের মধ্যে আপনার সাথে যোগাযোগ করবে। এরপর একটি সংক্ষিপ্ত অনলাইন অডিও/ভিডিও ইন্টারভিউ ও তিলাওয়াত নিরীক্ষণের পর ওরিয়েন্টেশন সম্পন্ন করে শিক্ষার্থী প্রদান করা হবে।",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAFBFC] text-[#0F172A] relative selection:bg-[#00A89C]/20 selection:text-[#007C7A]">
      <FloatingContact />
      <Navbar />

      {/* Hero Header Banner with Mosque Silhouette */}
      <section className="relative bg-gradient-to-r from-[#203935] via-[#155653] to-[#007C7A] text-white py-14 sm:py-20 overflow-hidden">
        {/* Background Decorative Glow */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md text-emerald-200 font-bold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
              <span>দ্বীনি শিক্ষার খেদমতে শিক্ষক নিয়োগ</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              কুরআন শিক্ষক ও মেন্টর হিসেবে <span className="text-emerald-300">যুক্ত হন</span>
            </h1>

            <p className="text-emerald-50 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              আপনার দ্বীনি ইলম ও বিশুদ্ধ তাজবীদের আলো ছড়িয়ে দিন বিশ্বজুড়ে। ঘরে বসেই আপনার সুবিধাজনক সময়ে দেশ-বিদেশের মুসলিম ভাই ও বোনদের সহীহ কুরআন শিক্ষা দিয়ে সদকায়ে জারিয়া ও সম্মানের ভাগীদার হোন।
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 rounded-2xl bg-white text-[#007C7A] hover:bg-emerald-50 font-black text-sm sm:text-base transition-all shadow-xl hover:shadow-2xl flex items-center space-x-2 active:scale-95 cursor-pointer"
                id="hero-apply-btn"
              >
                <span>শিক্ষক হিসেবে আবেদন করুন</span>
                <ArrowRight className="w-5 h-5 text-[#007C7A]" />
              </button>

              <a
                href="#recruitment-process"
                className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base transition-all border border-white/20 backdrop-blur-xs flex items-center space-x-2"
              >
                <span>আবেদন প্রক্রিয়া জানুন</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-teal-600/40 text-xs sm:text-sm font-medium text-emerald-100">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span>১-টু-১ অনলাইন ক্লাস</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span>ফ্লেক্সিবল সময়সূচী</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span>নারী ও পুরুষ পৃথক শাখা</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span>বিশ্বব্যাপী শিক্ষার্থী</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Mosque Vector Image */}
        <div className="absolute right-0 bottom-0 pointer-events-none h-48 sm:h-64 lg:h-80 hidden lg:block">
          <Image
            src="/assets/mosque-silhouette.png"
            alt=""
            aria-hidden="true"
            width={380}
            height={240}
            priority
            className="h-full w-auto object-contain object-bottom-right opacity-80"
          />
        </div>
      </section>

      {/* Intro & Purpose Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <Image
                  src="/assets/jakarta-indonesia-april-18-2018-young-muslim-man-reading-quran-ramadan-time-home.jpg"
                  alt="কুরআন শিক্ষক অনলাইন ক্লাস ও পাঠদান"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              {/* Floating Quote Badge */}
              <div className="absolute -bottom-6 -right-2 sm:right-6 bg-gradient-to-r from-[#007C7A] to-[#00A89C] text-white p-4 sm:p-5 rounded-2xl shadow-xl border border-white/20 max-w-xs">
                <p className="text-xs sm:text-sm font-semibold italic leading-snug">
                  &ldquo;তোমাদের মধ্যে সর্বোত্তম ব্যক্তি সেই, যে নিজে কুরআন শিখে এবং অন্যকে শেখায়।&rdquo;
                </p>
                <span className="block text-[11px] text-emerald-200 mt-1 font-bold">— সহীহ বুখারী ৫০২৭</span>
              </div>
            </div>

            {/* Right Text Description */}
            <div className="lg:col-span-7 space-y-6 lg:pl-6">
              <div className="space-y-2">
                <span className="text-[#00A89C] font-bold text-xs sm:text-sm uppercase tracking-wider bg-[#00A89C]/10 px-3 py-1 rounded-full inline-block">
                  সুযোগ ও সম্মান
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                  কুরআনের বাণী পৌঁছে দিন, উম্মাহর সেবায় নিজেকে নিয়োজিত করুন
                </h2>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                বর্তমান ডিজিটাল যুগে ভৌগোলিক দূরত্ব আর কোনো বাধা নয়। বাংলাদেশসহ আমেরিকা, যুক্তরাজ্য, কানাডা ও মধ্যপ্রাচ্যের প্রবাসী মুসলিম পরিবারের শিশুরা ও বয়স্করা সহীহ কুরআন শিক্ষার অপেক্ষায় রয়েছে। কুরআন জীবন একাডেমি এমন দক্ষ, সহৃদয় এবং আমলদার শিক্ষকদের খুঁজছে যারা পরম আন্তরিকতায় তাজবীদ ও নাজেরা পাঠদান করতে চান।
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-[#FAFBFC] border border-slate-200/80 p-4 rounded-2xl space-y-1.5">
                  <div className="flex items-center space-x-2 text-[#007C7A] font-bold text-sm">
                    <Heart className="w-4 h-4 text-emerald-600" />
                    <span>সদকায়ে জারিয়া</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    আপনার কাছ থেকে শেখা প্রতিটি অক্ষরের তিলাওয়াতে আপনার আমলনামায় যুক্ত হবে অবিরাম পুণ্য।
                  </p>
                </div>

                <div className="bg-[#FAFBFC] border border-slate-200/80 p-4 rounded-2xl space-y-1.5">
                  <div className="flex items-center space-x-2 text-[#007C7A] font-bold text-sm">
                    <Laptop className="w-4 h-4 text-emerald-600" />
                    <span>ঘরে বসে স্বাচ্ছন্দ্যে ক্লাস</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    কোথাও যাতায়াতের ঝামেলা ছাড়াই নিজের বাসা থেকে আরামদায়ক পরিবেশে পাঠদান করুন।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Teach With Us - 6 Cards Grid */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[#00A89C] font-bold text-xs uppercase tracking-wider bg-[#00A89C]/10 px-3.5 py-1 rounded-full inline-block">
              সুবিধাসমূহ
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              কেন কুরআন জীবনে শিক্ষকতা করবেন?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              শিক্ষকদের সম্মান, নিরাপত্তা এবং আধুনিক পাঠদান পরিবেশ নিশ্চিত করাই আমাদের মূল অঙ্গীকার।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white border border-slate-200/80 p-7 rounded-3xl space-y-3.5 shadow-sm hover:shadow-md hover:border-[#00A89C]/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#00A89C]/10 text-[#007C7A] flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-[#00A89C]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">ব্যক্তিভিত্তিক ১-টু-১ ক্লাস</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                কোনো বিশৃঙ্খলা ছাড়া একজন শিক্ষার্থীর প্রতি পূর্ণ মনোযোগ দিয়ে তাজবীদ ও বিশুদ্ধ মাখরাজ শেখানোর সুযোগ।
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-slate-200/80 p-7 rounded-3xl space-y-3.5 shadow-sm hover:shadow-md hover:border-[#00A89C]/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">ফ্লেক্সিবল সময় ও শিডিউল</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                আপনার ব্যস্ততা অনুযায়ী ক্লাস সময় বেছে নেওয়ার পূর্ণ স্বাধীনতা। পার্ট-টাইম বা ফুল-টাইম দুই সুবিধাই বিদ্যমান।
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-slate-200/80 p-7 rounded-3xl space-y-3.5 shadow-sm hover:shadow-md hover:border-[#00A89C]/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                <UserCheck className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">নারী ও পুরুষ পৃথক ব্যবস্থা</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                বোনদের জন্য মহিলা শিক্ষিকা এবং ভাইদের জন্য পুরুষ শিক্ষক নিশ্চিত করে শরয়ী পর্দা ও মর্যাদা বজায় রাখা হয়।
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-slate-200/80 p-7 rounded-3xl space-y-3.5 shadow-sm hover:shadow-md hover:border-[#00A89C]/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">সম্মানী অথবা স্বেচ্ছাসেবী</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                স্বেচ্ছাসেবী (Voluntary) হিসেবে খেদমত করতে পারেন অথবা নিয়মিত ক্লাস অনুযায়ী নির্ধারিত সম্মানী গ্রহণ করতে পারেন।
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white border border-slate-200/80 p-7 rounded-3xl space-y-3.5 shadow-sm hover:shadow-md hover:border-[#00A89C]/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                <Globe2 className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">আন্তর্জাতিক অভিজ্ঞতা</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                দেশ ও বিদেশের বিভিন্ন দেশের শিক্ষার্থীদের পড়ানোর মাধ্যমে আপনার শিক্ষকতার দক্ষতা ও অভিজ্ঞতা আন্তর্জাতিক মান পাবে।
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white border border-slate-200/80 p-7 rounded-3xl space-y-3.5 shadow-sm hover:shadow-md hover:border-[#00A89C]/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">টেকনিক্যাল সাপোর্ট ও গাইডলাইন</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                ক্লাসের সফটওয়্যার ব্যবহার, সিলেবাস ও কারিকুলাম পরিচালনায় আমাদের সেন্ট্রাল টিম সার্বক্ষণিক সহায়তা প্রদান করে।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications & Who Can Apply */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[#00A89C] font-bold text-xs uppercase tracking-wider bg-[#00A89C]/10 px-3.5 py-1 rounded-full inline-block">
              যোগ্যতা ও শর্তাবলী
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              কারা আবেদন করতে পারবেন?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              নিচের যোগ্যতা সম্পন্ন যে কোনো পুরুষ ও মহিলা শিক্ষক আমাদের প্ল্যাটফর্মে আবেদন করতে পারেন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Qualification Box */}
            <div className="bg-[#FAFBFC] border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#00A89C]/10 text-[#007C7A] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-[#00A89C]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">শিক্ষাগত ও দ্বীনি যোগ্যতা</h3>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#00A89C] flex-shrink-0 mt-0.5" />
                  <span>হাফেজে কুরআন / কওমি মাদরাসার ফারেগ / আলিয়া মাদরাসার কামিল বা সমমান।</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#00A89C] flex-shrink-0 mt-0.5" />
                  <span>সহীহ তাজবীদ, মাখরাজ ও সিফাত সম্পর্কে স্পষ্ট তাত্ত্বিক ও ব্যবহারিক জ্ঞান।</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#00A89C] flex-shrink-0 mt-0.5" />
                  <span>কুরআন শিক্ষার ক্ষেত্রে পূর্ব অভিজ্ঞতা সম্পন্ন শিক্ষকদের অগ্রাধিকার দেওয়া হবে।</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#00A89C] flex-shrink-0 mt-0.5" />
                  <span>বাংলা ছাড়াও সাধারণ ইংরেজি বা উর্দু যোগাযোগের মৌলিক ধারণা (প্রবাসী শিক্ষার্থীদের জন্য)।</span>
                </li>
              </ul>
            </div>

            {/* Essential Qualities Box */}
            <div className="bg-[#FAFBFC] border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">ব্যক্তিগত ও ব্যবহারিক গুণাবলী</h3>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>শিক্ষার্থীদের (বিশেষ করে শিশু ও বয়স্কদের) প্রতি অত্যন্ত ধৈর্যশীল ও স্নেহময় আচরণ।</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>ক্লাসের সময়ানুবর্তিতা এবং পেশাদার দায়িত্বশীল মনোভাব বজায় রাখা।</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>স্মার্টফোন বা ল্যাপটপে অনলাইন মিটিং অ্যাপ (Zoom/Meet) পরিচালনা করার সামর্থ্য।</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>ক্লাসের জন্য নিরিবিলি ও শান্ত পরিবেশ নিশ্চিত করার সক্ষমতা।</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Recruitment Process */}
      <section id="recruitment-process" className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00A89C]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[#00A89C] font-bold text-xs uppercase tracking-wider bg-[#00A89C]/20 border border-[#00A89C]/30 px-3.5 py-1 rounded-full inline-block">
              সহজ ধাপসমূহ
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              শিক্ষক নিয়োগ ও নির্বাচন প্রক্রিয়া
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              ৪টি সহজ ধাপ অতিক্রম করে আপনিও হয়ে উঠতে পারেন কুরআন জীবনের সম্মানিত শিক্ষক।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-3xl space-y-4 relative hover:border-[#00A89C]/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#00A89C] text-white font-black text-lg flex items-center justify-center shadow-lg shadow-[#00A89C]/30">
                ১
              </div>
              <h3 className="text-base font-bold text-white">আবেদনপত্র পূরণ</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                অনলাইন ফর্মে আপনার শিক্ষাগত যোগ্যতা, তাজবীদ ব্যাকগ্রাউন্ড ও অভিজ্ঞতার তথ্য দিয়ে আবেদন জমা দিন।
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-3xl space-y-4 relative hover:border-[#00A89C]/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white font-black text-lg flex items-center justify-center shadow-lg shadow-emerald-500/30">
                ২
              </div>
              <h3 className="text-base font-bold text-white">ইন্টারভিউ ও তিলাওয়াত</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                আমাদের সিনিয়র কারী মণ্ডলীর মাধ্যমে সংক্ষিপ্ত অনলাইন অডিও/ভিডিও কলে তিলাওয়াত ও তাজবীদ নিরীক্ষণ।
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-3xl space-y-4 relative hover:border-[#00A89C]/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-teal-500 text-white font-black text-lg flex items-center justify-center shadow-lg shadow-teal-500/30">
                ৩
              </div>
              <h3 className="text-base font-bold text-white">ওরিয়েন্টেশন ও গাইডলাইন</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                অনলাইন ক্লাস নেওয়ার পদ্ধতি, সিলেবাস ও প্রযুক্তিগত ব্যবহারের বিষয়ে বিস্তারিত ওরিয়েন্টেশন প্রদান।
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-3xl space-y-4 relative hover:border-[#00A89C]/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-sky-500 text-white font-black text-lg flex items-center justify-center shadow-lg shadow-sky-500/30">
                ৪
              </div>
              <h3 className="text-base font-bold text-white">শিক্ষার্থী অ্যাসাইন ও ক্লাস</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                আপনার নির্ধারিত সময়ে শিক্ষার্থী যুক্ত করে দেওয়া হবে এবং নিয়মিত ক্লাসের মাধ্যমে পাঠদান শুরু হবে।
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 rounded-2xl bg-[#00A89C] hover:bg-[#00897B] text-white font-black text-sm sm:text-base transition-all shadow-xl hover:shadow-2xl shadow-[#00A89C]/20 inline-flex items-center space-x-2 active:scale-95 cursor-pointer"
            >
              <span>এখনই আবেদন ফরমটি পূরণ করুন</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[#00A89C] font-bold text-xs uppercase tracking-wider bg-[#00A89C]/10 px-3.5 py-1 rounded-full inline-block">
              সাধারণ জিজ্ঞাসা
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              শিক্ষক নিয়োগ সম্পর্কিত প্রশ্নোত্তর (FAQ)
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              শিক্ষক হিসেবে যুক্ত হওয়ার বিষয়ে বহুল জিজ্ঞাসিত প্রশ্নগুলোর উত্তর নিচে দেওয়া হলো।
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-[#00A89C] bg-[#FAFBFC] shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base cursor-pointer"
                  >
                    <span className="flex items-center space-x-3">
                      <HelpCircle className="w-5 h-5 text-[#00A89C] flex-shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? "rotate-180 text-[#00A89C]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                      <p className="pl-8">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-[#203935] via-[#155653] to-[#007C7A] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/10 border border-white/20 rounded-3xl p-8 sm:p-12 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-3 text-center md:text-left max-w-xl">
              <span className="text-emerald-300 text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full inline-block">
                আজই শুরু করুন
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                কুরআনের খেদমতে আপনিও এগিয়ে আসুন
              </h2>
              <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
                আপনার শিক্ষকতা ও দিকনির্দেশনায় সহীহ কুরআন শিখবে আগামী প্রজন্ম। দেরি না করে আজই আবেদন ফরমটি পূরণ করে আমাদের শিক্ষক পরিবারের অংশ হোন।
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 rounded-2xl bg-white hover:bg-emerald-50 text-[#007C7A] font-black text-sm sm:text-base transition-all shadow-xl hover:shadow-2xl flex items-center space-x-2 active:scale-95 cursor-pointer flex-shrink-0"
              id="bottom-apply-btn"
            >
              <span>শিক্ষক হিসেবে আবেদন করুন</span>
              <ArrowRight className="w-5 h-5 text-[#007C7A]" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Teacher Apply Modal */}
      <TeacherApplyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
