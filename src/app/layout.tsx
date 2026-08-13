import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import ErrorGuard from "@/components/ErrorGuard";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quranijibon.com"),
  title: "কুরআন জীবন (Quranijibon) | দ্বীনি জ্ঞানার্জনের উন্মুক্ত প্লাটফর্ম",
  description: "আপনার সুবিধামতো সময়ে ঘরে বসেই অভিজ্ঞ শিক্ষকের সঙ্গে One-to-One কুরআন শিক্ষা। মহিলা শিক্ষার্থীদের জন্য রয়েছে অভিজ্ঞ মহিলা শিক্ষিকার ব্যবস্থা।",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    url: "https://quranijibon.com",
    title: "কুরআন জীবন (Quranijibon) | দ্বীনি জ্ঞানার্জনের উন্মুক্ত প্লাটফর্ম",
    description: "আপনার সুবিধামতো সময়ে ঘরে বসেই অভিজ্ঞ শিক্ষকের সঙ্গে One-to-One কুরআন শিক্ষা। মহিলা শিক্ষার্থীদের জন্য রয়েছে অভিজ্ঞ মহিলা শিক্ষিকার ব্যবস্থা।",
    siteName: "কুরআন জীবন",
    locale: "bn_BD",
    images: [
      {
        url: "/assets/why-learn-video-preview.webp",
        width: 1200,
        height: 525,
        alt: "কুরআন জীবন - অনলাইন কুরআন শিক্ষা",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "কুরআন জীবন (Quranijibon) | দ্বীনি জ্ঞানার্জনের উন্মুক্ত প্লাটফর্ম",
    description: "আপনার সুবিধামতো সময়ে ঘরে বসেই অভিজ্ঞ শিক্ষকের সঙ্গে One-to-One কুরআন শিক্ষা। মহিলা শিক্ষার্থীদের জন্য রয়েছে অভিজ্ঞ মহিলা শিক্ষিকার ব্যবস্থা।",
    images: ["/assets/why-learn-video-preview.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={hindSiliguri.variable} suppressHydrationWarning>
      <body className="antialiased bg-[#fafbfc] text-[#0f172a]" suppressHydrationWarning>
        <ErrorGuard />
        {children}
      </body>
    </html>
  );
}
