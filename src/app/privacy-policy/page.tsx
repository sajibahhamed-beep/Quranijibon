import DynamicPageRenderer from "@/components/DynamicPageRenderer";
import { getPageById } from "@/data/pagesStorage";

export const metadata = {
  title: "গোপনীয় নীতি (Privacy Policy) | কুরআন জীবন",
  description: "কুরআন জীবন ওয়েবসাইটে শিক্ষার্থীদের ব্যক্তিগত তথ্য সুরক্ষা ও গোপনীয়তা রক্ষার সার্বিক নীতিমালা।",
};

export default async function PrivacyPolicyPage() {
  const pageData = await getPageById("privacy-policy");

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-semibold">
        পেজটি পাওয়া যায়নি।
      </div>
    );
  }

  return <DynamicPageRenderer pageData={pageData} />;
}
