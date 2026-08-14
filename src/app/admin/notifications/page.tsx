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
    color: "text-emerald-700",
    bg: "bg-emerald-50 border-emerald-200",
  },
  donation: {
    label: "সাদাকা ও অনুদান",
    icon: HeartHandshake,
    color: "text-[#007C7A]",
    bg: "bg-teal-50 border-teal-200",
  },
  teacher: {
    label: "শিক্ষক ও ক্লাস",
    icon: Users,
    color: "text-sky-700",
    bg: "bg-sky-50 border-sky-200",
  },
  message: {
    label: "বার্তা ও ইনকোয়ারি",
    icon: MessageSquare,
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-200",
  },
  system: {
    label: "সিস্টেম ও ইন্টারঅ্যাকশন",
    icon: ShieldCheck,
    color: "text-indigo-700",
    bg: "bg-indigo-50 border-indigo-200",
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
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center space-x-3">
              <Bell className="w-7 h-7 text-[#00A89C]" />
              <span>নোটিফিকেশন সেন্টার</span>
            </h1>
            {unreadCount > 0 && (
              <span className="bg-[#00A89C] text-white text-xs font-black px-2.5 py-0.5 rounded-full shadow-sm animate-pulse">
                {unreadCount} টি নতুন
              </span>
            )}
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            ওয়েবসাইটে শিক্ষার্থীদের ভর্তি আবেদন, যোগাযোগ ফর্ম পূরণ, প্রিমিয়াম প্যাকেজ বুকিং ও সাদাকা অনুদানের লাইভ নোটিফিকেশন।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center space-x-1.5 bg-[#00A89C] hover:bg-[#00897B] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <CheckCheck className="w-4 h-4" />
              <span>সবগুলো পঠিত করুন</span>
            </button>
          )}

          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center space-x-1.5 bg-slate-50 hover:bg-rose-50 text-rose-600 hover:text-rose-700 border border-slate-200 hover:border-rose-200 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
              title="সব নোটিফিকেশন মুছুন"
            >
              <Trash2 className="w-4 h-4" />
              <span>সব ক্লিয়ার করুন</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs Row */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-200 text-xs font-bold scrollbar-none">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            filter === "all"
              ? "bg-[#00A89C] text-white shadow-xs"
              : "bg-slate-50 text-slate-600 border border-slate-200 hover:text-slate-900"
          }`}
        >
          সকল ইন্টারঅ্যাকশন ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            filter === "unread"
              ? "bg-[#00A89C] text-white shadow-xs"
              : "bg-slate-50 text-slate-600 border border-slate-200 hover:text-slate-900"
          }`}
        >
          অপঠিত ({unreadCount})
        </button>
        <button
          onClick={() => setFilter("admission")}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            filter === "admission"
              ? "bg-[#00A89C] text-white shadow-xs"
              : "bg-slate-50 text-slate-600 border border-slate-200 hover:text-slate-900"
          }`}
        >
          ভর্তি ও শিক্ষার্থী আবেদন
        </button>
        <button
          onClick={() => setFilter("donation")}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            filter === "donation"
              ? "bg-[#00A89C] text-white shadow-xs"
              : "bg-slate-50 text-slate-600 border border-slate-200 hover:text-slate-900"
          }`}
        >
          অনুদান ও সাদাকা
        </button>
        <button
          onClick={() => setFilter("message")}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            filter === "message"
              ? "bg-[#00A89C] text-white shadow-xs"
              : "bg-slate-50 text-slate-600 border border-slate-200 hover:text-slate-900"
          }`}
        >
          ইনকোয়ারি ও বার্তা
        </button>
      </div>

      {/* Notifications List */}
      {loading ? (
        <div className="text-center py-16 text-slate-500 text-xs sm:text-sm">
          নোটিফিকেশন ডাটা লোড হচ্ছে...
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3 shadow-xs">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Bell className="w-7 h-7 text-[#00A89C]" />
          </div>
          <h3 className="text-lg font-black text-slate-900">কোনো নোটিফিকেশন নেই</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
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
                    ? "bg-white border-slate-200 opacity-90 hover:opacity-100 shadow-xs"
                    : "bg-teal-50/20 border-teal-300 shadow-sm ring-1 ring-[#00A89C]/30"
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
                        <span className="flex items-center space-x-1 text-xs font-black text-[#007C7A] bg-teal-100 px-2 py-0.5 rounded-full border border-teal-200">
                          <Sparkles className="w-3 h-3 text-[#007C7A]" />
                          <span>নতুন ইন্টারঅ্যাকশন</span>
                        </span>
                      )}
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-md border ${cat.bg} ${cat.color}`}
                      >
                        {cat.label}
                      </span>
                      <span className="text-xs text-slate-500 font-medium flex items-center space-x-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{notif.timestamp}</span>
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-slate-900 leading-snug">
                      {notif.title}
                    </h4>

                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
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
                      className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors border border-slate-200"
                    >
                      <span>বিস্তারিত দেখুন</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#00A89C]" />
                    </Link>
                  )}

                  {!notif.read && (
                    <button
                      onClick={() => handleMarkAsRead(notif.id)}
                      className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors cursor-pointer"
                      title="পঠিত হিসেবে চিহ্নিত করুন"
                    >
                      <CheckCheck className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(notif.id)}
                    className="p-2 rounded-xl bg-slate-50 text-rose-500 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors cursor-pointer"
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
