
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
          
          // Check payment status if user is logged in
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

    // Listen for auth changes
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

  // Show paywall for users without payment
  if (user && !hasPaid) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-blue-200 bg-white shadow-lg">
              <CardContent className="p-8">
                <Lock className="h-16 w-16 text-swap-blue mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to SwapSpot!</h1>
                <p className="text-xl text-gray-700 mb-6">
                  You're signed in, but need access to connect with verified students.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-blue-800 mb-3">What you'll get with SwapSpot Access:</h3>
                  <ul className="text-left text-blue-700 space-y-2">
                    <li>✓ Connect with unlimited verified students</li>
                    <li>✓ Email notifications when you match</li>
                    <li>✓ Access to all contact information</li>
                    <li>✓ Priority support</li>
                  </ul>
                </div>

                <div className="flex items-baseline justify-center gap-1 mb-6">
                  <span className="text-4xl font-bold text-blue-800">€25</span>
                  <span className="text-lg text-blue-600">one-time payment</span>
                </div>

                <Button 
                  onClick={() => navigate('/required-signup')}
                  className="bg-swap-blue hover:bg-swap-blue/90 text-white px-8 py-3 text-lg"
                >
                  Get SwapSpot Access
                </Button>

                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <Shield className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Verified Students</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-6 w-6 text-swap-blue mx-auto mb-1" />
                    <p className="text-xs text-gray-600">10,000+ Members</p>
                  </div>
                  <div className="text-center">
                    <span className="text-yellow-500 text-lg">★★★★★</span>
                    <p className="text-xs text-gray-600">4.8/5 Rating</p>
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
          // Show personalized content for paid users
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
          // Show standard homepage for visitors (not logged in)
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
