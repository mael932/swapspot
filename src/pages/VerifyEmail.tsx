import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with required parameters
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "error">("loading");
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleVerification = async () => {
      // Get the verification parameters from the URL
      // Supabase redirects to this page with these parameters
      const token = searchParams.get("token_hash");
      const type = searchParams.get("type");
      
      if (!token || !type) {
        setVerificationStatus("error");
        return;
      }
      
      try {
        // Verify the OTP (one-time password) token
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: type as any
        });
        
        if (error) {
          console.error("Verification error:", error);
          setVerificationStatus("error");
        } else {
          setVerificationStatus("success");
        }
      } catch (err) {
        console.error("Error during verification:", err);
        setVerificationStatus("error");
      }
    };
    
    handleVerification();
  }, [searchParams]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
          {verificationStatus === "loading" && (
            <div className="text-center space-y-4">
              <Loader2 className="h-16 w-16 text-swap-blue animate-spin mx-auto" />
              <h1 className="text-2xl font-bold">Verifying your email...</h1>
              <p className="text-gray-600">This will only take a moment.</p>
            </div>
          )}
          
          {verificationStatus === "success" && (
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h1 className="text-2xl font-bold text-green-700">Email Verified!</h1>
              <p className="text-gray-600">
                Your email has been successfully verified. You can now access all features of SwapSpot.
              </p>
              <div className="pt-4">
                <Button asChild className="w-full">
                  <Link to="/browse">Start Browsing Swaps</Link>
                </Button>
                <p className="mt-4 text-sm text-gray-500">
                  Or go to your <Link to="/profile" className="text-swap-blue hover:underline">profile settings</Link> to complete your profile
                </p>
              </div>
            </div>
          )}
          
          {verificationStatus === "error" && (
            <div className="text-center space-y-4">
              <XCircle className="h-16 w-16 text-red-500 mx-auto" />
              <h1 className="text-2xl font-bold text-red-700">Verification Failed</h1>
              <p className="text-gray-600">
                We couldn't verify your email address. The verification link may be expired or invalid.
              </p>
              <div className="pt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/signup">Try Again</Link>
                </Button>
                <p className="mt-4 text-sm text-gray-500">
                  If you continue to have issues, please <Link to="/contact" className="text-swap-blue hover:underline">contact support</Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VerifyEmail;
