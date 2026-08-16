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
  Trash2,
} from "lucide-react";
import { StudentRecord } from "@/data/adminStore";
import { ExtendedTeacherRecord } from "@/data/teachersStorage";
import {
  fetchStudentsAction,
  registerStudentAction,
  changeStudentStatusAction,
  saveStudentAction,
  deleteStudentAction,
} from "@/data/studentsClient";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [teachersList, setTeachersList] = useState<ExtendedTeacherRecord[]>([]);
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
  const [gender, setGender] = useState("পুরুষ");
  const [pkg, setPkg] = useState<StudentRecord["package"]>("সাশ্রয়ী (৳৩২০)");
  const [schedule, setSchedule] = useState("সপ্তাহে ৩ দিন (রাত ৮:০০)");
  const [teacherPref, setTeacherPref] = useState<StudentRecord["teacherPreference"]>("পুরুষ শিক্ষক");
  const [assignedTeacher, setAssignedTeacher] = useState("নির্ধারিত নয়");

  useEffect(() => {
    fetchStudentsAction().then((data) => {
      if (Array.isArray(data)) {
        setStudents(data);
      }
    });

    fetch("/api/teachers")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.teachers)) {
          setTeachersList(data.teachers);
        }
      })
      .catch(() => {});
  }, []);

  const openAddModal = () => {
    setName("");
    setPhone("");
    setEmail("");
    setGender("পুরুষ");
    setPkg("সাশ্রয়ী (৳৩২০)");
    setSchedule("সপ্তাহে ৩ দিন (রাত ৮:০০)");
    setTeacherPref("পুরুষ শিক্ষক");
    setAssignedTeacher("নির্ধারিত নয়");
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
        gender,
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
        gender,
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

  const handleDeleteStudent = async (id: string, studentName: string) => {
    if (!confirm(`আপনি কি নিশ্চিতভাবে "${studentName}" এর ভর্তি তথ্য ডাটাবেজ থেকে মুছে ফেলতে চান?`)) {
      return;
    }
    setStudents((prev) => prev.filter((s) => s.id !== id));
    await deleteStudentAction(id);
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
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-[#00A89C]" />
            শিক্ষার্থী ও ভর্তি ডাটাবেজ (Students & Admissions)
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            সকল নিবন্ধিত শিক্ষার্থী তালিকা, প্যাকেজ ও টিচার অ্যাসাইনমেন্ট পরিচালনা
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-[#00A89C] hover:bg-[#00897B] text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন শিক্ষার্থী ভর্তি করুন</span>
        </button>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs">
          <span className="text-slate-500 text-xs font-semibold">মোট শিক্ষার্থী</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{students.length} জন</div>
        </div>

        <div className="bg-white border border-rose-200 p-5 rounded-3xl shadow-xs bg-rose-50/20">
          <div className="flex items-center justify-between">
            <span className="text-rose-700 text-xs font-bold">নতুন আবেদন</span>
            <span className="bg-rose-100 text-rose-800 border border-rose-300 text-xs font-bold px-2 py-0.5 rounded-full">
              নতুন
            </span>
          </div>
          <div className="text-2xl font-black text-rose-600 mt-1">{newApplicationsCount} টি</div>
        </div>

        <div className="bg-white border border-emerald-200 p-5 rounded-3xl shadow-xs bg-emerald-50/20">
          <span className="text-emerald-700 text-xs font-bold">সক্রিয় শিক্ষার্থী</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">{activeCount} জন</div>
        </div>

        <div className="bg-white border border-amber-200 p-5 rounded-3xl shadow-xs bg-amber-50/20">
          <span className="text-amber-700 text-xs font-bold">অপেক্ষমাণ</span>
          <div className="text-2xl font-black text-amber-600 mt-1">{waitingCount} জন</div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="নাম, ফোন বা আইডি সার্চ করুন..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white transition-all font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#00A89C] cursor-pointer"
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
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#00A89C] cursor-pointer"
          >
            <option value="সব">সকল প্যাকেজ</option>
            <option value="বিনামূল্যে">বিনামূল্যে</option>
            <option value="সাশ্রয়ী (৳৩২০)">সাশ্রয়ী (৳৩২০)</option>
            <option value="কাস্টম প্রিমিয়াম">কাস্টম প্রিমিয়াম</option>
          </select>
        </div>
      </div>

      {/* Student List Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">আইডি ও শিক্ষার্থী</th>
                <th className="p-4">যোগাযোগ</th>
                <th className="p-4">প্যাকেজ ও সময়সূচী</th>
                <th className="p-4">দায়িত্বপ্রাপ্ত শিক্ষক/শিক্ষিকা</th>
                <th className="p-4">স্ট্যাটাস</th>
                <th className="p-4 text-right">একশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    কোনো শিক্ষার্থী পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-semibold">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono block w-max border border-slate-200 font-bold">
                          {student.id}
                        </span>
                        {student.gender && (
                          <span className="text-xs bg-teal-50 text-[#007C7A] border border-teal-200 px-1.5 py-0.5 rounded-full font-bold">
                            {student.gender}
                          </span>
                        )}
                        {student.status === "নতুন আবেদন" && (
                          <span className="text-xs bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.5 rounded font-bold">
                            নতুন
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-bold text-slate-900">{student.name}</div>
                      <div className="text-xs text-slate-500 font-normal mt-0.5">
                        পছন্দ: {student.teacherPreference}
                      </div>
                    </td>
                    <td className="p-4 space-y-1">
                      <div className="flex items-center space-x-1.5 text-slate-800 font-mono">
                        <Phone className="w-3.5 h-3.5 text-[#00A89C]" />
                        <span>{student.phone}</span>
                      </div>
                      {student.email && (
                        <div className="flex items-center space-x-1.5 text-slate-500">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{student.email}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4 space-y-1">
                      <span className="bg-teal-50 text-[#007C7A] border border-teal-200 px-2.5 py-0.5 rounded-md text-xs font-bold inline-block">
                        {student.package}
                      </span>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{student.schedule}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-slate-800">
                        {student.assignedTeacher || "নির্ধারিত নয়"}
                      </span>
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
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => {
                            setEditingStudent(student);
                            setName(student.name);
                            setPhone(student.phone);
                            setEmail(student.email);
                            setGender(student.gender || "পুরুষ");
                            setPkg(student.package);
                            setSchedule(student.schedule);
                            setTeacherPref(student.teacherPreference);
                            setAssignedTeacher(student.assignedTeacher || "");
                          }}
                          className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                          title="সম্পাদনা করুন"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student.id, student.name)}
                          className="p-2 rounded-xl bg-slate-50 text-rose-500 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors cursor-pointer"
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

      {/* Add / Edit Student Modal */}
      {(isAddModalOpen || editingStudent) && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-xl rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="bg-teal-50 text-[#007C7A] border border-teal-200 text-xs font-bold px-2.5 py-0.5 rounded-full inline-block mb-1">
                  {editingStudent ? "আপডেট" : "নতুন আবেদন"}
                </span>
                <h2 className="text-lg font-black text-slate-900">
                  {editingStudent ? "শিক্ষার্থীর তথ্য আপডেট করুন" : "নতুন শিক্ষার্থী এনরোল করুন"}
                </h2>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingStudent(null);
                }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">শিক্ষার্থীর নাম</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: আব্দুল্লাহ আল মামুন"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">ফোন নম্বর</label>
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
                  <label className="block font-bold text-slate-700 mb-1">শিক্ষার্থীর লিঙ্গ / ধরন</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white font-bold cursor-pointer"
                  >
                    <option value="পুরুষ">পুরুষ</option>
                    <option value="মহিলা">মহিলা</option>
                    <option value="ছেলে শিশু">ছেলে শিশু</option>
                    <option value="মেয়ে শিশু">মেয়ে শিশু</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">ইমেইল (ঐচ্ছিক)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">প্যাকেজ নির্বাচন</label>
                  <select
                    value={pkg}
                    onChange={(e) => setPkg(e.target.value as StudentRecord["package"])}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white font-bold cursor-pointer"
                  >
                    <option value="সাশ্রয়ী (৳৩২০)">সাশ্রয়ী (৳৩২০)</option>
                    <option value="বিনামূল্যে">বিনামূল্যে</option>
                    <option value="কাস্টম প্রিমিয়াম">কাস্টম প্রিমিয়াম</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">শিক্ষক/শিক্ষিকা পছন্দ</label>
                  <select
                    value={teacherPref}
                    onChange={(e) => setTeacherPref(e.target.value as StudentRecord["teacherPreference"])}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white font-bold cursor-pointer"
                  >
                    <option value="পুরুষ শিক্ষক">পুরুষ শিক্ষক</option>
                    <option value="মহিলা শিক্ষিকা">মহিলা শিক্ষিকা</option>
                    <option value="যে কোনটি">যে কোনটি</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">সময়সূচী (Schedule)</label>
                <input
                  type="text"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  placeholder="যেমন: সপ্তাহে ৩ দিন (রাত ৮:০০)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">দায়িত্বপ্রাপ্ত টিচার অ্যাসাইন</label>
                <select
                  value={assignedTeacher}
                  onChange={(e) => setAssignedTeacher(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white font-bold cursor-pointer"
                >
                  <option value="নির্ধারিত নয়">নির্ধারিত নয়</option>
                  {teachersList.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} ({t.gender} • {t.specialization || "কুরআন শিক্ষক"})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingStudent(null);
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
