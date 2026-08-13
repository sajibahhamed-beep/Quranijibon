import DynamicPageRenderer from "@/components/DynamicPageRenderer";
import { getPageById } from "@/data/pagesStorage";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const pageData = await getPageById(resolvedParams.slug);
  if (!pageData) return { title: "পেজ পাওয়া যায়নি | কুরআন জীবন" };

  const title = `${pageData.title} | কুরআন জীবন`;
  const description = pageData.description;

  return {
    title,
    description,
    alternates: {
      canonical: `/p/${pageData.slug}`,
    },
    openGraph: {
      type: "website",
      url: `https://quranijibon.com/p/${pageData.slug}`,
      title,
      description,
      siteName: "কুরআন জীবন",
      locale: "bn_BD",
      images: [
        {
          url: "/assets/why-learn-video-preview.webp",
          width: 1200,
          height: 525,
          alt: pageData.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/why-learn-video-preview.webp"],
    },
  };
}

import StructuredData from "@/components/seo/StructuredData";

export default async function DynamicCustomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pageData = await getPageById(slug);

  if (!pageData) {
    notFound();
  }

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
        "name": pageData.title,
        "item": `https://quranijibon.com/p/${pageData.slug}`,
      },
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <DynamicPageRenderer pageData={pageData} />
    </>
  );
}
