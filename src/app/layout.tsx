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
  title: "কুরআন জীবন (Quranijibon) | দ্বীনি জ্ঞানার্জনের উন্মুক্ত প্লাটফর্ম",
  description: "আপনার সুবিধামতো সময়ে ঘরে বসেই অভিজ্ঞ শিক্ষকের সঙ্গে One-to-One কুরআন শিক্ষা। মহিলা শিক্ষার্থীদের জন্য রয়েছে অভিজ্ঞ মহিলা শিক্ষিকার ব্যবস্থা।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={hindSiliguri.variable}>
      <body className="antialiased bg-[#fafbfc] text-[#0f172a]" suppressHydrationWarning>
        <ErrorGuard />
        {children}
      </body>
    </html>
  );
}
