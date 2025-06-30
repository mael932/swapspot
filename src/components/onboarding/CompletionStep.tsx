
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Mail, Users, User, Sparkles, ArrowRight } from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";
import { useNavigate } from "react-router-dom";

interface CompletionStepProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  onComplete: () => void;
}

const CompletionStep: React.FC<CompletionStepProps> = ({
  data,
  onPrevious,
  canGoPrevious,
  onComplete
}) => {
  const navigate = useNavigate();

  const handleGoToForum = () => {
    navigate("/community");
  };

  const handleGoToProfile = () => {
    navigate("/account");
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-full">
            <Sparkles className="h-16 w-16 text-green-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-4">
          Welcome to SwapSpot! 🎉
        </h1>
        <p className="text-xl text-gray-700 mb-2">
          Welcome aboard, <strong>{data.fullName || 'Student'}!</strong>
        </p>
        <p className="text-lg text-gray-600">
          Your profile has been successfully created and submitted for review.
        </p>
      </div>

      {/* Success Card */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <h3 className="text-xl font-semibold text-green-800">Profile Complete!</h3>
          </div>
          
          <div className="space-y-3 text-green-700">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Your accommodation details have been saved
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Exchange preferences are ready for matching
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Student verification is being processed
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Email Notification Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <Mail className="h-5 w-5" />
            We'll email you when we find matches!
          </h4>
          
          <p className="text-blue-700 mb-3">
            Our team will actively search for the perfect exchange partners based on your preferences. 
            You'll receive notifications at <strong>{data.email}</strong> whenever we find suitable matches.
          </p>
          
          <div className="bg-blue-100 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Expected timeline:</strong> First matches typically appear within 1-2 weeks, 
              with ongoing notifications as new opportunities arise.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleGoToForum}>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-800 mb-2">Join the Community</h4>
            <p className="text-sm text-gray-600 mb-4">
              Connect with other exchange students, share tips, and get advice
            </p>
            <Button variant="outline" className="w-full">
              Go to Forum <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleGoToProfile}>
          <CardContent className="p-6 text-center">
            <User className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-800 mb-2">Manage Profile</h4>
            <p className="text-sm text-gray-600 mb-4">
              View and update your profile, preferences, and accommodation details
            </p>
            <Button variant="outline" className="w-full">
              Edit Profile <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-between pt-6 border-t">
        <Button 
          variant="outline" 
          onClick={onPrevious} 
          disabled={!canGoPrevious}
        >
          Previous
        </Button>
        <Button 
          onClick={onComplete}
          className="px-8 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
        >
          Start Exploring SwapSpot
        </Button>
      </div>
    </div>
  );
};

export default CompletionStep;
