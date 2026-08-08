"use client";

import { useState, useEffect } from "react";
import {
  GraduationCap,
  Plus,
  Search,
  Filter,
  UserCheck,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  X,
  Edit,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { INITIAL_STUDENTS, INITIAL_TEACHERS, StudentRecord } from "@/data/adminStore";
import {
  fetchStudentsAction,
  registerStudentAction,
  changeStudentStatusAction,
  saveStudentAction,
} from "@/data/studentsClient";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("সব");
  const [selectedPackage, setSelectedPackage] = useState<string>("সব");

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentRecord | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pkg, setPkg] = useState<StudentRecord["package"]>("সাশ্রয়ী (৳৩২০)");
  const [schedule, setSchedule] = useState("সপ্তাহে ৩ দিন (রাত ৮:০০)");
  const [teacherPref, setTeacherPref] = useState<StudentRecord["teacherPreference"]>("পুরুষ শিক্ষক");
  const [assignedTeacher, setAssignedTeacher] = useState("উস্তাদ রফিকুল ইসলাম");

  useEffect(() => {
    fetchStudentsAction().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setStudents(data);
      }
    });
  }, []);

  const openAddModal = () => {
    setName("");
    setPhone("");
    setEmail("");
    setPkg("সাশ্রয়ী (৳৩২০)");
    setSchedule("সপ্তাহে ৩ দিন (রাত ৮:০০)");
    setTeacherPref("পুরুষ শিক্ষক");
    setAssignedTeacher("উস্তাদ রফিকুল ইসলাম");
    setIsAddModalOpen(true);
  };

  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    if (editingStudent) {
      const updated: StudentRecord = {
        ...editingStudent,
        name,
        phone,
        email,
        package: pkg,
        schedule,
        teacherPreference: teacherPref,
        assignedTeacher,
      };
      setStudents((prev) =>
        prev.map((s) => (s.id === editingStudent.id ? updated : s))
      );
      setEditingStudent(null);
      await saveStudentAction(updated);
    } else {
      const newStudent = await registerStudentAction({
        name,
        phone,
        email,
        package: pkg,
        schedule,
        teacherPreference: teacherPref,
      });

      if (newStudent) {
        setStudents((prev) => [newStudent, ...prev]);
      }
      setIsAddModalOpen(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: StudentRecord["status"]) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    await changeStudentStatusAction(id, newStatus);
  };

  const newApplicationsCount = students.filter((s) => s.status === "নতুন আবেদন").length;
  const activeCount = students.filter((s) => s.status === "সক্রিয়").length;
  const waitingCount = students.filter((s) => s.status === "অপেক্ষমাণ").length;

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.phone.includes(searchQuery) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "সব" || student.status === selectedStatus;
    const matchesPkg =
      selectedPackage === "সব" || student.package === selectedPackage;
    return matchesSearch && matchesStatus && matchesPkg;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-[#00A89C]" />
            শিক্ষার্থী ও ভর্তি ডাটাবেজ (Students & Admissions)
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            সকল নিবন্ধিত শিক্ষার্থী তালিকা, প্যাকেজ ও টিচার অ্যাসাইনমেন্ট পরিচালনা
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-[#00A89C] hover:bg-[#00897B] text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl transition-all shadow-lg shadow-[#00A89C]/20 flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন শিক্ষার্থী ভর্তি করুন</span>
        </button>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <span className="text-slate-400 text-xs font-semibold">মোট শিক্ষার্থী</span>
          <div className="text-2xl font-black text-white mt-1">{students.length} জন</div>
        </div>

        <div className="bg-slate-900 border border-rose-500/30 p-4 rounded-2xl bg-rose-500/5">
          <div className="flex items-center justify-between">
            <span className="text-rose-400 text-xs font-bold">নতুন আবেদন</span>
            <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
              নতুন আবেদন
            </span>
          </div>
          <div className="text-2xl font-black text-rose-400 mt-1">{newApplicationsCount} টি</div>
        </div>

        <div className="bg-slate-900 border border-emerald-500/30 p-4 rounded-2xl bg-emerald-500/5">
          <span className="text-emerald-400 text-xs font-bold">সক্রিয় শিক্ষার্থী</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">{activeCount} জন</div>
        </div>

        <div className="bg-slate-900 border border-amber-500/30 p-4 rounded-2xl bg-amber-500/5">
          <span className="text-amber-400 text-xs font-bold">অপেক্ষমাণ</span>
          <div className="text-2xl font-black text-amber-400 mt-1">{waitingCount} জন</div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="নাম, ফোন বা আইডি সার্চ করুন..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#00A89C]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#00A89C]"
          >
            <option value="সব">সকল স্ট্যাটাস</option>
            <option value="নতুন আবেদন">নতুন আবেদন</option>
            <option value="সক্রিয়">সক্রিয়</option>
            <option value="অপেক্ষমাণ">অপেক্ষমাণ</option>
            <option value="সম্পন্ন">সম্পন্ন</option>
          </select>

          {/* Package Filter */}
          <select
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#00A89C]"
          >
            <option value="সব">সকল প্যাকেজ</option>
            <option value="বিনামূল্যে">বিনামূল্যে</option>
            <option value="সাশ্রয়ী (৳৩২০)">সাশ্রয়ী (৳৩২০)</option>
            <option value="কাস্টম প্রিমিয়াম">কাস্টম প্রিমিয়াম</option>
          </select>
        </div>
      </div>

      {/* Student List Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
              <tr>
                <th className="p-4">আইডি ও শিক্ষার্থী</th>
                <th className="p-4">যোগাযোগ</th>
                <th className="p-4">প্যাকেজ ও সময়সূচী</th>
                <th className="p-4">দায়িত্বপ্রাপ্ত শিক্ষক/শিক্ষিকা</th>
                <th className="p-4">স্ট্যাটাস</th>
                <th className="p-4 text-right">একশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    কোনো শিক্ষার্থী পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-semibold">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono block w-max">
                          {student.id}
                        </span>
                        {student.status === "নতুন আবেদন" && (
                          <span className="text-[9px] bg-rose-500/20 text-rose-300 border border-rose-500/40 px-1.5 py-0.2 rounded font-bold">
                            নতুন আবেদন
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-black text-white">{student.name}</div>
                      <div className="text-[11px] text-slate-400 font-normal">
                        পছন্দ: {student.teacherPreference}
                      </div>
                    </td>
                    <td className="p-4 space-y-1">
                      <div className="flex items-center space-x-1.5 text-slate-300">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        <span>{student.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-slate-400">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span>{student.email}</span>
                      </div>
                    </td>
                    <td className="p-4 space-y-1">
                      <span className="bg-[#00A89C]/10 text-[#00A89C] border border-[#00A89C]/30 px-2.5 py-0.5 rounded-md text-[11px] font-bold inline-block">
                        {student.package}
                      </span>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{student.schedule}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-slate-200">
                        {student.assignedTeacher || "নির্ধারিত নয়"}
                      </span>
                    </td>
                    <td className="p-4">
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
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setEditingStudent(student);
                          setName(student.name);
                          setPhone(student.phone);
                          setEmail(student.email);
                          setPkg(student.package);
                          setSchedule(student.schedule);
                          setTeacherPref(student.teacherPreference);
                          setAssignedTeacher(student.assignedTeacher || "");
                        }}
                        className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                        title="Edit Details"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Student Modal */}
      {(isAddModalOpen || editingStudent) && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="bg-[#00A89C]/20 text-[#00A89C] border border-[#00A89C]/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-block mb-1">
                  নতুন আবেদন
                </span>
                <h2 className="text-lg font-black text-white">
                  {editingStudent ? "শিক্ষার্থীর তথ্য আপডেট করুন" : "নতুন শিক্ষার্থী এনরোল করুন"}
                </h2>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingStudent(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">শিক্ষার্থীর নাম</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: আব্দুল্লাহ আল মামুন"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                    required
                  />
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
                <label className="block font-bold text-slate-300 mb-1">ইমেইল (ঐচ্ছিক)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">প্যাকেজ নির্বাচন</label>
                  <select
                    value={pkg}
                    onChange={(e) => setPkg(e.target.value as StudentRecord["package"])}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                  >
                    <option value="সাশ্রয়ী (৳৩২০)">সাশ্রয়ী (৳৩২০)</option>
                    <option value="বিনামূল্যে">বিনামূল্যে</option>
                    <option value="কাস্টম প্রিমিয়াম">কাস্টম প্রিমিয়াম</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">শিক্ষক/শিক্ষিকা পছন্দ</label>
                  <select
                    value={teacherPref}
                    onChange={(e) => setTeacherPref(e.target.value as StudentRecord["teacherPreference"])}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                  >
                    <option value="পুরুষ শিক্ষক">পুরুষ শিক্ষক</option>
                    <option value="মহিলা শিক্ষিকা">মহিলা শিক্ষিকা</option>
                    <option value="যে কোনটি">যে কোনটি</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">সময়সূচী (Schedule)</label>
                <input
                  type="text"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  placeholder="যেমন: সপ্তাহে ৩ দিন (রাত ৮:০০)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">দায়িত্বপ্রাপ্ত টিচার অ্যাসাইন</label>
                <select
                  value={assignedTeacher}
                  onChange={(e) => setAssignedTeacher(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                >
                  {INITIAL_TEACHERS.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} ({t.gender} • {t.specialization})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingStudent(null);
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
