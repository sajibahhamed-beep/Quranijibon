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
  Settings,
  PhoneCall,
  RotateCw,
  Mail,
} from "lucide-react";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  // Exclude login page from layout wrapping logic
  const isLoginPage = pathname === "/admin/login";

  const fetchUnreadCount = async () => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      if (data.success && Array.isArray(data.notifications)) {
        const count = data.notifications.filter((n: any) => !n.read).length;
        setUnreadCount(count);
      }
    } catch (e) {
      console.error("Failed to fetch unread notifications count:", e);
    }
  };

  useEffect(() => {
    if (isLoginPage) {
      setIsAuthenticated(true);
      return;
    }
    const session = localStorage.getItem("quranijibon_admin_session");
    if (!session) {
      localStorage.setItem("quranijibon_admin_session", "authenticated");
    }
    setIsAuthenticated(true);

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 10000);
    return () => clearInterval(interval);
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
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
      label: "অনুদান ও শিক্ষার্থী হাদিয়া",
      href: "/admin/donations",
      icon: HeartHandshake,
      active: pathname === "/admin/donations",
    },
    {
      label: "বার্তা ও ইনকোয়ারি",
      href: "/admin/messages",
      icon: Mail,
      active: pathname === "/admin/messages",
    },
    {
      label: "FAQ ও প্রশ্নাবলী",
      href: "/admin/faqs",
      icon: HelpCircle,
      active: pathname === "/admin/faqs",
    },
    {
      label: "পেজ ম্যানেজমেন্ট",
      href: "/admin/pages",
      icon: Settings,
      active: pathname === "/admin/pages",
    },
    {
      label: "সাইট, ব্যাংক ও যোগাযোগ সেটিংস",
      href: "/admin/settings",
      icon: Settings,
      active: pathname === "/admin/settings",
    },
    {
      label: "নোটিফিকেশন সেন্টার",
      href: "/admin/notifications",
      icon: Bell,
      active: pathname === "/admin/notifications",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFBFC] text-[#0F172A] flex flex-col lg:flex-row admin-theme font-solaiman" suppressHydrationWarning>
      {/* Mobile Header Bar */}
      <header className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <Link href="/admin" className="flex items-center space-x-2">
          <Image
            src="/assets/website-logo.png"
            alt="Quranijibon Logo"
            width={140}
            height={35}
            className="h-8 w-auto object-contain"
          />
          <span className="bg-teal-50 text-[#007C7A] text-xs font-bold px-2 py-0.5 rounded-full border border-teal-200">
            ADMIN
          </span>
        </Link>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 text-slate-600 hover:text-[#00A89C] rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center cursor-pointer"
            title="ডাটা রিফ্রেশ করুন"
          >
            <RotateCw className={`w-4 h-4 text-[#00A89C] ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
          <Link
            href="/admin/notifications"
            className="p-2 text-slate-600 hover:text-[#00A89C] rounded-xl bg-slate-50 border border-slate-200 relative flex items-center justify-center"
            title="নোটিফিকেশন"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-extrabold text-xs min-w-4 h-4 px-1 rounded-full flex items-center justify-center border border-white animate-pulse">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Sidebar Navigation - Fixed & Clean Light Theme */}
      <aside
        className={`fixed lg:sticky top-0 inset-y-0 left-0 z-50 w-72 h-screen max-h-screen bg-white border-r border-slate-200 flex flex-col justify-between overflow-y-auto select-none transition-transform duration-300 shadow-sm lg:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Sidebar Top Branding */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <Link href="/admin" className="flex items-center space-x-2">
              <Image
                src="/assets/website-logo.png"
                alt="Quranijibon Logo"
                width={160}
                height={40}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <span className="bg-teal-50 text-[#007C7A] text-xs font-bold px-2.5 py-1 rounded-full border border-teal-200">
              ADMIN
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <p className="px-3 text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">
              প্রধান মেনু
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                    item.active
                      ? "bg-[#00A89C] text-white shadow-md shadow-[#00A89C]/25 font-bold"
                      : "text-slate-600 hover:text-[#007C7A] hover:bg-teal-50/70"
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
        <div className="p-4 border-t border-slate-100 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold text-slate-700 hover:text-[#00A89C] bg-slate-50 hover:bg-teal-50 border border-slate-200 transition-colors"
          >
            <span className="flex items-center space-x-2">
              <ExternalLink className="w-4 h-4 text-[#00A89C]" />
              <span>মূল ওয়েবসাইট ভিজিট</span>
            </span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
              Live
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors text-left cursor-pointer"
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
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Main Admin Content Body */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Top Navigation Bar */}
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-4 hidden lg:flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center space-x-4 max-w-md w-full">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="শিক্ষার্থী, অনুদান বা শিক্ষক খুঁজুন..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 rounded-xl text-slate-700 hover:text-[#007C7A] bg-slate-50 hover:bg-teal-50 border border-slate-200 transition-all flex items-center space-x-2 text-xs font-bold active:scale-95 cursor-pointer shadow-xs"
              title="ডাটা রিফ্রেশ করুন (Refresh Admin Data)"
            >
              <RotateCw className={`w-4 h-4 text-[#00A89C] ${isRefreshing ? "animate-spin" : ""}`} />
              <span>রিফ্রেশ</span>
            </button>

            <Link
              href="/admin/notifications"
              className={`p-2.5 rounded-xl transition-all relative flex items-center justify-center border ${
                pathname === "/admin/notifications"
                  ? "bg-[#00A89C] text-white border-[#00A89C] shadow-md shadow-[#00A89C]/30"
                  : "text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-teal-50 border-slate-200"
              }`}
              title="নোটিফিকেশন সেন্টার"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-extrabold text-xs min-w-5 h-5 px-1 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </Link>

            <div className="h-6 w-px bg-slate-200" />

            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-[#00A89C] flex items-center justify-center font-black text-white text-xs shadow-md">
                AD
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-slate-900">প্রধান এডমিন</p>
                <p className="text-xs text-slate-500 font-mono">admin@quranijibon.com</p>
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
