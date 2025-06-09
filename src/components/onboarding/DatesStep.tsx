
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
    onUpdate({
      preferredDates: {
        ...data.preferredDates,
        [field]: value
      }
    });
  };

  const canProceed = data.preferredDates.startDate && data.preferredDates.endDate;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <CalendarDays className="h-12 w-12 text-swap-blue mx-auto mb-3" />
        <h3 className="text-lg font-semibold mb-2">When do you want to swap?</h3>
        <p className="text-gray-600">Select your preferred exchange dates</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={data.preferredDates.startDate}
            onChange={(e) => handleDateChange('startDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={data.preferredDates.endDate}
            onChange={(e) => handleDateChange('endDate', e.target.value)}
            min={data.preferredDates.startDate || new Date().toISOString().split('T')[0]}
          />
        </div>

        {canProceed && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700">
              Duration: {Math.ceil(
                (new Date(data.preferredDates.endDate).getTime() - 
                 new Date(data.preferredDates.startDate).getTime()) / 
                (1000 * 60 * 60 * 24)
              )} days
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onPrevious} 
          disabled={!canGoPrevious}
        >
          Previous
        </Button>
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

export default DatesStep;
