import type { Metadata } from "next";
import BlogsClient from "./BlogsClient";

export const metadata: Metadata = {
  title: "কুরআন শিক্ষা ব্লগ | কুরআন জীবন",
  description:
    "কুরআন শিক্ষা, তাজবীদ, কুরআন পড়ার নিয়ম ও দ্বীনি জ্ঞান নিয়ে সহজ ভাষায় লেখা পড়ুন কুরআন জীবনের ব্লগে।",
  openGraph: {
    type: "website",
    url: "https://quranijibon.com/blogs",
    title: "কুরআন শিক্ষা ব্লগ | কুরআন জীবন",
    description:
      "কুরআন শিক্ষা, তাজবীদ, কুরআন পড়ার নিয়ম ও দ্বীনি জ্ঞান নিয়ে সহজ ভাষায় লেখা পড়ুন কুরআন জীবনের ব্লগে।",
    siteName: "কুরআন জীবন",
    locale: "bn_BD",
    images: [
      {
        url: "/assets/why-learn-video-preview.webp",
        width: 1200,
        height: 525,
        alt: "কুরআন শিক্ষা ব্লগ - কুরআন জীবন",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "কুরআন শিক্ষা ব্লগ | কুরআন জীবন",
    description:
      "কুরআন শিক্ষা, তাজবীদ, কুরআন পড়ার নিয়ম ও দ্বীনি জ্ঞান নিয়ে সহজ ভাষায় লেখা পড়ুন কুরআন জীবনের ব্লগে।",
    images: ["/assets/why-learn-video-preview.webp"],
  },
};

import StructuredData from "@/components/seo/StructuredData";
import { getBlogsData } from "@/data/blogsStorage";

export default async function BlogsPage() {
  const blogsData = await getBlogsData();

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
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <BlogsClient
        initialPosts={blogsData.posts}
        initialSidebarArticles={blogsData.sidebarArticles}
        initialAuthors={blogsData.authors}
      />
    </>
  );
}
