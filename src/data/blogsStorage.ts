import fs from "fs/promises";
import path from "path";
import { BLOG_POSTS, RECENT_SIDEBAR_ARTICLES, BLOG_AUTHORS, BlogPost, SidebarArticle, BlogAuthor } from "./blogs";

export interface BlogsData {
  posts: BlogPost[];
  sidebarArticles: SidebarArticle[];
  authors: BlogAuthor[];
}

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "blogs.json");

export async function getBlogsData(): Promise<BlogsData> {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const data = JSON.parse(fileContent) as BlogsData;
    if (!data.posts || !Array.isArray(data.posts)) {
      throw new Error("Invalid json format");
    }
    return data;
  } catch (error) {
    // If file doesn't exist or is invalid, seed initial data
    const initialData: BlogsData = {
      posts: BLOG_POSTS,
      sidebarArticles: RECENT_SIDEBAR_ARTICLES,
      authors: BLOG_AUTHORS,
    };
    await saveBlogsData(initialData);
    return initialData;
  }
}

export async function saveBlogsData(data: BlogsData): Promise<void> {
  const dir = path.dirname(DATA_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function getBlogPostByIdOrSlug(idOrSlug: string): Promise<BlogPost | null> {
  const data = await getBlogsData();
  const post = data.posts.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
  return post || null;
}

export async function createBlogPost(newPostData: Partial<BlogPost>): Promise<BlogPost> {
  const data = await getBlogsData();
  
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
    img: newPostData.img || "/assets/why_learn_video_37_1931.png",
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

  // If set to featured, un-feature other posts
  if (formattedPost.featured) {
    data.posts = data.posts.map((p) => ({ ...p, featured: false }));
  }

  // Prepend to posts list
  data.posts = [formattedPost, ...data.posts];

  // Update sidebar articles top 3
  data.sidebarArticles = data.posts.slice(0, 3).map((p, i) => ({
    id: `side-${p.id}`,
    num: `0${i + 1}`,
    rank: `0${i + 1}`,
    title: p.title,
    slug: p.slug,
    category: p.category,
    readTime: p.readTime,
  }));

  await saveBlogsData(data);
  return formattedPost;
}

export async function updateBlogPost(id: string, updatedFields: Partial<BlogPost>): Promise<BlogPost | null> {
  const data = await getBlogsData();
  const index = data.posts.findIndex((p) => p.id === id || p.slug === id);
  if (index === -1) return null;

  const existingPost = data.posts[index];
  
  if (updatedFields.featured) {
    data.posts = data.posts.map((p) => ({ ...p, featured: false }));
  }

  const updatedPost: BlogPost = {
    ...existingPost,
    ...updatedFields,
    content: {
      ...existingPost.content,
      ...(updatedFields.content || {}),
    },
  };

  data.posts[index] = updatedPost;

  // Update sidebar
  data.sidebarArticles = data.posts.slice(0, 3).map((p, i) => ({
    id: `side-${p.id}`,
    num: `0${i + 1}`,
    rank: `0${i + 1}`,
    title: p.title,
    slug: p.slug,
    category: p.category,
    readTime: p.readTime,
  }));

  await saveBlogsData(data);
  return updatedPost;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const data = await getBlogsData();
  const initialLength = data.posts.length;
  data.posts = data.posts.filter((p) => p.id !== id && p.slug !== id);

  if (data.posts.length === initialLength) {
    return false;
  }

  // Ensure at least one featured post exists if possible
  if (data.posts.length > 0 && !data.posts.some((p) => p.featured)) {
    data.posts[0].featured = true;
  }

  // Update sidebar
  data.sidebarArticles = data.posts.slice(0, 3).map((p, i) => ({
    id: `side-${p.id}`,
    num: `0${i + 1}`,
    rank: `0${i + 1}`,
    title: p.title,
    slug: p.slug,
    category: p.category,
    readTime: p.readTime,
  }));

  await saveBlogsData(data);
  return true;
}
