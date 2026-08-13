import type { MetadataRoute } from "next";
import { getBlogsData } from "@/data/blogsStorage";
import { getPagesData } from "@/data/pagesStorage";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://quranijibon.com";

  // Static public routes
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/donate",
    "/blogs",
    "/privacy-policy",
    "/refund-policy",
    "/terms",
    "/cookie-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  // Dynamic blog post routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogsData = await getBlogsData();
    if (blogsData && Array.isArray(blogsData.posts)) {
      blogRoutes = blogsData.posts.map((post) => ({
        url: `${baseUrl}/blogs/${post.slug}`,
        lastModified: new Date(),
      }));
    }
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
  }

  // Dynamic CMS page routes (/p/[slug])
  let cmsRoutes: MetadataRoute.Sitemap = [];
  try {
    const pages = await getPagesData();
    if (Array.isArray(pages)) {
      const staticPolicySlugs = ["terms", "privacy-policy", "cookie-policy", "refund-policy"];
      cmsRoutes = pages
        .filter((page) => page.slug && !staticPolicySlugs.includes(page.slug))
        .map((page) => ({
          url: `${baseUrl}/p/${page.slug}`,
          lastModified: new Date(),
        }));
    }
  } catch (error) {
    console.error("Error fetching CMS pages for sitemap:", error);
  }

  return [...staticRoutes, ...blogRoutes, ...cmsRoutes];
}
