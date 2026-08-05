import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { Wallet, Building2 } from "lucide-react";

export const metadata = {
  title: "সাদাকা ও হাদিয়া | কুরআন জীবন",
  description: "দরিদ্র ও সুবিধাবঞ্চিত শিক্ষার্থীদের কুরআন শিক্ষায় সাদাকা ও হাদিয়া প্রদানের বিস্তারিত তথ্য।",
};

export default function DonatePage() {
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
              সদকা-ই-জারিয়ার অংশীদার হোন
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              সাদাকা ও হাদিয়া (Donate)
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-lg">
              সুবিধাবঞ্চিত এতিম ও দরিদ্র শিক্ষার্থীদের কুরআন শিক্ষার সম্পূর্ণ ব্যয়ভার বহন করতে আপনার ছোট হাদিয়াও অত্যন্ত মূল্যবান।
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

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* bKash / Nagad Personal Account */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center space-x-3 text-[#00A89C]">
                <Wallet className="w-8 h-8" />
                <h2 className="text-2xl font-black text-slate-900">মোবাইল ব্যাংকিং (বিকাশ / নগদ)</h2>
              </div>
              <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00695C]">পার্সোনাল নম্বর:</span>
                <p className="text-2xl sm:text-3xl font-black text-[#007C7A]">01775551325</p>
                <p className="text-xs text-slate-500 font-medium">বিকাশ সেন্ড মানি / নগদ সেন্ড মানি করুন</p>
              </div>
            </div>

            {/* Bank Transfer Details */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center space-x-3 text-[#00A89C]">
                <Building2 className="w-8 h-8" />
                <h2 className="text-2xl font-black text-slate-900">ব্যাংক অ্যাকাউন্ট ডিটেইলস</h2>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-sm font-medium">
                <p><strong>ব্যাংক নাম:</strong> ইসলামী ব্যাংক বাংলাদেশ লিমিটেড</p>
                <p><strong>অ্যাকাউন্ট নাম:</strong> কুরআন জীবন ট্রাস্ট</p>
                <p><strong>অ্যাকাউন্ট নম্বর:</strong> ২০৫০0000000000000</p>
                <p><strong>শাখা:</strong> ধান শাখা, ঢাকা</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
