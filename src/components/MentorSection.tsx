"use client";

import { useState } from "react";
import { UserCheck, Sparkles, BookOpen, Heart, Clock, Award, ArrowRight } from "lucide-react";
import Image from "next/image";
import TeacherApplyModal from "./TeacherApplyModal";

export default function MentorSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="mentor-section" className="py-20 relative bg-slate-900 text-white overflow-hidden border-t border-b border-slate-800">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00A89C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-[#00A89C]/15 border border-[#00A89C]/30 text-[#00A89C] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#00A89C]" />
            <span>শিক্ষক ও মেন্টরশিপ প্ল্যাটফর্ম</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            কুরআন শিক্ষক ও মেন্টর হিসেবে <span className="text-[#00A89C]">আমাদের সাথে যুক্ত হন</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            আপনার দ্বীনি ইলম ও তাজবীদের জ্ঞান ছড়িয়ে দিন উম্মাহর মাঝে। কুরআন জীবন প্ল্যাটফর্মে সহজ শর্তে, স্বল্প পারিশ্রমিকে কিংবা স্বেচ্ছাসেবী হিসেবে শিক্ষকতার মতো সুমহান সদকায়ে জারিয়া কাজে অংশ নিন।
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-950/70 border border-slate-800 p-6 rounded-3xl space-y-3 hover:border-[#00A89C]/40 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-[#00A89C]/20 border border-[#00A89C]/30 text-[#00A89C] flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">অনলাইন ১-টু-১ ক্লাস</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              ঘরে বসেই আপনার সুবিধাজনক সময়ে দেশ ও বিদেশের শিক্ষার্থীদের তাজবীদ ও তিলাওয়াত শেখান।
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-6 rounded-3xl space-y-3 hover:border-emerald-500/40 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">স্বেচ্ছাসেবী বা পারিশ্রমিক</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              স্বেচ্ছাসেবী (Voluntary) হিসেবে খেদমত করুন কিংবা স্বল্প সম্মানীভিত্তিক (Low Wage) শিক্ষকতা বেছে নিন।
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-6 rounded-3xl space-y-3 hover:border-teal-500/40 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 text-teal-300 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">নারী ও পুরুষ পৃথক শাখা</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              ভাইদের জন্য অভিজ্ঞ পুরুষ শিক্ষক এবং বোনদের জন্য পর্দা রক্ষা করে শিক্ষিকা হিসেবে যুক্ত হওয়ার সুব্যবস্থা।
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-6 rounded-3xl space-y-3 hover:border-sky-500/40 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/30 text-sky-400 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">সদকায়ে জারিয়া অর্জন</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              আপনার শেখানো প্রতিটা অক্ষরে শিক্ষার্থীরা যতবার তিলাওয়াত করবে, আপনার আমলনামায় যুক্ত হবে অবিরাম সওয়াব।
            </p>
          </div>
        </div>

        {/* Banner CTA Box */}
        <div className="bg-gradient-to-r from-[#155653] via-[#007C7A] to-[#00A89C] rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden border border-emerald-400/30">
          <div className="space-y-2 max-w-xl text-center md:text-left z-10">
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              আপনি কি একজন হিফজ বা তাজবীদ শিক্ষক?
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm font-medium">
              আজই আমাদের একাডেমি প্যানেলে নিবন্ধিত হয়ে শিক্ষার্থীদের দ্বীনি শিক্ষায় ভূমিকা রাখুন।
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="z-10 px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-[#007C7A] font-black text-sm sm:text-base transition-all shadow-xl hover:shadow-2xl flex items-center space-x-2 active:scale-95 cursor-pointer flex-shrink-0"
          >
            <span>শিক্ষক হিসেবে আবেদন করুন</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Decorative Vector */}
          <div className="absolute right-0 bottom-0 pointer-events-none opacity-20 hidden md:block">
            <Image
              src="/assets/mosque-silhouette.png"
              alt=""
              aria-hidden="true"
              width={250}
              height={150}
              loading="lazy"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Teacher Application Modal */}
      <TeacherApplyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
