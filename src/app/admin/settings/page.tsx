"use client";

import { useState, useEffect, useRef } from "react";
import {
  SiteSettings,
  SocialLinkItem,
  MobilePaymentAccount,
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
  Wallet,
  Building2,
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  Twitter,
  Send,
  Globe,
  Video,
  Phone,
  Upload,
  ImageIcon,
  Loader2,
} from "lucide-react";
import Image from "next/image";

const SOCIAL_ICON_COMPONENTS: Record<string, any> = {
  facebook: Facebook,
  youtube: Youtube,
  instagram: Instagram,
  whatsapp: MessageCircle,
  telegram: Send,
  twitter: Twitter,
  x: Twitter,
  linkedin: Linkedin,
  globe: Globe,
  website: Globe,
  mail: Mail,
  phone: Phone,
  video: Video,
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Mobile Payment Account State
  const [newProviderName, setNewProviderName] = useState("বিকাশ (bKash)");
  const [newCustomLogoUrl, setNewCustomLogoUrl] = useState("");
  const [newAccountNumber, setNewAccountNumber] = useState("");
  const [newAccountType, setNewAccountType] = useState("পার্সোনাল (Send Money)");
  const [newInstructions, setNewInstructions] = useState("বিকাশ সেন্ড মানি করুন (পার্সোনাল)");
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  // Upload Logo Handler
  const handleUploadLogoFile = async (e: React.ChangeEvent<HTMLInputElement>, accountId?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingLogo(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success && data.url) {
        if (accountId) {
          handleUpdateMobileAccount(accountId, { customLogoUrl: data.url, logoType: "custom" });
        } else {
          setNewCustomLogoUrl(data.url);
        }
      } else {
        alert("লোগো আপলোড ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
      }
    } catch (err) {
      console.error("Logo upload error:", err);
      alert("লোগো আপলোড করতে সমস্যা হয়েছে।");
    } finally {
      setIsUploadingLogo(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Mobile Payment Accounts Handlers
  const handleAddMobileAccount = () => {
    if (!settings || !newAccountNumber.trim()) return;
    const newAccount: MobilePaymentAccount = {
      id: Date.now().toString(),
      providerName: newProviderName.trim() || "মোবাইল ব্যাংকিং",
      logoType: "custom",
      customLogoUrl: newCustomLogoUrl.trim(),
      number: newAccountNumber.trim(),
      accountType: newAccountType.trim() || "পার্সোনাল",
      instructions: newInstructions.trim() || "সেন্ড মানি করুন",
      active: true,
    };

    const updatedAccounts = [...(settings.mobilePaymentAccounts || []), newAccount];
    setSettings({
      ...settings,
      mobilePaymentAccounts: updatedAccounts,
    });

    setNewAccountNumber("");
    setNewCustomLogoUrl("");
    setNewInstructions("সেন্ড মানি করুন (পার্সোনাল)");
  };

  const handleDeleteMobileAccount = (id: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      mobilePaymentAccounts: (settings.mobilePaymentAccounts || []).filter((a) => a.id !== id),
    });
  };

  const handleToggleMobileAccount = (id: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      mobilePaymentAccounts: (settings.mobilePaymentAccounts || []).map((a) =>
        a.id === id ? { ...a, active: !a.active } : a
      ),
    });
  };

  const handleUpdateMobileAccount = (id: string, updates: Partial<MobilePaymentAccount>) => {
    if (!settings) return;
    setSettings({
      ...settings,
      mobilePaymentAccounts: (settings.mobilePaymentAccounts || []).map((a) =>
        a.id === id ? { ...a, ...updates } : a
      ),
    });
  };

  // Social Links Handlers
  const handleAddSocialLink = () => {
    if (!settings || !newSocialUrl) return;
    const newLink: SocialLinkItem = {
      id: Date.now().toString(),
      platform: newSocialPlatform,
      label: newSocialLabel.trim() || newSocialPlatform,
      url: newSocialUrl.trim(),
      active: true,
    };
    setSettings({
      ...settings,
      socialLinks: [...(settings.socialLinks || []), newLink],
    });
    setNewSocialUrl("");
  };

  const handleDeleteSocialLink = (id: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      socialLinks: (settings.socialLinks || []).filter((item) => item.id !== id),
    });
  };

  const handleToggleSocialLink = (id: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      socialLinks: (settings.socialLinks || []).map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      ),
    });
  };

  const handleUpdateSocialLink = (id: string, updates: Partial<SocialLinkItem>) => {
    if (!settings) return;
    setSettings({
      ...settings,
      socialLinks: (settings.socialLinks || []).map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    });
  };

  if (loading || !settings) {
    return (
      <div className="text-center py-20 text-slate-400 font-semibold text-sm">
        সাইট ও যোগাযোগ সেটিংস লোড হচ্ছে...
      </div>
    );
  }

  const renderPaymentLogo = (account: MobilePaymentAccount) => {
    if (account.customLogoUrl) {
      return (
        <div className="w-11 h-11 rounded-xl bg-white p-1 border border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-md">
          <Image
            src={account.customLogoUrl}
            alt={account.providerName}
            width={40}
            height={40}
            className="w-full h-full object-contain"
          />
        </div>
      );
    }

    return (
      <div className="w-11 h-11 rounded-xl bg-[#00A89C] flex items-center justify-center text-white font-black text-xs flex-shrink-0 shadow-md uppercase">
        {account.providerName.substring(0, 3)}
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      {/* Top Header & Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-3">
            <PhoneCall className="w-7 h-7 text-[#00A89C]" />
            <span>সাইট, ব্যাংক ও যোগাযোগ সেটিংস</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            ফ্লোটিং হোয়াটসঅ্যাপ, ব্যাংক ও বিকাশ/নগদ অ্যাকাউন্ট ডিটেইলস, হেল্পলাইন ও সোশ্যাল মিডিয়া পরিচালনা করুন।
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

      {/* 1. Bank Account Details */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-[#00A89C] flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">১. ব্যাংক অ্যাকাউন্ট ডিটেইলস (Bank Transfer)</h2>
            <p className="text-xs text-slate-400">সাদাকা ও হাদিয়া পাতায় প্রদর্শিত মূল ব্যাংক অ্যাকাউন্ট</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
              ব্যাংক নাম
            </label>
            <input
              type="text"
              value={settings.bankDetails?.bankName || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  bankDetails: {
                    ...(settings.bankDetails || { accountName: "", accountNumber: "", branch: "" }),
                    bankName: e.target.value,
                  },
                })
              }
              placeholder="উদা: ইসলামী ব্যাংক বাংলাদেশ লিমিটেড"
              className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
              অ্যাকাউন্ট নাম
            </label>
            <input
              type="text"
              value={settings.bankDetails?.accountName || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  bankDetails: {
                    ...(settings.bankDetails || { bankName: "", accountNumber: "", branch: "" }),
                    accountName: e.target.value,
                  },
                })
              }
              placeholder="উদা: কুরআন জীবন একাডেমি"
              className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
              অ্যাকাউন্ট নম্বর
            </label>
            <input
              type="text"
              value={settings.bankDetails?.accountNumber || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  bankDetails: {
                    ...(settings.bankDetails || { bankName: "", accountName: "", branch: "" }),
                    accountNumber: e.target.value,
                  },
                })
              }
              placeholder="উদা: ২০৫০৭৭৭৮৮৮৯৯৯০০০"
              className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
              শাখা (Branch)
            </label>
            <input
              type="text"
              value={settings.bankDetails?.branch || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  bankDetails: {
                    ...(settings.bankDetails || { bankName: "", accountName: "", accountNumber: "" }),
                    branch: e.target.value,
                  },
                })
              }
              placeholder="উদা: ধানমণ্ডি শাখা, ঢাকা"
              className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
            />
          </div>
        </div>
      </div>

      {/* 2. Dynamic Mobile Banking & Payment Systems */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">২. ডাইনামিক মোবাইল ব্যাংকিং ও ওয়ালেট (Logo Upload System)</h2>
            <p className="text-xs text-slate-400">যে কোনো পেমেন্ট সিস্টেমের নাম, নিজস্ব লোগো আপলোড ও নম্বর ডাইনামিকভাবে পরিচালনা করুন</p>
          </div>
        </div>

        {/* List of Existing Mobile Accounts */}
        <div className="space-y-3">
          {(settings.mobilePaymentAccounts || []).map((account) => (
            <div
              key={account.id}
              className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60"
            >
              <div className="flex items-center space-x-3 w-full lg:w-1/3">
                <div className="relative group">
                  {renderPaymentLogo(account)}
                  <label
                    htmlFor={`upload-logo-${account.id}`}
                    className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
                    title="লোগো পরিবর্তন করুন"
                  >
                    <Upload className="w-3.5 h-3.5" />
                  </label>
                  <input
                    id={`upload-logo-${account.id}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUploadLogoFile(e, account.id)}
                    className="hidden"
                  />
                </div>

                <div className="flex-1">
                  <input
                    type="text"
                    value={account.providerName}
                    onChange={(e) =>
                      handleUpdateMobileAccount(account.id, { providerName: e.target.value })
                    }
                    className="bg-transparent font-bold text-white text-sm border-b border-transparent focus:border-[#00A89C] focus:outline-none px-1 py-0.5 w-full"
                  />
                  <div className="text-[11px] text-slate-400 px-1">
                    {account.accountType || "পার্সোনাল"}
                  </div>
                </div>
              </div>

              {/* Number & Type Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 flex-1 w-full">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">নম্বর</label>
                  <input
                    type="text"
                    value={account.number}
                    onChange={(e) =>
                      handleUpdateMobileAccount(account.id, { number: e.target.value })
                    }
                    placeholder="01700-000000"
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-[#00A89C]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">অ্যাকাউন্টের ধরন</label>
                  <input
                    type="text"
                    value={account.accountType}
                    onChange={(e) =>
                      handleUpdateMobileAccount(account.id, { accountType: e.target.value })
                    }
                    placeholder="পার্সোনাল / মার্চেন্ট"
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#00A89C]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">নির্দেশনা বার্তা</label>
                  <input
                    type="text"
                    value={account.instructions || ""}
                    onChange={(e) =>
                      handleUpdateMobileAccount(account.id, { instructions: e.target.value })
                    }
                    placeholder="সেন্ড মানি করুন"
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#00A89C]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 self-end lg:self-center">
                <button
                  type="button"
                  onClick={() => handleToggleMobileAccount(account.id)}
                  className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                    account.active
                      ? "text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20"
                      : "text-slate-500 bg-slate-800 hover:bg-slate-700"
                  }`}
                  title={account.active ? "সক্রিয় (Active)" : "নিষ্ক্রিয় (Hidden)"}
                >
                  {account.active ? (
                    <ToggleRight className="w-5 h-5" />
                  ) : (
                    <ToggleLeft className="w-5 h-5" />
                  )}
                  <span>{account.active ? "সক্রিয়" : "লুকানো"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteMobileAccount(account.id)}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer"
                  title="মুছুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Mobile Payment System Card with File Upload */}
        <div className="pt-4 border-t border-slate-800/80 space-y-4">
          <h4 className="text-xs font-bold uppercase text-teal-400 flex items-center space-x-1.5">
            <Plus className="w-4 h-4" />
            <span>নতুন মোবাইল ব্যাংকিং / পেমেন্ট সিস্টেম যোগ করুন (লোগো আপলোড সহ)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">
                পেমেন্ট সিস্টেমের নাম
              </label>
              <input
                type="text"
                value={newProviderName}
                onChange={(e) => setNewProviderName(e.target.value)}
                placeholder="যেমন: বিকাশ / নগদ / রকেট / উপায়"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00A89C]"
              />
            </div>

            {/* Direct Logo Upload Option */}
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">
                লোগো আপলোড করুন (Upload Logo)
              </label>
              <div className="flex items-center space-x-2">
                <label className="flex-1 py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white hover:border-[#00A89C] flex items-center justify-center space-x-1.5 cursor-pointer transition-all">
                  {isUploadingLogo ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#00A89C]" />
                  ) : (
                    <Upload className="w-4 h-4 text-[#00A89C]" />
                  )}
                  <span>{isUploadingLogo ? "আপলোড হচ্ছে..." : newCustomLogoUrl ? "লোগো পরিবর্তন" : "ফাইল সিলেক্ট"}</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUploadLogoFile(e)}
                    className="hidden"
                    disabled={isUploadingLogo}
                  />
                </label>

                {newCustomLogoUrl && (
                  <div className="w-9 h-9 rounded-xl bg-white p-1 border border-slate-700 flex items-center justify-center flex-shrink-0 relative group">
                    <Image
                      src={newCustomLogoUrl}
                      alt="Logo preview"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setNewCustomLogoUrl("")}
                      className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full p-0.5 text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"
                      title="মুছুন"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">
                ফোন / অ্যাকাউন্ট নম্বর
              </label>
              <input
                type="text"
                value={newAccountNumber}
                onChange={(e) => setNewAccountNumber(e.target.value)}
                placeholder="01700-000000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-[#00A89C]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">
                অ্যাকাউন্টের ধরন
              </label>
              <select
                value={newAccountType}
                onChange={(e) => {
                  setNewAccountType(e.target.value);
                  setNewInstructions(
                    e.target.value.includes("মার্চেন্ট")
                      ? "মার্চেন্ট পেমেন্ট করুন"
                      : "সেন্ড মানি করুন (পার্সোনাল)"
                  );
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00A89C]"
              >
                <option value="পার্সোনাল (Send Money)">পার্সোনাল (Send Money)</option>
                <option value="মার্চেন্ট (Payment)">মার্চেন্ট (Payment)</option>
                <option value="এজেন্ট (Cash Out)">এজেন্ট (Cash Out)</option>
              </select>
            </div>

            <div className="sm:col-span-2 md:col-span-3">
              <label className="block text-[11px] font-bold text-slate-300 mb-1">
                পেমেন্ট নির্দেশিকা টেক্সট
              </label>
              <input
                type="text"
                value={newInstructions}
                onChange={(e) => setNewInstructions(e.target.value)}
                placeholder="যেমন: বিকাশ সেন্ড মানি করুন (পার্সোনাল)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00A89C]"
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleAddMobileAccount}
                className="w-full py-2.5 rounded-xl bg-[#00A89C] hover:bg-[#00897B] text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-md cursor-pointer active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>পদ্ধতি যোগ করুন</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Floating WhatsApp Button Settings */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <MessageCircle className="w-6 h-6 text-emerald-400" />
          <div>
            <h2 className="text-lg font-bold text-white">৩. ফ্লোটিং হোয়াটসঅ্যাপ বাটন সেটিংস</h2>
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

      {/* 4. Contact Helpline, Email & Office Address */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <Mail className="w-6 h-6 text-teal-400" />
          <div>
            <h2 className="text-lg font-bold text-white">৪. হেল্পলাইন, ইমেইল ও অফিসের ঠিকানা</h2>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
              ঠিকানা লাইন ১
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
              ঠিকানা লাইন ২
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
            কপিরাইট টেক্সট (Copyright)
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

      {/* 5. Dynamic Social Media Links Manager */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <Share2 className="w-6 h-6 text-sky-400" />
          <div>
            <h2 className="text-lg font-bold text-white">৫. সোশ্যাল মিডিয়া লিঙ্ক ও আইকন ব্যবস্থাপনা</h2>
            <p className="text-xs text-slate-400">ফুটারের সোশ্যাল মিডিয়া আইকন, নাম ও লিংক ডাইনামিকালি যোগ, পরিবর্তন বা অন/অফ করুন</p>
          </div>
        </div>

        {/* Existing Social Links */}
        <div className="space-y-3">
          {(settings.socialLinks || []).map((social) => {
            const IconComp = SOCIAL_ICON_COMPONENTS[social.platform.toLowerCase()] || Share2;
            return (
              <div
                key={social.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60"
              >
                {/* Icon & Label */}
                <div className="flex items-center space-x-3 w-full sm:w-1/3">
                  <div className="w-9 h-9 rounded-xl bg-[#00A89C]/20 text-[#00A89C] flex items-center justify-center flex-shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={social.label}
                      onChange={(e) =>
                        handleUpdateSocialLink(social.id, { label: e.target.value })
                      }
                      className="bg-transparent font-bold text-white text-sm border-b border-transparent focus:border-[#00A89C] focus:outline-none px-1 py-0.5 w-full"
                    />
                    <div className="text-[10px] text-slate-400 px-1 uppercase">
                      আইকন: {social.platform}
                    </div>
                  </div>
                </div>

                {/* URL Input */}
                <div className="flex-1 w-full">
                  <input
                    type="url"
                    value={social.url}
                    onChange={(e) =>
                      handleUpdateSocialLink(social.id, { url: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#00A89C]"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleToggleSocialLink(social.id)}
                    className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
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
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer"
                    title="লিঙ্কটি মুছুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add New Social Link */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <h4 className="text-xs font-bold uppercase text-teal-400 flex items-center space-x-1.5">
            <Plus className="w-4 h-4" />
            <span>নতুন সোশ্যাল মিডিয়া বা ওয়েবসাইট লিঙ্ক যোগ করুন</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div className="sm:col-span-3">
              <label className="block text-[11px] font-bold text-slate-300 mb-1">
                আইকন নির্বাচন
              </label>
              <select
                value={newSocialPlatform}
                onChange={(e) => {
                  setNewSocialPlatform(e.target.value);
                  setNewSocialLabel(
                    e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                  );
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00A89C]"
              >
                <option value="facebook">Facebook (আইকন)</option>
                <option value="youtube">YouTube (আইকন)</option>
                <option value="instagram">Instagram (আইকন)</option>
                <option value="whatsapp">WhatsApp (আইকন)</option>
                <option value="telegram">Telegram (আইকন)</option>
                <option value="twitter">Twitter / X (আইকন)</option>
                <option value="linkedin">LinkedIn (আইকন)</option>
                <option value="globe">Website / Globe (ওয়েবসাইট আইকন)</option>
                <option value="mail">Email / Mail (মেইল আইকন)</option>
                <option value="phone">Phone / কল আইকন</option>
                <option value="video">Video / ভিডিও আইকন</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-[11px] font-bold text-slate-300 mb-1">
                নাম / লেবেল (Label)
              </label>
              <input
                type="text"
                value={newSocialLabel}
                onChange={(e) => setNewSocialLabel(e.target.value)}
                placeholder="যেমন: Facebook Page"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00A89C]"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-[11px] font-bold text-slate-300 mb-1">
                লিঙ্ক URL (https://...)
              </label>
              <input
                type="url"
                value={newSocialUrl}
                onChange={(e) => setNewSocialUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00A89C]"
              />
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="button"
                onClick={handleAddSocialLink}
                className="w-full py-2.5 rounded-xl bg-[#00A89C] hover:bg-[#00897B] text-white text-xs font-bold flex items-center justify-center space-x-1 shadow-md cursor-pointer active:scale-95 transition-all"
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
