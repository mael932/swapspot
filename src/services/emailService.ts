
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/lib/supabase";

/**
 * Send a verification email to the user's email address
 * This handles both signing up new users and resending verification emails
 */
export const sendVerificationEmail = async (email: string): Promise<boolean> => {
  try {
    console.log("Starting sendVerificationEmail for:", email);
    
    // Set the redirect URL to be the current origin + /verify path
    const currentOrigin = window.location.origin;
    const redirectTo = `${currentOrigin}/verify`;
    console.log("Setting redirect URL to:", redirectTo);
    
    // First try a direct signup with email verification
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
        data: {
          signup_timestamp: new Date().toISOString(),
        }
      }
    });
    
    if (error) {
      console.error("Error in email verification process:", error);
      toast.error("Failed to send verification email", {
        description: error.message
      });
      return false;
    }
    
    // Check if the email was actually sent
    console.log("OTP email sent successfully:", data);
    toast.success("Verification email sent to your inbox", {
      description: "Please check your email inbox (including spam folder) to verify your account"
    });
    return true;
    
  } catch (error) {
    console.error("Unexpected error in sendVerificationEmail:", error);
    toast.error("An unexpected error occurred", {
      description: "Please try again later."
    });
    return false;
  }
};
