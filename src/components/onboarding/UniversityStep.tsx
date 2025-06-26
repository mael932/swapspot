
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Mail, User } from "lucide-react";
import UniversitySelect from "./UniversitySelect";
import ProgramSelect from "./ProgramSelect";

interface UniversityStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const europeanUniversities = [
  "University of Oxford", "University of Cambridge", "Imperial College London",
  "University College London", "King's College London", "London School of Economics",
  "ETH Zurich", "University of Zurich", "University of Geneva", "EPFL",
  "Sorbonne University", "École Normale Supérieure", "Sciences Po", "HEC Paris",
  "Technical University of Munich", "Ludwig Maximilian University of Munich",
  "Heidelberg University", "Humboldt University of Berlin", "Free University of Berlin",
  "University of Amsterdam", "Delft University of Technology", "Leiden University",
  "Erasmus University Rotterdam", "University of Groningen",
  "KU Leuven", "Ghent University", "Université libre de Bruxelles",
  "University of Barcelona", "Autonomous University of Madrid", "Complutense University of Madrid",
  "University of Bologna", "Sapienza University of Rome", "Bocconi University",
  "Stockholm University", "KTH Royal Institute of Technology", "University of Copenhagen",
  "University of Oslo", "University of Helsinki", "University of Vienna",
  "Charles University", "University of Warsaw", "Jagiellonian University"
];

const UniversityStep: React.FC<UniversityStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}) => {
  const [fullName, setFullName] = useState(data.fullName || "");
  const [email, setEmail] = useState(data.email || "");
  const [university, setUniversity] = useState(data.university || "");
  const [exchangeUniversity, setExchangeUniversity] = useState(data.exchangeUniversity || "");
  const [program, setProgram] = useState(data.program || "");

  const updateData = (updates: any) => {
    const newData = {
      ...data,
      fullName,
      email,
      university,
      exchangeUniversity,
      program,
      ...updates
    };
    onUpdate(newData);
  };

  const handleNext = () => {
    updateData({});
    onNext();
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <GraduationCap className="h-16 w-16 text-swap-blue mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Let's get to know you
        </h3>
        <p className="text-gray-600 text-lg">
          Tell us about yourself and your studies (you can skip fields and come back later)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="full-name" className="text-base font-medium">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="full-name"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                updateData({ fullName: e.target.value });
              }}
              className="pl-10 h-12 border-gray-300 focus:border-swap-blue"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-base font-medium">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                updateData({ email: e.target.value });
              }}
              className="pl-10 h-12 border-gray-300 focus:border-swap-blue"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <UniversitySelect
          value={university}
          onChange={(value) => {
            setUniversity(value);
            updateData({ university: value });
          }}
          placeholder="Select your current university (optional)"
          label="Current University"
          universities={europeanUniversities}
        />

        <UniversitySelect
          value={exchangeUniversity}
          onChange={(value) => {
            setExchangeUniversity(value);
            updateData({ exchangeUniversity: value });
          }}
          placeholder="Select your exchange destination university (optional)"
          label="Exchange University"
          universities={europeanUniversities}
        />

        <ProgramSelect
          value={program}
          onChange={(value) => {
            setProgram(value);
            updateData({ program: value });
          }}
          placeholder="Select your program of study (optional)"
          label="Program of Study"
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-700">
          💡 <strong>Tip:</strong> You can skip any fields and continue. We'll still process your application with whatever information you provide.
        </p>
      </div>

      <div className="flex gap-4 pt-6">
        {canGoPrevious && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onPrevious} 
            className="flex-1 h-12 border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Previous
          </Button>
        )}
        <Button 
          onClick={handleNext}
          className="flex-1 h-12 bg-swap-blue hover:bg-swap-blue/90 text-white font-medium"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default UniversityStep;
