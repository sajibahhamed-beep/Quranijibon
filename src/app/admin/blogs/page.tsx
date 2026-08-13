"use client";

import { useState, useEffect } from "react";
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
  Star,
  Image as ImageIcon,
  Loader2,
  PlusCircle,
  Trash,
} from "lucide-react";
import { BlogPost } from "@/data/blogs";

const PRESET_IMAGES = [
  { label: "তাজবীদ / ক্লাস", url: "/assets/why-learn-video-preview.webp" },
  { label: "হিফজ / বই", url: "/assets/figma_img_37_1993.png" },
  { label: "মাখরাজ / নিয়ম", url: "/assets/figma_img_37_1997.png" },
  { label: "জীবনধারা / রু ক্বিয়াহ", url: "/assets/figma_img_37_2001.png" },
  { label: "কুরআন তিলাওয়াত", url: "/assets/hero_bg.png" },
];

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

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
  const [formAuthorRole, setFormAuthorRole] = useState("তাজবীদ ও কুরআন বিজ্ঞান শিক্ষক");
  const [formReadTime, setFormReadTime] = useState("৬ মিনিট পড়া");
  const [formImg, setFormImg] = useState("/assets/why-learn-video-preview.webp");
  const [formFeatured, setFormFeatured] = useState(false);
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formContentIntro, setFormContentIntro] = useState("");
  const [formTags, setFormTags] = useState("# তাজবীদ, # কুরআন, # শিক্ষা");
  
  // Custom Sections
  const [formSections, setFormSections] = useState<
    { id: string; heading: string; text: string; arabic?: string; translation?: string; warning?: string }[]
  >([
    {
      id: "sec-1",
      heading: "১. মূল আলোচনা",
      text: "",
    },
  ]);

  const categories = ["সব", "তাজবীদ", "শিক্ষার টিপস", "ইসলামি জীবনধারা", "কুরআন তিলাওয়াত", "অনুপ্রেরণা"];

  // Fetch blogs from API
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error("Failed to load blogs:", err);
      showStatus("error", "ব্লগ তালিকা লোড করতে ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const showStatus = (type: "success" | "error", text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const openCreateModal = () => {
    setFormTitle("");
    setFormCategory("তাজবীদ");
    setFormAuthor("উস্তাদ রফিকুল ইসলাম");
    setFormAuthorRole("তাজবীদ ও কুরআন বিজ্ঞান শিক্ষক");
    setFormReadTime("৬ মিনিট পড়া");
    setFormImg("/assets/why-learn-video-preview.webp");
    setFormFeatured(false);
    setFormExcerpt("");
    setFormContentIntro("");
    setFormTags("# তাজবীদ, # কুরআন");
    setFormSections([
      {
        id: "sec-1",
        heading: "১. মূল আলোচনা",
        text: "",
      },
    ]);
    setIsCreateModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setFormTitle(post.title);
    setFormCategory(post.category);
    setFormAuthor(post.author);
    setFormAuthorRole(post.authorRole || "ইসলামি গবেষক");
    setFormReadTime(post.readTime);
    setFormImg(post.img || "/assets/why-learn-video-preview.webp");
    setFormFeatured(!!post.featured);
    setFormExcerpt(post.excerpt);
    setFormContentIntro(post.content.intro);
    setFormTags(post.tags ? post.tags.join(", ") : "# তাজবীদ");
    
    if (post.content.sections && post.content.sections.length > 0) {
      setFormSections(
        post.content.sections.map((s, idx) => ({
          id: s.id || `sec-${idx + 1}`,
          heading: s.heading || `সেকশন ${idx + 1}`,
          text: s.text || "",
          arabic: s.arabic || "",
          translation: s.translation || "",
          warning: s.warning || "",
        }))
      );
    } else {
      setFormSections([
        {
          id: "sec-1",
          heading: "১. মূল আলোচনা",
          text: post.excerpt || "",
        },
      ]);
    }
  };

  const handleAddSection = () => {
    const nextNum = formSections.length + 1;
    setFormSections([
      ...formSections,
      {
        id: `sec-${nextNum}`,
        heading: `${nextNum}. নতুন অনুচ্ছেদ`,
        text: "",
      },
    ]);
  };

  const handleRemoveSection = (index: number) => {
    if (formSections.length <= 1) return;
    setFormSections(formSections.filter((_, i) => i !== index));
  };

  const handleSectionChange = (index: number, field: string, value: string) => {
    const updated = [...formSections];
    updated[index] = { ...updated[index], [field]: value };
    setFormSections(updated);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formExcerpt.trim()) {
      showStatus("error", "দয়া করে ব্লগের শিরোনাম এবং সারসংক্ষেপ প্রদান করুন");
      return;
    }

    try {
      setSaving(true);
      const parsedTags = formTags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0)
        .map((t) => (t.startsWith("#") ? t : `# ${t}`));

      const tocItems = formSections.map((s, idx) => ({
        num: idx + 1,
        title: s.heading.replace(/^\d+\.\s*/, ""),
      }));

      const payload = {
        title: formTitle,
        category: formCategory,
        author: formAuthor,
        authorRole: formAuthorRole,
        authorAvatar: formAuthor.charAt(0),
        readTime: formReadTime,
        img: formImg,
        featured: formFeatured,
        excerpt: formExcerpt,
        tags: parsedTags,
        toc: tocItems,
        content: {
          intro: formContentIntro || formExcerpt,
          sections: formSections,
          conclusion: "আল্লাহ তৌফিক দান করুন।",
        },
      };

      if (editingPost) {
        // PUT update
        const res = await fetch(`/api/blogs/${editingPost.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showStatus("success", "ব্লগ সফলভাবে আপডেট করা হয়েছে");
          setEditingPost(null);
          await fetchBlogs();
        } else {
          showStatus("error", data.message || "আপডেট ব্যর্থ হয়েছে");
        }
      } else {
        // POST create
        const res = await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showStatus("success", "নতুন ব্লগ সফলভাবে তৈরি ও প্রকাশিত হয়েছে");
          setIsCreateModalOpen(false);
          await fetchBlogs();
        } else {
          showStatus("error", data.message || "তৈরি করতে ব্যর্থ হয়েছে");
        }
      }
    } catch (err) {
      console.error("Save error:", err);
      showStatus("error", "সার্ভারের সাথে যোগাযোগে ত্রুটি হয়েছে");
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (id: string, title: string) => {
    if (!confirm(`আপনি কি নিশ্চিতভাবে "${title}" ব্লগ পোস্টটি মুছে ফেলতে চান?`)) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showStatus("success", "ব্লগ পোস্টটি মুছে ফেলা হয়েছে");
        await fetchBlogs();
      } else {
        showStatus("error", data.message || "মুছে ফেলা ব্যর্থ হয়েছে");
      }
    } catch (err) {
      showStatus("error", "মুছে ফেলার সময় ত্রুটি হয়েছে");
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
      {/* Toast Banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between border ${
            statusMessage.type === "success"
              ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
              : "bg-rose-950/80 border-rose-500/40 text-rose-300"
          }`}
        >
          <span>{statusMessage.text}</span>
          <button onClick={() => setStatusMessage(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#00A89C]" />
            ডায়নামিক ব্লগ ব্যবস্থাপনা (Blog Management System)
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            ফ্রন্টএন্ড ও ব্যাকএন্ডের জন্য সরাসরি ব্লগ পোস্ট তৈরি, এডিট ও প্রকাশ করুন
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-[#00A89C] hover:bg-[#00897B] text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl transition-all shadow-lg shadow-[#00A89C]/20 flex items-center justify-center space-x-2 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন ডাইনামিক ব্লগ প্রকাশ করুন</span>
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
                <th className="p-4 text-center">ফিচারড</th>
                <th className="p-4 text-right">একশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin text-[#00A89C]" />
                      <span>ডাইনামিক ব্লগ ডাটা লোড হচ্ছে...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    কোনো ব্লগ পোস্ট খুঁজে পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 max-w-xs sm:max-w-md">
                      <div className="font-bold text-white text-sm line-clamp-1 mb-1 flex items-center gap-1.5">
                        {post.featured && (
                          <span className="text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded text-[10px] flex items-center gap-1 border border-amber-400/30">
                            <Star className="w-3 h-3 fill-amber-400" /> ফিচারড
                          </span>
                        )}
                        <span>{post.title}</span>
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
                    <td className="p-4 text-center">
                      {post.featured ? (
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400 mx-auto" />
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
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
                          onClick={() => handleDeletePost(post.id, post.title)}
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
          <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#00A89C]" />
                {editingPost ? "ডাইনামিক ব্লগ পোস্ট সম্পাদনা করুন" : "নতুন ডাইনামিক ব্লগ পোস্ট তৈরি করুন"}
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

            <form onSubmit={handleSavePost} className="space-y-5 text-xs">
              {/* Featured & Main Info */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-200">হেডলাইন পোস্ট / ফিচারড আর্টিকেল</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formFeatured}
                      onChange={(e) => setFormFeatured(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00A89C]"></div>
                    <span className="ml-2 text-xs font-semibold text-slate-300">
                      {formFeatured ? "ফিচারড (হোম ও ব্লগের উপরে থাকবে)" : "সাধারণ ব্লগ"}
                    </span>
                  </label>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">ব্লগের শিরোনাম *</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="যেমন: ঘরে বসেই সুন্দর তাজবীদে কুরআন শেখার নিয়ম"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                    required
                  />
                </div>
              </div>

              {/* Metadata row */}
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
                    <option value="কুরআন তিলাওয়াত">কুরআন তিলাওয়াত</option>
                    <option value="অনুপ্রেরণা">অনুপ্রেরণা</option>
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

              {/* Image URL & Presets */}
              <div className="space-y-2">
                <label className="block font-bold text-slate-300">কভার ইমেজ (URL / প্রিসেট সিলেক্ট করুন)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formImg}
                    onChange={(e) => setFormImg(e.target.value)}
                    placeholder="/assets/why-learn-video-preview.webp"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                  />
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {PRESET_IMAGES.map((imgItem, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setFormImg(imgItem.url)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all ${
                        formImg === imgItem.url
                          ? "bg-[#00A89C] text-white border-[#00A89C]"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
                      }`}
                    >
                      {imgItem.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block font-bold text-slate-300 mb-1">সংক্ষিপ্ত সারসংক্ষেপ (Excerpt) *</label>
                <textarea
                  rows={2}
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  placeholder="ব্লগটির মূল বার্তা ১-২ বাক্যে সংক্ষেপে লিখুন..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                  required
                />
              </div>

              {/* Intro */}
              <div>
                <label className="block font-bold text-slate-300 mb-1">সূচনা বা ভূমিকা (Intro Paragraph)</label>
                <textarea
                  rows={3}
                  value={formContentIntro}
                  onChange={(e) => setFormContentIntro(e.target.value)}
                  placeholder="ব্লগের ভূমিকা বা প্রারম্ভিক প্যারাগ্রাফ..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                />
              </div>

              {/* Dynamic Content Sections */}
              <div className="space-y-4 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 text-sm">ব্লগ সেকশন বা অধ্যায়সমূহ</span>
                  <button
                    type="button"
                    onClick={handleAddSection}
                    className="text-[#00A89C] hover:text-[#00897B] font-bold text-xs flex items-center gap-1 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>নতুন সেকশন যোগ করুন</span>
                  </button>
                </div>

                {formSections.map((section, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 relative">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="font-bold text-[#00A89C]">সেকশন {idx + 1}</span>
                      {formSections.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSection(idx)}
                          className="text-rose-400 hover:text-rose-300 p-1"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-400 mb-1">শিরোনাম (Heading)</label>
                      <input
                        type="text"
                        value={section.heading}
                        onChange={(e) => handleSectionChange(idx, "heading", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-400 mb-1">বর্ণনা (Paragraph Text)</label>
                      <textarea
                        rows={3}
                        value={section.text}
                        onChange={(e) => handleSectionChange(idx, "text", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block font-semibold text-slate-400 mb-1">পবিত্র আয়াত/হাদিস (আরবি - ঐচ্ছিক)</label>
                        <input
                          type="text"
                          value={section.arabic || ""}
                          onChange={(e) => handleSectionChange(idx, "arabic", e.target.value)}
                          placeholder="উদা: وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا"
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-amber-300 font-serif focus:outline-none focus:border-[#00A89C]"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-400 mb-1">সতর্কতা / টিপস (ঐচ্ছিক)</label>
                        <input
                          type="text"
                          value={section.warning || ""}
                          onChange={(e) => handleSectionChange(idx, "warning", e.target.value)}
                          placeholder="উদা: মনে রাখুন, অনুশীলনের কোনো বিকল্প নেই"
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tags Input */}
              <div className="pt-2">
                <label className="block font-bold text-slate-300 mb-1">ট্যাগসমূহ (কমা দিয়ে লিখুন)</label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="# তাজবীদ, # কুরআন, # শিক্ষা"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-[#00A89C]"
                />
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingPost(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
                  disabled={saving}
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#00A89C] text-white font-bold hover:bg-[#00897B] shadow-md flex items-center space-x-2"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>সংরক্ষণ হচ্ছে...</span>
                    </>
                  ) : (
                    <span>সংরক্ষণ ও প্রকাশ করুন</span>
                  )}
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

            <div className="text-slate-300 text-xs sm:text-sm leading-relaxed space-y-4">
              <p className="font-semibold text-teal-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                {previewPost.excerpt}
              </p>
              <p>{previewPost.content.intro}</p>

              {previewPost.content.sections?.map((sec, idx) => (
                <div key={idx} className="space-y-2 border-t border-slate-800/80 pt-3">
                  <h3 className="font-bold text-white text-sm">{sec.heading}</h3>
                  <p className="text-slate-300">{sec.text}</p>
                  {sec.arabic && (
                    <p className="text-amber-300 font-serif text-base bg-emerald-950/40 p-3 rounded-xl border-l-2 border-[#00A89C]">
                      {sec.arabic}
                    </p>
                  )}
                </div>
              ))}
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
