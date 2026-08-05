"use client";

import { useState } from "react";
import {
  FileText,
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  X,
  Check,
  Tag,
  Calendar,
  User,
} from "lucide-react";
import { BLOG_POSTS, BlogPost } from "@/data/blogs";

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("সব");

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [previewPost, setPreviewPost] = useState<BlogPost | null>(null);

  // Form fields for Create / Edit
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("তাজবীদ");
  const [formAuthor, setFormAuthor] = useState("উস্তাদ রফিকুল ইসলাম");
  const [formReadTime, setFormReadTime] = useState("৬ মিনিট পড়া");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formContentIntro, setFormContentIntro] = useState("");

  const categories = ["সব", "তাজবীদ", "শিক্ষার টিপস", "ইসলামি জীবনধারা"];

  const openCreateModal = () => {
    setFormTitle("");
    setFormCategory("তাজবীদ");
    setFormAuthor("উস্তাদ রফিকুল ইসলাম");
    setFormReadTime("৬ মিনিট পড়া");
    setFormExcerpt("");
    setFormContentIntro("");
    setIsCreateModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setFormTitle(post.title);
    setFormCategory(post.category);
    setFormAuthor(post.author);
    setFormReadTime(post.readTime);
    setFormExcerpt(post.excerpt);
    setFormContentIntro(post.content.intro);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formExcerpt) return;

    if (editingPost) {
      // Update existing post
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingPost.id
            ? {
                ...p,
                title: formTitle,
                category: formCategory,
                author: formAuthor,
                readTime: formReadTime,
                excerpt: formExcerpt,
                content: {
                  ...p.content,
                  intro: formContentIntro || p.content.intro,
                },
              }
            : p
        )
      );
      setEditingPost(null);
    } else {
      // Create new post
      const newPost: BlogPost = {
        id: `post-${Date.now()}`,
        slug: formTitle.toLowerCase().replace(/\s+/g, "-"),
        title: formTitle,
        category: formCategory,
        date: "আজ",
        readTime: formReadTime,
        author: formAuthor,
        authorAvatar: formAuthor.charAt(0),
        authorRole: "ইসলামি গবেষক",
        authorBio: "কুরআন জীবন লেখক দল",
        excerpt: formExcerpt,
        img: "/assets/why_learn_video_37_1931.png",
        tags: [`# ${formCategory}`, "# কুরআন"],
        toc: [{ num: 1, title: "সূচনা" }],
        content: {
          intro: formContentIntro || formExcerpt,
          sections: [
            {
              id: "sec-1",
              heading: "১. মূল আলোচনা",
              text: formExcerpt,
            },
          ],
          conclusion: "আল্লাহ আমাদের তৌফিক দিন।",
        },
      };
      setPosts([newPost, ...posts]);
      setIsCreateModalOpen(false);
    }
  };

  const handleDeletePost = (id: string) => {
    if (confirm("আপনি কি নিশ্চিতভাবে এই ব্লগ পোস্টটি মুছে ফেলতে চান?")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategory === "সব" || post.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#00A89C]" />
            ব্লগ পোস্ট ব্যবস্থাপনা (Blog Management)
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            নতুন ইসলামি আর্টিকেল প্রকাশ, এডিট এবং ডিলিট করুন
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-[#00A89C] hover:bg-[#00897B] text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl transition-all shadow-lg shadow-[#00A89C]/20 flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন ব্লগ পোস্ট লিখুন</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ব্লগের শিরোনাম বা লেখক সার্চ করুন..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#00A89C]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-[#00A89C] text-white"
                  : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
              <tr>
                <th className="p-4">ব্লগ শিরোনাম</th>
                <th className="p-4">ক্যাটাগরি</th>
                <th className="p-4">লেখক</th>
                <th className="p-4">পড়ার সময়</th>
                <th className="p-4 text-right">একশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    কোনো ব্লগ পোস্ট খুঁজে পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 max-w-xs sm:max-w-md">
                      <div className="font-bold text-white text-sm line-clamp-1 mb-1">
                        {post.title}
                      </div>
                      <p className="text-slate-400 text-[11px] line-clamp-1 font-normal">
                        {post.excerpt}
                      </p>
                    </td>
                    <td className="p-4">
                      <span className="bg-slate-800 text-[#00A89C] border border-[#00A89C]/30 px-2.5 py-1 rounded-md text-[11px] font-bold inline-block">
                        {post.category}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-slate-300">
                      <div className="flex items-center space-x-1.5">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        <span>{post.author}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{post.readTime}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setPreviewPost(post)}
                          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(post)}
                          className="p-2 rounded-lg bg-slate-800 text-sky-400 hover:bg-sky-500/10 transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Blog Post Modal */}
      {(isCreateModalOpen || editingPost) && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-black text-white">
                {editingPost ? "ব্লগ পোস্ট সম্পাদনা করুন" : "নতুন ব্লগ পোস্ট তৈরি করুন"}
              </h2>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingPost(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">ব্লগের শিরোনাম</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="যেমন: তাজবীদের ১০টি মূল নিয়ম যা জানা উচিত"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">ক্যাটাগরি</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                  >
                    <option value="তাজবীদ">তাজবীদ</option>
                    <option value="শিক্ষার টিপস">শিক্ষার টিপস</option>
                    <option value="ইসলামি জীবনধারা">ইসলামি জীবনধারা</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">লেখক</label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">পড়ার সময়</label>
                  <input
                    type="text"
                    value={formReadTime}
                    onChange={(e) => setFormReadTime(e.target.value)}
                    placeholder="যেমন: ৮ মিনিট পড়া"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">সংক্ষিপ্ত সারসংক্ষেপ (Excerpt)</label>
                <textarea
                  rows={2}
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  placeholder="ব্লগটির মূল বার্তা সংক্ষেপে লিখুন..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">মূল বর্ণনা / ভূমিকা (Intro)</label>
                <textarea
                  rows={4}
                  value={formContentIntro}
                  onChange={(e) => setFormContentIntro(e.target.value)}
                  placeholder="ব্লগের বিস্তারিত বিষয়বস্তু..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingPost(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#00A89C] text-white font-bold hover:bg-[#00897B] shadow-md"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewPost && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="bg-[#00A89C]/20 text-[#00A89C] text-xs font-bold px-3 py-1 rounded-full border border-[#00A89C]/30">
                {previewPost.category}
              </span>
              <button
                onClick={() => setPreviewPost(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-xl font-black text-white">{previewPost.title}</h2>
            <div className="flex items-center space-x-3 text-xs text-slate-400 border-b border-slate-800/60 pb-3">
              <span>লেখক: {previewPost.author}</span>
              <span>•</span>
              <span>পড়ার সময়: {previewPost.readTime}</span>
            </div>

            <div className="text-slate-300 text-xs sm:text-sm leading-relaxed space-y-3">
              <p className="font-semibold text-slate-200">{previewPost.excerpt}</p>
              <p>{previewPost.content.intro}</p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setPreviewPost(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
