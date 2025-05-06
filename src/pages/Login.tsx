import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, LogIn, MailCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/lib/supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    // Clear any previous errors
    setError("");
    setIsLoading(true);
    
    try {
      // Attempt to log in with Supabase Auth
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (signInError) {
        console.error("Login error:", signInError);
        setError("Invalid email or password. Please try again.");
      } else if (data?.user) {
        toast.success("Login successful", {
          description: "Welcome back to SwapSpot!"
        });
        navigate("/browse");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleMagicLinkLogin = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    
    setError("");
    setIsLoading(true);
    
    try {
      // Send magic link email
      const { error: magicLinkError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/browse`,
        },
      });
      
      if (magicLinkError) {
        console.error("Magic link error:", magicLinkError);
        setError("Failed to send magic link. Please try again.");
      } else {
        setIsMagicLinkSent(true);
      }
    } catch (error) {
      console.error("Error sending magic link:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isMagicLinkSent) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4 bg-gray-50">
          <div className="w-full max-w-md">
            <div className="text-center space-y-6 p-6 border border-blue-100 rounded-lg bg-blue-50">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-100">
                <MailCheck className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-medium text-blue-800">Magic Link Sent!</h2>
              <p className="text-gray-600">
                We've sent a secure login link to <span className="font-medium">{email}</span>.
              </p>
              <p className="text-gray-600">
                Please check your email inbox and click the link to log in.
              </p>
              <Button variant="outline" onClick={() => navigate("/")} className="mt-4">
                Return to Home
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-swap-blue">Welcome Back</h1>
            <p className="mt-2 text-gray-600">
              Log in to continue your SwapSpot experience
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
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
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-swap-blue hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
                disabled={isLoading}
              />
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
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Log In
                </>
              )}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-50 px-2 text-gray-500">Or</span>
              </div>
            </div>
            
            <Button 
              type="button"
              variant="outline"
              onClick={handleMagicLinkLogin}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Login with Magic Link"
              )}
            </Button>
          </form>
          
          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account yet? <Link to="/signup" className="text-swap-blue font-semibold hover:underline">Sign up</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
