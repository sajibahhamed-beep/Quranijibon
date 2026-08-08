import DynamicPageRenderer from "@/components/DynamicPageRenderer";
import { getPageById } from "@/data/pagesStorage";

export const metadata = {
  title: "রিফান্ড পলিসি (Refund Policy) | কুরআন জীবন",
  description: "কুরআন জীবনের স্বচ্ছ ও ঝঞ্ঝাটমুক্ত ৭ দিনের রিফান্ড পলিসি ও ফি ফেরতের সার্বিক নিয়মাবলী।",
};

export default async function RefundPolicyPage() {
  const pageData = await getPageById("refund-policy");

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-semibold">
        পেজটি পাওয়া যায়নি।
      </div>
    );
  }

  return <DynamicPageRenderer pageData={pageData} />;
}
