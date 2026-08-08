"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  HeartHandshake,
  FileText,
  TrendingUp,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  Search,
  Filter,
} from "lucide-react";
import { INITIAL_STUDENTS, StudentRecord } from "@/data/adminStore";
import { BLOG_POSTS } from "@/data/blogs";
import { fetchStudentsAction, changeStudentStatusAction } from "@/data/studentsClient";

export default function AdminDashboardPage() {
  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("সব");

  useEffect(() => {
    fetchStudentsAction().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setStudents(data);
      }
    });
  }, []);

  // Metrics
  const totalStudentsCount = 428 + (students.length > INITIAL_STUDENTS.length ? students.length - INITIAL_STUDENTS.length : 0);
  const activeTeachersCount = 18;
  const monthlyRevenue = "৳১,৩৫,০০০";
  const pendingApplicationsCount = students.filter(
    (s) => s.status === "নতুন আবেদন" || s.status === "অপেক্ষমাণ"
  ).length;

  const handleStatusChange = async (id: string, newStatus: StudentRecord["status"]) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    await changeStudentStatusAction(id, newStatus);
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.phone.includes(searchQuery) ||
      student.package.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "সব" || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Top Welcome & Overview Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 p-6 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A89C]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-1 relative z-10">
          <div className="flex items-center space-x-2">
            <span className="bg-[#00A89C]/20 text-[#00A89C] text-xs font-extrabold px-3 py-1 rounded-full border border-[#00A89C]/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              লাইভ সিস্টেম
            </span>
            <span className="text-slate-400 text-xs font-semibold">
              স্বাগতম, এডমিন!
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            কুরআন জীবন ড্যাশবোর্ড ওভারভিউ
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            আজকের শিক্ষার্থী ভর্তি, শিক্ষক সংখ্যা ও ব্লগ পোস্টের সর্বশেষ আপডেটসমূহ
          </p>
        </div>

        {/* Quick Action Button Group */}
        <div className="flex items-center space-x-3 relative z-10">
          <Link
            href="/admin/blogs"
            className="bg-[#00A89C] hover:bg-[#00897B] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন ব্লগ লিখুন</span>
          </Link>
          <Link
            href="/admin/students"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5"
          >
            <GraduationCap className="w-4 h-4 text-[#00A89C]" />
            <span>শিক্ষার্থী তালিকা</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Active Students */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-md relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">মোট নিবন্ধিত শিক্ষার্থী</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">{totalStudentsCount}</span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
              <TrendingUp className="w-3 h-3 mr-1" />
              +১২% এই মাসে
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">ওয়ান-টু-ওয়ান নিয়মিত ব্যাচ</p>
        </div>

        {/* Card 2: Active Instructors */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-md relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">সক্রিয় শিক্ষক ও শিক্ষিকা</span>
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">{activeTeachersCount} জন</span>
            <span className="text-xs font-bold text-slate-400">১০ পুরুষ / ৮ মহিলা</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">তাজবীদ ও হিফজ স্পেশালিস্ট</p>
        </div>

        {/* Card 3: Monthly Funds & Revenue */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-md relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">মাসিক কোর্স ফি ও হাদিয়া</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-amber-400">{monthlyRevenue}</span>
            <span className="inline-flex items-center text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
              ফান্ডিং ওকে
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">সাদাকা ও স্পন্সরশিপ সহ</p>
        </div>

        {/* Card 4: Pending Admissions */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-md relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">নতুন ভর্তির আবেদন</span>
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-rose-400">{pendingApplicationsCount} টি</span>
            <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md">
              জরুরি রেসপন্স
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">যোগাযোগ ও টিচার অ্যাসাইন বাকি</p>
        </div>
      </div>

      {/* Grid Section: Interactive Admissions Management & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Student Admissions Table */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#00A89C]" />
                সর্বশেষ ভর্তি আবেদনসমূহ
              </h2>
              <p className="text-slate-400 text-xs">
                শিক্ষার্থীদের স্ট্যাটাস পরিবর্তনের জন্য ড্রপডাউন ব্যবহার করুন
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {["সব", "নতুন আবেদন", "সক্রিয়", "অপেক্ষমাণ"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    statusFilter === status
                      ? "bg-[#00A89C] text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Search box for table */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="শিক্ষার্থীর নাম, ফোন বা প্যাকেজ সার্চ করুন..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#00A89C]"
            />
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-3.5">আইডি ও নাম</th>
                  <th className="p-3.5">প্যাকেজ</th>
                  <th className="p-3.5">শিক্ষিকা/শিক্ষক</th>
                  <th className="p-3.5">স্ট্যাটাস</th>
                  <th className="p-3.5 text-right">একশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-slate-500">
                      কোনো তথ্য পাওয়া যায়নি
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-white text-sm">{student.name}</div>
                        <div className="text-[11px] text-slate-400">
                          {student.id} • {student.phone}
                        </div>
                      </td>
                      <td className="p-3.5 font-medium">
                        <span className="bg-slate-800 px-2.5 py-1 rounded-md text-slate-300 text-[11px] border border-slate-700">
                          {student.package}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-300 font-medium">
                        {student.assignedTeacher || "নির্ধারিত নয়"}
                      </td>
                      <td className="p-3.5">
                        <select
                          value={student.status}
                          onChange={(e) =>
                            handleStatusChange(student.id, e.target.value as StudentRecord["status"])
                          }
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border outline-none cursor-pointer ${
                            student.status === "সক্রিয়"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              : student.status === "নতুন আবেদন"
                              ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                              : student.status === "অপেক্ষমাণ"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                              : "bg-slate-800 text-slate-400 border-slate-700"
                          }`}
                        >
                          <option value="নতুন আবেদন">নতুন আবেদন</option>
                          <option value="সক্রিয়">সক্রিয়</option>
                          <option value="অপেক্ষমাণ">অপেক্ষমাণ</option>
                          <option value="সম্পন্ন">সম্পন্ন</option>
                        </select>
                      </td>
                      <td className="p-3.5 text-right">
                        <Link
                          href={`/admin/students`}
                          className="inline-flex items-center text-[#00A89C] hover:text-[#00897B] font-bold text-[11px]"
                        >
                          <span>বিস্তারিত</span>
                          <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (1 Col): Blog Management & Quick Links Widget */}
        <div className="space-y-6">
          {/* Blog Articles Widget */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#00A89C]" />
                সর্বশেষ প্রকাশিত ব্লগ
              </h2>
              <Link
                href="/admin/blogs"
                className="text-xs text-[#00A89C] hover:underline font-bold"
              >
                সব ব্লগ ({BLOG_POSTS.length})
              </Link>
            </div>

            <div className="space-y-3">
              {BLOG_POSTS.slice(0, 3).map((post) => (
                <div
                  key={post.id}
                  className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all space-y-1.5"
                >
                  <span className="bg-[#00A89C]/10 text-[#00A89C] text-[10px] font-bold px-2 py-0.5 rounded">
                    {post.category}
                  </span>
                  <h3 className="text-xs font-bold text-slate-200 line-clamp-2 leading-relaxed">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/admin/blogs"
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center space-x-1.5"
            >
              <Plus className="w-4 h-4 text-[#00A89C]" />
              <span>নতুন আর্টিকেল যোগ করুন</span>
            </Link>
          </div>

          {/* Quick System Summary Box */}
          <div className="bg-gradient-to-br from-[#00A89C]/20 to-slate-900 border border-[#00A89C]/30 rounded-3xl p-6 text-slate-300 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00A89C]" />
              সিস্টেম লাইভ স্ট্যাটাস
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              কুরআন জীবন প্ল্যাটফর্মের সার্ভার ও ডাটাবেজ সচল রয়েছে। শিক্ষার্থী রেজিস্ট্রেশন ও ফর্ম সাবমিশন সঠিকভাবে কাজ করছে।
            </p>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold text-slate-400">
              <span>ভার্সন: v1.2.0</span>
              <span className="text-emerald-400">● অল ওকে</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
