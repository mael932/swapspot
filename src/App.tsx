
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
import VerifyEmail from "./pages/VerifyEmail";

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
      setIsLoading(false);
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
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/about" element={<About />} />
            <Route path="/swaps/:id" element={<SwapDetail />} />
            <Route path="/verify" element={<VerifyEmail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
