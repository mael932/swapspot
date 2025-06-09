
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Shield, Upload, Mail, CreditCard } from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";

interface VerificationStepProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const VerificationStep: React.FC<VerificationStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVerificationMethodChange = (method: 'email' | 'id') => {
    onUpdate({ verificationMethod: method });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpdate({ verificationFile: file });
    }
  };

  const canProceed = data.verificationMethod === 'email' || 
                     (data.verificationMethod === 'id' && data.verificationFile);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Shield className="h-12 w-12 text-swap-blue mx-auto mb-3" />
        <h3 className="text-lg font-semibold mb-2">Verify your student status</h3>
        <p className="text-gray-600">This helps build trust and ensures quality matches</p>
      </div>

      <RadioGroup 
        value={data.verificationMethod} 
        onValueChange={handleVerificationMethodChange}
        className="space-y-4"
      >
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="email" id="email" />
            <Label htmlFor="email" className="flex-1 cursor-pointer">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">University Email Verification</p>
                  <p className="text-sm text-gray-600">We'll verify your .edu or university domain email</p>
                </div>
              </div>
            </Label>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="id" id="id" />
            <Label htmlFor="id" className="flex-1 cursor-pointer">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Student ID Upload</p>
                  <p className="text-sm text-gray-600">Upload a photo of your student ID card</p>
                </div>
              </div>
            </Label>
          </div>
          
          {data.verificationMethod === 'id' && (
            <div className="mt-4 pl-8">
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                {data.verificationFile ? 'Change File' : 'Upload Student ID'}
              </Button>
              {data.verificationFile && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ {data.verificationFile.name}
                </p>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}
        </Card>
      </RadioGroup>

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <p className="text-sm text-yellow-800">
          <Shield className="h-4 w-4 inline mr-1" />
          Your information is secure and will only be used for verification purposes
        </p>
      </div>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onPrevious} 
          disabled={!canGoPrevious}
        >
          Previous
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!canProceed || !canGoNext}
          className="px-8"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default VerificationStep;
