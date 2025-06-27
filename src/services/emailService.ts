
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
    const currentOrigin = window.location.origin;
    
    // Redirect to the verify page in our app
    const redirectTo = `${currentOrigin}/verify`;
    console.log("Setting redirect URL to:", redirectTo);
    
    // Send the OTP via email
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
        shouldCreateUser: true,
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

/**
 * Save user profile data to the database
 */
export const saveUserProfile = async (userData: any): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("No authenticated user found");
    }

    // Save to profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        email: userData.email,
        full_name: userData.fullName,
        university: userData.university,
        exchange_university: userData.exchangeUniversity,
        program: userData.program,
        start_date: userData.startDate,
        end_date: userData.endDate,
        current_location: userData.currentLocation,
        current_address: userData.currentAddress,
        budget: userData.budget,
        preferred_destinations: userData.preferredDestinations,
        apartment_description: userData.apartmentDescription,
        verification_method: userData.verificationMethod,
        university_email: userData.universityEmail,
        additional_info: userData.additionalInfo,
        has_uploaded_proof: userData.hasUploadedProof,
        gdpr_consent: userData.gdprConsent,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'id'
      });

    if (profileError) {
      console.error("Error saving profile:", profileError);
      return false;
    }

    console.log("User profile saved successfully");
    return true;
  } catch (error) {
    console.error("Error in saveUserProfile:", error);
    return false;
  }
};
