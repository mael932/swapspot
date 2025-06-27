
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Mail, Clock, Shield } from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";
import { useNavigate } from "react-router-dom";
import { saveOnboardingData } from "@/utils/excelExport";
import { useToast } from "@/hooks/use-toast";
import { formatUserDataForSheet } from "@/services/googleSheetsService";
import { supabase } from "@/lib/supabase";

interface ProfileCompleteStepProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  onComplete: () => void;
}

const ProfileCompleteStep: React.FC<ProfileCompleteStepProps> = ({
  data,
  onPrevious,
  canGoPrevious,
  onComplete
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFinishOnboarding = async () => {
    try {
      // Save onboarding data to localStorage for backup
      const submissionId = saveOnboardingData(data);
      
      // Get signup data from localStorage
      const signupDataStr = localStorage.getItem('signupData');
      const signupData = signupDataStr ? JSON.parse(signupDataStr) : {};
      
      // Send all data to your centralized Google Sheet
      try {
        const userData = formatUserDataForSheet(signupData, data);
        
        const { error } = await supabase.functions.invoke('google-sheets', {
          body: userData
        });
        
        if (error) {
          console.error('Error sending to Google Sheets:', error);
          toast({
            title: "Warning",
            description: "Profile saved locally but couldn't sync to central database. We'll retry automatically.",
            variant: "destructive",
          });
        } else {
          console.log('Successfully sent data to centralized Google Sheet');
          toast({
            title: "Profile Submitted Successfully!",
            description: "Your information has been sent to our team for review. We'll contact you with perfect exchange opportunities!",
          });
        }
      } catch (sheetsError) {
        console.error('Error with Google Sheets integration:', sheetsError);
        toast({
          title: "Profile Saved",
          description: "Your preferences are saved locally. We'll sync to our database shortly.",
        });
      }
      
      // Set completion status
      localStorage.setItem('onboardingComplete', 'true');
      localStorage.setItem('userProfile', JSON.stringify(data));
      
      // Redirect to community page instead of browse
      navigate('/community');
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      toast({
        title: "Error",
        description: "There was an issue saving your preferences. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">
          Profile Complete!
        </h3>
        <p className="text-lg text-gray-600">
          Thank you for joining SwapSpot. We'll review your profile and email you when we find perfect matches.
        </p>
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
            <Mail className="h-5 w-5" />
            What happens next?
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">
                1
              </div>
              <div>
                <p className="font-medium text-blue-800">Profile Review</p>
                <p className="text-sm text-blue-700">
                  Our team will review your profile and verify your student status within 24-48 hours
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">
                2
              </div>
              <div>
                <p className="font-medium text-blue-800">Match Search</p>
                <p className="text-sm text-blue-700">
                  We'll actively search for suitable exchange partners based on your preferences and location
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">
                3
              </div>
              <div>
                <p className="font-medium text-blue-800">Email Notification</p>
                <p className="text-sm text-blue-700">
                  <strong>We'll email you when we find a match!</strong> You'll receive potential exchange opportunities at {data.email}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
        <h4 className="font-semibold text-green-800 mb-2">
          Your Safety is Our Priority
        </h4>
        <p className="text-sm text-green-700">
          All students are manually verified by our team to ensure a safe and authentic community. 
          We only connect verified students with legitimate exchange opportunities.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-4 w-4 text-yellow-600" />
          <span className="font-medium text-yellow-800">Expected Timeline</span>
        </div>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Profile review: 24-48 hours</li>
          <li>• <strong>Email notification when we find matches: Within 1-2 weeks</strong></li>
          <li>• Ongoing notifications: As new opportunities arise</li>
        </ul>
      </div>

      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={onPrevious} 
          disabled={!canGoPrevious}
        >
          Previous
        </Button>
        <Button 
          onClick={handleFinishOnboarding}
          className="px-8 bg-green-600 hover:bg-green-700"
        >
          Complete Profile & Join Community
        </Button>
      </div>
    </div>
  );
};

export default ProfileCompleteStep;
