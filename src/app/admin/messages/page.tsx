"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Search,
  MessageSquare,
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  Trash2,
  Eye,
  X,
  Send,
  MessageCircle,
  AlertCircle,
} from "lucide-react";
import { ContactMessage } from "@/data/messagesStorage";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("সব");
  const [viewingMessage, setViewingMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
      }
    } catch (e) {
      console.error("Failed to load messages:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusChange = async (id: string, newStatus: ContactMessage["status"]) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
    );
    if (viewingMessage && viewingMessage.id === id) {
      setViewingMessage((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    try {
      await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (e) {
      console.error("Failed to update message status:", e);
    }
  };

  const handleDeleteMessage = async (id: string, senderName: string) => {
    if (!confirm(`আপনি কি নিশ্চিতভাবে "${senderName}" এর বার্তাটি মুছে ফেলতে চান?`)) {
      return;
    }
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (viewingMessage?.id === id) {
      setViewingMessage(null);
    }
    try {
      await fetch(`/api/messages/${id}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.error("Failed to delete message:", e);
    }
  };

  const newCount = messages.filter((m) => m.status === "নতুন").length;
  const readCount = messages.filter((m) => m.status === "পঠিত").length;
  const repliedCount = messages.filter((m) => m.status === "উত্তর দেওয়া হয়েছে").length;

  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.includes(searchQuery) ||
      (m.email && m.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "সব" || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Mail className="w-6 h-6 text-[#00A89C]" />
            বার্তা ও ইনকোয়ারি (Messages & Inquiries)
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            ওয়েবসাইটের &apos;যোগাযোগ&apos; পেজ থেকে পাঠানো সকল বার্তা, প্রশ্ন ও যোগাযোগের তালিকা
          </p>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 block mb-1">মোট প্রাপ্ত বার্তা</span>
            <span className="text-2xl font-black text-white">{messages.length} টি</span>
          </div>
          <div className="p-3 bg-teal-500/10 text-[#00A89C] rounded-2xl">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900 border border-rose-500/30 rounded-3xl p-5 shadow-lg flex items-center justify-between bg-rose-500/5">
          <div>
            <span className="text-xs font-bold text-rose-400 block mb-1">নতুন অপঠিত বার্তা</span>
            <span className="text-2xl font-black text-rose-400">{newCount} টি</span>
          </div>
          <div className="p-3 bg-rose-500/15 text-rose-400 rounded-2xl">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 block mb-1">উত্তর প্রদান করা হয়েছে</span>
            <span className="text-2xl font-black text-emerald-400">{repliedCount} টি</span>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="প্রেরকের নাম, ফোন, ইমেইল বা বার্তা খুঁজুন..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#00A89C]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {["সব", "নতুন", "পঠিত", "উত্তর দেওয়া হয়েছে"].map((t) => (
            <button
              key={t}
              onClick={() => setStatusFilter(t)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === t
                  ? "bg-[#00A89C] text-white"
                  : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
              <tr>
                <th className="p-4">বার্তা আইডি</th>
                <th className="p-4">প্রেরকের নাম ও ফোন</th>
                <th className="p-4">বার্তার বিবরণ</th>
                <th className="p-4">স্ট্যাটাস</th>
                <th className="p-4">তারিখ</th>
                <th className="p-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    বার্তা লোড হচ্ছে...
                  </td>
                </tr>
              ) : filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    কোনো বার্তা পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                filteredMessages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-mono text-[11px] text-slate-400">
                      <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono block w-max">
                        {msg.id}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{msg.name}</div>
                      <div className="text-[11px] text-slate-400 flex items-center space-x-1.5 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-500" />
                        <span className="font-mono">{msg.phone}</span>
                      </div>
                      {msg.email && (
                        <div className="text-[10px] text-teal-400">{msg.email}</div>
                      )}
                    </td>

                    <td className="p-4 max-w-xs sm:max-w-md">
                      <p className="text-slate-300 line-clamp-2 text-xs leading-relaxed">
                        {msg.message}
                      </p>
                    </td>

                    <td className="p-4">
                      <select
                        value={msg.status}
                        onChange={(e) => handleStatusChange(msg.id, e.target.value as ContactMessage["status"])}
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg border outline-none cursor-pointer ${
                          msg.status === "নতুন"
                            ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                            : msg.status === "উত্তর দেওয়া হয়েছে"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        }`}
                      >
                        <option value="নতুন">নতুন</option>
                        <option value="পঠিত">পঠিত</option>
                        <option value="উত্তর দেওয়া হয়েছে">উত্তর দেওয়া হয়েছে</option>
                      </select>
                    </td>

                    <td className="p-4 text-slate-400 font-mono">
                      {msg.date}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => {
                            setViewingMessage(msg);
                            if (msg.status === "নতুন") {
                              handleStatusChange(msg.id, "পঠিত");
                            }
                          }}
                          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                          title="সম্পূর্ণ বার্তা পড়ুন"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(msg.id, msg.name)}
                          className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="মুছে ফেলুন (Delete)"
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

      {/* View Message Modal */}
      {viewingMessage && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-[#00A89C]" />
                <h2 className="text-lg font-black text-white">বার্তার পূর্ণ বিবরণ</h2>
              </div>
              <button
                onClick={() => setViewingMessage(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">প্রেরক:</span>
                  <span className="text-[10px] text-slate-400 font-mono">{viewingMessage.date}</span>
                </div>
                <div className="text-base font-black text-white">{viewingMessage.name}</div>
                <div className="flex items-center space-x-4 text-slate-300 font-medium">
                  <div className="flex items-center space-x-1 font-mono">
                    <Phone className="w-3.5 h-3.5 text-[#00A89C]" />
                    <span>{viewingMessage.phone}</span>
                  </div>
                  {viewingMessage.email && (
                    <div className="flex items-center space-x-1">
                      <Mail className="w-3.5 h-3.5 text-sky-400" />
                      <span>{viewingMessage.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5">
                  মূল বার্তা:
                </label>
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                  {viewingMessage.message}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase">
                  স্ট্যাটাস পরিবর্তন করুন:
                </label>
                <select
                  value={viewingMessage.status}
                  onChange={(e) => handleStatusChange(viewingMessage.id, e.target.value as ContactMessage["status"])}
                  className="bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-[#00A89C] cursor-pointer"
                >
                  <option value="নতুন">নতুন</option>
                  <option value="পঠিত">পঠিত</option>
                  <option value="উত্তর দেওয়া হয়েছে">উত্তর দেওয়া হয়েছে</option>
                </select>
              </div>

              {/* Action Buttons: Phone Call or WhatsApp */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <a
                  href={`tel:${viewingMessage.phone}`}
                  className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-teal-400" />
                  <span>সরাসরি কল দিন</span>
                </a>
                <a
                  href={`https://wa.me/${viewingMessage.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-[#00A89C] hover:bg-[#00897B] text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp এ বার্তা দিন</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
