"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  MessageCircle,
  Share2,
  UserCheck,
} from "lucide-react";
import { recordUserInteraction } from "@/data/notifyClient";
import { getSiteSettings } from "@/data/siteSettingsStorage";
import TeacherApplyModal from "./TeacherApplyModal";

const SOCIAL_ICONS: Record<string, any> = {
  facebook: Facebook,
  youtube: Youtube,
  instagram: Instagram,
  linkedin: Linkedin,
  telegram: Send,
  whatsapp: MessageCircle,
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);

  const settings = getSiteSettings();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const subscriberEmail = email;
      setSubscribed(true);
      setEmail("");
      await recordUserInteraction({
        title: "নতুন কোর্স আপডেট সাবস্ক্রিপশন",
        message: `${subscriberEmail} নিয়মিত ফ্রি কোর্সের আপডেটের জন্য সাবস্ক্রাইব করেছেন।`,
        category: "admission",
      });
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const activeSocialLinks = (settings.socialLinks || []).filter((s) => s.active);

  return (
    <footer
      id="footer"
      className="relative bg-cover bg-center bg-no-repeat text-white overflow-hidden py-16 border-t border-teal-800/40 w-full bg-gradient-to-r from-[#007C7A] to-[#203935]"
    >
      <div className="absolute inset-x-0 bottom-0 h-[70%] pointer-events-none opacity-40 overflow-hidden">
        <Image
          src="/assets/footer-background-2.webp"
          alt=""
          aria-hidden="true"
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Inner Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Subscription Banner Box */}
        <div className="bg-[#034D46] border border-teal-600/40 rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl mb-16">
          <h3 className="text-xl sm:text-2xl font-black text-white text-center lg:text-left leading-snug">
            নিয়মিত ফ্রি কোর্সের আপডেট পেতে সাবস্ক্রাইব করুন।
          </h3>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center w-full lg:w-auto gap-3.5"
          >
            <div className="w-full sm:w-80">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@mail.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-white text-slate-800 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-300 shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#00A89C] hover:bg-[#00897B] text-white font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95 flex-shrink-0 cursor-pointer"
            >
              <span>{subscribed ? "Subscribed!" : "Submit"}</span>
              <Send className="w-4 h-4 ml-1" />
            </button>
          </form>
        </div>

        {/* 4-Column Navigation & Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-teal-700/60">
          {/* Col 1: প্রধান মেনু */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-lg font-bold text-white tracking-wide border-b border-teal-600/60 pb-2 inline-block">
              প্রধান মেনু
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              {(settings.footerMenuLinks || []).map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.url}
                    className="hover:text-teal-200 flex items-center space-x-1.5 transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-teal-300 flex-shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => setIsTeacherModalOpen(true)}
                  className="hover:text-teal-200 flex items-center space-x-1.5 transition-colors text-left cursor-pointer text-sm font-medium"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-teal-300 flex-shrink-0" />
                  <span>শিক্ষক হিসেবে যুক্ত হন</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: অন্যান্য পলিসি */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-lg font-bold text-white tracking-wide border-b border-teal-600/60 pb-2 inline-block">
              অন্যান্য পলিসি
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              {(settings.footerPolicyLinks || []).map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.url}
                    className="hover:text-teal-200 flex items-center space-x-1.5 transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-teal-300 flex-shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: প্রতিষ্ঠান পরিচিতি */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-lg font-bold text-white tracking-wide border-b border-teal-600/60 pb-2 inline-block">
              কুরআন জীবন
            </h4>
            <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
              আন্তর্জাতিক অনলাইন কুরআন শিক্ষা প্রতিষ্ঠান। আমাদের উদ্দেশ্য বিশ্বজুড়ে মুসলিম উম্মাহর প্রতিটি ঘরে সহীহ কুরআন শিক্ষা পৌঁছে দেওয়া।
            </p>
          </div>

          {/* Col 4: যোগাযোগ করুন */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-lg font-bold text-white tracking-wide border-b border-teal-600/60 pb-2 inline-block">
              যোগাযোগ করুন
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-teal-300 flex-shrink-0" />
                <span className="break-all">{settings.email || "sajibahhamed@gmail.com"}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-teal-300 flex-shrink-0" />
                <span>{settings.phone1 || "01730-986832"}</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-teal-300 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {settings.addressLine1 || "Skinner Hollow Road"} <br />
                  {settings.addressLine2 || "Days Creek, OR 97429"}
                </span>
              </li>
            </ul>

            {/* Social Media Circular Buttons Row */}
            {activeSocialLinks.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-3">
                {activeSocialLinks.map((social) => {
                  const Icon = SOCIAL_ICONS[social.platform.toLowerCase()] || Share2;
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-teal-800/80 hover:bg-teal-600 flex items-center justify-center transition-colors shadow-xs"
                      aria-label={social.label}
                      title={social.label}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Copyright Text */}
      <div className="pt-8 text-center text-xs text-teal-200/80 font-medium">
        <p>{settings.copyrightText || "Copyright © JibonQuran 2026. All Right Reserved."}</p>
      </div>
      {/* Teacher Application Modal */}
      <TeacherApplyModal isOpen={isTeacherModalOpen} onClose={() => setIsTeacherModalOpen(false)} />
    </footer>
  );
}
