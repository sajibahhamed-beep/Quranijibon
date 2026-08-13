"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Star, Clock, Calendar, X, Sparkles, Send, CheckCircle2 } from "lucide-react";
import { registerStudentAction } from "@/data/studentsClient";
import { StudentRecord } from "@/data/adminStore";

export default function PricingSection() {
  const [selectedDays, setSelectedDays] = useState<string>("৩ দিন");
  const [selectedDuration, setSelectedDuration] = useState<string>("১ ঘণ্টা");
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  
  // Modal Form State
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [preferredTime, setPreferredTime] = useState("রাত ৮টা - ১০টা");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const daysOptions = ["১ দিন", "২ দিন", "৩ দিন", "৪ দিন", "৫ দিন", "৬ দিন", "৭ দিন"];
  const durationOptions = ["৩০ মিনিট", "৪৫ মিনিট", "১ ঘণ্টা", "দেড় ঘণ্টা", "২ ঘণ্টা"];

  const handleOpenEnrollModal = (pkgName: string) => {
    setSelectedPackage(pkgName);
    setIsSubmitted(false);
  };

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentPhone) return;

    setIsSubmitting(true);
    let pkgCategory: StudentRecord["package"] = "কাস্টম প্রিমিয়াম";
    if (selectedPackage?.includes("সাশ্রয়ী")) {
      pkgCategory = "সাশ্রয়ী (৳৩২০)";
    } else if (selectedPackage?.includes("ফ্রি") || selectedPackage?.includes("বিনামূল্যে")) {
      pkgCategory = "বিনামূল্যে";
    }

    await registerStudentAction({
      name: studentName,
      phone: studentPhone,
      package: pkgCategory,
      schedule: `সপ্তাহে ${selectedDays}, ${selectedDuration} (${preferredTime})`,
      teacherPreference: "যে কোনটি",
      notes: `প্যাকেজ: ${selectedPackage}`,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    setStudentName("");
    setStudentPhone("");

    setTimeout(() => {
      setSelectedPackage(null);
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section id="pricing" className="py-20 bg-[#FAFBFB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-black text-slate-900 tracking-tight">
            আপনার জন্য উপযুক্ত প্যাকেজ নির্বাচন করুন
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            আপনার প্রয়োজন ও সময় অনুযায়ী মাসিক প্যাকেজ বেছে নিন। অভিজ্ঞ শিক্ষক বা শিক্ষিকার মাধ্যমে পরিচালিত হয়।
          </p>
        </div>

        {/* Sponsorship / Scholarship Banner Box */}
        <div className="max-w-2xl mx-auto my-10 bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-xs">
          <h3 className="text-slate-900 font-bold text-base sm:text-lg">
            আপনি কি একজন শিক্ষার্থীর কুরআন শিক্ষার দায়িত্ব নিতে আগ্রহী?
          </h3>
          <p className="text-slate-600 text-sm mt-1">
            এখানে{" "}
            <Link href="/donate" className="text-[#00A89C] font-bold underline hover:text-[#00897B]">
              সাদাকা ও হাদিয়া পাতায় বিস্তারিত দেখুন
            </Link>
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {/* Card 1: বিনামূল্যে কুরআন শিক্ষা */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all relative">
            <div>
              <span className="bg-slate-100 text-slate-600 font-bold px-3.5 py-1 rounded-full text-xs inline-block mb-4">
                বিনামূল্যে
              </span>

              <h3 className="text-2xl font-black text-slate-900 leading-tight mb-4">
                বিনামূল্যে <br /> কুরআন শিক্ষা
              </h3>

              <div className="flex items-baseline space-x-1 mb-6">
                <span className="text-4xl font-black text-slate-900">৳০</span>
                <span className="text-slate-500 text-sm font-medium">/ মাস</span>
              </div>

              <div className="border-b border-slate-100 mb-6" />

              <ul className="space-y-3.5 text-sm font-medium text-slate-700">
                <li className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>সম্পূর্ণ বিনামূল্যে</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>অভিজ্ঞ শিক্ষক</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>নতুনদের জন্য উপযোগী</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>সীমিত আসন</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => handleOpenEnrollModal("বিনামূল্যে কুরআন শিক্ষা")}
                className="w-full py-3.5 px-6 rounded-xl border-2 border-[#00A89C] text-[#00A89C] hover:bg-[#00A89C] hover:text-white font-bold text-center transition-all block shadow-xs active:scale-95 cursor-pointer"
              >
                বিনামূল্যে শুরু করুন
              </button>
            </div>
          </div>

          {/* Card 2: সাশ্রয়ী মাসিক প্যাকেজ (Most Popular) */}
          <div className="bg-white border-2 border-[#00796B] rounded-3xl p-8 flex flex-col justify-between shadow-xl relative scale-102 z-10">
            <div>
              <span className="bg-[#00796B] text-white font-bold px-4 py-1 rounded-full text-xs inline-block mb-4">
                সবচেয়ে জনপ্রিয়
              </span>

              <h3 className="text-2xl font-black text-slate-900 leading-tight mb-4">
                সাশ্রয়ী মাসিক প্যাকেজ
              </h3>

              <div className="flex items-baseline space-x-1 mb-6">
                <span className="text-4xl font-black text-[#00796B]">৳৩২০</span>
                <span className="text-slate-500 text-sm font-medium">/ মাস</span>
              </div>

              <div className="border-b border-slate-100 mb-6" />

              <ul className="space-y-3.5 text-sm font-medium text-slate-700">
                <li className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>সপ্তাহে ৩ দিন ক্লাস</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>প্রতিটি ক্লাস ১ ঘণ্টা</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>ব্যক্তিগত (One-to-One) শিক্ষা</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>আপনার সুবিধামতো সময়</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => handleOpenEnrollModal("সাশ্রয়ী মাসিক প্যাকেজ (৳৩২০/মাস)")}
                className="w-full py-3.5 px-6 rounded-xl bg-[#00796B] hover:bg-[#00695C] text-white font-bold text-center transition-all block shadow-md shadow-[#00796B]/20 active:scale-95 cursor-pointer"
              >
                এই প্যাকেজটি নিন
              </button>
            </div>
          </div>

          {/* Card 3: কাস্টম প্রিমিয়াম প্যাকেজ */}
          <div className="bg-white border border-amber-300 rounded-3xl p-8 flex flex-col justify-between shadow-md relative">
            <div>
              <span className="bg-[#FFF3E0] text-[#D97706] font-bold px-3.5 py-1 rounded-full text-xs inline-flex items-center space-x-1 mb-4">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>প্রিমিয়াম</span>
              </span>

              <h3 className="text-2xl font-black text-slate-900 leading-tight mb-3">
                কাস্টম প্রিমিয়াম প্যাকেজ
              </h3>

              {/* Sub-banner: price note */}
              <div className="bg-[#FFFDE7] border border-amber-200 rounded-xl p-3 text-xs sm:text-sm font-bold text-[#B45309] text-center mb-6 flex items-center justify-center space-x-1">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500 flex-shrink-0" />
                <span>আপনার পছন্দ অনুযায়ী শিডিউল নির্বাচন</span>
              </div>

              {/* Selector 1: Days Selector */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>সাপ্তাহিক ক্লাস সংখ্যা</span>
                  </span>
                  <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                    {selectedDays}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {daysOptions.map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDays(day)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedDays === day
                          ? "bg-amber-100 border border-amber-400 text-amber-900 shadow-2xs"
                          : "bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector 2: Duration Selector */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>ক্লাসের সময়কাল</span>
                  </span>
                  <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                    {selectedDuration}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {durationOptions.map((dur) => (
                    <button
                      key={dur}
                      onClick={() => setSelectedDuration(dur)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedDuration === dur
                          ? "bg-amber-100 border border-amber-400 text-amber-900 shadow-2xs"
                          : "bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-b border-slate-100 mb-5" />

              <ul className="space-y-3 text-sm font-medium text-slate-700">
                <li className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>ব্যক্তিগত (One-to-One) শিক্ষা</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>অগ্রাধিকারভিত্তিক সময় নির্বাচন</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>আপনার সুবিধামতো সময়</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => handleOpenEnrollModal(`কাস্টম প্রিমিয়াম প্যাকেজ (${selectedDays}, ${selectedDuration})`)}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D97706] to-[#B45309] hover:from-[#B45309] hover:to-[#92400E] text-white font-bold text-center transition-all block shadow-md shadow-amber-600/20 active:scale-95 cursor-pointer"
              >
                এখনই ভর্তি হন
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Enrollment Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedPackage(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">মাশাআল্লাহ! আবেদন গৃহীত হয়েছে</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  আপনার ভর্তি আবেদন আমাদের শিক্ষক প্যানেলে সফলভাবে পৌঁছেছে। শীঘ্রই আপনার দেওয়া ফোন বা হোয়াটসঅ্যাপ নম্বরে ক্লাসের সময় নির্ধারণ করতে যোগাযোগ করা হবে।
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnrollSubmit} className="space-y-4">
                <div>
                  <span className="bg-[#D0F4F0] text-[#00695C] border border-[#00A89C]/30 text-xs font-black px-3 py-1 rounded-full inline-flex items-center gap-1 mb-1">
                    <Sparkles className="w-3 h-3" />
                    নতুন আবেদন
                  </span>
                  <h3 className="text-xl font-black text-slate-900">
                    {selectedPackage}
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    শিক্ষার্থী বা অভিভাবকের নাম
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                    placeholder="উদা: আব্দুল্লাহ আল মামুন"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    মোবাইল / হোয়াটসঅ্যাপ নম্বর
                  </label>
                  <input
                    type="tel"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    required
                    placeholder="01700-000000"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    পছন্দের ক্লাসের সময়
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                  >
                    <option value="সকাল ৭টা - ৯টা">সকাল (৭টা - ৯টা)</option>
                    <option value="দুপুর ১২টা - ২টা">দুপুর (১২টা - ২টা)</option>
                    <option value="বিকাল ৫টা - ৭টা">বিকাল (৫টা - ৭টা)</option>
                    <option value="রাত ৮টা - ১০টা">রাত (৮টা - ১০টা)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#00A89C] hover:bg-[#00897B] text-white font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span>{isSubmitting ? "আবেদন জমা হচ্ছে..." : "ভর্তি আবেদন সম্পন্ন করুন"}</span>
                  <Send className="w-4 h-4 ml-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
