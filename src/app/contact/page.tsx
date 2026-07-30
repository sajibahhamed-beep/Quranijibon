import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export const metadata = {
  title: "যোগাযোগ করুন | কুরআন জীবন",
  description: "কুরআন জীবনের সরাসরি কাস্টমার সাপোর্ট, হোয়াটসঅ্যাপ হেল্পলাইন এবং যোগাযোগের ঠিকানা।",
};

export default function ContactPage() {
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
              ২৪/৭ স্টুডেন্ট সাপোর্ট
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              যোগাযোগ করুন
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-lg">
              কোর্স রেজিস্ট্রেশন, ফ্রি ট্রায়াল ক্লাস বা অন্য যেকোনো তথ্যের জন্য আমাদের টিমকে বার্তা পাঠান।
            </p>
          </div>
        </div>

        {/* Right Mosque Vector Image Aligned to Bottom Right */}
        <div className="absolute right-0 bottom-0 pointer-events-none h-44 sm:h-56 lg:h-64 hidden md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/Section → sec-botm-mckp-768x115.webp.png"
            alt="Mosque Silhouette Vector"
            className="h-full w-auto object-contain object-bottom-right opacity-90"
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                <h2 className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-4">
                  সরাসরি যোগাযোগ
                </h2>

                <div className="space-y-5">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#00A89C] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">হেল্পলাইন ফোন</h4>
                      <p className="text-slate-600 text-sm font-medium">01730-986832</p>
                      <p className="text-slate-600 text-sm font-medium">+880 1775-551325</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#00A89C] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">ইমেইল সাপোর্ট</h4>
                      <p className="text-slate-600 text-sm font-medium">sajibahhamed@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#00A89C] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">অফিস ঠিকানা</h4>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed">
                        Skinner Hollow Road<br />
                        Days Creek, OR 97429
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href="https://wa.me/8801775551325"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>হোয়াটসঅ্যাপে সরাসরি মেসেজ করুন</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                <h3 className="text-2xl font-black text-slate-900">ইনকোয়ারি বার্তা পাঠান</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">আপনার নাম</label>
                      <input
                        type="text"
                        placeholder="উদা: মাহমুদ হাসান"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">ফোন নম্বর</label>
                      <input
                        type="tel"
                        placeholder="01700-000000"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">ইমেইল ঠিকানা</label>
                    <input
                      type="email"
                      placeholder="your@mail.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">বার্তা বা প্রশ্ন</label>
                    <textarea
                      rows={4}
                      placeholder="আপনার প্রশ্ন বা মতামত সংক্ষেপে লিখুন..."
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#00A89C] hover:bg-[#00897B] text-white font-black text-sm flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95"
                  >
                    <span>মেসেজ জমা দিন</span>
                    <Send className="w-4 h-4 ml-1" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
