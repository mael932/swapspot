import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AccommodationModes from "@/components/AccommodationModes";
import HowItWorks from "@/components/HowItWorks";
import FeaturedSwaps from "@/components/FeaturedSwaps";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import SmartRecommendations from "@/components/SmartRecommendations";
import QRCodeComponent from "@/components/QRCode";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log("Index page loaded");
    
    // Test Supabase connection and get user
    const checkSupabaseConnection = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Supabase connection error:", error);
          setError("Failed to connect to Supabase. Check the console for details.");
        } else {
          console.log("Supabase connection successful:", data.session ? "User is logged in" : "No active session");
          setUser(data.session?.user || null);
        }
      } catch (err) {
        console.error("Error checking Supabase connection:", err);
        setError("An unexpected error occurred while connecting to Supabase.");
      } finally {
        setLoading(false);
      }
    };
    
    checkSupabaseConnection();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-lg">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="bg-red-50 border border-red-200 p-4 rounded-md max-w-md">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-700">{error}</p>
            <p className="mt-2 text-sm text-gray-600">Please check the browser console for more details.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {user ? (
          // Show personalized content for logged-in users
          <div className="container mx-auto px-4 py-8">
            <SmartRecommendations 
              userPreferences={{
                location: "Europe",
                dates: {
                  startDate: "2025-09-01",
                  endDate: "2025-12-15"
                },
                university: "Student Exchange Program"
              }}
              className="mb-12"
            />
            <FeaturedSwaps />
            <div className="mt-16 flex justify-center">
              <QRCodeComponent />
            </div>
          </div>
        ) : (
          // Show standard homepage for visitors
          <>
            <HeroSection />
            <AccommodationModes />
            <HowItWorks />
            <FeaturedSwaps />
            <Testimonials />
            <CtaSection />
            <div className="py-16 flex justify-center bg-gray-50">
              <QRCodeComponent />
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
