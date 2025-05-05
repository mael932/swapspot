import emailjs from "@emailjs/browser";
import { toast } from "@/components/ui/sonner";

/**
 * Send a verification email to the user
 * Using EmailJS to actually send emails without a backend
 */
export const sendVerificationEmail = async (email: string): Promise<boolean> => {
  console.log(`Attempting to send verification email to: ${email}`);
  
  try {
    // Generate a verification token
    const verificationToken = generateVerificationToken();
    const verificationLink = `${window.location.origin}/verify?email=${encodeURIComponent(email)}&token=${verificationToken}`;
    
    // Send actual email using EmailJS
    // NOTE: You need to replace these with your own EmailJS service, template, and user IDs
    const emailParams = {
      to_email: email,
      to_name: email.split('@')[0],
      verification_link: verificationLink,
      from_name: "SwapSpot Team",
      subject: "Verify your SwapSpot account"
    };
    
    // Initialize EmailJS with your public key
    emailjs.init("YOUR_EMAILJS_PUBLIC_KEY"); // Replace this with your actual public key
    
    // Send the email
    const response = await emailjs.send(
      "YOUR_EMAILJS_SERVICE_ID", // Replace with your Service ID
      "YOUR_EMAILJS_TEMPLATE_ID", // Replace with your Template ID
      emailParams
    );
    
    if (response.status === 200) {
      console.log("Email successfully sent!");
      
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
    } else {
      console.error("Failed to send email:", response);
      toast.error("Failed to send verification email. Please try again later.");
      return false;
    }
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
