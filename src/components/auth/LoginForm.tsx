
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/lib/supabase";
import { Checkbox } from "@/components/ui/checkbox";

interface LoginFormProps {
  onMagicLinkSent: (email: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onMagicLinkSent }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const navigate = useNavigate();

  const handleSignupRedirect = () => {
    navigate("/onboarding");
  };

  const cleanupAuthState = () => {
    // Clear all auth-related keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError("Please enter a valid email address");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (!isLogin && password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (!isLogin && !gdprConsent) {
      setError("You must agree to the Privacy Policy to create an account");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      if (isLogin) {
        // Clean up any existing auth state before login
        cleanupAuthState();
        
        // Attempt global sign out first
        try {
          await supabase.auth.signOut({ scope: 'global' });
        } catch (err) {
          console.log("Global signout failed, continuing with login:", err);
        }

        // Login flow
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("Login error:", error);
          if (error.message.includes("Invalid login credentials")) {
            setError("Invalid email or password. Please check your credentials and try again.");
          } else if (error.message.includes("Email not confirmed")) {
            setError("Please check your email and confirm your account before signing in.");
          } else {
            setError(error.message);
          }
          return;
        }

        if (data.user && data.session) {
          console.log("Login successful:", data.user.id);
          
          // Ensure session is properly set
          await supabase.auth.setSession({
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token
          });

          toast.success("Welcome back!", {
            description: "You've been logged in successfully"
          });
          
          // Force page reload to ensure clean state
          window.location.href = "/profile";
        }
      } else {
        // Clean up any existing auth state before signup
        cleanupAuthState();
        
        // Sign up flow - use the new auth callback route
        const redirectUrl = `${window.location.origin}/auth/callback`;
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: fullName,
              gdpr_consent: true
            }
          }
        });

        if (error) {
          console.error("Signup error:", error);
          if (error.message.includes("User already registered")) {
            setError("An account with this email already exists. Please try logging in instead.");
          } else {
            setError(error.message);
          }
          return;
        }

        if (data.user) {
          console.log("Signup successful:", data.user.id);
          
          // Check if user needs email confirmation
          if (!data.session) {
            toast.success("Please check your email", {
              description: "We've sent you a confirmation link to complete your registration."
            });
            return;
          }
          
          // If we have a session, the user is automatically logged in
          if (data.session) {
            // Ensure session is properly set
            await supabase.auth.setSession({
              access_token: data.session.access_token,
              refresh_token: data.session.refresh_token
            });

            toast.success("Account created successfully!", {
              description: "Welcome to SwapSpot! Let's set up your profile."
            });
            
            // Force page reload to ensure clean state
            window.location.href = "/onboarding";
          }
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-swap-blue">
          {isLogin ? "Welcome Back" : "Join SwapSpot"}
        </h1>
        <p className="mt-2 text-gray-600">
          {isLogin 
            ? "Sign in to your account to continue" 
            : "Create your account and start your journey"
          }
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User className="h-4 w-4 text-swap-blue" />
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full"
              required={!isLogin}
              disabled={isLoading}
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-swap-blue" />
            Email Address
          </Label>
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
          <Label htmlFor="password" className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-swap-blue" />
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
            required
            disabled={isLoading}
          />
        </div>

        {!isLogin && (
          <>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-swap-blue" />
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <Checkbox
                  id="gdpr-consent-login"
                  checked={gdprConsent}
                  onCheckedChange={(checked) => setGdprConsent(checked === true)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="gdpr-consent-login" className="text-sm leading-relaxed">
                    I agree to the collection and processing of my data in accordance with the{" "}
                    <Link 
                      to="/privacy-policy" 
                      target="_blank"
                      className="text-swap-blue font-semibold hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    . I understand that my data will be used to match me with accommodation exchange opportunities.
                  </Label>
                </div>
              </div>
            </div>
          </>
        )}
        
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Button type="submit" className="w-full" disabled={isLoading || (!isLogin && !gdprConsent)}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {isLogin ? "Signing in..." : "Creating Account..."}
            </>
          ) : (
            isLogin ? "Sign In" : "Create Account"
          )}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        {isLogin ? (
          <button
            type="button"
            onClick={handleSignupRedirect}
            className="text-swap-blue font-semibold hover:underline"
          >
            Don't have an account? Sign up
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setError("");
              setPassword("");
              setConfirmPassword("");
              setFullName("");
              setGdprConsent(false);
            }}
            className="text-swap-blue font-semibold hover:underline"
          >
            Already have an account? Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
