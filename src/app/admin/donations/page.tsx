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
  Heart,
  Gift,
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
  const [type, setType] = useState<string>("অনুদান প্রদান");
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

  const isDonationType = (t?: string) => {
    if (!t) return false;
    return (
      t === "অনুদান" ||
      t === "অনুদান প্রদান" ||
      t === "সাদাকা" ||
      t === "শিক্ষার্থী স্পন্সর" ||
      t === "সাধারণ অনুদান"
    );
  };

  const isHadiaType = (t?: string) => {
    if (!t) return false;
    return (
      t === "শিক্ষার্থী হাদিয়া" ||
      t === "হাদিয়া" ||
      t.includes("হাদিয়া") ||
      t === "Student Payments" ||
      t.includes("পেমেন্ট")
    );
  };

  const donationCount = donations.filter((d) => isDonationType(d.type)).length;
  const hadiaCount = donations.filter((d) => isHadiaType(d.type)).length;

  const filteredDonations = donations.filter((d) => {
    const matchesSearch =
      d.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.phone.includes(searchQuery) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.trxId && d.trxId.toLowerCase().includes(searchQuery.toLowerCase()));

    let matchesType = true;
    if (typeFilter === "অনুদান") {
      matchesType = isDonationType(d.type);
    } else if (typeFilter === "শিক্ষার্থী হাদিয়া") {
      matchesType = isHadiaType(d.type);
    }

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-[#00A89C]" />
            অনুদান ও শিক্ষার্থী হাদিয়া (Donations & Student Hadia)
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            ওয়েবসাইটের &apos;লেনদেন তথ্য নিশ্চিত করুন&apos; ফর্ম থেকে প্রাপ্ত অনুদান ও শিক্ষার্থী হাদিয়ার সম্পূর্ণ তালিকা
          </p>
        </div>

        <button
          onClick={() => {
            setDonorName("");
            setPhone("");
            setAmount("");
            setType("অনুদান প্রদান");
            setPaymentMethod("bKash");
            setTrxId("");
            setIsAddModalOpen(true);
          }}
          className="bg-[#00A89C] hover:bg-[#00897B] text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন এন্ট্রি দিন</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">মোট সংগৃহীত অনুদান ও হাদিয়া</span>
            <span className="text-2xl font-black text-amber-600">
              ৳{totalAmount.toLocaleString("bn-BD")}
            </span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">মোট অনুদান প্রদান</span>
            <span className="text-2xl font-black text-emerald-600">
              {donationCount} টি
            </span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Heart className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">শিক্ষার্থী হাদিয়া প্রাপ্তি</span>
            <span className="text-2xl font-black text-sky-600">
              {hadiaCount} টি
            </span>
          </div>
          <div className="p-3 bg-sky-50 text-sky-600 rounded-2xl">
            <Gift className="w-6 h-6" />
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
            placeholder="প্রেরকের নাম, ফোন বা TrxID সার্চ..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white transition-all font-medium"
          />
        </div>

        {/* Requested: Only Two Filters: অনুদান and শিক্ষার্থী হাদিয়া (plus সব) */}
        <div className="flex flex-wrap items-center gap-2">
          {["সব", "অনুদান", "শিক্ষার্থী হাদিয়া"].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                typeFilter === t
                  ? "bg-[#00A89C] text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 border border-slate-200 hover:text-slate-900"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">ট্রানজেকশন আইডি</th>
                <th className="p-4">অনুদানকারী / প্রেরক</th>
                <th className="p-4">লেনদেনের ধরন</th>
                <th className="p-4">পরিমাণ (৳)</th>
                <th className="p-4">পেমেন্ট মেথড ও TrxID</th>
                <th className="p-4">স্ট্যাটাস</th>
                <th className="p-4">তারিখ</th>
                <th className="p-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    অনুদান ও হাদিয়া ডাটাবেজ লোড হচ্ছে...
                  </td>
                </tr>
              ) : filteredDonations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500">
                    কোনো লেনদেন রেকর্ড পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                filteredDonations.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono text-xs text-slate-700">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono block w-max border border-slate-200 font-bold">
                        {item.id}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900 text-sm">{item.donorName}</div>
                      <div className="text-xs text-slate-500 font-mono flex items-center space-x-1 mt-0.5">
                        <Phone className="w-3.5 h-3.5 text-[#00A89C]" />
                        <span>{item.phone}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold inline-block border ${
                        isHadiaType(item.type)
                          ? "bg-sky-50 text-sky-700 border-sky-200"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                      }`}>
                        {item.type || "অনুদান প্রদান"}
                      </span>
                    </td>
                    <td className="p-4 font-black text-emerald-700 text-sm">
                      ৳{Number(item.amount).toLocaleString("bn-BD")}
                    </td>
                    <td className="p-4 space-y-1">
                      <span className="bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded text-xs font-semibold border border-slate-200 inline-block">
                        {item.paymentMethod}
                      </span>
                      {item.trxId && (
                        <div className="text-xs text-slate-500 font-mono flex items-center gap-1">
                          <Receipt className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.trxId}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <select
                        value={item.status || "অপেক্ষমাণ"}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg border outline-none cursor-pointer ${
                          item.status === "অনুমোদিত"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : item.status === "বাতিল"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        <option value="অপেক্ষমাণ">অপেক্ষমাণ</option>
                        <option value="অনুমোদিত">অনুমোদিত</option>
                        <option value="বাতিল">বাতিল</option>
                      </select>
                    </td>
                    <td className="p-4 text-slate-600 font-mono text-xs">
                      {item.date}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteDonation(item.id, item.donorName)}
                        className="p-2 rounded-xl bg-slate-50 text-rose-500 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors cursor-pointer"
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-slate-900">নতুন লেনদেন রেকর্ড করুন</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDonation} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">প্রেরকের নাম</label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="যেমন: আলহাজ্ব শফিকুল ইসলাম"
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
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">পরিমাণ (টাকা)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="5000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">পেমেন্ট মেথড</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white font-bold cursor-pointer"
                  >
                    <option value="bKash">বিকাশ (bKash)</option>
                    <option value="Nagad">নগদ (Nagad)</option>
                    <option value="Rocket">রকেট (Rocket)</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">লেনদেনের ধরন</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white font-bold cursor-pointer"
                >
                  <option value="অনুদান প্রদান">অনুদান প্রদান</option>
                  <option value="শিক্ষার্থী হাদিয়া">শিক্ষার্থী হাদিয়া</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">ট্রানজেকশন আইডি (TrxID - ঐচ্ছিক)</label>
                <input
                  type="text"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  placeholder="যেমন: 9K8X7Y2Z"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white font-mono"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#00A89C] text-white font-bold hover:bg-[#00897B] shadow-md cursor-pointer"
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
