
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, User } from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";
import UniversitySelect from "./UniversitySelect";
import ProgramSelect from "./ProgramSelect";

interface UniversityStepProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

// List of universities for the dropdown
const UNIVERSITIES = [
  "Harvard University",
  "Stanford University",
  "MIT",
  "University of Oxford",
  "University of Cambridge",
  "Yale University",
  "Princeton University",
  "Columbia University",
  "University of Pennsylvania",
  "Cornell University",
  "University of California, Berkeley",
  "University of California, Los Angeles",
  "University of Michigan",
  "New York University",
  "London School of Economics",
  "Imperial College London",
  "University College London",
  "King's College London",
  "University of Edinburgh",
  "University of Manchester",
  "University of Toronto",
  "McGill University",
  "University of British Columbia",
  "Australian National University",
  "University of Melbourne",
  "University of Sydney",
  "ETH Zurich",
  "University of Zurich",
  "Sorbonne University",
  "Sciences Po",
  "Technical University of Munich",
  "Ludwig Maximilian University of Munich",
  "Heidelberg University",
  "University of Amsterdam",
  "Delft University of Technology",
  "KTH Royal Institute of Technology",
  "University of Copenhagen",
  "University of Oslo",
  "Other"
];

const UniversityStep: React.FC<UniversityStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious
}) => {
  const handleInputChange = (field: keyof OnboardingData, value: string) => {
    onUpdate({ [field]: value });
  };

  const canProceed = data.fullName && data.university && data.exchangeUniversity && data.program;

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <GraduationCap className="h-16 w-16 text-swap-blue mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          Tell us about your studies
        </h3>
        <p className="text-gray-600 text-lg">
          We'll use this information to match you with the perfect exchange partner
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-swap-blue" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Your full name"
                value={data.fullName || ''}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="h-12"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-swap-blue" />
              Current University
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <UniversitySelect
              value={data.university || ''}
              onChange={(value) => handleInputChange('university', value)}
              placeholder="Select your current university"
              label="University"
              universities={UNIVERSITIES}
            />
            
            <ProgramSelect
              value={data.program || ''}
              onChange={(value) => handleInputChange('program', value)}
              placeholder="Select your program"
              label="Field of Study"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-swap-blue" />
              Exchange Destination
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UniversitySelect
              value={data.exchangeUniversity || ''}
              onChange={(value) => handleInputChange('exchangeUniversity', value)}
              placeholder="Select your exchange university"
              label="Exchange University"
              universities={UNIVERSITIES}
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 pt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious} 
          disabled={!canGoPrevious}
          className="flex-1 h-12"
        >
          Previous
        </Button>
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
