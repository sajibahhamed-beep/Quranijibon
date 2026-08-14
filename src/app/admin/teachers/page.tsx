"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Search,
  Phone,
  Mail,
  Award,
  BookOpen,
  X,
  Edit,
  UserCheck,
  Calendar,
  Briefcase,
  MessageSquare,
  Clock,
  Sparkles,
  Trash2,
} from "lucide-react";
import { INITIAL_TEACHERS } from "@/data/adminStore";
import { ExtendedTeacherRecord } from "@/data/teachersStorage";

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState<ExtendedTeacherRecord[]>(INITIAL_TEACHERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState<string>("সব");
  const [statusFilter, setStatusFilter] = useState<string>("সব");

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<ExtendedTeacherRecord | null>(null);
  const [viewingTeacher, setViewingTeacher] = useState<ExtendedTeacherRecord | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"পুরুষ" | "মহিলা">("পুরুষ");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("তাজবীদ ও কিরাত স্পেশালিস্ট");
  const [experience, setExperience] = useState("১-২ বছর");
  const [workType, setWorkType] = useState<"স্বেচ্ছাসেবী" | "স্বল্প সম্মানী">("স্বল্প সম্মানী");
  const [notes, setNotes] = useState("");
  const [activeStudents, setActiveStudents] = useState(0);

  const fetchTeachers = async () => {
    try {
      const res = await fetch("/api/teachers");
      const data = await res.json();
      if (data.success && Array.isArray(data.teachers)) {
        setTeachers(data.teachers);
      }
    } catch (err) {
      console.error("Failed to load teachers:", err);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const openAddModal = () => {
    setName("");
    setGender("পুরুষ");
    setPhone("");
    setEmail("");
    setSpecialization("তাজবীদ ও কিরাত স্পেশালিস্ট");
    setExperience("১-২ বছর");
    setWorkType("স্বল্প সম্মানী");
    setNotes("");
    setActiveStudents(0);
    setIsAddModalOpen(true);
  };

  const handleSaveTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    if (editingTeacher) {
      const updated: ExtendedTeacherRecord = {
        ...editingTeacher,
        name,
        gender,
        phone,
        email,
        specialization,
        experience,
        workType,
        notes,
        activeStudents,
      };
      setTeachers((prev) =>
        prev.map((t) => (t.id === editingTeacher.id ? updated : t))
      );
      setEditingTeacher(null);
      await fetch(`/api/teachers/${editingTeacher.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teacher: updated }),
      });
    } else {
      const res = await fetch("/api/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          gender,
          phone,
          email,
          qualification: specialization,
          experience,
          workType,
          message: notes,
        }),
      });
      const data = await res.json();
      if (data.success && data.teacher) {
        setTeachers((prev) => [data.teacher, ...prev]);
      }
      setIsAddModalOpen(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus as any } : t))
    );
    await fetch(`/api/teachers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
  };

  const handleDeleteTeacher = async (id: string, teacherName: string) => {
    if (!confirm(`আপনি কি নিশ্চিতভাবে শিক্ষক "${teacherName}" এর আবেদন ও তথ্য ডাটাবেজ থেকে মুছে ফেলতে চান?`)) {
      return;
    }
    setTeachers((prev) => prev.filter((t) => t.id !== id));
    try {
      await fetch(`/api/teachers/${id}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.error("Failed to delete teacher:", e);
    }
  };

  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.phone.includes(searchQuery) ||
      t.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.notes && t.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesGender = genderFilter === "সব" || t.gender === genderFilter;
    const matchesStatus = statusFilter === "সব" || t.status === statusFilter;
    return matchesSearch && matchesGender && matchesStatus;
  });

  const newApplicantsCount = teachers.filter((t) => t.status === "নতুন আবেদন").length;
  const activeCount = teachers.filter((t) => t.status === "সক্রিয়").length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-[#00A89C]" />
            শিক্ষক ও শিক্ষিকা তালিকা (Teachers Directory)
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            ওয়েবসাইট ফর্ম থেকে আসা শিক্ষক আবেদনসমূহ ও বর্তমান শিক্ষকদের সম্পূর্ণ তালিকা
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-[#00A89C] hover:bg-[#00897B] text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন শিক্ষক যোগ করুন</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs">
          <span className="text-slate-500 text-xs font-semibold">মোট শিক্ষক তালিকা</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{teachers.length} জন</div>
        </div>

        <div className="bg-white border border-rose-200 p-5 rounded-3xl shadow-xs bg-rose-50/20">
          <div className="flex items-center justify-between">
            <span className="text-rose-700 text-xs font-bold">নতুন আবেদন</span>
            <span className="bg-rose-100 text-rose-800 border border-rose-300 text-xs font-bold px-2 py-0.5 rounded-full">
              নতুন
            </span>
          </div>
          <div className="text-2xl font-black text-rose-600 mt-1">{newApplicantsCount} জন</div>
        </div>

        <div className="bg-white border border-emerald-200 p-5 rounded-3xl shadow-xs bg-emerald-50/20">
          <span className="text-emerald-700 text-xs font-bold">সক্রিয় শিক্ষক</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">{activeCount} জন</div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs">
          <span className="text-slate-500 text-xs font-semibold">পুরুষ / মহিলা শাখা</span>
          <div className="text-xs font-bold text-slate-700 mt-2 flex gap-2">
            <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded-lg">
              পুরুষ: {teachers.filter((t) => t.gender === "পুরুষ").length}
            </span>
            <span className="bg-pink-50 text-pink-700 border border-pink-200 px-2 py-1 rounded-lg">
              মহিলা: {teachers.filter((t) => t.gender === "মহিলা").length}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="শিক্ষকের নাম, ফোন বা যোগ্যতা সার্চ..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white transition-all font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#00A89C] cursor-pointer"
          >
            <option value="সব">সকল স্ট্যাটাস</option>
            <option value="নতুন আবেদন">নতুন আবেদন</option>
            <option value="সক্রিয়">সক্রিয়</option>
            <option value="অপেক্ষমাণ">অপেক্ষমাণ</option>
            <option value="ছুটিতে">ছুটিতে</option>
          </select>

          {/* Gender Filter */}
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
            {["সব", "পুরুষ", "মহিলা"].map((g) => (
              <button
                key={g}
                onClick={() => setGenderFilter(g)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  genderFilter === g
                    ? "bg-[#00A89C] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {g === "সব" ? "সকল শাখা" : `${g} শাখা`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Teachers Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-500 bg-white border border-slate-200 rounded-3xl shadow-xs">
            কোনো শিক্ষক তথ্য পাওয়া যায়নি
          </div>
        ) : (
          filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 hover:shadow-md transition-all shadow-xs relative group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-md ${
                      teacher.gender === "মহিলা"
                        ? "bg-gradient-to-tr from-pink-600 to-rose-500"
                        : "bg-gradient-to-tr from-[#00A89C] to-emerald-600"
                    }`}>
                      {teacher.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900">{teacher.name}</h3>
                      <div className="flex items-center space-x-1.5 mt-0.5 flex-wrap gap-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                          teacher.gender === "মহিলা"
                            ? "bg-pink-50 text-pink-700 border-pink-200"
                            : "bg-blue-50 text-blue-700 border-blue-200"
                        }`}>
                          {teacher.gender} শাখা
                        </span>
                        {teacher.workType && (
                          <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-2 py-0.5 rounded-full">
                            {teacher.workType}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setViewingTeacher(teacher)}
                      className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                      title="আবেদনের বিস্তারিত দেখুন"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setEditingTeacher(teacher);
                        setName(teacher.name);
                        setGender(teacher.gender);
                        setPhone(teacher.phone);
                        setEmail(teacher.email);
                        setSpecialization(teacher.specialization);
                        setExperience(teacher.experience || "১-২ বছর");
                        setWorkType(teacher.workType || "স্বল্প সম্মানী");
                        setNotes(teacher.notes || "");
                        setActiveStudents(teacher.activeStudents || 0);
                      }}
                      className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                      title="তথ্য এডিট করুন"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTeacher(teacher.id, teacher.name)}
                      className="p-2 rounded-xl bg-slate-50 text-rose-500 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors cursor-pointer"
                      title="মুছে ফেলুন (Delete)"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Status Dropdown */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-500 font-bold">আবেদনের স্ট্যাটাস:</span>
                  <select
                    value={teacher.status}
                    onChange={(e) => handleStatusChange(teacher.id, e.target.value)}
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg border outline-none cursor-pointer ${
                      teacher.status === "সক্রিয়"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : teacher.status === "নতুন আবেদন"
                        ? "bg-rose-50 text-rose-700 border-rose-200"
                        : teacher.status === "অপেক্ষমাণ"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    <option value="নতুন আবেদন">নতুন আবেদন</option>
                    <option value="সক্রিয়">সক্রিয়</option>
                    <option value="অপেক্ষমাণ">অপেক্ষমাণ</option>
                    <option value="ছুটিতে">ছুটিতে</option>
                  </select>
                </div>

                {/* Detailed Info */}
                <div className="space-y-2.5 text-xs border-t border-b border-slate-100 py-3 text-slate-700">
                  <div className="flex items-start space-x-2">
                    <Award className="w-4 h-4 text-[#00A89C] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 block text-xs font-medium">দ্বীনি যোগ্যতা / বিশেষত্ব:</span>
                      <span className="font-bold text-slate-900">{teacher.specialization}</span>
                    </div>
                  </div>

                  {teacher.experience && (
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span>অভিজ্ঞতা: <strong className="text-slate-800">{teacher.experience}</strong></span>
                    </div>
                  )}

                  <div className="flex items-center space-x-2 text-slate-700">
                    <Phone className="w-4 h-4 text-[#00A89C] flex-shrink-0" />
                    <span className="font-mono">{teacher.phone}</span>
                  </div>

                  {teacher.email && (
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span>{teacher.email}</span>
                    </div>
                  )}

                  {teacher.joinedDate && (
                    <div className="flex items-center space-x-2 text-slate-500 text-xs">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>আবেদনের তারিখ: {teacher.joinedDate}</span>
                    </div>
                  )}

                  {teacher.notes && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      <span className="text-slate-500 block text-xs font-bold mb-0.5">শিক্ষকের বার্তা / পরিচিতি:</span>
                      <p className="line-clamp-2 italic">&ldquo;{teacher.notes}&rdquo;</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-bold pt-2">
                <span className="text-slate-500 flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-[#00A89C]" />
                  সক্রিয় শিক্ষার্থী:
                </span>
                <span className="bg-teal-50 text-[#007C7A] px-3 py-1 rounded-full border border-teal-200 text-xs font-black">
                  {teacher.activeStudents || 0} জন
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View Teacher Application Details Modal */}
      {viewingTeacher && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="bg-teal-50 text-[#007C7A] border border-teal-200 text-xs font-bold px-2.5 py-0.5 rounded-full inline-block mb-1">
                  আবেদনের পূর্ণ বিবরণ
                </span>
                <h2 className="text-xl font-black text-slate-900">{viewingTeacher.name}</h2>
              </div>
              <button
                onClick={() => setViewingTeacher(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 block">শাখা ও লিঙ্গ:</span>
                  <span className="font-bold text-slate-900">{viewingTeacher.gender} শিক্ষক</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">কাজের ধরন:</span>
                  <span className="font-bold text-[#007C7A]">{viewingTeacher.workType || "স্বল্প সম্মানী"}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">ফোন নম্বর:</span>
                  <span className="font-bold text-slate-900 font-mono">{viewingTeacher.phone}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">ইমেইল:</span>
                  <span className="font-bold text-slate-900">{viewingTeacher.email || "দেওয়া হয়নি"}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">অভিজ্ঞতা:</span>
                  <span className="font-bold text-slate-900">{viewingTeacher.experience || "১-২ বছর"}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">আবেদনের তারিখ:</span>
                  <span className="font-bold text-slate-900">{viewingTeacher.joinedDate}</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-600 block font-bold mb-1">দ্বীনি ও শিক্ষাগত যোগ্যতা:</span>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-semibold">
                  {viewingTeacher.specialization}
                </div>
              </div>

              {viewingTeacher.notes && (
                <div>
                  <span className="text-xs text-slate-600 block font-bold mb-1">শিক্ষকের বার্তা / পরিচিতি:</span>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 whitespace-pre-wrap leading-relaxed">
                    {viewingTeacher.notes}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setViewingTeacher(null)}
                className="px-5 py-2.5 rounded-xl bg-[#00A89C] text-white font-bold hover:bg-[#00897B] cursor-pointer shadow-md"
              >
                ঠিক আছে
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Teacher Modal */}
      {(isAddModalOpen || editingTeacher) && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-slate-900">
                {editingTeacher ? "শিক্ষকের তথ্য এডিট করুন" : "নতুন শিক্ষক যুক্ত করুন"}
              </h2>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingTeacher(null);
                }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTeacher} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">শিক্ষক / শিক্ষিকার নাম <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: উস্তাদ আহমেদ রফিক"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">শাখা / লিঙ্গ</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as "পুরুষ" | "মহিলা")}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white font-bold cursor-pointer"
                  >
                    <option value="পুরুষ">পুরুষ শিক্ষক</option>
                    <option value="মহিলা">মহিলা শিক্ষিকা</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">ফোন নম্বর <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 1700-000000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ইমেইল (ঐচ্ছিক)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="teacher@quranijibon.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">অভিজ্ঞতা</label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white font-bold cursor-pointer"
                  >
                    <option value="১ বছরের কম">১ বছরের কম</option>
                    <option value="১-২ বছর">১-২ বছর</option>
                    <option value="৩-৫ বছর">৩-৫ বছর</option>
                    <option value="৫+ বছর">৫+ বছর</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">কাজের ধরন</label>
                  <select
                    value={workType}
                    onChange={(e) => setWorkType(e.target.value as "স্বেচ্ছাসেবী" | "স্বল্প সম্মানী")}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white font-bold cursor-pointer"
                  >
                    <option value="স্বল্প সম্মানী">স্বল্প সম্মানী</option>
                    <option value="স্বেচ্ছাসেবী">স্বেচ্ছাসেবী (Fi Sabilillah)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">সক্রিয় শিক্ষার্থী সংখ্যা</label>
                  <input
                    type="number"
                    value={activeStudents}
                    onChange={(e) => setActiveStudents(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">দ্বীনি ও শিক্ষাগত যোগ্যতা <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  placeholder="যেমন: দাওরায়ে হাদীস, হাফেজ ও তাজবীদ সনদপ্রাপ্ত"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">শিক্ষকের বার্তা / পরিচিতি</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="শিক্ষক সম্পর্কে বিশেষ নোট বা বার্তা..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingTeacher(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#00A89C] text-white font-bold hover:bg-[#00897B] shadow-md cursor-pointer"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
