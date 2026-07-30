import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { EyeOff, ShieldCheck, FileText } from "lucide-react";

export const metadata = {
  title: "গোপনীয় নীতি (Privacy Policy) | কুরআন জীবন",
  description: "কুরআন জীবন ওয়েবসাইটে শিক্ষার্থীদের ব্যক্তিগত তথ্য সুরক্ষা ও গোপনীয়তা রক্ষার সার্বিক নীতিমালা।",
};

export default function PrivacyPolicyPage() {
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
              তথ্য সুরক্ষার সর্বোচ্চ মানদণ্ড
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              গোপনীয় নীতি
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-lg">
              আপনার ব্যক্তিগত তথ্যের গোপনীয়তা ও নিরাপত্তা নিশ্চিতকরণ আমাদের নৈতিক ও আইনি দায়িত্ব।
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
          {/* Section 1: Data Collection */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center space-x-3 text-[#00A89C]">
              <FileText className="w-7 h-7" />
              <h2 className="text-2xl font-black text-slate-900">১. আমরা কোন কোন তথ্য সংগ্রহ করি?</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              কুরআন জীবন প্ল্যাটফর্মে রেজিস্ট্রেশন ও ক্লাস পরিচালনার স্বার্থে আমরা নিম্নোক্ত তথ্যসমূহ সংগ্রহ করে থাকি:
            </p>
            <ul className="space-y-3 text-slate-700 text-sm font-medium pl-2">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#00A89C]" />
                <span>শিক্ষার্থী বা অভিভাবকের পুরো নাম এবং বয়স</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#00A89C]" />
                <span>মোবাইল / হোয়াটসঅ্যাপ নম্বর এবং ইমেইল ঠিকানা</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#00A89C]" />
                <span>পছন্দের অনলাইন ক্লাস সময়সূচি ও ভাষা সেটিংস</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#00A89C]" />
                <span>পেমেন্ট নিশ্চিতকরণের জন্য ট্রানজেকশন আইডি ও রসিদ তথ্য</span>
              </li>
            </ul>
          </div>

          {/* Section 2: Female Student Privacy */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center space-x-3 text-[#00A89C]">
              <EyeOff className="w-7 h-7" />
              <h2 className="text-2xl font-black text-slate-900">২. মহিলা ও শিশু শিক্ষার্থীদের বিশেষ পর্দা ও গোপনীয়তা</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              কুরআন জীবন শরীয়াহসম্মত পর্দা ও দ্বীনি শিষ্টাচার রক্ষায় অত্যন্ত কঠোর। মহিলা ও শিশু শিক্ষার্থীদের যোগাযোগের তথ্য এবং ক্লাসের বিবরণ সম্পূর্ণ গোপন রাখা হয়:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm space-y-2">
              <p>• মহিলা শিক্ষার্থীদের ফোন নম্বর ও তথ্য শুধুমাত্র রেজিস্টার্ড মহিলা শিক্ষিকা ও ডেডিকেটেড ফিমেল অ্যাডমিন প্যানেল নাগালের মধ্যে সংরক্ষিত থাকে।</p>
              <p>• কোনো পুরুষ কর্মকর্তা বা শিক্ষক মহিলা শিক্ষার্থীর সাথে সরাসরি কোনো ধরনের যোগাযোগ করবেন না।</p>
            </div>
          </div>

          {/* Section 3: Data Protection & No Selling */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center space-x-3 text-[#00A89C]">
              <ShieldCheck className="w-7 h-7" />
              <h2 className="text-2xl font-black text-slate-900">৩. তথ্য সুরক্ষা ও থার্ড পার্টি পলিসি</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              আমরা আপনার ব্যক্তিগত তথ্য বা ফোন নম্বর কোনো বাণিজ্যিক বিজ্ঞাপনী সংস্থা, থার্ড পার্টি বা অন্য কারও কাছে বিক্রি, ভাড়া বা শেয়ার করি না। সকল ডাটা আধুনিক এনক্রিপ্টেড ডাটাবেজে সম্পূর্ণ সুরক্ষিত থাকে।
            </p>
          </div>

          {/* Section 4: Contact */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xl font-bold text-slate-900">গোপনীয়তা সংক্রান্ত প্রশ্ন বা অভিযোগ:</h3>
            <p className="text-slate-600 text-sm font-medium">
              আপনার তথ্য পরিবর্তন বা মুছে ফেলার অনুরোধের জন্য ইমেইল করুন: <strong>sajibahhamed@gmail.com</strong>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
