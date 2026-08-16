import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import Image from "next/image";
import { PageData } from "@/data/pagesStorage";
import {
  FileText,
  Clock,
  AlertTriangle,
  AlertCircle,
  Cookie,
  Settings,
  RefreshCw,
  CheckCircle2,
  EyeOff,
  ShieldCheck,
  Mail,
  Phone,
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  FileText,
  Clock,
  AlertTriangle,
  AlertCircle,
  Cookie,
  Settings,
  RefreshCw,
  CheckCircle2,
  EyeOff,
  ShieldCheck,
  Mail,
  Phone,
};

export default function DynamicPageRenderer({
  pageData,
}: {
  pageData: PageData;
}) {
  return (
    <main className="min-h-screen bg-[#FAFBFC] text-[#0F172A] relative">
      <FloatingContact />
      <Navbar />

      {/* Hero Header Banner with Mosque Silhouette Aligned Right */}
      <section className="relative bg-gradient-to-r from-[#203935] via-[#155653] to-[#007C7A] text-white py-12 sm:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-[120px] sm:min-h-[150px] flex items-center">
          {/* Left Text Content */}
          <div className="space-y-2 max-w-2xl">
            {pageData.badge && (
              <span className="bg-white/10 text-emerald-200 font-bold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full border border-white/20 inline-block">
                {pageData.badge}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              {pageData.title}
            </h1>
            {pageData.description && (
              <p className="text-emerald-100 text-xs sm:text-sm max-w-lg leading-relaxed">
                {pageData.description}
              </p>
            )}
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

      {/* Policy Content Sections - Perfectly Left-Aligned with Header Banner */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-8">
            {pageData.sections && pageData.sections.length > 0 ? (
              pageData.sections.map((section, index) => {
                const Icon = section.iconName
                  ? ICON_MAP[section.iconName] || FileText
                  : FileText;

                return (
                  <div
                    key={section.id || `sec-${index}`}
                    className={`${
                      index % 2 === 1 ? "bg-[#FAFBFC]" : "bg-white"
                    } p-6 sm:p-9 rounded-3xl border border-slate-200/90 shadow-xs space-y-6 transition-all`}
                  >
                    {/* Section Title & Icon */}
                    {section.title && (
                      <div className="flex items-center space-x-3 text-[#00A89C]">
                        <Icon
                          className={`w-7 h-7 flex-shrink-0 ${
                            section.iconColorClass || "text-[#00A89C]"
                          }`}
                        />
                        <h2 className="text-2xl font-black text-slate-900 leading-snug">
                          {section.title}
                        </h2>
                      </div>
                    )}

                    {/* Main Text Content */}
                    {section.mainText && (
                      <div className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium whitespace-pre-line space-y-2">
                        {section.mainText}
                      </div>
                    )}

                    {/* Sub-items / Points / Cards */}
                    {section.items && section.items.length > 0 && (
                      <div>
                        {section.itemStyle === "cards" ? (
                          <div className="space-y-4 text-slate-700 text-sm font-medium">
                            {section.items.map((item, i) => (
                              <div
                                key={item.id || `item-${i}`}
                                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
                              >
                                {item.label && (
                                  <strong className="text-slate-900 text-base block font-bold">
                                    {item.label}
                                  </strong>
                                )}
                                <p className="text-slate-600 leading-relaxed">
                                  {item.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <ul className="space-y-3 text-slate-700 text-sm font-medium pl-1">
                            {section.items.map((item, i) => (
                              <li
                                key={item.id || `item-${i}`}
                                className="flex items-start space-x-3"
                              >
                                <span className="w-2 h-2 rounded-full bg-[#00A89C] mt-2 flex-shrink-0" />
                                <div className="leading-relaxed">
                                  {item.label && (
                                    <strong className="text-slate-900 mr-1.5 font-bold">
                                      {item.label}
                                    </strong>
                                  )}
                                  <span>{item.text}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}

                    {/* Highlight Note Alert Box */}
                    {section.note && (
                      <div
                        className={`p-4 rounded-xl border text-sm font-medium leading-relaxed ${
                          section.noteType === "rose"
                            ? "bg-rose-50 border-rose-200 text-rose-800"
                            : section.noteType === "amber"
                            ? "bg-amber-50 border-amber-200 text-amber-800"
                            : "bg-teal-50/70 border-teal-200 text-[#00695C] font-semibold"
                        }`}
                      >
                        {section.note}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center text-slate-500">
                এই পেজে এখনও কোনো সেকশন যোগ করা হয়নি। অ্যাডমিন প্যানেল থেকে সেকশন যোগ করুন।
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
