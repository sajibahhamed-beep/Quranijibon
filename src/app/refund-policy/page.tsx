import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { RefreshCw, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata = {
  title: "রিফান্ড পলিসি (Refund Policy) | কুরআন জীবন",
  description: "কুরআন জীবনের স্বচ্ছ ও ঝঞ্ঝাটমুক্ত ৭ দিনের রিফান্ড পলিসি ও ফি ফেরতের সার্বিক নিয়মাবলী।",
};

export default function RefundPolicyPage() {
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
              ঝুঁকিমুক্ত শিক্ষাসফর
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              রিফান্ড পলিসি
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-lg">
              কুরআন জীবন প্রতিটি শিক্ষার্থীর সন্তুষ্টি ও দ্বীনি শিক্ষার আস্থাকে সর্বোচ্চ গুরুত্ব প্রদান করে।
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
          {/* Section 1: Overview */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center space-x-3 text-[#00A89C]">
              <RefreshCw className="w-7 h-7" />
              <h2 className="text-2xl font-black text-slate-900">১. ৭ দিনের ১০০% মানি ব্যাক গ্যারান্টি</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium text-base">
              ‘কুরআন জীবন’ অনলাইন প্ল্যাটফর্মে ভর্তি হওয়ার পর যেকোনো মাসিক বা কাস্টম প্যাকেজে প্রথম ৭ (সাত) দিনের মধ্যে যদি কোনো শিক্ষার্থী বা অভিভাবক আমাদের পাঠদান পদ্ধতি, শিক্ষকের আচরণ বা সেবায় সন্তুষ্ট না হন, তবে বিনা প্রশ্নে ১০০% ফি ফেরতের আবেদন করতে পারবেন।
            </p>
          </div>

          {/* Section 2: Eligibility */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center space-x-3 text-[#00A89C]">
              <CheckCircle2 className="w-7 h-7" />
              <h2 className="text-2xl font-black text-slate-900">২. যেসব ক্ষেত্রে রিফান্ড প্রযোজ্য</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-slate-900 text-base block">ক. মান বা ক্লাস অসন্তুষ্টি:</strong>
                প্রথম ২টি ক্লাসের মধ্যে যদি শিক্ষকের তাজবীদ উচ্চারণ বা বোঝানোর পদ্ধতিতে শিক্ষার্থী অসন্তুষ্ট হন এবং বিকল্প শিক্ষক নিতে না চান।
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-slate-900 text-base block">খ. সময়সূচির জটিলতা:</strong>
                অ্যাডমিন কর্তৃক শিক্ষার্থীর সুবিধাজনক সময়ে কোনো উপযুক্ত শিক্ষক বা স্লট প্রদান করা সম্ভব না হলে।
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-slate-900 text-base block">গ. দ্বৈত বা ভুল পেমেন্ট:</strong>
                কারিগরি ত্রুটির কারণে একই কোর্সের ফি ভুলবশত একাধিকবার কেটে নেওয়া হলে বাড়তি অর্থ সাথে সাথেই ফেরতযোগ্য।
              </div>
            </div>
          </div>

          {/* Section 3: Non-Refundable Scenarios */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center space-x-3 text-[#00A89C]">
              <AlertCircle className="w-7 h-7" />
              <h2 className="text-2xl font-black text-slate-900">৩. যেসব ক্ষেত্রে রিফান্ড প্রযোজ্য নয়</h2>
            </div>
            <ul className="space-y-3 text-slate-700 text-sm font-medium">
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
                <span>ভর্তির ৭ দিন অতিবাহিত হওয়ার পর রিফান্ডের অনুরোধ করা হলে।</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
                <span>শিক্ষার্থী বিনা নোটিশে ক্লাসে অনুপস্থিত (No-show) থাকলে বা ব্যক্তিগত ব্যস্ততার অজুহাতে মাঝপথে ক্লাস বন্ধ করলে।</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
                <span>রেজিস্টার্ড ডিজিটাল কোর্স মেটেরিয়াল বা ই-বুক কপি ডাউনলোড সম্পন্ন হয়ে থাকলে।</span>
              </li>
            </ul>
          </div>

          {/* Section 4: Refund Process */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center space-x-3 text-[#00A89C]">
              <Clock className="w-7 h-7" />
              <h2 className="text-2xl font-black text-slate-900">৪. রিফান্ড আবেদন ও প্রক্রিয়াকরণ পদ্ধতি</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              রিফান্ড পেতে আমাদের হেল্পলাইন হোয়াটসঅ্যাপ নম্বরে (<strong>+880 1775-551325</strong>) অথবা ইমেইলে (<strong>sajibahhamed@gmail.com</strong>) আপনার নাম, ফোন নম্বর ও পেমেন্ট ট্রানজেকশন আইডি সহ রিফান্ডের কারণ উল্লেখ করে মেসেজ পাঠান।
            </p>
            <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 text-[#00695C] text-sm font-bold">
              আবেদন পাওয়ার ২৪ থেকে ৪৮ ঘণ্টার মধ্যে তথ্য যাচাইপূর্বক আপনার মোবাইল ব্যাংকিং (বিকাশ/নগদ) বা ব্যাংক অ্যাকাউন্টে রিফান্ড সম্পন্ন করা হবে।
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
