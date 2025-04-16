
import { toast } from "@/components/ui/sonner";

/**
 * Send a verification email to the user
 * In a real app, this would connect to an email service like SendGrid or AWS SES
 * For now, we'll simulate it with a timeout and console logs
 */
export const sendVerificationEmail = async (email: string): Promise<boolean> => {
  console.log(`Attempting to send verification email to: ${email}`);
  
  try {
    // Simulate API call to email service
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a verification token (in real app, store this with user record)
    const verificationToken = generateVerificationToken();
    const verificationLink = `${window.location.origin}/verify?email=${encodeURIComponent(email)}&token=${verificationToken}`;
    
    // In a real implementation, this would be the email content sent to the user
    console.log("Email sent with the following details:");
    console.log("To:", email);
    console.log("Subject: Verify your SwapSpot account");
    console.log("Verification link:", verificationLink);
    
    // Store token in localStorage (in a real app, this would be stored in a database)
    const verificationData = {
      email,
      token: verificationToken,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours expiry
    };
    
    const storedVerifications = JSON.parse(localStorage.getItem('pendingVerifications') || '[]');
    storedVerifications.push(verificationData);
    localStorage.setItem('pendingVerifications', JSON.stringify(storedVerifications));
    
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    toast.error("Failed to send verification email. Please try again later.");
    return false;
  }
};

/**
 * Generate a random verification token
 */
const generateVerificationToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Verify a user's email using the token
 */
export const verifyEmail = (email: string, token: string): boolean => {
  try {
    const storedVerifications = JSON.parse(localStorage.getItem('pendingVerifications') || '[]');
    const verificationIndex = storedVerifications.findIndex(
      (v: any) => v.email === email && v.token === token && new Date(v.expires) > new Date()
    );
    
    if (verificationIndex === -1) {
      return false;
    }
    
    // Remove the verification from pending list
    storedVerifications.splice(verificationIndex, 1);
    localStorage.setItem('pendingVerifications', JSON.stringify(storedVerifications));
    
    // In a real app, this is where you would update the user's record to mark email as verified
    const verifiedUsers = JSON.parse(localStorage.getItem('verifiedUsers') || '[]');
    verifiedUsers.push(email);
    localStorage.setItem('verifiedUsers', JSON.stringify(verifiedUsers));
    
    return true;
  } catch (error) {
    console.error("Error verifying email:", error);
    return false;
  }
};
