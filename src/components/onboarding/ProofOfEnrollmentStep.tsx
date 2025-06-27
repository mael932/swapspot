
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Upload, Shield, AlertCircle, CheckCircle, Mail, CreditCard } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { OnboardingData } from "./OnboardingFlow";

interface ProofOfEnrollmentStepProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const ProofOfEnrollmentStep: React.FC<ProofOfEnrollmentStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [additionalInfo, setAdditionalInfo] = useState(data.additionalInfo || "");
  const [universityEmail, setUniversityEmail] = useState(data.universityEmail || "");

  const handleVerificationMethodChange = (method: 'email' | 'id') => {
    onUpdate({ 
      ...data, 
      verificationMethod: method,
      // Clear the file if switching to email method
      ...(method === 'email' && { verificationFile: undefined }),
      // Clear the email if switching to ID method
      ...(method === 'id' && { universityEmail: undefined })
    });
  };

  const handleUniversityEmailChange = (value: string) => {
    setUniversityEmail(value);
    onUpdate({ ...data, universityEmail: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onUpdate({ 
        ...data, 
        verificationFile: file,
        hasUploadedProof: true 
      });
    }
  };

  const handleAdditionalInfoChange = (value: string) => {
    setAdditionalInfo(value);
    onUpdate({ ...data, additionalInfo: value });
  };

  const canProceed = (data.verificationMethod === 'email' && universityEmail) || 
                     (data.verificationMethod === 'id' && data.verificationFile);

  return (
    <div className="space-y-8">
      {/* 60% - Primary Content */}
      <div className="text-center mb-8">
        <Shield className="h-16 w-16 text-swap-blue mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          Verify Your Student Status
        </h3>
        <p className="text-gray-600 text-lg">
          For safety and authenticity, we need to verify that you're currently enrolled as a student
        </p>
      </div>

      {/* 30% - Secondary Content */}
      <div className="space-y-6">
        <Alert className="border-blue-200 bg-blue-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-blue-800">
            <strong>Why we need this:</strong> Student verification helps us maintain a safe community and ensures 
            all users are legitimate students looking for accommodation exchanges.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <Label className="text-base font-medium">Choose your verification method *</Label>
          
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
              
              {data.verificationMethod === 'email' && (
                <div className="mt-4 pl-8">
                  <div className="space-y-2">
                    <Label htmlFor="university-email" className="text-sm font-medium">
                      University Email Address *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="university-email"
                        type="email"
                        placeholder="your.name@university.edu"
                        value={universityEmail}
                        onChange={(e) => handleUniversityEmailChange(e.target.value)}
                        className="pl-10 border-gray-300 focus:border-swap-blue"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      Please use your official university email address (e.g., .edu, .ac.uk, or your university's domain)
                    </p>
                    {universityEmail && universityEmail.includes('@') && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Email address provided</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="id" id="id" />
                <Label htmlFor="id" className="flex-1 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Student ID Upload</p>
                      <p className="text-sm text-gray-600">Upload a photo of your student ID card or enrollment document</p>
                    </div>
                  </div>
                </Label>
              </div>
              
              {data.verificationMethod === 'id' && (
                <div className="mt-4 pl-8">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-swap-blue transition-colors">
                    <label className="cursor-pointer">
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        required
                      />
                      <div className="flex flex-col items-center gap-3">
                        <Upload className="h-10 w-10 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-700">
                            {data.verificationFile ? data.verificationFile.name : "Click to upload your document"}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Student ID, enrollment letter, or transcript (JPG, PNG, PDF - Max 10MB)
                          </p>
                        </div>
                        {data.verificationFile && (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="h-5 w-5" />
                            <span className="text-sm font-medium">Document uploaded successfully</span>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              )}
            </Card>
          </RadioGroup>

          <div className="space-y-2">
            <Label htmlFor="additional-info" className="text-base font-medium">
              Additional Information
            </Label>
            <Textarea
              id="additional-info"
              placeholder="Any additional information about your enrollment, exchange program, or special circumstances..."
              value={additionalInfo}
              onChange={(e) => handleAdditionalInfoChange(e.target.value)}
              rows={4}
              className="resize-none border-gray-300 focus:border-swap-blue"
            />
          </div>

          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="text-green-800">
              <strong>Manual Review Process:</strong> Our team will manually review your submission within 24-48 hours. 
              You'll receive an email notification once your student status is verified.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* 10% - Accent Content */}
      <div className="bg-blue-50 p-3 rounded-lg">
        <p className="text-sm text-blue-700">
          <Shield className="h-4 w-4 inline mr-1" />
          Your information is secure and will only be used for verification purposes
        </p>
      </div>

      <div className="flex gap-4 pt-6">
        {canGoPrevious && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onPrevious} 
            className="flex-1 h-12"
          >
            Previous
          </Button>
        )}
        <Button 
          onClick={onNext} 
          disabled={!canProceed || !canGoNext}
          className="flex-1 h-12 bg-swap-blue hover:bg-swap-blue/90 text-white font-medium"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ProofOfEnrollmentStep;
