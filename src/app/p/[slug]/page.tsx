import DynamicPageRenderer from "@/components/DynamicPageRenderer";
import { getPageById } from "@/data/pagesStorage";
import { notFound } from "next/navigation";

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

  return <DynamicPageRenderer pageData={pageData} />;
}
