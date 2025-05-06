
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturedSwaps from "@/components/FeaturedSwaps";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    console.log("Index page loaded");
    // Check if env variables are available
    console.log("Supabase URL exists:", !!import.meta.env.VITE_SUPABASE_URL);
    console.log("Supabase key exists:", !!import.meta.env.VITE_SUPABASE_ANON_KEY);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <HowItWorks />
        <FeaturedSwaps />
        <Testimonials />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
