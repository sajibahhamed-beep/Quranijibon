"use client";

import { useState, useEffect } from "react";
import { ChevronDown, HelpCircle, Loader2 } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

const DEFAULT_FAQS = [
  {
    question: "কুরআন জীবন অনলাইন প্লাটফর্মে ক্লাস করার নিয়ম কি?",
    answer: "আমাদের প্ল্যাটফর্মে ক্লাস করার জন্য আপনার একটি স্মার্টফোন, ট্যাবলেট বা কম্পিউটার এবং ইন্টারনেট কানেকশন প্রয়োজন। Zoom বা Google Meet অ্যাপের মাধ্যমে সরাসরি লাইভ ওয়ান-টু-ওয়ান ক্লাস নেওয়া হয়।",
  },
  {
    question: "মহিলা শিক্ষার্থীদের কি আলাদা শিক্ষিকা দেওয়া হয়?",
    answer: "জি, আলহামদুলিল্লাহ! মহিলা এবং ছোট কন্যা শিশুদের জন্য আমাদের অভিজ্ঞ ও সার্টিফাইড মহিলা শিক্ষিকাদের আলাদা ব্যবস্থা রয়েছে। ক্লাসসমূহ সম্পূর্ণ পর্দা বজায় রেখে অনুষ্ঠিত হয়।",
  },
  {
    question: "ক্লাসের সময়সূচী কীভাবে নির্ধারিত হয়?",
    answer: "শিক্ষার্থীর সুবিধাজনক সময় অনুযায়ী সকাল, দুপুর, বিকেল বা রাতের সুবিধাজনক স্লট নির্বাচন করতে পারেন। আপনি আপনার দৈনন্দিন রুটিনের সাথে মিলিয়ে ক্লাসের সময় চূড়ান্ত করবেন।",
  },
  {
    question: "অর্থনৈতিক সমস্যা থাকলে কি ফ্রিতে শেখার সুযোগ আছে?",
    answer: "জি! কুরআন জীবন বিশ্বাস করে অর্থকষ্টের জন্য কারো দ্বীন শেখা আটকে থাকা উচিত নয়। অসচ্ছল শিক্ষার্থীদের জন্য আমাদের স্কলারশিপ ও সম্পূর্ণ বিনামূল্যে পড়ার সুবিধা রয়েছে।",
  },
  {
    question: "একেবারে শুরু থেকে বা কায়দা থেকে কি পড়া শুরু করা যাবে?",
    answer: "অবশ্যই! আমাদের কোর্সে একদম প্রাথমিক বর্ণমালা (নূরানী কায়দা) থেকে শুরু করে নাজেরা, তাজবীদ সহ কুরআন তিলাওয়াত এবং হিফজ বিভাগ পর্যন্ত সকল লেভেলের কোর্স রয়েছে।",
  },
  {
    question: "ভর্তি হওয়ার আগে কি ট্রায়াল ক্লাস নেওয়া সম্ভব?",
    answer: "জি, আপনি ভর্তি হওয়ার আগে ১টি ফ্রি ট্রায়াল ক্লাসে অংশ নিয়ে আমাদের পড়াশোনার পদ্ধতি ও শিক্ষকের সাথে পরিচিত হতে পারবেন।",
  },
];

export default function FaqSection({
  initialFaqs,
}: {
  initialFaqs?: { question: string; answer: string }[];
}) {
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>(
    initialFaqs && initialFaqs.length > 0 ? initialFaqs : DEFAULT_FAQS
  );
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [loading, setLoading] = useState(!initialFaqs || initialFaqs.length === 0);

  useEffect(() => {
    if (initialFaqs && initialFaqs.length > 0) return;
    async function loadFaqs() {
      try {
        const res = await fetch("/api/faqs?activeOnly=true");
        const data = await res.json();
        if (data.success && Array.isArray(data.faqs) && data.faqs.length > 0) {
          setFaqs(
            data.faqs.map((f: any) => ({
              question: f.question,
              answer: f.answer,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load FAQs:", err);
      } finally {
        setLoading(false);
      }
    }
    loadFaqs();
  }, [initialFaqs]);

  return (
    <section id="faq" className="py-24 bg-[#fafbfc] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold">
            <HelpCircle className="w-4 h-4" />
            <span>সাধারণ জিজ্ঞাসাবলী</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            আপনার মনে থাকা কিছু সাধারণ প্রশ্ন ও উত্তর
          </h2>
          <p className="text-slate-600 text-lg font-medium">
            কুরআন জীবন অনলাইন ক্লাসে যুক্ত হওয়া নিয়ে আপনার সম্ভাব্য সকল প্রশ্নের সমাধান নিচে দেওয়া হলো।
          </p>
        </div>

        {/* Accordions */}
        {loading ? (
          <div className="py-12 flex items-center justify-center space-x-2 text-[#00796B] font-bold">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>প্রশ্নাবলী লোড হচ্ছে...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/50 transition-all shadow-xs overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between space-x-4 focus:outline-none"
                  >
                    <span className="text-lg font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-slate-700 text-base leading-relaxed border-t border-slate-100 bg-slate-50/70">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
