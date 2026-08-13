import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "যোগাযোগ করুন | কুরআন জীবন",
  description:
    "কুরআন জীবন টিমের সাথে সরাসরি যোগাযোগ করুন। অনলাইন কুরআন কোর্স রেজিস্ট্রেশন, ফ্রি ট্রায়াল ক্লাস বা যেকোনো বিষয়ে তথ্যের জন্য ফোন, হোয়াটসঅ্যাপ বা ইমেইলে বার্তা পাঠান।",
  openGraph: {
    type: "website",
    url: "https://quranijibon.com/contact",
    title: "যোগাযোগ করুন | কুরআন জীবন",
    description:
      "কুরআন জীবন টিমের সাথে সরাসরি যোগাযোগ করুন। অনলাইন কুরআন কোর্স রেজিস্ট্রেশন, ফ্রি ট্রায়াল ক্লাস বা যেকোনো বিষয়ে তথ্যের জন্য ফোন, হোয়াটসঅ্যাপ বা ইমেইলে বার্তা পাঠান।",
    siteName: "কুরআন জীবন",
    locale: "bn_BD",
    images: [
      {
        url: "/assets/why-learn-video-preview.webp",
        width: 1200,
        height: 525,
        alt: "যোগাযোগ করুন - কুরআন জীবন",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "যোগাযোগ করুন | কুরআন জীবন",
    description:
      "কুরআন জীবন টিমের সাথে সরাসরি যোগাযোগ করুন। অনলাইন কুরআন কোর্স রেজিস্ট্রেশন, ফ্রি ট্রায়াল ক্লাস বা যেকোনো বিষয়ে তথ্যের জন্য ফোন, হোয়াটসঅ্যাপ বা ইমেইলে বার্তা পাঠান।",
    images: ["/assets/why-learn-video-preview.webp"],
  },
};

import StructuredData from "@/components/seo/StructuredData";

export default function ContactPage() {
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
        "name": "যোগাযোগ",
        "item": "https://quranijibon.com/contact",
      },
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <ContactClient />
    </>
  );
}
