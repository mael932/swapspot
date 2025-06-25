
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginForm from "@/components/auth/LoginForm";
import MagicLinkSent from "@/components/auth/MagicLinkSent";

const Login = () => {
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);
  const [magicLinkEmail, setMagicLinkEmail] = useState("");
  const location = useLocation();
  
  // Auto-focus on email field when coming from navbar login button
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const fromNav = searchParams.get('fromNav') === 'true';
    
    if (fromNav) {
      // Focus the email input when coming from nav login button
      const emailInput = document.getElementById('email');
      if (emailInput) {
        emailInput.focus();
      }
    }
  }, [location]);
  
  const handleMagicLinkSent = (email: string) => {
    setMagicLinkEmail(email);
    setIsMagicLinkSent(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4 bg-gray-50">
        {isMagicLinkSent ? (
          <MagicLinkSent email={magicLinkEmail} />
        ) : (
          <LoginForm onMagicLinkSent={handleMagicLinkSent} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Login;
