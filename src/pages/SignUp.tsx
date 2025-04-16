
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MailCheck, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { validateUniversityEmail } from "@/lib/validation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/components/ui/sonner";
import { sendVerificationEmail } from "@/services/emailService";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate university email
    if (!validateUniversityEmail(email)) {
      setError("Please use a valid university email address (e.g., @uva.nl, @sorbonne.fr)");
      return;
    }
    
    // Clear any previous errors
    setError("");
    setIsLoading(true);
    
    try {
      // Send verification email
      const success = await sendVerificationEmail(email);
      
      if (success) {
        setSubmitted(true);
        toast.success("Verification email sent", {
          description: "Please check your university email inbox to confirm your account."
        });
      } else {
        setError("Failed to send verification email. Please try again later.");
      }
    } catch (error) {
      console.error("Error in email verification process:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          {!submitted ? (
            <>
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-swap-blue">Join SwapSpot</h1>
                <p className="mt-2 text-gray-600">
                  Sign up with your university email to get started
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    University Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="yourname@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    required
                    disabled={isLoading}
                  />
                  <p className="text-xs text-gray-500">
                    Must be a valid university email (e.g., @uva.nl, @sorbonne.fr)
                  </p>
                </div>
                
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Get Verification Link"
                  )}
                </Button>
              </form>
              
              <p className="mt-8 text-center text-sm text-gray-500">
                Already verified? <a href="/login" className="text-swap-blue font-semibold hover:underline">Log in</a>
              </p>
            </>
          ) : (
            <div className="text-center space-y-6 p-6 border border-green-100 rounded-lg bg-green-50">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-green-100">
                <MailCheck className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-medium text-green-800">Verification Email Sent!</h2>
              <p className="text-gray-600">
                We've sent a verification link to <span className="font-medium">{email}</span>.
              </p>
              <p className="text-gray-600">
                Please check your university email inbox and click the link to complete your registration.
              </p>
              <Button variant="outline" onClick={() => navigate("/")} className="mt-4">
                Return to Home
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
