import fs from "fs/promises";
import path from "path";
import {
  BLOG_POSTS,
  RECENT_SIDEBAR_ARTICLES,
  BLOG_AUTHORS,
  BlogPost,
  SidebarArticle,
  BlogAuthor,
  UNUSED_BLOG_IMAGES,
  sanitizeBlogImage,
} from "./blogs";
import { getSupabaseClient, getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export interface BlogsData {
  posts: BlogPost[];
  sidebarArticles: SidebarArticle[];
  authors: BlogAuthor[];
}

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "blogs.json");

export async function getBlogsData(): Promise<BlogsData> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { data: dbPosts, error } = await supabase
          .from("blogs")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && Array.isArray(dbPosts)) {
          const posts: BlogPost[] = dbPosts.map((p, index) => {
            const cleanImg = sanitizeBlogImage(p.img, index);
            if (p.img !== cleanImg && isSupabaseConfigured) {
              const adminSupabase = getSupabaseAdmin();
              if (adminSupabase) {
                adminSupabase.from("blogs").update({ img: cleanImg }).eq("id", p.id).then(() => {});
              }
            }
            return {
              id: p.id,
              slug: p.slug,
              title: p.title,
              category: p.category,
              date: p.date,
              readTime: p.read_time || "৫ মিনিট পড়া",
              author: p.author,
              authorAvatar: p.author_avatar,
              authorRole: p.author_role,
              authorBio: p.author_bio,
              excerpt: p.excerpt || "",
              img: cleanImg,
              featured: p.featured || false,
              tags: p.tags || [],
              toc: p.toc || [],
              content: p.content || {},
            };
          });

          const sidebarArticles: SidebarArticle[] = posts.slice(0, 3).map((p, i) => ({
            id: `side-${p.id}`,
            num: `0${i + 1}`,
            rank: `0${i + 1}`,
            title: p.title,
            slug: p.slug,
            category: p.category,
            readTime: p.readTime,
          }));

          return {
            posts,
            sidebarArticles,
            authors: BLOG_AUTHORS,
          };
        }
        if (error) {
          console.warn("Supabase blogs fetch error:", error.message);
        }
      }
    } catch (e) {
      console.warn("Supabase blogs fetch exception:", e);
    }
  }

  return {
    posts: [],
    sidebarArticles: [],
    authors: BLOG_AUTHORS,
  };
}

export async function getBlogPostByIdOrSlug(idOrSlug: string): Promise<BlogPost | null> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
          .single();

        if (!error && data) {
          return {
            id: data.id,
            slug: data.slug,
            title: data.title,
            category: data.category,
            date: data.date,
            readTime: data.read_time || "৫ মিনিট পড়া",
            author: data.author,
            authorAvatar: data.author_avatar,
            authorRole: data.author_role,
            authorBio: data.author_bio,
            excerpt: data.excerpt || "",
            img: sanitizeBlogImage(data.img, 0),
            featured: data.featured || false,
            tags: data.tags || [],
            toc: data.toc || [],
            content: data.content || {},
          };
        }
      }
    } catch (e) {
      console.warn("Supabase single blog fetch error:", e);
    }
  }

  return null;
}

export async function createBlogPost(newPostData: Partial<BlogPost>): Promise<BlogPost> {
  const id = newPostData.id || `post-${Date.now()}`;
  const rawTitle = newPostData.title || "Untitled Blog";
  const slug = newPostData.slug || rawTitle.toLowerCase().replace(/[^\w\u0980-\u09FF]+/g, "-").replace(/^-+|-+$/g, "") || `blog-${Date.now()}`;
  
  const formattedPost: BlogPost = {
    id,
    slug,
    title: rawTitle,
    category: newPostData.category || "সাধারণ",
    date: newPostData.date || new Date().toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" }),
    readTime: newPostData.readTime || "৫ মিনিট পড়া",
    author: newPostData.author || "কুরআন জীবন লেখক",
    authorAvatar: newPostData.authorAvatar || (newPostData.author ? newPostData.author.charAt(0) : "ক"),
    authorRole: newPostData.authorRole || "ইসলামি গবেষক",
    authorBio: newPostData.authorBio || "কুরআন জীবন অনলাইন একাডেমি লেখক দল",
    excerpt: newPostData.excerpt || "",
    img: newPostData.img || "/assets/why-learn-video-preview.webp",
    featured: newPostData.featured || false,
    tags: newPostData.tags || [`# ${newPostData.category || "কুরআন"}`],
    toc: newPostData.toc || [{ num: 1, title: "সূচনা" }],
    content: newPostData.content || {
      intro: newPostData.excerpt || "",
      sections: [
        {
          id: "sec-1",
          heading: "১. বিষয়বস্তু",
          text: newPostData.excerpt || "",
        },
      ],
      conclusion: "আল্লাহ তৌফিক দান করুন।",
    },
  };

  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        if (formattedPost.featured) {
          await supabase.from("blogs").update({ featured: false }).neq("id", id);
        }
        const { error } = await supabase.from("blogs").insert([{
          id: formattedPost.id,
          slug: formattedPost.slug,
          title: formattedPost.title,
          category: formattedPost.category,
          date: formattedPost.date,
          read_time: formattedPost.readTime,
          author: formattedPost.author,
          author_avatar: formattedPost.authorAvatar,
          author_role: formattedPost.authorRole,
          author_bio: formattedPost.authorBio,
          excerpt: formattedPost.excerpt,
          img: formattedPost.img,
          featured: formattedPost.featured,
          tags: formattedPost.tags,
          toc: formattedPost.toc,
          content: formattedPost.content,
        }]);
        if (error) {
          console.error("Supabase create blog error:", error.message);
        }
      }
    } catch (e) {
      console.warn("Supabase create blog exception:", e);
    }
  }

  return formattedPost;
}

export async function updateBlogPost(id: string, updatedFields: Partial<BlogPost>): Promise<BlogPost | null> {
  const existing = await getBlogPostByIdOrSlug(id);
  if (!existing) return null;

  const updatedPost: BlogPost = {
    ...existing,
    ...updatedFields,
    content: {
      ...existing.content,
      ...(updatedFields.content || {}),
    },
  };

  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        if (updatedFields.featured) {
          await supabase.from("blogs").update({ featured: false }).neq("id", id);
        }
        const { error } = await supabase.from("blogs").update({
          slug: updatedPost.slug,
          title: updatedPost.title,
          category: updatedPost.category,
          date: updatedPost.date,
          read_time: updatedPost.readTime,
          author: updatedPost.author,
          author_avatar: updatedPost.authorAvatar,
          author_role: updatedPost.authorRole,
          author_bio: updatedPost.authorBio,
          excerpt: updatedPost.excerpt,
          img: updatedPost.img,
          featured: updatedPost.featured,
          tags: updatedPost.tags,
          toc: updatedPost.toc,
          content: updatedPost.content,
        }).or(`id.eq.${id},slug.eq.${id}`);
        if (error) {
          console.error("Supabase update blog error:", error.message);
        }
      }
    } catch (e) {
      console.warn("Supabase update blog exception:", e);
    }
  }

  return updatedPost;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase.from("blogs").delete().or(`id.eq.${id},slug.eq.${id}`);
        if (!error) return true;
        console.error("Supabase delete blog error:", error.message);
      }
    } catch (e) {
      console.warn("Supabase delete blog exception:", e);
    }
  }

  return false;
}
