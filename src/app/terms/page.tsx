import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { FileText, Clock, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "টার্মস অ্যান্ড কন্ডিসনস (Terms & Conditions) | কুরআন জীবন",
  description: "কুরআন জীবনের সেবা ব্যবহারের শর্তাবলী, ক্লাস নিয়ম কানুন ও শিক্ষার্থীর আচরণবিধি।",
};

export default function TermsPage() {
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
              ব্যবহারকারী নীতিমালা ও নিয়মাবলী
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              টার্মস অ্যান্ড কন্ডিসনস
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-lg">
              কুরআন জীবন অনলাইনে দ্বীনি শিক্ষা গ্রহণের একটি নির্ভরযোগ্য প্ল্যাটফর্ম। সার্ভিস গ্রহণের পূর্বে নিয়মগুলো ভালোভাবে পড়ে নিন।
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
          {/* Section 1: Acceptance */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center space-x-3 text-[#00A89C]">
              <FileText className="w-7 h-7" />
              <h2 className="text-2xl font-black text-slate-900">১. সম্মতি ও গ্রহণযোগ্যতা</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              কুরআন জীবন ওয়েবসাইটে যেকোনো ক্লাসে রেজিস্ট্রেশন বা ভর্তি ফর্ম পূরণের মাধ্যমে আপনি আমাদের সকল নিয়মাবলি, নীতি ও শর্তাদি মেনে চলতে আইনি ও নৈতিকভাবে সম্মত হচ্ছেন।
            </p>
          </div>

          {/* Section 2: Attendance & Schedules */}
          <div className="bg-[#FAFBFC] p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center space-x-3 text-[#00A89C]">
              <Clock className="w-7 h-7" />
              <h2 className="text-2xl font-black text-slate-900">২. ক্লাস উপস্থিতি ও সময়ানুবর্তিতা</h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm font-medium">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-slate-900 text-base block">ক. যথাসময়ে উপস্থিতি:</strong>
                শিক্ষার্থীকে তার নির্ধারিত সময়সূচি অনুযায়ী ক্লাসের অন্তত ৩-৫ মিনিট পূর্বে অনলাইন লিংকে যুক্ত হতে হবে।
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-slate-900 text-base block">খ. ছুটি ও রিশিডিউল (Reschedule):</strong>
                জরুরি প্রয়োজনে ক্লাসে অনুপস্থিত থাকতে চাইলে অন্তত ৩ ঘণ্টা পূর্বে সংশ্লিষ্ট শিক্ষক বা অ্যাডমিনকে অবগত করতে হবে। অন্যথায় উক্ত ক্লাসটি সম্পন্ন হয়েছে বলে গণ্য করা হবে।
              </div>
            </div>
          </div>

          {/* Section 3: Conduct & Recording prohibition */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center space-x-3 text-[#00A89C]">
              <AlertTriangle className="w-7 h-7 text-amber-600" />
              <h2 className="text-2xl font-black text-slate-900">৩. ক্লাসরুম আদব ও ভিডিও নিষিদ্ধকরণ</h2>
            </div>
            <ul className="space-y-3 text-slate-700 text-sm font-medium">
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 rounded-full bg-[#00A89C] mt-2 flex-shrink-0" />
                <span>শিক্ষকের সাথে সর্বদা দ্বীনি আদব ও সম্মানজনক আচরণ বজায় রাখতে হবে।</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
                <span>অনুমতি ছাড়া কোনো ক্লাসের অডিও বা ভিডিও রেকর্ড করা অথবা ইন্টারনেটে প্রচার করা সম্পূর্ণ নিষিদ্ধ ও আইনি অপরাধ।</span>
              </li>
            </ul>
          </div>

          {/* Section 4: Payments */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xl font-bold text-slate-900">৪. মাসিক ফি পরিশোধের নিয়ম</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              পেইড শিক্ষার্থীদের প্রতি চলতি মাসের ১ থেকে ৫ তারিখের মধ্যে পরবর্তী মাসের ফি পরিশোধ করতে হবে। কোনো কারণে পেমেন্ট বিলম্বিত হলে অ্যাডমিনকে অবহিত রাখা জরুরি।
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
