
import React, { useState, useCallback } from "react";
import UniversityStep from "./UniversityStep";
import DatesStep from "./DatesStep";
import EnhancedPreferencesStep from "./EnhancedPreferencesStep";
import PhotosStep from "./PhotosStep";
import ProofOfEnrollmentStep from "./ProofOfEnrollmentStep";
import VerificationStep from "./VerificationStep";
import MatchesStep from "./MatchesStep";
import CompletionStep from "./CompletionStep";

export interface OnboardingData {
  fullName?: string;
  email?: string;
  university?: string;
  exchangeUniversity?: string;
  program?: string;
  dates?: {
    startDate?: string;
    endDate?: string;
  };
  preferences?: {
    cleanliness?: number;
    noiseLevel?: number;
    socialBattery?: number;
  };
  photos?: string[];
  proofOfEnrollment?: string;
  verificationStatus?: "pending" | "verified" | "rejected";
  matches?: string[];
  preferredDates?: {
    startDate?: string;
    endDate?: string;
  };
}

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({});
  const [canGoNext, setCanGoNext] = useState(true);
  const [canGoPrevious, setCanGoPrevious] = useState(true);

  const handleNext = () => {
    if (currentStep < 7) {
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
          <PhotosStep
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
          <ProofOfEnrollmentStep
            data={data}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canGoNext={canGoNext}
            canGoPrevious={canGoPrevious}
          />
        );
      case 5:
        return (
          <VerificationStep
            data={data}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canGoNext={canGoNext}
            canGoPrevious={canGoPrevious}
          />
        );
      case 6:
        return (
          <MatchesStep
            data={data}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canGoNext={canGoNext}
            canGoPrevious={canGoPrevious}
          />
        );
      case 7:
        return (
          <CompletionStep
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
    <div className="min-h-screen bg-gray-50 py-6 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default OnboardingFlow;
