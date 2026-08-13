import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyLearnSection from "@/components/WhyLearnSection";
import AppFeaturesSection from "@/components/AppFeaturesSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import SponsorStudentSection from "@/components/SponsorStudentSection";
import RecentBlogSection from "@/components/RecentBlogSection";
import FaqSection from "@/components/FaqSection";
import FloatingContact from "@/components/FloatingContact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "অনলাইনে কুরআন শিক্ষা | একান্তে ব্যক্তিগত শিক্ষক | কুরআন জীবন",
  description:
    "ঘরে বসে সুবিধামতো সময়ে ব্যক্তিগত শিক্ষকের সাথে অনলাইনে কুরআন শিখুন। শিশু, নারী, ব্যস্ত ও বয়স্ক শিক্ষার্থীদের জন্য সাশ্রয়ী ও সহজ কুরআন শিক্ষা।",
  openGraph: {
    type: "website",
    url: "https://quranijibon.com",
    title: "অনলাইনে কুরআন শিক্ষা | একান্তে ব্যক্তিগত শিক্ষক | কুরআন জীবন",
    description:
      "ঘরে বসে সুবিধামতো সময়ে ব্যক্তিগত শিক্ষকের সাথে অনলাইনে কুরআন শিখুন। শিশু, নারী, ব্যস্ত ও বয়স্ক শিক্ষার্থীদের জন্য সাশ্রয়ী ও সহজ কুরআন শিক্ষা।",
    siteName: "কুরআন জীবন",
    locale: "bn_BD",
    images: [
      {
        url: "/assets/why-learn-video-preview.webp",
        width: 1200,
        height: 525,
        alt: "অনলাইনে কুরআন শিক্ষা - কুরআন জীবন",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "অনলাইনে কুরআন শিক্ষা | একান্তে ব্যক্তিগত শিক্ষক | কুরআন জীবন",
    description:
      "ঘরে বসে সুবিধামতো সময়ে ব্যক্তিগত শিক্ষকের সাথে অনলাইনে কুরআন শিখুন। শিশু, নারী, ব্যস্ত ও বয়স্ক শিক্ষার্থীদের জন্য সাশ্রয়ী ও সহজ কুরআন শিক্ষা।",
    images: ["/assets/why-learn-video-preview.webp"],
  },
};

import StructuredData from "@/components/seo/StructuredData";
import { getFaqsData } from "@/data/faqsStorage";
import { getBlogsData } from "@/data/blogsStorage";

export default async function Home() {
  const [allFaqs, blogsData] = await Promise.all([
    getFaqsData(),
    getBlogsData(),
  ]);
  const activeFaqs = allFaqs.filter((f) => f.isActive);
  const faqDisplayList = activeFaqs.map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "কুরআন জীবন",
    "url": "https://quranijibon.com",
    "logo": "https://quranijibon.com/assets/website%20logo.png",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "কুরআন জীবন",
    "url": "https://quranijibon.com",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqDisplayList.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <main className="relative min-h-screen bg-[#fafbfc] text-[#0f172a]">
      <StructuredData data={[organizationSchema, websiteSchema, faqSchema]} />
      <FloatingContact />
      <Navbar />
      <HeroSection />
      <WhyLearnSection />
      <AppFeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <SponsorStudentSection />
      <RecentBlogSection posts={blogsData.posts} />
      <FaqSection initialFaqs={faqDisplayList} />
      <Footer />
    </main>
  );
}
