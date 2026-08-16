"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { BLOG_POSTS, BlogPost, sanitizeBlogImage } from "@/data/blogs";

export default function RecentBlogSection({ posts }: { posts?: BlogPost[] }) {
  const displayPosts = posts && posts.length > 0 ? posts : BLOG_POSTS;
  const recentThreeBlogs = displayPosts.slice(0, 3);

  return (
    <section id="blogs" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[#00A89C] font-bold text-sm tracking-wide uppercase bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
              আমাদের লেখা আর্টিকেল
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
              সাম্প্রতিক ব্লগ থেকে পড়ুন
            </h2>
          </div>
          <Link
            href="/blogs"
            className="inline-flex items-center space-x-2 text-[#00A89C] font-bold hover:text-[#00897B] transition-colors group"
          >
            <span>সব ব্লগ আর্টিকেল দেখুন</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Cards Grid on Home Page */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentThreeBlogs.map((b, index) => (
            <article
              key={b.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-[#00A89C] transition-all shadow-md hover:shadow-xl hover:-translate-y-1 flex flex-col group"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <Image
                  src={sanitizeBlogImage(b.img, index)}
                  alt={b.title}
                  width={600}
                  height={375}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#00A89C] text-white text-xs font-bold px-3.5 py-1 rounded-lg shadow-xs">
                  {b.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-4 text-xs font-semibold text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-[#00A89C]" />
                      <span>{b.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-[#00A89C]" />
                      <span>{b.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 group-hover:text-[#00A89C] transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blogs/${b.slug}`}>{b.title}</Link>
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 font-medium">
                    {b.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <Link
                    href={`/blogs/${b.slug}`}
                    className="text-[#00A89C] font-extrabold text-sm inline-flex items-center space-x-1.5 hover:space-x-2.5 transition-all"
                  >
                    <span>বিস্তারিত পড়ুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
