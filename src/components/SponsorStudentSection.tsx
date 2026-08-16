"use client";

import Image from "next/image";
import Link from "next/link";

export default function SponsorStudentSection() {
  return (
    <section className="py-6 sm:py-8 bg-[#00A89C] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Left Stacked Images */}
          <div className="hidden sm:flex flex-row md:flex-col gap-3 justify-center items-center flex-shrink-0">
            <div className="relative w-44 sm:w-52 h-24 sm:h-28 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/assets/a child reading quran online.png"
                alt="অনলাইনে কুরআন অধ্যয়নরত শিশু শিক্ষার্থী"
                fill
                sizes="(max-width: 640px) 176px, 208px"
                className="object-cover"
              />
            </div>
            <div className="relative w-44 sm:w-52 h-24 sm:h-28 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/assets/boy-is-sitting-rug-with-quran-titled-boy.jpg"
                alt="কুরআন মুখস্থকারী শিশু শিক্ষার্থী"
                fill
                sizes="(max-width: 640px) 176px, 208px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Center Content */}
          <div className="text-center space-y-3 max-w-xl mx-auto py-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
              একজন শিক্ষার্থীর দায়িত্ব নিন
            </h2>
            <p className="text-white/90 text-xs sm:text-sm font-medium leading-relaxed max-w-md mx-auto">
              আপনার অনুদান একজন অসচ্ছল শিক্ষার্থীর জন্য বিনামূল্যে একান্তে (One-to-One) কুরআন শিক্ষা নিশ্চিত করতে পারে
            </p>
            <div className="pt-2">
              <Link
                href="/donate"
                className="inline-block bg-white text-slate-800 hover:bg-slate-50 font-extrabold text-xs sm:text-sm px-7 py-2.5 rounded-full shadow-md transition-all hover:scale-105 active:scale-95"
              >
                অনুদান প্রদান করুন
              </Link>
            </div>
          </div>

          {/* Right Stacked Images */}
          <div className="hidden sm:flex flex-row md:flex-col gap-3 justify-center items-center flex-shrink-0">
            <div className="relative w-44 sm:w-52 h-24 sm:h-28 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/assets/muslim-boy-student-studying-online-computer-laptop.jpg"
                alt="অনলাইন ক্লাসে যুক্ত কিশোর শিক্ষার্থী"
                fill
                sizes="(max-width: 640px) 176px, 208px"
                className="object-cover"
              />
            </div>
            <div className="relative w-44 sm:w-52 h-24 sm:h-28 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/assets/person reading quran 2.jpg"
                alt="পবিত্র কুরআন তিলাওয়াতরত শিক্ষার্থী"
                fill
                sizes="(max-width: 640px) 176px, 208px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
