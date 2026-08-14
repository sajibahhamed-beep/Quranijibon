"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, ShieldCheck, ArrowRight, KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email === "admin@quranijibon.com" && password === "admin123") {
        localStorage.setItem("quranijibon_admin_session", "authenticated");
        router.push("/admin");
      } else if (!email || !password) {
        setError("ইমেইল ও পাসওয়ার্ড প্রদান করুন");
        setLoading(false);
      } else {
        // Allow demo login for convenience
        localStorage.setItem("quranijibon_admin_session", "authenticated");
        router.push("/admin");
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC] text-slate-900 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden admin-theme font-solaiman">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00A89C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Header Branding */}
        <div className="text-center space-y-4">
          <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs inline-flex items-center justify-center">
              <Image
                src="/assets/website-logo.png"
                alt="Quranijibon Logo"
                width={200}
                height={50}
                className="h-10 w-auto object-contain"
                priority
              />
            </div>
          </Link>
          <div>
            <span className="inline-flex items-center gap-1.5 bg-teal-50 text-[#007C7A] text-xs font-bold px-3 py-1 rounded-full border border-teal-200 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00A89C]" />
              অ্যাডমিন পোর্টাল
            </span>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              অ্যাডমিন প্যানেলে লগইন করুন
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              কুরআন জীবন প্ল্যাটফর্ম ম্যানেজমেন্ট ও ড্যাশবোর্ড
            </p>
          </div>
        </div>

        {/* Login Form Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3.5 rounded-xl text-xs font-bold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                অ্যাডমিন ইমেইল
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@quranijibon.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white transition-all font-medium"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00A89C] hover:bg-[#00897B] text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? "প্রবেশ করা হচ্ছে..." : "লগইন করুন"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Back to main website link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-slate-500 hover:text-slate-900 text-xs font-bold transition-colors"
          >
            ← মূল ওয়েবসাইটে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
