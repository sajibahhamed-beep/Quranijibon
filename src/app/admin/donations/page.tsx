"use client";

import { useState, useEffect } from "react";
import {
  HeartHandshake,
  Plus,
  Search,
  DollarSign,
  UserCheck,
  Calendar,
  Phone,
  CreditCard,
  X,
  TrendingUp,
  Receipt,
  Trash2,
} from "lucide-react";
import { DonationRecord } from "@/data/adminStore";

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("সব");

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form fields
  const [donorName, setDonorName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<string>("শিক্ষার্থী স্পন্সর");
  const [sponsoredStudent, setSponsoredStudent] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string>("bKash");
  const [trxId, setTrxId] = useState("");

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/donations");
      const data = await res.json();
      if (data.success && Array.isArray(data.donations)) {
        setDonations(data.donations);
      }
    } catch (e) {
      console.error("Failed to load donations:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const totalAmount = donations.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  const handleSaveDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !amount) return;

    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName,
          phone: phone || "+880 1700-000000",
          amount: parseFloat(amount) || 0,
          type,
          sponsoredStudent: type === "শিক্ষার্থী স্পন্সর" ? sponsoredStudent : undefined,
          paymentMethod,
          trxId,
        }),
      });
      const data = await res.json();
      if (data.success && data.donation) {
        setDonations((prev) => [data.donation, ...prev]);
      }
    } catch (e) {
      console.error("Failed to add donation:", e);
    }

    setIsAddModalOpen(false);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setDonations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );
    try {
      await fetch(`/api/donations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (e) {
      console.error("Failed to update status:", e);
    }
  };

  const handleDeleteDonation = async (id: string, name: string) => {
    if (!confirm(`আপনি কি নিশ্চিতভাবে "${name}" এর এই লেনদেন / অনুদান রেকর্ডটি মুছে ফেলতে চান?`)) {
      return;
    }
    setDonations((prev) => prev.filter((d) => d.id !== id));
    try {
      await fetch(`/api/donations/${id}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.error("Failed to delete donation:", e);
    }
  };

  const filteredDonations = donations.filter((d) => {
    const matchesSearch =
      d.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.phone.includes(searchQuery) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.trxId && d.trxId.toLowerCase().includes(searchQuery.toLowerCase()));

    let matchesType = true;
    if (typeFilter === "Student Payments") {
      matchesType =
        d.type === "Student Payments" ||
        d.type === "স্টুডেন্ট পেমেন্ট" ||
        d.type === "স্টুডেন্ট ফি" ||
        d.type?.includes("পেমেন্ট");
    } else if (typeFilter !== "সব") {
      matchesType = d.type === typeFilter;
    }

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-[#00A89C]" />
            অনুদান ও স্পন্সরশিপ (Sadaqah & Sponsorships)
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            ওয়েবসাইটের অনুদান, হাদিয়া এবং শিক্ষার্থী কোর্স পেমেন্ট ট্র্যাকিং
          </p>
        </div>

        <button
          onClick={() => {
            setDonorName("");
            setPhone("");
            setAmount("");
            setType("শিক্ষার্থী স্পন্সর");
            setSponsoredStudent("");
            setPaymentMethod("bKash");
            setTrxId("");
            setIsAddModalOpen(true);
          }}
          className="bg-[#00A89C] hover:bg-[#00897B] text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl transition-all shadow-lg shadow-[#00A89C]/20 flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন অনুদান এন্ট্রি দিন</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 block mb-1">মোট সংগৃহীত সাদাকা ও ফান্ড</span>
            <span className="text-2xl font-black text-amber-400">
              ৳{totalAmount.toLocaleString("bn-BD")}
            </span>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 block mb-1">স্পন্সরকৃত মোট শিক্ষার্থী</span>
            <span className="text-2xl font-black text-emerald-400">
              {donations.filter((d) => d.type === "শিক্ষার্থী স্পন্সর").length} জন
            </span>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 block mb-1">মোট অনুদান / পেমেন্ট সংখ্যা</span>
            <span className="text-2xl font-black text-white">
              {donations.length} টি
            </span>
          </div>
          <div className="p-3 bg-sky-500/10 text-sky-400 rounded-2xl">
            <TrendingUp className="w-6 h-6" />
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
            placeholder="অনুদানকারী, ফোন বা TrxID সার্চ..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#00A89C]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {["সব", "শিক্ষার্থী স্পন্সর", "সাদাকা", "Student Payments"].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                typeFilter === t
                  ? "bg-[#00A89C] text-white"
                  : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              {t === "Student Payments" ? "Student Payments (শিক্ষার্থী পেমেন্ট)" : t}
            </button>
          ))}
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
              <tr>
                <th className="p-4">ট্রানজেকশন আইডি</th>
                <th className="p-4">অনুদানকারী / শিক্ষার্থী</th>
                <th className="p-4">টাইপ</th>
                <th className="p-4">পরিমাণ (৳)</th>
                <th className="p-4">পেমেন্ট মেথড ও TrxID</th>
                <th className="p-4">স্ট্যাটাস</th>
                <th className="p-4">তারিখ</th>
                <th className="p-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    অনুদান ডাটাবেজ লোড হচ্ছে...
                  </td>
                </tr>
              ) : filteredDonations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500">
                    কোনো অনুদান বা পেমেন্ট পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                filteredDonations.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-mono text-[11px] text-slate-400">
                      <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono block w-max">
                        {item.id}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{item.donorName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{item.phone}</div>
                      {item.sponsoredStudent && (
                        <div className="text-[10px] text-teal-400 mt-0.5">
                          স্পন্সরকৃত: {item.sponsoredStudent}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold inline-block border ${
                        item.type?.includes("পেমেন্ট") || item.type === "Student Payments"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                          : item.type === "সাদাকা"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="p-4 font-black text-emerald-400 text-sm">
                      ৳{Number(item.amount).toLocaleString("bn-BD")}
                    </td>
                    <td className="p-4 space-y-1">
                      <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[11px] font-semibold border border-slate-700 inline-block">
                        {item.paymentMethod}
                      </span>
                      {item.trxId && (
                        <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                          <Receipt className="w-3 h-3 text-slate-500" />
                          <span>{item.trxId}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <select
                        value={item.status || "অপেক্ষমাণ"}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border outline-none cursor-pointer ${
                          item.status === "অনুমোদিত"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : item.status === "বাতিল"
                            ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        }`}
                      >
                        <option value="অপেক্ষমাণ">অপেক্ষমাণ</option>
                        <option value="অনুমোদিত">অনুমোদিত</option>
                        <option value="বাতিল">বাতিল</option>
                      </select>
                    </td>
                    <td className="p-4 text-slate-400 font-mono">
                      {item.date}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteDonation(item.id, item.donorName)}
                        className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="মুছে ফেলুন (Delete)"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Donation Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-black text-white">নতুন অনুদান রেকর্ড করুন</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDonation} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">অনুদানকারীর নাম</label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="যেমন: আলহাজ্ব শফিকুল ইসলাম"
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
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">পরিমাণ (টাকা)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="5000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">পেমেন্ট মেথড</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as DonationRecord["paymentMethod"])}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                  >
                    <option value="bKash">bKash</option>
                    <option value="Nagad">Nagad</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">অনুদানের ধরন</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                >
                  <option value="শিক্ষার্থী স্পন্সর">শিক্ষার্থী স্পন্সর</option>
                  <option value="সাদাকা">সাদাকা</option>
                  <option value="Student Payments">Student Payments (শিক্ষার্থী ফি / পেমেন্ট)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">ট্রানজেকশন আইডি (TrxID - ঐচ্ছিক)</label>
                <input
                  type="text"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  placeholder="যেমন: 9K8X7Y2Z"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                />
              </div>

              {type === "শিক্ষার্থী স্পন্সর" && (
                <div>
                  <label className="block font-bold text-slate-300 mb-1">স্পন্সরকৃত শিক্ষার্থীর নাম</label>
                  <input
                    type="text"
                    value={sponsoredStudent}
                    onChange={(e) => setSponsoredStudent(e.target.value)}
                    placeholder="যেমন: আরিফুল ইসলাম"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                  />
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#00A89C] text-white font-bold hover:bg-[#00897B] shadow-md"
                >
                  রেকর্ড করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
