"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  Users,
  GraduationCap,
  HeartHandshake,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Exclude login page from layout wrapping logic
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setIsAuthenticated(true);
      return;
    }
    const session = localStorage.getItem("quranijibon_admin_session");
    if (!session) {
      setIsAuthenticated(false);
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-300 font-semibold text-sm">
        অ্যাডমিন প্যানেল লোড হচ্ছে...
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("quranijibon_admin_session");
    router.push("/admin/login");
  };

  const navItems = [
    {
      label: "ড্যাশবোর্ড",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      label: "ব্লগ পোস্ট ব্যবস্থাপনা",
      href: "/admin/blogs",
      icon: FileText,
      active: pathname === "/admin/blogs",
    },
    {
      label: "শিক্ষার্থী ও ভর্তি",
      href: "/admin/students",
      icon: GraduationCap,
      active: pathname === "/admin/students",
    },
    {
      label: "শিক্ষক ও মেন্টর",
      href: "/admin/teachers",
      icon: Users,
      active: pathname === "/admin/teachers",
    },
    {
      label: "অনুদান ও স্পন্সরশিপ",
      href: "/admin/donations",
      icon: HeartHandshake,
      active: pathname === "/admin/donations",
    },
    {
      label: "FAQ ও প্রশ্নাবলী",
      href: "/admin/faqs",
      icon: HelpCircle,
      active: pathname === "/admin/faqs",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row font-sans">
      {/* Mobile Header Bar */}
      <header className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <Link href="/admin" className="flex items-center space-x-2">
          <Image
            src="/assets/website logo.png"
            alt="Quranijibon Logo"
            width={140}
            height={35}
            className="h-8 w-auto brightness-0 invert"
          />
          <span className="bg-[#00A89C]/20 text-[#00A89C] text-[10px] font-bold px-2 py-0.5 rounded border border-[#00A89C]/30">
            ADMIN
          </span>
        </Link>

        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800"
          aria-label="Toggle Navigation Menu"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Sidebar Top Branding */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <Link href="/admin" className="flex items-center space-x-2">
              <Image
                src="/assets/website logo.png"
                alt="Quranijibon Logo"
                width={160}
                height={40}
                className="h-9 w-auto brightness-0 invert"
              />
            </Link>
            <span className="bg-[#00A89C]/20 text-[#00A89C] text-[11px] font-extrabold px-2.5 py-1 rounded-md border border-[#00A89C]/40">
              ADMIN
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <p className="px-3 text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-2">
              প্রধান মেনু
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                    item.active
                      ? "bg-[#00A89C] text-white shadow-lg shadow-[#00A89C]/25 font-bold"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${item.active ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 transition-colors"
          >
            <span className="flex items-center space-x-2">
              <ExternalLink className="w-4 h-4 text-[#00A89C]" />
              <span>মূল ওয়েবসাইট ভিজিট</span>
            </span>
            <span className="text-[10px] bg-slate-700/60 px-1.5 py-0.5 rounded text-slate-300">
              Live
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>লগআউট করুন</span>
          </button>
        </div>
      </aside>

      {/* Backdrop overlay for mobile */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Main Admin Content Body */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Top Navigation Bar */}
        <header className="bg-slate-900/60 backdrop-blur-md border-b border-slate-800 px-6 py-4 hidden lg:flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-4 max-w-md w-full">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="শিক্ষার্থী, ব্লগ বা টিচার সার্চ করুন..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#00A89C]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="p-2.5 rounded-xl text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00A89C] rounded-full ring-2 ring-slate-900" />
            </button>

            <div className="h-6 w-px bg-slate-800" />

            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00A89C] to-emerald-600 flex items-center justify-center font-black text-white text-xs shadow-md">
                AD
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-200">প্রধান এডমিন</p>
                <p className="text-[10px] text-slate-400">admin@quranijibon.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
