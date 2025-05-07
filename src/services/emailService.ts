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
    const { data, error } = await supabase.auth.signUp({
      email,
      password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8).toUpperCase() + "1!", // Generate a random secure password
      options: {
        emailRedirectTo: redirectTo,
        data: {
          signup_timestamp: new Date().toISOString(),
        }
      }
    });
    
    if (error) {
      console.error("Error in email verification process:", error);
      
      // If user already exists, send a magic link instead
      if (error.message.includes("already registered") || error.message.includes("unique")) {
        console.log("User already exists, sending magic link instead");
        
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: redirectTo,
        });
        
        if (resetError) {
          console.error("Error sending magic link to existing user:", resetError);
          toast.error("Failed to send verification email", {
            description: resetError.message
          });
          return false;
        }
        
        console.log("Magic link sent successfully to existing user");
        toast.success("Verification email sent to your inbox");
        return true;
      }
      
      // Other errors
      toast.error("Failed to send verification email", {
        description: error.message
      });
      return false;
    }
    
    // Check if the email was actually sent
    if (data && data.user) {
      console.log("Signup successful, verification email sent:", data);
      toast.success("Verification email sent to your inbox");
      return true;
    } else {
      console.error("Verification email not sent - unexpected response from Supabase");
      toast.error("Failed to send verification email", {
        description: "Unexpected error occurred. Please try again."
      });
      return false;
    }
    
  } catch (error) {
    console.error("Unexpected error in sendVerificationEmail:", error);
    toast.error("An unexpected error occurred", {
      description: "Please try again later."
    });
    return false;
  }
};
