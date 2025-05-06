
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/lib/supabase";

/**
 * Send a verification email to the user using Supabase Auth
 */
export const sendVerificationEmail = async (email: string): Promise<boolean> => {
  console.log(`Attempting to send verification email to: ${email}`);
  
  try {
    // Use Supabase's built-in signup with email verification
    const { data, error } = await supabase.auth.signUp({
      email,
      password: generateSecurePassword(), // Generate a temporary password
      options: {
        emailRedirectTo: `${window.location.origin}/verify`,
      }
    });
    
    if (error) {
      console.error("Error sending verification email:", error);
      toast.error("Failed to send verification email. Please try again later.");
      return false;
    }
    
    console.log("Verification email sent successfully via Supabase:", data);
    return true;
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
