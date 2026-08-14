"use client";

import { useState, useEffect } from "react";
import {
  HelpCircle,
  Plus,
  Search,
  Edit3,
  Trash2,
  X,
  Check,
  Loader2,
  Eye,
  EyeOff,
  ArrowUpDown,
} from "lucide-react";
import { FaqItem } from "@/data/faqsStorage";

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("সব");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);

  // Form Fields
  const [formQuestion, setFormQuestion] = useState("");
  const [formAnswer, setFormAnswer] = useState("");
  const [formCategory, setFormCategory] = useState("ক্লাস সংক্রান্ত");
  const [formOrder, setFormOrder] = useState<number>(1);
  const [formIsActive, setFormIsActive] = useState(true);

  const categories = ["সব", "ক্লাস সংক্রান্ত", "শিক্ষক সংক্রান্ত", "ফি ও স্কলারশিপ", "কোর্স সংক্রান্ত", "ভর্তি সংক্রান্ত", "সাধারণ"];

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/faqs");
      const data = await res.json();
      if (data.success) {
        setFaqs(data.faqs || []);
      }
    } catch (err) {
      showStatus("error", "FAQ তালিকা লোড করতে ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const showStatus = (type: "success" | "error", text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const openCreateModal = () => {
    setEditingFaq(null);
    setFormQuestion("");
    setFormAnswer("");
    setFormCategory("ক্লাস সংক্রান্ত");
    setFormOrder(faqs.length + 1);
    setFormIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (faq: FaqItem) => {
    setEditingFaq(faq);
    setFormQuestion(faq.question);
    setFormAnswer(faq.answer);
    setFormCategory(faq.category);
    setFormOrder(faq.order);
    setFormIsActive(faq.isActive);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestion.trim() || !formAnswer.trim()) {
      showStatus("error", "দয়া করে প্রশ্ন ও উত্তর সঠিকভাবে প্রদান করুন");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        question: formQuestion,
        answer: formAnswer,
        category: formCategory,
        order: Number(formOrder),
        isActive: formIsActive,
      };

      if (editingFaq) {
        const res = await fetch(`/api/faqs/${editingFaq.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showStatus("success", "FAQ সফলভাবে আপডেট করা হয়েছে");
          setIsModalOpen(false);
          await fetchFaqs();
        } else {
          showStatus("error", data.message || "FAQ আপডেট ব্যর্থ হয়েছে");
        }
      } else {
        const res = await fetch("/api/faqs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showStatus("success", "নতুন FAQ সফলভাবে তৈরি করা হয়েছে");
          setIsModalOpen(false);
          await fetchFaqs();
        } else {
          showStatus("error", data.message || "FAQ তৈরি করতে ব্যর্থ হয়েছে");
        }
      }
    } catch (err) {
      showStatus("error", "সার্ভার এরর হয়েছে");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (faq: FaqItem) => {
    try {
      const res = await fetch(`/api/faqs/${faq.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !faq.isActive }),
      });
      const data = await res.json();
      if (data.success) {
        showStatus("success", `FAQ ${!faq.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"} করা হয়েছে`);
        await fetchFaqs();
      }
    } catch (err) {
      showStatus("error", "অবস্থা পরিবর্তন ব্যর্থ হয়েছে");
    }
  };

  const handleDelete = async (id: string, question: string) => {
    if (!confirm(`আপনি কি নিশ্চিতভাবে এই প্রশ্নটি মুছে ফেলতে চান?\n"${question}"`)) return;

    try {
      const res = await fetch(`/api/faqs/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showStatus("success", "FAQ মুছে ফেলা হয়েছে");
        await fetchFaqs();
      } else {
        showStatus("error", data.message || "মুছে ফেলা ব্যর্থ হয়েছে");
      }
    } catch (err) {
      showStatus("error", "মুছে ফেলার সময় সমস্যা হয়েছে");
    }
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategory === "সব" || faq.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Toast Banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between border shadow-xs ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-800"
              : "bg-rose-50 border-rose-300 text-rose-800"
          }`}
        >
          <span>{statusMessage.text}</span>
          <button onClick={() => setStatusMessage(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#00A89C]" />
            FAQ ও জিজ্ঞাসাবলী ব্যবস্থাপনা (FAQ Management)
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            ওয়েবসাইটের সাধারণ জিজ্ঞাসাবলির প্রশ্ন ও উত্তর ডাইনামিকভাবে পরিচালনা করুন
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-[#00A89C] hover:bg-[#00897B] text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন FAQ যোগ করুন</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="প্রশ্ন বা উত্তর দিয়ে সার্চ করুন..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#00A89C] text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 border border-slate-200 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="p-4 w-16 text-center">ক্রম</th>
                <th className="p-4">প্রশ্ন ও উত্তর</th>
                <th className="p-4">ক্যাটাগরি</th>
                <th className="p-4 text-center">অবস্থা</th>
                <th className="p-4 text-right">একশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin text-[#00A89C]" />
                      <span>FAQ ডাটা লোড হচ্ছে...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredFaqs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    কোনো FAQ পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                filteredFaqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 text-center font-extrabold text-[#00A89C]">
                      #{faq.order}
                    </td>
                    <td className="p-4 max-w-lg">
                      <div className="font-bold text-slate-900 text-sm line-clamp-1 mb-1">
                        {faq.question}
                      </div>
                      <p className="text-slate-500 text-xs line-clamp-2 font-normal leading-relaxed">
                        {faq.answer}
                      </p>
                    </td>
                    <td className="p-4">
                      <span className="bg-teal-50 text-[#007C7A] border border-teal-200 px-2.5 py-1 rounded-md text-xs font-bold inline-block">
                        {faq.category}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleActive(faq)}
                        className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center space-x-1 border transition-all cursor-pointer ${
                          faq.isActive
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}
                      >
                        {faq.isActive ? (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>সক্রিয়</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>হিডেন</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openEditModal(faq)}
                          className="p-2 rounded-xl bg-slate-50 text-sky-600 hover:text-sky-800 hover:bg-sky-50 border border-slate-200 transition-colors cursor-pointer"
                          title="Edit FAQ"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(faq.id, faq.question)}
                          className="p-2 rounded-xl bg-slate-50 text-rose-500 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors cursor-pointer"
                          title="Delete FAQ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit FAQ Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-xl rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#00A89C]" />
                {editingFaq ? "FAQ সম্পাদনা করুন" : "নতুন FAQ তৈরি করুন"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">প্রশ্ন (Question) *</label>
                <input
                  type="text"
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  placeholder="উদা: কুরআন জীবন প্লাটফর্মে ক্লাস করার নিয়ম কি?"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">উত্তর (Answer) *</label>
                <textarea
                  rows={4}
                  value={formAnswer}
                  onChange={(e) => setFormAnswer(e.target.value)}
                  placeholder="প্রশ্নের বিস্তারিত ও স্পষ্ট উত্তর লিখুন..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] font-bold cursor-pointer"
                  >
                    <option value="ক্লাস সংক্রান্ত">ক্লাস সংক্রান্ত</option>
                    <option value="শিক্ষক সংক্রান্ত">শিক্ষক সংক্রান্ত</option>
                    <option value="ফি ও স্কলারশিপ">ফি ও স্কলারশিপ</option>
                    <option value="কোর্স সংক্রান্ত">কোর্স সংক্রান্ত</option>
                    <option value="ভর্তি সংক্রান্ত">ভর্তি সংক্রান্ত</option>
                    <option value="সাধারণ">সাধারণ</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">ডিসপ্লে অর্ডার (ক্রম নম্বর)</label>
                  <input
                    type="number"
                    min={1}
                    value={formOrder}
                    onChange={(e) => setFormOrder(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800">ওয়েবসাইটে ডিসপ্লে হবে (সক্রিয়)</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00A89C]"></div>
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                  disabled={saving}
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#00A89C] text-white font-bold hover:bg-[#00897B] shadow-md flex items-center space-x-2 cursor-pointer"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>সংরক্ষণ হচ্ছে...</span>
                    </>
                  ) : (
                    <span>সংরক্ষণ করুন</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
