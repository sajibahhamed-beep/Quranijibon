"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { Wallet, Building2, HeartHandshake, CheckCircle2, Send, Heart } from "lucide-react";
import { recordUserInteraction } from "@/data/notifyClient";

export default function DonateClient() {
  const [selectedAmount, setSelectedAmount] = useState<string>("১০০০");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [donorPhone, setDonorPhone] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("বিকাশ (bKash)");
  const [trxId, setTrxId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const presetAmounts = ["৫০০", "১০০০", "২০০০", "৫০০০", "১০০০০"];

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount || selectedAmount;
    if (!donorName || !donorPhone || !finalAmount) return;

    setIsSubmitting(true);
    await recordUserInteraction({
      title: `নতুন সাদাকা ও হাদিয়া: ৳${finalAmount}`,
      message: `${donorName} (${donorPhone}) ${paymentMethod} এর মাধ্যমে ৳${finalAmount} টাকা অনুদান প্রদান করেছেন। ট্রানজেকশন আইডি: ${trxId || "প্রদান করা হয়নি"}`,
      category: "donation",
      link: "/admin/donations",
    });

    setIsSubmitting(false);
    setSubmitted(true);
    setDonorName("");
    setDonorPhone("");
    setTrxId("");
    setCustomAmount("");

    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  return (
    <main className="min-h-screen bg-[#FAFBFC] text-[#0F172A] relative">
      <FloatingContact />
      <Navbar />

      {/* Hero Header Banner with Mosque Silhouette Aligned Right */}
      <section className="relative bg-gradient-to-r from-[#203935] via-[#155653] to-[#007C7A] text-white py-12 sm:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-[120px] sm:min-h-[150px] flex items-center">
          {/* Left Text Content */}
          <div className="space-y-2 max-w-xl">
            <span className="bg-white/10 text-emerald-200 font-bold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full border border-white/20 inline-block">
              সদকা-ই-জারিয়ার অংশীদার হোন
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              সাদাকা ও হাদিয়া (Donate)
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-lg">
              সুবিধাবঞ্চিত এতিম ও দরিদ্র শিক্ষার্থীদের কুরআন শিক্ষার সম্পূর্ণ ব্যয়ভার বহন করতে আপনার ছোট হাদিয়াও অত্যন্ত মূল্যবান।
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
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Payment Account Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* bKash / Nagad Personal Account */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center space-x-3 text-[#00A89C]">
                <Wallet className="w-8 h-8" />
                <h2 className="text-2xl font-black text-slate-900">মোবাইল ব্যাংকিং (বিকাশ / নগদ)</h2>
              </div>
              <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00695C]">পার্সোনাল নম্বর:</span>
                <p className="text-2xl sm:text-3xl font-black text-[#007C7A]">01775551325</p>
                <p className="text-xs text-slate-500 font-medium">বিকাশ সেন্ড মানি / নগদ সেন্ড মানি করুন</p>
              </div>
            </div>

            {/* Bank Transfer Details */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center space-x-3 text-[#00A89C]">
                <Building2 className="w-8 h-8" />
                <h2 className="text-2xl font-black text-slate-900">ব্যাংক অ্যাকাউন্ট ডিটেইলস</h2>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-sm font-medium">
                <p><strong>ব্যাংক নাম:</strong> ইসলামী ব্যাংক বাংলাদেশ লিমিটেড</p>
                <p><strong>অ্যাকাউন্ট নাম:</strong> কুরআন জীবন ট্রাস্ট</p>
                <p><strong>অ্যাকাউন্ট নম্বর:</strong> ২০৫০0000000000000</p>
                <p><strong>শাখা:</strong> ধানমণ্ডি শাখা, ঢাকা</p>
              </div>
            </div>
          </div>

          {/* Interactive Donation Confirmation Form */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-lg space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
              <HeartHandshake className="w-7 h-7 text-[#00A89C]" />
              <div>
                <h3 className="text-2xl font-black text-slate-900">অনুদান তথ্য নিশ্চিত করুন</h3>
                <p className="text-xs text-slate-500">
                  টাকা পাঠানোর পর নিচের তথ্যগুলো পূরণ করে সাবমিট করুন। অ্যাডমিন প্যানেল তাৎক্ষণিক নোটিফিকেশন পাবে।
                </p>
              </div>
            </div>

            {submitted && (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm font-bold flex items-center space-x-3 animate-in fade-in">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <p className="text-base font-black">জাযাকাল্লাহু খাইরান! আপনার অনুদানের তথ্য গৃহীত হয়েছে।</p>
                  <p className="text-xs font-normal text-emerald-700">আল্লাহ তায়ালা আপনার দানকে কবুল করে সদকা-ই-জারিয়া হিসেবে উত্তম প্রতিদান দান করুন। আমিন।</p>
                </div>
              </div>
            )}

            <form onSubmit={handleDonationSubmit} className="space-y-5">
              {/* Preset Amounts */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  অনুদানের পরিমাণ বেছে নিন (টাকায়)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount("");
                      }}
                      className={`py-2.5 rounded-xl text-sm font-bold transition-all border cursor-pointer ${
                        selectedAmount === amt && !customAmount
                          ? "bg-[#00A89C] text-white border-[#00A89C] shadow-md shadow-[#00A89C]/25"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:border-teal-300"
                      }`}
                    >
                      ৳{amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  অথবা অন্য যেকোনো পরিমাণ লিখুন (ঐচ্ছিক)
                </label>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                  }}
                  placeholder="উদা: ৩০০০"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                />
              </div>

              {/* Donor Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    আপনার নাম
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    required
                    placeholder="উদা: আব্দুল বাসেত"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    মোবাইল নম্বর
                  </label>
                  <input
                    type="tel"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    required
                    placeholder="01700-000000"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                  />
                </div>
              </div>

              {/* Payment Method & TrxID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    পেমেন্ট মেথড
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                  >
                    <option value="বিকাশ (bKash)">বিকাশ (bKash)</option>
                    <option value="নগদ (Nagad)">নগদ (Nagad)</option>
                    <option value="ইসলামী ব্যাংক (Bank Transfer)">ইসলামী ব্যাংক (Bank Transfer)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    ট্রানজেকশন আইডি (TrxID)
                  </label>
                  <input
                    type="text"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    placeholder="উদা: 9K8X7Y2Z"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#00A89C] hover:bg-[#00897B] text-white font-black text-sm flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{isSubmitting ? "তথ্য পাঠানো হচ্ছে..." : "অনুদান তথ্য সাবমিট করুন"}</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
