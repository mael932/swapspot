import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays } from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";

interface DatesStepProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const DatesStep: React.FC<DatesStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious
}) => {
  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    // Only update the specific field, keeping other data intact
    onUpdate({
      [field]: value
    });
  };

  const canProceed = data.startDate && data.endDate;

  return (
    <div className="space-y-8">
      {/* 60% - Primary Content */}
      <div className="text-center mb-8">
        <CalendarDays className="h-16 w-16 text-swap-blue mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          When do you want to swap?
        </h3>
        <p className="text-gray-600 text-lg">
          Select your exchange dates
        </p>
      </div>

      {/* 30% - Secondary Content */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="startDate" className="text-base font-medium">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={data.startDate || ''}
              onChange={(e) => handleDateChange('startDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="h-12 border-gray-300 focus:border-swap-blue"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate" className="text-base font-medium">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={data.endDate || ''}
              onChange={(e) => handleDateChange('endDate', e.target.value)}
              min={data.startDate || new Date().toISOString().split('T')[0]}
              className="h-12 border-gray-300 focus:border-swap-blue"
              required
            />
          </div>
        </div>

        {canProceed && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-700 font-medium">
              Exchange Duration: {Math.ceil(
                (new Date(data.endDate).getTime() - 
                 new Date(data.startDate).getTime()) / 
                (1000 * 60 * 60 * 24)
              )} days
            </p>
          </div>
        )}
      </div>

      {/* 10% - Accent Content */}
      <div className="bg-blue-50 p-3 rounded-lg">
        <p className="text-sm text-blue-700">
          💡 Your dates help us find the perfect match
        </p>
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

export default DatesStep;
