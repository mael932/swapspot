import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MailCheck, Loader2, Upload, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/components/ui/sonner";
import { sendVerificationEmail } from "@/services/emailService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with required parameters
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError("Please enter a valid email address");
      return;
    }
    
    // Clear any previous errors
    setError("");
    setIsLoading(true);
    
    try {
      // Send verification email using Supabase auth
      const success = await sendVerificationEmail(email);
      
      if (success) {
        // Store university and file info in Supabase later when user is verified
        setSubmitted(true);
        toast.success("Verification email sent", {
          description: "Please check your email inbox to confirm your account."
        });
        
        // Temporarily store university info in localStorage until user confirms email
        if (university || file) {
          localStorage.setItem(`verification_${email}`, JSON.stringify({
            university,
            hasUploadedProof: !!file,
            timestamp: new Date().toISOString(),
          }));
          
          // In a full implementation, we would upload the file to Supabase storage
          // and associate it with the user after verification
        }
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  
  const universities = [
    "University of Amsterdam",
    "Sorbonne University",
    "Heidelberg University",
    "Cambridge University",
    "Oxford University",
    "Politecnico di Milano",
    "Technical University of Berlin",
    "Uppsala University",
    "Complutense University of Madrid",
    "Harvard University",
    "Stanford University",
    "MIT",
    "UC Berkeley",
    "New York University",
    "Other"
  ];
  
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
                  Sign up to start exploring student housing swaps
                </p>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Early Demo Version
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Supabase Auth
                  </Badge>
                </div>
                <p className="mt-4 text-sm text-gray-500 bg-yellow-50 p-2 rounded-md border border-yellow-100">
                  Sign up with your email to receive a secure verification link.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="yourname@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    required
                    disabled={isLoading}
                  />
                  <p className="text-xs text-gray-500">
                    Are you a university student? Use your school email if possible (e.g., name@erasmus.nl)
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700">
                    Which university are you from? (Optional)
                  </label>
                  <Select value={university} onValueChange={setUniversity}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your university" />
                    </SelectTrigger>
                    <SelectContent>
                      {universities.map((uni) => (
                        <SelectItem key={uni} value={uni}>
                          {uni}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="proof" className="block text-sm font-medium text-gray-700">
                    Proof of enrollment (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                    <label className="cursor-pointer">
                      <Input
                        id="proof"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {file ? file.name : "Upload student card, university letter, or screenshot of student portal"}
                        </span>
                      </div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    Will be used to mark your account as "Verified Student" (manual verification for demo)
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
                Already verified? <Link to="/login" className="text-swap-blue font-semibold hover:underline">Log in</Link>
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
                Please check your email inbox and click the link to complete your registration.
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
