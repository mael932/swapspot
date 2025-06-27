import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AccommodationModes from "@/components/AccommodationModes";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import SmartRecommendations from "@/components/SmartRecommendations";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [hasPaid, setHasPaid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Index page loaded");
    
    const checkUserAndPayment = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Supabase connection error:", error);
          setError("Failed to connect to Supabase. Check the console for details.");
        } else {
          console.log("Supabase connection successful:", data.session ? "User is logged in" : "No active session");
          setUser(data.session?.user || null);
          
          if (data.session?.user) {
            const { data: paymentData } = await supabase
              .from('user_payments')
              .select('has_paid')
              .eq('user_id', data.session.user.id)
              .single();
            
            setHasPaid(paymentData?.has_paid || false);
          }
        }
      } catch (err) {
        console.error("Error checking user session:", err);
        setError("An unexpected error occurred while connecting to Supabase.");
      } finally {
        setLoading(false);
      }
    };
    
    checkUserAndPayment();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      
      if (session?.user) {
        const { data: paymentData } = await supabase
          .from('user_payments')
          .select('has_paid')
          .eq('user_id', session.user.id)
          .single();
        
        setHasPaid(paymentData?.has_paid || false);
      } else {
        setHasPaid(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-lg text-gray-700">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="bg-red-50 border border-red-200 p-6 rounded-lg max-w-md shadow-sm">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-700">{error}</p>
            <p className="mt-2 text-sm text-gray-600">Please check the browser console for more details.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Paywall - 60-30-10 split
  if (user && !hasPaid) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                {/* 60% - Primary Content */}
                <div className="mb-6">
                  <Lock className="h-16 w-16 text-swap-blue mx-auto mb-4" />
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome!</h1>
                  <p className="text-xl text-gray-700">
                    Connect with verified students worldwide.
                  </p>
                </div>
                
                {/* 30% - Secondary Content */}
                <div className="mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>✓ Unlimited verified connections</li>
                      <li>✓ Instant match notifications</li>
                      <li>✓ Priority support</li>
                    </ul>
                  </div>

                  <div className="mb-4">
                    <span className="text-3xl font-bold text-blue-800">€25</span>
                    <span className="text-sm text-blue-600 ml-2">one-time</span>
                  </div>

                  <Button 
                    onClick={() => navigate('/required-signup')}
                    className="bg-swap-blue hover:bg-swap-blue/90 text-white px-8 py-3"
                  >
                    Get Access
                  </Button>
                </div>

                {/* 10% - Accent Content */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <Shield className="h-4 w-4 text-green-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Verified</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-4 w-4 text-swap-blue mx-auto mb-1" />
                    <p className="text-xs text-gray-600">10k+ Members</p>
                  </div>
                  <div className="text-center">
                    <span className="text-yellow-500 text-sm">★★★★★</span>
                    <p className="text-xs text-gray-600">4.8/5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        {user && hasPaid ? (
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
          </div>
        ) : (
          <>
            <HeroSection />
            <AccommodationModes />
            <HowItWorks />
            <Testimonials />
            <CtaSection />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
