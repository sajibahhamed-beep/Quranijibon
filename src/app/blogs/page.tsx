"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import {
  BLOG_POSTS,
  RECENT_SIDEBAR_ARTICLES,
  BLOG_AUTHORS,
  BlogPost,
} from "@/data/blogs";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, ChevronRight, TrendingUp, PenTool, Send } from "lucide-react";

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("সব লেখা");

  const categories = [
    "সব লেখা",
    "তাজবীদ",
    "কুরআন তিলাওয়াত",
    "ইসলামি জীবনধারা",
    "শিক্ষার টিপস",
    "অনুপ্রেরণা",
  ];

  const featuredPost = BLOG_POSTS.find((b) => b.featured) || BLOG_POSTS[0];

  const gridPosts = BLOG_POSTS.filter((b) => !b.featured).filter((post) => {
    if (selectedCategory === "সব লেখা") return true;
    return post.category === selectedCategory;
  });

  return (
    <main className="min-h-screen bg-[#FAFBFC] text-[#0F172A] relative font-sans">
      <FloatingContact />
      <Navbar />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Top Header Label */}
        <div className="flex items-center space-x-2 text-[#00796B] font-extrabold text-sm tracking-wide">
          <TrendingUp className="w-4 h-4" />
          <span>এই সপ্তাহের বিশেষ লেখা</span>
        </div>

        {/* Hero Featured Article Banner Card */}
        <section className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[420px] sm:min-h-[460px] flex items-end">
          {/* Background Image */}
          <Image
            src={featuredPost.img}
            alt={featuredPost.title}
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />

          {/* Banner Content */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-12 space-y-4 max-w-4xl text-white">
            <span className="bg-[#E0F2F1] text-[#004D40] text-xs font-black px-4 py-1.5 rounded-full inline-block tracking-wide shadow-sm">
              ● {featuredPost.category}
            </span>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight drop-shadow-md">
              <Link
                href={`/blogs/${featuredPost.slug}`}
                className="hover:text-teal-200 transition-colors"
              >
                {featuredPost.title}
              </Link>
            </h1>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed line-clamp-2 font-medium max-w-3xl">
              {featuredPost.excerpt}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/15">
              {/* Author Info */}
              <div className="flex items-center space-x-3 text-xs sm:text-sm font-semibold">
                <div className="w-8 h-8 rounded-full bg-[#00796B] text-white font-bold flex items-center justify-center text-sm shadow-md">
                  {featuredPost.authorAvatar}
                </div>
                <div>
                  <span className="font-bold block text-white">
                    {featuredPost.author}
                  </span>
                  <span className="text-slate-300 text-xs">
                    {featuredPost.date} • {featuredPost.readTime}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={`/blogs/${featuredPost.slug}`}
                className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-md text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all shadow-md active:scale-95"
              >
                <span>পুরা লেখা পড়ুন</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Category Filter Pills Row */}
        <section className="pt-2">
          <div className="flex flex-wrap items-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#00796B] text-white shadow-md shadow-[#00796B]/20 scale-105"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* 2-Column Content Grid: Main Cards + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main Left Column: 2-Cols Card Grid */}
          <div className="flex-1 w-full">
            {gridPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {gridPosts.map((b) => (
                  <article
                    key={b.id}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-[#00796B] transition-all shadow-sm hover:shadow-xl flex flex-col justify-between group"
                  >
                    {/* Card Top Thumbnail Image */}
                    <div>
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                        <Image
                          src={b.img}
                          alt={b.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Card Content */}
                      <div className="p-5 sm:p-6 space-y-3">
                        <span className="bg-[#E0F2F1] text-[#004D40] text-xs font-bold px-3 py-1 rounded-full inline-block">
                          ● {b.category}
                        </span>

                        <h2 className="text-lg font-black text-slate-900 group-hover:text-[#00796B] transition-colors leading-snug line-clamp-2">
                          <Link href={`/blogs/${b.slug}`}>{b.title}</Link>
                        </h2>

                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 font-medium">
                          {b.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer Author Info */}
                    <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 flex items-center space-x-3 mt-2">
                      <div className="w-7 h-7 rounded-full bg-[#00796B] text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
                        {b.authorAvatar}
                      </div>
                      <div className="text-xs font-semibold text-slate-600">
                        <span className="font-bold text-slate-900 block">
                          {b.author}
                        </span>
                        <span className="text-slate-400">
                          {b.date} {b.readTime ? `• ${b.readTime}` : ""}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 max-w-md mx-auto space-y-3">
                <p className="text-slate-500 font-bold text-base">
                  এই ক্যাটাগরিতে কোনো লেখা পাওয়া যায়নি
                </p>
                <button
                  onClick={() => setSelectedCategory("সব লেখা")}
                  className="text-[#00796B] font-bold text-sm underline"
                >
                  সব লেখা দেখুন
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar Column */}
          <aside className="w-full lg:w-[340px] space-y-6 flex-shrink-0 sticky top-24">
            {/* Sidebar Widget 1: সাম্প্রতিক লেখা */}
            <div className="bg-[#F8FAF9] p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex items-center space-x-2 text-[#00796B] font-black text-base">
                <TrendingUp className="w-4 h-4 text-[#00796B]" />
                <span>সাম্প্রতিক লেখা</span>
              </div>

              <div className="space-y-4">
                {RECENT_SIDEBAR_ARTICLES.map((item) => (
                  <Link
                    key={item.num}
                    href={`/blogs/${item.slug}`}
                    className="flex items-start space-x-3 p-3 rounded-2xl hover:bg-white transition-colors group"
                  >
                    <span className="text-2xl font-black text-slate-300 group-hover:text-[#00796B] transition-colors flex-shrink-0">
                      {item.num}
                    </span>
                    <div className="space-y-1">
                      <span className="bg-[#E0F2F1] text-[#004D40] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full inline-block">
                        ● {item.category}
                      </span>
                      <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#00796B] transition-colors leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center space-x-1 text-[11px] font-semibold text-slate-400">
                        <Clock className="w-3 h-3 text-[#00796B]" />
                        <span>{item.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar Widget 2: আমাদের লেখকগণ */}
            <div className="bg-[#F8FAF9] p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
              <h3 className="font-black text-slate-900 text-base">
                আমাদের লেখকগণ
              </h3>

              <div className="space-y-3">
                {BLOG_AUTHORS.map((author, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-white transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-[#00796B] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                        {author.initial}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                          {author.name}
                        </h4>
                        <p className="text-[11px] font-semibold text-slate-500">
                          {author.role} • {author.articlesCount}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Widget 3: লেখা পাঠিয়ে সওয়াব অর্জন করুন (Sawab-e-Jariyah Writing Banner) */}
            <div className="bg-gradient-to-br from-[#00796B] to-[#004D40] text-white p-6 rounded-3xl space-y-4 shadow-lg border border-teal-600/40 relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />

              <div className="flex items-center space-x-2.5 text-teal-200">
                <PenTool className="w-5 h-5 text-teal-300" />
                <span className="text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/15">
                  সদকা-ই-জারিয়া
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-white leading-snug">
                  আপনার লেখা পাঠাও এবং সওয়াব হাসিল করুন
                </h3>
                <p className="text-teal-100 text-xs leading-relaxed font-medium">
                  আপনি কি দ্বীনি শিক্ষা বা কুরআন তিলাওয়াতের ওপর লেখালেখি করেন? আপনার লেখা লক্ষাধিক পাঠকের কাছে পৌঁছে দিয়ে সদকা-ই-জারিয়ার সওয়াব অর্জন করুন।
                </p>
              </div>

              <a
                href="https://wa.me/8801775551325?text=আসসালামু%20আলাইকুম,%20আমি%20কুরআন%20জীবন%20ব্লগে%20আমার%20লেখা%20জমা%20দিতে%20চাই।"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-white hover:bg-teal-50 text-[#004D40] font-black text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95"
              >
                <span>লেখা জমা দিন</span>
                <Send className="w-4 h-4 text-[#00796B]" />
              </a>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}
