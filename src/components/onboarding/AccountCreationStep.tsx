
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserPlus, User, Mail, Lock, CheckCircle } from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/sonner";
import { saveUserProfile } from "@/services/emailService";

interface AccountCreationStepProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  onAccountCreated: () => void;
  isAuthenticated: boolean;
}

const AccountCreationStep: React.FC<AccountCreationStepProps> = ({
  data,
  onUpdate,
  onPrevious,
  canGoPrevious,
  onAccountCreated,
  isAuthenticated,
}) => {
  const [email, setEmail] = useState(data.email || "");
  const [password, setPassword] = useState(data.password || "");
  const [confirmPassword, setConfirmPassword] = useState(data.confirmPassword || "");
  const [fullName, setFullName] = useState(data.fullName || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateAccount = async () => {
    if (!email || !password || !fullName) {
      setError("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Create account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            gdpr_consent: true
          }
        }
      });

      if (authError) {
        if (authError.message.includes("User already registered")) {
          setError("An account with this email already exists. Please try logging in instead.");
        } else {
          setError(authError.message);
        }
        return;
      }

      if (authData.user) {
        // Save all onboarding data to profile
        const profileData = {
          ...data,
          email,
          fullName,
        };

        const success = await saveUserProfile(profileData);
        
        if (success) {
          toast.success("Account created successfully!", {
            description: "Your profile has been saved. You can now access your account and forums."
          });
          onAccountCreated();
        } else {
          toast.error("Account created but failed to save profile data");
        }
      }
    } catch (error) {
      console.error("Account creation error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (isAuthenticated) {
      setIsLoading(true);
      const success = await saveUserProfile(data);
      
      if (success) {
        toast.success("Profile updated successfully!");
        onAccountCreated();
      } else {
        toast.error("Failed to save profile data");
      }
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            Profile Complete!
          </h3>
          <p className="text-gray-600 text-lg">
            Your onboarding data is ready to be saved to your profile
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h4 className="font-semibold text-green-800 mb-2">✅ All Set!</h4>
          <p className="text-sm text-green-700">
            You're already logged in. We'll update your profile with the information you've provided.
          </p>
        </div>

        <div className="flex gap-4 pt-6">
          <Button 
            variant="outline" 
            onClick={onPrevious} 
            disabled={!canGoPrevious || isLoading}
            className="flex-1 h-12"
          >
            Previous
          </Button>
          <Button 
            onClick={handleSaveProfile}
            disabled={isLoading}
            className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white font-medium"
          >
            {isLoading ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <UserPlus className="h-16 w-16 text-swap-blue mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          Create Your Account
        </h3>
        <p className="text-gray-600 text-lg">
          Save your preferences and access your profile
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-800 mb-2">🎉 Almost Done!</h4>
        <p className="text-sm text-blue-700">
          Create your account to save all your preferences and start connecting with other students.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-base font-medium flex items-center gap-2">
            <User className="h-4 w-4 text-swap-blue" />
            Full Name *
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-12 border-gray-300 focus:border-swap-blue"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-base font-medium flex items-center gap-2">
            <Mail className="h-4 w-4 text-swap-blue" />
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 border-gray-300 focus:border-swap-blue"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-base font-medium flex items-center gap-2">
            <Lock className="h-4 w-4 text-swap-blue" />
            Password *
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 border-gray-300 focus:border-swap-blue"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-base font-medium flex items-center gap-2">
            <Lock className="h-4 w-4 text-swap-blue" />
            Confirm Password *
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-12 border-gray-300 focus:border-swap-blue"
            required
          />
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-4 pt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious} 
          disabled={!canGoPrevious || isLoading}
          className="flex-1 h-12"
        >
          Previous
        </Button>
        <Button 
          onClick={handleCreateAccount}
          disabled={isLoading || !email || !password || !fullName || password !== confirmPassword}
          className="flex-1 h-12 bg-swap-blue hover:bg-swap-blue/90 text-white font-medium"
        >
          {isLoading ? "Creating Account..." : "Create Account & Save"}
        </Button>
      </div>
    </div>
  );
};

export default AccountCreationStep;
