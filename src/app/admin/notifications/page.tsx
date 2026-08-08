"use client";

import { useState, useEffect } from "react";
import { AdminNotification } from "@/data/notificationsStorage";
import {
  Bell,
  CheckCheck,
  Trash2,
  ExternalLink,
  GraduationCap,
  HeartHandshake,
  Users,
  MessageSquare,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
} from "./actions";
import Link from "next/link";

const CATEGORY_MAP: Record<
  string,
  { label: string; icon: any; color: string; bg: string }
> = {
  admission: {
    label: "শিক্ষার্থী ও ভর্তি",
    icon: GraduationCap,
    color: "text-emerald-400",
    bg: "bg-emerald-500/15 border-emerald-500/30",
  },
  donation: {
    label: "সাদাকা ও অনুদান",
    icon: HeartHandshake,
    color: "text-teal-400",
    bg: "bg-teal-500/15 border-teal-500/30",
  },
  teacher: {
    label: "শিক্ষক ও ক্লাস",
    icon: Users,
    color: "text-sky-400",
    bg: "bg-sky-500/15 border-sky-500/30",
  },
  message: {
    label: "বার্তা ও ইনকোয়ারি",
    icon: MessageSquare,
    color: "text-amber-400",
    bg: "bg-amber-500/15 border-amber-500/30",
  },
  system: {
    label: "সিস্টেম ও ইন্টারঅ্যাকশন",
    icon: ShieldCheck,
    color: "text-indigo-400",
    bg: "bg-indigo-500/15 border-indigo-500/30",
  },
};

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const data = await getNotifications();
    setNotifications(data);
    setLoading(false);
  };

  const handleMarkAsRead = async (id: string) => {
    await markAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllRead = async () => {
    await markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleDelete = async (id: string) => {
    await deleteNotification(id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClearAll = async () => {
    if (confirm("আপনি কি সকল নোটিফিকেশন মুছে ফেলতে চান?")) {
      await clearAllNotifications();
      setNotifications([]);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.category === filter;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-3">
              <Bell className="w-7 h-7 text-[#00A89C]" />
              <span>নোটিফিকেশন সেন্টার</span>
            </h1>
            {unreadCount > 0 && (
              <span className="bg-[#00A89C] text-white text-xs font-extrabold px-2.5 py-0.5 rounded-full shadow-sm animate-pulse">
                {unreadCount} টি নতুন
              </span>
            )}
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            ওয়েবসাইটে শিক্ষার্থীদের ভর্তি আবেদন, যোগাযোগ ফর্ম পূরণ, প্রিমিয়াম প্যাকেজ বুকিং ও সাদাকা অনুদানের লাইভ নোটিফিকেশন।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center space-x-1.5 bg-[#00A89C] hover:bg-[#00897B] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-[#00A89C]/20"
            >
              <CheckCheck className="w-4 h-4" />
              <span>সবগুলো পঠিত করুন</span>
            </button>
          )}

          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center space-x-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
              title="সব নোটিফিকেশন মুছুন"
            >
              <Trash2 className="w-4 h-4" />
              <span>সব ক্লিয়ার করুন</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs Row */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-800/80 text-xs font-bold scrollbar-none">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
            filter === "all"
              ? "bg-[#00A89C] text-white shadow-md shadow-[#00A89C]/20"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          সকল ইন্টারঅ্যাকশন ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
            filter === "unread"
              ? "bg-[#00A89C] text-white shadow-md shadow-[#00A89C]/20"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          অপঠিত ({unreadCount})
        </button>
        <button
          onClick={() => setFilter("admission")}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
            filter === "admission"
              ? "bg-[#00A89C] text-white shadow-md shadow-[#00A89C]/20"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          ভর্তি ও শিক্ষার্থী আবেদন
        </button>
        <button
          onClick={() => setFilter("donation")}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
            filter === "donation"
              ? "bg-[#00A89C] text-white shadow-md shadow-[#00A89C]/20"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          অনুদান ও সাদাকা
        </button>
        <button
          onClick={() => setFilter("message")}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
            filter === "message"
              ? "bg-[#00A89C] text-white shadow-md shadow-[#00A89C]/20"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          ইনকোয়ারি ও বার্তা
        </button>
      </div>

      {/* Notifications List */}
      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">
          নোটিফিকেশন ডাটা লোড হচ্ছে...
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-slate-800/80 text-slate-400 flex items-center justify-center mx-auto">
            <Bell className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">কোনো নোটিফিকেশন নেই</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            বর্তমানে কোনো নতুন ইন্টারঅ্যাকশন বা নোটিফিকেশন পাওয়া যায়নি। ব্যবহারকারীরা ওয়েবসাইটে ফর্ম পূরণ বা বাটনে ক্লিক করলে তা এখানে প্রদর্শিত হবে।
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notif) => {
            const cat =
              CATEGORY_MAP[notif.category] || CATEGORY_MAP.system;
            const Icon = cat.icon;

            return (
              <div
                key={notif.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  notif.read
                    ? "bg-slate-900/60 border-slate-800/70 opacity-85 hover:opacity-100"
                    : "bg-slate-900 border-teal-500/40 shadow-lg shadow-teal-500/5 ring-1 ring-[#00A89C]/30"
                }`}
              >
                <div className="flex items-start space-x-4 flex-1">
                  {/* Category Icon */}
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 border ${cat.bg}`}
                  >
                    <Icon className={`w-5 h-5 ${cat.color}`} />
                  </div>

                  {/* Content */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {!notif.read && (
                        <span className="flex items-center space-x-1 text-[10px] font-black text-[#00A89C] bg-[#00A89C]/15 px-2 py-0.5 rounded-full">
                          <Sparkles className="w-2.5 h-2.5 animate-spin" />
                          <span>নতুন ইন্টারঅ্যাকশন</span>
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${cat.bg} ${cat.color}`}
                      >
                        {cat.label}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-slate-600" />
                        <span>{notif.timestamp}</span>
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug">
                      {notif.title}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      {notif.message}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 self-end sm:self-center flex-shrink-0">
                  {notif.link && (
                    <Link
                      href={notif.link}
                      onClick={() => handleMarkAsRead(notif.id)}
                      className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors border border-slate-700/60"
                    >
                      <span>বিস্তারিত দেখুন</span>
                      <ExternalLink className="w-3 h-3 text-[#00A89C]" />
                    </Link>
                  )}

                  {!notif.read && (
                    <button
                      onClick={() => handleMarkAsRead(notif.id)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="পঠিত হিসেবে চিহ্নিত করুন"
                    >
                      <CheckCheck className="w-4 h-4 text-emerald-400" />
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(notif.id)}
                    className="p-2 rounded-xl bg-slate-800/60 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
