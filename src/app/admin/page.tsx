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
import { StudentRecord, DonationRecord } from "@/data/adminStore";
import { BlogPost } from "@/data/blogs";
import { ExtendedTeacherRecord } from "@/data/teachersStorage";
import { fetchStudentsAction, changeStudentStatusAction } from "@/data/studentsClient";

export default function AdminDashboardPage() {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [teachers, setTeachers] = useState<ExtendedTeacherRecord[]>([]);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("সব");

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        const [studentsData, teachersRes, donationsRes, blogsRes] = await Promise.allSettled([
          fetchStudentsAction(),
          fetch("/api/teachers").then((r) => r.json()),
          fetch("/api/donations").then((r) => r.json()),
          fetch("/api/blogs").then((r) => r.json()),
        ]);

        if (studentsData.status === "fulfilled" && Array.isArray(studentsData.value)) {
          setStudents(studentsData.value);
        }
        if (teachersRes.status === "fulfilled" && teachersRes.value?.success && Array.isArray(teachersRes.value.teachers)) {
          setTeachers(teachersRes.value.teachers);
        }
        if (donationsRes.status === "fulfilled" && donationsRes.value?.success && Array.isArray(donationsRes.value.donations)) {
          setDonations(donationsRes.value.donations);
        }
        if (blogsRes.status === "fulfilled" && blogsRes.value?.success && Array.isArray(blogsRes.value.posts)) {
          setBlogs(blogsRes.value.posts);
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  // Metrics
  const totalStudentsCount = students.length;
  const activeTeachers = teachers.filter((t) => t.status === "সক্রিয়");
  const activeTeachersCount = activeTeachers.length;
  const maleTeachersCount = activeTeachers.filter((t) => t.gender === "পুরুষ").length;
  const femaleTeachersCount = activeTeachers.filter((t) => t.gender === "মহিলা").length;

  const totalRevenue = donations.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const monthlyRevenue = `৳${totalRevenue.toLocaleString("bn-BD")}`;

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
      {/* Top Welcome & Overview Header with Mosque Silhouette Theme Gradient */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-[#203935] via-[#155653] to-[#007C7A] text-white p-8 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="flex items-center space-x-2">
            <span className="bg-white/15 text-emerald-200 text-xs font-extrabold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4" />
              লাইভ কন্ট্রোল প্যানেল
            </span>
            <span className="text-emerald-100 text-xs font-semibold">
              স্বাগতম, এডমিন!
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            কুরআন জীবন ড্যাশবোর্ড ওভারভিউ
          </h1>
          <p className="text-emerald-100/90 text-xs sm:text-sm max-w-xl">
            আজকের শিক্ষার্থী ভর্তি, শিক্ষক কার্যক্রম, অনুদান ও ব্লগ পোস্টের সর্বশেষ আপডেটসমূহ
          </p>
        </div>

        {/* Quick Action Button Group */}
        <div className="flex items-center space-x-3 relative z-10">
          <Link
            href="/admin/blogs"
            className="bg-white text-[#007C7A] hover:bg-emerald-50 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center space-x-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন ব্লগ লিখুন</span>
          </Link>
          <Link
            href="/admin/students"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 backdrop-blur-xs cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-emerald-200" />
            <span>শিক্ষার্থী ডাটাবেজ</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Active Students */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-md transition-all shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">মোট নিবন্ধিত শিক্ষার্থী</span>
            <div className="p-2.5 rounded-2xl bg-teal-50 text-[#00A89C] group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            {loading ? (
              <div className="h-9 w-20 bg-slate-200 rounded-lg animate-pulse my-0.5" />
            ) : (
              <span className="text-3xl font-black text-slate-900">{totalStudentsCount}</span>
            )}
            <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              লাইভ ডাটা
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">নিবন্ধিত শিক্ষার্থী তালিকা</p>
        </div>

        {/* Card 2: Active Instructors */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-md transition-all shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">সক্রিয় শিক্ষক ও শিক্ষিকা</span>
            <div className="p-2.5 rounded-2xl bg-sky-50 text-sky-600 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            {loading ? (
              <div className="h-9 w-24 bg-slate-200 rounded-lg animate-pulse my-0.5" />
            ) : (
              <span className="text-3xl font-black text-slate-900">{activeTeachersCount} জন</span>
            )}
            <span className="text-xs font-bold text-slate-600">
              {loading ? "..." : `${maleTeachersCount} পুরুষ / ${femaleTeachersCount} মহিলা`}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">তাজবীদ ও হিফজ স্পেশালিস্ট</p>
        </div>

        {/* Card 3: Monthly Funds & Revenue */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-md transition-all shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">মাসিক কোর্স ফি ও হাদিয়া</span>
            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            {loading ? (
              <div className="h-9 w-24 bg-slate-200 rounded-lg animate-pulse my-0.5" />
            ) : (
              <span className="text-3xl font-black text-amber-600">{monthlyRevenue}</span>
            )}
            <span className="inline-flex items-center text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              {loading ? "..." : `${donations.length} টি পেমেন্ট`}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">সাদাকা ও স্পন্সরশিপ সহ</p>
        </div>

        {/* Card 4: Pending Admissions */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-md transition-all shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">নতুন ভর্তির আবেদন</span>
            <div className="p-2.5 rounded-2xl bg-rose-50 text-rose-600 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            {loading ? (
              <div className="h-9 w-20 bg-slate-200 rounded-lg animate-pulse my-0.5" />
            ) : (
              <span className="text-3xl font-black text-rose-600">{pendingApplicationsCount} টি</span>
            )}
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
              {loading ? "..." : pendingApplicationsCount > 0 ? "জরুরি রেসপন্স" : "আপ-টু-ডেট"}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">যোগাযোগ ও টিচার অ্যাসাইন বাকি</p>
        </div>
      </div>

      {/* Grid Section: Interactive Admissions Management & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Student Admissions Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#00A89C]" />
                সর্বশেষ ভর্তি আবেদনসমূহ
              </h2>
              <p className="text-slate-500 text-xs mt-0.5">
                শিক্ষার্থীদের স্ট্যাটাস পরিবর্তনের জন্য ড্রপডাউন ব্যবহার করুন
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
              {["সব", "নতুন আবেদন", "সক্রিয়", "অপেক্ষমাণ"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === status
                      ? "bg-[#00A89C] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Search box for table */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="শিক্ষার্থীর নাম, ফোন বা প্যাকেজ সার্চ করুন..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white transition-all font-medium"
            />
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">আইডি ও নাম</th>
                  <th className="p-4">প্যাকেজ</th>
                  <th className="p-4">শিক্ষিকা/শিক্ষক</th>
                  <th className="p-4">স্ট্যাটাস</th>
                  <th className="p-4 text-right">একশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {loading ? (
                  [1, 2, 3, 4].map((i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="p-4 space-y-2">
                        <div className="h-4 w-32 bg-slate-200 rounded" />
                        <div className="h-3 w-24 bg-slate-100 rounded" />
                      </td>
                      <td className="p-4">
                        <div className="h-5 w-20 bg-slate-200 rounded" />
                      </td>
                      <td className="p-4">
                        <div className="h-4 w-28 bg-slate-200 rounded" />
                      </td>
                      <td className="p-4">
                        <div className="h-7 w-24 bg-slate-200 rounded-lg" />
                      </td>
                      <td className="p-4 text-right">
                        <div className="h-4 w-12 bg-slate-200 rounded ml-auto" />
                      </td>
                    </tr>
                  ))
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      কোনো তথ্য পাওয়া যায়নি
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900 text-sm">{student.name}</div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">
                          {student.id} • {student.phone}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md text-xs font-semibold border border-slate-200 inline-block">
                          {student.package}
                        </span>
                      </td>
                      <td className="p-4 text-slate-700 font-medium">
                        {student.assignedTeacher || "নির্ধারিত নয়"}
                      </td>
                      <td className="p-4">
                        <select
                          value={student.status}
                          onChange={(e) =>
                            handleStatusChange(student.id, e.target.value as StudentRecord["status"])
                          }
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg border outline-none cursor-pointer ${
                            student.status === "সক্রিয়"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : student.status === "নতুন আবেদন"
                              ? "bg-rose-50 text-rose-700 border-rose-200"
                              : student.status === "অপেক্ষমাণ"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          <option value="নতুন আবেদন">নতুন আবেদন</option>
                          <option value="সক্রিয়">সক্রিয়</option>
                          <option value="অপেক্ষমাণ">অপেক্ষমাণ</option>
                          <option value="সম্পন্ন">সম্পন্ন</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          href={`/admin/students`}
                          className="inline-flex items-center text-[#00A89C] hover:text-[#007C7A] font-bold text-xs cursor-pointer"
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
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#00A89C]" />
                সর্বশেষ প্রকাশিত ব্লগ
              </h2>
              <Link
                href="/admin/blogs"
                className="text-xs text-[#00A89C] hover:text-[#007C7A] font-bold"
              >
                সব ব্লগ ({blogs.length})
              </Link>
            </div>

            <div className="space-y-3">
              {loading ? (
                [1, 2, 3].map((i) => (
                  <div key={i} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2 animate-pulse">
                    <div className="h-4 w-16 bg-slate-200 rounded" />
                    <div className="h-4 w-full bg-slate-200 rounded" />
                    <div className="flex justify-between">
                      <div className="h-3 w-20 bg-slate-100 rounded" />
                      <div className="h-3 w-16 bg-slate-100 rounded" />
                    </div>
                  </div>
                ))
              ) : blogs.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">কোনো ব্লগ পাওয়া যায়নি</p>
              ) : (
                blogs.slice(0, 3).map((post) => (
                  <div
                    key={post.id}
                    className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 hover:border-teal-200 hover:bg-teal-50/30 transition-all space-y-1.5"
                  >
                    <span className="bg-teal-50 text-[#007C7A] text-xs font-bold px-2 py-0.5 rounded border border-teal-200">
                      {post.category}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-relaxed">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <Link
              href="/admin/blogs"
              className="w-full bg-slate-50 hover:bg-teal-50 text-slate-700 hover:text-[#007C7A] border border-slate-200 font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#00A89C]" />
              <span>নতুন আর্টিকেল যোগ করুন</span>
            </Link>
          </div>

          {/* Quick System Summary Box */}
          <div className="bg-teal-50 border border-teal-200 rounded-3xl p-6 text-slate-800 space-y-3 shadow-xs">
            <h3 className="text-sm font-black text-[#007C7A] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00A89C]" />
              সিস্টেম লাইভ স্ট্যাটাস
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              কুরআন জীবন প্ল্যাটফর্মের সার্ভার ও ডাটাবেজ সচল রয়েছে। শিক্ষার্থী রেজিস্ট্রেশন ও ফর্ম সাবমিশন সঠিকভাবে কাজ করছে।
            </p>
            <div className="pt-3 border-t border-teal-200/70 flex items-center justify-between text-xs font-bold text-slate-500">
              <span>ভার্সন: v1.2.0</span>
              <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">● অল ওকে</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
