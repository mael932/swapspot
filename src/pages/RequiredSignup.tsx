
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Shield, Users, Star, Check, Crown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/components/ui/sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";

const RequiredSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    setError("");
    setIsLoading(true);
    
    try {
      if (isLogin) {
        // Login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) {
          setError(error.message);
          return;
        }
        
        toast.success("Welcome back!");
        navigate("/");
      } else {
        // Sign up
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        });
        
        if (error) {
          setError(error.message);
          return;
        }
        
        toast.success("Account created! Please check your email to verify.");
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Auth error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {},
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) {
        console.error("Checkout error:", error);
        toast.error("Failed to start payment. Please try again.");
        return;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-swap-blue mb-4">Join SwapSpot</h1>
            <p className="text-xl text-gray-600 mb-2">
              Connect with verified students across Europe
            </p>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              One-time payment • Lifetime access
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Benefits */}
            <div className="space-y-6">
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader className="text-center">
                  <Crown className="h-12 w-12 text-yellow-600 mx-auto mb-2" />
                  <CardTitle className="text-2xl font-bold text-blue-800">SwapSpot Access</CardTitle>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-blue-800">€25</span>
                    <span className="text-lg text-blue-600">one-time</span>
                  </div>
                  <p className="text-blue-700">Lifetime access to all features</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <span className="font-medium">Unlimited Connections</span>
                        <p className="text-sm text-gray-600">Connect with verified students across Europe</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <span className="font-medium">Email Match Notifications</span>
                        <p className="text-sm text-gray-600">Get contact details sent directly to your inbox</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <span className="font-medium">Full Contact Access</span>
                        <p className="text-sm text-gray-600">Instagram, WhatsApp, email, and more</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <span className="font-medium">Priority Support</span>
                        <p className="text-sm text-gray-600">Get help when you need it</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Trust indicators */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border">
                  <Shield className="h-8 w-8 text-green-600" />
                  <div>
                    <h4 className="font-medium text-sm">Verified Students</h4>
                    <p className="text-xs text-gray-600">University email verified</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-sm">10,000+ Students</h4>
                    <p className="text-xs text-gray-600">Active across Europe</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border">
                  <Star className="h-8 w-8 text-yellow-600" />
                  <div>
                    <h4 className="font-medium text-sm">4.8/5 Rating</h4>
                    <p className="text-xs text-gray-600">Trusted platform</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Auth form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  {isLogin ? "Sign In" : "Create Account"}
                </CardTitle>
                <p className="text-center text-gray-600">
                  {isLogin ? "Welcome back to SwapSpot" : "Join thousands of verified students"}
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full"
                      required
                      disabled={isLoading}
                      minLength={6}
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
                        {isLogin ? "Signing In..." : "Creating Account..."}
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        {isLogin ? "Sign In" : "Create Account"}
                      </>
                    )}
                  </Button>
                </form>
                
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-swap-blue hover:underline text-sm"
                  >
                    {isLogin 
                      ? "Don't have an account? Sign up" 
                      : "Already have an account? Sign in"
                    }
                  </button>
                </div>

                {isLogin && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-3 text-center">
                      Ready to get full access?
                    </p>
                    <Button 
                      onClick={handlePayment}
                      className="w-full bg-green-600 hover:bg-green-700"
                      variant="default"
                    >
                      Get SwapSpot Access - €25
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Secure payment by Stripe • Cancel anytime • 14-day money-back guarantee
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RequiredSignup;
