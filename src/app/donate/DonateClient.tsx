"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { Wallet, Building2, HeartHandshake, CheckCircle2, Send, Heart } from "lucide-react";
import { recordUserInteraction } from "@/data/notifyClient";
import { getSiteSettings, SiteSettings, MobilePaymentAccount } from "@/data/siteSettingsStorage";
import { fetchSiteSettings } from "@/app/admin/settings/actions";

const DEFAULT_DONATION_MOBILE_ACCOUNTS: MobilePaymentAccount[] = [
  {
    id: "1",
    providerName: "বিকাশ (bKash)",
    logoType: "bkash",
    customLogoUrl: "",
    number: "01775551325",
    accountType: "পার্সোনাল",
    instructions: "বিকাশ সেন্ড মানি করুন",
    active: true,
  },
  {
    id: "2",
    providerName: "নগদ (Nagad)",
    logoType: "nagad",
    customLogoUrl: "",
    number: "01775551325",
    accountType: "পার্সোনাল",
    instructions: "নগদ সেন্ড মানি করুন",
    active: true,
  },
];

export default function DonateClient() {
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());
  const [transactionType, setTransactionType] = useState<"অনুদান প্রদান" | "শিক্ষার্থী হাদিয়া">("অনুদান প্রদান");
  const [selectedAmount, setSelectedAmount] = useState<string>("১০০০");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [donorPhone, setDonorPhone] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("বিকাশ (bKash)");
  const [trxId, setTrxId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchSiteSettings().then((data) => {
      if (data) setSettings(data);
    });
  }, []);

  const presetAmounts = ["৫০০", "১০০০", "২০০০", "৫০০০", "১০০০০"];

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount || selectedAmount;
    if (!donorName.trim() || !donorPhone.trim() || !finalAmount) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName: donorName.trim(),
          phone: donorPhone.trim(),
          amount: finalAmount,
          paymentMethod,
          trxId: trxId.trim(),
          type: transactionType,
        }),
      });
    } catch (err) {
      console.error("Failed to post donation:", err);
    }

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
            {/* Dynamic Mobile Banking Accounts */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center space-x-3 text-[#00A89C]">
                <Wallet className="w-8 h-8" />
                <h2 className="text-2xl font-black text-slate-900">মোবাইল ব্যাংকিং (Mobile Banking)</h2>
              </div>

              <div className="space-y-3">
                {((settings.mobilePaymentAccounts && settings.mobilePaymentAccounts.filter(a => a.active).length > 0)
                  ? settings.mobilePaymentAccounts.filter(a => a.active)
                  : DEFAULT_DONATION_MOBILE_ACCOUNTS
                ).map((acc) => (
                  <div key={acc.id} className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      {acc.logoType === "custom" && acc.customLogoUrl ? (
                        <div className="w-10 h-10 rounded-xl bg-white p-1 border border-slate-200 flex items-center justify-center flex-shrink-0">
                          <Image src={acc.customLogoUrl} alt={acc.providerName} width={36} height={36} className="object-contain" />
                        </div>
                      ) : (
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xs flex-shrink-0 shadow-xs ${
                            acc.logoType === "bkash" ? "bg-[#E2136E]" :
                            acc.logoType === "nagad" ? "bg-[#F7941D]" :
                            acc.logoType === "rocket" ? "bg-[#8C3494]" :
                            acc.logoType === "upay" ? "bg-[#005BAA]" :
                            acc.logoType === "cellfin" ? "bg-[#00A859]" : "bg-[#00A89C]"
                          }`}
                        >
                          {acc.providerName.substring(0, 3)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{acc.providerName}</h4>
                        <span className="text-[11px] text-teal-700 font-medium">{acc.instructions || `${acc.accountType || "পার্সোনাল"} নম্বর`}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg sm:text-xl font-black text-[#007C7A] font-mono">{acc.number}</p>
                      <span className="text-[10px] bg-white text-teal-800 border border-teal-300 font-bold px-2 py-0.5 rounded-full">{acc.accountType || "পার্সোনাল"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bank Transfer Details */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 text-[#00A89C] mb-6">
                  <Building2 className="w-8 h-8" />
                  <h2 className="text-2xl font-black text-slate-900">ব্যাংক অ্যাকাউন্ট ডিটেইলস</h2>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-sm font-medium">
                  <p><strong>ব্যাংক নাম:</strong> {settings.bankDetails?.bankName || "ইসলামী ব্যাংক বাংলাদেশ লিমিটেড"}</p>
                  <p><strong>অ্যাকাউন্ট নাম:</strong> {settings.bankDetails?.accountName || "কুরআন জীবন একাডেমি"}</p>
                  <p><strong>অ্যাকাউন্ট নম্বর:</strong> <span className="font-mono font-bold text-slate-900">{settings.bankDetails?.accountNumber || "২০৫০৭৭৭৮৮৮৯৯৯০০০"}</span></p>
                  <p><strong>শাখা:</strong> {settings.bankDetails?.branch || "ধানমণ্ডি শাখা, ঢাকা"}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">
                * ব্যাংক বা মোবাইল ব্যাংকিং অ্যাপ দিয়ে যেকোনো স্থান থেকে সহজে হাদিয়া প্রেরণ করতে পারেন।
              </p>
            </div>
          </div>

          {/* Interactive Transaction Confirmation Form */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-lg space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
              <HeartHandshake className="w-7 h-7 text-[#00A89C]" />
              <div>
                <h3 className="text-2xl font-black text-slate-900">লেনদেন তথ্য নিশ্চিত করুন</h3>
                <p className="text-xs text-slate-500">
                  টাকা পাঠানোর পর নিচের তথ্যগুলো পূরণ করে সাবমিট করুন। অ্যাডমিন প্যানেল তাৎক্ষণিক নোটিফিকেশন পাবে।
                </p>
              </div>
            </div>

            {submitted && (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm font-bold flex items-center space-x-3 animate-in fade-in">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <p className="text-base font-black">জাযাকাল্লাহু খাইরান! আপনার লেনদেনের তথ্য গৃহীত হয়েছে।</p>
                  <p className="text-xs font-normal text-emerald-700">আল্লাহ তায়ালা আপনার দান ও হাদিয়াকে কবুল করে উত্তম প্রতিদান দান করুন। আমিন।</p>
                </div>
              </div>
            )}

            <form onSubmit={handleDonationSubmit} className="space-y-5">
              {/* Transaction Purpose: অনুদান প্রদান vs শিক্ষার্থী হাদিয়া */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  লেনদেনের ধরন নির্বাচন করুন <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTransactionType("অনুদান প্রদান")}
                    className={`py-3 px-4 rounded-2xl text-sm font-black transition-all border flex items-center justify-center space-x-2 cursor-pointer ${
                      transactionType === "অনুদান প্রদান"
                        ? "bg-[#00A89C] text-white border-[#00A89C] shadow-md shadow-[#00A89C]/25"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:border-teal-300"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${transactionType === "অনুদান প্রদান" ? "fill-white" : "text-[#00A89C]"}`} />
                    <span>অনুদান প্রদান</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTransactionType("শিক্ষার্থী হাদিয়া")}
                    className={`py-3 px-4 rounded-2xl text-sm font-black transition-all border flex items-center justify-center space-x-2 cursor-pointer ${
                      transactionType === "শিক্ষার্থী হাদিয়া"
                        ? "bg-[#00A89C] text-white border-[#00A89C] shadow-md shadow-[#00A89C]/25"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:border-teal-300"
                    }`}
                  >
                    <HeartHandshake className={`w-4 h-4 ${transactionType === "শিক্ষার্থী হাদিয়া" ? "text-white" : "text-[#00A89C]"}`} />
                    <span>শিক্ষার্থী হাদিয়া</span>
                  </button>
                </div>
              </div>

              {/* Preset Amounts */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  পরিমাণ বেছে নিন (টাকায়)
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
                    আপনার নাম <span className="text-red-500">*</span>
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
                    মোবাইল নম্বর <span className="text-red-500">*</span>
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
                    পেমেন্ট মেথড <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                  >
                    {(settings.mobilePaymentAccounts && settings.mobilePaymentAccounts.filter(a => a.active).length > 0) ? (
                      settings.mobilePaymentAccounts.filter(a => a.active).map(a => (
                        <option key={a.id} value={a.providerName}>{a.providerName}</option>
                      ))
                    ) : (
                      <>
                        <option value="বিকাশ (bKash)">বিকাশ (bKash)</option>
                        <option value="নগদ (Nagad)">নগদ (Nagad)</option>
                      </>
                    )}
                    <option value="Bank Transfer">Bank Transfer</option>
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
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "তথ্য পাঠানো হচ্ছে..." : "লেনদেন তথ্য সাবমিট করুন"}</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
