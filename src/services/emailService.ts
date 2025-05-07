
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/lib/supabase";

/**
 * Send a verification email to the user using Supabase Auth
 */
export const sendVerificationEmail = async (email: string): Promise<boolean> => {
  console.log(`Attempting to send verification email to: ${email}`);
  
  try {
    // Get the current URL for proper redirection - using window.location.origin
    // Make sure we're using the actual current origin for redirects
    const currentOrigin = window.location.origin;
    const redirectTo = `${currentOrigin}/verify`;
    console.log("Setting redirect URL to:", redirectTo);
    
    // First check if this user exists and maybe needs a resend
    const { data: existingUserData, error: existingUserError } = await supabase.auth.admin
      .getUserByEmail(email)
      .catch(() => ({ data: null, error: null }));
    
    let success = false;
    
    // If user already exists but email isn't confirmed
    if (existingUserData?.user) {
      console.log("User exists, sending recovery email instead");
      const { error: otpError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectTo,
      });
      
      if (otpError) {
        console.error("Error sending password reset email:", otpError);
        toast.error("Failed to send verification email. Please try again later.");
        return false;
      }
      
      console.log("Password reset/verification email sent successfully");
      toast.success("Verification email sent to your inbox");
      return true;
    }
    
    // For new users, use signup flow
    const { data, error } = await supabase.auth.signUp({
      email,
      password: generateSecurePassword(), // Generate a secure temporary password
      options: {
        emailRedirectTo: redirectTo,
      }
    });
    
    if (error) {
      console.error("Error sending verification email:", error);
      
      // Special case for when user exists but is not verified
      if (error.message.includes("already registered")) {
        // Try to resend verification
        const { error: resendError } = await supabase.auth.resend({
          type: 'signup',
          email,
          options: {
            emailRedirectTo: redirectTo,
          }
        });
        
        if (resendError) {
          console.error("Error resending verification email:", resendError);
          toast.error("Failed to resend verification email. Please try again.");
          return false;
        }
        
        console.log("Verification email resent successfully");
        toast.success("Verification email resent to your inbox");
        return true;
      }
      
      toast.error("Failed to send verification email. Please try again.");
      return false;
    }
    
    // Check if the email was actually sent
    if (data && data.user) {
      console.log("Signup successful, verification email should be sent:", data);
      return true;
    } else {
      console.error("Verification email not sent - unexpected response from Supabase");
      toast.error("Failed to send verification email. Please try again later.");
      return false;
    }
  } catch (error) {
    console.error("Error in verification process:", error);
    toast.error("Failed to send verification email. Please try again later.");
    return false;
  }
};

/**
 * Generate a secure random password for initial signup
 * In a real app, users would set their own password after verification
 */
const generateSecurePassword = (): string => {
  const length = 16;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
  let password = "";
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password;
};

/**
 * Verify a user's email 
 * This is now handled by Supabase automatically
 */
export const verifyEmail = async (token: string): Promise<boolean> => {
  try {
    // The token comes from the URL that Supabase redirects to
    const { error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'email'
    });
    
    if (error) {
      console.error("Error verifying email:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error in email verification:", error);
    return false;
  }
};
