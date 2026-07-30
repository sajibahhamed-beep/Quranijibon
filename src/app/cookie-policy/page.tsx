import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { Cookie, Settings } from "lucide-react";

export const metadata = {
  title: "কুকিজ পলিসি (Cookie Policy) | কুরআন জীবন",
  description: "কুরআন জীবন ওয়েবসাইটে ব্যবহৃত কুকিজ, অ্যানালিটিক্স ও ব্রাউজার সেটিংস সম্পর্কিত নীতি।",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[#FAFBFC] text-[#0F172A] relative">
      <FloatingContact />
      <Navbar />

      {/* Hero Header Banner with Mosque Silhouette Aligned Right */}
      <section className="relative bg-gradient-to-r from-[#203935] via-[#155653] to-[#007C7A] text-white py-12 sm:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-[120px] sm:min-h-[150px] flex items-center">
          {/* Left Text Content */}
          <div className="space-y-2 max-w-xl">
            <span className="bg-white/10 text-emerald-200 font-bold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full border border-white/20 inline-block">
              ব্রাউজিং অভিজ্ঞতা ও স্পিড
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              কুকিজ পলিসি
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-lg">
              আমাদের ওয়েবসাইটে কুকিজ প্রযুক্তি কীভাবে ব্যবহার হয় তার স্বচ্ছ বিবরণ।
            </p>
          </div>
        </div>

        {/* Right Mosque Vector Image Aligned to Bottom Right */}
        <div className="absolute right-0 bottom-0 pointer-events-none h-44 sm:h-56 lg:h-64 hidden md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/Section → sec-botm-mckp-768x115.webp.png"
            alt="Mosque Silhouette Vector"
            className="h-full w-auto object-contain object-bottom-right opacity-90"
          />
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section 1: What are cookies */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center space-x-3 text-[#00A89C]">
              <Cookie className="w-7 h-7" />
              <h2 className="text-2xl font-black text-slate-900">১. কুকিজ (Cookies) কী?</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              কুকিজ হলো ছোট আয়তনের ডাটা ফাইল যা আপনি যখন কোনো ওয়েবসাইট ব্রাউজ করেন তখন আপনার কম্পিউটার বা মোবাইলের ব্রাউজারে স্বয়ংক্রিয়ভাবে সংরক্ষিত হয়। এটি পরবর্তী ভিজিটে ওয়েবসাইট দ্রুত লোড করতে এবং আপনার ব্যক্তিগত পছন্দ (যেমন: ভাষা সেটিংস) মনে রাখতে সাহায্য করে।
            </p>
          </div>

          {/* Section 2: Types of Cookies Used */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center space-x-3 text-[#00A89C]">
              <Settings className="w-7 h-7" />
              <h2 className="text-2xl font-black text-slate-900">২. আমরা যেসকল কুকিজ ব্যবহার করি</h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm font-medium">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-slate-900 text-base block">ক. প্রয়োজনীয় কুকিজ (Strictly Necessary Cookies):</strong>
                ওয়েবসাইটের নেভিগেশন, সিকিউরিটিতে প্রবেশাধিকার এবং মূল ফর্ম জমাদানের জন্য এগুলো আবশ্যিক।
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-slate-900 text-base block">খ. পারফরম্যান্স ও অ্যানালিটিক্স কুকিজ (Analytics Cookies):</strong>
                ভিজিটররা কীভাবে পেজগুলো ব্রাউজ করেন এবং কোন ফিচারগুলো বেশি উপযোগী তা বুঝতে এই কুকিজ আমাদের সাহায্য করে।
              </div>
            </div>
          </div>

          {/* Section 3: Management */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xl font-bold text-slate-900">৩. কুকিজ কীভাবে নিষ্ক্রিয় করবেন?</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              আপনি চাইলে যেকোনো সময় আপনার ব্রাউজারের Settings &gt; Privacy and Security অপশনে গিয়ে কুকিজ ক্লিয়ার বা ব্লক করতে পারেন। তবে কুকিজ সম্পূর্ণ বন্ধ করলে ওয়েবসাইটের কিছু কিছু ফিচার ব্যবহারে কিছুটা ধীরগতি হতে পারে।
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
