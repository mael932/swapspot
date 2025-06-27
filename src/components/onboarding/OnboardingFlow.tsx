
import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRightLeft } from "lucide-react";
import UniversityStep from "./UniversityStep";
import DatesStep from "./DatesStep";
import EnhancedPreferencesStep from "./EnhancedPreferencesStep";
import ProofOfEnrollmentStep from "./ProofOfEnrollmentStep";
import ProfileCompleteStep from "./ProfileCompleteStep";

export interface OnboardingData {
  fullName?: string;
  email?: string;
  university?: string;
  exchangeUniversity?: string;
  program?: string;
  startDate?: string;
  endDate?: string;
  preferences?: {
    cleanliness?: number;
    noiseLevel?: number;
    socialBattery?: number;
  };
  photos?: File[];
  proofOfEnrollment?: File;
  verificationStatus?: "pending" | "verified" | "rejected";
  matches?: string[];
  // Additional properties for verification
  verificationMethod?: 'email' | 'id';
  verificationFile?: File;
  universityEmail?: string;
  additionalInfo?: string;
  hasUploadedProof?: boolean;
  // Properties for preferences step
  currentLocation?: string;
  currentAddress?: string;
  duration?: string;
  budget?: string;
  preferredDestinations?: string[];
  apartmentDescription?: string;
  gdprConsent?: boolean;
  apartmentPhotos?: File[];
}

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({});
  const [canGoNext, setCanGoNext] = useState(true);
  const [canGoPrevious, setCanGoPrevious] = useState(true);

  const handleNext = () => {
    if (currentStep < 4) { // Updated max step count
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepUpdate = (newData: OnboardingData) => {
    setData(newData);
  };

  const handleComplete = () => {
    alert("Onboarding complete!");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <UniversityStep
            data={data}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canGoNext={canGoNext}
            canGoPrevious={canGoPrevious}
          />
        );
      case 1:
        return (
          <DatesStep
            data={data}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canGoNext={canGoNext}
            canGoPrevious={canGoPrevious}
          />
        );
      case 2:
        return (
          <EnhancedPreferencesStep
            data={data}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canGoNext={canGoNext}
            canGoPrevious={canGoPrevious}
          />
        );
      case 3:
        return (
          <ProofOfEnrollmentStep
            data={data}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canGoNext={canGoNext}
            canGoPrevious={canGoPrevious}
          />
        );
      case 4:
        return (
          <ProfileCompleteStep
            data={data}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canGoNext={canGoNext}
            canGoPrevious={canGoPrevious}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <div className="bg-white border-b shadow-sm">
        <div className="container py-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-swap-blue">
            <div className="relative">
              <ArrowRightLeft 
                className="h-8 w-8 text-swap-blue animate-pulse hover:animate-spin transition-all duration-300" 
              />
            </div>
            SwapSpot
          </Link>
        </div>
      </div>

      {/* Main Onboarding Content */}
      <div className="py-6 flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
