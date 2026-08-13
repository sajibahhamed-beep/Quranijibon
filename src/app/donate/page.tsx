import type { Metadata } from "next";
import DonateClient from "./DonateClient";

export const metadata: Metadata = {
  title: "সাদাকা ও হাদিয়া (Donate) | কুরআন জীবন",
  description:
    "অসচ্ছল ও সুবিধাবঞ্চিত শিক্ষার্থীদের বিনামূল্যে কুরআন শিক্ষার সুযোগ তৈরি করতে আপনার সাদাকা ও হাদিয়া প্রদান করুন। আপনার ছোট অনুদানই হতে পারে সদকা-ই-জারিয়া।",
  openGraph: {
    type: "website",
    url: "https://quranijibon.com/donate",
    title: "সাদাকা ও হাদিয়া (Donate) | কুরআন জীবন",
    description:
      "অসচ্ছল ও সুবিধাবঞ্চিত শিক্ষার্থীদের বিনামূল্যে কুরআন শিক্ষার সুযোগ তৈরি করতে আপনার সাদাকা ও হাদিয়া প্রদান করুন। আপনার ছোট অনুদানই হতে পারে সদকা-ই-জারিয়া।",
    siteName: "কুরআন জীবন",
    locale: "bn_BD",
    images: [
      {
        url: "/assets/why-learn-video-preview.webp",
        width: 1200,
        height: 525,
        alt: "সাদাকা ও হাদিয়া - কুরআন জীবন",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "সাদাকা ও হাদিয়া (Donate) | কুরআন জীবন",
    description:
      "অসচ্ছল ও সুবিধাবঞ্চিত শিক্ষার্থীদের বিনামূল্যে কুরআন শিক্ষার সুযোগ তৈরি করতে আপনার সাদাকা ও হাদিয়া প্রদান করুন। আপনার ছোট অনুদানই হতে পারে সদকা-ই-জারিয়া।",
    images: ["/assets/why-learn-video-preview.webp"],
  },
};

import StructuredData from "@/components/seo/StructuredData";

export default function DonatePage() {
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
        "name": "সাদাকা ও হাদিয়া",
        "item": "https://quranijibon.com/donate",
      },
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <DonateClient />
    </>
  );
}
