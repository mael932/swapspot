
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { OnboardingData } from "./OnboardingFlow";
import { GraduationCap } from "lucide-react";

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
  canGoNext
}) => {
  const universities = [
    "University of Amsterdam",
    "Sorbonne University", 
    "Heidelberg University",
    "Cambridge University",
    "Oxford University",
    "Politecnico di Milano",
    "Technical University of Berlin",
    "Uppsala University",
    "Complutense University of Madrid",
    "IE University Madrid",
    "Erasmus University Rotterdam",
    "Harvard University",
    "Stanford University",
    "MIT",
    "UC Berkeley",
    "New York University",
    "Other"
  ];

  const programs = [
    "Exchange Program - Computer Science",
    "Exchange Program - Business Administration", 
    "Exchange Program - International Relations",
    "Exchange Program - Engineering",
    "Exchange Program - Medicine",
    "Exchange Program - Law",
    "Exchange Program - Economics",
    "Exchange Program - Psychology",
    "Exchange Program - Architecture",
    "Exchange Program - Art & Design",
    "Erasmus+ Exchange",
    "Study Abroad Program",
    "Other Exchange Program"
  ];

  const canProceed = data.university && data.program;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <GraduationCap className="h-6 w-6 text-swap-blue" />
          <span className="text-swap-blue font-semibold">Exchange Student Information</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">Tell us about your exchange studies</h3>
        <p className="text-gray-600">This helps us find the best matches for your study abroad experience and academic schedule</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="university">Your Home University</Label>
          <Select value={data.university} onValueChange={(value) => onUpdate({ university: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select your home university" />
            </SelectTrigger>
            <SelectContent>
              {universities.map((uni) => (
                <SelectItem key={uni} value={uni}>
                  {uni}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-1">The university you're currently enrolled at</p>
        </div>

        <div>
          <Label htmlFor="program">Exchange Program/Field of Study</Label>
          <Select value={data.program} onValueChange={(value) => onUpdate({ program: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select your exchange program" />
            </SelectTrigger>
            <SelectContent>
              {programs.map((program) => (
                <SelectItem key={program} value={program}>
                  {program}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-1">Your field of study for the exchange program</p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={onNext} 
          disabled={!canProceed || !canGoNext}
          className="px-8"
        >
          Continue to Exchange Dates
        </Button>
      </div>
    </div>
  );
};

export default UniversityStep;
