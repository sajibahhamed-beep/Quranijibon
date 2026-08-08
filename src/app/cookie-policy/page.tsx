import DynamicPageRenderer from "@/components/DynamicPageRenderer";
import { getPageById } from "@/data/pagesStorage";

export const metadata = {
  title: "কুকিজ পলিসি (Cookie Policy) | কুরআন জীবন",
  description: "কুরআন জীবন ওয়েবসাইটে ব্যবহৃত কুকিজ, অ্যানালিটিক্স ও ব্রাউজার সেটিংস সম্পর্কিত নীতি।",
};

export default async function CookiePolicyPage() {
  const pageData = await getPageById("cookie-policy");

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-semibold">
        পেজটি পাওয়া যায়নি।
      </div>
    );
  }

  return <DynamicPageRenderer pageData={pageData} />;
}
