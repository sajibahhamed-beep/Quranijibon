"use client";

import { useState, useEffect, useRef } from "react";
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
  Upload,
} from "lucide-react";
import { BlogPost } from "@/data/blogs";

const PRESET_IMAGES = [
  { label: "ভিডিও / ক্লাস", url: "/assets/why-learn-video-preview.webp" },
  { label: "হিফজ / বই", url: "/assets/boy-is-sitting-rug-with-quran-titled-boy.jpg" },
  { label: "মাখরাজ / নিয়ম", url: "/assets/Quran 2.jpg" },
  { label: "জীবনধারা / রু ক্বিয়াহ", url: "/assets/Person reading Quran.jpg" },
  { label: "অনলাইন ক্লাস", url: "/assets/muslim-boy-student-studying-online-computer-laptop.jpg" },
  { label: "কুরআন পাঠ", url: "/assets/jakarta-indonesia-april-18-2018-young-muslim-man-reading-quran-ramadan-time-home.jpg" },
  { label: "শিশু শিক্ষার্থী", url: "/assets/a child reading quran online.png" },
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
  
  // Image upload states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setFormImg(data.url);
        showStatus("success", "কভার ছবি সফলভাবে আপলোড হয়েছে");
      } else {
        showStatus("error", data.message || "ছবি আপলোড করতে ব্যর্থ হয়েছে");
      }
    } catch (err) {
      console.error("Upload error:", err);
      showStatus("error", "ছবি আপলোডের সময় ত্রুটি ঘটেছে");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  
  // Custom Sections
  const [formSections, setFormSections] = useState<
    { id: string; heading: string; text: string; arabic?: string; translation?: string; warning?: string }[]
  >([
    {
      id: "sec-1",
      heading: "১. সহীহ মাখরাজের গুরুত্ব",
      text: "কুরআন সঠিকভাবে তিলাওয়াতের জন্য প্রথম ও প্রধান শর্ত হলো প্রতিটি হরফের সঠিক মাখরাজ আদায় করা।",
      arabic: "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا",
      warning: "হরফের উচ্চারণে ভুল হলে শব্দের অর্থ সম্পূর্ণ পরিবর্তিত হয়ে যায়।",
    },
  ]);

  const showStatus = (type: "success" | "error", text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => {
      setStatusMessage(null);
    }, 4000);
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/blogs");
      const data = await res.json();
      const postsArray = Array.isArray(data.posts) ? data.posts : (Array.isArray(data.blogs) ? data.blogs : []);
      if (data.success && Array.isArray(postsArray)) {
        setPosts(postsArray);
      }
    } catch (err) {
      console.error("Failed to load blogs:", err);
      showStatus("error", "ব্লগ লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const categories = ["সব", "তাজবীদ", "শিক্ষার টিপস", "ইসলামি জীবনধারা", "কুরআন তিলাওয়াত", "অনুপ্রেরণা"];

  const openCreateModal = () => {
    setEditingPost(null);
    setFormTitle("");
    setFormCategory("তাজবীদ");
    setFormAuthor("উস্তাদ রফিকুল ইসলাম");
    setFormAuthorRole("তাজবীদ ও কুরআন বিজ্ঞান শিক্ষক");
    setFormReadTime("৬ মিনিট পড়া");
    setFormImg("/assets/why-learn-video-preview.webp");
    setFormFeatured(false);
    setFormExcerpt("");
    setFormContentIntro("");
    setFormTags("# তাজবীদ, # কুরআন, # শিক্ষা");
    setShowUrlInput(false);
    setFormSections([
      {
        id: "sec-1",
        heading: "১. বিষয়ের পরিচিতি",
        text: "এখানে আপনার প্যারাগ্রাফ বা বিস্তারিত আলোচনা লিখুন...",
      },
    ]);
    setIsCreateModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setFormTitle(post.title);
    setFormCategory(post.category);
    setFormAuthor(post.author);
    setFormAuthorRole(post.authorRole || "কুরআন শিক্ষক");
    setFormReadTime(post.readTime);
    setFormImg(post.img);
    setFormFeatured(Boolean(post.featured));
    setFormExcerpt(post.excerpt);
    setFormContentIntro(post.content?.intro || post.excerpt);
    setFormTags(post.tags?.join(", ") || "# তাজবীদ");
    setShowUrlInput(false);

    if (post.content?.sections && post.content.sections.length > 0) {
      setFormSections(post.content.sections);
    } else {
      setFormSections([
        {
          id: "sec-1",
          heading: "মূল বিষয়বস্তু",
          text: post.excerpt,
        },
      ]);
    }

    setIsCreateModalOpen(true);
  };

  const handleAddSection = () => {
    setFormSections([
      ...formSections,
      {
        id: `sec-${formSections.length + 1}`,
        heading: `${formSections.length + 1}. নতুন সেকশনের শিরোনাম`,
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
    if (!formTitle || !formExcerpt) {
      showStatus("error", "দয়া করে ব্লগের শিরোনাম ও সারসংক্ষেপ পূরণ করুন");
      return;
    }

    try {
      setSaving(true);
      const parsedTags = formTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const tocItems = formSections.map((sec, i) => ({
        id: sec.id || `sec-${i + 1}`,
        title: sec.heading || `সেকশন ${i + 1}`,
      }));

      const payload = {
        title: formTitle,
        category: formCategory,
        author: formAuthor,
        authorRole: formAuthorRole,
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
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Toast Banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between border shadow-xs ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-800"
              : "bg-rose-50 border-rose-300 text-rose-800"
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
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#00A89C]" />
            ডায়নামিক ব্লগ ব্যবস্থাপনা (Blog Management System)
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            ফ্রন্টএন্ড ও ব্যাকএন্ডের জন্য সরাসরি ব্লগ পোস্ট তৈরি, এডিট ও প্রকাশ করুন
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-[#00A89C] hover:bg-[#00897B] text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন ডাইনামিক ব্লগ প্রকাশ করুন</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ব্লগের শিরোনাম বা লেখক সার্চ করুন..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#00A89C] text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 border border-slate-200 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">ব্লগ শিরোনাম</th>
                <th className="p-4">ক্যাটাগরি</th>
                <th className="p-4">লেখক</th>
                <th className="p-4">পড়ার সময়</th>
                <th className="p-4 text-center">ফিচারড</th>
                <th className="p-4 text-right">একশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
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
                  <tr key={post.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 max-w-xs sm:max-w-md">
                      <div className="font-bold text-slate-900 text-sm line-clamp-1 mb-1 flex items-center gap-1.5">
                        {post.featured && (
                          <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded text-xs flex items-center gap-1 border border-amber-200">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> ফিচারড
                          </span>
                        )}
                        <span>{post.title}</span>
                      </div>
                      <p className="text-slate-500 text-xs line-clamp-1 font-normal">
                        {post.excerpt}
                      </p>
                    </td>
                    <td className="p-4">
                      <span className="bg-teal-50 text-[#007C7A] border border-teal-200 px-2.5 py-1 rounded-lg text-xs font-bold inline-block">
                        {post.category}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-slate-700">
                      <div className="flex items-center space-x-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{post.author}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{post.readTime}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      {post.featured ? (
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500 mx-auto" />
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setPreviewPost(post)}
                          className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(post)}
                          className="p-2 rounded-xl bg-slate-50 text-sky-600 hover:text-sky-800 hover:bg-sky-50 border border-slate-200 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id, post.title)}
                          className="p-2 rounded-xl bg-slate-50 text-rose-500 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors cursor-pointer"
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-3xl rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#00A89C]" />
                {editingPost ? "ডাইনামিক ব্লগ পোস্ট সম্পাদনা করুন" : "নতুন ডাইনামিক ব্লগ পোস্ট তৈরি করুন"}
              </h2>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingPost(null);
                }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-5 text-xs">
              {/* Featured & Main Info */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800">হেডলাইন পোস্ট / ফিচারড আর্টিকেল</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formFeatured}
                      onChange={(e) => setFormFeatured(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00A89C]"></div>
                    <span className="ml-2 text-xs font-semibold text-slate-700">
                      {formFeatured ? "ফিচারড (হোম ও ব্লগের উপরে থাকবে)" : "সাধারণ ব্লগ"}
                    </span>
                  </label>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">ব্লগের শিরোনাম *</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="যেমন: ঘরে বসেই সুন্দর তাজবীদে কুরআন শেখার নিয়ম"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                    required
                  />
                </div>
              </div>

              {/* Metadata row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] font-bold cursor-pointer"
                  >
                    <option value="তাজবীদ">তাজবীদ</option>
                    <option value="শিক্ষার টিপস">শিক্ষার টিপস</option>
                    <option value="ইসলামি জীবনধারা">ইসলামি জীবনধারা</option>
                    <option value="কুরআন তিলাওয়াত">কুরআন তিলাওয়াত</option>
                    <option value="অনুপ্রেরণা">অনুপ্রেরণা</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">লেখক</label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">পড়ার সময়</label>
                  <input
                    type="text"
                    value={formReadTime}
                    onChange={(e) => setFormReadTime(e.target.value)}
                    placeholder="যেমন: ৮ মিনিট পড়া"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                  />
                </div>
              </div>

              {/* Image Upload & Presets */}
              <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-slate-800">ব্লগ কভার ছবি (Cover Image)</label>
                  <button
                    type="button"
                    onClick={() => setShowUrlInput(!showUrlInput)}
                    className="text-xs text-[#00A89C] font-bold hover:underline cursor-pointer"
                  >
                    {showUrlInput ? "আপলোড বাটনে ফিরে যান" : "ইউআরএল (URL) ম্যানুয়ালি লিখুন"}
                  </button>
                </div>

                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />

                {/* Main Upload Box & Preview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  {/* Preview Box */}
                  <div className="relative w-full h-28 rounded-xl overflow-hidden border border-slate-200 bg-white group flex items-center justify-center">
                    {formImg ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={formImg}
                          alt="Cover Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-2.5 py-1 rounded-lg bg-[#00A89C] text-white text-xs font-bold shadow-md cursor-pointer"
                          >
                            ছবি পরিবর্তন করুন
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-3 text-slate-400">
                        <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                        <span className="text-xs">কোনো ছবি নেই</span>
                      </div>
                    )}
                  </div>

                  {/* Upload Action Button & Path info */}
                  <div className="sm:col-span-2 space-y-2">
                    {showUrlInput ? (
                      <input
                        type="text"
                        value={formImg}
                        onChange={(e) => setFormImg(e.target.value)}
                        placeholder="ইমেজের লিংক লিখুন (যেমন: /assets/hero.png বা https://...)"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                      />
                    ) : (
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          disabled={uploadingImage}
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full py-2.5 px-4 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-[#007C7A] rounded-xl font-bold flex items-center justify-center space-x-2 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer shadow-xs"
                        >
                          {uploadingImage ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-[#00A89C]" />
                              <span>ছবি আপলোড হচ্ছে...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 text-[#00A89C]" />
                              <span>কম্পিউটার/মোবাইল থেকে কভার ছবি আপলোড করুন</span>
                            </>
                          )}
                        </button>
                        {formImg && (
                          <p className="text-xs text-slate-500 truncate">
                            বর্তমান ফাইল: <span className="text-slate-800 font-mono">{formImg}</span>
                          </p>
                        )}
                      </div>
                    )}

                    {/* Preset Images */}
                    <div className="pt-1">
                      <span className="text-xs text-slate-500 block mb-1">অথবা ডিফল্ট প্রিসেট ছবি বেছে নিন:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {PRESET_IMAGES.map((imgItem, i) => (
                          <button
                            type="button"
                            key={i}
                            onClick={() => setFormImg(imgItem.url)}
                            className={`px-2 py-0.5 rounded-md text-xs font-semibold border transition-all cursor-pointer ${
                              formImg === imgItem.url
                                ? "bg-[#00A89C] text-white border-[#00A89C]"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            {imgItem.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">সংক্ষিপ্ত সারসংক্ষেপ (Excerpt) *</label>
                <textarea
                  rows={2}
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  placeholder="ব্লগটির মূল বার্তা ১-২ বাক্যে সংক্ষেপে লিখুন..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white"
                  required
                />
              </div>

              {/* Intro */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">সূচনা বা ভূমিকা (Intro Paragraph)</label>
                <textarea
                  rows={3}
                  value={formContentIntro}
                  onChange={(e) => setFormContentIntro(e.target.value)}
                  placeholder="ব্লগের ভূমিকা বা প্রারম্ভিক প্যারাগ্রাফ..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C] focus:bg-white"
                />
              </div>

              {/* Dynamic Content Sections */}
              <div className="space-y-4 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-sm">ব্লগ সেকশন বা অধ্যায়সমূহ</span>
                  <button
                    type="button"
                    onClick={handleAddSection}
                    className="text-[#007C7A] hover:text-[#00897B] font-bold text-xs flex items-center gap-1 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>নতুন সেকশন যোগ করুন</span>
                  </button>
                </div>

                {formSections.map((section, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="font-bold text-[#007C7A] text-xs">সেকশন {idx + 1}</span>
                      {formSections.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSection(idx)}
                          className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-600 mb-1">শিরোনাম (Heading)</label>
                      <input
                        type="text"
                        value={section.heading}
                        onChange={(e) => handleSectionChange(idx, "heading", e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-600 mb-1">বর্ণনা (Paragraph Text)</label>
                      <textarea
                        rows={3}
                        value={section.text}
                        onChange={(e) => handleSectionChange(idx, "text", e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block font-semibold text-slate-600 mb-1">পবিত্র আয়াত/হাদিস (আরবি - ঐচ্ছিক)</label>
                        <input
                          type="text"
                          value={section.arabic || ""}
                          onChange={(e) => handleSectionChange(idx, "arabic", e.target.value)}
                          placeholder="উদা: وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-emerald-800 font-serif focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-600 mb-1">সতর্কতা / টিপস (ঐচ্ছিক)</label>
                        <input
                          type="text"
                          value={section.warning || ""}
                          onChange={(e) => handleSectionChange(idx, "warning", e.target.value)}
                          placeholder="উদা: মনে রাখুন, অনুশীলনের কোনো বিকল্প নেই"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tags Input */}
              <div className="pt-2">
                <label className="block font-bold text-slate-700 mb-1">ট্যাগসমূহ (কমা দিয়ে লিখুন)</label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="# তাজবীদ, # কুরআন, # শিক্ষা"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A89C]"
                />
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingPost(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                  disabled={saving}
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#00A89C] text-white font-bold hover:bg-[#00897B] shadow-md flex items-center space-x-2 cursor-pointer"
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="bg-teal-50 text-[#007C7A] text-xs font-bold px-3 py-1 rounded-full border border-teal-200">
                {previewPost.category}
              </span>
              <button
                onClick={() => setPreviewPost(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-xl font-black text-slate-900">{previewPost.title}</h2>
            <div className="flex items-center space-x-3 text-xs text-slate-500 border-b border-slate-100 pb-3">
              <span>লেখক: {previewPost.author}</span>
              <span>•</span>
              <span>পড়ার সময়: {previewPost.readTime}</span>
            </div>

            <div className="text-slate-700 text-xs sm:text-sm leading-relaxed space-y-4">
              <p className="font-semibold text-[#007C7A] bg-teal-50/50 p-4 rounded-2xl border border-teal-100">
                {previewPost.excerpt}
              </p>
              <p>{previewPost.content.intro}</p>

              {previewPost.content.sections?.map((sec, idx) => (
                <div key={idx} className="space-y-2 border-t border-slate-100 pt-3">
                  <h3 className="font-bold text-slate-900 text-sm">{sec.heading}</h3>
                  <p className="text-slate-700">{sec.text}</p>
                  {sec.arabic && (
                    <p className="text-emerald-900 font-serif text-base bg-emerald-50 p-3 rounded-xl border-l-4 border-[#00A89C]">
                      {sec.arabic}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setPreviewPost(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 cursor-pointer"
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
