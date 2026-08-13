import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { getBlogPostByIdOrSlug, getBlogsData } from "@/data/blogsStorage";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
  CheckCircle2,
  Lightbulb,
  Mail,
  Send,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await getBlogPostByIdOrSlug(resolvedParams.slug);
  if (!post) return { title: "ব্লগ পাওয়া যায়নি | কুরআন জীবন" };

  const title = `${post.title} | কুরআন জীবন`;
  const description = post.excerpt;
  const articleImage = post.img || "/assets/why-learn-video-preview.webp";

  return {
    title,
    description,
    alternates: {
      canonical: `/blogs/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: `https://quranijibon.com/blogs/${post.slug}`,
      title,
      description,
      siteName: "কুরআন জীবন",
      locale: "bn_BD",
      images: [
        {
          url: articleImage,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [articleImage],
    },
  };
}

import StructuredData from "@/components/seo/StructuredData";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await getBlogPostByIdOrSlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const allData = await getBlogsData();
  const relatedPosts = allData.posts
    .filter((b) => b.slug !== post.slug)
    .slice(0, 2);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.img
      ? (post.img.startsWith("http") ? post.img : `https://quranijibon.com${post.img}`)
      : "https://quranijibon.com/assets/why-learn-video-preview.webp",
    "url": `https://quranijibon.com/blogs/${post.slug}`,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author || "কুরআন জীবন টিম",
    },
    "publisher": {
      "@type": "Organization",
      "name": "কুরআন জীবন",
      "logo": {
        "@type": "ImageObject",
        "url": "https://quranijibon.com/assets/website%20logo.png",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://quranijibon.com/blogs/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "হোম",
        "item": "https://quranijibon.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "ব্লগ",
        "item": "https://quranijibon.com/blogs",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://quranijibon.com/blogs/${post.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#FAFBFC] text-[#0F172A] relative font-sans">
      <StructuredData data={[blogPostingSchema, breadcrumbSchema]} />
      <FloatingContact />
      <Navbar />

      {/* Top Hero Banner Section */}
      <section className="relative w-full min-h-[380px] sm:min-h-[420px] bg-black/90 text-white flex items-end overflow-hidden py-12 border-b border-slate-200">
        <Image
          src={post.img || "/assets/why-learn-video-preview.webp"}
          alt={post.title}
          fill
          className="object-cover opacity-35"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-4">
          <span className="bg-[#E0F2F1] text-[#004D40] text-xs font-black px-4 py-1.5 rounded-full inline-block">
            ● {post.category}
          </span>

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black leading-snug tracking-tight drop-shadow-md max-w-3xl">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/15">
            {/* Author & Meta */}
            <div className="flex items-center space-x-3 text-xs sm:text-sm font-semibold text-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#00796B] text-white font-bold flex items-center justify-center text-sm shadow-md">
                {post.authorAvatar || post.author?.charAt(0)}
              </div>
              <div>
                <span className="font-bold text-white block">
                  {post.author}
                </span>
                <span className="text-slate-300 text-xs">
                  {post.date} • {post.readTime}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-white"
                aria-label="Bookmark"
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-white"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Article Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left Main Article Column */}
            <div className="flex-1 space-y-8 max-w-4xl">
              {/* Back Button */}
              <div>
                <Link
                  href="/blogs"
                  className="inline-flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>ব্লগে ফিরুন</span>
                </Link>
              </div>

              {/* Intro Text */}
              {post.content?.intro && (
                <p className="text-base sm:text-lg text-slate-800 font-semibold leading-relaxed border-b border-slate-200 pb-6">
                  {post.content.intro}
                </p>
              )}

              {/* Content Sections */}
              <div className="space-y-10">
                {post.content?.sections?.map((sec, idx) => (
                  <div key={sec.id || idx} id={`sec-${idx + 1}`} className="space-y-4">
                    <h2 className="text-2xl font-black text-slate-900 leading-snug">
                      {sec.heading}
                    </h2>

                    <p className="text-slate-700 leading-relaxed font-medium text-base">
                      {sec.text}
                    </p>

                    {/* Arabic Quranic Verse Callout Box */}
                    {sec.arabic && (
                      <div className="p-6 rounded-2xl bg-[#E0F2F1]/60 border-l-4 border-[#00A89C] space-y-2 my-4">
                        <p className="text-lg sm:text-xl font-bold text-[#004D40] leading-relaxed">
                          <span className="font-serif text-2xl text-slate-900 font-normal">
                            {sec.arabic}
                          </span>
                        </p>
                        {sec.translation && (
                          <p className="text-sm font-semibold text-slate-700">
                            {sec.translation}
                          </p>
                        )}
                        {sec.citation && (
                          <p className="text-xs font-bold text-[#00796B]">
                            {sec.citation}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Bullet Points with Checkmarks */}
                    {sec.points && (
                      <div className="space-y-3 pt-2">
                        {sec.points.map((pt, pIdx) => (
                          <div
                            key={pIdx}
                            className="flex items-start space-x-3 text-slate-800 text-sm font-semibold bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100"
                          >
                            <CheckCircle2 className="w-5 h-5 text-[#00A89C] flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{pt}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Warning Callout Box */}
                    {sec.warning && (
                      <div className="p-5 rounded-2xl bg-[#FFF8E1] border border-[#FFE082] flex items-start space-x-3 text-amber-900 my-4 shadow-xs">
                        <Lightbulb className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm font-bold leading-relaxed">
                          {sec.warning}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Conclusion Section */}
              {post.content?.conclusion && (
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <h3 className="text-2xl font-black text-slate-900">পরিশেষে</h3>
                  <p className="text-slate-700 text-base leading-relaxed font-medium">
                    {post.content.conclusion}
                  </p>
                </div>
              )}

              {/* Tags Row */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-4">
                  <span className="text-xs font-bold text-slate-500">ট্যাগসমূহ:</span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#E0F2F1] text-[#004D40] text-xs font-bold px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author Box */}
              <div className="bg-[#F8FAF9] p-6 rounded-3xl border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-5 shadow-xs">
                <div className="w-14 h-14 rounded-full bg-[#00796B] text-white font-bold flex items-center justify-center text-xl flex-shrink-0 shadow-md">
                  {post.authorAvatar || post.author?.charAt(0)}
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#00796B] uppercase tracking-wider">
                    লেখক সম্মাননা
                  </span>
                  <h4 className="text-lg font-black text-slate-900">
                    {post.author}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {post.authorBio || `${post.authorRole || "লেখক"} - কুরআন জীবন একাডেমি`}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sidebar Column */}
            <aside className="w-full lg:w-[340px] space-y-6 flex-shrink-0 sticky top-24">
              {/* Widget 1: বিষয়সূচি (TOC) */}
              {post.toc && post.toc.length > 0 && (
                <div className="bg-[#FFF8F6] p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4">
                  <h3 className="font-black text-slate-900 text-base border-b border-rose-200/60 pb-2">
                    বিষয়সূচি
                  </h3>
                  <ol className="space-y-2.5 text-xs sm:text-sm font-extrabold text-slate-700">
                    {post.toc.map((item) => (
                      <li key={item.num} className="hover:text-[#00796B] transition-colors">
                        <a href={`#sec-${item.num}`} className="flex items-start space-x-2">
                          <span className="text-[#00796B]">{item.num}.</span>
                          <span className="line-clamp-1">{item.title}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Widget 2: আরও পড়ুন */}
              {relatedPosts.length > 0 && (
                <div className="bg-[#F8FAF9] p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <h3 className="font-black text-slate-900 text-base border-b border-slate-200 pb-2">
                    আরও পড়ুন
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/blogs/${rel.slug}`}
                        className="block space-y-2 group"
                      >
                        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100">
                          <Image
                            src={rel.img || "/assets/why-learn-video-preview.webp"}
                            alt={rel.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <span className="bg-[#E0F2F1] text-[#004D40] text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-block">
                          ● {rel.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#00796B] transition-colors line-clamp-2 leading-snug">
                          {rel.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Widget 3: নতুন লেখার আপডেট পান (Newsletter) */}
              <div className="bg-[#00796B] text-white p-6 rounded-3xl space-y-4 shadow-lg border border-teal-600">
                <div className="flex items-center space-x-2 text-teal-200">
                  <Mail className="w-5 h-5 text-teal-300" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    আর্টিকেল আপডেট
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-black text-white">
                    নতুন লেখার আপডেট পান
                  </h3>
                  <p className="text-teal-100 text-xs font-medium">
                    প্রতি সপ্তাহে সেরা লেখাটি দেখুন সরাসরি ইমেইলে।
                  </p>
                </div>
                <form className="space-y-2.5">
                  <input
                    type="email"
                    placeholder="আপনার ইমেইল..."
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 text-white placeholder:text-teal-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-300 border border-white/20"
                  />
                  <button
                    type="submit"
                    className="w-full bg-white text-[#004D40] font-black text-xs py-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all shadow-md active:scale-95"
                  >
                    <span>সাবস্ক্রাইব</span>
                    <Send className="w-3.5 h-3.5 text-[#00796B]" />
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
