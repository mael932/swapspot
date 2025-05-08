
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/lib/supabase";

/**
 * Send a verification email to the user's email address
 * This handles both signing up new users and resending verification emails
 */
export const sendVerificationEmail = async (email: string): Promise<boolean> => {
  try {
    console.log("Starting sendVerificationEmail for:", email);
    
    // Use the current window location for redirection
    // This ensures we use the correct domain/port in all environments
    const currentOrigin = window.location.origin;
    
    // Redirect to the verify page in our app
    const redirectTo = `${currentOrigin}/verify`;
    console.log("Setting redirect URL to:", redirectTo);
    
    // Send the OTP via email
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
        // Add custom metadata that indicates this is for SwapSpot
        data: {
          signup_timestamp: new Date().toISOString(),
          app_name: "SwapSpot",
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
