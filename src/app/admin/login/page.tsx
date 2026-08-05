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

  const handleQuickDemoLogin = () => {
    setEmail("admin@quranijibon.com");
    setPassword("admin123");
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("quranijibon_admin_session", "authenticated");
      router.push("/admin");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Dynamic Background Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00A89C]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Header Branding */}
        <div className="text-center space-y-4">
          <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 inline-flex items-center justify-center">
              <Image
                src="/assets/website logo.png"
                alt="Quranijibon Logo"
                width={200}
                height={50}
                className="h-10 w-auto object-contain brightness-0 invert"
                priority
              />
            </div>
          </Link>
          <div>
            <span className="inline-flex items-center gap-1.5 bg-[#00A89C]/20 text-[#00A89C] text-xs font-bold px-3 py-1 rounded-full border border-[#00A89C]/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              অ্যাডমিন পোর্টাল
            </span>
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              অ্যাডমিন প্যানেলে লগইন করুন
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              কুরআন জীবন প্ল্যাটফর্ম ম্যানেজমেন্ট ও ড্যাশবোর্ড
            </p>
          </div>
        </div>

        {/* Login Form Card */}
        <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 p-3.5 rounded-xl text-xs font-semibold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                অ্যাডমিন ইমেইল
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@quranijibon.com"
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00A89C] focus:ring-1 focus:ring-[#00A89C] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00A89C] focus:ring-1 focus:ring-[#00A89C] transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00A89C] hover:bg-[#00897B] text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#00A89C]/20 disabled:opacity-50"
            >
              <span>{loading ? "প্রবেশ করা হচ্ছে..." : "লগইন করুন"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Login Box */}
          <div className="pt-4 border-t border-slate-700/60">
            <button
              onClick={handleQuickDemoLogin}
              type="button"
              className="w-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center space-x-2"
            >
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>১-ক্লিকে টেস্ট ডেমো প্রবেশ (Quick Demo)</span>
            </button>
          </div>
        </div>

        {/* Back to main website link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-slate-400 hover:text-white text-xs font-semibold transition-colors"
          >
            ← মূল ওয়েবসাইটে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
