
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, User, Upload } from "lucide-react";
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
  const [file, setFile] = useState<File | null>(null);
  const [gdprConsent, setGdprConsent] = useState(false);
  const navigate = useNavigate();

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
        // Login flow
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("Email not confirmed")) {
            setError("Please check your email and click the confirmation link before logging in.");
          } else if (error.message.includes("Invalid login credentials")) {
            setError("Invalid email or password. Please try again.");
          } else {
            setError(error.message);
          }
          return;
        }

        if (data.user) {
          toast.success("Welcome back!", {
            description: "You've been logged in successfully"
          });
          
          // Check if user has completed onboarding by looking for profile data
          const { data: profile } = await supabase
            .from('profiles')
            .select('university, program')
            .eq('user_id', data.user.id)
            .single();
          
          if (!profile || !profile.university || !profile.program) {
            // Redirect to onboarding if profile is incomplete
            navigate("/onboarding");
          } else {
            // Redirect to home if profile is complete
            localStorage.setItem(`onboarding_completed_${data.user.id}`, 'true');
            navigate("/");
          }
        }
      } else {
        // Sign up flow
        const redirectUrl = `${window.location.origin}/verify`;
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: fullName,
              has_uploaded_proof: !!file,
              gdpr_consent: true
            }
          }
        });

        if (error) {
          if (error.message.includes("User already registered")) {
            setError("An account with this email already exists. Please try logging in instead.");
          } else {
            setError(error.message);
          }
          return;
        }

        if (data.user) {
          if (data.user.email_confirmed_at) {
            // Email is already confirmed, redirect to onboarding
            toast.success("Account created successfully!", {
              description: "Let's complete your profile setup"
            });
            navigate("/onboarding");
          } else {
            // Email confirmation required
            toast.success("Please check your email!", {
              description: "We've sent you a verification link to complete your registration"
            });
            onMagicLinkSent(email);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
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
            : "Create your account and start swapping"
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
              <Label htmlFor="proof" className="flex items-center gap-2">
                <Upload className="h-4 w-4 text-swap-blue" />
                Proof of enrollment (Optional)
              </Label>
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
                      {file ? file.name : "Upload student card or university letter"}
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* GDPR Consent Checkbox */}
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
            isLogin ? "Sign In" : "Create Account & Start Setup"
          )}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
            setPassword("");
            setConfirmPassword("");
            setFullName("");
            setFile(null);
            setGdprConsent(false);
          }}
          className="text-swap-blue font-semibold hover:underline"
        >
          {isLogin 
            ? "Don't have an account? Sign up" 
            : "Already have an account? Sign in"
          }
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
