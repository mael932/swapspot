
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Mail, Clock, Shield } from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";

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

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">
          Almost There!
        </h3>
        <p className="text-lg text-gray-600">
          Your application has been submitted successfully
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
                <p className="font-medium text-blue-800">Student Verification</p>
                <p className="text-sm text-blue-700">
                  Our team will review your proof of enrollment within 24-48 hours
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">
                2
              </div>
              <div>
                <p className="font-medium text-blue-800">Match Finding</p>
                <p className="text-sm text-blue-700">
                  We'll search for perfect exchange opportunities based on your preferences
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
                  You'll receive an email at <strong>{data.email}</strong> when we find suitable matches
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
          <li>• Verification: 24-48 hours</li>
          <li>• First matches: Within 1 week (if available)</li>
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
          onClick={onComplete}
          className="px-8 bg-green-600 hover:bg-green-700"
        >
          Complete Registration
        </Button>
      </div>
    </div>
  );
};

export default CompletionStep;
