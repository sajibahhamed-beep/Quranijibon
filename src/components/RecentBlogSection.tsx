"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export default function RecentBlogSection() {
  const blogs = [
    {
      title: "সহজে কুরআন শিক্ষা করার ১০টি কার্যকর উপায়",
      category: "কুরআন শিক্ষা",
      date: "২৮ জুলাই ২০২৬",
      readTime: "৫ মিনিট পড়া",
      excerpt: "ব্যস্ত জীবনের মধ্যেও যেভাবে প্রতিদিন নিয়ম করে কুরআন তিলাওয়াত ও সহীহ তাজবীদ শিক্ষা সম্পন্ন করবেন...",
      img: "/assets/figma_section_37_1987.png",
    },
    {
      title: "কেন শিশুদের শৈশবেই দ্বীনি শিক্ষা দেওয়া জরুরি?",
      category: "সন্তানের তারবিয়াত",
      date: "২৫ জুলাই ২০২৬",
      readTime: "৪ মিনিট পড়া",
      excerpt: "শিশুদের কচি মনে তাওহীদের শিক্ষা এবং কুরআনের মহব্বত জাগ্রত করার গুরুত্বপূর্ণ গাইডলাইন...",
      img: "/assets/figma_section_37_2328.png",
    },
    {
      title: "অনলাইন কুরআন ক্লাসের সুবিধা ও অনলাইন নিরাপত্তা",
      category: "অনলাইন ক্লাস",
      date: "২০ জুলাই ২০২৬",
      readTime: "৬ মিনিট পড়া",
      excerpt: "ঘরে বসেই অভিজ্ঞ ও বিশ্বস্ত শিক্ষকদের সান্নিধ্যে শুদ্ধভাবে কুরআন শিক্ষার আধুনিক ডিজিটাল মাধ্যম...",
      img: "/assets/figma_section_37_2094.png",
    },
  ];

  return (
    <section id="blogs" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-emerald-700 font-bold text-sm tracking-wide uppercase bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-200">
              আমাদের লেখা আর্টিকেল
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
              সাম্প্রতিক ব্লগ থেকে পড়ুন
            </h2>
          </div>
          <Link
            href="#blogs"
            className="inline-flex items-center space-x-2 text-emerald-700 font-bold hover:text-emerald-800 transition-colors group"
          >
            <span>সব ব্লগ আর্টিকেল দেখুন</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((b, idx) => (
            <article
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-emerald-500 transition-all shadow-md hover:shadow-xl hover:-translate-y-1 flex flex-col"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <Image
                  src={b.img}
                  alt={b.title}
                  width={600}
                  height={375}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-xs">
                  {b.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-4 text-xs text-slate-500 font-medium">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{b.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>{b.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 hover:text-emerald-700 transition-colors leading-snug">
                    {b.title}
                  </h3>

                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {b.excerpt}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-emerald-700 font-bold text-sm flex items-center space-x-1 group">
                    <span>বিস্তারিত পড়ুন</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
