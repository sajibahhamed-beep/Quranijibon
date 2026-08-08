"use client";

import { useState, useEffect } from "react";
import { PageData, PageSection, SectionItem } from "@/data/pagesStorage";
import {
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  FileText,
  Clock,
  AlertTriangle,
  AlertCircle,
  Cookie,
  Settings,
  RefreshCw,
  CheckCircle2,
  EyeOff,
  ShieldCheck,
  Mail,
  Phone,
  Layers,
  HelpCircle,
  Check,
} from "lucide-react";
import {
  getPagesData,
  updatePageData,
  createPage,
  deletePage,
} from "./actions";
import Link from "next/link";

// Available icons for users to pick with friendly labels
const AVAILABLE_ICONS = [
  { name: "FileText", label: "ডকুমেন্ট / ফাইল", icon: FileText },
  { name: "Clock", label: "সময় ও উপস্থিতি", icon: Clock },
  { name: "AlertTriangle", label: "সতর্কবার্তা", icon: AlertTriangle },
  { name: "AlertCircle", label: "জরুরি নোটিশ", icon: AlertCircle },
  { name: "Cookie", label: "কুকিজ", icon: Cookie },
  { name: "Settings", label: "সেটিংস", icon: Settings },
  { name: "RefreshCw", label: "রিফান্ড / ফেরত", icon: RefreshCw },
  { name: "CheckCircle2", label: "সুবিধা / শর্ত", icon: CheckCircle2 },
  { name: "EyeOff", label: "পর্দা ও গোপনীয়তা", icon: EyeOff },
  { name: "ShieldCheck", label: "নিরাপত্তা", icon: ShieldCheck },
  { name: "Mail", label: "ইমেইল বার্তা", icon: Mail },
  { name: "Phone", label: "ফোন ও হেল্পলাইন", icon: Phone },
];

export default function AdminPages() {
  const [pages, setPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<PageData | null>(null);
  const [isCreatingNewPage, setIsCreatingNewPage] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState("");
  const [newPageSlug, setNewPageSlug] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    fetchPages();
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const fetchPages = async () => {
    setLoading(true);
    const data = await getPagesData();
    setPages(data);
    setLoading(false);
  };

  const handleEditClick = (page: PageData) => {
    setEditingPage(JSON.parse(JSON.stringify(page)));
  };

  const handleCancelEdit = () => {
    setEditingPage(null);
  };

  const handleSavePage = async () => {
    if (!editingPage) return;
    setLoading(true);
    await updatePageData(editingPage.id, editingPage);
    await fetchPages();
    setEditingPage(null);
    setLoading(false);
    showNotification("পেজের তথ্য সফলভাবে সেভ করা হয়েছে!");
  };

  const handleCreateNewPage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPageTitle.trim() || !newPageSlug.trim()) return;

    setLoading(true);
    const slugFormatted = newPageSlug
      .toLowerCase()
      .trim()
      .replace(/[^\w\u0980-\u09FF-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const newPage = await createPage({
      id: slugFormatted,
      slug: slugFormatted,
      title: newPageTitle.trim(),
      badge: "তথ্য ও নীতিমালা",
      description: "কুরআন জীবন অনলাইন একাডেমির গুরুত্বপূর্ণ তথ্যাবলী।",
    });

    await fetchPages();
    setIsCreatingNewPage(false);
    setNewPageTitle("");
    setNewPageSlug("");
    setEditingPage(newPage);
    setLoading(false);
    showNotification("নতুন পেজ সফলভাবে তৈরি হয়েছে! এখন সেকশন ও তথ্য যোগ করুন।");
  };

  const handleDeletePage = async (pageId: string) => {
    if (confirm("আপনি কি নিশ্চিতভাবে এই পেজটি মুছে ফেলতে চান?")) {
      setLoading(true);
      await deletePage(pageId);
      await fetchPages();
      if (editingPage?.id === pageId) {
        setEditingPage(null);
      }
      setLoading(false);
      showNotification("পেজটি মুছে ফেলা হয়েছে।");
    }
  };

  // Section Management within Editing Page
  const handleAddSection = () => {
    if (!editingPage) return;
    const newSection: PageSection = {
      id: `sec-${Date.now()}`,
      title: `${editingPage.sections.length + 1}. নতুন সেকশন শিরোনাম`,
      iconName: "FileText",
      iconColorClass: "text-[#00A89C]",
      mainText: "এখানে আপনার সেকশনের মূল বিবরণ সহজ ভাষায় লিখুন।",
      items: [],
      itemStyle: "bullets",
      note: "",
      noteType: "teal",
    };

    setEditingPage({
      ...editingPage,
      sections: [...editingPage.sections, newSection],
    });
  };

  const handleDeleteSection = (sectionId: string) => {
    if (!editingPage) return;
    if (confirm("আপনি কি এই সেকশনটি মুছে ফেলতে চান?")) {
      const updated = editingPage.sections.filter((s) => s.id !== sectionId);
      setEditingPage({ ...editingPage, sections: updated });
    }
  };

  const handleMoveSection = (index: number, direction: "up" | "down") => {
    if (!editingPage) return;
    const newSections = [...editingPage.sections];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    setEditingPage({ ...editingPage, sections: newSections });
  };

  const handleSectionFieldChange = (
    sectionId: string,
    field: keyof PageSection,
    value: any
  ) => {
    if (!editingPage) return;
    const updated = editingPage.sections.map((s) =>
      s.id === sectionId ? { ...s, [field]: value } : s
    );
    setEditingPage({ ...editingPage, sections: updated });
  };

  // Sub-items / Points Management inside a Section
  const handleAddItem = (sectionId: string) => {
    if (!editingPage) return;
    const newItem: SectionItem = {
      id: `item-${Date.now()}`,
      label: "",
      text: "নতুন পয়েন্ট বা বিবরণের টেক্সট",
    };

    const updated = editingPage.sections.map((s) => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: [...(s.items || []), newItem],
        };
      }
      return s;
    });

    setEditingPage({ ...editingPage, sections: updated });
  };

  const handleDeleteItem = (sectionId: string, itemId: string) => {
    if (!editingPage) return;
    const updated = editingPage.sections.map((s) => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: (s.items || []).filter((i) => i.id !== itemId),
        };
      }
      return s;
    });

    setEditingPage({ ...editingPage, sections: updated });
  };

  const handleItemFieldChange = (
    sectionId: string,
    itemId: string,
    field: keyof SectionItem,
    val: string
  ) => {
    if (!editingPage) return;
    const updated = editingPage.sections.map((s) => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: (s.items || []).map((i) =>
            i.id === itemId ? { ...i, [field]: val } : i
          ),
        };
      }
      return s;
    });

    setEditingPage({ ...editingPage, sections: updated });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-emerald-400 font-bold text-sm animate-bounce">
          <Check className="w-5 h-5" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-3">
            <Layers className="w-7 h-7 text-[#00A89C]" />
            <span>পেজ ম্যানেজমেন্ট (ফুটার ও পলিসি পেজসমূহ)</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            কোনো কোডিং ছাড়াই সরাসরি টেক্সট লিখে টার্মস, পলিসি ও অন্যান্য পেজ এডিট করুন এবং নতুন সেকশন যোগ করুন।
          </p>
        </div>

        {!editingPage && (
          <button
            onClick={() => setIsCreatingNewPage(!isCreatingNewPage)}
            className="flex items-center space-x-2 bg-[#00A89C] hover:bg-[#00897B] text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#00A89C]/20 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন পেজ তৈরি করুন</span>
          </button>
        )}
      </div>

      {/* Modal / Card to Create New Page */}
      {isCreatingNewPage && !editingPage && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">নতুন পেজ ইনফরমেশন</h3>
            <button
              onClick={() => setIsCreatingNewPage(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleCreateNewPage} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                পেজের শিরোনাম (যেমন: আমাদের গল্প)
              </label>
              <input
                type="text"
                value={newPageTitle}
                onChange={(e) => {
                  setNewPageTitle(e.target.value);
                  if (!newPageSlug) {
                    setNewPageSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                  }
                }}
                required
                placeholder="যেমন: এফিলিয়েট পলিসি"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00A89C]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                পেজ ইউআরএল স্ল্যাগ (যেমন: affiliate-policy)
              </label>
              <input
                type="text"
                value={newPageSlug}
                onChange={(e) => setNewPageSlug(e.target.value)}
                required
                placeholder="যেমন: affiliate-policy"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00A89C]"
              />
            </div>
            <div className="sm:col-span-2 flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCreatingNewPage(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#00A89C] hover:bg-[#00897B] text-white rounded-xl text-sm font-bold shadow-md"
              >
                পেজ তৈরি সম্পন্ন করুন
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Pages Grid View (When not editing) */}
      {!editingPage ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {pages.map((page) => (
            <div
              key={page.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xl flex flex-col justify-between hover:border-[#00A89C]/50 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-[#00A89C]/15 text-[#00A89C] text-xs font-black px-3 py-1 rounded-full border border-[#00A89C]/30">
                    {page.badge || "তথ্য ও পলিসি"}
                  </span>
                  <span className="text-slate-500 font-mono text-xs">
                    /{page.slug || page.id}
                  </span>
                </div>

                <h2 className="text-2xl font-black text-white group-hover:text-teal-300 transition-colors">
                  {page.title}
                </h2>

                <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                  {page.description || "এই পেজের কোনো বিবরণ লেখা নেই।"}
                </p>

                <div className="pt-2 flex items-center space-x-2 text-xs font-semibold text-slate-400">
                  <Layers className="w-4 h-4 text-[#00A89C]" />
                  <span>মোট সেকশন সংখ্যা: {page.sections?.length || 0} টি</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <Link
                  href={`/${page.slug || page.id}`}
                  target="_blank"
                  className="flex items-center space-x-1.5 text-xs font-bold text-slate-400 hover:text-white px-3 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#00A89C]" />
                  <span>লাইভ পেজ দেখুন</span>
                </Link>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditClick(page)}
                    className="flex items-center space-x-2 bg-[#00A89C] hover:bg-teal-500 text-white px-4 py-2 rounded-xl transition-all font-bold text-xs shadow-md shadow-[#00A89C]/20"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>পেজ ও সেকশন এডিট করুন</span>
                  </button>

                  {/* Allow deleting custom pages except core 4 */}
                  {!["terms", "privacy-policy", "cookie-policy", "refund-policy"].includes(
                    page.id
                  ) && (
                    <button
                      onClick={() => handleDeletePage(page.id)}
                      className="p-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white rounded-xl transition-colors"
                      title="পেজ মুছে ফেলুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Direct Plain-Text Page Editor */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
          {/* Editor Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-bold text-[#00A89C] uppercase tracking-wider">
                পেজ এডিটর (সরাসরি টেক্সট ইনপুট)
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                সম্পাদনা: {editingPage.title}
              </h2>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleCancelEdit}
                className="flex items-center space-x-2 text-slate-400 hover:text-white px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-sm transition-colors"
              >
                <X className="w-4 h-4" />
                <span>বাতিল</span>
              </button>
              <button
                onClick={handleSavePage}
                disabled={loading}
                className="flex items-center space-x-2 text-white px-6 py-2.5 rounded-xl bg-[#00A89C] hover:bg-[#00897B] font-bold text-sm shadow-xl shadow-[#00A89C]/25 transition-all active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? "সংরক্ষণ হচ্ছে..." : "সকল পরিবর্তন সেভ করুন"}</span>
              </button>
            </div>
          </div>

          {/* Page Top Details Form */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-base font-bold text-teal-300">
              ১. পেজের মূল হেডার তথ্য
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                  পেজের মূল টাইটেল (Title)
                </label>
                <input
                  type="text"
                  value={editingPage.title}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, title: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-[#00A89C] focus:outline-none"
                  placeholder="যেমন: টার্মস অ্যান্ড কন্ডিসনস"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                  ছোট ব্যাজ / সাবটাইটেল (Badge / Category)
                </label>
                <input
                  type="text"
                  value={editingPage.badge}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, badge: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-[#00A89C] focus:outline-none"
                  placeholder="যেমন: ব্যবহারকারী নীতিমালা ও নিয়মাবলী"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                হেডার বিবরণ (Description)
              </label>
              <textarea
                value={editingPage.description}
                onChange={(e) =>
                  setEditingPage({ ...editingPage, description: e.target.value })
                }
                rows={2}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-[#00A89C] focus:outline-none leading-relaxed"
                placeholder="পেজ সম্পর্কে সংক্ষেপিত ভূমিকা..."
              />
            </div>
          </div>

          {/* Section Management Area */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-xl font-bold text-white">
                  ২. পেজের সেকশনসমূহ ({editingPage.sections.length} টি)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  প্রতিটি সেকশনের শিরোনাম, আইকন, সাধারণ টেক্সট ও পয়েন্ট আকারে তথ্য সাজান।
                </p>
              </div>

              <button
                onClick={handleAddSection}
                className="flex items-center space-x-2 bg-[#00A89C] hover:bg-[#00897B] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন সেকশন যোগ করুন</span>
              </button>
            </div>

            {/* List of Sections */}
            <div className="space-y-6">
              {editingPage.sections.map((section, sIndex) => {
                return (
                  <div
                    key={section.id}
                    className="bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-lg relative transition-all hover:border-slate-700"
                  >
                    {/* Section Top Controls Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                      <div className="flex items-center space-x-3">
                        <span className="w-7 h-7 rounded-xl bg-teal-500/20 text-[#00A89C] font-black text-xs flex items-center justify-center border border-teal-500/30">
                          {sIndex + 1}
                        </span>
                        <span className="font-bold text-white text-sm">
                          সেকশন #{sIndex + 1}
                        </span>
                      </div>

                      {/* Reorder and Delete Buttons */}
                      <div className="flex items-center space-x-1.5 self-end sm:self-auto">
                        <button
                          type="button"
                          disabled={sIndex === 0}
                          onClick={() => handleMoveSection(sIndex, "up")}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30"
                          title="উপরে নিন"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          disabled={sIndex === editingPage.sections.length - 1}
                          onClick={() => handleMoveSection(sIndex, "down")}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30"
                          title="নিচে নিন"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSection(section.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white ml-2 transition-colors"
                          title="সেকশন ডিলিট করুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Section Title & Icon Picker */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      <div className="md:col-span-7">
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                          সেকশন শিরোনাম (যেমন: ১. সম্মতি ও গ্রহণযোগ্যতা)
                        </label>
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) =>
                            handleSectionFieldChange(section.id, "title", e.target.value)
                          }
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:border-[#00A89C] focus:outline-none"
                          placeholder="সেকশনের নাম লিখুন..."
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                          আইকন সিলেক্ট করুন
                        </label>
                        <select
                          value={section.iconName || "FileText"}
                          onChange={(e) =>
                            handleSectionFieldChange(section.id, "iconName", e.target.value)
                          }
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:border-[#00A89C] focus:outline-none"
                        >
                          {AVAILABLE_ICONS.map((ic) => (
                            <option key={ic.name} value={ic.name}>
                              {ic.label} ({ic.name})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Main Text Content (Direct text input, no HTML needed) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        মূল অনুচ্ছেদ / প্যারাগ্রাফ বিবরণ (সরাসরি টেক্সট লিখুন)
                      </label>
                      <textarea
                        value={section.mainText || ""}
                        onChange={(e) =>
                          handleSectionFieldChange(section.id, "mainText", e.target.value)
                        }
                        rows={3}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-[#00A89C] focus:outline-none leading-relaxed"
                        placeholder="এখানে সাধারণ টেক্সট লিখুন। নতুন লাইনের জন্য Enter চাপুন..."
                      />
                    </div>

                    {/* Sub-items / Points Section */}
                    <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                            উপ-পয়েন্ট / বিস্তারিত কার্ড তালিকা (অপশনাল)
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            যদি সেকশনে একাধিক নিয়ম বা শর্ত পয়েন্ট আকারে দেখাতে চান
                          </p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <select
                            value={section.itemStyle || "bullets"}
                            onChange={(e) =>
                              handleSectionFieldChange(section.id, "itemStyle", e.target.value)
                            }
                            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none"
                          >
                            <option value="bullets">বুলেট পয়েন্ট স্টাইল</option>
                            <option value="cards">বক্স কার্ড স্টাইল</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => handleAddItem(section.id)}
                            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 px-3 py-1.5 rounded-lg text-xs font-bold border border-teal-500/20"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>পয়েন্ট যোগ করুন</span>
                          </button>
                        </div>
                      </div>

                      {/* Items list */}
                      {section.items && section.items.length > 0 && (
                        <div className="space-y-3 pt-2">
                          {section.items.map((item, iIndex) => (
                            <div
                              key={item.id}
                              className="flex flex-col sm:flex-row items-start gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800"
                            >
                              <span className="text-xs font-bold text-slate-500 mt-2 sm:mt-2.5">
                                • {iIndex + 1}
                              </span>

                              {section.itemStyle === "cards" && (
                                <div className="w-full sm:w-1/3">
                                  <input
                                    type="text"
                                    value={item.label || ""}
                                    onChange={(e) =>
                                      handleItemFieldChange(
                                        section.id,
                                        item.id,
                                        "label",
                                        e.target.value
                                      )
                                    }
                                    placeholder="লেবেল (উদা: ক. উপস্থিতি:)"
                                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00A89C] font-bold"
                                  />
                                </div>
                              )}

                              <div className="w-full flex-1">
                                <input
                                  type="text"
                                  value={item.text}
                                  onChange={(e) =>
                                    handleItemFieldChange(
                                      section.id,
                                      item.id,
                                      "text",
                                      e.target.value
                                    )
                                  }
                                  placeholder="পয়েন্টের বিস্তারিত বিবরণ লিখুন..."
                                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00A89C]"
                                />
                              </div>

                              <button
                                type="button"
                                onClick={() => handleDeleteItem(section.id, item.id)}
                                className="p-2 text-slate-500 hover:text-rose-400 self-end sm:self-auto"
                                title="পয়েন্ট মুছুন"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Highlight Note Box (Optional) */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-300">
                          হাইলাইট নোট বক্স (Optional Alert Note)
                        </label>
                        <select
                          value={section.noteType || "teal"}
                          onChange={(e) =>
                            handleSectionFieldChange(section.id, "noteType", e.target.value)
                          }
                          className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-0.5 text-xs text-slate-300"
                        >
                          <option value="teal">সবুজ বক্স (Teal Info)</option>
                          <option value="amber">হলুদ বক্স (Amber Alert)</option>
                          <option value="rose">লাল বক্স (Rose Warning)</option>
                        </select>
                      </div>
                      <input
                        type="text"
                        value={section.note || ""}
                        onChange={(e) =>
                          handleSectionFieldChange(section.id, "note", e.target.value)
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs focus:border-[#00A89C] focus:outline-none"
                        placeholder="যেমন: আবেদন পাওয়ার ২৪ থেকে ৪৮ ঘণ্টার মধ্যে সমাধান করা হবে।"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Add Section Button */}
            <button
              type="button"
              onClick={handleAddSection}
              className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-800 hover:border-[#00A89C] text-slate-400 hover:text-teal-300 font-bold text-sm flex items-center justify-center space-x-2 transition-all bg-slate-950/40 hover:bg-[#00A89C]/5"
            >
              <Plus className="w-5 h-5" />
              <span>+ নতুন সেকশন যোগ করুন</span>
            </button>
          </div>

          {/* Bottom Save & Cancel Row */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800">
            <button
              onClick={handleCancelEdit}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm"
            >
              বাতিল
            </button>
            <button
              onClick={handleSavePage}
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-[#00A89C] hover:bg-[#00897B] text-white font-bold text-sm shadow-xl shadow-[#00A89C]/30 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? "সংরক্ষণ হচ্ছে..." : "সকল পরিবর্তন সেভ করুন"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
