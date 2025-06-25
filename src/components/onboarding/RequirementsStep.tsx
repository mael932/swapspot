
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { DollarSign, MapPin, Home } from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";

interface RequirementsStepProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const RequirementsStep: React.FC<RequirementsStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious
}) => {
  const handlePriceRangeChange = (values: number[]) => {
    onUpdate({
      requirements: {
        ...data.requirements,
        priceRange: {
          min: values[0],
          max: values[1]
        }
      }
    });
  };

  const handleLocationChange = (location: string) => {
    onUpdate({
      requirements: {
        ...data.requirements,
        location
      }
    });
  };

  const handleAccommodationTypeChange = (accommodationType: string) => {
    onUpdate({
      requirements: {
        ...data.requirements,
        accommodationType
      }
    });
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const currentAmenities = data.requirements.amenities;
    const updatedAmenities = checked
      ? [...currentAmenities, amenity]
      : currentAmenities.filter(a => a !== amenity);
    
    onUpdate({
      requirements: {
        ...data.requirements,
        amenities: updatedAmenities
      }
    });
  };

  const canProceed = data.requirements.location && data.requirements.accommodationType;

  const amenitiesList = [
    "WiFi",
    "Kitchen Access",
    "Laundry",
    "Air Conditioning",
    "Heating",
    "Parking",
    "Gym Access",
    "Study Space",
    "Balcony/Terrace",
    "Near Public Transport"
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <DollarSign className="h-12 w-12 text-swap-blue mx-auto mb-3" />
        <h3 className="text-lg font-semibold mb-2">What are you looking for?</h3>
        <p className="text-gray-600">Tell us about your budget and preferences for the perfect swap</p>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <Label className="text-base font-medium mb-3 block">Monthly Budget Range</Label>
          <div className="px-4">
            <Slider
              value={[data.requirements.priceRange.min, data.requirements.priceRange.max]}
              onValueChange={handlePriceRangeChange}
              max={3000}
              min={0}
              step={50}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${data.requirements.priceRange.min}/month</span>
              <span>${data.requirements.priceRange.max}/month</span>
            </div>
          </div>
        </div>

        {/* Preferred Location */}
        <div>
          <Label htmlFor="location" className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-swap-blue" />
            Preferred City/Location
          </Label>
          <Input
            id="location"
            placeholder="e.g., Amsterdam, Berlin, Paris..."
            value={data.requirements.location}
            onChange={(e) => handleLocationChange(e.target.value)}
          />
        </div>

        {/* Accommodation Type */}
        <div>
          <Label className="flex items-center gap-2 mb-2">
            <Home className="h-4 w-4 text-swap-blue" />
            Accommodation Type
          </Label>
          <Select value={data.requirements.accommodationType} onValueChange={handleAccommodationTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select accommodation type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="studio">Studio Apartment</SelectItem>
              <SelectItem value="shared-apartment">Shared Apartment</SelectItem>
              <SelectItem value="private-room">Private Room</SelectItem>
              <SelectItem value="student-housing">Student Housing</SelectItem>
              <SelectItem value="homestay">Homestay</SelectItem>
              <SelectItem value="any">Any Type</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amenities */}
        <div>
          <Label className="text-base font-medium mb-3 block">Desired Amenities</Label>
          <div className="grid grid-cols-2 gap-3">
            {amenitiesList.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={data.requirements.amenities.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                />
                <Label htmlFor={amenity} className="text-sm cursor-pointer">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        {canProceed && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Your Requirements Summary:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Budget: ${data.requirements.priceRange.min} - ${data.requirements.priceRange.max}/month</li>
              <li>• Location: {data.requirements.location}</li>
              <li>• Type: {data.requirements.accommodationType}</li>
              {data.requirements.amenities.length > 0 && (
                <li>• Amenities: {data.requirements.amenities.join(", ")}</li>
              )}
            </ul>
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

export default RequirementsStep;
