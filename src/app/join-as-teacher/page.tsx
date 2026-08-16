import type { Metadata } from "next";
import JoinTeacherClient from "./JoinTeacherClient";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "শিক্ষক হিসেবে যুক্ত হন | অনলাইন কুরআন শিক্ষক ও মেন্টরশিপ | কুরআন জীবন",
  description:
    "কুরআন জীবন প্ল্যাটফর্মে কুরআন শিক্ষক বা শিক্ষিকা হিসেবে যুক্ত হোন। ঘরে বসে ১-টু-১ অনলাইন ক্লাসে তাজবীদ ও নাজেরা পাঠদান করুন। স্বেচ্ছাসেবী বা সম্মানীর ভিত্তিতে আজই আবেদন করুন।",
  keywords: [
    "কুরআন শিক্ষক নিয়োগ",
    "অনলাইন কুরআন শিক্ষক",
    "কুরআন শিক্ষিকা",
    "হাফেজ শিক্ষক নিয়োগ",
    "অনলাইন কুরআন পাঠদান",
    "কুরআন জীবন শিক্ষক আবেদন",
    "Quran Teacher Job Bangladesh",
    "Online Quran Teacher Recruitment",
    "Learn Quran Teacher",
  ],
  alternates: {
    canonical: "https://quranijibon.com/join-as-teacher",
  },
  openGraph: {
    type: "website",
    url: "https://quranijibon.com/join-as-teacher",
    title: "শিক্ষক হিসেবে যুক্ত হন | অনলাইন কুরআন শিক্ষক ও মেন্টরশিপ | কুরআন জীবন",
    description:
      "কুরআন জীবন প্ল্যাটফর্মে কুরআন শিক্ষক বা শিক্ষিকা হিসেবে যুক্ত হোন। ঘরে বসে ১-টু-১ অনলাইন ক্লাসে তাজবীদ ও নাজেরা পাঠদান করুন। স্বেচ্ছাসেবী বা সম্মানীর ভিত্তিতে আজই আবেদন করুন।",
    siteName: "কুরআন জীবন",
    locale: "bn_BD",
    images: [
      {
        url: "/assets/why-learn-video-preview.webp",
        width: 1200,
        height: 525,
        alt: "শিক্ষক হিসেবে যুক্ত হন - কুরআন জীবন",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "শিক্ষক হিসেবে যুক্ত হন | অনলাইন কুরআন শিক্ষক ও মেন্টরশিপ | কুরআন জীবন",
    description:
      "কুরআন জীবন প্ল্যাটফর্মে কুরআন শিক্ষক বা শিক্ষিকা হিসেবে যুক্ত হোন। ঘরে বসে ১-টু-১ অনলাইন ক্লাসে তাজবীদ ও নাজেরা পাঠদান করুন। স্বেচ্ছাসেবী বা সম্মানীর ভিত্তিতে আজই আবেদন করুন।",
    images: ["/assets/why-learn-video-preview.webp"],
  },
};

export default function JoinAsTeacherPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "হোম",
        item: "https://quranijibon.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "শিক্ষক হিসেবে যুক্ত হন",
        item: "https://quranijibon.com/join-as-teacher",
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "শিক্ষক হিসেবে যুক্ত হন | কুরআন জীবন একাডেমি",
    url: "https://quranijibon.com/join-as-teacher",
    description:
      "কুরআন জীবন প্ল্যাটফর্মে শিক্ষক বা শিক্ষিকা হিসেবে যুক্ত হয়ে বিশ্বজুড়ে ১-টু-১ অনলাইন ক্লাসে শিক্ষার্থীদের সহীহ কুরআন শিক্ষা দিন।",
    publisher: {
      "@type": "Organization",
      name: "কুরআন জীবন",
      url: "https://quranijibon.com",
      logo: "https://quranijibon.com/assets/website-logo.png",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "আমি কি পার্ট-টাইম বা অন্য চাকরির পাশাপাশি শিক্ষকতা করতে পারব?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "হ্যাঁ, আলহামদুলিল্লাহ! কুরআন জীবন প্ল্যাটফর্মে আপনি আপনার সুবিধাজনক সময় ও দিন (সকাল, দুপুর, বিকেল কিংবা রাত) নির্বাচন করে ক্লাস নিতে পারবেন। আপনার ফাঁকা সময় অনুযায়ী শিক্ষার্থীদের শিডিউল সাজিয়ে দেওয়া হবে।",
        },
      },
      {
        "@type": "Question",
        name: "মহিলা শিক্ষিকাদের জন্য পর্দার নিরাপত্তা ও ক্লাসের পরিবেশ কেমন?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "আমাদের প্ল্যাটফর্মে কঠোরভাবে শরীয়াহর পর্দা ও অনুশাসন রক্ষা করা হয়। মহিলা শিক্ষার্থীদের জন্য শুধুমাত্র অভিজ্ঞ ও দ্বীনদার মহিলা শিক্ষিকা নির্ধারণ করা হয়। ঘরে বসেই সর্বোচ্চ শালীনতা ও নিরাপত্তার সাথে শিক্ষিকাগণ পাঠদান করতে পারেন।",
        },
      },
      {
        "@type": "Question",
        name: "স্বল্প সম্মানী বা পারিশ্রমিক কীভাবে নির্ধারিত ও প্রদান করা হয়?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "আপনি স্বেচ্ছাসেবী হিসেবে ফি সাবিলিল্লাহ দ্বীনি খেদমত করতে পারেন অথবা সম্মানীভিত্তিক (Honorarium) শিক্ষক হিসেবে যুক্ত হতে পারেন। প্রতি মাসের ক্লাস হিসাব অনুযায়ী শিক্ষক-শিক্ষিকাদের ব্যাংক অ্যাকাউন্ট বা মোবাইল ব্যাংকিং (বিকাশ/নগদ)-এর মাধ্যমে সময়মতো সম্মানী পরিশোধ করা হয়।",
        },
      },
      {
        "@type": "Question",
        name: "অনলাইনে ক্লাস নেওয়ার জন্য আমার কী কী ডিভাইসের প্রয়োজন হবে?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ক্লাস নেওয়ার জন্য একটি সচল স্মার্টফোন অথবা কম্পিউটার/ল্যাপটপ এবং একটি ভালো ইন্টারনেট সংযোগ ও হেডফোন প্রয়োজন। জুম (Zoom) বা গুগল মিট ব্যবহারের সাধারণ নিয়মাবলী আমাদের ওরিয়েন্টেশনে সম্পূর্ণ বিনামূল্যে শিখিয়ে দেওয়া হবে।",
        },
      },
      {
        "@type": "Question",
        name: "আবেদন করার পর কীভাবে নির্বাচিত হব এবং কতদিন সময় লাগবে?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "আপনার অনলাইন আবেদনপত্র জমার পর আমাদের একাডেমি টিম ৩-৫ কার্যদিবসের মধ্যে আপনার সাথে যোগাযোগ করবে। এরপর একটি সংক্ষিপ্ত অনলাইন অডিও/ভিডিও ইন্টারভিউ ও তিলাওয়াত নিরীক্ষণের পর ওরিয়েন্টেশন সম্পন্ন করে শিক্ষার্থী প্রদান করা হবে।",
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={[breadcrumbSchema, webPageSchema, faqSchema]} />
      <JoinTeacherClient />
    </>
  );
}
