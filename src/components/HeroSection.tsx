"use client";

import { useState } from "react";
import { ArrowRightCircle } from "lucide-react";
import { recordUserInteraction } from "@/data/notifyClient";

export default function HeroSection() {
  const [activeBranch, setActiveBranch] = useState<"mohila" | "purus">("mohila");

  return (
    <section id="home" className="relative py-12 md:py-20 bg-[#F9FBFB] border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Branch Buttons, Headline, Description, CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Branch Selector Toggle Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setActiveBranch("mohila")}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeBranch === "mohila"
                  ? "bg-[#D0F4F0] text-[#00695C] border-2 border-[#00A89C] shadow-xs"
                  : "bg-white text-slate-700 border border-slate-300 hover:border-slate-400"
                  }`}
              >
                মহিলা শাখা
              </button>

              <button
                onClick={() => setActiveBranch("purus")}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeBranch === "purus"
                  ? "bg-[#D0F4F0] text-[#00695C] border-2 border-[#00A89C] shadow-xs"
                  : "bg-white text-slate-700 border border-slate-300 hover:border-slate-400"
                  }`}
              >
                পুরুষ শাখা
              </button>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-slate-900 leading-[1.2] tracking-tight">
              ব্যক্তিগত শিক্ষকের কাছে <br />
              একান্তে শিখুন <span className="text-[#00A89C]">শুদ্ধ কুরআন</span>
            </h1>

            {/* Description (Dynamic per active branch) */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl text-justify pr-20">
              {activeBranch === "mohila" ? (
                <>
                  আপনার সুবিধামতো সময়ে ঘরে বসেই অভিজ্ঞ শিক্ষকের সঙ্গে One-to-One কুরআন শিক্ষা। মহিলা শিক্ষার্থীদের জন্য রয়েছে অভিজ্ঞ মহিলা শিক্ষিকার ব্যবস্থা। শিক্ষার্থীদের জন্য{" "}
                  <span className="text-[#00A89C] font-semibold">সম্পূর্ণ ফ্রি</span> শেখার সুযোগও রয়েছে।
                </>
              ) : (
                <>
                  আপনার সুবিধামতো সময়ে ঘরে বসেই অভিজ্ঞ শিক্ষকের সঙ্গে One-to-One কুরআন শিক্ষা। পুরুষ শিক্ষার্থীদের জন্য রয়েছে অভিজ্ঞ পুরুষ শিক্ষকের ব্যবস্থা। শিক্ষার্থীদের জন্য{" "}
                  <span className="text-[#00A89C] font-semibold">সম্পূর্ণ ফ্রি</span> শেখার সুযোগও রয়েছে।
                </>
              )}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="/about"
                className="px-6 py-3.5 rounded-lg border-2 border-[#00A89C] text-[#00A89C] font-bold text-base hover:bg-[#00A89C]/10 transition-colors"
              >
                আমাদের সম্পর্কে জানুন
              </a>
              <a
                href="#pricing"
                onClick={() => {
                  recordUserInteraction({
                    title: "ভিজিটর 'শেখা শুরু করুন' বাটনে ক্লিক করেছেন",
                    message: "হোমপেজের হিরো ব্যানার থেকে ভিজিটর কুরআন শেখা শুরু করার আগ্রহ প্রকাশ করেছেন।",
                    category: "admission",
                    link: "/#pricing",
                  });
                }}
                className="px-7 py-3.5 rounded-lg bg-[#00A89C] text-white font-bold text-base hover:bg-[#00897B] transition-colors flex items-center space-x-2 shadow-md shadow-[#00A89C]/20"
              >
                <span>শেখা শুরু করুন</span>
                <ArrowRightCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Dynamic Branch Illustration Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-lg transition-all duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  activeBranch === "mohila"
                    ? "/assets/Mohila section illustration.png"
                    : "/assets/Purus section illustration.png"
                }
                alt={
                  activeBranch === "mohila"
                    ? "মহিলা শাখা অনলাইন কুরআন শিক্ষা"
                    : "পুরুষ শাখা অনলাইন কুরআন শিক্ষা"
                }
                width={600}
                height={500}
                className="w-full h-auto object-contain drop-shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
