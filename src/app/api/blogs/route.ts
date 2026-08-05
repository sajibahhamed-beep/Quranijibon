import { NextResponse } from "next/server";
import { getBlogsData, createBlogPost } from "@/data/blogsStorage";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const query = searchParams.get("q");

    const data = await getBlogsData();
    let posts = data.posts;

    if (category && category !== "সব" && category !== "সব লেখা") {
      posts = posts.filter((p) => p.category === category);
    }

    if (query) {
      const qLower = query.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(qLower) ||
          p.excerpt.toLowerCase().includes(qLower) ||
          p.author.toLowerCase().includes(qLower)
      );
    }

    return NextResponse.json({
      success: true,
      posts,
      sidebarArticles: data.sidebarArticles,
      authors: data.authors,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.excerpt) {
      return NextResponse.json(
        { success: false, message: "Title and excerpt are required" },
        { status: 400 }
      );
    }

    const createdPost = await createBlogPost(body);
    return NextResponse.json(
      { success: true, message: "Blog post created successfully", post: createdPost },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create blog" },
      { status: 500 }
    );
  }
}
