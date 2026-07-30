import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyLearnSection from "@/components/WhyLearnSection";
import AppFeaturesSection from "@/components/AppFeaturesSection";
import RecentBlogSection from "@/components/RecentBlogSection";
import FaqSection from "@/components/FaqSection";
import FloatingContact from "@/components/FloatingContact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#fafbfc] text-[#0f172a]">
      <FloatingContact />
      <Navbar />
      <HeroSection />
      <WhyLearnSection />
      <AppFeaturesSection />
      <RecentBlogSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
