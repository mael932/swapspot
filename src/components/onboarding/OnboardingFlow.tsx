
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import UniversityStep from "./UniversityStep";
import DatesStep from "./DatesStep";
import PhotosStep from "./PhotosStep";
import VerificationStep from "./VerificationStep";
import MatchesStep from "./MatchesStep";

export interface OnboardingData {
  university: string;
  program: string;
  preferredDates: {
    startDate: string;
    endDate: string;
  };
  photos: File[];
  verificationMethod: 'email' | 'id';
  verificationFile?: File;
}

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    university: "",
    program: "",
    preferredDates: {
      startDate: "",
      endDate: ""
    },
    photos: [],
    verificationMethod: 'email'
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: "University & Program", component: UniversityStep },
    { number: 2, title: "Preferred Dates", component: DatesStep },
    { number: 3, title: "Room Photos", component: PhotosStep },
    { number: 4, title: "Student Verification", component: VerificationStep },
    { number: 5, title: "Your First Matches", component: MatchesStep }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
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
      <div className="max-w-2xl mx-auto">
        {/* Header with Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-swap-blue">Complete Your Profile</h1>
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
                      ? "bg-green-500 text-white"
                      : currentStep === step.number
                      ? "bg-swap-blue text-white"
                      : "bg-gray-200 text-gray-600"
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
                      currentStep > step.number ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CurrentStepComponent
              data={onboardingData}
              onUpdate={updateOnboardingData}
              onNext={handleNext}
              onPrevious={handlePrevious}
              canGoNext={currentStep < totalSteps}
              canGoPrevious={currentStep > 1}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingFlow;
