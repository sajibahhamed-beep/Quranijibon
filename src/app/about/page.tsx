import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "কুরআন জীবন সম্পর্কে | অনলাইন কুরআন শিক্ষা",
  description:
    "কুরআন জীবনের লক্ষ্য ও উদ্দেশ্য সম্পর্কে জানুন। বিশ্বজুড়ে প্রতিটি ঘরে নিবিড় One-to-One ক্লাসের মাধ্যমে সহীহ-শুদ্ধ কুরআন তিলাওয়াত পৌঁছে দিতে আমরা নিবেদিত।",
  openGraph: {
    type: "website",
    url: "https://quranijibon.com/about",
    title: "কুরআন জীবন সম্পর্কে | অনলাইন কুরআন শিক্ষা",
    description:
      "কুরআন জীবনের লক্ষ্য ও উদ্দেশ্য সম্পর্কে জানুন। বিশ্বজুড়ে প্রতিটি ঘরে নিবিড় One-to-One ক্লাসের মাধ্যমে সহীহ-শুদ্ধ কুরআন তিলাওয়াত পৌঁছে দিতে আমরা নিবেদিত।",
    siteName: "কুরআন জীবন",
    locale: "bn_BD",
    images: [
      {
        url: "/assets/why-learn-video-preview.webp",
        width: 1200,
        height: 525,
        alt: "কুরআন জীবন সম্পর্কে",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "কুরআন জীবন সম্পর্কে | অনলাইন কুরআন শিক্ষা",
    description:
      "কুরআন জীবনের লক্ষ্য ও উদ্দেশ্য সম্পর্কে জানুন। বিশ্বজুড়ে প্রতিটি ঘরে নিবিড় One-to-One ক্লাসের মাধ্যমে সহীহ-শুদ্ধ কুরআন তিলাওয়াত পৌঁছে দিতে আমরা নিবেদিত।",
    images: ["/assets/why-learn-video-preview.webp"],
  },
};

import StructuredData from "@/components/seo/StructuredData";
import MentorSection from "@/components/MentorSection";

export default function AboutPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "হোম",
        "item": "https://quranijibon.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "আমাদের সম্পর্কে",
        "item": "https://quranijibon.com/about",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#FAFBFC] text-[#0F172A] relative">
      <StructuredData data={breadcrumbSchema} />
      <FloatingContact />
      <Navbar />

      {/* Hero Header Banner with Mosque Silhouette Aligned Right */}
      <section className="relative bg-gradient-to-r from-[#203935] via-[#155653] to-[#007C7A] text-white py-12 sm:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-[120px] sm:min-h-[150px] flex items-center">
          {/* Left Text Content */}
          <div className="space-y-2 max-w-xl">
            <span className="bg-white/10 text-emerald-200 font-bold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full border border-white/20 inline-block">
              আমাদের গল্প ও লক্ষ্য
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              আমাদের সম্পর্কে
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-lg">
              বিশ্বজুড়ে প্রতিটি ঘরে সহীহ-শুদ্ধ কুরআন শিক্ষার দ্বীনি আলো ছড়িয়ে দেওয়ার জন্য নিবেদিত এক আন্তর্জাতিক প্রতিষ্ঠান।
            </p>
          </div>
        </div>

        {/* Right Mosque Vector Image Aligned to Bottom Right */}
        <div className="absolute right-0 bottom-0 pointer-events-none h-44 sm:h-56 lg:h-64 hidden md:block">
          <Image
            src="/assets/mosque-silhouette.png"
            alt=""
            aria-hidden="true"
            width={300}
            height={200}
            loading="lazy"
            className="h-full w-auto object-contain object-bottom-right opacity-90"
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-[#00A89C] font-bold text-sm uppercase tracking-wide">
                আমাদের লক্ষ্য
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                ঘরে বসেই সুবিধাজনক সময়ে শুদ্ধভাবে কুরআন শিক্ষা
              </h2>
              <p className="text-slate-600 text-base leading-relaxed font-medium">
                কুরআন জীবন প্রতিষ্ঠিত হয়েছে তাদের জন্য যারা কর্মব্যস্ততা বা সুযোগের অভাবে কুরআন তাজবীদ সহকারে পড়া শিখতে পারেননি। আমরা নিবিড় (One-to-One) ক্লাসের মাধ্যমে প্রতিটা শিক্ষার্থীকে ব্যক্তিভিত্তিক সঠিক উচ্চারণ ও তাজবীদের পাঠ দিয়ে থাকি।
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3 text-slate-700 font-semibold text-sm">
                  <CheckCircle className="w-5 h-5 text-[#00A89C]" />
                  <span>অভিজ্ঞ ও আন্তর্জাতিকভাবে সার্টিফাইড শিক্ষক মণ্ডলী</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-700 font-semibold text-sm">
                  <CheckCircle className="w-5 h-5 text-[#00A89C]" />
                  <span>মহিলা ও শিশুদের জন্য অভিজ্ঞ মহিলা শিক্ষিকা</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-700 font-semibold text-sm">
                  <CheckCircle className="w-5 h-5 text-[#00A89C]" />
                  <span>২৪ ঘণ্টার সুবিধাজনক সময়ে কাস্টম ক্লাস স্লট</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 bg-[#00A89C] hover:bg-[#00897B] text-white px-6 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-[#00A89C]/20 active:scale-95 cursor-pointer"
                >
                  <span>যোগাযোগ করুন</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <Image
                src="/assets/figma_img_37_1993.png"
                alt="Quran Teaching"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <MentorSection />

      <Footer />
    </main>
  );
}
