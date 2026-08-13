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
} from "lucide-react";
import { INITIAL_TEACHERS, TeacherRecord } from "@/data/adminStore";

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState<TeacherRecord[]>(INITIAL_TEACHERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState<string>("সব");

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<TeacherRecord | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"পুরুষ" | "মহিলা">("পুরুষ");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("তাজবীদ ও কিরাত স্পেশালিস্ট");

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
    setIsAddModalOpen(true);
  };

  const handleSaveTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    if (editingTeacher) {
      const updated = { ...editingTeacher, name, gender, phone, email, specialization };
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

  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.phone.includes(searchQuery) ||
      t.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGender = genderFilter === "সব" || t.gender === genderFilter;
    return matchesSearch && matchesGender;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-[#00A89C]" />
            শিক্ষক ও শিক্ষিকা তালিকা (Teachers Directory)
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            তাজবীদ ও হিফজ শিক্ষকদের প্রোফাইল ও শিক্ষার্থী লোড পরিচালনা
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-[#00A89C] hover:bg-[#00897B] text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl transition-all shadow-lg shadow-[#00A89C]/20 flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন শিক্ষক যোগ করুন</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="শিক্ষকের নাম বা বিষয় সার্চ করুন..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#00A89C]"
          />
        </div>

        <div className="flex items-center gap-2">
          {["সব", "পুরুষ", "মহিলা"].map((g) => (
            <button
              key={g}
              onClick={() => setGenderFilter(g)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                genderFilter === g
                  ? "bg-[#00A89C] text-white"
                  : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              {g === "সব" ? "সকল শিক্ষক" : `${g} শাখা`}
            </button>
          ))}
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 hover:border-slate-700 transition-all shadow-xl relative group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00A89C] to-emerald-600 flex items-center justify-center text-white font-black text-lg shadow-md">
                  {teacher.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-black text-white">{teacher.name}</h3>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700">
                      {teacher.gender} শাখা
                    </span>
                    <select
                      value={teacher.status}
                      onChange={(e) => handleStatusChange(teacher.id, e.target.value)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border outline-none cursor-pointer ${
                        teacher.status === "সক্রিয়"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : teacher.status === "নতুন আবেদন"
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      <option value="নতুন আবেদন">নতুন আবেদন</option>
                      <option value="সক্রিয়">সক্রিয়</option>
                      <option value="অপেক্ষমাণ">অপেক্ষমাণ</option>
                      <option value="ছুটিতে">ছুটিতে</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setEditingTeacher(teacher);
                  setName(teacher.name);
                  setGender(teacher.gender);
                  setPhone(teacher.phone);
                  setEmail(teacher.email);
                  setSpecialization(teacher.specialization);
                }}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs border-t border-b border-slate-800 py-3 text-slate-300">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-[#00A89C]" />
                <span className="font-semibold">{teacher.specialization}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Phone className="w-4 h-4 text-slate-500" />
                <span>{teacher.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Mail className="w-4 h-4 text-slate-500" />
                <span>{teacher.email}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold pt-1">
              <span className="text-slate-400 flex items-center gap-1">
                <BookOpen className="w-4 h-4 text-[#00A89C]" />
                সক্রিয় শিক্ষার্থী:
              </span>
              <span className="bg-[#00A89C]/10 text-[#00A89C] px-3 py-1 rounded-full border border-[#00A89C]/30 text-sm font-black">
                {teacher.activeStudents} জন
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Teacher Modal */}
      {(isAddModalOpen || editingTeacher) && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-black text-white">
                {editingTeacher ? "শিক্ষকের তথ্য এডিট করুন" : "নতুন শিক্ষক যুক্ত করুন"}
              </h2>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingTeacher(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTeacher} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">শিক্ষক / শিক্ষিকার নাম</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: উস্তাদ আহমেদ রফিক"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">শাখা / লিঙ্গ</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as "পুরুষ" | "মহিলা")}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                  >
                    <option value="পুরুষ">পুরুষ শিক্ষক</option>
                    <option value="মহিলা">মহিলা শিক্ষিকা</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">ফোন নম্বর</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 1700-000000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">ইমেইল</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="teacher@quranijibon.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">বিশেষজ্ঞতা (Specialization)</label>
                <input
                  type="text"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  placeholder="যেমন: তাজবীদ ও মাখরাজ Specialist"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                  required
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingTeacher(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#00A89C] text-white font-bold hover:bg-[#00897B] shadow-md"
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
