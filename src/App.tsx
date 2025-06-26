
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import HowItWorksPage from "./pages/HowItWorks";
import Browse from "./pages/Browse";
import About from "./pages/About";
import SwapDetail from "./pages/SwapDetail";
import AuPairDetail from "./pages/AuPairDetail";
import RentalDetail from "./pages/RentalDetail";
import VerifyEmail from "./pages/VerifyEmail";
import Account from "./pages/Account";
import PostPlace from "./pages/PostPlace";
import RequiredSignup from "./pages/RequiredSignup";
import { supabase } from "./lib/supabase";
import Safety from "./pages/Safety";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Careers from "./pages/Careers";
import Support from "./pages/Support";
import Onboarding from "./pages/Onboarding";
import Community from "./pages/Community";
import HelpTips from "./pages/HelpTips";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import FloatingChatTab from "./components/FloatingChatTab";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simple startup check
    try {
      console.log("App initialized");
      console.log("Supabase client available:", !!supabase);
      
      // Test Supabase connection
      supabase.auth.getSession()
        .then(({ data, error: sessionError }) => {
          if (sessionError) {
            console.error("Supabase session error:", sessionError);
            // Don't set as error to prevent blocking the app
          } else {
            console.log("Supabase connection working", data.session ? "User is logged in" : "No active session");
          }
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Error checking Supabase session:", err);
          setIsLoading(false);
        });
    } catch (err) {
      console.error("Application startup error:", err);
      setError("Failed to initialize application. Please check the console for more details.");
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Application Error</h1>
        <p className="mb-4">{error}</p>
        <p className="text-sm">Please check your browser console for more details.</p>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SubscriptionProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/required-signup" element={<RequiredSignup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/about" element={<About />} />
              <Route path="/swaps/:id" element={<SwapDetail />} />
              <Route path="/aupair/:id" element={<AuPairDetail />} />
              <Route path="/rentals/:id" element={<RentalDetail />} />
              <Route path="/verify" element={<VerifyEmail />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/account" element={<Account />} />
              <Route path="/post-place" element={<PostPlace />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/support" element={<Support />} />
              <Route path="/community" element={<Community />} />
              <Route path="/help-tips" element={<HelpTips />} />
              <Route path="/aupair" element={<Browse />} />
              <Route path="/rentals" element={<Browse />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <FloatingChatTab />
          </BrowserRouter>
        </TooltipProvider>
      </SubscriptionProvider>
    </QueryClientProvider>
  );
};

export default App;
