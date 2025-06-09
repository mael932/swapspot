
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
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
    "Computer Science",
    "Business Administration", 
    "International Relations",
    "Engineering",
    "Medicine",
    "Law",
    "Economics",
    "Psychology",
    "Architecture",
    "Art & Design",
    "Exchange Program",
    "Other"
  ];

  const canProceed = data.university && data.program;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Tell us about your studies</h3>
        <p className="text-gray-600">This helps us find the best matches for your academic schedule</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="university">University</Label>
          <Select value={data.university} onValueChange={(value) => onUpdate({ university: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select your university" />
            </SelectTrigger>
            <SelectContent>
              {universities.map((uni) => (
                <SelectItem key={uni} value={uni}>
                  {uni}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="program">Program/Field of Study</Label>
          <Select value={data.program} onValueChange={(value) => onUpdate({ program: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select your program" />
            </SelectTrigger>
            <SelectContent>
              {programs.map((program) => (
                <SelectItem key={program} value={program}>
                  {program}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
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

export default UniversityStep;
