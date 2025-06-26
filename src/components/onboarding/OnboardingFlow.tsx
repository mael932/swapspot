
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import UniversityStep from "./UniversityStep";
import ProofOfEnrollmentStep from "./ProofOfEnrollmentStep";
import EnhancedPreferencesStep from "./EnhancedPreferencesStep";
import CompletionStep from "./CompletionStep";
import { addUserToGoogleSheet, formatUserDataForSheet } from "@/services/googleSheetsService";

export interface OnboardingData {
  // Basic info
  fullName: string;
  email: string;
  university: string;
  program: string;
  
  // Proof of enrollment
  proofOfEnrollment?: File;
  hasUploadedProof: boolean;
  additionalInfo: string;
  
  // Current location & apartment
  currentLocation: string;
  currentAddress: string;
  apartmentDescription: string;
  apartmentPhotos: File[];
  
  // Exchange preferences
  duration: string;
  startDate: string;
  endDate: string;
  budget: string;
  preferredDestinations: string[];
  
  // Legacy fields for compatibility with existing components
  preferredDates?: { startDate: string; endDate: string; flexible: boolean };
  photos?: File[];
  requirements?: {
    smokingPolicy: string;
    petPolicy: string;
    genderPreference: string;
    ageRange: string;
    cleanlinessLevel: string;
  };
  verificationMethod?: string;
  verificationFile?: File;
  
  // Consent
  gdprConsent: boolean;
}

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    fullName: "",
    email: "",
    university: "",
    program: "",
    hasUploadedProof: false,
    additionalInfo: "",
    currentLocation: "",
    currentAddress: "",
    apartmentDescription: "",
    apartmentPhotos: [],
    duration: "",
    startDate: "",
    endDate: "",
    budget: "",
    preferredDestinations: [],
    gdprConsent: true
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: "University & Contact Info", component: UniversityStep },
    { number: 2, title: "Proof of Enrollment", component: ProofOfEnrollmentStep },
    { number: 3, title: "Your Preferences", component: EnhancedPreferencesStep },
    { number: 4, title: "Complete", component: CompletionStep }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete registration
      handleCompleteRegistration();
    }
  };

  const handleCompleteRegistration = async () => {
    try {
      // Format data for Google Sheets
      const formattedData = formatUserDataForSheet(onboardingData, onboardingData);
      
      // Send to Google Sheets
      await addUserToGoogleSheet(formattedData);
      
      // Store in localStorage for demo purposes
      localStorage.setItem('registrationData', JSON.stringify(onboardingData));
      
      toast.success("Registration completed successfully!", {
        description: `We'll email you at ${onboardingData.email} when we find matches. Our team will verify your student status within 24-48 hours.`
      });
      
      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Error completing registration:", error);
      toast.error("Registration failed", {
        description: "There was an error submitting your information. Please try again."
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateOnboardingData = (stepData: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...stepData }));
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header with Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Join SwapSpot</h1>
            <span className="text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          
          <Progress value={progress} className="h-3 mb-2" />
          <p className="text-sm text-gray-600 text-center">
            {Math.round(progress)}% Complete
          </p>
        </div>

        {/* Steps Overview */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {steps.map((step) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep > step.number
                      ? "bg-green-600 text-white"
                      : currentStep === step.number
                      ? "bg-swap-blue text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    step.number
                  )}
                </div>
                {step.number < totalSteps && (
                  <div
                    className={`w-8 h-0.5 ${
                      currentStep > step.number ? "bg-green-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900">{steps[currentStep - 1].title}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentStep === 4 ? (
              <CurrentStepComponent
                data={onboardingData}
                onUpdate={updateOnboardingData}
                onNext={handleNext}
                onPrevious={handlePrevious}
                canGoNext={currentStep < totalSteps}
                canGoPrevious={currentStep > 1}
                onComplete={handleCompleteRegistration}
              />
            ) : (
              <CurrentStepComponent
                data={onboardingData}
                onUpdate={updateOnboardingData}
                onNext={handleNext}
                onPrevious={handlePrevious}
                canGoNext={currentStep < totalSteps}
                canGoPrevious={currentStep > 1}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingFlow;
