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

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#fafbfc] text-[#0f172a]">
      <FloatingContact />
      <Navbar />
      <HeroSection />
      <WhyLearnSection />
      <AppFeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <SponsorStudentSection />
      <RecentBlogSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
