"use client";

import { useState } from "react";
import { X, CheckCircle2, UserCheck, Phone, Mail, Award, Clock, HeartHandshake, Sparkles, Loader2 } from "lucide-react";
import { recordUserInteraction } from "@/data/notifyClient";

interface TeacherApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TeacherApplyModal({ isOpen, onClose }: TeacherApplyModalProps) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"পুরুষ" | "মহিলা">("পুরুষ");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("১-২ বছর");
  const [workType, setWorkType] = useState<"স্বেচ্ছাসেবী" | "স্বল্প সম্মানী">("স্বল্প সম্মানী");
  const [message, setMessage] = useState("");
  
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !qualification) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          gender,
          phone,
          email,
          qualification,
          experience,
          workType,
          message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setName("");
    setPhone("");
    setEmail("");
    setQualification("");
    setMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-white">আলহামদুলিল্লাহ! আপনার আবেদনটি জমা হয়েছে</h2>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              কুরআন জীবন মেন্টরশিপ প্রোগ্রামে আবেদন করার জন্য ধন্যবাদ। আমাদের একাডেমি টিম আপনার শিক্ষকতার তথ্য পরীক্ষা করে খুব শীঘ্রই যোগাযোগ করবে, ইনশাআল্লাহ।
            </p>
            <div className="pt-4">
              <button
                onClick={handleResetAndClose}
                className="px-6 py-3 rounded-xl bg-[#00A89C] text-white font-bold text-sm hover:bg-[#00897B] transition-all shadow-lg shadow-[#00A89C]/20"
              >
                ঠিক আছে
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Modal Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 bg-[#00A89C]/10 border border-[#00A89C]/30 text-[#00A89C] text-xs font-bold px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>কুরআন শিক্ষক ও মেন্টরশিপ ফর্ম</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">শিক্ষক হিসেবে যুক্ত হতে আবেদন করুন</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                স্বেচ্ছায় কিংবা স্বল্প সম্মানীতে ঘরে বসেই অনলাইনে দ্বীনি তালীম ছড়িয়ে দিন
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-200 mb-1">আপনার পূর্ণ নাম *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="উদা: হাফেজ রফিকুল ইসলাম"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-200 mb-1">শাখা / লিঙ্গ *</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as "পুরুষ" | "মহিলা")}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                  >
                    <option value="পুরুষ">পুরুষ (পুরুষ শিক্ষক)</option>
                    <option value="মহিলা">মহিলা (মহিলা শিক্ষিকা)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-200 mb-1">ফোন / হোয়াটসঅ্যাপ নম্বর *</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01700-000000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-200 mb-1">ইমেইল (ঐচ্ছিক)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-200 mb-1">দ্বীনি ও শিক্ষাগত যোগ্যতা *</label>
                <input
                  type="text"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  placeholder="উদা: হাফেজে কুরআন / দাওরায়ে হাদিস / তাজবীদ কোর্স সম্পন্ন"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-200 mb-1">শিক্ষকতার অভিজ্ঞতা</label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                  >
                    <option value="নতুন (০ বছর)">নতুন (০ বছর)</option>
                    <option value="১-২ বছর">১-২ বছর</option>
                    <option value="৩-৫ বছর">৩-৫ বছর</option>
                    <option value="৫+ বছর">৫+ বছর</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-200 mb-1">কাজ করার ধরন *</label>
                  <select
                    value={workType}
                    onChange={(e) => setWorkType(e.target.value as "স্বেচ্ছাসেবী" | "স্বল্প সম্মানী")}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                  >
                    <option value="স্বল্প সম্মানী">স্বল্প সম্মানী (Low Wages/Honorarium)</option>
                    <option value="স্বেচ্ছাসেবী">স্বেচ্ছাসেবী (Voluntary / সদকায়ে জারিয়া)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-200 mb-1">সংক্ষিপ্ত পরিচিতি বা বার্তা (ঐচ্ছিক)</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="আপনার শিক্ষকতার অভিজ্ঞতা, পছন্দের সময় বা বিষয়ে সংক্ষেপে লিখুন..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition-colors"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-[#00A89C] hover:bg-[#00897B] text-white font-bold transition-all shadow-md flex items-center space-x-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>জমা হচ্ছে...</span>
                    </>
                  ) : (
                    <span>আবেদন জমা দিন</span>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
