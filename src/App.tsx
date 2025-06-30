
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Onboarding from "./pages/Onboarding";
import Community from "./pages/Community";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyStudent from "./pages/VerifyStudent";
import SignUp from "./pages/SignUp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SubscriptionProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/account" element={<Account />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/community" element={<Community />} />
            <Route path="/verify" element={<VerifyEmail />} />
            <Route path="/verify-student" element={<VerifyStudent />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SubscriptionProvider>
  </QueryClientProvider>
);

export default App;
