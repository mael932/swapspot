
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { verifyEmail } from "@/services/emailService";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "error">("loading");
  
  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");
    
    if (!email || !token) {
      setVerificationStatus("error");
      return;
    }
    
    // Simulate network delay
    setTimeout(() => {
      const isVerified = verifyEmail(email, token);
      setVerificationStatus(isVerified ? "success" : "error");
    }, 2000);
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
