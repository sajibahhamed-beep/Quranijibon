"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

export default function WhyLearnSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [studentBranch, setStudentBranch] = useState<"purus" | "mohila">("purus");

  return (
    <section id="why-us" className="py-16 md:py-24 bg-[#F9FBFB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-black text-slate-900 tracking-tight">
            কেন আমাদের কাছে শিখবেন?
          </h2>
          
          <p className="text-base sm:text-lg text-slate-700 font-medium">
            {studentBranch === "purus" ? (
              <>
                পুরুষ শিক্ষার্থী হলে এখানে-{" "}
                <button
                  onClick={() => setStudentBranch("mohila")}
                  className="text-[#00A89C] font-bold hover:underline inline-flex items-center"
                >
                  ক্লিক করুন
                </button>
              </>
            ) : (
              <>
                মহিলা শিক্ষার্থী হলে এখানে-{" "}
                <button
                  onClick={() => setStudentBranch("purus")}
                  className="text-[#00A89C] font-bold hover:underline inline-flex items-center"
                >
                  ক্লিক করুন
                </button>
              </>
            )}
          </p>
        </div>

        {/* Main Video Frame (Matching 1199.7 x 524.87 Figma specs) */}
        <div className="relative max-w-6xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 group">
          <div className="relative aspect-[1200/525] w-full overflow-hidden">
            <Image
              src="/assets/why-learn-video-preview.webp"
              alt="কেন আমাদের কাছে কুরআন শিখবেন - ভিডিও প্রিভিউ"
              width={1200}
              height={525}
              loading="lazy"
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Dark Vignette & Bottom Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />

            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/90 bg-black/40 backdrop-blur-xs flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group-hover:border-[#00A89C] group-hover:bg-[#00A89C]/80"
                aria-label="Play Introduction Video"
              >
                <Play className="w-7 h-7 sm:w-9 sm:h-9 text-white fill-white ml-1" />
              </button>
            </div>

            {/* Bottom Subtitle / Text Overlay inside Video */}
            <div className="absolute bottom-6 left-6 right-6 text-center">
              <p className="text-white text-base sm:text-xl font-bold tracking-wide text-shadow-md">
                আপনার সুবিধামতো সময়ে ঘরে বসেই অভিজ্ঞ শিক্ষকের সঙ্গে One-to-One কুরআন
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Popup */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Quranijibon Intro Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
