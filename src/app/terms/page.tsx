import DynamicPageRenderer from "@/components/DynamicPageRenderer";
import { getPageById } from "@/data/pagesStorage";

export const metadata = {
  title: "টার্মস অ্যান্ড কন্ডিসনস (Terms & Conditions) | কুরআন জীবন",
  description: "কুরআন জীবনের সেবা ব্যবহারের শর্তাবলী, ক্লাস নিয়ম কানুন ও শিক্ষার্থীর আচরণবিধি।",
};

export default async function TermsPage() {
  const pageData = await getPageById("terms");

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-semibold">
        পেজটি পাওয়া যায়নি।
      </div>
    );
  }

  return <DynamicPageRenderer pageData={pageData} />;
}
