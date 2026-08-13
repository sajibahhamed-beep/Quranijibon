"use client";

import { useState, useEffect } from "react";
import {
  SiteSettings,
  SocialLinkItem,
} from "@/data/siteSettingsStorage";
import { fetchSiteSettings, updateAllSiteSettings } from "./actions";
import {
  PhoneCall,
  Save,
  Plus,
  Trash2,
  MessageCircle,
  Mail,
  Share2,
  CheckCircle2,
  Eye,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import Image from "next/image";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Social Link Input
  const [newSocialPlatform, setNewSocialPlatform] = useState("facebook");
  const [newSocialLabel, setNewSocialLabel] = useState("Facebook");
  const [newSocialUrl, setNewSocialUrl] = useState("https://facebook.com");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    const data = await fetchSiteSettings();
    setSettings(data);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    const res = await updateAllSiteSettings(settings);
    setSaving(false);
    if (res.success) {
      setToastMessage("সেটিংস সফলভাবে সংরক্ষিত হয়েছে!");
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  // Social Links Handlers
  const handleAddSocialLink = () => {
    if (!settings || !newSocialUrl) return;
    const newLink: SocialLinkItem = {
      id: Date.now().toString(),
      platform: newSocialPlatform,
      label: newSocialLabel || newSocialPlatform,
      url: newSocialUrl,
      active: true,
    };
    setSettings({
      ...settings,
      socialLinks: [...settings.socialLinks, newLink],
    });
    setNewSocialUrl("");
  };

  const handleDeleteSocialLink = (id: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      socialLinks: settings.socialLinks.filter((item) => item.id !== id),
    });
  };

  const handleToggleSocialLink = (id: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      socialLinks: settings.socialLinks.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      ),
    });
  };

  const handleSocialUrlChange = (id: string, url: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      socialLinks: settings.socialLinks.map((item) =>
        item.id === id ? { ...item, url } : item
      ),
    });
  };

  if (loading || !settings) {
    return (
      <div className="text-center py-20 text-slate-400 font-semibold text-sm">
        ফুটার ও যোগাযোগ সেটিংস লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      {/* Top Header & Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-3">
            <PhoneCall className="w-7 h-7 text-[#00A89C]" />
            <span>ফুটার ও যোগাযোগ সেটিংস</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            ফ্লোটিং হোয়াটসঅ্যাপ হেল্পলাইন, যোগাযোগ নম্বর ও সোশ্যাল মিডিয়া লিঙ্কসমূহ যেকোনো সময় পরিবর্তন করুন।
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center space-x-2 bg-[#00A89C] hover:bg-[#00897B] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#00A89C]/20 active:scale-95 cursor-pointer flex-shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "সংরক্ষণ হচ্ছে..." : "সেটিংস সংরক্ষণ করুন"}</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-bold flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Floating WhatsApp Button Settings */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <MessageCircle className="w-6 h-6 text-emerald-400" />
          <div>
            <h2 className="text-lg font-bold text-white">ফ্লোটিং হোয়াটসঅ্যাপ বাটন সেটিংস</h2>
            <p className="text-xs text-slate-400">ওয়েবসাইটের নিচে ডানে দৃশ্যমান ফ্লোটিং WhatsApp চ্যাট বাটন</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
              হোয়াটসঅ্যাপ ফোন নম্বর (Country Code সহ)
            </label>
            <input
              type="text"
              value={settings.whatsappNumber}
              onChange={(e) =>
                setSettings({ ...settings, whatsappNumber: e.target.value })
              }
              placeholder="8801775551325"
              className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              উদা: 8801775551325 (কোনো + বা স্পেস ছাড়া)
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
              বাটনের টেক্সট (Display Text)
            </label>
            <input
              type="text"
              value={settings.whatsappDisplayText}
              onChange={(e) =>
                setSettings({ ...settings, whatsappDisplayText: e.target.value })
              }
              placeholder="সরাসরি কথা বলুন...."
              className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
            />
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 flex items-center space-x-1.5">
            <Eye className="w-4 h-4 text-slate-500" />
            <span>লাইভ বাটন প্রিভিউ:</span>
          </span>

          <div className="flex items-center rounded-tl-full rounded-bl-full space-x-3 px-5 py-2.5 bg-[#00A89C] text-white font-extrabold text-xs shadow-lg">
            <div className="relative flex items-center justify-center">
              <Image
                src="/assets/whatsapp-logo.png"
                alt="WhatsApp Logo"
                width={20}
                height={20}
                className="w-6 h-6 object-contain"
              />
            </div>
            <span>{settings.whatsappDisplayText || "সরাসরি কথা বলুন...."}</span>
          </div>
        </div>
      </div>

      {/* 2. Contact Helpline, Email & Office Address */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <Mail className="w-6 h-6 text-teal-400" />
          <div>
            <h2 className="text-lg font-bold text-white">হেল্পলাইন, ইমেইল ও অফিসের ঠিকানা</h2>
            <p className="text-xs text-slate-400">ফুটার এবং যোগাযোগ পেজে প্রদর্শিত সরাসরি তথ্য</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
              হেল্পলাইন নম্বর ১
            </label>
            <input
              type="text"
              value={settings.phone1}
              onChange={(e) => setSettings({ ...settings, phone1: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
              হেল্পলাইন নম্বর ২
            </label>
            <input
              type="text"
              value={settings.phone2}
              onChange={(e) => setSettings({ ...settings, phone2: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
              সাপোর্ট ইমেইল
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
              অফিস ঠিকানা (লাইন ১)
            </label>
            <input
              type="text"
              value={settings.addressLine1}
              onChange={(e) =>
                setSettings({ ...settings, addressLine1: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
              অফিস ঠিকানা (লাইন ২ / দেশ)
            </label>
            <input
              type="text"
              value={settings.addressLine2}
              onChange={(e) =>
                setSettings({ ...settings, addressLine2: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
            কপিরাইট নোটিশ টেক্সট
          </label>
          <input
            type="text"
            value={settings.copyrightText}
            onChange={(e) =>
              setSettings({ ...settings, copyrightText: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
          />
        </div>
      </div>

      {/* 3. Social Media Links Manager */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <Share2 className="w-6 h-6 text-sky-400" />
          <div>
            <h2 className="text-lg font-bold text-white">সোশ্যাল মিডিয়া লিঙ্ক ব্যবস্থাপনা</h2>
            <p className="text-xs text-slate-400">ফুটারের সোশ্যাল মিডিয়া আইকনগুলোর লিঙ্ক পরিবর্তন ও অন/অফ বা ডিলিট করুন</p>
          </div>
        </div>

        {/* Existing Social Links */}
        <div className="space-y-3">
          {settings.socialLinks.map((social) => (
            <div
              key={social.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60"
            >
              <div className="flex items-center space-x-3 w-full sm:w-1/3">
                <span className="w-8 h-8 rounded-full bg-[#00A89C]/20 text-[#00A89C] flex items-center justify-center font-bold text-xs capitalize flex-shrink-0">
                  {social.platform[0]?.toUpperCase()}
                </span>
                <span className="text-sm font-bold text-white">{social.label}</span>
              </div>

              <div className="flex-1 w-full">
                <input
                  type="url"
                  value={social.url}
                  onChange={(e) => handleSocialUrlChange(social.id, e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#00A89C]"
                />
              </div>

              <div className="flex items-center space-x-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => handleToggleSocialLink(social.id)}
                  className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                    social.active
                      ? "text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20"
                      : "text-slate-500 bg-slate-800 hover:bg-slate-700"
                  }`}
                  title={social.active ? "সক্রিয় (Active)" : "নিষ্ক্রিয় (Hidden)"}
                >
                  {social.active ? (
                    <ToggleRight className="w-5 h-5" />
                  ) : (
                    <ToggleLeft className="w-5 h-5" />
                  )}
                  <span>{social.active ? "সক্রিয়" : "লুকানো"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteSocialLink(social.id)}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                  title="লিঙ্কটি মুছুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Social Link */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <h4 className="text-xs font-bold uppercase text-slate-400">নতুন সোশ্যাল মিডিয়া যোগ করুন</h4>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-3">
              <select
                value={newSocialPlatform}
                onChange={(e) => {
                  setNewSocialPlatform(e.target.value);
                  setNewSocialLabel(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1));
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00A89C]"
              >
                <option value="facebook">Facebook</option>
                <option value="youtube">YouTube</option>
                <option value="instagram">Instagram</option>
                <option value="twitter">Twitter / X</option>
                <option value="linkedin">LinkedIn</option>
                <option value="telegram">Telegram</option>
                <option value="tiktok">TikTok</option>
                <option value="pinterest">Pinterest</option>
              </select>
            </div>

            <div className="sm:col-span-7">
              <input
                type="url"
                value={newSocialUrl}
                onChange={(e) => setNewSocialUrl(e.target.value)}
                placeholder="প্রোফাইল বা পেজ লিঙ্ক (https://...)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00A89C]"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="button"
                onClick={handleAddSocialLink}
                className="w-full py-2.5 rounded-xl bg-[#00A89C] hover:bg-[#00897B] text-white text-xs font-bold flex items-center justify-center space-x-1 shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>যোগ করুন</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
