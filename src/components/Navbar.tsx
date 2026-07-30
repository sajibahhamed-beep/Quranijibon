"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/assets/website logo.png"
              alt="Quranijibon Logo"
              width={200}
              height={50}
              className="h-11 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center h-full space-x-1 lg:space-x-2">
            <Link
              href="#home"
              className="h-20 px-6 bg-[#00A89C] text-white font-bold flex items-center transition-colors"
            >
              হোম
            </Link>
            <Link
              href="#about"
              className="h-20 px-5 text-slate-700 hover:text-[#00A89C] font-semibold flex items-center transition-colors"
            >
              আমাদের সম্পর্কে
            </Link>
            <Link
              href="#contact"
              className="h-20 px-5 text-slate-700 hover:text-[#00A89C] font-semibold flex items-center transition-colors"
            >
              যোগাযোগ
            </Link>
            <Link
              href="#hadia"
              className="h-20 px-5 text-slate-700 hover:text-[#00A89C] font-semibold flex items-center transition-colors"
            >
              সাদাকা ও হাদিয়া
            </Link>
            <Link
              href="#blogs"
              className="h-20 px-5 text-slate-700 hover:text-[#00A89C] font-semibold flex items-center transition-colors"
            >
              ব্লগসমূহ
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg">
          <Link
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-lg bg-[#00A89C] text-white font-bold"
          >
            হোম
          </Link>
          <Link
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 font-semibold"
          >
            আমাদের সম্পর্কে
          </Link>
          <Link
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 font-semibold"
          >
            যোগাযোগ
          </Link>
          <Link
            href="#hadia"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 font-semibold"
          >
            সাদাকা ও হাদিয়া
          </Link>
          <Link
            href="#blogs"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 font-semibold"
          >
            ব্লগসমূহ
          </Link>
        </div>
      )}
    </header>
  );
}
