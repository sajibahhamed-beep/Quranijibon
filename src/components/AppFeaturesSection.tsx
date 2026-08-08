"use client";

import { useState } from "react";
import {
  Clock,
  Shield,
  Smartphone,
  HeartHandshake,
  X,
  CheckCircle2,
  Send,
  Sparkles,
  User,
  Phone,
  Calendar,
  BookOpen,
} from "lucide-react";
import { registerStudentAction } from "@/data/studentsClient";

export default function AppFeaturesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [teacherPref, setTeacherPref] = useState<"মহিলা শিক্ষিকা" | "পুরুষ শিক্ষক" | "যে কোনটি">("মহিলা শিক্ষিকা");
  const [preferredTime, setPreferredTime] = useState("রাত ৮টা - ১০টা");
  const [learningGoal, setLearningGoal] = useState("সহীহ কুরআন তিলাওয়াত ও তাজবীদ");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleOpenModal = () => {
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (isSubmitted) {
      setStudentName("");
      setStudentPhone("");
      setIsSubmitted(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentPhone.trim()) return;

    setIsSubmitting(true);

    try {
      await registerStudentAction({
        name: studentName.trim(),
        phone: studentPhone.trim(),
        package: "বিনামূল্যে",
        schedule: `ফ্রি ট্রায়াল (${preferredTime})`,
        teacherPreference: teacherPref,
        notes: `কোর্স বিষয়: ${learningGoal}`,
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting free trial registration:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="features" className="py-24 bg-[#fafbfc] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column - Image covers full column height */}
          <div className="lg:col-span-6 relative flex flex-col">
            <div className="relative w-full h-full min-h-[380px] lg:min-h-full rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/why_learn_video_37_1931.png"
                alt="কুরআন জীবন অনলাইন ক্লাসরুম ফিচারসমূহ"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="lg:col-span-6 space-y-8 flex flex-col justify-center">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 mt-3 leading-tight">
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
              <button
                type="button"
                onClick={handleOpenModal}
                className="px-8 py-4 rounded-xl bg-white text-emerald-800 font-extrabold text-lg hover:bg-emerald-50 hover:shadow-lg transition-all whitespace-nowrap active:scale-95 cursor-pointer shadow-md"
              >
                ফ্রি ক্লাসে রেজিস্ট্রেশন করুন
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Free Trial Registration Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-[#00A89C] rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                
                <div className="flex justify-center">
                  <span className="bg-[#D0F4F0] text-[#00695C] border border-[#00A89C]/30 text-xs font-black px-3.5 py-1 rounded-full inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    নতুন আবেদন
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900">মাশাআল্লাহ! রেজিস্ট্রেশন সফল হয়েছে</h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
                  আপনার ফ্রি ট্রায়াল ক্লাসের আবেদনটি গৃহীত হয়েছে এবং এডমিন স্টুডেন্ট প্যানেলে সংরক্ষিত হয়েছে। শীঘ্রই আমাদের প্রতিনিধি যোগাযোগ করবেন।
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-3 rounded-xl bg-[#00A89C] hover:bg-[#00897B] text-white font-bold text-sm transition-all"
                  >
                    ধন্যবাদ, বন্ধ করুন
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#D0F4F0] text-[#00695C] border border-[#00A89C]/30 text-xs font-black px-3 py-1 rounded-full inline-flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      নতুন আবেদন
                    </span>
                    <span className="text-slate-400 text-xs font-semibold">• ফ্রি ট্রায়াল</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    ফ্রি ক্লাসে রেজিস্ট্রেশন করুন
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5">
                    ১-অন-১ নিবিড় কুরআন শিক্ষা ক্লাসের জন্য তথ্য পূরণ করুন
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#00A89C]" />
                    শিক্ষার্থী বা অভিভাবকের নাম <span className="text-rose-500">*</span>
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

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#00A89C]" />
                    মোবাইল / হোয়াটসঅ্যাপ নম্বর <span className="text-rose-500">*</span>
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

                {/* Teacher Preference */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-[#00A89C]" />
                    শিক্ষক/শিক্ষিকা পছন্দ
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "মহিলা শিক্ষিকা", val: "মহিলা শিক্ষিকা" as const },
                      { label: "পুরুষ শিক্ষক", val: "পুরুষ শিক্ষক" as const },
                      { label: "যে কোনটি", val: "যে কোনটি" as const },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setTeacherPref(opt.val)}
                        className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                          teacherPref === opt.val
                            ? "bg-[#D0F4F0] text-[#00695C] border-[#00A89C] shadow-xs"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Time */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#00A89C]" />
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

                {/* Learning Goal */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#00A89C]" />
                    কুরআন শিক্ষার বিষয় (ঐচ্ছিক)
                  </label>
                  <select
                    value={learningGoal}
                    onChange={(e) => setLearningGoal(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                  >
                    <option value="সহীহ কুরআন তিলাওয়াত ও তাজবীদ">সহীহ কুরআন তিলাওয়াত ও তাজবীদ</option>
                    <option value="নূরানী কায়দা ও মৌলিক আরবী">নূরানী কায়দা ও মৌলিক আরবী</option>
                    <option value="হিফজুল কুরআন (মুখস্থ)">হিফজুল কুরআন (মুখস্থ)</option>
                    <option value="জরুরি দোয়া ও নামাজ শিক্ষা">জরুরি দোয়া ও নামাজ শিক্ষা</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#00A89C] hover:bg-[#00897B] text-white font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-70 mt-2"
                >
                  <span>{isSubmitting ? "আবেদন জমা হচ্ছে..." : "ফ্রি ক্লাসে রেজিস্ট্রেশন সম্পন্ন করুন"}</span>
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
