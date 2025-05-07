
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
    
    // Check if this user exists already in Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false, // Only check if user exists, don't create
      }
    });
    
    // If we got an error saying user doesn't exist, this is actually a new signup
    if (authError && authError.message.includes("Email not found")) {
      console.log("User doesn't exist, proceeding with signup");
      
      // Send the signup invitation with email verification
      const { data, error } = await supabase.auth.signUp({
        email,
        options: {
          emailRedirectTo: redirectTo,
          data: {
            signup_timestamp: new Date().toISOString(),
          }
        }
      });
      
      if (error) {
        console.error("Error sending verification email during signup:", error);
        
        // Show user-friendly error message
        if (error.message.includes("unique")) {
          toast.error("Email already registered", {
            description: "This email is already registered. Try to log in instead."
          });
        } else {
          toast.error("Failed to send verification email", {
            description: error.message
          });
        }
        
        return false;
      }
      
      // Check if the email was actually sent
      if (data && data.user) {
        console.log("Signup successful, verification email should be sent:", data);
        toast.success("Verification email sent to your inbox");
        return true;
      } else {
        console.error("Verification email not sent - unexpected response from Supabase");
        toast.error("Failed to send verification email", {
          description: "Unexpected error occurred. Please try again."
        });
        return false;
      }
    } else if (!authError || authError.message.includes("Email link")) {
      // The user exists, we need to send a password reset/magic link
      console.log("User exists, sending magic link");
      
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
    } else {
      console.error("Unexpected error checking user:", authError);
      toast.error("Failed to send verification email", {
        description: authError.message
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
