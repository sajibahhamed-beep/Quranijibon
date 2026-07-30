"use client";

import Image from "next/image";
import { Clock, Shield, Smartphone, HeartHandshake } from "lucide-react";

export default function AppFeaturesSection() {
  const features = [
    {
      title: "One-to-One নিবিড় শিক্ষা",
      desc: "প্রতিটি শিক্ষার্থীর ওপর আলাদা মনোযোগ দিতে একজন শিক্ষকের অধীনে ১ জন শিক্ষার্থী মাত্র।",
      icon: Smartphone,
    },
    {
      title: "মহিলা শিক্ষিকার বিশেষ সুবিধা",
      desc: "মহিলা ও শিশুদের জন্য অভিজ্ঞ মহিলা শিক্ষিকার মাধ্যমে নিরাপদ দ্বীনি পরিবেশে ক্লাস।",
      icon: Shield,
    },
    {
      title: "সময় নির্বাচনের স্বাধীনতা",
      desc: "আপনার দৈনন্দিন রুটিন অনুযায়ী ২৪ ঘণ্টার যেকোনো সময়ে সুবিধাজনক স্লট বেছে নিন।",
      icon: Clock,
    },
    {
      title: "অসচ্ছল শিক্ষার্থীদের সম্পূর্ণ ফ্রি শেখার সুযোগ",
      desc: "অর্থনৈতিক অসচ্ছল শিক্ষার্থীদের জন্য বিনামূল্যে কুরআন শিক্ষার বিশেষ সুবিধা।",
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="features" className="py-24 bg-[#fafbfc] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Showcase Render */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white">
              <Image
                src="/assets/figma_section_37_2094.png"
                alt="কুরআন জীবন অনলাইন ক্লাসরুম ফিচারসমূহ"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-emerald-700 font-bold text-sm tracking-wide uppercase bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
                আমাদের সার্ভিসসমূহ
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 leading-tight">
                সহজ ও মানসম্মত পদ্ধতিতে <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                  কুরআন শিক্ষার সুযোগ
                </span>
              </h2>
            </div>

            <div className="space-y-4">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 transition-all flex items-start space-x-4 group shadow-xs hover:shadow-md"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 group-hover:bg-emerald-600 text-emerald-600 group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-0.5">{f.title}</h3>
                      <p className="text-sm text-slate-600">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Feature Banner Bar */}
        <div className="mt-20 rounded-3xl overflow-hidden border border-emerald-600 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 p-8 md:p-12 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-black">
                আপনি কি কুরআন সহীহ-শুদ্ধভাবে শিখতে চান?
              </h3>
              <p className="text-emerald-50 text-lg font-medium">
                আজই আমাদের একটি ফ্রি ট্রায়াল ক্লাসে অংশ নিন এবং আমাদের অভিজ্ঞ শিক্ষকমণ্ডলীর সরাসরি দিকনির্দেশনা গ্রহণ করুন।
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <a
                href="#contact"
                className="px-8 py-4 rounded-xl bg-white text-emerald-800 font-extrabold text-lg hover:bg-emerald-50 hover:shadow-lg transition-all whitespace-nowrap"
              >
                ফ্রি ক্লাসে রেজিস্ট্রেশন করুন
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
