
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, Building2, Info } from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";

interface UniversityStepProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const UniversityStep: React.FC<UniversityStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}) => {
  const [university, setUniversity] = useState(data.university || "");
  const [exchangeUniversity, setExchangeUniversity] = useState(data.exchangeUniversity || "");
  const [program, setProgram] = useState(data.program || "");
  const [matchingConsent, setMatchingConsent] = useState(data.matchingConsent || false);

  const handleUniversityChange = (value: string) => {
    setUniversity(value);
    onUpdate({ ...data, university: value });
  };

  const handleExchangeUniversityChange = (value: string) => {
    setExchangeUniversity(value);
    onUpdate({ ...data, exchangeUniversity: value });
  };

  const handleProgramChange = (value: string) => {
    setProgram(value);
    onUpdate({ ...data, program: value });
  };

  const handleMatchingConsentChange = (checked: boolean) => {
    setMatchingConsent(checked);
    onUpdate({ ...data, matchingConsent: checked });
  };

  const canProceed = university && exchangeUniversity && program && matchingConsent;

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <GraduationCap className="h-16 w-16 text-swap-blue mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          Find Your Perfect Match!
        </h3>
        <p className="text-gray-600 text-lg">
          Tell us about your university exchange program
        </p>
      </div>

      {/* Data Usage Consent */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="matching-consent"
            checked={matchingConsent}
            onCheckedChange={handleMatchingConsentChange}
            className="mt-1"
          />
          <div className="flex-1">
            <Label htmlFor="matching-consent" className="text-sm font-medium text-blue-800 leading-relaxed cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4" />
                Data Usage for Matching
              </div>
              I consent to SwapSpot using my profile information, preferences, and accommodation details to find and suggest potential matches with other students. This helps us provide you with the best possible accommodation exchange opportunities.
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="university" className="text-base font-medium flex items-center gap-2">
            <Building2 className="h-4 w-4 text-swap-blue" />
            Your Current University *
          </Label>
          <Input
            id="university"
            type="text"
            placeholder="e.g., University of California, Berkeley"
            value={university}
            onChange={(e) => handleUniversityChange(e.target.value)}
            className="border-gray-300 focus:border-swap-blue"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="exchange-university" className="text-base font-medium flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-swap-blue" />
            Exchange Destination University *
          </Label>
          <Input
            id="exchange-university"
            type="text"
            placeholder="e.g., Sorbonne University, Paris"
            value={exchangeUniversity}
            onChange={(e) => handleExchangeUniversityChange(e.target.value)}
            className="border-gray-300 focus:border-swap-blue"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="program" className="text-base font-medium">
            Program/Field of Study *
          </Label>
          <Input
            id="program"
            type="text"
            placeholder="e.g., Business Administration, Computer Science"
            value={program}
            onChange={(e) => handleProgramChange(e.target.value)}
            className="border-gray-300 focus:border-swap-blue"
            required
          />
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-700">
          💡 <strong>No account needed yet!</strong> Complete your preferences first, then we'll help you create an account to save everything.
        </p>
      </div>

      {!matchingConsent && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Please consent to data usage for matching to continue with your profile setup.
          </AlertDescription>
        </Alert>
      )}

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

export default UniversityStep;
